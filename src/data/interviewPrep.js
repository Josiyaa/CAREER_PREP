// AI-Assisted Interview Prep Database & Evaluation Logic

export const interviewQuestions = [
  {
    id: "hr-1",
    category: "HR & Behavioral",
    role: "All Roles",
    question: "Tell me about yourself and why you are interested in this position.",
    tips: "Focus on present role/education, past achievements, and future alignment with company values. Use Present-Past-Future format.",
    idealStructure: ["Brief educational background & specialization", "Key technical projects & internship highlights", "Why this company's mission aligns with your goals"],
    sampleAnswer: "I am a Final Year Computer Science student passionate about full-stack development and cloud systems. During my academic journey, I built an automated Placement & Career Development platform using React and Node.js. I also led a team of 4 in our capstone project. I am drawn to your company because of your engineering excellence and scale, and I am excited to apply my problem-solving skills to real-world software products."
  },
  {
    id: "hr-2",
    category: "HR & Behavioral",
    role: "All Roles",
    question: "Describe a situation where you faced a major challenge during a project. How did you resolve it?",
    tips: "Use the STAR Method: Situation, Task, Action, Result. Emphasize your initiative and quantifiable impact.",
    idealStructure: ["Situation: What was the context?", "Task: What was your specific responsibility?", "Action: What technical steps did you take?", "Result: What was the outcome (metrics)?"],
    sampleAnswer: "Situation: During our final semester project deadline, our database queries were taking over 4 seconds per request under load.\nTask: As the backend developer, I needed to optimize response times without delaying launch.\nAction: I analyzed slow queries, added proper B-Tree indexing in PostgreSQL, and implemented Redis caching for frequent endpoints.\nResult: Query response time dropped from 4s to 80ms, allowing us to successfully pitch the app on launch day."
  },
  {
    id: "tech-1",
    category: "Technical Core",
    role: "Software Engineer",
    question: "Explain the difference between Process and Thread. How does Context Switching differ between them?",
    tips: "Highlight memory space sharing, creation overhead, and CPU registers.",
    idealStructure: ["Define Process (isolated memory) vs Thread (lightweight, shared memory)", "Compare Context Switching overhead", "Mention IPC (Inter-Process Communication) vs Shared State"],
    sampleAnswer: "A Process is an independent program in execution with its own virtual address space, memory, and system resources. A Thread is a lightweight execution unit within a process that shares code, data, and resources with peer threads.\nContext switching between processes is slower because the CPU must switch page tables (TLB flush) and memory context. Thread context switching is much faster because threads share the same address space and memory mapping."
  },
  {
    id: "tech-2",
    category: "Technical Core",
    role: "Software Engineer / Web Dev",
    question: "What is the Virtual DOM in React, and how does the Reconciliation Algorithm work?",
    tips: "Mention diffing algorithm, Fiber architecture, batching, and DOM manipulation cost.",
    idealStructure: ["Definition of Virtual DOM (lightweight JS representation)", "Render phase vs Commit phase", "Diffing algorithm & Key prop importance"],
    sampleAnswer: "The Virtual DOM is a lightweight, in-memory representation of the real DOM elements. When state changes in React, a new Virtual DOM tree is created. React compares the new tree with the previous tree using its heuristic O(N) Diffing / Reconciliation Algorithm.\nIt identifies exact changes, batches DOM updates, and updates only the modified real DOM nodes instead of re-rendering the entire page, resulting in optimal rendering performance."
  },
  {
    id: "tech-3",
    category: "Database & Backend",
    role: "Database / Backend Developer",
    question: "What are ACID properties in a DBMS? Give a real-world example.",
    tips: "Explain Atomicity, Consistency, Isolation, and Durability using a bank transaction.",
    idealStructure: ["Atomicity: All or Nothing", "Consistency: Valid state before & after", "Isolation: Concurrent transactions don't interfere", "Durability: Committed data survives crashes"],
    sampleAnswer: "ACID stands for Atomicity, Consistency, Isolation, and Durability.\nExample: Bank Transfer from Account A ($100) to Account B.\n1. Atomicity: Both debit from A and credit to B occur together, or neither occurs.\n2. Consistency: Total money before transfer ($100) equals total money after.\n3. Isolation: Concurrent transfers don't calculate incorrect intermediate balances.\n4. Durability: Once transfer succeeds, power outage will not lose the recorded transaction."
  }
];

export function evaluateInterviewResponse(questionObj, userResponseText) {
  if (!userResponseText || userResponseText.trim().length < 15) {
    return {
      score: 25,
      rating: "Needs Improvement",
      feedback: "Your answer is too brief. Interviewers expect a structured, detailed answer (at least 3-4 sentences).",
      starCompliance: { situation: false, task: false, action: false, result: false },
      keywordsFound: [],
      suggestions: ["Expand on your technical steps and personal contribution.", "Use clear examples from past projects or academic work."]
    };
  }

  const textLower = userResponseText.toLowerCase();
  
  // Keyword analysis
  let keywords = [];
  if (questionObj.category === "HR & Behavioral") {
    keywords = ["situation", "task", "action", "result", "team", "learned", "project", "achieved", "challenge", "solved", "outcome", "percent"];
  } else {
    keywords = ["memory", "thread", "process", "virtual dom", "performance", "acid", "atomicity", "index", "complexity", "database", "rendering", "cpu", "algorithm"];
  }

  const foundKeywords = keywords.filter(k => textLower.includes(k));
  const wordCount = userResponseText.trim().split(/\s+/).length;

  let score = 50;
  if (wordCount >= 40) score += 20;
  if (foundKeywords.length >= 2) score += 20;
  if (textLower.includes("result") || textLower.includes("outcome") || textLower.includes("achieved") || textLower.includes("because")) score += 10;
  
  score = Math.min(score, 95);

  let rating = "Good";
  if (score >= 85) rating = "Excellent";
  else if (score < 60) rating = "Average";

  const starCheck = {
    situation: textLower.includes("when") || textLower.includes("during") || textLower.includes("project") || textLower.includes("situation"),
    task: textLower.includes("needed") || textLower.includes("had to") || textLower.includes("task") || textLower.includes("responsible"),
    action: textLower.includes("built") || textLower.includes("created") || textLower.includes("implemented") || textLower.includes("optimized") || textLower.includes("action") || textLower.includes("used"),
    result: textLower.includes("result") || textLower.includes("improved") || textLower.includes("outcome") || textLower.includes("reduced") || textLower.includes("achieved")
  };

  return {
    score,
    rating,
    feedback: score >= 80 
      ? "Great response! You articulated your points clearly with good structure and technical terms."
      : "Solid attempt. To reach an top score, ensure you quantify your impact (e.g. 'reduced load time by 40%') and explicitly outline your actions.",
    starCompliance: starCheck,
    keywordsFound: foundKeywords,
    suggestions: [
      foundKeywords.length < 2 ? "Incorporate more industry-standard technical terms." : "Good use of domain terminology.",
      !starCheck.result ? "Add a quantifiable result metric (e.g., %, time saved, accuracy rate)." : "Clear impact described!"
    ]
  };
}
