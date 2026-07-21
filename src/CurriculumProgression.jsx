import React, { useState, useRef, useEffect } from "react";

/**
 * CurriculumProgression
 * ---------------------------------------------------------------------------
 * Horizontal "journey rail" and Vertical "timeline" of the program's
 * worldbuilding milestones, each tagged with its program week.
 *
 * Steps = the six graded Saturday milestones (Weeks 1, 3, 5, 7, 9, 10)
 * plus the Week 13 Final Capstone Showcase. Accents run a warm earth-tone
 * ramp (ochre -> terracotta -> oxblood) that builds toward the capstone.
 */

const STEPS = [
  { n: 1, week: 1,  accent: "#C68A3A", title: "Character/Prop/Environment Blocking Foundation",
    desc: "Worldbuilding Step 1 — establish your core IP characters and signature items." },
  { n: 2, week: 3,  accent: "#BC7333", title: "Compositional Brush Library & Landscape",
    desc: "Worldbuilding Step 2 — build custom brushes from real-world imagery and construct environments." },
  { n: 3, week: 5,  accent: "#B25C2D", title: "Character Development",
    desc: "Worldbuilding Step 3 — develop symmetrical and asymmetrical character concepts, expression model sheets, and a final character study." },
  { n: 4, week: 7,  accent: "#A8482A", title: "Narrative Sequence",
    desc: "Worldbuilding Step 4 — map character consistency and tell a sequential action story." },
  { n: 5, week: 9,  accent: "#94381F", title: "Release Campaign",
    desc: "Worldbuilding Step 5 — design the promotional assets and release package for your world." },
  { n: 6, week: 10, accent: "#7E2F1A", title: "Capstone Pitch Deck",
    desc: "Worldbuilding Step 6 — compile your IP project into a showcase-ready presentation." },
  { n: 7, week: 13, accent: "#6E2D17", title: "Final Capstone Showcase",
    desc: "Present your completed world to industry panels, mentors, and peers.", final: true },
];

