import React, { useState, useMemo, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import FullProjectFlow from "./FullProjectFlow/FullProjectFlow";

/**
 * CapstoneWorldBuilding.jsx
 * pLAtform — Capstone Project: Creating in a World-Building Context
 *
 * Self-contained: no external deps, no Tailwind. Styles are scoped under .cap-root
 * with a `cap-` class prefix so it can drop into the curriculum site as-is.
 *
 * Fonts: if Newsreader + IBM Plex Mono are already loaded globally on pLAtform,
 * delete the @import at the top of the <style> block below.
 *
 * Persistence: progress lives in React state only. To persist per-student, swap
 * the useState in `useChecklist` for localStorage (see comment there).
 */

/* ------------------------------------------------------------------ */
/* Content — the assignment, structured                                */
/* ------------------------------------------------------------------ */

const SHOWCASE = { label: "September 19", month: 8, day: 19 }; // month is 0-indexed

const DELIVERABLES = [
  {
    id: "hero",
    n: "01",
    title: "Hero Project",
    short: "Hero",
    weight: "centerpiece",
    lede:
      "The centerpiece of your Capstone, built directly on the theme or concept you set in your artist statement. Think of it as the clearest, most complete expression of the world, story, idea, product, or experience you are making.",
    blocks: [
      {
        heading: "It may take the form of",
        items: [
          "A short animation",
          "Several finished pages from a graphic novel — not the whole book",
          "A product design or product rendering",
          "An interactive experience",
          "A pitch or proof of concept for a larger future project",
          "An app or digital experience",
          "A personal or autobiographical project",
          "Another format approved by the instructor",
        ],
      },
    ],
    note: "Present it physically, digitally, or both.",
  },
  {
    id: "brand",
    n: "02",
    title: "Brand Design",
    short: "Brand",
    weight: "core",
    lede:
      "A cohesive identity that pulls visual and conceptual elements out of your hero project and supporting work, so the whole exhibit reads as one experience.",
    blocks: [
      {
        heading: "Your brand must include",
        items: [
          "A project name",
          "A logo or wordmark",
          "A typography system",
          "A consistent color palette",
          "A recognizable visual style",
        ],
      },
      {
        heading: "Apply it across",
        items: [
          "The website",
          "The video or slideshow",
          "Printed materials",
          "Signs and display elements",
          "The optional promotional campaign",
        ],
      },
    ],
    note:
      "The brand should not feel bolted on. It comes out of the project's themes, imagery, characters, environments, products, or ideas.",
  },
  {
    id: "statement",
    n: "03",
    title: "Artist Statement",
    short: "Statement",
    weight: "core",
    lede:
      "Several thoughtful paragraphs on the meaning and purpose of the work. This is the conceptual foundation everything else stands on — it tells the audience not only what you made, but why.",
    blocks: [
      {
        heading: "Address",
        items: [
          "The central idea or theme",
          "Why you conceived and developed it",
          "What it represents personally, socially, culturally, or creatively",
          "The world, story, brand, product, or experience you are building",
          "The challenges you ran into",
          "How you approached or solved them",
          "What you want the audience to understand or feel",
          "The ultimate goal of the project",
          "How the project could continue or expand",
        ],
      },
    ],
  },
  {
    id: "website",
    n: "04",
    title: "Project Website",
    short: "Website",
    weight: "core",
    lede:
      "A dedicated site for the project — separate from your personal portfolio and fully branded around the project's identity, theme, and world. Treat it as the interactive version of your process video: visitors explore at their own pace instead of watching a straight line.",
    blocks: [
      {
        heading: "May include",
        items: [
          "Project name, logo, and visual identity",
          "Your artist statement",
          "An introduction to the concept or world",
          "The finished hero project",
          "Research and visual inspiration",
          "Sketches, thumbnails, and blockouts",
          "Character, environment, prop, or product designs",
          "Storyboards and process documentation",
          "Animation, video, audio, or interactive elements",
          "A gallery of final artwork",
          "Downloadable or printable materials",
          "Credits and contact information",
        ],
      },
      {
        heading: "Printables might be",
        items: [
          "Posters",
          "Character sheets",
          "Activity sheets",
          "Storyboards",
          "Artwork",
          "Project summaries or excerpts",
        ],
      },
    ],
    note:
      "It should feel like a complete digital experience, not a folder of images put online. Navigation, type, color, layout, imagery, and motion all carry the story.",
  },
  {
    id: "video",
    n: "05",
    title: "Process Video or Slideshow",
    short: "Video",
    weight: "core",
    lede:
      "Document how the project developed and present the creative journey. No complex animation required — a well-designed slideshow with music, narration, captions, or simple motion counts.",
    blocks: [
      {
        heading: "May include",
        items: [
          "Research and inspiration",
          "Early ideas and rough sketches",
          "Thumbnails and blockouts",
          "Environment studies",
          "Character and prop designs",
          "Storyboards",
          "Design experiments",
          "Work-in-progress images",
          "Problems you hit and how the project changed",
          "The finished hero project",
        ],
      },
    ],
    note: "Use the project's logo, typography, colors, and visual style throughout.",
  },
  {
    id: "print",
    n: "06",
    title: "Printed Elements",
    short: "Print",
    weight: "core",
    lede:
      "Physical pieces that support your presentation and help the audience read the project, its development, and the world around the hero piece.",
    blocks: [
      {
        heading: "May include",
        items: [
          "A project poster",
          "Your artist statement",
          "Storyboards",
          "Rough sketches or development sheets",
          "Character, environment, or product designs",
          "Promotional cards, postcards, or flyers",
          "Graphic novel pages",
          "Final artwork or product renderings",
          "Branded signs and display labels",
          "The same printables offered on the website",
        ],
      },
    ],
  },
  {
    id: "campaign",
    n: "07",
    title: "Brand Campaign",
    short: "Campaign",
    weight: "optional",
    lede:
      "Optional extension: promote, launch, or sell the hero project to a wider audience. Think about how people discover it, interact with it, share it, or step into its world.",
    blocks: [
      {
        heading: "May include",
        items: [
          "Social posts, stories, reels, or short promos",
          "A teaser or trailer",
          "Guerrilla marketing concepts",
          "Posters, flyers, stickers, postcards",
          "QR codes to the site, video, or experience",
          "Shirts, buttons, tote bags, other merch",
          "Digital advertisements",
          "A launch event, installation, or public experience",
          "Another strategy that fits your project and audience",
        ],
      },
      {
        heading: "Answer for yourself",
        items: [
          "Who is the intended audience?",
          "What do you want them to think, feel, or do?",
          "Where and how will people run into the campaign?",
          "How does it expand the project's story or world?",
          "How could you measure interest or engagement?",
        ],
      },
    ],
    note:
      "You do not have to manufacture everything. Finished examples, digital mockups, prototypes, or a mix are all fine.",
  },
];

/* ------------------------------------------------------------------ */
/* Progress                                                            */
/* ------------------------------------------------------------------ */

function useChecklist() {
  const [done, setDone] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("platform.capstone") || "{}");
    } catch {
      return {};
    }
  });
  useEffect(() => {
    try {
      localStorage.setItem("platform.capstone", JSON.stringify(done));
    } catch {}
  }, [done]);
  const toggle = (id) => setDone((d) => ({ ...d, [id]: !d[id] }));
  return [done, toggle];
}

