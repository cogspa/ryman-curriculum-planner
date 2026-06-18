import React, { useState, useEffect } from 'react';
import { useParams, Link, useSearchParams } from 'react-router-dom';
import { assignments } from './assignments.js';

export default function AssignmentPage() {
  const { week } = useParams();
  const rawData = assignments[Number(week)];
  const [searchParams, setSearchParams] = useSearchParams();
  const trackParam = searchParams.get('track');
  
  const [activeTrack, setActiveTrack] = useState(() => {
    try {
      if (trackParam && ['beginner', 'intermediate', 'advanced'].includes(trackParam)) {
        return trackParam;
      }
      return localStorage.getItem('cp-active-track') || 'intermediate';
    } catch {
      return 'intermediate';
    }
  });

  useEffect(() => {
    if (trackParam && ['beginner', 'intermediate', 'advanced'].includes(trackParam)) {
      setActiveTrack(trackParam);
    }
  }, [trackParam]);

  if (!rawData) {
    return (
      <div className="app">
        <div className="container">
          <div className="assignment-page">
            <Link to="/" className="back-link">← Back to Curriculum</Link>
            <h1 className="assignment-title">Assignment Not Found</h1>
            <p className="assignment-subtitle">No detailed assignment page exists for Week {week} yet.</p>
          </div>
        </div>
      </div>
    );
  }

  const isMultiTrack = !!rawData.tracks;
  const data = isMultiTrack ? (rawData.tracks[activeTrack] || rawData.tracks['intermediate']) : rawData;

  return (
    <div className="app">
      <div className="container">
        <div className="assignment-page">
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <Link to="/" className="back-link">← Back to Curriculum</Link>
            <span style={{ opacity: 0.3 }}>|</span>
            <Link to="/assignments" className="back-link">📂 Assignments Hub</Link>
          </div>

          {/* Quick links to other assignments */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '32px',
            marginTop: '12px',
            flexWrap: 'wrap',
            fontSize: '12px',
            fontFamily: 'var(--font-mono, monospace)',
            borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
            paddingBottom: '16px'
          }}>
            <span style={{ color: '#64748b', fontWeight: 'bold', marginRight: '6px' }}>All Assignments:</span>
            {[1, 3, 5, 7, 9, 10].map((wk) => {
              const isActive = Number(week) === wk;
              return (
                <Link
                  key={wk}
                  to={`/assignment/${wk}${activeTrack ? `?track=${activeTrack}` : ''}`}
                  style={{
                    textDecoration: 'none',
                    padding: '6px 12px',
                    borderRadius: '20px',
                    background: isActive ? 'rgba(0, 0, 0, 0.06)' : 'transparent',
                    color: isActive ? '#0f172a' : '#64748b',
                    fontWeight: isActive ? 'bold' : 'normal',
                    transition: 'all 0.15s ease',
                    border: '1px solid',
                    borderColor: isActive ? 'rgba(0, 0, 0, 0.15)' : 'transparent'
                  }}
                  className="assignment-nav-link"
                >
                  Week {wk}
                </Link>
              );
            })}
          </div>

          <div className="assignment-header">
            <p className="assignment-eyebrow">Week {String(week).padStart(2, '0')} · Assignment</p>
            <h1 className="assignment-title">{rawData.title}</h1>
            {rawData.subtitle && <p className="assignment-subtitle">{rawData.subtitle}</p>}
            {rawData.extraCredit && (
              <p className="assignment-extra-credit">⭐ {rawData.extraCredit}</p>
            )}
          </div>

          {/* Track Selector Tab Bar */}
          {isMultiTrack && (
            <div style={{
              display: 'flex',
              background: 'rgba(255, 255, 255, 0.45)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(0, 0, 0, 0.08)',
              borderRadius: '30px',
              padding: '6px',
              gap: '6px',
              marginBottom: '28px',
              maxWidth: 'fit-content'
            }}>
              {['beginner', 'intermediate', 'advanced'].map((track) => {
                const isActive = activeTrack === track;
                const labelMap = {
                  beginner: 'Base Assignment',
                  intermediate: 'Take It to the Next Level',
                  advanced: 'Advanced 3D Integration'
                };
                const colorMap = {
                  beginner: { activeBg: '#3b82f6', text: '#fff' },
                  intermediate: { activeBg: '#db2777', text: '#fff' },
                  advanced: { activeBg: '#0f766e', text: '#fff' }
                };
                const theme = colorMap[track];
                return (
                  <button
                    key={track}
                    onClick={() => {
                      setActiveTrack(track);
                      try { localStorage.setItem('cp-active-track', track); } catch(e) {}
                      setSearchParams({ track });
                    }}
                    style={{
                      border: 'none',
                      background: isActive ? theme.activeBg : 'transparent',
                      color: isActive ? theme.text : '#475569',
                      padding: '10px 20px',
                      borderRadius: '24px',
                      fontSize: '13px',
                      fontWeight: 'bold',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease-in-out',
                      boxShadow: isActive ? '0 4px 12px rgba(0, 0, 0, 0.1)' : 'none',
                      fontFamily: 'var(--font-sans, sans-serif)'
                    }}
                  >
                    {labelMap[track]}
                  </button>
                );
              })}
            </div>
          )}

          {/* Track Specific Header details */}
          {isMultiTrack && (
            <div style={{
              borderLeft: `4px solid ${activeTrack === 'beginner' ? '#3b82f6' : activeTrack === 'intermediate' ? '#db2777' : '#0f766e'}`,
              paddingLeft: '16px',
              marginBottom: '32px'
            }}>
              <h2 style={{ fontSize: '22px', margin: '0 0 6px 0', color: '#0f172a' }}>{data.title}</h2>
              {data.subtitle && <p style={{ fontSize: '14px', margin: 0, opacity: 0.8, fontStyle: 'italic' }}>{data.subtitle}</p>}
            </div>
          )}

          {/* Generic sections format (used by Week 1) */}
          {data.sections?.map((section, si) => (
            <section key={si} className="assignment-phase">
              <h2 className="phase-title">{section.heading}</h2>
              {section.body && <p className="phase-intro">{section.body}</p>}
              {section.subheading && <p className="phase-sub">{section.subheading}</p>}

              {section.imageUrl && (
                <div style={{ margin: '20px 0', textAlign: 'center' }}>
                  <img src={section.imageUrl} alt={section.imageCaption || section.heading} style={{ maxWidth: '100%', maxHeight: '420px', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.08)' }} />
                  {section.imageCaption && (
                    <p style={{ fontSize: '12px', color: '#64748b', marginTop: '6px', fontStyle: 'italic' }}>{section.imageCaption}</p>
                  )}
                </div>
              )}

              {section.bullets && (
                <ul className="phase-list phase-list--accent">
                  {section.bullets.map((b, i) => <li key={i}>{b}</li>)}
                </ul>
              )}

              {section.numberedSteps && (
                <ol className="phase-steps">
                  {section.numberedSteps.map((s, i) => <li key={i}>{s}</li>)}
                </ol>
              )}

              {section.note && <p className="phase-note">💡 {section.note}</p>}
            </section>
          ))}

          {/* Phases format (used by Week 2) */}
          {data.phases?.map((phase, pi) => (
            <section key={pi} className="assignment-phase">
              <h2 className="phase-title">
                {phase.name}
                {phase.points && <span className="phase-points-label"> ({phase.points} pts)</span>}
              </h2>
              {phase.intro && <p className="phase-intro">{phase.intro}</p>}

              {phase.imageUrl && (
                <div style={{ margin: '20px 0', textAlign: 'center' }}>
                  <img src={phase.imageUrl} alt={phase.imageCaption || phase.name} style={{ maxWidth: '100%', maxHeight: '420px', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.08)' }} />
                  {phase.imageCaption && (
                    <p style={{ fontSize: '12px', color: '#64748b', marginTop: '6px', fontStyle: 'italic' }}>{phase.imageCaption}</p>
                  )}
                </div>
              )}

              {phase.bullets && (
                <ul className="phase-list phase-list--accent">
                  {phase.bullets.map((b, i) => <li key={i}>{b}</li>)}
                </ul>
              )}

              {phase.sets && (
                <ul className="phase-list phase-list--accent">
                  {phase.sets.map((s, i) => (
                    <li key={i}><strong>{s.name}</strong> — {s.desc}</li>
                  ))}
                </ul>
              )}

              {phase.steps && (
                <>
                  <p className="phase-sub">To make each brush:</p>
                  <ol className="phase-steps">
                    {phase.steps.map((step, i) => (
                      <li key={i}>{step}</li>
                    ))}
                  </ol>
                </>
              )}

              {phase.note && <p className="phase-note">💡 {phase.note}</p>}

              {phase.simulationsTable && (
                <table className="grading-table" style={{ margin: '20px 0' }}>
                  <thead>
                    <tr>
                      <th style={{ width: '40px' }}>#</th>
                      <th style={{ width: '150px' }}>Medium</th>
                      <th>Approach</th>
                    </tr>
                  </thead>
                  <tbody>
                    {phase.simulationsTable.map((sim, i) => (
                      <tr key={i}>
                        <td><strong>{sim.num}</strong></td>
                        <td className="grading-criterion">{sim.medium}</td>
                        <td className="grading-desc">{sim.approach}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}

              {phase.subsections?.map((sub, i) => (
                <div key={i} className="phase-subsection" style={{ marginTop: '20px' }}>
                  <p className="phase-sub">{sub.title}:</p>
                  <ul className="phase-list">
                    {sub.bullets.map((b, j) => <li key={j}>{b}</li>)}
                  </ul>
                </div>
              ))}
            </section>
          ))}

          {/* Tools & Shortcuts Cheat sheet */}
          {data.shortcuts && (
            <section className="assignment-phase">
              <h2 className="phase-title">Tools & Shortcuts</h2>
              <table className="grading-table">
                <thead>
                  <tr>
                    <th style={{ width: '180px' }}>Shortcut</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {data.shortcuts.map((s, i) => (
                    <tr key={i}>
                      <td className="grading-criterion"><code style={{ background: 'rgba(0,0,0,0.05)', padding: '2px 6px', borderRadius: '3px', fontFamily: 'var(--font-mono)' }}>{s.key}</code></td>
                      <td className="grading-desc">{s.action}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
          )}

          {/* Workflow Tips */}
          {data.tips && (
            <section className="assignment-phase">
              <h2 className="phase-title">Workflow Tips</h2>
              <ul className="phase-list phase-list--accent">
                {data.tips.map((tip, i) => <li key={i}>{tip}</li>)}
              </ul>
            </section>
          )}

          {/* Submission */}
          {data.submission && (
            <section className="assignment-phase">
              <h2 className="phase-title">Submission</h2>
              <ol className="phase-steps">
                {data.submission.map((s, i) => <li key={i}>{s}</li>)}
              </ol>
            </section>
          )}

          {/* Discussion */}
          {data.discussion && (
            <section className="assignment-phase">
              <h2 className="phase-title">Discussion / Critique</h2>
              <p className="phase-intro">{data.discussion}</p>
            </section>
          )}

          {/* Critique Questions */}
          {data.critiqueQuestions && data.critiqueQuestions.length > 0 && (
            <section className="assignment-phase assignment-critique">
              <h2 className="phase-title">Critique Discussion Questions</h2>
              <p className="phase-intro">
                Reflect on these questions or bring them to your peer critique discussion once the assignment is completed:
              </p>
              <ul className="critique-list" style={{ paddingLeft: '20px', lineHeight: '1.7', fontSize: '15px' }}>
                {data.critiqueQuestions.map((q, i) => (
                  <li key={i} style={{ marginBottom: '10px' }}>{q}</li>
                ))}
              </ul>
            </section>
          )}

          <div className="assignment-footer" style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <Link to="/" className="back-link">← Back to Curriculum</Link>
            <span style={{ opacity: 0.3 }}>|</span>
            <Link to="/assignments" className="back-link">📂 Assignments Hub</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

