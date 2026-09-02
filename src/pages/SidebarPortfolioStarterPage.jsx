import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import StepByStep from '../sidebar-portfolio-starter (2)/react/StepByStep.jsx';

export default function SidebarPortfolioStarterPage() {
  const [activeTab, setActiveTab] = useState('stepper'); // 'stepper' | 'preview' | 'code' | 'guide'

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Sidebar Portfolio Starter — Ryman Curriculum Planner';
  }, []);

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
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
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
          <span style={{
            fontFamily: 'var(--font-mono, monospace)',
            fontSize: '11px',
            color: '#8c3f3f',
            background: 'rgba(140, 63, 63, 0.08)',
            padding: '4px 10px',
            borderRadius: '12px',
            fontWeight: '700',
            letterSpacing: '0.04em'
          }}>
            HTML / CSS STARTER
          </span>
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
            margin: '0 auto 24px'
          }}>
            A clean, responsive one-page portfolio template featuring a sticky left-column navigation, nested project menus, and a flexible CSS grid gallery with span modifiers.
          </p>

          {/* Navigation Tabs */}
          <div style={{ display: 'inline-flex', background: 'rgba(255, 255, 255, 0.15)', padding: '4px', borderRadius: '8px', gap: '4px' }}>
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
              📖 Student Guide &amp; Code
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
