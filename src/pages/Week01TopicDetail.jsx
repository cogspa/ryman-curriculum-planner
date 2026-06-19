import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { TOPIC_DETAILS } from '../content/week01Topics.js';
import PixelWaveSample from './PixelWaveSample.jsx';

export default function Week01TopicDetail() {
  const { topicKey } = useParams();
  const topic = TOPIC_DETAILS[topicKey];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [topicKey]);

  useEffect(() => {
    if (topic) {
      document.title = `Week 01 · ${topic.title} — Ryman Curriculum`;
    } else {
      document.title = 'Topic Not Found — Ryman Curriculum';
    }
  }, [topic]);

  if (!topic) {
    return (
      <div style={containerStyle}>
        <Link to="/week/01" style={backButtonStyle}>
          ← Back to Week 01
        </Link>
        <h1 style={detailTitleStyle}>Topic not found</h1>
        <p style={sectionBodyStyle}>The requested topic does not exist.</p>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      <Link to="/week/01" style={backButtonStyle}>
        ← Back to Week 01
      </Link>
      
      <h1 style={detailTitleStyle}>{topic.title}</h1>
      
      <div style={sourceTagStyle}>
        Adapted from PCC DMA 12: {topic.pccSources.join(' · ')}
      </div>

      {topic.sections.map((section, i) => (
        <section key={i} style={sectionStyle}>
          <h2 style={sectionHeadingStyle}>{section.heading}</h2>
          <div style={sectionBodyStyle} dangerouslySetInnerHTML={{ __html: section.body.replace(/\n/g, '<br/>') }} />
          {section.videoUrl && (
            <div style={{ margin: '24px 0 8px', borderRadius: '8px', overflow: 'hidden', border: '1px solid #d4c9a8' }}>
              <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0 }}>
                <iframe
                  src={section.videoUrl}
                  title={section.videoCaption || section.heading}
                  style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              {section.videoCaption && (
                <p style={{ fontSize: '11px', color: '#8b3a2f', padding: '8px 12px', margin: 0, fontStyle: 'italic', fontFamily: 'Menlo, monospace', background: 'rgba(0,0,0,0.02)' }}>{section.videoCaption}</p>
              )}
            </div>
          )}
          {section.imageUrl && (
            <div style={{ margin: '20px 0', textAlign: 'center' }}>
              <img src={section.imageUrl} alt={section.imageCaption || section.heading} style={{ maxWidth: '100%', maxHeight: '420px', borderRadius: '6px', border: '1px solid #d4c9a8' }} />
              {section.imageCaption && (
                <p style={{ fontSize: '11px', color: '#8b3a2f', marginTop: '6px', fontStyle: 'italic', fontFamily: 'Menlo, monospace' }}>{section.imageCaption}</p>
              )}
            </div>
          )}
          {/* Embed the interactive pixel wave sampler after the first section on the canvas page */}
          {topicKey === 'digital-vs-physical-canvas' && i === 0 && (
            <div style={{ margin: '24px 0 8px', padding: '20px 24px', background: 'rgba(0,0,0,0.02)', borderRadius: '8px', border: '1px solid #d4c9a8' }}>
              <PixelWaveSample />
            </div>
          )}
        </section>
      ))}
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
