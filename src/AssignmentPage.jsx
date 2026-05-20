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
          </div>

          {data.phases.map((phase, pi) => (
            <section key={pi} className="assignment-phase">
              <h2 className="phase-title">{phase.name}</h2>
              {phase.intro && <p className="phase-intro">{phase.intro}</p>}

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

              {phase.simulations && (
                <div className="sim-grid">
                  {phase.simulations.map((sim, i) => (
                    <div key={i} className="sim-card">
                      <span className="sim-num">{i + 1}</span>
                      <h3 className="sim-name">{sim.name}</h3>
                      <p className="sim-desc">{sim.desc}</p>
                    </div>
                  ))}
                </div>
              )}

              {phase.layout && (
                <>
                  <p className="phase-sub">Layout requirements:</p>
                  <ul className="phase-list">
                    {phase.layout.map((l, i) => <li key={i}>{l}</li>)}
                  </ul>
                </>
              )}

              {phase.requiredTechniques && (
                <>
                  <p className="phase-sub">Required techniques (at least one of each):</p>
                  <ul className="phase-list phase-list--check">
                    {phase.requiredTechniques.map((t, i) => <li key={i}>{t}</li>)}
                  </ul>
                </>
              )}
            </section>
          ))}

          <section className="assignment-phase">
            <h2 className="phase-title">To Submit</h2>
            <p className="phase-intro">Submit three files:</p>
            <ol className="phase-steps">
              {data.submission.map((s, i) => <li key={i}>{s}</li>)}
            </ol>
          </section>

          <section className="assignment-phase assignment-grading">
            <h2 className="phase-title">Grading Criteria</h2>
            <table className="grading-table">
              <thead>
                <tr>
                  <th>Criterion</th>
                  <th>Points</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {data.grading.map((g, i) => (
                  <tr key={i}>
                    <td className="grading-criterion">{g.criterion}</td>
                    <td className="grading-points">{g.points}</td>
                    <td className="grading-desc">{g.desc}</td>
                  </tr>
                ))}
                <tr className="grading-total">
                  <td>Total</td>
                  <td>{data.totalPoints}</td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </section>

          <div className="assignment-footer">
            <Link to="/" className="back-link">← Back to Curriculum</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
