import { useState, useMemo } from "react";

// ---------------------------------------------------------------------------
// DATA — edit here. Add real portfolio URLs to `url` when you have them.
// ---------------------------------------------------------------------------
const CATEGORIES = [
  { id: "concept", label: "Concept / Entertainment design", color: "#8b3a2f" },
  { id: "visdev", label: "Visual development / Animation", color: "#b8862b" },
  { id: "bg", label: "Background design / Layout / BG paint", color: "#3f5a78" },
  { id: "emerging", label: "Emerging artist", color: "#5b6b3a" },
];

const ARTISTS = [
  {
    id: "mancinelli",
    name: "Sergio Mancinelli",
    role: "Art Director / Visual Development",
    cat: "concept",
    pick: "Website / UI design",
    why: "Probably the best website-design example in the group. Very contemporary typography, huge imagery, restrained navigation, and clear categories for Animation, Paintings, and Cards.",
    projects: ["Warner Bros.", "DreamWorks", "Klaus", "Animal Farm"],
    url: "https://sergiomancinelliart.com",
  },
  {
    id: "lacoste",
    name: "Raphael Lacoste",
    role: "Senior Art Director / Illustrator",
    cat: "concept",
    pick: "High-end concept design",
    why: "Excellent example for environment concept artists. Strong project filtering rather than making visitors hunt through work.",
    projects: ["Assassin's Creed Origins", "Assassin's Creed Valhalla"],
    url: "https://www.raphael-lacoste.com",
  },
  {
    id: "zana",
    name: "Eytan Zana",
    role: "Concept Artist",
    cat: "concept",
    pick: "High-end concept design",
    why: "An extremely straightforward professional portfolio. Projects are divided into bodies of work plus personal work.",
    projects: ["The Last of Us", "Uncharted", "Sword of the Sea", "Personal work"],
    url: "https://www.artstation.com/eytan",
  },
  {
    id: "jurabaev",
    name: "Jama Jurabaev",
    role: "Concept Artist / Art Director",
    cat: "concept",
    why: "Good reference for someone combining 2D, 3D, cinematic design and world building. Separates professional work, learning/tutorial material, and VR/3D experimentation.",
    projects: ["Professional work", "Tutorials", "VR / 3D experiments"],
    url: "https://www.artstation.com/jamajurabaev",
  },
  {
    id: "paick",
    name: "James Paick",
    role: "Concept Artist / Creative Director",
    cat: "concept",
    why: "Particularly useful for Entertainment Design: categories span film, games, IP development, illustration, and theme-park / attraction design.",
    projects: ["Film", "Games", "IP development", "Illustration", "Theme park / attractions"],
    url: "https://www.artstation.com/jamespaickart",
  },
  {
    id: "le",
    name: "Khang Le",
    role: "Art Director / Visual Development Artist",
    cat: "visdev",
    why: "Reflects what animation vis-dev actually encompasses: backgrounds, characters, props, effects, and production design.",
    projects: ["X-Men '97", "Big Hero 6: The Series", "Star Wars: Visions", "Love, Death & Robots"],
    url: "https://www.khang-le.com",
  },
  {
    id: "calleja",
    name: "Victor Calleja",
    role: "Visual Development Artist",
    cat: "visdev",
    why: "A nice example for someone targeting contemporary studio vis-dev. Experience includes visual development at Marvel plus background design / layout work.",
    projects: ["Marvel vis-dev", "Background design / layout"],
    url: "https://www.victorhcalleja.com",
  },
  {
    id: "fang",
    name: "Bo Fang",
    role: "Concept Artist / Visual Development Designer",
    cat: "visdev",
    pick: "Project-based emerging portfolio",
    why: "The site doesn't only display polished images — it presents character design, worldbuilding, storyboards, and project development.",
    projects: ["Character design", "Worldbuilding", "Storyboards", "Project development"],
    url: "https://bofangart.com",
  },
  {
    id: "fox",
    name: "Claire Fox",
    role: "Visual Development Concept Artist",
    cat: "visdev",
    pick: "Project-based emerging portfolio",
    why: "Work is organized around story worlds and projects rather than isolated drawings, which makes it feel like entertainment design rather than illustration.",
    projects: ["Story worlds", "Project-based organization"],
    url: "https://www.artstation.com/clairefox",
  },
  {
    id: "tszeng",
    name: "Oliver Tszeng",
    role: "Visual Development Artist / World Builder",
    cat: "bg",
    pick: "Background painting",
    why: "Individual production pages show backgrounds in context and clearly credit background painting vs. layout.",
    projects: ["She-Ra", "Dogs in Space", "Stillwater"],
    url: "https://www.olivertszeng.com",
  },
  {
    id: "jambhale",
    name: "Isha Jambhale",
    role: "Visual Development / BG Paint / Layout",
    cat: "bg",
    pick: "BG / layout organization",
    why: "Navigation literally separates “Visual Development” and “BG Paint/Layout,” with projects presented as complete visual-development packages.",
    projects: ["Visual Development", "BG Paint / Layout"],
    url: "https://ishajambhale.carrd.co",
  },
  {
    id: "loke",
    name: "Sandra Loke",
    role: "Background Designer / Layout Artist",
    cat: "bg",
    why: "Strong professional reference for what studios mean by background / layout work.",
    projects: ["Netflix layout design", "Blood of Zeus", "Masters of the Universe: Revelation"],
    url: "https://www.artstation.com/sandraloke",
  },
  {
    id: "red",
    name: "Maria Red",
    role: "Vis Dev / Background / Layout",
    cat: "bg",
    why: "Bridges all the categories: visual development, concept, backgrounds, and layout.",
    projects: ["Rick and Morty S8 (Lead Layout Artist)", "Earlier layout / BG work"],
    url: "https://www.artmariared.com",
  },
  {
    id: "barrios",
    name: "Kaila Barrios",
    role: "Visual Development Artist",
    cat: "bg",
    why: "Her environment work includes finished paintings along with line art, layout, and process — not only final illustrations. Useful pedagogically.",
    projects: ["Environment paintings", "Line art", "Layout", "Process"],
    url: "https://kailabarrios.artstation.com",
  },
  {
    id: "joo",
    name: "Sumin Joo",
    role: "ArtCenter Grad Show — Vis Dev / Character / Layout / BG Paint",
    cat: "emerging",
    pick: "Realistic student target",
    why: "Clearly states her specialties, then organizes the portfolio around named projects — environments, props, story worlds. Much closer to what a graduating student can realistically emulate than a 25-year veteran's site.",
    projects: ["Environments", "Props", "Story worlds"],
    url: "https://www.suminjoo.com",
  },
];

