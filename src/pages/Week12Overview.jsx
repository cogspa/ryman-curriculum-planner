import React from 'react';
import { Link } from 'react-router-dom';
import CapstoneTimeline from '../components/CapstoneTimeline.jsx';
import PlatformFooter from './PlatformFooter.jsx';

export default function Week12Overview() {
  return (
    <div style={containerStyle}>
      {/* Top Nav Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '10px' }}>
        <Link to="/" style={backLinkStyle}>
          ← Back to Curriculum
        </Link>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <Link
            to="/capstone/timeline"
            style={{
              fontSize: '12.5px',
              fontFamily: "'IBM Plex Mono', monospace",
              color: '#8b3a2f',
              textDecoration: 'none',
              fontWeight: 'bold',
              background: 'rgba(139, 58, 47, 0.08)',
              padding: '6px 14px',
              borderRadius: '16px',
              border: '1px solid rgba(139, 58, 47, 0.25)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            📅 September Capstone Timeline &amp; Run of Show →
          </Link>
          <Link
            to="/capstone"
            style={{
              fontSize: '12.5px',
              fontFamily: "'IBM Plex Mono', monospace",
              color: '#8b3a2f',
              textDecoration: 'none',
              fontWeight: 'bold',
              background: 'rgba(139, 58, 47, 0.08)',
              padding: '6px 14px',
              borderRadius: '16px',
              border: '1px solid rgba(139, 58, 47, 0.25)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            🏛️ Capstone World-Building Brief →
          </Link>
          <a
            href="https://www.dropbox.com/request/d56lyvzlb50sm3vjg0yp"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontSize: '12.5px',
              fontFamily: "'IBM Plex Mono', monospace",
              color: '#0052cc',
              textDecoration: 'none',
              fontWeight: 'bold',
              background: 'rgba(0, 97, 254, 0.08)',
              padding: '6px 14px',
              borderRadius: '16px',
              border: '1px solid rgba(0, 97, 254, 0.25)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            📥 Dropbox Submission Folder ↗
          </a>
        </div>
      </div>

      <header style={headerStyle}>
        <div style={weekTagStyle}>WEEK 12</div>
        <div style={dateRangeStyle}>SEP 08 – SEP 12</div>
      </header>

      <h1 style={titleStyle}>Capstone Preparation &amp; Presentation Milestones</h1>

      <div style={scheduleStyle}>
        <div><strong>TUE</strong> &nbsp; Tue, Sep 08 &nbsp; · &nbsp; 7:00–9:00 pm · Zoom Preview &amp; Capstone Project Reviews (No Guest Speaker)</div>
        <div><strong>SAT</strong> &nbsp; Sat, Sep 12 &nbsp; · &nbsp; 9:00 am–12:30 pm Studio Workshop &nbsp; · &nbsp; <strong style={{ color: '#8b3a2f' }}>1:00 PM Initial Review with Heidi Hirsch</strong></div>
      </div>

      <p style={focusStyle}>
        <strong>Purpose:</strong> Rehearsing final presentation pitches, finalizing slide deck choreography, checking technical AV setups, and locking down all portfolio deliverables for the upcoming Walt Disney Imagineering review and September 19 Capstone Showcase.
      </p>

      {/* Critical Presentation Dates Card */}
      <div style={milestonesCardStyle}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '16px',
          borderBottom: '1px solid rgba(139, 58, 47, 0.2)',
          paddingBottom: '10px'
        }}>
          <h2 style={{
            fontFamily: "'Newsreader', Georgia, serif",
            fontSize: '22px',
            fontWeight: '600',
            color: '#8b3a2f',
            margin: 0
          }}>
            Important Presentation Dates &amp; Deadlines
          </h2>
          <span style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: '11px',
            color: '#8b3a2f',
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
            fontWeight: '600'
          }}>
            Week 12 Countdown
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '14px' }}>
          <div style={milestoneItemStyle}>
            <div style={dateBadgeStyle}>SAT · SEP 05</div>
            <h3 style={milestoneTitleStyle}>Labor Day Weekend (Holiday)</h3>
            <p style={milestoneDescStyle}>
              No in-person studio class. Students use this self-directed window to assemble portfolio selections, test web/PDF exports, and refine hero project materials.
            </p>
          </div>

          <div style={milestoneItemStyle}>
            <div style={dateBadgeStyle}>TUE · SEP 08</div>
            <h3 style={milestoneTitleStyle}>Capstone Project Reviews</h3>
            <p style={milestoneDescStyle}>
              Zoom class focused exclusively on Capstone project reviews. Individual pitch rehearsals, feedback on pacing, narrative clarity, and slide sequence. (No guest speaker).
            </p>
          </div>

          <div style={{ ...milestoneItemStyle, borderColor: '#8b3a2f', background: 'rgba(139, 58, 47, 0.04)' }}>
            <div style={{ ...dateBadgeStyle, background: '#8b3a2f', color: '#fff' }}>SAT · SEP 12 · 1:00 PM</div>
            <h3 style={milestoneTitleStyle}>Initial Portfolio Review: Heidi Hirsch</h3>
            <p style={milestoneDescStyle}>
              In-person review session during studio hours with Heidi Hirsch. Students present their portfolio layout, hero artwork, and presentation pacing for direct industry critique.
            </p>
          </div>

          <div style={{ ...milestoneItemStyle, borderColor: '#d97706', background: 'rgba(217, 119, 6, 0.05)' }}>
            <div style={{ ...dateBadgeStyle, background: '#d97706', color: '#fff' }}>MON · SEP 14 · DEADLINE</div>
            <h3 style={milestoneTitleStyle}>Portfolio Submission (Dropbox for WDI)</h3>
            <p style={milestoneDescStyle}>
              Hard submission cutoff. Upload your final portfolio PDF/deck and website link to Dropbox for the Walt Disney Imagineering review team to preview before the tour.
            </p>
          </div>

          <div style={milestoneItemStyle}>
            <div style={dateBadgeStyle}>FRI · SEP 18 · 10:00 AM – 12:30 PM</div>
            <h3 style={milestoneTitleStyle}>WDI Tour and Portfolio Review</h3>
            <p style={milestoneDescStyle}>
              Offsite tour at Walt Disney Imagineering campus in Glendale. Behind-the-scenes walkthrough, group reviews with Imagineering leads, and professional mentorship.
            </p>
          </div>

          <div style={{ ...milestoneItemStyle, borderColor: '#8b3a2f', background: '#8b3a2f', color: '#fff' }}>
            <div style={{ ...dateBadgeStyle, background: '#f5efe1', color: '#8b3a2f' }}>SAT · SEP 19 · 11:00 AM – 3:30 PM</div>
            <h3 style={{ ...milestoneTitleStyle, color: '#f5efe1' }}>Capstone Presentation Showcase</h3>
            <p style={{ ...milestoneDescStyle, color: 'rgba(245, 239, 225, 0.9)' }}>
              Final formal presentations with industry panel, families, and guests. 3 minutes maximum per student presentation, followed by afternoon catering, networking, and reception.
            </p>
          </div>
        </div>
      </div>

      {/* Embedded September Capstone Timeline Component */}
      <div style={{ marginTop: '40px', borderTop: '2px solid #8b3a2f', paddingTop: '28px' }}>
        <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
          <div>
            <h2 style={{ fontFamily: "'Newsreader', Georgia, serif", fontSize: '24px', fontWeight: '600', margin: '0 0 4px 0', color: '#1d1714' }}>
              Interactive Capstone Timeline &amp; Run of Show
            </h2>
            <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '12px', color: '#6a5c53', margin: 0 }}>
              Live schedule visualizer with daytime ruler, catering marker, and presentation order.
            </p>
          </div>
          <Link
            to="/capstone/timeline"
            style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: '11.5px',
              fontWeight: '700',
              color: '#8b3a2f',
              textDecoration: 'none',
              background: 'rgba(139, 58, 47, 0.08)',
              border: '1px solid rgba(139, 58, 47, 0.25)',
              padding: '6px 14px',
              borderRadius: '16px'
            }}
          >
            Open Standalone View ↗
          </Link>
        </div>

        <CapstoneTimeline hideHeader={false} />
      </div>

      {/* Week 12 Checklist Card */}
      <div style={{
        marginTop: '40px',
        background: 'rgba(0, 0, 0, 0.02)',
        border: '1px solid #d8ccb6',
        borderRadius: '8px',
        padding: '24px 28px'
      }}>
        <h3 style={{
          fontFamily: "'Newsreader', Georgia, serif",
          fontSize: '20px',
          fontWeight: '600',
          color: '#1d1714',
          margin: '0 0 12px 0'
        }}>
          Presentation Readiness Checklist
        </h3>
        <ul style={{
          margin: 0,
          paddingLeft: '20px',
          lineHeight: '1.7',
          fontSize: '14.5px',
          color: '#2b2622'
        }}>
          <li>
            <strong>Curate 6 to 8 Hero Pieces:</strong> Ensure only your strongest work is in the deck. Eliminate filler; each piece must have an intentional role in the worldbuilding narrative.
          </li>
          <li>
            <strong>Presentation Pitch Deck Timing:</strong> Capstone presentations are strictly <strong>3 minutes maximum</strong> per student. Practice with a timer so your introduction, core world premise, hero project reveal, and closing take exactly 2:45 to 3:00.
          </li>
          <li>
            <strong>Dropbox Sync &amp; Backup Decks:</strong> Upload high-res PDFs (1920×1080 px or 16:9 widescreen) by Monday Sept 14. Keep a secondary copy saved locally on your laptop or thumb drive for presentation day.
          </li>
          <li>
            <strong>Website Live Check:</strong> Verify your custom Netlify or portfolio website URL is active, loads fast on mobile viewports, and has working contact information and artist statements.
          </li>
        </ul>
      </div>

      <div style={{ marginTop: '48px' }}>
        <PlatformFooter />
      </div>
    </div>
  );
}

