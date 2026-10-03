// Jobs API Route

import express from 'express';

const router = express.Router();

let jobsList = [
  {
    id: "job-tcs-nqt-2026",
    company: "TCS (Tata Consultancy Services)",
    role: "System Engineer / Digital Engineer",
    location: "Pan India",
    salary: "₹3.36 LPA - ₹7.0 LPA",
    status: "Shortlisted"
  },
  {
    id: "job-amazon-sde1",
    company: "Amazon Development Center",
    role: "Software Development Engineer - I (SDE-1)",
    location: "Bangalore / Hyderabad",
    salary: "₹18 - ₹24 LPA",
    status: "Interview"
  }
];

// GET /api/jobs
router.get('/', (req, res) => {
  res.json({ success: true, count: jobsList.length, data: jobsList });
});

// PUT /api/jobs/:id/status
router.put('/:id/status', (req, res) => {
  const { status } = req.body;
  const job = jobsList.find(j => j.id === req.params.id);
  if (!job) return res.status(404).json({ success: false, error: 'Job not found' });

  job.status = status;
  res.json({ success: true, data: job });
});

export default router;
