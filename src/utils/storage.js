// LocalStorage State Manager for Placement Platform

import { initialJobsList } from '../data/jobs.js';

const STORAGE_KEYS = {
  PROFILE: 'placement_user_profile',
  MOCK_TEST_RESULTS: 'placement_mock_results',
  JOB_APPLICATIONS: 'placement_job_apps',
  RESUME_DATA: 'placement_resume_data',
  STREAK: 'placement_prep_streak'
};

export function getUserProfile() {
  const data = localStorage.getItem(STORAGE_KEYS.PROFILE);
  if (data) return JSON.parse(data);
  
  const defaultProfile = {
    name: "Alex Morgan",
    college: "Institute of Technology",
    branch: "Computer Science & Engineering",
    batch: "2026",
    cgpa: "8.8 / 10",
    targetRole: "role-fullstack",
    readinessScore: 78,
    skills: ["JavaScript / ES6+", "React.js / Next.js", "SQL & Relational Queries", "Git & Version Control"],
    weakAreas: ["Dynamic Programming", "Quantitative Aptitude (Pipes & Cisterns)", "System Design"],
    notifications: [
      { id: 'n1', title: 'TCS NQT Registration Alert', message: 'Last 5 days left to register for TCS Ninja & Digital drive.', time: '10m ago', read: false },
      { id: 'n2', title: 'ATS Resume Auditor Score', message: 'Your resume score improved to 85/100 after adding React keywords!', time: '2h ago', read: false }
    ]
  };

  localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(defaultProfile));
  return defaultProfile;
}

export function saveUserProfile(profileData) {
  localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profileData));
}

export function getMockTestResults() {
  const data = localStorage.getItem(STORAGE_KEYS.MOCK_TEST_RESULTS);
  if (data) return JSON.parse(data);
  return [
    { testId: 'aptitude-101', title: 'Quantitative Aptitude Speed Challenge', score: 80, date: '2026-10-01', weakTopics: ['Pipes & Cisterns'] },
    { testId: 'technical-104', title: 'Core CS & Coding Fundamentals', score: 70, date: '2026-10-02', weakTopics: ['QuickSort Worst Case'] }
  ];
}

export function saveMockTestResult(result) {
  const results = getMockTestResults();
  results.unshift(result);
  localStorage.setItem(STORAGE_KEYS.MOCK_TEST_RESULTS, JSON.stringify(results));
  
  // Recalculate readiness score
  const profile = getUserProfile();
  const avg = Math.round(results.reduce((acc, curr) => acc + curr.score, 0) / results.length);
  profile.readinessScore = Math.min(Math.max(avg, 60), 98);
  
  if (result.weakTopics && result.weakTopics.length > 0) {
    result.weakTopics.forEach(t => {
      if (!profile.weakAreas.includes(t)) profile.weakAreas.push(t);
    });
  }
  
  saveUserProfile(profile);
}

export function getJobApplications() {
  const data = localStorage.getItem(STORAGE_KEYS.JOB_APPLICATIONS);
  if (data) return JSON.parse(data);
  
  localStorage.setItem(STORAGE_KEYS.JOB_APPLICATIONS, JSON.stringify(initialJobsList));
  return initialJobsList;
}

export function updateJobStatus(jobId, newStatus) {
  const jobs = getJobApplications();
  const index = jobs.findIndex(j => j.id === jobId);
  if (index !== -1) {
    jobs[index].status = newStatus;
    localStorage.setItem(STORAGE_KEYS.JOB_APPLICATIONS, JSON.stringify(jobs));
  }
  return jobs;
}

export function getResumeData() {
  const data = localStorage.getItem(STORAGE_KEYS.RESUME_DATA);
  if (data) return JSON.parse(data);
  
  const defaultResume = {
    fullName: "Alex Morgan",
    email: "alex.morgan@techuniv.edu",
    phone: "+91 98765 43210",
    location: "Bangalore, India",
    linkedin: "linkedin.com/in/alex-morgan",
    github: "github.com/alex-morgan",
    summary: "Motivated Final Year Computer Science student skilled in Full-Stack Web Development, Data Structures, and Database optimization. Built high-throughput web apps and looking for a Software Development Engineer role.",
    education: [
      { degree: "B.Tech in Computer Science & Engineering", institution: "Institute of Technology", year: "2022 - 2026", grade: "CGPA: 8.8 / 10" }
    ],
    experience: [
      { role: "Software Engineer Intern", company: "TechCorp Solutions", duration: "May 2025 - Jul 2025", details: "Optimized REST API database queries by 35% using indexing. Built interactive analytics dashboard in React." }
    ],
    projects: [
      { title: "Placement & Career Development Platform", tech: "React, Node.js, Express, PostgreSQL", description: "Engineered single-platform placement prep system with ATS Resume Analyzer and Mock Test simulator used by 500+ students." }
    ],
    skills: "JavaScript, React.js, Node.js, Express, SQL, PostgreSQL, Python, Git, Data Structures & Algorithms, Operating Systems, DBMS",
    atsScore: 84
  };

  localStorage.setItem(STORAGE_KEYS.RESUME_DATA, JSON.stringify(defaultResume));
  return defaultResume;
}

export function saveResumeData(resume) {
  localStorage.setItem(STORAGE_KEYS.RESUME_DATA, JSON.stringify(resume));
}
