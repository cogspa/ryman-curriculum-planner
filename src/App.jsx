import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { curriculum, config, changelog } from './curriculum.js';
import { assignments } from './assignments.js';
import { supabase } from './supabaseClient.js';

const HOLIDAYS = [
  '2026-07-04', // Independence Day
  '2026-09-05', // Labor Day Weekend
];

function isHoliday(date) {
  const d = new Date(date);
  const iso = d.toISOString().split('T')[0];
  return HOLIDAYS.includes(iso);
}

// ─── date utils ──────────────────────────────────────────────────────────────

function parseLocal(str) {
  const [y, m, d] = str.split('-').map(Number);
  return new Date(y, m - 1, d);
}

function addDays(date, days) {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

function findTuesdayOnOrAfter(date) {
  const d = new Date(date);
  const day = d.getDay();
  const diff = (2 - day + 7) % 7;
  d.setDate(d.getDate() + diff);
  return d;
}

function fmtDate(date) {
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });
}

function fmtMonoDate(date) {
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }).toUpperCase();
}

// ─── persistence ─────────────────────────────────────────────────────────────

const STORAGE_PREFIX = `cp-v${config.storageVersion}-notes-week-`;

function loadNote(weekNum) {
  try {
    return localStorage.getItem(STORAGE_PREFIX + weekNum) || '';
  } catch {
    return '';
  }
}

function saveNote(weekNum, value) {
  try {
    localStorage.setItem(STORAGE_PREFIX + weekNum, value);
  } catch {}
}

// ─── auth gate ───────────────────────────────────────────────────────────────

const AUTH_KEY = 'cp-auth-session';

function LoginGate({ children }) {
  const [authed, setAuthed] = useState(() => {
    try { return localStorage.getItem(AUTH_KEY) === 'true'; } catch { return false; }
  });
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    if (username === 'RYMAN' && password === 'pLAtform100!') {
      setAuthed(true);
      try { localStorage.setItem(AUTH_KEY, 'true'); } catch {}
    } else {
      setError('Invalid credentials');
      setTimeout(() => setError(''), 2500);
    }
  }

  function handleLogout() {
    setAuthed(false);
    try { localStorage.removeItem(AUTH_KEY); } catch {}
  }

  if (authed) return <>{children(handleLogout)}</>;

  return (
    <div className="login-gate">
      <form className="login-form" onSubmit={handleSubmit}>
        <p className="login-eyebrow">2026 · 12-week program</p>
        <h1 className="login-title">Ryman Arts Platform</h1>
        <p className="login-subtitle">Curriculum Planner</p>
        <div className="login-fields">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="username"
            autoFocus
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          />
        </div>
        <button type="submit" className="login-btn">Enter</button>
        {error && <p className="login-error">{error}</p>}
      </form>
    </div>
  );
}

// ─── countdown ──────────────────────────────────────────────────────────────

const SYLLABUS_DEADLINE = new Date('2026-06-15T23:59:59');

function useCountdown(target) {
  const [remaining, setRemaining] = useState(() => target - Date.now());
  useEffect(() => {
    const id = setInterval(() => setRemaining(target - Date.now()), 1000);
    return () => clearInterval(id);
  }, [target]);

  if (remaining <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true };
  const s = Math.floor(remaining / 1000);
  return {
    days: Math.floor(s / 86400),
    hours: Math.floor((s % 86400) / 3600),
    minutes: Math.floor((s % 3600) / 60),
    seconds: s % 60,
    expired: false,
  };
}

function CountdownBanner() {
  const cd = useCountdown(SYLLABUS_DEADLINE.getTime());
  return (
    <Link to="/syllabus" className="countdown-banner">
      <span className="countdown-label">SYLLABUS DUE JUNE 15</span>
      {cd.expired ? (
        <span className="countdown-expired">DEADLINE PASSED</span>
      ) : (
        <div className="countdown-digits">
          <span className="cd-block"><span className="cd-num">{String(cd.days).padStart(2, '0')}</span><span className="cd-unit">days</span></span>
          <span className="cd-sep">:</span>
          <span className="cd-block"><span className="cd-num">{String(cd.hours).padStart(2, '0')}</span><span className="cd-unit">hrs</span></span>
          <span className="cd-sep">:</span>
          <span className="cd-block"><span className="cd-num">{String(cd.minutes).padStart(2, '0')}</span><span className="cd-unit">min</span></span>
          <span className="cd-sep">:</span>
          <span className="cd-block"><span className="cd-num">{String(cd.seconds).padStart(2, '0')}</span><span className="cd-unit">sec</span></span>
        </div>
      )}
      <span className="countdown-cta">View Syllabus →</span>
    </Link>
  );
}