const PATTERN = [
  { title: "Name + one-line specialty", body: "e.g. Visual Development + Background Design" },
  {
    title: "Featured projects",
    body: "Project 01 — Original story world: hero image → environment concepts → thumbnails → layout → color keys → props → final background.\nProject 02 — Production work: finals + exactly what you were responsible for.",
  },
  { title: "Background design", body: "Layouts / line work / perspective / overlays / underlays" },
  { title: "Visual development", body: "World building / color / mood / characters / environments" },
  { title: "Sketchbook / personal work", body: "Optional" },
  { title: "About + résumé + contact", body: "" },
];

// ---------------------------------------------------------------------------
const initials = (name) =>
  name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

const catOf = (id) => CATEGORIES.find((c) => c.id === id);

const searchUrl = (name) =>
  `https://www.google.com/search?q=${encodeURIComponent(name + " portfolio")}`;

export default function PortfolioReferenceGallery() {
  const [filter, setFilter] = useState("all");
  const [picksOnly, setPicksOnly] = useState(false);
  const [active, setActive] = useState(null);
  const [showPattern, setShowPattern] = useState(false);

  const list = useMemo(
    () =>
      ARTISTS.filter((a) => (filter === "all" ? true : a.cat === filter)).filter((a) =>
        picksOnly ? !!a.pick : true
      ),
    [filter, picksOnly]
  );

  const counts = useMemo(() => {
    const m = {};
    ARTISTS.forEach((a) => (m[a.cat] = (m[a.cat] || 0) + 1));
    return m;
  }, []);

  const activeArtist = active ? ARTISTS.find((a) => a.id === active) : null;

  return (
    <div className="prg">
      <style>{css}</style>

      <header className="prg-head">
        <h1>Portfolio <em>references</em></h1>
        <p className="prg-sub">
          Fifteen entertainment-design portfolios and why each one is worth looking at.
          Filter by discipline, or show only the instructor picks.
        </p>
      </header>

      {/* Segmented ledger bar — the filter */}
      <div className="ledger" role="tablist" aria-label="Filter by category">
        <button
          role="tab"
          aria-selected={filter === "all"}
          className={"seg seg-all" + (filter === "all" ? " on" : "")}
          onClick={() => setFilter("all")}
        >
          <span className="seg-n">{ARTISTS.length}</span>
          <span className="seg-l">All</span>
        </button>
        {CATEGORIES.map((c) => (
          <button
            key={c.id}
            role="tab"
            aria-selected={filter === c.id}
            className={"seg" + (filter === c.id ? " on" : "")}
            style={{ "--c": c.color, flexGrow: counts[c.id] }}
            onClick={() => setFilter(c.id)}
          >
            <span className="seg-n">{counts[c.id]}</span>
            <span className="seg-l">{c.label}</span>
          </button>
        ))}
      </div>

      <div className="toolbar">
        <label className="chk">
          <input
            type="checkbox"
            checked={picksOnly}
            onChange={(e) => setPicksOnly(e.target.checked)}
          />
          Instructor picks only
        </label>
        <button className="link-btn" onClick={() => setShowPattern((s) => !s)}>
          {showPattern ? "Hide the recommended structure" : "Show the recommended structure"}
        </button>
      </div>

      {showPattern && (
        <section className="pattern">
          <h2>The pattern to encourage</h2>
          <p>
            Avoid “Home / Gallery / About / Contact with 75 random images.” The portfolio should
            be evidence that you can develop a production, not just that you can make attractive
            pictures.
          </p>
          <ol className="tree">
            {PATTERN.map((p) => (
              <li key={p.title}>
                <strong>{p.title}</strong>
                {p.body && <span>{p.body}</span>}
              </li>
            ))}
          </ol>
        </section>
      )}

      <div className="grid">
        {list.map((a) => {
          const c = catOf(a.cat);
          return (
            <button
              key={a.id}
              className={"card" + (active === a.id ? " active" : "")}
              style={{ "--c": c.color }}
              onClick={() => setActive(active === a.id ? null : a.id)}
              aria-expanded={active === a.id}
            >
              <div className="mono">
                <span>{initials(a.name)}</span>
                {a.pick && <em className="pick">{a.pick}</em>}
              </div>
              <div className="card-body">
                <h3>{a.name}</h3>
                <p className="role">{a.role}</p>
              </div>
            </button>
          );
        })}
        {list.length === 0 && (
          <p className="empty">No picks in this category. Clear the filter to see everyone.</p>
        )}
      </div>

      {activeArtist && (
        <aside className="panel" style={{ "--c": catOf(activeArtist.cat).color }}>
          <button className="close" onClick={() => setActive(null)} aria-label="Close">
            ×
          </button>
          <p className="panel-cat">{catOf(activeArtist.cat).label}</p>
          <h2>{activeArtist.name}</h2>
          <p className="role">{activeArtist.role}</p>
          {activeArtist.pick && <p className="panel-pick">Instructor pick: {activeArtist.pick}</p>}
          <h4>Why look at it</h4>
          <p>{activeArtist.why}</p>
          <h4>Projects and sections</h4>
          <ul className="tags">
            {activeArtist.projects.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
          <div className="actions">
            {activeArtist.url ? (
              <a href={activeArtist.url} target="_blank" rel="noreferrer" className="btn">
                Open portfolio
              </a>
            ) : (
              <>
                <a
                  href={searchUrl(activeArtist.name)}
                  target="_blank"
                  rel="noreferrer"
                  className="btn"
                >
                  Search for the site
                </a>
                <span className="hint">No direct link yet — add one in DATA.</span>
              </>
            )}
          </div>
        </aside>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
const css = `
@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;0,6..72,600;1,6..72,400;1,6..72,500&display=swap');

.prg{--ox:#8b3a2f;--paper:#f5efe1;--ink:#2a1f1b;--muted:#6e5f57;--rule:#8b3a2f;--tint:#ebe2cf;
  font-family:"Newsreader",Georgia,serif;color:var(--ink);background:var(--paper);min-height:100vh;
  padding:36px clamp(16px,4vw,56px) 96px;position:relative}
.prg *{box-sizing:border-box}
.mono-ui{font-family:"IBM Plex Mono",ui-monospace,Menlo,monospace}

.prg-head{max-width:760px;margin-bottom:28px;border-bottom:1px solid var(--rule);padding-bottom:22px}
.prg h1{font-size:clamp(38px,5.5vw,68px);font-weight:500;letter-spacing:-.02em;line-height:.98;margin:0 0 12px;font-variation-settings:"opsz" 72}
.prg h1 em{font-style:italic;font-weight:400;color:var(--ox)}
.prg-sub{font-size:19px;line-height:1.45;margin:0;max-width:56ch;color:var(--muted)}

.ledger{display:flex;width:100%;height:58px;border:1px solid var(--rule);margin-bottom:12px;background:var(--paper)}
.seg{--c:var(--ox);flex:1 1 0;display:flex;align-items:center;gap:12px;padding:0 14px;background:var(--paper);color:var(--ink);
  border:0;border-right:1px solid var(--rule);cursor:pointer;font-family:"IBM Plex Mono",ui-monospace,monospace;font-size:12px;
  text-align:left;min-width:0;position:relative;transition:background .15s}
.seg::before{content:"";position:absolute;left:0;top:0;bottom:0;width:6px;background:var(--c);opacity:.35}
.seg:last-child{border-right:0}
.seg:hover{background:var(--tint)}
.seg.on{background:var(--c);color:var(--paper)}
.seg.on::before{opacity:0}
.seg:focus-visible{outline:2px solid var(--ox);outline-offset:-4px}
.seg-all{--c:var(--ink);flex-grow:2}
.seg-n{font-family:"Newsreader",serif;font-size:26px;font-weight:500;flex:none;margin-left:6px;line-height:1}
.seg-l{line-height:1.2;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}

.toolbar{display:flex;flex-wrap:wrap;gap:22px;align-items:center;font-family:"IBM Plex Mono",ui-monospace,monospace;font-size:12px;margin-bottom:30px;color:var(--muted)}
.chk{display:flex;align-items:center;gap:8px;cursor:pointer}
.chk input{width:14px;height:14px;accent-color:var(--ox)}
.link-btn{background:none;border:0;padding:0;font:inherit;color:var(--ox);text-decoration:underline;text-underline-offset:3px;cursor:pointer}

.pattern{border-top:1px solid var(--rule);border-bottom:1px solid var(--rule);padding:26px 0;margin-bottom:34px;max-width:760px}
.pattern h2{font-size:30px;font-weight:500;font-style:italic;letter-spacing:-.01em;margin:0 0 8px;color:var(--ox)}
.pattern p{margin:0 0 20px;line-height:1.5;font-size:18px}
.tree{list-style:none;margin:0;padding:0;border-left:1px solid var(--ox)}
.tree li{padding:9px 0 9px 20px;display:flex;flex-direction:column;gap:4px}
.tree li strong{font-weight:500;font-size:19px}
.tree li span{font-family:"IBM Plex Mono",ui-monospace,monospace;font-size:12px;color:var(--muted);white-space:pre-line;line-height:1.55}

.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(210px,1fr));gap:1px;background:var(--rule);border:1px solid var(--rule)}
.card{--c:var(--ox);background:var(--paper);border:0;padding:0;text-align:left;font:inherit;color:var(--ink);cursor:pointer;display:flex;flex-direction:column;min-height:290px}
.card:hover .card-body{background:var(--tint)}
.card:focus-visible{outline:2px solid var(--ox);outline-offset:-4px}
.card.active .mono{background:var(--ink)}
.mono{background:var(--c);color:var(--paper);aspect-ratio:1/1;display:flex;align-items:flex-end;padding:16px;position:relative;
  font-family:"Newsreader",serif;font-style:italic;font-weight:400;font-size:clamp(56px,9vw,96px);letter-spacing:-.05em;line-height:.8;font-variation-settings:"opsz" 72}
.pick{position:absolute;top:12px;left:14px;right:14px;font-style:normal;font-family:"IBM Plex Mono",ui-monospace,monospace;font-size:11px;letter-spacing:0;line-height:1.3;
  border-top:1px solid rgba(245,239,225,.55);padding-top:7px;opacity:.9}
.card-body{padding:14px 16px 20px;border-top:1px solid var(--rule);flex:1;transition:background .15s}
.card h3{font-size:22px;font-weight:500;letter-spacing:-.01em;margin:0 0 5px;line-height:1.1}
.role{font-family:"IBM Plex Mono",ui-monospace,monospace;font-size:11.5px;color:var(--muted);margin:0;line-height:1.45}
.empty{grid-column:1/-1;background:var(--paper);padding:44px;margin:0;text-align:center;font-size:18px;font-style:italic;color:var(--muted)}

.panel{--c:var(--ox);position:fixed;top:0;right:0;height:100vh;width:min(440px,100%);background:var(--paper);border-left:1px solid var(--rule);
  padding:28px 30px 44px;overflow:auto;z-index:50;box-shadow:-30px 0 60px rgba(42,31,27,.12)}
.panel::before{content:"";display:block;height:8px;background:var(--c);margin:-28px -30px 26px}
.close{position:absolute;top:24px;right:22px;width:36px;height:36px;border:1px solid var(--ox);color:var(--ox);background:var(--paper);font-size:22px;line-height:1;cursor:pointer;font-family:"Newsreader",serif}
.close:hover{background:var(--tint)}
.panel-cat{font-family:"IBM Plex Mono",ui-monospace,monospace;font-size:11.5px;margin:0 0 8px;color:var(--muted)}
.panel h2{font-size:38px;font-weight:500;letter-spacing:-.02em;line-height:1;margin:0 0 8px;padding-right:48px;font-variation-settings:"opsz" 72}
.panel .role{margin-bottom:16px}
.panel-pick{font-family:"IBM Plex Mono",ui-monospace,monospace;font-size:11.5px;margin:0 0 22px;padding:7px 10px;border:1px solid var(--ox);color:var(--ox);display:inline-block}
.panel h4{font-family:"IBM Plex Mono",ui-monospace,monospace;font-weight:500;font-size:11.5px;margin:22px 0 6px;color:var(--muted)}
.panel p{font-size:18px;line-height:1.5;margin:0}
.tags{list-style:none;margin:0;padding:0;display:flex;flex-wrap:wrap;gap:6px}
.tags li{font-family:"IBM Plex Mono",ui-monospace,monospace;font-size:11.5px;border:1px solid var(--rule);color:var(--ox);padding:4px 8px;background:var(--paper)}
.actions{margin-top:30px;display:flex;flex-direction:column;gap:10px}
.btn{display:inline-block;align-self:flex-start;background:var(--ox);color:var(--paper);text-decoration:none;padding:12px 18px;font-family:"IBM Plex Mono",ui-monospace,monospace;font-size:12px}
.btn:hover{background:var(--ink)}
.btn:focus-visible{outline:2px solid var(--ink);outline-offset:2px}
.hint{font-family:"IBM Plex Mono",ui-monospace,monospace;font-size:11px;color:var(--muted)}

@media (max-width:640px){
  .ledger{height:auto;flex-wrap:wrap}
  .seg{flex:1 1 48%;height:50px;border-bottom:1px solid var(--rule)}
  .seg-all{flex-basis:100%}
  .seg-l{white-space:normal}
}
@media (prefers-reduced-motion:reduce){.seg,.card-body{transition:none}}
`;
