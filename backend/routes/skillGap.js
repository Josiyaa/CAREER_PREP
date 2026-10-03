// Skill-Gap Analysis API Route

import express from 'express';

const router = express.Router();

const rolesData = [
  {
    id: "role-fullstack",
    title: "Full-Stack Software Engineer",
    category: "Software Development",
    avgPackage: "8 - 14 LPA",
    targetCompanies: ["Amazon", "TCS Digital", "Zoho", "Flipkart", "Accenture"],
    requiredSkills: [
      { name: "JavaScript / ES6+", category: "Frontend", level: "Advanced", weight: 20 },
      { name: "React.js / Next.js", category: "Frontend", level: "Advanced", weight: 20 },
      { name: "Node.js & Express", category: "Backend", level: "Intermediate", weight: 15 },
      { name: "SQL & PostgreSQL / MongoDB", category: "Database", level: "Intermediate", weight: 15 },
      { name: "Data Structures & Algorithms (DSA)", category: "Problem Solving", level: "Advanced", weight: 20 },
      { name: "Git & Version Control", category: "Tools", level: "Intermediate", weight: 10 }
    ]
  },
  {
    id: "role-data-analyst",
    title: "Data Analyst & Business Intelligence",
    category: "Data Science",
    avgPackage: "6 - 11 LPA",
    targetCompanies: ["Deloitte", "Mu Sigma", "Infosys", "Wipro", "Fractal Analytics"],
    requiredSkills: [
      { name: "SQL & Relational Queries", category: "Database", level: "Advanced", weight: 25 },
      { name: "Python (Pandas, NumPy)", category: "Analytics", level: "Advanced", weight: 25 },
      { name: "PowerBI / Tableau", category: "Visualization", level: "Intermediate", weight: 20 }
    ]
  }
];

// GET /api/skills/roles
router.get('/roles', (req, res) => {
  res.json({ success: true, data: rolesData });
});

// POST /api/skills/gap-analysis
router.post('/gap-analysis', (req, res) => {
  const { roleId, userSkills } = req.body;
  const role = rolesData.find(r => r.id === roleId) || rolesData[0];

  const userSkillsSet = new Set((userSkills || []).map(s => s.toLowerCase()));

  let totalWeight = 0;
  let matchedWeight = 0;
  const missingSkills = [];
  const acquiredSkills = [];

  role.requiredSkills.forEach(skill => {
    totalWeight += skill.weight;
    const isMatched = Array.from(userSkillsSet).some(us => us.includes(skill.name.toLowerCase()) || skill.name.toLowerCase().includes(us));

    if (isMatched) {
      matchedWeight += skill.weight;
      acquiredSkills.push(skill);
    } else {
      missingSkills.push(skill);
    }
  });

  const matchPercentage = Math.round((matchedWeight / totalWeight) * 100);

  res.json({
    success: true,
    roleTitle: role.title,
    matchPercentage,
    acquiredSkills,
    missingSkills
  });
});

export default router;
