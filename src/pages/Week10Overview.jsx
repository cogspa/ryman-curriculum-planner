import { useState } from 'react';
import { Link } from 'react-router-dom';
import { topicList, masterResourceLinks } from '../content/week10Topics.js';

export default function Week10Overview() {
  const tuesdayTopics = topicList.filter(t => t.session.includes('Tuesday'));
  const saturdayTopics = topicList.filter(t => t.session.includes('Saturday'));
  const industryPillar = topicList.filter(t => t.session.includes('Industry Context'));

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
      <Link to="/" style={backLinkStyle}>
        ← Back to Curriculum
      </Link>

      <header style={headerStyle}>
        <div style={weekTagStyle}>WEEK 10</div>
        <div style={dateRangeStyle}>AUG 25 – AUG 29</div>
      </header>

      <h1 style={titleStyle}>Job Readiness & Interview Training</h1>

      <div style={scheduleStyle}>
        <div><strong>TUE</strong> &nbsp; Tue, Aug 25 &nbsp; · &nbsp; 7:00–9:00 pm · Zoom Preview & Discussion</div>
        <div><strong>SAT</strong> &nbsp; Sat, Aug 29 &nbsp; · &nbsp; 10:00 am–3:30 pm · Studio Workshop & Role-Play</div>
      </div>

      <p style={focusStyle}>
        <strong>Purpose:</strong> Preparing portfolios, professional resumes, and interview protocols to enter the creative workforce.
      </p>

      {/* Industry Context Pillar Card */}
      <div style={pillarCardStyle}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <span style={{ fontSize: '18px' }}>🌟</span>
          <span style={{ fontFamily: 'Menlo, monospace', fontSize: '11px', fontWeight: 'bold', color: '#1e3a8a', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            Core Industry Context · 2026 & Beyond
          </span>
        </div>
        <h2 style={{ fontSize: '22px', fontWeight: '800', color: '#172554', margin: '0 0 8px' }}>
          The Los Angeles Creative Economy: Where Are the Opportunities Moving?
        </h2>
        <p style={{ fontSize: '14.5px', color: '#1e40af', lineHeight: '1.55', margin: '0 0 16px' }}>
          An in-depth analysis of 6 structural trends reshaping California creative careers — from Hollywood studio restructuring and portfolio-first recruiting to LA28 experiential build-ups and task-level AI integration.
        </p>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          {industryPillar.map(topic => (
            <Link key={topic.key} to={`/week/10/${topic.key}`} style={pillarLinkStyle}>
              Explore Lesson 10: The LA Creative Economy (2026+) →
            </Link>
          ))}
          <a 
            href="https://www.otis.edu/about/initiatives/creative-economy/"
            target="_blank"
            rel="noopener noreferrer"
            style={pillarSecondaryLinkStyle}
          >
            Read Otis 2026 Report ↗
          </a>
        </div>
      </div>

      {/* Learning Goals Card */}
      <div style={learningGoalsCardStyle}>
        <h3 style={learningGoalsHeadingStyle}>WEEK 10 CORE OUTCOMES</h3>
        <ul style={learningGoalsListStyle}>
          <li>Master the <strong>30-Second Story</strong> for animation recruiters, creative agencies, and tech companies.</li>
          <li>Format resumes and LinkedIn profiles for <strong>ATS readability</strong> without losing information design clarity.</li>
          <li>Pass the <strong>Six-Second Portfolio Test</strong> by front-loading your strongest case studies.</li>
          <li>Structure interview responses using the creative <strong>STAR Technique</strong> (Situation, Task, Action, Result).</li>
          <li>Navigate <strong>California Pay Transparency laws</strong> (SB 1162) and benchmark against BLS creative medians.</li>
          <li>Understand the <strong>California Freelance Worker Protection Act</strong> ($250+ contracts, scope, and 30-day payment rules).</li>
        </ul>
      </div>

      {/* Tuesday Section */}
      <section style={sessionSectionStyle}>
        <div style={sessionHeaderStyle}>
          <h2 style={sessionTitleStyle}>Tuesday Session — Zoom (Preview & Discussion)</h2>
          <span style={sessionBadgeStyle}>AUG 25 · 7:00–9:00 PM</span>
        </div>
        <div style={topicGridStyle}>
          {tuesdayTopics.map(topic => (
            <Link key={topic.key} to={`/week/10/${topic.key}`} style={topicCardStyle}>
              <div style={topicArticleTagStyle}>{topic.article}</div>
              <h3 style={topicCardTitleStyle}>{topic.label}</h3>
              <span style={topicArrowStyle}>Read Lesson & Exercises →</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Saturday Section */}
      <section style={sessionSectionStyle}>
        <div style={sessionHeaderStyle}>
          <h2 style={sessionTitleStyle}>Saturday Session — Studio (Workshop & Simulation)</h2>
          <span style={sessionBadgeStyle}>AUG 29 · 10:00 AM–3:30 PM</span>
        </div>
        <div style={topicGridStyle}>
          {saturdayTopics.map(topic => (
            <Link key={topic.key} to={`/week/10/${topic.key}`} style={topicCardStyle}>
              <div style={topicArticleTagStyle}>{topic.article}</div>
              <h3 style={topicCardTitleStyle}>{topic.label}</h3>
              <span style={topicArrowStyle}>Read Lesson & Exercises →</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Assignment Link */}
      <div style={assignmentCalloutStyle}>
        <div>
          <h3 style={{ margin: '0 0 4px', fontSize: '18px', color: '#8b2616', fontWeight: '800' }}>
            Assignment 6: Release Campaign
          </h3>
          <p style={{ margin: 0, fontSize: '14px', color: '#6b635b' }}>
            Design promotional key art and multi-format release packages for your world.
          </p>
        </div>
        <Link to="/assignments/10" style={assignmentButtonStyle}>
          View Assignment 6 Tracks (Optional) →
        </Link>
      </div>

      {/* Permanent Bookmark Section: LA Creative Career Resource Library */}
      <section id="career-resources" style={resourceLibrarySectionStyle}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', marginBottom: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '20px' }}>🔖</span>
              <h2 style={{ fontSize: '22px', fontWeight: '800', color: '#1a1614', margin: 0 }}>
                LA Creative Career Resource Library
              </h2>
            </div>
            <p style={{ margin: '4px 0 0', fontSize: '13.5px', color: '#6b635b' }}>
              Curated primary sources answering key questions about employment, legal rights, and industry shifts across Greater Los Angeles.
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
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
                <span style={resourceCategoryStyle}>{item.category}</span>
                <span style={resourceBadgeStyle}>{item.badge}</span>
              </div>
              <div style={resourceQuestionStyle}>
                ❓ {item.question}
              </div>
              <h3 style={resourceNameStyle}>{item.name}</h3>
              <p style={resourceDescStyle}>{item.desc}</p>
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                style={resourceLinkButtonStyle}
              >
                {item.label} ↗
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
  maxWidth: '920px',
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
  marginBottom: '20px',
};

const headerStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  marginBottom: '10px',
};

const weekTagStyle = {
  background: '#8b2616',
  color: '#ffffff',
  fontSize: '11px',
  fontWeight: '800',
  letterSpacing: '0.1em',
  padding: '4px 10px',
  borderRadius: '4px',
};

const dateRangeStyle = {
  fontSize: '12px',
  fontWeight: '700',
  color: '#6b635b',
  letterSpacing: '0.05em',
};

const titleStyle = {
  fontSize: '34px',
  fontWeight: '800',
  color: '#1a1614',
  margin: '0 0 12px',
  letterSpacing: '-0.02em',
};

const scheduleStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
  fontSize: '14px',
  color: '#5c544d',
  marginBottom: '20px',
};

const focusStyle = {
  fontSize: '16px',
  lineHeight: '1.5',
  color: '#3d3733',
  background: 'rgba(139, 38, 22, 0.05)',
  borderLeft: '4px solid #8b2616',
  padding: '12px 18px',
  borderRadius: '0 8px 8px 0',
  marginBottom: '28px',
};

const pillarCardStyle = {
  background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
  border: '1px solid #93c5fd',
  borderRadius: '12px',
  padding: '24px',
  marginBottom: '28px',
  boxShadow: '0 4px 14px rgba(30, 58, 138, 0.06)',
};

const pillarLinkStyle = {
  display: 'inline-block',
  background: '#1e40af',
  color: '#ffffff',
  fontSize: '13.5px',
  fontWeight: '700',
  padding: '10px 18px',
  borderRadius: '6px',
  textDecoration: 'none',
  boxShadow: '0 2px 6px rgba(30, 58, 138, 0.2)',
};

const pillarSecondaryLinkStyle = {
  display: 'inline-block',
  background: '#ffffff',
  color: '#1e40af',
  border: '1px solid #93c5fd',
  fontSize: '13.5px',
  fontWeight: '700',
  padding: '10px 16px',
  borderRadius: '6px',
  textDecoration: 'none',
};

const learningGoalsCardStyle = {
  background: '#f4efe4',
  border: '1px solid rgba(139, 38, 22, 0.15)',
  borderRadius: '10px',
  padding: '20px 24px',
  marginBottom: '36px',
};

const learningGoalsHeadingStyle = {
  fontSize: '12px',
  fontWeight: '800',
  letterSpacing: '0.08em',
  color: '#8b2616',
  margin: '0 0 10px',
};

const learningGoalsListStyle = {
  margin: 0,
  paddingLeft: '20px',
  fontSize: '14px',
  lineHeight: '1.6',
  color: '#3d3733',
};

const sessionSectionStyle = {
  marginBottom: '36px',
};

const sessionHeaderStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '16px',
  borderBottom: '2px solid rgba(0, 0, 0, 0.08)',
  paddingBottom: '8px',
  flexWrap: 'wrap',
  gap: '8px',
};

const sessionTitleStyle = {
  fontSize: '19px',
  fontWeight: '700',
  color: '#1a1614',
  margin: 0,
};

const sessionBadgeStyle = {
  fontSize: '11px',
  fontWeight: '700',
  color: '#6b635b',
  background: '#e8e2d4',
  padding: '3px 8px',
  borderRadius: '4px',
  letterSpacing: '0.04em',
};

const topicGridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
  gap: '14px',
};

const topicCardStyle = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  background: '#ffffff',
  border: '1px solid rgba(0, 0, 0, 0.08)',
  borderRadius: '10px',
  padding: '18px 20px',
  textDecoration: 'none',
  color: 'inherit',
  transition: 'transform 0.15s ease, box-shadow 0.15s ease',
  boxShadow: '0 2px 6px rgba(0, 0, 0, 0.03)',
};

const topicArticleTagStyle = {
  fontSize: '11px',
  fontWeight: '700',
  color: '#8b2616',
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
  marginBottom: '6px',
};

const topicCardTitleStyle = {
  fontSize: '15px',
  fontWeight: '700',
  color: '#1a1614',
  lineHeight: '1.35',
  margin: '0 0 12px',
};

const topicArrowStyle = {
  fontSize: '12px',
  fontWeight: '700',
  color: '#8b2616',
  marginTop: 'auto',
};

const assignmentCalloutStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  background: '#ffffff',
  border: '1px solid rgba(139, 38, 22, 0.2)',
  borderRadius: '12px',
  padding: '24px',
  flexWrap: 'wrap',
  gap: '16px',
  boxShadow: '0 4px 12px rgba(139, 38, 22, 0.04)',
  marginBottom: '40px',
};

