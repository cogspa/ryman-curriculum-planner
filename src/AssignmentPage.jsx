import React, { useState, useEffect } from 'react';
import { useParams, Link, useSearchParams } from 'react-router-dom';
import { assignments } from './assignments.js';
import { isWeekReleased, getActiveRole } from './releaseUtils.js';
import LegalDisclaimer from './LegalDisclaimer.jsx';

function parseMarkdownLinks(text) {
  if (typeof text !== 'string') return text;
  const linkRegex = /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g;
  if (!linkRegex.test(text)) return text;
  
  const parts = [];
  let lastIndex = 0;
  let match;
  
  // Reset regex state
  linkRegex.lastIndex = 0;
  
  while ((match = linkRegex.exec(text)) !== null) {
    const matchIndex = match.index;
    const [fullMatch, linkText, linkUrl] = match;
    
    // Add text before the link
    if (matchIndex > lastIndex) {
      parts.push(text.substring(lastIndex, matchIndex));
    }
    
    // Add the link element
    parts.push(
      <a 
        key={matchIndex} 
        href={linkUrl} 
        target="_blank" 
        rel="noopener noreferrer" 
        style={{ color: '#db2777', textDecoration: 'underline', fontWeight: '500' }}
      >
        {linkText}
      </a>
    );
    
    lastIndex = linkRegex.lastIndex;
  }
  
  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }
  
  return parts;
}

