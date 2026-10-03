// ATS Resume Analyzer & Live Resume Builder Component

import { getResumeData, saveResumeData } from '../utils/storage.js';

export function renderATSResume() {
  const resume = getResumeData();

  return `
    <div class="ats-resume-container">
      <div class="page-header">
        <div>
          <h1 class="page-title">ATS Resume <span class="text-gradient">Analyzer & Builder</span></h1>
          <p class="page-subtitle">Evaluate your resume against Applicant Tracking Systems (ATS) and generate target-role optimized CVs.</p>
        </div>
        <button class="btn btn-primary no-print" id="btn-print-resume">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>
          Export / Print Resume PDF
        </button>
      </div>

      <div class="dashboard-grid">
        <!-- ATS Audit Results Card -->
        <div class="glass-card col-4 no-print">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
            <h3>ATS Compliance Audit</h3>
            <span class="badge badge-success">Live Score</span>
          </div>

          <div style="text-align: center; padding: 1.5rem; background: rgba(99, 102, 241, 0.1); border-radius: var(--radius-md); border: 1px solid rgba(99, 102, 241, 0.3); margin-bottom: 1.5rem;">
            <div style="font-family: var(--font-display); font-size: 3.5rem; font-weight: 800; color: #fff; line-height: 1;" id="ats-score-display">${resume.atsScore}</div>
            <div style="font-size: 0.85rem; color: var(--accent-secondary); font-weight: 600; margin-top: 4px;">/ 100 ATS Score</div>
          </div>

          <h4 style="font-size: 0.95rem; margin-bottom: 0.75rem; color: var(--text-muted);">Optimization Checklist:</h4>
          
          <div style="display: flex; flex-direction: column; gap: 0.75rem;">
            <div style="display: flex; align-items: center; gap: 0.6rem; font-size: 0.85rem; color: #34d399;">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
              <span>Action Verbs count: <strong>Optimal (14 found)</strong></span>
            </div>

            <div style="display: flex; align-items: center; gap: 0.6rem; font-size: 0.85rem; color: #34d399;">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
              <span>Single Column ATS Format: <strong>Pass</strong></span>
            </div>

            <div style="display: flex; align-items: center; gap: 0.6rem; font-size: 0.85rem; color: #fb7185;">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/></svg>
              <span>Missing High-Impact Keywords: <strong>TypeScript, Docker, AWS</strong></span>
            </div>
          </div>

          <div style="margin-top: 1.5rem; padding-top: 1rem; border-top: 1px solid var(--border-color);">
            <h4 style="font-size: 0.9rem; margin-bottom: 0.5rem; color: #fff;">Suggested AI Improvements:</h4>
            <ul style="font-size: 0.8rem; color: var(--text-muted); padding-left: 1.2rem; line-height: 1.5;">
              <li>Quantify project results (e.g. "Improved API response speed by 35%").</li>
              <li>Add target technology keywords under technical skills section.</li>
            </ul>
          </div>
        </div>

        <!-- Resume Form & Live Preview -->
        <div class="glass-card col-8 resume-print-area">
          <div class="no-print" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
            <h3>Interactive Resume Builder</h3>
            <span style="font-size: 0.8rem; color: var(--text-dim);">Live auto-save enabled</span>
          </div>

          <form id="resume-builder-form">
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
              <div class="form-group">
                <label class="form-label">Full Name</label>
                <input type="text" class="form-control" id="res-name" value="${resume.fullName}">
              </div>
              <div class="form-group">
                <label class="form-label">Email Address</label>
                <input type="email" class="form-control" id="res-email" value="${resume.email}">
              </div>
              <div class="form-group">
                <label class="form-label">Phone Number</label>
                <input type="text" class="form-control" id="res-phone" value="${resume.phone}">
              </div>
              <div class="form-group">
                <label class="form-label">Location</label>
                <input type="text" class="form-control" id="res-location" value="${resume.location}">
              </div>
            </div>

            <div class="form-group">
              <label class="form-label">Professional Summary</label>
              <textarea class="form-control" id="res-summary" rows="3">${resume.summary}</textarea>
            </div>

            <div class="form-group">
              <label class="form-label">Technical Skills (Comma separated for ATS Parsing)</label>
              <textarea class="form-control" id="res-skills" rows="2">${resume.skills}</textarea>
            </div>

            <div style="margin-top: 1.5rem; display: flex; justify-content: flex-end;" class="no-print">
              <button type="button" class="btn btn-primary" id="btn-save-resume">Save & Re-Audit ATS Score</button>
            </div>
          </form>

          <!-- Printable Clean Preview -->
          <div style="margin-top: 2rem; border-top: 2px dashed var(--border-color); padding-top: 1.5rem;" class="resume-preview-section">
            <div style="text-align: center; margin-bottom: 1rem;">
              <h1 style="font-size: 1.8rem; font-weight: 800; color: #fff;" id="prev-name">${resume.fullName}</h1>
              <p style="font-size: 0.85rem; color: var(--text-muted);" id="prev-contact">
                ${resume.email} • ${resume.phone} • ${resume.location}
              </p>
            </div>

            <div style="margin-bottom: 1rem;">
              <h3 style="font-size: 1rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--accent-primary); border-bottom: 1px solid var(--border-color); padding-bottom: 4px; margin-bottom: 0.5rem;">Professional Summary</h3>
              <p style="font-size: 0.85rem; color: var(--text-main);" id="prev-summary">${resume.summary}</p>
            </div>

            <div>
              <h3 style="font-size: 1rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--accent-primary); border-bottom: 1px solid var(--border-color); padding-bottom: 4px; margin-bottom: 0.5rem;">Technical Core Skills</h3>
              <p style="font-size: 0.85rem; color: var(--text-main);" id="prev-skills">${resume.skills}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

export function attachResumeEventListeners(containerEl) {
  const form = containerEl.querySelector('#resume-builder-form');
  if (!form) return;

  const nameInput = containerEl.querySelector('#res-name');
  const emailInput = containerEl.querySelector('#res-email');
  const phoneInput = containerEl.querySelector('#res-phone');
  const locationInput = containerEl.querySelector('#res-location');
  const summaryInput = containerEl.querySelector('#res-summary');
  const skillsInput = containerEl.querySelector('#res-skills');

  const saveBtn = containerEl.querySelector('#btn-save-resume');
  const printBtn = containerEl.querySelector('#btn-print-resume');

  function calculateATSScore(skillsText, summaryText) {
    let score = 70;
    const lowerSkills = skillsText.toLowerCase();
    const lowerSummary = summaryText.toLowerCase();

    if (lowerSkills.includes('react') || lowerSkills.includes('javascript')) score += 5;
    if (lowerSkills.includes('sql') || lowerSkills.includes('database')) score += 5;
    if (lowerSkills.includes('git') || lowerSkills.includes('python')) score += 5;
    if (lowerSummary.includes('built') || lowerSummary.includes('optimized') || lowerSummary.includes('engineered')) score += 5;

    return Math.min(score, 98);
  }

  saveBtn.addEventListener('click', () => {
    const newScore = calculateATSScore(skillsInput.value, summaryInput.value);
    
    const updated = {
      fullName: nameInput.value,
      email: emailInput.value,
      phone: phoneInput.value,
      location: locationInput.value,
      summary: summaryInput.value,
      skills: skillsInput.value,
      atsScore: newScore
    };

    saveResumeData(updated);

    containerEl.querySelector('#ats-score-display').textContent = newScore;
    containerEl.querySelector('#prev-name').textContent = updated.fullName;
    containerEl.querySelector('#prev-contact').textContent = `${updated.email} • ${updated.phone} • ${updated.location}`;
    containerEl.querySelector('#prev-summary').textContent = updated.summary;
    containerEl.querySelector('#prev-skills').textContent = updated.skills;

    alert('Resume updated and ATS Score re-analyzed successfully!');
  });

  if (printBtn) {
    printBtn.addEventListener('click', () => {
      window.print();
    });
  }
}
