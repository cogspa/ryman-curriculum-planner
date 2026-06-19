import { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { curriculum, config } from './curriculum.js';
import { syllabusVersions } from './syllabusHistory.js';
import { supabase } from './supabaseClient.js';
import {
  loadLocalCurriculum,
  fetchRemoteCurriculum,
  loadLocalVersions,
  saveLocalVersions,
  fetchRemoteVersions,
  syncRemoteVersions
} from './curriculumService.js';

// Strip [NEW] prefix and render bold markdown (**text**) and linkified URLs for syllabus display
function renderCleaned(str) {
  const text = str.startsWith('[NEW] ') ? str.slice(6) : str;
  const urlRegex = /(https?:\/\/[^\s,]+)/g;
  const boldRegex = /(\*\*.*?\*\*)/g;

  const linkify = (txt) => {
    if (typeof txt !== 'string') return txt;
    if (!urlRegex.test(txt)) return txt;
    const urlParts = txt.split(urlRegex);
    return urlParts.map((part, idx) => {
      if (urlRegex.test(part)) {
        return (
          <a
            key={idx}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#db2777', textDecoration: 'underline', wordBreak: 'break-all' }}
          >
            {part}
          </a>
        );
      }
      return part;
    });
  };

  if (!boldRegex.test(text)) return linkify(text);
  const parts = text.split(boldRegex);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i} style={{ fontWeight: '700', color: '#8b3a2f' }}>{linkify(part.slice(2, -2))}</strong>;
    }
    return linkify(part);
  });
}

function getSpeakerInfoForWeek(weekNum, tuesdayDate, saturdayDate) {
  const formatDate = (d) => {
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };
  const speakersMap = {
    1: { name: 'No speaker - First Class', date: formatDate(tuesdayDate) },
    2: { name: 'Senior digital illustrator', date: formatDate(tuesdayDate) },
    3: { name: 'Concept artist or film matte painter', date: formatDate(tuesdayDate) },
    4: { name: 'Senior graphic designer', date: formatDate(tuesdayDate) },
    5: { name: 'Nancy Seruto', date: formatDate(tuesdayDate) },
    6: { name: 'Art director or creative agency lead', date: formatDate(tuesdayDate) },
    7: { name: 'TBD', date: formatDate(tuesdayDate) },
    8: { name: 'No guest speaker (Presentation Pitch Decks)', date: formatDate(tuesdayDate) },
    9: { name: 'Eugenia Chen', date: formatDate(tuesdayDate) },
    10: { name: 'Jeremy Costello (Guest Panel)', date: formatDate(tuesdayDate) },
    11: { name: 'Heidi Hirsch', date: formatDate(saturdayDate) },
    12: { name: 'Past graduates sharing showcase experiences', date: formatDate(tuesdayDate) },
    13: { name: 'None', date: 'End of September' }
  };
  return speakersMap[weekNum] || { name: 'TBD', date: formatDate(tuesdayDate) };
}

