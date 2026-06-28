import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import TopicNav from "./pages/TopicNav.jsx";
import { topicList } from "./content/week01Topics.js";

/**
 * PixelBudget
 * ------------------------------------------------------------------
 * An interactive teaching instrument for digital media students.
 *
 * Three lessons in one panel:
 *   1. Where image memory comes from  (pixels x channels x bit depth)
 *   2. Why Photoshop eats RAM         (every layer is another full raster)
 *   3. What DPI actually changes       (physical output size, NOT pixels/memory)
 *
 * Built around the classic worked example:
 *   2272 x 1704 px  ->  ~3.87 MP
 *   @ 72 ppi  ->  31.6" x 23.7"  (screen)
 *   @ 300 ppi ->   7.57" x 5.68" (print)
 *   Same pixels. Same memory. Different physical size.
 */

// ---- palette (Joe's oxblood / yellowed-paper system) ----------------------
const C = {
  paper: "#f5efe1",
  paperDeep: "#ece3cf",
  ink: "#2b2622",
  inkSoft: "#6b6155",
  oxblood: "#8b3a2f",
  oxbloodSoft: "#b0584a",
  rule: "#d8ccb2",
  screen: "#3f6b5e", // pine green — "screen" accent
  print: "#8b3a2f", // oxblood — "print" accent
};

// ---- presets --------------------------------------------------------------
const PRESETS = [
  { label: "Worked example", w: 2272, h: 1704 },
  { label: "1080p screen", w: 1920, h: 1080 },
  { label: "12 MP phone", w: 4000, h: 3000 },
  { label: "24 MP camera", w: 6000, h: 4000 },
  { label: "A4 @ 300dpi", w: 2480, h: 3508 },
];

// ---- color modes (channels) ----------------------------------------------
const MODES = [
  { id: "gray", label: "Grayscale", channels: 1 },
  { id: "rgb", label: "RGB", channels: 3 },
  { id: "rgba", label: "RGB + Alpha", channels: 4 },
  { id: "cmyk", label: "CMYK", channels: 4 },
];

const DEPTHS = [8, 16, 32];

// ---- helpers --------------------------------------------------------------
function fmtBytes(bytes) {
  if (!isFinite(bytes) || bytes <= 0) return "0 B";
  const units = ["B", "KB", "MB", "GB", "TB"];
  let u = 0;
  let n = bytes;
  while (n >= 1024 && u < units.length - 1) {
    n /= 1024;
    u++;
  }
  return `${n.toFixed(n < 10 && u > 0 ? 2 : n < 100 && u > 0 ? 1 : 0)} ${units[u]}`;
}

function fmtNum(n) {
  return n.toLocaleString("en-US");
}

