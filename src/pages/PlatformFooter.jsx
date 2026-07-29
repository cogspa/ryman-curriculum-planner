import React, { useMemo, useState, useEffect, useRef } from "react";

/**
 * PlatformFooter.jsx
 * pLAtform — site-wide giant footer.
 *
 * Drops at the bottom of every page. Carries the Capstone forward on every
 * screen: countdown to the showcase, the seven parts as a live status band,
 * and the site's real navigation.
 *
 * Self-contained: no external deps, no Tailwind. Styles scoped under .pf-root
 * with a `pf-` prefix.
 *
 * Usage:
 *   <PlatformFooter />
 *   <PlatformFooter progress={{ hero: true, brand: true }} onNavigate={(href) => ...} />
 *
 * Props (all optional):
 *   progress     {hero,brand,statement,website,video,print,campaign} booleans.
 *                If omitted, reads the same localStorage key the Capstone page
 *                writes ("platform.capstone") so the two stay in sync.
 *   onNavigate   (href) => void — hook for your router. Falls back to plain <a>.
 *   columns      override the nav columns entirely.
 *   showcase     { label, month (0-indexed), day } — defaults to Sept 19.
 */

const SHOWCASE_DEFAULT = { label: "September 19", month: 8, day: 19 };
const STORAGE_KEY = "platform.capstone";

const PARTS = [
  { id: "hero", n: "01", label: "Hero" },
  { id: "brand", n: "02", label: "Brand" },
  { id: "statement", n: "03", label: "Statement" },
  { id: "website", n: "04", label: "Website" },
  { id: "video", n: "05", label: "Video" },
  { id: "print", n: "06", label: "Print" },
  { id: "campaign", n: "07", label: "Campaign", optional: true },
];

const COLUMNS_DEFAULT = [
  {
    title: "Coursework",
    links: [
      { label: "Weekly lessons", href: "/" },
      { label: "Assignments Hub", href: "/assignments" },
      { label: "Critique Zone", href: "/critique" },
      { label: "Syllabus", href: "/syllabus" },
    ],
  },
  {
    title: "Program & Info",
    links: [
      { label: "Calendar", href: "/calendar" },
      { label: "Guest Speakers", href: "/speakers" },
      { label: "Class Roster", href: "/roster" },
      { label: "Mentorship", href: "/mentorship" },
      { label: "Class FAQ", href: "/faq" },
    ],
  },
  {
    title: "Tools & References",
    links: [
      { label: "Brush Foundry", href: "/week/03/brush-maker" },
      { label: "Notan & Light Lab", href: "/week/03/notan-light-lab" },
      { label: "Photoshop Shortcuts", href: "/week/01/shortcuts" },
      { label: "Shot Examples", href: "/week/05/shot-examples" },
      { label: "Pixel Budget Calculator", href: "/pixel-budget" },
    ],
  },
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
      /* storage unavailable — band just reads as untouched */
    }
  }, [override]);
  return override || stored;
}

