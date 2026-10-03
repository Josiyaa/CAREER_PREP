# CareerPrep Python Flask Backend API Server

import os
import sys
from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Mock Tests Database
MOCK_TESTS = [
    {
        "id": "aptitude-101",
        "title": "Quantitative Aptitude Speed Challenge",
        "category": "Quantitative Aptitude",
        "difficulty": "Medium",
        "durationMinutes": 15,
        "totalQuestions": 5,
        "questions": [
            {
                "id": "q1",
                "question": "A train running at the speed of 60 km/hr crosses a pole in 9 seconds. What is the length of the train?",
                "options": ["120 metres", "150 metres", "180 metres", "324 metres"],
                "correctIndex": 1,
                "formula": "Distance = Speed × Time (Convert km/hr to m/s by multiplying with 5/18)",
                "explanation": "Speed in m/s = 60 × (5/18) = 50/3 m/s.\nTime taken = 9 seconds.\nLength of train = Distance = (50/3) × 9 = 150 metres."
            },
            {
                "id": "q2",
                "question": "A, B and C can do a piece of work in 20, 30 and 60 days respectively. In how many days can A do the work if he is assisted by B and C on every third day?",
                "options": ["12 days", "15 days", "16 days", "18 days"],
                "correctIndex": 1,
                "formula": "Work done in 3-day cycle = (3 × A's 1-day work) + B's 1-day work + C's 1-day work",
                "explanation": "A's 1 day work = 1/20.\nWork done by A in 2 days = 2/20 = 1/10.\nWork done by A, B, C on 3rd day = (1/20 + 1/30 + 1/60) = 6/60 = 1/10.\nTotal work done in 3 days = 1/10 + 1/10 = 1/5.\nTotal cycles required = 5. Total days = 5 × 3 = 15 days."
            }
        ]
    }
]

# Jobs Database
JOBS_LIST = [
    {
        "id": "job-tcs-nqt-2026",
        "company": "TCS (Tata Consultancy Services)",
        "role": "System Engineer / Digital Engineer",
        "location": "Pan India",
        "salary": "₹3.36 LPA - ₹7.0 LPA",
        "status": "Shortlisted",
        "matchScore": 88
    },
    {
        "id": "job-amazon-sde1",
        "company": "Amazon Development Center",
        "role": "Software Development Engineer - I (SDE-1)",
        "location": "Bangalore / Hyderabad",
        "salary": "₹18 - ₹24 LPA",
        "status": "Interview",
        "matchScore": 94
    }
]

@app.route('/', methods=['GET'])
def index():
    return jsonify({
        "success": True,
        "message": "Welcome to CareerPrep Python Flask Backend API Server",
        "endpoints": [
            "/api/health",
            "/api/mock-tests",
            "/api/ats/audit",
            "/api/skills/roles",
            "/api/interview/questions",
            "/api/jobs",
            "/api/flashcards"
        ]
    })

@app.route('/api/health', methods=['GET'])
def health():
    return jsonify({
        "status": "online",
        "service": "CareerPrep Python Flask Backend API Server",
        "version": "1.0.0"
    })

# --- MOCK TESTS ROUTES ---
@app.route('/api/mock-tests', methods=['GET'])
def get_mock_tests():
    return jsonify({"success": True, "count": len(MOCK_TESTS), "data": MOCK_TESTS})

@app.route('/api/mock-tests/<test_id>', methods=['GET'])
def get_mock_test_by_id(test_id):
    test = next((t for t in MOCK_TESTS if t["id"] == test_id), None)
    if not test:
        return jsonify({"success": False, "error": "Test not found"}), 404
    return jsonify({"success": True, "data": test})

@app.route('/api/mock-tests/submit', methods=['POST'])
def submit_mock_test():
    data = request.get_json() or {}
    test_id = data.get("testId")
    user_answers = data.get("userAnswers", {})

    test = next((t for t in MOCK_TESTS if t["id"] == test_id), None)
    if not test:
        return jsonify({"success": False, "error": "Test not found"}), 404

    correct_count = 0
    weak_topics = []
    for q in test["questions"]:
        if user_answers.get(q["id"]) == q["correctIndex"]:
            correct_count += 1
        else:
            weak_topics.append(f"{test['category']}: {q['question'][:30]}...")

    score_percent = int((correct_count / len(test["questions"])) * 100) if test["questions"] else 0

    return jsonify({
        "success": True,
        "score": score_percent,
        "correctCount": correct_count,
        "totalQuestions": len(test["questions"]),
        "weakTopics": weak_topics,
        "passed": score_percent >= 70
    })

