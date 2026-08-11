import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";

/* ============================================================
   STRUCTURING A PITCH DECK — pLAtform lesson presentation
   How to turn a creative concept into a client-ready story
   Joe Micallef · Ryman Arts · pLAtform curriculum

   Self-contained slide deck component.
   Keys:  ← / →  navigate   ·   N  presenter notes
          G  slide grid     ·   Home / End  first / last
   ============================================================ */

/* ---------- design tokens (pLAtform system) ---------- */
const T = {
  oxblood: "#8b3a2f",
  oxbloodDark: "#6e2d24",
  cream: "#f5efe1",
  creamDeep: "#ede4d0",
  ink: "#2b211b",
  inkSoft: "#5c4f45",
  line: "rgba(43,33,27,0.22)",
  lineSoft: "rgba(43,33,27,0.12)",
  serif: "'Newsreader', Georgia, serif",
  mono: "'IBM Plex Mono', 'Courier New', monospace",
};

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:ital,wght@0,400;0,500;0,600;1,400&family=Newsreader:ital,opsz,wght@0,6..72,300;0,6..72,400;0,6..72,500;0,6..72,600;1,6..72,300;1,6..72,400;1,6..72,500&display=swap');

.pdx-root, .pdx-root * { box-sizing: border-box; margin: 0; padding: 0; }
.pdx-root {
  width: 100%; height: 100vh; min-height: 640px;
  background: ${T.cream}; color: ${T.ink};
  font-family: ${T.serif};
  display: flex; flex-direction: column;
  overflow: hidden; position: relative;
}
.pdx-root ::selection { background: ${T.oxblood}; color: ${T.cream}; }

/* top chrome */
.pdx-top {
  display: flex; align-items: baseline; justify-content: space-between;
  padding: 18px 34px 14px; border-bottom: 1px solid ${T.line};
  flex: 0 0 auto;
}
.pdx-wordmark { font-family: ${T.mono}; font-size: 13px; letter-spacing: 0.08em; color: ${T.ink}; }
.pdx-wordmark b { color: ${T.oxblood}; font-weight: 600; }
.pdx-lessontag { font-family: ${T.mono}; font-size: 11px; letter-spacing: 0.14em; text-transform: uppercase; color: ${T.inkSoft}; }

/* stage */
.pdx-stage {
  flex: 1 1 auto; overflow: hidden; position: relative;
  display: flex; flex-direction: column;
}
.pdx-slide {
  flex: 1 1 auto; overflow-y: auto;
  padding: 40px 72px 56px;
  animation: pdxIn 320ms ease both;
}
@keyframes pdxIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: none; } }

/* kicker + title */
.pdx-kicker {
  font-family: ${T.mono}; font-size: 12px; font-weight: 500;
  letter-spacing: 0.22em; text-transform: uppercase; color: ${T.oxblood};
  margin-bottom: 14px;
}
.pdx-kicker .no { color: ${T.inkSoft}; margin-right: 14px; }
.pdx-title {
  font-family: ${T.serif}; font-weight: 500; font-size: clamp(28px, 3.6vw, 46px);
  line-height: 1.08; letter-spacing: -0.01em; max-width: 21em; margin-bottom: 10px;
}
.pdx-sub {
  font-family: ${T.serif}; font-style: italic; font-weight: 300;
  font-size: clamp(16px, 1.6vw, 21px); color: ${T.inkSoft};
  max-width: 42em; margin-bottom: 6px;
}
.pdx-rule { height: 1px; background: ${T.line}; margin: 26px 0; border: 0; }

/* generic body text */
.pdx-body { font-size: clamp(15px, 1.35vw, 19px); line-height: 1.55; font-weight: 400; }
.pdx-body em { font-style: italic; }
.pdx-mono-label {
  font-family: ${T.mono}; font-size: 11px; font-weight: 600;
  letter-spacing: 0.18em; text-transform: uppercase; color: ${T.oxblood};
  display: block; margin-bottom: 8px;
}

/* columns */
.pdx-cols { display: grid; gap: 34px; margin-top: 30px; }
.pdx-cols.c2 { grid-template-columns: 1fr 1fr; }
.pdx-cols.c3 { grid-template-columns: 1fr 1fr 1fr; }
.pdx-cols.c4 { grid-template-columns: repeat(4, 1fr); }
@media (max-width: 900px) {
  .pdx-slide { padding: 28px 26px 48px; }
  .pdx-cols.c2, .pdx-cols.c3, .pdx-cols.c4 { grid-template-columns: 1fr; gap: 20px; }
}

