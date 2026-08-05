import { useState, useEffect, useCallback } from "react";

/* ============================================================
   STORYBOARDS — pLAtform lesson deck
   Design system: oxblood #8b3a2f · paper cream #f5efe1
   Type: Newsreader (display) · IBM Plex Mono (labels/UI)
   Nav: ← → arrows, on-screen buttons, dot rail, thumbnail drawer
   ============================================================ */

/* ---- image assets (Vite resolves these at build time) ---- */
import montageBoards from "./assets/storyboards/montage-boards.jpg";
import pinningWall from "./assets/storyboards/pinning-wall.jpg";
import webbSmithPigs from "./assets/storyboards/webb-smith-pigs.jpg";
import cardSortWall from "./assets/storyboards/card-sort-wall.jpg";
import tripMoonPoster from "./assets/storyboards/trip-moon-poster.jpg";
import tripMoonStill from "./assets/storyboards/trip-moon-still.jpg";
import evolutionTimeline from "./assets/storyboards/evolution-timeline.jpg";
import gwtwBoards from "./assets/storyboards/gwtw-boards.jpg";
import shotChart from "./assets/storyboards/shot-chart.jpg";
import establishingDiagram from "./assets/storyboards/establishing-diagram.jpg";
import pianoEstablishing from "./assets/storyboards/piano-establishing.jpg";
import fullDiagram from "./assets/storyboards/full-diagram.jpg";
import kaneWide from "./assets/storyboards/kane-wide.jpg";
import mediumDiagram from "./assets/storyboards/medium-diagram.jpg";
import closeDiagram from "./assets/storyboards/close-diagram.jpg";
import pianoCU from "./assets/storyboards/piano-cu.jpg";
import ecuDiagram from "./assets/storyboards/ecu-diagram.jpg";
import upDiagram from "./assets/storyboards/up-diagram.jpg";
import downDiagram from "./assets/storyboards/down-diagram.jpg";
import otsDiagram from "./assets/storyboards/ots-diagram.jpg";
import chinatownOTS from "./assets/storyboards/chinatown-ots.jpg";
import twoDiagram from "./assets/storyboards/two-diagram.jpg";
import povDiagram from "./assets/storyboards/pov-diagram.jpg";

/* ---- design tokens ---- */
const T = {
  oxblood: "#8b3a2f",
  oxbloodDeep: "#6e2c23",
  cream: "#f5efe1",
  creamDim: "#ece4d2",
  ink: "#2b2420",
  inkSoft: "#5a4f47",
  line: "rgba(43,36,32,0.18)",
  mono: "'IBM Plex Mono', ui-monospace, 'SF Mono', Menlo, monospace",
  serif: "'Newsreader', 'Iowan Old Style', Georgia, serif",
};

