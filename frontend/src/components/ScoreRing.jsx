export default function ScoreRing({ score, label, color }) {
  const radius = 40
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (score / 100) * circumference

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "8px"
    }}>
      <svg
        width="110"
        height="110"
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* background track */}
        <circle
          cx="50" cy="50" r={radius}
          fill="none"
          stroke="#e5e7eb"
          strokeWidth="8"
        />
        {/* colored progress arc */}
        <circle
          cx="50" cy="50" r={radius}
          fill="none"
          stroke={color}
          strokeWidth="8"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform="rotate(-90 50 50)"
          style={{ transition: "stroke-dashoffset 1.2s ease" }}
        />
        {/* score number */}
        <text
          x="50" y="46"
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="20"
          fontWeight="700"
          fill={color}
        >
          {score}
        </text>
        {/* /100 below score */}
        <text
          x="50" y="62"
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="10"
          fill="#94a3b8"
        >
          / 100
        </text>
      </svg>
      <p style={{
        fontSize: "13px",
        fontWeight: "600",
        color: "#64748b",
        margin: 0
      }}>{label}</p>
    </div>
  )
}