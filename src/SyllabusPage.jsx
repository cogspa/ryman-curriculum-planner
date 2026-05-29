import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { curriculum, config } from './curriculum.js';
import { syllabusVersions } from './syllabusHistory.js';

// Strip [NEW] prefix and render bold markdown (**text**) for syllabus display
function renderCleaned(str) {
  const text = str.startsWith('[NEW] ') ? str.slice(6) : str;
  const boldRegex = /(\*\*.*?\*\*)/g;
  if (!boldRegex.test(text)) return text;
  const parts = text.split(boldRegex);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i} style={{ fontWeight: '700', color: '#8b3a2f' }}>{part.slice(2, -2)}</strong>;
    }
    return part;
  });
}

export default function SyllabusPage() {
  const [selectedVer, setSelectedVer] = useState('2.1');

  const activeCurriculum = useMemo(() => {
    if (selectedVer === '2.1') {
      return curriculum;
    }
    const verData = syllabusVersions.find((v) => v.version === selectedVer);
    if (!verData || !verData.curriculumSnapshot) {
      return curriculum;
    }
    // Merge snapshot overrides
    return curriculum.map((week) => {
      const override = verData.curriculumSnapshot.find((w) => w.week === week.week);
      return override ? override : week;
    });
  }, [selectedVer]);

  const activeVersionInfo = useMemo(() => {
    return syllabusVersions.find((v) => v.version === selectedVer);
  }, [selectedVer]);

  function handlePrint() {
    window.print();
  }

  return (
    <div className="app">
      <div className="container">
        <div className="syllabus-page">
          <div className="syllabus-topbar no-print">
            <Link to="/" className="back-link">← Back to Curriculum</Link>
            <button className="syllabus-download" onClick={handlePrint}>
              ↓ Download PDF
            </button>
          </div>

          <header className="syllabus-header">
            <p className="syllabus-eyebrow">2026 · 12-week program + capstone</p>
            <h1 className="syllabus-title">Ryman Arts Platform</h1>
            <p className="syllabus-sub-title">Curriculum Syllabus</p>
            <div className="syllabus-meta">
              <span>{config.tuesday.label}s {config.tuesday.time} · {config.tuesday.location}</span>
              <span className="dot">·</span>
              <span>{config.saturday.label}s {config.saturday.time} · {config.saturday.location}</span>
            </div>
            <p className="syllabus-deadline">Syllabus due: <strong>June 15, 2026</strong></p>
          </header>

          {/* Version History Selector */}
          <div className="syllabus-version-selector no-print">
            <span className="version-selector-label">Syllabus Version History:</span>
            <div className="version-pills">
              {syllabusVersions.map((v) => (
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
                💡 <strong>What changed in v{selectedVer}:</strong> {activeVersionInfo.description}
              </p>
            )}
          </div>

          {activeCurriculum.map((week) => (
            <section key={week.week} className="syllabus-week">
              <div className="syllabus-week-head">
                <span className="syllabus-week-num">Week {String(week.week).padStart(2, '0')}</span>
                {week.dateOverride && (
                  <span className="syllabus-week-tbd">{week.dateOverride}</span>
                )}
              </div>
              <h2 className="syllabus-week-title">{week.title}</h2>
              {week.overview && <p className="syllabus-overview">{week.overview}</p>}

              {week.tuesday || week.saturday ? (
                <div className="syllabus-day-splits" style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  {week.tuesday && (
                    <div className="syllabus-day-block" style={{ borderLeft: '2px solid #8b3a2f', paddingLeft: '14px' }}>
                      <h4 style={{ fontSize: '11px', textTransform: 'uppercase', fontFamily: 'Menlo, monospace', color: '#8b3a2f', margin: '0 0 10px' }}>
                        📅 Tuesday Session (Zoom Discussion)
                      </h4>
                      {week.tuesday.topics?.length > 0 && (
                        <div className="syllabus-block" style={{ marginBottom: '10px' }}>
                          <h5 style={{ fontSize: '10px', textTransform: 'uppercase', color: '#5a4a2f', margin: '0 0 6px', fontFamily: 'Menlo, monospace' }}>Topics & Discussions</h5>
                          <ul style={{ margin: 0, paddingLeft: '20px' }}>
                            {week.tuesday.topics.map((t, i) => <li key={i}>{renderCleaned(t)}</li>)}
                          </ul>
                        </div>
                      )}
                      {week.tuesday.readings?.length > 0 && (
                        <div className="syllabus-block">
                          <h5 style={{ fontSize: '10px', textTransform: 'uppercase', color: '#5a4a2f', margin: '0 0 6px', fontFamily: 'Menlo, monospace' }}>Readings & Discussions</h5>
                          <ul style={{ margin: 0, paddingLeft: '20px' }}>
                            {week.tuesday.readings.map((r, i) => <li key={i}>{renderCleaned(r)}</li>)}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}
                  {week.saturday && (
                    <div className="syllabus-day-block" style={{ borderLeft: '2px solid #2a2418', paddingLeft: '14px' }}>
                      <h4 style={{ fontSize: '11px', textTransform: 'uppercase', fontFamily: 'Menlo, monospace', color: '#2a2418', margin: '0 0 10px' }}>
                        🎨 Saturday Session (Reveal Workshop)
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
                        <div className="syllabus-block">
                          <h5 style={{ fontSize: '10px', textTransform: 'uppercase', color: '#5a4a2f', margin: '0 0 6px', fontFamily: 'Menlo, monospace' }}>Assignments & Prep</h5>
                          <ul style={{ margin: 0, paddingLeft: '20px' }}>
                            {week.saturday.assignments.map((a, i) => <li key={i}>{renderCleaned(a)}</li>)}
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
                    <div className="syllabus-block">
                      <h3 className="syllabus-block-label">Assignments</h3>
                      <ul>
                        {week.assignments.map((a, i) => <li key={i}>{renderCleaned(a)}</li>)}
                      </ul>
                    </div>
                  )}
                </>
              )}
            </section>
          ))}

          <footer className="syllabus-footer">
            <p>Ryman Arts Platform · Curriculum Syllabus · 2026</p>
            <p style={{ fontSize: 9, marginTop: 4, opacity: 0.7 }}>Viewing Version {selectedVer}</p>
          </footer>

          <div className="syllabus-topbar no-print" style={{ marginTop: 40 }}>
            <Link to="/" className="back-link">← Back to Curriculum</Link>
            <button className="syllabus-download" onClick={handlePrint}>
              ↓ Download PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
