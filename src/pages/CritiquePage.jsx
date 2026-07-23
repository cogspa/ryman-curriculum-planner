import React from 'react';
import { Link } from 'react-router-dom';
import CritiqueZone from '../components/CritiqueZone.jsx';
import LegalDisclaimer from '../LegalDisclaimer.jsx';

export default function CritiquePage() {
  return (
    <div className="app">
      <div className="container">
        <div style={{ padding: '32px 0 60px 0' }}>
          <div className="no-print" style={{ marginBottom: '24px' }}>
            <Link 
              to="/" 
              className="back-link"
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: '11px',
                color: '#8b3a2f',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              ← Back to Curriculum
            </Link>
          </div>
          <CritiqueZone weeks={14} />
          <LegalDisclaimer style={{ marginTop: '48px' }} />
        </div>
      </div>
    </div>
  );
}
