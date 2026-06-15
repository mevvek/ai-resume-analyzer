import os
import json
from groq import Groq
from dotenv import load_dotenv

load_dotenv()
client = Groq(api_key=os.getenv("GROQ_API_KEY"))

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
  "ats_score": <integer 0-100>,
  "match_percentage": <integer 0-100>,
  "matched_skills": ["skill1", "skill2"],
  "missing_skills": ["skill1", "skill2"],
  "strengths": ["strength1", "strength2", "strength3"],
  "suggestions": ["suggestion1", "suggestion2", "suggestion3", "suggestion4"],
  "experience_gap": "<one sentence>",
  "verdict": "<one sentence>"
}}

Rules:
- Skills must be specific e.g. "React.js", "PostgreSQL", "Docker"
- Suggestions must start with a verb
- Do not invent skills not mentioned in either document
"""

def analyze_resume(resume_text: str, job_description: str) -> dict:
    prompt = PROMPT_TEMPLATE.format(
        resume_text=resume_text[:3000],
        job_description=job_description[:1500]
    )
    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[{"role": "user", "content": prompt}],
        temperature=0.3
    )
    raw = response.choices[0].message.content.strip()
    raw = raw.replace("```json", "").replace("```", "").strip()
    return json.loads(raw)