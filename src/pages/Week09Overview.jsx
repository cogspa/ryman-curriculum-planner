import { useState } from 'react';
import { Link } from 'react-router-dom';
import { topicList, masterResourceLinks } from '../content/week09Topics.js';
import LegalDisclaimer from '../LegalDisclaimer.jsx';
import CritiqueZone from '../components/CritiqueZone.jsx';

export default function Week09Overview() {
  const tuesdayTopics = topicList.filter(t => t.session.includes('Tuesday'));
  const saturdayTopics = topicList.filter(t => t.session.includes('Saturday'));
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredResourceCategories = masterResourceLinks.map(cat => {
    if (activeCategory !== 'All' && cat.category !== activeCategory) {
      return null;
    }
    const filteredLinks = cat.links.filter(link => 
      searchQuery === '' ||
      link.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cat.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      link.url.toLowerCase().includes(searchQuery.toLowerCase())
    );
    if (filteredLinks.length === 0) return null;
    return { ...cat, links: filteredLinks };
  }).filter(Boolean);

  return (
    <div style={containerStyle}>
      <Link to="/" style={backLinkStyle}>
        ← Back to Curriculum
      </Link>

      <header style={headerStyle}>
        <div style={weekTagStyle}>WEEK 09</div>
        <div style={dateRangeStyle}>AUG 18 – AUG 22</div>
      </header>

      <h1 style={titleStyle}>Freelance, Contracts & Business Skills</h1>

      <div style={scheduleStyle}>
        <div><strong>TUE</strong> &nbsp; Tue, Aug 18 &nbsp; · &nbsp; 7:00–9:00 pm · Zoom Preview & Discussion</div>
        <div><strong>SAT</strong> &nbsp; Sat, Aug 22 &nbsp; · &nbsp; 10:00 am–3:30 pm · Reveal Studio Workshop</div>
      </div>

      <p style={focusStyle}>
        <strong>Purpose:</strong> Build a practical system for turning creative talent into professional, clearly scoped, fairly priced, and legally informed client work.
      </p>

      {/* Learning Goals Card */}
      <div style={learningGoalsCardStyle}>
        <h3 style={learningGoalsHeadingStyle}>WEEK 09 LEARNING GOALS</h3>
        <ul style={learningGoalsListStyle}>
          <li>Recognize the basic elements of an enforceable agreement and the clauses that make it useful in practice.</li>
          <li>Separate a proposal, statement of work, contract, invoice, and change order by purpose.</li>
          <li>Describe the difference between copyright, trademark, assignment, and licensing.</li>
          <li>Calculate a defensible project price from scope, labor, expenses, risk, and usage rights.</li>
          <li>Set up simple client communication and recordkeeping systems that reduce conflict.</li>
          <li>Identify the basic federal and California responsibilities of a creative sole proprietor.</li>
        </ul>
      </div>

      {/* Deliverables Section (TOP ALERT STYLE) */}
      <div style={{ marginTop: '32px', marginBottom: '32px' }}>
        <h2 style={{ ...sectionHeadingStyle, margin: '0 0 14px 0' }}>Week 09 Deliverables &amp; Milestones</h2>
        
        {/* Tuesday Deliverable (Red Bar) */}
        <div style={tuesdayDeliverableCardStyle}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <span style={{ fontSize: '16px' }}>📋</span>
            <span style={{ fontFamily: 'Menlo, monospace', fontSize: '11px', fontWeight: 'bold', color: '#b91c1c', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Tuesday Night Deliverable · August 18th
            </span>
          </div>
          <p style={{ margin: '0 0 10px', fontWeight: 'bold', fontSize: '15px', color: '#991b1b', lineHeight: 1.4 }}>
            For Tuesday Night (August 18th) deliverables due, lets see where everyone is at with the Capstone Reference Board
          </p>
          <div style={{ marginTop: '8px' }}>
            <img 
              src="/Capstone_Project_Development_Template_preview.png" 
              alt="Capstone Project Development Template Preview" 
              style={{
                width: '100%',
                maxWidth: '100%',
                borderRadius: '6px',
                border: '1px solid rgba(220, 38, 38, 0.25)',
                display: 'block',
                margin: '6px 0 10px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
              }}
            />
            <div style={{ fontSize: '12.5px', color: '#991b1b', fontStyle: 'italic', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
              <span><strong>Capstone Reference Board Template</strong> — Consolidate Blockouts, Environments, Characters, Storyboards, and Hero Project.</span>
              <a 
                href="/Capstone_Project_Development_Template.svg" 
                download="Capstone_Project_Development_Template.svg"
                style={{ color: '#b91c1c', fontWeight: 'bold', textDecoration: 'underline' }}
              >
                Download SVG Template ↓
              </a>
            </div>
          </div>
        </div>

        {/* Capstone Gallery Website Builder Tool Callout */}
        <div style={toolCardStyle}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '10px', marginBottom: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '18px' }}>🌐</span>
              <span style={{ fontFamily: 'Menlo, monospace', fontSize: '11px', fontWeight: 'bold', color: '#0369a1', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                Interactive Tool · Capstone Website Builder
              </span>
            </div>
            <Link
              to="/week/09/capstone-gallery-builder"
              style={{
                fontFamily: 'Menlo, monospace',
                fontSize: '11px',
                fontWeight: 'bold',
                textDecoration: 'none',
                background: '#0284c7',
                color: '#ffffff',
                padding: '6px 14px',
                borderRadius: '4px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }}
            >
              Launch Website Builder →
            </Link>
          </div>
          <p style={{ margin: '0 0 6px', fontWeight: 'bold', fontSize: '15px', color: '#0c4a6e', lineHeight: 1.4 }}>
            Capstone Gallery Website Builder
          </p>
          <p style={{ margin: '0 0 10px', fontSize: '13.5px', lineHeight: 1.55, color: '#1e293b' }}>
            Turn your Capstone Development Board into a responsive, presentation-ready website. Drag and drop artwork directly into Blockouts, Environments, Characters, Storyboard sequence, Hero Project, and Contact slots. Customize branding, typography, and color schemes, then export a complete Netlify-ready website package (<code style={{ background: 'rgba(2, 132, 199, 0.12)', padding: '1px 5px', borderRadius: '3px' }}>index.html</code>, <code style={{ background: 'rgba(2, 132, 199, 0.12)', padding: '1px 5px', borderRadius: '3px' }}>styles.css</code>, <code style={{ background: 'rgba(2, 132, 199, 0.12)', padding: '1px 5px', borderRadius: '3px' }}>script.js</code>).
          </p>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', fontSize: '12px', color: '#0369a1', fontFamily: 'Menlo, monospace' }}>
            <span>✓ Drag &amp; Drop Reordering</span>
            <span>✓ 13 Google Font Pairings</span>
            <span>✓ Netlify Drop Ready</span>
            <span>✓ Built-in Lightbox</span>
          </div>
        </div>

        {/* Saturday Studio Task Callout */}
        <div style={studioTaskCardStyle}>
          <p style={{ margin: '0 0 6px', fontWeight: 'bold', fontSize: '15px', color: '#1e4620' }}>
            🛠️ Saturday Deliverable (Aug 22): Refine Campaign Assets &amp; Practice Pitch
          </p>
          <p style={{ margin: '0 0 8px', fontSize: '14px', lineHeight: 1.6, color: '#2a2418' }}>
            Use the <Link to="/week/09/refine-campaign-assets-peer-feedback" style={{ color: '#1e4620', fontWeight: 'bold', textDecoration: 'underline' }}>Studio Worksheet</Link> to convert Week 8 pitch-rehearsal critiques into a disciplined revision plan. Deliver a revised campaign asset set, a before/after comparison slide, and a 3-sentence revision rationale.
          </p>
          <div style={{ padding: '8px 12px', background: 'rgba(45, 90, 63, 0.08)', borderRadius: '4px', borderLeft: '3px solid #2d5a3f', fontSize: '13px', color: '#1e4620', fontWeight: '500' }}>
            🎤 <strong>Practice Pitch:</strong> Be prepared to deliver a practice pitch of your project on August 22.
          </div>
        </div>
      </div>

      {/* Tuesday Session Section */}
      <div style={{ marginTop: '36px' }}>
        <div style={sessionHeaderStyle}>
          <span style={sessionTagStyle}>📅 TUESDAY SESSION · ZOOM PREVIEW & DISCUSSION</span>
          <span style={articleRangeStyle}>Articles 1–4</span>
        </div>
        <ul style={topicListStyle}>
          {tuesdayTopics.map(({ key, label, article }) => (
            <li key={key} style={topicItemStyle}>
              <span style={articleBadgeStyle}>{article}</span>
              <Link to={`/week/09/${key}`} style={topicLinkStyle}>
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Saturday Session Section */}
      <div style={{ marginTop: '40px' }}>
        <div style={sessionHeaderStyle}>
          <span style={{ ...sessionTagStyle, color: '#8b3a2f' }}>🎨 SATURDAY SESSION · STUDIO WORKSHOP</span>
          <span style={articleRangeStyle}>Articles 5–8 + Worksheet</span>
        </div>
        <ul style={topicListStyle}>
          {saturdayTopics.map(({ key, label, article }) => (
            <li key={key} style={topicItemStyle}>
              <span style={{ ...articleBadgeStyle, background: article.includes('Worksheet') ? '#d8e8dc' : '#ece4d0', color: article.includes('Worksheet') ? '#1e4620' : '#4a3d24' }}>
                {article}
              </span>
              <Link to={`/week/09/${key}`} style={topicLinkStyle}>
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* MASTER RESOURCE LINKS DIRECTORY */}
      <div id="master-resources" style={{ marginTop: '48px', paddingTop: '28px', borderTop: '2px solid #8b3a2f' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '12px', marginBottom: '16px' }}>
          <div>
            <h2 style={{ ...sectionHeadingStyle, margin: '0 0 4px 0', fontSize: '14px' }}>
              📚 Master Resource Links Directory
            </h2>
            <p style={{ margin: 0, fontSize: '13px', color: '#6e5a3c', fontStyle: 'italic' }}>
              Authoritative industry benchmarks, government portals, standard forms, and tax guides.
            </p>
          </div>

          <input
            type="text"
            placeholder="Search master links..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={searchInputStyle}
          />
        </div>

        {/* Category filter pills */}
        <div style={filterContainerStyle}>
          {['All', 'Contracts and Freelance Agreements', 'Business Setup and Operations', 'Copyright and Intellectual Property', 'Trademarks', 'Pricing and Professional Practice', 'Federal Tax Resources', 'California Tax Resources'].map((cat) => {
            const isSelected = activeCategory === cat;
            const shortLabel = cat === 'All' ? 'All Links' : cat.split(' ')[0];
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                style={{
                  ...filterPillStyle,
                  background: isSelected ? '#8b3a2f' : '#ece4d0',
                  color: isSelected ? '#ffffff' : '#4a3d24',
                  borderColor: isSelected ? '#8b3a2f' : '#d4c9a8',
                  fontWeight: isSelected ? 'bold' : 'normal'
                }}
                title={cat}
              >
                {cat === 'All' ? 'All (38)' : cat}
              </button>
            );
          })}
        </div>

        {/* Category Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '16px' }}>
          {filteredResourceCategories.map((catGroup, gIdx) => (
            <div key={gIdx} style={categoryCardStyle}>
              <div style={categoryHeaderStyle}>
                <h3 style={categoryTitleStyle}>{catGroup.category}</h3>
                {catGroup.description && (
                  <span style={categoryDescStyle}>{catGroup.description}</span>
                )}
              </div>

              <ul style={resourceListStyle}>
                {catGroup.links.map((link, lIdx) => (
                  <li key={lIdx} style={resourceItemStyle}>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={resourceLinkStyle}
                    >
                      <span style={{ fontWeight: 'bold' }}>{link.name}</span>
                      <span style={arrowStyle}>↗</span>
                    </a>
                    <div style={resourceUrlStyle}>{link.url}</div>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {filteredResourceCategories.length === 0 && (
            <p style={{ fontStyle: 'italic', color: '#8b3a2f', textAlign: 'center', margin: '24px 0' }}>
              No master resource links match your search query.
            </p>
          )}
        </div>
      </div>

      <div style={{ marginTop: '48px', paddingTop: '32px', borderTop: '2px solid rgba(139, 58, 47, 0.2)' }}>
        <CritiqueZone week={9} />
      </div>

      <LegalDisclaimer style={{ marginTop: '36px' }} />
    </div>
  );
}

// ─── Styles ─────────────────────────────────────────────────────────────
const containerStyle = {
  maxWidth: '760px',
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
  margin: '0 0 24px',
  paddingBottom: '20px',
  borderBottom: '1px solid #d4c9a8',
};

const learningGoalsCardStyle = {
  background: '#ece4d0',
  border: '1px solid #d4c9a8',
  borderRadius: '6px',
  padding: '18px 22px',
  marginBottom: '32px',
};

const learningGoalsHeadingStyle = {
  fontFamily: 'Menlo, monospace',
  fontSize: '11px',
  letterSpacing: '0.12em',
  color: '#8b3a2f',
  margin: '0 0 10px 0',
  textTransform: 'uppercase',
};

const learningGoalsListStyle = {
  margin: 0,
  paddingLeft: '18px',
  fontSize: '14px',
  lineHeight: 1.6,
  color: '#3a3224',
};

const sessionHeaderStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingBottom: '8px',
  borderBottom: '2px solid #8b3a2f',
  marginBottom: '12px',
};

const sessionTagStyle = {
  fontFamily: 'Menlo, monospace',
  fontSize: '11px',
  letterSpacing: '0.12em',
  color: '#db2777',
  textTransform: 'uppercase',
  fontWeight: 'bold',
};

const articleRangeStyle = {
  fontFamily: 'Menlo, monospace',
  fontSize: '10px',
  color: '#6e5a3c',
  letterSpacing: '0.08em',
};

const sectionHeadingStyle = {
  fontFamily: 'Menlo, monospace',
  fontSize: '11px',
  letterSpacing: '0.15em',
  color: '#8b3a2f',
  textTransform: 'uppercase',
  margin: '36px 0 16px',
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
  padding: '12px 0',
  borderBottom: '1px dotted #d4c9a8',
};

const articleBadgeStyle = {
  background: '#ece4d0',
  color: '#5a4a14',
  fontFamily: 'Menlo, monospace',
  fontSize: '9.5px',
  letterSpacing: '0.08em',
  padding: '3px 7px',
  borderRadius: '3px',
  flexShrink: 0,
  marginTop: '2px',
  fontWeight: 'bold',
  textTransform: 'uppercase',
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

const tuesdayDeliverableCardStyle = {
  background: 'rgba(239, 68, 68, 0.05)',
  border: '1px solid rgba(239, 68, 68, 0.28)',
  borderLeft: '4px solid #dc2626',
  borderRadius: '6px',
  padding: '18px 20px',
  margin: '12px 0 20px',
};

const toolCardStyle = {
  background: '#f0f9ff',
  border: '1px solid rgba(2, 132, 199, 0.25)',
  borderLeft: '4px solid #0284c7',
  borderRadius: '6px',
  padding: '18px 20px',
  margin: '16px 0 20px',
};

const studioTaskCardStyle = {
  background: '#eef5f0',
  borderLeft: '4px solid #2d5a3f',
  borderRadius: '4px',
  padding: '16px 20px',
  margin: '12px 0 24px',
};

const searchInputStyle = {
  fontFamily: 'Menlo, monospace',
  fontSize: '11.5px',
  padding: '6px 12px',
  borderRadius: '4px',
  border: '1px solid #d4c9a8',
  background: '#fcf9f2',
  color: '#2a2418',
  outline: 'none',
  width: '200px',
};

const filterContainerStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '6px',
  margin: '10px 0 16px',
};

const filterPillStyle = {
  fontFamily: 'Menlo, monospace',
  fontSize: '10px',
  padding: '4px 9px',
  borderRadius: '12px',
  border: '1px solid',
  cursor: 'pointer',
  transition: 'all 0.15s ease',
};

const categoryCardStyle = {
  background: '#ece4d0',
  border: '1px solid #d4c9a8',
  borderRadius: '6px',
  padding: '16px 20px',
};

const categoryHeaderStyle = {
  marginBottom: '12px',
  paddingBottom: '8px',
  borderBottom: '1px solid #d4c9a8',
};

const categoryTitleStyle = {
  fontFamily: 'Menlo, monospace',
  fontSize: '12px',
  fontWeight: 'bold',
  color: '#8b3a2f',
  margin: '0 0 2px 0',
  textTransform: 'uppercase',
  letterSpacing: '0.08em',
};

const categoryDescStyle = {
  fontSize: '12px',
  color: '#6e5a3c',
  fontStyle: 'italic',
};

const resourceListStyle = {
  listStyle: 'none',
  padding: 0,
  margin: 0,
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
};

const resourceItemStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '2px',
};

const resourceLinkStyle = {
  fontSize: '14px',
  color: '#2a2418',
  textDecoration: 'none',
  display: 'inline-flex',
  alignItems: 'center',
  gap: '6px',
};

const arrowStyle = {
  fontSize: '11px',
  color: '#8b3a2f',
  fontFamily: 'Menlo, monospace',
};

const resourceUrlStyle = {
  fontFamily: 'Menlo, monospace',
  fontSize: '10.5px',
  color: '#7a6a4c',
  wordBreak: 'break-all',
};
