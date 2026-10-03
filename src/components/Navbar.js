// Navigation Bar Component

import { getUserProfile } from '../utils/storage.js';

export function renderNavbar(activeTab, onTabChange) {
  const profile = getUserProfile();
  const currentTheme = localStorage.getItem('placement_theme') || 'light';

  return `
    <nav class="navbar">
      <div class="nav-brand" id="nav-brand-logo">
        <div class="nav-brand-icon">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
            <path d="M6 12v5c3 3 9 3 12 0v-5"/>
          </svg>
        </div>
        <span>Career<span class="text-gradient">Prep</span></span>
      </div>

      <ul class="nav-links">
        <li>
          <button class="nav-btn ${activeTab === 'dashboard' ? 'active' : ''}" data-tab="dashboard">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
            Dashboard
          </button>
        </li>
        <li>
          <button class="nav-btn ${activeTab === 'mock-tests' ? 'active' : ''}" data-tab="mock-tests">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
            Mock Tests
          </button>
        </li>
        <li>
          <button class="nav-btn ${activeTab === 'ats-resume' ? 'active' : ''}" data-tab="ats-resume">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
            ATS Resume
          </button>
        </li>
        <li>
          <button class="nav-btn ${activeTab === 'skill-gap' ? 'active' : ''}" data-tab="skill-gap">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v8M8 12h8"/></svg>
            Skill-Gap Analysis
          </button>
        </li>
        <li>
          <button class="nav-btn ${activeTab === 'ai-interview' ? 'active' : ''}" data-tab="ai-interview">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="22"/></svg>
            AI Interview Prep
          </button>
        </li>
        <li>
          <button class="nav-btn ${activeTab === 'job-portal' ? 'active' : ''}" data-tab="job-portal">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
            Jobs & Tracker
          </button>
        </li>
        <li>
          <button class="nav-btn ${activeTab === 'flashcards' ? 'active' : ''}" data-tab="flashcards">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
            CS Core Flashcards
          </button>
        </li>
      </ul>

      <div class="nav-right">
        <!-- Theme Toggle Button -->
        <button class="theme-toggle-btn" id="theme-toggle-btn" title="Toggle Light/Dark Theme">
          ${currentTheme === 'dark' 
            ? `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`
            : `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`
          }
        </button>

        <div class="streak-badge">
          <span>🔥 5 Day Streak</span>
        </div>

        <button class="notification-btn" id="notif-toggle-btn" title="Placement Notifications">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
          <span class="notification-dot"></span>
        </button>

        <div class="notification-dropdown" id="notif-dropdown">
          <div class="notification-header">
            <span>Placement Alerts & Drives</span>
            <span class="badge badge-primary">2 New</span>
          </div>
          <div class="notification-list">
            ${profile.notifications.map(n => `
              <div class="notification-item">
                <div style="font-weight: 600; font-size: 0.85rem; color: var(--text-main); margin-bottom: 2px;">${n.title}</div>
                <div style="font-size: 0.8rem; color: var(--text-muted);">${n.message}</div>
                <div style="font-size: 0.7rem; color: var(--text-dim); margin-top: 4px;">${n.time}</div>
              </div>
            `).join('')}
          </div>
        </div>

        <div class="user-profile-badge">
          <div class="user-avatar">CP</div>
          <div style="display: flex; flex-direction: column; line-height: 1.2;">
            <span style="font-size: 0.85rem; font-weight: 600; color: var(--text-main);">Student Portal</span>
            <span style="font-size: 0.7rem; color: var(--text-muted);">${profile.batch} Batch</span>
          </div>
        </div>
      </div>
    </nav>
  `;
}
