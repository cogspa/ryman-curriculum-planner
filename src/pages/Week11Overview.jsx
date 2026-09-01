import { useState } from 'react';
import { Link } from 'react-router-dom';
import { topicList, masterResourceLinks } from '../content/week11Topics.js';

export default function Week11Overview() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredLinks = masterResourceLinks.filter(item =>
    searchQuery === '' ||
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.desc.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={containerStyle}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '10px' }}>
        <Link to="/" style={backLinkStyle}>
          ← Back to Curriculum
        </Link>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <Link
            to="/portfolio-reference-gallery"
            style={{
              fontSize: '12.5px',
              fontFamily: 'Menlo, monospace',
              color: '#8b3a2f',
              textDecoration: 'none',
              fontWeight: 'bold',
              background: 'rgba(139, 58, 47, 0.08)',
              padding: '6px 12px',
              borderRadius: '16px',
              border: '1px solid rgba(139, 58, 47, 0.25)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            🖼️ Portfolio References (15 Artists) →
          </Link>
          <Link
            to="/week/11/glyph-table"
            style={{
              fontSize: '12.5px',
              fontFamily: 'Menlo, monospace',
              color: '#b45309',
              textDecoration: 'none',
              fontWeight: 'bold',
              background: 'rgba(180, 83, 9, 0.08)',
              padding: '6px 12px',
              borderRadius: '16px',
              border: '1px solid rgba(180, 83, 9, 0.25)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            ✒️ Glyph Table Studio →
          </Link>
        </div>
      </div>

      <header style={headerStyle}>
        <div style={weekTagStyle}>WEEK 11</div>
        <div style={dateRangeStyle}>SEP 01 – SEP 05</div>
      </header>

      <h1 style={titleStyle}>Final Portfolio Refinement</h1>

      <div style={scheduleStyle}>
        <div><strong>TUE</strong> &nbsp; Tue, Sep 01 &nbsp; · &nbsp; 7:00–9:00 pm · Zoom Preview &amp; Discussion</div>
        <div style={{ color: '#854d0e' }}><strong>SAT</strong> &nbsp; Sat, Sep 05 &nbsp; · &nbsp; ⛔ Labor Day Weekend Holiday (No In-Person Studio Class)</div>
      </div>

      <p style={focusStyle}>
        <strong>Purpose:</strong> Curating final artwork, evaluating presentation formats, and organizing clean grid layouts with generous negative space for digital platforms and print books.
      </p>

      {/* Synthesis Framework Pillar Card */}
      <div style={pillarCardStyle}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <span style={{ fontSize: '18px' }}>📐</span>
          <span style={{ fontFamily: 'Menlo, monospace', fontSize: '11px', fontWeight: 'bold', color: '#1e3a8a', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            Portfolio Architecture Framework
          </span>
        </div>
        <h2 style={{ fontSize: '22px', fontWeight: '800', color: '#172554', margin: '0 0 8px' }}>
          The Three Pillars: Curation, Format Systems &amp; Grid Hierarchy
        </h2>
        <p style={{ fontSize: '14.5px', color: '#1e40af', lineHeight: '1.55', margin: '0 0 16px' }}>
          These three lessons form the foundation for your comprehensive Capstone Portfolio Redesign. By removing weaker pieces, establishing a hybrid web/PDF ecosystem, and locking cards to a mathematical grid, your artwork takes center stage with maximum clarity.
        </p>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <Link to="/week/11/selection-vs-clutter" style={pillarLinkStyle}>
            Start Lesson 1: Selection vs. Clutter →
          </Link>
          <Link to="/week/11/interactive-web-vs-static-pdf" style={pillarSecondaryLinkStyle}>
            Lesson 2: Web vs. PDF →
          </Link>
          <Link to="/week/11/grid-alignment-and-negative-space" style={pillarSecondaryLinkStyle}>
            Lesson 3: Grid Alignment →
          </Link>
          <Link to="/portfolio-reference-gallery" style={pillarSecondaryLinkStyle}>
            🖼️ 15 Artist References →
          </Link>
        </div>
      </div>

      {/* Learning Goals Card */}
      <div style={learningGoalsCardStyle}>
        <h3 style={learningGoalsHeadingStyle}>WEEK 11 CORE LEARNING OUTCOMES</h3>
        <ul style={learningGoalsListStyle}>
          <li>Distinguish between a <strong>curated portfolio</strong> and an unedited archive (Quality &gt; Quantity).</li>
          <li>Apply the <strong>4 Project Evaluation Questions</strong> to identify work that dilutes your professional focus.</li>
          <li>Execute the <strong>Keep, Revise, Remove</strong> triage protocol with single-sentence strategic rationales.</li>
          <li>Architect a <strong>hybrid ecosystem</strong> pairing responsive web case studies with targeted application PDFs.</li>
          <li>Implement <strong>W3C WCAG accessibility standards</strong> (contrast ratios, semantic headings, alt text, keyboard navigation).</li>
          <li>Engineer <strong>mathematical layout grids</strong> with unified aspect ratios, consistent gutters, and negative space hierarchy.</li>
        </ul>
      </div>

      {/* Tuesday Zoom Session Section */}
      <section style={sessionSectionStyle}>
        <div style={sessionHeaderStyle}>
          <h2 style={sessionTitleStyle}>Tuesday Session — Zoom (Preview &amp; Discussion)</h2>
          <span style={sessionBadgeStyle}>SEP 01 · 7:00–9:00 PM</span>
        </div>
        <div style={topicGridStyle}>
          {topicList.map(topic => (
            <Link key={topic.key} to={`/week/11/${topic.key}`} style={topicCardStyle}>
              <div style={topicArticleTagStyle}>{topic.article}</div>
              <h3 style={topicCardTitleStyle}>{topic.label}</h3>
              <span style={topicArrowStyle}>Explore Full Lesson &amp; Exercises →</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Visual Reference & Tools Section (2 Columns) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '16px', marginBottom: '32px' }}>
        {/* Portfolio Reference Gallery Card */}
        <div style={{
          background: '#f5efe1',
          border: '1px solid #8b3a2f',
          borderRadius: '12px',
          padding: '22px 24px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          boxShadow: '0 4px 12px rgba(139, 58, 47, 0.08)'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <span style={{ fontSize: '22px' }}>🖼️</span>
              <span style={{ fontFamily: 'Menlo, monospace', fontSize: '11px', fontWeight: 'bold', color: '#8b3a2f', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                Visual Reference Gallery
              </span>
            </div>
            <h3 style={{ margin: '0 0 8px', fontSize: '18px', fontWeight: '800', color: '#2a1f1b' }}>
              Portfolio Reference Gallery (15 Artists)
            </h3>
            <p style={{ margin: '0 0 16px', fontSize: '13.5px', color: '#6e5f57', lineHeight: '1.5' }}>
              Curated showcase of 15 entertainment-design portfolio benchmarks across Concept Design, Visual Development, Background/Layout, and Emerging Artists.
            </p>
          </div>
          <Link
            to="/portfolio-reference-gallery"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              alignSelf: 'flex-start',
              background: '#8b3a2f',
              color: '#f5efe1',
              fontSize: '13px',
              fontWeight: '700',
              padding: '8px 16px',
              borderRadius: '6px',
              textDecoration: 'none'
            }}
          >
            Open Portfolio References →
          </Link>
        </div>

        {/* Bonus Type Studio Banner */}
        <div style={{
          ...bonusToolCardStyle,
          marginBottom: 0,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <span style={{ fontSize: '22px' }}>✒️</span>
              <span style={{ fontFamily: 'Menlo, monospace', fontSize: '11px', fontWeight: 'bold', color: '#D8B25F', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                Bonus Interactive Tool
              </span>
            </div>
            <h3 style={{ margin: '0 0 8px', fontSize: '18px', fontWeight: '800', color: '#FFFFFF' }}>
              Glyph Table — Custom Type Studio
            </h3>
            <p style={{ margin: '0 0 16px', fontSize: '13.5px', color: '#E2E8F0', lineHeight: '1.5' }}>
              Design custom vector letterforms, test live proof text, and export installable TrueType fonts (.ttf) for your portfolio branding.
            </p>
          </div>
          <Link to="/week/11/glyph-table" style={{ ...bonusToolButtonStyle, alignSelf: 'flex-start' }}>
            Launch Glyph Table Studio →
          </Link>
        </div>
      </div>

      {/* Resource Directory Section */}
      <section id="portfolio-resources" style={resourceLibrarySectionStyle}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', marginBottom: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '20px' }}>🔖</span>
              <h2 style={{ fontSize: '22px', fontWeight: '800', color: '#1a1614', margin: 0 }}>
                Week 11 Master Resource Directory
              </h2>
            </div>
            <p style={{ margin: '4px 0 0', fontSize: '13.5px', color: '#6b635b' }}>
              Primary sources and authoritative literature on portfolio curation, web accessibility, and grid design systems.
            </p>
          </div>
          <input
            type="text"
            placeholder="Search resources..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={searchInputStyle}
          />
        </div>

        <div style={resourceGridStyle}>
          {filteredLinks.map((item, idx) => (
            <div key={idx} style={resourceCardStyle}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px', marginBottom: '6px' }}>
                <span style={resourceBadgeStyle}>{item.badge}</span>
                <span style={{ fontSize: '11px', color: '#8b2616', fontWeight: '700', fontFamily: 'Menlo, monospace' }}>{item.category}</span>
              </div>
              <h4 style={resourceQuestionStyle}>{item.question}</h4>
              <p style={resourceDescStyle}>{item.desc}</p>
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                style={resourceLinkStyle}
              >
                {item.label}
              </a>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

// ─── Styles ──────────────────────────────────────────────────────────────────
const containerStyle = {
  maxWidth: '960px',
  margin: '0 auto',
  padding: '40px 24px 80px',
  fontFamily: 'system-ui, -apple-system, sans-serif',
  color: '#2c2825',
  background: '#fbf9f4',
  minHeight: '100vh',
};

const backLinkStyle = {
  display: 'inline-block',
  fontSize: '13px',
  fontWeight: '600',
  color: '#8b2616',
  textDecoration: 'none',
};

const headerStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  marginBottom: '8px',
};

const weekTagStyle = {
  background: '#8b2616',
  color: '#ffffff',
  fontSize: '12px',
  fontWeight: '800',
  fontFamily: 'Menlo, monospace',
  padding: '3px 8px',
  borderRadius: '4px',
  letterSpacing: '0.05em',
};

const dateRangeStyle = {
  fontFamily: 'Menlo, monospace',
  fontSize: '12px',
  color: '#8b2616',
  fontWeight: '600',
};

const titleStyle = {
  fontSize: '34px',
  fontWeight: '800',
  color: '#1a1614',
  margin: '0 0 12px',
  letterSpacing: '-0.02em',
};

const scheduleStyle = {
  background: '#ece6d8',
  border: '1px solid rgba(0, 0, 0, 0.08)',
  borderRadius: '8px',
  padding: '12px 16px',
  fontSize: '13.5px',
  color: '#4a433d',
  lineHeight: '1.6',
  marginBottom: '20px',
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
};

const focusStyle = {
  fontSize: '15px',
  color: '#4a433d',
  lineHeight: '1.55',
  margin: '0 0 24px',
};

const pillarCardStyle = {
  background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
  border: '1px solid #bfdbfe',
  borderLeft: '5px solid #2563eb',
  borderRadius: '12px',
  padding: '24px 28px',
  marginBottom: '24px',
  boxShadow: '0 4px 14px rgba(37, 99, 235, 0.08)',
};

const pillarLinkStyle = {
  display: 'inline-flex',
  alignItems: 'center',
  background: '#1d4ed8',
  color: '#ffffff',
  fontSize: '13.5px',
  fontWeight: '700',
  padding: '9px 16px',
  borderRadius: '6px',
  textDecoration: 'none',
  boxShadow: '0 2px 6px rgba(29, 78, 216, 0.25)',
};

const pillarSecondaryLinkStyle = {
  display: 'inline-flex',
  alignItems: 'center',
  background: '#ffffff',
  color: '#1e40af',
  border: '1px solid #93c5fd',
  fontSize: '13.5px',
  fontWeight: '700',
  padding: '9px 16px',
  borderRadius: '6px',
  textDecoration: 'none',
};

const learningGoalsCardStyle = {
  background: '#ffffff',
  border: '1px solid rgba(0, 0, 0, 0.08)',
  borderRadius: '12px',
  padding: '22px 26px',
  marginBottom: '28px',
};

const learningGoalsHeadingStyle = {
  fontFamily: 'Menlo, monospace',
  fontSize: '11px',
  fontWeight: '800',
  color: '#8b2616',
  letterSpacing: '0.08em',
  margin: '0 0 12px',
};

const learningGoalsListStyle = {
  margin: 0,
  paddingLeft: '20px',
  fontSize: '14px',
  color: '#3d3733',
  lineHeight: '1.65',
};

const sessionSectionStyle = {
  marginBottom: '28px',
};

const sessionHeaderStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  borderBottom: '2px solid #8b2616',
  paddingBottom: '8px',
  marginBottom: '16px',
  flexWrap: 'wrap',
  gap: '8px',
};

const sessionTitleStyle = {
  fontSize: '18px',
  fontWeight: '800',
  color: '#1a1614',
  margin: 0,
};

const sessionBadgeStyle = {
  fontFamily: 'Menlo, monospace',
  fontSize: '11px',
  color: '#8b2616',
  fontWeight: '700',
  background: 'rgba(139, 38, 22, 0.08)',
  padding: '3px 8px',
  borderRadius: '4px',
};

const topicGridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
  gap: '16px',
};

const topicCardStyle = {
  background: '#ffffff',
  border: '1px solid rgba(0, 0, 0, 0.08)',
  borderRadius: '10px',
  padding: '20px',
  textDecoration: 'none',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  transition: 'transform 0.15s ease, box-shadow 0.15s ease, border-color 0.15s ease',
  boxShadow: '0 2px 6px rgba(0, 0, 0, 0.02)',
};

const topicArticleTagStyle = {
  fontFamily: 'Menlo, monospace',
  fontSize: '11px',
  fontWeight: '800',
  color: '#8b2616',
  marginBottom: '6px',
};

const topicCardTitleStyle = {
  fontSize: '15.5px',
  fontWeight: '700',
  color: '#1a1614',
  margin: '0 0 14px',
  lineHeight: '1.4',
};

const topicArrowStyle = {
  fontSize: '12.5px',
  fontWeight: '700',
  color: '#8b2616',
  marginTop: 'auto',
};

const bonusToolCardStyle = {
  background: '#0E1626',
  border: '1px solid #D8B25F',
  borderRadius: '12px',
  padding: '22px 26px',
  marginBottom: '32px',
  boxShadow: '0 6px 16px rgba(14, 22, 38, 0.25)',
};

const bonusToolButtonStyle = {
  display: 'inline-flex',
  alignItems: 'center',
  background: '#D8B25F',
  color: '#0E1626',
  fontSize: '13px',
  fontWeight: '800',
  padding: '8px 16px',
  borderRadius: '20px',
  textDecoration: 'none',
  boxShadow: '0 2px 6px rgba(216, 178, 95, 0.3)',
};

const resourceLibrarySectionStyle = {
  background: '#ffffff',
  border: '1px solid rgba(0, 0, 0, 0.08)',
  borderRadius: '12px',
  padding: '24px 28px',
};

const searchInputStyle = {
  padding: '8px 14px',
  fontSize: '13px',
  border: '1px solid #d4c9a8',
  borderRadius: '6px',
  background: '#fbf9f4',
  width: '240px',
  outline: 'none',
};

const resourceGridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
  gap: '14px',
};

const resourceCardStyle = {
  background: '#fcfbfa',
  border: '1px solid rgba(0, 0, 0, 0.07)',
  borderRadius: '8px',
  padding: '16px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
};

const resourceBadgeStyle = {
  fontSize: '11px',
  fontWeight: '700',
  color: '#4a433d',
  background: '#ece6d8',
  padding: '2px 6px',
  borderRadius: '4px',
};

const resourceQuestionStyle = {
  fontSize: '14px',
  fontWeight: '700',
  color: '#1a1614',
  margin: '0 0 6px',
};

const resourceDescStyle = {
  fontSize: '12.5px',
  color: '#5c544d',
  lineHeight: '1.45',
  margin: '0 0 12px',
};

const resourceLinkStyle = {
  fontSize: '12.5px',
  fontWeight: '700',
  color: '#8b2616',
  textDecoration: 'none',
  marginTop: 'auto',
};
