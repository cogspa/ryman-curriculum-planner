import React, { useRef, useState, useEffect, useCallback } from "react";

/**
 * SwatchForge — import an image, pull colors, export an Adobe .ase (+ .gpl / hex / CSS).
 *
 * Two sampling modes:
 *   • Auto  — median-cut palette extraction from any photo (slider sets count)
 *   • Pick  — eyedropper; click the image to sample exact pixels (for swatch sheets)
 *
 * Zero dependencies. Drop into a Vite/React app. Tailwind not required — all styling is inline
 * so it survives any host. Swap the THEME object (or the fontFamily) to match your site;
 * the instrument look here uses a mono face + oxblood accent.
 */

const THEME = {
  bg: "#100e0e",
  panel: "#1b1717",
  panel2: "#231e1e",
  border: "#322a2a",
  text: "#e9e2db",
  muted: "#8a807a",
  accent: "#9c3030",      // oxblood
  accentHi: "#c14040",
  mono: "'IBM Plex Mono', ui-monospace, 'SFMono-Regular', Menlo, monospace",
};

/* ----------------------------- ASE binary writer ----------------------------- */
function concat(arrs) {
  const len = arrs.reduce((n, a) => n + a.length, 0);
  const out = new Uint8Array(len);
  let o = 0;
  for (const a of arrs) { out.set(a, o); o += a.length; }
  return out;
}
const u16 = (v) => { const b = new Uint8Array(2); new DataView(b.buffer).setUint16(0, v); return b; };
const u32 = (v) => { const b = new Uint8Array(4); new DataView(b.buffer).setUint32(0, v); return b; };
const f32 = (v) => { const b = new Uint8Array(4); new DataView(b.buffer).setFloat32(0, v); return b; };
const ascii = (s) => new TextEncoder().encode(s);
function nameBlock(name) {
  const s = name + "\0";                     // UTF-16BE, null-terminated, length in chars
  const b = new Uint8Array(2 + s.length * 2);
  const dv = new DataView(b.buffer);
  dv.setUint16(0, s.length);
  for (let i = 0; i < s.length; i++) dv.setUint16(2 + i * 2, s.charCodeAt(i));
  return b;
}
function colorBlock(name, [r, g, b]) {
  const body = concat([nameBlock(name), ascii("RGB "), f32(r / 255), f32(g / 255), f32(b / 255), u16(2)]);
  return concat([u16(0x0001), u32(body.length), body]);
}
const groupStart = (name) => { const nb = nameBlock(name); return concat([u16(0xc001), u32(nb.length), nb]); };
const groupEnd = () => concat([u16(0xc002), u32(0)]);

function buildASE(groupName, swatches) {
  const blocks = [];
  let n = 0;
  if (groupName) { blocks.push(groupStart(groupName)); n++; }
  swatches.forEach((s, i) => { blocks.push(colorBlock(s.name || `Swatch ${i + 1}`, s.rgb)); n++; });
  if (groupName) { blocks.push(groupEnd()); n++; }
  return concat([ascii("ASEF"), u16(1), u16(0), u32(n), ...blocks]);
}

/* -------------------------------- other exports ------------------------------- */
function buildGPL(groupName, swatches) {
  let out = `GIMP Palette\nName: ${groupName || "Palette"}\nColumns: 0\n#\n`;
  for (const s of swatches) {
    const [r, g, b] = s.rgb;
    out += `${String(r).padStart(3)} ${String(g).padStart(3)} ${String(b).padStart(3)}\t${s.name}\n`;
  }
  return out;
}
const toHex = ([r, g, b]) => "#" + [r, g, b].map((v) => v.toString(16).padStart(2, "0")).join("").toUpperCase();
const parseHex = (h) => {
  const m = /^#?([0-9a-f]{6})$/i.exec(h.trim());
  if (!m) return null;
  const i = parseInt(m[1], 16);
  return [(i >> 16) & 255, (i >> 8) & 255, i & 255];
};

