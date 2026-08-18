import { useMemo, useState } from "react";

// Local thumbnails (Vimeo/frame captures that have no hotlinkable preview).
// Vite resolves these to hashed asset URLs at build time.
import thumbRopeDance from "./assets/thumb-local-1.jpg";
import thumbTaleOfTales from "./assets/thumb-local-2.jpg";
import thumbFatherDaughter from "./assets/thumb-local-3.jpg";

/* ────────────────────────────────────────────────────────────────────────────
   DATA — Independent Animation: Essential Short Films
   era: "1960s-70s" | "1980s" | "1990s-2000s" | "resource"
   ──────────────────────────────────────────────────────────────────────────── */

const ERAS = [
  { id: "all", label: "All" },
  { id: "1960s-70s", label: "1960s–70s" },
  { id: "1980s", label: "1980s" },
  { id: "1990s-2000s", label: "1990s–2000s" },
  { id: "resource", label: "Collections" },
];

const FILMS = [
  {
    number: "01", era: "1980s", title: "The Cow", creator: "Aleksandr Petrov",
    meta: "1989 · Paint on glass",
    note: "A painterly adaptation of Andrei Platonov’s story about a boy remembering his family’s cow.",
    img: "https://i.ytimg.com/vi/fVzPiIfcvxo/hqdefault.jpg",
    alt: "Thumbnail for The Cow",
    watchUrl: "https://www.youtube.com/watch?v=fVzPiIfcvxo",
    links: [
      { href: "https://www.youtube.com/watch?v=fVzPiIfcvxo", label: "Watch" },
      { href: "https://animationobsessive.substack.com/p/the-cow-paint-in-motion", label: "Film notes" },
    ],
  },
  {
    number: "02", era: "1980s", title: "Rope Dance", creator: "Raimund Krumme",
    meta: "1986 · Drawn animation",
    note: "Two figures negotiate power and dependence as a rope continually reshapes their space.",
    img: thumbRopeDance,
    alt: "Frame from Rope Dance showing two figures connected by ropes across a drawn rectangular space",
    watchUrl: "https://vimeo.com/163934766",
    links: [
      { href: "https://vimeo.com/163934766", label: "Watch" },
      { href: "https://www.youtube.com/watch?v=aXl46Ena9Ks", label: "Alternate" },
    ],
  },
  {
    number: "03", era: "1980s", title: "The Hill Farm", creator: "Mark Baker",
    meta: "1988 · Drawn animation",
    note: "Farmers, tourists, and hunters share the same countryside—with sharply different priorities.",
    img: "https://i.ytimg.com/vi/vNXIwFiQW_I/hqdefault.jpg",
    alt: "Thumbnail for The Hill Farm",
    watchUrl: "https://www.youtube.com/watch?v=vNXIwFiQW_I",
    links: [
      { href: "https://www.youtube.com/watch?v=vNXIwFiQW_I", label: "Watch" },
      { href: "https://www.markbakerfilms.com/films/the-hill-farm", label: "Filmmaker page" },
    ],
  },
  {
    number: "04", era: "1980s", title: "Anijam", creator: "Coordinated by Marv Newland",
    meta: "1984 · Collaborative animation",
    note: "Twenty-two animators independently transform one character from sequence to sequence.",
    img: "https://i.ytimg.com/vi/GallGqoiNBU/hqdefault.jpg",
    alt: "Thumbnail for Anijam",
    watchUrl: "https://www.youtube.com/watch?v=GallGqoiNBU",
    links: [
      { href: "https://www.youtube.com/watch?v=GallGqoiNBU", label: "Watch" },
      { href: "https://vimeo.com/82121226", label: "Preview" },
    ],
  },
  {
    number: "05", era: "1990s-2000s", title: "Nibbles", creator: "Christopher Hinton",
    meta: "2003 · Drawn animation",
    note: "An energetic, Oscar-nominated family fishing trip from the National Film Board of Canada.",
    img: "https://i.ytimg.com/vi/jrm7df5uRYo/hqdefault.jpg",
    alt: "Thumbnail for Nibbles",
    watchUrl: "https://www.youtube.com/watch?v=jrm7df5uRYo",
    links: [{ href: "https://www.youtube.com/watch?v=jrm7df5uRYo", label: "Watch" }],
  },
  {
    number: "06", era: "1990s-2000s", title: "Revolver",
    creator: "Stig Bergqvist, Jonas Odell, Martti Ekstrand & Lars Ohlson",
    meta: "1994 · Experimental animation",
    note: "Repetitive movement is structured like music: motifs accumulate, transform, and return.",
    img: "https://vumbnail.com/313865641.jpg",
    alt: "Thumbnail for Revolver",
    watchUrl: "https://vimeo.com/313865641",
    links: [
      { href: "https://vimeo.com/313865641", label: "Watch restored" },
      { href: "https://jonasodell.com/revolver-short-film", label: "Director page" },
    ],
  },
  {
    number: "07", era: "1990s-2000s", title: "Slow Bob in the Lower Dimensions", creator: "Henry Selick",
    meta: "1991 · Mixed media",
    note: "A surreal MTV-era pilot combining live action, stop motion, and cutout animation.",
    img: "https://i.ytimg.com/vi/Izb6rKX28bM/hqdefault.jpg",
    alt: "Thumbnail for Slow Bob in the Lower Dimensions",
    watchUrl: "https://www.youtube.com/watch?v=Izb6rKX28bM",
    links: [{ href: "https://www.youtube.com/watch?v=Izb6rKX28bM", label: "Watch" }],
  },
  {
    era: "resource", channel: true, title: "Houndstooth", creator: "Animation artists collective",
    meta: "Artist collective · Channel",
    note: "A contemporary reference collection featuring independent animation and artist demo reels.",
    watchUrl: "https://www.youtube.com/@hellohoundstooth",
    links: [{ href: "https://www.youtube.com/@hellohoundstooth", label: "Explore channel" }],
  },
  {
    number: "08", era: "1960s-70s", title: "Bambi Meets Godzilla", creator: "Marv Newland",
    meta: "1969 · Drawn animation",
    note: "A landmark exercise in comic timing, economy, and the perfectly executed visual punchline.",
    img: "https://i.ytimg.com/vi/sN3odvIelNw/hqdefault.jpg",
    alt: "Thumbnail for Bambi Meets Godzilla",
    watchUrl: "https://www.youtube.com/watch?v=sN3odvIelNw",
    links: [
      { href: "https://www.youtube.com/watch?v=sN3odvIelNw", label: "Watch" },
      { href: "https://archive.org/details/bambi-meets-godzilla-1969-short", label: "Archive" },
    ],
  },
  {
    number: "09", era: "1960s-70s", title: "Frank Film", creator: "Frank & Caroline Mouris",
    meta: "1973 · Collage animation",
    note: "An Oscar-winning autobiography built from rapid-fire collage and overlapping narration.",
    img: "https://archive.org/services/img/frankfilm_201705",
    alt: "Thumbnail for Frank Film",
    watchUrl: "https://archive.org/details/frankfilm_201705",
    links: [
      { href: "https://archive.org/details/frankfilm_201705", label: "Archive copy" },
      { href: "https://www.acmefilmworks.com/work/spot/frank-film/", label: "Film page" },
    ],
  },
  {
    number: "10", era: "1960s-70s", title: "Sisyphus", creator: "Marcell Jankovics",
    meta: "1974 · Drawn animation",
    note: "A forceful two-minute study of effort, weight, rhythm, and the expressive power of line.",
    img: "https://i.ytimg.com/vi/zYhe_FjuH8s/hqdefault.jpg",
    alt: "Thumbnail for Sisyphus",
    watchUrl: "https://www.youtube.com/watch?v=zYhe_FjuH8s",
    links: [
      { href: "https://www.youtube.com/watch?v=zYhe_FjuH8s", label: "Watch restored" },
      { href: "https://vimeo.com/23083554", label: "Vimeo" },
    ],
  },
  {
    number: "11", era: "1960s-70s", title: "Quasi at the Quackadero", creator: "Sally Cruikshank",
    meta: "1975 · Independent animation",
    note: "A wildly inventive carnival world packed with elastic movement and underground-comix energy.",
    img: "https://i.ytimg.com/vi/Aspo4vuzdFQ/hqdefault.jpg",
    alt: "Thumbnail for Quasi at the Quackadero",
    watchUrl: "https://www.youtube.com/watch?v=Aspo4vuzdFQ",
    links: [
      { href: "https://www.youtube.com/watch?v=Aspo4vuzdFQ", label: "Watch" },
      { href: "https://archive.org/details/quasi-at-the-quackadero", label: "Archive" },
    ],
  },
  {
    number: "12", era: "1960s-70s", title: "Hedgehog in the Fog", creator: "Yuri Norstein",
    meta: "1975 · Cutout animation",
    note: "A poetic journey through atmosphere, uncertainty, and wonder, shaped by layered cutout imagery.",
    img: "https://i.ytimg.com/vi/ThmaGMgWRlY/hqdefault.jpg",
    alt: "Thumbnail for Hedgehog in the Fog",
    watchUrl: "https://www.youtube.com/watch?v=ThmaGMgWRlY",
    links: [
      { href: "https://www.youtube.com/watch?v=ThmaGMgWRlY", label: "Watch" },
      { href: "https://archive.org/details/norsteinhd", label: "Archive collection" },
    ],
  },
  {
    number: "13", era: "1960s-70s", title: "Tale of Tales", creator: "Yuri Norstein",
    meta: "1979 · Cutout animation",
    note: "Memory, childhood, war, and loss unfold through an associative, dreamlike structure.",
    img: thumbTaleOfTales,
    alt: "Frame from Tale of Tales showing the little gray wolf holding a bundled baby",
    watchUrl: "https://www.youtube.com/watch?v=Ts3Zfzg5rqM",
    links: [
      { href: "https://www.youtube.com/watch?v=Ts3Zfzg5rqM", label: "Watch" },
      { href: "https://vimeo.com/413289200", label: "Vimeo" },
    ],
  },
  {
    number: "14", era: "1960s-70s", title: "Asparagus", creator: "Suzan Pitt",
    meta: "1979 · Experimental animation",
    note: "A lush, surreal meditation on creativity, performance, interior space, and bodily imagery.",
    img: "https://archive.org/services/img/asparagus-suzan-pitt",
    alt: "Thumbnail for Asparagus",
    watchUrl: "https://archive.org/details/asparagus-suzan-pitt",
    links: [
      { href: "https://archive.org/details/asparagus-suzan-pitt", label: "Archive copy" },
      { href: "https://mubi.com/en/us/films/asparagus", label: "MUBI" },
    ],
  },
  {
    number: "15", era: "1980s", title: "Crac!", creator: "Frédéric Back",
    meta: "1981 · Drawn animation",
    note: "Québec history is witnessed through a handmade rocking chair and its changing cultural world.",
    img: "https://i.ytimg.com/vi/xsWU-nksQWA/hqdefault.jpg",
    alt: "Thumbnail for Crac!",
    watchUrl: "https://www.youtube.com/watch?v=xsWU-nksQWA",
    links: [
      { href: "https://www.youtube.com/watch?v=xsWU-nksQWA", label: "Watch" },
      { href: "https://vimeo.com/channels/910831/80421507", label: "Vimeo preview" },
    ],
  },
  {
    number: "16", era: "1980s", title: "The Man Who Planted Trees", creator: "Frédéric Back",
    meta: "1987 · Drawn animation",
    note: "A shepherd’s patient work transforms a desolate landscape across decades.",
    img: "https://i.ytimg.com/vi/aY_zuNtf3_g/hqdefault.jpg",
    alt: "Thumbnail for The Man Who Planted Trees",
    watchUrl: "https://www.youtube.com/watch?v=aY_zuNtf3_g",
    links: [
      { href: "https://www.youtube.com/watch?v=aY_zuNtf3_g", label: "Watch" },
      { href: "https://vimeo.com/81830494", label: "Preview" },
    ],
  },
  {
    number: "17", era: "1980s", title: "Breakfast on the Grass", creator: "Priit Pärn",
    meta: "1987 · Drawn animation",
    note: "Four intertwined stories converge around the dream of reaching a pastoral picnic inspired by Manet.",
    img: "https://i.ytimg.com/vi/fCSITlUBPmE/hqdefault.jpg",
    alt: "Thumbnail for Breakfast on the Grass",
    watchUrl: "https://www.youtube.com/watch?v=fCSITlUBPmE",
    links: [{ href: "https://www.youtube.com/watch?v=fCSITlUBPmE", label: "Watch" }],
  },
  {
    number: "18", era: "1990s-2000s", title: "When the Day Breaks", creator: "Wendy Tilby & Amanda Forbis",
    meta: "1999 · Drawn mixed media",
    note: "A chance encounter reveals the fragile, often invisible connections within urban life.",
    img: "https://i.ytimg.com/vi/_rIBbhymIzw/hqdefault.jpg",
    alt: "Thumbnail for When the Day Breaks",
    watchUrl: "https://www.youtube.com/watch?v=_rIBbhymIzw",
    links: [
      { href: "https://www.youtube.com/watch?v=_rIBbhymIzw", label: "Watch via NFB" },
      { href: "https://www.nfb.ca/film/when_the_day_breaks/", label: "NFB page" },
    ],
  },
  {
    number: "19", era: "1990s-2000s", title: "Father and Daughter", creator: "Michaël Dudok de Wit",
    meta: "2000 · Drawn animation",
    note: "A daughter returns throughout her life to the place where she last saw her father, carried forward by memory and the changing seasons.",
    img: thumbFatherDaughter,
    alt: "Frame from Father and Daughter showing two silhouetted riders sharing a bicycle",
    watchUrl: "https://www.youtube.com/watch?v=wTIkvwwC23A",
    links: [{ href: "https://www.youtube.com/watch?v=wTIkvwwC23A", label: "Watch" }],
  },
];

