import React, { useEffect, useRef, useState, useCallback } from "react";
import stripImg from "./assets/zark-strip.png";
import logoImg from "./assets/zark-logo.png";
import initialSketchImg from "./assets/zark-initial-sketch.jpg";
import siteThumbImg from "./assets/zark-site-thumb.jpg";
import siteHtml from "./assets/zark-site.html?raw";

import phase1Img from "./assets/ZARK-capstone-sections/01-Blockouts-and-Thumbnails.png";
import phase2Img from "./assets/ZARK-capstone-sections/02-Rendered-Environments.png";
import phase3Img from "./assets/ZARK-capstone-sections/03-Character-Development.png";
import phase4Img from "./assets/ZARK-capstone-sections/04-Narrative-Storyboards-and-Iterations.png";
import phase5Img from "./assets/ZARK-capstone-sections/05-Hero-Project.png";
import phase6Img from "./assets/ZARK-capstone-sections/06-Closing-Statement-and-Contact.png";

const PHASE_IMAGES = [
  phase1Img,
  phase2Img,
  phase3Img,
  phase4Img,
  phase5Img,
  phase6Img,
];

/* ============================================================
   FullProjectFlow — Capstone footer component
   Demonstrates the phased Capstone development & presentation
   flow using the ZARK example project: initial sketchbook
   sketch → refined layout board (animated tour) → six phases.
   pLAtform design system: oxblood / paper cream / IBM Plex
   Mono / Newsreader. Self-contained; no external CSS needed.
   ============================================================ */

const OXBLOOD = "#8b3a2f";
const CREAM = "#f5efe1";
const INK = "#231f1c";
const MONO = "'IBM Plex Mono', ui-monospace, monospace";
const SERIF = "'Newsreader', Georgia, serif";

const IMG_W = 914;
const IMG_H = 349;

/* Panel regions of the refined strip, in source-image pixels */
const PANEL_PX = [
  { x0: 18, x1: 155 },
  { x0: 150, x1: 290 },
  { x0: 285, x1: 420 },
  { x0: 415, x1: 575 },
  { x0: 570, x1: 755 },
  { x0: 750, x1: 905 },
];
const PANEL_Y = { y0: 6, y1: 272 };
const BRAND_PX = { x0: 8, x1: 906, y0: 272, y1: 336 };

const PANELS = PANEL_PX.map(({ x0, x1 }) => ({
  x: x0 / IMG_W,
  cx: (x0 + x1) / 2 / IMG_W,
  w: (x1 - x0) / IMG_W,
  y: PANEL_Y.y0 / IMG_H,
  h: (PANEL_Y.y1 - PANEL_Y.y0) / IMG_H,
}));

const PHASES = [
  {
    title: "Blockouts & Thumbnails",
    body: "The sequence begins with environment blockouts and character thumbnails. These quick exploratory sketches allow students to test composition, silhouettes, scale, visual storytelling, and different creative directions before committing to a final design.",
  },
  {
    title: "Rendered Environments",
    body: "Chosen thumbnails graduate into fully rendered environments — the stages, lighting, and settings that establish the tone of the project world.",
  },
  {
    title: "Character Development",
    body: "Heroes, sidekicks, and creatures — designed in turnarounds and expression passes so each cast member reads clearly at every scale.",
  },
  {
    title: "Narrative, Storyboards, and Iterations",
    body: "Storyboards and narrative studies start the worldbuilding process and give a visual representation of the full project — or act as a deeper ideation phase if the project is more autobiographical.",
  },
  {
    title: "Hero Project",
    body: "The presentation then builds toward the Hero Project — the main Capstone deliverable. In this example, the Hero Project is ZARK, an isometric 1980s-style video game concept. This section receives the greatest visual emphasis because it represents the final integration of the project's environments, characters, narrative, visual identity, and technical development.",
  },
  {
    title: "Closing Statement & Contact",
    body: "The presentation closes with an artist statement and contact information — the professional wrapper that turns a project into a portfolio piece.",
  },
];

