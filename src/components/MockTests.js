// Mock Tests Component

import { mockTestsData } from '../data/mockTests.js';
import { saveMockTestResult } from '../utils/storage.js';
import confetti from 'canvas-confetti';

export function renderMockTests() {
  return `
    <div class="mock-tests-container">
      <div class="page-header">
        <div>
          <h1 class="page-title">Placement <span class="text-gradient">Mock Tests & Drills</span></h1>
          <p class="page-subtitle">Practice timed assessments with instant score reports, formulas, and weak spot identification.</p>
        </div>
      </div>

      <div id="test-view-container">
        <!-- Test Selection List -->
        <div class="dashboard-grid">
          ${mockTestsData.map(test => `
            <div class="glass-card col-6">
              <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.75rem;">
                <span class="badge badge-primary">${test.category}</span>
                <span class="badge badge-warning">⏱️ ${test.durationMinutes} Mins</span>
              </div>
              <h3 style="font-size: 1.25rem; margin-bottom: 0.5rem;">${test.title}</h3>
              <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 1.25rem;">Contains ${test.totalQuestions} handpicked placement questions with step-by-step mathematical & logical solution breakdowns.</p>
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <span style="font-size: 0.8rem; color: var(--text-dim); font-weight: 500;">Difficulty: <strong style="color: #fff;">${test.difficulty}</strong></span>
                <button class="btn btn-primary start-test-btn" data-test-id="${test.id}">Start Assessment &rarr;</button>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}

