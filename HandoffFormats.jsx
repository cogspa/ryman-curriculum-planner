import React, { useMemo, useState } from "react";

/* =========================================================================
   HandoffFormats.jsx
   "Handoff Formats: Preparing Your Work for Print, Screen, and the Final
   Presentation" — an interactive lesson module.

   Self-contained: no external CSS, no dependencies beyond React.
   Usage:  import HandoffFormats from "./HandoffFormats";
           <HandoffFormats />
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
            can still be too small if there are not enough pixels to reproduce it at the intended
            physical dimensions. Whenever possible, design print assets at or above their intended
            final size rather than attempting to enlarge small artwork at the end.
          </p>
        </Callout>
      </>
    ),
  },
  {
    id: "video-pixels",
    num: "3",
    title: "For Video, Think in Pixels — Not Inches",
    content: (
      <>
        <p>
          You will sometimes hear designers say: <em>&ldquo;Print is 300 PPI and screen is 72 PPI.&rdquo;</em>{" "}
          That can be a convenient reminder, but it is not really how contemporary video resolution
          works. For video, we are primarily concerned with the actual{" "}
          <strong>pixel dimensions</strong> of the frame.
        </p>
        <Spec
          rows={[
            ["Full HD", "1920 × 1080 pixels"],
            ["4K UHD", "3840 × 2160 pixels"],
          ]}
        />
        <p>
          Adobe&rsquo;s video documentation similarly defines sequence resolution through pixel
          dimensions such as 1920 × 1080 rather than physical inches. A Photoshop document that is
          1920 × 1080 pixels contains the same number of pixels on screen whether Photoshop happens
          to describe it as 72 PPI or 300 PPI.
        </p>
        <Callout>
          When preparing graphics for a 1920 × 1080 presentation, begin thinking in terms of a{" "}
          <strong>1920 × 1080 canvas</strong> rather than an 11 × 17 inch page.
        </Callout>
      </>
    ),
  },
  {
    id: "color",
    num: "4",
    title: "Print Color vs. Screen Color",
    content: (
      <>
        <p>The destination also affects color.</p>
        <Spec
          rows={[
            ["Screens, video, websites, projection", "RGB"],
            ["Commercial print production", "CMYK (when required)"],
          ]}
        />
        <p>
          Adobe similarly recommends RGB for digital-screen applications and CMYK for print
          workflows. However, don&rsquo;t automatically convert every piece of artwork to CMYK — the
          final specifications should depend on the printer and the method being used to produce the
          project. A professional workflow often keeps an original <strong>RGB master</strong> and
          creates a separate print-production version as needed.
        </p>
      </>
    ),
  },
  {
    id: "print-files",
    num: "5",
    title: "Print Files",
    content: (
      <>
        <p>
          For printed presentation materials, the basic goal is{" "}
          <strong>300 PPI at the final physical size</strong>, with appropriate color, margins, and
          bleed. If an image or color extends all the way to the edge of a printed piece, the
          artwork usually needs to extend beyond the trim line — this additional artwork is called
          the <strong>bleed</strong>. Adobe&rsquo;s Illustrator and InDesign documentation provides
          dedicated controls for adding bleeds, printer marks, and exporting print-ready PDFs.
        </p>
        <div className="hf-formats">
          <FormatCard name="PDF">Usually the preferred format for delivering completed layouts to a printer.</FormatCard>
          <FormatCard name="TIFF">High-quality raster imagery when very little or no lossy compression is wanted.</FormatCard>
          <FormatCard name="PSD">Excellent as a Photoshop working/master file — layers, masks, effects, and editable information stay intact.</FormatCard>
          <FormatCard name="AI">The editable Illustrator master for vector artwork, logos, diagrams, and typography.</FormatCard>
          <FormatCard name="JPEG">Useful for photographs and flattened imagery, but not ideal as the only archival master — JPEG reduces file size by selectively discarding image information.</FormatCard>
        </div>
      </>
    ),
  },
  {
    id: "master",
    num: "6",
    title: "Keep the Editable Master",
    content: (
      <>
        <p>
          Do not flatten or destroy your only copy of an artwork just because you need to export it.
          Think of files as existing in two categories:
        </p>
        <div className="hf-two-col">
          <Callout label="Master files — the editable source">
            <div className="hf-tags">
              {["PSD — Photoshop", "AI — Illustrator", "INDD — InDesign", "AEP — After Effects", "PRPROJ — Premiere"].map((t) => (
                <Tag key={t}>{t}</Tag>
              ))}
            </div>
            <p>These contain the construction of the project.</p>
          </Callout>
          <Callout label="Delivery files — produced from the master">
            <div className="hf-tags">
              {["PDF", "PNG", "JPEG", "TIFF", "MP4", "MOV"].map((t) => (
                <Tag key={t}>{t}</Tag>
              ))}
            </div>
            <p>Adobe specifically recommends PSD when layers, effects, and masks need to remain editable.</p>
          </Callout>
        </div>
        <Quote>Never confuse your master with your export.</Quote>
      </>
    ),
  },
  {
    id: "video-graphics",
    num: "7",
    title: "Graphics Going Into the Video",
    content: (
      <>
        <p>
          The final presentation will also contain a video component — another important handoff
          situation. Artwork created earlier in the course now needs to travel from applications
          such as Photoshop and Illustrator into Premiere Pro or After Effects.
        </p>
        <div className="hf-formats">
          <FormatCard name="PNG">
            Excellent for graphics that require transparency: logos, characters, icons, interface
            elements, typography, isolated objects.
          </FormatCard>
          <FormatCard name="PSD">
            Useful when you want to preserve Photoshop artwork and potentially work with its layers.
          </FormatCard>
          <FormatCard name="JPEG">
            Useful for photographic backgrounds or flattened artwork when transparency is
            unnecessary.
          </FormatCard>
          <FormatCard name="AI / Vector">
            Particularly useful when artwork may need to scale considerably without losing quality.
          </FormatCard>
        </div>
        <p>
          Adobe Creative Cloud supports common library graphics including AI, PNG, PSD, SVG, JPG,
          TIFF, and PDF — useful for moving assets between different parts of a Creative Cloud
          workflow.
        </p>
      </>
    ),
  },
  {
    id: "final-video",
    num: "8",
    title: "The Final Video",
    content: (
      <>
        <p>The video itself will eventually need its own delivery format.</p>
        <Spec
          rows={[
            ["Presentation copy", "H.264 / MP4 — compact, plays nearly everywhere"],
            ["High-quality master", "QuickTime / Apple ProRes"],
          ]}
        />
        <p>
          Adobe Media Encoder and Premiere support H.264 and QuickTime/ProRes workflows for
          different kinds of output.
        </p>
        <Quote>Editable project → High-quality master → Presentation copy</Quote>
        <p>
          Think of it that way — rather than thinking of your compressed MP4 as the only version of
          the project.
        </p>
      </>
    ),
  },
  {
    id: "audio",
    num: "9",
    title: "Audio Is an Asset Too",
    content: (
      <>
        <p>
          The presentation may eventually contain dialogue, narration, music, sound effects, and
          ambient sound.
        </p>
        <Spec
          rows={[
            ["Editing", "WAV — higher quality, preferable when available"],
            ["Distribution", "MP3 / AAC — compressed, smaller files"],
          ]}
        />
        <p>
          Adobe&rsquo;s media tools support formats including WAV, AIFF, MP3, AAC, and other common
          audio formats.
        </p>
      </>
    ),
  },
  {
    id: "asset-library",
    num: "10",
    title: "Your Assignment Library Is Becoming a Production Library",
    content: (
      <>
        <p>
          This is where the work completed throughout the program becomes especially important — we
          are not starting the final presentation from zero. Look through the assignments you have
          already completed. You may already have:
        </p>
        <div className="hf-tags">
          {["Character designs", "Character turnarounds", "Thumbnails", "Storyboards", "Environment paintings", "Concept art", "Logos", "Typography", "Color palettes", "Photographs", "Illustrations", "Animations", "3D renders", "Photoshop compositions", "Motion experiments", "Research", "Process images", "Sketches"].map((t) => (
            <Tag key={t}>{t}</Tag>
          ))}
        </div>
        <p>
          These aren&rsquo;t merely old assignments anymore. They are becoming your{" "}
          <strong>asset library</strong>. A professional production works in much the same way:
          artists build assets, those assets are organized, and they are then recombined, animated,
          edited, printed, repurposed, and presented.
        </p>
      </>
    ),
  },
  {
    id: "organize",
    num: "11",
    title: "Build an Organized Asset Library",
    content: (
      <>
        <p>Begin organizing your project now. For example:</p>
        <pre className="hf-tree">{FOLDER_TREE}</pre>
        <p>
          Your structure may be different depending on the project. The important thing is that{" "}
          <strong>another person should be able to open your folder and understand it</strong>. That
          is part of professional handoff.
        </p>
      </>
    ),
  },
  {
    id: "naming",
    num: "12",
    title: "Naming Files Professionally",
    content: (
      <>
        <p>Avoid files called:</p>
        <pre className="hf-tree hf-bad">{`final.psd\nfinal2.psd\nfinalFINAL.psd\nfinalFINALUSETHIS.psd`}</pre>
        <p>Instead, use descriptive names and versions:</p>
        <pre className="hf-tree hf-good">{`character_mira_modelSheet_v01.psd\ncharacter_mira_modelSheet_v02.psd\nenvironment_cityNight_v03.psd\nprojectLogo_primary_black.ai\nprojectLogo_white.png\npresentation_video_v01.mp4`}</pre>
        <p>
          This makes it much easier to understand what something is, where it belongs, and whether
          it is current.
        </p>
      </>
    ),
  },
  {
    id: "build-video",
    num: "13",
    title: "Now We Can Begin Building the Video",
    content: (
      <>
        <p>
          Once the asset library is organized, the next stage becomes much easier. Instead of
          asking <em>&ldquo;How am I going to create an entire video?&rdquo;</em> ask:
        </p>
        <Quote>
          How can I tell the story of my project using the things I have already created?
        </Quote>
        <p>Your existing artwork can become the ingredients for the video. For example:</p>
        <ul className="hf-list">
          <li>A sketch can dissolve into a finished illustration.</li>
          <li>A sheet of thumbnails can move into a final character.</li>
          <li>A storyboard can transition into an animation.</li>
          <li>An environment painting can slowly push toward a detail.</li>
          <li>A logo can animate onto the screen.</li>
          <li>A series of photographs can become a montage.</li>
          <li>A 3D model can rotate.</li>
          <li>A website can be screen-recorded.</li>
          <li>Typography can introduce different chapters.</li>
        </ul>
        <p>
          The final video therefore doesn&rsquo;t necessarily require creating everything again.{" "}
          <strong>It requires editing.</strong>
        </p>
      </>
    ),
  },
  {
    id: "sequences",
    num: "14",
    title: "Think in Sequences",
    content: (
      <>
        <p>Start putting your assets into an order. For example:</p>
        <div className="hf-seq">
          {SEQUENCE.map(([title, desc], i) => (
            <React.Fragment key={title}>
              <div className="hf-seq-step">
                <div className="hf-seq-title">{title}</div>
                <div className="hf-seq-desc">{desc}</div>
              </div>
              {i < SEQUENCE.length - 1 && <div className="hf-seq-arrow">↓</div>}
            </React.Fragment>
          ))}
        </div>
        <p>
          You are now taking a collection of individual assignments and transforming them into a{" "}
          <strong>story about a project</strong>.
        </p>
      </>
    ),
  },
  {
    id: "motion",
    num: "15",
    title: "Design Large Enough for Motion",
    content: (
      <>
        <p>
          There is another reason resolution matters. Suppose the video is 1920 × 1080 and you want
          to slowly zoom into an illustration. If that illustration is only 1920 × 1080, eventually
          the audience may begin seeing pixels when the camera moves closer. But if the original
          artwork is <strong>3840 × 2160 or larger</strong>, there is additional resolution
          available for cropping, reframing, and camera movement.
        </p>
        <Callout>
          You can always make a large image smaller. Trying to reconstruct detail that was never
          captured in a tiny image is much harder. This is why preserving large master files is
          valuable.
        </Callout>
      </>
    ),
  },
  {
    id: "one-asset",
    num: "16",
    title: "One Asset — Multiple Destinations",
    content: (
      <>
        <p>
          Imagine that you have created one illustration. From the same original master, you might
          eventually create:
        </p>
        <Spec
          rows={[
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
    // Let the section expand before scrolling to it.
    requestAnimationFrame(() => {
      const el = document.getElementById(`hf-${id}`);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  return (
    <div className="hf-root">
      <style>{styles}</style>

      {/* ---------- header ---------- */}
      <header className="hf-hero">
        <div className="hf-kicker">Production · Delivery · Handoff</div>
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
        <div className="hf-toc-grid">
          {SECTIONS.map((s) => (
            <button key={s.id} className="hf-toc-item" onClick={() => jump(s.id)}>
              <span className="hf-toc-num">{s.num}</span>
              {s.title}
            </button>
          ))}
        </div>
      </nav>

      {/* ---------- sections ---------- */}
      <main>
        {SECTIONS.map((s) => {
          const isOpen = open.has(s.id);
          return (
            <section key={s.id} id={`hf-${s.id}`} className="hf-section">
              <button
                className="hf-section-head"
                onClick={() => toggleSection(s.id)}
                aria-expanded={isOpen}
              >
                <span className="hf-num">{s.num}</span>
                <span className="hf-section-title">{s.title}</span>
                <span className={`hf-chev ${isOpen ? "hf-chev-open" : ""}`}>▾</span>
              </button>
              {isOpen && <div className="hf-section-body">{s.content}</div>}
            </section>
          );
        })}

        {/* ---------- our goal ---------- */}
        <section className="hf-goal">
          <h2>Our Goal</h2>
          <p>As we prepare for the final presentation, we bring together three things:</p>
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
      </main>
    </div>
  );
}

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
    background: var(--paper);
    font-family: Georgia, 'Times New Roman', serif;
    line-height: 1.65;
    font-size: 17px;
  }
  .hf-root * { box-sizing: border-box; }
  .hf-root p { margin: 0 0 14px; }
  .hf-root h1, .hf-root h2, .hf-root h3, .hf-kicker, .hf-toc, .hf-btn, .hf-tag,
  .hf-section-head, .hf-spec, .hf-callout-label, .hf-format-name, .hf-seq,
  .hf-goal-num, .hf-progress-text, .hf-check-list, .hf-chev {
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  /* hero */
  .hf-kicker {
    font-size: 12px; letter-spacing: 0.18em; text-transform: uppercase;
    color: var(--accent); font-weight: 700; margin-bottom: 10px;
  }
  .hf-hero h1 {
    font-size: 40px; line-height: 1.1; margin: 0 0 18px; font-weight: 700;
    letter-spacing: -0.01em;
  }
  .hf-sub {
    display: block; font-size: 19px; font-weight: 400; color: var(--ink-soft);
    margin-top: 10px; line-height: 1.4;
  }
  .hf-hero-quotes { margin: 20px 0; border-left: 3px solid var(--accent); padding-left: 18px; }
  .hf-hero-q { font-style: italic; font-size: 18px; margin-bottom: 8px; }
  .hf-dim { color: var(--ink-soft); }

  /* toc */
  .hf-toc {
    background: var(--card); border: 1px solid var(--line); border-radius: 12px;
    padding: 18px 20px; margin: 28px 0 36px;
  }
  .hf-toc-head {
    display: flex; justify-content: space-between; align-items: center;
    font-size: 12px; letter-spacing: 0.14em; text-transform: uppercase;
    color: var(--ink-soft); font-weight: 700; margin-bottom: 12px;
  }
  .hf-btn {
    border: 1px solid var(--line); background: var(--paper); border-radius: 999px;
    padding: 5px 14px; font-size: 12px; cursor: pointer; color: var(--ink);
    letter-spacing: 0.02em;
  }
  .hf-btn:hover { border-color: var(--accent); color: var(--accent); }
  .hf-toc-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 4px 16px; }
  @media (max-width: 620px) { .hf-toc-grid { grid-template-columns: 1fr; } }
  .hf-toc-item {
    display: flex; align-items: baseline; gap: 10px; text-align: left;
    background: none; border: none; padding: 6px 4px; font-size: 13.5px;
    color: var(--ink); cursor: pointer; border-radius: 6px; line-height: 1.35;
  }
  .hf-toc-item:hover { background: var(--accent-soft); }
  .hf-toc-num { color: var(--accent); font-weight: 700; min-width: 18px; font-size: 12px; }

  /* sections */
  .hf-section {
    background: var(--card); border: 1px solid var(--line); border-radius: 12px;
    margin-bottom: 14px; overflow: hidden; scroll-margin-top: 16px;
  }
  .hf-section-head {
    display: flex; align-items: center; gap: 14px; width: 100%;
    background: none; border: none; padding: 16px 20px; cursor: pointer;
    text-align: left; font-size: 17px; font-weight: 700; color: var(--ink);
  }
  .hf-section-head:hover .hf-section-title { color: var(--accent); }
  .hf-num {
    flex: 0 0 auto; width: 30px; height: 30px; border-radius: 50%;
    background: var(--accent-soft); color: var(--accent); font-size: 13px;
    font-weight: 700; display: flex; align-items: center; justify-content: center;
  }
  .hf-section-title { flex: 1; }
  .hf-chev { color: var(--ink-soft); transition: transform 0.15s ease; font-size: 14px; }
  .hf-chev-open { transform: rotate(180deg); }
  .hf-section-body { padding: 4px 22px 20px 64px; }
  @media (max-width: 620px) { .hf-section-body { padding: 4px 18px 18px 18px; } }

  /* content pieces */
  .hf-tags { display: flex; flex-wrap: wrap; gap: 7px; margin: 6px 0 14px; }
  .hf-tag {
    background: var(--paper); border: 1px solid var(--line); border-radius: 999px;
    padding: 4px 12px; font-size: 12.5px; color: var(--ink-soft);
  }
  .hf-callout {
    background: var(--paper); border: 1px solid var(--line); border-left: 3px solid var(--accent);
    border-radius: 8px; padding: 14px 16px; margin: 0 0 14px;
  }
  .hf-callout p:last-child { margin-bottom: 0; }
  .hf-callout-label {
    font-size: 11.5px; letter-spacing: 0.14em; text-transform: uppercase;
    font-weight: 700; color: var(--accent); margin-bottom: 8px;
  }
  .hf-quote {
    font-size: 20px; font-style: italic; text-align: center; color: var(--ink);
    padding: 16px 12px; margin: 8px 0 14px; border-top: 1px solid var(--line);
    border-bottom: 1px solid var(--line);
  }
  .hf-spec { border: 1px solid var(--line); border-radius: 8px; overflow: hidden; margin: 0 0 14px; }
  .hf-spec-row { display: flex; border-bottom: 1px solid var(--line); background: var(--card); }
  .hf-spec-row:last-child { border-bottom: none; }
  .hf-spec-k {
    flex: 0 0 42%; padding: 9px 14px; font-size: 13px; font-weight: 700;
    background: var(--paper); border-right: 1px solid var(--line);
  }
  .hf-spec-v { flex: 1; padding: 9px 14px; font-size: 13.5px; color: var(--ink-soft); }
  .hf-formats { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin: 0 0 14px; }
  @media (max-width: 620px) { .hf-formats { grid-template-columns: 1fr; } }
  .hf-format {
    border: 1px solid var(--line); border-radius: 8px; padding: 12px 14px; background: var(--paper);
  }
  .hf-format-name { font-weight: 700; font-size: 14px; color: var(--accent); margin-bottom: 4px; }
  .hf-format-desc { font-size: 14px; color: var(--ink-soft); line-height: 1.5; }
  .hf-two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 4px; }
  @media (max-width: 680px) { .hf-two-col { grid-template-columns: 1fr; } }
  .hf-tree {
    background: #23231f; color: #e8e6df; border-radius: 8px; padding: 14px 18px;
    font-size: 13px; line-height: 1.6; overflow-x: auto; margin: 0 0 14px;
    font-family: 'SF Mono', Menlo, Consolas, monospace;
  }
  .hf-bad { color: #e8a1a1; }
  .hf-good { color: #b5d9c3; }
  .hf-list { margin: 0 0 14px; padding-left: 22px; }
  .hf-list li { margin-bottom: 5px; }
  .hf-seq { margin: 6px 0 16px; }
  .hf-seq-step {
    background: var(--paper); border: 1px solid var(--line); border-radius: 8px;
    padding: 10px 16px;
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
