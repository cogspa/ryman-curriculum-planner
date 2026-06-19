import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { rosterData } from './rosterData.js';

export default function RosterPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedGoals, setExpandedGoals] = useState({});

  // Toggle goal text expansion for a candidate by index/name
  const toggleExpand = (name, type) => {
    const key = `${name}-${type}`;
    setExpandedGoals(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  // Filtered roster data based on search term
  const filteredRoster = useMemo(() => {
    if (!searchTerm.trim()) return rosterData;
    const term = searchTerm.toLowerCase();
    return rosterData.filter(student => {
      return (
        student.name.toLowerCase().includes(term) ||
        student.email.toLowerCase().includes(term) ||
        student.phone.toLowerCase().includes(term) ||
        student.city.toLowerCase().includes(term) ||
        student.gradYear.toLowerCase().includes(term) ||
        student.careerGoals.toLowerCase().includes(term) ||
        student.portfolioGoal.toLowerCase().includes(term)
      );
    });
  }, [searchTerm]);

  // Export roster to CSV
  const handleDownloadCSV = () => {
    const headers = [
      'Name',
      'Pronouns',
      'Ryman Grad Year',
      'Email',
      'Phone',
      'City',
      'Career Goals',
      'Portfolio Goal'
    ];

    const rows = rosterData.map(student => [
      student.name,
      student.pronouns,
      student.gradYear,
      student.email,
      student.phone,
      student.city,
      student.careerGoals,
      student.portfolioGoal
    ]);

    // Construct CSV content with proper escaping
    const csvContent = [
      headers.join(','),
      ...rows.map(row => 
        row.map(val => {
          // Double quotes are escaped by doubling them
          const escaped = String(val).replace(/"/g, '""');
          // Wrap in quotes if it contains comma, newline or quotes
          if (escaped.includes(',') || escaped.includes('\n') || escaped.includes('"')) {
            return `"${escaped}"`;
          }
          return escaped;
        }).join(',')
      )
    ].join('\n');

    // Create Blob and trigger download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'pLAtform_Final_Class_Roster.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Helper to render long text with expand option
  const renderGoalText = (name, type, text) => {
    if (!text) return <span style={{ color: '#94a3b8', fontStyle: 'italic' }}>None specified</span>;
    const isExpanded = !!expandedGoals[`${name}-${type}`];
    const threshold = 120;
    
    if (text.length <= threshold) {
      return <div style={{ fontSize: '13px', color: '#475569', lineHeight: '1.4' }}>{text}</div>;
    }

    const displayText = isExpanded ? text : `${text.slice(0, threshold)}...`;

    return (
      <div style={{ fontSize: '13px', color: '#475569', lineHeight: '1.4' }}>
        {displayText}
        <button
          onClick={() => toggleExpand(name, type)}
          style={{
            background: 'none',
            border: 'none',
            color: '#7c3aed',
            fontWeight: 'bold',
            padding: '0 4px',
            cursor: 'pointer',
            fontSize: '11px',
            textTransform: 'uppercase',
            letterSpacing: '0.05em'
          }}
        >
          {isExpanded ? 'Show Less ▴' : 'Show More ▾'}
        </button>
      </div>
    );
  };

  return (
    <div className="app">
      <div className="container" style={{ maxWidth: '1300px' }}>
        <div className="assignment-page" style={{ padding: '32px 24px' }}>
          <Link to="/" className="back-link">← Back to Curriculum</Link>

          <div className="assignment-header" style={{ marginBottom: '32px' }}>
            <img 
              src="https://images.squarespace-cdn.com/content/v1/67806c279fb734295979b37e/9e044490-3bd2-4589-a460-cbabd7c93b35/Ryman_Arts_Logo_No_Tagline.png" 
              alt="Ryman Arts Logo" 
              style={{ height: '44px', marginBottom: '16px', display: 'block' }} 
            />
            <p className="assignment-eyebrow" style={{ color: '#7c3aed', letterSpacing: '0.15em' }}>RYMAN ARTS PLATFORM</p>
            <h1 className="assignment-title" style={{ fontSize: '32px', margin: '8px 0' }}>Final Class List Roster</h1>
            <p className="assignment-subtitle" style={{ fontSize: '15px', opacity: 0.85 }}>
              Official roster of the 14 selected candidates for the inaugural pLAtform cohort. Access student bios, contact information, and download the full spreadsheet roster.
            </p>
          </div>

          {/* Mentorship Pairings & Focus Tracks */}
          <div style={{ marginBottom: '40px' }}>
            <h2 style={{ 
              fontFamily: 'var(--font-display, serif)', 
              fontSize: '22px', 
              fontWeight: 'normal', 
              marginBottom: '16px', 
              color: '#0f172a',
              borderBottom: '1px solid rgba(0,0,0,0.08)',
              paddingBottom: '8px'
            }}>
              🤝 Mentorship Pairings & Industry Focus Tracks
            </h2>
            
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', 
              gap: '20px' 
            }}>
              {/* Illustration / Teacher Track */}
              <div className="curriculum-intro-card" style={{ 
                background: 'rgba(124, 58, 237, 0.03)', 
                border: '1px solid rgba(124, 58, 237, 0.12)', 
                borderRadius: '10px', 
                padding: '20px' 
              }}>
                <span style={{ 
                  fontSize: '10px', 
                  textTransform: 'uppercase', 
                  fontWeight: 'bold', 
                  color: '#7c3aed', 
                  letterSpacing: '0.05em',
                  fontFamily: 'var(--font-mono)'
                }}>
                  Track: Illustration & Education
                </span>
                <h3 style={{ margin: '6px 0 16px 0', fontSize: '18px', fontWeight: 'bold' }}>Illustration / Teacher</h3>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ background: '#fff', padding: '14px', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.04)' }}>
                    <div style={{ fontWeight: 'bold', fontSize: '14px', color: '#0f172a' }}>Kaylee Hawley (Ryman ’15)</div>
                    <div style={{ fontSize: '12px', color: '#64748b', marginTop: '2px' }}>Illustrator & Visual Arts Teacher</div>
                    <div style={{ 
                      marginTop: '12px', 
                      paddingTop: '10px', 
                      borderTop: '1px solid #f1f5f9',
                      fontSize: '13px' 
                    }}>
                      <strong>Mentees:</strong>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '6px' }}>
                        <span style={{ background: 'rgba(124, 58, 237, 0.08)', color: '#7c3aed', padding: '2px 8px', borderRadius: '12px', fontWeight: '500', fontSize: '12px' }}>Emma Tiedemann</span>
                        <span style={{ background: 'rgba(124, 58, 237, 0.08)', color: '#7c3aed', padding: '2px 8px', borderRadius: '12px', fontWeight: '500', fontSize: '12px' }}>Miriam Sills</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Themed Entertainment Track */}
              <div className="curriculum-intro-card" style={{ 
                background: 'rgba(168, 72, 42, 0.03)', 
                border: '1px solid rgba(168, 72, 42, 0.12)', 
                borderRadius: '10px', 
                padding: '20px' 
              }}>
                <span style={{ 
                  fontSize: '10px', 
                  textTransform: 'uppercase', 
                  fontWeight: 'bold', 
                  color: 'var(--accent)', 
                  letterSpacing: '0.05em',
                  fontFamily: 'var(--font-mono)'
                }}>
                  Track: Themed Entertainment & Experiential
                </span>
                <h3 style={{ margin: '6px 0 16px 0', fontSize: '18px', fontWeight: 'bold' }}>Themed Entertainment, Experiential Design, & Architecture</h3>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div style={{ background: '#fff', padding: '14px', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.04)' }}>
                    <div style={{ fontWeight: 'bold', fontSize: '14px', color: '#0f172a' }}>Stephanie Jazmines (Ryman \'06)</div>
                    <div style={{ fontSize: '12px', color: '#64748b', marginTop: '2px' }}>Senior Designer, Walt Disney Imagineering (WDI) - Graphic Designer</div>
                    <div style={{ 
                      marginTop: '12px', 
                      paddingTop: '10px', 
                      borderTop: '1px solid #f1f5f9',
                      fontSize: '13px' 
                    }}>
                      <strong>Mentees:</strong>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '6px' }}>
                        <span style={{ background: 'rgba(168, 72, 42, 0.08)', color: 'var(--accent)', padding: '2px 8px', borderRadius: '12px', fontWeight: '500', fontSize: '12px' }}>Lucy Levine</span>
                        <span style={{ background: 'rgba(168, 72, 42, 0.08)', color: 'var(--accent)', padding: '2px 8px', borderRadius: '12px', fontWeight: '500', fontSize: '12px' }}>Tiana Chamsi</span>
                        <span style={{ background: 'rgba(168, 72, 42, 0.08)', color: 'var(--accent)', padding: '2px 8px', borderRadius: '12px', fontWeight: '500', fontSize: '12px' }}>Hyeyeon (Claire) Choi</span>
                      </div>
                    </div>
                  </div>

                  <div style={{ background: '#fff', padding: '14px', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.04)' }}>
                    <div style={{ fontWeight: 'bold', fontSize: '14px', color: '#0f172a' }}>Emma Wood (Ryman \'12)</div>
                    <div style={{ fontSize: '12px', color: '#64748b', marginTop: '2px' }}>Designer, BRC Imagination Arts</div>
                    <div style={{ 
                      marginTop: '12px', 
                      paddingTop: '10px', 
                      borderTop: '1px solid #f1f5f9',
                      fontSize: '13px' 
                    }}>
                      <strong>Mentees:</strong>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '6px' }}>
                        <span style={{ background: 'rgba(168, 72, 42, 0.08)', color: 'var(--accent)', padding: '2px 8px', borderRadius: '12px', fontWeight: '500', fontSize: '12px' }}>Sabrina Jiang</span>
                        <span style={{ background: 'rgba(168, 72, 42, 0.08)', color: 'var(--accent)', padding: '2px 8px', borderRadius: '12px', fontWeight: '500', fontSize: '12px' }}>Moka Tsukino</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Visual Entertainment Track */}
              <div className="curriculum-intro-card" style={{ 
                background: 'rgba(6, 182, 212, 0.03)', 
                border: '1px solid rgba(6, 182, 212, 0.12)', 
                borderRadius: '10px', 
                padding: '20px' 
              }}>
                <span style={{ 
                  fontSize: '10px', 
                  textTransform: 'uppercase', 
                  fontWeight: 'bold', 
                  color: '#0891b2', 
                  letterSpacing: '0.05em',
                  fontFamily: 'var(--font-mono)'
                }}>
                  Track: Animation & Storyboards
                </span>
                <h3 style={{ margin: '6px 0 16px 0', fontSize: '18px', fontWeight: 'bold' }}>Visual Entertainment</h3>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div style={{ background: '#fff', padding: '14px', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.04)' }}>
                    <div style={{ fontWeight: 'bold', fontSize: '14px', color: '#0f172a' }}>Emily Oetzell (Ryman ‘12)</div>
                    <div style={{ fontSize: '12px', color: '#64748b', marginTop: '2px' }}>Storyboard Artist, Shadow Machine</div>
                    <div style={{ 
                      marginTop: '12px', 
                      paddingTop: '10px', 
                      borderTop: '1px solid #f1f5f9',
                      fontSize: '13px' 
                    }}>
                      <strong>Mentees:</strong>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '6px' }}>
                        <span style={{ background: 'rgba(6, 182, 212, 0.08)', color: '#0891b2', padding: '2px 8px', borderRadius: '12px', fontWeight: '500', fontSize: '12px' }}>Neko Ohnsman</span>
                        <span style={{ background: 'rgba(6, 182, 212, 0.08)', color: '#0891b2', padding: '2px 8px', borderRadius: '12px', fontWeight: '500', fontSize: '12px' }}>Kelsy Hua</span>
                      </div>
                    </div>
                  </div>

                  <div style={{ background: '#fff', padding: '14px', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.04)' }}>
                    <div style={{ fontWeight: 'bold', fontSize: '14px', color: '#0f172a' }}>Leslie Park (Ryman \'11)</div>
                    <div style={{ fontSize: '12px', color: '#64748b', marginTop: '2px' }}>Director & Storyboard Artist, Disney Television Animation</div>
                    <div style={{ 
                      marginTop: '12px', 
                      paddingTop: '10px', 
                      borderTop: '1px solid #f1f5f9',
                      fontSize: '13px' 
                    }}>
                      <strong>Mentees:</strong>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '6px' }}>
                        <span style={{ background: 'rgba(6, 182, 212, 0.08)', color: '#0891b2', padding: '2px 8px', borderRadius: '12px', fontWeight: '500', fontSize: '12px' }}>Lilly Phan</span>
                        <span style={{ background: 'rgba(6, 182, 212, 0.08)', color: '#0891b2', padding: '2px 8px', borderRadius: '12px', fontWeight: '500', fontSize: '12px' }}>Alyssa Valdivia</span>
                        <span style={{ background: 'rgba(6, 182, 212, 0.08)', color: '#0891b2', padding: '2px 8px', borderRadius: '12px', fontWeight: '500', fontSize: '12px' }}>Shan Lee</span>
                      </div>
                    </div>
                  </div>

                  <div style={{ background: '#fff', padding: '14px', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.04)' }}>
                    <div style={{ fontWeight: 'bold', fontSize: '14px', color: '#0f172a' }}>Alycea Tinoyan (Ryman \'11)</div>
                    <div style={{ fontSize: '12px', color: '#64748b', marginTop: '2px' }}>Background Designer, Rick and Morty</div>
                    <div style={{ 
                      marginTop: '12px', 
                      paddingTop: '10px', 
                      borderTop: '1px solid #f1f5f9',
                      fontSize: '13px' 
                    }}>
                      <strong>Mentees:</strong>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '6px' }}>
                        <span style={{ background: 'rgba(6, 182, 212, 0.08)', color: '#0891b2', padding: '2px 8px', borderRadius: '12px', fontWeight: '500', fontSize: '12px' }}>Claire van Beek</span>
                        <span style={{ background: 'rgba(6, 182, 212, 0.08)', color: '#0891b2', padding: '2px 8px', borderRadius: '12px', fontWeight: '500', fontSize: '12px' }}>Nadia Alwiny</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Search, Filter, and Export Bar */}
          <div style={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            gap: '16px', 
            alignItems: 'flex-end', 
            marginBottom: '24px', 
            background: 'rgba(255, 255, 255, 0.4)', 
            padding: '16px', 
            borderRadius: '10px', 
            border: '1px solid rgba(0,0,0,0.06)' 
          }}>
            <div style={{ flex: '1', minWidth: '280px' }}>
              <label style={{ 
                display: 'block', 
                fontSize: '11px', 
                textTransform: 'uppercase', 
                fontWeight: 'bold', 
                marginBottom: '6px', 
                color: '#7c3aed', 
                fontFamily: 'var(--font-mono)' 
              }}>
                Search Roster
              </label>
              <input 
                type="text"
                placeholder="Search by name, email, city, goals..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ 
                  width: '100%', 
                  padding: '10px 14px', 
                  border: '1px solid rgba(0,0,0,0.12)', 
                  borderRadius: '6px', 
                  fontSize: '14px', 
                  background: '#fff' 
                }}
              />
            </div>

            <div>
              <button 
                onClick={handleDownloadCSV}
                style={{ 
                  background: '#7c3aed', 
                  color: '#fff', 
                  border: 'none', 
                  padding: '11px 20px', 
                  borderRadius: '6px', 
                  fontWeight: 'bold', 
                  fontSize: '14px', 
                  cursor: 'pointer', 
                  display: 'inline-flex', 
                  alignItems: 'center', 
                  gap: '8px', 
                  boxShadow: '0 2px 8px rgba(124, 58, 237, 0.25)', 
                  transition: 'all 0.2s' 
                }}
                onMouseOver={(e) => e.currentTarget.style.background = '#6d28d9'}
                onMouseOut={(e) => e.currentTarget.style.background = '#7c3aed'}
              >
                📥 Download Roster (CSV)
              </button>
            </div>
          </div>

          {/* Roster Table */}
          <div style={{ 
            overflowX: 'auto', 
            border: '1px solid rgba(0,0,0,0.08)', 
            borderRadius: '10px', 
            background: '#fff', 
            boxShadow: '0 4px 20px rgba(0,0,0,0.04)' 
          }}>
            <table className="grading-table" style={{ margin: 0, width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ background: '#f8fafc', borderBottom: '2px solid rgba(0,0,0,0.08)' }}>
                  <th style={{ padding: '14px 18px', width: '220px', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#7c3aed', fontFamily: 'var(--font-mono)' }}>Student</th>
                  <th style={{ padding: '14px 18px', width: '250px', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#7c3aed', fontFamily: 'var(--font-mono)' }}>Contact Details</th>
                  <th style={{ padding: '14px 18px', width: '130px', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#7c3aed', fontFamily: 'var(--font-mono)' }}>Location</th>
                  <th style={{ padding: '14px 18px', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#7c3aed', fontFamily: 'var(--font-mono)' }}>Career & Portfolio Goals</th>
                </tr>
              </thead>
              <tbody>
                {filteredRoster.length > 0 ? (
                  filteredRoster.map((student, index) => (
                    <tr key={index} style={{ borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
                      {/* Name Column */}
                      <td style={{ padding: '14px 18px', verticalAlign: 'top' }}>
                        <div style={{ fontWeight: 'bold', fontSize: '15px', color: '#0f172a' }}>
                          {student.name}
                        </div>
                        {student.pronouns && (
                          <div style={{ fontSize: '12px', color: '#64748b', marginTop: '2px' }}>
                            {student.pronouns}
                          </div>
                        )}
                        <div style={{ marginTop: '8px' }}>
                          <span style={{ 
                            display: 'inline-block', 
                            fontSize: '10px', 
                            background: 'rgba(124, 58, 237, 0.08)', 
                            color: '#7c3aed', 
                            padding: '2px 8px', 
                            borderRadius: '20px', 
                            fontWeight: 'bold', 
                            letterSpacing: '0.02em' 
                          }}>
                            Ryman '{student.gradYear.replace(/^(fall|spring)\s+/i, '')}
                          </span>
                        </div>
                      </td>

                      {/* Contact Column */}
                      <td style={{ padding: '14px 18px', verticalAlign: 'top', fontSize: '13px', color: '#334155' }}>
                        <div style={{ marginBottom: '6px' }}>
                          <span style={{ marginRight: '6px' }}>✉️</span>
                          <a 
                            href={`mailto:${student.email}`} 
                            style={{ color: '#7c3aed', textDecoration: 'none', fontWeight: '500' }}
                          >
                            {student.email}
                          </a>
                        </div>
                        {student.phone && (
                          <div>
                            <span style={{ marginRight: '6px' }}>📞</span>
                            <span style={{ fontWeight: '500' }}>{student.phone}</span>
                          </div>
                        )}
                      </td>

                      {/* Location Column */}
                      <td style={{ padding: '14px 18px', verticalAlign: 'top', fontSize: '13px', color: '#334155', fontWeight: '500' }}>
                        📍 {student.city || '—'}
                      </td>

                      {/* Goals Column */}
                      <td style={{ padding: '14px 18px', verticalAlign: 'top' }}>
                        <div style={{ marginBottom: '12px' }}>
                          <div style={{ fontSize: '11px', textTransform: 'uppercase', fontWeight: 'bold', color: '#7c3aed', marginBottom: '4px', letterSpacing: '0.02em' }}>Career Goals</div>
                          {renderGoalText(student.name, 'career', student.careerGoals)}
                        </div>
                        <div>
                          <div style={{ fontSize: '11px', textTransform: 'uppercase', fontWeight: 'bold', color: '#7c3aed', marginBottom: '4px', letterSpacing: '0.02em' }}>Portfolio Goal</div>
                          {renderGoalText(student.name, 'portfolio', student.portfolioGoal)}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" style={{ padding: '24px', textAlign: 'center', color: '#64748b', fontStyle: 'italic' }}>
                      No cohort members match your search criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div style={{ 
            marginTop: '24px', 
            fontSize: '13px', 
            color: '#64748b', 
            background: 'rgba(0,0,0,0.02)', 
            padding: '16px', 
            borderRadius: '8px', 
            border: '1px solid rgba(0,0,0,0.04)' 
          }}>
            💡 <strong>Pro Tip:</strong> Click the <strong>Download Roster (CSV)</strong> button to quickly save this cohort contact information into an Excel or Google Sheets compatible format.
          </div>

          <div className="assignment-footer" style={{ marginTop: '32px' }}>
            <Link to="/" className="back-link">← Back to Curriculum</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
