import React, { useMemo, useState, useEffect, useRef } from "react";

/**
 * CapstoneFooter.jsx
 * pLAtform — the Capstone brief, condensed into a giant footer.
 *
 * Every link is an in-page anchor into <CapstoneWorldBuilding />, whose
 * sections carry the matching ids (cap-start, cap-hero … cap-campaign,
 * cap-close). Nothing here touches your router, so nothing can land on a
 * blank page.
 *
 * ── ON OTHER PAGES ────────────────────────────────────────────────────
 * Bare anchors only resolve on the page that has those sections. If you
 * drop this footer site-wide, set basePath to wherever the brief lives:
 *
 *   <CapstoneFooter />                        → #cap-hero  (brief page)
 *   <CapstoneFooter basePath="/capstone" />   → /capstone#cap-hero
 *
 * With basePath set, pass your router's Link so it doesn't full-reload:
 *
 *   import { Link } from "react-router-dom";
 *   <CapstoneFooter basePath="/capstone" linkComponent={Link} />
 * ──────────────────────────────────────────────────────────────────────
 *
 * Props (all optional):
 *   basePath       "" (default) for same-page anchors, or the brief's path.
 *   linkComponent  your router's Link (receives `to`). Only needed with basePath.
 *   progress       {hero,brand,…} booleans. If omitted, reads the same
 *                  localStorage key the brief page writes ("platform.capstone").
 *   showcase       { label, month (0-indexed), day } — defaults to Sept 19.
 */

const SHOWCASE_DEFAULT = { label: "September 19", month: 8, day: 19 };
const STORAGE_KEY = "platform.capstone";

/* The seven parts — ids match the brief page's section ids. */
const PARTS = [
  { id: "hero", n: "01", label: "Hero", full: "Hero Project", gloss: "The centerpiece" },
  { id: "brand", n: "02", label: "Brand", full: "Brand Design", gloss: "Name, logo, type, color" },
  { id: "statement", n: "03", label: "Statement", full: "Artist Statement", gloss: "The conceptual foundation" },
  { id: "website", n: "04", label: "Website", full: "Project Website", gloss: "Explore at your own pace" },
  { id: "video", n: "05", label: "Video", full: "Process Video", gloss: "The creative journey" },
  { id: "print", n: "06", label: "Print", full: "Printed Elements", gloss: "The physical presentation" },
  { id: "campaign", n: "07", label: "Campaign", full: "Brand Campaign", gloss: "Optional extension", optional: true },
];

/* The order of operations, from the brief. */
const ORDER = [
  { k: "Foundation", label: "Theme & statement", id: "statement" },
  { k: "Centerpiece", label: "Hero project", id: "hero" },
  { k: "Extracted", label: "Brand identity", id: "brand" },
];

const CARRIERS = [
  { label: "Website", id: "website" },
  { label: "Video", id: "video" },
  { label: "Print", id: "print" },
  { label: "Campaign", id: "campaign", optional: true },
];

const STEMS = [
  "I made this as a statement about\u2026",
  "This represents my feelings or experiences around\u2026",
  "I built this world, product, story, or brand to explore\u2026",
];

function daysUntil(showcase) {
  const now = new Date();
  const past =
    now.getMonth() > showcase.month ||
    (now.getMonth() === showcase.month && now.getDate() > showcase.day);
  const year = past ? now.getFullYear() + 1 : now.getFullYear();
  const target = new Date(year, showcase.month, showcase.day);
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  return { days: Math.round((target - today) / 86400000), year };
}

function useStoredProgress(override) {
  const [stored, setStored] = useState({});
  useEffect(() => {
    if (override) return;
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setStored(JSON.parse(raw));
    } catch {
      /* storage unavailable — the band just reads as untouched */
    }
  }, [override]);
  return override || stored;
}

