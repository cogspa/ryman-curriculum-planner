import { useEffect, useMemo, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { curriculum, config, changelog } from './curriculum.js';
import { assignments } from './assignments.js';
import { supabase } from './supabaseClient.js';
import {
  loadLocalCurriculum,
  saveLocalCurriculum,
  resetLocalCurriculum,
  fetchRemoteCurriculum,
  syncRemoteCurriculum,
  clearRemoteCurriculum
} from './curriculumService.js';


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
    13: { name: 'TBD', date: formatDate(tuesdayDate) }
  };
  return speakersMap[weekNum] || { name: 'TBD', date: formatDate(tuesdayDate) };
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
        <h1 className="login-title">Ryman Arts pLAtform</h1>
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
      <span className="countdown-label">LATEST SYLLABUS</span>
      {cd.expired ? (
        <span className="countdown-expired">UPDATED JUNE 18</span>
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
        <h1 className="title" style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '10px 14px', margin: '0 0 16px', lineHeight: '1.2' }}>
          <img 
            src="https://images.squarespace-cdn.com/content/v1/67806c279fb734295979b37e/9e044490-3bd2-4589-a460-cbabd7c93b35/Ryman_Arts_Logo_No_Tagline.png" 
            alt="Ryman Arts Logo" 
            style={{ height: '48px', width: 'auto', display: 'inline-block', verticalAlign: 'middle' }} 
          />
          <span style={{ display: 'inline-block', verticalAlign: 'middle' }}>pLAtform Curriculum Planner</span>
        </h1>
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
      ) : label === 'Assignments' ? (
        <Link to="/assignments" className="section-label-link">
          {label} <span style={{ fontSize: '0.85em', opacity: 0.8 }}>[VIEW HUB →]</span>
        </Link>
      ) : (
        <p className="section-label">{label}</p>
      )}
      <ul className="section-list">
        {items.map((item, i) => {
          const { isNew, text } = parseNew(item);

          let linkPath = null;
          let isExternal = false;
          if (label === 'Assignments' && [1, 3, 5, 7, 9, 10].includes(weekNumber)) {
            const cleanText = text.toLowerCase();
            if (cleanText.includes('base assignment') || cleanText.includes('base')) {
              linkPath = `/assignment/${weekNumber}?track=beginner`;
            } else if (cleanText.includes('next level') || cleanText.includes('take it')) {
              linkPath = `/assignment/${weekNumber}?track=intermediate`;
            } else if (cleanText.includes('3d integration') || cleanText.includes('3d')) {
              linkPath = `/assignment/${weekNumber}?track=advanced`;
            } else {
              linkPath = `/assignment/${weekNumber}`;
            }
          }
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
            } else if (cleanText.includes('biomorphic') || cleanText.includes('metaball')) {
              linkPath = '/week/01/biomorphic-shapes-metaballs';
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

function DropIndicator({ onDrop, active }) {
  const [dragOver, setDragOver] = useState(false);

  return (
    <div
      className={`drop-indicator ${active ? 'active' : ''} ${dragOver ? 'drag-over' : ''}`}
      onDragOver={(e) => {
        e.preventDefault();
        setDragOver(true);
      }}
      onDragEnter={(e) => {
        e.preventDefault();
        setDragOver(true);
      }}
      onDragLeave={() => setDragOver(false)}
      onDrop={(e) => {
        e.preventDefault();
        setDragOver(false);
        onDrop();
      }}
    />
  );
}

function EmptyDropZone({ onDrop, active }) {
  const [dragOver, setDragOver] = useState(false);

  return (
    <div
      className={`empty-drop-zone ${active ? 'active' : ''} ${dragOver ? 'drag-over' : ''}`}
      onDragOver={(e) => {
        e.preventDefault();
        setDragOver(true);
      }}
      onDragEnter={(e) => {
        e.preventDefault();
        setDragOver(true);
      }}
      onDragLeave={() => setDragOver(false)}
      onDrop={(e) => {
        e.preventDefault();
        setDragOver(false);
        onDrop();
      }}
    >
      Drag items here
    </div>
  );
}

function EditableSection({
  label,
  items = [],
  weekIndex,
  session,
  section,
  adminMode,
  onUpdateItem,
  onDeleteItem,
  onAddItem,
  onDragStart,
  onDragEnd,
  onDrop,
  weekNumber,
  isDraggingActive
}) {
  if (!adminMode) {
    if (!items || items.length === 0) return null;
    return <Section label={label} items={items} weekNumber={weekNumber} />;
  }

  return (
    <div className="section admin-section-edit" style={{ marginBottom: '14px' }}>
      <p className="section-label" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span>{label}</span>
      </p>
      
      <div className="section-list-edit">
        {!items || items.length === 0 ? (
          <EmptyDropZone active={isDraggingActive} onDrop={() => onDrop(0)} />
        ) : (
          <>
            {items.map((item, i) => (
              <div key={i}>
                <DropIndicator active={isDraggingActive} onDrop={() => onDrop(i)} />
                <div
                  className="edit-item-row"
                  draggable
                  onDragStart={(e) => {
                    e.dataTransfer.effectAllowed = 'move';
                    e.dataTransfer.setData('text/plain', ''); // Required for Safari/Firefox DND trigger
                    onDragStart(i);
                  }}
                  onDragEnd={onDragEnd}
                >
                  <span className="drag-handle" title="Drag to reorder">⋮⋮</span>
                  <input
                    type="text"
                    className="edit-item-input"
                    value={item}
                    onChange={(e) => onUpdateItem(i, e.target.value)}
                    placeholder={`New ${label.slice(0, -1)}...`}
                  />
                  <button
                    type="button"
                    className="delete-item-btn"
                    onClick={() => onDeleteItem(i)}
                    title="Delete item"
                  >
                    ×
                  </button>
                </div>
              </div>
            ))}
            <DropIndicator active={isDraggingActive} onDrop={() => onDrop(items.length)} />
          </>
        )}
      </div>
      
      <button type="button" className="add-item-btn" onClick={onAddItem}>
        ＋ Add {label.slice(0, -1)}
      </button>
    </div>
  );
}



function WeekCard({
  week,
  tuesday,
  saturday,
  isCapstone,
  index,
  adminMode,
  onUpdateWeek,
  onUpdateItem,
  onDeleteItem,
  onAddItem,
  onDragStart,
  onDragEnd,
  onDrop,
  isDraggingActive
}) {
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

      {adminMode ? (
        <input
          type="text"
          className="edit-title-input"
          value={week.title}
          onChange={(e) => onUpdateWeek(week.week, { title: e.target.value })}
          placeholder="Week Title"
        />
      ) : (
        <h2 className="card-title">{week.title}</h2>
      )}

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

      {(hasContent || adminMode) && (
        <div className="curriculum-content">
          {adminMode ? (
            <textarea
              className="edit-overview-textarea"
              value={week.overview || ''}
              onChange={(e) => onUpdateWeek(week.week, { overview: e.target.value })}
              placeholder="Week Overview"
            />
          ) : (
            week.overview && (
              <p className="overview">
                {week.week === 7 ? (
                  <Link to="/week/07/client-simulation-overview" className="overview-link">
                    {week.overview} <span style={{ fontSize: '0.85em', opacity: 0.8 }}>[READ BRIEF FRAMEWORK →]</span>
                  </Link>
                ) : (
                  week.overview
                )}
              </p>
            )
          )}

          {week.tuesday || week.saturday ? (
            <div className="session-splits" style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '16px' }}>
              {week.tuesday && (
                <div className="session-split-block tuesday-block" style={{ borderLeft: '3px solid #ec4899', paddingLeft: '14px', background: 'rgba(236, 72, 153, 0.07)', borderRadius: '8px', paddingBottom: '8px', paddingTop: '8px', paddingRight: '8px' }}>
                  <h4 style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.12em', color: '#db2777', margin: '0 0 10px 0', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    📅 Tuesday Session — Zoom Preview & Discussion
                  </h4>
                  <EditableSection
                    label="Topics"
                    items={week.tuesday.topics}
                    weekIndex={index}
                    session="tuesday"
                    section="topics"
                    adminMode={adminMode}
                    onUpdateItem={(itemIdx, val) => onUpdateItem(index, 'tuesday', 'topics', itemIdx, val)}
                    onDeleteItem={(itemIdx) => onDeleteItem(index, 'tuesday', 'topics', itemIdx)}
                    onAddItem={() => onAddItem(index, 'tuesday', 'topics')}
                    onDragStart={(itemIdx) => onDragStart(index, 'tuesday', 'topics', itemIdx)}
                    onDragEnd={onDragEnd}
                    onDrop={(itemIdx) => onDrop(index, 'tuesday', 'topics', itemIdx)}
                    weekNumber={week.week}
                    isDraggingActive={isDraggingActive}
                  />
                  <EditableSection
                    label="Readings"
                    items={week.tuesday.readings}
                    weekIndex={index}
                    session="tuesday"
                    section="readings"
                    adminMode={adminMode}
                    onUpdateItem={(itemIdx, val) => onUpdateItem(index, 'tuesday', 'readings', itemIdx, val)}
                    onDeleteItem={(itemIdx) => onDeleteItem(index, 'tuesday', 'readings', itemIdx)}
                    onAddItem={() => onAddItem(index, 'tuesday', 'readings')}
                    onDragStart={(itemIdx) => onDragStart(index, 'tuesday', 'readings', itemIdx)}
                    onDragEnd={onDragEnd}
                    onDrop={(itemIdx) => onDrop(index, 'tuesday', 'readings', itemIdx)}
                    weekNumber={week.week}
                    isDraggingActive={isDraggingActive}
                  />
                  
                  <div className="speaker-box" style={{ borderLeft: '3px solid #10b981', paddingLeft: '10px', background: 'rgba(16, 185, 129, 0.08)', borderRadius: '6px', paddingBottom: '6px', paddingTop: '6px', marginTop: '10px', fontSize: '12px', color: '#059669', fontFamily: 'var(--font-mono)', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span>🎤 Speaker: {getSpeakerInfoForWeek(week.week, tuesday, saturday).name} · {getSpeakerInfoForWeek(week.week, tuesday, saturday).date}</span>
                  </div>
                </div>
              )}
              {week.saturday && (
                <div className="session-split-block saturday-block" style={{ borderLeft: '3px solid var(--accent)', paddingLeft: '14px', background: 'rgba(168, 72, 42, 0.03)', paddingBottom: '4px', paddingTop: '4px' }}>
                  <h4 style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--accent-deep)', margin: '0 0 10px 0', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    🎨 Saturday Session — Studio Workshop
                  </h4>
                  <EditableSection
                    label="Topics"
                    items={week.saturday.topics}
                    weekIndex={index}
                    session="saturday"
                    section="topics"
                    adminMode={adminMode}
                    onUpdateItem={(itemIdx, val) => onUpdateItem(index, 'saturday', 'topics', itemIdx, val)}
                    onDeleteItem={(itemIdx) => onDeleteItem(index, 'saturday', 'topics', itemIdx)}
                    onAddItem={() => onAddItem(index, 'saturday', 'topics')}
                    onDragStart={(itemIdx) => onDragStart(index, 'saturday', 'topics', itemIdx)}
                    onDragEnd={onDragEnd}
                    onDrop={(itemIdx) => onDrop(index, 'saturday', 'topics', itemIdx)}
                    weekNumber={week.week}
                    isDraggingActive={isDraggingActive}
                  />
                  <EditableSection
                    label="Assignments"
                    items={week.saturday.assignments}
                    weekIndex={index}
                    session="saturday"
                    section="assignments"
                    adminMode={adminMode}
                    onUpdateItem={(itemIdx, val) => onUpdateItem(index, 'saturday', 'assignments', itemIdx, val)}
                    onDeleteItem={(itemIdx) => onDeleteItem(index, 'saturday', 'assignments', itemIdx)}
                    onAddItem={() => onAddItem(index, 'saturday', 'assignments')}
                    onDragStart={(itemIdx) => onDragStart(index, 'saturday', 'assignments', itemIdx)}
                    onDragEnd={onDragEnd}
                    onDrop={(itemIdx) => onDrop(index, 'saturday', 'assignments', itemIdx)}
                    weekNumber={week.week}
                    isDraggingActive={isDraggingActive}
                  />
                </div>
              )}
            </div>
          ) : (
            <>
              <EditableSection
                label="Topics"
                items={week.topics}
                weekIndex={index}
                session={null}
                section="topics"
                adminMode={adminMode}
                onUpdateItem={(itemIdx, val) => onUpdateItem(index, null, 'topics', itemIdx, val)}
                onDeleteItem={(itemIdx) => onDeleteItem(index, null, 'topics', itemIdx)}
                onAddItem={() => onAddItem(index, null, 'topics')}
                onDragStart={(itemIdx) => onDragStart(index, null, 'topics', itemIdx)}
                onDragEnd={onDragEnd}
                onDrop={(itemIdx) => onDrop(index, null, 'topics', itemIdx)}
                weekNumber={week.week}
                isDraggingActive={isDraggingActive}
              />
              <EditableSection
                label="Readings"
                items={week.readings}
                weekIndex={index}
                session={null}
                section="readings"
                adminMode={adminMode}
                onUpdateItem={(itemIdx, val) => onUpdateItem(index, null, 'readings', itemIdx, val)}
                onDeleteItem={(itemIdx) => onDeleteItem(index, null, 'readings', itemIdx)}
                onAddItem={() => onAddItem(index, null, 'readings')}
                onDragStart={(itemIdx) => onDragStart(index, null, 'readings', itemIdx)}
                onDragEnd={onDragEnd}
                onDrop={(itemIdx) => onDrop(index, null, 'readings', itemIdx)}
                weekNumber={week.week}
                isDraggingActive={isDraggingActive}
              />
              <EditableSection
                label="Assignments"
                items={week.assignments}
                weekIndex={index}
                session={null}
                section="assignments"
                adminMode={adminMode}
                onUpdateItem={(itemIdx, val) => onUpdateItem(index, null, 'assignments', itemIdx, val)}
                onDeleteItem={(itemIdx) => onDeleteItem(index, null, 'assignments', itemIdx)}
                onAddItem={() => onAddItem(index, null, 'assignments')}
                onDragStart={(itemIdx) => onDragStart(index, null, 'assignments', itemIdx)}
                onDragEnd={onDragEnd}
                onDrop={(itemIdx) => onDrop(index, null, 'assignments', itemIdx)}
                weekNumber={week.week}
                isDraggingActive={isDraggingActive}
              />
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
  const [startDate, setStartDate] = useState(() => {
    try {
      return localStorage.getItem('cp-start-date') || config.startDate;
    } catch {
      return config.startDate;
    }
  });
  const [customCurriculum, setCustomCurriculum] = useState(() => loadLocalCurriculum());
  const [adminMode, setAdminMode] = useState(false);
  const [draggedItem, setDraggedItem] = useState(null);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [saveStatus, setSaveStatus] = useState(null);
  const userHasEdited = useRef(false);

  useEffect(() => {
    try {
      localStorage.setItem('cp-start-date', startDate);
    } catch (e) {
      console.error('Failed to save start date locally:', e);
    }
  }, [startDate]);

  // Sync from Supabase on load if available
  useEffect(() => {
    if (supabase) {
      setSaveStatus('connecting to cloud...');
      fetchRemoteCurriculum().then((remoteObj) => {
        if (remoteObj && remoteObj.data) {
          const localUpdated = parseInt(localStorage.getItem('cp-custom-curriculum-updated') || '0', 10);
          if (remoteObj.updated > localUpdated) {
            setCustomCurriculum(remoteObj.data);
            localStorage.setItem('cp-custom-curriculum', JSON.stringify(remoteObj.data));
            localStorage.setItem('cp-custom-curriculum-updated', remoteObj.updated.toString());
            setSaveStatus('cloud loaded');
          } else {
            setSaveStatus('local state is newer');
          }
        } else {
          setSaveStatus('using local state');
        }
        setTimeout(() => setSaveStatus(null), 2500);
      }).catch(() => {
        setSaveStatus('offline mode');
        setTimeout(() => setSaveStatus(null), 2500);
      });
    }
  }, []);

  // Save locally instantly on change
  useEffect(() => {
    // Only run if the user has actually made an edit (prevents mount-time overrides)
    if (userHasEdited.current) {
      saveLocalCurriculum(customCurriculum);
    }
  }, [customCurriculum]);

  // Sync to database with debounce
  useEffect(() => {
    if (!supabase || !userHasEdited.current) return;
    const t = setTimeout(async () => {
      try {
        setSaveStatus('syncing to cloud...');
        await syncRemoteCurriculum(customCurriculum);
        setSaveStatus('cloud synced');
      } catch {
        setSaveStatus('saved locally (offline)');
      }
      setTimeout(() => setSaveStatus(null), 2000);
    }, 1500);
    
    return () => clearTimeout(t);
  }, [customCurriculum]);



  const weeks = useMemo(() => {
    const start = parseLocal(startDate);
    const firstTue = findTuesdayOnOrAfter(start);
    return customCurriculum.map((entry, idx) => {
      const tue = addDays(firstTue, idx * 7);
      const sat = addDays(tue, 4);
      return { entry, tuesday: tue, saturday: sat };
    });
  }, [startDate, customCurriculum]);

  // Curriculum Edit Handlers
  const handleUpdateWeek = (weekNum, updatedFields) => {
    userHasEdited.current = true;
    setCustomCurriculum((prev) =>
      prev.map((w) => (w.week === weekNum ? { ...w, ...updatedFields } : w))
    );
  };

  const handleUpdateItem = (weekIndex, session, section, itemIndex, newText) => {
    userHasEdited.current = true;
    setCustomCurriculum((prev) => {
      const next = JSON.parse(JSON.stringify(prev));
      const weekData = next[weekIndex];
      const list = session ? weekData[session][section] : weekData[section];
      list[itemIndex] = newText;
      return next;
    });
  };

  const handleDeleteItem = (weekIndex, session, section, itemIndex) => {
    userHasEdited.current = true;
    setCustomCurriculum((prev) => {
      const next = JSON.parse(JSON.stringify(prev));
      const weekData = next[weekIndex];
      const list = session ? weekData[session][section] : weekData[section];
      list.splice(itemIndex, 1);
      return next;
    });
  };

  const handleAddItem = (weekIndex, session, section) => {
    userHasEdited.current = true;
    setCustomCurriculum((prev) => {
      const next = JSON.parse(JSON.stringify(prev));
      const weekData = next[weekIndex];
      if (session) {
        if (!weekData[session]) {
          weekData[session] = { topics: [], readings: [], assignments: [] };
        }
        if (!weekData[session][section]) {
          weekData[session][section] = [];
        }
      } else {
        if (!weekData[section]) {
          weekData[section] = [];
        }
      }
      const list = session ? weekData[session][section] : weekData[section];
      list.push('');
      return next;
    });
  };

  // Drag & Drop handlers
  const handleDragStart = (weekIndex, session, section, itemIndex) => {
    setDraggedItem({ weekIndex, session, section, itemIndex });
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
  };

  const handleDrop = (targetWeekIndex, targetSession, targetSection, targetItemIndex) => {
    if (!draggedItem) return;
    userHasEdited.current = true;

    const { weekIndex: srcWeekIdx, session: srcSession, section: srcSection, itemIndex: srcItemIdx } = draggedItem;

    // Clone custom curriculum
    const nextCurriculum = JSON.parse(JSON.stringify(customCurriculum));

    // Get source list
    const srcWeek = nextCurriculum[srcWeekIdx];
    const srcList = srcSession ? srcWeek[srcSession][srcSection] : srcWeek[srcSection];
    if (!srcList) return;

    // Remove item from source
    const [draggedText] = srcList.splice(srcItemIdx, 1);

    // Get target list
    const targetWeek = nextCurriculum[targetWeekIndex];
    if (targetSession) {
      if (!targetWeek[targetSession]) {
        targetWeek[targetSession] = { topics: [], readings: [], assignments: [] };
      }
      if (!targetWeek[targetSession][targetSection]) {
        targetWeek[targetSession][targetSection] = [];
      }
    } else {
      if (!targetWeek[targetSection]) {
        targetWeek[targetSection] = [];
      }
    }
    const targetList = targetSession ? targetWeek[targetSession][targetSection] : targetWeek[targetSection];

    // Adjust target index if dropping in same list after source index
    let insertIdx = targetItemIndex;
    if (srcWeekIdx === targetWeekIndex && srcSession === targetSession && srcSection === targetSection) {
      if (srcItemIdx < targetItemIndex) {
        insertIdx = targetItemIndex - 1;
      }
    }

    // Insert item at target
    targetList.splice(insertIdx, 0, draggedText);

    setCustomCurriculum(nextCurriculum);
    setDraggedItem(null);
  };

  const handleReset = async () => {
    if (window.confirm('Are you sure you want to reset the curriculum to default? All customized changes will be deleted.')) {
      userHasEdited.current = false;
      resetLocalCurriculum();
      setCustomCurriculum(loadLocalCurriculum());
      setSaveStatus('resetting to default...');
      if (supabase) {
        await clearRemoteCurriculum();
        setSaveStatus('cloud reset done');
      }
      setTimeout(() => setSaveStatus(null), 2500);
    }
  };

  return (
    <LoginGate>
      {(handleLogout) => (
        <div className="app">
          <CountdownBanner />
          <ChangelogBanner />
          <div className="container">
            
            {/* Admin Control Bar */}
            {adminMode && (
              <div className="admin-control-bar">
                <div className="admin-status">
                  <span className="admin-status-dot"></span>
                  <span>🛠️ Admin Edit Mode active</span>
                  {saveStatus && <span style={{ opacity: 0.8, fontWeight: 'normal', textTransform: 'lowercase', marginLeft: '8px' }}>({saveStatus})</span>}
                </div>
                <div className="admin-actions">
                  <Link to="/syllabus" className="admin-btn" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center' }}>
                    Manage Versions
                  </Link>
                  <button className="admin-btn" onClick={() => setIsExportOpen(true)}>
                    Export JSON code
                  </button>
                  <button className="admin-btn-secondary" onClick={() => setAdminMode(false)}>
                    Close Editor
                  </button>
                  <button className="admin-btn-danger" onClick={handleReset}>
                    Reset to Default
                  </button>
                </div>
              </div>
            )}

            <Header
              startDate={startDate}
              setStartDate={setStartDate}
              totalWeeks={weeks.length}
            />

            <div className="faq-bar" style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(5, 150, 105, 0.05)', border: '1px solid rgba(5, 150, 105, 0.15)', borderRadius: '8px', padding: '12px 18px', marginBottom: '12px', marginTop: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '18px' }}>🙋‍♂️</span>
                <span style={{ fontSize: '13px', fontWeight: '500', color: '#047857' }}>
                  <strong>Class FAQ:</strong> Answers to questions regarding Zoom sessions and on-site classes at Reveal Studios in Glendale.
                </span>
              </div>
              <Link 
                to="/faq" 
                style={{ textDecoration: 'none', background: '#059669', color: '#fff', fontSize: '12px', fontWeight: 'bold', padding: '6px 14px', borderRadius: '20px', display: 'inline-flex', alignItems: 'center', transition: 'all 0.2s' }}
              >
                CLASS FAQ & Reveal Guide →
              </Link>
            </div>

            <div className="speakers-bar" style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(6, 182, 212, 0.05)', border: '1px solid rgba(6, 182, 212, 0.15)', borderRadius: '8px', padding: '12px 18px', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '18px' }}>🎤</span>
                <span style={{ fontSize: '13px', fontWeight: '500', color: '#0891b2' }}>
                  <strong>Speakers:</strong> Curated list of prospective guest lecturers and industry leaders for zoom and studio tracks.
                </span>
              </div>
              <Link 
                to="/speakers" 
                style={{ textDecoration: 'none', background: '#06b6d4', color: '#fff', fontSize: '12px', fontWeight: 'bold', padding: '6px 14px', borderRadius: '20px', display: 'inline-flex', alignItems: 'center', transition: 'all 0.2s' }}
              >
                POTENTIAL SPEAKER LIST →
              </Link>
            </div>

            <div className="roster-bar" style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(124, 58, 237, 0.05)', border: '1px solid rgba(124, 58, 237, 0.15)', borderRadius: '8px', padding: '12px 18px', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '18px' }}>📋</span>
                <span style={{ fontSize: '13px', fontWeight: '500', color: '#6d28d9' }}>
                  <strong>Roster:</strong> Final class list roster of the 14 selected candidates with contact info and goals.
                </span>
              </div>
              <Link 
                to="/roster" 
                style={{ textDecoration: 'none', background: '#7c3aed', color: '#fff', fontSize: '12px', fontWeight: 'bold', padding: '6px 14px', borderRadius: '20px', display: 'inline-flex', alignItems: 'center', transition: 'all 0.2s' }}
              >
                FINAL CLASS LIST ROSTER →
              </Link>
            </div>

            <div className="mentorship-bar" style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(244, 63, 94, 0.05)', border: '1px solid rgba(244, 63, 94, 0.15)', borderRadius: '8px', padding: '12px 18px', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '18px' }}>🤝</span>
                <span style={{ fontSize: '13px', fontWeight: '500', color: '#e11d48' }}>
                  <strong>Mentorship Pairs:</strong> Dedicated layout of designated alumni mentors matched to cohort candidates.
                </span>
              </div>
              <Link 
                to="/mentorship" 
                style={{ textDecoration: 'none', background: '#f43f5e', color: '#fff', fontSize: '12px', fontWeight: 'bold', padding: '6px 14px', borderRadius: '20px', display: 'inline-flex', alignItems: 'center', transition: 'all 0.2s' }}
              >
                VIEW MENTORSHIP ASSIGNMENTS →
              </Link>
            </div>

            <div className="assignments-bar" style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(219, 39, 119, 0.05)', border: '1px solid rgba(219, 39, 119, 0.15)', borderRadius: '8px', padding: '12px 18px', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '18px' }}>📝</span>
                <span style={{ fontSize: '13px', fontWeight: '500', color: '#db2777' }}>
                  <strong>Saturday Assignments:</strong> Access detailed guides, track options, and points distribution for the six graded milestones.
                </span>
              </div>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
                <Link 
                  to="/assignments" 
                  style={{ textDecoration: 'none', background: '#db2777', color: '#fff', fontSize: '11.5px', fontWeight: 'bold', padding: '6px 16px', borderRadius: '20px', transition: 'all 0.2s', display: 'inline-flex', alignItems: 'center', border: '1px dashed #fff' }}
                  className="assignments-hub-btn"
                >
                  VIEW HUB →
                </Link>
                {[1, 3, 5, 7, 9, 10].map((wk) => (
                  <Link 
                    key={wk}
                    to={`/assignment/${wk}`} 
                    style={{ textDecoration: 'none', background: 'rgba(219, 39, 119, 0.12)', border: '1px solid rgba(219, 39, 119, 0.25)', color: '#be185d', fontSize: '11px', fontWeight: 'bold', padding: '5px 12px', borderRadius: '20px', transition: 'all 0.2s', display: 'inline-flex', alignItems: 'center' }}
                    className="assignment-bar-btn"
                  >
                    Week {wk}
                  </Link>
                ))}
              </div>
            </div>

            <div className="calendar-bar" style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(217, 119, 6, 0.05)', border: '1px solid rgba(217, 119, 6, 0.15)', borderRadius: '8px', padding: '12px 18px', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '18px' }}>📅</span>
                <span style={{ fontSize: '13px', fontWeight: '500', color: '#d97706' }}>
                  <strong>Calendar View:</strong> Traditional calendar grid layout showing all Tuesday and Saturday sessions at a glance.
                </span>
              </div>
              <Link 
                to="/calendar" 
                style={{ textDecoration: 'none', background: '#d97706', color: '#fff', fontSize: '12px', fontWeight: 'bold', padding: '6px 14px', borderRadius: '20px', display: 'inline-flex', alignItems: 'center', transition: 'all 0.2s' }}
              >
                VIEW CALENDAR GRID →
              </Link>
            </div>

            <div className="logout-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <button 
                className={`admin-toggle-btn ${adminMode ? 'is-active' : ''}`}
                onClick={() => setAdminMode(!adminMode)}
              >
                {adminMode ? '🔒 Exit Edit Mode' : '🛠️ Admin Edit Mode'}
              </button>
              <button className="logout-btn" onClick={handleLogout}>Sign out</button>
            </div>

            {/* Curriculum Vision & Worldbuilding Overview */}
            <div className="curriculum-intro-card" style={{
              background: 'rgba(255, 255, 255, 0.45)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(0, 0, 0, 0.08)',
              borderRadius: '12px',
              padding: '24px 28px',
              marginBottom: '28px',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.015)'
            }}>
              <h2 style={{
                fontFamily: 'var(--font-display, serif)',
                fontSize: '20px',
                fontWeight: 'normal',
                margin: '0 0 12px 0',
                color: 'var(--ink, #1C1A17)',
                borderBottom: '1px solid rgba(0, 0, 0, 0.06)',
                paddingBottom: '8px'
              }}>
                Curriculum Vision: Worldbuilding & Digital Workflows
              </h2>
              <p style={{
                fontSize: '14px',
                lineHeight: '1.6',
                color: 'var(--ink-mid, #44403A)',
                margin: '0 0 16px 0'
              }}>
                This worldbuilding-based curriculum focuses on teaching digital workflows to achieve the broader goals of workforce development in the visual arts. Rather than disconnected drills, the lessons guide students through the creation of <strong>six major assignments</strong> and a final <strong>capstone presentation</strong>. Using their own original ideas, IP (Intellectual Property), and characters, students will visually develop a unified "world of their own."
              </p>
              <div style={{
                background: 'rgba(0, 0, 0, 0.02)',
                borderRadius: '8px',
                padding: '16px',
                border: '1px solid rgba(0, 0, 0, 0.04)'
              }}>
                <h4 style={{
                  fontSize: '11px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  fontFamily: 'var(--font-mono, monospace)',
                  color: 'var(--accent, #A8482A)',
                  margin: '0 0 10px 0'
                }}>
                  Curriculum Milestones
                </h4>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
                  gap: '8px 16px'
                }}>
                  {[
                    { num: 1, name: 'Character / Prop Foundation', wk: 1 },
                    { num: 2, name: 'Material Studies & Textures', wk: 3 },
                    { num: 3, name: 'Atmospheric Space', wk: 5 },
                    { num: 4, name: 'Narrative Sequence', wk: 7 },
                    { num: 5, name: 'Release Campaign', wk: 9 },
                    { num: 6, name: 'Capstone Pitch Deck', wk: 10 }
                  ].map((asg) => (
                    <Link 
                      key={asg.num}
                      to={`/assignment/${asg.wk}`}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        textDecoration: 'none',
                        color: 'var(--ink, #1C1A17)',
                        fontSize: '13px',
                        transition: 'color 0.15s ease',
                        padding: '4px 0'
                      }}
                      className="intro-asg-link"
                    >
                      <span style={{
                        background: 'var(--accent, #A8482A)',
                        color: '#fff',
                        fontSize: '10px',
                        fontWeight: 'bold',
                        borderRadius: '4px',
                        width: '18px',
                        height: '18px',
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        transition: 'transform 0.15s ease'
                      }}>
                        {asg.num}
                      </span>
                      <span style={{ fontWeight: '500' }}>{asg.name}</span>
                    </Link>
                  ))}
                </div>
              </div>
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
                  adminMode={adminMode}
                  onUpdateWeek={handleUpdateWeek}
                  onUpdateItem={handleUpdateItem}
                  onDeleteItem={handleDeleteItem}
                  onAddItem={handleAddItem}
                  onDragStart={handleDragStart}
                  onDragEnd={handleDragEnd}
                  onDrop={handleDrop}
                  isDraggingActive={draggedItem !== null}
                />
              ))}
            </main>
            <ChangelogSection />
            <footer className="footer">
              <p>Notes save automatically to this browser. Edit <code>src/curriculum.js</code> to update titles and content.</p>
            </footer>
          </div>
          
          {/* Export JSON modal overlay */}
          {isExportOpen && (
            <div className="export-modal-overlay" onClick={() => setIsExportOpen(false)}>
              <div className="export-modal" onClick={(e) => e.stopPropagation()}>
                <div className="export-modal-header">
                  <h3 className="export-modal-title">Export Curriculum Data</h3>
                  <button className="export-modal-close" onClick={() => setIsExportOpen(false)}>×</button>
                </div>
                <p className="export-modal-subtitle">
                  Copy the code below and paste it into <code>src/curriculum.js</code> to make your layout changes permanent in the codebase.
                </p>
                <textarea
                  className="export-textarea"
                  readOnly
                  value={`export const curriculum = ${JSON.stringify(customCurriculum, null, 2)};`}
                  onClick={(e) => e.target.select()}
                />
                <div className="export-modal-actions">
                  <button
                    className="admin-btn"
                    onClick={() => {
                      navigator.clipboard.writeText(`export const curriculum = ${JSON.stringify(customCurriculum, null, 2)};`);
                      alert('Copied to clipboard!');
                    }}
                  >
                    Copy to Clipboard
                  </button>
                  <button className="admin-btn-secondary" onClick={() => setIsExportOpen(false)}>
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </LoginGate>
  );
}