function Connector({ from, to, isVertical }) {
  const id = `cp-grad-${from.replace("#", "")}-${to.replace("#", "")}`;
  if (isVertical) {
    return (
      <div className="cp-connector-vertical" aria-hidden="true">
        <div style={{
          width: '2px',
          height: '24px',
          background: `linear-gradient(to bottom, ${from}, ${to})`,
          opacity: 0.65
        }} />
      </div>
    );
  }
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
  const [viewMode, setViewMode] = useState(() => {
    return (typeof window !== "undefined" && localStorage.getItem("cp-progression-view-mode")) || "horizontal";
  });
  
  const railWrapRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const toggleViewMode = (mode) => {
    setViewMode(mode);
    localStorage.setItem("cp-progression-view-mode", mode);
  };

  const checkScrollLimits = () => {
    const el = railWrapRef.current;
    if (!el || viewMode !== "horizontal") return;
    
    setShowLeftArrow(el.scrollLeft > 8);
    
    const maxScroll = el.scrollWidth - el.clientWidth;
    setShowRightArrow(el.scrollLeft < maxScroll - 8 && el.scrollWidth > el.clientWidth);
  };

  useEffect(() => {
    if (viewMode === "horizontal") {
      const el = railWrapRef.current;
      if (el) {
        el.addEventListener("scroll", checkScrollLimits);
        checkScrollLimits();
        window.addEventListener("resize", checkScrollLimits);
        
        const timer = setTimeout(checkScrollLimits, 150);
        return () => {
          el.removeEventListener("scroll", checkScrollLimits);
          window.removeEventListener("resize", checkScrollLimits);
          clearTimeout(timer);
        };
      }
    }
  }, [viewMode]);

  const scrollBy = (amount) => {
    const el = railWrapRef.current;
    if (el) {
      el.scrollBy({ left: amount, behavior: "smooth" });
    }
  };

  const isVertical = viewMode === "vertical";

  return (
    <section className={`cp-section ${isVertical ? 'cp-view-vertical' : ''}`} aria-label="Curriculum progression">
      <style>{cpStyles}</style>

      <header className="cp-header">
        <div className="cp-header-top">
          <p className="cp-eyebrow">pLAtform Launch Pad · Summer/Fall 2026</p>
          <div className="cp-view-toggle">
            <button 
              type="button"
              className={`cp-toggle-btn ${viewMode === 'horizontal' ? 'active' : ''}`}
              onClick={() => toggleViewMode('horizontal')}
              title="Horizontal Carousel"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '4px' }}>
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
              <span>Horizontal</span>
            </button>
            <button 
              type="button"
              className={`cp-toggle-btn ${viewMode === 'vertical' ? 'active' : ''}`}
              onClick={() => toggleViewMode('vertical')}
              title="Vertical List"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '4px' }}>
                <line x1="12" y1="3" x2="12" y2="21"></line>
                <line x1="6" y1="3" x2="6" y2="21"></line>
                <line x1="18" y1="3" x2="18" y2="21"></line>
              </svg>
              <span>Vertical</span>
            </button>
          </div>
        </div>
        <h2 className="cp-heading">Curriculum Progression</h2>
        <p className="cp-sub">Six graded milestones, one final showcase — a single cohesive world</p>
      </header>

      <div className="cp-rail-container">
        {viewMode === "horizontal" && showLeftArrow && (
          <button 
            type="button"
            className="cp-arrow cp-arrow-left" 
            onClick={() => scrollBy(-320)}
            aria-label="Scroll left"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>
        )}

        {viewMode === "horizontal" && showRightArrow && (
          <button 
            type="button"
            className="cp-arrow cp-arrow-right" 
            onClick={() => scrollBy(320)}
            aria-label="Scroll right"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        )}

        <div className="cp-rail-wrap" ref={railWrapRef}>
          <div className="cp-rail">
            {STEPS.map((step, i) => (
              <React.Fragment key={step.n}>
                <StepCard step={step} />
                {i < STEPS.length - 1 && (
                  <Connector from={step.accent} to={STEPS[i + 1].accent} isVertical={isVertical} />
                )}
              </React.Fragment>
            ))}
          </div>
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
  transition: all 0.3s ease;
}
.cp-header {
  margin-bottom: 36px;
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.cp-header-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 6px;
}
.cp-eyebrow {
  font-family: var(--font-mono, 'Geist Mono', monospace);
  font-size: 11px; letter-spacing: 0.16em; text-transform: uppercase;
  color: var(--accent, #A8482A); margin: 0; font-weight: 500;
}
.cp-view-toggle {
  display: flex;
  background: var(--hairline, #E6DEC9);
  padding: 3px;
  border-radius: 20px;
  gap: 2px;
  align-items: center;
}
.cp-toggle-btn {
  background: transparent;
  border: none;
  padding: 5px 12px;
  border-radius: 16px;
  cursor: pointer;
  font-family: var(--font-mono, 'Geist Mono', monospace);
  font-size: 11px;
  font-weight: 500;
  color: var(--ink-mid, #6E685E);
  display: flex;
  align-items: center;
  transition: all 0.2s ease;
}
.cp-toggle-btn:hover {
  color: var(--ink, #1C1A17);
}
.cp-toggle-btn.active {
  background: var(--card, #FBFAF6);
  color: var(--accent, #A8482A);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  font-weight: 600;
}

.cp-heading {
  font-family: var(--font-display, 'Montserrat', sans-serif);
  font-size: clamp(26px, 4.5vw, 40px); font-weight: 400; letter-spacing: -0.01em;
  margin: 0 0 8px; color: var(--ink, #1C1A17);
  line-height: 1.15;
}
.cp-sub { font-size: 13px; color: var(--ink-mute, #847C6F); margin: 0; }

.cp-rail-container {
  position: relative;
  width: 100%;
}
.cp-rail-wrap {
  overflow-x: auto;
  padding: 10px 0 16px;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: thin;
  scrollbar-color: var(--accent, #A8482A) var(--hairline, #DDD6C6);
}
.cp-rail-wrap::-webkit-scrollbar {
  height: 6px;
  display: block;
}
.cp-rail-wrap::-webkit-scrollbar-track {
  background: var(--hairline, #DDD6C6);
  border-radius: 3px;
}
.cp-rail-wrap::-webkit-scrollbar-thumb {
  background: var(--accent, #A8482A);
  border-radius: 3px;
  cursor: pointer;
}
.cp-rail-wrap::-webkit-scrollbar-thumb:hover {
  background: var(--accent-deep, #7E2F1A);
}

.cp-rail {
  display: flex;
  align-items: stretch;
  justify-content: flex-start;
  width: max-content;
  margin: 0 auto;
  padding: 0 24px;
}

.cp-card {
  position: relative;
  flex: 0 0 152px;
  background: var(--card, #FBFAF6);
  border: 1px solid var(--hairline, #DDD6C6);
  border-radius: 12px;
  padding: 16px 15px 20px;
  display: flex; flex-direction: column;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.cp-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04);
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

.cp-arrow {
  position: absolute;
  top: calc(50% + 15px);
  transform: translateY(-50%);
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: var(--card, #FBFAF6);
  border: 1px solid var(--hairline, #DDD6C6);
  color: var(--accent, #A8482A);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 10;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.06);
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}
.cp-arrow:hover {
  background: var(--accent, #A8482A);
  color: var(--card, #FBFAF6);
  border-color: var(--accent, #A8482A);
  transform: translateY(-50%) scale(1.06);
  box-shadow: 0 4px 10px rgba(168, 72, 42, 0.25);
}
.cp-arrow:active {
  transform: translateY(-50%) scale(0.95);
}
.cp-arrow-left {
  left: -14px;
}
.cp-arrow-right {
  right: -14px;
}

/* Vertical Timeline View Styles */
.cp-view-vertical .cp-rail-wrap {
  overflow-x: visible;
  padding: 0;
}
.cp-view-vertical .cp-rail {
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin: 0;
  padding: 0;
}
.cp-view-vertical .cp-card {
  flex: 0 0 auto;
  width: 100%;
  max-width: 520px;
}
.cp-connector-vertical {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 8px 0;
}

@keyframes cp-pulse {
  0%, 100% { opacity: 0.5; transform: scale(0.9); }
  50% { opacity: 1; transform: scale(1.12); }
}
@media (prefers-reduced-motion: reduce) { .cp-dot { animation: none; } }

@media (max-width: 760px) {
  .cp-header-top {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
  .cp-view-toggle {
    margin-top: 4px;
  }
  .cp-arrow {
    display: none !important;
  }
  .cp-rail-wrap {
    padding-left: 10px;
    padding-right: 10px;
  }
}
`;
