// Main Application Entrypoint & Router

import './style.css';
import { renderNavbar } from './components/Navbar.js';
import { renderDashboard } from './components/Dashboard.js';
import { renderMockTests, attachStartTestListeners } from './components/MockTests.js';
import { renderATSResume, attachResumeEventListeners } from './components/ATSResume.js';
import { renderSkillGap, attachSkillGapListeners } from './components/SkillGap.js';
import { renderAIInterview, initInterviewWorkspace } from './components/AIInterview.js';
import { renderJobPortal, attachJobPortalListeners } from './components/JobPortal.js';
import { renderCSFlashcards, attachFlashcardListeners } from './components/CSFlashcards.js';

let currentTab = 'dashboard';

function applyTheme() {
  const savedTheme = localStorage.getItem('placement_theme') || 'light';
  if (savedTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
  } else {
    document.documentElement.removeAttribute('data-theme');
  }
}

function renderApp() {
  applyTheme();

  const appEl = document.querySelector('#app');

  appEl.innerHTML = `
    ${renderNavbar(currentTab)}
    <main class="main-container" id="main-content">
      <!-- Active tab content rendered here -->
    </main>
  `;

  attachGlobalNavbarListeners();
  renderActiveTabContent();
}

function renderActiveTabContent() {
  const container = document.querySelector('#main-content');
  if (!container) return;

  switch (currentTab) {
    case 'dashboard':
      container.innerHTML = renderDashboard(switchTab);
      attachDashboardListeners();
      break;

    case 'mock-tests':
      container.innerHTML = renderMockTests();
      attachStartTestListeners(container);
      break;

    case 'ats-resume':
      container.innerHTML = renderATSResume();
      attachResumeEventListeners(container);
      break;

    case 'skill-gap':
      container.innerHTML = renderSkillGap();
      attachSkillGapListeners(container, () => renderActiveTabContent());
      break;

    case 'ai-interview':
      container.innerHTML = renderAIInterview();
      initInterviewWorkspace(container);
      break;

    case 'job-portal':
      container.innerHTML = renderJobPortal();
      attachJobPortalListeners(container, () => renderActiveTabContent());
      break;

    case 'flashcards':
      container.innerHTML = renderCSFlashcards();
      attachFlashcardListeners(container);
      break;

    default:
      container.innerHTML = renderDashboard(switchTab);
      attachDashboardListeners();
  }
}

function switchTab(newTab) {
  currentTab = newTab;
  renderApp();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function attachGlobalNavbarListeners() {
  // Brand logo
  const logo = document.querySelector('#nav-brand-logo');
  if (logo) logo.addEventListener('click', () => switchTab('dashboard'));

  // Nav buttons
  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const tab = btn.getAttribute('data-tab');
      if (tab) switchTab(tab);
    });
  });

  // Theme toggle
  const themeBtn = document.querySelector('#theme-toggle-btn');
  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      const current = localStorage.getItem('placement_theme') || 'light';
      const newTheme = current === 'dark' ? 'light' : 'dark';
      localStorage.setItem('placement_theme', newTheme);
      renderApp();
    });
  }

  // Notifications toggle
  const notifBtn = document.querySelector('#notif-toggle-btn');
  const notifDropdown = document.querySelector('#notif-dropdown');
  if (notifBtn && notifDropdown) {
    notifBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      notifDropdown.classList.toggle('active');
    });

    document.addEventListener('click', () => {
      notifDropdown.classList.remove('active');
    });
  }
}

function attachDashboardListeners() {
  const quickTestBtn = document.querySelector('#btn-quick-test');
  if (quickTestBtn) quickTestBtn.addEventListener('click', () => switchTab('mock-tests'));

  const changeTargetBtn = document.querySelector('#btn-change-target');
  if (changeTargetBtn) changeTargetBtn.addEventListener('click', () => switchTab('skill-gap'));

  const bannerJobsBtn = document.querySelector('#btn-banner-jobs');
  if (bannerJobsBtn) bannerJobsBtn.addEventListener('click', () => switchTab('job-portal'));

  const cardTests = document.querySelector('#card-goto-tests');
  if (cardTests) cardTests.addEventListener('click', () => switchTab('mock-tests'));

  const cardAts = document.querySelector('#card-goto-ats');
  if (cardAts) cardAts.addEventListener('click', () => switchTab('ats-resume'));

  const cardAi = document.querySelector('#card-goto-ai');
  if (cardAi) cardAi.addEventListener('click', () => switchTab('ai-interview'));
}

// Global Custom Event Listener for dynamic navigation
window.addEventListener('nav-tab', (e) => {
  if (e.detail) switchTab(e.detail);
});

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
  renderApp();
});

// If Vite DOM is already ready
if (document.readyState === 'interactive' || document.readyState === 'complete') {
  renderApp();
}
