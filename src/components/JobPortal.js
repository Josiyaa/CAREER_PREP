// Job Vacancies & Application Tracker Component

import { getJobApplications, updateJobStatus } from '../utils/storage.js';

export function renderJobPortal() {
  const jobs = getJobApplications();

  return `
    <div class="job-portal-container">
      <div class="page-header">
        <div>
          <h1 class="page-title">Job Vacancies & <span class="text-gradient">Application Tracker</span></h1>
          <p class="page-subtitle">Browse campus drives, match your resume, and track application statuses across hiring pipelines.</p>
        </div>
      </div>

      <!-- Application Status Pipeline Summary -->
      <div class="dashboard-grid" style="margin-bottom: 2rem;">
        <div class="glass-card col-3" style="text-align: center;">
          <div style="font-size: 2rem; font-weight: 800; color: #38bdf8;">
            ${jobs.filter(j => j.status === 'Applied').length}
          </div>
          <div style="font-size: 0.85rem; color: var(--text-muted);">Applied</div>
        </div>

        <div class="glass-card col-3" style="text-align: center;">
          <div style="font-size: 2rem; font-weight: 800; color: #fbbf24;">
            ${jobs.filter(j => j.status === 'Shortlisted').length}
          </div>
          <div style="font-size: 0.85rem; color: var(--text-muted);">Shortlisted</div>
        </div>

        <div class="glass-card col-3" style="text-align: center;">
          <div style="font-size: 2rem; font-weight: 800; color: #a855f7;">
            ${jobs.filter(j => j.status === 'Interview').length}
          </div>
          <div style="font-size: 0.85rem; color: var(--text-muted);">Interview Scheduled</div>
        </div>

        <div class="glass-card col-3" style="text-align: center;">
          <div style="font-size: 2rem; font-weight: 800; color: #34d399;">
            ${jobs.filter(j => j.status === 'Selected').length}
          </div>
          <div style="font-size: 0.85rem; color: var(--text-muted);">Offers / Selected</div>
        </div>
      </div>

      <!-- Job List -->
      <div class="dashboard-grid">
        ${jobs.map(job => `
          <div class="glass-card col-12" style="display: flex; flex-direction: column; gap: 1rem;">
            <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 1rem;">
              <div style="display: flex; gap: 1rem; align-items: center;">
                <img src="${job.logo}" alt="${job.company}" style="width: 54px; height: 54px; border-radius: 12px; object-fit: cover; border: var(--glass-border);">
                <div>
                  <h3 style="font-size: 1.2rem; color: #fff; margin-bottom: 2px;">${job.role}</h3>
                  <div style="font-size: 0.9rem; font-weight: 600; color: var(--accent-secondary);">${job.company} • <span style="color: var(--text-muted); font-weight: 400;">${job.location}</span></div>
                </div>
              </div>

              <div style="display: flex; align-items: center; gap: 1rem;">
                <div style="text-align: right;">
                  <span class="badge badge-success" style="font-size: 0.85rem; margin-bottom: 4px;">${job.matchScore}% Skill Match</span>
                  <div style="font-size: 0.75rem; color: var(--text-dim);">Deadline: ${job.deadline}</div>
                </div>

                <div style="display: flex; flex-direction: column; align-items: flex-end; gap: 4px;">
                  <label style="font-size: 0.75rem; color: var(--text-dim);">Application Status:</label>
                  <select class="job-status-select" data-job-id="${job.id}">
                    <option value="Not Applied" ${job.status === 'Not Applied' ? 'selected' : ''}>Not Applied</option>
                    <option value="Applied" ${job.status === 'Applied' ? 'selected' : ''}>Applied</option>
                    <option value="Shortlisted" ${job.status === 'Shortlisted' ? 'selected' : ''}>Shortlisted</option>
                    <option value="Interview" ${job.status === 'Interview' ? 'selected' : ''}>Interview Scheduled</option>
                    <option value="Selected" ${job.status === 'Selected' ? 'selected' : ''}>Selected / Offer</option>
                    <option value="Rejected" ${job.status === 'Rejected' ? 'selected' : ''}>Rejected</option>
                  </select>
                </div>
              </div>
            </div>

            <p style="font-size: 0.85rem; color: var(--text-main); line-height: 1.5; background: rgba(255,255,255,0.02); padding: 0.75rem; border-radius: 8px;">
              ${job.description}
            </p>

            <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.75rem;">
              <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
                ${job.skillsRequired.map(s => `<span class="badge badge-primary">${s}</span>`).join('')}
              </div>
              <div style="font-weight: 700; color: #fff; font-size: 0.95rem;">
                ${job.salary}
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

export function attachJobPortalListeners(containerEl, onReRender) {
  containerEl.querySelectorAll('.job-status-select').forEach(select => {
    select.addEventListener('change', (e) => {
      const jobId = select.getAttribute('data-job-id');
      const newStatus = e.target.value;
      updateJobStatus(jobId, newStatus);
      onReRender();
    });
  });
}