/* ---- slide data (faithful to the original lesson PDF) ---- */
const SLIDES = [
  {
    kind: "title",
    section: "STORYBOARDS",
    title: "Storyboards",
    image: montageBoards,
    caption: "Storyboard pages — pretty draft",
    link: "https://www.cthcreative.com/portfolio/storyboards-pretty-draft/",
  },
  {
    kind: "split",
    section: "HISTORY",
    title: "The Origin of Storyboarding",
    body: [
      "Storyboarding was first used by animators and filmmakers.",
      "The word \u201Cstoryboard\u201D refers to pinning the images of the story to a board.",
    ],
    image: pinningWall,
    caption: "Sequencing frames on the board",
  },
  {
    kind: "split",
    section: "HISTORY",
    title: "Early Storyboard Example",
    body: [
      "Motion pictures and interactive media sequences are pre-visualized in this way.",
      "George M\u00E9li\u00E8s first used illustrations to help produce his films in the early 1900s.",
      "Walt Disney Productions developed the process in the early 1930s.",
      "Pictured are individual storyboard frames by Webb Smith, 1933, The Three Little Pigs, Disney.",
    ],
    image: webbSmithPigs,
    caption: "Webb Smith, 1933 — The Three Little Pigs",
    link: "https://www.youtube.com/watch?v=mPs6_0g8RHA",
    imageFit: "tall",
  },
  {
    kind: "split",
    section: "METHOD",
    title: "Storyboards Are Kind of Like Card Sorting",
    body: [
      "Motion pictures and interactive media sequences are pre-visualized in this way.",
      "The process is a form of card sorting.",
    ],
    image: cardSortWall,
    caption: "Frames pinned as sortable cards",
  },
  {
    kind: "gallery",
    section: "HISTORY",
    title: "A Trip to the Moon",
    images: [
      { src: tripMoonStill, caption: "Georges M\u00E9li\u00E8s, 1902" },
      { src: tripMoonPoster, caption: "Le Voyage dans la Lune" },
    ],
    links: [
      { label: "Watch the film", href: "https://youtu.be/BNLZntSdyKE" },
      {
        label: "The Bristol Board",
        href: "https://thebristolboard.tumblr.com/post/716623872476299264",
      },
    ],
  },
  {
    kind: "gallery",
    section: "HISTORY",
    title: "The Evolution of Storyboarding",
    images: [
      { src: evolutionTimeline, caption: "From M\u00E9li\u00E8s to digital tools", fit: "tall" },
      { src: gwtwBoards, caption: "Gone with the Wind — live-action boards, 1939" },
    ],
    links: [
      {
        label: "Gone with the Wind storyboards",
        href: "https://viz.dwrl.utexas.edu/old/content/composition-popular-romance-gone-winds-storyboards.html",
      },
    ],
  },
  {
    kind: "statement",
    section: "METHOD",
    title: "Keep the Storyboard Simple",
    body: [
      "You don\u2019t need to create highly-detailed drawings to get your point across.", "Keep the drawings simple.",

    ],
  },
  {
    kind: "split",
    section: "SHOT LANGUAGE",
    title: "Types of Shots for Storyboard",
    body: [
      "A shared vocabulary of framings. Each shot type answers a different question: where are we, who is here, and what do they feel?",
    ],
    image: shotChart,
    caption: "The ten framings, at a glance",
  },
  {
    kind: "shot",
    section: "SHOT LANGUAGE",
    num: 1,
    title: "Establishing Shot",
    diagram: establishingDiagram,
  },
  {
    kind: "still",
    section: "SHOT LANGUAGE",
    title: "Establishing Shot",
    film: "The Piano",
    credit: "Jane Campion, 1993",
    image: pianoEstablishing,
  },
  {
    kind: "shot",
    section: "SHOT LANGUAGE",
    num: 2,
    title: "Full Shot / Wide Angle",
    diagram: fullDiagram,
  },
  {
    kind: "still",
    section: "SHOT LANGUAGE",
    title: "Wide Angle",
    film: "Citizen Kane",
    credit: "Orson Welles, 1941",
    image: kaneWide,
  },
  {
    kind: "shot",
    section: "SHOT LANGUAGE",
    num: 3,
    title: "Medium Shot",
    diagram: mediumDiagram,
  },
  {
    kind: "shot",
    section: "SHOT LANGUAGE",
    num: 4,
    title: "Close Up Shot",
    diagram: closeDiagram,
  },
  {
    kind: "still",
    section: "SHOT LANGUAGE",
    title: "Close Up",
    film: "The Piano",
    credit: "Jane Campion, 1993",
    image: pianoCU,
  },
  {
    kind: "shot",
    section: "SHOT LANGUAGE",
    num: 5,
    title: "Extreme Close Up Shot",
    diagram: ecuDiagram,
  },
  {
    kind: "shot",
    section: "SHOT LANGUAGE",
    num: 6,
    title: "Up Shot",
    sub: "Worm\u2019s Eye View",
    diagram: upDiagram,
  },
  {
    kind: "shot",
    section: "SHOT LANGUAGE",
    num: 7,
    title: "Down Shot",
    sub: "God\u2019s Eye View",
    diagram: downDiagram,
  },
  {
    kind: "shot",
    section: "SHOT LANGUAGE",
    num: 8,
    title: "Over the Shoulder",
    diagram: otsDiagram,
  },
  {
    kind: "still",
    section: "SHOT LANGUAGE",
    title: "Over the Shoulder",
    film: "Chinatown",
    credit: "Roman Polanski, 1974",
    image: chinatownOTS,
  },
  {
    kind: "shot",
    section: "SHOT LANGUAGE",
    num: 9,
    title: "Two Person Shot",
    diagram: twoDiagram,
  },
  {
    kind: "shot",
    section: "SHOT LANGUAGE",
    num: 10,
    title: "Point of View Shot",
    diagram: povDiagram,
  },
];