/* Styles */
const containerStyle = {
  maxWidth: '1160px',
  margin: '0 auto',
  padding: '24px 24px 60px',
  fontFamily: "'Newsreader', Georgia, serif",
  color: '#1d1714',
  background: '#f5efe1',
  minHeight: '100vh',
};

const backLinkStyle = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '6px',
  color: '#8b3a2f',
  textDecoration: 'none',
  fontSize: '13px',
  fontWeight: '600',
  fontFamily: "'IBM Plex Mono', monospace",
  background: 'rgba(139, 58, 47, 0.08)',
  padding: '6px 14px',
  borderRadius: '20px',
  border: '1px solid rgba(139, 58, 47, 0.25)',
};

const headerStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  marginBottom: '10px',
  marginTop: '10px',
};

const weekTagStyle = {
  background: '#8b3a2f',
  color: '#f5efe1',
  fontFamily: "'IBM Plex Mono', monospace",
  fontSize: '11.5px',
  fontWeight: '700',
  letterSpacing: '0.1em',
  padding: '3px 10px',
  borderRadius: '4px',
};

const dateRangeStyle = {
  fontFamily: "'IBM Plex Mono', monospace",
  fontSize: '13px',
  color: '#6a5c53',
  fontWeight: '500',
};

const titleStyle = {
  fontSize: 'clamp(28px, 4vw, 42px)',
  fontWeight: '500',
  lineHeight: '1.1',
  margin: '0 0 16px 0',
  color: '#1d1714',
};