// ===========================================================================
export default function PixelBudget() {
  const [w, setW] = useState(2272);
  const [h, setH] = useState(1704);
  const [mode, setMode] = useState("rgb");
  const [depth, setDepth] = useState(8);
  const [layers, setLayers] = useState(3);
  const [history, setHistory] = useState(0);
  const [dpi, setDpi] = useState(72);

  const channels = MODES.find((m) => m.id === mode).channels;

  const calc = useMemo(() => {
    const W = Math.max(1, Math.round(w) || 1);
    const H = Math.max(1, Math.round(h) || 1);
    const pixels = W * H;
    const mp = pixels / 1_000_000;
    const bytesPerPixel = channels * (depth / 8);
    const raster = pixels * bytesPerPixel; // one flattened full-canvas raster

    // Teaching model: composite + N full-canvas layers + history snapshots.
    // Real Photoshop is smarter (layers store only their bounding box, tiles
    // compress, etc.) — this is the worst-case "every layer fills the canvas".
    const layerMem = raster * layers;
    const historyMem = raster * history;
    const total = raster + layerMem + historyMem;

    const widthIn = W / dpi;
    const heightIn = H / dpi;

    return {
      W, H, pixels, mp, bytesPerPixel, raster,
      layerMem, historyMem, total, widthIn, heightIn,
    };
  }, [w, h, channels, depth, layers, history, dpi]);

  // physical-size visualization: scale both screen + print boxes against the
  // largest output (screen @ 72) so the size difference is honest & visible.
  const sizeViz = useMemo(() => {
    const screenW = calc.W / 72;
    const screenH = calc.H / 72;
    const printW = calc.W / 300;
    const printH = calc.H / 300;
    const maxIn = Math.max(screenW, screenH) || 1;
    const px = 150; // px per "biggest dimension"
    return {
      screen: { w: (screenW / maxIn) * px, h: (screenH / maxIn) * px, label: `${screenW.toFixed(1)}" × ${screenH.toFixed(1)}"` },
      print: { w: (printW / maxIn) * px, h: (printH / maxIn) * px, label: `${printW.toFixed(2)}" × ${printH.toFixed(2)}"` },
    };
  }, [calc.W, calc.H]);

  const css = `
  .pb-root{
    --paper:${C.paper};--paperDeep:${C.paperDeep};--ink:${C.ink};
    --inkSoft:${C.inkSoft};--ox:${C.oxblood};--oxSoft:${C.oxbloodSoft};
    --rule:${C.rule};--screen:${C.screen};--print:${C.print};
    background:var(--paper);color:var(--ink);
    font-family:Georgia,'Times New Roman',serif;
    border:1px solid var(--rule);border-radius:6px;
    max-width:760px;margin:0 auto;padding:0;overflow:hidden;
    box-shadow:0 1px 0 rgba(0,0,0,.04);
  }
  .pb-root *{box-sizing:border-box}
  .pb-mono{font-family:Menlo,'IBM Plex Mono',monospace}
  .pb-head{padding:22px 26px 18px;border-bottom:1px solid var(--rule);background:var(--paperDeep)}
  .pb-kicker{font-family:Menlo,monospace;font-size:10px;letter-spacing:.22em;
    text-transform:uppercase;color:var(--ox);margin:0 0 6px}
  .pb-title{font-style:italic;font-weight:400;font-size:26px;margin:0;line-height:1.1}
  .pb-sub{font-size:13.5px;color:var(--inkSoft);margin:7px 0 0;line-height:1.5;max-width:54ch}
  .pb-body{padding:8px 26px 26px}
  .pb-sec{padding:20px 0;border-bottom:1px solid var(--rule)}
  .pb-sec:last-child{border-bottom:none}
  .pb-secHead{display:flex;align-items:baseline;gap:10px;margin:0 0 14px}
  .pb-num{font-family:Menlo,monospace;font-size:11px;color:var(--ox);
    border:1px solid var(--ox);border-radius:3px;padding:1px 6px;line-height:1.4}
  .pb-h{font-style:italic;font-size:18px;margin:0}
  .pb-hint{font-size:12.5px;color:var(--inkSoft);margin:3px 0 0;line-height:1.45}
  .pb-row{display:flex;flex-wrap:wrap;gap:10px;align-items:flex-end}
  .pb-field{display:flex;flex-direction:column;gap:4px}
  .pb-lab{font-family:Menlo,monospace;font-size:10px;letter-spacing:.1em;
    text-transform:uppercase;color:var(--inkSoft)}
  .pb-input{font-family:Menlo,monospace;font-size:15px;width:96px;padding:7px 9px;
    border:1px solid var(--rule);border-radius:4px;background:#fff;color:var(--ink)}
  .pb-input:focus{outline:2px solid var(--oxSoft);outline-offset:1px;border-color:var(--ox)}
  .pb-chips{display:flex;flex-wrap:wrap;gap:6px;margin-top:4px}
  .pb-chip{font-family:Menlo,monospace;font-size:11.5px;padding:5px 10px;cursor:pointer;
    border:1px solid var(--rule);border-radius:999px;background:#fff;color:var(--inkSoft);
    transition:.12s}
  .pb-chip:hover{border-color:var(--oxSoft);color:var(--ox)}
  .pb-chip[data-on="true"]{background:var(--ox);border-color:var(--ox);color:#fff}
  .pb-readout{display:flex;flex-wrap:wrap;gap:18px;margin-top:14px;
    padding:13px 16px;background:var(--paperDeep);border-radius:5px}
  .pb-stat{display:flex;flex-direction:column;gap:2px}
  .pb-statV{font-family:Menlo,monospace;font-size:17px;color:var(--ink)}
  .pb-statL{font-size:11px;color:var(--inkSoft)}
  .pb-statV.ox{color:var(--ox);font-weight:600}
  .pb-stack{display:flex;flex-direction:column-reverse;gap:3px;margin:14px 0 6px}
  .pb-layer{height:18px;border-radius:3px;display:flex;align-items:center;
    padding:0 9px;font-family:Menlo,monospace;font-size:10px;color:#fff;
    background:var(--oxSoft);box-shadow:0 1px 0 rgba(0,0,0,.12)}
  .pb-layer.base{background:var(--ink)}
  .pb-layer.hist{background:#a99}
  .pb-slider{width:100%;accent-color:var(--ox);margin-top:6px}
  .pb-vizWrap{display:flex;gap:30px;align-items:flex-end;flex-wrap:wrap;
    margin-top:8px;padding:18px;background:#fff;border:1px solid var(--rule);border-radius:5px}
  .pb-vizCol{display:flex;flex-direction:column;align-items:center;gap:8px;text-align:center}
  .pb-box{border:2px solid;display:flex;align-items:center;justify-content:center;
    font-family:Menlo,monospace;font-size:9px;color:rgba(0,0,0,.35)}
  .pb-vizCap{font-family:Menlo,monospace;font-size:11px}
  .pb-vizCap b{display:block;font-size:13px;margin-bottom:1px}
  .pb-callout{margin-top:16px;padding:14px 16px;border-left:3px solid var(--ox);
    background:var(--paperDeep);border-radius:0 5px 5px 0;font-size:13.5px;line-height:1.55}
  .pb-callout b{font-style:italic}
  .pb-mark{display:flex;justify-content:space-between;font-family:Menlo,monospace;
    font-size:10px;color:var(--inkSoft);margin-top:2px}
  @media(max-width:560px){.pb-vizWrap{gap:18px}.pb-title{font-size:22px}}
  `;

  const Mode = (id) => MODES.find((m) => m.id === id).label;

  return (
    <div style={{
      maxWidth: '720px',
      margin: '0 auto',
      padding: '48px 32px',
      background: '#f5efe1',
      color: '#2a2418',
      fontFamily: 'Georgia, "Times New Roman", serif',
      lineHeight: 1.6,
      minHeight: '100vh',
    }}>
      <div style={{ marginBottom: '24px' }}>
        <Link to="/week/01" style={{
          fontFamily: 'Menlo, monospace',
          fontSize: '11px',
          color: '#8b3a2f',
          cursor: 'pointer',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          textDecoration: 'none',
          display: 'inline-block',
        }}>
          ← Back to Week 01
        </Link>
      </div>

      <div className="pb-root">
        <style>{css}</style>

      <header className="pb-head">
        <p className="pb-kicker">DMA · Digital Imaging</p>
        <h1 className="pb-title">The Pixel Budget</h1>
        <p className="pb-sub">
          A picture is just a grid of numbers. This panel shows where the
          megabytes come from, why every Photoshop layer copies the whole grid,
          and why changing DPI resizes the <em>print</em> — never the pixels.
        </p>
      </header>

      <div className="pb-body">
        {/* 1 — RESOLUTION ------------------------------------------------- */}
        <section className="pb-sec">
          <div className="pb-secHead">
            <span className="pb-num">01</span>
            <div>
              <h2 className="pb-h">How big is the grid?</h2>
              <p className="pb-hint">Width × height. Everything below scales from these two numbers.</p>
            </div>
          </div>

          <div className="pb-row">
            <label className="pb-field">
              <span className="pb-lab">Width (px)</span>
              <input className="pb-input" type="number" min={1} value={w}
                onChange={(e) => setW(+e.target.value)} />
            </label>
            <span style={{ paddingBottom: 8, color: C.inkSoft }}>×</span>
            <label className="pb-field">
              <span className="pb-lab">Height (px)</span>
              <input className="pb-input" type="number" min={1} value={h}
                onChange={(e) => setH(+e.target.value)} />
            </label>
          </div>

          <div className="pb-chips">
            {PRESETS.map((p) => (
              <button key={p.label} className="pb-chip"
                data-on={p.w === calc.W && p.h === calc.H}
                onClick={() => { setW(p.w); setH(p.h); }}>
                {p.label}
              </button>
            ))}
          </div>

          <div className="pb-readout">
            <div className="pb-stat">
              <span className="pb-statV">{fmtNum(calc.pixels)}</span>
              <span className="pb-statL">total pixels</span>
            </div>
            <div className="pb-stat">
              <span className="pb-statV ox">{calc.mp.toFixed(2)} MP</span>
              <span className="pb-statL">megapixels (px ÷ 1,000,000)</span>
            </div>
          </div>
        </section>

        {/* 2 — BYTES PER PIXEL -------------------------------------------- */}
        <section className="pb-sec">
          <div className="pb-secHead">
            <span className="pb-num">02</span>
            <div>
              <h2 className="pb-h">How heavy is each pixel?</h2>
              <p className="pb-hint">Channels × bit depth. More color info = more bytes per dot.</p>
            </div>
          </div>

          <div className="pb-field" style={{ marginBottom: 12 }}>
            <span className="pb-lab">Color mode</span>
            <div className="pb-chips">
              {MODES.map((m) => (
                <button key={m.id} className="pb-chip" data-on={mode === m.id}
                  onClick={() => setMode(m.id)}>
                  {m.label} · {m.channels}ch
                </button>
              ))}
            </div>
          </div>

          <div className="pb-field">
            <span className="pb-lab">Bit depth (per channel)</span>
            <div className="pb-chips">
              {DEPTHS.map((d) => (
                <button key={d} className="pb-chip" data-on={depth === d}
                  onClick={() => setDepth(d)}>
                  {d}-bit
                </button>
              ))}
            </div>
          </div>

          <div className="pb-readout">
            <div className="pb-stat">
              <span className="pb-statV">{calc.bytesPerPixel} B</span>
              <span className="pb-statL">{channels} ch × {depth / 8} B</span>
            </div>
            <div className="pb-stat">
              <span className="pb-statV ox">{fmtBytes(calc.raster)}</span>
              <span className="pb-statL">one flattened {Mode(mode)} raster</span>
            </div>
          </div>
        </section>

        {/* 3 — LAYERS ----------------------------------------------------- */}
        <section className="pb-sec">
          <div className="pb-secHead">
            <span className="pb-num">03</span>
            <div>
              <h2 className="pb-h">Add layers in Photoshop</h2>
              <p className="pb-hint">
                Worst case, every pixel layer is another full-canvas copy of the grid.
                That's why a "small edit" can double your file.
              </p>
            </div>
          </div>

          <div className="pb-field">
            <span className="pb-lab">Layers: {layers}</span>
            <input className="pb-slider" type="range" min={0} max={20} value={layers}
              onChange={(e) => setLayers(+e.target.value)} />
            <div className="pb-mark"><span>0</span><span>20 layers</span></div>
          </div>

          <div className="pb-field" style={{ marginTop: 10 }}>
            <span className="pb-lab">History states: {history}</span>
            <input className="pb-slider" type="range" min={0} max={20} value={history}
              onChange={(e) => setHistory(+e.target.value)} />
            <div className="pb-mark"><span>0</span><span>20 undo snapshots</span></div>
          </div>

          {/* visual stack */}
          <div className="pb-stack">
            <div className="pb-layer base">composite · {fmtBytes(calc.raster)}</div>
            {Array.from({ length: Math.min(layers, 20) }).map((_, i) => (
              <div key={"L" + i} className="pb-layer">layer {layers - i}</div>
            ))}
            {Array.from({ length: Math.min(history, 20) }).map((_, i) => (
              <div key={"H" + i} className="pb-layer hist">history snapshot</div>
            ))}
          </div>

          <div className="pb-readout">
            <div className="pb-stat">
              <span className="pb-statV">{fmtBytes(calc.layerMem)}</span>
              <span className="pb-statL">{layers} layers</span>
            </div>
            <div className="pb-stat">
              <span className="pb-statV">{fmtBytes(calc.historyMem)}</span>
              <span className="pb-statL">{history} history states</span>
            </div>
            <div className="pb-stat">
              <span className="pb-statV ox">{fmtBytes(calc.total)}</span>
              <span className="pb-statL">live RAM (composite + layers + history)</span>
            </div>
          </div>

          <div className="pb-callout">
            A saved <b>.psd</b> compresses this, but while you work, Photoshop holds it
            <em> uncompressed </em> in RAM — composite, every layer, and a snapshot per
            undo. {fmtBytes(calc.raster)} just became <b>{fmtBytes(calc.total)}</b>.
          </div>
        </section>

        {/* 4 — DPI -------------------------------------------------------- */}
        <section className="pb-sec">
          <div className="pb-secHead">
            <span className="pb-num">04</span>
            <div>
              <h2 className="pb-h">Now set the DPI</h2>
              <p className="pb-hint">
                Display size (inches) = pixels ÷ DPI. Drag it and watch the
                inches move while the pixel count and memory sit perfectly still.
              </p>
            </div>
          </div>

          <div className="pb-field">
            <span className="pb-lab">Resolution: {dpi} ppi</span>
            <input className="pb-slider" type="range" min={36} max={600} step={1} value={dpi}
              onChange={(e) => setDpi(+e.target.value)} />
            <div className="pb-mark">
              <span>36</span>
              <span style={{ color: C.screen }}>72 · screen</span>
              <span style={{ color: C.print }}>300 · print</span>
              <span>600</span>
            </div>
          </div>

          <div className="pb-readout">
            <div className="pb-stat">
              <span className="pb-statV ox">{calc.widthIn.toFixed(2)}" × {calc.heightIn.toFixed(2)}"</span>
              <span className="pb-statL">output size @ {dpi} ppi</span>
            </div>
            <div className="pb-stat">
              <span className="pb-statV">{fmtNum(calc.pixels)}</span>
              <span className="pb-statL">pixels — unchanged</span>
            </div>
            <div className="pb-stat">
              <span className="pb-statV">{fmtBytes(calc.raster)}</span>
              <span className="pb-statL">memory — unchanged</span>
            </div>
          </div>

          {/* screen vs print physical-size viz */}
          <div className="pb-vizWrap">
            <div className="pb-vizCol">
              <div className="pb-box" style={{
                width: sizeViz.screen.w, height: sizeViz.screen.h, borderColor: C.screen,
              }}>same pixels</div>
              <div className="pb-vizCap" style={{ color: C.screen }}>
                <b>72 ppi · screen</b>{sizeViz.screen.label}
              </div>
            </div>
            <div className="pb-vizCol">
              <div className="pb-box" style={{
                width: sizeViz.print.w, height: sizeViz.print.h, borderColor: C.print,
              }}>same pixels</div>
              <div className="pb-vizCap" style={{ color: C.print }}>
                <b>300 ppi · print</b>{sizeViz.print.label}
              </div>
            </div>
          </div>

          <div className="pb-callout">
            Both boxes hold the <b>exact same image</b>. At 72 ppi the dots are spread
            thin, so it sprawls across the monitor; at 300 ppi they're packed tight for
            crisp print, so it shrinks. <b>DPI is a label, not a resize</b> — until you
            resample, the file never gains or loses a single pixel. Post to the web at
            72 ppi; send to the printer at 300.
          </div>
        </section>
      </div>

      <div style={{ marginTop: '32px' }}>
        <TopicNav topicList={topicList} topicKey="pixel-budget" weekNum="01" />
      </div>
    </div>
  </div>
);
}
