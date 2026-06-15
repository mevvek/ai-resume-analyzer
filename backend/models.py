from pydantic import BaseModel
from typing import List

class AnalysisResult(BaseModel):
    ats_score: int
    match_percentage: int
    matched_skills: List[str]
    missing_skills: List[str]
    strengths: List[str]
    suggestions: List[str]
    experience_gap: str
    verdict: str