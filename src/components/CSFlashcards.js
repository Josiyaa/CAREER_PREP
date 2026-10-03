// CS Core Flashcards Revision Component

import { flashcardsData } from '../data/flashcards.js';

export function renderCSFlashcards() {
  return `
    <div class="flashcards-page-container">
      <div class="page-header">
        <div>
          <h1 class="page-title">CS Core <span class="text-gradient">Revision Flashcards</span></h1>
          <p class="page-subtitle">Quick memory recall drills for Operating Systems, DBMS, Computer Networks, and OOPs concepts.</p>
        </div>
      </div>

      <div class="dashboard-grid">
        ${flashcardsData.map((card, idx) => `
          <div class="col-6">
            <div class="flashcard-container glass-card" id="flashcard-${card.id}">
              <div class="flashcard-inner">
                <div class="flashcard-front">
                  <div style="display: flex; justify-content: space-between; width: 100%; margin-bottom: 1rem;">
                    <span class="badge badge-secondary">${card.subject}</span>
                    <span class="badge badge-primary">${card.topic}</span>
                  </div>
                  <h3 style="font-size: 1.15rem; color: #fff; margin-bottom: 1.5rem; text-align: center;">${card.question}</h3>
                  <span style="font-size: 0.8rem; color: var(--accent-primary); font-weight: 600;">🔄 Click to Flip Card</span>
                </div>
                <div class="flashcard-back">
                  <span class="badge badge-success" style="margin-bottom: 0.75rem;">Answer & Explanation</span>
                  <p style="font-size: 0.85rem; color: var(--text-main); white-space: pre-line; line-height: 1.5; text-align: left;">${card.answer}</p>
                  <span style="font-size: 0.75rem; color: var(--text-muted); margin-top: 1rem;">Click again to flip back</span>
                </div>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

export function attachFlashcardListeners(containerEl) {
  containerEl.querySelectorAll('.flashcard-container').forEach(card => {
    card.addEventListener('click', () => {
      card.classList.toggle('flipped');
    });
  });
}
