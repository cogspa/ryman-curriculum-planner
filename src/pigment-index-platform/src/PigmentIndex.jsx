import React, { useEffect, useMemo, useRef, useState } from 'react';

/* ============================================================================
   PIGMENT INDEX — pLAtform edition
   A field-guide / specimen-archive of digital painting tips harvested from
   @cogspa's saved Instagram posts.

   Data: fetches /pigment-data.json (put it in /public). Accepts BOTH formats:
     v1 (original harvest.js): { CODE: { caption, image, author } }
        — captions still carry the "807 likes, 26 comments - user on DATE:"
          prefix; this component parses it out at load time.
     v2 (harvest-v2.js):       { CODE: { caption, image, author, username,
                                          likes, comments, date, tags, url } }
   If the fetch fails (local file://, or file not deployed yet) a manual
   "Load pigment-data.json" file input appears.

   Design system: pLAtform — oxblood #8b3a2f on paper cream #f5efe1,
   IBM Plex Mono (utility / catalog data), Newsreader (display + captions).
   ========================================================================= */

const OX = '#8b3a2f';
const CREAM = '#f5efe1';
const INK = '#2a211c';

/* Posts saved to the IG account that aren't painting tips — hidden from the
   index but kept in the data. Add codes here to curate. */
const HIDDEN = new Set([
  'Db88P1MK_PH', // fly tying
  'DbOn3OLMA5P', // The Cure TV performance
  'DZp9QIOo4H3', // IG-growth prompt spam
  'DVXVPnJAowi', // viral video tips
  'DcSpDDEFN_v', // model self-promo
  'DcYcBSQMN3u', // PI-010 course promo (dayungnico)
  'DcTa5e0sogt', // PI-023 course promo (dayungnico)
]);

/* Category rules — first match wins, checked top to bottom against tags +
   caption text. Tune keywords freely; anything unmatched lands in Field Notes. */
const CATEGORIES = [
  ['Houdini & Sim', ['houdini', 'redshift', 'embergen', 'simulation', 'axiomsolver', 'karma', 'zbrush', 'cinema4d', 'c4d', 'splatting', 'photogrammetry', 'colmap']],
  ['Blender & 3D', ['blender', 'b3d', 'geometrynodes', 'eevee', 'cycles', 'substance', 'meshy', 'lowpoly', '3dart', '3danimation', 'viewport', 'npr']],
  ['Animation & Boards', ['animation', 'storyboard', '2danimation', '12principles', 'motioncapture', 'callipeg', 'aftereffects', 'motiongraphics', 'motiondesign', 'cavalry', 'camera']],
  ['Anatomy & Portraits', ['portrait', 'anatomy', 'skin', 'skintone', 'likeness', 'asaro', 'facial', 'crosshatching']],
  ['Color & Light', ['colortheory', 'colortips', 'color', 'colour', 'lighting', 'lightandcolor', 'light', 'shadow', 'value', 'values', 'palette', 'gradientmap', 'goldenratio', 'midtone']],
  ['Brushes & Tools', ['brush', 'brushes', 'smudge', 'lasso', 'procreatebrushes', 'photoshoptips', 'retouch', 'blur', 'chromatic', 'bloom']],
  ['Design & Vector', ['illustrator', 'adobeillustrator', 'graphicdesign', 'logo', 'typography', 'vectorart', 'branding', 'mosaic', 'kinetictype', 'generativedesign', 'creativecoding', 'p5js']],
  ['Character & Concept', ['characterdesign', 'conceptart', 'creaturedesign', 'creature', 'mecha', 'environmentdesign', 'environment', 'thumbnails', 'silhouette', 'visdev', 'worldbuilding']],
  ['Process & Practice', ['tutorial', 'arttutorial', 'process', 'artprocess', 'speedpaint', 'sketch', 'wip', 'study', 'timelapse', 'drawingtutorial', 'howtodraw', 'arttips']],
];

const parseCount = s => {
  if (s == null) return null;
  if (typeof s === 'number') return s;
  const n = parseFloat(String(s).replace(/,/g, ''));
  return /k$/i.test(s) ? Math.round(n * 1000) : Math.round(n);
};

