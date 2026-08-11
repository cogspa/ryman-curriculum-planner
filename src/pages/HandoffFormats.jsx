import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import LegalDisclaimer from "../LegalDisclaimer.jsx";

/* =========================================================================
   HandoffFormats.jsx
   "Handoff Formats: Preparing Your Work for Print, Screen, and the Final
   Presentation" — an interactive lesson module.

   Self-contained: scoped CSS, no dependencies beyond React & react-router-dom.
   ========================================================================= */

/* ---------- tiny presentational helpers ---------- */

const Tag = ({ children }) => <span className="hf-tag">{children}</span>;

const Callout = ({ label, children }) => (
  <div className="hf-callout">
    {label && <div className="hf-callout-label">{label}</div>}
    <div>{children}</div>
  </div>
);

const Quote = ({ children }) => <div className="hf-quote">{children}</div>;

const Spec = ({ rows }) => (
  <div className="hf-spec">
    {rows.map(([k, v]) => (
      <div className="hf-spec-row" key={k}>
        <div className="hf-spec-k">{k}</div>
        <div className="hf-spec-v">{v}</div>
      </div>
    ))}
  </div>
);

const FormatCard = ({ name, children }) => (
  <div className="hf-format">
    <div className="hf-format-name">{name}</div>
    <div className="hf-format-desc">{children}</div>
  </div>
);

/* ---------- checklist data ---------- */

const CHECKLIST = [
  "Locate the assignments you want to include.",
  "Identify your strongest artwork.",
  "Preserve the original editable files.",
  "Separate master files from exports.",
  "Check the pixel dimensions of raster artwork.",
  "Prepare print imagery at approximately 300 PPI at final size.",
  "Keep screen/video work in RGB.",
  "Think in pixel dimensions for video rather than PPI.",
  "Establish a consistent video frame size.",
  "Export transparent graphics as PNG when appropriate.",
  "Organize your project into logical folders.",
  "Rename unclear files.",
  "Create a dedicated VIDEO_ASSETS folder.",
  "Identify which assets could become opening, development, process, hero, and ending shots.",
  "Back up the entire project.",
];

/* ---------- folder-structure sample ---------- */

const FOLDER_TREE = `FINAL_PROJECT
├── 01_BRANDING
│   ├── Logo
│   ├── Typography
│   └── Color Palette
├── 02_CHARACTERS
│   ├── Sketches
│   ├── Final Characters
│   └── Model Sheets
├── 03_ENVIRONMENTS
│   ├── Sketches
│   ├── Paintings
│   └── Backgrounds
├── 04_STORYBOARDS
├── 05_PRINT
├── 06_VIDEO_ASSETS
│   ├── PNG
│   ├── PSD
│   ├── Photos
│   └── Renders
├── 07_AUDIO
│   ├── Music
│   ├── Voice
│   └── Sound Effects
├── 08_VIDEO_PROJECT
├── 09_EXPORTS
└── 10_ARCHIVE`;

const SEQUENCE = [
  ["01 — PROJECT TITLE", "Logo + project name"],
  ["02 — THE IDEA", "Sketches, research, early concepts"],
  ["03 — DEVELOPMENT", "Characters, environments, prototypes, experimentation"],
  ["04 — THE FINAL WORK", "Finished artwork, animations, product, installation, website, or experience"],
  ["05 — DETAILS", "Close-ups, different views, interactions"],
  ["06 — ENDING", "Final hero image + project title + your name"],
];

/* ---------- lesson sections ---------- */

