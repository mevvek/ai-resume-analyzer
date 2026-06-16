from fastapi import FastAPI, File, UploadFile, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from parser import extract_text_from_pdf, clean_text
from analyzer import analyze_resume
from models import AnalysisResult
import json

app = FastAPI(
    title="AI Resume Analyzer",
    description="Upload a resume PDF and get ATS score, skill gaps, and suggestions",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {
        "status": "running",
        "message": "AI Resume Analyzer API",
        "docs": "/docs"
    }

@app.post("/analyze", response_model=AnalysisResult)
async def analyze(
    resume: UploadFile = File(..., description="Resume in PDF format"),
    job_description: str = Form(..., description="Paste the full job description")
):
    if not resume.filename.endswith(".pdf"):
        raise HTTPException(
            status_code=400,
            detail="Only PDF files are accepted. Please upload a .pdf file."
        )

    file_bytes = await resume.read()

    if len(file_bytes) == 0:
        raise HTTPException(
            status_code=400,
            detail="The uploaded file is empty."
        )

    if len(file_bytes) > 5 * 1024 * 1024:
        raise HTTPException(
            status_code=400,
            detail="File too large. Maximum size is 5MB."
        )

    resume_text = clean_text(extract_text_from_pdf(file_bytes))

    if not resume_text or len(resume_text) < 50:
        raise HTTPException(
            status_code=422,
            detail="Could not extract text from this PDF. Make sure it is not a scanned image."
        )

    if len(job_description.strip()) < 30:
        raise HTTPException(
            status_code=400,
            detail="Job description is too short. Please paste the full job description."
        )

    try:
        result = analyze_resume(resume_text, job_description)
        return result
    except json.JSONDecodeError:
        raise HTTPException(
            status_code=500,
            detail="AI returned an unexpected response. Please try again."
        )
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Analysis failed: {str(e)}"
        )