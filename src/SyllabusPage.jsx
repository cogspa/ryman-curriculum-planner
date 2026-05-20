import { Link } from 'react-router-dom';
import { curriculum, config } from './curriculum.js';

// Strip [NEW] prefix for clean syllabus display
function clean(str) {
  return str.startsWith('[NEW] ') ? str.slice(6) : str;
}

export default function SyllabusPage() {
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

          {curriculum.map((week) => (
            <section key={week.week} className="syllabus-week">
              <div className="syllabus-week-head">
                <span className="syllabus-week-num">Week {String(week.week).padStart(2, '0')}</span>
                {week.dateOverride && (
                  <span className="syllabus-week-tbd">{week.dateOverride}</span>
                )}
              </div>
              <h2 className="syllabus-week-title">{week.title}</h2>
              {week.overview && <p className="syllabus-overview">{week.overview}</p>}

              {week.topics?.length > 0 && (
                <div className="syllabus-block">
                  <h3 className="syllabus-block-label">Topics</h3>
                  <ul>
                    {week.topics.map((t, i) => <li key={i}>{clean(t)}</li>)}
                  </ul>
                </div>
              )}

              {week.readings?.length > 0 && (
                <div className="syllabus-block">
                  <h3 className="syllabus-block-label">Readings & Resources</h3>
                  <ul>
                    {week.readings.map((r, i) => <li key={i}>{clean(r)}</li>)}
                  </ul>
                </div>
              )}

              {week.assignments?.length > 0 && (
                <div className="syllabus-block">
                  <h3 className="syllabus-block-label">Assignments</h3>
                  <ul>
                    {week.assignments.map((a, i) => <li key={i}>{clean(a)}</li>)}
                  </ul>
                </div>
              )}
            </section>
          ))}

          <footer className="syllabus-footer">
            <p>Ryman Arts Platform · Curriculum Syllabus · 2026</p>
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
