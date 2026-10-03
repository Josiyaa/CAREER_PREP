# 🎓 CareerPrep — Placement Training & Career Development Platform

> **An integrated, end-to-end web platform providing students with a structured environment for placement preparation, ATS resume optimization, skill-gap analysis, AI interview practice, and job application tracking.**

---

## 📌 Executive Summary / Abstract

Students often struggle when navigating separate applications for aptitude practice, resume formatting, interview preparation, and job searching. **CareerPrep** addresses this fragmentation by unifying all critical placement preparation tools into a single, high-performance web platform.

---

## 🔥 Key Features

### 1. 📊 Placement Readiness Dashboard
- **Readiness Index Gauge**: Dynamic percentage metric benchmarking preparation across Aptitude, DSA/Coding, Core CS, and Interview Performance.
- **Target Company Roadmaps**: Customized preparation tracks for top recruiters (TCS, Infosys, Amazon, Deloitte, Zoho).
- **Placement Drive Alerts**: Real-time alerts for active off-campus and on-campus hiring drives.

### 2. 📝 Interactive Mock Tests & Solutions
- **Comprehensive Topics**: Quantitative Aptitude, Logical Reasoning, Verbal Ability, Technical Coding, and Core CS.
- **Timed Assessment Simulator**: Real-time countdown timer with section navigation.
- **Instant Solution Breakdown**: Step-by-step mathematical explanations, formulas, and weak spot detection.

### 3. 📄 ATS Resume Auditor & Live Builder
- **ATS Compliance Audit**: Calculates real-time ATS match score (0-100%) checking keyword density, single-column parsing, and action verb impact.
- **Interactive Builder**: Live auto-save form editor.
- **Print PDF Exporter**: Single-click clean printable resume formatting.

### 4. 🎯 Skill-Gap Analysis Module
- **Role Competency Matrix**: Compares current student skills against target role requirements (Full-Stack Engineer, Data Analyst, Cloud/DevOps Engineer, Systems Engineer).
- **Personalized Learning Plan**: Identifies missing competencies and recommends targeted courses and drills.

### 5. 🎙️ AI-Assisted Mock Interview Preparation
- **Technical & HR Questions Bank**: Commonly asked interview questions categorized by topic.
- **STAR Response Evaluator**: Analyzes answers for Situation, Task, Action, and Result (STAR) compliance, technical terms, and word count.

### 6. 💼 Job Vacancy & Application Tracker
- **Company Job Board**: Filter vacancies by role, skills, experience, and salary packages.
- **Pipeline Tracker**: Track application states (`Applied`, `Shortlisted`, `Interview Scheduled`, `Selected`, `Rejected`).

### 7. ⚡ CS Core Revision Flashcards
- **3D Flip Cards**: Memory recall drills for Operating Systems, DBMS, Computer Networks, and OOPs.

---

## 🛠️ Technology Stack

- **Frontend**: Vite, JavaScript (ES6+), Vanilla CSS (Glassmorphic Design System), Canvas-Confetti, Lucide Icons.
- **Backend (Python)**: Python 3.14, Flask, Flask-CORS (`http://127.0.0.1:5000`).
- **Backend (Node.js)**: Node.js, Express, CORS (`http://localhost:5000`).
- **Persistence**: Browser LocalStorage & Express/Flask REST APIs.

---

## 📁 Project Structure

```
Placement Training/
├── index.html                  # Main HTML Entrypoint
├── package.json                # Frontend dependencies & Vite scripts
├── vite.config.js              # Vite bundler configuration
├── src/
│   ├── main.js                 # App routing & component orchestrator
│   ├── style.css               # Modern Light/Dark design system
│   ├── components/
│   │   ├── Navbar.js           # Navigation bar & theme switcher
│   │   ├── Dashboard.js        # Readiness gauge & analytics
│   │   ├── MockTests.js        # Timed test runner & solution breakdown
│   │   ├── ATSResume.js        # ATS resume auditor & builder
│   │   ├── SkillGap.js         # Skill-gap matrix & course recommendations
│   │   ├── AIInterview.js      # Interview simulator & STAR evaluator
│   │   ├── JobPortal.js        # Job vacancy board & pipeline tracker
│   │   └── CSFlashcards.js     # CS Core 3D flip flashcards
│   ├── data/                   # Mock test questions, jobs, and skills matrix
│   └── utils/                  # LocalStorage state manager
└── backend/
    ├── app.py                  # Python Flask REST API server
    ├── server.js               # Node.js Express REST API server
    ├── package.json            # Backend Node dependencies
    └── routes/                 # Express API routes
```

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18+ recommended)
- [Python](https://www.python.org/) (v3.10+ recommended)

### 1. Run Frontend Application
```bash
# Install dependencies
npm install

# Start Vite local development server
npm run dev
```
Open **`http://127.0.0.1:3000/`** in your browser.

### 2. Run Python Backend Server
```bash
cd backend
python app.py
```
Backend API will listen on **`http://127.0.0.1:5000`**.

---

## 📜 License

Distributed under the MIT License. See `LICENSE` for more details.
