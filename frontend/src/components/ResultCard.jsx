import ScoreRing from "./ScoreRing"

export default function ResultCard({ result, onReset }) {
  const {
    ats_score, match_percentage,
    matched_skills, missing_skills,
    strengths, suggestions,
    experience_gap, verdict
  } = result

  const scoreColor = (s) => s >= 70 ? "#16a34a" : s >= 45 ? "#d97706" : "#dc2626"

  return (
    <div className="result-container">

      <div className="verdict-banner">
        <span>🎯</span>
        <p>{verdict}</p>
      </div>

      <div className="scores-row">
        <ScoreRing score={ats_score} label="ATS Score" color={scoreColor(ats_score)} />
        <ScoreRing score={match_percentage} label="Job Match" color={scoreColor(match_percentage)} />
      </div>

      <div className="info-box">
        <span>📊</span>
        <p>{experience_gap}</p>
      </div>

      <div className="skills-grid">
        <div className="skill-section">
          <h3 className="section-title">✅ Matched Skills</h3>
          <div className="tag-wrap">
            {matched_skills.map(s => (
              <span key={s} className="tag tag-green">{s}</span>
            ))}
          </div>
        </div>
        <div className="skill-section">
          <h3 className="section-title">❌ Missing Skills</h3>
          <div className="tag-wrap">
            {missing_skills.map(s => (
              <span key={s} className="tag tag-red">{s}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="list-section">
        <h3 className="section-title">💪 Strengths</h3>
        <ul className="styled-list">
          {strengths.map((s, i) => <li key={i}>{s}</li>)}
        </ul>
      </div>

      <div className="list-section">
        <h3 className="section-title">🔧 Suggestions to Improve</h3>
        <ul className="styled-list suggestions">
          {suggestions.map((s, i) => <li key={i}>{s}</li>)}
        </ul>
      </div>

      <button className="reset-btn" onClick={onReset}>
        ← Analyze Another Resume
      </button>
    </div>
  )
}