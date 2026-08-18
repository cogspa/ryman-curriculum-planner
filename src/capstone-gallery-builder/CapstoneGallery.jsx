import { useState, useRef, useCallback, useEffect } from "react";

/* ============================================================
   CAPSTONE GALLERY BUILDER
   Built from "Capstone Project Development Template" SVG.
   - Each template section = a full-width board in a vertical stack
   - Click or drop images into dashed frames
   - Drag the ⠿ handle to reorder sections
   - BRAND bar: accent / ink / page colors + Google Fonts
   - EXPORT downloads index.html, styles.css, script.js (Netlify-ready)
   ============================================================ */

const uid = () => Math.random().toString(36).slice(2, 9);

/* ---------------- brand system ---------------- */

const FONTS = [
  { name: "Arial / Helvetica", css: `Arial,"Helvetica Neue",Helvetica,sans-serif`, gf: null },
  { name: "Archivo", css: "'Archivo',sans-serif", gf: "Archivo:wght@400;500;700;900" },
  { name: "Space Grotesk", css: "'Space Grotesk',sans-serif", gf: "Space+Grotesk:wght@400;500;700" },
  { name: "Bebas Neue", css: "'Bebas Neue',sans-serif", gf: "Bebas+Neue" },
  { name: "Oswald", css: "'Oswald',sans-serif", gf: "Oswald:wght@400;500;700" },
  { name: "Syne", css: "'Syne',sans-serif", gf: "Syne:wght@400;600;800" },
  { name: "Unbounded", css: "'Unbounded',sans-serif", gf: "Unbounded:wght@400;700" },
  { name: "Playfair Display", css: "'Playfair Display',serif", gf: "Playfair+Display:wght@400;700" },
  { name: "DM Serif Display", css: "'DM Serif Display',serif", gf: "DM+Serif+Display" },
  { name: "Inter", css: "'Inter',sans-serif", gf: "Inter:wght@400;500;700" },
  { name: "DM Sans", css: "'DM Sans',sans-serif", gf: "DM+Sans:wght@400;500;700" },
  { name: "Work Sans", css: "'Work Sans',sans-serif", gf: "Work+Sans:wght@400;500;700" },
  { name: "IBM Plex Sans", css: "'IBM Plex Sans',sans-serif", gf: "IBM+Plex+Sans:wght@400;500;700" },
  { name: "Lora", css: "'Lora',serif", gf: "Lora:wght@400;500;700" },
];

const DEFAULT_THEME = {
  accent: "#507b86",
  ink: "#262b2f",
  page: "#f7f6f2",
  display: 0, // index into FONTS — headings / titles
  body: 0,    // index into FONTS — body copy, labels, fields
};

const gfHref = (theme) => {
  const fams = [...new Set(
    [FONTS[theme.display], FONTS[theme.body]]
      .filter((f) => f.gf)
      .map((f) => `family=${f.gf}`)
  )];
  return fams.length
    ? `https://fonts.googleapis.com/css2?${fams.join("&")}&display=swap`
    : null;
};

/* ---------------- section data ---------------- */

const makeSlots = (n, labels = []) =>
  Array.from({ length: n }, (_, i) => ({ id: uid(), img: null, label: labels[i] || null }));

const INITIAL_SECTIONS = [
  {
    id: uid(), key: "blockouts",
    title: "BLOCKOUTS / THUMBNAILS",
    sub: "Early ideas, silhouettes, compositions",
    hint: "REPLACE WITH PROCESS IMAGES",
    slots: makeSlots(8), grid: "g4", aspect: "4 / 3",
  },
  {
    id: uid(), key: "environments",
    title: "ENVIRONMENTS",
    sub: "Space, lighting, mood, worldbuilding",
    hint: "ADD 3 KEY ENVIRONMENT IMAGES",
    slots: makeSlots(3), grid: "g3", aspect: "2 / 1",
  },
  {
    id: uid(), key: "characters",
    title: "CHARACTERS",
    sub: "Design, expressions, model sheets",
    hint: "HERO + SUPPORTING VIEWS",
    slots: makeSlots(4), grid: "chars", aspect: null,
  },
  {
    id: uid(), key: "storyboard",
    title: "ITERATIONS / NARRATIVE / STORYBOARD",
    sub: "Show how the idea develops and moves",
    hint: "SIX FRAMES, IN ORDER",
    slots: makeSlots(6, ["FRAME 01","FRAME 02","FRAME 03","FRAME 04","FRAME 05","FRAME 06"]),
    grid: "g3", aspect: "3 / 2",
  },
  {
    id: uid(), key: "hero",
    title: "HERO PROJECT",
    sub: "The primary, presentation-ready outcome",
    hint: "PLACE HERO IMAGE HERE",
    slots: makeSlots(1), grid: "hero", aspect: "16 / 10",
    fields: { format: "", description: "" },
  },
  {
    id: uid(), key: "contact",
    title: "CLOSING STATEMENT / CONTACT INFO",
    sub: "End with a clear takeaway",
    hint: "QR / PHOTO",
    slots: makeSlots(1), grid: "contact", aspect: "1 / 1",
    fields: { statement: "", name: "", role: "", email: "", website: "", social: "" },
  },
];