/* card */
.pdx-card {
  border: 1px solid ${T.line}; padding: 20px 22px; background: rgba(255,255,255,0.28);
}
.pdx-card.tint { background: ${T.creamDeep}; }
.pdx-card.ox { background: ${T.oxblood}; color: ${T.cream}; border-color: ${T.oxblood}; }
.pdx-card.ox .pdx-mono-label { color: ${T.cream}; opacity: 0.85; }
.pdx-card h4 {
  font-family: ${T.serif}; font-weight: 500; font-size: clamp(17px, 1.6vw, 22px);
  margin-bottom: 8px; line-height: 1.2;
}
.pdx-card p { font-size: clamp(14px, 1.2vw, 16.5px); line-height: 1.5; color: inherit; }
.pdx-card p + p { margin-top: 8px; }

/* numbered list rows */
.pdx-numrow {
  display: grid; grid-template-columns: 64px 1fr; gap: 18px;
  padding: 14px 0; border-bottom: 1px solid ${T.lineSoft};
  align-items: baseline;
}
.pdx-numrow:last-child { border-bottom: 0; }
.pdx-numrow .n {
  font-family: ${T.mono}; font-size: clamp(15px, 1.5vw, 19px); font-weight: 600; color: ${T.oxblood};
}
.pdx-numrow .h { font-family: ${T.serif}; font-weight: 500; font-size: clamp(16px, 1.5vw, 20px); }
.pdx-numrow .d { font-size: clamp(14px, 1.2vw, 16.5px); color: ${T.inkSoft}; line-height: 1.5; margin-top: 3px; }

/* takeaway band */
.pdx-band {
  margin-top: 30px; padding: 16px 22px;
  background: ${T.oxblood}; color: ${T.cream};
  font-family: ${T.serif}; font-style: italic; font-weight: 400;
  font-size: clamp(15px, 1.5vw, 20px); line-height: 1.45;
}
.pdx-band b { font-style: normal; font-weight: 600; }

/* formula slide */
.pdx-formula {
  font-family: ${T.mono}; font-size: clamp(16px, 2vw, 26px); line-height: 1.9;
  margin-top: 26px; padding: 26px 30px; border: 1px solid ${T.line};
  background: rgba(255,255,255,0.3);
}
.pdx-formula .slot { color: ${T.oxblood}; font-weight: 600; }
.pdx-example {
  margin-top: 22px; font-family: ${T.serif}; font-style: italic; font-weight: 400;
  font-size: clamp(17px, 1.9vw, 25px); line-height: 1.5; color: ${T.ink};
  border-left: 3px solid ${T.oxblood}; padding-left: 22px; max-width: 34em;
}

/* acts */
.pdx-act { position: relative; padding-top: 14px; }
.pdx-act::before {
  content: ""; display: block; height: 3px; background: ${T.oxblood};
  margin-bottom: 16px; width: 48px;
}
.pdx-act .actno {
  font-family: ${T.mono}; font-size: 12px; letter-spacing: 0.22em;
  text-transform: uppercase; color: ${T.oxblood}; font-weight: 600;
  display: block; margin-bottom: 6px;
}
.pdx-act h3 { font-family: ${T.serif}; font-weight: 500; font-size: clamp(19px, 2vw, 27px); margin-bottom: 8px; }
.pdx-act p { font-size: clamp(14px, 1.25vw, 17px); line-height: 1.5; color: ${T.inkSoft}; }

/* mistakes grid */
.pdx-mistake { border-top: 2px solid ${T.oxblood}; padding-top: 12px; }
.pdx-mistake .mn { font-family: ${T.mono}; font-size: 12px; color: ${T.oxblood}; font-weight: 600; }
.pdx-mistake h4 { font-family: ${T.serif}; font-weight: 500; font-size: clamp(15px, 1.4vw, 19px); margin: 4px 0 4px; }
.pdx-mistake p { font-size: clamp(13px, 1.1vw, 15px); color: ${T.inkSoft}; line-height: 1.45; }

/* checklist */
.pdx-check { display: grid; grid-template-columns: 26px 1fr; gap: 12px; padding: 10px 0; border-bottom: 1px solid ${T.lineSoft}; align-items: baseline; }
.pdx-check:last-child { border-bottom: 0; }
.pdx-check .bx {
  width: 15px; height: 15px; border: 1.5px solid ${T.oxblood}; display: inline-block;
  transform: translateY(2px);
}
.pdx-check .tx { font-size: clamp(15px, 1.4vw, 19px); line-height: 1.5; }

