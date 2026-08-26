import { useEffect, useMemo, useRef, useState } from "react";
import anadolImg from "../assets/artist-statements/anadol-infinite-space.jpg";
import headlandsImg from "../assets/artist-statements/headlands-installation.jpg";
import lopezImg from "../assets/artist-statements/lopez-swimmers.jpg";

/* ------------------------------------------------------------------
   pLAtform • Capstone Preparation
   REAL ARTIST STATEMENTS — lesson deck + statement drafting tool

   Converted from Real_Artist_Statements_Image_Edition.pptx (11 slides).
   Design system: oxblood #8b3a2f, paper cream #f5efe1,
   IBM Plex Mono (utility), Newsreader (display / quotes).

   Keyboard: ← → to move, Home / End to jump, "?" for the index.
------------------------------------------------------------------- */

const MOVES = ["WHAT", "WHY", "HOW", "INTENT"];

const REFERENCE_LIBRARY = [
  { name: "Maya Lin — Ghost Forest", org: "Madison Square Park Conservancy", url: "https://madisonsquarepark.org/community/news/2021/11/maya-lin-artist-statement/" },
  { name: "Refik Anadol — Infinite Space", org: "ARTECHOUSE", url: "https://www.artechouse.com/news/3192/" },
  { name: "Mandy Greer — Artist Statement", org: "Artist website", url: "https://mandygreer.org/artist-statement" },
  { name: "Bailey Anderson", org: "Headlands Center for the Arts", url: "https://www.headlands.org/artist/bailey-anderson/" },
  { name: "Sherwin Rio", org: "Headlands Center for the Arts", url: "https://www.headlands.org/artist/sherwin-rio/" },
  { name: "Brendan Lopez", org: "Yale Center for British Art", url: "https://britishart.yale.edu/brendan-lopez" },
  { name: "Iyla Bhandary-Alexander", org: "Yale Center for British Art", url: "https://britishart.yale.edu/iyla-bhandary-alexander" },
  { name: "Sarah Okeke", org: "Yale Center for British Art", url: "https://britishart.yale.edu/sarah-okeke" },
  { name: "Christopher Durst", org: "Artist website", url: "https://www.christopherdurst.com/statement" },
];

/* Example slides. `moves` marks which of the four structural moves the
   statement demonstrates most clearly — the recurring meter students
   should learn to read for. */
const EXAMPLES = [
  {
    id: "lin",
    number: "01",
    artist: "Maya Lin",
    work: "Ghost Forest",
    tags: ["Research-driven", "Site-specific", "Environmental installation"],
    quote: "I wanted to bring a ghost forest to the heart of Manhattan.",
    listLabel: "What she does well",
    points: [
      "Begins with a real-world issue: climate change and forest loss.",
      "Explains why the work belongs in this specific place.",
      "Connects the installation to her larger artistic practice.",
      "Shows how research led to a concrete artistic decision.",
    ],
    keyMove: "Context → site → material choice → meaning",
    moves: ["WHAT", "WHY", "HOW", "INTENT"],
    source: { label: "Madison Square Park Conservancy", domain: "madisonsquarepark.org", url: REFERENCE_LIBRARY[0].url },
  },
  {
    id: "anadol",
    number: "02",
    artist: "Refik Anadol",
    work: "Infinite Space",
    tags: ["Technology-driven", "Data / AI", "Immersive media"],
    quote: "This collection of work represents my passion to critically pursue the intersection of machine intelligence, media, and architecture.",
    listLabel: "What he does well",
    points: [
      "Names the field of inquiry immediately.",
      "Treats technology as an artistic medium — not just a tool.",
      "Connects digital memory, architecture, perception, time, and space.",
      "States the larger ambition of the work in a compact way.",
    ],
    keyMove: "Medium + concept + intended shift in perception",
    moves: ["WHAT", "HOW", "INTENT"],
    source: { label: "ARTECHOUSE", domain: "artechouse.com", url: REFERENCE_LIBRARY[1].url },
    image: { src: anadolImg, alt: "A single figure standing inside Refik Anadol's Infinite Space, surrounded by projected white light-lines." },
  },
  {
    id: "greer",
    number: "03",
    artist: "Mandy Greer",
    work: "Artist Statement",
    tags: ["Personal", "Poetic", "Fiber, installation, photography, performance"],
    quote: "I create theatricalized spaces about desire and longing.",
    listLabel: "What she does well",
    points: [
      "Starts with an emotional idea instead of a list of media.",
      "Connects nature, mythology, desire, and transformation.",
      "Explains why crochet, sewn fabric, glitter, and found materials belong in the work.",
      "Uses a voice that feels unmistakably personal.",
    ],
    keyMove: "Emotion → material → mythology → personal voice",
    moves: ["WHAT", "WHY", "HOW"],
    source: { label: "Mandy Greer", domain: "mandygreer.org", url: REFERENCE_LIBRARY[2].url },
  },
];