const readAsDataURL = (file) =>
  new Promise((res, rej) => {
    const r = new FileReader();
    r.onload = () => res(r.result);
    r.onerror = rej;
    r.readAsDataURL(file);
  });

/* ---------------- image slot ---------------- */

function Slot({ slot, aspect, onSet, onClear, preview, big }) {
  const inputRef = useRef(null);
  const [over, setOver] = useState(false);

  const handleFiles = async (files) => {
    const f = files && files[0];
    if (f && f.type.startsWith("image/")) onSet(await readAsDataURL(f));
  };

  if (preview && !slot.img) return null;

  return (
    <div
      className={`slot ${slot.img ? "filled" : ""} ${over ? "over" : ""} ${big ? "big" : ""}`}
      style={{ aspectRatio: aspect || undefined }}
      onClick={() => !preview && inputRef.current && inputRef.current.click()}
      onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); setOver(true); }}
      onDragLeave={() => setOver(false)}
      onDrop={(e) => {
        e.preventDefault(); e.stopPropagation(); setOver(false);
        if (!preview) handleFiles(e.dataTransfer.files);
      }}
    >
      {slot.img ? (
        <>
          <img src={slot.img} alt={slot.label || "artwork"} />
          {!preview && (
            <button
              className="clear"
              onClick={(e) => { e.stopPropagation(); onClear(); }}
              title="Remove image"
            >×</button>
          )}
        </>
      ) : (
        <div className="empty">
          <svg viewBox="0 0 40 32" width="34" height="27">
            <rect x="1" y="1" width="38" height="30" rx="2" fill="none" stroke="#90979b" strokeWidth="2"/>
            <circle cx="29" cy="10" r="3" fill="#90979b"/>
            <path d="M5 27 L15 17 L21 22 L26 17 L36 27" fill="none" stroke="#90979b" strokeWidth="2"/>
          </svg>
          <span>CLICK OR DROP IMAGE</span>
        </div>
      )}
      {slot.label && <em className="frame-label">{slot.label}</em>}
      <input
        ref={inputRef} type="file" accept="image/*" hidden
        onChange={(e) => { handleFiles(e.target.files); e.target.value = ""; }}
      />
    </div>
  );
}

/* ---------------- field helpers ---------------- */

function Field({ label, value, onChange, preview, textarea }) {
  if (preview) {
    if (!value) return null;
    return (
      <div className="fld ro">
        <label>{label}</label>
        <p>{value}</p>
      </div>
    );
  }
  return (
    <div className="fld">
      <label>{label}</label>
      {textarea ? (
        <textarea rows={3} value={value} onChange={(e) => onChange(e.target.value)} />
      ) : (
        <input value={value} onChange={(e) => onChange(e.target.value)} />
      )}
    </div>
  );
}

/* ---------------- export builders ---------------- */

