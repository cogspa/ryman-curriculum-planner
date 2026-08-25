import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PigmentIndex from '../pigment-index-platform/src/PigmentIndex.jsx';

export default function TipsAndTricksPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Tips and Tricks Database — Ryman Curriculum Planner';
  }, []);

  return (
    <div className="tips-and-tricks-page-wrapper" style={{ minHeight: '100vh', background: '#f5efe1' }}>
      <div style={{
        background: '#f5efe1',
        borderBottom: '1px solid #DDD6C6',
        padding: '12px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'sticky',
        top: 0,
        zIndex: 99
      }}>
        <Link 
          to="/#week-10" 
          style={{
            color: '#8b3a2f',
            textDecoration: 'none',
            fontFamily: 'var(--font-mono, monospace)',
            fontSize: '13px',
            fontWeight: '600',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          ← Back to Week 10
        </Link>
        <span style={{
          fontFamily: 'var(--font-mono, monospace)',
          fontSize: '12px',
          color: '#847C6F',
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          fontWeight: '600'
        }}>
          pLAtform · Bonus Tool · Tips and Tricks Database
        </span>
      </div>
      <PigmentIndex />
    </div>
  );
}