const PAIR = {
  number: "04",
  title: "Two concise professional statements",
  subtitle: "Headlands Center for the Arts • Notice how quickly each artist establishes a clear direction.",
  image: { src: headlandsImg, alt: "A draped, pigmented fabric sculpture on a gallery floor." },
  cards: [
    {
      artist: "Bailey Anderson",
      media: "Installation / sculpture",
      quote: "My recent installations have reflected my relationship to loss, identity, and memory…",
      why: "The concept is immediately tied to materials: cement, hydrocal, fabric, pigment, bodily forms, and negative space.",
      moves: ["WHAT", "HOW"],
      url: REFERENCE_LIBRARY[3].url,
    },
    {
      artist: "Sherwin Rio",
      media: "Installation / performance / video / sculpture",
      quote: "As an interdisciplinary artist, I use visual metaphors…",
      why: "He names his media, introduces a central idea, and gives the viewer a clear purpose for encountering the work.",
      moves: ["WHAT", "HOW", "INTENT"],
      url: REFERENCE_LIBRARY[4].url,
    },
  ],
};

const EMERGING = [
  {
    id: "lopez",
    number: "05",
    artist: "Brendan Lopez",
    work: "Emerging artist example",
    tags: ["Yale Center for British Art", "Photography"],
    quote: "The photos that are most important to me evoke a sentiment, reflect a message, and tell a story.",
    listLabel: "Why this is useful for students",
    points: [
      "He explains how he began making photographs.",
      "He names specific skills: composition, lighting, and color.",
      "He describes the kinds of moments he wants to capture.",
      "He explains what he hopes viewers feel or recognize.",
    ],
    takeaway: "You do not need decades of experience to explain your work clearly.",
    moves: ["WHAT", "WHY", "HOW", "INTENT"],
    source: { label: "Yale Center for British Art", domain: "britishart.yale.edu", url: REFERENCE_LIBRARY[5].url },
    image: { src: lopezImg, alt: "Two swimmers photographed from above, floating in blue-green water." },
  },
  {
    id: "bhandary",
    number: "06",
    artist: "Iyla Bhandary-Alexander",
    work: "Emerging artist example",
    tags: ["Yale Center for British Art", "Digital + analog photography"],
    quote: "I use digital and analog photography to make or break assumptions about the world.",
    listLabel: "Why this is strong",
    points: [
      "States a clear artistic purpose in the opening sentence.",
      "Names recurring subjects: relationships, light, nature, and portraiture.",
      "Explains her working process with the subject and environment.",
      "Defines what makes a portrait successful for her.",
    ],
    takeaway: "Specific choices make a statement feel credible: subject, process, intention, and criteria for success.",
    moves: ["WHAT", "HOW", "INTENT"],
    source: { label: "Yale Center for British Art", domain: "britishart.yale.edu", url: REFERENCE_LIBRARY[6].url },
  },
];

const VOICES = [
  { artist: "Maya Lin", voice: "Research-driven", move: "Builds from issue → site → decision" },
  { artist: "Refik Anadol", voice: "Conceptual / tech", move: "Names medium and larger ambition" },
  { artist: "Mandy Greer", voice: "Poetic / personal", move: "Uses emotion and material as one language" },
  { artist: "Bailey Anderson", voice: "Material / visceral", move: "Links concept directly to physical form" },
  { artist: "Sherwin Rio", voice: "Concise / theoretical", move: "Defines practice and viewer challenge quickly" },
  { artist: "Brendan + Iyla", voice: "Emerging artist", move: "Personal context + process + viewer intent" },
];

const STRUCTURE = [
  { key: "WHAT", prompt: "My work / project explores…", help: "What is the artist making or exploring?" },
  { key: "WHY", prompt: "I'm interested in this because…", help: "Why does the subject or idea matter to them?" },
  { key: "HOW", prompt: "I use these materials / media / processes because…", help: "How do materials, media, process, or form support the idea?" },
  { key: "INTENT", prompt: "I want the viewer to notice / feel / question…", help: "What should the viewer notice, feel, question, or experience?" },
];

const DRAFT_KEY = "platform.artist-statement.draft.v1";
const WORD_MIN = 100;
const WORD_MAX = 175;

/* ---------------------------------------------------------------- */

const countWords = (s) => (s.trim() ? s.trim().split(/\s+/).length : 0);