function buildExportCSS(theme) {
  return `:root{
  --page:${theme.page}; --board:#fff; --ink:${theme.ink}; --body:#42484c;
  --mute:#747b7f; --line:#a7adb1; --soft:#c9cdcf; --accent:${theme.accent};
  --accent-tint:color-mix(in srgb, ${theme.accent} 10%, #ffffff);
  --font-display:${FONTS[theme.display].css};
  --font-body:${FONTS[theme.body].css};
}
*{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
body{background:var(--page);color:var(--body);
  font-family:var(--font-body);
  padding:34px 18px 60px}
.wrap{max-width:1100px;margin:0 auto}
header.board-head{background:var(--board);border:1.5px solid var(--soft);
  border-radius:4px;padding:26px 30px 22px;margin-bottom:26px}
header.board-head h1{font-family:var(--font-display);
  font-size:clamp(19px,3.4vw,27px);letter-spacing:3px;color:var(--ink)}
header.board-head .accent-rule{height:2px;background:var(--accent);margin:12px 0 14px}
header.board-head .meta{display:flex;gap:28px;flex-wrap:wrap;
  font-size:12px;font-weight:700;letter-spacing:.8px;color:var(--accent)}
header.board-head .meta b{color:var(--ink);letter-spacing:1px}
section.board{background:var(--board);border:2px solid var(--ink);
  margin-bottom:26px;opacity:0;transform:translateY(18px);
  transition:opacity .55s ease,transform .55s ease}
section.board.on{opacity:1;transform:none}
section.board .bar{height:6px;background:var(--accent)}
section.board .inner{padding:24px 26px 28px}
section.board h2{font-family:var(--font-display);font-size:16px;font-weight:700;
  letter-spacing:1.8px;color:var(--ink);text-align:center}
section.board .sub{font-size:12px;color:var(--mute);text-align:center;margin:6px 0 20px}
.grid{display:grid;gap:14px}
.grid.g4{grid-template-columns:repeat(4,1fr)}
.grid.g3{grid-template-columns:repeat(3,1fr)}
.grid.chars{grid-template-columns:2fr 1fr 1fr 1fr;align-items:start}
figure{margin:0;position:relative}
figure img{display:block;width:100%;height:100%;object-fit:cover;
  border:1.5px solid var(--soft);border-radius:2px;cursor:zoom-in}
figure em{display:block;font-style:normal;font-size:10px;letter-spacing:.5px;
  color:var(--mute);margin-top:5px}
.fields{max-width:640px;margin:20px auto 0}
.fields .fld{margin-bottom:14px}
.fields label{display:block;font-size:12px;font-weight:700;
  letter-spacing:.8px;color:var(--accent);margin-bottom:4px}
.fields p{font-size:15px;color:var(--body);border-bottom:1.5px solid var(--line);
  padding-bottom:6px}
footer.brand{background:var(--accent-tint);border:1.5px solid var(--line);
  border-radius:3px;padding:18px 24px;display:flex;align-items:center;
  justify-content:space-between;gap:20px;flex-wrap:wrap}
footer.brand span{font-family:var(--font-display);font-size:13px;font-weight:700;
  letter-spacing:1.2px;color:var(--ink)}
footer.brand img{max-height:46px}
#lightbox{position:fixed;inset:0;background:rgba(20,22,24,.92);
  display:none;align-items:center;justify-content:center;z-index:50;cursor:zoom-out}
#lightbox.open{display:flex}
#lightbox img{max-width:92vw;max-height:92vh;border:4px solid #fff}
@media(max-width:760px){
  .grid.g4{grid-template-columns:repeat(2,1fr)}
  .grid.g3{grid-template-columns:repeat(2,1fr)}
  .grid.chars{grid-template-columns:1fr 1fr}
  .grid.chars figure:first-child{grid-column:span 2}
}
@media(prefers-reduced-motion:reduce){
  section.board{opacity:1;transform:none;transition:none}
}`;
}

const EXPORT_JS = `// Scroll reveal + lightbox
const boards = document.querySelectorAll("section.board");
const io = new IntersectionObserver((entries) => {
  entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("on"); io.unobserve(en.target); } });
}, { threshold: 0.12 });
boards.forEach((b) => io.observe(b));

const lb = document.createElement("div");
lb.id = "lightbox";
lb.innerHTML = "<img alt=''>";
document.body.appendChild(lb);
const lbImg = lb.querySelector("img");
document.querySelectorAll("section.board figure img").forEach((img) => {
  img.addEventListener("click", () => { lbImg.src = img.src; lb.classList.add("open"); });
});
lb.addEventListener("click", () => lb.classList.remove("open"));
document.addEventListener("keydown", (e) => { if (e.key === "Escape") lb.classList.remove("open"); });`;

