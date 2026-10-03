// Skill-Gap Analysis Component

import { getUserProfile, saveUserProfile } from '../utils/storage.js';
import { jobRolesData, allSkillsList } from '../data/skillsDatabase.js';

export function renderSkillGap() {
  const profile = getUserProfile();
  const currentRole = jobRolesData.find(r => r.id === profile.targetRole) || jobRolesData[0];

  // Calculate missing skills and match score
  const userSkillsSet = new Set(profile.skills.map(s => s.toLowerCase()));
  
  let totalWeight = 0;
  let matchedWeight = 0;
  const missingSkills = [];
  const acquiredSkills = [];

  currentRole.requiredSkills.forEach(skill => {
    totalWeight += skill.weight;
    const isMatched = Array.from(userSkillsSet).some(us => us.includes(skill.name.toLowerCase()) || skill.name.toLowerCase().includes(us));
    
    if (isMatched) {
      matchedWeight += skill.weight;
      acquiredSkills.push(skill);
    } else {
      missingSkills.push(skill);
    }
  });

  const skillMatchPercentage = Math.round((matchedWeight / totalWeight) * 100);

  return `
    <div class="skill-gap-container">
      <div class="page-header">
        <div>
          <h1 class="page-title">Skill-Gap <span class="text-gradient">Analysis & Roadmap</span></h1>
          <p class="page-subtitle">Compare your current skill stack against target job requirements and close competency gaps.</p>
        </div>
        <div style="display: flex; align-items: center; gap: 0.75rem;">
          <label class="form-label" style="margin: 0;">Target Role:</label>
          <select class="form-control" id="role-selector-dropdown" style="width: auto;">
            ${jobRolesData.map(role => `
              <option value="${role.id}" ${role.id === currentRole.id ? 'selected' : ''}>${role.title} (${role.avgPackage})</option>
            `).join('')}
          </select>
        </div>
      </div>

      <div class="dashboard-grid">
        <!-- Match Score Overview Card -->
        <div class="glass-card col-4">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
            <h3>Role Competency Match</h3>
            <span class="badge badge-primary">${currentRole.category}</span>
          </div>

          <div style="text-align: center; padding: 2rem; background: rgba(99, 102, 241, 0.1); border-radius: var(--radius-md); border: 1px solid rgba(99, 102, 241, 0.3); margin-bottom: 1.5rem;">
            <div style="font-family: var(--font-display); font-size: 3.5rem; font-weight: 800; color: #fff; line-height: 1;">${skillMatchPercentage}%</div>
            <div style="font-size: 0.85rem; color: var(--accent-secondary); font-weight: 600; margin-top: 4px;">Skills Alignment Score</div>
          </div>

          <h4 style="font-size: 0.95rem; margin-bottom: 0.75rem; color: var(--text-muted);">Target Companies:</h4>
          <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; margin-bottom: 1.5rem;">
            ${currentRole.targetCompanies.map(c => `<span class="badge badge-secondary">${c}</span>`).join('')}
          </div>

          <h4 style="font-size: 0.95rem; margin-bottom: 0.75rem; color: var(--text-muted);">Update My Current Skills:</h4>
          <div style="display: flex; flex-direction: column; gap: 0.5rem; max-height: 200px; overflow-y: auto; padding-right: 4px;">
            ${allSkillsList.map(skillName => {
              const isChecked = profile.skills.includes(skillName);
              return `
                <label style="display: flex; align-items: center; gap: 0.5rem; font-size: 0.85rem; color: #fff; cursor: pointer;">
                  <input type="checkbox" class="user-skill-checkbox" value="${skillName}" ${isChecked ? 'checked' : ''}>
                  ${skillName}
                </label>
              `;
            }).join('')}
          </div>
          <button class="btn btn-primary" id="btn-save-skills" style="width: 100%; margin-top: 1rem;">Save Skill Updates</button>
        </div>

        <!-- Missing Skills & Recommended Learning Plan -->
        <div class="glass-card col-8">
          <h3 style="margin-bottom: 1rem;">Identified Missing Skill Gaps</h3>

          <div style="display: flex; flex-direction: column; gap: 0.85rem; margin-bottom: 2rem;">
            ${missingSkills.length === 0 
              ? `<div class="badge badge-success" style="font-size: 0.9rem; padding: 0.75rem 1rem;">🎉 Congratulations! You meet all key technical requirements for this role.</div>`
              : missingSkills.map(s => `
                <div style="display: flex; justify-content: space-between; align-items: center; background: rgba(244, 63, 94, 0.08); border: 1px solid rgba(244, 63, 94, 0.25); padding: 0.85rem 1.25rem; border-radius: var(--radius-sm);">
                  <div>
                    <div style="font-weight: 600; color: #fff; font-size: 0.95rem;">${s.name}</div>
                    <div style="font-size: 0.8rem; color: var(--text-muted);">Category: ${s.category} • Required Level: ${s.level}</div>
                  </div>
                  <span class="badge badge-danger">Missing Competency</span>
                </div>
              `).join('')
            }
          </div>

          <h3 style="margin-bottom: 1rem;">Recommended Personalized Learning & Drills</h3>

          <div style="display: flex; flex-direction: column; gap: 1rem;">
            ${currentRole.recommendedCourses.map(course => `
              <div style="background: rgba(255,255,255,0.03); border: var(--glass-border); padding: 1rem 1.25rem; border-radius: var(--radius-sm); display: flex; justify-content: space-between; align-items: center;">
                <div>
                  <div style="font-weight: 600; color: #fff; font-size: 0.95rem;">📘 ${course.title}</div>
                  <div style="font-size: 0.8rem; color: var(--text-muted);">${course.provider} • Duration: ${course.duration}</div>
                </div>
                <button class="btn btn-secondary" style="padding: 0.4rem 0.85rem; font-size: 0.8rem;" onclick="alert('Launching course module: ${course.title}')">Start Module</button>
              </div>
            `).join('')}
          </div>

          <h4 style="font-size: 1rem; color: #fff; margin-top: 1.5rem; margin-bottom: 0.75rem;">Target Placement Activities:</h4>
          <ul style="padding-left: 1.25rem; color: var(--text-muted); font-size: 0.85rem; line-height: 1.6;">
            ${currentRole.recommendedDrills.map(d => `<li>🎯 ${d}</li>`).join('')}
          </ul>
        </div>
      </div>
    </div>
  `;
}

export function attachSkillGapListeners(containerEl, onReRender) {
  const roleSelect = containerEl.querySelector('#role-selector-dropdown');
  const saveBtn = containerEl.querySelector('#btn-save-skills');

  if (roleSelect) {
    roleSelect.addEventListener('change', (e) => {
      const profile = getUserProfile();
      profile.targetRole = e.target.value;
      saveUserProfile(profile);
      onReRender();
    });
  }

  if (saveBtn) {
    saveBtn.addEventListener('click', () => {
      const selected = [];
      containerEl.querySelectorAll('.user-skill-checkbox:checked').forEach(cb => {
        selected.push(cb.value);
      });

      const profile = getUserProfile();
      profile.skills = selected;
      saveUserProfile(profile);
      alert('Skill profile updated! Re-calculating gap analysis...');
      onReRender();
    });
  }
}
