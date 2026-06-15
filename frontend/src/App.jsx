import { useState } from "react"
import axios from "axios"
import UploadForm from "./components/UploadForm"
import ResultCard from "./components/ResultCard"
import "./index.css"

const API_URL = "http://localhost:8000"

export default function App() {
  const [file, setFile] = useState(null)
  const [jobDescription, setJobDescription] = useState("")
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleAnalyze = async () => {
    if (!file || !jobDescription.trim()) {
      setError("Please upload a PDF resume and paste a job description.")
      return
    }
    setLoading(true)
    setError("")
    setResult(null)

    const formData = new FormData()
    formData.append("resume", file)
    formData.append("job_description", jobDescription)

    try {
      const res = await axios.post(`${API_URL}/analyze`, formData)
      setResult(res.data)
    } catch (err) {
      const msg = err.response?.data?.detail || "Something went wrong. Please try again."
      setError(msg)
    } finally {
      setLoading(false)
    }
  }

  const handleReset = () => {
    setFile(null)
    setJobDescription("")
    setResult(null)
    setError("")
  }

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>AI Resume Analyzer</h1>
        <p>Upload your resume and a job description to get your ATS score, skill gaps, and personalized suggestions.</p>
      </header>

      {result
        ? <ResultCard result={result} onReset={handleReset} />
        : <UploadForm
            file={file}
            setFile={setFile}
            jobDescription={jobDescription}
            setJobDescription={setJobDescription}
            onAnalyze={handleAnalyze}
            loading={loading}
            error={error}
          />
      }
    </div>
  )
}