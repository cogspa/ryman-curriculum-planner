import { Link } from 'react-router-dom';
import { topicList, readingsList } from '../content/week02Topics.js';
import LegalDisclaimer from '../LegalDisclaimer.jsx';
import CritiqueZone from '../components/CritiqueZone.jsx';

export default function Week02Overview() {
  return (
    <div style={containerStyle}>
      <Link to="/" style={backLinkStyle}>
        ← Back to Curriculum
      </Link>

      <header style={headerStyle}>
        <div style={weekTagStyle}>WEEK 02</div>
        <div style={dateRangeStyle}>JUN 30 – JUL 04</div>
      </header>

      <h1 style={titleStyle}>Digital Brushes &amp; Texture Systems</h1>

      <div style={scheduleStyle}>
        <div><strong>TUE</strong> &nbsp; Tue, Jun 30 &nbsp; · &nbsp; 7:00–9:00 pm · Zoom</div>
        <div style={holidayStyle}><strong>SAT</strong> &nbsp; Sat, Jul 04 &nbsp; · &nbsp; ⛔ NO CLASS — HOLIDAY</div>
      </div>

      <div style={focusStyle}>
        <h2 style={{
          fontFamily: 'Georgia, serif',
          fontSize: '18px',
          fontWeight: 'bold',
          margin: '0 0 8px 0',
          color: '#8b3a2f',
        }}>
          Creating tactile digital surfaces through brushes, procedural texture, color, and contrast.
        </h2>
        <p style={{
          fontSize: '14.5px',
          lineHeight: '1.65',
          margin: '0 0 16px 0',
        }}>
          “Simulating tactile surfaces in a tactile digital space” is essentially about creating the illusion of touch through digital painting, brushes, texture, contrast, and color.
        </p>
        <p style={{
          fontSize: '14.5px',
          lineHeight: '1.65',
          margin: '0 0 16px 0',
        }}>
          The topics below support that idea in a logical sequence:
        </p>
        <ul style={{
          paddingLeft: '20px',
          margin: '0 0 10px 0',
          fontSize: '14.5px',
          lineHeight: '1.7',
        }}>
          <li style={{ marginBottom: '8px' }}>
            <strong>Noise vs. pattern / procedural generation:</strong> explains where believable texture comes from. Natural surfaces are rarely perfectly uniform; they contain randomness, repetition, variation, grain, cracks, fibers, pores, etc.
          </li>
          <li style={{ marginBottom: '8px' }}>
            <strong>Custom brush presets:</strong> give students a practical way to turn those texture ideas into usable Photoshop tools.
          </li>
          <li style={{ marginBottom: '8px' }}>
            <strong>Color-palette extraction and ASE libraries:</strong> helps students capture material-specific color relationships from reference images—such as rust, skin, fabric, stone, plastic, foliage, or metal.
          </li>
          <li style={{ marginBottom: '8px' }}>
            <strong>Defining brushes / brush hardness and size:</strong> covers the mechanics of shaping marks, edges, and surface qualities.
          </li>
          <li style={{ marginBottom: '8px' }}>
            <strong>Perlin and fractal noise:</strong> goes deeper into the kinds of controlled randomness that can make digital textures feel organic rather than stamped or artificial.
          </li>
          <li style={{ marginBottom: '8px' }}>
            <strong>Contrast preparation:</strong> connects texture to lighting: highlights, shadows, edge variation, and value shifts are what make a surface feel dimensional and touchable.
          </li>
        </ul>
      </div>

      <h2 style={sectionHeadingStyle}>Topics</h2>
      <ul style={topicListStyle}>
        {topicList.map(({ key, label, isNew }) => (
          <li key={key} style={topicItemStyle}>
            {isNew && <span style={newBadgeStyle}>NEW</span>}
            <Link to={`/week/02/${key}`} style={topicLinkStyle}>
              {label}
            </Link>
          </li>
        ))}
      </ul>

      <h2 style={sectionHeadingStyle}>Readings</h2>
      <ul style={topicListStyle}>
        {readingsList.map(({ key, label, isNew, external }, i) => (
          <li key={`${key}-${i}`} style={topicItemStyle}>
            {isNew && <span style={newBadgeStyle}>NEW</span>}
            {external ? (
              <a href={external} target="_blank" rel="noopener noreferrer" style={topicLinkStyle}>
                {label}
              </a>
            ) : (
              <Link to={`/week/02/${key}`} style={topicLinkStyle}>
                {label}
              </Link>
            )}
          </li>
        ))}
      </ul>

      <h2 style={sectionHeadingStyle}>Guest</h2>
      <p style={guestStyle}>
        Alycea Tinoyan - Background Designer for Rick and Morty
      </p>
      <div style={{ marginTop: '48px', paddingTop: '32px', borderTop: '2px solid rgba(139, 58, 47, 0.2)' }}>
        <CritiqueZone week={2} />
      </div>
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

const holidayStyle = {
  color: '#8b3a2f',
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

const guestStyle = {
  fontSize: '15px',
  margin: '8px 0 0',
  paddingLeft: '16px',
  borderLeft: '2px solid #d4c9a8',
  fontStyle: 'italic',
};