// ─── components ──────────────────────────────────────────────────────────────

function ChangelogBanner() {
  return (
    <div className="changelog-banner">
      <span className="changelog-label">UPDATES</span>
      <div className="changelog-track-wrap">
        <div className="changelog-track">
          {/* duplicate entries for seamless infinite scroll */}
          {[...changelog, ...changelog].map((entry, i) => (
            <span key={i} className="changelog-item">
              <span className="changelog-date">{entry.date}</span>
              <span className="changelog-msg">{entry.message}</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function ChangelogSection() {
  return (
    <section className="changelog-section">
      <h2 className="changelog-section-title">Changelog</h2>
      <p className="changelog-section-subtitle">All curriculum updates in reverse-chronological order</p>
      <div className="changelog-entries">
        {changelog.map((entry, i) => (
          <div key={i} className="changelog-entry">
            <span className="changelog-entry-date">{entry.date}</span>
            <span className="changelog-entry-msg">{entry.message}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function Header({ startDate, setStartDate, totalWeeks }) {
  return (
    <header className="header">
      <div className="header-left">
        <p className="eyebrow">2026 · 12-week program + capstone</p>
        <h1 className="title">Ryman Arts Platform Curriculum Planner</h1>
        <p className="subtitle">
          {config.tuesday.label}s {config.tuesday.time} · {config.tuesday.location}
          <span className="dot">·</span>
          {config.saturday.label}s {config.saturday.time} · {config.saturday.location}
        </p>
      </div>
      <div className="header-right">
        <label className="date-field">
          <span>First Tuesday</span>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </label>
        <div className="counter">
          <span className="counter-num">12</span>
          <span className="counter-label">weeks</span>
          <span className="counter-capstone">+ capstone</span>
        </div>
      </div>
    </header>
  );
}
function NewPill() {
  return <span className="new-pill">NEW</span>;
}

function parseNew(text) {
  if (text.startsWith('[NEW] ')) return { isNew: true, text: text.slice(6) };
  return { isNew: false, text };
}

function BoldText({ text }) {
  const boldRegex = /(\*\*.*?\*\*)/g;
  if (!boldRegex.test(text)) return text;
  const parts = text.split(boldRegex);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i} style={{ fontWeight: '700', color: 'inherit' }}>{part.slice(2, -2)}</strong>;
    }
    return part;
  });
}

function Linkify({ text }) {
  const urlRegex = /(https?:\/\/[^\s,]+)/g;
  const parts = text.split(urlRegex);
  return parts.map((part, i) => {
    if (urlRegex.test(part)) {
      return <a key={i} href={part} target="_blank" rel="noopener noreferrer" className="inline-link">{part}</a>;
    }
    const boldRegex = /(\*\*.*?\*\*)/g;
    if (boldRegex.test(part)) {
      const boldParts = part.split(boldRegex);
      return (
        <span key={i}>
          {boldParts.map((bp, j) => {
            if (bp.startsWith('**') && bp.endsWith('**')) {
              return <strong key={j} style={{ fontWeight: '700', color: 'var(--accent-deep)' }}>{bp.slice(2, -2)}</strong>;
            }
            return bp;
          })}
        </span>
      );
    }
    return part;
  });
}

function Section({ label, items, weekNumber }) {
  if (!items || items.length === 0) return null;
  return (
    <div className="section">
      {(weekNumber === 1 || weekNumber === 2 || weekNumber === 3 || weekNumber === 4 || weekNumber === 5 || weekNumber === 6 || weekNumber === 7) && (label === 'Topics' || label === 'Readings') ? (
        <Link to={`/week/0${weekNumber}`} className="section-label-link">
          {label} <span style={{ fontSize: '0.85em', opacity: 0.8 }}>[VIEW ALL →]</span>
        </Link>
      ) : (
        <p className="section-label">{label}</p>
      )}
      <ul className="section-list">
        {items.map((item, i) => {
          const { isNew, text } = parseNew(item);

          let linkPath = null;
          let isExternal = false;
          if (weekNumber === 1 && label === 'Topics') {
            const cleanText = text.trim().toLowerCase();
            if (cleanText.includes('canvas') && cleanText.includes('pixels')) {
              linkPath = '/week/01/digital-vs-physical-canvas';
            } else if (cleanText.includes('origin') && cleanText.includes('pixel')) {
              linkPath = '/week/01/origin-of-pixel';
            } else if (cleanText.includes('elements') && cleanText.includes('principles')) {
              linkPath = '/week/01/elements-vs-principles';
            } else if (cleanText.includes('resolution')) {
              linkPath = '/week/01/resolution-and-quality';
            } else if (cleanText.includes('value') && cleanText.includes('composition')) {
              linkPath = '/week/01/value-composition-gesture-form';
            } else if (cleanText.includes('side-topic') || cleanText.includes('wacom')) {
              linkPath = '/week/01/workflow-fundamentals';
            }
          } else if (weekNumber === 2 && label === 'Topics') {
            const cleanText = text.trim().toLowerCase();
            if (cleanText.includes('brush engine') || cleanText.includes('hardness')) {
              linkPath = '/week/02/brush-engine-deep-dive';
            } else if (cleanText.includes('custom brush') || cleanText.includes('define brush')) {
              linkPath = '/week/02/custom-brush-creation';
            } else if (cleanText.includes('procedural')) {
              linkPath = '/week/02/procedural-vs-non-procedural';
            } else if (cleanText.includes('blend modes') || cleanText.includes('overlay')) {
              linkPath = '/week/02/blend-modes-for-texture';
            } else if (cleanText.includes('canvas simulation') || cleanText.includes('perlin')) {
              linkPath = '/week/02/canvas-simulation';
            }
          } else if (weekNumber === 2 && label === 'Readings') {
            const cleanText = text.trim().toLowerCase();
            if (cleanText.includes('defining brushes')) {
              linkPath = '/week/02/custom-brush-creation';
            } else if (cleanText.includes('painting in photoshop')) {
              linkPath = '/week/02/brush-engine-deep-dive';
            } else if (cleanText.includes('what is pattern') || cleanText.includes('noise vs. pattern')) {
              linkPath = '/week/02/procedural-vs-non-procedural';
            } else if (cleanText.includes('perlin/fractal noise') || cleanText.includes('cellular/worley noise')) {
              linkPath = '/week/02/canvas-simulation';
            } else if (cleanText.includes('cracked earth')) {
              linkPath = '/week/02/canvas-simulation';
            } else if (cleanText.includes('what are blend modes')) {
              linkPath = '/week/02/blend-modes-for-texture';
            } else if (cleanText.includes('the book of shaders') || cleanText.includes('shaders.com')) {
              linkPath = 'https://thebookofshaders.com/12/';
              isExternal = true;
            }
          } else if (weekNumber === 3 && label === 'Topics') {
            const cleanText = text.trim().toLowerCase();
            if (cleanText.includes('glazing') || cleanText.includes('digital layering')) {
              linkPath = '/week/03/glazing-vs-digital-layering';
            } else if (cleanText.includes('blending modes')) {
              linkPath = '/week/03/blending-modes';
            } else if (cleanText.includes('cinematic lighting')) {
              linkPath = '/week/03/cinematic-lighting';
            } else if (cleanText.includes('atmospheric perspective')) {
              linkPath = '/week/03/atmospheric-perspective';
            } else if (cleanText.includes('masking') || cleanText.includes('selections')) {
              linkPath = '/week/03/masking-and-selections';
            } else if (cleanText.includes('photo compositing')) {
              linkPath = '/week/03/photo-compositing';
            } else if (cleanText.includes('realistic lighting') || cleanText.includes('adjustments')) {
              linkPath = '/week/03/realistic-lighting-adjustments';
            }
          } else if (weekNumber === 4 && label === 'Topics') {
            const cleanText = text.trim().toLowerCase();
            if (cleanText.includes('designing for social') || cleanText.includes('platforms')) {
              linkPath = '/week/04/designing-for-platforms';
            } else if (cleanText.includes('cropping') || cleanText.includes('framing')) {
              linkPath = '/week/04/cropping-and-framing';
            } else if (cleanText.includes('scalable')) {
              linkPath = '/week/04/scalable-artwork';
            } else if (cleanText.includes('exporting')) {
              linkPath = '/week/04/exporting-multiple-formats';
            }
          } else if (weekNumber === 4 && label === 'Readings') {
            const cleanText = text.trim().toLowerCase();
            if (cleanText.includes('illustrator')) {
              linkPath = '/week/04/illustrator-intro';
            } else if (cleanText.includes('indesign')) {
              linkPath = '/week/04/indesign-intro';
            }
          } else if (weekNumber === 5 && label === 'Topics') {
            const cleanText = text.trim().toLowerCase();
            if (cleanText.includes('character') && cleanText.includes('development')) {
              linkPath = '/week/05/character-development';
            } else if (cleanText.includes('environmental') && cleanText.includes('storytelling')) {
              linkPath = '/week/05/environmental-storytelling';
            } else if (cleanText.includes('sequential') && cleanText.includes('thinking')) {
              linkPath = '/week/05/sequential-thinking';
            } else if (cleanText.includes('storyboarding') && cleanText.includes('fundamentals')) {
              linkPath = '/week/05/storyboarding-fundamentals';
            }
          } else if (weekNumber === 6 && label === 'Topics') {
            const cleanText = text.trim().toLowerCase();
            if (cleanText.includes('book covers') || cleanText.includes('key art')) {
              linkPath = '/week/06/book-covers-and-key-art';
            } else if (cleanText.includes('integrated ad') || cleanText.includes('campaigns')) {
              linkPath = '/week/06/integrated-ad-campaigns';
            } else if (cleanText.includes('asset management') || cleanText.includes('libraries')) {
              linkPath = '/week/06/asset-management-cc-libraries';
            } else if (cleanText.includes('commercial brief') || cleanText.includes('pitching')) {
              linkPath = '/week/06/the-commercial-brief';
            }
          } else if (weekNumber === 6 && label === 'Readings') {
            const cleanText = text.trim().toLowerCase();
            if (cleanText.includes('layout engineering')) {
              linkPath = '/week/06/book-covers-and-key-art';
            } else if (cleanText.includes('brand architecture')) {
              linkPath = '/week/06/asset-management-cc-libraries';
            } else if (cleanText.includes('visual pitching')) {
              linkPath = '/week/06/the-commercial-brief';
            }
          } else if (weekNumber === 7 && label === 'Topics') {
            const cleanText = text.trim().toLowerCase();
            if (cleanText.includes('concept art')) {
              linkPath = '/week/07/concept-art-track';
            } else if (cleanText.includes('poster series')) {
              linkPath = '/week/07/poster-series-track';
            } else if (cleanText.includes('storyboards') || cleanText.includes('sequential')) {
              linkPath = '/week/07/storyboard-track';
            } else if (cleanText.includes('book cover') || cleanText.includes('children')) {
              linkPath = '/week/07/book-cover-track';
            }
          }

          return (
            <li key={i} className={isNew ? 'is-new' : ''}>
              {isNew && <NewPill />}
              {linkPath ? (
                isExternal ? (
                  <a href={linkPath} target="_blank" rel="noopener noreferrer" className="topic-direct-link">
                    <BoldText text={text} /> <span className="topic-arrow">↗</span>
                  </a>
                ) : (
                  <Link to={linkPath} className="topic-direct-link">
                    <BoldText text={text} /> <span className="topic-arrow">→</span>
                  </Link>
                )
              ) : (
                <Linkify text={text} />
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function WeekCard({ week, tuesday, saturday, isCapstone, index }) {
  const [notes, setNotes] = useState(() => loadNote(week.week));
  const [savedAt, setSavedAt] = useState(null);
  const [syncStatus, setSyncStatus] = useState(supabase ? 'connecting...' : null);

  // Fetch initial notes from Supabase (if connected)
  useEffect(() => {
    if (!supabase) return;
    let isMounted = true;
    supabase
      .from('notes')
      .select('content')
      .eq('week_number', week.week)
      .single()
      .then(({ data, error }) => {
        if (!isMounted) return;
        if (data && !error) {
          setNotes(data.content || '');
          saveNote(week.week, data.content || '');
        }
        setSyncStatus(null);
      })
      .catch(() => {
        if (isMounted) setSyncStatus(null);
      });
    return () => { isMounted = false; };
  }, [week.week]);

  // Save notes locally and remotely
  useEffect(() => {
    const t = setTimeout(async () => {
      // Always save locally first
      saveNote(week.week, notes);
      setSavedAt(Date.now());
      
      // Then try cloud sync
      if (supabase) {
        try {
          setSyncStatus('syncing...');
          const { error } = await supabase
            .from('notes')
            .upsert({ week_number: week.week, content: notes });
          setSyncStatus(error ? 'sync error — saved locally' : 'cloud saved');
        } catch {
          setSyncStatus('offline — saved locally');
        }
        setTimeout(() => setSyncStatus(null), 2500);
      }
    }, 800);
    return () => clearTimeout(t);
  }, [notes, week.week]);

  const rangeLabel = week.dateOverride
    ? week.dateOverride.toUpperCase()
    : `${fmtMonoDate(tuesday)} – ${fmtMonoDate(saturday)}`;
  const hasContent = week.overview || week.topics?.length || week.readings?.length || week.assignments?.length;

  return (
    <article
      className={`card${isCapstone ? ' card-capstone' : ''}`}
      style={{ animationDelay: `${index * 40}ms` }}
    >
      <div className="card-head">
        <span className="week-num">Week {String(week.week).padStart(2, '0')}</span>
        <span className="week-range">{rangeLabel}</span>
      </div>

      <h2 className="card-title">{week.title}</h2>

      {week.dateOverride ? (
        <div className="sessions">
          <div className="session">
            <span className="session-meta" style={{ gridColumn: 'span 3' }}>{week.dateOverride}</span>
          </div>
        </div>
      ) : (
        <div className="sessions">
          <div className="session">
            <span className="session-day">Tue</span>
            <span className="session-date">{fmtDate(tuesday)}</span>
            <span className="session-meta">{config.tuesday.time} · {config.tuesday.location}</span>
          </div>
          <div className="session">
            <span className="session-day">Sat</span>
            <span className="session-date">{fmtDate(saturday)}</span>
            {isHoliday(saturday) ? (
              <span className="session-meta holiday">⛔ NO CLASS — HOLIDAY</span>
            ) : (
              <span className="session-meta">{config.saturday.time} · {config.saturday.location}</span>
            )}
          </div>
        </div>
      )}

      {hasContent && (
        <div className="curriculum-content">
          {week.overview && (
            <p className="overview">
              {week.week === 7 ? (
                <Link to="/week/07/client-simulation-overview" className="overview-link">
                  {week.overview} <span style={{ fontSize: '0.85em', opacity: 0.8 }}>[READ BRIEF FRAMEWORK →]</span>
                </Link>
              ) : (
                week.overview
              )}
            </p>
          )}

          {week.tuesday || week.saturday ? (
            <div className="session-splits" style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '16px' }}>
              {week.tuesday && (
                <div className="session-split-block tuesday-block" style={{ borderLeft: '3px solid #ec4899', paddingLeft: '14px', background: 'rgba(236, 72, 153, 0.07)', borderRadius: '8px', paddingBottom: '8px', paddingTop: '8px', paddingRight: '8px' }}>
                  <h4 style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.12em', color: '#db2777', margin: '0 0 10px 0', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    📅 Tuesday Session — Zoom Preview & Discussion
                  </h4>
                  <Section label="Topics" items={week.tuesday.topics} weekNumber={week.week} />
                  <Section label="Readings" items={week.tuesday.readings} weekNumber={week.week} />
                  
                  <div className="speaker-box" style={{ borderLeft: '3px solid #10b981', paddingLeft: '10px', background: 'rgba(16, 185, 129, 0.08)', borderRadius: '6px', paddingBottom: '6px', paddingTop: '6px', marginTop: '10px', fontSize: '12px', color: '#059669', fontFamily: 'var(--font-mono)', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span>🎤 Speaker for Week {week.week}: TBD</span>
                  </div>
                </div>
              )}
              {week.saturday && (
                <div className="session-split-block saturday-block" style={{ borderLeft: '3px solid var(--accent)', paddingLeft: '14px', background: 'rgba(168, 72, 42, 0.03)', paddingBottom: '4px', paddingTop: '4px' }}>
                  <h4 style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--accent-deep)', margin: '0 0 10px 0', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    🎨 Saturday Session — Studio Workshop
                  </h4>
                  <Section label="Topics" items={week.saturday.topics} weekNumber={week.week} />
                  {week.saturday.assignments?.length > 0 && (
                    <div className="section assignment-section" style={{ borderLeft: '3px solid #06b6d4', paddingLeft: '14px', background: 'rgba(6, 182, 212, 0.07)', borderRadius: '8px', paddingBottom: '8px', paddingTop: '8px', paddingRight: '8px', marginTop: '10px' }}>
                      <p className="section-label" style={{ color: '#0891b2', fontWeight: 'bold', marginBottom: '8px' }}>Assignments</p>
                      <ul className="section-list">
                        {week.saturday.assignments.map((rawItem, i) => {
                          const { isNew, text } = parseNew(rawItem);
                          return (
                            <li key={i} className={isNew ? 'is-new' : ''}>
                              {isNew && <NewPill />}
                              {week.week === 5 ? (
                                <Link to="/week/05/three-panel-assignment" className="assignment-link">
                                  <BoldText text={text} />
                                  <span className="assignment-arrow assignment-arrow--pill">VIEW FULL WORKFLOW BRIEF →</span>
                                </Link>
                              ) : week.week === 6 ? (
                                <Link to="/week/06/commercial-campaign-assignment" className="assignment-link">
                                  <BoldText text={text} />
                                  <span className="assignment-arrow assignment-arrow--pill">VIEW FULL WORKFLOW BRIEF →</span>
                                </Link>
                              ) : assignments[week.week] ? (
                                <Link to={`/assignment/${week.week}`} className="assignment-link">
                                  <BoldText text={text} />
                                  <span className="assignment-arrow assignment-arrow--pill">VIEW FULL ASSIGNMENT →</span>
                                </Link>
                              ) : (
                                <Linkify text={text} />
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
              <Section label="Topics" items={week.topics} weekNumber={week.week} />
              <Section label="Readings" items={week.readings} weekNumber={week.week} />
              {week.assignments?.length > 0 && (
                <div className="section">
                  <p className="section-label">Assignments</p>
                  <ul className="section-list">
                    {week.assignments.map((rawItem, i) => {
                      const { isNew, text } = parseNew(rawItem);
                      return (
                        <li key={i} className={isNew ? 'is-new' : ''}>
                          {isNew && <NewPill />}
                          {week.week === 5 ? (
                            <Link to="/week/05/three-panel-assignment" className="assignment-link">
                              <BoldText text={text} />
                              <span className="assignment-arrow assignment-arrow--pill">VIEW FULL WORKFLOW BRIEF →</span>
                            </Link>
                          ) : week.week === 6 ? (
                            <Link to="/week/06/commercial-campaign-assignment" className="assignment-link">
                              <BoldText text={text} />
                              <span className="assignment-arrow assignment-arrow--pill">VIEW FULL WORKFLOW BRIEF →</span>
                            </Link>
                          ) : assignments[week.week] ? (
                            <Link to={`/assignment/${week.week}`} className="assignment-link">
                              <BoldText text={text} />
                              <span className="assignment-arrow assignment-arrow--pill">VIEW FULL ASSIGNMENT →</span>
                            </Link>
                          ) : (
                            <Linkify text={text} />
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
            </>
          )}
        </div>
      )}

      <div className="notes-wrap">
        <label className="notes-label" htmlFor={`notes-${week.week}`}>Your notes</label>
        <textarea
          id={`notes-${week.week}`}
          className="notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Prep, reflections, references, links…"
          rows={6}
        />
        <div className="save-row">
          {syncStatus ? (
            <span className="saved">{syncStatus}</span>
          ) : savedAt ? (
            <span className="saved">local save</span>
          ) : null}
        </div>
      </div>

      {isCapstone && (
        <div className="capstone-banner">
          {config.capstoneNote}
        </div>
      )}
    </article>
  );
}

// ─── app ─────────────────────────────────────────────────────────────────────

export default function App() {
  const [startDate, setStartDate] = useState(config.startDate);

  const weeks = useMemo(() => {
    const start = parseLocal(startDate);
    const firstTue = findTuesdayOnOrAfter(start);
    return curriculum.map((entry, idx) => {
      const tue = addDays(firstTue, idx * 7);
      const sat = addDays(tue, 4);
      return { entry, tuesday: tue, saturday: sat };
    });
  }, [startDate]);

  return (
    <LoginGate>
      {(handleLogout) => (
        <div className="app">
          <CountdownBanner />
          <ChangelogBanner />
          <div className="container">
            <Header
              startDate={startDate}
              setStartDate={setStartDate}
              totalWeeks={weeks.length}
            />
            <div className="logout-row">
              <button className="logout-btn" onClick={handleLogout}>Sign out</button>
            </div>
            <main className="grid">
              {weeks.map(({ entry, tuesday, saturday }, idx) => (
                <WeekCard
                  key={entry.week}
                  week={entry}
                  tuesday={tuesday}
                  saturday={saturday}
                  isCapstone={idx === weeks.length - 1}
                  index={idx}
                />
              ))}
            </main>
            <ChangelogSection />
            <footer className="footer">
              <p>Notes save automatically to this browser. Edit <code>src/curriculum.js</code> to update titles and content.</p>
            </footer>
          </div>
        </div>
      )}
    </LoginGate>
  );
}
