export default function UploadForm({
  file, setFile,
  jobDescription, setJobDescription,
  onAnalyze, loading, error
}) {
  const handleFileChange = (e) => {
    const selected = e.target.files[0]
    if (selected && selected.type === "application/pdf") {
      setFile(selected)
    } else {
      alert("Please select a PDF file only.")
    }
  }

  return (
    <div className="form-card">
      <div className="form-section">
        <label className="form-label">Resume (PDF)</label>
        <label className="file-drop">
          <input
            type="file"
            accept=".pdf"
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
          {file ? (
            <div className="file-selected">
              <span className="file-icon">📄</span>
              <span>{file.name}</span>
              <button
                className="remove-btn"
                onClick={(e) => { e.preventDefault(); setFile(null) }}
              >✕</button>
            </div>
          ) : (
            <div className="file-placeholder">
              <span className="upload-icon">☁️</span>
              <span>Click to upload your resume</span>
              <span className="file-hint">PDF only · Max 5MB</span>
            </div>
          )}
        </label>
      </div>

      <div className="form-section">
        <label className="form-label">Job Description</label>
        <textarea
          className="jd-textarea"
          rows={7}
          placeholder="Paste the full job description here..."
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
        />
        <span className="char-count">{jobDescription.length} characters</span>
      </div>

      {error && <div className="error-box">⚠️ {error}</div>}

      <button
        className={`analyze-btn ${loading ? "loading" : ""}`}
        onClick={onAnalyze}
        disabled={loading || !file || !jobDescription.trim()}
      >
        {loading ? (
          <><span className="spinner"></span> Analyzing your resume...</>
        ) : (
          "Analyze Resume"
        )}
      </button>

      {loading && (
        <p className="loading-note">
          This takes 5–10 seconds. AI is reading your resume carefully.
        </p>
      )}
    </div>
  )
}