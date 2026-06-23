import { Link } from 'react-router-dom';
import { topicList } from '../content/week01Topics.js';
import LegalDisclaimer from '../LegalDisclaimer.jsx';

export default function Week01Overview() {
  return (
    <div style={containerStyle}>
      <Link to="/" style={backLinkStyle}>
        ← Back to Curriculum
      </Link>

      <header style={headerStyle}>
        <div style={weekTagStyle}>WEEK 01</div>
        <div style={dateRangeStyle}>JUN 23 – JUN 27</div>
      </header>

      <h1 style={titleStyle}>Translating Classical Foundations</h1>

      <div style={scheduleStyle}>
        <div><strong>TUE</strong> &nbsp; Tue, Jun 23 &nbsp; · &nbsp; 7:00–9:00 pm · Zoom</div>
        <div><strong>SAT</strong> &nbsp; Sat, Jun 27 &nbsp; · &nbsp; 10:00 am–3:30 pm · Reveal Studio</div>
      </div>

      <div style={focusStyle}>
        <h2 style={{
          fontFamily: 'Georgia, serif',
          fontSize: '18px',
          fontWeight: 'bold',
          margin: '0 0 8px 0',
          color: '#8b3a2f',
        }}>
          What Carries Over From Traditional Painting
        </h2>
        <p style={{
          fontSize: '14px',
          fontStyle: 'italic',
          color: '#5c4e37',
          margin: '0 0 20px 0',
        }}>
          value, composition, gesture, form, and the relationship between digital and physical canvases.
        </p>
        <p style={{
          fontSize: '15px',
          lineHeight: '1.65',
          margin: '0 0 20px 0',
        }}>
          Week 1 introduces the visual language of digital art. Students will translate traditional foundations—line, shape, value, gesture, composition, and form—into a digital workflow using pixels, layers, selections, brushes, and simple vector tools. The goal is to understand how images are built from visual structure, then use those principles to begin developing an original world.
        </p>
        <ul style={{
          paddingLeft: '20px',
          margin: '0 0 10px 0',
          fontSize: '14.5px',
          lineHeight: '1.7',
        }}>
          <li style={{ marginBottom: '8px' }}>
            <strong>Digital vs. physical canvas:</strong> pixels, resolution, layers, transparency, and file setup
          </li>
          <li style={{ marginBottom: '8px' }}>
            <strong>Elements and principles of design:</strong> line, shape, contrast, hierarchy, movement, and balance
          </li>
          <li style={{ marginBottom: '8px' }}>
            <strong>Reading images</strong> through silhouette, negative space, value masses, directional lines, and simple forms
          </li>
          <li style={{ marginBottom: '8px' }}>
            <strong>Hands-on Photoshop workflow:</strong> brushes, straight-line construction, Pen Tool paths, Polygonal Lasso blocking, and organized layers
          </li>
          <li style={{ marginBottom: '8px' }}>
            <strong>Assignment 1:</strong> translate an original character or prop through sketch, straight-line, and lasso-blocking studies
          </li>
          <li style={{ marginBottom: '8px' }}>
            <strong>Scene Integration:</strong> place the character or prop into three loose photo-reference scenes using grayscale value studies, simple color palettes, lighting, and blend modes. Explore advanced integrations using a Blender Grease pencil, and a quick trick to create simple 3D models.
          </li>
        </ul>
      </div>

      <h2 style={sectionHeadingStyle}>Topics</h2>
      <ul style={topicListStyle}>
        {topicList.map(({ key, label, isNew }) => (
          <li key={key} style={topicItemStyle}>
            {isNew && <span style={newBadgeStyle}>NEW</span>}
            <Link to={`/week/01/${key}`} style={topicLinkStyle}>
              {label}
            </Link>
          </li>
        ))}
      </ul>
      <LegalDisclaimer style={{ marginTop: '36px' }} />
    </div>
  );
}

// ─── Styles (editorial / hauntological — yellowed paper, mono accents) ─────
const containerStyle = {
  maxWidth: '720px',
  margin: '0 auto',
  padding: '48px 32px',
  background: '#f5efe1',
  color: '#2a2418',
  fontFamily: 'Georgia, "Times New Roman", serif',
  lineHeight: 1.6,
  minHeight: '100vh',
};

const headerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'baseline',
  marginBottom: '8px',
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
  margin: '0 0 24px',
  letterSpacing: '-0.01em',
};

const scheduleStyle = {
  fontFamily: 'Menlo, monospace',
  fontSize: '13px',
  margin: '0 0 24px',
  lineHeight: 1.8,
};

const focusStyle = {
  fontSize: '15px',
  margin: '0 0 32px',
  paddingBottom: '24px',
  borderBottom: '1px solid #d4c9a8',
};

const sectionHeadingStyle = {
  fontFamily: 'Menlo, monospace',
  fontSize: '11px',
  letterSpacing: '0.15em',
  color: '#8b3a2f',
  textTransform: 'uppercase',
  margin: '32px 0 16px',
};

const topicListStyle = {
  listStyle: 'none',
  padding: 0,
  margin: 0,
};

const topicItemStyle = {
  display: 'flex',
  alignItems: 'flex-start',
  gap: '12px',
  padding: '14px 0',
  borderBottom: '1px solid #d4c9a8',
};

const newBadgeStyle = {
  background: '#ffe566',
  color: '#5c4a00',
  fontFamily: 'Menlo, monospace',
  fontSize: '9px',
  letterSpacing: '0.1em',
  padding: '3px 6px',
  borderRadius: '2px',
  flexShrink: 0,
  marginTop: '3px',
  fontWeight: 'bold',
};

const topicLinkStyle = {
  fontFamily: 'Georgia, serif',
  fontSize: '15px',
  color: '#2a2418',
  textAlign: 'left',
  textDecoration: 'none',
  borderBottom: '1px solid #8b3a2f',
  lineHeight: 1.4,
};

const backLinkStyle = {
  fontFamily: 'Menlo, monospace',
  fontSize: '11px',
  color: '#8b3a2f',
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  textDecoration: 'none',
  display: 'inline-block',
  marginBottom: '24px',
};
