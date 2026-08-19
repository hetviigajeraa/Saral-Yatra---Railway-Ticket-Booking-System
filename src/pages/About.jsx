import React from 'react';
import PlaceholderPage from '../components/layout/PlaceholderPage';

export default function About() {
  return (
    <PlaceholderPage
      title="About SaralYatra"
      subtitle="SaralYatra is a college AI project exploring how modern design and AI recommendations can make Indian railway travel simpler and less confusing."
      badge="Academic Project"
      icon={<AboutIcon />}
    />
  );
}

function AboutIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8"/>
      <path d="M12 8v4M12 16h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}
