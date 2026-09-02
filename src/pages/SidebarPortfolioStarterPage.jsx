import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import StepByStep from '../sidebar-portfolio-starter (2)/react/StepByStep.jsx';

const FULL_HTML_CODE = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your Name — Visual Development</title>
  <!-- Two fonts: a script for the logo, a clean sans for everything else -->
  <link href="https://fonts.googleapis.com/css2?family=Pinyon+Script&family=Montserrat:wght@400;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="style.css">
</head>
<body>

  <!-- ===== 1. SIDEBAR (left column) ===== -->
  <aside class="sidebar">
    <a class="logo" href="index.html">Your Name</a>
    <a class="email" href="mailto:you@example.com">you@example.com</a>

    <!-- Nested list = nested menu. Indent the inner <ul> in your editor so you can see the levels. -->
    <nav class="nav">
      <ul>
        <li><a href="index.html">Home</a></li>
        <li><a href="#projects">Projects</a>
          <ul>
            <li><a href="#projects">Fallen sky</a></li>
            <li><a href="#projects">Beyond the tracks</a></li>
            <li><a href="#projects">Background art</a></li>
            <li><a href="#projects">Character design</a></li>
          </ul>
        </li>
        <li><a href="#professional">Professional works</a>
          <ul>
            <li><a href="#professional">Studio project one</a></li>
            <li><a href="#professional">Studio project two</a></li>
          </ul>
        </li>
        <li><a href="#personal">Personal works</a></li>
        <li><a href="#about">About / resume</a></li>
      </ul>
    </nav>
  </aside>

  <!-- ===== 2. MAIN (right column) ===== -->
  <main class="main">

    <!-- Title + social icons, both centered -->
    <header class="page-header">
      <h1>Visual development &amp; BG design</h1>
      <div class="social">
        <a href="https://instagram.com/yourhandle" aria-label="Instagram">
          <svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg>
        </a>
        <a href="https://linkedin.com/in/yourhandle" aria-label="LinkedIn">
          <svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M8 10v7M8 7v.5M12 17v-4a2 2 0 0 1 4 0v4M12 10v7"/></svg>
        </a>
        <a href="mailto:you@example.com" aria-label="Email">
          <svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg>
        </a>
      </div>
    </header>

    <!-- The image grid. Add class="wide" or class="tall" to change a tile's size. -->
    <section class="gallery" id="projects">
      <a class="tile wide" href="#"><img src="images/01.jpg" alt="Describe the artwork"></a>
      <a class="tile wide" href="#"><img src="images/02.jpg" alt="Describe the artwork"></a>

      <a class="tile wide" href="#"><img src="images/03.jpg" alt="Describe the artwork"></a>
      <a class="tile tall" href="#"><img src="images/04.jpg" alt="Describe the artwork"></a>
      <a class="tile"      href="#"><img src="images/05.jpg" alt="Describe the artwork"></a>

      <a class="tile" href="#"><img src="images/06.jpg" alt="Describe the artwork"></a>
      <a class="tile" href="#"><img src="images/07.jpg" alt="Describe the artwork"></a>
      <a class="tile" href="#"><img src="images/08.jpg" alt="Describe the artwork"></a>
    </section>

    <section class="text-block" id="about">
      <h2>About</h2>
      <p>Two or three sentences about you: where you study, what you like to paint, and what you are looking for.</p>
    </section>

  </main>

</body>
</html>`;

const FULL_CSS_CODE = `/* ==========================================================
   PORTFOLIO STARTER — sidebar layout
   Step 1: change the four variables in :root.
   Step 2: swap the images in /images.
   Step 3: edit the nav list in index.html.
   ========================================================== */

:root {
  --ink:          #1a1a1a;   /* body text */
  --brand:        #8c3f3f;   /* logo, headings, nav links */
  --brand-soft:   #d99a9a;   /* lighter version for sub-links and email */
  --paper:        #ffffff;   /* page background */
  --sidebar-width: 260px;
  --gap:          16px;      /* space between images */
  --font-body:    "Montserrat", Helvetica, Arial, sans-serif;
  --font-logo:    "Pinyon Script", "Brush Script MT", cursive;
}

