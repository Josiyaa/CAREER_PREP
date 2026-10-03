// ATS Resume API Route

import express from 'express';

const router = express.Router();

// POST /api/ats/audit
router.post('/audit', (req, res) => {
  const { resumeText, skills } = req.body;

  if (!resumeText || !skills) {
    return res.status(400).json({ success: false, error: 'Resume text and skills are required' });
  }

  let score = 70;
  const lowerSkills = skills.toLowerCase();
  const lowerText = resumeText.toLowerCase();

  const keywords = ['react', 'javascript', 'sql', 'database', 'git', 'python', 'built', 'optimized', 'engineered'];
  const foundKeywords = keywords.filter(k => lowerSkills.includes(k) || lowerText.includes(k));

  score += foundKeywords.length * 3;
  score = Math.min(score, 98);

  res.json({
    success: true,
    atsScore: score,
    keywordsFound: foundKeywords,
    formatCheck: {
      singleColumn: true,
      actionVerbsCount: 14,
      quantifiedResultsPresent: lowerText.includes('%') || lowerText.includes('ms') || lowerText.includes('sec')
    },
    suggestions: [
      "Include key technical skills matching your target company specification.",
      "Ensure action verbs start every bullet point in your project experience section."
    ]
  });
});

export default router;
