// Flashcards API Route

import express from 'express';

const router = express.Router();

const flashcards = [
  {
    id: "os-f1",
    subject: "Operating Systems",
    topic: "Process Synchronization",
    question: "What is a Semaphore, and what is the difference between Counting Semaphore and Binary Semaphore?",
    answer: "A Semaphore is an integer variable accessed only through wait() and signal() atomic operations."
  },
  {
    id: "dbms-f1",
    subject: "DBMS",
    topic: "Indexing",
    question: "Why are B+ Trees preferred over B Trees for Database Indexing?",
    answer: "Leaf nodes store all data pointers and are linked sequentially for fast range queries."
  }
];

// GET /api/flashcards
router.get('/', (req, res) => {
  res.json({ success: true, count: flashcards.length, data: flashcards });
});

export default router;
