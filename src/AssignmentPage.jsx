import { useParams, Link } from 'react-router-dom';
import { assignments } from './assignments.js';

export default function AssignmentPage() {
  const { week } = useParams();
  const data = assignments[Number(week)];

  if (!data) {
    return (
      <div className="app">
        <div className="container">
          <div className="assignment-page">
            <Link to="/" className="back-link">← Back to Curriculum</Link>
            <h1 className="assignment-title">Assignment Not Found</h1>
            <p className="assignment-subtitle">No detailed assignment page exists for Week {week} yet.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <div className="container">
        <div className="assignment-page">
          <Link to="/" className="back-link">← Back to Curriculum</Link>

          <div className="assignment-header">
            <p className="assignment-eyebrow">Week {String(week).padStart(2, '0')} · Assignment</p>
            <h1 className="assignment-title">{data.title}</h1>
            {data.subtitle && <p className="assignment-subtitle">{data.subtitle}</p>}
            {data.totalPoints && (
              <span className="assignment-points-badge">{data.totalPoints} points</span>
            )}
            {data.extraCredit && (
              <p className="assignment-extra-credit">⭐ {data.extraCredit}</p>
            )}
          </div>

          {/* Generic sections format (used by Week 1) */}
          {data.sections?.map((section, si) => (
            <section key={si} className="assignment-phase">
              <h2 className="phase-title">{section.heading}</h2>
              {section.body && <p className="phase-intro">{section.body}</p>}
              {section.subheading && <p className="phase-sub">{section.subheading}</p>}

              {section.bullets && (
                <ul className="phase-list phase-list--accent">
                  {section.bullets.map((b, i) => <li key={i}>{b}</li>)}
                </ul>
              )}

              {section.numberedSteps && (
                <ol className="phase-steps">
                  {section.numberedSteps.map((s, i) => <li key={i}>{s}</li>)}
                </ol>
              )}

              {section.note && <p className="phase-note">💡 {section.note}</p>}
            </section>
          ))}

          {/* Phases format (used by Week 2) */}
          {data.phases?.map((phase, pi) => (
            <section key={pi} className="assignment-phase">
              <h2 className="phase-title">
                {phase.name}
                {phase.points && <span className="phase-points-label"> ({phase.points} pts)</span>}
              </h2>
              {phase.intro && <p className="phase-intro">{phase.intro}</p>}

              {phase.bullets && (
                <ul className="phase-list phase-list--accent">
                  {phase.bullets.map((b, i) => <li key={i}>{b}</li>)}
                </ul>
              )}

              {phase.sets && (
                <ul className="phase-list phase-list--accent">
                  {phase.sets.map((s, i) => (
                    <li key={i}><strong>{s.name}</strong> — {s.desc}</li>
                  ))}
                </ul>
              )}

              {phase.steps && (
                <>
                  <p className="phase-sub">To make each brush:</p>
                  <ol className="phase-steps">
                    {phase.steps.map((step, i) => (
                      <li key={i}>{step}</li>
                    ))}
                  </ol>
                </>
              )}

              {phase.note && <p className="phase-note">💡 {phase.note}</p>}

              {phase.simulationsTable && (
                <table className="grading-table" style={{ margin: '20px 0' }}>
                  <thead>
                    <tr>
                      <th style={{ width: '40px' }}>#</th>
                      <th style={{ width: '150px' }}>Medium</th>
                      <th>Approach</th>
                    </tr>
                  </thead>
                  <tbody>
                    {phase.simulationsTable.map((sim, i) => (
                      <tr key={i}>
                        <td><strong>{sim.num}</strong></td>
                        <td className="grading-criterion">{sim.medium}</td>
                        <td className="grading-desc">{sim.approach}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}

              {phase.subsections?.map((sub, i) => (
                <div key={i} className="phase-subsection" style={{ marginTop: '20px' }}>
                  <p className="phase-sub">{sub.title}:</p>
                  <ul className="phase-list">
                    {sub.bullets.map((b, j) => <li key={j}>{b}</li>)}
                  </ul>
                </div>
              ))}
            </section>
          ))}

          {/* Tools & Shortcuts Cheat sheet */}
          {data.shortcuts && (
            <section className="assignment-phase">
              <h2 className="phase-title">Tools & Shortcuts</h2>
              <table className="grading-table">
                <thead>
                  <tr>
                    <th style={{ width: '180px' }}>Shortcut</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {data.shortcuts.map((s, i) => (
                    <tr key={i}>
                      <td className="grading-criterion"><code style={{ background: 'rgba(0,0,0,0.05)', padding: '2px 6px', borderRadius: '3px', fontFamily: 'var(--font-mono)' }}>{s.key}</code></td>
                      <td className="grading-desc">{s.action}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
          )}

          {/* Workflow Tips */}
          {data.tips && (
            <section className="assignment-phase">
              <h2 className="phase-title">Workflow Tips</h2>
              <ul className="phase-list phase-list--accent">
                {data.tips.map((tip, i) => <li key={i}>{tip}</li>)}
              </ul>
            </section>
          )}

          {/* Submission */}
          {data.submission && (
            <section className="assignment-phase">
              <h2 className="phase-title">Submission</h2>
              <ol className="phase-steps">
                {data.submission.map((s, i) => <li key={i}>{s}</li>)}
              </ol>
            </section>
          )}

          {/* Discussion */}
          {data.discussion && (
            <section className="assignment-phase">
              <h2 className="phase-title">Discussion / Critique</h2>
              <p className="phase-intro">{data.discussion}</p>
            </section>
          )}

          {/* Grading */}
          {data.grading && (
            <section className="assignment-phase assignment-grading">
              <h2 className="phase-title">Grading Criteria</h2>
              <table className="grading-table">
                <thead>
                  <tr>
                    <th>Criterion</th>
                    <th>Points</th>
                    {data.grading[0].desc && <th>Description</th>}
                  </tr>
                </thead>
                <tbody>
                  {data.grading.map((g, i) => (
                    <tr key={i}>
                      <td className="grading-criterion">{g.criterion}</td>
                      <td className="grading-points">{g.points}</td>
                      {g.desc && <td className="grading-desc">{g.desc}</td>}
                    </tr>
                  ))}
                  <tr className="grading-total">
                    <td>Total</td>
                    <td>{data.totalPoints}</td>
                    {data.grading[0].desc && <td></td>}
                  </tr>
                </tbody>
              </table>
            </section>
          )}

          <div className="assignment-footer">
            <Link to="/" className="back-link">← Back to Curriculum</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