# --- ATS RESUME AUDIT ROUTE ---
@app.route('/api/ats/audit', methods=['POST'])
def audit_ats_resume():
    data = request.get_json() or {}
    resume_text = data.get("resumeText", "")
    skills = data.get("skills", "")

    score = 75
    lower_skills = skills.lower()
    lower_text = resume_text.lower()

    keywords = ['react', 'javascript', 'sql', 'database', 'git', 'python', 'built', 'optimized', 'engineered']
    found = [k for k in keywords if k in lower_skills or k in lower_text]

    score += len(found) * 25
    score = min(score, 98)

    return jsonify({
        "success": True,
        "atsScore": score,
        "keywordsFound": found,
        "actionVerbsCount": 14,
        "suggestions": [
            "Quantify achievements with percentages and time saved metrics.",
            "Incorporate key target domain technologies into technical skills section."
        ]
    })

# --- SKILL GAP ANALYSIS ROUTE ---
@app.route('/api/skills/roles', methods=['GET'])
def get_skill_roles():
    roles = [
        {
            "id": "role-fullstack",
            "title": "Full-Stack Software Engineer",
            "category": "Software Development",
            "avgPackage": "8 - 14 LPA",
            "targetCompanies": ["Amazon", "TCS Digital", "Zoho", "Flipkart", "Accenture"],
            "requiredSkills": [
                {"name": "JavaScript / ES6+", "weight": 20},
                {"name": "React.js / Next.js", "weight": 20},
                {"name": "Node.js & Express", "weight": 15},
                {"name": "SQL & PostgreSQL / MongoDB", "weight": 15},
                {"name": "Data Structures & Algorithms (DSA)", "weight": 20}
            ]
        }
    ]
    return jsonify({"success": True, "data": roles})

# --- AI INTERVIEW ROUTE ---
@app.route('/api/interview/evaluate', methods=['POST'])
def evaluate_interview():
    data = request.get_json() or {}
    answer = data.get("answerText", "").strip()

    if len(answer) < 15:
        return jsonify({
            "success": True,
            "score": 30,
            "rating": "Needs Improvement",
            "feedback": "Answer is too brief. Expand using the STAR framework."
        })

    words = len(answer.split())
    score = min(50 + (words * 1.2), 95)

    return jsonify({
        "success": True,
        "score": int(score),
        "rating": "Excellent" if score >= 80 else "Good",
        "wordCount": words,
        "starCompliance": {
            "situation": "when" in answer.lower() or "project" in answer.lower(),
            "task": "needed" in answer.lower() or "task" in answer.lower(),
            "action": "built" in answer.lower() or "implemented" in answer.lower(),
            "result": "result" in answer.lower() or "improved" in answer.lower()
        }
    })

# --- JOBS ROUTE ---
@app.route('/api/jobs', methods=['GET'])
def get_jobs():
    return jsonify({"success": True, "count": len(JOBS_LIST), "data": JOBS_LIST})

@app.route('/api/jobs/<job_id>/status', methods=['PUT'])
def update_job_status(job_id):
    data = request.get_json() or {}
    new_status = data.get("status", "Applied")

    job = next((j for j in JOBS_LIST if j["id"] == job_id), None)
    if not job:
        return jsonify({"success": False, "error": "Job not found"}), 404

    job["status"] = new_status
    return jsonify({"success": True, "data": job})

# --- FLASHCARDS ROUTE ---
@app.route('/api/flashcards', methods=['GET'])
def get_flashcards():
    flashcards = [
        {
            "id": "os-f1",
            "subject": "Operating Systems",
            "topic": "Process Synchronization",
            "question": "What is a Semaphore, and what is the difference between Counting Semaphore and Binary Semaphore?",
            "answer": "A Semaphore is an integer variable accessed only through wait() and signal() atomic operations."
        }
    ]
    return jsonify({"success": True, "data": flashcards})

if __name__ == '__main__':
    print("CareerPrep Python Flask Backend Server listening on http://127.0.0.1:5000")
    app.run(host='127.0.0.1', port=5000, debug=True)
