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

function Linkify({ text }) {
  const urlRegex = /(https?:\/\/[^\s,]+)/g;
  const parts = text.split(urlRegex);
  return parts.map((part, i) =>
    urlRegex.test(part)
      ? <a key={i} href={part} target="_blank" rel="noopener noreferrer" className="inline-link">{part}</a>
      : part
  );
}

function Section({ label, items }) {
  if (!items || items.length === 0) return null;
  return (
    <div className="section">
      <p className="section-label">{label}</p>
      <ul className="section-list">
        {items.map((item, i) => {
          const { isNew, text } = parseNew(item);
          return (
            <li key={i} className={isNew ? 'is-new' : ''}>
              {isNew && <NewPill />}
              <Linkify text={text} />
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
          {week.overview && <p className="overview">{week.overview}</p>}
          <Section label="Topics" items={week.topics} />
          <Section label="Readings" items={week.readings} />
          {week.assignments?.length > 0 && (
            <div className="section">
              <p className="section-label">Assignments</p>
              <ul className="section-list">
                {week.assignments.map((rawItem, i) => {
                  const { isNew, text } = parseNew(rawItem);
                  return (
                    <li key={i} className={isNew ? 'is-new' : ''}>
                      {isNew && <NewPill />}
                      {assignments[week.week] ? (
                        <Link to={`/assignment/${week.week}`} className="assignment-link">
                          {text}
                          <span className="assignment-arrow">→ View full brief</span>
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