export default function PlatformFooter({
  progress,
  onNavigate,
  columns = COLUMNS_DEFAULT,
  showcase = SHOWCASE_DEFAULT,
}) {
  const done = useStoredProgress(progress);
  const { days, year } = useMemo(() => daysUntil(showcase), [showcase]);
  const count = PARTS.filter((p) => done[p.id]).length;
  const rootRef = useRef(null);
  const [lit, setLit] = useState(false);

  // one quiet reveal when the footer scrolls into view
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

  const nav = (e, href) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate(href);
    }
  };

  return (
    <footer className={`pf-root ${lit ? "is-lit" : ""}`} ref={rootRef}>
      <style>{CSS}</style>

      {/* ---- capstone band ---- */}
      <div className="pf-band">
        <div className="pf-band-lede">
          <p className="pf-k">Capstone Showcase</p>
          <p className="pf-date">
            {showcase.label} <span className="pf-year">{year}</span>
          </p>
        </div>

        <div className="pf-count" aria-label={`${days} days until the showcase`}>
          <span className="pf-count-n">{days}</span>
          <span className="pf-count-l">
            {days === 1 ? "day" : "days"}
            <br />
            out
          </span>
        </div>

        <ol className="pf-parts">
          {PARTS.map((p, i) => (
            <li key={p.id}>
              <a
                className={`pf-part ${done[p.id] ? "is-done" : ""} ${
                  p.optional ? "is-optional" : ""
                }`}
                href={`/capstone#cap-${p.id}`}
                onClick={(e) => nav(e, `/capstone#cap-${p.id}`)}
                style={{ transitionDelay: `${i * 45}ms` }}
              >
                <span className="pf-part-n">{p.n}</span>
                <span className="pf-part-l">{p.label}</span>
              </a>
            </li>
          ))}
        </ol>

        <p className="pf-parts-note">
          {count === 0
            ? "Seven parts, one experience."
            : count === PARTS.length
            ? "All seven marked done."
            : `${count} of 7 marked done.`}
        </p>
      </div>

      {/* ---- nav ---- */}
      <div className="pf-nav">
        <div className="pf-mark">
          <p className="pf-mark-k">Ryman Arts</p>
          <p className="pf-mark-line">
            A Saturday studio for digital art, concept art, and AI production
            workflows.
          </p>
          <a
            className="pf-cta"
            href="/capstone"
            onClick={(e) => nav(e, "/capstone")}
          >
            Open the Capstone brief
            <span className="pf-cta-arrow" aria-hidden="true">
              &rarr;
            </span>
          </a>
        </div>

        {columns.map((col) => (
          <nav className="pf-col" key={col.title} aria-label={col.title}>
            <p className="pf-k">{col.title}</p>
            <ul>
              {col.links.map((l) => (
                <li key={l.href}>
                  <a href={l.href} onClick={(e) => nav(e, l.href)}>
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      {/* ---- giant wordmark ---- */}
      <div className="pf-word" aria-hidden="true">
        <span className="pf-word-a">p</span>
        <span className="pf-word-la">LA</span>
        <span className="pf-word-a">tform</span>
      </div>

      <div className="pf-base">
        <p>&copy; {new Date().getFullYear()} pLAtform at Ryman Arts</p>
        <p className="pf-base-mid">Built by students, Saturdays, in Los Angeles</p>
        <a href="/colophon" onClick={(e) => nav(e, "/colophon")}>
          Colophon
        </a>
      </div>
    </footer>
  );
}

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,300;0,6..72,400;0,6..72,500;0,6..72,600;1,6..72,400&family=IBM+Plex+Mono:wght@400;500&display=swap');

.pf-root {
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
.pf-root *, .pf-root *::before, .pf-root *::after { box-sizing: border-box; }
.pf-root p, .pf-root ul, .pf-root ol { margin: 0; }
.pf-root ul, .pf-root ol { list-style: none; padding: 0; }
.pf-root a { color: inherit; text-decoration: none; }

.pf-k {
  font-family: 'IBM Plex Mono', ui-monospace, monospace;
  font-size: 10px;
  letter-spacing: .2em;
  text-transform: uppercase;
  color: var(--blush);
}

/* ---------- capstone band ---------- */
.pf-band {
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
.pf-band-lede { grid-area: lede; }
.pf-date {
  font-size: clamp(22px, 2.4vw, 30px);
  font-weight: 500;
  line-height: 1.15;
  margin-top: 6px;
}
.pf-year { color: var(--dim); font-weight: 400; }

.pf-count {
  grid-area: count;
  display: flex;
  align-items: baseline;
  gap: 10px;
  padding-left: clamp(24px, 3vw, 48px);
  border-left: 1px solid var(--hair);
}
.pf-count-n {
  font-family: 'IBM Plex Mono', monospace;
  font-size: clamp(40px, 5vw, 62px);
  font-weight: 500;
  line-height: .9;
  color: var(--blush);
  font-variant-numeric: tabular-nums;
}
.pf-count-l {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 10px;
  letter-spacing: .16em;
  text-transform: uppercase;
  line-height: 1.5;
  color: var(--dim);
}

.pf-parts {
  grid-area: parts;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: flex-end;
}
.pf-part {
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
.pf-root.is-lit .pf-part { opacity: 1; transform: none; }
.pf-part.is-optional { border-style: dashed; color: var(--dim); }
.pf-part-n {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 9.5px;
  letter-spacing: .06em;
  padding: 3px 5px;
  border-radius: 20px;
  background: rgba(245, 239, 225, .12);
  color: var(--blush);
}
.pf-part.is-done {
  background: var(--paper);
  border-color: var(--paper);
  color: var(--ox-deep);
}
.pf-part.is-done .pf-part-n { background: var(--ox); color: var(--paper); }
.pf-part:hover, .pf-part:focus-visible {
  background: var(--ox);
  border-color: var(--ox);
  color: var(--paper);
}
.pf-part.is-done:hover { background: var(--blush); border-color: var(--blush); color: var(--ox-deep); }

.pf-parts-note {
  grid-area: note;
  justify-self: end;
  font-family: 'IBM Plex Mono', monospace;
  font-size: 10px;
  letter-spacing: .14em;
  text-transform: uppercase;
  color: var(--dim);
}

/* ---------- nav ---------- */
.pf-nav {
  display: grid;
  grid-template-columns: minmax(0, 1.4fr) repeat(3, minmax(0, 1fr));
  gap: clamp(24px, 4vw, 64px);
  max-width: 1280px;
  margin: 0 auto;
  padding: 44px 0 40px;
}
.pf-mark-k {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 10px;
  letter-spacing: .2em;
  text-transform: uppercase;
  color: var(--blush);
}
.pf-mark-line {
  font-size: 19px;
  line-height: 1.45;
  max-width: 30ch;
  margin-top: 12px;
  color: var(--paper);
}
.pf-cta {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  margin-top: 20px;
  padding-bottom: 4px;
  border-bottom: 1px solid rgba(245, 239, 225, .35);
  font-size: 16px;
  transition: color .2s ease, border-color .2s ease;
}
.pf-cta-arrow { transition: transform .2s ease; }
.pf-cta:hover, .pf-cta:focus-visible { color: var(--blush); border-color: var(--blush); }
.pf-cta:hover .pf-cta-arrow { transform: translateX(4px); }

.pf-col ul { margin-top: 14px; }
.pf-col li { padding: 5px 0; }
.pf-col a {
  font-size: 16px;
  color: var(--dim);
  transition: color .2s ease;
}
.pf-col a:hover, .pf-col a:focus-visible { color: var(--paper); }

/* ---------- giant wordmark ---------- */
.pf-word {
  max-width: 1280px;
  margin: 0 auto;
  font-size: clamp(72px, 19vw, 300px);
  line-height: .78;
  letter-spacing: -.045em;
  font-weight: 500;
  white-space: nowrap;
  user-select: none;
  padding-top: 8px;
  /* crop the descender so the word sits on the base rule */
  margin-bottom: -.1em;
}
.pf-word-a { color: rgba(245, 239, 225, .13); }
.pf-word-la {
  color: var(--blush);
  font-style: italic;
  opacity: .85;
}

/* ---------- base rule ---------- */
.pf-base {
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
.pf-base a { transition: color .2s ease; }
.pf-base a:hover, .pf-base a:focus-visible { color: var(--paper); }

/* ---------- responsive ---------- */
@media (max-width: 1080px) {
  .pf-band {
    grid-template-columns: auto auto;
    grid-template-areas:
      "lede count"
      "parts parts"
      "note note";
    row-gap: 22px;
    align-items: end;
  }
  .pf-parts { justify-content: flex-start; }
  .pf-parts-note { justify-self: start; }
  .pf-nav { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 32px; }
}
@media (max-width: 620px) {
  .pf-band {
    grid-template-columns: 1fr;
    grid-template-areas: "lede" "count" "parts" "note";
    padding: 34px 0 30px;
  }
  .pf-count { padding-left: 0; border-left: 0; }
  .pf-nav { grid-template-columns: 1fr; gap: 30px; padding: 34px 0 30px; }
  .pf-part { font-size: 13px; padding: 6px 12px 6px 8px; }
  .pf-base { justify-content: flex-start; gap: 8px; }
  .pf-base-mid { order: 3; width: 100%; }
}

/* ---------- a11y ---------- */
.pf-root a:focus-visible {
  outline: 2px solid var(--blush);
  outline-offset: 3px;
  border-radius: 2px;
}
@media (prefers-reduced-motion: reduce) {
  .pf-root *, .pf-root *::before, .pf-root *::after {
    transition-duration: .01ms !important;
    animation-duration: .01ms !important;
  }
  .pf-part { opacity: 1; transform: none; }
}
`;