function daysUntilShowcase() {
  const now = new Date();
  const year =
    now.getMonth() > SHOWCASE.month ||
    (now.getMonth() === SHOWCASE.month && now.getDate() > SHOWCASE.day)
      ? now.getFullYear() + 1
      : now.getFullYear();
  const target = new Date(year, SHOWCASE.month, SHOWCASE.day);
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  return {
    days: Math.round((target - startOfToday) / 86400000),
    year,
  };
}

/* ------------------------------------------------------------------ */
/* Signature element — the cohesion wheel                              */
/* ------------------------------------------------------------------ */

function CohesionWheel({ done, active, onPick }) {
  const size = 480;
  const c = size / 2;
  const R = 168;
  const nodes = useMemo(
    () =>
      DELIVERABLES.map((d, i) => {
        const a = (i / DELIVERABLES.length) * Math.PI * 2 - Math.PI / 2;
        return { ...d, x: c + Math.cos(a) * R, y: c + Math.sin(a) * R, a };
      }),
    []
  );
  const count = DELIVERABLES.filter((d) => done[d.id]).length;
  const hubR = 58;
  const ringR = hubR + 14;
  const circ = 2 * Math.PI * ringR;

  return (
    <svg
      className="cap-wheel"
      viewBox={`0 0 ${size} ${size}`}
      role="group"
      aria-label="Capstone deliverables, arranged around the central idea"
    >
      {/* spokes */}
      {nodes.map((n) => (
        <line
          key={`s-${n.id}`}
          x1={c}
          y1={c}
          x2={n.x}
          y2={n.y}
          className={`cap-spoke ${done[n.id] ? "is-done" : ""} ${
            active === n.id ? "is-active" : ""
          }`}
        />
      ))}

      {/* hub */}
      <circle cx={c} cy={c} r={hubR} className="cap-hub" />
      <circle cx={c} cy={c} r={ringR} className="cap-hub-track" />
      <circle
        cx={c}
        cy={c}
        r={ringR}
        className="cap-hub-fill"
        style={{
          strokeDasharray: circ,
          strokeDashoffset: circ * (1 - count / DELIVERABLES.length),
          transform: `rotate(-90deg)`,
          transformOrigin: `${c}px ${c}px`,
        }}
      />
      <text x={c} y={c - 8} className="cap-hub-label">
        ONE IDEA
      </text>
      <text x={c} y={c + 16} className="cap-hub-count">
        {count}/{DELIVERABLES.length}
      </text>

      {/* nodes */}
      {nodes.map((n) => {
        const r = n.id === "hero" ? 40 : 30;
        const isDone = !!done[n.id];
        return (
          <g
            key={n.id}
            className={`cap-node ${isDone ? "is-done" : ""} ${
              active === n.id ? "is-active" : ""
            } ${n.weight === "optional" ? "is-optional" : ""}`}
            onClick={() => onPick(n.id)}
            tabIndex={0}
            role="button"
            aria-label={`Go to ${n.title}`}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onPick(n.id);
              }
            }}
          >
            <circle cx={n.x} cy={n.y} r={r} className="cap-node-disc" />
            <text x={n.x} y={n.y + 4} className="cap-node-n">
              {n.n}
            </text>
            <text
              x={n.x}
              y={n.y + r + 18}
              className="cap-node-label"
            >
              {n.short}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export default function CapstoneWorldBuilding() {
  const [done, toggle] = useChecklist();
  const [active, setActive] = useState("hero");
  const { days, year } = useMemo(daysUntilShowcase, []);
  const refs = useRef({});

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        const seen = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (seen) setActive(seen.target.dataset.capId);
      },
      { rootMargin: "-30% 0px -55% 0px" }
    );
    Object.values(refs.current).forEach((el) => el && obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const goTo = (id) => {
    const el = refs.current[id];
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    setActive(id);
  };

  const count = DELIVERABLES.filter((d) => done[d.id]).length;

  return (
    <div className="cap-root">
      <style>{CSS}</style>

      {/* ---------------- hero ---------------- */}
      <header className="cap-hero">
        <div className="cap-hero-text">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
            <Link to="/" style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: '11px',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: '#8b3a2f',
              textDecoration: 'none',
              fontWeight: '600',
              background: 'rgba(139, 58, 47, 0.08)',
              padding: '6px 14px',
              borderRadius: '20px',
              border: '1px solid rgba(139, 58, 47, 0.2)',
              transition: 'all 0.2s ease'
            }}>
              ← Back to Home
            </Link>
            <p className="cap-eyebrow" style={{ margin: 0 }}>pLAtform · Capstone</p>
          </div>
          <h1 className="cap-title">
            Creating in a
            <br />
            <em>World-Building</em>
            <br />
            Context
          </h1>
          <p className="cap-deck">
            Every piece you make this term answers to one idea. The hero project,
            the brand, the statement, the site, the video, the printed work — all
            of it should read as a single creative experience, not a stack of
            unrelated assignments.
          </p>

          <div className="cap-thesis" id="cap-start">
            <p>Your project should be able to finish one of these sentences:</p>
            <ul>
              <li>I made this as a statement about&hellip;</li>
              <li>This represents my feelings or experiences around&hellip;</li>
              <li>
                I built this world, product, story, or brand to explore&hellip;
              </li>
            </ul>
          </div>

          <div className="cap-showcase">
            <div className="cap-showcase-date">
              <span className="cap-showcase-k">Showcase</span>
              <strong>
                {SHOWCASE.label} <span className="cap-year">{year}</span>
              </strong>
            </div>
            <div className="cap-showcase-days">
              <strong>{days}</strong>
              <span>{days === 1 ? "day out" : "days out"}</span>
            </div>
          </div>
        </div>

        <div className="cap-hero-wheel">
          <CohesionWheel done={done} active={active} onPick={goTo} />
          <p className="cap-wheel-cap">
            Seven deliverables, one center. Tap a disc to jump; check work off as
            you finish it and the ring closes.
          </p>
        </div>
      </header>

      {/* ---------------- body ---------------- */}
      <div className="cap-body">
        {/* rail */}
        <nav className="cap-rail" aria-label="Capstone sections">
          <Link to="/" style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: '11px',
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            color: '#8b3a2f',
            textDecoration: 'none',
            fontWeight: '600',
            marginBottom: '16px',
            padding: '4px 12px',
            borderRadius: '14px',
            background: 'rgba(139, 58, 47, 0.08)',
            border: '1px solid rgba(139, 58, 47, 0.15)'
          }}>
            ← Back to Home
          </Link>
          <p className="cap-rail-k">
            Progress <span>{count}/7</span>
          </p>
          <ol>
            {DELIVERABLES.map((d) => (
              <li key={d.id}>
                <button
                  className={`cap-rail-btn ${
                    active === d.id ? "is-active" : ""
                  } ${done[d.id] ? "is-done" : ""}`}
                  onClick={() => goTo(d.id)}
                >
                  <span className="cap-rail-n">{d.n}</span>
                  <span className="cap-rail-t">{d.title}</span>
                  {d.weight === "optional" && (
                    <span className="cap-rail-opt">opt</span>
                  )}
                </button>
              </li>
            ))}
          </ol>
        </nav>

        {/* sections */}
        <main className="cap-main">
          {DELIVERABLES.map((d) => (
            <section
              key={d.id}
              id={`cap-${d.id}`}
              data-cap-id={d.id}
              ref={(el) => (refs.current[d.id] = el)}
              className={`cap-section ${
                d.weight === "centerpiece" ? "is-centerpiece" : ""
              } ${d.weight === "optional" ? "is-optional" : ""}`}
            >
              <div className="cap-section-head">
                <span className="cap-section-n">{d.n}</span>
                <h2>
                  {d.title}
                  {d.weight === "optional" && (
                    <span className="cap-tag">optional</span>
                  )}
                  {d.weight === "centerpiece" && (
                    <span className="cap-tag cap-tag-hero">centerpiece</span>
                  )}
                </h2>
                <label className="cap-check">
                  <input
                    type="checkbox"
                    checked={!!done[d.id]}
                    onChange={() => toggle(d.id)}
                  />
                  <span>{done[d.id] ? "Done" : "Mark done"}</span>
                </label>
              </div>

              <p className="cap-lede">{d.lede}</p>

              <div className="cap-blocks">
                {d.blocks.map((b) => (
                  <div className="cap-block" key={b.heading}>
                    <h3>{b.heading}</h3>
                    <ul>
                      {b.items.map((it) => (
                        <li key={it}>{it}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {d.note && <p className="cap-note">{d.note}</p>}
            </section>
          ))}

          <section className="cap-close" id="cap-close">
            <p className="cap-eyebrow">The point of all of it</p>
            <p className="cap-close-line">
              A finished Capstone says more than <em>what</em> you made. It says
              why you made it, how you developed it, who it is for, and what
              larger world or idea it belongs to.
            </p>
            <p className="cap-close-sub">
              Seen together, the hero project, brand, statement, website, process
              video, printed work, and campaign should feel like parts of one
              thing.
            </p>
          </section>

          <FullProjectFlow />
        </main>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Styles                                                              */
/* ------------------------------------------------------------------ */

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,300;0,6..72,400;0,6..72,500;0,6..72,600;1,6..72,300;1,6..72,400&family=IBM+Plex+Mono:wght@400;500;600&display=swap');

.cap-root {
  --oxblood: #8b3a2f;
  --oxblood-deep: #6d2a21;
  --paper: #f5efe1;
  --paper-2: #efe7d5;
  --ink: #241c18;
  --graphite: #6b625a;
  --rule: #d6cbb4;

  background: var(--paper);
  color: var(--ink);
  font-family: 'Newsreader', Georgia, serif;
  font-size: 17px;
  line-height: 1.62;
  -webkit-font-smoothing: antialiased;
}
.cap-root *, .cap-root *::before, .cap-root *::after { box-sizing: border-box; }
.cap-root h1, .cap-root h2, .cap-root h3, .cap-root p, .cap-root ul, .cap-root ol { margin: 0; }
.cap-root ul, .cap-root ol { list-style: none; padding: 0; }

.cap-eyebrow {
  font-family: 'IBM Plex Mono', ui-monospace, monospace;
  font-size: 11px;
  letter-spacing: .18em;
  text-transform: uppercase;
  color: var(--oxblood);
}

/* ---------- hero ---------- */
.cap-hero {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, .85fr);
  gap: 64px;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 72px 40px 56px;
}
.cap-title {
  font-size: clamp(44px, 6.4vw, 84px);
  line-height: .94;
  font-weight: 400;
  letter-spacing: -.02em;
  margin: 18px 0 24px;
}
.cap-title em {
  font-style: italic;
  color: var(--oxblood);
  font-weight: 300;
}
.cap-deck {
  font-size: 19px;
  max-width: 48ch;
  color: #3a2f28;
}
.cap-thesis {
  margin: 28px 0;
  padding: 20px 24px;
  border-left: 2px solid var(--oxblood);
  background: var(--paper-2);
}
.cap-thesis p {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 11.5px;
  letter-spacing: .06em;
  text-transform: uppercase;
  color: var(--graphite);
  margin-bottom: 10px;
}
.cap-thesis li {
  font-size: 19px;
  font-style: italic;
  padding: 3px 0;
}
.cap-showcase {
  display: flex;
  align-items: stretch;
  gap: 0;
  border: 1px solid var(--rule);
  width: fit-content;
  background: #fffdf7;
}
.cap-showcase-date, .cap-showcase-days { padding: 14px 22px; }
.cap-showcase-days {
  border-left: 1px solid var(--rule);
  background: var(--oxblood);
  color: #fdf6e8;
  display: flex;
  align-items: baseline;
  gap: 8px;
}
.cap-showcase-k {
  display: block;
  font-family: 'IBM Plex Mono', monospace;
  font-size: 10px;
  letter-spacing: .18em;
  text-transform: uppercase;
  color: var(--graphite);
}
.cap-showcase-date strong { font-size: 24px; font-weight: 500; }
.cap-year { color: var(--graphite); font-weight: 400; }
.cap-showcase-days strong {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 26px;
  font-weight: 500;
}
.cap-showcase-days span {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 10px;
  letter-spacing: .16em;
  text-transform: uppercase;
  opacity: .85;
}

/* ---------- wheel ---------- */
.cap-wheel { width: 100%; height: auto; overflow: visible; display: block; }
.cap-spoke {
  stroke: var(--rule);
  stroke-width: 1;
  transition: stroke .25s ease, stroke-width .25s ease;
}
.cap-spoke.is-done { stroke: var(--oxblood); }
.cap-spoke.is-active { stroke: var(--ink); stroke-width: 1.8; }
.cap-hub { fill: #fffdf7; stroke: var(--rule); stroke-width: 1; }
.cap-hub-track { fill: none; stroke: var(--rule); stroke-width: 3; }
.cap-hub-fill {
  fill: none;
  stroke: var(--oxblood);
  stroke-width: 3;
  stroke-linecap: butt;
  transition: stroke-dashoffset .5s cubic-bezier(.4,0,.2,1);
}
.cap-hub-label {
  text-anchor: middle;
  font-family: 'IBM Plex Mono', monospace;
  font-size: 10.5px;
  letter-spacing: .18em;
  fill: var(--graphite);
}
.cap-hub-count {
  text-anchor: middle;
  font-family: 'Newsreader', serif;
  font-size: 22px;
  fill: var(--ink);
}
.cap-node { cursor: pointer; outline: none; }
.cap-node-disc {
  fill: #fffdf7;
  stroke: var(--ink);
  stroke-width: 1;
  transition: fill .25s ease, stroke .25s ease, transform .25s ease;
}
.cap-node.is-optional .cap-node-disc { stroke-dasharray: 3 3; }
.cap-node.is-done .cap-node-disc { fill: var(--oxblood); stroke: var(--oxblood); }
.cap-node:hover .cap-node-disc, .cap-node:focus-visible .cap-node-disc {
  stroke: var(--oxblood);
  stroke-width: 2;
}
.cap-node.is-active .cap-node-disc { stroke: var(--oxblood); stroke-width: 2; }
.cap-node-n {
  text-anchor: middle;
  font-family: 'IBM Plex Mono', monospace;
  font-size: 13px;
  fill: var(--ink);
  pointer-events: none;
  transition: fill .25s ease;
}
.cap-node.is-done .cap-node-n { fill: #fdf6e8; }
.cap-node-label {
  text-anchor: middle;
  font-family: 'IBM Plex Mono', monospace;
  font-size: 10px;
  letter-spacing: .14em;
  text-transform: uppercase;
  fill: var(--graphite);
  pointer-events: none;
}
.cap-node.is-active .cap-node-label, .cap-node:hover .cap-node-label { fill: var(--oxblood); }
.cap-wheel-cap {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 11px;
  line-height: 1.7;
  color: var(--graphite);
  text-align: center;
  margin-top: 24px;
  max-width: 34ch;
  margin-left: auto;
  margin-right: auto;
}

/* ---------- body ---------- */
.cap-body {
  display: grid;
  grid-template-columns: 224px minmax(0, 1fr);
  gap: 56px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px 40px 96px;
  border-top: 1px solid var(--rule);
}
.cap-rail { position: sticky; top: 32px; align-self: start; padding-top: 32px; }
.cap-rail-k {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 10px;
  letter-spacing: .18em;
  text-transform: uppercase;
  color: var(--graphite);
  display: flex;
  justify-content: space-between;
  padding-bottom: 10px;
  border-bottom: 1px solid var(--rule);
  margin-bottom: 6px;
}
.cap-rail-k span { color: var(--oxblood); }
.cap-rail-btn {
  display: flex;
  align-items: baseline;
  gap: 10px;
  width: 100%;
  padding: 7px 0;
  background: none;
  border: 0;
  border-bottom: 1px solid transparent;
  text-align: left;
  cursor: pointer;
  color: var(--graphite);
  font-family: inherit;
  font-size: 16px;
  transition: color .2s ease;
}
.cap-rail-btn:hover { color: var(--oxblood); }
.cap-rail-btn.is-active { color: var(--ink); }
.cap-rail-btn.is-active .cap-rail-n { color: var(--oxblood); }
.cap-rail-btn.is-done .cap-rail-t { text-decoration: line-through; text-decoration-color: var(--oxblood); }
.cap-rail-n { font-family: 'IBM Plex Mono', monospace; font-size: 10px; color: var(--rule); }
.cap-rail-opt {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 9px;
  letter-spacing: .1em;
  text-transform: uppercase;
  color: var(--rule);
  margin-left: auto;
}

/* ---------- sections ---------- */
.cap-section { padding: 48px 0; border-bottom: 1px solid var(--rule); }
.cap-section:first-child { padding-top: 32px; }
.cap-section.is-optional { opacity: .96; }
.cap-section-head {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
  margin-bottom: 16px;
}
.cap-section-n {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 11px;
  color: var(--oxblood);
  letter-spacing: .1em;
  padding-top: 4px;
}
.cap-section-head h2 {
  font-size: clamp(28px, 3.4vw, 40px);
  font-weight: 400;
  letter-spacing: -.015em;
  line-height: 1.08;
  display: flex;
  align-items: baseline;
  gap: 12px;
  flex-wrap: wrap;
}
.cap-section.is-centerpiece .cap-section-head h2 { color: var(--oxblood-deep); }
.cap-tag {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 9.5px;
  letter-spacing: .16em;
  text-transform: uppercase;
  color: var(--graphite);
  border: 1px solid var(--rule);
  padding: 3px 8px;
  border-radius: 2px;
}
.cap-tag-hero { color: #fdf6e8; background: var(--oxblood); border-color: var(--oxblood); }
.cap-check {
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  font-family: 'IBM Plex Mono', monospace;
  font-size: 10px;
  letter-spacing: .14em;
  text-transform: uppercase;
  color: var(--graphite);
  user-select: none;
}
.cap-check input { accent-color: var(--oxblood); width: 15px; height: 15px; cursor: pointer; }
.cap-lede { font-size: 20px; max-width: 62ch; color: #33291f; }
.cap-blocks {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 32px;
  margin-top: 28px;
}
.cap-block h3 {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 10.5px;
  letter-spacing: .16em;
  text-transform: uppercase;
  color: var(--oxblood);
  padding-bottom: 8px;
  border-bottom: 1px solid var(--rule);
  margin-bottom: 10px;
  font-weight: 500;
}
.cap-block li {
  padding: 4px 0 4px 16px;
  position: relative;
  font-size: 16.5px;
  line-height: 1.5;
}
.cap-block li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 13px;
  width: 6px;
  height: 1px;
  background: var(--oxblood);
}
.cap-note {
  margin-top: 26px;
  padding: 14px 18px;
  background: var(--paper-2);
  border-left: 2px solid var(--rule);
  font-size: 16.5px;
  font-style: italic;
  color: #3f3429;
  max-width: 68ch;
}

/* ---------- close ---------- */
.cap-close { padding: 64px 0 8px; }
.cap-close-line {
  font-size: clamp(24px, 3vw, 34px);
  line-height: 1.3;
  max-width: 40ch;
  margin: 14px 0 18px;
  letter-spacing: -.01em;
}
.cap-close-line em { font-style: italic; color: var(--oxblood); }
.cap-close-sub { color: var(--graphite); max-width: 56ch; font-size: 17px; }

/* ---------- responsive ---------- */
@media (max-width: 980px) {
  .cap-hero {
    grid-template-columns: 1fr;
    gap: 40px;
    padding: 48px 24px 40px;
  }
  .cap-hero-wheel { max-width: 460px; margin: 0 auto; width: 100%; }
  .cap-body { grid-template-columns: 1fr; gap: 0; padding: 0 24px 72px; }
  .cap-rail {
    position: static;
    padding: 24px 0 0;
    margin-bottom: 8px;
  }
  .cap-rail ol {
    display: flex;
    gap: 6px;
    overflow-x: auto;
    padding-bottom: 8px;
    scrollbar-width: none;
  }
  .cap-rail ol::-webkit-scrollbar { display: none; }
  .cap-rail li { flex: 0 0 auto; }
  .cap-rail-btn { white-space: nowrap; padding: 6px 12px; border: 1px solid var(--rule); }
  .cap-rail-opt { display: none; }
  .cap-check { margin-left: 0; width: 100%; }
}
@media (max-width: 560px) {
  .cap-root { font-size: 16px; }
  .cap-showcase { width: 100%; }
  .cap-blocks { grid-template-columns: 1fr; gap: 24px; }
}

/* ---------- a11y ---------- */
.cap-root button:focus-visible,
.cap-root .cap-node:focus-visible circle,
.cap-root input:focus-visible {
  outline: 2px solid var(--oxblood);
  outline-offset: 3px;
}
@media (prefers-reduced-motion: reduce) {
  .cap-root *, .cap-root *::before, .cap-root *::after {
    transition-duration: .01ms !important;
    animation-duration: .01ms !important;
  }
}
`;
