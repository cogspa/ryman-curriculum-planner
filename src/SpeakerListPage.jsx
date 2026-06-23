import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import LegalDisclaimer from './LegalDisclaimer.jsx';

const speakersData = [
  {
    firstName: 'John Michael',
    lastName: 'Kelly',
    role: 'Digital Artist',
    org: 'Procreate Expert',
    industry: 'Digital Illustration / iPad Art',
    fit: 'Artists using Procreate / Live Procreate Demos',
    contactPerson: 'Audrey',
    contactDate: '2026-02-25',
    note: 'Met with AS and RT on 3/10',
    website: ''
  },
  {
    firstName: 'Jeremy',
    lastName: 'Costello',
    role: 'Creative / Tech',
    org: 'Walt Disney Imagineering (WDI)',
    industry: 'Themed Entertainment / LBE',
    fit: 'Themed Entertainment Design & Prototyping',
    contactPerson: 'Audrey / Rebecca',
    contactDate: '',
    note: '',
    website: ''
  },
  {
    firstName: 'Andrea',
    lastName: 'Favilli',
    role: 'Founder & Creative Director',
    org: 'Favilli Studio',
    industry: 'Location-Based Entertainment (LBE)',
    fit: 'Translating Classical Foundations to Themed Spaces',
    contactPerson: 'Eugenia',
    contactDate: '',
    note: '',
    website: ''
  },
  {
    firstName: 'Christian',
    lastName: 'Hope',
    role: 'Concept Artist / Designer',
    org: 'LBE Concepts',
    industry: 'Location-Based Entertainment (LBE)',
    fit: 'Introduction to Commercial Application / Illustration & Visual Storytelling',
    contactPerson: 'Eugenia',
    contactDate: '',
    note: '',
    website: ''
  },
  {
    firstName: 'Scot',
    lastName: 'Drake',
    role: 'Former Board Member / Creative Executive',
    org: 'Walt Disney Imagineering (WDI)',
    industry: 'Location-Based Entertainment (LBE)',
    fit: 'Illustration & Visual Storytelling / Client Simulation Project Advisor',
    contactPerson: 'David P',
    contactDate: '',
    note: '',
    website: ''
  },
  {
    firstName: 'Chris',
    lastName: 'Chien',
    role: 'Art Director / Illustrator',
    org: 'Independent Creative',
    industry: 'Location-Based Entertainment (LBE)',
    fit: 'Digital Brushes & Texture SystemsGlazing & Layering Demos',
    contactPerson: 'Eugenia or David P',
    contactDate: '',
    note: '',
    website: ''
  },
  {
    firstName: 'Chito',
    lastName: 'Arellano',
    role: 'Lead Designer',
    org: 'Toys & Games Studio',
    industry: 'Toys and Games Design',
    fit: 'Composition for Screen-Based Media / Scaling Art Assets',
    contactPerson: 'Eugenia',
    contactDate: '',
    note: '',
    website: ''
  },
  {
    firstName: 'Maggie',
    lastName: 'Parr',
    role: 'Muralist / Themed Illustrator',
    org: 'Parr Fine Art',
    industry: 'Gallery Art / Location-Based Entertainment',
    fit: 'Introduction to Commercial Application & Portfolio Curation',
    contactPerson: 'Eugenia, David P or Audrey/Rebecca',
    contactDate: '',
    note: '',
    website: ''
  },
  {
    firstName: 'Gwen',
    lastName: 'Ballantyne',
    role: 'Senior Illustrator',
    org: 'Illustration & Scenic Design',
    industry: 'Illustration / LBE',
    fit: 'Light, Color & Atmosphere for Screen / Cinematic Glazing Demos',
    contactPerson: 'Eugenia or David P',
    contactDate: '',
    note: '',
    website: ''
  },
  {
    firstName: 'Victoria',
    lastName: 'Ying',
    role: 'Graphic Novelist / Illustrator',
    org: 'Author & Comic Artist',
    industry: 'Animation / Children\'s Books',
    fit: 'Illustration & Visual Storytelling / Page layouts & Book Arts',
    contactPerson: 'Eugenia',
    contactDate: '',
    note: '',
    website: ''
  },
  {
    firstName: 'Fadhel',
    lastName: 'Dabbagh',
    role: 'Environment Artist',
    org: 'Game Development Studio',
    industry: 'Video Games / 3D Environments',
    fit: 'Light, Color, & Atmosphere for Screen-Based Entertainment',
    contactPerson: 'Eugenia',
    contactDate: '',
    note: '',
    website: ''
  },
  {
    firstName: 'Christian',
    lastName: 'Lachel',
    role: 'Ryman Arts Board Member / Executive',
    org: 'BRC Imagination Arts',
    industry: 'Location-Based Entertainment (LBE)',
    fit: 'Job Readiness, Interview Training / Client Simulation Project Mentor',
    contactPerson: 'Eugenia, David P or Audrey/Rebecca',
    contactDate: '',
    note: '',
    website: ''
  },
  {
    firstName: 'Eugenia',
    lastName: 'Chen',
    role: 'Ryman Arts Board Member / Designer',
    org: 'Paramount / Euge Creative',
    industry: 'Consumer Products & LBE',
    fit: 'Freelance, Contracts, Business Skills & Licensing Operations',
    contactPerson: 'Self',
    contactDate: '',
    note: '',
    website: ''
  },
  {
    firstName: 'Karen',
    lastName: 'Thompson',
    role: 'Art Director',
    org: 'THG Creative',
    industry: 'Themed Entertainment / LBE',
    fit: 'Themed Entertainment Concept Design & Workflows',
    contactPerson: 'Heidi Hirsch',
    contactDate: '',
    note: '',
    website: ''
  },
  {
    firstName: 'Chris',
    lastName: 'Bradley',
    role: 'Illustrator / Designer',
    org: 'Bradley Studio',
    industry: 'Illustration / LBE',
    fit: 'Professional Commercial Illustration & Studio Production',
    contactPerson: 'Heidi Hirsch',
    contactDate: '2026-05-12',
    note: 'Expressed interest via email.',
    website: 'https://bradleyswork.com/'
  },
  {
    firstName: 'Don',
    lastName: 'Carson',
    role: 'Senior Art Director',
    org: 'Mighty Coconut',
    industry: 'Illustrations / VR / LBE',
    fit: 'From Sketch Pad to VR / Spatial Canvas Workflows',
    contactPerson: 'Heidi Hirsch',
    contactDate: '2026-05-19',
    note: '',
    website: ''
  },
  {
    firstName: 'Arad',
    lastName: 'Vejdani',
    role: 'Creative Professional',
    org: 'Independent Creative',
    industry: 'Digital Arts',
    fit: 'Digital Pipeline & Tool Integration Demos',
    contactPerson: 'Heidi Hirsch',
    contactDate: '',
    note: '',
    website: ''
  },
  {
    firstName: 'Mike',
    lastName: 'Sweeney',
    role: 'Producer / Director',
    org: 'Meteron',
    industry: 'Creative Production',
    fit: 'Client Simulations & Professional Studio Timelines',
    contactPerson: 'Heidi Hirsch',
    contactDate: '',
    note: '',
    website: ''
  },
  {
    firstName: 'Heidi',
    lastName: 'Hirsch',
    role: 'Creative Lead / Speaker Organizer',
    org: 'Ryman Arts Lead',
    industry: 'Career Development',
    fit: 'Interested in speaking on career-focused sessions & portfolios',
    contactPerson: 'Self',
    contactDate: '',
    note: '',
    website: ''
  }
];

