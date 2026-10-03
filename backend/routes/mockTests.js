// Mock Tests API Route

import express from 'express';

const router = express.Router();

export const mockTestsData = [
  {
    id: "aptitude-101",
    title: "Quantitative Aptitude Speed Challenge",
    category: "Quantitative Aptitude",
    difficulty: "Medium",
    durationMinutes: 15,
    totalQuestions: 5,
    questions: [
      {
        id: "q1",
        question: "A train running at the speed of 60 km/hr crosses a pole in 9 seconds. What is the length of the train?",
        options: ["120 metres", "150 metres", "180 metres", "324 metres"],
        correctIndex: 1,
        formula: "Distance = Speed × Time (Convert km/hr to m/s by multiplying with 5/18)",
        explanation: "Speed in m/s = 60 × (5/18) = 50/3 m/s.\nTime taken = 9 seconds.\nLength of train = Distance = (50/3) × 9 = 150 metres."
      },
      {
        id: "q2",
        question: "A, B and C can do a piece of work in 20, 30 and 60 days respectively. In how many days can A do the work if he is assisted by B and C on every third day?",
        options: ["12 days", "15 days", "16 days", "18 days"],
        correctIndex: 1,
        formula: "Work done in 3-day cycle = (3 × A's 1-day work) + B's 1-day work + C's 1-day work",
        explanation: "A's 1 day work = 1/20.\nWork done by A in 2 days = 2/20 = 1/10.\nWork done by A, B, C on 3rd day = (1/20 + 1/30 + 1/60) = 6/60 = 1/10.\nTotal work done in 3 days = 1/10 + 1/10 = 1/5.\nTotal cycles required = 5. Total days = 5 × 3 = 15 days."
      },
      {
        id: "q3",
        question: "The average age of a class of 30 students is 15 years. If the teacher's age is included, the average increases by 1 year. What is the teacher's age?",
        options: ["40 years", "46 years", "45 years", "50 years"],
        correctIndex: 1,
        formula: "New Value = New Average + (Original Count × Increase in Average)",
        explanation: "Original total age = 30 × 15 = 450.\nNew total age (31 people) = 31 × 16 = 496.\nTeacher's age = 496 - 450 = 46 years."
      },
      {
        id: "q4",
        question: "A trader marks his goods 20% above the cost price and allows a discount of 10% on the marked price. What is his profit percentage?",
        options: ["8%", "10%", "12%", "15%"],
        correctIndex: 0,
        formula: "Effective Percentage = A + B + (AB / 100) where A = +20, B = -10",
        explanation: "Let Cost Price (CP) = ₹100.\nMarked Price (MP) = ₹120.\nSelling Price (SP) = 120 - 10% of 120 = 120 - 12 = ₹108.\nProfit % = ((108 - 100) / 100) × 100 = 8%."
      },
      {
        id: "q5",
        question: "Two pipes A and B can fill a tank in 12 hours and 18 hours respectively. If both pipes are opened together, how long will it take to fill the tank completely?",
        options: ["6.2 hours", "7.2 hours", "8.0 hours", "9.5 hours"],
        correctIndex: 1,
        formula: "Time = (A × B) / (A + B)",
        explanation: "Combined 1-hour work = (1/12) + (1/18) = (3 + 2)/36 = 5/36.\nTotal time taken = 36/5 = 7.2 hours (7 hours 12 minutes)."
      }
    ]
  },
  {
    id: "logical-102",
    title: "Logical & Analytical Reasoning Mastery",
    category: "Logical Reasoning",
    difficulty: "Medium",
    durationMinutes: 15,
    totalQuestions: 5,
    questions: [
      {
        id: "l1",
        question: "In a certain code language, 'COMPUTER' is written as 'RFUVQNPC'. How is 'MEDICINE' written in that code?",
        options: ["EOJDEJFM", "MFEJDJOE", "EOJDJEFM", "EOJEJDFM"],
        correctIndex: 2,
        formula: "Reverse the letters and add +1 to intermediate characters",
        explanation: "1. Reverse the string: COMPUTER -> RETUPMOC.\n2. Keep first & last character exchange: C <-> R.\n3. Add +1 to each middle letter: E->F, T->U, U->V, P->Q, M->N, O->P.\nApplying same logic to MEDICINE:\nReverse: ENICIDEM -> First/Last stay position: E....M.\nShift middle letters (+1): N->O, I->J, C->D, I->J, D->E, E->F => EOJDJEFM."
      }
    ]
  }
];

// GET /api/mock-tests
router.get('/', (req, res) => {
  res.json({ success: true, count: mockTestsData.length, data: mockTestsData });
});

// GET /api/mock-tests/:id
router.get('/:id', (req, res) => {
  const test = mockTestsData.find(t => t.id === req.params.id);
  if (!test) return res.status(404).json({ success: false, error: 'Test not found' });
  res.json({ success: true, data: test });
});

// POST /api/mock-tests/submit
router.post('/submit', (req, res) => {
  const { testId, userAnswers } = req.body;
  const test = mockTestsData.find(t => t.id === testId);
  if (!test) return res.status(404).json({ success: false, error: 'Test not found' });

  let correctCount = 0;
  const weakTopics = [];

  test.questions.forEach(q => {
    if (userAnswers[q.id] === q.correctIndex) {
      correctCount++;
    } else {
      weakTopics.push(test.category + ": " + q.question.substring(0, 30) + "...");
    }
  });

  const scorePercent = Math.round((correctCount / test.questions.length) * 100);

  res.json({
    success: true,
    score: scorePercent,
    correctCount,
    totalQuestions: test.questions.length,
    weakTopics,
    passed: scorePercent >= 70
  });
});

export default router;
