import React, { useRef } from 'react';
import { useT } from '../../context/LanguageContext';
import BookingCard from './BookingCard';
import heroImage from '../../assets/hero-train.png';
import './HeroSection.css';

export default function HeroSection({ aiSectionRef }) {
  function scrollToAI() {
    aiSectionRef?.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  const t = useT();

  return (
    <section className="hero" aria-label="Homepage hero">
      {/* Background */}
      <div className="hero-bg" aria-hidden="true">
        <img src={heroImage} alt="" className="hero-bg-img" loading="eager" fetchpriority="high" />
        <div className="hero-bg-overlay" />
      </div>

      <div className="container hero-inner">
        {/* Left column: editorial copy */}
        <div className="hero-copy">
          <p className="hero-badge" aria-label={t.hero.badge}>
            <span className="hero-badge-dot" aria-hidden="true" />
            {t.hero.badge}
          </p>

          <h1 className="hero-h1">{t.hero.headline}</h1>

          <p className="hero-sub">{t.hero.subheading}</p>

          {/* Quick stats — honest and compact */}
          <div className="hero-stats" aria-label="Platform highlights">
            <div className="hero-stat">
              <span className="hero-stat-val">500+</span>
              <span className="hero-stat-key">Routes</span>
            </div>
            <div className="hero-stat-sep" aria-hidden="true" />
            <div className="hero-stat">
              <span className="hero-stat-val">AI</span>
              <span className="hero-stat-key">Assist</span>
            </div>
            <div className="hero-stat-sep" aria-hidden="true" />
            <div className="hero-stat">
              <span className="hero-stat-val" lang="hi">EN+हि</span>
              <span className="hero-stat-key">Bilingual</span>
            </div>
          </div>
        </div>

        {/* Right column: booking card */}
        <div className="hero-card">
          <BookingCard onAiClick={scrollToAI} />
        </div>
      </div>

      {/* Scroll hint */}
      <div className="hero-scroll-hint" aria-hidden="true">
        <span className="hero-scroll-line" />
      </div>
    </section>
  );
}