/* closing */
.pdx-closing { display: flex; flex-direction: column; justify-content: center; height: 100%; }
.pdx-closing .big {
  font-family: ${T.serif}; font-weight: 400; font-size: clamp(30px, 4.4vw, 58px);
  line-height: 1.15; max-width: 17em; letter-spacing: -0.01em;
}
.pdx-closing .big b { font-weight: 600; color: ${T.oxblood}; font-style: italic; }
.pdx-closing .trio {
  margin-top: 44px; display: flex; gap: 18px; flex-wrap: wrap;
  font-family: ${T.mono}; font-size: clamp(12px, 1.2vw, 15px);
  letter-spacing: 0.14em; text-transform: uppercase; color: ${T.oxblood};
}
.pdx-closing .trio span { border: 1px solid ${T.oxblood}; padding: 10px 16px; }

/* cover */
.pdx-cover { display: flex; flex-direction: column; justify-content: center; height: 100%; }
.pdx-cover .over {
  font-family: ${T.mono}; font-size: clamp(12px, 1.2vw, 14px); letter-spacing: 0.26em;
  text-transform: uppercase; color: ${T.oxblood}; font-weight: 600; margin-bottom: 26px;
}
.pdx-cover h1 {
  font-family: ${T.serif}; font-weight: 500; font-size: clamp(44px, 7vw, 92px);
  line-height: 0.98; letter-spacing: -0.02em; max-width: 10em;
}
.pdx-cover .cover-sub {
  margin-top: 26px; font-family: ${T.serif}; font-style: italic; font-weight: 300;
  font-size: clamp(18px, 2.2vw, 28px); color: ${T.inkSoft};
}
.pdx-cover .formats {
  margin-top: 40px; font-family: ${T.mono}; font-size: clamp(12px, 1.2vw, 15px);
  letter-spacing: 0.12em; text-transform: uppercase; color: ${T.ink};
}
.pdx-cover .formats i { font-style: normal; color: ${T.oxblood}; margin: 0 10px; }
.pdx-cover .byline {
  margin-top: 14px; font-family: ${T.mono}; font-size: 13px; color: ${T.inkSoft}; letter-spacing: 0.06em;
}

/* bottom chrome */
.pdx-bottom {
  flex: 0 0 auto; display: flex; align-items: center; gap: 18px;
  padding: 12px 34px 16px; border-top: 1px solid ${T.line};
  font-family: ${T.mono}; font-size: 12px; color: ${T.inkSoft};
}
.pdx-progress { flex: 1 1 auto; height: 2px; background: ${T.lineSoft}; position: relative; }
.pdx-progress .fill { position: absolute; inset: 0 auto 0 0; background: ${T.oxblood}; transition: width 260ms ease; }
.pdx-btn {
  font-family: ${T.mono}; font-size: 12px; letter-spacing: 0.08em;
  background: none; border: 1px solid ${T.line}; color: ${T.ink};
  padding: 6px 12px; cursor: pointer; transition: all 140ms ease;
}
.pdx-btn:hover { border-color: ${T.oxblood}; color: ${T.oxblood}; }
.pdx-btn.active { background: ${T.oxblood}; border-color: ${T.oxblood}; color: ${T.cream}; }
.pdx-count { min-width: 74px; text-align: center; letter-spacing: 0.1em; }

/* notes drawer */
.pdx-notes {
  position: absolute; right: 0; top: 0; bottom: 0; width: min(420px, 88vw);
  background: ${T.ink}; color: ${T.cream}; padding: 30px 28px;
  overflow-y: auto; z-index: 30;
  box-shadow: -12px 0 34px rgba(43,33,27,0.35);
  animation: pdxNotes 240ms ease both;
}
@keyframes pdxNotes { from { transform: translateX(30px); opacity: 0; } to { transform: none; opacity: 1; } }
.pdx-notes .nt { font-family: ${T.mono}; font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; color: ${T.cream}; opacity: 0.6; margin-bottom: 18px; }
.pdx-notes p { font-family: ${T.serif}; font-size: 16.5px; line-height: 1.6; font-weight: 300; margin-bottom: 14px; }
.pdx-notes p::before { content: "— "; color: ${T.oxblood}; font-weight: 600; }

/* grid overview */
.pdx-grid {
  position: absolute; inset: 0; z-index: 40; background: ${T.cream};
  padding: 34px; overflow-y: auto;
  display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 14px;
  align-content: start;
  animation: pdxIn 220ms ease both;
}
.pdx-thumb {
  border: 1px solid ${T.line}; background: rgba(255,255,255,0.35);
  padding: 14px 16px; cursor: pointer; min-height: 108px;
  display: flex; flex-direction: column; gap: 8px; transition: all 140ms ease;
  text-align: left;
}
.pdx-thumb:hover { border-color: ${T.oxblood}; transform: translateY(-2px); }
.pdx-thumb.cur { background: ${T.oxblood}; color: ${T.cream}; border-color: ${T.oxblood}; }
.pdx-thumb .tn { font-family: ${T.mono}; font-size: 11px; color: ${T.oxblood}; font-weight: 600; }
.pdx-thumb.cur .tn { color: ${T.cream}; }
.pdx-thumb .tt { font-family: ${T.serif}; font-weight: 500; font-size: 14.5px; line-height: 1.25; }