const SHOT_COUNT = SLIDES.filter((s) => s.kind === "shot").length;

/* ---- shared bits ---- */

function Eyebrow({ children }) {
  return (
    <div
      style={{
        fontFamily: T.mono,
        fontSize: 11,
        letterSpacing: "0.22em",
        textTransform: "uppercase",
        color: T.oxblood,
        marginBottom: 14,
      }}
    >
      {children}
    </div>
  );
}

function SlideTitle({ children, size = "clamp(30px, 4.4vw, 54px)" }) {
  return (
    <h2
      style={{
        fontFamily: T.serif,
        fontWeight: 500,
        fontSize: size,
        lineHeight: 1.06,
        margin: 0,
        color: T.ink,
        letterSpacing: "-0.01em",
      }}
    >
      {children}
    </h2>
  );
}

function Frame({ src, alt, fit, style }) {
  return (
    <figure
      style={{
        margin: 0,
        background: "#fff",
        border: `1px solid ${T.line}`,
        boxShadow: "6px 6px 0 rgba(139,58,47,0.14)",
        padding: 10,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        ...style,
      }}
    >
      <img
        src={src}
        alt={alt}
        style={{
          display: "block",
          maxWidth: "100%",
          maxHeight: fit === "tall" ? "60vh" : "52vh",
          objectFit: "contain",
        }}
      />
    </figure>
  );
}

function Caption({ children }) {
  return (
    <div
      style={{
        fontFamily: T.mono,
        fontSize: 11,
        letterSpacing: "0.08em",
        color: T.inkSoft,
        marginTop: 10,
      }}
    >
      {children}
    </div>
  );
}

function ExtLink({ href, children }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      style={{
        fontFamily: T.mono,
        fontSize: 12,
        color: T.oxblood,
        textDecoration: "none",
        borderBottom: `1px solid ${T.oxblood}`,
        paddingBottom: 1,
        marginRight: 22,
        wordBreak: "break-all",
      }}
    >
      {children} ↗
    </a>
  );
}

/* ---- slide layouts ---- */

function TitleSlide({ s }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: 26, width: "100%" }}>
      <div>
        <Eyebrow>pLAtform · Visual Storytelling</Eyebrow>
        <h1
          style={{
            fontFamily: T.serif,
            fontWeight: 500,
            fontSize: "clamp(52px, 9vw, 110px)",
            lineHeight: 0.98,
            margin: 0,
            color: T.ink,
            letterSpacing: "-0.02em",
          }}
        >
          {s.title}
        </h1>
      </div>
      <Frame src={s.image} alt={s.caption} style={{ maxWidth: 860 }} />
      <div>
        <Caption>{s.caption}</Caption>
        {s.link && (
          <div style={{ marginTop: 8 }}>
            <ExtLink href={s.link}>cthcreative.com/portfolio</ExtLink>
          </div>
        )}
      </div>
    </div>
  );
}

function SplitSlide({ s }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "minmax(280px, 5fr) minmax(300px, 6fr)",
        gap: "clamp(24px, 4vw, 64px)",
        alignItems: "center",
        width: "100%",
      }}
      className="sb-split"
    >
      <div>
        <Eyebrow>{s.section}</Eyebrow>
        <SlideTitle>{s.title}</SlideTitle>
        <div style={{ marginTop: 22, display: "grid", gap: 14, maxWidth: 460 }}>
          {s.body.map((p, i) => (
            <p
              key={i}
              style={{
                fontFamily: T.serif,
                fontSize: "clamp(16px, 1.5vw, 19px)",
                lineHeight: 1.55,
                margin: 0,
                color: T.inkSoft,
              }}
            >
              {p}
            </p>
          ))}
        </div>
        {s.link && (
          <div style={{ marginTop: 22 }}>
            <ExtLink href={s.link}>Reference</ExtLink>
          </div>
        )}
      </div>
      <div>
        <Frame src={s.image} alt={s.caption} fit={s.imageFit} />
        <Caption>{s.caption}</Caption>
      </div>
    </div>
  );
}

