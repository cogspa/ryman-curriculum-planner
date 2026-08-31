import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import GlyphTable from '../glyph-table/GlyphTable.jsx';

export default function GlyphTablePage() {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Glyph Table: Type Design Studio — Ryman Curriculum Planner';
  }, []);

  return (
    <div className="glyph-table-page-wrapper" style={{ minHeight: '100vh', background: '#0E1626' }}>
      {/* Sticky Header Nav */}
      <div style={{
        background: '#15223A',
        borderBottom: '1px solid #24405C',
        padding: '12px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'sticky',
        top: 0,
        zIndex: 99
      }}>
        <Link 
          to="/#week-11" 
          style={{
            color: '#D8B25F',
            textDecoration: 'none',
            fontFamily: 'var(--font-mono, monospace)',
            fontSize: '13px',
            fontWeight: '600',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          ← Back to Week 11
        </Link>
        <span style={{
          fontFamily: 'var(--font-mono, monospace)',
          fontSize: '12px',
          color: '#7F93AC',
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          fontWeight: '600'
        }}>
          pLAtform · Week 11 · Bonus Tool · Glyph Table
        </span>
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '16px 20px 40px' }}>
        <GlyphTable />
      </div>
    </div>
  );
}