const scheduleStyle = {
  background: '#fff',
  border: '1px solid #d8ccb6',
  borderRadius: '6px',
  padding: '12px 16px',
  fontSize: '13px',
  fontFamily: "'IBM Plex Mono', monospace",
  lineHeight: '1.6',
  color: '#2b2622',
  marginBottom: '20px',
  display: 'flex',
  flexDirection: 'column',
  gap: '6px',
};

const focusStyle = {
  fontSize: '17px',
  lineHeight: '1.6',
  color: '#2b2622',
  margin: '0 0 28px 0',
  borderLeft: '3px solid #8b3a2f',
  paddingLeft: '14px',
};

const milestonesCardStyle = {
  background: '#fff',
  border: '1px solid #d8ccb6',
  borderRadius: '8px',
  padding: '24px',
  marginBottom: '32px',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.03)',
};

const milestoneItemStyle = {
  border: '1px solid #d8ccb6',
  borderRadius: '6px',
  padding: '14px 16px',
  background: '#fff',
  display: 'flex',
  flexDirection: 'column',
  gap: '6px',
};

const dateBadgeStyle = {
  fontFamily: "'IBM Plex Mono', monospace",
  fontSize: '11px',
  fontWeight: '700',
  color: '#8b3a2f',
  letterSpacing: '0.04em',
  textTransform: 'uppercase',
  display: 'inline-block',
};

const milestoneTitleStyle = {
  fontFamily: "'Newsreader', Georgia, serif",
  fontSize: '18px',
  fontWeight: '600',
  margin: '2px 0 4px 0',
  color: '#1d1714',
  lineHeight: '1.25',
};

const milestoneDescStyle = {
  fontSize: '13.5px',
  lineHeight: '1.5',
  color: '#6a5c53',
  margin: 0,
};