/* ────────────────────────────────────────────────────────────────────────────
   COMPONENT
   ──────────────────────────────────────────────────────────────────────────── */

export default function FilmReferenceGallery() {
  const [era, setEra] = useState("all");

  const visible = useMemo(
    () => (era === "all" ? FILMS : FILMS.filter((f) => f.era === era)),
    [era]
  );

  return (
    <div className="frg">
      <style>{css}</style>

      <header className="frg-header">
        <div className="frg-wrap">
          <div className="frg-eyebrow">Animation screening references</div>
          <h1 className="frg-title">
            Independent Animation:
            <br />
            Essential Short Films
          </h1>
          <p className="frg-intro">
            A visual watchlist spanning experimental, independent, and auteur
            animation. Select a thumbnail or viewing button to open the film;
            alternate sources are included when available.
          </p>
        </div>
      </header>

      <main className="frg-wrap">
        <nav className="frg-tools" aria-label="Filter film gallery">
          {ERAS.map((e) => (
            <button
              key={e.id}
              type="button"
              className={`frg-filter${era === e.id ? " is-active" : ""}`}
              aria-pressed={era === e.id}
              onClick={() => setEra(e.id)}
            >
              {e.label}
            </button>
          ))}
          <span className="frg-count" aria-live="polite">
            {visible.length} reference{visible.length === 1 ? "" : "s"}
          </span>
        </nav>

        <section className="frg-grid">
          {visible.map((film) => (
            <FilmCard key={film.title} film={film} />
          ))}
        </section>
      </main>

      <footer className="frg-footer">
        <div className="frg-wrap">
          Viewing links can change or become geographically restricted. Verify
          availability before class. Thumbnails are linked previews from their
          respective video or archive sources.
        </div>
      </footer>
    </div>
  );
}

