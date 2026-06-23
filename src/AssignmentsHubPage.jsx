import React from 'react';
import { Link } from 'react-router-dom';
import { assignments } from './assignments.js';
import { isWeekReleased, getActiveRole } from './releaseUtils.js';
import LegalDisclaimer from './LegalDisclaimer.jsx';

export default function AssignmentsHubPage() {
  const role = getActiveRole();
  const gradedWeeks = [1, 3, 5, 7, 9, 10].filter((wk) => {
    return role === 'admin' || isWeekReleased(wk);
  });

  return (
    <div className="app">
      <div className="container">
        <div className="assignments-page" style={{ padding: '32px 0 60px 0' }}>
          
          <div className="syllabus-topbar no-print">
            <Link to="/" className="back-link">← Back to Curriculum</Link>
          </div>

          <header className="syllabus-header" style={{ marginBottom: '40px', borderBottom: '1px solid rgba(0, 0, 0, 0.1)', paddingBottom: '32px' }}>
            <img 
              src="https://images.squarespace-cdn.com/content/v1/67806c279fb734295979b37e/9e044490-3bd2-4589-a460-cbabd7c93b35/Ryman_Arts_Logo_No_Tagline.png" 
              alt="Ryman Arts Logo" 
              style={{ height: '48px', marginBottom: '16px', display: 'block' }} 
            />
            <p className="syllabus-eyebrow">Reveal Saturday Studios · 6 Graded Milestones</p>
            <h1 className="syllabus-title" style={{ fontSize: '38px', letterSpacing: '-0.02em', marginBottom: '16px' }}>
              Saturday Assignments Hub
            </h1>
            <p className="syllabus-sub-title" style={{ fontSize: '18px', margin: '0 0 24px 0', color: '#475569' }}>
              A Unified Worldbuilding IP Portfolio Staging System
            </p>
          </header>

          {/* Methodology Section */}
          <section className="assignment-phase" style={{ 
            background: 'rgba(255, 255, 255, 0.55)', 
            backdropFilter: 'blur(10px)', 
            border: '1px solid rgba(0, 0, 0, 0.08)', 
            borderRadius: '12px', 
            padding: '28px', 
            marginBottom: '40px' 
          }}>
            <h2 className="phase-title" style={{ fontSize: '20px', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <span>💡</span> Saturday Portfolio Methodology & Vision
            </h2>
            <p className="phase-intro" style={{ fontSize: '14px', lineHeight: '1.6', color: '#334155', marginBottom: '16px' }}>
              Unlike disconnected weekly drills, the Saturday Studio assignments are designed to work simultaneously under a unified **Worldbuilding IP (Intellectual Property)**. You will plant a single "creative seed" in Week 1 (a character or signature item) and grow it through all six milestones to build a cohesive, presentation-ready visual development portfolio.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', marginTop: '20px' }}>
              <div style={{ borderLeft: '3px solid #3b82f6', paddingLeft: '14px' }}>
                <h4 style={{ fontSize: '13px', fontWeight: 'bold', color: '#1d4ed8', margin: '0 0 6px 0' }}>1. Personal Adaptability</h4>
                <p style={{ fontSize: '12.5px', color: '#475569', margin: 0, lineHeight: '1.5' }}>
                  Choose the track that fits your skill set and goals. Switch tracks or mix-and-match as your tools and project needs evolve.
                </p>
              </div>
              <div style={{ borderLeft: '3px solid #db2777', paddingLeft: '14px' }}>
                <h4 style={{ fontSize: '13px', fontWeight: 'bold', color: '#be185d', margin: '0 0 6px 0' }}>2. Style Versatility</h4>
                <p style={{ fontSize: '12.5px', color: '#475569', margin: 0, lineHeight: '1.5' }}>
                  Explore how a single concept adapts to different styles—from bold flat graphics to layered visual dev painterly finishes.
                </p>
              </div>
              <div style={{ borderLeft: '3px solid #0f766e', paddingLeft: '14px' }}>
                <h4 style={{ fontSize: '13px', fontWeight: 'bold', color: '#0d9488', margin: '0 0 6px 0' }}>3. 3D-to-2D Integration</h4>
                <p style={{ fontSize: '12.5px', color: '#475569', margin: 0, lineHeight: '1.5' }}>
                  Leverage Blender 3D modeling, camera blocking, Grease Pencil, and node setups to unlock industrial concept art pipelines.
                </p>
              </div>
            </div>
          </section>

          {/* Graded Assignments 6-Panel Grid */}
          <div className="hub-grid" style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', 
            gap: '24px' 
          }}>
            {gradedWeeks.map((wk) => {
              const info = assignments[wk];
              if (!info) return null;
              
              return (
                <Link 
                  key={wk}
                  to={`/assignment/${wk}`}
                  className="hub-card-link"
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  <div className="hub-card" style={{
                    background: 'rgba(255, 255, 255, 0.45)',
                    backdropFilter: 'blur(8px)',
                    border: '1px solid rgba(0, 0, 0, 0.08)',
                    borderRadius: '12px',
                    padding: '24px',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'all 0.2s ease-in-out',
                    cursor: 'pointer',
                    position: 'relative',
                    overflow: 'hidden'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
                      <span className="hub-card-week-badge" style={{
                        fontFamily: 'var(--font-mono, monospace)',
                        fontSize: '10px',
                        fontWeight: 'bold',
                        letterSpacing: '0.05em',
                        background: 'rgba(0,0,0,0.06)',
                        padding: '4px 10px',
                        borderRadius: '20px',
                        color: '#475569'
                      }}>
                        WEEK {String(wk).padStart(2, '0')}
                      </span>
                    </div>

                    <h3 style={{ fontSize: '18px', fontWeight: 'bold', margin: '0 0 6px 0', color: '#0f172a' }}>
                      {info.title.replace(/^Assignment \d+:\s*/i, '')}
                    </h3>
                    <p style={{ fontSize: '13px', margin: '0 0 20px 0', color: '#64748b', fontStyle: 'italic', lineHeight: '1.4' }}>
                      {info.subtitle}
                    </p>

                    <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '8px', borderTop: '1px solid rgba(0,0,0,0.05)', paddingTop: '16px' }}>
                      <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                        <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#3b82f6' }}></span>
                        <span style={{ fontSize: '11.5px', color: '#475569' }}>
                          <strong>Base:</strong> {info.tracks?.beginner?.title?.replace(/^Base Assignment:\s*/i, '') || 'Digital Art Foundations'}
                        </span>
                      </div>
                      <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                        <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#db2777' }}></span>
                        <span style={{ fontSize: '11.5px', color: '#475569' }}>
                          <strong>Next Level:</strong> {info.tracks?.intermediate?.title?.replace(/^Take It to the Next Level:\s*/i, '') || 'Portfolio Scaling'}
                        </span>
                      </div>
                      <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                        <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#0f766e' }}></span>
                        <span style={{ fontSize: '11.5px', color: '#475569' }}>
                          <strong>Advanced:</strong> {info.tracks?.advanced?.title?.replace(/^Advanced Integration:\s*/i, '')?.replace(/^Advanced 3D Integration:\s*/i, '') || 'Blender Concept Pipeline'}
                        </span>
                      </div>
                    </div>

                    <div className="hub-card-arrow" style={{
                      position: 'absolute',
                      bottom: '24px',
                      right: '24px',
                      fontSize: '16px',
                      color: '#94a3b8',
                      transition: 'transform 0.2s ease',
                      opacity: 0
                    }}>
                      →
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="assignment-footer" style={{ marginTop: '48px' }}>
            <Link to="/" className="back-link">← Back to Curriculum</Link>
          </div>
          <LegalDisclaimer style={{ borderTop: 'none', paddingTop: 0 }} />

        </div>
      </div>
    </div>
  );
}
