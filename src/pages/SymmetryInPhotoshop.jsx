import React, { useRef, useEffect, useState, useCallback } from "react";

/**
 * SymmetryInPhotoshop.jsx — pLAtform lesson component
 * "Symmetry in Photoshop — the four types + the Symmetry (butterfly) tool"
 *
 * Self-contained. Sibling to SilhouetteSymmetry.jsx / Mirror Study / Mirror Lab.
 * Design system: oxblood #8b3a2f · paper cream #f5efe1 · IBM Plex Mono · Newsreader.
 *
 * Signature element: a live multi-mode symmetry painter that reproduces the
 * Photoshop butterfly tool — Vertical / Horizontal / Dual Axis / Mandala — with
 * black-grow / white-carve (X) exactly like the video.
 *
 * ── REFERENCE IMAGES ──────────────────────────────────────────────────────
 * Drop your own stills in here (relative path in the Vite build, or a full URL).
 * Any slot left null falls back to the built-in diagram, so the lesson is
 * complete out of the box and upgrades the moment you add a frame.
 */
const REFERENCE = {
  reflective: null,     // e.g. "/frames/reflective.png"
  glide: null,
  rotational: null,
  translation: null,
  vertical: null,
  horizontal: null,
  dualAxis: null,
  diagonal: null,
  circle: null,
  mandala: null,
};

const PAPER = "#f5efe1";
const INK = "#1a1512";
const OXBLOOD = "#8b3a2f";

/* A single biomorphic blob, drawn in a 0..100 box, reused across diagrams. */
const BLOB =
  "M50,16 C66,12 84,22 85,40 C86,55 73,64 78,77 C82,89 65,94 53,87 C44,82 40,90 29,85 C14,78 12,58 22,49 C30,41 19,33 26,25 C33,18 40,20 50,16 Z";

/* ------------------------------------------------------------------ */
/* Diagrams for the four classical symmetry types                     */
/* ------------------------------------------------------------------ */

const diaProps = { viewBox: "0 0 220 130", role: "img" };

const ReflectiveDia = () => (
  <svg {...diaProps} aria-label="Reflective symmetry diagram">
    <line x1="110" y1="8" x2="110" y2="122" stroke={OXBLOOD} strokeWidth="1.5" strokeDasharray="4 4" />
    <g transform="translate(16,26) scale(0.72)" fill={INK}><path d={BLOB} /></g>
    <g transform="translate(204,26) scale(-0.72,0.72)" fill={INK}><path d={BLOB} /></g>
  </svg>
);

const GlideDia = () => (
  <svg {...diaProps} aria-label="Glide reflective symmetry diagram">
    <line x1="110" y1="8" x2="110" y2="122" stroke={OXBLOOD} strokeWidth="1.5" strokeDasharray="4 4" />
    <g transform="translate(20,8) scale(0.6)" fill={INK}><path d={BLOB} /></g>
    <g transform="translate(200,52) scale(-0.6,0.6)" fill={INK}><path d={BLOB} /></g>
  </svg>
);

const RotationalDia = () => (
  <svg {...diaProps} aria-label="Rotational symmetry diagram">
    <g transform="translate(58,20) scale(0.55)" fill={INK}><path d={BLOB} /></g>
    <g transform="rotate(180 110 65) translate(58,20) scale(0.55)" fill={INK} opacity="0.82"><path d={BLOB} /></g>
    <circle cx="110" cy="65" r="3" fill={OXBLOOD} />
  </svg>
);

const TranslationDia = () => (
  <svg {...diaProps} aria-label="Translation symmetry diagram">
    <g transform="translate(14,32) scale(0.58)" fill={INK}><path d={BLOB} /></g>
    <g transform="translate(118,32) scale(0.58)" fill={INK} opacity="0.82"><path d={BLOB} /></g>
    <path d="M104,66 l14,0 m-4,-4 l4,4 -4,4" stroke={OXBLOOD} strokeWidth="1.5" fill="none" />
  </svg>
);

/* ------------------------------------------------------------------ */
/* Small axis icons for the butterfly modes                           */
/* ------------------------------------------------------------------ */

const modeIcon = { viewBox: "0 0 60 60", role: "img" };
const dash = { stroke: OXBLOOD, strokeWidth: 1.6, strokeDasharray: "3 3", fill: "none" };
const mark = { fill: INK, opacity: 0.85 };

const VerticalIcon = () => (
  <svg {...modeIcon}><line x1="30" y1="6" x2="30" y2="54" {...dash} /><circle cx="20" cy="26" r="5" {...mark} /><circle cx="40" cy="26" r="5" {...mark} /></svg>
);
const HorizontalIcon = () => (
  <svg {...modeIcon}><line x1="6" y1="30" x2="54" y2="30" {...dash} /><circle cx="26" cy="20" r="5" {...mark} /><circle cx="26" cy="40" r="5" {...mark} /></svg>
);
const DualIcon = () => (
  <svg {...modeIcon}><line x1="30" y1="6" x2="30" y2="54" {...dash} /><line x1="6" y1="30" x2="54" y2="30" {...dash} /><circle cx="19" cy="19" r="4.5" {...mark} /><circle cx="41" cy="19" r="4.5" {...mark} /><circle cx="19" cy="41" r="4.5" {...mark} /><circle cx="41" cy="41" r="4.5" {...mark} /></svg>
);
const DiagonalIcon = () => (
  <svg {...modeIcon}><line x1="10" y1="10" x2="50" y2="50" {...dash} /><circle cx="38" cy="20" r="5" {...mark} /><circle cx="20" cy="38" r="5" {...mark} /></svg>
);
const CircleIcon = () => (
  <svg {...modeIcon}><circle cx="30" cy="30" r="18" {...dash} /><circle cx="30" cy="12" r="3.6" {...mark} /><circle cx="48" cy="30" r="3.6" {...mark} /><circle cx="30" cy="48" r="3.6" {...mark} /><circle cx="12" cy="30" r="3.6" {...mark} /></svg>
);
const MandalaIcon = () => (
  <svg {...modeIcon}>
    {[0, 45, 90, 135].map((a) => (
      <line key={a} x1="30" y1="30" x2={30 + 24 * Math.cos((a * Math.PI) / 180)} y2={30 + 24 * Math.sin((a * Math.PI) / 180)} {...dash} />
    ))}
    <circle cx="30" cy="14" r="3.4" {...mark} /><circle cx="46" cy="30" r="3.4" {...mark} /><circle cx="30" cy="46" r="3.4" {...mark} /><circle cx="14" cy="30" r="3.4" {...mark} />
  </svg>
);