/* ------------------------------ median-cut quantize --------------------------- */
function makeBox(px) {
  let rmin = 255, gmin = 255, bmin = 255, rmax = 0, gmax = 0, bmax = 0;
  let rs = 0, gs = 0, bs = 0;
  for (const [r, g, b] of px) {
    rmin = Math.min(rmin, r); gmin = Math.min(gmin, g); bmin = Math.min(bmin, b);
    rmax = Math.max(rmax, r); gmax = Math.max(gmax, g); bmax = Math.max(bmax, b);
    rs += r; gs += g; bs += b;
  }
  const n = px.length || 1;
  const ranges = [rmax - rmin, gmax - gmin, bmax - bmin];
  return { px, score: Math.max(...ranges) * px.length, longest: ranges.indexOf(Math.max(...ranges)),
    avg: [Math.round(rs / n), Math.round(gs / n), Math.round(bs / n)] };
}
function quantize(pixels, count) {
  if (pixels.length === 0) return [];
  let boxes = [makeBox(pixels)];
  while (boxes.length < count) {
    boxes.sort((a, b) => b.score - a.score);
    const box = boxes.shift();
    if (box.px.length <= 1) { boxes.unshift(box); break; }
    const ch = box.longest;
    const sorted = box.px.slice().sort((p, q) => p[ch] - q[ch]);
    const mid = sorted.length >> 1;
    boxes.push(makeBox(sorted.slice(0, mid)), makeBox(sorted.slice(mid)));
  }
  return boxes.sort((a, b) => b.px.length - a.px.length).map((b) => b.avg);
}

