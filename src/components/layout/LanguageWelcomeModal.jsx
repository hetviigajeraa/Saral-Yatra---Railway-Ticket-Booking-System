import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import './LanguageWelcomeModal.css';

export default function LanguageWelcomeModal() {
  const { showWelcomeModal, selectInitialLanguage } = useLanguage();

  if (!showWelcomeModal) return null;

  return (
    <div
      className="lang-modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="lang-modal-title"
    >
      <div className="lang-modal-card">
        {/* Brand Header */}
        <div className="lang-modal-brand">
          <div className="lang-logo-icon" aria-hidden="true">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="4" width="18" height="12" rx="3" stroke="currentColor" strokeWidth="1.8"/>
              <path d="M3 13h18" stroke="currentColor" strokeWidth="1.8"/>
              <circle cx="7.5" cy="18.5" r="1.5" fill="currentColor"/>
              <circle cx="16.5" cy="18.5" r="1.5" fill="currentColor"/>
            </svg>
          </div>
          <span className="lang-brand-name">
            SARAL<span className="lang-brand-accent">YATRA</span>
          </span>
          <p className="lang-brand-tagline">Smarter journeys. Simpler choices.</p>
        </div>

        <div className="lang-modal-divider" aria-hidden="true" />

        {/* Welcome Copy */}
        <div className="lang-modal-content">
          <h1 className="lang-modal-title" id="lang-modal-title">
            Welcome to SaralYatra
          </h1>
          <p className="lang-modal-subtitle">Choose your language / अपनी भाषा चुनें</p>

          {/* Large Language Option Buttons */}
          <div className="lang-btn-group">
            <button
              type="button"
              className="lang-select-btn"
              onClick={() => selectInitialLanguage('en')}
            >
              <div className="lang-btn-main">
                <span className="lang-btn-name">English</span>
                <span className="lang-btn-arrow">→</span>
              </div>
              <span className="lang-btn-sub">Continue in English</span>
            </button>

            <button
              type="button"
              className="lang-select-btn"
              onClick={() => selectInitialLanguage('hi')}
            >
              <div className="lang-btn-main">
                <span className="lang-btn-name" lang="hi">हिन्दी</span>
                <span className="lang-btn-arrow">→</span>
              </div>
              <span className="lang-btn-sub" lang="hi">हिन्दी में आगे बढ़ें</span>
            </button>
          </div>

          <p className="lang-help-note">
            You can change your language anytime from the menu.
          </p>
        </div>
      </div>
    </div>
  );
}
