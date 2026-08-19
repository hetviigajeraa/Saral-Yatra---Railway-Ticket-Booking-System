import React from 'react';
import { useT } from '../../context/LanguageContext';
import './WhySaralYatra.css';

const FEATURES = [
  { key: 'recommendations', icon: <RecommendIcon /> },
  { key: 'clarity',         icon: <ClarityIcon /> },
  { key: 'bilingual',       icon: <BilingualIcon /> },
  { key: 'booking',         icon: <BookingIcon /> },
  { key: 'responsive',      icon: <DeviceIcon /> },
];

export default function WhySaralYatra() {
  const t = useT();

  return (
    <section className="why section" aria-labelledby="why-heading">
      <div className="container">

        <div className="why-header">
          <h2 className="section-title" id="why-heading">{t.whySection.title}</h2>
          <p className="section-subtitle why-subtitle-center">{t.whySection.subtitle}</p>
        </div>

        <div className="why-grid" role="list">
          {FEATURES.map(f => {
            const feat = t.whySection.features[f.key];
            return (
              <div key={f.key} className="why-card" role="listitem">
                <div className="why-icon" aria-hidden="true">{f.icon}</div>
                <h3 className="why-feat-title">{feat.title}</h3>
                <p className="why-feat-desc">{feat.desc}</p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

function RecommendIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M12 2l2.4 7.2H22l-6.2 4.5 2.4 7.3L12 17l-6.2 4 2.4-7.3L2 9.2h7.6L12 2z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round"/>
    </svg>
  );
}
function ClarityIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="3" width="18" height="18" rx="3" stroke="currentColor" strokeWidth="1.7"/>
      <path d="M7 9h10M7 13h6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/>
    </svg>
  );
}
function BilingualIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.7"/>
      <path d="M3 12h18M12 3c-2 3-3 5.5-3 9s1 6 3 9M12 3c2 3 3 5.5 3 9s-1 6-3 9" stroke="currentColor" strokeWidth="1.7"/>
    </svg>
  );
}
function BookingIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" stroke="currentColor" strokeWidth="1.7"/>
      <rect x="9" y="3" width="6" height="4" rx="1.5" stroke="currentColor" strokeWidth="1.7"/>
      <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}
function DeviceIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <rect x="5" y="2" width="9" height="14" rx="2" stroke="currentColor" strokeWidth="1.7"/>
      <path d="M9 18h1" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/>
      <rect x="15" y="8" width="6" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.7"/>
      <path d="M18 18h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}
