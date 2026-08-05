import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { TOPIC_DETAILS, topicList } from '../content/week05Topics.js';
import TopicNav from './TopicNav.jsx';

export default function Week05TopicDetail() {
  const { topicKey } = useParams();
  const topic = TOPIC_DETAILS[topicKey];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [topicKey]);

  useEffect(() => {
    if (topic) {
      document.title = `Week 05 · ${topic.title} — Ryman Curriculum`;
    } else {
      document.title = 'Topic Not Found — Ryman Curriculum';
    }
  }, [topic]);

  if (!topic) {
    return (
      <div style={containerStyle}>
        <Link to="/week/05" style={backButtonStyle}>
          ← Back to Week 05
        </Link>
        <h1 style={detailTitleStyle}>Topic not found</h1>
        <p style={sectionBodyStyle}>The requested topic does not exist.</p>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      <Link to="/week/05" style={backButtonStyle}>
        ← Back to Week 05
      </Link>
      
      <h1 style={detailTitleStyle}>{topic.title}</h1>
      
      <div style={sourceTagStyle}>
        {topic.pccSources.length > 0
          ? `Adapted from PCC DMA 12: ${topic.pccSources.join(' · ')}`
          : 'Original content for this class'}
        {topic.sourceNote && <div style={sourceNoteStyle}>{topic.sourceNote}</div>}
      </div>

      {topic.sections.map((section, i) => (
        <section key={i} style={sectionStyle}>
          <h2 style={sectionHeadingStyle}>{section.heading}</h2>
          <div style={sectionBodyStyle}>
            {renderFormattedBody(section.body)}
          </div>
          {section.imageUrl && (
            <div style={{ margin: '20px 0', textAlign: 'center' }}>
              <img src={section.imageUrl} alt={section.imageCaption || section.heading} style={{ maxWidth: '100%', maxHeight: '420px', borderRadius: '6px', border: '1px solid #d4c9a8' }} />
              {section.imageCaption && (
                <p style={{ fontSize: '11px', color: '#8b3a2f', marginTop: '6px', fontStyle: 'italic', fontFamily: 'Menlo, monospace' }}>{section.imageCaption}</p>
              )}
            </div>
          )}
        </section>
      ))}

      <TopicNav topicList={topicList} topicKey={topicKey} weekNum="05" />
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

const detailTitleStyle = {
  fontSize: '28px',
  fontWeight: 400,
  fontStyle: 'italic',
  margin: '24px 0 8px',
  letterSpacing: '-0.01em',
};

const sourceTagStyle = {
  fontFamily: 'Menlo, monospace',
  fontSize: '10px',
  color: '#8b3a2f',
  textTransform: 'uppercase',
  letterSpacing: '0.1em',
  marginBottom: '32px',
  paddingBottom: '16px',
  borderBottom: '1px solid #d4c9a8',
};

const sourceNoteStyle = {
  marginTop: '8px',
  textTransform: 'none',
  letterSpacing: '0',
  fontStyle: 'italic',
  color: '#5a4a2f',
};

const sectionHeadingStyle = {
  fontFamily: 'Menlo, monospace',
  fontSize: '11px',
  letterSpacing: '0.15em',
  color: '#8b3a2f',
  textTransform: 'uppercase',
  margin: '32px 0 16px',
};

const sectionStyle = { marginBottom: '24px' };

const sectionBodyStyle = {
  fontSize: '15px',
  whiteSpace: 'pre-wrap',
  margin: 0,
};

const backButtonStyle = {
  fontFamily: 'Menlo, monospace',
  fontSize: '11px',
  color: '#8b3a2f',
  cursor: 'pointer',
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  textDecoration: 'none',
  display: 'inline-block',
  marginBottom: '16px',
};

function renderFormattedBody(bodyText) {
  if (!bodyText) return null;

  const paragraphs = bodyText.split('\n\n');

  return paragraphs.map((paragraph, pIdx) => {
    const singleLinkMatch = paragraph.trim().match(/^(👉|🎬|▶|↗)?\s*\[([^\]]+)\]\(([^)]+)\)$/);
    if (singleLinkMatch) {
      const emoji = singleLinkMatch[1] || '👉';
      const label = singleLinkMatch[2];
      const url = singleLinkMatch[3];

      return (
        <div key={pIdx} style={{ margin: '20px 0' }}>
          <Link
            to={url}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              background: '#8b3a2f',
              color: '#f5efe1',
              padding: '12px 20px',
              borderRadius: '4px',
              fontFamily: 'Menlo, monospace',
              fontSize: '12.5px',
              fontWeight: 'bold',
              textDecoration: 'none',
              letterSpacing: '0.04em',
              boxShadow: '3px 3px 0 #2a2418',
              transition: 'all 0.2s ease',
            }}
          >
            <span>{emoji}</span>
            <span>{label}</span>
          </Link>
        </div>
      );
    }

    const lines = paragraph.split('\n');

    return (
      <div key={pIdx} style={{ marginBottom: '16px' }}>
        {lines.map((line, lIdx) => {
          const isBullet = line.trim().startsWith('•') || line.trim().startsWith('-');
          return (
            <div
              key={lIdx}
              style={{
                paddingLeft: isBullet ? '16px' : '0',
                marginBottom: lIdx < lines.length - 1 ? '6px' : '0',
                lineHeight: 1.65,
              }}
            >
              {parseLineFormatting(line)}
            </div>
          );
        })}
      </div>
    );
  });
}

function parseLineFormatting(line) {
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  const elements = [];
  let lastIdx = 0;
  let match;

  while ((match = linkRegex.exec(line)) !== null) {
    if (match.index > lastIdx) {
      elements.push(parseBold(line.substring(lastIdx, match.index)));
    }

    const label = match[1];
    const url = match[2];

    if (url.startsWith('/')) {
      elements.push(
        <Link
          key={match.index}
          to={url}
          style={{
            color: '#8b3a2f',
            fontWeight: 'bold',
            textDecoration: 'underline',
          }}
        >
          {label}
        </Link>
      );
    } else {
      elements.push(
        <a
          key={match.index}
          href={url}
          target="_blank"
          rel="noreferrer"
          style={{
            color: '#8b3a2f',
            fontWeight: 'bold',
            textDecoration: 'underline',
          }}
        >
          {label}
        </a>
      );
    }

    lastIdx = match.index + match[0].length;
  }

  if (lastIdx < line.length) {
    elements.push(parseBold(line.substring(lastIdx)));
  }

  return elements;
}

function parseBold(text) {
  if (!text.includes('**')) return text;
  return text.split('**').map((part, idx) =>
    idx % 2 === 1 ? <strong key={idx}>{part}</strong> : part
  );
}