export default function CapstoneFooter({
  basePath = "",
  linkComponent,
  progress,
  showcase = SHOWCASE_DEFAULT,
}) {
  const done = useStoredProgress(progress);
  const { days, year } = useMemo(() => daysUntil(showcase), [showcase]);
  const count = PARTS.filter((p) => done[p.id]).length;
  const rootRef = useRef(null);
  const [lit, setLit] = useState(false);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => e.isIntersecting && setLit(true),
      { rootMargin: "0px 0px -15% 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  /**
   * One link renderer. Same-page anchors scroll smoothly and never navigate,
   * so there is no route to match and no blank page. With basePath set it
   * hands off to your router's Link if you gave it one.
   */
  const A = ({ id, children, ...rest }) => {
    const hash = `#cap-${id}`;
    if (basePath) {
      const to = `${basePath}${hash}`;
      if (linkComponent) {
        const Comp = linkComponent;
        return (
          <Comp to={to} {...rest}>
            {children}
          </Comp>
        );
      }
      return (
        <a href={to} {...rest}>
          {children}
        </a>
      );
    }
    return (
      <a
        href={hash}
        onClick={(e) => {
          const target = document.getElementById(`cap-${id}`);
          if (!target) return; // section isn't on this page — let the hash try
          e.preventDefault();
          target.scrollIntoView({ behavior: "smooth", block: "start" });
          if (window.history?.replaceState) {
            window.history.replaceState(null, "", hash);
          }
        }}
        {...rest}
      >
        {children}
      </a>
    );
  };

  return (
    <footer className={`cf-root ${lit ? "is-lit" : ""}`} ref={rootRef}>
      <style>{CSS}</style>

      {/* ---- showcase band + the seven parts ---- */}
      <div className="cf-band">
        <div className="cf-band-lede">
          <p className="cf-k">Capstone Showcase</p>
          <p className="cf-date">
            {showcase.label} <span className="cf-year">{year}</span>
          </p>
        </div>

        <div className="cf-count" aria-label={`${days} days until the showcase`}>
          <span className="cf-count-n">{days}</span>
          <span className="cf-count-l">
            {days === 1 ? "day" : "days"}
            <br />
            out
          </span>
        </div>

        <ol className="cf-parts">
          {PARTS.map((p, i) => (
            <li key={p.id}>
              <A
                id={p.id}
                className={`cf-part ${done[p.id] ? "is-done" : ""} ${
                  p.optional ? "is-optional" : ""
                }`}
                style={{ transitionDelay: `${i * 45}ms` }}
                title={p.gloss}
              >
                <span className="cf-part-n">{p.n}</span>
                <span className="cf-part-l">{p.label}</span>
              </A>
            </li>
          ))}
        </ol>

        <p className="cf-parts-note">
          {count === 0
            ? "Seven parts, one experience"
            : count === PARTS.length
            ? "All seven marked done"
            : `${count} of 7 marked done`}
        </p>
      </div>

      {/* ---- the brief, condensed ---- */}
      <div className="cf-body">
        <div className="cf-thesis">
          <p className="cf-k">The point of all of it</p>
          <p className="cf-thesis-line">
            A finished Capstone says more than <em>what</em> you made. It says{" "}
            <em>why</em> you made it, how you developed it, who it is for, and
            what larger idea it belongs to.
          </p>
          <A id="close" className="cf-cta">
            Read the full brief
            <span className="cf-cta-arrow" aria-hidden="true">
              &rarr;
            </span>
          </A>
        </div>

        <div className="cf-col">
          <p className="cf-k">Where it starts</p>
          <ul className="cf-stems">
            {STEMS.map((t) => (
              <li key={t}>
                <A id="start">{t}</A>
              </li>
            ))}
          </ul>
        </div>

        <div className="cf-col">
          <p className="cf-k">The order of operations</p>
          <ol className="cf-order">
            {ORDER.map((o) => (
              <li key={o.id}>
                <A id={o.id}>
                  <span className="cf-order-k">{o.k}</span>
                  <span className="cf-order-l">{o.label}</span>
                </A>
              </li>
            ))}
          </ol>
          <p className="cf-carried-k">Carried by</p>
          <ul className="cf-carried">
            {CARRIERS.map((c) => (
              <li key={c.id}>
                <A id={c.id} className={c.optional ? "is-optional" : ""}>
                  {c.label}
                  {c.optional && <span className="cf-opt"> (optional)</span>}
                </A>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ---- giant wordmark ---- */}
      <div className="cf-word" aria-hidden="true">
        <span className="cf-word-a">p</span>
        <span className="cf-word-la">LA</span>
        <span className="cf-word-a">tform</span>
      </div>

      <div className="cf-base">
        <p>Capstone &middot; Creating in a World-Building Context</p>
        <p className="cf-base-mid">pLAtform at Ryman Arts</p>
        <p>&copy; {new Date().getFullYear()}</p>
      </div>
    </footer>
  );
}

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,300;0,6..72,400;0,6..72,500;1,6..72,400&family=IBM+Plex+Mono:wght@400;500&display=swap');

.cf-root {
  --ox: #8b3a2f;
  --ox-deep: #6d2a21;
  --paper: #f5efe1;
  --blush: #e8bcab;
  --dim: rgba(245, 239, 225, .58);
  --hair: rgba(245, 239, 225, .16);

  position: relative;
  background: var(--ox-deep);
  color: var(--paper);
  font-family: 'Newsreader', Georgia, serif;
  overflow: hidden;
  padding: 0 clamp(20px, 4vw, 56px);
}
.cf-root *, .cf-root *::before, .cf-root *::after { box-sizing: border-box; }
.cf-root p, .cf-root ul, .cf-root ol { margin: 0; }
.cf-root ul, .cf-root ol { list-style: none; padding: 0; }
.cf-root a { color: inherit; text-decoration: none; }

.cf-k {
  font-family: 'IBM Plex Mono', ui-monospace, monospace;
  font-size: 10px;
  letter-spacing: .2em;
  text-transform: uppercase;
  color: var(--blush);
}

/* ---------- band ---------- */
.cf-band {
  display: grid;
  grid-template-columns: auto auto minmax(0, 1fr);
  grid-template-areas:
    "lede count parts"
    "lede count note";
  align-items: center;
  column-gap: clamp(24px, 3vw, 48px);
  row-gap: 10px;
  max-width: 1280px;
  margin: 0 auto;
  padding: 44px 0 38px;
  border-bottom: 1px solid var(--hair);
}
.cf-band-lede { grid-area: lede; }
.cf-date {
  font-size: clamp(22px, 2.4vw, 30px);
  font-weight: 500;
  line-height: 1.15;
  margin-top: 6px;
}
.cf-year { color: var(--dim); font-weight: 400; }

.cf-count {
  grid-area: count;
  display: flex;
  align-items: baseline;
  gap: 10px;
  padding-left: clamp(24px, 3vw, 48px);
  border-left: 1px solid var(--hair);
}
.cf-count-n {
  font-family: 'IBM Plex Mono', monospace;
  font-size: clamp(40px, 5vw, 62px);
  font-weight: 500;
  line-height: .9;
  color: var(--blush);
  font-variant-numeric: tabular-nums;
}
.cf-count-l {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 10px;
  letter-spacing: .16em;
  text-transform: uppercase;
  line-height: 1.5;
  color: var(--dim);
}

.cf-parts {
  grid-area: parts;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: flex-end;
}
.cf-part {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 7px 14px 7px 9px;
  border: 1px solid rgba(245, 239, 225, .3);
  border-radius: 40px;
  font-size: 14px;
  line-height: 1;
  opacity: 0;
  transform: translateY(6px);
  transition: opacity .45s ease, transform .45s ease, background-color .2s ease,
    border-color .2s ease, color .2s ease;
}
.cf-root.is-lit .cf-part { opacity: 1; transform: none; }
.cf-part.is-optional { border-style: dashed; color: var(--dim); }
.cf-part-n {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 9.5px;
  letter-spacing: .06em;
  padding: 3px 5px;
  border-radius: 20px;
  background: rgba(245, 239, 225, .12);
  color: var(--blush);
}
.cf-part.is-done { background: var(--paper); border-color: var(--paper); color: var(--ox-deep); }
.cf-part.is-done .cf-part-n { background: var(--ox); color: var(--paper); }
.cf-part:hover, .cf-part:focus-visible { background: var(--ox); border-color: var(--ox); color: var(--paper); }
.cf-part.is-done:hover { background: var(--blush); border-color: var(--blush); color: var(--ox-deep); }

.cf-parts-note {
  grid-area: note;
  justify-self: end;
  font-family: 'IBM Plex Mono', monospace;
  font-size: 10px;
  letter-spacing: .14em;
  text-transform: uppercase;
  color: var(--dim);
}

/* ---------- body ---------- */
.cf-body {
  display: grid;
  grid-template-columns: minmax(0, 1.5fr) minmax(0, 1fr) minmax(0, 1fr);
  gap: clamp(28px, 4vw, 64px);
  max-width: 1280px;
  margin: 0 auto;
  padding: 44px 0 40px;
}
.cf-thesis-line {
  font-size: clamp(19px, 1.7vw, 24px);
  line-height: 1.4;
  max-width: 34ch;
  margin-top: 14px;
}
.cf-thesis-line em { font-style: italic; color: var(--blush); }
.cf-cta {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  margin-top: 22px;
  padding-bottom: 4px;
  border-bottom: 1px solid rgba(245, 239, 225, .35);
  font-size: 16px;
  transition: color .2s ease, border-color .2s ease;
}
.cf-cta-arrow { transition: transform .2s ease; }
.cf-cta:hover, .cf-cta:focus-visible { color: var(--blush); border-color: var(--blush); }
.cf-cta:hover .cf-cta-arrow { transform: translateX(4px); }

.cf-stems { margin-top: 14px; }
.cf-stems li { padding: 6px 0; }
.cf-stems a {
  font-size: 16.5px;
  font-style: italic;
  line-height: 1.35;
  color: var(--dim);
  transition: color .2s ease;
  display: block;
}
.cf-stems a:hover, .cf-stems a:focus-visible { color: var(--paper); }

.cf-order { margin-top: 14px; }
.cf-order li { padding: 5px 0; }
.cf-order a { display: block; transition: color .2s ease; }
.cf-order-k {
  display: block;
  font-family: 'IBM Plex Mono', monospace;
  font-size: 9px;
  letter-spacing: .16em;
  text-transform: uppercase;
  color: rgba(232, 188, 171, .7);
}
.cf-order-l { font-size: 17px; color: var(--paper); }
.cf-order a:hover .cf-order-l, .cf-order a:focus-visible .cf-order-l { color: var(--blush); }

.cf-carried-k {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 9px;
  letter-spacing: .16em;
  text-transform: uppercase;
  color: rgba(232, 188, 171, .7);
  margin-top: 22px;
  padding-top: 16px;
  border-top: 1px solid var(--hair);
}
.cf-carried { display: flex; flex-wrap: wrap; gap: 6px 14px; margin-top: 10px; }
.cf-carried a { font-size: 16px; color: var(--dim); transition: color .2s ease; }
.cf-carried a:hover, .cf-carried a:focus-visible { color: var(--paper); }
.cf-opt { font-family: 'IBM Plex Mono', monospace; font-size: 9px; letter-spacing: .1em; text-transform: uppercase; }

/* ---------- giant wordmark ---------- */
.cf-word {
  max-width: 1280px;
  margin: 0 auto -.1em;
  font-size: clamp(72px, 19vw, 300px);
  line-height: .78;
  letter-spacing: -.045em;
  font-weight: 500;
  white-space: nowrap;
  user-select: none;
  padding-top: 8px;
}
.cf-word-a { color: rgba(245, 239, 225, .13); }
.cf-word-la { color: var(--blush); font-style: italic; opacity: .85; }

/* ---------- base ---------- */
.cf-base {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  flex-wrap: wrap;
  max-width: 1280px;
  margin: 0 auto;
  padding: 18px 0 26px;
  border-top: 1px solid var(--hair);
  font-family: 'IBM Plex Mono', monospace;
  font-size: 10.5px;
  letter-spacing: .1em;
  text-transform: uppercase;
  color: var(--dim);
}

/* ---------- responsive ---------- */
@media (max-width: 1080px) {
  .cf-band {
    grid-template-columns: auto auto;
    grid-template-areas:
      "lede count"
      "parts parts"
      "note note";
    row-gap: 22px;
    align-items: end;
  }
  .cf-parts { justify-content: flex-start; }
  .cf-parts-note { justify-self: start; }
  .cf-body { grid-template-columns: 1fr 1fr; gap: 32px; }
  .cf-thesis { grid-column: 1 / -1; }
}
@media (max-width: 620px) {
  .cf-band {
    grid-template-columns: 1fr;
    grid-template-areas: "lede" "count" "parts" "note";
    padding: 34px 0 30px;
  }
  .cf-count { padding-left: 0; border-left: 0; }
  .cf-body { grid-template-columns: 1fr; gap: 30px; padding: 34px 0 30px; }
  .cf-part { font-size: 13px; padding: 6px 12px 6px 8px; }
  .cf-base { justify-content: flex-start; gap: 8px; }
  .cf-base-mid { order: 3; width: 100%; }
}

/* ---------- a11y ---------- */
.cf-root a:focus-visible {
  outline: 2px solid var(--blush);
  outline-offset: 3px;
  border-radius: 2px;
}
@media (prefers-reduced-motion: reduce) {
  .cf-root *, .cf-root *::before, .cf-root *::after {
    transition-duration: .01ms !important;
    animation-duration: .01ms !important;
  }
  .cf-part { opacity: 1; transform: none; }
}
`;