/* CSS crop of one region of the strip image */
function cropStyle({ x0, x1, y0, y1 }) {
  const cw = x1 - x0;
  const ch = y1 - y0;
  return {
    aspectRatio: `${cw} / ${ch}`,
    backgroundImage: `url(${stripImg})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: `${(IMG_W / cw) * 100}% auto`,
    backgroundPosition: `${(x0 / (IMG_W - cw)) * 100}% ${
      (y0 / (IMG_H - ch)) * 100
    }%`,
  };
}

export default function FullProjectFlow() {
  const carouselRef = useRef(null);
  const [idx, setIdx] = useState(-1); // -1 = full board, 0..5 = phases
  const [paused, setPaused] = useState(false);
  const [dims, setDims] = useState({ w: 0, h: 0 });
  const [siteOpen, setSiteOpen] = useState(false);
  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* measure the carousel viewport */
  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;
    const measure = () =>
      setDims({ w: el.clientWidth, h: el.clientHeight });
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  /* lock page scroll + Esc to close while the site example is open */
  useEffect(() => {
    if (!siteOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e) => e.key === "Escape" && setSiteOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [siteOpen]);

  /* auto-advance */
  useEffect(() => {
    if (reduced) return;
    const t = setInterval(() => {
      if (!paused) setIdx((i) => (i >= PANELS.length - 1 ? -1 : i + 1));
    }, 3200);
    return () => clearInterval(t);
  }, [paused, reduced]);

  /* transform for the current state */
  const HUD_H = 44;
  const viewH = Math.max(dims.h - HUD_H, 1);
  const trackW = (viewH * IMG_W) / IMG_H;
  let transform, spot;
  if (idx === -1 || dims.w === 0) {
    const scale = Math.min(dims.w / trackW, 1) || 1;
    transform = `translate(-50%,-50%) translateY(${-HUD_H / 2}px) scale(${scale})`;
    spot = { opacity: 0 };
  } else {
    const p = PANELS[idx];
    const zoom = Math.min((dims.w * 0.92) / (p.w * trackW), 0.94 / p.h, 2.6);
    const ox = (0.5 - p.cx) * trackW * zoom;
    const oy = (0.5 - (p.y + p.h / 2)) * viewH * zoom - HUD_H / 2;
    transform = `translate(-50%,-50%) translateY(${oy}px) translateX(${ox}px) scale(${zoom})`;
    spot = {
      opacity: 1,
      left: `${p.x * 100}%`,
      top: `${p.y * 100}%`,
      width: `${p.w * 100}%`,
      height: `${p.h * 100}%`,
    };
  }

  const jump = useCallback((i) => setIdx(i), []);

  return (
    <section style={st.wrap}>
      {/* ---------- header ---------- */}
      <div style={st.eyebrow}>CAPSTONE · FULL PROJECT FLOW</div>
      <h2 style={st.title}>
        From Sketchbook to Showcase{" "}
        <img src={logoImg} alt="ZARK logo" style={st.titleLogo} />
      </h2>
      <p style={st.lede}>
        This long-format panel demonstrates a phased approach to developing
        and presenting a Capstone project. Rather than showing only the final
        piece, the presentation reveals the creative process — from the
        earliest ideas and experiments through the completed Hero Project.
      </p>

      {/* ---------- the initial sketch ---------- */}
      <div style={st.stepLabel}>00 · THE INITIAL SKETCH</div>
      <figure style={st.figure}>
        <img
          src={initialSketchImg}
          alt="Original blue-pencil sketchbook spread planning the ZARK presentation layout"
          style={st.sketchPhoto}
        />
        <figcaption style={st.caption}>
          It starts on paper: one sketchbook spread in blue pencil, planning
          every section of the presentation before anything is built.
        </figcaption>
      </figure>

      {/* ---------- animated layout board ---------- */}
      <div style={st.stepLabel}>01 · THE REFINED LAYOUT BOARD</div>
      <div
        ref={carouselRef}
        style={st.carousel}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        aria-label="Animated tour of the refined layout board"
      >
        <div style={{ ...st.track, height: viewH, transform }}>
          <img src={stripImg} alt="Refined ink layout board for the ZARK Capstone presentation" style={st.trackImg} />
          <div style={{ ...st.spot, ...spot }} />
        </div>
        <div style={{ ...st.hud, height: HUD_H }}>
          <span style={st.hudLabel}>
            {idx === -1 ? "Full board" : `${idx + 1} / 6 — ${PHASES[idx].title}`}
          </span>
          <span style={st.dots}>
            {PANELS.map((_, i) => (
              <button
                key={i}
                onClick={() => jump(i)}
                aria-label={`Show phase ${i + 1}: ${PHASES[i].title}`}
                aria-current={i === idx}
                style={{
                  ...st.dot,
                  background: i === idx ? OXBLOOD : "transparent",
                }}
              />
            ))}
          </span>
        </div>
      </div>

      {/* ---------- six phases ---------- */}
      <div style={st.stepLabel}>02 · THE SIX PHASES</div>
      <div style={st.phases}>
        {PHASES.map((ph, i) => (
          <article key={i} style={st.phase}>
            <div style={st.phaseArtWrap}>
              <img
                src={PHASE_IMAGES[i]}
                alt={`Sketch panel: ${ph.title}`}
                style={st.phaseArtImg}
              />
            </div>
            <div>
              <div style={st.phaseNum}>{String(i + 1).padStart(2, "0")}</div>
              <h3 style={st.phaseTitle}>{ph.title}</h3>
              <p style={st.phaseBody}>{ph.body}</p>
            </div>
          </article>
        ))}
      </div>

      {/* ---------- the live site example ---------- */}
      <div style={st.stepLabel}>03 · THE FINISHED SITE EXAMPLE</div>
      <button
        type="button"
        onClick={() => setSiteOpen(true)}
        style={st.siteThumbBtn}
        aria-haspopup="dialog"
      >
        <img
          src={siteThumbImg}
          alt="Preview of the finished ZARK project website"
          style={st.siteThumbImg}
        />
        <span style={st.siteThumbLabel}>
          OPEN THE FULL SITE EXAMPLE →
        </span>
      </button>
      <p style={st.caption}>
        The layout board built out as a working one-page project website —
        its own typography and visual identity, exactly as a Capstone
        deliverable would ship.
      </p>

      {siteOpen && (
        <div role="dialog" aria-modal="true" aria-label="ZARK project website example" style={st.overlay}>
          <div style={st.overlayBar}>
            <button
              type="button"
              onClick={() => setSiteOpen(false)}
              style={st.backBtn}
            >
              ← BACK TO CAPSTONE
            </button>
            <span style={st.overlayTitle}>
              SITE EXAMPLE · ZARK — full project flow
            </span>
          </div>
          <iframe
            srcDoc={siteHtml}
            title="ZARK project website example"
            style={st.overlayFrame}
          />
        </div>
      )}

      {/* ---------- branding strip ---------- */}
      <div
        role="img"
        aria-label="Branded throughout — logo: ZARK"
        style={{ ...cropStyle(BRAND_PX), ...st.brandStrip }}
      />
      <div style={st.brandNote}>
        PROJECT BRANDING · LOGO · TYPOGRAPHY · VISUAL IDENTITY — CARRIED
        THROUGHOUT
      </div>
    </section>
  );
}

/* ---------- styles (pLAtform design system) ---------- */
const st = {
  wrap: {
    background: CREAM,
    color: INK,
    border: `2px solid ${INK}`,
    padding: "2.5rem clamp(1rem, 4vw, 3rem) 2rem",
    fontFamily: SERIF,
    maxWidth: 980,
    margin: "0 auto",
  },
  eyebrow: {
    fontFamily: MONO,
    fontSize: ".7rem",
    letterSpacing: ".18em",
    color: OXBLOOD,
    marginBottom: ".6rem",
  },
  title: {
    fontFamily: SERIF,
    fontWeight: 500,
    fontSize: "clamp(1.6rem, 4vw, 2.3rem)",
    lineHeight: 1.15,
    margin: "0 0 .8rem",
    display: "flex",
    alignItems: "center",
    gap: ".7rem",
    flexWrap: "wrap",
  },
  titleLogo: { height: "1.2em", width: "auto" },
  lede: {
    fontSize: "1.08rem",
    lineHeight: 1.6,
    maxWidth: "62ch",
    margin: "0 0 2.2rem",
  },
  stepLabel: {
    fontFamily: MONO,
    fontSize: ".68rem",
    letterSpacing: ".15em",
    color: OXBLOOD,
    borderTop: `1px solid ${OXBLOOD}`,
    paddingTop: ".55rem",
    margin: "2.2rem 0 .9rem",
  },
  figure: { margin: 0 },
  sketchPhoto: {
    display: "block",
    width: "100%",
    border: `2px solid ${INK}`,
  },
  caption: {
    fontFamily: MONO,
    fontSize: ".72rem",
    color: "#6d655c",
    marginTop: ".5rem",
    lineHeight: 1.5,
  },
  carousel: {
    position: "relative",
    overflow: "hidden",
    height: "min(60vw, 480px)",
    border: `2px solid ${INK}`,
    background: "#fff",
  },
  track: {
    position: "absolute",
    top: "50%",
    left: "50%",
    aspectRatio: `${IMG_W} / ${IMG_H}`,
    transition: "transform 1.1s cubic-bezier(.5,.05,.2,1)",
    willChange: "transform",
  },
  trackImg: { position: "absolute", inset: 0, width: "100%", height: "100%" },
  spot: {
    position: "absolute",
    border: `3px dashed ${OXBLOOD}`,
    boxShadow: "0 0 0 2000px rgba(245,239,225,.5)",
    transition: "all 1.1s cubic-bezier(.5,.05,.2,1)",
    pointerEvents: "none",
  },
  hud: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: ".75rem",
    padding: "0 .8rem",
    background: CREAM,
    borderTop: `2px dashed ${INK}`,
  },
  hudLabel: { fontFamily: MONO, fontSize: ".72rem", letterSpacing: ".04em" },
  dots: { display: "flex", gap: ".4rem" },
  dot: {
    width: 12,
    height: 12,
    borderRadius: "50%",
    border: `2px solid ${INK}`,
    cursor: "pointer",
    padding: 0,
  },
  phases: { display: "grid", gap: "2rem" },
  phase: {
    display: "grid",
    gridTemplateColumns: "minmax(120px, 200px) 1fr",
    gap: "1.4rem",
    alignItems: "start",
  },
  phaseArtWrap: { border: `2px solid ${INK}`, background: "#fff", width: "100%", overflow: "hidden", borderRadius: "2px" },
  phaseArtImg: { display: "block", width: "100%", height: "auto", objectFit: "contain" },
  phaseNum: {
    fontFamily: MONO,
    fontSize: ".7rem",
    color: OXBLOOD,
    letterSpacing: ".15em",
    marginBottom: ".25rem",
  },
  phaseTitle: {
    fontFamily: SERIF,
    fontWeight: 600,
    fontSize: "1.25rem",
    margin: "0 0 .4rem",
  },
  phaseBody: { margin: 0, lineHeight: 1.6, fontSize: ".98rem", maxWidth: "58ch" },
  siteThumbBtn: {
    display: "block",
    width: "100%",
    padding: 0,
    border: `2px solid ${INK}`,
    background: "#fff",
    cursor: "pointer",
    textAlign: "left",
    fontFamily: MONO,
  },
  siteThumbImg: { display: "block", width: "100%" },
  siteThumbLabel: {
    display: "block",
    padding: ".7rem .9rem",
    fontFamily: MONO,
    fontSize: ".72rem",
    letterSpacing: ".12em",
    color: CREAM,
    background: OXBLOOD,
  },
  overlay: {
    position: "fixed",
    inset: 0,
    zIndex: 1000,
    display: "flex",
    flexDirection: "column",
    background: CREAM,
  },
  overlayBar: {
    display: "flex",
    alignItems: "center",
    gap: "1rem",
    padding: ".55rem .9rem",
    borderBottom: `2px solid ${INK}`,
    background: CREAM,
    flex: "0 0 auto",
  },
  backBtn: {
    fontFamily: MONO,
    fontSize: ".7rem",
    letterSpacing: ".1em",
    color: CREAM,
    background: OXBLOOD,
    border: `2px solid ${INK}`,
    padding: ".45rem .8rem",
    cursor: "pointer",
  },
  overlayTitle: {
    fontFamily: MONO,
    fontSize: ".68rem",
    letterSpacing: ".12em",
    color: "#6d655c",
  },
  overlayFrame: {
    flex: 1,
    width: "100%",
    border: "none",
    background: "#E3F0F7",
  },
  brandStrip: {
    marginTop: "2.4rem",
    border: `2px solid ${INK}`,
    background: "#fff",
    width: "100%",
  },
  brandNote: {
    fontFamily: MONO,
    fontSize: ".62rem",
    letterSpacing: ".14em",
    color: "#6d655c",
    textAlign: "center",
    marginTop: ".7rem",
  },
};