const assignmentButtonStyle = {
  background: '#8b2616',
  color: '#ffffff',
  fontSize: '13px',
  fontWeight: '700',
  padding: '10px 18px',
  borderRadius: '6px',
  textDecoration: 'none',
};

const resourceLibrarySectionStyle = {
  background: '#ffffff',
  border: '1px solid rgba(0, 0, 0, 0.08)',
  borderRadius: '14px',
  padding: '28px',
  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.04)',
};

const searchInputStyle = {
  padding: '8px 14px',
  fontSize: '13px',
  borderRadius: '6px',
  border: '1px solid rgba(0, 0, 0, 0.15)',
  fontFamily: 'inherit',
  minWidth: '220px',
};

const resourceGridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
  gap: '16px',
  marginTop: '16px',
};

const resourceCardStyle = {
  background: '#faf8f4',
  border: '1px solid rgba(0, 0, 0, 0.07)',
  borderRadius: '10px',
  padding: '18px 20px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
};

const resourceCategoryStyle = {
  fontFamily: 'Menlo, monospace',
  fontSize: '10.5px',
  fontWeight: '700',
  color: '#8b2616',
  textTransform: 'uppercase',
  letterSpacing: '0.06em',
};

const resourceBadgeStyle = {
  fontSize: '10.5px',
  fontWeight: '700',
  color: '#475569',
  background: '#e2e8f0',
  padding: '2px 6px',
  borderRadius: '4px',
};

const resourceQuestionStyle = {
  fontSize: '12px',
  fontWeight: '600',
  color: '#0369a1',
  margin: '4px 0',
};

const resourceNameStyle = {
  fontSize: '16px',
  fontWeight: '800',
  color: '#1a1614',
  margin: '0 0 6px',
};

const resourceDescStyle = {
  fontSize: '13px',
  color: '#5c544d',
  lineHeight: '1.45',
  margin: '0 0 14px',
};

const resourceLinkButtonStyle = {
  display: 'inline-flex',
  alignItems: 'center',
  fontSize: '13px',
  fontWeight: '700',
  color: '#8b2616',
  textDecoration: 'none',
  marginTop: 'auto',
};