const SECTIONS = [
  {
    id: "destination",
    num: "1",
    title: "Start With the Destination",
    content: (
      <>
        <p>Before exporting anything, ask: <strong>Where is this going?</strong></p>
        <p>The same artwork might eventually appear in several different places:</p>
        <div className="hf-tags">
          {["Printed poster", "Book or booklet", "Postcard", "Presentation board", "Website", "Social media post", "Video", "Animation", "Portfolio", "Projected presentation"].map((t) => (
            <Tag key={t}>{t}</Tag>
          ))}
        </div>
        <p>
          Each destination has different technical requirements. That means there may not be one
          single &ldquo;final file.&rdquo; Instead, we create a <strong>master asset</strong> and then prepare
          different versions of that asset for different applications.
        </p>
      </>
    ),
  },
  {
    id: "print-vs-screen",
    num: "2",
    title: "Print and Screen Are Different Environments",
    content: (
      <>
        <p>
          One of the most important concepts to understand is the distinction between{" "}
          <strong>print resolution</strong> and <strong>screen resolution</strong>.
        </p>
        <Callout label="Print">
          <p>
            For high-quality printed artwork, prepare raster images at{" "}
            <strong>300 PPI at the final printed size</strong>. Adobe identifies 300 pixels per inch
            as an industry-standard resolution for high-quality printing.
          </p>
          <Spec
            rows={[
              ["Printed size", "8 × 10 inches"],
              ["At 300 PPI", "≈ 2400 × 3000 pixels"],
            ]}
          />
          <p>
            The important phrase is <em>&ldquo;at final size.&rdquo;</em> An image that is technically 300 PPI
            at 2 × 3 inches will become blurry if you stretch it to 11 × 17 inches.
          </p>
        </Callout>
        <Callout label="Screen & Video">
          <p>
            For digital screens, websites, and video, PPI is far less important than{" "}
            <strong>pixel dimensions</strong>. What matters is how many pixels wide and high the
            image is.
          </p>
          <Spec
            rows={[
              ["Full HD video (1080p)", "1920 × 1080 pixels"],
              ["4K UHD video", "3840 × 2160 pixels"],
              ["Instagram square", "1080 × 1080 pixels"],
            ]}
          />
        </Callout>
        <Quote>
          If your image is 1920 × 1080 pixels, a 1080p video timeline doesn&rsquo;t care whether
          Photoshop says it is 72 PPI or 300 PPI. The pixel count is what matters.
        </Quote>
      </>
    ),
  },
  {
    id: "file-formats",
    num: "3",
    title: "Common File Formats and When to Use Them",
    content: (
      <>
        <p>Different file formats serve different purposes:</p>
        <div className="hf-format-grid">
          <FormatCard name="PSD (Photoshop Document)">
            <strong>Use for:</strong> Master working files with editable layers, masks, smart
            objects, and adjustment layers.<br />
            <strong>Do not use for:</strong> Website uploads or direct video assets when flattened
            formats work better.
          </FormatCard>
          <FormatCard name="AI (Adobe Illustrator)">
            <strong>Use for:</strong> Scalable vector graphics, logos, typographic layouts, and icons.
            Vectors remain crisp at any size.
          </FormatCard>
          <FormatCard name="INDD (InDesign Document)">
            <strong>Use for:</strong> Multi-page publications, books, booklets, presentation boards,
            and complex typographic layouts that link external assets.
          </FormatCard>
          <FormatCard name="PNG (Portable Network Graphics)">
            <strong>Use for:</strong> High-quality flattened images with transparency. Excellent for
            video graphics, character overlays, logos, and UI elements.
          </FormatCard>
          <FormatCard name="JPEG (Joint Photographic Experts Group)">
            <strong>Use for:</strong> Photographs and complex digital paintings without transparency.
            Smaller file sizes, but uses lossy compression.
          </FormatCard>
          <FormatCard name="PDF (Portable Document Format)">
            <strong>Use for:</strong> Multi-page documents, printable books, and presentation decks.
            The universal standard for design review and print handoff.
          </FormatCard>
          <FormatCard name="MP4 (H.264 / H.265)">
            <strong>Use for:</strong> Finished video presentations, reels, and animations.
          </FormatCard>
        </div>
      </>
    ),
  },
  {
    id: "packaging",
    num: "4",
    title: "Packaging an InDesign Document",
    content: (
      <>
        <p>
          InDesign files do not usually contain the actual artwork. They contain <em>links</em> to the
          artwork on your computer. If you move your Photoshop files or send only the <code>.indd</code>{" "}
          file, the links will break.
        </p>
        <Callout label="How to Package">
          <ol className="hf-steps">
            <li>Open your finished layout in InDesign.</li>
            <li>Go to <strong>File &gt; Package...</strong></li>
            <li>Review the summary (fonts, links, color spaces).</li>
            <li>Click <strong>Package</strong>.</li>
            <li>Choose a destination folder.</li>
          </ol>
        </Callout>
        <p>InDesign automatically creates a folder containing:</p>
        <ul className="hf-bullets">
          <li>The <code>.indd</code> document</li>
          <li>An <code>.idml</code> file (for compatibility across versions)</li>
          <li>A <strong>Document fonts</strong> folder</li>
          <li>A <strong>Links</strong> folder with all placed imagery</li>
          <li>A print-ready PDF preview</li>
        </ul>
        <Quote>
          Packaging ensures that anyone who opens the project will see the correct fonts, images,
          and layout without missing assets.
        </Quote>
      </>
    ),
  },
  {
    id: "organizing",
    num: "5",
    title: "Organizing Assets for the Final Presentation",
    content: (
      <>
        <p>
          A strong final presentation requires an organized project folder. A clean structure
          eliminates panic on deadline day:
        </p>
        <pre className="hf-tree"><code>{FOLDER_TREE}</code></pre>
        <Callout label="File Naming Hygiene">
          <ul className="hf-bullets">
            <li>Never name a file <code>final.psd</code> or <code>final_FINAL_v2.indd</code>.</li>
            <li>Use descriptive names with version numbers: <code>Client_Campaign_Asset_v01.psd</code>.</li>
            <li>Avoid spaces in file names for web and video assets; use underscores or hyphens.</li>
          </ul>
        </Callout>
      </>
    ),
  },
  {
    id: "video-handoff",
    num: "6",
    title: "Preparing Assets for Video and Motion",
    content: (
      <>
        <p>
          When preparing artwork for video editing software (Premiere Pro, After Effects, DaVinci
          Resolve):
        </p>
        <ul className="hf-bullets">
          <li>
            <strong>Export transparent elements as PNG:</strong> Logos, character cutouts, and
            graphic overlays should have transparent backgrounds.
          </li>
          <li>
            <strong>Oversize images for camera moves:</strong> If you plan to slowly pan or zoom
            across an illustration in a 1080p video, make the artwork at least 3840 × 2160 pixels so
            it stays sharp during the zoom.
          </li>
          <li>
            <strong>Use standard aspect ratios:</strong> 16:9 (1920 × 1080 or 3840 × 2160) is the
            standard landscape video ratio. 9:16 (1080 × 1920) is standard for mobile reels.
          </li>
          <li>
            <strong>Keep audio organized:</strong> Place voice tracks, background music, and sound
            effects in designated folders.
          </li>
        </ul>
        <p>A classic narrative sequence structure for a portfolio presentation reel:</p>
        <div className="hf-sequence">
          {SEQUENCE.map(([title, desc], idx) => (
            <React.Fragment key={title}>
              <div className="hf-seq-item">
                <div className="hf-seq-title">{title}</div>
                <div className="hf-seq-desc">{desc}</div>
              </div>
              {idx < SEQUENCE.length - 1 && <div className="hf-seq-arrow">↓</div>}
            </React.Fragment>
          ))}
        </div>
      </>
    ),
  },
  {
    id: "summary",
    num: "7",
    title: "The Core Takeaway",
    content: (
      <>
        <p>
          Consider a single finished character illustration. Depending on the application, you may
          need:
        </p>
        <Spec
          rows={[
            ["Master working file", "Layered PSD with original sketches and paint layers"],
            ["Print", "11 × 17 inches · 300 PPI · print-ready PDF"],
            ["Video", "1920 × 1080 or larger · RGB · PNG or PSD asset"],
            ["Website", "Optimized RGB JPEG, PNG, or WebP"],
            ["Social media", "Platform-specific crop"],
            ["Portfolio", "High-quality screen image"],
          ]}
        />
        <p>
          The artwork is the same. <strong>The handoff format changes depending on its
          destination.</strong> That is one of the most important concepts in professional
          production.
        </p>
      </>
    ),
  },
];

