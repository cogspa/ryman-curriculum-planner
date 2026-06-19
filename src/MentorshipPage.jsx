import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { rosterData } from './rosterData.js';

export default function MentorshipPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMentee, setSelectedMentee] = useState(null);

  // Mentor & Mentee Relationship Data
  const mentorshipData = [
    {
      track: "Illustration / Teacher",
      color: "#7c3aed",
      bgColor: "rgba(124, 58, 237, 0.03)",
      borderColor: "rgba(124, 58, 237, 0.12)",
      badgeBg: "rgba(124, 58, 237, 0.08)",
      mentors: [
        {
          name: "Kaylee Hawley (Ryman ’15)",
          role: "Illustrator & Visual Arts Teacher",
          mentees: ["Emma Tiedemann", "Miriam Sills"]
        }
      ]
    },
    {
      track: "Themed Entertainment, Experiential Design, & Architecture",
      color: "var(--accent, #a8482a)",
      bgColor: "rgba(168, 72, 42, 0.03)",
      borderColor: "rgba(168, 72, 42, 0.12)",
      badgeBg: "rgba(168, 72, 42, 0.08)",
      mentors: [
        {
          name: "Stephanie Jazmines (Ryman '06)",
          role: "Senior Designer, Walt Disney Imagineering - Graphic Designer",
          mentees: ["Lucy Levine", "Tiana Chamsi", "Hyeyeon (Claire) Choi"]
        },
        {
          name: "Emma Wood (Ryman '12)",
          role: "Designer, BRC Imagination Arts",
          mentees: ["Sabrina Jiang", "Moka Tsukino"]
        }
      ]
    },
    {
      track: "Visual Entertainment",
      color: "#0891b2",
      bgColor: "rgba(6, 182, 212, 0.03)",
      borderColor: "rgba(6, 182, 212, 0.12)",
      badgeBg: "rgba(6, 182, 212, 0.08)",
      mentors: [
        {
          name: "Emily Oetzell (Ryman ‘12)",
          role: "Storyboard Artist, Shadow Machine",
          mentees: ["Neko Ohnsman", "Kelsy Hua"]
        },
        {
          name: "Leslie Park (Ryman '11)",
          role: "Director & Storyboard Artist, Disney Television Animation",
          mentees: ["Lilly Phan", "Alyssa Valdivia", "Shan Lee"]
        },
        {
          name: "Alycea Tinoyan (Ryman '11)",
          role: "Background Designer, Rick and Morty",
          mentees: ["Claire van Beek", "Nadia Alwiny"]
        }
      ]
    }
  ];

  // Helper to find a mentee's full cohort profile from rosterData
  const getMenteeProfile = (name) => {
    return rosterData.find(student => student.name.toLowerCase().trim() === name.toLowerCase().trim());
  };

  // Filter mentorship data based on search term
  const filteredData = mentorshipData.map(track => {
    const matchedMentors = track.mentors.filter(mentor => {
      const matchesMentorName = mentor.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRole = mentor.role.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesMentees = mentor.mentees.some(m => m.toLowerCase().includes(searchTerm.toLowerCase()));
      return matchesMentorName || matchesRole || matchesMentees;
    });

    return {
      ...track,
      mentors: matchedMentors
    };
  }).filter(track => track.mentors.length > 0);

  return (
    <div className="app">
      <div className="container" style={{ maxWidth: '1200px' }}>
        <div className="assignment-page" style={{ padding: '32px 24px', position: 'relative' }}>
          
          {/* Top Navigation Bar */}
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center', marginBottom: '20px' }} className="no-print">
            <Link to="/" className="back-link">← Back to Curriculum</Link>
            <span style={{ opacity: 0.3 }}>|</span>
            <Link to="/roster" className="back-link">📋 Cohort Roster</Link>
          </div>

          {/* Header block with Logo */}
          <header className="syllabus-header" style={{ marginBottom: '36px' }}>
            <img 
              src="https://images.squarespace-cdn.com/content/v1/67806c279fb734295979b37e/9e044490-3bd2-4589-a460-cbabd7c93b35/Ryman_Arts_Logo_No_Tagline.png" 
              alt="Ryman Arts Logo" 
              style={{ height: '48px', marginBottom: '16px', display: 'block' }} 
            />
            <p className="syllabus-eyebrow">Alumni Mentorship Network · 2026 Cohort</p>
            <h1 className="syllabus-title" style={{ fontSize: '36px', letterSpacing: '-0.02em', marginBottom: '12px' }}>
              Mentorship Program Assignments
            </h1>
            <p className="syllabus-sub-title" style={{ fontSize: '15px', color: '#475569', maxWidth: '800px', lineHeight: '1.6' }}>
              Connecting the inaugural pLAtform cohort of student candidates with established alumni leaders in their specialized creative disciplines. Click on any student candidate to view their goals and profile.
            </p>
          </header>

          {/* Search Box */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.45)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(0, 0, 0, 0.08)',
            borderRadius: '12px',
            padding: '16px',
            marginBottom: '32px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }} className="no-print">
            <span style={{ fontSize: '18px' }}>🔍</span>
            <input 
              type="text"
              placeholder="Search by mentor name, creative role, or candidate name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                flex: 1,
                border: 'none',
                background: 'transparent',
                fontSize: '15px',
                outline: 'none',
                color: '#1e293b'
              }}
            />
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm('')}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#94a3b8',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  fontSize: '14px'
                }}
              >
                Clear
              </button>
            )}
          </div>

          {/* Mentorship Tracks Grid */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            {filteredData.length > 0 ? (
              filteredData.map((track, idx) => (
                <div key={idx} style={{
                  background: 'rgba(255, 255, 255, 0.5)',
                  border: '1px solid rgba(0, 0, 0, 0.06)',
                  borderRadius: '16px',
                  padding: '24px',
                  boxShadow: '0 4px 24px rgba(0, 0, 0, 0.02)'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    borderBottom: '1px solid rgba(0,0,0,0.08)',
                    paddingBottom: '12px',
                    marginBottom: '20px'
                  }}>
                    <span style={{
                      width: '12px',
                      height: '12px',
                      borderRadius: '50%',
                      background: track.color,
                      display: 'inline-block'
                    }}></span>
                    <h2 style={{
                      margin: 0,
                      fontFamily: 'var(--font-display, serif)',
                      fontSize: '20px',
                      fontWeight: 'normal',
                      color: '#0f172a'
                    }}>
                      {track.track}
                    </h2>
                  </div>

                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                    gap: '20px'
                  }}>
                    {track.mentors.map((mentor, mIdx) => (
                      <div key={mIdx} style={{
                        background: '#fff',
                        border: `1px solid ${track.borderColor}`,
                        borderRadius: '12px',
                        padding: '20px',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.01)',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between'
                      }}>
                        <div>
                          <h3 style={{
                            margin: '0 0 6px 0',
                            fontSize: '16px',
                            fontWeight: 'bold',
                            color: '#0f172a'
                          }}>
                            {mentor.name}
                          </h3>
                          <p style={{
                            margin: '0 0 16px 0',
                            fontSize: '12.5px',
                            color: '#64748b',
                            lineHeight: '1.4'
                          }}>
                            {mentor.role}
                          </p>
                        </div>

                        <div style={{
                          borderTop: '1px solid #f1f5f9',
                          paddingTop: '14px',
                          marginTop: '8px'
                        }}>
                          <span style={{
                            fontSize: '11px',
                            fontWeight: 'bold',
                            textTransform: 'uppercase',
                            color: '#64748b',
                            letterSpacing: '0.05em',
                            display: 'block',
                            marginBottom: '8px'
                          }}>
                            Student Candidates (Mentees)
                          </span>
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                            {mentor.mentees.map((menteeName, menteeIdx) => {
                              const profile = getMenteeProfile(menteeName);
                              return (
                                <button
                                  key={menteeIdx}
                                  onClick={() => profile && setSelectedMentee(profile)}
                                  style={{
                                    background: track.badgeBg,
                                    color: track.color,
                                    border: 'none',
                                    padding: '6px 12px',
                                    borderRadius: '20px',
                                    fontWeight: '500',
                                    fontSize: '13px',
                                    cursor: 'pointer',
                                    transition: 'transform 0.15s ease, background 0.15s ease',
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '4px'
                                  }}
                                  onMouseOver={(e) => {
                                    e.currentTarget.style.transform = 'scale(1.03)';
                                    e.currentTarget.style.background = track.color;
                                    e.currentTarget.style.color = '#fff';
                                  }}
                                  onMouseOut={(e) => {
                                    e.currentTarget.style.transform = 'scale(1)';
                                    e.currentTarget.style.background = track.badgeBg;
                                    e.currentTarget.style.color = track.color;
                                  }}
                                  title="Click to view candidate details"
                                >
                                  👤 {menteeName}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <div style={{
                textAlign: 'center',
                padding: '40px',
                background: 'rgba(0,0,0,0.02)',
                borderRadius: '12px',
                color: '#64748b',
                fontStyle: 'italic'
              }}>
                No mentors or candidate matches found for "{searchTerm}".
              </div>
            )}
          </div>

          {/* Interactive Candidate Profile Overlay Modal */}
          {selectedMentee && (
            <div style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(15, 23, 42, 0.4)',
              backdropFilter: 'blur(4px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 9999,
              padding: '20px'
            }} onClick={() => setSelectedMentee(null)}>
              <div style={{
                background: '#fff',
                border: '1px solid rgba(0,0,0,0.1)',
                borderRadius: '16px',
                width: '100%',
                maxWidth: '650px',
                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                padding: '28px',
                position: 'relative',
                animation: 'fadeIn 0.2s ease-out'
              }} onClick={(e) => e.stopPropagation()}>
                
                <button 
                  onClick={() => setSelectedMentee(null)}
                  style={{
                    position: 'absolute',
                    top: '20px',
                    right: '20px',
                    background: 'rgba(0,0,0,0.04)',
                    border: 'none',
                    borderRadius: '50%',
                    width: '32px',
                    height: '32px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '16px',
                    fontWeight: 'bold',
                    color: '#64748b',
                    transition: 'all 0.15s'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.background = 'rgba(0,0,0,0.08)'}
                  onMouseOut={(e) => e.currentTarget.style.background = 'rgba(0,0,0,0.04)'}
                >
                  ✕
                </button>

                <div style={{ marginBottom: '20px' }}>
                  <span style={{ 
                    fontSize: '11px', 
                    background: 'rgba(124, 58, 237, 0.08)', 
                    color: '#7c3aed', 
                    padding: '3px 10px', 
                    borderRadius: '20px', 
                    fontWeight: 'bold', 
                    letterSpacing: '0.02em',
                    textTransform: 'uppercase'
                  }}>
                    Cohort Candidate Profile
                  </span>
                  <h2 style={{
                    margin: '12px 0 4px 0',
                    fontFamily: 'var(--font-display, serif)',
                    fontSize: '26px',
                    fontWeight: 'normal',
                    color: '#0f172a'
                  }}>
                    {selectedMentee.name}
                  </h2>
                  <p style={{ margin: 0, fontSize: '13px', color: '#64748b' }}>
                    Pronouns: <strong>{selectedMentee.pronouns || '—'}</strong> · Ryman Grad Year: <strong>{selectedMentee.gradYear}</strong>
                  </p>
                </div>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                  gap: '16px',
                  background: 'rgba(0,0,0,0.02)',
                  padding: '16px',
                  borderRadius: '10px',
                  marginBottom: '24px',
                  fontSize: '13.5px'
                }}>
                  <div>
                    <span style={{ color: '#64748b', display: 'block', fontSize: '11px', textTransform: 'uppercase', fontWeight: 'bold', marginBottom: '2px' }}>Email Contact</span>
                    <a href={`mailto:${selectedMentee.email}`} style={{ color: '#7c3aed', textDecoration: 'none', fontWeight: '500' }}>
                      {selectedMentee.email}
                    </a>
                  </div>
                  <div>
                    <span style={{ color: '#64748b', display: 'block', fontSize: '11px', textTransform: 'uppercase', fontWeight: 'bold', marginBottom: '2px' }}>Phone Contact</span>
                    <span style={{ fontWeight: '500', color: '#1e293b' }}>{selectedMentee.phone || '—'}</span>
                  </div>
                  <div>
                    <span style={{ color: '#64748b', display: 'block', fontSize: '11px', textTransform: 'uppercase', fontWeight: 'bold', marginBottom: '2px' }}>Studio Location</span>
                    <span style={{ fontWeight: '500', color: '#1e293b' }}>📍 {selectedMentee.city || '—'}</span>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', maxHeight: '280px', overflowY: 'auto', paddingRight: '8px' }}>
                  <div>
                    <h4 style={{
                      margin: '0 0 6px 0',
                      fontSize: '12px',
                      textTransform: 'uppercase',
                      color: '#7c3aed',
                      fontWeight: 'bold',
                      letterSpacing: '0.02em'
                    }}>
                      Career Goals
                    </h4>
                    <p style={{
                      margin: 0,
                      fontSize: '13px',
                      color: '#475569',
                      lineHeight: '1.5',
                      whiteSpace: 'pre-line'
                    }}>
                      {selectedMentee.careerGoals}
                    </p>
                  </div>

                  <div>
                    <h4 style={{
                      margin: '0 0 6px 0',
                      fontSize: '12px',
                      textTransform: 'uppercase',
                      color: '#7c3aed',
                      fontWeight: 'bold',
                      letterSpacing: '0.02em'
                    }}>
                      Portfolio Goal
                    </h4>
                    <p style={{
                      margin: 0,
                      fontSize: '13px',
                      color: '#475569',
                      lineHeight: '1.5'
                    }}>
                      {selectedMentee.portfolioGoal}
                    </p>
                  </div>
                </div>

                <div style={{
                  borderTop: '1px solid #e2e8f0',
                  marginTop: '24px',
                  paddingTop: '16px',
                  display: 'flex',
                  justifyContent: 'flex-end',
                  gap: '12px'
                }}>
                  <Link 
                    to="/roster" 
                    onClick={() => setSelectedMentee(null)}
                    style={{
                      background: 'rgba(124, 58, 237, 0.08)',
                      color: '#7c3aed',
                      border: 'none',
                      padding: '10px 18px',
                      borderRadius: '6px',
                      fontWeight: 'bold',
                      fontSize: '13.5px',
                      textDecoration: 'none',
                      display: 'inline-flex',
                      alignItems: 'center'
                    }}
                  >
                    View in Full Roster Table
                  </Link>
                  <button 
                    onClick={() => setSelectedMentee(null)}
                    style={{
                      background: '#0f172a',
                      color: '#fff',
                      border: 'none',
                      padding: '10px 18px',
                      borderRadius: '6px',
                      fontWeight: 'bold',
                      fontSize: '13.5px',
                      cursor: 'pointer'
                    }}
                  >
                    Close Profile
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Footer Navigation */}
          <div style={{ marginTop: '40px' }} className="no-print">
            <Link to="/" className="back-link">← Back to Curriculum</Link>
          </div>

        </div>
      </div>
    </div>
  );
}
