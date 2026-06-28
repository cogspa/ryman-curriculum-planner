import React, { useState } from 'react';
import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { isWeekReleased, getActiveRole } from './releaseUtils.js';

const AUTH_KEY = 'cp-auth-session';
const ROLE_KEY = 'cp-auth-role';

export default function LoginGate() {
  const [authed, setAuthed] = useState(() => {
    try {
      return localStorage.getItem(AUTH_KEY) === 'true';
    } catch {
      return false;
    }
  });
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const location = useLocation();

  function handleSubmit(e) {
    e.preventDefault();
    const normalizedUser = username.trim();
    if (normalizedUser === 'RYMAN' && password === 'pLAtform100!') {
      setAuthed(true);
      try {
        localStorage.setItem(AUTH_KEY, 'true');
        localStorage.setItem(ROLE_KEY, 'admin');
      } catch {}
      window.location.reload();
    } else if (normalizedUser === 'pLAtform' && password === 'launch26') {
      setAuthed(true);
      try {
        localStorage.setItem(AUTH_KEY, 'true');
        localStorage.setItem(ROLE_KEY, 'student');
      } catch {}
      window.location.reload();
    } else {
      setError('Invalid credentials');
      setTimeout(() => setError(''), 2500);
    }
  }

  if (!authed) {
    return (
      <div className="login-gate">
        <form className="login-form" onSubmit={handleSubmit}>
          <p className="login-eyebrow">2026 · 12-week program</p>
          <h1 className="login-title">Ryman Arts pLAtform</h1>
          <p className="login-subtitle">Launch Pad Summer/Fall 2026</p>
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

  const authRole = localStorage.getItem(ROLE_KEY) || 'student';
  const role = getActiveRole();
  if (role === 'student') {
    const path = location.pathname;
    
    // Student allowed pages:
    // - Home: /
    // - Syllabus: /syllabus
    // - FAQ: /faq
    // - Calendar: /calendar
    // - Assignments Hub (filtered): /assignments
    // - Released assignments: /assignment/:week (only if released)
    // - Released weeks: /week/01, /week/01/:topicKey, etc. (only if released)
    
    let isAllowed = false;
    
    if (path === '/' || path === '/syllabus' || path === '/assignments' || path === '/faq' || path === '/calendar' || path === '/pixel-budget') {
      isAllowed = true;
    } else {
      const assignmentMatch = path.match(/^\/assignment\/(\d+)/);
      if (assignmentMatch) {
        const weekNum = parseInt(assignmentMatch[1], 10);
        if (isWeekReleased(weekNum)) {
          isAllowed = true;
        }
      }
      
      const weekMatch = path.match(/^\/week\/0?(\d+)/);
      if (weekMatch) {
        const weekNum = parseInt(weekMatch[1], 10);
        if (isWeekReleased(weekNum)) {
          isAllowed = true;
        }
      }
    }
    
    if (!isAllowed) {
      return <Navigate to="/" replace />;
    }
  }

  const viewAsStudent = localStorage.getItem('cp-view-as-student') === 'true';

  const handleToggleView = () => {
    try {
      localStorage.setItem('cp-view-as-student', viewAsStudent ? 'false' : 'true');
    } catch {}
    window.location.reload();
  };

  return (
    <>
      {authRole === 'admin' && (
        <div className="admin-simulation-banner" style={{
          background: viewAsStudent ? '#1e293b' : '#7c3aed',
          color: '#fff',
          padding: '8px 16px',
          textAlign: 'center',
          fontSize: '12px',
          fontFamily: 'var(--font-mono, monospace)',
          fontWeight: '500',
          letterSpacing: '0.05em',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '12px',
          zIndex: 9999,
          position: 'relative',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          {viewAsStudent ? (
            <>
              <span>👁️ SIMULATING STUDENT VIEW (Released weeks only, no edit options)</span>
              <button 
                onClick={handleToggleView}
                style={{
                  background: '#ef4444',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '12px',
                  padding: '3px 12px',
                  fontSize: '11px',
                  fontWeight: '700',
                  cursor: 'pointer',
                  fontFamily: 'var(--font-mono, monospace)',
                  textTransform: 'uppercase'
                }}
              >
                Back to Admin View
              </button>
            </>
          ) : (
            <>
              <span>🛡️ ADMIN VIEW (Full editing privileges)</span>
              <button 
                onClick={handleToggleView}
                style={{
                  background: '#10b981',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '12px',
                  padding: '3px 12px',
                  fontSize: '11px',
                  fontWeight: '700',
                  cursor: 'pointer',
                  fontFamily: 'var(--font-mono, monospace)',
                  textTransform: 'uppercase'
                }}
              >
                Simulate Student View
              </button>
            </>
          )}
        </div>
      )}
      <Outlet />
    </>
  );
}