function GallerySlide({ s }) {
  return (
    <div style={{ width: "100%" }}>
      <div style={{ textAlign: "center", marginBottom: 28 }}>
        <Eyebrow>{s.section}</Eyebrow>
        <SlideTitle>{s.title}</SlideTitle>
      </div>
      <div
        style={{
          display: "flex",
          gap: 28,
          justifyContent: "center",
          alignItems: "flex-start",
          flexWrap: "wrap",
        }}
      >
        {s.images.map((im, i) => (
          <div key={i} style={{ maxWidth: im.fit === "tall" ? 340 : 560, flex: "1 1 300px" }}>
            <Frame src={im.src} alt={im.caption} fit={im.fit} />
            <Caption>{im.caption}</Caption>
          </div>
        ))}
      </div>
      {s.links && (
        <div style={{ textAlign: "center", marginTop: 26 }}>
          {s.links.map((l, i) => (
            <ExtLink key={i} href={l.href}>
              {l.label}
            </ExtLink>
          ))}
        </div>
      )}
    </div>
  );
}

function StatementSlide({ s }) {
  return (
    <div style={{ maxWidth: 760, textAlign: "center", margin: "0 auto" }}>
      <Eyebrow>{s.section}</Eyebrow>
      <SlideTitle size="clamp(36px, 5.4vw, 66px)">{s.title}</SlideTitle>
      <div
        style={{
          width: 64,
          height: 3,
          background: T.oxblood,
          margin: "30px auto",
        }}
      />
      {s.body.map((p, i) => (
        <p
          key={i}
          style={{
            fontFamily: T.serif,
            fontSize: "clamp(19px, 2.1vw, 26px)",
            lineHeight: 1.5,
            fontStyle: i === 1 ? "italic" : "normal",
            color: i === 1 ? T.oxblood : T.inkSoft,
            margin: "0 0 14px",
          }}
        >
          {p}
        </p>
      ))}
    </div>
  );
}

function ShotSlide({ s }) {
  return (
    <div style={{ width: "100%", maxWidth: 880, margin: "0 auto", textAlign: "center" }}>
      <Eyebrow>
        {s.section} · {String(s.num).padStart(2, "0")} / {String(SHOT_COUNT).padStart(2, "0")}
      </Eyebrow>
      <SlideTitle size="clamp(36px, 5.4vw, 64px)">{s.title}</SlideTitle>
      {s.sub && (
        <div
          style={{
            fontFamily: T.serif,
            fontStyle: "italic",
            fontSize: "clamp(17px, 1.8vw, 22px)",
            color: T.oxblood,
            marginTop: 8,
          }}
        >
          {s.sub}
        </div>
      )}
      <div style={{ marginTop: 34, display: "flex", justifyContent: "center" }}>
        <Frame src={s.diagram} alt={s.title} style={{ padding: 22, background: "#fdf9ee" }} />
      </div>
    </div>
  );
}

function StillSlide({ s }) {
  return (
    <div style={{ width: "100%", maxWidth: 1000, margin: "0 auto", textAlign: "center" }}>
      <Eyebrow>{s.section} · Film Example</Eyebrow>
      <SlideTitle size="clamp(28px, 3.6vw, 44px)">
        {s.title} — <em style={{ fontStyle: "italic" }}>{s.film}</em>
      </SlideTitle>
      <div style={{ marginTop: 26, display: "flex", justifyContent: "center" }}>
        <Frame src={s.image} alt={`${s.title} — ${s.film}`} />
      </div>
      <Caption>{s.credit}</Caption>
    </div>
  );
}

const LAYOUTS = {
  title: TitleSlide,
  split: SplitSlide,
  gallery: GallerySlide,
  statement: StatementSlide,
  shot: ShotSlide,
  still: StillSlide,
};

/* ---- main deck ---- */