const esc = (s = "") =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function buildExportHTML({ projectTitle, studentName, sections, logo, theme }) {
  const fig = (slot) =>
    slot.img
      ? `      <figure><img src="${slot.img}" alt="${esc(slot.label || "artwork")}">${slot.label ? `<em>${esc(slot.label)}</em>` : ""}</figure>`
      : "";

  const fieldRow = (label, val) =>
    val ? `        <div class="fld"><label>${esc(label)}</label><p>${esc(val)}</p></div>` : "";

  const sectionHTML = sections
    .map((s) => {
      const filled = s.slots.filter((x) => x.img);
      const hasFields = s.fields && Object.values(s.fields).some(Boolean);
      if (!filled.length && !hasFields) return "";

      let body = "";
      if (s.key === "characters") {
        body = `    <div class="grid chars">\n${s.slots.map(fig).filter(Boolean).join("\n")}\n    </div>`;
      } else if (s.key === "hero") {
        body = `    <div class="grid" style="grid-template-columns:1fr;max-width:760px;margin:0 auto">\n${s.slots.map(fig).filter(Boolean).join("\n")}\n    </div>\n      <div class="fields">\n${fieldRow("FORMAT / MEDIUM", s.fields.format)}\n${fieldRow("ONE-LINE PROJECT DESCRIPTION", s.fields.description)}\n      </div>`;
      } else if (s.key === "contact") {
        body = `      <div class="fields">\n${fieldRow("CLOSING STATEMENT", s.fields.statement)}\n${fieldRow("NAME", s.fields.name)}\n${fieldRow("ROLE / DISCIPLINE", s.fields.role)}\n${fieldRow("EMAIL", s.fields.email)}\n${fieldRow("WEBSITE / PORTFOLIO", s.fields.website)}\n${fieldRow("SOCIAL / LINKEDIN", s.fields.social)}\n      </div>` +
          (filled.length ? `\n    <div class="grid" style="grid-template-columns:180px;justify-content:center;margin-top:18px">\n${fig(filled[0])}\n    </div>` : "");
      } else {
        body = `    <div class="grid ${s.grid}">\n${s.slots.map(fig).filter(Boolean).join("\n")}\n    </div>`;
      }

      return `  <section class="board">
    <div class="bar"></div>
    <div class="inner">
      <h2>${esc(s.title)}</h2>
      <p class="sub">${esc(s.sub)}</p>
${body}
    </div>
  </section>`;
    })
    .filter(Boolean)
    .join("\n\n");

  const href = gfHref(theme);
  const fontLinks = href
    ? `<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="${href}">`
    : "";

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${esc(projectTitle || "Capstone Project")}${studentName ? " — " + esc(studentName) : ""}</title>
${fontLinks}
<link rel="stylesheet" href="styles.css">
</head>
<body>
<div class="wrap">
  <header class="board-head">
    <h1>${esc(projectTitle || "CAPSTONE PROJECT DEVELOPMENT")}</h1>
    <div class="accent-rule"></div>
    <div class="meta">
      ${projectTitle ? `<span>PROJECT: <b>${esc(projectTitle)}</b></span>` : ""}
      ${studentName ? `<span>STUDENT: <b>${esc(studentName)}</b></span>` : ""}
    </div>
  </header>

${sectionHTML}

  <footer class="brand">
    <span>BRANDED THROUGHOUT</span>
    ${logo ? `<img src="${logo}" alt="logo">` : ""}
  </footer>
</div>
<script src="script.js"></script>
</body>
</html>`;
}

function downloadFile(name, content, mime) {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = name;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 4000);
}

/* ---------------- main app ---------------- */

export default function CapstoneGallery() {
  const [sections, setSections] = useState(INITIAL_SECTIONS);
  const [projectTitle, setProjectTitle] = useState("");
  const [studentName, setStudentName] = useState("");
  const [logo, setLogo] = useState(null);
  const [theme, setTheme] = useState(DEFAULT_THEME);
  const [preview, setPreview] = useState(false);
  const [exported, setExported] = useState(false);
  const dragId = useRef(null);
  const logoInput = useRef(null);

  /* live-load chosen Google Fonts into the editor */
  useEffect(() => {
    const href = gfHref(theme);
    let link = document.getElementById("gf-editor");
    if (!href) { if (link) link.remove(); return; }
    if (!link) {
      link = document.createElement("link");
      link.id = "gf-editor";
      link.rel = "stylesheet";
      document.head.appendChild(link);
    }
    link.href = href;
  }, [theme]);

  const setSlotImg = useCallback((secId, slotId, img) => {
    setSections((prev) =>
      prev.map((s) =>
        s.id === secId
          ? { ...s, slots: s.slots.map((x) => (x.id === slotId ? { ...x, img } : x)) }
          : s
      )
    );
  }, []);

  const setField = useCallback((secId, key, val) => {
    setSections((prev) =>
      prev.map((s) => (s.id === secId ? { ...s, fields: { ...s.fields, [key]: val } } : s))
    );
  }, []);

  const onDragEnterSection = (overId) => {
    const from = dragId.current;
    if (!from || from === overId) return;
    setSections((prev) => {
      const a = prev.findIndex((s) => s.id === from);
      const b = prev.findIndex((s) => s.id === overId);
      if (a < 0 || b < 0) return prev;
      const next = [...prev];
      const [moved] = next.splice(a, 1);
      next.splice(b, 0, moved);
      return next;
    });
  };

  const doExport = () => {
    const html = buildExportHTML({ projectTitle, studentName, sections, logo, theme });
    downloadFile("index.html", html, "text/html");
    setTimeout(() => downloadFile("styles.css", buildExportCSS(theme), "text/css"), 350);
    setTimeout(() => downloadFile("script.js", EXPORT_JS, "text/javascript"), 700);
    setExported(true);
    setTimeout(() => setExported(false), 3500);
  };

  const filledCount = sections.reduce((n, s) => n + s.slots.filter((x) => x.img).length, 0);

  const themeVars = {
    "--accent": theme.accent,
    "--ink": theme.ink,
    "--page": theme.page,
    "--font-display": FONTS[theme.display].css,
    "--font-body": FONTS[theme.body].css,
  };

  return (
    <div className={`app ${preview ? "preview" : "editing"}`} style={themeVars}>
      <style>{`
        :root{
          --page:#f7f6f2; --board:#fff; --ink:#262b2f; --body:#42484c;
          --mute:#747b7f; --line:#a7adb1; --soft:#c9cdcf; --accent:#507b86;
          --ph:#ececea; --ph-line:#90979b;
          --font-display:Arial,"Helvetica Neue",Helvetica,sans-serif;
          --font-body:Arial,"Helvetica Neue",Helvetica,sans-serif;
        }
        *{box-sizing:border-box}
        .app{min-height:100vh;background:var(--page);color:var(--body);
          font-family:var(--font-body);padding-bottom:80px}

        /* sticky top bars */
        .topbars{position:sticky;top:0;z-index:20}
        .toolbar{background:var(--ink);display:flex;align-items:center;gap:14px;
          flex-wrap:wrap;padding:12px 22px;border-bottom:3px solid var(--accent)}
        .toolbar h1{font-family:var(--font-display);font-size:13px;
          letter-spacing:2.4px;color:#fff;margin:0;font-weight:700}
        .toolbar .spacer{flex:1}
        .toolbar input{background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.25);
          color:#fff;font-size:12px;letter-spacing:.6px;padding:7px 10px;
          border-radius:2px;width:170px;font-family:var(--font-body)}
        .toolbar input::placeholder{color:rgba(255,255,255,.5)}
        .tbtn{font-family:var(--font-display);font-size:11px;font-weight:700;
          letter-spacing:1.4px;cursor:pointer;border:1.5px solid var(--accent);
          background:transparent;color:#fff;padding:8px 14px;border-radius:2px}
        .tbtn:hover{background:rgba(255,255,255,.08)}
        .tbtn.primary{background:var(--accent);color:#fff}
        .tbtn.primary:hover{filter:brightness(.92)}
        .count{font-size:10px;letter-spacing:1px;color:rgba(255,255,255,.55)}

        /* brand bar */
        .brandbar{background:#fff;border-bottom:1.5px solid var(--soft);
          display:flex;align-items:center;gap:16px;flex-wrap:wrap;padding:9px 22px}
        .bb-label{font-family:var(--font-display);font-size:11px;font-weight:700;
          letter-spacing:1.8px;color:var(--accent)}
        .chip{display:flex;align-items:center;gap:7px;font-size:10px;
          font-weight:700;letter-spacing:.9px;color:var(--mute)}
        .chip input[type=color]{width:30px;height:24px;padding:0;border:1.5px solid var(--soft);
          border-radius:2px;background:none;cursor:pointer}
        .chip select{font-family:var(--font-body);font-size:12px;color:var(--body);
          border:1.5px solid var(--soft);border-radius:2px;padding:4px 6px;
          background:#fff;cursor:pointer;max-width:160px}
        .chip select:focus{outline:none;border-color:var(--accent)}
        .bb-reset{font-size:10px;font-weight:700;letter-spacing:1px;color:var(--mute);
          background:none;border:none;cursor:pointer;text-decoration:underline;padding:0}
        .bb-reset:hover{color:var(--accent)}
        .preview .brandbar{display:none}

        .wrap{max-width:1100px;margin:26px auto 0;padding:0 18px}

        .board-head{background:var(--board);border:1.5px solid var(--soft);
          border-radius:4px;padding:24px 28px 20px;margin-bottom:24px}
        .board-head h2{font-family:var(--font-display);
          font-size:clamp(18px,3.2vw,26px);letter-spacing:3px;color:var(--ink);margin:0}
        .board-head .accent-rule{height:2px;background:var(--accent);margin:12px 0 0}

        .board{background:var(--board);border:2px solid var(--ink);
          margin-bottom:24px;position:relative}
        .board.dragging{opacity:.45}
        .board .bar{height:6px;background:var(--accent)}
        .board .inner{padding:22px 24px 26px}
        .board h3{font-family:var(--font-display);font-size:15px;font-weight:700;
          letter-spacing:1.8px;color:var(--ink);text-align:center;margin:0}
        .board .sub{font-size:12px;color:var(--mute);text-align:center;margin:6px 0 18px}
        .board .hint{font-size:10px;letter-spacing:.5px;color:var(--mute);
          text-align:center;margin-top:16px}
        .preview .board .hint{display:none}

        .handle{position:absolute;left:-2px;top:6px;bottom:0;width:26px;
          background:var(--ink);color:#fff;display:flex;align-items:center;
          justify-content:center;cursor:grab;font-size:12px;letter-spacing:2px;
          writing-mode:vertical-rl;user-select:none;font-family:var(--font-display)}
        .handle:active{cursor:grabbing}
        .preview .handle{display:none}
        .editing .board .inner{padding-left:44px}

        .grid{display:grid;gap:13px}
        .grid.g4{grid-template-columns:repeat(4,1fr)}
        .grid.g3{grid-template-columns:repeat(3,1fr)}
        .grid.chars{grid-template-columns:2fr 1fr 1fr 1fr}
        .grid.hero{grid-template-columns:1fr;max-width:720px;margin:0 auto}
        .grid.contact-qr{grid-template-columns:170px;justify-content:center}

        .slot{position:relative;background:var(--ph);border:1.5px dashed var(--ph-line);
          border-radius:2px;overflow:hidden;cursor:pointer;min-height:64px}
        .slot.big{border-color:var(--accent);
          background:color-mix(in srgb, var(--accent) 10%, #ffffff);border-width:2px}
        .slot.over{border-color:var(--accent);
          background:color-mix(in srgb, var(--accent) 18%, #ffffff)}
        .slot.filled{border-style:solid;border-color:var(--soft);background:#fff}
        .preview .slot{cursor:default;border-style:solid}
        .slot img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
        .slot .empty{position:absolute;inset:0;display:flex;flex-direction:column;
          align-items:center;justify-content:center;gap:7px}
        .slot .empty span{font-size:9px;letter-spacing:1px;color:var(--mute)}
        .slot .clear{position:absolute;top:6px;right:6px;width:22px;height:22px;
          border:none;border-radius:2px;background:rgba(38,43,47,.85);color:#fff;
          font-size:14px;line-height:1;cursor:pointer;opacity:0;transition:opacity .15s}
        .slot:hover .clear{opacity:1}
        .frame-label{position:absolute;left:7px;top:6px;font-style:normal;
          font-size:9px;letter-spacing:.6px;color:var(--ink);
          background:rgba(255,255,255,.85);padding:2px 5px;border-radius:1px;z-index:2}

        .fields{max-width:620px;margin:18px auto 0}
        .fld{margin-bottom:12px}
        .fld label{display:block;font-size:11px;font-weight:700;letter-spacing:.8px;
          color:var(--accent);margin-bottom:4px}
        .fld input,.fld textarea{width:100%;border:none;border-bottom:1.5px solid var(--line);
          background:transparent;font-size:15px;color:var(--body);padding:4px 2px 6px;
          font-family:var(--font-body);resize:vertical}
        .fld input:focus,.fld textarea:focus{outline:none;border-bottom-color:var(--accent)}
        .fld.ro p{font-size:15px;border-bottom:1.5px solid var(--line);padding-bottom:6px;margin:0}

        .brand{background:color-mix(in srgb, var(--accent) 8%, #ffffff);
          border:1.5px solid var(--line);border-radius:3px;
          padding:16px 22px;display:flex;align-items:center;gap:18px;
          justify-content:space-between;flex-wrap:wrap}
        .brand span{font-family:var(--font-display);font-size:13px;font-weight:700;
          letter-spacing:1.2px;color:var(--ink)}
        .brand .logo-slot{width:300px;height:52px;min-height:52px}
        .brand img.logo{max-height:46px;display:block;cursor:pointer}

        .toast{position:fixed;bottom:22px;left:50%;transform:translateX(-50%);
          background:var(--ink);color:#fff;font-size:11px;letter-spacing:1.2px;
          padding:12px 20px;border-left:4px solid var(--accent);border-radius:2px;z-index:40}

        @media(max-width:760px){
          .grid.g4{grid-template-columns:repeat(2,1fr)}
          .grid.g3{grid-template-columns:repeat(2,1fr)}
          .grid.chars{grid-template-columns:1fr 1fr}
          .toolbar input{width:130px}
        }
        @media(prefers-reduced-motion:reduce){ *{transition:none!important} }
      `}</style>

      <div className="topbars">
        {/* ------- toolbar ------- */}
        <div className="toolbar">
          <h1>CAPSTONE GALLERY BUILDER</h1>
          <span className="count">{filledCount} IMAGES PLACED</span>
          <div className="spacer" />
          <input
            placeholder="PROJECT TITLE" value={projectTitle}
            onChange={(e) => setProjectTitle(e.target.value)} aria-label="Project title"
          />
          <input
            placeholder="STUDENT NAME" value={studentName}
            onChange={(e) => setStudentName(e.target.value)} aria-label="Student name"
          />
          <button className="tbtn" onClick={() => setPreview((p) => !p)}>
            {preview ? "EDIT" : "PREVIEW"}
          </button>
          <button className="tbtn primary" onClick={doExport}>
            EXPORT SITE
          </button>
        </div>

        {/* ------- brand bar ------- */}
        {!preview && (
          <div className="brandbar">
            <span className="bb-label">BRAND</span>
            <label className="chip">ACCENT
              <input type="color" value={theme.accent}
                onChange={(e) => setTheme((t) => ({ ...t, accent: e.target.value }))} />
            </label>
            <label className="chip">INK
              <input type="color" value={theme.ink}
                onChange={(e) => setTheme((t) => ({ ...t, ink: e.target.value }))} />
            </label>
            <label className="chip">PAGE
              <input type="color" value={theme.page}
                onChange={(e) => setTheme((t) => ({ ...t, page: e.target.value }))} />
            </label>
            <label className="chip">DISPLAY FONT
              <select value={theme.display}
                onChange={(e) => setTheme((t) => ({ ...t, display: +e.target.value }))}>
                {FONTS.map((f, i) => <option key={f.name} value={i}>{f.name}</option>)}
              </select>
            </label>
            <label className="chip">BODY FONT
              <select value={theme.body}
                onChange={(e) => setTheme((t) => ({ ...t, body: +e.target.value }))}>
                {FONTS.map((f, i) => <option key={f.name} value={i}>{f.name}</option>)}
              </select>
            </label>
            <button className="bb-reset" onClick={() => setTheme(DEFAULT_THEME)}>
              RESET TO TEMPLATE
            </button>
          </div>
        )}
      </div>

      <div className="wrap">
        {/* ------- header board ------- */}
        <div className="board-head">
          <h2>
            {projectTitle ? projectTitle.toUpperCase() : "CAPSTONE PROJECT DEVELOPMENT"}
            {studentName ? ` — ${studentName.toUpperCase()}` : ""}
          </h2>
          <div className="accent-rule" />
        </div>

        {/* ------- section boards ------- */}
        {sections.map((s) => (
          <section
            key={s.id}
            className="board"
            onDragEnter={() => onDragEnterSection(s.id)}
            onDragOver={(e) => e.preventDefault()}
          >
            <div className="bar" />
            {!preview && (
              <div
                className="handle" title="Drag to reorder section"
                draggable
                onDragStart={(e) => {
                  dragId.current = s.id;
                  e.dataTransfer.effectAllowed = "move";
                  e.currentTarget.parentElement.classList.add("dragging");
                }}
                onDragEnd={(e) => {
                  dragId.current = null;
                  e.currentTarget.parentElement.classList.remove("dragging");
                }}
              >⠿ DRAG</div>
            )}
            <div className="inner">
              <h3>{s.title}</h3>
              <p className="sub">{s.sub}</p>

              {s.key === "characters" ? (
                <div className="grid chars">
                  {s.slots.map((slot, i) => (
                    <Slot
                      key={slot.id} slot={slot} preview={preview}
                      aspect={i === 0 ? "7 / 8" : "5 / 8"} big={i === 0}
                      onSet={(img) => setSlotImg(s.id, slot.id, img)}
                      onClear={() => setSlotImg(s.id, slot.id, null)}
                    />
                  ))}
                </div>
              ) : s.key === "hero" ? (
                <>
                  <div className="grid hero">
                    {s.slots.map((slot) => (
                      <Slot
                        key={slot.id} slot={slot} preview={preview} aspect={s.aspect} big
                        onSet={(img) => setSlotImg(s.id, slot.id, img)}
                        onClear={() => setSlotImg(s.id, slot.id, null)}
                      />
                    ))}
                  </div>
                  <div className="fields">
                    <Field label="FORMAT / MEDIUM" value={s.fields.format} preview={preview}
                      onChange={(v) => setField(s.id, "format", v)} />
                    <Field label="ONE-LINE PROJECT DESCRIPTION" value={s.fields.description}
                      preview={preview} onChange={(v) => setField(s.id, "description", v)} />
                  </div>
                </>
              ) : s.key === "contact" ? (
                <>
                  <div className="fields">
                    <Field label="CLOSING STATEMENT" value={s.fields.statement} textarea
                      preview={preview} onChange={(v) => setField(s.id, "statement", v)} />
                    <Field label="NAME" value={s.fields.name} preview={preview}
                      onChange={(v) => setField(s.id, "name", v)} />
                    <Field label="ROLE / DISCIPLINE" value={s.fields.role} preview={preview}
                      onChange={(v) => setField(s.id, "role", v)} />
                    <Field label="EMAIL" value={s.fields.email} preview={preview}
                      onChange={(v) => setField(s.id, "email", v)} />
                    <Field label="WEBSITE / PORTFOLIO" value={s.fields.website} preview={preview}
                      onChange={(v) => setField(s.id, "website", v)} />
                    <Field label="SOCIAL / LINKEDIN" value={s.fields.social} preview={preview}
                      onChange={(v) => setField(s.id, "social", v)} />
                  </div>
                  <div className="grid contact-qr" style={{ marginTop: 16 }}>
                    {s.slots.map((slot) => (
                      <Slot
                        key={slot.id} slot={slot} preview={preview} aspect="1 / 1"
                        onSet={(img) => setSlotImg(s.id, slot.id, img)}
                        onClear={() => setSlotImg(s.id, slot.id, null)}
                      />
                    ))}
                  </div>
                </>
              ) : (
                <div className={`grid ${s.grid}`}>
                  {s.slots.map((slot) => (
                    <Slot
                      key={slot.id} slot={slot} preview={preview} aspect={s.aspect}
                      onSet={(img) => setSlotImg(s.id, slot.id, img)}
                      onClear={() => setSlotImg(s.id, slot.id, null)}
                    />
                  ))}
                </div>
              )}

              <p className="hint">{s.hint}</p>
            </div>
          </section>
        ))}

        {/* ------- branding strip ------- */}
        <div className="brand">
          <span>BRANDED THROUGHOUT</span>
          {logo ? (
            <img
              className="logo" src={logo} alt="logo"
              title={preview ? "" : "Click to replace logo"}
              onClick={() => !preview && logoInput.current && logoInput.current.click()}
            />
          ) : (
            !preview && (
              <div
                className="slot logo-slot"
                onClick={() => logoInput.current && logoInput.current.click()}
              >
                <div className="empty"><span>PLACE YOUR OWN LOGO HERE</span></div>
              </div>
            )
          )}
          <input
            ref={logoInput} type="file" accept="image/*" hidden
            onChange={async (e) => {
              const f = e.target.files && e.target.files[0];
              if (f) setLogo(await readAsDataURL(f));
              e.target.value = "";
            }}
          />
        </div>
      </div>

      {exported && <div className="toast">EXPORTED — index.html / styles.css / script.js → DROP FOLDER ON NETLIFY</div>}
    </div>
  );
}
