# 🎯 AI Resume Analyzer

An AI-powered web app that analyzes your resume against a job description and gives you an ATS score, skill gap analysis, and personalized suggestions.

**🔗 Live Demo: [Click Here](https://ai-resume-analyzer-drab-three.vercel.app/)**

---

## ✨ Features

- 📄 Upload PDF resume — AI extracts and reads it
- 🎯 ATS Score (0-100) — how recruiter-friendly your resume is
- 💼 Job Match % — how well your skills match the job
- ✅ Matched Skills — what you already have
- ❌ Missing Skills — what you need to learn
- 💪 Strengths — what stands out in your resume
- 🔧 Suggestions — specific, actionable improvements

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React.js (Vite) |
| Backend | Python, FastAPI |
| AI | Groq API — LLaMA 3.3 70B |
| PDF Parsing | pdfplumber |
| Deployment | Vercel + Render |

---

## 🚀 Run Locally

### Backend
```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
# .env file mein daalo:
# GROQ_API_KEY=your_key_here
uvicorn main:app --reload
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

Open `http://localhost:5173`

---

## 👤 Author

**Vivek Yadav** — BCA 3rd Year  
Invertis University  , Bareilly 
[GitHub](https://github.com/mevvek)