import { useEffect, useMemo, useState } from 'react';
import { curriculum, config } from './curriculum.js';

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

// ─── components ──────────────────────────────────────────────────────────────

function Header({ startDate, setStartDate, totalWeeks }) {
  return (
    <header className="header">
      <div className="header-left">
        <p className="eyebrow">2026 · 12-week program</p>
        <h1 className="title">Curriculum planner</h1>
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
          <span className="counter-num">{totalWeeks}</span>
          <span className="counter-label">weeks</span>
        </div>
      </div>
    </header>
  );
}

function Section({ label, items }) {
  if (!items || items.length === 0) return null;
  return (
    <div className="section">
      <p className="section-label">{label}</p>
      <ul className="section-list">
        {items.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

function WeekCard({ week, tuesday, saturday, isCapstone, index }) {
  const [notes, setNotes] = useState(() => loadNote(week.week));
  const [savedAt, setSavedAt] = useState(null);

  useEffect(() => {
    const t = setTimeout(() => {
      saveNote(week.week, notes);
      setSavedAt(Date.now());
    }, 400);
    return () => clearTimeout(t);
  }, [notes, week.week]);

  const rangeLabel = `${fmtMonoDate(tuesday)} – ${fmtMonoDate(saturday)}`;
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

      <div className="sessions">
        <div className="session">
          <span className="session-day">Tue</span>
          <span className="session-date">{fmtDate(tuesday)}</span>
          <span className="session-meta">{config.tuesday.time} · {config.tuesday.location}</span>
        </div>
        <div className="session">
          <span className="session-day">Sat</span>
          <span className="session-date">{fmtDate(saturday)}</span>
          <span className="session-meta">{config.saturday.time} · {config.saturday.location}</span>
        </div>
      </div>

      {hasContent && (
        <div className="curriculum-content">
          {week.overview && <p className="overview">{week.overview}</p>}
          <Section label="Topics" items={week.topics} />
          <Section label="Readings" items={week.readings} />
          <Section label="Assignments" items={week.assignments} />
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
          {savedAt && <span className="saved">saved</span>}
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
    <div className="app">
      <div className="container">
        <Header
          startDate={startDate}
          setStartDate={setStartDate}
          totalWeeks={weeks.length}
        />
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
        <footer className="footer">
          <p>Notes save automatically to this browser. Edit <code>src/curriculum.js</code> to update titles and content.</p>
        </footer>
      </div>
    </div>
  );
}