function loadDraft() {
  try {
    const raw = window.localStorage.getItem(DRAFT_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    /* storage unavailable — fall through to an empty draft */
  }
  return { WHAT: "", WHY: "", HOW: "", INTENT: "" };
}

function MoveMeter({ moves, compact = false }) {
  return (
    <ol className={`as-meter${compact ? " as-meter--compact" : ""}`} aria-label="Structural moves this statement demonstrates">
      {MOVES.map((m) => {
        const on = moves.includes(m);
        return (
          <li key={m} className={on ? "is-on" : ""} aria-label={`${m}${on ? " (present)" : ""}`}>
            {m}
          </li>
        );
      })}
    </ol>
  );
}

function ExternalLink({ href, children }) {
  return (
    <a className="as-link" href={href} target="_blank" rel="noreferrer noopener">
      {children} <span aria-hidden="true">↗</span>
    </a>
  );
}

/* ----------------------------- slides ---------------------------- */

function TitleSlide() {
  return (
    <section className="as-slide as-slide--title">
      <p className="as-eyebrow">pLAtform • Capstone Preparation</p>
      <h1 className="as-title">
        Real
        <br />
        artist
        <br />
        statements
      </h1>
      <p className="as-lede">What working and emerging artists actually write about their work.</p>
      <p className="as-meta">
        Examples from Maya Lin, Refik Anadol, Mandy Greer, Headlands Center for the Arts, and Yale Center for British Art.
      </p>
      <MoveMeter moves={MOVES} />
    </section>
  );
}

function StructureSlide() {
  return (
    <section className="as-slide">
      <p className="as-eyebrow">Before the examples</p>
      <h2 className="as-h2">What should you look for?</h2>
      <p className="as-lede">A strong statement does more than describe what the artwork looks like.</p>
      <div className="as-grid4">
        {STRUCTURE.map((s) => (
          <div key={s.key} className="as-card as-card--move">
            <span className="as-movekey">{s.key}</span>
            <p>{s.help}</p>
          </div>
        ))}
      </div>
      <p className="as-rule">
        Read the statements for <strong>structure</strong> — not to copy someone else's voice.
      </p>
    </section>
  );
}

function ExampleSlide({ ex }) {
  return (
    <section className="as-slide">
      <p className="as-eyebrow">Example {ex.number}</p>
      <h2 className="as-h2">
        {ex.artist} <span className="as-dash">—</span> {ex.work}
      </h2>
      <p className="as-tags">{ex.tags.join(" • ")}</p>

      <div className="as-two">
        <div className="as-col">
          <blockquote className="as-quote">{ex.quote}</blockquote>

          {ex.keyMove && (
            <div className="as-card as-card--key">
              <span className="as-label">Key move</span>
              <p>{ex.keyMove}</p>
            </div>
          )}
          {ex.takeaway && (
            <div className="as-card as-card--takeaway">
              <span className="as-label">Student takeaway</span>
              <p>{ex.takeaway}</p>
            </div>
          )}

          <MoveMeter moves={ex.moves} compact />

          <p className="as-source">
            Source: {ex.source.label} • {ex.source.domain}
          </p>
          <ExternalLink href={ex.source.url}>Read full statement</ExternalLink>
        </div>

        <div className="as-col">
          <span className="as-label">{ex.listLabel}</span>
          <ul className="as-points">
            {ex.points.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
          {ex.image && (
            <figure className="as-figure">
              <img src={ex.image.src} alt={ex.image.alt} loading="lazy" />
            </figure>
          )}
        </div>
      </div>
    </section>
  );
}

function PairSlide() {
  return (
    <section className="as-slide">
      <div className="as-pairhead">
        <div>
          <p className="as-eyebrow">Example {PAIR.number}</p>
          <h2 className="as-h2">{PAIR.title}</h2>
          <p className="as-tags">{PAIR.subtitle}</p>
        </div>
        <figure className="as-figure as-figure--thumb">
          <img src={PAIR.image.src} alt={PAIR.image.alt} loading="lazy" />
        </figure>
      </div>

      <div className="as-two as-two--cards">
        {PAIR.cards.map((c) => (
          <article key={c.artist} className="as-card as-card--artist">
            <h3 className="as-h3">{c.artist}</h3>
            <p className="as-media">{c.media}</p>
            <blockquote className="as-quote as-quote--small">{c.quote}</blockquote>
            <span className="as-label">Why it works</span>
            <p className="as-body">{c.why}</p>
            <MoveMeter moves={c.moves} compact />
            <ExternalLink href={c.url}>Full statement</ExternalLink>
          </article>
        ))}
      </div>
    </section>
  );
}

function CompareSlide() {
  return (
    <section className="as-slide">
      <p className="as-eyebrow">Compare the voices</p>
      <h2 className="as-h2">Same purpose. Very different voices.</h2>
      <p className="as-lede">There is no single "correct" way for an artist statement to sound.</p>
      <table className="as-table">
        <thead>
          <tr>
            <th scope="col">Artist</th>
            <th scope="col">Voice</th>
            <th scope="col">Strongest move</th>
          </tr>
        </thead>
        <tbody>
          {VOICES.map((v) => (
            <tr key={v.artist}>
              <th scope="row">{v.artist}</th>
              <td>{v.voice}</td>
              <td>{v.move}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="as-rule">Don't imitate the tone. Notice the decisions each artist chooses to explain.</p>
    </section>
  );
}

function ApplySlide({ draft, setDraft }) {
  const [copied, setCopied] = useState(false);
  const total = useMemo(() => STRUCTURE.reduce((n, s) => n + countWords(draft[s.key] || ""), 0), [draft]);
  const full = useMemo(
    () => STRUCTURE.map((s) => (draft[s.key] || "").trim()).filter(Boolean).join("\n\n"),
    [draft]
  );

  const status =
    total === 0 ? "empty" : total < WORD_MIN ? "short" : total > WORD_MAX ? "long" : "target";
  const statusText = {
    empty: "Start with WHAT. One or two sentences is enough.",
    short: `${WORD_MIN - total} more words to reach the target range.`,
    target: "In the target range. Now read it aloud — can you finish in under a minute?",
    long: `${total - WORD_MAX} words over. Cut adjectives before you cut nouns.`,
  }[status];

  const update = (key) => (e) => setDraft({ ...draft, [key]: e.target.value });

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(full);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch (e) {
      /* clipboard blocked — the text is still selectable in the preview */
    }
  };

  const download = () => {
    const blob = new Blob([full + "\n"], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "artist-statement-draft.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  const clear = () => setDraft({ WHAT: "", WHY: "", HOW: "", INTENT: "" });

  return (
    <section className="as-slide">
      <p className="as-eyebrow">Apply it to the Capstone</p>
      <h2 className="as-h2">A simple structure for your own statement</h2>
      <p className="as-lede">Use the real examples as references, then write in your own voice.</p>

      <div className="as-draft">
        <div className="as-draft__fields">
          {STRUCTURE.map((s, i) => (
            <label key={s.key} className="as-field">
              <span className="as-field__head">
                <span className="as-movekey as-movekey--small">
                  <b>{i + 1}</b> {s.key}
                </span>
                <span className="as-field__count">{countWords(draft[s.key] || "")} w</span>
              </span>
              <textarea
                rows={3}
                placeholder={s.prompt}
                value={draft[s.key] || ""}
                onChange={update(s.key)}
                spellCheck
              />
            </label>
          ))}
        </div>

        <aside className="as-draft__side">
          <div className={`as-counter is-${status}`} role="status" aria-live="polite">
            <span className="as-counter__big">{total}</span>
            <span className="as-counter__label">
              words • target {WORD_MIN}–{WORD_MAX}
            </span>
            <div className="as-counter__bar" aria-hidden="true">
              <span style={{ width: `${Math.min(100, (total / (WORD_MAX + 25)) * 100)}%` }} />
              <i style={{ left: `${(WORD_MIN / (WORD_MAX + 25)) * 100}%` }} />
              <i style={{ left: `${(WORD_MAX / (WORD_MAX + 25)) * 100}%` }} />
            </div>
            <p>{statusText}</p>
          </div>

          <div className="as-card as-card--key">
            <span className="as-label">Good target</span>
            <p>
              About {WORD_MIN}–{WORD_MAX} words • first person • specific nouns and verbs • readable in under one minute
            </p>
          </div>

          <div className="as-actions">
            <button type="button" className="as-btn as-btn--primary" onClick={copy} disabled={!full}>
              {copied ? "Copied" : "Copy statement"}
            </button>
            <button type="button" className="as-btn" onClick={download} disabled={!full}>
              Download .txt
            </button>
            <button type="button" className="as-btn as-btn--quiet" onClick={clear} disabled={!full}>
              Clear
            </button>
          </div>
        </aside>
      </div>

      {full && (
        <div className="as-preview">
          <span className="as-label">Read it as one piece</span>
          <p>{full}</p>
        </div>
      )}
    </section>
  );
}

function LibrarySlide() {
  return (
    <section className="as-slide">
      <p className="as-eyebrow">Reference library</p>
      <h2 className="as-h2">Read the full statements</h2>
      <p className="as-lede">Use these published statements as models while drafting and revising your own.</p>
      <ul className="as-library">
        {REFERENCE_LIBRARY.map((r) => (
          <li key={r.url}>
            <a href={r.url} target="_blank" rel="noreferrer noopener">
              <span className="as-library__name">
                {r.name} <span aria-hidden="true">↗</span>
              </span>
              <span className="as-library__org">{r.org}</span>
            </a>
          </li>
        ))}
      </ul>
      <p className="as-rule">Click any artist name to open the published statement.</p>
    </section>
  );
}

/* ----------------------------- deck ------------------------------ */

export default function ArtistStatements() {
  const [draft, setDraft] = useState(loadDraft);
  const [index, setIndex] = useState(0);
  const [showIndex, setShowIndex] = useState(false);
  const stageRef = useRef(null);

  const slides = useMemo(
    () => [
      { id: "title", label: "Real artist statements", render: () => <TitleSlide /> },
      { id: "structure", label: "What to look for", render: () => <StructureSlide /> },
      ...EXAMPLES.map((ex) => ({ id: ex.id, label: `${ex.number} ${ex.artist}`, render: () => <ExampleSlide ex={ex} /> })),
      { id: "pair", label: "04 Anderson + Rio", render: () => <PairSlide /> },
      ...EMERGING.map((ex) => ({ id: ex.id, label: `${ex.number} ${ex.artist}`, render: () => <ExampleSlide ex={ex} /> })),
      { id: "compare", label: "Compare the voices", render: () => <CompareSlide /> },
      { id: "apply", label: "Draft your statement", render: () => <ApplySlide draft={draft} setDraft={setDraft} /> },
      { id: "library", label: "Reference library", render: () => <LibrarySlide /> },
    ],
    [draft]
  );

  const last = slides.length - 1;
  const go = (n) => setIndex(Math.max(0, Math.min(last, n)));

  useEffect(() => {
    try {
      window.localStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
    } catch (e) {
      /* storage unavailable — draft lives in memory only */
    }
  }, [draft]);

  useEffect(() => {
    const onKey = (e) => {
      const t = e.target;
      if (t && (t.tagName === "TEXTAREA" || t.tagName === "INPUT")) return;
      if (e.key === "ArrowRight" || e.key === "PageDown") go(index + 1);
      else if (e.key === "ArrowLeft" || e.key === "PageUp") go(index - 1);
      else if (e.key === "Home") go(0);
      else if (e.key === "End") go(last);
      else if (e.key === "?") setShowIndex((s) => !s);
      else if (e.key === "Escape") setShowIndex(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  useEffect(() => {
    stageRef.current?.scrollTo({ top: 0 });
    stageRef.current?.focus({ preventScroll: true });
  }, [index]);

  return (
    <div className="as-root">
      <style>{CSS}</style>

      <header className="as-bar">
        <span className="as-bar__brand">
          <span className="as-bar__logo">pLAtform</span> Capstone Preparation
        </span>
        <span className="as-bar__title">Real artist statements</span>
        <span className="as-bar__count">
          <b>{String(index + 1).padStart(2, "0")}</b> / {String(slides.length).padStart(2, "0")}
        </span>
      </header>

      <div className="as-layout">
        <nav className={`as-index${showIndex ? " is-open" : ""}`} aria-label="Slides">
          <ol>
            {slides.map((s, i) => (
              <li key={s.id}>
                <button
                  type="button"
                  className={i === index ? "is-current" : ""}
                  aria-current={i === index ? "step" : undefined}
                  onClick={() => {
                    go(i);
                    setShowIndex(false);
                  }}
                >
                  <span className="as-index__num">{String(i + 1).padStart(2, "0")}</span>
                  <span>{s.label}</span>
                </button>
              </li>
            ))}
          </ol>
          <p className="as-index__hint">← → to move • ? toggles this list</p>
        </nav>

        <main className="as-stage" ref={stageRef} tabIndex={-1} aria-live="polite">
          <div key={slides[index].id} className="as-stage__inner">
            {slides[index].render()}
          </div>
        </main>
      </div>

      <footer className="as-controls">
        <button type="button" className="as-btn as-btn--quiet as-controls__index" onClick={() => setShowIndex((s) => !s)}>
          Index
        </button>
        <div className="as-dots" role="tablist" aria-label="Slide position">
          {slides.map((s, i) => (
            <button
              key={s.id}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={`Go to slide ${i + 1}: ${s.label}`}
              className={i === index ? "is-current" : ""}
              onClick={() => go(i)}
            />
          ))}
        </div>
        <div className="as-controls__nav">
          <button type="button" className="as-btn" onClick={() => go(index - 1)} disabled={index === 0}>
            ← Back
          </button>
          <button type="button" className="as-btn as-btn--primary" onClick={() => go(index + 1)} disabled={index === last}>
            Next →
          </button>
        </div>
      </footer>
    </div>
  );
}

/* ------------------------------ CSS ------------------------------ */

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:ital,wght@0,400;0,500;0,600;1,400&family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;0,6..72,600;1,6..72,400;1,6..72,500&display=swap');

.as-root {
  --ox: #8b3a2f;
  --ox-deep: #5f251d;
  --ox-tint: #e9d3cc;
  --ox-wash: #f3e4df;
  --paper: #f5efe1;
  --paper-deep: #ece4d1;
  --ink: #1e1a16;
  --ink-soft: #5a524a;
  --rule: #cfc4ad;
  --mono: 'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, monospace;
  --serif: 'Newsreader', Georgia, 'Times New Roman', serif;

  display: flex;
  flex-direction: column;
  height: 100vh;
  background: var(--paper);
  color: var(--ink);
  font-family: var(--serif);
  font-size: 18px;
  line-height: 1.45;
  -webkit-font-smoothing: antialiased;
}
.as-root *, .as-root *::before, .as-root *::after { box-sizing: border-box; }
.as-root :focus-visible { outline: 2px solid var(--ox); outline-offset: 3px; }
.as-root .as-stage:focus-visible { outline: none; }

/* top bar */
.as-bar {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: 16px;
  padding: 14px 24px;
  border-bottom: 1px solid var(--rule);
  font-family: var(--mono);
  font-size: 12px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--ink-soft);
}
.as-bar__logo { color: var(--ox); font-weight: 600; text-transform: none; letter-spacing: 0; font-size: 14px; margin-right: 8px; }
.as-bar__title { text-align: center; }
.as-bar__count { text-align: right; }
.as-bar__count b { color: var(--ox); font-weight: 600; }

/* layout */
.as-layout { display: grid; grid-template-columns: 220px 1fr; flex: 1; min-height: 0; }
.as-index { overflow-y: auto; }
.as-index {
  border-right: 1px solid var(--rule);
  padding: 20px 12px 20px 20px;
  background: var(--paper-deep);
  font-family: var(--mono);
  font-size: 12px;
}
.as-index ol { list-style: none; margin: 0; padding: 0; display: grid; gap: 2px; }
.as-index button {
  width: 100%; text-align: left; display: flex; gap: 10px; align-items: baseline;
  padding: 7px 8px; border: 0; border-radius: 3px; background: transparent;
  font: inherit; color: var(--ink-soft); cursor: pointer; line-height: 1.3;
}
.as-index button:hover { background: var(--paper); color: var(--ink); }
.as-index button.is-current { background: var(--ox); color: var(--paper); }
.as-index__num { opacity: 0.6; font-variant-numeric: tabular-nums; }
.as-index button.is-current .as-index__num { opacity: 1; }
.as-index__hint { margin: 18px 0 0; color: var(--ink-soft); font-size: 11px; line-height: 1.5; }

.as-stage { overflow-y: auto; outline: none; }
.as-stage__inner { max-width: 1040px; margin: 0 auto; padding: 44px 40px 56px; animation: as-in 260ms ease-out; }
@keyframes as-in { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: none; } }

/* type */
.as-eyebrow {
  font-family: var(--mono); font-size: 12px; letter-spacing: 0.12em; text-transform: uppercase;
  color: var(--ox); margin: 0 0 12px; font-weight: 500;
}
.as-title {
  font-family: var(--serif); font-weight: 500; font-size: clamp(56px, 9vw, 112px);
  line-height: 0.92; letter-spacing: -0.02em; margin: 0 0 28px; color: var(--ox);
  text-transform: uppercase;
}
.as-h2 { font-family: var(--serif); font-weight: 500; font-size: clamp(30px, 4.2vw, 44px); line-height: 1.08; letter-spacing: -0.01em; margin: 0 0 10px; }
.as-h3 { font-family: var(--mono); font-weight: 600; font-size: 15px; letter-spacing: 0.06em; text-transform: uppercase; margin: 0 0 4px; }
.as-dash { color: var(--ox); font-weight: 400; }
.as-lede { font-size: 21px; margin: 0 0 22px; max-width: 62ch; color: var(--ink); }
.as-meta { font-family: var(--mono); font-size: 13px; color: var(--ink-soft); max-width: 60ch; margin: 0 0 28px; line-height: 1.6; }
.as-tags { font-family: var(--mono); font-size: 13px; color: var(--ink-soft); margin: 0 0 26px; }
.as-media { font-family: var(--mono); font-size: 12px; color: var(--ink-soft); margin: 0 0 14px; }
.as-body { margin: 0 0 14px; }
.as-label {
  display: block; font-family: var(--mono); font-size: 11px; letter-spacing: 0.12em;
  text-transform: uppercase; color: var(--ink-soft); margin: 0 0 8px; font-weight: 500;
}
.as-rule {
  margin: 26px 0 0; padding-top: 16px; border-top: 1px solid var(--rule);
  font-family: var(--mono); font-size: 14px; color: var(--ink-soft);
}
.as-rule strong { color: var(--ox); font-weight: 600; }
.as-source { font-family: var(--mono); font-size: 12px; color: var(--ink-soft); margin: 18px 0 6px; }
.as-link { font-family: var(--mono); font-size: 13px; color: var(--ox); text-decoration: none; border-bottom: 1px solid var(--ox); padding-bottom: 1px; }
.as-link:hover { color: var(--ox-deep); border-color: var(--ox-deep); }

/* quote */
.as-quote {
  margin: 0 0 22px; padding: 6px 0 6px 22px; border-left: 4px solid var(--ox);
  font-family: var(--serif); font-style: italic; font-weight: 500;
  font-size: clamp(22px, 2.6vw, 28px); line-height: 1.25; color: var(--ink);
}
.as-quote::before { content: '\\201C'; }
.as-quote::after { content: '\\201D'; }
.as-quote--small { font-size: 20px; margin-bottom: 16px; }

/* cards */
.as-card { border-radius: 4px; padding: 16px 18px; }
.as-card p { margin: 0; }
.as-card--key { background: var(--ox-wash); border: 1px solid var(--ox-tint); margin: 0 0 18px; }
.as-card--key p { font-family: var(--mono); font-size: 14px; font-weight: 500; color: var(--ox-deep); line-height: 1.5; }
.as-card--takeaway { background: var(--paper-deep); border: 1px solid var(--rule); margin: 0 0 18px; }
.as-card--takeaway p { font-size: 19px; font-weight: 500; line-height: 1.3; }
.as-card--move { background: #fff; border: 1px solid var(--rule); min-height: 130px; }
.as-card--move p { margin-top: 10px; font-size: 16px; line-height: 1.4; color: var(--ink); }
.as-card--artist { background: #fff; border: 1px solid var(--rule); padding: 22px 24px; }
.as-movekey {
  display: inline-block; font-family: var(--mono); font-weight: 600; font-size: 13px; letter-spacing: 0.14em;
  color: var(--paper); background: var(--ox); padding: 4px 8px; border-radius: 2px;
}
.as-movekey--small { font-size: 11px; padding: 3px 7px; }
.as-movekey b { font-weight: 400; opacity: 0.75; margin-right: 4px; }

/* grids */
.as-grid4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; }
.as-two { display: grid; grid-template-columns: 1.1fr 1fr; gap: 40px; align-items: start; }
.as-two--cards { grid-template-columns: 1fr 1fr; gap: 20px; }
.as-col { min-width: 0; }
.as-points { margin: 0 0 22px; padding-left: 20px; }
.as-points li { margin: 0 0 8px; padding-left: 4px; }
.as-points li::marker { color: var(--ox); }
.as-figure { margin: 0; }
.as-figure img { display: block; width: 100%; height: auto; border-radius: 3px; border: 1px solid var(--rule); }
.as-figure--thumb { width: 240px; flex: none; }
.as-pairhead { display: flex; justify-content: space-between; gap: 28px; align-items: flex-start; margin-bottom: 8px; }

/* move meter — the recurring motif */
.as-meter { list-style: none; margin: 0 0 8px; padding: 0; display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 4px; max-width: 460px; }
.as-meter li {
  font-family: var(--mono); font-size: 12px; letter-spacing: 0.12em; font-weight: 500;
  text-align: center; padding: 8px 4px; border: 1px solid var(--ox); color: var(--ox); border-radius: 2px;
}
.as-meter li.is-on { background: var(--ox); color: var(--paper); }
.as-meter--compact { max-width: 320px; margin-bottom: 4px; }
.as-meter--compact li { font-size: 10px; padding: 5px 2px; }

/* table */
.as-table { width: 100%; border-collapse: collapse; margin: 6px 0 0; font-size: 17px; }
.as-table th, .as-table td { text-align: left; padding: 12px 14px; border-bottom: 1px solid var(--rule); vertical-align: top; }
.as-table thead th { font-family: var(--mono); font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase; color: var(--ink-soft); font-weight: 500; border-bottom: 2px solid var(--ox); }
.as-table tbody th { font-family: var(--mono); font-size: 13px; letter-spacing: 0.06em; text-transform: uppercase; font-weight: 600; color: var(--ox); white-space: nowrap; }
.as-table td:nth-child(2) { color: var(--ink-soft); }

/* drafting tool */
.as-draft { display: grid; grid-template-columns: 1.4fr 1fr; gap: 28px; align-items: start; }
.as-draft__fields { display: grid; gap: 14px; }
.as-field { display: block; }
.as-field__head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px; }
.as-field__count { font-family: var(--mono); font-size: 11px; color: var(--ink-soft); font-variant-numeric: tabular-nums; }
.as-field textarea {
  width: 100%; resize: vertical; min-height: 84px; padding: 12px 14px; border-radius: 3px;
  border: 1px solid var(--rule); background: #fff; color: var(--ink);
  font-family: var(--serif); font-size: 18px; line-height: 1.45;
}
.as-field textarea::placeholder { color: #a2988a; font-style: italic; }
.as-field textarea:focus { border-color: var(--ox); outline: none; box-shadow: 0 0 0 3px var(--ox-tint); }
.as-draft__side { display: grid; gap: 14px; position: sticky; top: 0; }
.as-counter { background: #fff; border: 1px solid var(--rule); border-radius: 4px; padding: 18px 18px 14px; }
.as-counter__big { display: block; font-family: var(--serif); font-size: 64px; line-height: 1; font-weight: 500; color: var(--ox); font-variant-numeric: tabular-nums; }
.as-counter__label { display: block; font-family: var(--mono); font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--ink-soft); margin: 6px 0 12px; }
.as-counter__bar { position: relative; height: 8px; background: var(--paper-deep); border-radius: 4px; overflow: visible; }
.as-counter__bar span { position: absolute; inset: 0 auto 0 0; background: var(--ox); border-radius: 4px; transition: width 200ms ease; }
.as-counter__bar i { position: absolute; top: -4px; bottom: -4px; width: 2px; background: var(--ink); opacity: 0.5; }
.as-counter p { font-family: var(--mono); font-size: 12px; line-height: 1.5; color: var(--ink-soft); margin: 12px 0 0; }
.as-counter.is-target .as-counter__big { color: #2f6b3a; }
.as-counter.is-target .as-counter__bar span { background: #2f6b3a; }
.as-counter.is-long .as-counter__big { color: var(--ox-deep); }
.as-actions { display: flex; flex-wrap: wrap; gap: 8px; }
.as-preview { margin-top: 26px; padding: 22px 26px; background: #fff; border: 1px solid var(--rule); border-radius: 4px; }
.as-preview p { margin: 0; white-space: pre-line; font-size: 19px; line-height: 1.5; max-width: 70ch; }

/* library */
.as-library { list-style: none; margin: 0; padding: 0; display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }
.as-library a {
  display: block; padding: 16px 18px; background: #fff; border: 1px solid var(--rule); border-radius: 4px;
  text-decoration: none; color: var(--ink); transition: border-color 120ms ease, transform 120ms ease;
}
.as-library a:hover { border-color: var(--ox); transform: translateY(-1px); }
.as-library__name { display: block; font-family: var(--serif); font-weight: 500; font-size: 19px; line-height: 1.25; margin-bottom: 6px; }
.as-library__name span { color: var(--ox); }
.as-library__org { display: block; font-family: var(--mono); font-size: 11px; letter-spacing: 0.08em; text-transform: uppercase; color: var(--ink-soft); }

/* buttons */
.as-btn {
  font-family: var(--mono); font-size: 12px; letter-spacing: 0.08em; text-transform: uppercase; font-weight: 500;
  padding: 10px 16px; border-radius: 3px; border: 1px solid var(--ox); background: transparent; color: var(--ox); cursor: pointer;
  transition: background 120ms ease, color 120ms ease;
}
.as-btn:hover:not(:disabled) { background: var(--ox-wash); }
.as-btn--primary { background: var(--ox); color: var(--paper); }
.as-btn--primary:hover:not(:disabled) { background: var(--ox-deep); }
.as-btn--quiet { border-color: var(--rule); color: var(--ink-soft); }
.as-btn:disabled { opacity: 0.4; cursor: default; }

/* bottom controls */
.as-controls {
  display: grid; grid-template-columns: 1fr auto 1fr; align-items: center; gap: 16px;
  padding: 12px 24px; border-top: 1px solid var(--rule); background: var(--paper);
}
.as-controls__index { grid-column: 1; justify-self: start; display: none; }
.as-controls__nav { grid-column: 3; justify-self: end; display: flex; gap: 8px; }
.as-dots { grid-column: 2; display: flex; gap: 6px; }
.as-dots button { width: 10px; height: 10px; padding: 0; border-radius: 50%; border: 1px solid var(--ox); background: transparent; cursor: pointer; }
.as-dots button.is-current { background: var(--ox); }

/* title slide */
.as-slide--title { padding-top: 24px; }
.as-slide--title .as-meter { max-width: 420px; }

/* responsive */
@media (max-width: 900px) {
  .as-layout { grid-template-columns: 1fr; }
  .as-index { display: none; position: fixed; inset: 0; z-index: 20; padding: 24px; overflow: auto; }
  .as-index.is-open { display: block; }
  .as-controls__index { display: inline-block; }
  .as-stage__inner { padding: 28px 20px 40px; }
  .as-two, .as-two--cards, .as-draft { grid-template-columns: 1fr; gap: 24px; }
  .as-grid4 { grid-template-columns: 1fr 1fr; }
  .as-library { grid-template-columns: 1fr; }
  .as-pairhead { flex-direction: column-reverse; }
  .as-figure--thumb { width: 100%; }
  .as-draft__side { position: static; }
  .as-bar__title { display: none; }
  .as-bar { grid-template-columns: 1fr auto; }
  .as-table td:nth-child(2) { display: none; }
  .as-table thead th:nth-child(2) { display: none; }
}
@media (max-width: 520px) {
  .as-grid4 { grid-template-columns: 1fr; }
  .as-controls { grid-template-columns: 1fr auto; }
  .as-dots { display: none; }
  .as-controls__nav { grid-column: 2; }
}
@media (prefers-reduced-motion: reduce) {
  .as-stage__inner { animation: none; }
  .as-counter__bar span, .as-library a { transition: none; }
}
`;
