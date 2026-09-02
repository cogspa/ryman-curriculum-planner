import { useState } from "react";

/*
  StepByStep.jsx
  Walks a beginner through building the sidebar-portfolio template.
  Each step shows: a wireframe that grows as you go, a short "why",
  and the exact code for that step. No dependencies.
*/

const BRAND = "#8c3f3f";
const SOFT = "#d99a9a";
const LINE = "#c9b3b3";
const TILE = "#e6dada";
const TEXT = "#1a1a1a";

/* ---------- Progressive wireframe ---------- */
function Wire({ step, brand = BRAND, soft = SOFT }) {
  const showColumns = step >= 1;
  const showSidebar = step >= 2;
  const styled = step >= 3;
  const showHeader = step >= 4;
  const showGallery = step >= 5;
  const phone = step === 6;
  const custom = step >= 7;

  const topColor = styled ? brand : TEXT;
  const subColor = styled ? soft : LINE;

  // Desktop frame: 360 x 240. Sidebar 0-90, main 100-360.
  const sbW = showColumns ? 90 : 170;
  const mainX = showColumns ? 100 : 190;
  const mainW = showColumns ? 250 : 160;

  const Tiles = ({ x, w, cols, rowH, gap = 6 }) => {
    const cw = (w - gap * (cols - 1)) / cols;
    const plan = cols === 4
      ? [[0,0,2,1],[2,0,2,1],[0,1,2,1],[2,1,1,2],[3,1,1,1],[0,2,1,1],[1,2,1,1],[3,2,1,1]]
      : [[0,0,2,1],[0,1,1,1],[1,1,1,1],[0,2,1,1],[1,2,1,1]];
    return plan.map(([c, r, cs, rs], n) => (
      <rect key={n} x={x + c * (cw + gap)} y={r * (rowH + gap)} width={cw * cs + gap * (cs - 1)}
        height={rowH * rs + gap * (rs - 1)} fill={custom ? soft : TILE} stroke={custom ? brand : LINE} strokeWidth="0.5" />
    ));
  };

  if (phone) {
    // Show a narrow phone next to the desktop to explain the media query
    return (
      <svg viewBox="0 0 360 240" width="100%" style={{ display: "block" }}>
        <g>
          <rect x="0" y="0" width="230" height="240" fill="none" stroke={LINE} strokeDasharray="4 3" strokeWidth="0.5" />
          <text x="115" y="234" fontSize="8" fill={SOFT} textAnchor="middle">desktop: two columns</text>
          <rect x="0" y="0" width="60" height="240" fill="#faf6f6" />
          <text x="8" y="20" fontSize="12" fontFamily="cursive" fill={brand}>Name</text>
          {[0,1,2,3].map(n => <rect key={n} x="8" y={34 + n * 12} width="36" height="4" fill={n===0?brand:soft} />)}
          <rect x="90" y="14" width="120" height="6" fill={brand} />
          <g transform="translate(70,40)"><Tiles x={0} w={150} cols={4} rowH={40} /></g>
        </g>
        <g>
          <rect x="260" y="0" width="90" height="240" rx="8" fill="none" stroke={TEXT} strokeWidth="1" />
          <text x="305" y="234" fontSize="8" fill={SOFT} textAnchor="middle">phone: one column</text>
          <rect x="266" y="8" width="78" height="52" fill="#faf6f6" />
          <text x="272" y="24" fontSize="10" fontFamily="cursive" fill={brand}>Name</text>
          {[0,1,2].map(n => <rect key={n} x="272" y={32 + n * 8} width="30" height="3" fill={n===0?brand:soft} />)}
          <rect x="285" y="68" width="40" height="4" fill={brand} />
          <g transform="translate(266,80)"><Tiles x={0} w={78} cols={2} rowH={38} gap={4} /></g>
        </g>
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 360 240" width="100%" style={{ display: "block" }}>
      {/* page outline */}
      <rect x="0.5" y="0.5" width="359" height="239" fill="none" stroke={LINE} strokeDasharray="4 3" strokeWidth="0.5" />

      {/* sidebar */}
      <rect x="0" y="0" width={sbW} height="240"
        fill={showColumns ? "#faf6f6" : "none"} stroke={showColumns ? "none" : LINE} strokeDasharray={showColumns ? "" : "4 3"} strokeWidth="0.5" />
      {!showColumns && <text x={sbW / 2} y="124" fontSize="9" fill={SOFT} textAnchor="middle">aside.sidebar</text>}
      {showColumns && !showSidebar && <text x={sbW / 2} y="124" fontSize="9" fill={SOFT} textAnchor="middle">260px</text>}

      {showSidebar && (
        <g>
          <text x="8" y="24" fontSize="16" fontFamily="cursive" fill={styled ? brand : TEXT}>Name</text>
          <rect x="8" y="30" width="56" height="3" fill={subColor} />
          {/* nav: top links + sub links */}
          {[
            ["Home", 0], ["Projects", 1], ["", 2], ["", 2], ["", 2],
            ["Pro works", 1], ["", 2], ["Personal", 1], ["About", 1],
          ].map(([label, lvl], n) => {
            const y = 52 + n * 14;
            return lvl === 2
              ? <rect key={n} x="14" y={y - 3} width="40" height="3" fill={subColor} />
              : <text key={n} x="8" y={y} fontSize="8" fontWeight="600" fill={topColor}>{label}</text>;
          })}
          {styled && <text x="8" y="230" fontSize="7" fill={soft}>sticky</text>}
        </g>
      )}

      {/* main */}
      <rect x={mainX} y="0" width={mainW} height="240"
        fill="none" stroke={showColumns ? "none" : LINE} strokeDasharray="4 3" strokeWidth="0.5" />
      {!showColumns && <text x={mainX + mainW / 2} y="124" fontSize="9" fill={SOFT} textAnchor="middle">main.main</text>}
      {showColumns && !showHeader && <text x={mainX + mainW / 2} y="124" fontSize="9" fill={SOFT} textAnchor="middle">1fr</text>}

      {showHeader && (
        <g>
          <text x={mainX + mainW / 2} y="22" fontSize="8" fontWeight="700" fill={brand} textAnchor="middle" letterSpacing="0.5">VISUAL DEVELOPMENT &amp; BG DESIGN</text>
          {[-16, 0, 16].map(dx => <rect key={dx} x={mainX + mainW / 2 + dx - 4} y="34" width="8" height="8" rx="2" fill="none" stroke={TEXT} strokeWidth="1" />)}
        </g>
      )}

      {showGallery && (
        <g transform={`translate(${mainX + 6},54)`}>
          <Tiles x={0} w={mainW - 12} cols={4} rowH={54} />
        </g>
      )}
      {showHeader && !showGallery && <text x={mainX + mainW / 2} y="140" fontSize="9" fill={SOFT} textAnchor="middle">section.gallery</text>}
    </svg>
  );
}

/* ---------- Steps ---------- */
const STEPS = [
  {
    title: "Make the skeleton",
    why: "Every page starts with the same shell. The body holds exactly two things: a sidebar and a main area. Right now they are just empty boxes.",
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your Name</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <aside class="sidebar"></aside>
  <main class="main"></main>
</body>
</html>`,
  },
  {
    title: "Split the page into two columns",
    why: "One CSS rule does the whole layout. The sidebar gets a fixed width, main gets whatever is left (1fr).",
    code: `body {
  display: grid;
  grid-template-columns: 260px 1fr;
  min-height: 100vh;
}`,
  },
  {
    title: "Fill the sidebar",
    why: "Logo, email, then a nested list. An inner <ul> inside an <li> is how you make a sub-menu. No styling yet, so everything is black.",
    code: `<aside class="sidebar">
  <a class="logo" href="index.html">Your Name</a>
  <a class="email" href="mailto:you@example.com">you@example.com</a>
  <nav class="nav">
    <ul>
      <li><a href="#">Home</a></li>
      <li><a href="#">Projects</a>
        <ul>
          <li><a href="#">Project one</a></li>
          <li><a href="#">Project two</a></li>
        </ul>
      </li>
      <li><a href="#">About / resume</a></li>
    </ul>
  </nav>
</aside>`,
  },
  {
    title: "Style the two nav levels",
    why: "The > selector means direct child only, so top links and sub-links get different colors and sizes. position: sticky keeps the sidebar on screen.",
    code: `.logo { font-family: "Pinyon Script", cursive; color: #8c3f3f; font-size: 3rem; }
.nav > ul > li > a { color: #8c3f3f; font-size: 1.05rem; }
.nav ul ul a       { color: #d99a9a; font-size: 0.9rem; }
.sidebar { position: sticky; top: 0; height: 100vh; }`,
  },
  {
    title: "Center the title and icons",
    why: "text-align centers the heading. Flexbox with justify-content centers the row of icons.",
    code: `<header class="page-header">
  <h1>Visual development &amp; BG design</h1>
  <div class="social">
    <a href="#">Instagram</a> <a href="#">LinkedIn</a> <a href="#">Email</a>
  </div>
</header>

.page-header { text-align: center; }
h1 { text-transform: uppercase; color: #8c3f3f; font-size: 1.25rem; }
.social { display: flex; justify-content: center; gap: 24px; }`,
  },
  {
    title: "Build the image grid",
    why: "A 4-column grid with a fixed row height. Tiles are 1x1 unless you add .wide or .tall. object-fit: cover crops instead of stretching.",
    code: `<section class="gallery">
  <a class="tile wide"><img src="images/01.jpg" alt=""></a>
  <a class="tile tall"><img src="images/02.jpg" alt=""></a>
  <a class="tile"><img src="images/03.jpg" alt=""></a>
</section>

.gallery {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: 220px;
  grid-auto-flow: dense;
  gap: 16px;
}
.tile img { width: 100%; height: 100%; object-fit: cover; }
.tile.wide { grid-column: span 2; }
.tile.tall { grid-row: span 2; }`,
  },
  {
    title: "Make it work on phones",
    why: "Below 760px, collapse to one column so the sidebar sits on top and the gallery becomes two columns.",
    code: `@media (max-width: 760px) {
  body { grid-template-columns: 1fr; }
  .sidebar { position: static; height: auto; }
  .gallery { grid-template-columns: repeat(2, 1fr); grid-auto-rows: 160px; }
}`,
  },
  {
    title: "Make it yours",
    why: "Change the variables at the top of style.css, replace the images, and rename the nav links. Try the color picker below to see the variables at work.",
    code: `:root {
  --brand: #8c3f3f;        /* your main color */
  --brand-soft: #d99a9a;   /* lighter version */
  --sidebar-width: 260px;
  --font-logo: "Pinyon Script", cursive;
}`,
  },
];

/* ---------- Component ---------- */
export default function StepByStep() {
  const [i, setI] = useState(0);
  const [brand, setBrand] = useState(BRAND);
  const step = STEPS[i];
  const last = STEPS.length - 1;
  const soft = lighten(brand);

  return (
    <div style={{ fontFamily: "Montserrat, Helvetica, Arial, sans-serif", maxWidth: 760, margin: "0 auto", padding: 24, color: TEXT }}>
      <div style={{ display: "flex", gap: 6, marginBottom: 20 }}>
        {STEPS.map((s, n) => (
          <button key={s.title} onClick={() => setI(n)} aria-label={`Step ${n + 1}`}
            style={{ flex: 1, height: 6, border: 0, padding: 0, cursor: "pointer", background: n <= i ? BRAND : TILE }} />
        ))}
      </div>

      <p style={{ fontSize: 13, color: BRAND, marginBottom: 4 }}>Step {i + 1} of {STEPS.length}</p>
      <h2 style={{ fontSize: 22, fontWeight: 600, margin: "0 0 8px" }}>{step.title}</h2>
      <p style={{ lineHeight: 1.6, marginBottom: 16 }}>{step.why}</p>

      <div style={{ border: `1px solid ${TILE}`, padding: 12, marginBottom: 16, background: "#fff" }}>
        <Wire step={i} brand={brand} soft={soft} />
      </div>

      {i === last && (
        <label style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13, marginBottom: 16 }}>
          --brand
          <input type="color" value={brand} onChange={e => setBrand(e.target.value)} />
          <span style={{ color: SOFT }}>--brand-soft is calculated for you: {soft}</span>
        </label>
      )}

      <pre style={{ background: "#faf6f6", border: `1px solid ${TILE}`, padding: 16, fontSize: 13, lineHeight: 1.5, overflowX: "auto", whiteSpace: "pre" }}>
        <code>{step.code}</code>
      </pre>

      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 16 }}>
        <button onClick={() => setI(Math.max(0, i - 1))} disabled={i === 0} style={btn(i === 0)}>Back</button>
        <button onClick={() => setI(Math.min(last, i + 1))} disabled={i === last} style={btn(i === last)}>
          {i === last ? "Done" : "Next step"}
        </button>
      </div>
    </div>
  );
}

function btn(disabled) {
  return {
    padding: "10px 18px", border: `1px solid ${BRAND}`, background: disabled ? "#fff" : BRAND,
    color: disabled ? LINE : "#fff", cursor: disabled ? "default" : "pointer", fontSize: 14,
  };
}

/* Mix a hex color 55% toward white */
function lighten(hex) {
  const n = parseInt(hex.slice(1), 16);
  const mix = c => Math.round(c + (255 - c) * 0.55).toString(16).padStart(2, "0");
  return `#${mix(n >> 16)}${mix((n >> 8) & 255)}${mix(n & 255)}`;
}