/* nav arrows */
.pdx-arrows { display: flex; gap: 8px; }
`;

/* ---------- small helpers ---------- */
const K = ({ no, children }) => (
  <div className="pdx-kicker">
    {no && <span className="no">{no}</span>}
    {children}
  </div>
);

const NumRow = ({ n, h, d }) => (
  <div className="pdx-numrow">
    <span className="n">{n}</span>
    <div>
      <div className="h">{h}</div>
      {d && <div className="d">{d}</div>}
    </div>
  </div>
);

const Check = ({ children }) => (
  <div className="pdx-check">
    <span className="bx" />
    <span className="tx">{children}</span>
  </div>
);

/* ============================================================
   SLIDES
   ============================================================ */
const SLIDES = [
  /* 1 — COVER */
  {
    kicker: null,
    short: "Cover",
    notes: [
      "Open by asking: What makes a creative idea feel real enough for someone else to support?",
      "Explain that the presentation is about selling clarity and confidence—not overselling or explaining every detail.",
    ],
    body: (
      <div className="pdx-cover">
        <div className="over">Structuring a Pitch Deck</div>
        <h1>How to turn a creative concept into a client-ready story</h1>
        <div className="cover-sub">
          Selling clarity and confidence — not overselling, not explaining everything.
        </div>
        <div className="formats">
          Animated cartoon <i>•</i> Children’s book <i>•</i> Project launch
        </div>
        <div className="byline">Joe Micallef</div>
      </div>
    ),
  },

  /* 2 — decision, not scrapbook */
  {
    kicker: "The premise",
    short: "Decision, not scrapbook",
    title: "A pitch deck guides a decision — it is not a scrapbook",
    notes: [
      "Contrast a portfolio with a pitch deck: a portfolio shows capability; a pitch deck builds a case for one idea.",
      "Ask students which information they often include because it matters to them—but may not yet matter to the client.",
    ],
    body: (
      <>
        <div className="pdx-cols c2">
          <div className="pdx-card tint">
            <span className="pdx-mono-label">The creator already knows…</span>
            <p>
              The backstory, influences, possibilities, characters, research,
              references, and dozens of directions the project could take.
            </p>
          </div>
          <div className="pdx-card ox">
            <span className="pdx-mono-label">The client needs to know…</span>
            <p>
              What the idea is, who it is for, why it matters, what it will feel
              like, how it can be made, and what decision you want next.
            </p>
          </div>
        </div>
        <div className="pdx-band">
          Your job is to <b>reduce uncertainty</b> without reducing imagination.
        </div>
      </>
    ),
  },

  /* 3 — one sentence */
  {
    kicker: "The concept sentence",
    short: "One sentence",
    title: "One sentence should hold the entire deck together",
    notes: [
      "Invite students to read the sentence aloud. If it sounds vague, the deck will probably feel vague too.",
      "The sentence is a filter: every slide should clarify or prove part of it.",
    ],
    body: (
      <>
        <div className="pdx-formula">
          A <span className="slot">[format or experience]</span>
          <br />
          for <span className="slot">[audience]</span>
          <br />
          that <span className="slot">[delivers a promise]</span>
          <br />
          because <span className="slot">[distinctive reason]</span>.
        </div>
        <div className="pdx-example">
          “An animated comedy for middle-school viewers about unfinished AI
          ideas escaping into virtual worlds — where every glitch becomes a
          character.”
        </div>
      </>
    ),
  },

  /* 4 — three acts */
  {
    kicker: "The spine",
    short: "Three acts",
    title: "The strongest pitch decks move through three acts",
    notes: [
      "The deck is not simply a list of topics. It has movement.",
      "Act 1 earns attention, Act 2 earns confidence, and Act 3 converts confidence into a next step.",
    ],
    body: (
      <>
        <div className="pdx-cols c3">
          <div className="pdx-act">
            <span className="actno">Act 1</span>
            <h3>Hook attention</h3>
            <p>Make the concept easy to understand and worth leaning toward.</p>
          </div>
          <div className="pdx-act">
            <span className="actno">Act 2</span>
            <h3>Build belief</h3>
            <p>Show the world, audience, experience, proof, and feasibility.</p>
          </div>
          <div className="pdx-act">
            <span className="actno">Act 3</span>
            <h3>Ask for movement</h3>
            <p>State the plan, scope, decision, or next conversation you want.</p>
          </div>
        </div>
        <div className="pdx-band">
          Attention → <b>confidence</b> → <b>a next step</b>. That is the whole
          machine.
        </div>
      </>
    ),
  },

  /* 5 — Act 1 slides */
  {
    kicker: "Act 1 · Slides 01–04",
    short: "Act 1: Open",
    title: "Act 1 earns attention with four opening slides",
    notes: [
      "Emphasize that the opening should create orientation, not suspense through confusion.",
      "A mysterious image can be useful—but the client should not have to guess what category of project they are seeing.",
    ],
    body: (
      <>
        <div>
          <NumRow n="01" h="Cover" d="Project name plus one visual idea. Make the category and tone immediately legible." />
          <NumRow n="02" h="Logline" d="State the concept in one memorable sentence—without backstory overload." />
          <NumRow n="03" h="Audience" d="Name the people, need, occasion, or market the idea is designed to serve." />
          <NumRow n="04" h="Why now" d="Show the timely opening: a cultural need, client goal, format shift, or opportunity." />
        </div>
        <div className="pdx-band">
          By slide four, the client should be able to <b>repeat the concept
          accurately</b>.
        </div>
      </>
    ),
  },

  /* 6 — Act 2 slides */
  {
    kicker: "Act 2 · Slides 05–08",
    short: "Act 2: Believe",
    title: "Act 2 makes the idea vivid and credible",
    notes: [
      "This is the heart of the pitch: the client begins to imagine the finished experience.",
      "Choose evidence that answers likely questions. Do not use visual references as decoration alone.",
    ],
    body: (
      <div>
        <NumRow n="05" h="World or problem" d="Where does the idea live, or what problem does it enter?" />
        <NumRow n="06" h="Core experience" d="What will the audience actually watch, read, use, or feel?" />
        <NumRow n="07" h="Characters or system" d="Who drives the story—or what components make the concept work?" />
        <NumRow n="08" h="Visual direction" d="Demonstrate tone, design language, rhythm, and recognizable choices." />
      </div>
    ),
  },

  /* 7 — Act 3 slides */
  {
    kicker: "Act 3 · Slides 09–12",
    short: "Act 3: Ask",
    title: "Act 3 turns interest into a specific next step",
    notes: [
      "Many student decks end after the visual direction. That creates admiration but not action.",
      "The ask should be proportional to the meeting. A first meeting might ask for a follow-up, not a full greenlight.",
    ],
    body: (
      <>
        <div>
          <NumRow n="09" h="Execution" d="Format, scope, production approach, key deliverables, and constraints." />
          <NumRow n="10" h="Team and credibility" d="Why this team can make the project—and what partners are still needed." />
          <NumRow n="11" h="Roadmap" d="A believable path from approval to prototype, production, launch, or publication." />
          <NumRow n="12" h="The ask" d="The exact decision: feedback, budget, greenlight, introduction, meeting, or pilot." />
        </div>
        <div className="pdx-band">
          Admiration is not action. <b>End on the decision you want.</b>
        </div>
      </>
    ),
  },

  /* 8 — different proof */
  {
    kicker: "Adapting the template",
    short: "Different proof",
    title: "Different projects require different proof",
    notes: [
      "The basic decision logic remains useful across project types, but each project must prove something different.",
      "Ask students which proof point would be most important for their own capstone concept.",
    ],
    body: (
      <>
        <div className="pdx-cols c3">
          <div className="pdx-card">
            <span className="pdx-mono-label">Animated cartoon</span>
            <h4>Prove the series engine</h4>
            <p>Premise • world • character dynamics • episode possibilities • tone • format</p>
          </div>
          <div className="pdx-card">
            <span className="pdx-mono-label">Children’s book</span>
            <h4>Prove the reading experience</h4>
            <p>Age range • emotional promise • page rhythm • visual voice • read-aloud appeal</p>
          </div>
          <div className="pdx-card">
            <span className="pdx-mono-label">Project launch</span>
            <h4>Prove audience value</h4>
            <p>Problem • proposition • experience • campaign • production plan • measures of success</p>
          </div>
        </div>
        <div className="pdx-band">
          Do not force every concept into the <b>same generic template</b>.
        </div>
      </>
    ),
  },

  /* 9 — cartoon: series engine */
  {
    kicker: "Case · Animated cartoon",
    short: "Series engine",
    title: "For an animated cartoon, prove the series engine",
    notes: [
      "A beautiful hero image is not enough. The client needs to see the repeatable source of stories.",
      "For a feature film, replace the episode engine with story arc, emotional journey, and cinematic promise.",
    ],
    body: (
      <>
        <p className="pdx-sub">
          A strong pitch shows why the idea can generate more than one good
          episode.
        </p>
        <div className="pdx-cols c2" style={{ marginTop: 22 }}>
          <div>
            <NumRow n="→" h="Premise" d="What repeats?" />
            <NumRow n="→" h="World" d="What creates stories?" />
            <NumRow n="→" h="Characters" d="What creates conflict?" />
            <NumRow n="→" h="Episodes" d="How does it expand?" />
            <NumRow n="→" h="Format" d="How is it delivered?" />
          </div>
          <div className="pdx-card tint">
            <span className="pdx-mono-label">Useful evidence</span>
            <p>Character lineup</p>
            <p>World key art</p>
            <p>Relationship map</p>
            <p>Three to five episode seeds</p>
            <p>Format statement</p>
          </div>
        </div>
      </>
    ),
  },

  /* 10 — children's book */
  {
    kicker: "Case · Children’s book",
    short: "Reading experience",
    title: "Children’s books must prove the reading experience",
    notes: [
      "A book pitch should help the client imagine turning pages—not only understand the plot.",
      "Show a few representative spreads or page-turn moments rather than attempting to place the entire manuscript on slides.",
    ],
    body: (
      <>
        <div className="pdx-card tint" style={{ marginBottom: 6 }}>
          <span className="pdx-mono-label">Start with the reader</span>
          <p>
            State the age range, reading context, emotional need, and who may be
            choosing or reading the book aloud.
          </p>
        </div>
        <div>
          <NumRow n="01" h="Story promise" d="What changes for the child or character?" />
          <NumRow n="02" h="Page rhythm" d="How do reveals, page turns, silence, and repetition work?" />
          <NumRow n="03" h="Visual voice" d="What makes the imagery recognizable and emotionally appropriate?" />
          <NumRow n="04" h="Book potential" d="Standalone title, series, classroom use, or companion material?" />
        </div>
      </>
    ),
  },

  /* 11 — project launch */
  {
    kicker: "Case · Project launch",
    short: "Problem → rollout",
    title: "A project launch must connect problem to rollout",
    notes: [
      "A launch deck connects creative direction to practical adoption.",
      "The concept should not jump directly from moodboard to timeline; make the audience value visible first.",
    ],
    body: (
      <div>
        <NumRow n="1" h="Problem" d="What is changing—or not working—for the audience?" />
        <NumRow n="2" h="Promise" d="What valuable difference will the project make?" />
        <NumRow n="3" h="Experience" d="What will people see, use, attend, or receive?" />
        <NumRow n="4" h="Campaign" d="How will the idea reach and persuade them?" />
        <NumRow n="5" h="Rollout" d="Who makes what, by when, and how is success judged?" />
      </div>
    ),
  },

  /* 12 — visuals answer questions */
  {
    kicker: "Visual evidence",
    short: "Visuals argue",
    title: "Visuals should answer questions — not merely decorate",
    notes: [
      "Teach students to annotate references with the exact quality they are borrowing—not to imply they created the reference.",
      "Replace generic mood labels with visible decisions such as low-angle framing, reduced palette, or graphic silhouette.",
    ],
    body: (
      <>
        <div className="pdx-cols c2">
          <div className="pdx-card">
            <span className="pdx-mono-label" style={{ color: T.inkSoft }}>
              Weak · a collage of references
            </span>
            <p>
              Beautiful images appear together, but the client must guess which
              choices belong to the project.
            </p>
          </div>
          <div className="pdx-card ox">
            <span className="pdx-mono-label">Strong · a visual argument</span>
            <p>
              Each image is labeled: color, composition, character language,
              texture, pacing, or production implication.
            </p>
          </div>
        </div>
        <div className="pdx-band">
          Every reference should clarify a <b>deliberate decision</b>.
        </div>
      </>
    ),
  },

  /* 13 — match depth to room */
  {
    kicker: "Audience calibration",
    short: "Match the room",
    title: "Match the deck’s depth to the people in the room",
    notes: [
      "Do not overwhelm a first conversation with every production detail.",
      "Keep a master deck, then edit down for the decision-maker and stage of the project.",
    ],
    body: (
      <>
        <div className="pdx-cols c3">
          <div className="pdx-card">
            <span className="pdx-mono-label">First client meeting</span>
            <h4>Aim for curiosity</h4>
            <p>8–12 slides</p>
            <p>Clear concept · audience value</p>
            <p>Visual tone · simple next step</p>
          </div>
          <div className="pdx-card">
            <span className="pdx-mono-label">Creative review</span>
            <h4>Aim for alignment</h4>
            <p>12–20 slides</p>
            <p>Creative rationale · alternatives</p>
            <p>System or story depth · decisions needed</p>
          </div>
          <div className="pdx-card">
            <span className="pdx-mono-label">Production partner</span>
            <h4>Aim for confidence</h4>
            <p>Scope and format · assets and dependencies</p>
            <p>Schedule · technical needs</p>
            <p>Open risks</p>
          </div>
        </div>
        <div className="pdx-band">
          One <b>master deck</b> can produce shorter, audience-specific
          versions.
        </div>
      </>
    ),
  },

  /* 14 — every slide proves */
  {
    kicker: "The proof test",
    short: "“This slide proves…”",
    title: "Every slide should prove something",
    notes: [
      "If a slide cannot complete the sentence, it may be interesting but not necessary.",
      "This test also helps write takeaway titles: the title should state what the slide proves.",
    ],
    body: (
      <>
        <p className="pdx-sub">
          Before keeping a slide, finish this sentence:{" "}
          <strong style={{ fontStyle: "normal", color: T.oxblood }}>
            “This slide proves…”
          </strong>
        </p>
        <div style={{ marginTop: 18 }}>
          <NumRow n="A" h="Audience" d="“…that we understand exactly who this is for.”" />
          <NumRow n="W" h="World" d="“…that the concept can generate compelling experiences.”" />
          <NumRow n="V" h="Visual system" d="“…that the idea has a distinctive, repeatable language.”" />
          <NumRow n="R" h="Roadmap" d="“…that there is a believable path from approval to delivery.”" />
        </div>
      </>
    ),
  },

  /* 15 — eight mistakes */
  {
    kicker: "Failure modes",
    short: "Eight mistakes",
    title: "Eight common mistakes weaken otherwise good ideas",
    notes: [
      "Ask students to identify which mistake they are most likely to make.",
      "The goal is not maximum information. The goal is the minimum complete argument.",
    ],
    body: (
      <div className="pdx-cols c4" style={{ gap: 26 }}>
        {[
          ["01", "Too much backstory", "The concept arrives late."],
          ["02", "Generic audience", "“Everyone” is not a strategy."],
          ["03", "Mood without logic", "References lack clear purpose."],
          ["04", "Plot without engine", "One story does not prove a series."],
          ["05", "Tiny, dense copy", "The presenter competes with the slide."],
          ["06", "Premature detail", "Budgets and specifications bury the promise."],
          ["07", "No feasibility", "The concept feels beautiful but impossible."],
          ["08", "No clear ask", "The meeting ends without movement."],
        ].map(([n, h, d]) => (
          <div className="pdx-mistake" key={n}>
            <span className="mn">{n}</span>
            <h4>{h}</h4>
            <p>{d}</p>
          </div>
        ))}
      </div>
    ),
  },

  /* 16 — three passes */
  {
    kicker: "Delivery",
    short: "Three passes",
    title: "Present the deck as a conversation in three passes",
    notes: [
      "Practice the transitions between slides, not only the content on each slide.",
      "When feedback begins, listen for the problem beneath a suggested solution and return to the project objective.",
    ],
    body: (
      <div className="pdx-cols c3">
        <div className="pdx-act">
          <span className="actno">Pass 1 · 30–60 seconds</span>
          <h3>Open with the promise</h3>
          <p>Name the concept, audience, and emotional or practical promise.</p>
        </div>
        <div className="pdx-act">
          <span className="actno">Pass 2 · 5–8 minutes</span>
          <h3>Guide the story</h3>
          <p>Explain what each slide proves. Do not read paragraphs aloud.</p>
        </div>
        <div className="pdx-act">
          <span className="actno">Pass 3 · Discussion</span>
          <h3>Invite the decision</h3>
          <p>Restate the ask, listen for concerns, and identify the next action.</p>
        </div>
      </div>
    ),
  },

  /* 17 — checklist */
  {
    kicker: "Before presenting",
    short: "Readiness checklist",
    title: "Run the client-readiness checklist",
    notes: [
      "Use this as a peer-review slide. A classmate should be able to answer all six questions after one presentation.",
      "If they cannot, revise the sequence or the claims before adding more detail.",
    ],
    body: (
      <>
        <div className="pdx-cols c2" style={{ alignItems: "start" }}>
          <div>
            <span className="pdx-mono-label">Can the client…</span>
            <Check>Repeat the idea in one sentence?</Check>
            <Check>Identify the audience and value?</Check>
            <Check>Imagine the finished experience?</Check>
            <Check>See what makes it distinctive?</Check>
            <Check>Understand how it could be made?</Check>
            <Check>Name the decision you are asking for?</Check>
          </div>
          <div className="pdx-card tint">
            <span className="pdx-mono-label">The final edit</span>
            <p>
              Remove any slide that is repetitive, unexplained, overly
              technical, visually weak, or unrelated to the ask.
            </p>
            <p style={{ marginTop: 12, fontStyle: "italic" }}>
              Then rehearse the deck without reading it.
            </p>
          </div>
        </div>
      </>
    ),
  },

  /* 18 — closing */
  {
    kicker: "Closing principle",
    short: "Closing",
    notes: [
      "Close by returning to the decision: a successful pitch earns permission to continue.",
      "Invite students to name the next conversation their own deck should earn.",
    ],
    body: (
      <div className="pdx-closing">
        <div className="big">
          The goal is not to explain everything. It is to make the next
          conversation feel <b>inevitable</b>.
        </div>
        <div className="trio">
          <span>Clear idea</span>
          <span>Relevant proof</span>
          <span>Confident next step</span>
        </div>
      </div>
    ),
  },
];

/* ============================================================
   COMPONENT
   ============================================================ */
export default function PitchDeckStructure() {
  const [i, setI] = useState(0);
  const [notesOpen, setNotesOpen] = useState(false);
  const [gridOpen, setGridOpen] = useState(false);

  const n = SLIDES.length;
  const go = useCallback(
    (d) => setI((p) => Math.min(n - 1, Math.max(0, p + d))),
    [n]
  );

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight" || e.key === " " || e.key === "PageDown") {
        e.preventDefault();
        setGridOpen(false);
        go(1);
      } else if (e.key === "ArrowLeft" || e.key === "PageUp") {
        e.preventDefault();
        setGridOpen(false);
        go(-1);
      } else if (e.key === "Home") {
        setI(0);
      } else if (e.key === "End") {
        setI(n - 1);
      } else if (e.key === "n" || e.key === "N") {
        setNotesOpen((v) => !v);
      } else if (e.key === "g" || e.key === "G") {
        setGridOpen((v) => !v);
      } else if (e.key === "Escape") {
        setGridOpen(false);
        setNotesOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, n]);

  const s = SLIDES[i];

  return (
    <div className="pdx-root">
      <style>{CSS}</style>

      {/* top chrome */}
      <div className="pdx-top">
        <div style={{ display: "flex", alignItems: "center", gap: "18px" }}>
          <Link to="/week/08" style={{ color: T.oxblood, fontFamily: T.mono, fontSize: "11px", textDecoration: "none", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" }}>
            ← Back to Week 08
          </Link>
          <span className="pdx-wordmark">
            p<b>LA</b>tform
          </span>
        </div>
        <span className="pdx-lessontag">Structuring a Pitch Deck · Joe Micallef</span>
      </div>

      {/* stage */}
      <div className="pdx-stage">
        <div className="pdx-slide" key={i}>
          {s.kicker && (
            <K no={String(i + 1).padStart(2, "0")}>{s.kicker}</K>
          )}
          {s.title && <h2 className="pdx-title">{s.title}</h2>}
          {s.title && <hr className="pdx-rule" />}
          <div className="pdx-body">{s.body}</div>
        </div>

        {/* presenter notes drawer */}
        {notesOpen && (
          <aside className="pdx-notes">
            <div className="nt">
              Presenter notes · Slide {i + 1} of {n}
            </div>
            {s.notes.map((t, k) => (
              <p key={k}>{t}</p>
            ))}
          </aside>
        )}

        {/* grid overview */}
        {gridOpen && (
          <div className="pdx-grid">
            {SLIDES.map((sl, k) => (
              <button
                key={k}
                className={"pdx-thumb" + (k === i ? " cur" : "")}
                onClick={() => {
                  setI(k);
                  setGridOpen(false);
                }}
              >
                <span className="tn">{String(k + 1).padStart(2, "0")}</span>
                <span className="tt">{sl.title || sl.short}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* bottom chrome */}
      <div className="pdx-bottom">
        <div className="pdx-arrows">
          <button className="pdx-btn" onClick={() => go(-1)} disabled={i === 0}>
            ←
          </button>
          <button
            className="pdx-btn"
            onClick={() => go(1)}
            disabled={i === n - 1}
          >
            →
          </button>
        </div>
        <div className="pdx-progress">
          <div className="fill" style={{ width: `${((i + 1) / n) * 100}%` }} />
        </div>
        <span className="pdx-count">
          {String(i + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}
        </span>
        <button
          className={"pdx-btn" + (gridOpen ? " active" : "")}
          onClick={() => setGridOpen((v) => !v)}
          title="Slide grid (G)"
        >
          Grid
        </button>
        <button
          className={"pdx-btn" + (notesOpen ? " active" : "")}
          onClick={() => setNotesOpen((v) => !v)}
          title="Presenter notes (N)"
        >
          Notes
        </button>
      </div>
    </div>
  );
}