function FilmCard({ film }) {
  const [primary, ...rest] = film.links;
  return (
    <article className={`frg-card${film.channel ? " is-channel" : ""}`}>
      <a
        className="frg-thumb"
        href={film.watchUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Open ${film.title} in a new tab`}
      >
        {film.channel ? (
          <span className="frg-channel-title">{film.title}</span>
        ) : (
          <img src={film.img} alt={film.alt} loading="lazy" />
        )}
        {film.number && <span className="frg-number">{film.number}</span>}
        <span className="frg-play" aria-hidden="true" />
      </a>

      <div className="frg-body">
        <div className="frg-meta">{film.meta}</div>
        <h2 className="frg-film-title">{film.title}</h2>
        <div className="frg-creator">{film.creator}</div>
        <p className="frg-note">{film.note}</p>
        <div className="frg-links">
          <a href={primary.href} target="_blank" rel="noopener noreferrer" className="is-primary">
            {primary.label}
          </a>
          {rest.map((l) => (
            <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer">
              {l.label}
            </a>
          ))}
        </div>
      </div>
    </article>
  );
}

/* ────────────────────────────────────────────────────────────────────────────
   STYLES — pLAtform design system
   oxblood #8b3a2f · paper cream #f5efe1 · IBM Plex Mono · Newsreader
   ──────────────────────────────────────────────────────────────────────────── */

const css = `
@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;0,6..72,600;1,6..72,400&display=swap');

.frg {
  --oxblood: #8b3a2f;
  --oxblood-dark: #62261e;
  --paper: #f5efe1;
  --card: #fbf7ec;
  --ink: #21201c;
  --muted: #6f695c;
  --line: #d9d0bc;
  --mono: 'IBM Plex Mono', ui-monospace, 'SFMono-Regular', Menlo, monospace;
  --serif: 'Newsreader', Georgia, 'Times New Roman', serif;

  background: var(--paper);
  color: var(--ink);
  font-family: var(--mono);
  min-height: 100vh;
}
.frg *, .frg *::before, .frg *::after { box-sizing: border-box; }

.frg-wrap { width: min(1180px, calc(100% - 36px)); margin: 0 auto; }

/* header */
.frg-header { padding: 62px 0 34px; border-bottom: 1px solid var(--line); }
.frg-eyebrow {
  font: 600 0.72rem/1 var(--mono);
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--oxblood);
}
.frg-title {
  font: 500 clamp(2.4rem, 7vw, 5.4rem)/0.96 var(--serif);
  letter-spacing: -0.03em;
  margin: 14px 0 20px;
  max-width: 900px;
}
.frg-intro {
  font: 400 1.06rem/1.65 var(--serif);
  color: #4f4a3e;
  max-width: 720px;
  margin: 0;
}

/* filters */
.frg-tools {
  display: flex; gap: 10px; flex-wrap: wrap; align-items: center;
  padding: 24px 0 8px;
}
.frg-filter {
  appearance: none;
  border: 1px solid var(--line);
  background: var(--card);
  color: var(--ink);
  padding: 9px 15px;
  border-radius: 999px;
  font: 500 0.8rem/1 var(--mono);
  letter-spacing: 0.04em;
  cursor: pointer;
  transition: background 0.15s ease, color 0.15s ease, border-color 0.15s ease;
}
.frg-filter:hover { border-color: var(--oxblood); color: var(--oxblood); }
.frg-filter.is-active {
  background: var(--oxblood);
  border-color: var(--oxblood);
  color: var(--paper);
}
.frg-filter:focus-visible,
.frg-links a:focus-visible,
.frg-thumb:focus-visible {
  outline: 2px solid var(--oxblood);
  outline-offset: 2px;
}
.frg-count { margin-left: auto; color: var(--muted); font-size: 0.78rem; letter-spacing: 0.04em; }

/* grid */
.frg-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 22px;
  padding: 24px 0 70px;
}

/* card */
.frg-card {
  background: var(--card);
  border: 1px solid var(--line);
  border-radius: 14px;
  overflow: hidden;
  box-shadow: 0 12px 30px rgba(60, 40, 24, 0.08);
  display: flex; flex-direction: column;
  min-width: 0;
}
.frg-thumb {
  position: relative; display: block;
  aspect-ratio: 16 / 9;
  background: linear-gradient(135deg, #2a2622, #756a55);
  overflow: hidden;
}
.frg-thumb img {
  width: 100%; height: 100%; object-fit: cover; display: block;
  transition: transform 0.35s ease;
}
.frg-card:hover .frg-thumb img { transform: scale(1.025); }
.frg-thumb::after {
  content: "";
  position: absolute; inset: 0;
  background: linear-gradient(180deg, transparent 58%, rgba(20, 12, 8, 0.48));
}
.frg-play {
  position: absolute; z-index: 2; right: 14px; bottom: 13px;
  width: 39px; height: 39px; border-radius: 50%;
  background: rgba(245, 239, 225, 0.94);
  display: grid; place-items: center;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.22);
}
.frg-play::before {
  content: "";
  border-left: 11px solid var(--oxblood-dark);
  border-top: 7px solid transparent;
  border-bottom: 7px solid transparent;
  margin-left: 3px;
}
.frg-number {
  position: absolute; z-index: 2; left: 14px; top: 13px;
  background: rgba(33, 24, 18, 0.8);
  color: var(--paper);
  border-radius: 999px;
  padding: 5px 9px;
  font: 600 0.68rem/1 var(--mono);
  letter-spacing: 0.08em;
}

/* channel card variant */
.frg-card.is-channel .frg-thumb {
  background: linear-gradient(125deg, var(--oxblood-dark), var(--oxblood) 55%, #c98a4e);
}
.frg-channel-title {
  position: absolute; z-index: 2; inset: 0;
  display: grid; place-items: center;
  color: var(--paper); text-align: center;
  font: 500 2rem/1 var(--serif);
  text-shadow: 0 2px 12px rgba(0, 0, 0, 0.25);
}

/* body */
.frg-body { padding: 18px 18px 19px; display: flex; flex-direction: column; flex: 1; }
.frg-meta {
  font: 600 0.68rem/1 var(--mono);
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--oxblood);
  margin-bottom: 8px;
}
.frg-film-title {
  font: 500 1.5rem/1.08 var(--serif);
  letter-spacing: -0.01em;
  margin: 0 0 7px;
}
.frg-creator { font-size: 0.8rem; color: #514c40; line-height: 1.4; margin-bottom: 12px; }
.frg-note {
  font: 400 0.98rem/1.5 var(--serif);
  color: var(--muted);
  margin: 0 0 17px;
}
.frg-links { display: flex; flex-wrap: wrap; gap: 7px; margin-top: auto; }
.frg-links a {
  color: var(--ink);
  border: 1px solid var(--line);
  background: var(--paper);
  border-radius: 7px;
  padding: 7px 10px;
  text-decoration: none;
  font: 500 0.74rem/1 var(--mono);
  letter-spacing: 0.03em;
  transition: border-color 0.15s ease, background 0.15s ease, color 0.15s ease;
}
.frg-links a.is-primary {
  background: var(--oxblood);
  border-color: var(--oxblood);
  color: var(--paper);
}
.frg-links a:hover { border-color: var(--oxblood-dark); }
.frg-links a.is-primary:hover { background: var(--oxblood-dark); }

/* footer */
.frg-footer {
  border-top: 1px solid var(--line);
  padding: 25px 0 40px;
  color: var(--muted);
  font-size: 0.78rem;
  line-height: 1.6;
}

/* responsive */
@media (max-width: 900px) {
  .frg-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}
@media (max-width: 600px) {
  .frg-wrap { width: min(100% - 24px, 1180px); }
  .frg-header { padding-top: 38px; }
  .frg-grid { grid-template-columns: 1fr; gap: 16px; }
  .frg-count { width: 100%; margin: 4px 0 0; }
  .frg-tools { gap: 7px; }
}

/* print */
@media print {
  .frg { background: white; }
  .frg-tools { display: none; }
  .frg-wrap { width: 100%; }
  .frg-grid { grid-template-columns: repeat(3, 1fr); gap: 12px; }
  .frg-card { box-shadow: none; break-inside: avoid; }
  .frg-body { padding: 12px; }
  .frg-links a { padding: 4px 6px; }
  .frg-header { padding-top: 20px; }
}

/* reduced motion */
@media (prefers-reduced-motion: reduce) {
  .frg-thumb img, .frg-filter, .frg-links a { transition: none; }
  .frg-card:hover .frg-thumb img { transform: none; }
}
`;
