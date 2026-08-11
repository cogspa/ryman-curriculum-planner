import { Link } from 'react-router-dom';
import { topicList } from '../content/week08Topics.js';
import LegalDisclaimer from '../LegalDisclaimer.jsx';
import CritiqueZone from '../components/CritiqueZone.jsx';

export default function Week08Overview() {
  return (
    <div style={containerStyle}>
      <Link to="/" style={backLinkStyle}>
        ← Back to Curriculum
      </Link>

      <header style={headerStyle}>
        <div style={weekTagStyle}>WEEK 08</div>
        <div style={dateRangeStyle}>AUG 11 – AUG 15</div>
      </header>

      <h1 style={titleStyle}>Refinement & Presentation</h1>

      <div style={scheduleStyle}>
        <div><strong>TUE</strong> &nbsp; Tue, Aug 11 &nbsp; · &nbsp; 7:00–9:00 pm · Zoom</div>
        <div><strong>SAT</strong> &nbsp; Sat, Aug 15 &nbsp; · &nbsp; 10:00 am–3:30 pm · Reveal Studio</div>
      </div>

      <p style={focusStyle}>
        <strong>Focus:</strong> Polishing individual assets, receiving art direction, structuring pitch decks, and preparing presentation-ready handoff boards for critiques.
      </p>

      <h2 style={sectionHeadingStyle}>Key Discussion & Workflow Topics</h2>
      <ul style={topicListStyle}>
        {topicList.map(({ key, label, isNew }) => (
          <li key={key} style={topicItemStyle}>
            {isNew && <span style={newBadgeStyle}>NEW</span>}
            <Link to={`/week/08/${key}`} style={topicLinkStyle}>
              {label}
            </Link>
          </li>
        ))}
      </ul>

      <h2 style={sectionHeadingStyle}>Industry Guests & Reviews</h2>
      <div style={guestBoxStyle}>
        <p style={{ margin: '0 0 6px' }}>
          <strong>Wayne Hunt</strong> — Design feedback & presentation deck preparation
        </p>
        <p style={{ margin: 0, color: '#5a4a2f' }}>
          <strong>Eugenia Chen</strong> — Creative entrepreneur — navigating freelance taxes, client management & operations
        </p>
      </div>

      <h2 style={sectionHeadingStyle}>Capstone Milestone</h2>
      <p style={assignmentTextStyle}>
        <strong>🛠️ Capstone Milestone 2: Reference Board Complete</strong> — Complete full visual reference board (the thumbnail sketch concept of the whole project laid out in one InDesign/Illustrator file). <strong>Due: End of Class on August 15</strong>.
      </p>

      <div style={{ marginTop: '48px', paddingTop: '32px', borderTop: '2px solid rgba(139, 58, 47, 0.2)' }}>
        <CritiqueZone week={8} />
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
  borderBottom: '1px dotted #d4c9a8',
};

const newBadgeStyle = {
  background: '#f0d97a',
  color: '#5a4a14',
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

const guestBoxStyle = {
  fontSize: '14px',
  margin: '8px 0 0',
  padding: '14px 18px',
  background: '#ece4d0',
  borderLeft: '3px solid #8b3a2f',
  borderRadius: '3px',
  lineHeight: 1.6,
};

const assignmentTextStyle = {
  fontSize: '15px',
  margin: '8px 0 0',
  paddingLeft: '16px',
  borderLeft: '2px solid #d4c9a8',
  fontStyle: 'italic',
};
