import React from 'react';
import { Link } from 'react-router-dom';
import CapstoneTimeline from '../components/CapstoneTimeline.jsx';
import PlatformFooter from './PlatformFooter.jsx';

export default function CapstoneTimelinePage() {
  return (
    <div style={{ background: '#f5efe1', minHeight: '100vh', color: '#1d1714' }}>
      {/* Top Nav Header */}
      <header style={{
        borderBottom: '1px solid #d8ccb6',
        background: 'rgba(245, 239, 225, 0.95)',
        backdropFilter: 'blur(8px)',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        padding: '14px 24px'
      }}>
        <div style={{
          maxWidth: '1160px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
            <Link
              to="/"
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: '12px',
                fontWeight: '600',
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                color: '#8b3a2f',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 14px',
                borderRadius: '20px',
                background: 'rgba(139, 58, 47, 0.08)',
                border: '1px solid rgba(139, 58, 47, 0.25)',
                transition: 'all 0.15s ease'
              }}
            >
              ← Back to Curriculum
            </Link>
            <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '12px', color: '#6a5c53' }}>
              pLAtform · Capstone Timeline
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
            <Link
              to="/week/12"
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: '11.5px',
                fontWeight: '600',
                color: '#8b3a2f',
                textDecoration: 'none',
                padding: '6px 12px',
                borderRadius: '16px',
                background: 'rgba(139, 58, 47, 0.06)',
                border: '1px solid rgba(139, 58, 47, 0.2)'
              }}
            >
              📅 Week 12 Prep →
            </Link>
            <Link
              to="/capstone"
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: '11.5px',
                fontWeight: '600',
                color: '#8b3a2f',
                textDecoration: 'none',
                padding: '6px 12px',
                borderRadius: '16px',
                background: 'rgba(139, 58, 47, 0.06)',
                border: '1px solid rgba(139, 58, 47, 0.2)'
              }}
            >
              🏛️ Capstone Brief →
            </Link>
            <a
              href="https://www.dropbox.com/request/d56lyvzlb50sm3vjg0yp"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: '11.5px',
                fontWeight: '600',
                color: '#0052cc',
                textDecoration: 'none',
                padding: '6px 14px',
                borderRadius: '16px',
                background: 'rgba(0, 97, 254, 0.08)',
                border: '1px solid rgba(0, 97, 254, 0.25)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px'
              }}
            >
              📥 Dropbox Upload ↗
            </a>
          </div>
        </div>
      </header>

      {/* Hero Overview Callout */}
      <div style={{ maxWidth: '1160px', margin: '32px auto 0', padding: '0 24px' }}>
        <div style={{
          background: 'rgba(139, 58, 47, 0.05)',
          borderLeft: '4px solid #8b3a2f',
          borderRadius: '0 8px 8px 0',
          padding: '20px 24px',
          border: '1px solid rgba(139, 58, 47, 0.15)',
          borderLeftWidth: '4px'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '12px',
            marginBottom: '10px'
          }}>
            <span style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: '12px',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              fontWeight: '700',
              color: '#8b3a2f'
            }}>
              🎯 Critical Presentation Milestone Dates
            </span>
            <span style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: '11.5px',
              color: '#6a5c53'
            }}>
              September 2026 Cohort
            </span>
          </div>
          <p style={{
            fontFamily: "'Newsreader', Georgia, serif",
            fontSize: '17px',
            lineHeight: '1.6',
            color: '#2b2622',
            margin: '0 0 12px 0'
          }}>
            The final stretch of the program focuses on presentation staging, curated portfolio decks, and industry critiques. Keep note of the upcoming initial review with Heidi Hirsch, the Dropbox submission cutoff for Walt Disney Imagineering (WDI), the WDI offsite tour, and our final Capstone presentation showcase.
          </p>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '10px',
            fontSize: '13px',
            fontFamily: "'IBM Plex Mono', monospace"
          }}>
            <div style={{ background: '#fff', padding: '10px 14px', borderRadius: '6px', border: '1px solid #d8ccb6' }}>
              <div style={{ color: '#8b3a2f', fontWeight: 'bold' }}>Tue Sep 8</div>
              <div>Capstone Project Reviews (Zoom)</div>
            </div>
            <div style={{ background: '#fff', padding: '10px 14px', borderRadius: '6px', border: '1px solid #d8ccb6' }}>
              <div style={{ color: '#8b3a2f', fontWeight: 'bold' }}>Sat Sep 12 · 1:00 PM</div>
              <div>Initial Review: Heidi Hirsch</div>
            </div>
            <div style={{ background: '#fff', padding: '10px 14px', borderRadius: '6px', border: '1px solid #8b3a2f' }}>
              <div style={{ color: '#8b3a2f', fontWeight: 'bold' }}>Mon Sep 14 · Dropbox</div>
              <div>Portfolio Submission Due (WDI)</div>
            </div>
            <div style={{ background: '#fff', padding: '10px 14px', borderRadius: '6px', border: '1px solid #d8ccb6' }}>
              <div style={{ color: '#8b3a2f', fontWeight: 'bold' }}>Fri Sep 18 · 10:00 AM</div>
              <div>WDI Tour &amp; Portfolio Review</div>
            </div>
            <div style={{ background: '#8b3a2f', color: '#fff', padding: '10px 14px', borderRadius: '6px' }}>
              <div style={{ fontWeight: 'bold', color: '#f5efe1' }}>Sat Sep 19 · 11:00 AM</div>
              <div>Capstone Presentation Showcase</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Capstone Timeline Component */}
      <main style={{ padding: '24px 0 40px' }}>
        <CapstoneTimeline />
      </main>

      {/* Shared Footer */}
      <PlatformFooter />
    </div>
  );
}
