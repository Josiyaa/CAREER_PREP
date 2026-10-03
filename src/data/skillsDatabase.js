// Skills Database & Skill-Gap Matrix for Target Job Roles

export const jobRolesData = [
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
    ],
    recommendedCourses: [
      { title: "Complete Modern React & Next.js Guide", provider: "Platform Prep Hub", link: "#", duration: "12 hours" },
      { title: "Data Structures & Algorithms Masterclass", provider: "LeetCode / Platform Drills", link: "#", duration: "25 hours" },
      { title: "Node.js Microservices & REST API Design", provider: "Backend Academy", link: "#", duration: "10 hours" }
    ],
    recommendedDrills: [
      "Solve 20 LeetCode Medium Array & Dynamic Programming questions",
      "Build & deploy a full-stack REST API with JWT Auth",
      "Attempt Full-Stack Technical Mock Interview"
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
      { name: "PowerBI / Tableau", category: "Visualization", level: "Intermediate", weight: 20 },
      { name: "Statistics & Probability", category: "Mathematics", level: "Intermediate", weight: 15 },
      { name: "Excel & Data Cleaning", category: "Tools", level: "Advanced", weight: 15 }
    ],
    recommendedCourses: [
      { title: "Advanced SQL Window Functions & Aggregations", provider: "SQL Masterclass", link: "#", duration: "8 hours" },
      { title: "Python for Data Analysis & Visualization", provider: "Data Camp", link: "#", duration: "14 hours" },
      { title: "PowerBI Business Dashboard Design", provider: "BI Academy", link: "#", duration: "9 hours" }
    ],
    recommendedDrills: [
      "Complete 15 SQL query challenges on Joins & Group By",
      "Analyze a sample sales dataset and generate an executive report",
      "Practice Data Analyst Case Study Interview"
    ]
  },
  {
    id: "role-cloud-devops",
    title: "Cloud & DevOps Engineer",
    category: "Infrastructure",
    avgPackage: "7 - 13 LPA",
    targetCompanies: ["AWS", "TCS", "Cognizant", "Capgemini", "IBM"],
    requiredSkills: [
      { name: "Linux Administration & Shell Scripting", category: "OS", level: "Advanced", weight: 20 },
      { name: "Docker & Containerization", category: "DevOps", level: "Advanced", weight: 20 },
      { name: "CI/CD Pipelines (GitHub Actions / Jenkins)", category: "DevOps", level: "Intermediate", weight: 20 },
      { name: "AWS / GCP Cloud Services", category: "Cloud", level: "Intermediate", weight: 25 },
      { name: "Computer Networks (TCP/IP, DNS)", category: "Core CS", level: "Intermediate", weight: 15 }
    ],
    recommendedCourses: [
      { title: "Docker & Kubernetes for Beginners", provider: "Cloud Academy", link: "#", duration: "10 hours" },
      { title: "AWS Certified Solutions Architect Prep", provider: "AWS Prep", link: "#", duration: "20 hours" }
    ],
    recommendedDrills: [
      "Set up an automated CI/CD pipeline for a web project",
      "Containerize a multi-service app using Docker Compose",
      "Attempt Cloud Infrastructure Mock Technical Quiz"
    ]
  },
  {
    id: "role-system-engineer",
    title: "Core Software Systems Engineer (TCS NQT / Infosys SP)",
    category: "Software Engineering",
    avgPackage: "4.5 - 9 LPA",
    targetCompanies: ["TCS NQT", "Infosys", "Wipro", "Cognizant", "Mindtree"],
    requiredSkills: [
      { name: "Quantitative Aptitude", category: "Aptitude", level: "Advanced", weight: 25 },
      { name: "Logical Reasoning & Pseudo Code", category: "Reasoning", level: "Advanced", weight: 25 },
      { name: "C / C++ / Java Programming", category: "Language", level: "Intermediate", weight: 20 },
      { name: "Core CS (OS, DBMS, Computer Networks)", category: "Core CS", level: "Intermediate", weight: 20 },
      { name: "Verbal Communication & Essay", category: "Verbal", level: "Intermediate", weight: 10 }
    ],
    recommendedCourses: [
      { title: "TCS NQT / Infosys Full Aptitude & Reasoning Prep", provider: "Placement Pulse", link: "#", duration: "15 hours" },
      { title: "Pseudo Code & Output Tracing Drills", provider: "Placement Pulse", link: "#", duration: "8 hours" }
    ],
    recommendedDrills: [
      "Attempt 3 Full-Length TCS NQT Timed Mock Exams",
      "Practice 50 Pseudo-code output prediction problems",
      "Review CS Core Flashcards for OS & DBMS"
    ]
  }
];

export const allSkillsList = [
  "JavaScript / ES6+", "React.js / Next.js", "Node.js & Express", "SQL & Relational Queries",
  "Python (Pandas, NumPy)", "Data Structures & Algorithms (DSA)", "Git & Version Control",
  "Quantitative Aptitude", "Logical Reasoning & Pseudo Code", "C / C++ / Java Programming",
  "Core CS (OS, DBMS, Computer Networks)", "Linux Administration & Shell Scripting",
  "Docker & Containerization", "AWS / GCP Cloud Services", "PowerBI / Tableau", "Excel & Data Cleaning"
];
