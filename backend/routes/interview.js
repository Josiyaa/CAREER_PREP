// AI Interview API Route

import express from 'express';

const router = express.Router();

const interviewQuestions = [
  {
    id: "hr-1",
    category: "HR & Behavioral",
    role: "All Roles",
    question: "Tell me about yourself and why you are interested in this position.",
    tips: "Focus on present role/education, past achievements, and future alignment with company values."
  },
  {
    id: "tech-1",
    category: "Technical Core",
    role: "Software Engineer",
    question: "Explain the difference between Process and Thread. How does Context Switching differ between them?",
    tips: "Highlight memory space sharing, creation overhead, and CPU registers."
  }
];

// GET /api/interview/questions
router.get('/questions', (req, res) => {
  res.json({ success: true, data: interviewQuestions });
});

// POST /api/interview/evaluate
router.post('/evaluate', (req, res) => {
  const { questionId, answerText } = req.body;

  if (!answerText || answerText.trim().length < 10) {
    return res.json({
      success: true,
      score: 25,
      rating: "Needs Improvement",
      feedback: "Answer is too brief. Please elaborate using the STAR framework."
    });
  }

  const wordCount = answerText.trim().split(/\s+/).length;
  let score = 50 + (wordCount > 30 ? 30 : 15);
  score = Math.min(score, 95);

  res.json({
    success: true,
    score,
    rating: score >= 80 ? "Excellent" : "Good",
    wordCount,
    starCompliance: {
      situation: answerText.toLowerCase().includes("when") || answerText.toLowerCase().includes("project"),
      task: answerText.toLowerCase().includes("task") || answerText.toLowerCase().includes("needed"),
      action: answerText.toLowerCase().includes("built") || answerText.toLowerCase().includes("implemented"),
      result: answerText.toLowerCase().includes("result") || answerText.toLowerCase().includes("improved")
    }
  });
});

export default router;