/* ---------- Reset ---------- */
* { box-sizing: border-box; margin: 0; padding: 0; }
img { max-width: 100%; display: block; }
a { color: inherit; text-decoration: none; }
ul { list-style: none; }

body {
  font-family: var(--font-body);
  color: var(--ink);
  background: var(--paper);
  line-height: 1.5;

  /* THE LAYOUT: two columns. Sidebar is fixed width, main takes the rest. */
  display: grid;
  grid-template-columns: var(--sidebar-width) 1fr;
  min-height: 100vh;
}

/* ---------- 1. Sidebar ---------- */
.sidebar {
  padding: 40px 32px;
  position: sticky;   /* stays on screen while the gallery scrolls */
  top: 0;
  height: 100vh;
  overflow-y: auto;
}

.logo {
  font-family: var(--font-logo);
  font-size: 3rem;
  color: var(--brand);
  line-height: 1;
  display: block;
}

.email {
  display: block;
  color: var(--brand-soft);
  margin: 12px 0 28px;
  font-size: 0.95rem;
}

/* Top-level links */
.nav > ul > li > a {
  display: block;
  color: var(--brand);
  font-size: 1.05rem;
  padding: 6px 0;
}

/* Second-level links: smaller, lighter, indented a little */
.nav ul ul a {
  display: block;
  color: var(--brand-soft);
  font-size: 0.9rem;
  padding: 3px 0;
}

.nav a:hover { text-decoration: underline; }

/* ---------- 2. Main column ---------- */
.main { padding: 40px 0 80px; }

.page-header {
  text-align: center;
  margin-bottom: 48px;
}

h1 {
  font-size: 1.25rem;
  font-weight: 700;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  color: var(--brand);
}

.social {
  display: flex;
  justify-content: center;
  gap: 24px;
  margin-top: 40px;
}

.social svg {
  width: 24px;
  height: 24px;
  fill: none;
  stroke: var(--ink);
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
}

/* ---------- 3. Gallery grid ----------
   A 4-column grid. Every tile is 1 column wide and 1 row tall
   unless you give it .wide (2 columns) or .tall (2 rows). */
.gallery {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: 220px;
  grid-auto-flow: dense;     /* fills gaps so there are no holes */
  gap: var(--gap);
  padding: 0 var(--gap);
}

.tile img {
  width: 100%;
  height: 100%;
  object-fit: cover;         /* crop to fill the tile, never stretch */
}

.tile.wide { grid-column: span 2; }
.tile.tall { grid-row: span 2; }

/* ---------- 4. Text sections ---------- */
.text-block {
  max-width: 560px;
  padding: 64px var(--gap) 0;
}
.text-block h2 { color: var(--brand); margin-bottom: 12px; font-size: 1.1rem; }

