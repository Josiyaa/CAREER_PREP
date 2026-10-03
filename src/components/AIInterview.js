// AI-Assisted Interview Prep Component

import { interviewQuestions, evaluateInterviewResponse } from '../data/interviewPrep.js';

export function renderAIInterview() {
  return `
    <div class="ai-interview-container">
      <div class="page-header">
        <div>
          <h1 class="page-title">AI-Assisted <span class="text-gradient">Interview Simulator</span></h1>
          <p class="page-subtitle">Practice commonly asked Technical & HR placement questions with automated response evaluation.</p>
        </div>
      </div>

      <div class="dashboard-grid">
        <!-- Question Picker Sidebar -->
        <div class="glass-card col-4">
          <h3 style="margin-bottom: 1rem;">Select Interview Scenario</h3>
          <div style="display: flex; flex-direction: column; gap: 0.75rem;" id="interview-q-list">
            ${interviewQuestions.map((q, idx) => `
              <div class="interview-q-card ${idx === 0 ? 'active' : ''}" data-q-id="${q.id}" style="background: rgba(255,255,255,0.03); border: var(--glass-border); padding: 0.85rem 1rem; border-radius: var(--radius-sm); cursor: pointer; transition: all 0.2s ease;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
                  <span class="badge ${q.category.includes('HR') ? 'badge-warning' : 'badge-primary'}">${q.category}</span>
                  <span style="font-size: 0.75rem; color: var(--text-dim);">${q.role}</span>
                </div>
                <div style="font-size: 0.85rem; font-weight: 600; color: #fff; line-height: 1.3;">${q.question}</div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Interactive AI Interview Workspace -->
        <div class="glass-card col-8" id="ai-interview-workspace">
          <!-- Populated dynamically by initInterviewWorkspace -->
        </div>
      </div>
    </div>
  `;
}

export function initInterviewWorkspace(containerEl, defaultQId = "hr-1") {
  const workspaceEl = containerEl.querySelector('#ai-interview-workspace');
  if (!workspaceEl) return;

  let currentQuestion = interviewQuestions.find(q => q.id === defaultQId) || interviewQuestions[0];
  let evaluationResult = null;

  function renderWorkspace() {
    workspaceEl.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border-color); padding-bottom: 1rem; margin-bottom: 1.25rem;">
        <div>
          <span class="badge badge-secondary" style="margin-bottom: 4px;">AI Mock Interviewer</span>
          <h2 style="font-size: 1.25rem; color: #fff; margin-top: 2px;">${currentQuestion.category} Question</h2>
        </div>
        <button class="btn btn-secondary" id="btn-toggle-tips">💡 View Answer Structure Tips</button>
      </div>

      <!-- Question Box -->
      <div style="background: linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(168, 85, 247, 0.1)); border: 1px solid rgba(99, 102, 241, 0.3); padding: 1.25rem; border-radius: var(--radius-md); margin-bottom: 1.5rem;">
        <h3 style="font-size: 1.15rem; font-weight: 600; color: #fff; margin-bottom: 0.5rem;">"${currentQuestion.question}"</h3>
        <p style="font-size: 0.85rem; color: var(--text-muted); display: none;" id="tips-box">
          <strong>Tip:</strong> ${currentQuestion.tips}
        </p>
      </div>

      <!-- Answer Response Input Area -->
      <div class="form-group" style="margin-bottom: 1.5rem;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
          <label class="form-label">Type or Record Your Answer:</label>
          <span style="font-size: 0.75rem; color: var(--text-dim);" id="word-count-badge">0 words</span>
        </div>
        <textarea class="form-control" id="user-interview-answer" rows="6" placeholder="Construct your response using the STAR format (Situation, Task, Action, Result)..."></textarea>
      </div>

      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
        <button class="btn btn-secondary" id="btn-sample-answer">View Ideal Sample Answer</button>
        <button class="btn btn-primary" id="btn-evaluate-answer">Evaluate Answer & Get Feedback &rarr;</button>
      </div>

      <!-- Evaluation Report Card -->
      <div id="evaluation-report-box">
        ${evaluationResult ? renderEvaluationReport(evaluationResult) : ''}
      </div>
    `;

    // Event listeners
    const tipsBtn = workspaceEl.querySelector('#btn-toggle-tips');
    const tipsBox = workspaceEl.querySelector('#tips-box');
    tipsBtn.addEventListener('click', () => {
      tipsBox.style.display = tipsBox.style.display === 'none' ? 'block' : 'none';
    });

    const textarea = workspaceEl.querySelector('#user-interview-answer');
    const wordCountBadge = workspaceEl.querySelector('#word-count-badge');
    textarea.addEventListener('input', () => {
      const words = textarea.value.trim() ? textarea.value.trim().split(/\s+/).length : 0;
      wordCountBadge.textContent = `${words} words`;
    });

    const sampleBtn = workspaceEl.querySelector('#btn-sample-answer');
    sampleBtn.addEventListener('click', () => {
      textarea.value = currentQuestion.sampleAnswer;
      const words = textarea.value.trim().split(/\s+/).length;
      wordCountBadge.textContent = `${words} words`;
    });

    const evalBtn = workspaceEl.querySelector('#btn-evaluate-answer');
    evalBtn.addEventListener('click', () => {
      const ans = textarea.value;
      evaluationResult = evaluateInterviewResponse(currentQuestion, ans);
      renderWorkspace();
    });
  }

  function renderEvaluationReport(res) {
    return `
      <div style="background: rgba(18, 24, 38, 0.95); border: 1px solid var(--accent-primary); border-radius: var(--radius-md); padding: 1.5rem; margin-top: 1.5rem;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
          <h3 style="font-size: 1.15rem; color: #fff;">AI Response Scorecard</h3>
          <span class="badge ${res.score >= 75 ? 'badge-success' : 'badge-warning'}" style="font-size: 0.9rem;">${res.rating} (${res.score}/100)</span>
        </div>

        <p style="font-size: 0.9rem; color: var(--text-main); margin-bottom: 1.25rem;">${res.feedback}</p>

        <h4 style="font-size: 0.85rem; color: var(--text-muted); text-transform: uppercase; margin-bottom: 0.5rem;">STAR Framework Alignment:</h4>
        <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 0.5rem; margin-bottom: 1.25rem;">
          <div style="background: rgba(255,255,255,0.04); padding: 0.5rem; border-radius: 6px; text-align: center; font-size: 0.8rem; border: 1px solid ${res.starCompliance.situation ? '#10b981' : 'rgba(255,255,255,0.1)'}">
            ${res.starCompliance.situation ? '✅' : '❌'} Situation
          </div>
          <div style="background: rgba(255,255,255,0.04); padding: 0.5rem; border-radius: 6px; text-align: center; font-size: 0.8rem; border: 1px solid ${res.starCompliance.task ? '#10b981' : 'rgba(255,255,255,0.1)'}">
            ${res.starCompliance.task ? '✅' : '❌'} Task
          </div>
          <div style="background: rgba(255,255,255,0.04); padding: 0.5rem; border-radius: 6px; text-align: center; font-size: 0.8rem; border: 1px solid ${res.starCompliance.action ? '#10b981' : 'rgba(255,255,255,0.1)'}">
            ${res.starCompliance.action ? '✅' : '❌'} Action
          </div>
          <div style="background: rgba(255,255,255,0.04); padding: 0.5rem; border-radius: 6px; text-align: center; font-size: 0.8rem; border: 1px solid ${res.starCompliance.result ? '#10b981' : 'rgba(255,255,255,0.1)'}">
            ${res.starCompliance.result ? '✅' : '❌'} Result
          </div>
        </div>

        <h4 style="font-size: 0.85rem; color: var(--text-muted); text-transform: uppercase; margin-bottom: 0.5rem;">Actionable Suggestions:</h4>
        <ul style="font-size: 0.85rem; color: var(--text-main); padding-left: 1.2rem;">
          ${res.suggestions.map(s => `<li>${s}</li>`).join('')}
        </ul>
      </div>
    `;
  }

  // Sidebar Question Switching Listener
  containerEl.querySelectorAll('.interview-q-card').forEach(card => {
    card.addEventListener('click', () => {
      containerEl.querySelectorAll('.interview-q-card').forEach(c => c.style.borderColor = 'rgba(255,255,255,0.1)');
      card.style.borderColor = 'var(--accent-primary)';
      
      const qId = card.getAttribute('data-q-id');
      currentQuestion = interviewQuestions.find(q => q.id === qId);
      evaluationResult = null;
      renderWorkspace();
    });
  });

  renderWorkspace();
}
