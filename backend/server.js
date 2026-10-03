// CareerPrep Express Backend API Server

import express from 'express';
import cors from 'cors';

import mockTestsRouter from './routes/mockTests.js';
import atsResumeRouter from './routes/atsResume.js';
import skillGapRouter from './routes/skillGap.js';
import interviewRouter from './routes/interview.js';
import jobsRouter from './routes/jobs.js';
import flashcardsRouter from './routes/flashcards.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Health Check Route
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    service: 'CareerPrep API Server',
    timestamp: new Date().toISOString()
  });
});

// Register API Routes
app.use('/api/mock-tests', mockTestsRouter);
app.use('/api/ats', atsResumeRouter);
app.use('/api/skills', skillGapRouter);
app.use('/api/interview', interviewRouter);
app.use('/api/jobs', jobsRouter);
app.use('/api/flashcards', flashcardsRouter);

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 CareerPrep Backend Server listening on http://localhost:${PORT}`);
});
