import { Link } from 'react-router-dom';
import { topicList } from '../content/week05Topics.js';

export default function Week05Overview() {
  return (
    <div style={containerStyle}>
      <Link to="/" style={backLinkStyle}>
        ← Back to Curriculum
      </Link>

      <header style={headerStyle}>
        <div style={weekTagStyle}>WEEK 05</div>
        <div style={dateRangeStyle}>JUL 21 – JUL 25</div>
      </header>

      <h1 style={titleStyle}>Illustration &amp; Visual Storytelling</h1>

      <div style={scheduleStyle}>
        <div><strong>TUE</strong> &nbsp; Tue, Jul 21 &nbsp; · &nbsp; 7:00–9:00 pm · Zoom</div>
        <div><strong>SAT</strong> &nbsp; Sat, Jul 25 &nbsp; · &nbsp; 10:00 am–3:30 pm · Reveal Studio</div>
      </div>

      <p style={focusStyle}>
        <strong>Focus:</strong> Moving beyond single-frame fine art
      </p>

      <h2 style={sectionHeadingStyle}>Topics</h2>
      <ul style={topicListStyle}>
        {topicList.map(({ key, label, isNew }) => (
          <li key={key} style={topicItemStyle}>
            {isNew && <span style={newBadgeStyle}>NEW</span>}
            <Link to={`/week/05/${key}`} style={topicLinkStyle}>
              {label}
            </Link>
          </li>
        ))}
      </ul>

      <h2 style={sectionHeadingStyle}>Guest</h2>
      <p style={guestStyle}>
        Publishing or entertainment illustrator — live demo
      </p>

      <h2 style={sectionHeadingStyle}>Assignment</h2>
      <ul style={topicListStyle}>
        <li style={topicItemStyle}>
          <span style={newBadgeStyle}>NEW</span>
          <Link to="/week/05/three-panel-assignment" style={topicLinkStyle}>
            3-panel narrative illustration — full workflow brief
          </Link>
        </li>
      </ul>
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

const guestStyle = {
  fontSize: '15px',
  margin: '8px 0 0',
  paddingLeft: '16px',
  borderLeft: '2px solid #d4c9a8',
  fontStyle: 'italic',
};
