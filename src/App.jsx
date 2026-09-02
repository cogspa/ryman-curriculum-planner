import { useEffect, useMemo, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { curriculum, config, changelog } from './curriculum.js';
import { assignments } from './assignments.js';
import { supabase } from './supabaseClient.js';
import { isWeekReleased, getActiveRole, isNewPillActive } from './releaseUtils.js';
import {
  loadLocalCurriculum,
  saveLocalCurriculum,
  resetLocalCurriculum,
  fetchRemoteCurriculum,
  syncRemoteCurriculum,
  clearRemoteCurriculum
} from './curriculumService.js';
import LegalDisclaimer from './LegalDisclaimer.jsx';
import CurriculumProgression from './CurriculumProgression.jsx';
import TopicSearch from './TopicSearch.jsx';


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
    2: { name: 'Alycea Tinoyan - Background Designer for Rick and Morty', date: formatDate(tuesdayDate) },
    3: { name: 'Jax Jocson: Concept Artist', date: formatDate(tuesdayDate) },
    4: { name: 'James Rallison', date: formatDate(tuesdayDate), saturdaySpeaker: 'Andrea Favilla', saturdayDate: formatDate(saturdayDate) },
    5: { name: 'Nancy Seruto', date: formatDate(tuesdayDate) },
    6: { name: 'Christian Hope', date: formatDate(tuesdayDate) },
    7: { name: 'Sam Gochman - Creative Technologist, and Hassan Ragab - interdisciplinary designer, visual artist, and Creative AI leader', date: formatDate(tuesdayDate) },
    8: { name: 'Wayne Hunt', date: formatDate(tuesdayDate), saturdaySpeaker: 'Eugenia Chen', saturdayDate: formatDate(saturdayDate) },
    9: { name: 'None', date: formatDate(tuesdayDate) },
    10: { name: 'Jeremy Costello', date: formatDate(tuesdayDate) },
    11: { name: 'None', date: formatDate(tuesdayDate) },
    12: { name: 'Domee Shi (TBD)', date: formatDate(tuesdayDate) },
    13: { name: 'None', date: 'End of September' }
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
  const role = getActiveRole();
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
          <span style={{ display: 'inline-block', verticalAlign: 'middle' }}>pLAtform Launch Pad Summer/Fall 2026</span>
        </h1>
        <p className="subtitle">
          {config.tuesday.label}s {config.tuesday.time} · {config.tuesday.location}
          <span className="dot">·</span>
          {config.saturday.label}s {config.saturday.time} · {config.saturday.location}
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '16px' }}>
          <a 
            href="https://us06web.zoom.us/j/6122246828" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 14px',
              background: '#2563eb',
              color: '#ffffff',
              borderRadius: '20px',
              fontSize: '12px',
              fontWeight: '600',
              textDecoration: 'none',
              transition: 'all 0.2s ease',
              boxShadow: '0 2px 6px rgba(37, 99, 235, 0.25)'
            }}
          >
            <span>📹</span> Weekly Zoom Link ↗
          </a>
          <a 
            href="https://www.dropbox.com/request/d56lyvzlb50sm3vjg0yp" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 14px',
              background: '#0061fe',
              color: '#ffffff',
              borderRadius: '20px',
              fontSize: '12px',
              fontWeight: '600',
              textDecoration: 'none',
              transition: 'all 0.2s ease',
              boxShadow: '0 2px 6px rgba(0, 97, 254, 0.25)'
            }}
          >
            <span>📥</span> Upload Assignments (Dropbox) ↗
          </a>
        </div>
      </div>
      <div className="header-right">
        {role === 'admin' && (
          <label className="date-field">
            <span>First Tuesday</span>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </label>
        )}
        <div className="counter">
          <span className="counter-num">12</span>
          <span className="counter-label">weeks</span>
          <span className="counter-capstone">+ capstone</span>
        </div>
      </div>
    </header>
  );
}