function parseInlineMarkdown(text) {
  if (typeof text !== 'string') return text;
  const withLinks = parseMarkdownLinks(text);
  const processString = (str) => {
    if (typeof str !== 'string') return str;
    const boldRegex = /\*\*(.+?)\*\*/g;
    if (!boldRegex.test(str)) return str;
    boldRegex.lastIndex = 0;
    const parts = [];
    let last = 0;
    let m;
    while ((m = boldRegex.exec(str)) !== null) {
      if (m.index > last) parts.push(str.substring(last, m.index));
      parts.push(
        <strong key={`b${m.index}`} style={{
          fontWeight: '700',
          background: 'rgba(0, 0, 0, 0.05)',
          padding: '1px 5px',
          borderRadius: '3px',
          fontSize: '0.92em',
          fontFamily: 'var(--font-mono, ui-monospace, monospace)',
          letterSpacing: '0.02em'
        }}>
          {m[1]}
        </strong>
      );
      last = boldRegex.lastIndex;
    }
    if (last < str.length) parts.push(str.substring(last));
    return parts;
  };
  if (Array.isArray(withLinks)) {
    return withLinks.flatMap((part) => {
      const result = processString(part);
      return Array.isArray(result) ? result : [result];
    });
  }
  return processString(withLinks);
}

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
            {[1, 3, 5, 7, 9, 10].filter(wk => {
              const role = getActiveRole();
              return role === 'admin' || isWeekReleased(wk);
            }).map((wk) => {
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
            <img 
              src="https://images.squarespace-cdn.com/content/v1/67806c279fb734295979b37e/9e044490-3bd2-4589-a460-cbabd7c93b35/Ryman_Arts_Logo_No_Tagline.png" 
              alt="Ryman Arts Logo" 
              style={{ height: '48px', marginBottom: '16px', display: 'block' }} 
            />
            <p className="assignment-eyebrow">Week {String(week).padStart(2, '0')} · Assignment</p>
            <h1 className="assignment-title">{rawData.title}</h1>
            {rawData.subtitle && <p className="assignment-subtitle">{rawData.subtitle}</p>}
            {rawData.extraCredit && (
              <p className="assignment-extra-credit">⭐ {rawData.extraCredit}</p>
            )}
          </div>

          {/* Assignment Introduction */}
          {rawData.introduction && (
            <div style={{
              background: 'rgba(246, 242, 232, 0.65)',
              border: '1px solid var(--hairline-strong, #C9C1AE)',
              borderRadius: '12px',
              padding: '28px',
              marginBottom: '36px',
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.01)'
            }}>
              <h2 style={{
                fontFamily: 'var(--font-display, serif)',
                fontSize: '22px',
                fontWeight: 'normal',
                margin: '0 0 16px 0',
                color: 'var(--ink, #1C1A17)',
                borderBottom: '1px solid var(--hairline, #DDD6C6)',
                paddingBottom: '10px'
              }}>
                {rawData.introduction.heading}
              </h2>
              
              <div style={{
                display: 'flex',
                gap: '24px',
                flexDirection: 'row',
                alignItems: 'flex-start',
                flexWrap: 'wrap'
              }}>
                <div style={{ flex: '1 1 500px' }}>
                  {rawData.introduction.body && rawData.introduction.body.split('\n\n').map((para, idx) => (
                    <p key={idx} style={{
                      fontSize: '14.5px',
                      lineHeight: '1.6',
                      color: 'var(--ink-mid, #44403A)',
                      marginBottom: '14px'
                    }}>
                      {parseMarkdownLinks(para)}
                    </p>
                  ))}

                  {rawData.introduction.bullets && (
                    <ul style={{
                      paddingLeft: '20px',
                      margin: '16px 0',
                      fontSize: '14.5px',
                      lineHeight: '1.6',
                      color: 'var(--ink-mid, #44403A)'
                    }}>
                      {rawData.introduction.bullets.map((bullet, idx) => (
                        <li key={idx} style={{ marginBottom: '8px' }}>
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  )}

                  {rawData.introduction.closing && (
                    <p style={{
                      fontSize: '14.5px',
                      lineHeight: '1.6',
                      fontWeight: '500',
                      color: 'var(--ink, #1C1A17)',
                      margin: '16px 0 0 0',
                      fontStyle: 'italic'
                    }}>
                      {parseMarkdownLinks(rawData.introduction.closing)}
                    </p>
                  )}
                </div>

                {rawData.introduction.imageUrl && (
                  <div style={{
                    flex: '0 0 180px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    background: '#fff',
                    padding: '8px',
                    borderRadius: '8px',
                    border: '1px solid var(--hairline, #C9C1AE)',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.03)',
                    margin: '4px auto 0 auto'
                  }}>
                    <img 
                      src={rawData.introduction.imageUrl} 
                      alt={rawData.introduction.imageCaption || "Introduction Visual"} 
                      style={{
                        width: '100%',
                        height: 'auto',
                        borderRadius: '4px',
                        display: 'block'
                      }}
                    />
                    {rawData.introduction.imageCaption && (
                      <p style={{
                        fontSize: '11px',
                        color: 'var(--ink-mid, #64748b)',
                        marginTop: '8px',
                        marginBottom: 0,
                        textAlign: 'center',
                        lineHeight: '1.3',
                        fontStyle: 'italic'
                      }}>
                        {rawData.introduction.imageCaption}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Deliverables Overview Alert Box */}
          <div style={{
            background: 'linear-gradient(135deg, #fef3c7 0%, #fffbeb 100%)',
            border: '1px solid #f59e0b',
            borderRadius: '12px',
            padding: '20px 24px',
            marginBottom: '28px',
            boxShadow: '0 4px 12px rgba(245, 158, 11, 0.05)',
            display: 'flex',
            gap: '16px',
            alignItems: 'flex-start'
          }}>
            <span style={{ fontSize: '24px', lineHeight: '1.2' }}>📋</span>
            <div>
              <h3 style={{
                margin: '0 0 6px 0',
                fontSize: '15px',
                fontWeight: 'bold',
                color: '#92400e',
                fontFamily: 'var(--font-sans, sans-serif)'
              }}>
                Course Deliverables & Guidelines
              </h3>
              <p style={{
                margin: 0,
                fontSize: '14px',
                lineHeight: '1.5',
                color: '#78350f',
                fontFamily: 'var(--font-sans, sans-serif)'
              }}>
                We recommend focusing on both the <strong>Base Assignment</strong> and <strong>Take It to the Next Level</strong> tracks. We typically work at a <strong>16:9 widescreen ratio</strong> (the standard landscape format for typical monitors and mobile screens), and suggest a baseline resolution of <strong>1920 × 1080 px</strong>, though this is not a strict rule. You are encouraged to explore different sizes and create varied layouts using Illustrator. If you choose to use Photoshop, we recommend keeping the number of active Artboards to a minimum, as a high count can significantly increase your file size. The <strong>Advanced Integration</strong> track is optional.
              </p>
              <p style={{
                margin: '8px 0 0 0',
                fontSize: '13.5px',
                lineHeight: '1.5',
                color: '#78350f',
                fontFamily: 'var(--font-sans, sans-serif)'
              }}>
                These are designed to be quick, foundational concepts and should not be overly detailed. Ideally, these studies connect to the worldbuilding flow of the class, but if you do not have a pre-existing IP to work from, that is absolutely fine.
              </p>
              <p style={{
                margin: '8px 0 0 0',
                fontSize: '13px',
                lineHeight: '1.5',
                color: '#b45309',
                fontStyle: 'italic',
                fontFamily: 'var(--font-sans, sans-serif)'
              }}>
                <strong>Note:</strong> Please hold onto all of your assignment files. Have them ready for our weekly critiques and save them to compile into your final capstone project at the end of the course.
              </p>
            </div>
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
                  advanced: 'Advanced Integration'
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
              {section.body && (
                typeof section.body === 'string' ? (
                  section.body.split('\n\n').map((para, pi) => (
                    <p key={pi} className="phase-intro" style={{ marginBottom: '16px' }}>{para}</p>
                  ))
                ) : (
                  <p className="phase-intro">{section.body}</p>
                )
              )}
              {section.subheading && <p className="phase-sub">{section.subheading}</p>}

              {section.imageUrl && (
                <div style={{ margin: '20px 0', textAlign: 'center' }}>
                  <img src={section.imageUrl} alt={section.imageCaption || section.heading} style={{ maxWidth: '100%', maxHeight: '420px', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.08)' }} />
                  {section.imageCaption && (
                    <p style={{ fontSize: '12px', color: '#64748b', marginTop: '6px', fontStyle: 'italic' }}>{section.imageCaption}</p>
                  )}
                </div>
              )}

              {section.images && (
                <div style={{
                  display: 'flex',
                  gap: '16px',
                  flexWrap: 'wrap',
                  marginTop: '14px',
                  marginBottom: '20px',
                  justifyContent: 'center'
                }}>
                  {section.images.map((img, idx) => (
                    <div key={idx} style={{
                      flex: '1 1 280px',
                      background: '#fff',
                      borderRadius: '10px',
                      border: '1px solid rgba(0, 0, 0, 0.08)',
                      overflow: 'hidden',
                      boxShadow: '0 4px 16px rgba(0, 0, 0, 0.04)',
                      maxWidth: '400px'
                    }}>
                      <div style={{
                        width: '100%',
                        aspectRatio: '16 / 10',
                        overflow: 'hidden',
                        background: '#f1f0ec',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <img
                          src={img.url}
                          alt={img.caption || section.heading}
                          style={{
                            maxWidth: '100%',
                            maxHeight: '100%',
                            objectFit: 'contain',
                            display: 'block'
                          }}
                        />
                      </div>
                      {img.caption && (
                        <p style={{
                          fontSize: '11px',
                          fontWeight: '600',
                          color: 'var(--ink-mid, #64748b)',
                          textAlign: 'center',
                          padding: '8px 12px',
                          margin: 0,
                          fontFamily: 'var(--font-sans, sans-serif)',
                          fontStyle: 'italic'
                        }}>
                          {img.caption}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {section.bullets && (
                <ul className="phase-list phase-list--accent">
                  {section.bullets.map((b, i) => {
                    if (typeof b === 'string') {
                      return <li key={i}>{parseInlineMarkdown(b)}</li>;
                    }
                    return (
                      <li key={i}>
                        {parseInlineMarkdown(b.text)}
                        {b.imageUrl && (
                          <div style={{
                            marginTop: '14px',
                            marginBottom: '8px',
                            background: '#fff',
                            borderRadius: '10px',
                            border: '1px solid rgba(0, 0, 0, 0.08)',
                            overflow: 'hidden',
                            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.04)',
                            maxWidth: '480px'
                          }}>
                            <div style={{
                              width: '100%',
                              aspectRatio: '16 / 10',
                              overflow: 'hidden',
                              background: '#f1f0ec',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center'
                            }}>
                              <img
                                src={b.imageUrl}
                                alt={b.imageCaption || b.text}
                                style={{
                                  maxWidth: '100%',
                                  maxHeight: '100%',
                                  objectFit: 'contain',
                                  display: 'block'
                                }}
                              />
                            </div>
                            {b.imageCaption && (
                              <p style={{
                                fontSize: '12px',
                                fontWeight: '600',
                                color: 'var(--ink-mid, #64748b)',
                                textAlign: 'center',
                                padding: '10px 16px',
                                margin: 0,
                                fontFamily: 'var(--font-sans, sans-serif)',
                                fontStyle: 'italic'
                              }}>
                                {b.imageCaption}
                              </p>
                            )}
                          </div>
                        )}
                        {b.subIntro && (
                          <p style={{
                            marginTop: '14px',
                            marginBottom: '8px',
                            fontSize: '14px',
                            color: '#334155',
                            lineHeight: '1.6',
                            fontStyle: 'italic'
                          }}>
                            {parseInlineMarkdown(b.subIntro)}
                          </p>
                        )}
                        {b.subbullets && (
                          <ul style={{
                            paddingLeft: '20px',
                            margin: '8px 0 8px 0',
                            fontSize: '13.5px',
                            color: '#334155',
                            lineHeight: '1.6',
                            listStyleType: 'disc'
                          }}>
                            {b.subbullets.map((bullet, bi) => (
                              <li key={bi} style={{ marginBottom: '6px' }}>{parseInlineMarkdown(bullet)}</li>
                            ))}
                          </ul>
                        )}
                        {b.substeps && (
                          <ol style={{
                            paddingLeft: '20px',
                            margin: '8px 0 4px 0',
                            fontSize: '13.5px',
                            color: '#334155',
                            lineHeight: '1.6'
                          }}>
                            {b.substeps.map((step, si) => (
                              <li key={si} style={{ marginBottom: '8px' }}>{parseInlineMarkdown(step)}</li>
                            ))}
                          </ol>
                        )}
                      </li>
                    );
                  })}
                </ul>
              )}

              {section.numberedSteps && (
                <ol className="phase-steps" start={section.start}>
                  {section.numberedSteps.map((s, i) => {
                    if (typeof s === 'string') {
                      return <li key={i}>{parseInlineMarkdown(s)}</li>;
                    }
                    return (
                      <li key={i}>
                        {typeof s.text === 'string' && s.text.includes('\n') ? (
                          s.text.split('\n').map((para, pIdx) => (
                            <p key={pIdx} style={{ margin: pIdx === 0 ? '0' : '8px 0 0 0' }}>
                              {parseInlineMarkdown(para)}
                            </p>
                          ))
                        ) : (
                          parseInlineMarkdown(s.text)
                        )}
                        {s.imageUrl && (
                          <div style={{
                            marginTop: '14px',
                            marginBottom: '8px',
                            background: '#fff',
                            borderRadius: '10px',
                            border: '1px solid rgba(0, 0, 0, 0.08)',
                            overflow: 'hidden',
                            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.04)',
                            maxWidth: '480px'
                          }}>
                            <div style={{
                              width: '100%',
                              aspectRatio: '16 / 10',
                              overflow: 'hidden',
                              background: '#f1f0ec',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center'
                            }}>
                              <img
                                src={s.imageUrl}
                                alt={s.imageCaption || s.text}
                                style={{
                                  maxWidth: '100%',
                                  maxHeight: '100%',
                                  objectFit: 'contain',
                                  display: 'block'
                                }}
                              />
                            </div>
                            {s.imageCaption && (
                              <p style={{
                                fontSize: '12px',
                                fontWeight: '600',
                                color: 'var(--ink-mid, #64748b)',
                                textAlign: 'center',
                                padding: '10px 16px',
                                margin: 0,
                                fontFamily: 'var(--font-sans, sans-serif)',
                                fontStyle: 'italic'
                              }}>
                                {s.imageCaption}
                              </p>
                            )}
                          </div>
                        )}
                        {s.images && (
                          <div style={{
                            display: 'flex',
                            gap: '16px',
                            flexWrap: 'wrap',
                            marginTop: '14px',
                            marginBottom: '8px'
                          }}>
                            {s.images.map((img, idx) => (
                              <div key={idx} style={{
                                flex: '1 1 200px',
                                background: '#fff',
                                borderRadius: '10px',
                                border: '1px solid rgba(0, 0, 0, 0.08)',
                                overflow: 'hidden',
                                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.04)',
                                maxWidth: '280px'
                              }}>
                                <div style={{
                                  width: '100%',
                                  aspectRatio: '16 / 10',
                                  overflow: 'hidden',
                                  background: '#f1f0ec',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center'
                                }}>
                                  <img
                                    src={img.url}
                                    alt={img.caption || s.text}
                                    style={{
                                      maxWidth: '100%',
                                      maxHeight: '100%',
                                      objectFit: 'contain',
                                      display: 'block'
                                    }}
                                  />
                                </div>
                                {img.caption && (
                                  <p style={{
                                    fontSize: '11px',
                                    fontWeight: '600',
                                    color: 'var(--ink-mid, #64748b)',
                                    textAlign: 'center',
                                    padding: '8px 12px',
                                    margin: 0,
                                    fontFamily: 'var(--font-sans, sans-serif)',
                                    fontStyle: 'italic'
                                  }}>
                                    {img.caption}
                                  </p>
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                        {s.subIntro && (
                          <p style={{
                            marginTop: '14px',
                            marginBottom: '8px',
                            fontSize: '14px',
                            color: '#334155',
                            lineHeight: '1.6',
                            fontStyle: 'italic'
                          }}>
                            {parseInlineMarkdown(s.subIntro)}
                          </p>
                        )}
                        {s.subbullets && (
                          <ul style={{
                            paddingLeft: '20px',
                            margin: '8px 0 8px 0',
                            fontSize: '13.5px',
                            color: '#334155',
                            lineHeight: '1.6',
                            listStyleType: 'disc'
                          }}>
                            {s.subbullets.map((bullet, bi) => (
                              <li key={bi} style={{ marginBottom: '6px' }}>{parseInlineMarkdown(bullet)}</li>
                            ))}
                          </ul>
                        )}
                        {s.substeps && (
                          <ol style={{
                            paddingLeft: '20px',
                            margin: '8px 0 4px 0',
                            fontSize: '13.5px',
                            color: '#334155',
                            lineHeight: '1.6'
                          }}>
                            {s.substeps.map((step, si) => (
                              <li key={si} style={{ marginBottom: '8px' }}>{parseInlineMarkdown(step)}</li>
                            ))}
                          </ol>
                        )}
                      </li>
                    );
                  })}
                </ol>
              )}

              {section.note && <p className="phase-note">💡 {parseInlineMarkdown(section.note)}</p>}

              {section.bottomImageUrl && (
                <div style={{ margin: '20px 0', textAlign: 'center' }}>
                  <div style={{
                    display: 'inline-block',
                    background: '#fff',
                    borderRadius: '10px',
                    border: '1px solid rgba(0, 0, 0, 0.08)',
                    overflow: 'hidden',
                    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.04)',
                    maxWidth: '640px'
                  }}>
                    <div style={{
                      width: '100%',
                      background: '#f1f0ec',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <img
                        src={section.bottomImageUrl}
                        alt={section.bottomImageCaption || section.heading}
                        style={{
                          maxWidth: '100%',
                          height: 'auto',
                          display: 'block'
                        }}
                      />
                    </div>
                    {section.bottomImageCaption && (
                      <p style={{
                        fontSize: '12px',
                        fontWeight: '600',
                        color: 'var(--ink-mid, #64748b)',
                        textAlign: 'center',
                        padding: '10px 16px',
                        margin: 0,
                        fontFamily: 'var(--font-sans, sans-serif)',
                        fontStyle: 'italic'
                      }}>
                        {section.bottomImageCaption}
                      </p>
                    )}
                  </div>
                </div>
              )}

               {section.toolGuides && (
                <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  {section.toolGuides.map((tg, tgi) => (
                    <div key={tgi} style={{
                      background: 'rgba(255, 255, 255, 0.4)',
                      border: '1px solid rgba(0, 0, 0, 0.06)',
                      borderRadius: '8px',
                      padding: '16px 20px',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.01)'
                    }}>
                      <div style={{
                        display: 'flex',
                        gap: '20px',
                        flexDirection: 'row',
                        alignItems: 'flex-start',
                        flexWrap: 'wrap-reverse'
                      }}>
                        <div style={{ flex: '1 1 300px' }}>
                          <h3 style={{ fontSize: '16px', fontWeight: 'bold', margin: '0 0 4px 0', color: '#0f172a' }}>{parseInlineMarkdown(tg.title)}</h3>
                          {tg.subtitle && <p style={{ fontSize: '12px', margin: '0 0 8px 0', color: '#64748b', fontStyle: 'italic' }}>{tg.subtitle}</p>}
                          {tg.description && <p style={{ fontSize: '14px', margin: '0 0 8px 0', color: '#334155', lineHeight: '1.5' }}>{parseInlineMarkdown(tg.description)}</p>}
                          {tg.steps && (
                            <ol style={{ paddingLeft: '20px', margin: '8px 0 0 0', fontSize: '13.5px', color: '#334155', lineHeight: '1.6' }}>
                              {tg.steps.map((step, si) => (
                                <li key={si} style={{ marginBottom: '6px' }}>{parseInlineMarkdown(step)}</li>
                              ))}
                            </ol>
                          )}
                        </div>
                        {tg.imageUrl && (
                          <div style={{
                            flex: '0 0 160px',
                            background: '#fff',
                            padding: '4px',
                            borderRadius: '6px',
                            border: '1px solid var(--hairline, #C9C1AE)',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.02)',
                            margin: '0 auto 0 auto'
                          }}>
                            <img 
                              src={tg.imageUrl} 
                              alt={tg.title} 
                              style={{ width: '100%', height: 'auto', display: 'block', borderRadius: '4px' }} 
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
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

          {/* Deliverables */}
          {data.submission && (
            <section className="assignment-phase">
              <h2 className="phase-title">Deliverables</h2>
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
          <LegalDisclaimer style={{ borderTop: 'none', paddingTop: 0 }} />
        </div>
      </div>
    </div>
  );
}