/* ----------------------------------- helpers ---------------------------------- */
function download(filename, data, mime) {
  const blob = new Blob([data], { type: mime || "application/octet-stream" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = filename; a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
async function copyText(text) {
  try { await navigator.clipboard.writeText(text); return true; }
  catch {
    const ta = document.createElement("textarea");
    ta.value = text; ta.style.position = "fixed"; ta.style.opacity = "0";
    document.body.appendChild(ta); ta.select();
    let ok = false; try { ok = document.execCommand("copy"); } catch {}
    document.body.removeChild(ta); return ok;
  }
}

/* ===================================== UI ===================================== */
export default function SwatchForge() {
  const dispRef = useRef(null);     // visible canvas (scaled to fit)
  const srcRef = useRef(null);      // offscreen full-res canvas for accurate sampling
  const loupeRef = useRef(null);
  const imgRef = useRef(null);
  const srcDataRef = useRef(null);  // cached ImageData of source

  const [hasImg, setHasImg] = useState(false);
  const [mode, setMode] = useState("auto");   // 'auto' | 'pick'
  const [count, setCount] = useState(8);
  const [group, setGroup] = useState("Imported Palette");
  const [swatches, setSwatches] = useState([]); // {name, rgb}
  const [loupe, setLoupe] = useState(null);     // {x,y,hex}
  const [toast, setToast] = useState("");
  const DISP_MAX = 560;

  const flash = (m) => { setToast(m); setTimeout(() => setToast(""), 1400); };

  const loadImage = useCallback((src) => {
    const img = new Image();
    img.onload = () => {
      imgRef.current = img;
      // source canvas at natural res (capped to keep memory sane)
      const cap = 1600;
      const s = Math.min(1, cap / Math.max(img.width, img.height));
      const sw = Math.max(1, Math.round(img.width * s));
      const sh = Math.max(1, Math.round(img.height * s));
      const sc = srcRef.current; sc.width = sw; sc.height = sh;
      const sctx = sc.getContext("2d", { willReadFrequently: true });
      sctx.drawImage(img, 0, 0, sw, sh);
      srcDataRef.current = sctx.getImageData(0, 0, sw, sh);
      // display canvas
      const d = Math.min(1, DISP_MAX / Math.max(sw, sh));
      const dc = dispRef.current; dc.width = Math.round(sw * d); dc.height = Math.round(sh * d);
      dc.getContext("2d").drawImage(sc, 0, 0, dc.width, dc.height);
      setHasImg(true);
      setSwatches([]);
    };
    img.src = src;
  }, []);

  const onFile = (file) => {
    if (!file || !file.type.startsWith("image/")) return;
    const r = new FileReader();
    r.onload = (e) => loadImage(e.target.result);
    r.readAsDataURL(file);
  };

  // paste support
  useEffect(() => {
    const onPaste = (e) => {
      const item = [...(e.clipboardData?.items || [])].find((i) => i.type.startsWith("image/"));
      if (item) onFile(item.getAsFile());
    };
    window.addEventListener("paste", onPaste);
    return () => window.removeEventListener("paste", onPaste);
  }, []);

  const pixelAt = (sx, sy) => {
    const d = srcDataRef.current; if (!d) return null;
    const x = Math.max(0, Math.min(d.width - 1, sx | 0));
    const y = Math.max(0, Math.min(d.height - 1, sy | 0));
    const i = (y * d.width + x) * 4;
    return [d.data[i], d.data[i + 1], d.data[i + 2]];
  };

  const extractAuto = () => {
    const d = srcDataRef.current; if (!d) return;
    // subsample to ~140px max for speed
    const step = Math.max(1, Math.floor(Math.max(d.width, d.height) / 140));
    const px = [];
    for (let y = 0; y < d.height; y += step)
      for (let x = 0; x < d.width; x += step) {
        const i = (y * d.width + x) * 4;
        if (d.data[i + 3] < 8) continue; // skip transparent
        px.push([d.data[i], d.data[i + 1], d.data[i + 2]]);
      }
    const pal = quantize(px, count);
    setSwatches(pal.map((rgb, i) => ({ name: `${group} ${i + 1}`, rgb })));
    flash(`Extracted ${pal.length} colors`);
  };

  const dispToSrc = (e) => {
    const dc = dispRef.current, rect = dc.getBoundingClientRect();
    const dx = (e.clientX - rect.left) * (dc.width / rect.width);
    const dy = (e.clientY - rect.top) * (dc.height / rect.height);
    const d = srcDataRef.current;
    return { sx: dx * (d.width / dc.width), sy: dy * (d.height / dc.height), dx, dy, rect };
  };

  const onCanvasMove = (e) => {
    if (mode !== "pick" || !hasImg) return;
    const { sx, sy } = dispToSrc(e);
    const rgb = pixelAt(sx, sy); if (!rgb) return;
    // draw loupe
    const lc = loupeRef.current;
    if (lc) {
      const ctx = lc.getContext("2d");
      ctx.imageSmoothingEnabled = false;
      const Z = 9, R = 7; // zoom, radius in source px
      ctx.clearRect(0, 0, lc.width, lc.height);
      ctx.drawImage(srcRef.current, sx - R, sy - R, R * 2, R * 2, 0, 0, lc.width, lc.height);
      ctx.strokeStyle = "rgba(0,0,0,.5)"; ctx.lineWidth = 1;
      ctx.strokeRect(lc.width / 2 - Z / 2, lc.height / 2 - Z / 2, Z, Z);
      ctx.strokeStyle = "#fff"; ctx.strokeRect(lc.width / 2 - Z / 2 - 1, lc.height / 2 - Z / 2 - 1, Z + 2, Z + 2);
    }
    setLoupe({ hex: toHex(rgb) });
  };

  const onCanvasClick = (e) => {
    if (mode !== "pick" || !hasImg) return;
    const { sx, sy } = dispToSrc(e);
    const rgb = pixelAt(sx, sy); if (!rgb) return;
    setSwatches((s) => [...s, { name: `${group} ${s.length + 1}`, rgb }]);
  };

  const updateSwatch = (i, patch) => setSwatches((s) => s.map((sw, j) => (j === i ? { ...sw, ...patch } : sw)));
  const removeSwatch = (i) => setSwatches((s) => s.filter((_, j) => j !== i));
  const dedupe = () => setSwatches((s) => {
    const seen = new Set(), out = [];
    for (const sw of s) { const h = toHex(sw.rgb); if (!seen.has(h)) { seen.add(h); out.push(sw); } }
    flash(`Removed ${s.length - out.length} duplicate(s)`); return out;
  });

  const exportASE = () => {
    if (!swatches.length) return flash("No swatches yet");
    download(`${(group || "palette").replace(/\s+/g, "_")}.ase`, buildASE(group, swatches));
    flash("Exported .ase");
  };
  const exportGPL = () => {
    if (!swatches.length) return;
    download(`${(group || "palette").replace(/\s+/g, "_")}.gpl`, buildGPL(group, swatches), "text/plain");
    flash("Exported .gpl");
  };
  const copyHex = async () => { await copyText(swatches.map((s) => toHex(s.rgb)).join("\n")); flash("Copied hex"); };
  const copyCSS = async () => {
    const css = `:root {\n${swatches.map((s, i) => `  --sw-${i + 1}: ${toHex(s.rgb)};`).join("\n")}\n}`;
    await copyText(css); flash("Copied CSS vars");
  };
  const copyJSON = async () => {
    await copyText(JSON.stringify({ group, swatches: swatches.map((s) => ({ name: s.name, hex: toHex(s.rgb), rgb: s.rgb })) }, null, 2));
    flash("Copied JSON");
  };

  /* --------------------------------- styles ---------------------------------- */
  const S = {
    wrap: { background: THEME.bg, color: THEME.text, fontFamily: THEME.mono, minHeight: "100%", padding: 24, boxSizing: "border-box" },
    panel: { background: THEME.panel, border: `1px solid ${THEME.border}`, borderRadius: 4, padding: 16 },
    label: { color: THEME.muted, fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 8 },
    btn: (active) => ({
      background: active ? THEME.accent : THEME.panel2, color: active ? "#fff" : THEME.text,
      border: `1px solid ${active ? THEME.accent : THEME.border}`, borderRadius: 3, padding: "8px 12px",
      fontFamily: THEME.mono, fontSize: 12, cursor: "pointer", letterSpacing: "0.04em",
    }),
    input: { background: THEME.bg, color: THEME.text, border: `1px solid ${THEME.border}`, borderRadius: 3,
      padding: "6px 8px", fontFamily: THEME.mono, fontSize: 12, width: "100%", boxSizing: "border-box" },
  };

  return (
    <div style={S.wrap}>
      <div style={{ maxWidth: 980, margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 4 }}>
          <h1 style={{ fontSize: 18, margin: 0, letterSpacing: "0.04em" }}>SWATCH&nbsp;FORGE</h1>
          <span style={{ color: THEME.accentHi, fontSize: 11, letterSpacing: "0.18em" }}>IMAGE → .ASE</span>
        </div>
        <p style={{ color: THEME.muted, fontSize: 12, marginTop: 0, marginBottom: 20 }}>
          Drop, paste, or browse an image. Auto-extract a palette or eyedrop exact swatches, then export Adobe Swatch Exchange.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1.2fr) minmax(0,1fr)", gap: 16 }}>
          {/* LEFT: image + sampling */}
          <div style={S.panel}>
            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => { e.preventDefault(); onFile(e.dataTransfer.files[0]); }}
              style={{ border: `1px dashed ${THEME.border}`, borderRadius: 3, padding: hasImg ? 8 : 36,
                textAlign: "center", position: "relative", minHeight: hasImg ? 0 : 160,
                display: "flex", alignItems: "center", justifyContent: "center" }}
            >
              {!hasImg && (
                <div>
                  <div style={{ color: THEME.muted, fontSize: 13, marginBottom: 12 }}>
                    Drop / paste an image, or
                  </div>
                  <label style={{ ...S.btn(true), display: "inline-block" }}>
                    Browse…
                    <input type="file" accept="image/*" style={{ display: "none" }}
                      onChange={(e) => onFile(e.target.files[0])} />
                  </label>
                </div>
              )}
              <canvas
                ref={dispRef}
                onMouseMove={onCanvasMove}
                onMouseLeave={() => setLoupe(null)}
                onClick={onCanvasClick}
                style={{ display: hasImg ? "block" : "none", maxWidth: "100%", height: "auto",
                  cursor: mode === "pick" ? "crosshair" : "default", borderRadius: 2 }}
              />
              {mode === "pick" && loupe && (
                <div style={{ position: "absolute", top: 8, right: 8, display: "flex", alignItems: "center",
                  gap: 8, background: THEME.bg, border: `1px solid ${THEME.border}`, borderRadius: 3, padding: 6 }}>
                  <canvas ref={loupeRef} width={72} height={72}
                    style={{ width: 72, height: 72, imageRendering: "pixelated", borderRadius: 2 }} />
                  <span style={{ fontSize: 12 }}>{loupe.hex}</span>
                </div>
              )}
            </div>
            <canvas ref={srcRef} style={{ display: "none" }} />

            {hasImg && (
              <div style={{ marginTop: 14 }}>
                <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
                  <button style={S.btn(mode === "auto")} onClick={() => setMode("auto")}>Auto extract</button>
                  <button style={S.btn(mode === "pick")} onClick={() => setMode("pick")}>Eyedropper</button>
                  <label style={{ ...S.btn(false), marginLeft: "auto" }}>
                    Replace
                    <input type="file" accept="image/*" style={{ display: "none" }}
                      onChange={(e) => onFile(e.target.files[0])} />
                  </label>
                </div>

                {mode === "auto" ? (
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <span style={{ ...S.label, margin: 0 }}>Colors</span>
                    <input type="range" min={2} max={16} value={count}
                      onChange={(e) => setCount(+e.target.value)} style={{ flex: 1, accentColor: THEME.accent }} />
                    <span style={{ width: 22, textAlign: "right" }}>{count}</span>
                    <button style={S.btn(true)} onClick={extractAuto}>Extract</button>
                  </div>
                ) : (
                  <div style={{ color: THEME.muted, fontSize: 12 }}>
                    Click anywhere on the image to add that pixel as a swatch.
                  </div>
                )}
              </div>
            )}
          </div>

          {/* RIGHT: swatches + export */}
          <div style={S.panel}>
            <div style={S.label}>Group name</div>
            <input style={{ ...S.input, marginBottom: 14 }} value={group}
              onChange={(e) => setGroup(e.target.value)} />

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
              <div style={{ ...S.label, margin: 0 }}>Swatches ({swatches.length})</div>
              {swatches.length > 0 && (
                <div style={{ display: "flex", gap: 8 }}>
                  <button style={{ ...S.btn(false), padding: "4px 8px" }} onClick={dedupe}>Dedupe</button>
                  <button style={{ ...S.btn(false), padding: "4px 8px" }} onClick={() => setSwatches([])}>Clear</button>
                </div>
              )}
            </div>

            <div style={{ maxHeight: 280, overflowY: "auto", display: "flex", flexDirection: "column", gap: 6 }}>
              {swatches.length === 0 && (
                <div style={{ color: THEME.muted, fontSize: 12, padding: "20px 0", textAlign: "center" }}>
                  No swatches yet — extract or eyedrop to start.
                </div>
              )}
              {swatches.map((s, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 28, height: 28, borderRadius: 3, background: toHex(s.rgb),
                    border: `1px solid ${THEME.border}`, flexShrink: 0 }} />
                  <input style={{ ...S.input, flex: 1 }} value={s.name}
                    onChange={(e) => updateSwatch(i, { name: e.target.value })} />
                  <input style={{ ...S.input, width: 86, flexShrink: 0 }} value={toHex(s.rgb)}
                    onChange={(e) => { const rgb = parseHex(e.target.value); if (rgb) updateSwatch(i, { rgb }); }} />
                  <button onClick={() => removeSwatch(i)}
                    style={{ background: "none", border: "none", color: THEME.muted, cursor: "pointer",
                      fontSize: 16, lineHeight: 1, padding: 4 }}>×</button>
                </div>
              ))}
            </div>

            <div style={{ borderTop: `1px solid ${THEME.border}`, marginTop: 14, paddingTop: 14,
              display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              <button style={{ ...S.btn(true), gridColumn: "1 / -1" }} onClick={exportASE}>Download .ase</button>
              <button style={S.btn(false)} onClick={exportGPL}>Download .gpl</button>
              <button style={S.btn(false)} onClick={copyHex}>Copy hex</button>
              <button style={S.btn(false)} onClick={copyCSS}>Copy CSS vars</button>
              <button style={S.btn(false)} onClick={copyJSON}>Copy JSON</button>
            </div>
          </div>
        </div>
      </div>

      {toast && (
        <div style={{ position: "fixed", bottom: 20, left: "50%", transform: "translateX(-50%)",
          background: THEME.accent, color: "#fff", padding: "8px 16px", borderRadius: 3,
          fontFamily: THEME.mono, fontSize: 12, letterSpacing: "0.04em" }}>{toast}</div>
      )}
    </div>
  );
}
