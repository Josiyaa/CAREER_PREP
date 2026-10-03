// Dashboard Component

import { getUserProfile, getMockTestResults } from '../utils/storage.js';
import { jobRolesData } from '../data/skillsDatabase.js';

export function renderDashboard(onNavigate) {
  const profile = getUserProfile();
  const testResults = getMockTestResults();
  const targetRoleObj = jobRolesData.find(r => r.id === profile.targetRole) || jobRolesData[0];

  // Calculate circular stroke offset (circumference ~ 440)
  const offset = 440 - (440 * profile.readinessScore) / 100;

  return `
    <div class="dashboard-container">
      <div class="page-header">
        <div>
          <h1 class="page-title">CareerPrep <span class="text-gradient">Placement Dashboard</span></h1>
          <p class="page-subtitle">Integrated Placement Training & Career Development Platform • ${profile.branch} (${profile.batch} Batch)</p>
        </div>
        <div style="display: flex; gap: 0.75rem;">
          <button class="btn btn-secondary" id="btn-change-target">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20M2 12h20"/></svg>
            Target: ${targetRoleObj.title}
          </button>
          <button class="btn btn-primary" id="btn-quick-test">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"/></svg>
            Take Quick Mock Test
          </button>
        </div>
      </div>

      <!-- Placement Drive Alert Banner -->
      <div class="glass-card col-12" style="margin-bottom: 1.5rem; background: linear-gradient(135deg, rgba(79, 70, 229, 0.08), rgba(2, 132, 199, 0.08)); border: 1px solid rgba(79, 70, 229, 0.25);">
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">
          <div style="display: flex; align-items: center; gap: 1rem;">
            <div style="background: var(--accent-primary); width: 44px; height: 44px; border-radius: 12px; display: flex; align-items: center; justify-content: center; color: white; flex-shrink: 0;">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 17H2a3 3 0 0 0 3-3V9a7 7 0 0 1 14 0v5a3 3 0 0 0 3 3zm-8 4a2 2 0 0 1-4 0"/></svg>
            </div>
            <div>
              <h3 style="font-size: 1.1rem; margin-bottom: 2px;">TCS NQT & Infosys Off-Campus Drive 2026 Open</h3>
              <p style="font-size: 0.85rem; color: var(--text-muted);">Application deadlines approaching! Ensure your ATS Resume score is above 80% before applying.</p>
            </div>
          </div>
          <button class="btn btn-secondary" id="btn-banner-jobs">View Job Vacancies</button>
        </div>
      </div>

      <!-- Top Row: Readiness Score & Target Company Roadmap -->
      <div class="dashboard-grid">
        <!-- Readiness Score Gauge -->
        <div class="glass-card col-6">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.25rem;">
            <h3>Placement Readiness Index</h3>
            <span class="badge badge-success">Overall Benchmark</span>
          </div>

          <div class="readiness-box">
            <div class="gauge-container">
              <svg class="gauge-svg" viewBox="0 0 160 160">
                <defs>
                  <linearGradient id="gauge-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#4f46e5" />
                    <stop offset="50%" stop-color="#0284c7" />
                    <stop offset="100%" stop-color="#10b981" />
                  </linearGradient>
                </defs>
                <circle class="gauge-bg" cx="80" cy="80" r="70" />
                <circle class="gauge-fill" cx="80" cy="80" r="70" style="stroke-dashoffset: ${offset};" />
              </svg>
              <div class="gauge-center">
                <div class="gauge-score">${profile.readinessScore}%</div>
                <div class="gauge-label">Ready</div>
              </div>
            </div>

            <div class="readiness-details">
              <div class="progress-bar-container">
                <div class="progress-label">
                  <span>Aptitude & Logical</span>
                  <span style="font-weight: 600; color: var(--text-main);">82%</span>
                </div>
                <div class="progress-track"><div class="progress-fill" style="width: 82%;"></div></div>
              </div>

              <div class="progress-bar-container">
                <div class="progress-label">
                  <span>DSA & Technical Coding</span>
                  <span style="font-weight: 600; color: var(--text-main);">74%</span>
                </div>
                <div class="progress-track"><div class="progress-fill" style="width: 74%; background: linear-gradient(90deg, #0284c7, #9333ea);"></div></div>
              </div>

              <div class="progress-bar-container">
                <div class="progress-label">
                  <span>Core CS (OS/DBMS/CN)</span>
                  <span style="font-weight: 600; color: var(--text-main);">85%</span>
                </div>
                <div class="progress-track"><div class="progress-fill" style="width: 85%; background: linear-gradient(90deg, #10b981, #059669);"></div></div>
              </div>

              <div class="progress-bar-container">
                <div class="progress-label">
                  <span>AI Mock Interview Feedback</span>
                  <span style="font-weight: 600; color: var(--text-main);">70%</span>
                </div>
                <div class="progress-track"><div class="progress-fill" style="width: 70%; background: linear-gradient(90deg, #d97706, #b45309);"></div></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Target Company Target Card & Weak Areas -->
        <div class="glass-card col-6" style="display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
              <h3>Target Companies Roadmap</h3>
              <span class="badge badge-primary">${targetRoleObj.title}</span>
            </div>

            <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; margin-bottom: 1.25rem;">
              ${targetRoleObj.targetCompanies.map(c => `
                <span style="background: var(--bg-input); border: 1px solid var(--border-color); padding: 0.35rem 0.75rem; border-radius: var(--radius-sm); font-size: 0.85rem; font-weight: 500; color: var(--text-main);">🏢 ${c}</span>
              `).join('')}
            </div>

            <h4 style="font-size: 0.95rem; color: var(--text-muted); margin-bottom: 0.75rem;">Identified Weak Areas (Action Required):</h4>
            <div style="display: flex; flex-direction: column; gap: 0.5rem;">
              ${profile.weakAreas.map(w => `
                <div style="display: flex; justify-content: space-between; align-items: center; background: rgba(225, 29, 72, 0.08); border: 1px solid rgba(225, 29, 72, 0.25); padding: 0.6rem 0.85rem; border-radius: var(--radius-sm);">
                  <div style="display: flex; align-items: center; gap: 0.5rem; font-size: 0.85rem; color: #be123c; font-weight: 500;">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                    ${w}
                  </div>
                  <button class="btn btn-secondary" style="padding: 0.25rem 0.6rem; font-size: 0.75rem;" onclick="window.dispatchEvent(new CustomEvent('nav-tab', {detail: 'mock-tests'}))">Practice</button>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      </div>

      <!-- Quick Modules Row -->
      <div class="dashboard-grid" style="margin-top: 1.5rem;">
        <div class="glass-card col-4" style="cursor: pointer;" id="card-goto-tests">
          <div style="background: rgba(79, 70, 229, 0.12); width: 44px; height: 44px; border-radius: 12px; display: flex; align-items: center; justify-content: center; color: var(--accent-primary); margin-bottom: 1rem;">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/></svg>
          </div>
          <h3 style="font-size: 1.1rem; margin-bottom: 0.35rem;">Mock Tests & Drills</h3>
          <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 1rem;">Practice Aptitude, Logical Reasoning, Verbal & Coding tests with instant explanations.</p>
          <span style="color: var(--accent-primary); font-size: 0.85rem; font-weight: 600;">Start Test &rarr;</span>
        </div>

        <div class="glass-card col-4" style="cursor: pointer;" id="card-goto-ats">
          <div style="background: rgba(2, 132, 199, 0.12); width: 44px; height: 44px; border-radius: 12px; display: flex; align-items: center; justify-content: center; color: var(--accent-secondary); margin-bottom: 1rem;">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><polyline points="17 11 19 13 23 9"/></svg>
          </div>
          <h3 style="font-size: 1.1rem; margin-bottom: 0.35rem;">ATS Resume Auditor</h3>
          <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 1rem;">Analyze your resume against job specifications and boost keyword match rates.</p>
          <span style="color: var(--accent-secondary); font-size: 0.85rem; font-weight: 600;">Audit Resume &rarr;</span>
        </div>

        <div class="glass-card col-4" style="cursor: pointer;" id="card-goto-ai">
          <div style="background: rgba(147, 51, 234, 0.12); width: 44px; height: 44px; border-radius: 12px; display: flex; align-items: center; justify-content: center; color: var(--accent-purple); margin-bottom: 1rem;">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/></svg>
          </div>
          <h3 style="font-size: 1.1rem; margin-bottom: 0.35rem;">AI Interview Simulator</h3>
          <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 1rem;">Practice HR & Technical questions with live STAR evaluation and scoring.</p>
          <span style="color: var(--accent-purple); font-size: 0.85rem; font-weight: 600;">Practice Interview &rarr;</span>
        </div>
      </div>
    </div>
  `;
}
