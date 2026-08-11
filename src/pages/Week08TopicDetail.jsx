import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { TOPIC_DETAILS, topicList } from '../content/week08Topics.js';
import TopicNav from './TopicNav.jsx';

export default function Week08TopicDetail() {
  const { topicKey } = useParams();
  const topic = TOPIC_DETAILS[topicKey];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [topicKey]);

  useEffect(() => {
    if (topic) {
      document.title = `Week 08 · ${topic.title} — Ryman Curriculum`;
    } else {
      document.title = 'Topic Not Found — Ryman Curriculum';
    }
  }, [topic]);

  if (!topic) {
    return (
      <div style={containerStyle}>
        <Link to="/week/08" style={backButtonStyle}>
          ← Back to Week 08
        </Link>
        <h1 style={detailTitleStyle}>Topic not found</h1>
        <p style={sectionBodyStyle}>The requested topic does not exist.</p>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      <Link to="/week/08" style={backButtonStyle}>
        ← Back to Week 08
      </Link>
      
      <h1 style={detailTitleStyle}>{topic.title}</h1>
      {topic.subtitle && <p style={subtitleStyle}>{topic.subtitle}</p>}
      
      <div style={sourceTagStyle}>
        {topic.pccSources && topic.pccSources.length > 0
          ? `Industry Guidelines: ${topic.pccSources.join(' · ')}`
          : 'Original studio curriculum for this class'}
        {topic.sourceNote && <div style={sourceNoteStyle}>{topic.sourceNote}</div>}
      </div>

      {topic.sections.map((section, i) => (
        <section key={i} style={sectionCardStyle}>
          {section.heading && <h2 style={sectionHeadingStyle}>{section.heading}</h2>}
          {section.subheading && <h3 style={sectionSubheadingStyle}>{section.subheading}</h3>}
          
          {section.dialogue && section.dialogue.length > 0 && (
            <div style={dialogueContainerStyle}>
              <div style={dialogueHeaderBadgeStyle}>SCRIPTED STUDIO DIALOGUE</div>
              {section.dialogue.map((turn, tIdx) => {
                const isDirector = turn.role === 'director';
                const isDesigner = turn.role === 'designer';
                const isClient = turn.role === 'client';

                let speakerBg = '#f0e8d5';
                let speakerColor = '#5a4a2f';
                let tagBg = 'rgba(90, 74, 47, 0.15)';

                if (isDirector) {
                  speakerBg = '#f5e8e4';
                  speakerColor = '#8b3a2f';
                  tagBg = 'rgba(139, 58, 47, 0.15)';
                } else if (isDesigner) {
                  speakerBg = '#e8f0ec';
                  speakerColor = '#2d5a3f';
                  tagBg = 'rgba(45, 90, 63, 0.15)';
                } else if (isClient) {
                  speakerBg = '#f7eed8';
                  speakerColor = '#7a5a14';
                  tagBg = 'rgba(122, 90, 20, 0.15)';
                }

                return (
                  <div key={tIdx} style={{ ...dialogueTurnStyle, background: speakerBg }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                      <span style={{ ...dialogueSpeakerBadge, background: tagBg, color: speakerColor }}>
                        {turn.speaker}
                      </span>
                    </div>
                    <p style={{ ...dialogueTextStyle, color: '#2a2418' }}>
                      "{turn.text}"
                    </p>
                  </div>
                );
              })}
            </div>
          )}

          <div style={sectionBodyStyle}>
            {renderFormattedBody(section.body)}
          </div>

          {section.imageUrl && (
            <div style={{ margin: '20px 0', textAlign: 'center' }}>
              <img
                src={section.imageUrl}
                alt={section.imageCaption || section.heading}
                style={{ maxWidth: '100%', maxHeight: '420px', borderRadius: '6px', border: '1px solid #d4c9a8' }}
              />
              {section.imageCaption && (
                <p style={{ fontSize: '11px', color: '#8b3a2f', marginTop: '6px', fontStyle: 'italic', fontFamily: 'Menlo, monospace' }}>
                  {section.imageCaption}
                </p>
              )}
            </div>
          )}
        </section>
      ))}

      <TopicNav topicList={topicList} topicKey={topicKey} weekNum="08" />
    </div>
  );
}

// ─── Body Text Parser ──────────────────────────────────────────────────────────
function renderFormattedBody(bodyText) {
  if (!bodyText) return null;

  const paragraphs = bodyText.split('\n\n');

  return paragraphs.map((paragraph, pIdx) => {
    // Check for code blocks
    if (paragraph.trim().startsWith('```')) {
      const codeLines = paragraph.replace(/```[a-z]*/g, '').trim();
      return (
        <pre key={pIdx} style={codeBlockStyle}>
          <code>{codeLines}</code>
        </pre>
      );
    }

    const lines = paragraph.split('\n');

    return (
      <div key={pIdx} style={{ marginBottom: '16px' }}>
        {lines.map((line, lIdx) => {
          const trimmed = line.trim();
          const isBullet = trimmed.startsWith('•') || trimmed.startsWith('-');
          const isCheckmark = trimmed.startsWith('👉') || trimmed.startsWith('❌') || trimmed.startsWith('🛡️');
          const isInsteadOf = trimmed.startsWith('• **Instead of:**');

          let lineStyle = {
            paddingLeft: isBullet ? '16px' : '0',
            marginBottom: lIdx < lines.length - 1 ? '6px' : '0',
            lineHeight: 1.65,
          };

          if (isInsteadOf) {
            lineStyle = {
              ...lineStyle,
              background: 'rgba(139, 58, 47, 0.05)',
              padding: '8px 12px',
              borderRadius: '4px',
              borderLeft: '3px solid #8b3a2f',
              margin: '8px 0',
            };
          } else if (isCheckmark) {
            lineStyle = {
              ...lineStyle,
              fontWeight: '500',
              paddingLeft: '6px',
            };
          }

          return (
            <div key={lIdx} style={lineStyle}>
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
      elements.push(parseBoldAndItalic(line.substring(lastIdx, match.index)));
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
    elements.push(parseBoldAndItalic(line.substring(lastIdx)));
  }

  return elements;
}

function parseBoldAndItalic(text) {
  if (!text.includes('**') && !text.includes('*')) return text;
  
  // Parse bold first
  const boldParts = text.split('**');
  return boldParts.map((bPart, bIdx) => {
    if (bIdx % 2 === 1) {
      return <strong key={bIdx}>{parseItalicOnly(bPart)}</strong>;
    }
    return parseItalicOnly(bPart);
  });
}

function parseItalicOnly(text) {
  if (typeof text !== 'string' || !text.includes('*')) return text;
  const parts = text.split('*');
  return parts.map((part, idx) =>
    idx % 2 === 1 ? <em key={idx}>{part}</em> : part
  );
}

// ─── Styles (editorial / hauntological — yellowed paper, mono accents) ─────
const containerStyle = {
  maxWidth: '740px',
  margin: '0 auto',
  padding: '48px 32px 80px',
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
  lineHeight: 1.25,
};

const subtitleStyle = {
  fontSize: '15px',
  fontStyle: 'italic',
  color: '#6e5a3c',
  margin: '0 0 16px 0',
  lineHeight: 1.4,
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
  lineHeight: 1.45,
};

const sectionCardStyle = {
  marginBottom: '36px',
  paddingBottom: '28px',
  borderBottom: '1px solid rgba(212, 201, 168, 0.6)',
};

const sectionHeadingStyle = {
  fontFamily: 'Menlo, monospace',
  fontSize: '12px',
  letterSpacing: '0.12em',
  color: '#8b3a2f',
  textTransform: 'uppercase',
  margin: '24px 0 6px',
};

const sectionSubheadingStyle = {
  fontSize: '18px',
  fontWeight: '600',
  fontFamily: 'Georgia, serif',
  color: '#382e20',
  margin: '0 0 16px',
  letterSpacing: '-0.01em',
};

const sectionBodyStyle = {
  fontSize: '15px',
  margin: 0,
};

const dialogueContainerStyle = {
  background: '#ece4d0',
  border: '1px solid #d4c9a8',
  borderRadius: '6px',
  padding: '16px',
  margin: '18px 0 20px',
};

const dialogueHeaderBadgeStyle = {
  fontFamily: 'Menlo, monospace',
  fontSize: '9.5px',
  letterSpacing: '0.12em',
  color: '#8b3a2f',
  textTransform: 'uppercase',
  fontWeight: 'bold',
  marginBottom: '12px',
  paddingBottom: '6px',
  borderBottom: '1px dotted #c8bc98',
};

const dialogueTurnStyle = {
  padding: '10px 14px',
  borderRadius: '4px',
  marginBottom: '10px',
  border: '1px solid rgba(0,0,0,0.06)',
};

const dialogueSpeakerBadge = {
  fontFamily: 'Menlo, monospace',
  fontSize: '10px',
  letterSpacing: '0.08em',
  fontWeight: 'bold',
  textTransform: 'uppercase',
  padding: '2px 6px',
  borderRadius: '3px',
  display: 'inline-block',
};

const dialogueTextStyle = {
  margin: '4px 0 0',
  fontSize: '14.5px',
  fontStyle: 'italic',
  lineHeight: 1.5,
};

const codeBlockStyle = {
  background: '#241f17',
  color: '#f0e6d2',
  padding: '14px 18px',
  borderRadius: '5px',
  fontFamily: 'Menlo, monospace',
  fontSize: '12px',
  lineHeight: 1.5,
  overflowX: 'auto',
  margin: '14px 0',
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
