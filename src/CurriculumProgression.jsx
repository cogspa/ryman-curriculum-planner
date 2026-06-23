import React from "react";

/**
 * CurriculumProgression
 * ---------------------------------------------------------------------------
 * Horizontal "journey rail" of the program's worldbuilding milestones, each
 * tagged with its program week. Styled to match the pLAtform site theme —
 * paper palette, terracotta accent, Montserrat display / Geist body /
 * Geist Mono labels. Reads CSS vars from your :root when present, with
 * hardcoded fallbacks so it also works standalone.
 *
 * Steps = the six graded Saturday milestones (Weeks 1, 3, 5, 7, 9, 10)
 * plus the Week 13 Final Capstone Showcase. Accents run a warm earth-tone
 * ramp (ochre -> terracotta -> oxblood) that builds toward the capstone.
 *
 * Drop into src/ and render <CurriculumProgression /> at the top of the page.
 */

const STEPS = [
  { n: 1, week: 1,  accent: "#C68A3A", title: "Character / Prop Foundation",
    desc: "Worldbuilding Step 1 — establish your core IP characters and signature items." },
  { n: 2, week: 3,  accent: "#BC7333", title: "Compositional Brush Library & Landscape",
    desc: "Worldbuilding Step 2 — build custom brushes from real-world imagery and construct environments." },
  { n: 3, week: 5,  accent: "#B25C2D", title: "Atmospheric Space",
    desc: "Worldbuilding Step 3 — illustrate a key setting, headquarters, or terrain from your world." },
  { n: 4, week: 7,  accent: "#A8482A", title: "Narrative Sequence",
    desc: "Worldbuilding Step 4 — map character consistency and tell a sequential action story." },
  { n: 5, week: 9,  accent: "#94381F", title: "Release Campaign",
    desc: "Worldbuilding Step 5 — design the promotional assets and release package for your world." },
  { n: 6, week: 10, accent: "#7E2F1A", title: "Capstone Pitch Deck",
    desc: "Worldbuilding Step 6 — compile your IP project into a showcase-ready presentation." },
  { n: 7, week: 13, accent: "#6E2D17", title: "Final Capstone Showcase",
    desc: "Present your completed world to industry panels, mentors, and peers.", final: true },
];

function Connector({ from, to }) {
  const id = `cp-grad-${from.replace("#", "")}-${to.replace("#", "")}`;
  return (
    <div className="cp-connector" aria-hidden="true">
      <svg width="44" height="24" viewBox="0 0 44 24" fill="none">
        <defs>
          <linearGradient id={id} x1="0" y1="0" x2="44" y2="0" gradientUnits="userSpaceOnUse">
            <stop stopColor={from} />
            <stop offset="1" stopColor={to} />
          </linearGradient>
        </defs>
        <path
          d="M1 12 C 10 12, 11 5, 22 12 C 33 19, 34 12, 43 12"
          stroke={`url(#${id})`}
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.55"
        />
      </svg>
    </div>
  );
}

function StepCard({ step }) {
  return (
    <article className="cp-card" style={{ borderTop: `3px solid ${step.accent}` }}>
      <div className="cp-card-head">
        <span className="cp-num" style={{ background: step.accent }}>{step.n}</span>
        <span className="cp-week" style={{ color: step.accent, background: `${step.accent}14` }}>
          Week {step.week}
        </span>
        {step.final && (
          <span className="cp-final" style={{ color: step.accent, borderColor: step.accent }}>
            Final
          </span>
        )}
      </div>

      <h3 className="cp-title">{step.title}</h3>

      <span className="cp-dot" style={{ background: step.accent, boxShadow: `0 0 8px 1px ${step.accent}66` }} />

      <p className="cp-desc">{step.desc}</p>
    </article>
  );
}