export default function Storyboards() {
  const [idx, setIdx] = useState(0);
  const [drawer, setDrawer] = useState(false);

  const go = useCallback(
    (d) => setIdx((i) => Math.max(0, Math.min(SLIDES.length - 1, i + d))),
    []
  );

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight" || e.key === " ") go(1);
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "Escape") setDrawer(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  const slide = SLIDES[idx];
  const Layout = LAYOUTS[slide.kind];

  return (
    <div
      style={{
        minHeight: "100vh",
        background: T.cream,
        color: T.ink,
        display: "flex",
        flexDirection: "column",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <link
        href="https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;1,6..72,400&family=IBM+Plex+Mono:wght@400;500&display=swap"
        rel="stylesheet"
      />
      <style>{`
        @media (max-width: 760px) {
          .sb-split { grid-template-columns: 1fr !important; }
        }
        @media (prefers-reduced-motion: reduce) {
          * { transition: none !important; }
        }
      `}</style>

      {/* header */}
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "16px 26px",
          borderBottom: `1px solid ${T.line}`,
          fontFamily: T.mono,
          fontSize: 11,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
        }}
      >
        <span style={{ color: T.oxblood, fontWeight: 500 }}>pLAtform</span>
        <span style={{ color: T.inkSoft }}>{slide.section}</span>
        <button
          onClick={() => setDrawer((d) => !d)}
          style={{
            fontFamily: T.mono,
            fontSize: 11,
            letterSpacing: "0.14em",
            background: "none",
            border: `1px solid ${T.line}`,
            color: T.ink,
            padding: "6px 12px",
            cursor: "pointer",
          }}
        >
          {String(idx + 1).padStart(2, "0")} / {SLIDES.length} ▦
        </button>
      </header>

      {/* slide */}
      <main
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "clamp(24px, 4vw, 56px)",
        }}
      >
        <Layout s={slide} key={idx} />
      </main>

      {/* footer nav */}
      <footer
        style={{
          display: "flex",
          alignItems: "center",
          gap: 18,
          padding: "14px 26px 20px",
          borderTop: `1px solid ${T.line}`,
        }}
      >
        <button onClick={() => go(-1)} disabled={idx === 0} style={navBtn(idx === 0)}>
          ← Prev
        </button>
        <div style={{ flex: 1, display: "flex", gap: 5, alignItems: "center" }}>
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              aria-label={`Slide ${i + 1}`}
              style={{
                width: i === idx ? 22 : 8,
                height: 8,
                border: "none",
                borderRadius: 4,
                background: i === idx ? T.oxblood : "rgba(43,36,32,0.22)",
                cursor: "pointer",
                padding: 0,
                transition: "width 160ms ease",
              }}
            />
          ))}
        </div>
        <button
          onClick={() => go(1)}
          disabled={idx === SLIDES.length - 1}
          style={navBtn(idx === SLIDES.length - 1)}
        >
          Next →
        </button>
      </footer>

      {/* thumbnail drawer */}
      {drawer && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(43,36,32,0.55)",
            zIndex: 20,
            display: "flex",
            justifyContent: "flex-end",
          }}
          onClick={() => setDrawer(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: "min(340px, 90vw)",
              background: T.creamDim,
              borderLeft: `2px solid ${T.oxblood}`,
              overflowY: "auto",
              padding: 18,
            }}
          >
            <div
              style={{
                fontFamily: T.mono,
                fontSize: 11,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: T.oxblood,
                marginBottom: 14,
              }}
            >
              Index
            </div>
            {SLIDES.map((s, i) => (
              <button
                key={i}
                onClick={() => {
                  setIdx(i);
                  setDrawer(false);
                }}
                style={{
                  display: "block",
                  width: "100%",
                  textAlign: "left",
                  background: i === idx ? "#fff" : "transparent",
                  border: "none",
                  borderBottom: `1px solid ${T.line}`,
                  padding: "10px 8px",
                  cursor: "pointer",
                  fontFamily: T.serif,
                  fontSize: 15,
                  color: T.ink,
                }}
              >
                <span
                  style={{
                    fontFamily: T.mono,
                    fontSize: 10,
                    color: T.oxblood,
                    marginRight: 10,
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                {s.title}
                {s.film ? ` — ${s.film}` : ""}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function navBtn(disabled) {
  return {
    fontFamily: T.mono,
    fontSize: 12,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    padding: "9px 18px",
    background: disabled ? "transparent" : T.oxblood,
    color: disabled ? "rgba(43,36,32,0.35)" : T.cream,
    border: disabled ? `1px solid ${T.line}` : `1px solid ${T.oxbloodDeep}`,
    cursor: disabled ? "default" : "pointer",
  };
}