/* ---------- main component ---------- */

export default function HandoffFormats() {
  const [open, setOpen] = useState(() => new Set([SECTIONS[0].id]));
  const [checked, setChecked] = useState(() => new Set());

  const allOpen = open.size === SECTIONS.length;

  const toggleSection = (id) => {
    setOpen((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const toggleAll = () => {
    setOpen(allOpen ? new Set() : new Set(SECTIONS.map((s) => s.id)));
  };

  const toggleCheck = (i) => {
    setChecked((prev) => {
      const next = new Set(prev);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });
  };

  const progress = useMemo(
    () => Math.round((checked.size / CHECKLIST.length) * 100),
    [checked]
  );

  const jump = (id) => {
    setOpen((prev) => new Set(prev).add(id));
    requestAnimationFrame(() => {
      const el = document.getElementById(`hf-${id}`);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  return (
    <div className="hf-root">
      <style>{styles}</style>

      {/* ---------- top navigation bar ---------- */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
        <Link to="/week/08" style={backLinkStyle}>
          ← Back to Week 08
        </Link>
        <Link to="/week/08/receiving-constructive-art-direction" style={companionLinkStyle}>
          Discussion: Constructive Art Direction →
        </Link>
      </div>

      {/* ---------- header ---------- */}
      <header className="hf-hero">
        <div className="hf-kicker">Week 08 Refinement & Presentation · Tuesday Workflow Breakdown</div>
        <h1>
          Handoff Formats
          <span className="hf-sub">
            Preparing Your Work for Print, Screen, and the Final Presentation
          </span>
        </h1>
        <p>
          As we move toward the final presentation, we are entering a different stage of the
          creative process. Up until now, much of our work has focused on <em>creating</em> things:
          sketches, illustrations, character designs, environments, typography, branding,
          storyboards, animation tests, photographs, and experiments. Now we need to start thinking
          like a <strong>production team</strong>.
        </p>
        <div className="hf-hero-quotes">
          <div className="hf-hero-q hf-dim">
            The question is no longer simply: &ldquo;Does the artwork look good?&rdquo;
          </div>
          <div className="hf-hero-q">
            We also need to ask: &ldquo;What is this artwork going to be used for, and is the file
            properly prepared for that use?&rdquo;
          </div>
        </div>
        <p>
          A professional designer, illustrator, animator, or creative technologist needs to
          understand the difference between the working file, the print file, the screen asset, and
          the final presentation file.
        </p>
      </header>

      {/* ---------- table of contents ---------- */}
      <nav className="hf-toc" aria-label="Lesson sections">
        <div className="hf-toc-head">
          <span>Sections</span>
          <button className="hf-btn" onClick={toggleAll}>
            {allOpen ? "Collapse all" : "Expand all"}
          </button>
        </div>
        <ol className="hf-toc-list">
          {SECTIONS.map((s) => (
            <li key={s.id}>
              <button className="hf-toc-link" onClick={() => jump(s.id)}>
                <span className="hf-toc-num">{s.num}</span>
                <span>{s.title}</span>
              </button>
            </li>
          ))}
        </ol>
      </nav>

      {/* ---------- sections list ---------- */}
      <main className="hf-main">
        {SECTIONS.map((s) => {
          const isOpen = open.has(s.id);
          return (
            <article className="hf-sec" id={`hf-${s.id}`} key={s.id}>
              <button
                className="hf-sec-toggle"
                onClick={() => toggleSection(s.id)}
                aria-expanded={isOpen}
              >
                <span className="hf-sec-num">{s.num}</span>
                <span className="hf-sec-title">{s.title}</span>
                <span className="hf-sec-icon" aria-hidden="true">
                  {isOpen ? "−" : "+"}
                </span>
              </button>
              {isOpen && <div className="hf-sec-body">{s.content}</div>}
            </article>
          );
        })}

        {/* ---------- summary goal card ---------- */}
        <section className="hf-goal">
          <h2>The Goal</h2>
          <div className="hf-goal-grid">
            <div className="hf-goal-card">
              <div className="hf-goal-num">1</div>
              <h3>The Work</h3>
              <p>Everything you have created.</p>
            </div>
            <div className="hf-goal-card">
              <div className="hf-goal-num">2</div>
              <h3>The System</h3>
              <p>How the files are named, organized, sized, and exported.</p>
            </div>
            <div className="hf-goal-card">
              <div className="hf-goal-num">3</div>
              <h3>The Story</h3>
              <p>
                How those assets are assembled into a presentation that communicates what you
                created and why it matters.
              </p>
            </div>
          </div>
          <p>
            We are no longer simply completing individual assignments. We are now curating,
            organizing, editing, and presenting a <strong>body of work</strong> — the transition
            from making individual pieces to building a professional presentation.
          </p>
        </section>

        {/* ---------- checklist ---------- */}
        <section className="hf-checklist">
          <div className="hf-check-head">
            <h2>Production Checklist</h2>
            <div className="hf-progress-wrap">
              <div className="hf-progress-text">
                {checked.size} / {CHECKLIST.length} complete
              </div>
              <div className="hf-progress">
                <div className="hf-progress-bar" style={{ width: `${progress}%` }} />
              </div>
            </div>
          </div>
          <p className="hf-check-sub">
            Before the next stage of the final project, begin checking the following:
          </p>
          <ul className="hf-check-list">
            {CHECKLIST.map((item, i) => (
              <li key={item}>
                <label className={checked.has(i) ? "hf-checked" : ""}>
                  <input
                    type="checkbox"
                    checked={checked.has(i)}
                    onChange={() => toggleCheck(i)}
                  />
                  <span>{item}</span>
                </label>
              </li>
            ))}
          </ul>
          <p className="hf-check-foot">
            The goal is not simply to have a pile of finished assignments. The goal is to transform
            everything you have created into an organized body of assets that can now become a
            print presentation, a video, a website, and a professional final project.
          </p>
        </section>

        <div style={{ marginTop: '40px' }}>
          <LegalDisclaimer />
        </div>
      </main>
    </div>
  );
}

/* ---------- top links inline styles ---------- */
const backLinkStyle = {
  fontFamily: 'Menlo, monospace',
  fontSize: '11px',
  color: '#b4552d',
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  textDecoration: 'none',
  display: 'inline-block',
  fontWeight: 'bold',
};

const companionLinkStyle = {
  fontFamily: 'Menlo, monospace',
  fontSize: '11px',
  color: '#b4552d',
  letterSpacing: '0.08em',
  textDecoration: 'none',
  display: 'inline-block',
  borderBottom: '1px dotted #b4552d',
};

/* ---------- styles (scoped by the hf- prefix) ---------- */

const styles = `
  .hf-root {
    --ink: #1c1c22;
    --ink-soft: #4c4c58;
    --paper: #faf9f6;
    --card: #ffffff;
    --line: #e4e1da;
    --accent: #b4552d;
    --accent-soft: #f6e8e0;
    --good: #2d6a4f;
    max-width: 860px;
    margin: 0 auto;
    padding: 40px 24px 96px;
    color: var(--ink);
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    line-height: 1.6;
    background: var(--paper);
    min-height: 100vh;
  }

  .hf-hero {
    border-bottom: 2px solid var(--ink);
    padding-bottom: 28px;
    margin-bottom: 32px;
  }
  .hf-kicker {
    font-family: "Menlo", "IBM Plex Mono", monospace;
    font-size: 11px;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--accent);
    margin-bottom: 8px;
    font-weight: 700;
  }
  .hf-hero h1 {
    font-size: clamp(28px, 4vw, 40px);
    line-height: 1.15;
    margin: 0 0 16px;
    font-weight: 800;
    letter-spacing: -0.02em;
  }
  .hf-sub {
    display: block;
    font-size: clamp(16px, 2.2vw, 20px);
    font-weight: 400;
    color: var(--ink-soft);
    margin-top: 6px;
  }
  .hf-hero p {
    font-size: 16px;
    color: var(--ink-soft);
    margin: 12px 0 0;
  }
  .hf-hero-quotes {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
    margin: 20px 0 8px;
  }
  @media (max-width: 640px) {
    .hf-hero-quotes { grid-template-columns: 1fr; }
  }
  .hf-hero-q {
    background: var(--card);
    border: 1px solid var(--line);
    border-left: 4px solid var(--accent);
    border-radius: 8px;
    padding: 14px 16px;
    font-size: 14.5px;
    font-style: italic;
  }
  .hf-hero-q.hf-dim {
    border-left-color: var(--line);
    color: var(--ink-soft);
  }

  /* toc */
  .hf-toc {
    background: var(--card);
    border: 1px solid var(--line);
    border-radius: 10px;
    padding: 18px 20px;
    margin-bottom: 32px;
  }
  .hf-toc-head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-family: "Menlo", monospace;
    font-size: 11px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--ink-soft);
    margin-bottom: 12px;
    font-weight: 700;
  }
  .hf-btn {
    background: transparent;
    border: 1px solid var(--line);
    border-radius: 6px;
    padding: 4px 10px;
    font-family: inherit;
    font-size: 11px;
    cursor: pointer;
    color: var(--ink);
  }
  .hf-btn:hover { background: var(--accent-soft); border-color: var(--accent); }
  .hf-toc-list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 8px 16px;
  }
  .hf-toc-link {
    background: none;
    border: none;
    padding: 4px 0;
    display: flex;
    align-items: center;
    gap: 10px;
    font-family: inherit;
    font-size: 13.5px;
    color: var(--ink);
    cursor: pointer;
    text-align: left;
    width: 100%;
  }
  .hf-toc-link:hover { color: var(--accent); }
  .hf-toc-num {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 22px;
    height: 22px;
    border-radius: 50%;
    background: var(--accent-soft);
    color: var(--accent);
    font-size: 11px;
    font-weight: 700;
    flex-shrink: 0;
  }

  /* section accordion */
  .hf-sec {
    background: var(--card);
    border: 1px solid var(--line);
    border-radius: 10px;
    margin-bottom: 16px;
    overflow: hidden;
    transition: border-color 0.15s ease;
  }
  .hf-sec:hover { border-color: #cbcaa6; }
  .hf-sec-toggle {
    width: 100%;
    background: transparent;
    border: none;
    padding: 18px 22px;
    display: flex;
    align-items: center;
    gap: 14px;
    font-family: inherit;
    font-size: 17px;
    font-weight: 700;
    color: var(--ink);
    cursor: pointer;
    text-align: left;
  }
  .hf-sec-num {
    font-family: "Menlo", monospace;
    font-size: 12px;
    color: var(--accent);
    font-weight: 700;
  }
  .hf-sec-title { flex: 1; }
  .hf-sec-icon { font-size: 20px; font-weight: 400; color: var(--ink-soft); }
  .hf-sec-body {
    padding: 0 24px 24px;
    border-top: 1px solid var(--line);
    font-size: 15px;
  }
  .hf-sec-body p { margin: 16px 0 0; }

  /* tags */
  .hf-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin: 14px 0 10px;
  }
  .hf-tag {
    background: var(--accent-soft);
    color: var(--accent);
    border: 1px solid rgba(180,85,45,0.25);
    padding: 3px 10px;
    border-radius: 999px;
    font-size: 12.5px;
    font-weight: 500;
  }

  /* callouts */
  .hf-callout {
    background: var(--paper);
    border: 1px solid var(--line);
    border-radius: 8px;
    padding: 16px 18px;
    margin: 16px 0;
  }
  .hf-callout-label {
    font-family: "Menlo", monospace;
    font-size: 10.5px;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--accent);
    font-weight: 700;
    margin-bottom: 6px;
  }
  .hf-callout p { margin: 0; }

  /* quotes */
  .hf-quote {
    border-left: 3px solid var(--accent);
    padding-left: 14px;
    font-style: italic;
    color: var(--ink);
    margin: 16px 0;
  }

  /* specs table */
  .hf-spec {
    border: 1px solid var(--line);
    border-radius: 8px;
    overflow: hidden;
    margin: 14px 0;
    font-size: 13.5px;
  }
  .hf-spec-row {
    display: grid;
    grid-template-columns: 180px 1fr;
    border-bottom: 1px solid var(--line);
  }
  .hf-spec-row:last-child { border-bottom: none; }
  @media (max-width: 520px) {
    .hf-spec-row { grid-template-columns: 1fr; }
  }
  .hf-spec-k {
    background: var(--paper);
    padding: 8px 12px;
    font-weight: 600;
    color: var(--ink-soft);
    font-family: "Menlo", monospace;
    font-size: 11.5px;
  }
  .hf-spec-v {
    padding: 8px 12px;
    background: var(--card);
  }

  /* format cards */
  .hf-format-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: 12px;
    margin: 16px 0;
  }
  .hf-format {
    background: var(--paper);
    border: 1px solid var(--line);
    border-radius: 8px;
    padding: 14px 16px;
  }
  .hf-format-name {
    font-family: "Menlo", monospace;
    font-size: 12px;
    font-weight: 700;
    color: var(--accent);
    letter-spacing: 0.04em;
    margin-bottom: 6px;
  }
  .hf-format-desc { font-size: 13.5px; color: var(--ink); line-height: 1.5; }

  /* steps & bullets */
  .hf-steps { margin: 8px 0 0; padding-left: 20px; }
  .hf-steps li { margin-bottom: 4px; }
  .hf-bullets { margin: 10px 0 0; padding-left: 20px; }
  .hf-bullets li { margin-bottom: 4px; }

  /* tree */
  .hf-tree {
    background: #1e1e24;
    color: #e6e6ec;
    padding: 16px 20px;
    border-radius: 8px;
    font-family: "Menlo", "IBM Plex Mono", monospace;
    font-size: 12px;
    line-height: 1.45;
    overflow-x: auto;
    margin: 16px 0;
  }

  /* sequence */
  .hf-sequence {
    display: flex;
    flex-direction: column;
    gap: 2px;
    margin: 16px 0;
  }
  .hf-seq-item {
    background: var(--paper);
    border: 1px solid var(--line);
    border-radius: 8px;
    padding: 10px 14px;
  }
  .hf-seq-title { font-weight: 700; font-size: 13.5px; letter-spacing: 0.04em; }
  .hf-seq-desc { font-size: 13.5px; color: var(--ink-soft); }
  .hf-seq-arrow { text-align: center; color: var(--accent); padding: 3px 0; font-size: 15px; }

  /* goal */
  .hf-goal {
    margin: 40px 0; padding: 26px 26px 14px; border-radius: 12px;
    background: #23231f; color: #f2f0ea;
  }
  .hf-goal h2 { font-size: 26px; margin: 0 0 10px; }
  .hf-goal-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin: 16px 0 18px; }
  @media (max-width: 680px) { .hf-goal-grid { grid-template-columns: 1fr; } }
  .hf-goal-card {
    background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.14);
    border-radius: 10px; padding: 16px;
  }
  .hf-goal-card h3 { margin: 8px 0 6px; font-size: 15px; letter-spacing: 0.06em; text-transform: uppercase; }
  .hf-goal-card p { font-size: 14px; color: #cfccc2; margin: 0; }
  .hf-goal-num {
    width: 28px; height: 28px; border-radius: 50%; background: var(--accent);
    color: #fff; font-weight: 700; font-size: 13px;
    display: flex; align-items: center; justify-content: center;
  }

  /* checklist */
  .hf-checklist {
    background: var(--card); border: 1px solid var(--line); border-radius: 12px;
    padding: 24px 26px;
  }
  .hf-check-head {
    display: flex; justify-content: space-between; align-items: center;
    gap: 16px; flex-wrap: wrap; margin-bottom: 4px;
  }
  .hf-check-head h2 { margin: 0; font-size: 24px; }
  .hf-check-sub { color: var(--ink-soft); font-size: 15px; }
  .hf-progress-wrap { display: flex; align-items: center; gap: 10px; }
  .hf-progress-text { font-size: 12.5px; color: var(--ink-soft); white-space: nowrap; }
  .hf-progress {
    width: 140px; height: 8px; background: var(--line); border-radius: 999px; overflow: hidden;
  }
  .hf-progress-bar { height: 100%; background: var(--good); transition: width 0.25s ease; }
  .hf-check-list { list-style: none; margin: 10px 0 16px; padding: 0; }
  .hf-check-list li { border-bottom: 1px solid var(--line); }
  .hf-check-list li:last-child { border-bottom: none; }
  .hf-check-list label {
    display: flex; gap: 12px; align-items: flex-start; padding: 9px 4px;
    font-size: 14.5px; cursor: pointer; line-height: 1.5;
  }
  .hf-check-list input {
    margin-top: 4px; width: 15px; height: 15px; accent-color: var(--good);
    cursor: pointer; flex: 0 0 auto;
  }
  .hf-checked span { text-decoration: line-through; color: var(--ink-soft); }
  .hf-check-foot {
    margin: 6px 0 0; padding-top: 14px; border-top: 1px solid var(--line);
    font-style: italic; color: var(--ink-soft); font-size: 15px;
  }
`;