export default function CurriculumProgression() {
  return (
    <section className="cp-section" aria-label="Curriculum progression">
      <style>{cpStyles}</style>

      <header className="cp-header">
        <p className="cp-eyebrow">pLAtform Launch Pad · Summer/Fall 2026</p>
        <h2 className="cp-heading">Curriculum Progression</h2>
        <p className="cp-sub">Six graded milestones, one final showcase — a single cohesive world</p>
      </header>

      <div className="cp-rail-wrap">
        <div className="cp-rail">
          {STEPS.map((step, i) => (
            <React.Fragment key={step.n}>
              <StepCard step={step} />
              {i < STEPS.length - 1 && <Connector from={step.accent} to={STEPS[i + 1].accent} />}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}

const cpStyles = `
.cp-section {
  background: var(--card-warm, #F6F2E8);
  border: 1px solid var(--hairline, #DDD6C6);
  border-radius: 14px;
  padding: 36px 28px 40px;
  margin-bottom: 28px;
  font-family: var(--font-sans, 'Geist', -apple-system, system-ui, sans-serif);
  color: var(--ink, #1C1A17);
}
.cp-header { text-align: center; margin-bottom: 36px; }
.cp-eyebrow {
  font-family: var(--font-mono, 'Geist Mono', monospace);
  font-size: 11px; letter-spacing: 0.16em; text-transform: uppercase;
  color: var(--accent, #A8482A); margin: 0 0 12px; font-weight: 500;
}
.cp-heading {
  font-family: var(--font-display, 'Montserrat', sans-serif);
  font-size: clamp(26px, 4.5vw, 40px); font-weight: 400; letter-spacing: -0.01em;
  margin: 0 0 8px; color: var(--ink, #1C1A17);
}
.cp-sub { font-size: 13px; color: var(--ink-mute, #847C6F); margin: 0; }

.cp-rail-wrap { overflow-x: auto; padding-bottom: 6px; -webkit-overflow-scrolling: touch; }
.cp-rail {
  display: flex; align-items: stretch; justify-content: center;
  min-width: min-content; margin: 0 auto;
}

.cp-card {
  position: relative;
  flex: 0 0 152px;
  background: var(--card, #FBFAF6);
  border: 1px solid var(--hairline, #DDD6C6);
  border-radius: 12px;
  padding: 16px 15px 20px;
  display: flex; flex-direction: column;
}
.cp-card-head { display: flex; align-items: center; gap: 7px; }
.cp-num {
  flex: 0 0 auto; width: 18px; height: 18px; border-radius: 4px;
  color: #fff; font-family: var(--font-mono, 'Geist Mono', monospace);
  font-size: 10px; font-weight: 700; line-height: 18px; text-align: center;
}
.cp-week {
  font-family: var(--font-mono, 'Geist Mono', monospace);
  font-size: 9px; letter-spacing: 0.08em; text-transform: uppercase; font-weight: 600;
  padding: 3px 8px; border-radius: 20px;
}
.cp-final {
  margin-left: auto;
  font-family: var(--font-mono, 'Geist Mono', monospace);
  font-size: 8px; letter-spacing: 0.1em; text-transform: uppercase; font-weight: 700;
  border: 1px solid; border-radius: 4px; padding: 2px 5px; line-height: 1;
}
.cp-title {
  font-family: var(--font-display, 'Montserrat', sans-serif);
  font-size: 14px; font-weight: 500; line-height: 1.25; color: var(--ink, #1C1A17);
  margin: 13px 0 0;
}
.cp-dot {
  width: 7px; height: 7px; border-radius: 50%; margin: 15px 0;
  animation: cp-pulse 2.6s ease-in-out infinite;
}
.cp-desc {
  font-size: 11.5px; line-height: 1.5; color: var(--ink-mid, #44403A); margin: 0;
}

.cp-connector {
  flex: 0 0 auto; display: flex; align-items: flex-start; justify-content: center;
  padding-top: 60px;
}

@keyframes cp-pulse {
  0%, 100% { opacity: 0.5; transform: scale(0.9); }
  50% { opacity: 1; transform: scale(1.12); }
}
@media (prefers-reduced-motion: reduce) { .cp-dot { animation: none; } }

@media (max-width: 760px) {
  .cp-rail { flex-direction: column; align-items: stretch; gap: 14px; min-width: 0; }
  .cp-card { flex: 1 1 auto; }
  .cp-connector { display: none; }
}
`;