/* ---------- Phones: one column, sidebar on top ---------- */
@media (max-width: 760px) {
  body { grid-template-columns: 1fr; }
  .sidebar { position: static; height: auto; padding: 24px; }
  .gallery { grid-template-columns: repeat(2, 1fr); grid-auto-rows: 160px; }
}`;

export default function SidebarPortfolioStarterPage() {
  const [activeTab, setActiveTab] = useState('stepper'); // 'stepper' | 'preview' | 'code' | 'guide'
  const [codeTab, setCodeTab] = useState('html'); // 'html' | 'css'
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Sidebar Portfolio Starter — Ryman Curriculum Planner';
  }, []);

  const handleDownload = (filename, content, mimeType) => {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="portfolio-starter-wrapper" style={{ minHeight: '100vh', background: '#faf6f6', color: '#1a1a1a' }}>
      {/* Sticky Header Nav */}
      <div style={{
        background: '#ffffff',
        borderBottom: '1px solid #e6dada',
        padding: '12px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'sticky',
        top: 0,
        zIndex: 99,
        boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
      }}>
        <Link 
          to="/#week-11" 
          style={{
            color: '#8c3f3f',
            textDecoration: 'none',
            fontFamily: 'var(--font-mono, monospace)',
            fontSize: '13px',
            fontWeight: '700',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          ← Back to Week 11
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
          <a
            href="/sidebar-portfolio-starter.zip"
            download="sidebar-portfolio-starter.zip"
            style={{
              background: '#8c3f3f',
              color: '#ffffff',
              padding: '6px 14px',
              borderRadius: '6px',
              fontSize: '12px',
              fontWeight: '700',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            📦 Download Starter (.ZIP)
          </a>
          <Link
            to="/week/11"
            style={{
              color: '#8c3f3f',
              textDecoration: 'none',
              fontFamily: 'var(--font-mono, monospace)',
              fontSize: '12px',
              fontWeight: '600'
            }}
          >
            Week 11 Overview
          </Link>
          <Link
            to="/portfolio-reference-gallery"
            style={{
              color: '#6e5f57',
              textDecoration: 'none',
              fontFamily: 'var(--font-mono, monospace)',
              fontSize: '12px',
              fontWeight: '600'
            }}
          >
            15 Artist Gallery
          </Link>
        </div>
      </div>

      {/* Hero Banner */}
      <header style={{
        background: 'linear-gradient(135deg, #8c3f3f 0%, #5d2525 100%)',
        color: '#ffffff',
        padding: '40px 24px 32px',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: 860, margin: '0 auto' }}>
          <div style={{
            display: 'inline-block',
            fontFamily: 'var(--font-mono, monospace)',
            fontSize: '11.5px',
            fontWeight: '700',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: '#f0c4c4',
            marginBottom: '8px'
          }}>
            Week 11 Portfolio Architecture Kit
          </div>
          <h1 style={{
            fontSize: '32px',
            fontWeight: '800',
            margin: '0 0 12px',
            fontFamily: "'Newsreader', Georgia, serif"
          }}>
            Sidebar Portfolio Starter &amp; Interactive Stepper
          </h1>
          <p style={{
            fontSize: '15px',
            lineHeight: '1.6',
            color: '#fbeeee',
            maxWidth: 680,
            margin: '0 auto 20px'
          }}>
            A clean, responsive one-page portfolio template featuring a sticky left-column navigation, nested project menus, and a flexible CSS grid gallery with span modifiers.
          </p>

          {/* Direct Download Action Row */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap', marginBottom: '24px' }}>
            <a
              href="/sidebar-portfolio-starter.zip"
              download="sidebar-portfolio-starter.zip"
              style={{
                background: '#ffffff',
                color: '#8c3f3f',
                padding: '10px 20px',
                borderRadius: '8px',
                fontSize: '13.5px',
                fontWeight: '800',
                textDecoration: 'none',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              📥 Download Complete Starter Package (.ZIP)
            </a>
            <button
              onClick={() => handleDownload('index.html', FULL_HTML_CODE, 'text/html')}
              style={{
                background: 'rgba(255, 255, 255, 0.15)',
                color: '#ffffff',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                padding: '10px 16px',
                borderRadius: '8px',
                fontSize: '13px',
                fontWeight: '700',
                cursor: 'pointer'
              }}
            >
              📄 Download index.html
            </button>
            <button
              onClick={() => handleDownload('style.css', FULL_CSS_CODE, 'text/css')}
              style={{
                background: 'rgba(255, 255, 255, 0.15)',
                color: '#ffffff',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                padding: '10px 16px',
                borderRadius: '8px',
                fontSize: '13px',
                fontWeight: '700',
                cursor: 'pointer'
              }}
            >
              🎨 Download style.css
            </button>
          </div>

          {/* Navigation Tabs */}
          <div style={{ display: 'inline-flex', background: 'rgba(255, 255, 255, 0.15)', padding: '4px', borderRadius: '8px', gap: '4px', flexWrap: 'wrap' }}>
            <button
              onClick={() => setActiveTab('stepper')}
              style={{
                background: activeTab === 'stepper' ? '#ffffff' : 'transparent',
                color: activeTab === 'stepper' ? '#8c3f3f' : '#ffffff',
                border: 'none',
                padding: '8px 18px',
                borderRadius: '6px',
                fontSize: '13px',
                fontWeight: '700',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              🪜 8-Step Interactive Stepper
            </button>
            <button
              onClick={() => setActiveTab('code')}
              style={{
                background: activeTab === 'code' ? '#ffffff' : 'transparent',
                color: activeTab === 'code' ? '#8c3f3f' : '#ffffff',
                border: 'none',
                padding: '8px 18px',
                borderRadius: '6px',
                fontSize: '13px',
                fontWeight: '700',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              💻 Full Source Code
            </button>
            <button
              onClick={() => setActiveTab('preview')}
              style={{
                background: activeTab === 'preview' ? '#ffffff' : 'transparent',
                color: activeTab === 'preview' ? '#8c3f3f' : '#ffffff',
                border: 'none',
                padding: '8px 18px',
                borderRadius: '6px',
                fontSize: '13px',
                fontWeight: '700',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              🖥️ Live Template Preview
            </button>
            <button
              onClick={() => setActiveTab('guide')}
              style={{
                background: activeTab === 'guide' ? '#ffffff' : 'transparent',
                color: activeTab === 'guide' ? '#8c3f3f' : '#ffffff',
                border: 'none',
                padding: '8px 18px',
                borderRadius: '6px',
                fontSize: '13px',
                fontWeight: '700',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              📖 Student Guide
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main style={{ maxWidth: 1000, margin: '32px auto', padding: '0 20px 60px' }}>
        {activeTab === 'stepper' && (
          <div style={{
            background: '#ffffff',
            border: '1px solid #e6dada',
            borderRadius: '12px',
            padding: '32px 24px',
            boxShadow: '0 4px 16px rgba(140, 63, 63, 0.05)'
          }}>
            <StepByStep />
          </div>
        )}

        {activeTab === 'code' && (
          <div style={{
            background: '#ffffff',
            border: '1px solid #e6dada',
            borderRadius: '12px',
            padding: '28px',
            boxShadow: '0 4px 16px rgba(140, 63, 63, 0.05)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px', flexWrap: 'wrap', gap: '10px' }}>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  onClick={() => setCodeTab('html')}
                  style={{
                    background: codeTab === 'html' ? '#8c3f3f' : '#f5e5e5',
                    color: codeTab === 'html' ? '#ffffff' : '#8c3f3f',
                    border: 'none',
                    padding: '8px 16px',
                    borderRadius: '6px',
                    fontSize: '13px',
                    fontWeight: '700',
                    cursor: 'pointer'
                  }}
                >
                  📄 index.html
                </button>
                <button
                  onClick={() => setCodeTab('css')}
                  style={{
                    background: codeTab === 'css' ? '#8c3f3f' : '#f5e5e5',
                    color: codeTab === 'css' ? '#ffffff' : '#8c3f3f',
                    border: 'none',
                    padding: '8px 16px',
                    borderRadius: '6px',
                    fontSize: '13px',
                    fontWeight: '700',
                    cursor: 'pointer'
                  }}
                >
                  🎨 style.css
                </button>
              </div>

              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  onClick={() => handleCopy(codeTab === 'html' ? FULL_HTML_CODE : FULL_CSS_CODE)}
                  style={{
                    background: copied ? '#10b981' : '#1a1a1a',
                    color: '#ffffff',
                    border: 'none',
                    padding: '8px 16px',
                    borderRadius: '6px',
                    fontSize: '12.5px',
                    fontWeight: '700',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  {copied ? '✓ Copied to Clipboard!' : '📋 Copy Code'}
                </button>
                <button
                  onClick={() => handleDownload(codeTab === 'html' ? 'index.html' : 'style.css', codeTab === 'html' ? FULL_HTML_CODE : FULL_CSS_CODE, codeTab === 'html' ? 'text/html' : 'text/css')}
                  style={{
                    background: '#8c3f3f',
                    color: '#ffffff',
                    border: 'none',
                    padding: '8px 16px',
                    borderRadius: '6px',
                    fontSize: '12.5px',
                    fontWeight: '700',
                    cursor: 'pointer'
                  }}
                >
                  💾 Download File
                </button>
              </div>
            </div>

            <pre style={{
              background: '#1a1a1a',
              color: '#f8f8f2',
              border: '1px solid #333',
              borderRadius: '8px',
              padding: '20px',
              fontSize: '13px',
              lineHeight: '1.55',
              overflowX: 'auto',
              maxHeight: '600px',
              fontFamily: 'Consolas, Monaco, "Courier New", monospace'
            }}>
              <code>{codeTab === 'html' ? FULL_HTML_CODE : FULL_CSS_CODE}</code>
            </pre>
          </div>
        )}

        {activeTab === 'preview' && (
          <div style={{
            background: '#ffffff',
            border: '1px solid #e6dada',
            borderRadius: '12px',
            padding: '24px',
            boxShadow: '0 4px 16px rgba(140, 63, 63, 0.05)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <span style={{ fontFamily: 'var(--font-mono, monospace)', fontSize: '12px', color: '#6d655c' }}>
                LIVE PREVIEW (Rendered HTML/CSS Layout)
              </span>
              <span style={{ fontSize: '12px', color: '#8c3f3f', fontWeight: '600' }}>
                Desktop (2 Columns: 260px + 1fr)
              </span>
            </div>
            {/* Live Template Wireframe Preview */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '240px 1fr',
              minHeight: '520px',
              border: '2px solid #8c3f3f',
              borderRadius: '8px',
              overflow: 'hidden',
              background: '#fff'
            }}>
              {/* Sidebar */}
              <aside style={{
                background: '#faf6f6',
                borderRight: '1px solid #e6dada',
                padding: '24px 20px',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px'
              }}>
                <div>
                  <div style={{ fontFamily: "'Pinyon Script', cursive, serif", fontSize: '32px', color: '#8c3f3f', lineHeight: '1.2' }}>
                    Your Name
                  </div>
                  <div style={{ fontSize: '11px', color: '#8c3f3f', fontFamily: 'monospace', marginTop: '2px' }}>
                    you@example.com
                  </div>
                </div>

                <nav style={{ marginTop: '12px' }}>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px' }}>
                    <li><strong style={{ color: '#8c3f3f' }}>Home</strong></li>
                    <li>
                      <strong style={{ color: '#8c3f3f' }}>Projects</strong>
                      <ul style={{ listStyle: 'none', paddingLeft: '12px', margin: '4px 0 0', display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '12px', color: '#d99a9a' }}>
                        <li>Fallen sky</li>
                        <li>Beyond the tracks</li>
                        <li>Background art</li>
                        <li>Character design</li>
                      </ul>
                    </li>
                    <li>
                      <strong style={{ color: '#8c3f3f' }}>Professional works</strong>
                      <ul style={{ listStyle: 'none', paddingLeft: '12px', margin: '4px 0 0', display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '12px', color: '#d99a9a' }}>
                        <li>Studio project one</li>
                        <li>Studio project two</li>
                      </ul>
                    </li>
                    <li><strong style={{ color: '#8c3f3f' }}>Personal works</strong></li>
                    <li><strong style={{ color: '#8c3f3f' }}>About / resume</strong></li>
                  </ul>
                </nav>
              </aside>

              {/* Main Area */}
              <div style={{ padding: '24px 28px', overflowY: 'auto' }}>
                <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                  <h2 style={{
                    fontSize: '16px',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: '#8c3f3f',
                    margin: '0 0 8px',
                    fontWeight: '700'
                  }}>
                    VISUAL DEVELOPMENT &amp; BG DESIGN
                  </h2>
                  <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', fontSize: '12px', color: '#8c3f3f', fontFamily: 'monospace' }}>
                    <span>Instagram</span>
                    <span>·</span>
                    <span>LinkedIn</span>
                    <span>·</span>
                    <span>Email</span>
                  </div>
                </div>

                {/* Grid Gallery */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(4, 1fr)',
                  gridAutoRows: '90px',
                  gridAutoFlow: 'dense',
                  gap: '10px'
                }}>
                  <div style={{ gridColumn: 'span 2', background: '#f5e5e5', border: '1px solid #d99a9a', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', color: '#8c3f3f', fontWeight: '600' }}>
                    Hero Landscape (Span 2)
                  </div>
                  <div style={{ background: '#f5e5e5', border: '1px solid #d99a9a', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', color: '#8c3f3f' }}>
                    Prop 01
                  </div>
                  <div style={{ gridRow: 'span 2', background: '#f5e5e5', border: '1px solid #d99a9a', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', color: '#8c3f3f', textAlign: 'center', padding: '4px' }}>
                    Vertical Character (Tall Span 2)
                  </div>
                  <div style={{ background: '#f5e5e5', border: '1px solid #d99a9a', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', color: '#8c3f3f' }}>
                    Thumbnail
                  </div>
                  <div style={{ gridColumn: 'span 2', background: '#f5e5e5', border: '1px solid #d99a9a', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', color: '#8c3f3f', fontWeight: '600' }}>
                    Environment Painting (Span 2)
                  </div>
                  <div style={{ background: '#f5e5e5', border: '1px solid #d99a9a', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', color: '#8c3f3f' }}>
                    Process Sketch
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'guide' && (
          <div style={{
            background: '#ffffff',
            border: '1px solid #e6dada',
            borderRadius: '12px',
            padding: '32px 28px',
            boxShadow: '0 4px 16px rgba(140, 63, 63, 0.05)'
          }}>
            <h2 style={{ fontSize: '22px', fontWeight: '800', color: '#8c3f3f', margin: '0 0 12px' }}>
              10-Minute Starter Instructions
            </h2>
            <ol style={{ paddingLeft: '20px', lineHeight: '1.7', fontSize: '14.5px', color: '#333' }}>
              <li>
                <strong>Configure Brand CSS Variables:</strong> Change the four variables at the top of <code>style.css</code>:
                <pre style={{ background: '#faf6f6', border: '1px solid #e6dada', padding: '10px 14px', borderRadius: '6px', fontSize: '12.5px', margin: '8px 0' }}>
{`:root {
  --brand: #8c3f3f;        /* your main accent color */
  --brand-soft: #d99a9a;   /* lighter tint for sub-menus & borders */
  --sidebar-width: 260px;  /* sidebar width on desktop */
  --font-logo: "Pinyon Script", cursive;
}`}
                </pre>
              </li>
              <li>
                <strong>Drop in Your Artwork:</strong> Place 8 exported JPEGs/PNGs into <code>images/</code> (named <code>01.jpg</code> ... <code>08.jpg</code>).
              </li>
              <li>
                <strong>Update HTML Info:</strong> In <code>index.html</code>, edit "Your Name", your contact email, and the specific project title links in the <code>&lt;nav&gt;</code> menu.
              </li>
              <li>
                <strong>Span Modifier Classes:</strong> Make hero artworks wider with <code>class="tile wide"</code> (spans 2 columns) or vertical character lineups taller with <code>class="tile tall"</code> (spans 2 rows).
              </li>
            </ol>

            <div style={{ marginTop: '24px', padding: '16px 20px', background: 'rgba(140, 63, 63, 0.06)', borderRadius: '8px', borderLeft: '4px solid #8c3f3f' }}>
              <h4 style={{ margin: '0 0 6px', color: '#8c3f3f', fontSize: '14px', fontWeight: '700' }}>
                Key CSS Techniques Learned:
              </h4>
              <ul style={{ margin: 0, paddingLeft: '18px', fontSize: '13.5px', color: '#444', lineHeight: '1.6' }}>
                <li><code>display: grid</code> for 2-column macro layout and 4-column adaptive gallery</li>
                <li><code>position: sticky; top: 0; height: 100vh;</code> for pinned left navigation</li>
                <li><code>object-fit: cover</code> to keep artworks cleanly cropped without warping</li>
                <li><code>@media (max-width: 760px)</code> for seamless single-column mobile stacking</li>
              </ul>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