export default function SyllabusPage() {
  const [selectedVer, setSelectedVer] = useState('live');
  const [isCondensed, setIsCondensed] = useState(false);
  const [customCurriculum, setCustomCurriculum] = useState(() => loadLocalCurriculum());
  const [customVersions, setCustomVersions] = useState(() => loadLocalVersions());

  const [newVersionTag, setNewVersionTag] = useState('');
  const [newVersionDesc, setNewVersionDesc] = useState('');
  const [isAdmin] = useState(() => {
    try {
      return localStorage.getItem('cp-auth-session') === 'true';
    } catch {
      return false;
    }
  });

  // Sync from cloud database if available to show the latest updates
  useEffect(() => {
    fetchRemoteCurriculum().then((remoteObj) => {
      if (remoteObj && remoteObj.data) {
        const localUpdated = parseInt(localStorage.getItem('cp-custom-curriculum-updated') || '0', 10);
        if (remoteObj.updated > localUpdated) {
          setCustomCurriculum(remoteObj.data);
          localStorage.setItem('cp-custom-curriculum', JSON.stringify(remoteObj.data));
          localStorage.setItem('cp-custom-curriculum-updated', remoteObj.updated.toString());
        }
      }
    }).catch((err) => {
      console.warn('Could not sync remote curriculum for syllabus page:', err);
    });

    fetchRemoteVersions().then((remoteObj) => {
      if (remoteObj && remoteObj.data) {
        const localUpdated = parseInt(localStorage.getItem('cp-custom-versions-updated') || '0', 10);
        if (remoteObj.updated > localUpdated) {
          setCustomVersions(remoteObj.data);
          localStorage.setItem('cp-custom-versions', JSON.stringify(remoteObj.data));
          localStorage.setItem('cp-custom-versions-updated', remoteObj.updated.toString());
        }
      }
    }).catch((err) => {
      console.warn('Could not sync remote custom versions:', err);
    });
  }, []);

  const allVersions = useMemo(() => {
    const preparedCustom = customVersions.map(v => ({ ...v, isCustom: true }));
    return [...preparedCustom, ...syllabusVersions];
  }, [customVersions]);

  // Dynamically suggest next version tag
  useEffect(() => {
    const numericVersions = allVersions
      .map(v => parseFloat(v.version))
      .filter(v => !isNaN(v));
    const maxVer = numericVersions.length > 0 ? Math.max(...numericVersions) : 2.6;
    const nextVer = (maxVer + 0.1).toFixed(1);
    setNewVersionTag(nextVer);
  }, [allVersions]);

  const activeCurriculum = useMemo(() => {
    if (selectedVer === 'live') {
      return customCurriculum;
    }

    // Check if selected is a custom version
    const customVer = customVersions.find((v) => v.version === selectedVer);
    if (customVer) {
      return customVer.curriculumSnapshot;
    }

    // Otherwise it is a static version
    const verData = syllabusVersions.find((v) => v.version === selectedVer);
    if (!verData) {
      return curriculum;
    }
    if (!verData.curriculumSnapshot) {
      return curriculum;
    }

    // Merge snapshot overrides on top of default static curriculum
    return curriculum.map((week) => {
      const override = verData.curriculumSnapshot.find((w) => w.week === week.week);
      return override ? override : week;
    });
  }, [selectedVer, customCurriculum, customVersions]);

  const activeVersionInfo = useMemo(() => {
    if (selectedVer === 'live') {
      return {
        version: 'live',
        date: new Date().toISOString().split('T')[0],
        description: 'Active working draft of the curriculum. Edits from Admin Edit Mode are reflected here.'
      };
    }
    return allVersions.find((v) => v.version === selectedVer);
  }, [selectedVer, allVersions]);

  const startDate = useMemo(() => {
    try {
      return localStorage.getItem('cp-start-date') || config.startDate;
    } catch {
      return config.startDate;
    }
  }, []);

  function findTuesdayOnOrAfter(date) {
    const result = new Date(date);
    while (result.getDay() !== 2) {
      result.setDate(result.getDate() + 1);
    }
    return result;
  }

  const weeksWithDates = useMemo(() => {
    const start = new Date(startDate);
    const firstTue = findTuesdayOnOrAfter(start);
    return activeCurriculum.map((week, idx) => {
      const tue = new Date(firstTue);
      tue.setDate(firstTue.getDate() + idx * 7);
      const sat = new Date(tue);
      sat.setDate(tue.getDate() + 4);
      return { week, tuesday: tue, saturday: sat };
    });
  }, [startDate, activeCurriculum]);

  async function handleSaveVersion(e) {
    e.preventDefault();
    if (!newVersionTag.trim()) {
      alert('Please enter a version tag.');
      return;
    }
    const cleanTag = newVersionTag.trim().replace(/^v/, '');

    if (allVersions.some(v => v.version === cleanTag)) {
      alert(`Version v${cleanTag} already exists. Please choose a different version tag.`);
      return;
    }

    const newVersion = {
      version: cleanTag,
      date: new Date().toISOString().split('T')[0],
      description: newVersionDesc.trim() || 'No description provided.',
      curriculumSnapshot: customCurriculum,
    };

    const updatedVersions = [newVersion, ...customVersions];
    setCustomVersions(updatedVersions);
    saveLocalVersions(updatedVersions);

    if (supabase) {
      await syncRemoteVersions(updatedVersions);
    }

    setNewVersionDesc('');
    setSelectedVer(cleanTag);
    alert(`Successfully saved version v${cleanTag}!`);
  }

  async function handleDeleteVersion(versionToDelete) {
    if (window.confirm(`Are you sure you want to delete custom version v${versionToDelete}? This cannot be undone.`)) {
      const updatedVersions = customVersions.filter(v => v.version !== versionToDelete);
      setCustomVersions(updatedVersions);
      saveLocalVersions(updatedVersions);
      if (supabase) {
        await syncRemoteVersions(updatedVersions);
      }
      setSelectedVer('live');
      alert(`Deleted version v${versionToDelete}`);
    }
  }

  const handlePrintFull = () => {
    const wasCondensed = isCondensed;
    setIsCondensed(false);
    setTimeout(() => {
      window.print();
      const restore = () => {
        setIsCondensed(wasCondensed);
        window.removeEventListener('afterprint', restore);
      };
      window.addEventListener('afterprint', restore);
    }, 150);
  };

  const handlePrintCondensed = () => {
    const wasCondensed = isCondensed;
    setIsCondensed(true);
    setTimeout(() => {
      window.print();
      const restore = () => {
        setIsCondensed(wasCondensed);
        window.removeEventListener('afterprint', restore);
      };
      window.addEventListener('afterprint', restore);
    }, 150);
  };


  return (
    <div className="app">
      <div className="container">
        <div className="syllabus-page">
          <div className="syllabus-topbar no-print" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
            <Link to="/" className="back-link">← Back to Curriculum</Link>

            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
              {/* Segmented view switcher */}
              <div className="syllabus-toggle-pills">
                <button
                  type="button"
                  className={`toggle-pill ${!isCondensed ? 'is-active' : ''}`}
                  onClick={() => setIsCondensed(false)}
                >
                  👁️ Full View
                </button>
                <button
                  type="button"
                  className={`toggle-pill ${isCondensed ? 'is-active' : ''}`}
                  onClick={() => setIsCondensed(true)}
                >
                  📰 Condensed View
                </button>
              </div>

              {/* Download Buttons */}
              <div style={{ display: 'flex', gap: '8px' }}>
                <button className="syllabus-download" onClick={handlePrintFull}>
                  ↓ Download PDF
                </button>
                <button className="syllabus-download secondary" onClick={handlePrintCondensed}>
                  ↓ Download Condensed PDF
                </button>
              </div>
            </div>
          </div>

          <header className="syllabus-header">
            <img
              src="https://images.squarespace-cdn.com/content/v1/67806c279fb734295979b37e/9e044490-3bd2-4589-a460-cbabd7c93b35/Ryman_Arts_Logo_No_Tagline.png"
              alt="Ryman Arts Logo"
              style={{ height: '48px', marginBottom: '16px', display: 'block' }}
            />
            <p className="syllabus-eyebrow">2026 · 12-week program + capstone</p>
            <h1 className="syllabus-title">Ryman Arts pLAtform</h1>
            <p className="syllabus-sub-title">Curriculum Syllabus</p>
            <div className="syllabus-meta">
              <span>{config.tuesday.label} {config.tuesday.time} · {config.tuesday.location}</span>
              <span className="dot">·</span>
              <span>{config.saturday.label} {config.saturday.time} · {config.saturday.location}</span>
            </div>
            {/* <p className="syllabus-deadline">Syllabus due: <strong>June 15, 2026</strong></p> */}
          </header>

          {/* Version History Selector */}
          <div className="syllabus-version-selector no-print">
            <span className="version-selector-label">Syllabus Version History:</span>
            <div className="version-pills">
              <button
                className={`version-pill ${selectedVer === 'live' ? 'is-active' : ''}`}
                onClick={() => setSelectedVer('live')}
              >
                <span className="ver-tag">Live Draft</span>
                <span className="ver-date">Active</span>
              </button>
              {allVersions.map((v) => (
                <button
                  key={v.version}
                  className={`version-pill ${selectedVer === v.version ? 'is-active' : ''}`}
                  onClick={() => setSelectedVer(v.version)}
                >
                  <span className="ver-tag">v{v.version}</span>
                  <span className="ver-date">{v.date}</span>
                </button>
              ))}
            </div>
            {activeVersionInfo && (
              <p className="version-description">
                💡 <strong>What changed in {selectedVer === 'live' ? 'Live Draft' : `v${selectedVer}`}:</strong> {activeVersionInfo.description}
              </p>
            )}

            {isAdmin && (
              <div className="version-manager">
                <div className="version-manager-header">
                  <h4>🛠️ Admin Version History Control</h4>
                </div>

                {activeVersionInfo && activeVersionInfo.isCustom && (
                  <div className="version-delete-box" style={{ marginBottom: '16px', marginTop: '0' }}>
                    <p>This is a custom user-created version (v{selectedVer}).</p>
                    <button
                      type="button"
                      className="admin-btn-danger"
                      onClick={() => handleDeleteVersion(selectedVer)}
                      style={{ padding: '6px 14px', fontSize: '12px' }}
                    >
                      🗑️ Delete Version
                    </button>
                  </div>
                )}

                <form className="version-creator" onSubmit={handleSaveVersion}>
                  <p className="version-creator-title">Save current Live Draft as a new version:</p>
                  <div className="version-creator-fields">
                    <div className="field-group">
                      <label htmlFor="ver-tag-input">Version Tag</label>
                      <input
                        id="ver-tag-input"
                        type="text"
                        value={newVersionTag}
                        onChange={(e) => setNewVersionTag(e.target.value)}
                        placeholder="e.g. 2.7"
                      />
                    </div>
                    <div className="field-group">
                      <label>Date</label>
                      <input
                        type="text"
                        value={new Date().toISOString().split('T')[0]}
                        readOnly
                        style={{ opacity: 0.7, cursor: 'not-allowed' }}
                      />
                    </div>
                    <div className="field-group full-width">
                      <label htmlFor="ver-desc-input">Changelog / Change Description</label>
                      <textarea
                        id="ver-desc-input"
                        value={newVersionDesc}
                        onChange={(e) => setNewVersionDesc(e.target.value)}
                        placeholder="Describe what changed in this version..."
                      />
                    </div>
                  </div>
                  <div className="version-creator-actions">
                    <button type="submit" className="admin-btn">
                      💾 Save Version
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>

          {/* Syllabus Vision & Worldbuilding Overview */}
          <div className="curriculum-intro-card" style={{
            background: 'rgba(246, 242, 232, 0.45)',
            border: '1px solid var(--hairline-strong, #C9C1AE)',
            borderRadius: '8px',
            padding: '20px 24px',
            marginBottom: '32px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.01)'
          }}>
            <h3 style={{
              fontFamily: 'var(--font-display, serif)',
              fontSize: '18px',
              fontWeight: 'normal',
              margin: '0 0 10px 0',
              color: 'var(--ink, #1C1A17)',
              borderBottom: '1px solid var(--hairline, #DDD6C6)',
              paddingBottom: '8px'
            }}>
              Curriculum Vision: Worldbuilding & Digital Workflows
            </h3>
            <p style={{
              fontSize: '13.5px',
              lineHeight: '1.6',
              color: 'var(--ink-mid, #44403A)',
              margin: '0 0 12px 0'
            }}>
              This worldbuilding-based curriculum focuses on teaching digital workflows to achieve the broader goals of workforce development in the visual arts. Rather than disconnected drills, the lessons guide students through the creation of six major assignments and a final capstone presentation.
            </p>
            <p style={{
              fontSize: '13.5px',
              lineHeight: '1.6',
              color: 'var(--ink-mid, #44403A)',
              margin: '0 0 12px 0'
            }}>
              Using their own original ideas, IP (Intellectual Property), and characters, students will visually develop a unified "world of their own." Assignments are intentionally designed to build upon each other, creating a cohesive portfolio that tells a story.
            </p>
            <div style={{
              fontSize: '12.5px',
              lineHeight: '1.5',
              color: '#0f766e',
              background: 'rgba(15, 118, 110, 0.06)',
              border: '1px solid rgba(15, 118, 110, 0.15)',
              borderRadius: '6px',
              padding: '10px 14px',
              margin: 0,
              fontWeight: '500'
            }}>
              💡 <strong>Note:</strong> Assignments are developed to meet your level of expertise, and the <strong>"3D Integration"</strong> sections are optional.
            </div>
          </div>

          {weeksWithDates.map(({ week, tuesday, saturday }) => {
            const assignmentsList = (week.saturday && week.saturday.assignments) || week.assignments || [];
            const speakerInfo = getSpeakerInfoForWeek(week.week, tuesday, saturday);

            return (
              <section key={week.week} className="syllabus-week">
                <div className="syllabus-week-head">
                  <span className="syllabus-week-num">Week {String(week.week).padStart(2, '0')}</span>
                  {week.dateOverride && (
                    <span className="syllabus-week-tbd">{week.dateOverride}</span>
                  )}
                </div>
                <h2 className="syllabus-week-title">{week.title}</h2>

                {isCondensed ? (
                  <div className="syllabus-condensed-content" style={{ marginTop: '12px' }}>
                    {/* Dates & Times */}
                    {week.tuesday || week.saturday ? (
                      <div className="syllabus-condensed-schedule" style={{ display: 'grid', gridTemplateColumns: week.tuesday && week.saturday ? '1fr 1fr' : '1fr', gap: '16px', margin: '8px 0 12px 0' }}>
                        {week.tuesday && (
                          <div style={{ padding: '8px 12px', background: 'rgba(236, 72, 153, 0.03)', borderLeft: '2px solid #ec4899', borderRadius: '0 4px 4px 0' }}>
                            <strong style={{ fontSize: '10px', color: '#db2777', textTransform: 'uppercase', fontFamily: 'var(--font-mono, monospace)', display: 'block', marginBottom: '2px' }}>
                              📅 Tuesday Session (Zoom)
                            </strong>
                            <span style={{ fontSize: '13px', color: 'var(--ink-mid, #44403A)' }}>
                              {tuesday.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })} · {config.tuesday.time}
                            </span>
                          </div>
                        )}
                        {week.saturday && (
                          <div style={{ padding: '8px 12px', background: 'rgba(42, 36, 24, 0.03)', borderLeft: '2px solid #2a2418', borderRadius: '0 4px 4px 0' }}>
                            <strong style={{ fontSize: '10px', color: '#2a2418', textTransform: 'uppercase', fontFamily: 'var(--font-mono, monospace)', display: 'block', marginBottom: '2px' }}>
                              {week.week === 13 ? '🎨 Saturday Showcase (In-Person)' : '🎨 Saturday Workshop (In-Person)'}
                            </strong>
                            <span style={{ fontSize: '13px', color: 'var(--ink-mid, #44403A)' }}>
                              {week.dateOverride ? week.dateOverride : `${saturday.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })} · ${config.saturday.time}`}
                            </span>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div style={{ margin: '8px 0 12px 0', fontSize: '13px', color: 'var(--ink-mid, #44403A)', fontFamily: 'var(--font-mono, monospace)' }}>
                        📅 Date: {week.dateOverride || `${tuesday.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} – ${saturday.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`}
                      </div>
                    )}

                    {/* Speaker */}
                    {speakerInfo && speakerInfo.name && speakerInfo.name !== 'None' && (
                      <div style={{ fontSize: '12px', color: '#059669', fontFamily: 'var(--font-mono, monospace)', fontWeight: '600', marginBottom: '12px', background: 'rgba(16, 185, 129, 0.05)', padding: '6px 12px', borderRadius: '4px', display: 'inline-block' }}>
                        🎤 Speaker: {speakerInfo.name}
                      </div>
                    )}

                    {/* Brief Description */}
                    {week.overview && (
                      <p className="syllabus-overview" style={{ fontSize: '13px', lineHeight: '1.6', color: 'var(--ink-mid, #44403A)', fontStyle: 'italic', margin: '0 0 12px 0' }}>
                        {week.overview}
                      </p>
                    )}

                    {/* Assignments */}
                    {assignmentsList.length > 0 && (
                      <div style={{ background: 'rgba(6, 182, 212, 0.04)', borderLeft: '3px solid #06b6d4', padding: '10px 14px', borderRadius: '0 6px 6px 0', marginTop: '12px' }}>
                        <h4 style={{ margin: '0 0 6px 0', fontSize: '10px', textTransform: 'uppercase', color: '#0891b2', fontFamily: 'var(--font-mono, monospace)', letterSpacing: '0.05em', fontWeight: 'bold' }}>
                          Assignments & Deliverables
                        </h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                          {assignmentsList.map((a, i) => {
                            const isGradedAssignment = [1, 3, 5, 7, 9, 10].includes(week.week);
                            let trackParam = '';
                            const lower = a.toLowerCase();
                            if (lower.includes('base assignment') || lower.includes('base')) {
                              trackParam = '?track=beginner';
                            } else if (lower.includes('next level') || lower.includes('take it')) {
                              trackParam = '?track=intermediate';
                            } else if (lower.includes('3d integration') || lower.includes('3d')) {
                              trackParam = '?track=advanced';
                            }
                            return (
                              <div key={i} style={{ fontSize: '13px', lineHeight: '1.5', color: 'var(--ink, #1C1A17)' }}>
                                {isGradedAssignment ? (
                                  <Link to={`/assignment/${week.week}${trackParam}`} className="syllabus-assignment-link" style={{ color: 'inherit', textDecoration: 'none', fontWeight: '500' }}>
                                    {renderCleaned(a)} <span style={{ fontSize: '0.85em', color: '#0891b2', marginLeft: '4px' }}>→</span>
                                  </Link>
                                ) : (
                                  renderCleaned(a)
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <>
                    {week.overview && <p className="syllabus-overview">{week.overview}</p>}

                    {week.tuesday || week.saturday ? (
                      <div className="syllabus-day-splits" style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        {week.tuesday && (
                          <div className="syllabus-day-block tuesday-block" style={{ borderLeft: '3px solid #ec4899', paddingLeft: '14px', background: 'rgba(236, 72, 153, 0.05)', borderRadius: '6px', paddingBottom: '8px', paddingTop: '8px', paddingRight: '8px' }}>
                            <h4 style={{ fontSize: '11px', textTransform: 'uppercase', fontFamily: 'Menlo, monospace', color: '#db2777', margin: '0 0 10px' }}>
                              📅 Tuesday Session (Zoom Discussion)
                            </h4>
                            {week.tuesday.topics?.length > 0 && (
                              <div className="syllabus-block" style={{ marginBottom: '10px' }}>
                                <h5 style={{ fontSize: '10px', textTransform: 'uppercase', color: '#db2777', margin: '0 0 6px', fontFamily: 'Menlo, monospace', opacity: 0.85 }}>Topics & Discussions</h5>
                                <ul style={{ margin: 0, paddingLeft: '20px' }}>
                                  {week.tuesday.topics.map((t, i) => <li key={i}>{renderCleaned(t)}</li>)}
                                </ul>
                              </div>
                            )}
                            {week.tuesday.readings?.length > 0 && (
                              <div className="syllabus-block" style={{ marginBottom: '10px' }}>
                                <h5 style={{ fontSize: '10px', textTransform: 'uppercase', color: '#db2777', margin: '0 0 6px', fontFamily: 'Menlo, monospace', opacity: 0.85 }}>Readings & Discussions</h5>
                                <ul style={{ margin: 0, paddingLeft: '20px' }}>
                                  {week.tuesday.readings.map((r, i) => <li key={i}>{renderCleaned(r)}</li>)}
                                </ul>
                              </div>
                            )}
                            <div className="syllabus-speaker-box" style={{ borderLeft: '2px solid #10b981', paddingLeft: '10px', background: 'rgba(16, 185, 129, 0.05)', borderRadius: '4px', paddingBottom: '6px', paddingTop: '6px', marginTop: '10px', fontSize: '11px', color: '#059669', fontFamily: 'Menlo, monospace', fontWeight: 'bold' }}>
                              🎤 Speaker: {speakerInfo.name} · {speakerInfo.date}
                            </div>
                          </div>
                        )}
                        {week.saturday && (
                          <div className="syllabus-day-block" style={{ borderLeft: '2px solid #2a2418', paddingLeft: '14px' }}>
                            <h4 style={{ fontSize: '11px', textTransform: 'uppercase', fontFamily: 'Menlo, monospace', color: '#2a2418', margin: '0 0 10px' }}>
                              {week.week === 13 ? '🎨 Saturday Showcase (Reveal Studio)' : '🎨 Saturday Session (Reveal Workshop)'} {week.dateOverride && `· ${week.dateOverride}`}
                            </h4>
                            {week.saturday.topics?.length > 0 && (
                              <div className="syllabus-block" style={{ marginBottom: '10px' }}>
                                <h5 style={{ fontSize: '10px', textTransform: 'uppercase', color: '#5a4a2f', margin: '0 0 6px', fontFamily: 'Menlo, monospace' }}>Topics & Workshop</h5>
                                <ul style={{ margin: 0, paddingLeft: '20px' }}>
                                  {week.saturday.topics.map((t, i) => <li key={i}>{renderCleaned(t)}</li>)}
                                </ul>
                              </div>
                            )}
                            {week.saturday.assignments?.length > 0 && (
                              <div className="syllabus-block assignment-block" style={{ borderLeft: '3px solid #06b6d4', paddingLeft: '14px', background: 'rgba(6, 182, 212, 0.05)', borderRadius: '6px', paddingBottom: '8px', paddingTop: '8px', paddingRight: '8px', marginTop: '10px' }}>
                                <h5 style={{ fontSize: '10px', textTransform: 'uppercase', color: '#0891b2', margin: '0 0 6px', fontFamily: 'Menlo, monospace', fontWeight: 'bold' }}>Assignments & Prep</h5>
                                <ul style={{ margin: 0, paddingLeft: '20px' }}>
                                  {week.saturday.assignments.map((a, i) => {
                                    const isGradedAssignment = [1, 3, 5, 7, 9, 10].includes(week.week);
                                    let trackParam = '';
                                    const lower = a.toLowerCase();
                                    if (lower.includes('base assignment') || lower.includes('base')) {
                                      trackParam = '?track=beginner';
                                    } else if (lower.includes('next level') || lower.includes('take it')) {
                                      trackParam = '?track=intermediate';
                                    } else if (lower.includes('3d integration') || lower.includes('3d')) {
                                      trackParam = '?track=advanced';
                                    }
                                    return (
                                      <li key={i}>
                                        {isGradedAssignment ? (
                                          <Link to={`/assignment/${week.week}${trackParam}`} className="syllabus-assignment-link" style={{ color: 'inherit', textDecoration: 'none' }}>
                                            {renderCleaned(a)} <span style={{ fontSize: '0.85em', color: '#0891b2', marginLeft: '4px' }}>→</span>
                                          </Link>
                                        ) : (
                                          renderCleaned(a)
                                        )}
                                      </li>
                                    );
                                  })}
                                </ul>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    ) : (
                      <>
                        {week.topics?.length > 0 && (
                          <div className="syllabus-block">
                            <h3 className="syllabus-block-label">Topics</h3>
                            <ul>
                              {week.topics.map((t, i) => <li key={i}>{renderCleaned(t)}</li>)}
                            </ul>
                          </div>
                        )}

                        {week.readings?.length > 0 && (
                          <div className="syllabus-block">
                            <h3 className="syllabus-block-label">Readings & Resources</h3>
                            <ul>
                              {week.readings.map((r, i) => <li key={i}>{renderCleaned(r)}</li>)}
                            </ul>
                          </div>
                        )}

                        {week.assignments?.length > 0 && (
                          <div className="syllabus-block assignment-block" style={{ borderLeft: '3px solid #06b6d4', paddingLeft: '14px', background: 'rgba(6, 182, 212, 0.05)', borderRadius: '6px', paddingBottom: '8px', paddingTop: '8px', paddingRight: '8px', marginTop: '10px' }}>
                            <h3 className="syllabus-block-label" style={{ color: '#0891b2', fontWeight: 'bold', margin: '0 0 6px' }}>Assignments</h3>
                            <ul style={{ margin: 0, paddingLeft: '20px' }}>
                              {week.assignments.map((a, i) => {
                                const isGradedAssignment = [1, 3, 5, 7, 9, 10].includes(week.week);
                                let trackParam = '';
                                const lower = a.toLowerCase();
                                if (lower.includes('base assignment') || lower.includes('base')) {
                                  trackParam = '?track=beginner';
                                } else if (lower.includes('next level') || lower.includes('take it')) {
                                  trackParam = '?track=intermediate';
                                } else if (lower.includes('3d integration') || lower.includes('3d')) {
                                  trackParam = '?track=advanced';
                                }
                                return (
                                  <li key={i}>
                                    {isGradedAssignment ? (
                                      <Link to={`/assignment/${week.week}${trackParam}`} className="syllabus-assignment-link" style={{ color: 'inherit', textDecoration: 'none' }}>
                                        {renderCleaned(a)} <span style={{ fontSize: '0.85em', color: '#0891b2', marginLeft: '4px' }}>→</span>
                                      </Link>
                                    ) : (
                                      renderCleaned(a)
                                    )}
                                  </li>
                                );
                              })}
                            </ul>
                          </div>
                        )}
                      </>
                    )}
                  </>
                )}
              </section>
            );
          })}

          <footer className="syllabus-footer">
            <p>Ryman Arts pLAtform · Curriculum Syllabus · 2026</p>
            <p style={{ fontSize: 9, marginTop: 4, opacity: 0.7 }}>
              {selectedVer === 'live' ? 'Viewing Live Draft' : `Viewing Version v${selectedVer}`}
            </p>
          </footer>

          <div className="syllabus-topbar no-print" style={{ marginTop: 40, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
            <Link to="/" className="back-link">← Back to Curriculum</Link>

            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
              {/* Segmented view switcher */}
              <div className="syllabus-toggle-pills">
                <button
                  type="button"
                  className={`toggle-pill ${!isCondensed ? 'is-active' : ''}`}
                  onClick={() => setIsCondensed(false)}
                >
                  👁️ Full View
                </button>
                <button
                  type="button"
                  className={`toggle-pill ${isCondensed ? 'is-active' : ''}`}
                  onClick={() => setIsCondensed(true)}
                >
                  📰 Condensed View
                </button>
              </div>

              {/* Download Buttons */}
              <div style={{ display: 'flex', gap: '8px' }}>
                <button className="syllabus-download" onClick={handlePrintFull}>
                  ↓ Download PDF
                </button>
                <button className="syllabus-download secondary" onClick={handlePrintCondensed}>
                  ↓ Download Condensed PDF
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
}