/* v1 caption prefix → structured fields */
const parsePrefix = raw => {
  const out = { likes: null, username: null, date: null, caption: (raw || '').trim() };
  if (!raw) return out;
  const m = raw.trim().match(
    /^(?:([\d.,]+K?) likes(?:, ([\d.,]+K?) comments)? - )?([A-Za-z0-9._]+) on ([A-Za-z]+ \d{1,2}, \d{4})(?::\s*([\s\S]*))?$/
  );
  if (!m) return out;
  out.likes = parseCount(m[1]);
  out.username = m[3];
  out.date = m[4];
  let t = (m[5] || '').trim();
  out.caption = t.replace(/^[“"]/, '').replace(/["”]\.?\s*$/, '').trim();
  return out;
};

const categorize = (tags, text) => {
  const hay = tags.join(' ') + ' ' + text.toLowerCase();
  for (const [name, keys] of CATEGORIES) if (keys.some(k => hay.includes(k))) return name;
  return 'Field Notes';
};

const enrich = data =>
  Object.entries(data)
    .filter(([code]) => !HIDDEN.has(code))
    .map(([code, e], i) => {
      const isV2 = 'username' in e || 'tags' in e;
      const p = isV2 ? null : parsePrefix(e.caption);
      const caption = isV2 ? e.caption || '' : p.caption;
      const tags = isV2 && e.tags ? e.tags : [...new Set((caption.match(/#[\p{L}\p{N}_]+/gu) || []).map(t => t.slice(1).toLowerCase()))];
      const date = isV2 ? e.date : p.date;
      return {
        code,
        no: i + 1,
        url: e.url || `https://www.instagram.com/p/${code}/`,
        image: e.image || '',
        author: e.author || (isV2 ? e.username : p.username) || 'unknown',
        username: isV2 ? e.username : p.username,
        likes: isV2 ? e.likes : p.likes,
        date: date ? new Date(date) : null,
        caption: caption.replace(/#[\p{L}\p{N}_]+/gu, '').replace(/\n{3,}/g, '\n\n').trim(),
        tags,
        cat: categorize(tags, caption),
      };
    });

const fmtLikes = n => (n == null ? '—' : n >= 1000 ? (n / 1000).toFixed(n >= 10000 ? 0 : 1) + 'K' : String(n));
const fmtDate = d => (d ? d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '—');

/* ---------------------------------------------------------------- card */
function Card({ e, onOpen }) {
  const [dead, setDead] = useState(false);
  return (
    <button className="pi-card" onClick={() => onOpen(e)} aria-label={`Open entry ${e.no}: ${e.author}`}>
      <div className="pi-thumb">
        {dead || !e.image ? (
          <div className="pi-dead">
            <span className="pi-dead-glyph">{(e.author || '?')[0]}</span>
            <span className="pi-dead-note">image expired · re-run harvest</span>
          </div>
        ) : (
          <img src={e.image} alt="" loading="lazy" onError={() => setDead(true)} />
        )}
        <div className="pi-thumb-veil" />
      </div>
      <div className="pi-card-meta">
        <span className="pi-no">TIP-{String(e.no).padStart(3, '0')}</span>
        <span className="pi-card-author">@{e.username || e.author}</span>
        <span className="pi-card-likes">♥ {fmtLikes(e.likes)}</span>
      </div>
    </button>
  );
}

/* --------------------------------------------------------------- modal */
function Detail({ e, onClose }) {
  const [embed, setEmbed] = useState(false);
  const [dead, setDead] = useState(false);
  useEffect(() => {
    const k = ev => ev.key === 'Escape' && onClose();
    window.addEventListener('keydown', k);
    document.body.style.overflow = 'hidden';
    return () => { window.removeEventListener('keydown', k); document.body.style.overflow = ''; };
  }, [onClose]);
  if (!e) return null;
  return (
    <div className="pi-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="pi-modal" onClick={ev => ev.stopPropagation()}>
        <div className="pi-modal-media">
          {embed ? (
            <iframe title="Instagram post" src={`https://www.instagram.com/p/${e.code}/embed`} allowTransparency allowFullScreen />
          ) : dead || !e.image ? (
            <div className="pi-dead pi-dead-lg">
              <span className="pi-dead-glyph">{(e.author || '?')[0]}</span>
              <span className="pi-dead-note">image expired — re-run harvest-v2.js, or view live below</span>
            </div>
          ) : (
            <img src={e.image} alt={`Post by ${e.author}`} onError={() => setDead(true)} />
          )}
        </div>
        <div className="pi-modal-body">
          <div className="pi-modal-eyebrow">
            <span>TIP-{String(e.no).padStart(3, '0')}</span>
            <span>{e.cat}</span>
          </div>
          <h2 className="pi-modal-author">{e.author}</h2>
          <div className="pi-modal-stats">@{e.username || '—'} · ♥ {fmtLikes(e.likes)} · {fmtDate(e.date)}</div>
          <p className="pi-modal-caption">{e.caption || 'No caption recorded for this post.'}</p>
          {e.tags.length > 0 && (
            <div className="pi-modal-tags">{e.tags.slice(0, 10).map(t => <span key={t}>#{t}</span>)}</div>
          )}
          <div className="pi-modal-actions">
            <a href={e.url} target="_blank" rel="noreferrer">Open on Instagram ↗</a>
            <button onClick={() => setEmbed(v => !v)}>{embed ? 'Show archived image' : 'View live embed'}</button>
            <button onClick={onClose}>Close</button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- main */
export default function PigmentIndex({ data: dataProp = null, jsonPath = '/pigment-data.json' }) {
  const [entries, setEntries] = useState(dataProp ? enrich(dataProp) : null);
  const [loadFailed, setLoadFailed] = useState(false);
  const [q, setQ] = useState('');
  const [cat, setCat] = useState('All');
  const [sort, setSort] = useState('newest');
  const [open, setOpen] = useState(null);
  const fileRef = useRef(null);

  useEffect(() => {
    if (entries) return;
    fetch(jsonPath)
      .then(r => { if (!r.ok) throw new Error(); return r.json(); })
      .then(d => setEntries(enrich(d)))
      .catch(() => setLoadFailed(true));
  }, [entries, jsonPath]);

  const onFile = ev => {
    const f = ev.target.files?.[0];
    if (!f) return;
    const rd = new FileReader();
    rd.onload = () => { try { setEntries(enrich(JSON.parse(rd.result))); setLoadFailed(false); } catch { alert('Not valid pigment-data.json'); } };
    rd.readAsText(f);
  };

  const cats = useMemo(() => {
    if (!entries) return [];
    const counts = {};
    entries.forEach(e => { counts[e.cat] = (counts[e.cat] || 0) + 1; });
    const order = [...CATEGORIES.map(c => c[0]), 'Field Notes'].filter(c => counts[c]);
    return order.map(c => [c, counts[c]]);
  }, [entries]);

  const shown = useMemo(() => {
    if (!entries) return [];
    const needle = q.trim().toLowerCase();
    let list = entries.filter(e =>
      (cat === 'All' || e.cat === cat) &&
      (!needle ||
        e.caption.toLowerCase().includes(needle) ||
        e.author.toLowerCase().includes(needle) ||
        (e.username || '').toLowerCase().includes(needle) ||
        e.tags.some(t => t.includes(needle)))
    );
    if (sort === 'newest') list = [...list].sort((a, b) => (b.date?.getTime() || 0) - (a.date?.getTime() || 0));
    if (sort === 'liked') list = [...list].sort((a, b) => (b.likes || 0) - (a.likes || 0));
    if (sort === 'author') list = [...list].sort((a, b) => (a.username || a.author).localeCompare(b.username || b.author));
    return list;
  }, [entries, q, cat, sort]);

  return (
    <div className="pi-root">
      <style>{CSS}</style>

      <header className="pi-header">
        <div className="pi-eyebrow">pLAtform · field guide · {entries ? entries.length : '—'} tips &amp; tricks cataloged from @cogspa</div>
        <h1 className="pi-title">Tips and Tricks Database</h1>
        <p className="pi-sub">
          An encyclopedia of digital painting tips, tools, and techniques — every specimen
          pressed and cataloged from the artists who shared it.
        </p>
      </header>

      <div className="pi-controls">
        <input
          className="pi-search"
          type="search"
          placeholder="Search captions, authors, #tags…"
          value={q}
          onChange={e => setQ(e.target.value)}
          aria-label="Search entries"
        />
        <select className="pi-sort" value={sort} onChange={e => setSort(e.target.value)} aria-label="Sort entries">
          <option value="newest">Newest first</option>
          <option value="liked">Most liked</option>
          <option value="author">Author A–Z</option>
        </select>
      </div>

      <div className="pi-cats" role="tablist" aria-label="Categories">
        <button className={cat === 'All' ? 'on' : ''} onClick={() => setCat('All')}>All</button>
        {cats.map(([c, n]) => (
          <button key={c} className={cat === c ? 'on' : ''} onClick={() => setCat(c)}>
            {c} <em>{n}</em>
          </button>
        ))}
      </div>

      {!entries && !loadFailed && <div className="pi-empty">Loading the database…</div>}

      {loadFailed && !entries && (
        <div className="pi-empty">
          <p>Couldn't find <code>pigment-data.json</code> next to the site.</p>
          <button className="pi-loadbtn" onClick={() => fileRef.current?.click()}>Load pigment-data.json</button>
          <input ref={fileRef} type="file" accept=".json" onChange={onFile} hidden />
        </div>
      )}

      {entries && shown.length === 0 && <div className="pi-empty">Nothing matches — clear the search or pick another category.</div>}

      <main className="pi-grid">
        {shown.map(e => <Card key={e.code} e={e} onOpen={setOpen} />)}
      </main>

      {open && <Detail e={open} onClose={() => setOpen(null)} />}

      <footer className="pi-foot">
        Tips and Tricks Database · pLAtform · image links are signed by Instagram's CDN and expire —
        re-run <code>harvest-v2.js</code> to refresh the archive.
      </footer>
    </div>
  );
}

/* ---------------------------------------------------------------- styles */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:ital,wght@0,400;0,500;1,400&family=Newsreader:ital,opsz,wght@0,6..72,300;0,6..72,400;0,6..72,600;1,6..72,400&display=swap');

.pi-root{background:${CREAM};color:${INK};min-height:100vh;padding:2.5rem clamp(1rem,4vw,3.5rem) 4rem;font-family:'Newsreader',serif}
.pi-root *{box-sizing:border-box}
.pi-root button{cursor:pointer;font-family:inherit}
.pi-root :focus-visible{outline:2px solid ${OX};outline-offset:2px}

.pi-header{max-width:60rem;margin-bottom:2rem}
.pi-eyebrow{font-family:'IBM Plex Mono',monospace;font-size:.7rem;letter-spacing:.14em;text-transform:uppercase;color:${OX};margin-bottom:.75rem}
.pi-title{font-size:clamp(2.6rem,7vw,5rem);font-weight:300;line-height:.95;margin:0 0 .75rem;letter-spacing:-.02em}
.pi-title::after{content:'';display:block;width:5rem;height:3px;background:${OX};margin-top:1rem}
.pi-sub{font-size:1.1rem;font-style:italic;max-width:38rem;color:#5a4c44;margin:0;line-height:1.5}

.pi-controls{display:flex;gap:.75rem;flex-wrap:wrap;margin-bottom:1rem}
.pi-search{flex:1 1 16rem;background:transparent;border:1px solid #c9bda8;border-radius:0;padding:.6rem .8rem;font-family:'IBM Plex Mono',monospace;font-size:.8rem;color:${INK}}
.pi-search::placeholder{color:#a29483}
.pi-sort{background:transparent;border:1px solid #c9bda8;padding:.6rem .8rem;font-family:'IBM Plex Mono',monospace;font-size:.8rem;color:${INK};border-radius:0}

.pi-cats{display:flex;gap:.4rem;flex-wrap:wrap;margin-bottom:1.75rem}
.pi-cats button{font-family:'IBM Plex Mono',monospace;font-size:.68rem;letter-spacing:.04em;text-transform:uppercase;padding:.35rem .7rem;border:1px solid #c9bda8;background:transparent;color:#5a4c44;transition:all .15s}
.pi-cats button em{font-style:normal;opacity:.55;margin-left:.25rem}
.pi-cats button:hover{border-color:${OX};color:${OX}}
.pi-cats button.on{background:${OX};border-color:${OX};color:${CREAM}}

.pi-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(190px,1fr));gap:1.1rem}
.pi-card{display:block;width:100%;text-align:left;background:transparent;border:none;padding:0}
.pi-thumb{position:relative;aspect-ratio:1;overflow:hidden;background:#e6dcc8;border:1px solid #d8cdb6}
.pi-thumb img{width:100%;height:100%;object-fit:cover;filter:saturate(.92);transition:transform .35s ease,filter .35s ease}
.pi-card:hover .pi-thumb img{transform:scale(1.04);filter:saturate(1.05)}
.pi-thumb-veil{position:absolute;inset:0;box-shadow:inset 0 0 0 0 ${OX};transition:box-shadow .2s}
.pi-card:hover .pi-thumb-veil{box-shadow:inset 0 0 0 3px ${OX}}
.pi-card-meta{display:flex;align-items:baseline;gap:.5rem;padding:.45rem .1rem 0;font-family:'IBM Plex Mono',monospace;font-size:.63rem;color:#5a4c44}
.pi-no{color:${OX};font-weight:500}
.pi-card-author{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;flex:1}
.pi-card-likes{white-space:nowrap}

.pi-dead{width:100%;height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:.5rem;background:repeating-linear-gradient(-45deg,#efe7d4,#efe7d4 8px,#e9dfc9 8px,#e9dfc9 16px)}
.pi-dead-glyph{font-family:'Newsreader',serif;font-style:italic;font-size:3rem;color:${OX};opacity:.5;line-height:1;text-transform:uppercase}
.pi-dead-note{font-family:'IBM Plex Mono',monospace;font-size:.55rem;letter-spacing:.08em;text-transform:uppercase;color:#a2907b;text-align:center;padding:0 .75rem}
.pi-dead-lg .pi-dead-glyph{font-size:6rem}

.pi-empty{font-family:'IBM Plex Mono',monospace;font-size:.8rem;color:#7a6a5b;padding:3rem 0;text-align:center}
.pi-loadbtn{margin-top:1rem;background:${OX};color:${CREAM};border:none;padding:.7rem 1.2rem;font-family:'IBM Plex Mono',monospace;font-size:.75rem;letter-spacing:.08em;text-transform:uppercase}

.pi-overlay{position:fixed;inset:0;background:rgba(42,33,28,.55);display:flex;align-items:center;justify-content:center;padding:1.25rem;z-index:60}
.pi-modal{background:${CREAM};border:1px solid ${OX};max-width:62rem;width:100%;max-height:88vh;display:grid;grid-template-columns:minmax(0,1.05fr) minmax(0,1fr);overflow:hidden}
.pi-modal-media{background:#e6dcc8;min-height:20rem}
.pi-modal-media img,.pi-modal-media iframe{width:100%;height:100%;object-fit:cover;border:none;display:block}
.pi-modal-body{padding:1.75rem;overflow-y:auto}
.pi-modal-eyebrow{display:flex;justify-content:space-between;font-family:'IBM Plex Mono',monospace;font-size:.65rem;letter-spacing:.12em;text-transform:uppercase;color:${OX};margin-bottom:.75rem}
.pi-modal-author{font-size:1.9rem;font-weight:400;margin:0 0 .3rem;line-height:1.1}
.pi-modal-stats{font-family:'IBM Plex Mono',monospace;font-size:.68rem;color:#7a6a5b;margin-bottom:1.1rem}
.pi-modal-caption{white-space:pre-wrap;font-size:1rem;line-height:1.55;margin:0 0 1.1rem;color:#3d332c}
.pi-modal-tags{display:flex;gap:.35rem;flex-wrap:wrap;margin-bottom:1.4rem}
.pi-modal-tags span{font-family:'IBM Plex Mono',monospace;font-size:.62rem;color:${OX};border:1px solid #d9b8ae;padding:.15rem .45rem}
.pi-modal-actions{display:flex;gap:.6rem;flex-wrap:wrap}
.pi-modal-actions a,.pi-modal-actions button{font-family:'IBM Plex Mono',monospace;font-size:.68rem;letter-spacing:.06em;text-transform:uppercase;text-decoration:none;padding:.55rem .85rem;border:1px solid ${OX};color:${OX};background:transparent}
.pi-modal-actions a:hover,.pi-modal-actions button:hover{background:${OX};color:${CREAM}}

.pi-foot{margin-top:3.5rem;font-family:'IBM Plex Mono',monospace;font-size:.62rem;letter-spacing:.06em;color:#a2907b;text-transform:uppercase}
.pi-foot code{text-transform:none}

@media (max-width:760px){
  .pi-modal{grid-template-columns:1fr;max-height:92vh;overflow-y:auto}
  .pi-modal-media{max-height:45vh}
}
@media (prefers-reduced-motion:reduce){
  .pi-root *{transition:none!important}
}
`;
