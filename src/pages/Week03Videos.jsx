import React from 'react';
import { Link } from 'react-router-dom';
import LegalDisclaimer from '../LegalDisclaimer.jsx';

export default function Week03Videos() {
  const videos = [
    { id: 'Vog2TPvaWmE', title: 'how to create a cloud brush' }
  ];

  return (
    <div style={containerStyle}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <Link to="/week/03" style={backLinkStyle}>
          ← Back to Week 3 Overview
        </Link>
        <Link to="/" style={backLinkStyle}>
          📂 Home Page
        </Link>
      </div>

      <header style={headerStyle}>
        <div style={weekTagStyle}>WEEK 03</div>
        <div style={dateRangeStyle}>VIDEO GALLERY</div>
      </header>

      <h1 style={titleStyle}>Workflow & Technique Video Guides</h1>
      <p style={subtitleStyle}>
        Review these recorded tutorials covering advanced digital painting and cloud brush creation workflows.
      </p>

      <div style={gridStyle}>
        {videos.map((vid, idx) => (
          <div key={idx} style={cardStyle}>
            <div style={videoWrapperStyle}>
              <iframe
                src={`https://www.youtube.com/embed/${vid.id}`}
                title={vid.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={iframeStyle}
              ></iframe>
            </div>
            <div style={cardContentStyle}>
              <span style={numberTagStyle}>VIDEO {String(idx + 1).padStart(2, '0')}</span>
              <h3 style={videoTitleStyle}>{vid.title}</h3>
            </div>
          </div>
        ))}
      </div>

      <LegalDisclaimer style={{ marginTop: '48px' }} />
    </div>
  );
}

// Styles
const containerStyle = {
  maxWidth: '960px',
  margin: '0 auto',
  padding: '48px 32px',
  background: '#f5efe1',
  color: '#2a2418',
  fontFamily: 'Georgia, "Times New Roman", serif',
  lineHeight: 1.6,
  minHeight: '100vh',
};

const backLinkStyle = {
  fontFamily: 'Menlo, monospace',
  fontSize: '11px',
  color: '#8b3a2f',
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  textDecoration: 'none',
  display: 'inline-block',
};

const headerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'baseline',
  marginBottom: '8px',
  borderBottom: '1px solid #d4c9a8',
  paddingBottom: '8px'
};

const weekTagStyle = {
  fontFamily: 'Menlo, monospace',
  fontSize: '11px',
  letterSpacing: '0.15em',
  color: '#8b3a2f',
  textTransform: 'uppercase',
};

const dateRangeStyle = {
  fontFamily: 'Menlo, monospace',
  fontSize: '11px',
  letterSpacing: '0.1em',
  color: '#8b3a2f',
};

const titleStyle = {
  fontSize: '32px',
  fontWeight: 400,
  fontStyle: 'italic',
  margin: '16px 0 8px',
  letterSpacing: '-0.01em',
};

const subtitleStyle = {
  fontSize: '15px',
  color: '#5c4e37',
  marginBottom: '36px',
};

const gridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
  gap: '24px',
};

const cardStyle = {
  background: '#fff',
  border: '1px solid #d4c9a8',
  borderRadius: '8px',
  overflow: 'hidden',
  boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
  display: 'flex',
  flexDirection: 'column',
};

const videoWrapperStyle = {
  position: 'relative',
  paddingBottom: '56.25%', // 16:9 aspect ratio
  height: 0,
  overflow: 'hidden',
};

const iframeStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
};

const cardContentStyle = {
  padding: '16px',
  display: 'flex',
  flexDirection: 'column',
  gap: '6px',
  flexGrow: 1,
  justifyContent: 'flex-start',
};

const numberTagStyle = {
  fontFamily: 'Menlo, monospace',
  fontSize: '9px',
  color: '#8b3a2f',
  letterSpacing: '0.1em',
};

const videoTitleStyle = {
  fontFamily: 'Georgia, serif',
  fontSize: '15px',
  fontWeight: 'bold',
  lineHeight: '1.4',
  margin: 0,
  color: '#2a2418',
};
