import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PortfolioReferenceGallery from '../portfolio-reference-gallery/src/PortfolioReferenceGallery.jsx';

export default function PortfolioReferenceGalleryPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Portfolio Reference Gallery — Ryman Curriculum Planner';
  }, []);

  return (
    <div className="portfolio-gallery-page-wrapper" style={{ minHeight: '100vh', background: '#f5efe1' }}>
      {/* Sticky Top Header Nav */}
      <div style={{
        background: '#ebe2cf',
        borderBottom: '1px solid #8b3a2f',
        padding: '10px 24px',
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
            color: '#8b3a2f',
            textDecoration: 'none',
            fontFamily: 'var(--font-mono, monospace)',
            fontSize: '13px',
            fontWeight: '700',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          ← Back to Week 11
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <Link
            to="/week/11"
            style={{
              color: '#8b3a2f',
              textDecoration: 'none',
              fontFamily: 'var(--font-mono, monospace)',
              fontSize: '12px',
              fontWeight: '600'
            }}
          >
            Week 11 Overview
          </Link>
          <span style={{
            fontFamily: 'var(--font-mono, monospace)',
            fontSize: '11.5px',
            color: '#6e5f57',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            fontWeight: '600'
          }}>
            pLAtform · Week 11 · Portfolio Reference Gallery
          </span>
        </div>
      </div>

      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <PortfolioReferenceGallery />
      </div>
    </div>
  );
}