function WeekNavBar({ weeks, startDate, activeWeek, onSelectWeek }) {
  const role = getActiveRole();

  const handleWeekClick = (e, weekNum, isReleased) => {
    if (!isReleased) {
      e.preventDefault();
      return;
    }
    if (onSelectWeek) {
      onSelectWeek(weekNum);
    }
    const targetElement = document.getElementById(`week-${weekNum}`);
    if (targetElement) {
      e.preventDefault();
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      targetElement.classList.remove('card-highlight-pulse');
      void targetElement.offsetWidth; // trigger reflow
      targetElement.classList.add('card-highlight-pulse');
    }
  };

  return (
    <nav className="week-navbar" aria-label="Curriculum Weeks Navigation">
      <div className="week-navbar-inner">
        <div className="week-navbar-header">
          <span className="week-navbar-title">
            <span>🗓️</span> Jump to Week
          </span>
          <span className="week-navbar-count">12 Weeks + Final Capstone</span>
        </div>
        <div className="week-navbar-scroll">
          {weeks.map(({ entry }) => {
            const isCapstone = Number(entry.week) === 13;
            const released = role === 'admin' || isWeekReleased(entry.week, startDate);
            const label = isCapstone ? '⭐ Capstone Showcase' : `Week ${entry.week}`;
            const isActive = activeWeek === entry.week;

            return (
              <a
                key={entry.week}
                href={`#week-${entry.week}`}
                onClick={(e) => handleWeekClick(e, entry.week, released)}
                className={`week-nav-item ${released ? 'is-released' : 'is-locked'} ${isCapstone ? 'is-capstone' : ''} ${isActive ? 'is-active-nav' : ''}`}
                title={released ? `${label}: ${entry.title}` : `${label} is coming soon and will unlock as the week posts.`}
                aria-disabled={!released}
              >
                <span className="week-nav-badge">
                  {isCapstone ? 'CAPSTONE' : `W${String(entry.week).padStart(2, '0')}`}
                </span>
                <span className="week-nav-label-text">
                  {isCapstone ? 'Showcase' : `Week ${entry.week}`}
                </span>
                {!released ? (
                  <span className="week-nav-tag coming-soon">🔒 Coming Soon</span>
                ) : (
                  isCapstone && <span className="week-nav-tag capstone-tag">FINAL</span>
                )}
              </a>
            );
          })}
        </div>
      </div>
    </nav>
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
      {([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].includes(Number(weekNumber))) && (label === 'Topics' || label === 'Readings') ? (
        <Link to={Number(weekNumber) < 10 ? `/week/0${weekNumber}` : `/week/${weekNumber}`} className="section-label-link">
          {label} <span style={{ fontSize: '0.85em', opacity: 0.8 }}>[VIEW ALL →]</span>
        </Link>
      ) : label === 'Assignments' ? (
        <Link to="/assignments" className="section-label-link" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
          <span>{label}</span>
          <span style={{
            fontSize: '11px',
            fontWeight: '800',
            color: '#b91c1c',
            background: 'rgba(239, 68, 68, 0.1)',
            border: '1px solid rgba(239, 68, 68, 0.35)',
            padding: '1px 6px',
            borderRadius: '4px',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            display: 'inline-block'
          }}>
            (OPTIONAL)
          </span>
          <span style={{ fontSize: '0.85em', opacity: 0.8 }}>[VIEW HUB →]</span>
        </Link>
      ) : (
        <p className="section-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span>{label}</span>
          {label === 'Assignments' && (
            <span style={{
              fontSize: '10px',
              fontWeight: '800',
              color: '#b91c1c',
              background: 'rgba(239, 68, 68, 0.1)',
              border: '1px solid rgba(239, 68, 68, 0.35)',
              padding: '1px 5px',
              borderRadius: '4px',
              letterSpacing: '0.08em',
              textTransform: 'uppercase'
            }}>
              (OPTIONAL)
            </span>
          )}
        </p>
      )}
      <ul className="section-list">
        {items.map((item, i) => {
          const { isNew, text } = parseNew(item);
          const showNew = isNew && isNewPillActive(Number(weekNumber));

          let linkPath = null;
          let isExternal = false;
          if (label === 'Assignments' && [1, 3, 5, 6, 7, 10].includes(Number(weekNumber))) {
            const cleanText = text.toLowerCase();
            if (cleanText.includes('base assignment') || cleanText.includes('base')) {
              linkPath = `/assignment/${Number(weekNumber)}?track=beginner`;
            } else if (cleanText.includes('next level') || cleanText.includes('take it')) {
              linkPath = `/assignment/${Number(weekNumber)}?track=intermediate`;
            } else if (cleanText.includes('advanced integration') || cleanText.includes('advanced') || cleanText.includes('3d integration') || cleanText.includes('3d')) {
              linkPath = `/assignment/${Number(weekNumber)}?track=advanced`;
            } else {
              linkPath = `/assignment/${Number(weekNumber)}`;
            }
          }
          if (Number(weekNumber) === 1 && label === 'Topics') {
            const cleanText = text.trim().toLowerCase();
            if (cleanText.includes('canvas') && cleanText.includes('pixels')) {
              linkPath = '/week/01/digital-vs-physical-canvas';
            } else if (cleanText.includes('origin') && cleanText.includes('pixel')) {
              linkPath = '/week/01/origin-of-pixel';
            } else if (cleanText.includes('elements') && cleanText.includes('principles')) {
              linkPath = '/week/01/elements-vs-principles';
            } else if (cleanText.includes('resolution')) {
              linkPath = '/week/01/resolution-and-quality';
            } else if (cleanText.includes('pixel budget')) {
              linkPath = '/pixel-budget';
            } else if (cleanText.includes('selection') || cleanText.includes('vector') || cleanText.includes('mask') || cleanText.includes('interchangeability')) {
              linkPath = '/week/01/selection-vector-mask-channel';
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
            } else if (cleanText.includes('what is noise') || cleanText.includes('art of noise')) {
              linkPath = '/week/02/what-is-noise';
            } else if (cleanText.includes('generating noise')) {
              linkPath = '/week/02/generating-noise-in-photoshop';
            } else if (cleanText.includes('procedural') || cleanText.includes('what is pattern')) {
              linkPath = '/week/02/procedural-vs-non-procedural';
            } else if (cleanText.includes('blend modes') || cleanText.includes('overlay')) {
              linkPath = '/week/02/blend-modes-for-texture';
            } else if (cleanText.includes('canvas simulation') || cleanText.includes('perlin')) {
              linkPath = '/week/02/canvas-simulation';
            } else if (cleanText.includes('define & save') || cleanText.includes('define presets') || cleanText.includes('reusable toolkit')) {
              linkPath = '/week/02/define-presets';
            } else if (cleanText.includes('color palette') || cleanText.includes('swatch') || cleanText.includes('extraction')) {
              linkPath = '/week/02/color-palette-extraction';
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
              linkPath = '/week/02/cracked-earth-texture';
            } else if (cleanText.includes('what are blend modes')) {
              linkPath = '/week/02/blend-modes-for-texture';
            } else if (cleanText.includes('the book of shaders') || cleanText.includes('shaders.com')) {
              linkPath = 'https://thebookofshaders.com/12/';
              isExternal = true;
            } else if (cleanText.includes('color palette') || cleanText.includes('swatch') || cleanText.includes('extraction')) {
              linkPath = '/week/02/color-palette-extraction';
            }
          } else if (weekNumber === 3 && label === 'Topics') {
            const cleanText = text.trim().toLowerCase();
            if (cleanText.includes('glazing') || cleanText.includes('digital layering')) {
              linkPath = '/week/03/glazing-vs-digital-layering';
            } else if (cleanText.includes('emotive power of value') || cleanText.includes('value-studies') || cleanText.includes('value studies')) {
              linkPath = '/week/03/value-studies';
            } else if (cleanText.includes('cinematic lighting')) {
              linkPath = '/week/03/cinematic-lighting';
            } else if (cleanText.includes('atmospheric perspective')) {
              linkPath = '/week/03/atmospheric-perspective';
            } else if (cleanText.includes('masking') || cleanText.includes('selections')) {
              linkPath = '/week/03/masking-and-selections';
            } else if (cleanText.includes('realistic lighting') || cleanText.includes('adjustments')) {
              linkPath = '/week/03/realistic-lighting-adjustments';
            } else if (cleanText.includes('brush maker ii') || cleanText.includes('brush-maker-ii') || cleanText.includes('brush maker 2') || cleanText.includes('brush-maker-2') || cleanText.includes('brush foundry ii') || cleanText.includes('brush-foundry-ii') || cleanText.includes('foundry ii')) {
              linkPath = '/week/03/brush-foundry-ii';
            } else if (cleanText.includes('brush maker') || cleanText.includes('brush forge') || cleanText.includes('brush foundry')) {
              linkPath = '/week/03/brush-maker';
            } else if (cleanText.includes('notan light lab') || cleanText.includes('notanlightlab')) {
              linkPath = '/week/03/notan-light-lab';
            } else if (cleanText.includes('threshold') || cleanText.includes('threshold notan')) {
              linkPath = '/week/03/threshold-notan';
            } else if (cleanText.includes('sky color') || cleanText.includes('painting four skies') || cleanText.includes('skies')) {
              linkPath = '/week/03/sky-color';
            } else if (cleanText.includes('block out study') || cleanText.includes('block-out-study')) {
              linkPath = '/week/03/block-out-study';
            } else if (cleanText.includes('block out') || cleanText.includes('block-out')) {
              linkPath = '/week/03/block-out-process';
            } else if (cleanText.includes('gradient marquee') || cleanText.includes('gradient-marquee') || cleanText.includes('marquee')) {
              linkPath = '/week/03/gradient-marquee';
            } else if (cleanText.includes('triad') || cleanText.includes('triad-palettes') || cleanText.includes('palette')) {
              linkPath = '/week/03/triad-palettes';
            } else if (cleanText.includes('procedural wear') || cleanText.includes('procedural-wear') || cleanText.includes('wear')) {
              linkPath = '/week/03/procedural-wear';
            } else if (cleanText.includes('diffuse & specular on a sphere') || cleanText.includes('sphere-material-studies') || cleanText.includes('sphere')) {
              linkPath = '/week/03/sphere-material-studies';
            } else if (cleanText.includes('layer basics')) {
              linkPath = '/week/03/layer-basics';
            }
          } else if (weekNumber === 3 && label === 'Readings') {
            const cleanText = text.trim().toLowerCase();
            if (cleanText.includes('layer basics')) {
              linkPath = '/week/03/layer-basics';
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
          } else if (weekNumber === 5 && (label === 'Topics' || label === 'Readings')) {
            const cleanText = text.trim().toLowerCase();
            if (cleanText.includes('character') && cleanText.includes('development')) {
              linkPath = '/week/05/character-development';
            } else if (cleanText.includes('environmental') && cleanText.includes('storytelling')) {
              linkPath = '/week/05/environmental-storytelling';
            } else if (cleanText.includes('symmetry') && cleanText.includes('photoshop')) {
              linkPath = '/week/05/symmetry-in-photoshop';
            } else if (cleanText.includes('sequential') && cleanText.includes('thinking')) {
              linkPath = '/week/05/sequential-thinking';
            } else if (cleanText.includes('storyboarding') && cleanText.includes('fundamentals')) {
              linkPath = '/week/05/storyboarding-fundamentals';
            } else if (cleanText.includes('shot') && cleanText.includes('examples')) {
              linkPath = '/week/05/shot-examples';
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
            if (cleanText.includes('anatomy of a professional design brief') || cleanText.includes('design-brief-presentation')) {
              linkPath = '/week/07/design-brief-presentation';
            } else if (cleanText.includes('short animation')) {
              linkPath = '/week/07/short-animation';
            } else if (cleanText.includes('graphic novel')) {
              linkPath = '/week/07/graphic-novel-pages';
            } else if (cleanText.includes('product design') || cleanText.includes('product rendering')) {
              linkPath = '/week/07/product-design';
            } else if (cleanText.includes('interactive experience')) {
              linkPath = '/week/07/interactive-experience';
            } else if (cleanText.includes('pitch') || cleanText.includes('proof of concept')) {
              linkPath = '/week/07/pitch-proof-of-concept';
            } else if (cleanText.includes('app') || cleanText.includes('digital experience')) {
              linkPath = '/week/07/app-digital-experience';
            } else if (cleanText.includes('personal') || cleanText.includes('autobiographical')) {
              linkPath = '/week/07/personal-project';
            }
          } else if (weekNumber === 8 && label === 'Topics') {
            const cleanText = text.trim().toLowerCase();
            if (cleanText.includes('receiving and processing constructive art direction') || cleanText.includes('constructive art direction')) {
              linkPath = '/week/08/receiving-constructive-art-direction';
            } else if (cleanText.includes('presentation pitch deck') || cleanText.includes('pitch deck') || cleanText.includes('structuring a professional presentation')) {
              linkPath = '/week/08/structuring-a-professional-presentation-pitch-deck';
            } else if (cleanText.includes('handoff formats') || cleanText.includes('packaging documents')) {
              linkPath = '/week/08/handoff-formats-and-packaging-documents';
            } else if (cleanText.includes('presentation board layout')) {
              linkPath = '/week/08/presentation-board-layout-creation';
            } else if (cleanText.includes('studio handoff etiquette')) {
              linkPath = '/week/08/studio-handoff-etiquette-and-conventions';
            } else if (cleanText.includes('working with art directors')) {
              linkPath = '/week/08/working-with-art-directors-roleplay';
            }
          } else if (Number(weekNumber) === 9 && (label === 'Topics' || label === 'Readings')) {
            const cleanText = text.trim().toLowerCase();
            if (cleanText.includes('contract legally binding') || cleanText.includes('binding and protective')) {
              linkPath = '/week/09/contracts-legally-binding';
            } else if (cleanText.includes('freelance business operations') || cleanText.includes('tax structures')) {
              linkPath = '/week/09/freelance-business-operations';
            } else if (cleanText.includes('drafting client agreements') || cleanText.includes('proposal sheets')) {
              linkPath = '/week/09/drafting-agreements-and-proposals';
            } else if (cleanText.includes('intellectual property guide') || cleanText.includes('copyrights, trademarks') || cleanText.includes('licensing rights')) {
              linkPath = '/week/09/intellectual-property-guide';
            } else if (cleanText.includes('pricing your work') || cleanText.includes('project scoping')) {
              linkPath = '/week/09/pricing-your-work-and-project-scoping';
            } else if (cleanText.includes('contracts & intellectual property') || cleanText.includes('deep dive') || cleanText.includes('negotiating the rights')) {
              linkPath = '/week/09/contracts-and-ip-negotiating-rights';
            } else if (cleanText.includes('client communication') || cleanText.includes('relationship skills')) {
              linkPath = '/week/09/client-communication-and-relationship-skills';
            } else if (cleanText.includes('taxes basics') || cleanText.includes('creative sole proprietors')) {
              linkPath = '/week/09/tax-basics-for-creative-sole-proprietors';
            } else if (cleanText.includes('refine campaign assets') || cleanText.includes('peer feedback') || cleanText.includes('pitch rehearsals')) {
              linkPath = '/week/09/refine-campaign-assets-peer-feedback';
            }
          } else if (Number(weekNumber) === 10 && (label === 'Topics' || label === 'Readings')) {
            const cleanText = text.trim().toLowerCase();
            if (cleanText.includes('elevator pitch') || cleanText.includes('30-second story') || cleanText.includes('compelling elevator')) {
              linkPath = '/week/10/elevator-pitch-and-story';
            } else if (cleanText.includes('hiring pipelines') || cleanText.includes('how creative hiring actually works')) {
              linkPath = '/week/10/creative-hiring-pipelines';
            } else if (cleanText.includes('resumes and linkedin') || cleanText.includes('ats')) {
              linkPath = '/week/10/resumes-linkedin-ats';
            } else if (cleanText.includes('6-second') || cleanText.includes('six-second') || cleanText.includes('recruiter insights')) {
              linkPath = '/week/10/six-second-portfolio-test';
            } else if (cleanText.includes('resume & linkedin') || cleanText.includes('optimization workshop')) {
              linkPath = '/week/10/resumes-linkedin-ats';
            } else if (cleanText.includes('interview role-play') || cleanText.includes('star') || cleanText.includes('behavioral')) {
              linkPath = '/week/10/interview-storytelling-star';
            } else if (cleanText.includes('portfolio storytelling') || cleanText.includes('structuring process') || cleanText.includes('problem → process')) {
              linkPath = '/week/10/portfolio-storytelling-process';
            } else if (cleanText.includes('salary negotiation') || cleanText.includes('pricing confidence')) {
              linkPath = '/week/10/salary-negotiation-market-data';
            } else if (cleanText.includes('freelance') || cleanText.includes('scenarios')) {
              linkPath = '/week/10/freelance-pricing-conversations';
            } else if (cleanText.includes('los angeles creative economy') || cleanText.includes('industry context')) {
              linkPath = '/week/10/la-creative-economy-2026';
            }
          } else if (Number(weekNumber) === 11 && (label === 'Topics' || label === 'Readings')) {
            const cleanText = text.trim().toLowerCase();
            if (cleanText.includes('selection vs') || cleanText.includes('selection vs. clutter') || cleanText.includes('removing weaker pieces') || cleanText.includes('behance guide') || cleanText.includes('art director advice')) {
              linkPath = '/week/11/selection-vs-clutter';
            } else if (cleanText.includes('interactive web') || cleanText.includes('static multi-page pdf') || cleanText.includes('web formats vs') || cleanText.includes('nielsen norman') || cleanText.includes('adobe guide') || cleanText.includes('w3c') || cleanText.includes('accessibility')) {
              linkPath = '/week/11/interactive-web-vs-static-pdf';
            } else if (cleanText.includes('modern portfolios') || cleanText.includes('portfolio-reference-gallery') || cleanText.includes('portfolio reference') || cleanText.includes('site architectures') || cleanText.includes('grid standards')) {
              linkPath = '/portfolio-reference-gallery';
            } else if (cleanText.includes('grid alignments') || cleanText.includes('negative space') || cleanText.includes('grid alignment') || cleanText.includes('interaction design foundation') || cleanText.includes('visual hierarchy')) {
              linkPath = '/week/11/grid-alignment-and-negative-space';
            } else if (cleanText.includes('typography') || cleanText.includes('glyph') || cleanText.includes('type design') || cleanText.includes('letterform') || cleanText.includes('font')) {
              linkPath = '/week/11/glyph-table';
            }
          }

          return (
            <li key={i} className={showNew ? 'is-new' : ''}>
              {showNew && <NewPill />}
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
  isSelected = false,
  index,
  adminMode,
  isAdminView = false,
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
      id={`week-${week.week}`}
      className={`card${isCapstone ? ' card-capstone' : ''}${isSelected ? ' card-selected-glow' : ''}`}
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

      {(week.week === 1 || week.week === 2) && (
        <div className="week-due-banner" style={{
          margin: '12px 0 16px 0',
          padding: '12px 14px',
          background: 'rgba(139, 58, 47, 0.06)',
          borderLeft: '4px solid #8b3a2f',
          borderRadius: '0 8px 8px 0',
          fontSize: '0.85rem',
          lineHeight: '1.4',
          color: '#2b2622'
        }}>
          <div style={{ fontWeight: 'bold', color: '#8b3a2f', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '0.75rem' }}>
            ⏳ Deliverable Alert
          </div>
          <div style={{ marginBottom: '8px' }}>
            <strong>Must do by July 11:</strong> 6 PNGs total – three grayscale block-outs and three color/lighting explorations.
          </div>
          <div style={{ fontSize: '0.8rem', color: '#5a5048', borderTop: '1px solid rgba(139, 58, 47, 0.15)', paddingTop: '6px' }}>
            <span style={{ display: 'block', marginBottom: '3px' }}>
              ℹ️ <strong>Helpful review:</strong> the edited video clips and photoshop shortcut sheet.
            </span>
            <span style={{ display: 'block' }}>
              💡 <strong>Optional challenge:</strong> Blender/SVG integration.
            </span>
          </div>
        </div>
      )}

      {(Number(week.week) === 3 || Number(week.week) === 4) && (
        <div className="week-due-banner" style={{
          margin: '12px 0 16px 0',
          padding: '12px 14px',
          background: 'rgba(139, 58, 47, 0.06)',
          borderLeft: '4px solid #8b3a2f',
          borderRadius: '0 8px 8px 0',
          fontSize: '0.85rem',
          lineHeight: '1.4',
          color: '#2b2622'
        }}>
          <div style={{ fontWeight: 'bold', color: '#8b3a2f', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '0.75rem' }}>
            ⏳ Deliverable Alert
          </div>
          <div style={{ marginBottom: '8px' }}>
            <strong>Must do by July 25:</strong>
            <div style={{ marginTop: '4px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <div><strong>Base:</strong> 18 custom brushes in folders + stamp test sheet.</div>
              <div><strong>Next Level:</strong> 3 landscape compositions (11" × 17" at 300 DPI, layered PSD).</div>
            </div>
          </div>
        </div>
      )}

      {Number(week.week) === 5 && (
        <div className="week-due-banner" style={{
          margin: '12px 0 16px 0',
          padding: '12px 14px',
          background: 'rgba(139, 58, 47, 0.06)',
          borderLeft: '4px solid #8b3a2f',
          borderRadius: '0 8px 8px 0',
          fontSize: '0.85rem',
          lineHeight: '1.4',
          color: '#2b2622'
        }}>
          <div style={{ fontWeight: 'bold', color: '#8b3a2f', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '0.75rem' }}>
            ⏳ Deliverable Alert
          </div>
          <div style={{ marginBottom: '8px' }}>
            <strong>Must do by August 1 (End of Class):</strong>
            <div style={{ marginTop: '4px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <div><strong>1. Thumbnail Exploration Page:</strong> Min. 20 thumbnails (1920 × 1080 px).</div>
              <div><strong>2. Character Model Sheet:</strong> Name, full-body design &amp; 5 expressions/poses (11" × 17", 150 PPI).</div>
              <div><strong>3. Final Character Illustration:</strong> Rendered character in an environment — <em>Optional</em></div>
            </div>
          </div>
        </div>
      )}

      {Number(week.week) === 6 && (
        <div className="week-due-banner" style={{
          margin: '12px 0 16px 0',
          padding: '12px 14px',
          background: 'rgba(139, 58, 47, 0.06)',
          borderLeft: '4px solid #8b3a2f',
          borderRadius: '0 8px 8px 0',
          fontSize: '0.85rem',
          lineHeight: '1.4',
          color: '#2b2622'
        }}>
          <div style={{ fontWeight: 'bold', color: '#8b3a2f', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '0.75rem' }}>
            ⏳ Deliverable Alert
          </div>
          <div style={{ marginBottom: '8px' }}>
            <strong>Must do by August 8 (End of Class):</strong>
            <div style={{ marginTop: '4px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <div><strong>Base:</strong> 3-panel sequential comic strip showing a simple character action, alongside a basic turnaround layout.</div>
              <div><strong>Next Level:</strong> 6-to-9 panel storyboard layout with camera moves (dolly zoom, tilt, track), alongside a character model turnaround sheet with expression studies.</div>
              <div><strong>Advanced Integration (Optional):</strong> 6-to-9 panel Blender Grease Pencil 3D animatic block-in.</div>
            </div>
          </div>
        </div>
      )}

      {Number(week.week) === 7 && (
        <div className="week-due-banner" style={{
          margin: '12px 0 16px 0',
          padding: '12px 14px',
          background: 'rgba(139, 58, 47, 0.06)',
          borderLeft: '4px solid #8b3a2f',
          borderRadius: '0 8px 8px 0',
          fontSize: '0.85rem',
          lineHeight: '1.4',
          color: '#2b2622'
        }}>
          <div style={{ fontWeight: 'bold', color: '#8b3a2f', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '0.75rem' }}>
            ⏳ Deliverable Alert
          </div>
          <div style={{ marginBottom: '8px' }}>
            <strong>Must do by August 8 &amp; August 15:</strong>
            <div style={{ marginTop: '4px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <div><strong>One-Page Creative Brief:</strong> Define project scope, client simulation premise &amp; Hero Project. <em>(Due Aug 8, End of Class)</em></div>
              <div><strong>Capstone Reference Board Layout:</strong> Complete full visual reference board using the SVG template. <em>(Due Aug 15, End of Class)</em></div>
            </div>
          </div>
        </div>
      )}

      {Number(week.week) === 8 && (
        <div className="week-due-banner" style={{
          margin: '12px 0 16px 0',
          padding: '12px 14px',
          background: 'rgba(139, 58, 47, 0.06)',
          borderLeft: '4px solid #8b3a2f',
          borderRadius: '0 8px 8px 0',
          fontSize: '0.85rem',
          lineHeight: '1.4',
          color: '#2b2622'
        }}>
          <div style={{ fontWeight: 'bold', color: '#8b3a2f', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '0.75rem' }}>
            ⏳ Deliverable Alert
          </div>
          <div style={{ marginBottom: '8px' }}>
            <strong>Must do by August 15 (End of Class):</strong>
            <div style={{ marginTop: '4px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <div><strong>Capstone Reference Board Layout:</strong> Complete full visual reference board using the SVG template. <em>(Due Aug 15, End of Class)</em></div>
            </div>
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
              <>
                <p className="overview">
                  {Number(week.week) === 8 ? (
                    <Link to="/week/08" className="overview-link">
                      {week.overview} <span style={{ fontSize: '0.85em', opacity: 0.8 }}>[VIEW ALL →]</span>
                    </Link>
                  ) : Number(week.week) === 7 ? (
                    <Link to="/week/07/client-simulation-overview" className="overview-link">
                      {week.overview} <span style={{ fontSize: '0.85em', opacity: 0.8 }}>[READ BRIEF FRAMEWORK →]</span>
                    </Link>
                  ) : Number(week.week) === 1 ? (
                    <Link to="/week/01" className="overview-link">
                      {week.overview} <span style={{ fontSize: '0.85em', opacity: 0.8 }}>[VIEW ALL →]</span>
                    </Link>
                  ) : (
                    week.overview
                  )}
                </p>
                {Number(week.week) === 1 && (
                  <div className="week1-extra-content" style={{ marginTop: '12px', marginBottom: '16px', fontSize: '13.5px', color: 'var(--ink-mid)' }}>
                    <p style={{ lineHeight: '1.6', marginBottom: '10px' }}>
                      Week 1 introduces the visual language of digital art. Students will translate traditional foundations—line, shape, value, gesture, composition, and form—into a digital workflow using pixels, layers, selections, brushes, and simple vector tools. The goal is to understand how images are built from visual structure, then use those principles to begin developing an original world.
                    </p>
                    <ul style={{ paddingLeft: '18px', margin: '0', lineHeight: '1.65', listStyleType: 'disc' }}>
                      <li style={{ marginBottom: '6px' }}>
                        <strong>Digital vs. physical canvas:</strong> pixels, resolution, layers, transparency, and file setup
                      </li>
                      <li style={{ marginBottom: '6px' }}>
                        <strong>Elements and principles of design:</strong> line, shape, contrast, hierarchy, movement, and balance
                      </li>
                      <li style={{ marginBottom: '6px' }}>
                        <strong>Reading images</strong> through silhouette, negative space, value masses, directional lines, and simple forms
                      </li>
                      <li style={{ marginBottom: '6px' }}>
                        <strong>Hands-on Photoshop workflow:</strong> brushes, straight-line construction, Pen Tool paths, Polygonal Lasso blocking, and organized layers
                      </li>
                      <li style={{ marginBottom: '6px' }}>
                        <strong>Assignment 1:</strong> translate an original character or prop through sketch, straight-line, and lasso-blocking studies
                      </li>
                      <li style={{ marginBottom: '6px' }}>
                        <strong>Scene Integration:</strong> place the character or prop into three loose photo-reference scenes using grayscale value studies, simple color palettes, lighting, and blend modes. Explore advanced integrations using a Blender Grease pencil, and a quick trick to create simple 3D models.
                      </li>
                    </ul>
                    <div style={{
                      marginTop: '16px',
                      display: 'flex',
                      gap: '12px',
                      flexWrap: 'wrap',
                      fontSize: '12px',
                      fontFamily: 'var(--font-mono, monospace)',
                      borderTop: '1px solid rgba(0, 0, 0, 0.06)',
                      paddingTop: '12px'
                    }}>
                      <Link 
                        to="/week/01/videos" 
                        style={{
                          textDecoration: 'none',
                          color: '#8b3a2f',
                          fontWeight: 'bold',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px',
                          border: '1px solid rgba(139, 58, 47, 0.2)',
                          background: 'rgba(139, 58, 47, 0.04)',
                          padding: '6px 12px',
                          borderRadius: '16px',
                          transition: 'all 0.15s ease'
                        }}
                        className="resource-button"
                      >
                        🎥 Video Gallery
                      </Link>
                      <Link 
                        to="/week/01/shortcuts" 
                        style={{
                          textDecoration: 'none',
                          color: '#8b3a2f',
                          fontWeight: 'bold',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px',
                          border: '1px solid rgba(139, 58, 47, 0.2)',
                          background: 'rgba(139, 58, 47, 0.04)',
                          padding: '6px 12px',
                          borderRadius: '16px',
                          transition: 'all 0.15s ease'
                        }}
                        className="resource-button"
                      >
                        ⌨️ Shortcuts Sheet
                      </Link>
                    </div>
                  </div>
                )}
                {Number(week.week) === 2 && (
                  <div className="week2-extra-content" style={{ marginTop: '12px', marginBottom: '16px', fontSize: '13.5px', color: 'var(--ink-mid)' }}>
                    <p style={{ lineHeight: '1.6', marginBottom: '10px' }}>
                      Week 2 dives into the materiality of digital paint and texture. Students will bridge the gap between physical and digital media by learning how to design and build custom brush assets, apply procedural noise algorithms, and harness advanced layer blend modes. The goal is to move past the sterile, flat look of default software brushes, using texture and value contrast to create digital surfaces that feel organic, tactile, and responsive to light.
                    </p>
                    <ul style={{ paddingLeft: '18px', margin: '0', lineHeight: '1.65', listStyleType: 'disc' }}>
                      <li style={{ marginBottom: '6px' }}>
                        <strong>Creating tactile digital surfaces:</strong> understanding how to create the illusion of touch through painting, brushes, texture, contrast, and color.
                      </li>
                      <li style={{ marginBottom: '6px' }}>
                        <strong>Noise vs. pattern / procedural generation:</strong> explaining where believable texture comes from and using noise algorithms to simulate organic variation.
                      </li>
                      <li style={{ marginBottom: '6px' }}>
                        <strong>Custom brush presets:</strong> designing and capturing textures to build custom Photoshop brush libraries.
                      </li>
                      <li style={{ marginBottom: '6px' }}>
                        <strong>Color-palette extraction:</strong> capturing material-specific color relationships from photo references to build ASE libraries.
                      </li>
                      <li style={{ marginBottom: '6px' }}>
                        <strong>Defining brushes:</strong> mechanics of brush engine settings, hardness, size, opacity, and flow.
                      </li>
                      <li style={{ marginBottom: '6px' }}>
                        <strong>Contrast preparation:</strong> connecting texture to lighting via highlights, shadows, and value shifts.
                      </li>
                    </ul>
                  </div>
                )}
                {Number(week.week) === 3 && (
                  <div className="week3-extra-content" style={{ marginTop: '12px', marginBottom: '16px', fontSize: '13.5px', color: 'var(--ink-mid)' }}>
                    <p style={{ lineHeight: '1.6', marginBottom: '10px' }}>
                      Week 3 explores the interplay of light, color, and value to establish atmospheric depth and mood. Students will master non-destructive adjustment layers, explore value-driven composition tools, and build custom brush libraries to paint environmental studies. The goal is to learn how to light scenes realistically, separate depth planes with atmospheric perspective, and organize a complex layer stack for a non-destructive production workflow.
                    </p>
                    <ul style={{ paddingLeft: '18px', margin: '0', lineHeight: '1.65', listStyleType: 'disc' }}>
                      <li style={{ marginBottom: '6px' }}>
                        <strong>Value and Chiaroscuro:</strong> understanding how value and tonal range establish mood and organize composition.
                      </li>
                      <li style={{ marginBottom: '6px' }}>
                        <strong>Levels and Histograms:</strong> reading value graphs in Photoshop to define black/white limits and adjust midtones.
                      </li>
                      <li style={{ marginBottom: '6px' }}>
                        <strong>Non-destructive Workflow:</strong> organizing complex files using layer masks, group structures, and clipped adjustment layers.
                      </li>
                      <li style={{ marginBottom: '6px' }}>
                        <strong>Atmospheric Perspective:</strong> separating foreground, midground, and background planes using value shifts and soft, ambient brushes.
                      </li>
                      <li style={{ marginBottom: '6px' }}>
                        <strong>Digital Tools (Brush Maker & Notan Lab):</strong> designing custom brushes from real-world imagery and using shader tools to study value boundaries.
                      </li>
                      <li style={{ marginBottom: '6px' }}>
                        <strong>Compositing & Lighting Match:</strong> matching light direction, color temperature, and contrast intensity between photographed elements.
                      </li>
                    </ul>
                    <div style={{
                      marginTop: '16px',
                      display: 'flex',
                      gap: '12px',
                      flexWrap: 'wrap',
                      fontSize: '12px',
                      fontFamily: 'var(--font-mono, monospace)',
                      borderTop: '1px solid rgba(0, 0, 0, 0.06)',
                      paddingTop: '12px'
                    }}>
                      <Link 
                        to="/week/03/videos" 
                        style={{
                          textDecoration: 'none',
                          color: '#8b3a2f',
                          fontWeight: 'bold',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px',
                          border: '1px solid rgba(139, 58, 47, 0.2)',
                          background: 'rgba(139, 58, 47, 0.04)',
                          padding: '6px 12px',
                          borderRadius: '16px',
                          transition: 'all 0.15s ease'
                        }}
                        className="resource-button"
                      >
                        🎥 Video Gallery
                      </Link>
                    </div>
                  </div>
                )}
                {Number(week.week) === 4 && (
                  <div className="week4-extra-content" style={{ marginTop: '12px', marginBottom: '16px', fontSize: '13.5px', color: 'var(--ink-mid)' }}>
                    <p style={{ lineHeight: '1.6', marginBottom: '10px' }}>
                      Week 4 focuses on page geometry, layout systems, and scalable vector systems for print and digital publishing. Students will explore InDesign's margin, column, and grid systems, contrast vector graphics with raster images in Illustrator and Photoshop, and build responsive layouts designed to scale across varying screen aspect ratios. The goal is to establish professional asset pipeline workflows, export parameters, and formatting conventions required to present artwork in professional portfolios.
                    </p>
                    <ul style={{ paddingLeft: '18px', margin: '0', lineHeight: '1.65', listStyleType: 'disc' }}>
                      <li style={{ marginBottom: '6px' }}>
                        <strong>Vector vs. Raster Geometry:</strong> understanding mathematical curves vs. pixel grids to make the right software choices for artwork.
                      </li>
                      <li style={{ marginBottom: '6px' }}>
                        <strong>InDesign Page Layouts:</strong> engineering layout systems using document margins, column grids, and structural text boxes.
                      </li>
                      <li style={{ marginBottom: '6px' }}>
                        <strong>Grids and Hierarchy:</strong> aligning text, illustrations, and negative space to establish a clear visual pathway for the viewer's eye.
                      </li>
                      <li style={{ marginBottom: '6px' }}>
                        <strong>Multi-Format Adaptation:</strong> adapting a single master artwork into social, web, and print formats by adjusting crop boxes, compositions, and text hierarchy.
                      </li>
                      <li style={{ marginBottom: '6px' }}>
                        <strong>Responsive Layout Design:</strong> building scalable interfaces and design systems that adapt dynamically across diverse screen ratios and viewports.
                      </li>
                      <li style={{ marginBottom: '6px' }}>
                        <strong>Production Asset Export:</strong> mastering professional export presets, image compression settings, bleed margins, and crop marks for high-quality output.
                      </li>
                    </ul>
                  </div>
                )}
                {Number(week.week) === 9 && (
                  <div style={{
                    marginTop: '12px',
                    marginBottom: '4px',
                    display: 'flex',
                    gap: '10px',
                    flexWrap: 'wrap',
                    fontSize: '12px',
                    fontFamily: 'var(--font-mono, monospace)',
                  }}>
                    <Link 
                      to="/week/09" 
                      style={{
                        textDecoration: 'none',
                        color: '#8b3a2f',
                        fontWeight: 'bold',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        border: '1px solid rgba(139, 58, 47, 0.25)',
                        background: 'rgba(139, 58, 47, 0.06)',
                        padding: '6px 12px',
                        borderRadius: '16px',
                        transition: 'all 0.15s ease'
                      }}
                      className="resource-button"
                    >
                      📖 Week 9 Overview &amp; All 8 Articles →
                    </Link>
                    <Link 
                      to="/week/09/capstone-gallery-builder" 
                      style={{
                        textDecoration: 'none',
                        color: '#0369a1',
                        fontWeight: 'bold',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        border: '1px solid rgba(2, 132, 199, 0.25)',
                        background: 'rgba(2, 132, 199, 0.06)',
                        padding: '6px 12px',
                        borderRadius: '16px',
                        transition: 'all 0.15s ease'
                      }}
                      className="resource-button"
                    >
                      🌐 Capstone Gallery Website Builder →
                    </Link>
                    <Link 
                      to="/week/09/style-inspiration-gallery" 
                      style={{
                        textDecoration: 'none',
                        color: '#8b3a2f',
                        fontWeight: 'bold',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        border: '1px solid rgba(139, 58, 47, 0.25)',
                        background: 'rgba(139, 58, 47, 0.06)',
                        padding: '6px 12px',
                        borderRadius: '16px',
                        transition: 'all 0.15s ease'
                      }}
                      className="resource-button"
                    >
                      🎨 Style Inspiration Gallery →
                    </Link>
                    <Link 
                      to="/week/09#master-resources" 
                      style={{
                        textDecoration: 'none',
                        color: '#1e4620',
                        fontWeight: 'bold',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        border: '1px solid rgba(30, 70, 32, 0.25)',
                        background: 'rgba(30, 70, 32, 0.06)',
                        padding: '6px 12px',
                        borderRadius: '16px',
                        transition: 'all 0.15s ease'
                      }}
                      className="resource-button"
                    >
                      📚 Master Resource Directory (38 Links) →
                    </Link>
                  </div>
                )}
                {week.week === 10 && (
                  <div style={{
                    marginTop: '16px',
                    display: 'flex',
                    gap: '10px',
                    flexWrap: 'wrap',
                    fontSize: '12px',
                    fontFamily: 'var(--font-mono, monospace)',
                  }}>
                    <Link 
                      to="/week/10" 
                      style={{
                        textDecoration: 'none',
                        color: '#8b3a2f',
                        fontWeight: 'bold',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        border: '1px solid rgba(139, 58, 47, 0.25)',
                        background: 'rgba(139, 58, 47, 0.06)',
                        padding: '6px 12px',
                        borderRadius: '16px',
                        transition: 'all 0.15s ease'
                      }}
                      className="resource-button"
                    >
                      📖 Week 10 Overview &amp; All 10 Lessons →
                    </Link>
                    <Link 
                      to="/week/10/artist-statements" 
                      style={{
                        textDecoration: 'none',
                        color: '#8b3a2f',
                        fontWeight: 'bold',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        border: '1px solid rgba(139, 58, 47, 0.25)',
                        background: 'rgba(139, 58, 47, 0.06)',
                        padding: '6px 12px',
                        borderRadius: '16px',
                        transition: 'all 0.15s ease'
                      }}
                      className="resource-button"
                    >
                      🖼️ Real Artist Statements Deck →
                    </Link>
                    <Link 
                      to="/week/10/la-creative-economy-2026" 
                      style={{
                        textDecoration: 'none',
                        color: '#1e40af',
                        fontWeight: 'bold',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        border: '1px solid rgba(30, 64, 175, 0.25)',
                        background: 'rgba(30, 64, 175, 0.06)',
                        padding: '6px 12px',
                        borderRadius: '16px',
                        transition: 'all 0.15s ease'
                      }}
                      className="resource-button"
                    >
                      🌟 The LA Creative Economy (2026+) →
                    </Link>
                  </div>
                )}
                {week.week === 11 && (
                  <div style={{
                    marginTop: '16px',
                    display: 'flex',
                    gap: '10px',
                    flexWrap: 'wrap',
                    fontSize: '12px',
                    fontFamily: 'var(--font-mono, monospace)',
                  }}>
                    <Link 
                      to="/week/11" 
                      style={{
                        textDecoration: 'none',
                        color: '#8b3a2f',
                        fontWeight: 'bold',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        border: '1px solid rgba(139, 58, 47, 0.25)',
                        background: 'rgba(139, 58, 47, 0.06)',
                        padding: '6px 12px',
                        borderRadius: '16px',
                        transition: 'all 0.15s ease'
                      }}
                      className="resource-button"
                    >
                      📖 Week 11 Overview &amp; All 3 Lessons →
                    </Link>
                    <Link 
                      to="/week/11/selection-vs-clutter" 
                      style={{
                        textDecoration: 'none',
                        color: '#8b3a2f',
                        fontWeight: 'bold',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        border: '1px solid rgba(139, 58, 47, 0.25)',
                        background: 'rgba(139, 58, 47, 0.06)',
                        padding: '6px 12px',
                        borderRadius: '16px',
                        transition: 'all 0.15s ease'
                      }}
                      className="resource-button"
                    >
                      🎯 Lesson 1: Selection vs. Clutter →
                    </Link>
                    <Link 
                      to="/week/11/interactive-web-vs-static-pdf" 
                      style={{
                        textDecoration: 'none',
                        color: '#1e40af',
                        fontWeight: 'bold',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        border: '1px solid rgba(30, 64, 175, 0.25)',
                        background: 'rgba(30, 64, 175, 0.06)',
                        padding: '6px 12px',
                        borderRadius: '16px',
                        transition: 'all 0.15s ease'
                      }}
                      className="resource-button"
                    >
                      🌐 Lesson 2: Web vs. PDF →
                    </Link>
                    <Link 
                      to="/week/11/grid-alignment-and-negative-space" 
                      style={{
                        textDecoration: 'none',
                        color: '#8b3a2f',
                        fontWeight: 'bold',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        border: '1px solid rgba(139, 58, 47, 0.25)',
                        background: 'rgba(139, 58, 47, 0.06)',
                        padding: '6px 12px',
                        borderRadius: '16px',
                        transition: 'all 0.15s ease'
                      }}
                      className="resource-button"
                    >
                      📐 Lesson 3: Grid Alignment →
                    </Link>
                    <Link 
                      to="/portfolio-reference-gallery" 
                      style={{
                        textDecoration: 'none',
                        color: '#8b3a2f',
                        fontWeight: 'bold',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        border: '1px solid rgba(139, 58, 47, 0.25)',
                        background: 'rgba(139, 58, 47, 0.06)',
                        padding: '6px 12px',
                        borderRadius: '16px',
                        transition: 'all 0.15s ease'
                      }}
                      className="resource-button"
                    >
                      🖼️ Portfolio References (15 Artists) →
                    </Link>
                    <Link 
                      to="/week/11/glyph-table" 
                      style={{
                        textDecoration: 'none',
                        color: '#b45309',
                        fontWeight: 'bold',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        border: '1px solid rgba(180, 83, 9, 0.25)',
                        background: 'rgba(180, 83, 9, 0.06)',
                        padding: '6px 12px',
                        borderRadius: '16px',
                        transition: 'all 0.15s ease'
                      }}
                      className="resource-button"
                    >
                      ✒️ Glyph Table Studio →
                    </Link>
                  </div>
                )}
              </>
            )
          )}

          {((week.saturday?.assignments && week.saturday.assignments.length > 0) || (week.assignments && week.assignments.length > 0) || week.week === 4 || week.week === 9) && (
            <div style={{
              marginTop: '16px',
              marginBottom: '16px',
              padding: '12px 16px',
              background: week.week === 9 ? 'rgba(239, 68, 68, 0.05)' : 'rgba(245, 158, 11, 0.04)',
              border: week.week === 9 ? '1px solid rgba(239, 68, 68, 0.28)' : '1px solid rgba(245, 158, 11, 0.18)',
              borderLeft: week.week === 9 ? '4px solid #dc2626' : undefined,
              borderRadius: '8px',
              fontSize: '13px',
              lineHeight: '1.45',
              color: week.week === 9 ? '#7f1d1d' : '#78350f',
              fontFamily: 'var(--font-sans, sans-serif)',
            }}>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                <span style={{ fontSize: '16px', lineHeight: '1.2' }}>📋</span>
                <div style={{ width: '100%' }}>
                  <strong style={{ display: 'block', marginBottom: '6px', fontSize: '14px', color: week.week === 9 ? '#b91c1c' : '#92400e' }}>Deliverables:</strong>
                  {week.week === 3 || week.week === 4 ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      <div style={{ color: '#b45309', fontWeight: 'bold', marginBottom: '2px' }}>
                        Due Date: July 25th
                      </div>
                      <div>
                        <strong>Base:</strong> 18 custom brushes in folders + stamp test sheet.
                      </div>
                      <div>
                        <strong>Next Level:</strong> 3 landscape compositions (11" × 17" at 300 DPI, layered PSD).
                      </div>
                      <div style={{ fontSize: '12px', marginTop: '6px', paddingTop: '6px', borderTop: '1px solid rgba(245, 158, 11, 0.15)', color: '#b45309', fontStyle: 'italic' }}>
                        <strong>Note:</strong> Keep active Artboards to a minimum. Advanced Integration is optional. Save files for final capstone.
                      </div>
                    </div>
                  ) : week.week === 1 ? (
                    <span>We recommend focusing on both the <strong>Base Assignment</strong> and <strong>Take It to the Next Level</strong> tracks. The <strong>Advanced Integration</strong> track is optional. If you choose to use Photoshop, we recommend keeping the number of active Artboards to a minimum, as a high count can significantly increase your file size. Save files for weekly critique and capstone. Base Assignment requires three initial black and white studies at 16:9, and Take It to the Next Level requires three color versions at 16:9 (but they can also be 9:16).</span>
                  ) : week.week === 5 ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      <div style={{ color: '#b45309', fontWeight: 'bold', marginBottom: '2px' }}>
                        Due Date: August 1st (End of Class)
                      </div>
                      <div style={{ fontSize: '13px', lineHeight: '1.5' }}>
                        This week features a single, unified Character Development assignment. Please submit:
                        <ul style={{ margin: '6px 0 0 16px', padding: 0 }}>
                          <li style={{ marginBottom: '4px' }}><strong>1. Thumbnail Exploration Page</strong> (Min. 20 thumbnails, 1920 × 1080 px)</li>
                          <li style={{ marginBottom: '4px' }}><strong>2. Character Model Sheet</strong> (Name, full-body design, 5 expressions/poses, 11" × 17", 150 PPI)</li>
                          <li style={{ marginBottom: '4px' }}><strong>3. Final Character Illustration</strong> (Rendered character integrated into an environment) — <em>Optional</em></li>
                        </ul>
                      </div>
                    </div>
                  ) : week.week === 6 || week.week === 7 ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      <div style={{ color: '#b45309', fontWeight: 'bold', marginBottom: '2px' }}>
                        Due Date: August 8th (End of Class)
                      </div>
                      <div style={{ fontSize: '13px', lineHeight: '1.5' }}>
                        This week features Assignment 4: Narrative Sequence &amp; Storyboarding tracks:
                        <ul style={{ margin: '6px 0 0 16px', padding: 0 }}>
                          <li style={{ marginBottom: '4px' }}>
                            <strong>Base Assignment: 3-Panel Comic &amp; Turnaround</strong> — Draw a 3-panel sequential comic strip showing a simple character action, alongside a basic character turnaround layout.
                          </li>
                          <li style={{ marginBottom: '4px' }}>
                            <strong>Next Level: Storyboard Sequence &amp; Turnarounds</strong> — Create a 6-to-9 panel storyboard layout with camera moves (dolly zoom, tilt, track), alongside a character model turnaround sheet with expression studies.
                          </li>
                          <li style={{ marginBottom: '4px' }}>
                            <strong>Advanced Integration: Blender Grease Pencil / Animatic Block-In</strong> — Layout a 6-to-9 panel storyboard sequence in Blender using 3D camera staging, and sketch drawings in 3D space using Grease Pencil. — <em>Optional</em>
                          </li>
                        </ul>
                      </div>
                      <div style={{ fontSize: '12px', marginTop: '6px', paddingTop: '6px', borderTop: '1px solid rgba(245, 158, 11, 0.18)', color: '#b45309' }}>
                        <strong>Capstone Milestone:</strong> One-Page Creative Brief due August 8th; Capstone Reference Board due August 15th.
                      </div>
                    </div>
                  ) : week.week === 8 ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <div style={{ color: '#b45309', fontWeight: 'bold', marginBottom: '2px' }}>
                        Due Dates: August 8th (Creative Brief) &amp; August 15th (Capstone Reference Board)
                      </div>
                      <div style={{ fontSize: '13px', lineHeight: '1.5' }}>
                        Please prepare and submit the following Capstone Client Simulation deliverables:
                        <ul style={{ margin: '6px 0 0 16px', padding: 0 }}>
                          <li style={{ marginBottom: '4px' }}>
                            <strong>1. One-Page Creative Brief</strong> — Define your project scope, client simulation premise, problem statement, target audience, key message, and Hero Project track. <em>(Due Aug 8, End of Class)</em>
                          </li>
                          <li style={{ marginBottom: '4px' }}>
                            <strong>2. Capstone Reference Board Layout</strong> — Complete your full visual reference board using the provided SVG template (<code style={{ background: 'rgba(245, 158, 11, 0.15)', padding: '1px 5px', borderRadius: '3px' }}>Capstone_Project_Development_Template.svg</code>) or your own InDesign/Illustrator grid. <em>(Due Aug 15, End of Class)</em>
                          </li>
                        </ul>
                      </div>
                      <div style={{ fontSize: '12px', marginTop: '4px', paddingTop: '6px', borderTop: '1px solid rgba(245, 158, 11, 0.18)', color: '#b45309', fontStyle: 'italic' }}>
                        <strong>Tip:</strong> Complete your Creative Brief first to clarify your Hero Project track choice before assembling your reference board layout.
                      </div>
                    </div>
                  ) : week.week === 9 ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      <div>
                        <div style={{ color: '#991b1b', fontWeight: 'bold', marginBottom: '4px', fontSize: '13.5px', lineHeight: '1.4' }}>
                          For Tuesday Night (August 18th) deliverables due, lets see where everyone is at with the Capstone Reference Board
                        </div>
                        <div style={{ marginTop: '4px' }}>
                          <img 
                            src="/Capstone_Project_Development_Template_preview.png" 
                            alt="Capstone Project Development Template Preview" 
                            style={{
                              width: '100%',
                              maxWidth: '720px',
                              borderRadius: '6px',
                              border: '1px solid rgba(220, 38, 38, 0.25)',
                              display: 'block',
                              margin: '6px 0 8px',
                              boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
                            }}
                          />
                          <div style={{ fontSize: '12px', color: '#991b1b', fontStyle: 'italic', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
                            <span><strong>Capstone Project Development Template Preview</strong> — Check in with your Blockouts, Environments, Characters, Storyboards, and Hero Project.</span>
                            <a 
                              href="/Capstone_Project_Development_Template.svg" 
                              download="Capstone_Project_Development_Template.svg"
                              style={{ color: '#b91c1c', fontWeight: 'bold', textDecoration: 'underline' }}
                            >
                              Download SVG Template ↓
                            </a>
                          </div>
                        </div>
                      </div>

                      <div style={{ paddingTop: '8px', borderTop: '1px solid rgba(220, 38, 38, 0.2)' }}>
                        <div style={{ color: '#991b1b', fontWeight: 'bold', fontSize: '13.5px', marginBottom: '3px' }}>
                          Due Date: Saturday, August 22nd — Practice Pitch
                        </div>
                        <div style={{ fontSize: '13px', color: '#7f1d1d', lineHeight: '1.45' }}>
                          Be prepared to deliver a practice pitch of your project on August 22.
                        </div>
                      </div>
                    </div>
                  ) : week.week === 10 ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <div style={{ color: '#b45309', fontWeight: 'bold', marginBottom: '2px', fontSize: '13.5px' }}>
                        Due Date: Saturday, August 29th (End of Class) — Capstone Finalization
                      </div>
                      <div style={{ fontSize: '13px', lineHeight: '1.5' }}>
                        By the end of class on August 29, all students must complete:
                        <ul style={{ margin: '6px 0 0 16px', padding: 0 }}>
                          <li style={{ marginBottom: '8px', lineHeight: '1.55' }}>
                            <strong>1. Artist Statement</strong> — Complete and refine your written artist statement describing your creative vision, themes, narrative, and technical process.
                            <div style={{ marginTop: '5px' }}>
                              <Link 
                                to="/week/10/artist-statements"
                                style={{
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  gap: '6px',
                                  background: '#8b3a2f',
                                  color: '#ffffff',
                                  padding: '4px 10px',
                                  borderRadius: '4px',
                                  fontSize: '11.5px',
                                  fontWeight: '700',
                                  textDecoration: 'none',
                                  fontFamily: 'var(--font-mono, monospace)',
                                  letterSpacing: '0.03em'
                                }}
                              >
                                🖼️ Real Artist Statements Presentation &amp; Drafting Tool →
                              </Link>
                            </div>
                          </li>
                          <li style={{ marginBottom: '4px' }}>
                            <strong>2. Final Hero Image &amp; Title Slide</strong> — Complete your final polished Hero Image / Title slide layout finalized and ready for the <strong>CAPSTONE</strong>.
                          </li>
                        </ul>
                      </div>
                      <div style={{ fontSize: '12px', marginTop: '4px', paddingTop: '6px', borderTop: '1px solid rgba(245, 158, 11, 0.18)', color: '#b45309', fontStyle: 'italic' }}>
                        <strong>Note:</strong> Weekly assignment tracks (Base, Next Level, Advanced Integration) are optional; prioritize completing your Artist Statement and Final Hero Image / Title Slide for the Capstone.
                      </div>
                    </div>
                  ) : (
                    <span>We recommend focusing on both the <strong>Base Assignment</strong> and <strong>Take It to the Next Level</strong> tracks. The <strong>Advanced Integration</strong> track is optional. If you choose to use Photoshop, we recommend keeping the number of active Artboards to a minimum, as a high count can significantly increase your file size. Save files for weekly critique and capstone.</span>
                  )}
                </div>
              </div>
            </div>
          )}

          {week.tuesday || week.saturday ? (
            <div className={`session-splits ${(adminMode || isAdminView) ? 'admin-stacked' : ''}`} style={{ marginTop: '16px' }}>
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

                  {getSpeakerInfoForWeek(week.week, tuesday, saturday).saturdaySpeaker && (
                    <div className="speaker-box" style={{ borderLeft: '3px solid #10b981', paddingLeft: '10px', background: 'rgba(16, 185, 129, 0.08)', borderRadius: '6px', paddingBottom: '6px', paddingTop: '6px', marginTop: '10px', fontSize: '12px', color: '#059669', fontFamily: 'var(--font-mono)', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '6px', width: 'fit-content' }}>
                      <span>🎤 Speaker: {getSpeakerInfoForWeek(week.week, tuesday, saturday).saturdaySpeaker} · {getSpeakerInfoForWeek(week.week, tuesday, saturday).saturdayDate}</span>
                    </div>
                  )}

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

      {Number(week.week) === 10 && (
        <div style={{
          marginTop: '16px',
          marginBottom: '18px',
          padding: '14px 18px',
          background: 'linear-gradient(135deg, rgba(139, 58, 47, 0.07) 0%, rgba(246, 242, 232, 0.95) 100%)',
          border: '1.5px solid rgba(139, 58, 47, 0.28)',
          borderLeft: '4px solid #8b3a2f',
          borderRadius: '8px',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px'
        }}>
          <div>
            <div style={{
              fontFamily: 'var(--font-mono, monospace)',
              fontSize: '10.5px',
              fontWeight: '700',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              color: '#8b3a2f',
              marginBottom: '4px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}>
              <span>🛠️</span> BONUS TOOL
            </div>
            <div style={{
              fontSize: '14.5px',
              fontWeight: '700',
              color: 'var(--ink, #1c1a17)',
              marginBottom: '3px'
            }}>
              Tips and Tricks Database
            </div>
            <div style={{
              fontSize: '12.5px',
              color: 'var(--ink-mid, #44403a)',
              lineHeight: '1.4'
            }}>
              Interactive field guide and curated specimen archive of digital painting, 3D workflows, brushes, lighting, and animation tips.
            </div>
          </div>
          <Link
            to="/week/10/tips-and-tricks"
            style={{
              textDecoration: 'none',
              background: '#8b3a2f',
              color: '#ffffff',
              fontWeight: '600',
              fontSize: '12.5px',
              padding: '8px 16px',
              borderRadius: '20px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'all 0.15s ease',
              boxShadow: '0 2px 6px rgba(139, 58, 47, 0.25)',
              whiteSpace: 'nowrap'
            }}
            className="bonus-tool-btn"
          >
            EXPLORE TIPS &amp; TRICKS DATABASE →
          </Link>
        </div>
      )}

      {Number(week.week) === 11 && (
        <div style={{
          marginTop: '16px',
          marginBottom: '18px',
          padding: '14px 18px',
          background: 'linear-gradient(135deg, rgba(216, 178, 95, 0.08) 0%, rgba(14, 22, 38, 0.04) 100%)',
          border: '1.5px solid rgba(216, 178, 95, 0.35)',
          borderLeft: '4px solid #d8b25f',
          borderRadius: '8px',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px'
        }}>
          <div>
            <div style={{
              fontFamily: 'var(--font-mono, monospace)',
              fontSize: '10.5px',
              fontWeight: '700',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              color: '#9a7522',
              marginBottom: '4px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}>
              <span>✒️</span> BONUS TOOL
            </div>
            <div style={{
              fontSize: '14.5px',
              fontWeight: '700',
              color: 'var(--ink, #1c1a17)',
              marginBottom: '3px'
            }}>
              Glyph Table — Custom Typography &amp; Font Builder
            </div>
            <div style={{
              fontSize: '12.5px',
              color: 'var(--ink-mid, #44403a)',
              lineHeight: '1.4'
            }}>
              Interactive type design studio: draw custom letterforms, adjust ascender/descender metrics, test live proof text, and export installable TrueType fonts (.ttf).
            </div>
          </div>
          <Link
            to="/week/11/glyph-table"
            style={{
              textDecoration: 'none',
              background: '#0E1626',
              color: '#D8B25F',
              border: '1px solid #D8B25F',
              fontWeight: '600',
              fontSize: '12.5px',
              padding: '8px 16px',
              borderRadius: '20px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'all 0.15s ease',
              boxShadow: '0 2px 6px rgba(0, 0, 0, 0.15)',
              whiteSpace: 'nowrap'
            }}
            className="bonus-tool-btn"
          >
            LAUNCH GLYPH TABLE →
          </Link>
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
  const [activeWeek, setActiveWeek] = useState(null);
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

  // Automatic migration to ensure all assignment labels include (Optional) in bold text
  useEffect(() => {
    if (customCurriculum && customCurriculum.length > 0) {
      let hasChanges = false;
      const updated = customCurriculum.map(week => {
        if (week.saturday && Array.isArray(week.saturday.assignments)) {
          const newAsgs = week.saturday.assignments.map(asg => {
            let updatedAsg = asg;
            if (updatedAsg.includes('**Base Assignment**') && !updatedAsg.includes('(Optional)')) {
              updatedAsg = updatedAsg.replace('**Base Assignment**', '**Base Assignment (Optional)**');
              hasChanges = true;
            }
            if (updatedAsg.includes('**Next Level**') && !updatedAsg.includes('(Optional)')) {
              updatedAsg = updatedAsg.replace('**Next Level**', '**Next Level (Optional)**');
              hasChanges = true;
            }
            if (updatedAsg.includes('**Advanced Integration**') && !updatedAsg.includes('(Optional)')) {
              updatedAsg = updatedAsg.replace('**Advanced Integration**', '**Advanced Integration (Optional)**');
              hasChanges = true;
            }
            if (updatedAsg.includes('**Creative Brief & Capstone Reference Board**') && !updatedAsg.includes('(Optional)')) {
              updatedAsg = updatedAsg.replace('**Creative Brief & Capstone Reference Board**', '**Creative Brief & Capstone Reference Board (Optional)**');
              hasChanges = true;
            }
            if (updatedAsg.includes('**Capstone Reference Board Layout**') && !updatedAsg.includes('(Optional)')) {
              updatedAsg = updatedAsg.replace('**Capstone Reference Board Layout**', '**Capstone Reference Board Layout (Optional)**');
              hasChanges = true;
            }
            return updatedAsg;
          });
          if (hasChanges) {
            return {
              ...week,
              saturday: {
                ...week.saturday,
                assignments: newAsgs
              }
            };
          }
        }
        return week;
      });

      if (hasChanges) {
        setCustomCurriculum(updated);
        saveLocalCurriculum(updated);
        if (supabase) {
          syncRemoteCurriculum(updated);
        }
      }
    }
  }, [customCurriculum]);

  // Automatic migration for Week 5 assignments and topics to ensure old custom databases are updated
  useEffect(() => {
    if (customCurriculum && customCurriculum.length > 4) {
      const week5 = customCurriculum[4];
      if (week5 && week5.week === 5 && week5.saturday) {
        let needsUpdate = false;
        let updatedAssignments = week5.saturday.assignments || [];
        let updatedTopics = week5.saturday.topics || [];

        // Check assignments
        const hasOldAssignment = updatedAssignments.some(a => 
          a.includes('Perspective & Atmospheric Lighting') || a.includes('Next Level: *Narrative Keyframe*')
        );
        if (hasOldAssignment) {
          needsUpdate = true;
          updatedAssignments = [
            '**Base Assignment (Optional)**: *Character Development: Thumbnails, Model Sheet, and Final Illustration* — Develop a page of character thumbnails, a model sheet with expressions, and a final character study integrated into an environment. **Due at the end of Class on August 1**.'
          ];
        }

        // Check topics
        const hasOldTopics = updatedTopics.some(t => 
          t.includes('Character development & emotional range') || t.includes('Environmental storytelling & auditory space')
        );
        if (hasOldTopics) {
          needsUpdate = true;
          updatedTopics = updatedTopics.filter(t => 
            !t.includes('Character development & emotional range') && !t.includes('Environmental storytelling & auditory space')
          );
        }

        // Check Tuesday topics for Symmetry in Photoshop
        let updatedTuesdayTopics = (week5.tuesday && week5.tuesday.topics) || [];
        const hasSymmetryTopic = updatedTuesdayTopics.some(t => t.includes('Symmetry in Photoshop'));
        if (!hasSymmetryTopic) {
          needsUpdate = true;
          updatedTuesdayTopics = [
            '[NEW] Symmetry in Photoshop — the four types + the Symmetry (butterfly) tool',
            ...updatedTuesdayTopics
          ];
        }

        // Check Tuesday readings for Character development & Environmental storytelling
        let updatedTuesdayReadings = (week5.tuesday && week5.tuesday.readings) || [];
        const hasOldReadings = updatedTuesdayReadings.some(r => 
          r === 'Character development' || r === 'Environmental storytelling'
        );
        if (hasOldReadings) {
          needsUpdate = true;
          updatedTuesdayReadings = updatedTuesdayReadings.filter(r => 
            r !== 'Character development' && r !== 'Environmental storytelling'
          );
        }

        if (needsUpdate) {
          const updatedCurriculum = [...customCurriculum];
          updatedCurriculum[4] = {
            ...week5,
            tuesday: {
              ...(week5.tuesday || {}),
              topics: updatedTuesdayTopics,
              readings: updatedTuesdayReadings
            },
            saturday: {
              ...week5.saturday,
              assignments: updatedAssignments,
              topics: updatedTopics
            }
          };
          setCustomCurriculum(updatedCurriculum);
          saveLocalCurriculum(updatedCurriculum);
          if (supabase) {
            syncRemoteCurriculum(updatedCurriculum);
          }
        }
      }
    }
  }, [customCurriculum]);

  // Automatic migration for Week 6 & Week 7 assignments (pushing Assignment 4 to Week 6) and Week 7 guest speaker info
  useEffect(() => {
    if (customCurriculum && customCurriculum.length > 6) {
      const week6Idx = customCurriculum.findIndex(w => w.week === 6);
      const week7Idx = customCurriculum.findIndex(w => w.week === 7);
      
      if (week6Idx !== -1 && week7Idx !== -1) {
        const week6 = customCurriculum[week6Idx];
        const week7 = customCurriculum[week7Idx];
        const week6Assignments = week6.saturday?.assignments || [];
        const week7Assignments = week7.saturday?.assignments || [];
        const week7Readings = week7.tuesday?.readings || [];
        
        const hasAssignment4InWeek7 = week7Assignments.some(a => a.includes('3-Panel Comic') || a.includes('Narrative Sequence'));
        const isWeek6MissingAssignments = week6Assignments.length === 0;
        const hasOldSpeaker = week7Readings.some(r => r.toLowerCase().includes('gochman') && !r.includes('Hassan'));

        if (hasAssignment4InWeek7 || isWeek6MissingAssignments || hasOldSpeaker) {
          const updatedCurriculum = [...customCurriculum];
          
          if (hasAssignment4InWeek7 || isWeek6MissingAssignments) {
            const newWeek6Assignments = [
              '[NEW] **Base Assignment (Optional)**: *3-Panel Comic & Turnaround* — Draw a 3-panel sequential comic strip showing a simple character action, alongside a basic character turnaround layout. **Due at the end of Class on August 8**.',
              '[NEW] **Next Level (Optional)**: *Storyboard Sequence & Turnarounds* — Create a 6-to-9 panel storyboard layout with camera moves (dolly zoom, tilt, track), alongside a character model turnaround sheet with expression studies. **Due at the end of Class on August 8**.',
              '[NEW] **Advanced Integration (Optional)**: *Blender Grease Pencil / Animatic Block-In* — Layout a 6-to-9 panel storyboard sequence in Blender using 3D camera staging, and sketch drawings in 3D space using Grease Pencil. **Due at the end of Class on August 8**.'
            ];

            updatedCurriculum[week6Idx] = {
              ...week6,
              saturday: {
                ...(week6.saturday || {}),
                assignments: newWeek6Assignments
              }
            };

            updatedCurriculum[week7Idx] = {
              ...updatedCurriculum[week7Idx],
              saturday: {
                ...(week7.saturday || {}),
                assignments: []
              }
            };
          }

          if (hasOldSpeaker) {
            const newReadings = week7Readings.map(r => 
              r.toLowerCase().includes('gochman') && !r.includes('Hassan')
                ? 'Guest: Sam Gochman - Creative Technologist, and Hassan Ragab - interdisciplinary designer, visual artist, and Creative AI leader — design brief & development feedback'
                : r
            );
            updatedCurriculum[week7Idx] = {
              ...updatedCurriculum[week7Idx],
              tuesday: {
                ...(updatedCurriculum[week7Idx].tuesday || {}),
                readings: newReadings
              }
            };
          }

          setCustomCurriculum(updatedCurriculum);
          saveLocalCurriculum(updatedCurriculum);
          if (supabase) {
            syncRemoteCurriculum(updatedCurriculum);
          }
        }
      }
    }
  }, [customCurriculum]);

  // Sync from Supabase on load if available
  useEffect(() => {
    if (supabase) {
      setSaveStatus('connecting to cloud...');
      fetchRemoteCurriculum().then((remoteObj) => {
        if (remoteObj && remoteObj.data) {
          const localUpdated = parseInt(localStorage.getItem(`cp-custom-curriculum-updated-v${config.storageVersion || 2}`) || '0', 10);
          if (remoteObj.updated > localUpdated) {
            setCustomCurriculum(remoteObj.data);
            localStorage.setItem(`cp-custom-curriculum-v${config.storageVersion || 2}`, JSON.stringify(remoteObj.data));
            localStorage.setItem(`cp-custom-curriculum-updated-v${config.storageVersion || 2}`, remoteObj.updated.toString());
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

  const role = getActiveRole();

  const visibleWeeks = useMemo(() => {
    return weeks.filter(w => {
      if (role === 'admin') return true;
      return isWeekReleased(w.entry.week);
    });
  }, [weeks, role]);

  const handleLogout = () => {
    try {
      localStorage.removeItem('cp-auth-session');
      localStorage.removeItem('cp-auth-role');
      localStorage.removeItem('cp-view-as-student');
    } catch {}
    window.location.reload();
  };

  return (
    <div className="app">
      <CountdownBanner />
      {role === 'admin' && <ChangelogBanner />}
      <div className="container">
        
        {/* Admin Control Bar */}
        {adminMode && role === 'admin' && (
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

        <TopicSearch
          customCurriculum={customCurriculum}
          onSelectWeek={setActiveWeek}
        />

        <WeekNavBar
          weeks={weeks}
          startDate={startDate}
          activeWeek={activeWeek}
          onSelectWeek={setActiveWeek}
        />

        {/* Weekly Zoom Link Bar */}
        <div className="zoom-bar" style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(37, 99, 235, 0.05)', border: '1px solid rgba(37, 99, 235, 0.2)', borderRadius: '8px', padding: '12px 18px', marginBottom: '12px', marginTop: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '20px' }}>📹</span>
            <span style={{ fontSize: '13.5px', fontWeight: '500', color: '#1d4ed8' }}>
              <strong>Weekly Zoom link:</strong> Join our live Tuesday evening class sessions (6:00 PM – 7:30 PM).
            </span>
          </div>
          <a 
            href="https://us06web.zoom.us/j/6122246828"
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: 'none', background: '#2563eb', color: '#fff', fontSize: '12px', fontWeight: 'bold', padding: '6px 16px', borderRadius: '20px', display: 'inline-flex', alignItems: 'center', gap: '6px', transition: 'all 0.2s', boxShadow: '0 2px 6px rgba(37, 99, 235, 0.25)' }}
          >
            JOIN WEEKLY ZOOM ↗
          </a>
        </div>

        {/* Dropbox Assignment Upload Bar */}
        <div className="dropbox-bar" style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(0, 97, 254, 0.05)', border: '1px solid rgba(0, 97, 254, 0.2)', borderRadius: '8px', padding: '12px 18px', marginBottom: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '20px' }}>📥</span>
            <span style={{ fontSize: '13.5px', fontWeight: '500', color: '#0052cc' }}>
              <strong>Assignment Uploads:</strong> Submit your weekly homework, exercises, and project milestones directly to the class Dropbox folder.
            </span>
          </div>
          <a 
            href="https://www.dropbox.com/request/d56lyvzlb50sm3vjg0yp"
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: 'none', background: '#0061fe', color: '#fff', fontSize: '12px', fontWeight: 'bold', padding: '6px 16px', borderRadius: '20px', display: 'inline-flex', alignItems: 'center', gap: '6px', transition: 'all 0.2s', boxShadow: '0 2px 6px rgba(0, 97, 254, 0.25)' }}
          >
            UPLOAD ASSIGNMENTS (DROPBOX) ↗
          </a>
        </div>

        {(role === 'admin' || role === 'student') && (
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
        )}

        {(role === 'admin' || role === 'student') && (
          <div className="critique-bar" style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(139, 58, 47, 0.05)', border: '1px solid rgba(139, 58, 47, 0.18)', borderRadius: '8px', padding: '12px 18px', marginBottom: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '18px' }}>📌</span>
              <span style={{ fontSize: '13px', fontWeight: '500', color: '#8b3a2f' }}>
                <strong>Critique Zone:</strong> Studio crit wall for weekly pin-ups, classmate feedback, and visual notes.
              </span>
            </div>
            <Link 
              to="/critique" 
              style={{ textDecoration: 'none', background: '#8b3a2f', color: '#fff', fontSize: '12px', fontWeight: 'bold', padding: '6px 14px', borderRadius: '20px', display: 'inline-flex', alignItems: 'center', transition: 'all 0.2s', fontFamily: "'IBM Plex Mono', monospace" }}
            >
              CRITIQUE ZONE WALL →
            </Link>
          </div>
        )}

        {(role === 'admin' || role === 'student') && (
          <div className="brief-builder-bar" style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(139, 58, 47, 0.05)', border: '1px solid rgba(139, 58, 47, 0.18)', borderRadius: '8px', padding: '12px 18px', marginBottom: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '18px' }}>🛠️</span>
              <span style={{ fontSize: '13px', fontWeight: '500', color: '#8b3a2f' }}>
                <strong>Brief Builder:</strong> Interactive creative brief tool — define your project scope, audience, deliverables, and schedule.
              </span>
            </div>
            <Link 
              to="/brief-builder" 
              style={{ textDecoration: 'none', background: '#8b3a2f', color: '#fff', fontSize: '12px', fontWeight: 'bold', padding: '6px 14px', borderRadius: '20px', display: 'inline-flex', alignItems: 'center', transition: 'all 0.2s', fontFamily: "'IBM Plex Mono', monospace" }}
            >
              BRIEF BUILDER →
            </Link>
          </div>
        )}

        {role === 'admin' && (
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
        )}

        {role === 'admin' && (
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
        )}

        {role === 'admin' && (
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
        )}

        <div className="assignments-bar" style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(219, 39, 119, 0.05)', border: '1px solid rgba(219, 39, 119, 0.15)', borderRadius: '8px', padding: '12px 18px', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '18px' }}>📝</span>
            <span style={{ fontSize: '13px', fontWeight: '500', color: '#db2777' }}>
              <strong>Saturday Assignments:</strong> Access detailed guides, track options, and points distribution for the six graded milestones.
            </span>
          </div>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
            <a 
              href="https://www.dropbox.com/request/d56lyvzlb50sm3vjg0yp"
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: 'none', background: '#0061fe', color: '#fff', fontSize: '11.5px', fontWeight: 'bold', padding: '6px 14px', borderRadius: '20px', transition: 'all 0.2s', display: 'inline-flex', alignItems: 'center', gap: '5px' }}
            >
              📤 DROPBOX UPLOAD ↗
            </a>
            <Link 
              to="/assignments" 
              style={{ textDecoration: 'none', background: '#db2777', color: '#fff', fontSize: '11.5px', fontWeight: 'bold', padding: '6px 16px', borderRadius: '20px', transition: 'all 0.2s', display: 'inline-flex', alignItems: 'center', border: '1px dashed #fff' }}
              className="assignments-hub-btn"
            >
              VIEW HUB →
            </Link>
            {[1, 3, 5, 6, 7, 10].map((wk) => {
              const weekData = weeks.find(w => w.entry.week === wk);
              if (!weekData) return null;
              
              const isReleased = role === 'admin' || isWeekReleased(wk);
              if (!isReleased) return null;
              
              return (
                <Link 
                  key={wk}
                  to={`/assignment/${wk}`} 
                  style={{ textDecoration: 'none', background: 'rgba(219, 39, 119, 0.12)', border: '1px solid rgba(219, 39, 119, 0.25)', color: '#be185d', fontSize: '11px', fontWeight: 'bold', padding: '5px 12px', borderRadius: '20px', transition: 'all 0.2s', display: 'inline-flex', alignItems: 'center' }}
                  className="assignment-bar-btn"
                >
                  Week {wk}
                </Link>
              );
            })}
          </div>
        </div>

        {(role === 'admin' || role === 'student') && (
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
        )}

        <div className="logout-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div>
            {role === 'admin' && (
              <button 
                className={`admin-toggle-btn ${adminMode ? 'is-active' : ''}`}
                onClick={() => setAdminMode(!adminMode)}
              >
                {adminMode ? '🔒 Exit Edit Mode' : '🛠️ Admin Edit Mode'}
              </button>
            )}
          </div>
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
            margin: '0 0 12px 0'
          }}>
            This worldbuilding-based curriculum focuses on teaching digital workflows to achieve the broader goals of workforce development in the visual arts. Rather than disconnected drills, the lessons guide students through the creation of <strong>six major assignments</strong> and a final <strong>capstone presentation</strong>.
          </p>
          <p style={{
            fontSize: '14px',
            lineHeight: '1.6',
            color: 'var(--ink-mid, #44403A)',
            margin: '0 0 12px 0'
          }}>
            Using their own original ideas, IP (Intellectual Property), and characters, students will visually develop a unified "world of their own." Assignments are intentionally designed to build upon each other, creating a cohesive portfolio that tells a story.
          </p>
          <p style={{
            fontSize: '14px',
            lineHeight: '1.6',
            color: 'var(--ink-mid, #44403A)',
            margin: '0 0 16px 0'
          }}>
            Note that the assignments are developed to meet your level of expertise, and the "Advanced Integration" sections are optional.
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
                { num: 1, name: 'Character/Prop/Environment Blocking Foundation', wk: 1 },
                { num: 2, name: 'Textures, Brushes and Landscape Studies', wk: 3 },
                { num: 3, name: 'Character Development', wk: 5 },
                { num: 4, name: 'Narrative Sequence', wk: 6 },
                { num: 5, name: 'Release Campaign', wk: 9 },
                { num: 6, name: 'Capstone Creative Brief and Reference Board', wk: 10 }
              ].filter(asg => {
                const weekData = weeks.find(w => w.entry.week === asg.wk);
                return !weekData || role === 'admin' || isWeekReleased(asg.wk);
              }).map((asg) => (
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

        <CurriculumProgression />

        <main className="grid">
          {visibleWeeks.map(({ entry, tuesday, saturday }, idx) => (
            <WeekCard
              key={entry.week}
              week={entry}
              tuesday={tuesday}
              saturday={saturday}
              isCapstone={Number(entry.week) === 13}
              isSelected={activeWeek === entry.week}
              index={idx}
              adminMode={adminMode && role === 'admin'}
              isAdminView={role === 'admin'}
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
        {role === 'admin' && <ChangelogSection />}
        <footer className="footer" style={{ borderTop: 'none', paddingTop: 0 }}>
          <LegalDisclaimer />
          {role === 'admin' && (
            <p style={{ marginTop: '16px' }}>Notes save automatically to this browser. Edit <code>src/curriculum.js</code> to update titles and content.</p>
          )}
        </footer>
      </div>
      
      {/* Export JSON modal overlay */}
      {isExportOpen && role === 'admin' && (
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
  );
}
