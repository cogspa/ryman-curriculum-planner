import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { TOPIC_DETAILS, topicList } from '../content/week10Topics.js';
import TopicNav from './TopicNav.jsx';

export default function Week10TopicDetail() {
  const { topicKey } = useParams();
  const topic = TOPIC_DETAILS[topicKey];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [topicKey]);

  useEffect(() => {
    if (topic) {
      document.title = `Week 10 · ${topic.title} — Ryman Curriculum`;
    } else {
      document.title = 'Topic Not Found — Ryman Curriculum';
    }
  }, [topic]);

  if (!topic) {
    return (
      <div style={containerStyle}>
        <Link to="/week/10" style={backButtonStyle}>
          ← Back to Week 10
        </Link>
        <h1 style={detailTitleStyle}>Topic not found</h1>
        <p style={sectionBodyStyle}>The requested topic does not exist.</p>
      </div>
    );
  }

  const callouts = topic.callouts || (topic.callout ? [topic.callout] : []);

  return (
    <div style={containerStyle}>
      <Link to="/week/10" style={backButtonStyle}>
        ← Back to Week 10 Overview
      </Link>
      
      <h1 style={detailTitleStyle}>{topic.title}</h1>
      {topic.subtitle && <p style={subtitleStyle}>{topic.subtitle}</p>}
      
      {topic.sourceNote && (
        <div style={sourceNoteBannerStyle}>
          <span style={{ fontSize: '18px' }}>💡</span>
          <span style={{ fontStyle: 'italic', color: '#5c544d', lineHeight: '1.5' }}>
            {topic.sourceNote}
          </span>
        </div>
      )}

      {/* Contextual Industry Callouts */}
      {callouts.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '28px' }}>
          {callouts.map((co, idx) => {
            const isLA28 = co.type === 'la28';
            return (
              <div 
                key={idx} 
                style={isLA28 ? la28CalloutStyle : calloutCardStyle}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                  <span style={{ fontSize: '20px' }}>{co.icon}</span>
                  <span style={{
                    fontFamily: 'Menlo, monospace',
                    fontSize: '11px',
                    fontWeight: '800',
                    color: isLA28 ? '#854d0e' : '#8b2616',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em'
                  }}>
                    {co.tag}
                  </span>
                </div>
                {co.title && (
                  <h3 style={{
                    margin: '0 0 6px 0',
                    fontSize: '16px',
                    fontWeight: '800',
                    color: isLA28 ? '#713f12' : '#1a1614'
                  }}>
                    {co.title}
                  </h3>
                )}
                <p style={{
                  margin: '0 0 12px 0',
                  fontSize: '14px',
                  color: isLA28 ? '#78350f' : '#4a433d',
                  lineHeight: '1.5'
                }}>
                  {co.text}
                </p>
                {co.links && co.links.length > 0 && (
                  <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                    {co.links.map((link, lIdx) => (
                      <a
                        key={lIdx}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={isLA28 ? la28LinkButtonStyle : calloutLinkButtonStyle}
                      >
                        {link.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Main Topic Sections */}
      {topic.sections.map((section, i) => (
        <section key={i} style={sectionCardStyle}>
          {section.heading && <h2 style={sectionHeadingStyle}>{section.heading}</h2>}
          {section.subheading && <h3 style={sectionSubheadingStyle}>{section.subheading}</h3>}
          
          {/* Key points box if present */}
          {section.keyPoints && section.keyPoints.length > 0 && (
            <div style={keyPointsGridStyle}>
              {section.keyPoints.map((kp, kpIdx) => (
                <div key={kpIdx} style={keyPointCardStyle}>
                  <div style={keyPointTitleStyle}>{kp.title}</div>
                  <div style={keyPointDescStyle}>{kp.desc}</div>
                </div>
              ))}
            </div>
          )}

          {/* Table if present */}
          {section.table && (
            <div style={tableWrapperStyle}>
              <table style={tableStyle}>
                <thead>
                  <tr>
                    {section.table.headers.map((h, hIdx) => (
                      <th key={hIdx} style={thStyle}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {section.table.rows.map((row, rIdx) => (
                    <tr key={rIdx} style={rIdx % 2 === 1 ? { background: 'rgba(212, 201, 168, 0.25)' } : {}}>
                      {row.map((cell, cIdx) => (
                        <td key={cIdx} style={cIdx === 0 ? tdBoldStyle : tdStyle}>{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Formatted body */}
          {section.body && (
            <div style={sectionBodyStyle}>
              {renderFormattedBody(section.body)}
            </div>
          )}
        </section>
      ))}

      <div style={{ marginTop: '40px' }}>
        <TopicNav topicList={topicList} topicKey={topicKey} weekNum="10" />
      </div>
    </div>
  );
}

// ─── Body Text Parser ──────────────────────────────────────────────────────────
function renderFormattedBody(bodyText) {
  if (!bodyText) return null;

  const paragraphs = bodyText.split('\n\n');

  return paragraphs.map((paragraph, pIdx) => {
    const lines = paragraph.split('\n');

    return (
      <div key={pIdx} style={{ marginBottom: '16px' }}>
        {lines.map((line, lIdx) => {
          const trimmed = line.trim();
          const isBullet = trimmed.startsWith('•') || trimmed.startsWith('-');
          const isNumbered = /^\d+\.\s/.test(trimmed);
          const isCheckmark = trimmed.startsWith('👉') || trimmed.startsWith('❌') || trimmed.startsWith('✅');
          const isQuote = trimmed.startsWith('>');

          let lineStyle = {
            paddingLeft: isBullet || isNumbered ? '16px' : isQuote ? '16px' : '0',
            marginBottom: lIdx < lines.length - 1 ? '6px' : '0',
            lineHeight: 1.65,
          };

          if (isQuote) {
            lineStyle = {
              ...lineStyle,
              background: 'rgba(139, 38, 22, 0.05)',
              padding: '10px 14px',
              borderRadius: '6px',
              borderLeft: '3px solid #8b2616',
              fontStyle: 'italic',
              margin: '8px 0',
            };
          } else if (isCheckmark) {
            lineStyle = {
              ...lineStyle,
              fontWeight: '500',
              paddingLeft: '6px',
            };
          }

          const lineContent = isQuote ? trimmed.replace(/^>\s*/, '') : line;

          return (
            <div key={lIdx} style={lineStyle}>
              {parseLineFormatting(lineContent)}
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
            color: '#8b2616',
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
          rel="noopener noreferrer"
          style={{
            color: '#8b2616',
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
  if (typeof text !== 'string') return text;
  if (!text.includes('**') && !text.includes('*')) return text;
  
  const boldParts = text.split('**');
  return boldParts.map((bPart, bIdx) => {
    if (bIdx % 2 === 1) {
      return <strong key={bIdx} style={{ fontWeight: '700', color: '#1a1614' }}>{parseItalicOnly(bPart)}</strong>;
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

// ─── Styles ──────────────────────────────────────────────────────────────────
const containerStyle = {
  maxWidth: '920px',
  margin: '0 auto',
  padding: '40px 24px 80px',
  fontFamily: 'system-ui, -apple-system, sans-serif',
  color: '#2c2825',
  background: '#fbf9f4',
  minHeight: '100vh',
};

const backButtonStyle = {
  display: 'inline-block',
  fontSize: '13px',
  fontWeight: '600',
  color: '#8b2616',
  textDecoration: 'none',
  marginBottom: '24px',
};

const detailTitleStyle = {
  fontSize: '32px',
  fontWeight: '800',
  color: '#1a1614',
  margin: '0 0 8px',
  letterSpacing: '-0.02em',
  lineHeight: '1.2',
};

const subtitleStyle = {
  fontSize: '16px',
  color: '#6b635b',
  margin: '0 0 20px',
  lineHeight: '1.4',
};

const sourceNoteBannerStyle = {
  display: 'flex',
  alignItems: 'flex-start',
  gap: '12px',
  background: 'rgba(139, 38, 22, 0.05)',
  borderLeft: '4px solid #8b2616',
  padding: '12px 18px',
  borderRadius: '0 8px 8px 0',
  marginBottom: '24px',
};

const calloutCardStyle = {
  background: 'linear-gradient(135deg, #ffffff 0%, #f9f7f2 100%)',
  border: '1px solid rgba(139, 38, 22, 0.22)',
  borderLeft: '5px solid #8b2616',
  borderRadius: '10px',
  padding: '18px 22px',
  boxShadow: '0 4px 12px rgba(139, 38, 22, 0.04)',
};

const la28CalloutStyle = {
  background: 'linear-gradient(135deg, #fefce8 0%, #fef08a 100%)',
  border: '1px solid #eab308',
  borderLeft: '5px solid #ca8a04',
  borderRadius: '10px',
  padding: '20px 22px',
  boxShadow: '0 4px 14px rgba(202, 138, 4, 0.12)',
};

const calloutLinkButtonStyle = {
  display: 'inline-flex',
  alignItems: 'center',
  background: '#8b2616',
  color: '#ffffff',
  fontSize: '13px',
  fontWeight: '700',
  padding: '8px 14px',
  borderRadius: '6px',
  textDecoration: 'none',
  boxShadow: '0 2px 5px rgba(139, 38, 22, 0.2)',
  transition: 'transform 0.1s ease',
};

const la28LinkButtonStyle = {
  display: 'inline-flex',
  alignItems: 'center',
  background: '#854d0e',
  color: '#ffffff',
  fontSize: '13px',
  fontWeight: '700',
  padding: '8px 14px',
  borderRadius: '6px',
  textDecoration: 'none',
  boxShadow: '0 2px 5px rgba(133, 77, 14, 0.2)',
  transition: 'transform 0.1s ease',
};

const sectionCardStyle = {
  background: '#ffffff',
  border: '1px solid rgba(0, 0, 0, 0.08)',
  borderRadius: '12px',
  padding: '28px',
  marginBottom: '24px',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.03)',
};

const sectionHeadingStyle = {
  fontSize: '20px',
  fontWeight: '700',
  color: '#1a1614',
  margin: '0 0 4px',
  letterSpacing: '-0.01em',
};

const sectionSubheadingStyle = {
  fontSize: '14px',
  fontWeight: '600',
  color: '#8b2616',
  margin: '0 0 16px',
  textTransform: 'uppercase',
  letterSpacing: '0.04em',
};

const sectionBodyStyle = {
  fontSize: '15px',
  color: '#3d3733',
  lineHeight: '1.65',
};

const keyPointsGridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
  gap: '12px',
  marginBottom: '20px',
};

const keyPointCardStyle = {
  background: '#f8f5ee',
  border: '1px solid rgba(139, 38, 22, 0.12)',
  borderRadius: '8px',
  padding: '14px 16px',
};

const keyPointTitleStyle = {
  fontSize: '14px',
  fontWeight: '700',
  color: '#8b2616',
  marginBottom: '4px',
};

const keyPointDescStyle = {
  fontSize: '13px',
  color: '#4a433d',
  lineHeight: '1.45',
};

const tableWrapperStyle = {
  overflowX: 'auto',
  margin: '16px 0 20px',
  borderRadius: '8px',
  border: '1px solid rgba(0, 0, 0, 0.1)',
};

const tableStyle = {
  width: '100%',
  borderCollapse: 'collapse',
  fontSize: '13.5px',
  textAlign: 'left',
};

const thStyle = {
  background: '#ece6d8',
  color: '#3b342e',
  padding: '10px 14px',
  fontWeight: '700',
  borderBottom: '2px solid rgba(0,0,0,0.1)',
};

const tdStyle = {
  padding: '10px 14px',
  borderBottom: '1px solid rgba(0,0,0,0.06)',
  color: '#3d3733',
};

const tdBoldStyle = {
  padding: '10px 14px',
  borderBottom: '1px solid rgba(0,0,0,0.06)',
  fontWeight: '600',
  color: '#1a1614',
};
