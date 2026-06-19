import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { loadLocalCurriculum, fetchRemoteCurriculum } from './curriculumService.js';
import { config } from './curriculum.js';
import { assignments } from './assignments.js';

// ─── Constants & Date Helpers ──────────────────────────────────────────────

const HOLIDAYS = [
  '2026-07-04', // Independence Day
  '2026-09-05', // Labor Day Weekend
];

function isHoliday(date) {
  if (!date) return false;
  const d = new Date(date);
  const iso = d.toISOString().split('T')[0];
  return HOLIDAYS.includes(iso);
}

function parseLocal(str) {
  if (!str) return new Date();
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

function isSameDate(d1, d2) {
  if (!d1 || !d2) return false;
  return d1.getFullYear() === d2.getFullYear() &&
         d1.getMonth() === d2.getMonth() &&
         d1.getDate() === d2.getDate();
}

function getGuestSpeaker(tuesday) {
  if (!tuesday || !tuesday.readings) return null;
  const guestItem = tuesday.readings.find(r => 
    r.startsWith('Guest:') || 
    r.startsWith('Guest Panel:') || 
    r.startsWith('Guest Speakers:')
  );
  if (guestItem) {
    return guestItem.replace(/^Guest( Panel| Speakers)?:\s*/i, '');
  }
  return null;
}

function renderItemText(str) {
  const text = str.replace(/^\[NEW\]\s*/i, '');
  const urlRegex = /(https?:\/\/[^\s,]+)/g;
  if (!urlRegex.test(text)) return text;
  const parts = text.split(urlRegex);
  return parts.map((part, idx) => {
    if (urlRegex.test(part)) {
      return (
        <a 
          key={idx} 
          href={part} 
          target="_blank" 
          rel="noopener noreferrer" 
          style={{ color: 'var(--accent, #A8482A)', textDecoration: 'underline', fontWeight: 'bold' }}
        >
          {part}
        </a>
      );
    }
    return part;
  });
}

export default function CalendarPage() {
  const [startDate] = useState(() => {
    try {
      return localStorage.getItem('cp-start-date') || config.startDate;
    } catch {
      return config.startDate;
    }
  });

  const [customCurriculum, setCustomCurriculum] = useState(() => loadLocalCurriculum());
  const [selectedSession, setSelectedSession] = useState(null);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'

  // Sync from remote database if available
  useEffect(() => {
    fetchRemoteCurriculum().then((remoteObj) => {
      if (remoteObj && remoteObj.data) {
        const localUpdated = parseInt(localStorage.getItem('cp-custom-curriculum-updated') || '0', 10);
        if (remoteObj.updated > localUpdated) {
          setCustomCurriculum(remoteObj.data);
        }
      }
    }).catch(() => {});
  }, []);

  // Compute calculated dates for weeks
  const weeks = useMemo(() => {
    const start = parseLocal(startDate);
    const firstTue = findTuesdayOnOrAfter(start);
    return customCurriculum.map((entry, idx) => {
      const tue = addDays(firstTue, idx * 7);
      const sat = addDays(tue, 4);
      const speaker = getGuestSpeaker(entry.tuesday);
      return { entry, tuesday: tue, saturday: sat, speaker };
    });
  }, [startDate, customCurriculum]);

  // Compute chronological sessions list
  const chronologicalSessions = useMemo(() => {
    const list = [];
    weeks.forEach(({ entry, tuesday, saturday, speaker }) => {
      list.push({
        date: tuesday,
        month: tuesday.toLocaleDateString('en-US', { month: 'long' }),
        dateNum: tuesday.getDate(),
        time: config.tuesday.time,
        type: 'tuesday',
        week: entry.week,
        name: `Week ${String(entry.week).padStart(2, '0')} · Tuesday Zoom — ${entry.title}`,
        description: entry.overview,
        speaker,
        topics: entry.tuesday.topics
      });

      const isSatHoliday = entry.saturday?.topics?.[0]?.includes('Holiday') || isHoliday(saturday);
      list.push({
        date: saturday,
        month: saturday.toLocaleDateString('en-US', { month: 'long' }),
        dateNum: saturday.getDate(),
        time: config.saturday.time,
        type: 'saturday',
        week: entry.week,
        name: `Week ${String(entry.week).padStart(2, '0')} · Saturday Studio ${isSatHoliday ? '(Holiday Break)' : ''}`,
        description: isSatHoliday ? 'Holiday Break — No Saturday Studio Class' : entry.overview,
        topics: entry.saturday.topics,
        isHoliday: isSatHoliday
      });
    });
    return list.sort((a, b) => a.date - b.date);
  }, [weeks]);

  // Compute unique months spanning the term
  const months = useMemo(() => {
    if (weeks.length === 0) return [];
    const start = weeks[0].tuesday;
    const end = weeks[weeks.length - 1].saturday;
    
    const list = [];
    let curr = new Date(start.getFullYear(), start.getMonth(), 1);
    const last = new Date(end.getFullYear(), end.getMonth(), 1);
    
    while (curr <= last) {
      list.push({
        year: curr.getFullYear(),
        month: curr.getMonth(),
        name: curr.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
      });
      curr.setMonth(curr.getMonth() + 1);
    }
    return list;
  }, [weeks]);

  // Generate calendar days for each month grid
  const monthDays = useMemo(() => {
    const map = {};
    months.forEach(({ year, month }) => {
      const key = `${year}-${month}`;
      const firstDay = new Date(year, month, 1);
      const startDayOfWeek = firstDay.getDay();
      const daysInMonth = new Date(year, month + 1, 0).getDate();
      
      const cells = [];
      // Empty padding cells for start offsets
      for (let i = 0; i < startDayOfWeek; i++) {
        cells.push({ day: null, date: null, session: null, isHoliday: false });
      }
      
      // Actual calendar days
      for (let d = 1; d <= daysInMonth; d++) {
        const date = new Date(year, month, d);
        let session = null;
        
        weeks.forEach((w) => {
          if (isSameDate(date, w.tuesday)) {
            session = { type: 'tuesday', week: w.entry.week, date, entry: w.entry, speaker: w.speaker };
          } else if (isSameDate(date, w.saturday)) {
            session = { type: 'saturday', week: w.entry.week, date, entry: w.entry };
          }
        });
        
        cells.push({ day: d, date, session, isHoliday: isHoliday(date) });
      }
      map[key] = cells;
    });
    return map;
  }, [months, weeks]);

  // Default active session to Week 1 Tuesday on load
  useEffect(() => {
    if (weeks.length > 0 && !selectedSession) {
      // Find first Tuesday
      const first = weeks[0];
      setSelectedSession({
        type: 'tuesday',
        week: first.entry.week,
        date: first.tuesday,
        entry: first.entry,
        speaker: first.speaker
      });
    }
  }, [weeks, selectedSession]);

  const handleCellClick = (session) => {
    if (session) {
      setSelectedSession(session);
    }
  };

  const getWeekAssignments = (weekNum) => {
    return assignments[weekNum] || null;
  };

  const downloadCSV = () => {
    const headers = ['Month', 'Date', 'Time', 'Session Name'];
    const rows = chronologicalSessions.map(s => {
      const dayOfWeek = s.date.toLocaleDateString('en-US', { weekday: 'short' });
      return [
        s.month,
        `${s.dateNum} (${dayOfWeek})`,
        s.time,
        s.name.replace(/"/g, '""')
      ];
    });
    
    const csvContent = [
      headers.join(','),
      ...rows.map(r => r.map(val => `"${val}"`).join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'ryman_curriculum_schedule.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="app">
      <div className="container">
        
        {/* Navigation */}
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center', marginBottom: '20px' }}>
          <Link to="/" className="back-link">← Back to Curriculum</Link>
          <span style={{ opacity: 0.3 }}>|</span>
          <Link to="/assignments" className="back-link">📂 Assignments Hub</Link>
        </div>

        {/* Header */}
        <header className="syllabus-header" style={{ marginBottom: '40px', borderBottom: '1px solid rgba(0, 0, 0, 0.1)', paddingBottom: '32px' }}>
          <img 
            src="https://images.squarespace-cdn.com/content/v1/67806c279fb734295979b37e/9e044490-3bd2-4589-a460-cbabd7c93b35/Ryman_Arts_Logo_No_Tagline.png" 
            alt="Ryman Arts Logo" 
            style={{ height: '48px', marginBottom: '16px', display: 'block' }} 
          />
          <p className="syllabus-eyebrow">Academic Term Calendar · Interactive Grid</p>
          <h1 className="syllabus-title" style={{ fontSize: '38px', letterSpacing: '-0.02em', marginBottom: '12px' }}>
            Curriculum Schedule Grid
          </h1>
          <p className="syllabus-sub-title" style={{ fontSize: '15px', margin: '0', color: '#475569', lineHeight: '1.6' }}>
            View all 13 weeks of curriculum sessions at a quick glance.
          </p>
        </header>

        {/* View Switcher Tabs */}
        <div style={{
          display: 'flex',
          background: 'rgba(255, 255, 255, 0.45)',
          backdropFilter: 'blur(8px)',
          border: '1px solid rgba(0, 0, 0, 0.08)',
          borderRadius: '30px',
          padding: '4px',
          gap: '4px',
          marginBottom: '32px',
          maxWidth: 'fit-content',
          flexWrap: 'wrap'
        }}>
          <button
            onClick={() => setViewMode('grid')}
            style={{
              border: 'none',
              background: viewMode === 'grid' ? '#d97706' : 'transparent',
              color: viewMode === 'grid' ? '#fff' : '#475569',
              padding: '8px 20px',
              borderRadius: '24px',
              fontSize: '13px',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'all 0.15s ease-in-out',
              fontFamily: 'var(--font-sans, sans-serif)'
            }}
          >
            📅 Interactive Grid
          </button>
          <button
            onClick={() => setViewMode('list')}
            style={{
              border: 'none',
              background: viewMode === 'list' ? '#d97706' : 'transparent',
              color: viewMode === 'list' ? '#fff' : '#475569',
              padding: '8px 20px',
              borderRadius: '24px',
              fontSize: '13px',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'all 0.15s ease-in-out',
              fontFamily: 'var(--font-sans, sans-serif)'
            }}
          >
            📋 Detailed Agenda
          </button>
          <button
            onClick={() => setViewMode('list-simple')}
            style={{
              border: 'none',
              background: viewMode === 'list-simple' ? '#d97706' : 'transparent',
              color: viewMode === 'list-simple' ? '#fff' : '#475569',
              padding: '8px 20px',
              borderRadius: '24px',
              fontSize: '13px',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'all 0.15s ease-in-out',
              fontFamily: 'var(--font-sans, sans-serif)'
            }}
          >
            📃 Simple List (No Description)
          </button>
        </div>

        {viewMode === 'grid' ? (
          <>
            {/* Top Interactive View (Calendar Grid & Inspector Card) */}
            <div className="calendar-interactive-layout" style={{
              display: 'grid',
              gridTemplateColumns: '1.6fr 1fr',
              gap: '32px',
              marginBottom: '48px',
              alignItems: 'start'
            }}>
              
              {/* Calendar Months Grids */}
              <div className="calendar-grids-container" style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '24px'
              }}>
                {months.map(({ year, month, name }) => {
                  const key = `${year}-${month}`;
                  const cells = monthDays[key] || [];
                  const weekHeaders = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

                  return (
                    <div key={key} className="month-calendar" style={{
                      background: 'var(--card, #FBFAF6)',
                      border: '1px solid var(--hairline, #DDD6C6)',
                      borderRadius: '12px',
                      padding: '20px',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.02)'
                    }}>
                      <h3 style={{ 
                        fontFamily: 'var(--font-display, serif)', 
                        fontSize: '18px', 
                        fontWeight: 'normal', 
                        margin: '0 0 16px 0', 
                        textAlign: 'center',
                        borderBottom: '1px solid var(--hairline, #DDD6C6)',
                        paddingBottom: '8px',
                        color: 'var(--ink, #1C1A17)'
                      }}>
                        {name}
                      </h3>

                      {/* Day headers */}
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px', textAlign: 'center', marginBottom: '8px' }}>
                        {weekHeaders.map((h, i) => (
                          <span key={i} style={{ 
                            fontSize: '10px', 
                            fontFamily: 'var(--font-mono, monospace)', 
                            color: 'var(--ink-mute, #847C6F)', 
                            fontWeight: 'bold' 
                          }}>
                            {h}
                          </span>
                        ))}
                      </div>

                      {/* Days grid */}
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px' }}>
                        {cells.map((cell, idx) => {
                          const isSelected = selectedSession && cell.session && 
                                             selectedSession.type === cell.session.type && 
                                             selectedSession.week === cell.session.week;
                          
                          let cellStyle = {
                            height: '42px',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: '6px',
                            fontSize: '13px',
                            position: 'relative',
                            transition: 'all 0.15s ease'
                          };

                          let bgClass = 'cell-empty';
                          let label = '';
                          let badgeStyle = null;

                          if (cell.day) {
                            cellStyle.cursor = 'default';
                            if (cell.session) {
                              cellStyle.cursor = 'pointer';
                              if (cell.session.type === 'tuesday') {
                                bgClass = isSelected ? 'cell-tuesday-selected' : 'cell-tuesday';
                                label = `W${cell.session.week}`;
                                badgeStyle = { background: '#d97706', color: '#fff' };
                              } else if (cell.session.type === 'saturday') {
                                const isSatHoliday = cell.session.entry.saturday?.topics?.[0]?.includes('Holiday');
                                if (isSatHoliday || cell.isHoliday) {
                                  bgClass = isSelected ? 'cell-holiday-selected' : 'cell-holiday';
                                  label = '⛔';
                                } else {
                                  bgClass = isSelected ? 'cell-saturday-selected' : 'cell-saturday';
                                  label = `W${cell.session.week}`;
                                  badgeStyle = { background: 'var(--accent, #A8482A)', color: '#fff' };
                                }
                              }
                            } else if (cell.isHoliday) {
                              bgClass = 'cell-holiday-empty';
                            }
                          }

                          return (
                            <div 
                              key={idx} 
                              className={`calendar-cell ${bgClass}`}
                              style={cellStyle}
                              onClick={() => cell.session && handleCellClick(cell.session)}
                              title={cell.session ? `Week ${cell.session.week} ${cell.session.type === 'tuesday' ? 'Tuesday Zoom' : 'Saturday Reveal Studio'}` : ''}
                            >
                              {cell.day && (
                                <>
                                  <span style={{ 
                                    fontWeight: cell.session ? 'bold' : 'normal',
                                    color: cell.session ? 'inherit' : 'var(--ink-mid, #44403A)',
                                    fontSize: '13px'
                                  }}>
                                    {cell.day}
                                  </span>
                                  {label && (
                                    <span style={{
                                      position: 'absolute',
                                      bottom: '2px',
                                      fontSize: '8px',
                                      fontFamily: 'var(--font-mono, monospace)',
                                      padding: '1px 3px',
                                      borderRadius: '3px',
                                      lineHeight: '1',
                                      ...badgeStyle
                                    }}>
                                      {label}
                                    </span>
                                  )}
                                </>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Session Inspector Card */}
              <div className="selected-session-card" style={{
                background: 'var(--card-warm, #F6F2E8)',
                border: '2px solid var(--hairline-strong, #C9C1AE)',
                borderRadius: '12px',
                padding: '24px',
                position: 'sticky',
                top: '20px',
                boxShadow: '0 8px 30px rgba(0, 0, 0, 0.05)'
              }}>
                {selectedSession ? (
                  <div>
                    {/* Header */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', borderBottom: '1px solid var(--hairline, #DDD6C6)', paddingBottom: '12px' }}>
                      <span style={{
                        fontFamily: 'var(--font-mono, monospace)',
                        fontSize: '11px',
                        fontWeight: 'bold',
                        textTransform: 'uppercase',
                        color: selectedSession.type === 'tuesday' ? '#d97706' : 'var(--accent, #A8482A)',
                        background: selectedSession.type === 'tuesday' ? 'rgba(217, 119, 6, 0.1)' : 'rgba(168, 72, 42, 0.1)',
                        padding: '4px 10px',
                        borderRadius: '4px'
                      }}>
                        Week {String(selectedSession.week).padStart(2, '0')} · {selectedSession.type === 'tuesday' ? 'Tuesday Zoom' : 'Saturday Studio'}
                      </span>
                      <span style={{ fontSize: '12px', color: 'var(--ink-mute, #847C6F)', fontFamily: 'var(--font-mono, monospace)' }}>
                        {fmtMonoDate(selectedSession.date)}
                      </span>
                    </div>

                    <h2 style={{ fontFamily: 'var(--font-display, serif)', fontSize: '24px', fontWeight: 'normal', margin: '0 0 8px 0', color: 'var(--ink, #1C1A17)' }}>
                      {selectedSession.entry.title}
                    </h2>
                    <p style={{ fontSize: '13.5px', color: 'var(--ink-mid, #44403A)', margin: '0 0 20px 0', fontStyle: 'italic', lineHeight: '1.4' }}>
                      {selectedSession.entry.overview}
                    </p>

                    {/* Logistics */}
                    <div style={{ background: '#fff', border: '1px solid var(--hairline, #DDD6C6)', borderRadius: '6px', padding: '12px', marginBottom: '20px', fontSize: '12.5px' }}>
                      <div style={{ marginBottom: '6px' }}>
                        <strong>⏰ Time:</strong> {selectedSession.type === 'tuesday' ? config.tuesday.time : config.saturday.time}
                      </div>
                      <div style={{ marginBottom: selectedSession.speaker ? '6px' : '0' }}>
                        <strong>📍 Location:</strong> {selectedSession.type === 'tuesday' ? config.tuesday.location : config.saturday.location}
                      </div>
                      {selectedSession.speaker && (
                        <div>
                          <strong>🎤 Guest Speaker:</strong> <span style={{ color: 'var(--accent, #A8482A)', fontWeight: '500' }}>{selectedSession.speaker}</span>
                        </div>
                      )}
                    </div>

                    {/* Session Details */}
                    {selectedSession.type === 'tuesday' ? (
                      <>
                        <h4 style={{ fontFamily: 'var(--font-mono, monospace)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--accent, #A8482A)', margin: '0 0 8px 0' }}>
                          Session Topics
                        </h4>
                        <ul style={{ paddingLeft: '18px', margin: '0 0 20px 0', fontSize: '13.5px', lineHeight: '1.5', color: 'var(--ink, #1C1A17)' }}>
                          {selectedSession.entry.tuesday.topics.map((t, idx) => (
                            <li key={idx} style={{ marginBottom: '6px' }}>{renderItemText(t)}</li>
                          ))}
                        </ul>

                        {selectedSession.entry.tuesday.readings && selectedSession.entry.tuesday.readings.length > 0 && (
                          <>
                            <h4 style={{ fontFamily: 'var(--font-mono, monospace)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--accent, #A8482A)', margin: '0 0 8px 0' }}>
                              Preparatory Readings / Media
                            </h4>
                            <ul style={{ paddingLeft: '18px', margin: '0 0 16px 0', fontSize: '13.5px', lineHeight: '1.5', color: 'var(--ink, #1C1A17)' }}>
                              {selectedSession.entry.tuesday.readings.map((r, idx) => (
                                <li key={idx} style={{ marginBottom: '6px' }}>{renderItemText(r)}</li>
                              ))}
                            </ul>
                          </>
                        )}
                      </>
                    ) : (
                      <>
                        <h4 style={{ fontFamily: 'var(--font-mono, monospace)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--accent, #A8482A)', margin: '0 0 8px 0' }}>
                          Studio Topics
                        </h4>
                        <ul style={{ paddingLeft: '18px', margin: '0 0 20px 0', fontSize: '13.5px', lineHeight: '1.5', color: 'var(--ink, #1C1A17)' }}>
                          {selectedSession.entry.saturday.topics.map((t, idx) => (
                            <li key={idx} style={{ marginBottom: '6px' }}>{renderItemText(t)}</li>
                          ))}
                        </ul>

                        {/* Saturday Assignment Milestone */}
                        {getWeekAssignments(selectedSession.week) && (
                          <div style={{
                            background: 'rgba(168, 72, 42, 0.03)',
                            borderLeft: '3px solid var(--accent, #A8482A)',
                            padding: '12px 14px',
                            borderRadius: '0 6px 6px 0',
                            marginTop: '16px'
                          }}>
                            <h5 style={{ margin: '0 0 4px 0', fontSize: '12.5px', fontWeight: 'bold', color: 'var(--accent, #A8482A)' }}>
                              📝 Saturday Graded Milestone
                            </h5>
                            <p style={{ margin: '0 0 10px 0', fontSize: '12px', fontWeight: '500' }}>
                              {getWeekAssignments(selectedSession.week).title}
                            </p>
                            <Link 
                              to={`/assignment/${selectedSession.week}`} 
                              style={{
                                fontSize: '11px',
                                fontFamily: 'var(--font-mono, monospace)',
                                color: 'var(--accent, #A8482A)',
                                textDecoration: 'none',
                                fontWeight: 'bold',
                                display: 'inline-block'
                              }}
                            >
                              OPEN ASSIGNMENT GUIDE →
                            </Link>
                          </div>
                        )}
                      </>
                    )}

                    {/* Sub-nav Overview Link */}
                    {selectedSession.week <= 7 && (
                      <div style={{ marginTop: '24px', borderTop: '1px solid var(--hairline, #DDD6C6)', paddingTop: '16px', textAlign: 'center' }}>
                        <Link 
                          to={`/week/0${selectedSession.week}`} 
                          className="inline-link"
                          style={{ fontSize: '12.5px', fontFamily: 'var(--font-mono, monospace)', textTransform: 'uppercase', textDecoration: 'none', fontWeight: 'bold' }}
                        >
                          Browse Week {selectedSession.week} Overview →
                        </Link>
                      </div>
                    )}
                  </div>
                ) : (
                  <p style={{ textAlign: 'center', color: 'var(--ink-mute, #847C6F)', fontSize: '14px', margin: '20px 0' }}>
                    Select a session in the calendar grid to view full details.
                  </p>
                )}
              </div>
            </div>

            {/* Directory Lists Section */}
            <section className="calendar-directory-lists" style={{
              borderTop: '1px solid var(--hairline, #DDD6C6)',
              paddingTop: '40px',
              marginTop: '32px'
            }}>
              <h2 style={{ fontFamily: 'var(--font-display, serif)', fontSize: '28px', fontWeight: 'normal', margin: '0 0 24px 0', color: 'var(--ink, #1C1A17)' }}>
                Schedule Directory List
              </h2>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))',
                gap: '32px'
              }}>
                
                {/* Tuesdays ZOOM list */}
                <div>
                  <h3 style={{ 
                    fontFamily: 'var(--font-sans, sans-serif)', 
                    fontSize: '18px', 
                    fontWeight: 'bold', 
                    color: '#d97706',
                    borderBottom: '2px solid #fcd34d',
                    paddingBottom: '8px',
                    marginBottom: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    <span>🖥️</span> Tuesday Zoom Sessions (7:00–9:00 pm)
                  </h3>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {weeks.map(({ entry, tuesday, speaker }) => (
                      <div 
                        key={entry.week} 
                        style={{
                          background: '#fff',
                          border: '1px solid var(--hairline, #DDD6C6)',
                          borderRadius: '8px',
                          padding: '16px',
                          transition: 'transform 0.15s ease, border-color 0.15s ease',
                          cursor: 'pointer'
                        }}
                        onClick={() => setSelectedSession({ type: 'tuesday', week: entry.week, date: tuesday, entry, speaker })}
                        className={`directory-list-item ${selectedSession?.type === 'tuesday' && selectedSession?.week === entry.week ? 'is-active' : ''}`}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                          <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono, monospace)', fontWeight: 'bold', color: '#d97706' }}>
                            WEEK {String(entry.week).padStart(2, '0')} · ZOOM
                          </span>
                          <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono, monospace)', color: 'var(--ink-mute, #847C6F)' }}>
                            {fmtDate(tuesday)}
                          </span>
                        </div>

                        <h4 style={{ margin: '0 0 6px 0', fontSize: '15px', fontWeight: 'bold', color: 'var(--ink, #1C1A17)' }}>
                          {entry.title}
                        </h4>

                        {speaker && (
                          <p style={{ margin: '0 0 8px 0', fontSize: '12.5px', color: 'var(--accent, #A8482A)', fontWeight: '500' }}>
                            🎤 Guest: {speaker}
                          </p>
                        )}

                        <div style={{ fontSize: '12.5px', color: 'var(--ink-mid, #44403A)' }}>
                          <span style={{ fontWeight: 'bold' }}>Topics Preview:</span>
                          <ul style={{ margin: '4px 0 0 0', paddingLeft: '18px' }}>
                            {entry.tuesday.topics.map((t, i) => (
                              <li key={i}>{t.replace(/^\[NEW\]\s*/i, '')}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Saturdays IN-PERSON list */}
                <div>
                  <h3 style={{ 
                    fontFamily: 'var(--font-sans, sans-serif)', 
                    fontSize: '18px', 
                    fontWeight: 'bold', 
                    color: 'var(--accent, #A8482A)',
                    borderBottom: '2px solid var(--accent-soft, #E6CFC4)',
                    paddingBottom: '8px',
                    marginBottom: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    <span>🎨</span> Saturday Reveal Studio Sessions (10:00 am–3:30 pm)
                  </h3>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {weeks.map(({ entry, saturday, speaker }) => {
                      const isSatHoliday = entry.saturday?.topics?.[0]?.includes('Holiday') || isHoliday(saturday);
                      const assignment = getWeekAssignments(entry.week);

                      return (
                        <div 
                          key={entry.week} 
                          style={{
                            background: isSatHoliday ? '#f3f4f6' : '#fff',
                            border: '1px solid var(--hairline, #DDD6C6)',
                            borderRadius: '8px',
                            padding: '16px',
                            transition: 'transform 0.15s ease, border-color 0.15s ease',
                            cursor: 'pointer',
                            opacity: isSatHoliday ? 0.75 : 1
                          }}
                          onClick={() => !isSatHoliday && setSelectedSession({ type: 'saturday', week: entry.week, date: saturday, entry, speaker })}
                          className={`directory-list-item ${selectedSession?.type === 'saturday' && selectedSession?.week === entry.week ? 'is-active' : ''}`}
                        >
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                            <span style={{ 
                              fontSize: '11px', 
                              fontFamily: 'var(--font-mono, monospace)', 
                              fontWeight: 'bold', 
                              color: isSatHoliday ? '#64748b' : 'var(--accent, #A8482A)' 
                            }}>
                              WEEK {String(entry.week).padStart(2, '0')} · {isSatHoliday ? 'HOLIDAY' : 'STUDIO'}
                            </span>
                            <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono, monospace)', color: 'var(--ink-mute, #847C6F)' }}>
                              {fmtDate(saturday)}
                            </span>
                          </div>

                          <h4 style={{ margin: '0 0 8px 0', fontSize: '15px', fontWeight: 'bold', color: 'var(--ink, #1C1A17)' }}>
                            {isSatHoliday ? 'Holiday Break — No Class' : entry.title}
                          </h4>

                          <div style={{ fontSize: '12.5px', color: 'var(--ink-mid, #44403A)', marginBottom: assignment ? '12px' : '0' }}>
                            <span style={{ fontWeight: 'bold' }}>Studio Workshop:</span>
                            <ul style={{ margin: '4px 0 0 0', paddingLeft: '18px' }}>
                              {entry.saturday.topics.map((t, i) => (
                                <li key={i} style={{ color: isSatHoliday ? '#b91c1c' : 'inherit', fontWeight: isSatHoliday ? 'bold' : 'normal' }}>
                                  {t.replace(/^\[NEW\]\s*/i, '')}
                                </li>
                              ))}
                            </ul>
                          </div>

                          {assignment && !isSatHoliday && (
                            <div style={{ 
                              background: 'rgba(219, 39, 119, 0.04)', 
                              border: '1px solid rgba(219, 39, 119, 0.1)', 
                              borderRadius: '6px', 
                              padding: '10px 12px',
                              fontSize: '12px'
                            }}>
                              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                                <span style={{ fontWeight: 'bold', color: '#db2777' }}>📝 Milestone: {assignment.title}</span>
                              </div>
                              <p style={{ margin: '0 0 6px 0', color: 'var(--ink-mute, #847C6F)', fontStyle: 'italic' }}>
                                {assignment.subtitle}
                              </p>
                              <div style={{ display: 'flex', gap: '8px', fontSize: '10.5px' }}>
                                <span style={{ color: '#2563eb', fontWeight: '600' }}>• Base</span>
                                <span style={{ color: '#db2777', fontWeight: '600' }}>• Next Level</span>
                                <span style={{ color: '#0f766e', fontWeight: '600' }}>• 3D</span>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

              </div>
            </section>
          </>
        ) : (
          <div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '16px' }}>
              <button 
                onClick={downloadCSV} 
                style={{ 
                  background: '#059669', 
                  color: '#fff', 
                  border: 'none', 
                  padding: '8px 16px', 
                  borderRadius: '20px', 
                  fontSize: '12.5px', 
                  fontWeight: 'bold', 
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                  transition: 'opacity 0.2s'
                }}
                onMouseOver={(e) => e.currentTarget.style.opacity = 0.9}
                onMouseOut={(e) => e.currentTarget.style.opacity = 1}
              >
                📥 Download Spreadsheet (CSV)
              </button>
            </div>
            
            <div className="simple-agenda-list" style={{
              background: 'var(--card, #FBFAF6)',
              border: '1px solid var(--hairline, #DDD6C6)',
              borderRadius: '12px',
              padding: '24px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.02)',
              marginBottom: '48px',
              overflowX: 'auto'
            }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px', minWidth: viewMode === 'list-simple' ? '500px' : '700px' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid var(--hairline, #DDD6C6)', textAlign: 'left' }}>
                    <th style={{ padding: '12px 8px', fontFamily: 'var(--font-mono, monospace)', fontSize: '11px', color: 'var(--ink-mute, #847C6F)', width: '120px' }}>MONTH</th>
                    <th style={{ padding: '12px 8px', fontFamily: 'var(--font-mono, monospace)', fontSize: '11px', color: 'var(--ink-mute, #847C6F)', width: '100px' }}>DATE</th>
                    <th style={{ padding: '12px 8px', fontFamily: 'var(--font-mono, monospace)', fontSize: '11px', color: 'var(--ink-mute, #847C6F)', width: '150px' }}>TIME</th>
                    <th style={{ padding: '12px 8px', fontFamily: 'var(--font-mono, monospace)', fontSize: '11px', color: 'var(--ink-mute, #847C6F)', width: viewMode === 'list-simple' ? 'auto' : '320px' }}>SESSION NAME</th>
                    {viewMode !== 'list-simple' && (
                      <th style={{ padding: '12px 8px', fontFamily: 'var(--font-mono, monospace)', fontSize: '11px', color: 'var(--ink-mute, #847C6F)' }}>DESCRIPTION</th>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {chronologicalSessions.map((session, idx) => {
                    const dayOfWeek = session.date.toLocaleDateString('en-US', { weekday: 'short' });
                    return (
                      <tr 
                        key={idx} 
                        style={{ 
                          borderBottom: '1px solid var(--hairline, #DDD6C6)',
                          background: session.isHoliday ? 'rgba(0, 0, 0, 0.015)' : 'transparent',
                          opacity: session.isHoliday ? 0.75 : 1
                        }}
                        className="agenda-row"
                      >
                        <td style={{ padding: '14px 8px', fontWeight: 'bold', color: 'var(--ink, #1C1A17)' }}>
                          {session.month}
                        </td>
                        <td style={{ padding: '14px 8px', fontFamily: 'var(--font-mono, monospace)', color: 'var(--ink-mid, #44403A)' }}>
                          {session.dateNum} <span style={{ fontSize: '11px', opacity: 0.6 }}>({dayOfWeek})</span>
                        </td>
                        <td style={{ padding: '14px 8px', color: 'var(--ink-mid, #44403A)' }}>
                          <span style={{
                            display: 'inline-block',
                            padding: '3px 8px',
                            borderRadius: '12px',
                            fontSize: '11.5px',
                            fontWeight: 'bold',
                            background: session.type === 'tuesday' ? 'rgba(217, 119, 6, 0.08)' : session.isHoliday ? 'rgba(0, 0, 0, 0.06)' : 'rgba(168, 72, 42, 0.08)',
                            color: session.type === 'tuesday' ? '#d97706' : session.isHoliday ? '#4b5563' : 'var(--accent, #A8482A)'
                          }}>
                            {session.time}
                          </span>
                        </td>
                        <td style={{ padding: '14px 8px' }}>
                          <div style={{ fontWeight: 'bold', color: 'var(--ink, #1C1A17)', fontSize: '14px' }}>
                            {session.isHoliday ? (
                              <span style={{ color: '#b91c1c' }}>⛔ {session.name}</span>
                            ) : (
                              session.name
                            )}
                          </div>
                          {session.speaker && (
                            <div style={{ fontSize: '12px', color: 'var(--accent, #A8482A)', marginTop: '4px', fontWeight: '500' }}>
                              🎤 Guest: {session.speaker}
                            </div>
                          )}
                        </td>
                        {viewMode !== 'list-simple' && (
                          <td style={{ padding: '14px 8px', color: 'var(--ink-mid, #44403A)', lineHeight: '1.5' }}>
                            <div style={{ marginBottom: '6px' }}>{session.description}</div>
                            {session.topics && session.topics.length > 0 && !session.isHoliday && (
                              <div style={{ fontSize: '12px', opacity: 0.8 }}>
                                <strong>Topics:</strong> {session.topics.map(t => t.replace(/^\[NEW\]\s*/i, '')).join(' · ')}
                              </div>
                            )}
                          </td>
                        )}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