export default function SpeakerListPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('All');

  // Compute unique industries for filter dropdown
  const industries = useMemo(() => {
    const list = new Set(['All']);
    speakersData.forEach(s => {
      if (s.industry) {
        // Handle split industry lists e.g. "Gallery Art / LBE"
        s.industry.split(/[\/,]/).forEach(part => {
          const trimmed = part.trim();
          if (trimmed) list.add(trimmed);
        });
      }
    });
    return Array.from(list);
  }, []);

  // Filtered speakers
  const filteredSpeakers = useMemo(() => {
    return speakersData.filter(s => {
      const matchesSearch = 
        `${s.firstName} ${s.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (s.org && s.org.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (s.fit && s.fit.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (s.industry && s.industry.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesIndustry = 
        selectedIndustry === 'All' || 
        (s.industry && s.industry.toLowerCase().includes(selectedIndustry.toLowerCase()));

      return matchesSearch && matchesIndustry;
    });
  }, [searchTerm, selectedIndustry]);

  return (
    <div className="app">
      <div className="container" style={{ maxWidth: '1200px' }}>
        <div className="assignment-page" style={{ padding: '32px 24px' }}>
          <Link to="/" className="back-link">← Back to Curriculum</Link>

          <div className="assignment-header" style={{ marginBottom: '32px' }}>
            <img 
              src="https://images.squarespace-cdn.com/content/v1/67806c279fb734295979b37e/9e044490-3bd2-4589-a460-cbabd7c93b35/Ryman_Arts_Logo_No_Tagline.png" 
              alt="Ryman Arts Logo" 
              style={{ height: '48px', marginBottom: '16px', display: 'block' }} 
            />
            <p className="assignment-eyebrow" style={{ color: '#06b6d4', letterSpacing: '0.15em' }}>RYMAN ARTS pLAtform</p>
            <h1 className="assignment-title" style={{ fontSize: '32px', margin: '8px 0' }}>Potential Guest Speakers</h1>
            <p className="assignment-subtitle" style={{ fontSize: '15px', opacity: 0.85 }}>
              A curated database of industry professionals, board members, and creative specialists to invite for Zoom & studio presentations.
            </p>
          </div>

          {/* Search & Filter Bar */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', marginBottom: '24px', background: 'rgba(255, 255, 255, 0.4)', padding: '16px', borderRadius: '10px', border: '1px solid rgba(0,0,0,0.06)' }}>
            <div style={{ flex: '1', minWidth: '250px' }}>
              <label style={{ display: 'block', fontSize: '11px', textTransform: 'uppercase', fontWeight: 'bold', marginBottom: '6px', color: '#0891b2', fontFamily: 'var(--font-mono)' }}>Search Speakers</label>
              <input 
                type="text"
                placeholder="Search by name, organization, fit, or industry..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ width: '100%', padding: '10px 14px', border: '1px solid rgba(0,0,0,0.12)', borderRadius: '6px', fontSize: '14px', background: '#fff' }}
              />
            </div>

            <div style={{ minWidth: '200px' }}>
              <label style={{ display: 'block', fontSize: '11px', textTransform: 'uppercase', fontWeight: 'bold', marginBottom: '6px', color: '#0891b2', fontFamily: 'var(--font-mono)' }}>Filter Industry</label>
              <select
                value={selectedIndustry}
                onChange={(e) => setSelectedIndustry(e.target.value)}
                style={{ width: '100%', padding: '10px 14px', border: '1px solid rgba(0,0,0,0.12)', borderRadius: '6px', fontSize: '14px', background: '#fff', cursor: 'pointer' }}
              >
                {industries.map((ind, i) => (
                  <option key={i} value={ind}>{ind}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Responsive Speakers Table */}
          <div style={{ overflowX: 'auto', border: '1px solid rgba(0,0,0,0.08)', borderRadius: '10px', background: '#fff', boxShadow: '0 4px 20px rgba(0,0,0,0.04)' }}>
            <table className="grading-table" style={{ margin: 0, width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ background: '#f8fafc', borderBottom: '2px solid rgba(0,0,0,0.08)' }}>
                  <th style={{ padding: '14px 18px', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#0891b2', fontFamily: 'var(--font-mono)' }}>Speaker</th>
                  <th style={{ padding: '14px 18px', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#0891b2', fontFamily: 'var(--font-mono)' }}>Org / Industry</th>
                  <th style={{ padding: '14px 18px', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#0891b2', fontFamily: 'var(--font-mono)' }}>Curriculum Fit</th>
                  <th style={{ padding: '14px 18px', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#0891b2', fontFamily: 'var(--font-mono)' }}>Contact Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredSpeakers.length > 0 ? (
                  filteredSpeakers.map((speaker, index) => (
                    <tr key={index} style={{ borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
                      <td style={{ padding: '14px 18px', verticalAlign: 'top' }}>
                        <div style={{ fontWeight: 'bold', fontSize: '15px', color: '#0f172a' }}>
                          {speaker.firstName} {speaker.lastName}
                        </div>
                        {speaker.role && (
                          <div style={{ fontSize: '12px', color: '#64748b', marginTop: '2px' }}>
                            {speaker.role}
                          </div>
                        )}
                        {speaker.website && (
                          <a 
                            href={speaker.website} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: '#06b6d4', marginTop: '6px', fontWeight: 'bold', textDecoration: 'none' }}
                          >
                            🔗 Website →
                          </a>
                        )}
                      </td>
                      <td style={{ padding: '14px 18px', verticalAlign: 'top' }}>
                        <div style={{ fontSize: '13px', fontWeight: '600', color: '#334155' }}>
                          {speaker.org || '—'}
                        </div>
                        {speaker.industry && (
                          <span style={{ display: 'inline-block', fontSize: '10px', background: 'rgba(6, 182, 212, 0.08)', color: '#0891b2', padding: '2px 8px', borderRadius: '20px', marginTop: '6px', fontWeight: 'bold', letterSpacing: '0.02em' }}>
                            {speaker.industry}
                          </span>
                        )}
                      </td>
                      <td style={{ padding: '14px 18px', verticalAlign: 'top', fontSize: '13px', color: '#475569', lineHeight: '1.4' }}>
                        {speaker.fit ? speaker.fit : <span style={{ color: '#94a3b8', fontStyle: 'italic' }}>General Speaking / TBD</span>}
                      </td>
                      <td style={{ padding: '14px 18px', verticalAlign: 'top', fontSize: '12px', color: '#334155' }}>
                        <div>
                          <strong>Contact:</strong> {speaker.contactPerson || '—'}
                        </div>
                        {speaker.contactDate && (
                          <div style={{ fontSize: '11px', color: '#64748b', marginTop: '2px' }}>
                            <strong>Date:</strong> {speaker.contactDate}
                          </div>
                        )}
                        {speaker.note && (
                          <div style={{ fontSize: '11px', color: '#0891b2', background: 'rgba(6, 182, 212, 0.05)', borderLeft: '2px solid #06b6d4', padding: '4px 8px', borderRadius: '4px', marginTop: '6px', fontStyle: 'italic' }}>
                            {speaker.note}
                          </div>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" style={{ padding: '24px', textAlign: 'center', color: '#64748b', fontStyle: 'italic' }}>
                      No potential speakers match your search criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div style={{ marginTop: '24px', fontSize: '13px', color: '#64748b', background: 'rgba(0,0,0,0.02)', padding: '16px', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.04)' }}>
            💡 <strong>Pro Tip:</strong> Click the <strong>Back to Curriculum</strong> link above to assign any of these candidates directly into a specific week's speaker slot!
          </div>

          <div className="assignment-footer" style={{ marginTop: '32px' }}>
            <Link to="/" className="back-link">← Back to Curriculum</Link>
          </div>
          <LegalDisclaimer style={{ borderTop: 'none', paddingTop: 0 }} />
        </div>
      </div>
    </div>
  );
}