/* ------------------------------------------------------------------ */
/* Content                                                            */
/* ------------------------------------------------------------------ */

const TYPES = [
  {
    key: "reflective",
    name: "Reflective",
    Dia: ReflectiveDia,
    how: "Duplicate the layer (Cmd/Ctrl+J), move the copy over, then Free Transform (Cmd/Ctrl+T) → right-click → Flip Horizontal. Nudge the spacing — the gap between the two halves is where the interesting negative shapes live.",
  },
  {
    key: "glide",
    name: "Glide reflective",
    Dia: GlideDia,
    how: "Group your reflected pair (Cmd/Ctrl+G), duplicate it, drag it across, then slide one copy along the axis so it's offset. Reflected, but shifted — it reads as a march rather than a mirror.",
  },
  {
    key: "rotational",
    name: "Rotational",
    Dia: RotationalDia,
    how: "Duplicate, Free Transform (Cmd/Ctrl+T), and rotate the copy around a shared center. Repeat at even angles for a pinwheel feel.",
  },
  {
    key: "translation",
    name: "Translation",
    Dia: TranslationDia,
    how: "Duplicate and offset — no flip, no rotate. The same shape repeated at a steady interval. Simple, but it's the engine behind patterns.",
  },
];

const MODES = [
  { key: "vertical", name: "Vertical", Icon: VerticalIcon, note: "Mirror across a vertical line — the workhorse for faces, creatures, pendants." },
  { key: "horizontal", name: "Horizontal", Icon: HorizontalIcon, note: "Mirror top to bottom — good for reflections and landscapes." },
  { key: "dualAxis", name: "Dual axis", Icon: DualIcon, note: "Vertical and horizontal at once — four-way, instantly ornamental." },
  { key: "diagonal", name: "Diagonal", Icon: DiagonalIcon, note: "Mirror across the diagonal for off-kilter, dynamic marks." },
  { key: "circle", name: "Circle", Icon: CircleIcon, note: "Marks wrap around a circular path — great for rings and halos." },
  { key: "mandala", name: "Mandala", Icon: MandalaIcon, note: "Set the number of segments and paint a full radial kaleidoscope." },
];

const SHORTCUTS = [
  { k: "Cmd/Ctrl + J", d: "Duplicate the layer" },
  { k: "Cmd/Ctrl + T", d: "Free Transform (flip / rotate)" },
  { k: "Right-click ▸ Flip", d: "Flip horizontal or vertical inside transform" },
  { k: "Cmd/Ctrl + G", d: "Group layers (for glide reflective)" },
  // Photoshop UI icons for the Symmetry menu
];
const VerticalMenuIcon = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2">
    <line x1="8" y1="1" x2="8" y2="15" />
    <line x1="6" y1="3" x2="6" y2="13" strokeDasharray="1 2" opacity="0.5" />
    <line x1="10" y1="3" x2="10" y2="13" strokeDasharray="1 2" opacity="0.5" />
  </svg>
);
const HorizontalMenuIcon = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2">
    <line x1="1" y1="8" x2="15" y2="8" />
    <line x1="3" y1="6" x2="13" y2="6" strokeDasharray="1 2" opacity="0.5" />
    <line x1="3" y1="10" x2="13" y2="10" strokeDasharray="1 2" opacity="0.5" />
  </svg>
);
const DualMenuIcon = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2">
    <line x1="8" y1="1" x2="8" y2="15" />
    <line x1="1" y1="8" x2="15" y2="8" />
  </svg>
);
const DiagonalMenuIcon = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2">
    <line x1="2" y1="14" x2="14" y2="2" />
  </svg>
);
const WavyMenuIcon = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M1 8 C 4 2, 6 14, 8 8 C 10 2, 12 14, 15 8" />
  </svg>
);
const CircleMenuIcon = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2">
    <circle cx="8" cy="8" r="6" />
  </svg>
);
const SpiralMenuIcon = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2">
    <path d="M8,8 A2,2 0 0,0 6,10 A4,4 0 0,0 10,14 A6,6 0 0,0 14,8 A8,8 0 0,0 6,2" />
  </svg>
);
const ParallelMenuIcon = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2">
    <line x1="5" y1="1" x2="5" y2="15" />
    <line x1="11" y1="1" x2="11" y2="15" />
  </svg>
);
const RadialMenuIcon = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2">
    <circle cx="8" cy="8" r="1.5" fill="currentColor" />
    <line x1="8" y1="2" x2="8" y2="14" />
    <line x1="2" y1="8" x2="14" y2="8" />
    <line x1="3.5" y1="3.5" x2="12.5" y2="12.5" />
    <line x1="3.5" y1="12.5" x2="12.5" y2="3.5" />
  </svg>
);
const MandalaMenuIcon = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2">
    <circle cx="8" cy="8" r="2.5" />
    <path d="M8,1 A3,3 0 0,1 11,4 A3,3 0 0,1 8,7 A3,3 0 0,1 5,4 A3,3 0 0,1 8,1 Z" />
    <path d="M8,7 A3,3 0 0,1 11,10 A3,3 0 0,1 8,13 A3,3 0 0,1 5,10 A3,3 0 0,1 8,7 Z" transform="rotate(45 8 8)" />
  </svg>
);

const ButterflyIcon = ({ size = 20, style = {} }) => (
  <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.8" style={{ width: size, height: size, ...style }}>
    <path d="M16 8.5c-.5-1.2-1.8-2.5-3.5-2.5C9.5 6 7 8 7 11.5c0 3.5 2 6 9 8.5 7-2.5 9-5 9-8.5C25 8 22.5 6 19.5 6c-1.7 0-3 1.3-3.5 2.5z" />
    <path d="M14 6c0-1.5 1-2.5 2-2.5s2 1 2 2.5" strokeWidth="1.2" />
    <line x1="16" y1="2" x2="16" y2="30" strokeDasharray="2.5 2.5" />
  </svg>
);