export function initMockTestRunner(testId, containerEl) {
  const test = mockTestsData.find(t => t.id === testId);
  if (!test) return;

  let currentQuestionIndex = 0;
  let userAnswers = {}; // qId -> selectedIndex
  let timeRemainingSeconds = test.durationMinutes * 60;
  let timerInterval = null;

  function renderQuestionScreen() {
    const q = test.questions[currentQuestionIndex];
    const selectedIdx = userAnswers[q.id];

    const minutes = Math.floor(timeRemainingSeconds / 60);
    const seconds = timeRemainingSeconds % 60;
    const timeFormatted = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

    containerEl.innerHTML = `
      <div class="glass-card col-12 quiz-card">
        <div class="quiz-header">
          <div>
            <span class="badge badge-secondary" style="margin-bottom: 4px;">Question ${currentQuestionIndex + 1} of ${test.totalQuestions}</span>
            <h2 style="font-size: 1.35rem; margin-top: 4px;">${test.title}</h2>
          </div>
          <div class="quiz-timer">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            <span>${timeFormatted}</span>
          </div>
        </div>

        <div style="margin: 1rem 0;">
          <h3 style="font-size: 1.15rem; font-weight: 600; line-height: 1.5; color: #fff;">${q.question}</h3>
        </div>

        <div class="options-grid">
          ${q.options.map((opt, idx) => `
            <div class="option-card ${selectedIdx === idx ? 'selected' : ''}" data-opt-index="${idx}">
              <div class="option-letter">${String.fromCharCode(65 + idx)}</div>
              <div style="font-size: 0.95rem; font-weight: 500;">${opt}</div>
            </div>
          `).join('')}
        </div>

        <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 1.5rem; border-top: 1px solid var(--border-color); padding-top: 1rem;">
          <button class="btn btn-secondary" id="btn-prev-q" ${currentQuestionIndex === 0 ? 'disabled style="opacity:0.4; cursor:not-allowed;"' : ''}>&larr; Previous</button>
          
          ${currentQuestionIndex === test.totalQuestions - 1 
            ? `<button class="btn btn-success" id="btn-submit-test">Submit Test & View Results &check;</button>`
            : `<button class="btn btn-primary" id="btn-next-q">Next Question &rarr;</button>`
          }
        </div>
      </div>
    `;

    // Add option click handlers
    containerEl.querySelectorAll('.option-card').forEach(el => {
      el.addEventListener('click', () => {
        const idx = parseInt(el.getAttribute('data-opt-index'));
        userAnswers[q.id] = idx;
        renderQuestionScreen();
      });
    });

    // Nav handlers
    const prevBtn = containerEl.querySelector('#btn-prev-q');
    if (prevBtn && currentQuestionIndex > 0) {
      prevBtn.addEventListener('click', () => {
        currentQuestionIndex--;
        renderQuestionScreen();
      });
    }

    const nextBtn = containerEl.querySelector('#btn-next-q');
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        currentQuestionIndex++;
        renderQuestionScreen();
      });
    }

    const submitBtn = containerEl.querySelector('#btn-submit-test');
    if (submitBtn) {
      submitBtn.addEventListener('click', () => {
        finishTest();
      });
    }
  }

  function finishTest() {
    clearInterval(timerInterval);

    let correctCount = 0;
    const weakTopicsDetected = [];

    test.questions.forEach(q => {
      if (userAnswers[q.id] === q.correctIndex) {
        correctCount++;
      } else {
        weakTopicsDetected.push(test.category + ": " + q.question.substring(0, 30) + "...");
      }
    });

    const scorePercent = Math.round((correctCount / test.totalQuestions) * 100);

    // Save result to LocalStorage
    saveMockTestResult({
      testId: test.id,
      title: test.title,
      score: scorePercent,
      date: new Date().toISOString().split('T')[0],
      weakTopics: weakTopicsDetected
    });

    if (scorePercent >= 70) {
      confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
    }

    // Render Detailed Score Card
    containerEl.innerHTML = `
      <div class="glass-card col-12" style="text-align: center; padding: 2.5rem 1.5rem;">
        <span class="badge ${scorePercent >= 70 ? 'badge-success' : 'badge-danger'}" style="font-size: 0.9rem; margin-bottom: 1rem;">
          ${scorePercent >= 70 ? 'Test Passed 🎉' : 'Needs Practice ⚠️'}
        </span>
        <h2 style="font-size: 2.2rem; margin-bottom: 0.5rem;">Test Result Summary</h2>
        <p style="color: var(--text-muted); margin-bottom: 2rem;">${test.title}</p>

        <div style="display: flex; justify-content: center; gap: 2rem; margin-bottom: 2.5rem; flex-wrap: wrap;">
          <div style="background: rgba(255,255,255,0.04); border: var(--glass-border); padding: 1.25rem 2rem; border-radius: var(--radius-md);">
            <div style="font-size: 2rem; font-weight: 800; color: var(--accent-primary);">${scorePercent}%</div>
            <div style="font-size: 0.8rem; color: var(--text-muted);">Overall Score</div>
          </div>

          <div style="background: rgba(255,255,255,0.04); border: var(--glass-border); padding: 1.25rem 2rem; border-radius: var(--radius-md);">
            <div style="font-size: 2rem; font-weight: 800; color: var(--accent-success);">${correctCount} / ${test.totalQuestions}</div>
            <div style="font-size: 0.8rem; color: var(--text-muted);">Correct Answers</div>
          </div>
        </div>

        <h3 style="font-size: 1.25rem; text-align: left; margin-bottom: 1rem;">Detailed Solution Breakdown & Formulas</h3>

        <div style="display: flex; flex-direction: column; gap: 1rem; text-align: left; margin-bottom: 2rem;">
          ${test.questions.map((q, idx) => {
            const isCorrect = userAnswers[q.id] === q.correctIndex;
            return `
              <div style="background: rgba(255,255,255,0.03); border: 1px solid ${isCorrect ? 'rgba(16, 185, 129, 0.3)' : 'rgba(244, 63, 94, 0.3)'}; padding: 1.25rem; border-radius: var(--radius-sm);">
                <div style="display: flex; justify-content: space-between; font-weight: 600; margin-bottom: 0.5rem;">
                  <span>Q${idx + 1}. ${q.question}</span>
                  <span class="${isCorrect ? 'badge badge-success' : 'badge badge-danger'}">${isCorrect ? 'Correct' : 'Incorrect'}</span>
                </div>
                <div style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 0.5rem;">
                  <strong>Formula/Concept:</strong> ${q.formula || 'Core Concept'}
                </div>
                <div style="font-size: 0.85rem; color: var(--text-main); white-space: pre-line; background: rgba(0,0,0,0.3); padding: 0.75rem; border-radius: 6px;">
                  ${q.explanation}
                </div>
              </div>
            `;
          }).join('')}
        </div>

        <button class="btn btn-primary" id="btn-back-tests">Return to Mock Tests Catalog</button>
      </div>
    `;

    containerEl.querySelector('#btn-back-tests').addEventListener('click', () => {
      containerEl.innerHTML = renderMockTests();
      attachStartTestListeners(containerEl);
    });
  }

  // Start Countdown Timer
  timerInterval = setInterval(() => {
    timeRemainingSeconds--;
    if (timeRemainingSeconds <= 0) {
      clearInterval(timerInterval);
      finishTest();
    } else {
      const timerEl = containerEl.querySelector('.quiz-timer span');
      if (timerEl) {
        const minutes = Math.floor(timeRemainingSeconds / 60);
        const seconds = timeRemainingSeconds % 60;
        timerEl.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
      }
    }
  }, 1000);

  renderQuestionScreen();
}

export function attachStartTestListeners(containerEl) {
  containerEl.querySelectorAll('.start-test-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const testId = btn.getAttribute('data-test-id');
      initMockTestRunner(testId, containerEl);
    });
  });
}
