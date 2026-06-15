import os
import json
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()
print("API KEY:", os.getenv("GEMINI_API_KEY"))
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
model = genai.GenerativeModel("gemini-2.5-flash")

PROMPT_TEMPLATE = """
You are an expert ATS (Applicant Tracking System) and senior career coach.
Analyze the resume and job description below carefully.

Return ONLY a valid JSON object. No extra text, no explanation,
no markdown backticks. Just raw JSON.

RESUME:
{resume_text}

JOB DESCRIPTION:
{job_description}

Return this exact JSON structure:
{{
  "ats_score": ,
  "match_percentage": ,
  "matched_skills": [],
  "missing_skills": [],
  "strengths": [],
  "suggestions": [],
  "experience_gap": "",
  "verdict": ""
}}

Rules you must follow:
- Skills must be specific e.g. "React.js", "PostgreSQL", "Docker" not "programming"
- Suggestions must start with a verb e.g. "Add a projects section...", "Include metrics..."
- ats_score: consider keyword density, section headers, formatting signals
- match_percentage: consider skills overlap and experience alignment only
- Do not invent skills not mentioned in either document
"""

def analyze_resume(resume_text: str, job_description: str) -> dict:
    prompt = PROMPT_TEMPLATE.format(
        resume_text=resume_text[:3000],
        job_description=job_description[:1500]
    )

    response = model.generate_content(prompt)
    raw = response.text.strip()

    raw = raw.replace("```json", "").replace("```", "").strip()

    return json.loads(raw)