/* ------------------------------------------------------------------ */
/* Live multi-mode symmetry painter                                   */
/* ------------------------------------------------------------------ */

const CW = 760;
const CH = 460;

function SymmetryPainter() {
  const canvasRef = useRef(null);
  const drawingRef = useRef(false);
  const lastRef = useRef(null);

  const [mode, setMode] = useState("vertical"); // off | vertical | horizontal | dual | mandala
  const [segments, setSegments] = useState(6);
  const [color, setColor] = useState("ink");
  const [size, setSize] = useState(30);
  const [soft, setSoft] = useState(false);
  const [note, setNote] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(true);

  const refs = useRef({});
  refs.current = { mode, segments, color, size, soft };

  const fillPaper = useCallback(() => {
    const cv = canvasRef.current;
    if (!cv) return;
    const ctx = cv.getContext("2d");
    ctx.fillStyle = PAPER;
    ctx.fillRect(0, 0, CW, CH);
  }, []);

  useEffect(() => { fillPaper(); }, [fillPaper]);

  // All mirrored/rotated copies of a point for the current mode
  const points = useCallback((x, y) => {
    const { mode, segments } = refs.current;
    const cx = CW / 2, cy = CH / 2;
    if (mode === "off") return [[x, y]];
    if (mode === "vertical") return [[x, y], [CW - x, y]];
    if (mode === "horizontal") return [[x, y], [x, CH - y]];
    if (mode === "dual") return [[x, y], [CW - x, y], [x, CH - y], [CW - x, CH - y]];
    
    // mandala: rotational copies + mirrored copies about center
    const dx = x - cx, dy = y - cy;
    const r = Math.hypot(dx, dy);
    const a = Math.atan2(dy, dx);
    const results = [];
    const step = (Math.PI * 2) / segments;
    for (let i = 0; i < segments; i++) {
      const angle = a + i * step;
      results.push([cx + Math.cos(angle) * r, cy + Math.sin(angle) * r]);
      // reflected sector
      const refAngle = -a + i * step;
      results.push([cx + Math.cos(refAngle) * r, cy + Math.sin(refAngle) * r]);
    }
    return results;
  }, []);

  const dab = useCallback((ctx, x, y) => {
    const { color, size, soft } = refs.current;
    ctx.save();
    
    // Brush settings
    ctx.fillStyle = color === "ink" ? INK : PAPER;
    const copies = points(x, y);

    copies.forEach(([cx, cy]) => {
      ctx.beginPath();
      if (soft) {
        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, size / 2);
        const col = color === "ink" ? "26,21,18" : "245,239,225";
        grad.addColorStop(0, `rgba(${col}, 1)`);
        grad.addColorStop(0.3, `rgba(${col}, 0.8)`);
        grad.addColorStop(1, `rgba(${col}, 0)`);
        ctx.fillStyle = grad;
        ctx.arc(cx, cy, size / 2, 0, Math.PI * 2);
      } else {
        ctx.arc(cx, cy, size / 2, 0, Math.PI * 2);
      }
      ctx.fill();
    });
    ctx.restore();
  }, [points]);

  const stroke = useCallback((x, y) => {
    const cv = canvasRef.current;
    if (!cv) return;
    const ctx = cv.getContext("2d");
    
    const last = lastRef.current;
    if (last) {
      const dx = x - last.x;
      const dy = y - last.y;
      const dist = Math.hypot(dx, dy);
      const n = Math.ceil(dist / 2); // interpolate
      for (let i = 1; i <= n; i++) dab(ctx, last.x + (dx * i) / n, last.y + (dy * i) / n);
    } else {
      dab(ctx, x, y);
    }
    lastRef.current = { x, y };
  }, [dab]);

  const toCanvas = (e) => {
    const cv = canvasRef.current;
    const rect = cv.getBoundingClientRect();
    const src = e.touches ? e.touches[0] : e;
    return { x: ((src.clientX - rect.left) / rect.width) * CW, y: ((src.clientY - rect.top) / rect.height) * CH };
  };
  const start = (e) => { e.preventDefault(); drawingRef.current = true; lastRef.current = null; const p = toCanvas(e); stroke(p.x, p.y); };
  const move = (e) => { if (!drawingRef.current) return; e.preventDefault(); const p = toCanvas(e); stroke(p.x, p.y); };
  const end = () => { drawingRef.current = false; lastRef.current = null; };

  useEffect(() => {
    const onKey = (e) => {
      const k = e.key.toLowerCase();
      if (k === "x") setColor((c) => (c === "ink" ? "paper" : "ink"));
      if (k === "d") setColor("ink");
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const PAINT_MODES = [
    { id: "off", label: "Symmetry Off" },
    { id: "vertical", label: "Vertical" },
    { id: "horizontal", label: "Horizontal" },
    { id: "dual", label: "Dual" },
    { id: "mandala", label: "Mandala" },
  ];

  const handleMenuClick = (itemId) => {
    if (itemId === "off" || itemId === "vertical" || itemId === "horizontal" || itemId === "dual" || itemId === "mandala") {
      setMode(itemId);
      setNote(null);
    } else {
      const displayNames = {
        diagonal: "Diagonal",
        wavy: "Wavy",
        circle: "Circle",
        spiral: "Spiral",
        parallel: "Parallel Lines",
        radial: "Radial",
      };
      setNote(`${displayNames[itemId] || itemId} Symmetry is a Photoshop-exclusive mode! Try Vertical, Horizontal, Dual, or Mandala in this web lab.`);
      setTimeout(() => setNote(null), 5000);
    }
  };

  return (
    <div className="ss-painter-layout">
      <div className="ss-painter-col">
        <div className="ss-painter">
          <div className="ss-painter-stage">
            <canvas
              ref={canvasRef}
              width={CW}
              height={CH}
              className="ss-canvas"
              onMouseDown={start}
              onMouseMove={move}
              onMouseUp={end}
              onMouseLeave={end}
              onTouchStart={start}
              onTouchMove={move}
              onTouchEnd={end}
            />
            {mode === "vertical" && <div className="ss-axis ss-axis-v" aria-hidden="true" />}
            {mode === "horizontal" && <div className="ss-axis ss-axis-h" aria-hidden="true" />}
            {mode === "dual" && (<><div className="ss-axis ss-axis-v" /><div className="ss-axis ss-axis-h" /></>)}
            {mode === "mandala" && <div className="ss-axis-dot" aria-hidden="true" />}
            <span className="ss-stage-tag">{mode === "off" ? "Symmetry off" : `${mode}, live`}</span>
          </div>

          <div className="ss-controls">
            <div className="ss-control-group">
              <span className="ss-control-label">Symmetry Mode</span>
              <div className="ss-seg ss-seg-wrap">
                {PAINT_MODES.map((m) => (
                  <button key={m.id} className={mode === m.id ? "is-on" : ""} onClick={() => setMode(m.id)}>{m.id === "off" ? "Off" : m.label}</button>
                ))}
              </div>
            </div>

            {mode === "mandala" && (
              <div className="ss-control-group">
                <span className="ss-control-label">Segments — {segments}</span>
                <input type="range" min="3" max="16" value={segments} onChange={(e) => setSegments(Number(e.target.value))} className="ss-range" />
              </div>
            )}

            <div className="ss-control-group">
              <span className="ss-control-label">Brush</span>
              <button className={"ss-swap " + (color === "ink" ? "is-ink" : "is-paper")} onClick={() => setColor((c) => (c === "ink" ? "paper" : "ink"))} title="Press X to swap">
                <span className="ss-swap-chip" />
                {color === "ink" ? "Black — add" : "White — carve"}
                <span className="ss-swap-key">X</span>
              </button>
            </div>

            <div className="ss-control-group">
              <span className="ss-control-label">Size</span>
              <input type="range" min="6" max="90" value={size} onChange={(e) => setSize(Number(e.target.value))} className="ss-range" />
            </div>

            <div className="ss-control-group">
              <span className="ss-control-label">Edge</span>
              <div className="ss-seg">
                <button className={!soft ? "is-on" : ""} onClick={() => setSoft(false)}>Hard</button>
                <button className={soft ? "is-on" : ""} onClick={() => setSoft(true)}>Soft</button>
              </div>
            </div>

            <button className="ss-clear" onClick={fillPaper}>Clear</button>
          </div>
          <p className="ss-painter-hint">
            This is the butterfly tool in miniature. Switch the axis, then paint —
            every stroke is mirrored live. <b>X</b> flips to white so you can carve the
            negative back out, exactly like the video.
          </p>
        </div>
      </div>

      <div className="ps-sidebar-col">
        {/* Photoshop Options Bar Simulation */}
        <div className="ps-options-bar">
          <div className="ps-options-bar-left">
            <span className="ps-options-bar-tool">🖌️</span>
            <span className="ps-options-bar-stat">Size: {size}px</span>
            <span className="ps-options-bar-stat">Opacity: 100%</span>
          </div>
          <button className={"ps-options-butterfly-btn " + (isMenuOpen ? "is-open" : "") + (mode !== "off" ? " is-active" : "")} onClick={() => setIsMenuOpen(!isMenuOpen)} title="Photoshop Symmetry Menu Options" style={{ display: 'flex', alignItems: 'center', padding: '4px 6px' }}>
            <img src="/symmetry_icon.png" alt="Butterfly icon" style={{ width: '16px', height: '16px', objectFit: 'contain' }} />
            <span style={{ fontSize: "7px", marginLeft: "4.5px" }}>▼</span>
          </button>
        </div>

        {/* Photoshop Styled Dropdown Menu */}
        {isMenuOpen && (
          <div className="ps-dropdown-menu-image-container" style={{ position: 'relative' }}>
            <img 
              src="/symmetry_dropdown.png" 
              alt="Photoshop Symmetry Dropdown Menu" 
              style={{ 
                width: '100%', 
                height: 'auto', 
                display: 'block', 
                border: '1.5px solid #1a1a1a', 
                borderRadius: '4px',
                boxShadow: '0 4px 14px rgba(0,0,0,0.45)' 
              }} 
            />
            {/* Transparent clickable overlay areas to control painter mode */}
            <div 
              onClick={() => handleMenuClick("off")}
              style={{ position: 'absolute', top: '1%', left: '0', width: '100%', height: '7.5%', cursor: 'pointer' }} 
              title="Symmetry Off"
            />
            <div 
              onClick={() => handleMenuClick("vertical")}
              style={{ position: 'absolute', top: '15.5%', left: '0', width: '100%', height: '6%', cursor: 'pointer' }} 
              title="Vertical"
            />
            <div 
              onClick={() => handleMenuClick("horizontal")}
              style={{ position: 'absolute', top: '21.5%', left: '0', width: '100%', height: '6%', cursor: 'pointer' }} 
              title="Horizontal"
            />
            <div 
              onClick={() => handleMenuClick("dual")}
              style={{ position: 'absolute', top: '27.5%', left: '0', width: '100%', height: '6%', cursor: 'pointer' }} 
              title="Dual Axis"
            />
            <div 
              onClick={() => handleMenuClick("diagonal")}
              style={{ position: 'absolute', top: '33.5%', left: '0', width: '100%', height: '6%', cursor: 'pointer' }} 
              title="Diagonal"
            />
            <div 
              onClick={() => handleMenuClick("wavy")}
              style={{ position: 'absolute', top: '39.5%', left: '0', width: '100%', height: '6%', cursor: 'pointer' }} 
              title="Wavy"
            />
            <div 
              onClick={() => handleMenuClick("circle")}
              style={{ position: 'absolute', top: '45.5%', left: '0', width: '100%', height: '6%', cursor: 'pointer' }} 
              title="Circle"
            />
            <div 
              onClick={() => handleMenuClick("spiral")}
              style={{ position: 'absolute', top: '51.5%', left: '0', width: '100%', height: '6%', cursor: 'pointer' }} 
              title="Spiral"
            />
            <div 
              onClick={() => handleMenuClick("parallel")}
              style={{ position: 'absolute', top: '57.5%', left: '0', width: '100%', height: '6%', cursor: 'pointer' }} 
              title="Parallel Lines"
            />
            <div 
              onClick={() => handleMenuClick("radial")}
              style={{ position: 'absolute', top: '63.5%', left: '0', width: '100%', height: '6%', cursor: 'pointer' }} 
              title="Radial..."
            />
            <div 
              onClick={() => handleMenuClick("mandala")}
              style={{ position: 'absolute', top: '69.5%', left: '0', width: '100%', height: '6%', cursor: 'pointer' }} 
              title="Mandala..."
            />
          </div>
        )}

        {/* Photoshop Exclusive Mode Alert */}
        {note && (
          <div className="ps-note-bubble">
            <span style={{ fontSize: "14px", marginRight: "6px" }}>ℹ️</span>
            <span>{note}</span>
          </div>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Reference figure (image slot with diagram fallback)                */
/* ------------------------------------------------------------------ */

function RefFigure({ src, Dia, caption }) {
  return (
    <figure className="ss-ref">
      {src ? (
        <img src={src} alt={caption} className="ss-ref-img" />
      ) : (
        <div className="ss-ref-ph">
          <Dia />
          <span className="ss-ref-ph-tag">add your still</span>
        </div>
      )}
      <figcaption>{caption}</figcaption>
    </figure>
  );
}

function YoutubeVideoCard({ videoId, title, description, num }) {
  const [play, setPlay] = useState(false);

  return (
    <div className="ss-card" style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
      <div 
        style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden', background: '#000', cursor: 'pointer' }} 
        onClick={() => !play && setPlay(true)}
      >
        {play ? (
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
            title={title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
          ></iframe>
        ) : (
          <>
            <img 
              src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`} 
              onError={(e) => { e.target.src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`; }}
              alt={title} 
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }}
            />
            {/* Play Button Overlay */}
            <div style={{
              position: 'absolute',
              top: 0, left: 0, right: 0, bottom: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'rgba(0, 0, 0, 0.25)',
              transition: 'background 0.2s ease',
            }} className="video-overlay-hover">
              <div style={{
                width: '54px',
                height: '54px',
                borderRadius: '50%',
                background: 'var(--oxblood)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--paper)',
                boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
                transition: 'transform 0.2s ease, background 0.2s ease'
              }} className="play-button-circle">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          </>
        )}
      </div>
      <div style={{ padding: '20px', flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div>
          <span className="ss-eyebrow" style={{ fontSize: '10px' }}>Video {num}</span>
          <h3 className="ss-card-title" style={{ marginTop: '4px', marginBottom: '8px', fontSize: '18px' }}>{title}</h3>
          <p style={{ fontSize: '13px', color: 'var(--muted)', margin: 0, fontFamily: 'sans-serif', lineHeight: '1.45' }}>{description}</p>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Lesson                                                             */
/* ------------------------------------------------------------------ */

export default function SymmetryInPhotoshop() {
  return (
    <div className="ss-root">
      <style>{CSS}</style>

      <header className="ss-hero">
        <div className="ss-hero-meta">
          <span>pLAtform</span><span className="ss-dot" /><span>Photoshop · Symmetry</span>
        </div>
        <h1 className="ss-hero-title">Symmetry in <em>Photoshop</em></h1>
        <p className="ss-hero-dek">
          Two ways to build symmetry — duplicate-and-transform, or paint straight
          into it with the Symmetry tool — and the four kinds of symmetry you can
          combine to get shapes you'd never have drawn on purpose.
        </p>
        <div className="ss-hero-rule" />
        <div className="ss-objectives">
          <span className="ss-obj-label">In this lesson</span>
          <ul>
            <li>Make symmetry by duplicating and transforming layers</li>
            <li>Reflective, glide reflective, rotational, and translation</li>
            <li>Paint live symmetry with the butterfly tool</li>
            <li>Define a shape as a brush and carve the negative with X</li>
          </ul>
        </div>
      </header>

      {/* Two ways */}
      <section className="ss-section">
        <div className="ss-process-head">
          <span className="ss-eyebrow">Start here</span>
          <h2 className="ss-h2">Two ways to get symmetry</h2>
        </div>
        <div className="ss-two-col">
          <div className="ss-card">
            <span className="ss-mini-num">A</span>
            <h3 className="ss-card-title">Duplicate &amp; transform</h3>
            <p>Works in almost any program. Copy a layer, then flip, rotate, or offset the copy. It's all about <em>duplicating and transforming</em> — the spacing you choose is where the surprises are.</p>
          </div>
          <div className="ss-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <span className="ss-mini-num">B</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
                <img src="/symmetry_icon.png" alt="Symmetry butterfly icon" style={{ width: '28px', height: '28px', objectFit: 'contain', flexShrink: 0 }} />
                <h3 className="ss-card-title" style={{ margin: 0 }}>The Symmetry tool</h3>
              </div>
              <p>A Photoshop special. Grab the Brush, click the little <em>butterfly</em> in the options bar, pick an axis, and every stroke mirrors itself as you paint.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Four types */}
      <section className="ss-section">
        <div className="ss-process-head">
          <span className="ss-eyebrow">Method A</span>
          <h2 className="ss-h2">The four types</h2>
          <p className="ss-demo-dek">Each is just duplicate-and-transform with a different move. Swap the diagrams for your own frames by filling the <code>REFERENCE</code> object at the top of the file.</p>
        </div>
        <div className="ss-types">
          {TYPES.map((t) => (
            <div className="ss-type" key={t.key}>
              <RefFigure src={REFERENCE[t.key]} Dia={t.Dia} caption={t.name} />
              <p className="ss-type-how">{t.how}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Live painter */}
      <section className="ss-section">
        <div className="ss-demo-head">
          <span className="ss-eyebrow">Method B · Live</span>
          <h2 className="ss-h2">The Symmetry tool</h2>
          <p className="ss-demo-dek">
            The real thing lives under the butterfly icon on the Brush tool. Here's a
            working stand-in — switch modes and paint to feel how each axis behaves
            before you're in Photoshop.
          </p>
        </div>
        <SymmetryPainter />

        <div className="ss-tips">
          <div className="ss-tip">
            <span className="ss-tip-k">Define Brush Preset</span>
            <p>Drop an abstract shape onto the canvas, marquee-select it, and choose Edit → Define Brush Preset. Now that weird shape stamps as a brush — feed it into any symmetry mode for instant ornament.</p>
          </div>
          <div className="ss-tip">
            <span className="ss-tip-k">Paint the negative — X</span>
            <p>Hit X to put white in the foreground and paint back into your marks. Cutting away is half the design, especially in mandala mode where it opens up the center.</p>
          </div>
        </div>
      </section>

      {/* Mode gallery */}
      <section className="ss-section">
        <div className="ss-process-head">
          <span className="ss-eyebrow">Reference</span>
          <h2 className="ss-h2">Butterfly modes</h2>
        </div>
        <div className="ss-modes">
          {MODES.map((m) => (
            <div className="ss-mode" key={m.key}>
              <div className="ss-mode-icon">
                {REFERENCE[m.key] ? <img src={REFERENCE[m.key]} alt={m.name} /> : <m.Icon />}
              </div>
              <h4>{m.name}</h4>
              <p>{m.note}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Shortcuts */}
      <section className="ss-section">
        <div className="ss-card ss-shortcuts">
          <h3 className="ss-card-title">Shortcuts &amp; commands</h3>
          <ul className="ss-key-list">
            {SHORTCUTS.map((s) => (
              <li key={s.k}>
                <span className="ss-key">{s.k}</span>
                <span className="ss-key-d">{s.d}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Video Guides */}
      <section className="ss-section">
        <div className="ss-process-head">
          <span className="ss-eyebrow">Video Tutorials</span>
          <h2 className="ss-h2">Workflow &amp; technique guides</h2>
          <p className="ss-demo-dek">Watch these step-by-step video tutorials to master Photoshop's symmetry tools and character silhouette painting techniques.</p>
        </div>
        <div className="ss-two-col">
          <YoutubeVideoCard 
            videoId="nNbUBRY3HC8"
            title="Symmetry in Photoshop"
            description="Learn how to use Photoshop's butterfly tool, manage vertical and horizontal axes, and quickly build out symmetrical shapes and decorative designs."
            num="01"
          />
          <YoutubeVideoCard 
            videoId="rvULP02Trk4"
            title="Symmetry with Silhouettes"
            description="Explore how symmetry tools can speed up your character design process, from initial thumbnail ideas to full structural block-outs."
            num="02"
          />
        </div>
      </section>

      <footer className="ss-footer">
        <span>pLAtform · Ryman Arts</span>
        <span>Symmetry in Photoshop</span>
      </footer>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Styles                                                             */
/* ------------------------------------------------------------------ */

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;0,6..72,600;1,6..72,400;1,6..72,500&family=IBM+Plex+Mono:wght@400;500;600&display=swap');

.ss-root{
  --paper:#f5efe1; --ink:#1a1512; --oxblood:#8b3a2f; --oxblood-deep:#6e2c23;
  --line:rgba(26,21,18,.14); --muted:rgba(26,21,18,.60);
  background:var(--paper); color:var(--ink);
  font-family:'IBM Plex Mono',ui-monospace,monospace;
  max-width:1080px; margin:0 auto; padding:clamp(20px,4vw,56px);
  -webkit-font-smoothing:antialiased;
}
.ss-root *{box-sizing:border-box;}
.ss-root em{font-style:italic;}
.ss-root code{font-family:inherit;background:rgba(139,58,47,.1);color:var(--oxblood-deep);padding:1px 5px;font-size:.92em;}

/* Hero */
.ss-hero{ padding-bottom:clamp(28px,5vw,52px); border-bottom:2px solid var(--ink); }
.ss-hero-meta{ display:flex; align-items:center; gap:12px; font-size:12px; letter-spacing:.14em; text-transform:uppercase; color:var(--oxblood); font-weight:600; }
.ss-dot{width:5px;height:5px;border-radius:50%;background:var(--oxblood);}
.ss-hero-title{ font-family:'Newsreader',Georgia,serif; font-weight:500; font-size:clamp(44px,9vw,104px); line-height:.92; letter-spacing:-.02em; margin:.28em 0 .12em; }
.ss-hero-title em{color:var(--oxblood); font-weight:500;}
.ss-hero-dek{ font-family:'Newsreader',Georgia,serif; font-size:clamp(17px,2.1vw,22px); line-height:1.5; max-width:62ch; margin:0; }
.ss-hero-rule{height:1px;background:var(--line);margin:clamp(24px,4vw,40px) 0;}
.ss-objectives{display:flex;flex-wrap:wrap;gap:20px 40px;align-items:flex-start;}
.ss-obj-label{ font-size:11px;letter-spacing:.16em;text-transform:uppercase; color:var(--muted);font-weight:600;padding-top:3px;white-space:nowrap; }
.ss-objectives ul{margin:0;padding:0;list-style:none;display:grid;gap:8px;}
.ss-objectives li{position:relative;padding-left:20px;font-size:14.5px;line-height:1.4;max-width:48ch;}
.ss-objectives li::before{ content:"";position:absolute;left:0;top:.62em;width:9px;height:9px;background:var(--oxblood);transform:rotate(45deg); }

/* Sections */
.ss-section{padding:clamp(32px,6vw,64px) 0;border-bottom:1px solid var(--line);}
.ss-eyebrow{ font-size:11px;letter-spacing:.18em;text-transform:uppercase; color:var(--oxblood);font-weight:600; }
.ss-h2{ font-family:'Newsreader',Georgia,serif;font-weight:500; font-size:clamp(28px,4.4vw,46px);line-height:1.02;letter-spacing:-.01em;margin:.18em 0 0; }
.ss-process-head{margin-bottom:30px;max-width:66ch;}
.ss-demo-head{margin-bottom:24px;max-width:66ch;}
.ss-demo-dek{font-size:14.5px;line-height:1.55;color:var(--muted);margin:14px 0 0;}

/* Cards / two-col */
.ss-two-col{display:grid;grid-template-columns:1fr 1fr;gap:clamp(20px,3vw,32px);}
.ss-card{border:1.5px solid var(--ink);padding:clamp(20px,3vw,30px);position:relative;}
.ss-mini-num{ position:absolute;top:18px;right:20px;font-family:'Newsreader',serif;font-size:34px;font-weight:500;color:var(--oxblood);line-height:1; }
.ss-card-title{ font-family:'Newsreader',Georgia,serif;font-weight:500;font-size:23px;margin:0 0 14px;line-height:1.05; }
.ss-card p{font-size:14px;line-height:1.6;margin:0;color:var(--ink);}
.ss-card em{color:var(--oxblood);font-weight:500;}

/* Four types */
.ss-types{display:grid;grid-template-columns:1fr 1fr;gap:clamp(20px,3.5vw,40px);}
.ss-type{display:flex;flex-direction:column;gap:14px;}
.ss-ref{margin:0;}
.ss-ref-img{display:block;width:100%;aspect-ratio:220/130;object-fit:cover;border:1.5px solid var(--ink);background:#fff;}
.ss-ref-ph{ position:relative;border:1.5px solid var(--ink);background:#fbf7ee; aspect-ratio:220/130;display:grid;place-items:center;padding:12px; }
.ss-ref-ph svg{width:100%;height:100%;}
.ss-ref-ph-tag{ position:absolute;bottom:8px;right:8px;font-size:9px;letter-spacing:.12em;text-transform:uppercase; color:var(--muted);border:1px solid var(--line);padding:2px 6px;background:var(--paper); }
.ss-ref figcaption{ margin-top:10px;font-size:12px;letter-spacing:.14em;text-transform:uppercase;font-weight:600;color:var(--ink); }
.ss-type-how{font-size:13.5px;line-height:1.58;color:var(--muted);margin:0;}

/* Painter */
.ss-painter{border:2px solid var(--ink);background:var(--paper);box-shadow:8px 8px 0 var(--ink);}
.ss-painter-stage{position:relative;line-height:0;border-bottom:2px solid var(--ink);}
.ss-canvas{display:block;width:100%;height:auto;touch-action:none;cursor:crosshair;background:var(--paper);}
.ss-axis{position:absolute;pointer-events:none;}
.ss-axis-v{top:0;bottom:0;left:50%;border-left:1px dashed rgba(139,58,47,.5);}
.ss-axis-h{left:0;right:0;top:50%;border-top:1px dashed rgba(139,58,47,.5);}
.ss-axis-dot{position:absolute;left:50%;top:50%;width:7px;height:7px;margin:-3.5px 0 0 -3.5px;border-radius:50%;background:rgba(139,58,47,.7);pointer-events:none;}
.ss-stage-tag{ position:absolute;top:12px;left:12px;font-size:10px;letter-spacing:.16em;text-transform:uppercase;font-weight:600;color:var(--paper);background:var(--oxblood);padding:4px 9px;line-height:1; }
.ss-controls{display:flex;flex-wrap:wrap;align-items:flex-end;gap:16px 24px;padding:16px clamp(14px,3vw,22px);}
.ss-control-group{display:flex;flex-direction:column;gap:7px;}
.ss-control-label{font-size:10px;letter-spacing:.14em;text-transform:uppercase;color:var(--muted);font-weight:600;}

.ss-seg{display:inline-flex;border:1.5px solid var(--ink);}
.ss-seg.ss-seg-wrap{flex-wrap:wrap;}
.ss-seg button{font-family:inherit;font-size:12.5px;font-weight:500;color:var(--ink);background:transparent;border:none;padding:8px 13px;cursor:pointer;}
.ss-seg button + button{border-left:1.5px solid var(--ink);}
.ss-seg button.is-on{background:var(--ink);color:var(--paper);}

.ss-swap{display:inline-flex;align-items:center;gap:9px;cursor:pointer;font-family:inherit;font-size:13px;font-weight:500;color:var(--ink);background:transparent;border:1.5px solid var(--ink);padding:8px 10px;}
.ss-swap-chip{width:15px;height:15px;border:1.5px solid var(--ink);}
.ss-swap.is-ink .ss-swap-chip{background:var(--ink);}
.ss-swap.is-paper .ss-swap-chip{background:var(--paper);}
.ss-swap-key{font-size:10px;font-weight:600;color:var(--muted);border:1px solid var(--line);padding:1px 5px;margin-left:2px;}

.ss-range{-webkit-appearance:none;appearance:none;width:150px;height:2px;background:var(--ink);cursor:pointer;}
.ss-range::-webkit-slider-thumb{-webkit-appearance:none;appearance:none;width:16px;height:16px;background:var(--oxblood);border:2px solid var(--ink);cursor:pointer;}
.ss-range::-moz-range-thumb{width:16px;height:16px;background:var(--oxblood);border:2px solid var(--ink);cursor:pointer;border-radius:0;}

.ss-clear{margin-left:auto;font-family:inherit;font-size:12px;letter-spacing:.08em;text-transform:uppercase;font-weight:600;color:var(--oxblood);background:transparent;border:1.5px solid var(--oxblood);padding:9px 16px;cursor:pointer;transition:.12s ease;}
.ss-clear:hover{background:var(--oxblood);color:var(--paper);}
.ss-painter-hint{font-size:13px;line-height:1.55;color:var(--muted);margin:0;padding:0 clamp(14px,3vw,22px) 18px;}
.ss-painter-hint b{color:var(--ink);}

/* Tips */
.ss-tips{display:grid;grid-template-columns:1fr 1fr;gap:clamp(16px,3vw,26px);margin-top:26px;}
.ss-tip{border-left:2px solid var(--oxblood);padding:4px 0 4px 18px;}
.ss-tip-k{font-size:12px;letter-spacing:.06em;text-transform:uppercase;font-weight:600;color:var(--oxblood);}
.ss-tip p{font-size:13.5px;line-height:1.58;color:var(--ink);margin:8px 0 0;}

/* Mode gallery */
.ss-modes{display:grid;grid-template-columns:repeat(3,1fr);gap:2px;border:1.5px solid var(--ink);background:var(--ink);}
.ss-mode{background:var(--paper);padding:clamp(16px,2.6vw,24px);}
.ss-mode-icon{width:56px;height:56px;margin-bottom:14px;}
.ss-mode-icon svg{width:100%;height:100%;}
.ss-mode-icon img{width:100%;height:100%;object-fit:cover;border:1px solid var(--line);}
.ss-mode h4{font-family:'Newsreader',serif;font-weight:600;font-size:19px;margin:0 0 6px;}
.ss-mode p{font-size:12.5px;line-height:1.5;color:var(--muted);margin:0;}

/* Shortcuts */
.ss-shortcuts{max-width:640px;}
.ss-key-list{list-style:none;margin:0;padding:0;display:grid;gap:0;}
.ss-key-list li{display:flex;align-items:center;gap:16px;padding:11px 0;border-top:1px solid var(--line);}
.ss-key-list li:first-child{border-top:none;}
.ss-key{flex:none;min-width:158px;font-size:12px;font-weight:600;color:var(--ink);background:var(--paper);border:1.5px solid var(--ink);padding:6px 10px;text-align:center;box-shadow:2px 2px 0 var(--ink);}
.ss-key-d{flex:1;font-size:13.5px;color:var(--ink);}

/* Footer */
.ss-footer{display:flex;justify-content:space-between;flex-wrap:wrap;gap:10px;padding-top:28px;font-size:11px;letter-spacing:.1em;text-transform:uppercase;color:var(--muted);}

/* Responsive */
@media (max-width:760px){
  .ss-two-col,.ss-types,.ss-tips{grid-template-columns:1fr;}
  .ss-modes{grid-template-columns:1fr 1fr;}
  .ss-painter{box-shadow:5px 5px 0 var(--ink);}
  .ss-clear{margin-left:0;}
  .ss-key{min-width:120px;}
}
@media (max-width:460px){ .ss-modes{grid-template-columns:1fr;} }

.ss-root :focus-visible{outline:2px solid var(--oxblood);outline-offset:2px;}

/* Layout and Sidebar */
.ss-painter-layout {
  display: grid;
  grid-template-columns: 1fr 260px;
  gap: clamp(20px, 3.5vw, 32px);
  align-items: start;
}
.ss-painter-col {
  flex: 1;
  min-width: 0;
}
.ps-sidebar-col {
  display: flex;
  flex-direction: column;
  gap: 16px;
  position: sticky;
  top: 24px;
}

/* Options Bar simulation */
.ps-options-bar {
  background: #2b2b2b;
  border: 1.5px solid #1c1c1c;
  border-radius: 4px;
  padding: 6px 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  color: #dfdfdf;
  box-shadow: 0 2px 6px rgba(0,0,0,0.2);
}
.ps-options-bar-left {
  display: flex;
  align-items: center;
  gap: 12px;
}
.ps-options-bar-tool {
  font-size: 14px;
}
.ps-options-bar-stat {
  font-size: 11px;
  color: #b5b5b5;
  border-right: 1px solid #404040;
  padding-right: 12px;
}
.ps-options-bar-stat:last-child {
  border-right: none;
}
.ps-options-butterfly-btn {
  background: transparent;
  border: 1px solid transparent;
  color: #b5b5b5;
  padding: 4px 8px;
  border-radius: 3px;
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: all 0.1s ease;
}
.ps-options-butterfly-btn:hover {
  background: #3e3e3e;
  color: #ffffff;
}
.ps-options-butterfly-btn.is-active {
  color: #ffcc00;
}
.ps-options-butterfly-btn.is-open {
  background: #1d73e7;
  color: #ffffff;
  border-color: #0f62fe;
}

/* Dropdown Menu simulation */
.ps-dropdown-menu {
  background: #282828;
  border: 1.5px solid #1a1a1a;
  border-radius: 4px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  color: #dfdfdf;
  box-shadow: 0 4px 14px rgba(0,0,0,0.45);
}
.ps-dropdown-header {
  padding: 6px 12px;
  background: #353535;
  border-bottom: 1.5px solid #1a1a1a;
  border-radius: 3px 3px 0 0;
  font-size: 10px;
  font-weight: 700;
  color: #b5b5b5;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.ps-dropdown-header-close {
  cursor: pointer;
  font-size: 13px;
  color: #a0a0a0;
  line-height: 1;
}
.ps-dropdown-header-close:hover {
  color: #ffffff;
}
.ps-dropdown-list {
  padding: 3px 0;
  margin: 0;
  list-style: none;
}
.ps-dropdown-item {
  display: flex;
  align-items: center;
  padding: 6px 10px;
  font-size: 12.5px;
  cursor: pointer;
  position: relative;
  line-height: 1.3;
}
.ps-dropdown-item:hover:not(.is-disabled) {
  background: #1d73e7;
  color: #ffffff;
}
.ps-dropdown-item.is-active {
  background: #3a3a3a;
  color: #ffffff;
  font-weight: 500;
}
.ps-dropdown-item.is-active:hover {
  background: #1d73e7;
}
.ps-dropdown-item.is-disabled {
  color: #656565;
  cursor: not-allowed;
}
.ps-dropdown-check {
  width: 14px;
  font-size: 10px;
  margin-right: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #1d73e7;
}
.ps-dropdown-item:hover:not(.is-disabled) .ps-dropdown-check {
  color: #ffffff;
}
.ps-dropdown-icon-wrap {
  width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 8px;
  color: #a0a0a0;
}
.ps-dropdown-item:hover:not(.is-disabled) .ps-dropdown-icon-wrap {
  color: #ffffff;
}
.ps-dropdown-label {
  flex: 1;
}
.ps-dropdown-divider {
  height: 1px;
  background: #3e3e3e;
  margin: 3px 0;
}
.ps-dropdown-badge {
  font-size: 8px;
  background: #383838;
  color: #909090;
  padding: 1px 4px;
  border-radius: 2px;
  font-weight: 600;
}
.ps-dropdown-item:hover:not(.is-disabled) .ps-dropdown-badge {
  background: rgba(255,255,255,0.2);
  color: #ffffff;
}

/* Alert Notification Bubble */
.ps-note-bubble {
  background: #fdf6e2;
  border: 1.5px solid #d4c9a8;
  border-radius: 4px;
  padding: 10px 12px;
  font-size: 12.5px;
  line-height: 1.45;
  color: #5c4a2f;
  display: flex;
  align-items: flex-start;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
  animation: fadeIn 0.2s ease;
}

@media (max-width: 1024px) {
  .ss-painter-layout {
    grid-template-columns: 1fr;
  }
  .ps-sidebar-col {
    position: static;
  }
}

.video-overlay-hover {
  transition: background 0.2s ease;
}
.video-overlay-hover:hover {
  background: rgba(0, 0, 0, 0.45) !important;
}
.video-overlay-hover:hover .play-button-circle {
  transform: scale(1.1);
  background: var(--oxblood-deep) !important;
}
`;
