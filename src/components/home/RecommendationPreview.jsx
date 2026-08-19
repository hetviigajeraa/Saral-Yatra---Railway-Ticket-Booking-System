import React, { useState, forwardRef } from 'react';
import { Link } from 'react-router-dom';
import { useT } from '../../context/LanguageContext';
import { featuredRecommendation } from '../../data/trains';
import './RecommendationPreview.css';

const RecommendationPreview = forwardRef(function RecommendationPreview(_, ref) {
  const t = useT();
  const train = featuredRecommendation;
  const cls = train.classes[0];
  const [whyOpen, setWhyOpen] = useState(false);

  return (
    <section
      ref={ref}
      className="reco section"
      aria-labelledby="reco-heading"
    >
      <div className="container reco-inner">

        {/* ---- Left: Copy ---- */}
        <div className="reco-copy">
          <p className="reco-eyebrow">{t.aiSection.sectionLabel}</p>
          <h2 className="reco-heading" id="reco-heading">
            {t.aiSection.title}
          </h2>
          <p className="reco-desc">{t.aiSection.subtitle}</p>

          <ul className="reco-bullets" aria-label="How it works">
            {t.aiSection.bullets.map((b, i) => (
              <li key={i} className="reco-bullet">
                <span className="reco-bullet-check" aria-hidden="true"><CheckIcon /></span>
                <span>{b}</span>
              </li>
            ))}
          </ul>

          <Link to="/trains" className="reco-cta">
            {t.aiSection.tryFeature}
            <ArrowIcon />
          </Link>

          <p className="reco-demo-note">
            <span className="reco-demo-pill">Demo</span>
            {t.aiSection.demoNote}
          </p>
        </div>

        {/* ---- Right: Train card ---- */}
        <div className="reco-card-outer">

          {/* Score badge */}
          <div className="reco-score-badge" aria-label={`${t.aiSection.score}: ${train.aiScore}/100`}>
            <span className="reco-score-num">{train.aiScore}</span>
            <span className="reco-score-denom">/100</span>
          </div>

          <article className="reco-card" aria-label="Sample AI recommendation">

            {/* Header tags */}
            <div className="reco-card-tags">
              <span className="reco-tag-best">
                <StarIcon />{t.aiSection.bestMatch}
              </span>
              <span className="reco-tag-type">{train.type}</span>
            </div>

            {/* Train identity */}
            <div className="reco-train-id">
              <div>
                <h3 className="reco-train-name">{train.name}</h3>
                <p className="reco-train-num">#{train.number}</p>
              </div>
            </div>

            {/* Journey timeline */}
            <div className="reco-journey" aria-label="Journey details">
              <div className="reco-endpoint">
                <span className="reco-time">{train.departureTime}</span>
                <span className="reco-station">{train.from}</span>
                <span className="reco-code">{train.fromCode}</span>
              </div>

              <div className="reco-mid">
                <span className="reco-dur-label">{train.duration}</span>
                <div className="reco-track" aria-hidden="true">
                  <span className="reco-track-dot reco-track-dot-l" />
                  <span className="reco-track-line" />
                  <span className="reco-track-dot reco-track-dot-r" />
                </div>
                <span className="reco-dist-label">{train.distance} km</span>
              </div>

              <div className="reco-endpoint reco-endpoint-right">
                <span className="reco-time">{train.arrivalTime}</span>
                <span className="reco-station">{train.to}</span>
                <span className="reco-code">{train.toCode}</span>
              </div>
            </div>

            {/* Fare + Availability */}
            <div className="reco-fare-avail">
              <div className="reco-fare">
                <span className="reco-fare-sym">₹</span>
                <span className="reco-fare-val">{cls.fare.toLocaleString('en-IN')}</span>
                <span className="reco-fare-cls">{cls.name}</span>
              </div>
              <div className="reco-avail">
                <span className="reco-avail-dot" aria-hidden="true" />
                {t.aiSection.seatsAvailable(cls.available)}
              </div>
            </div>

            {/* Score bar */}
            <div className="reco-score-bar-wrap">
              <div className="reco-score-bar-row">
                <span className="reco-score-bar-label">{t.aiSection.score}</span>
                <span className="reco-score-bar-val">{train.aiScore}/100</span>
              </div>
              <div
                className="reco-score-track"
                role="progressbar"
                aria-valuenow={train.aiScore}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={`${t.aiSection.score}: ${train.aiScore}`}
              >
                <div className="reco-score-fill" style={{ width: `${train.aiScore}%` }} />
              </div>
            </div>

            {/* Why this train — expandable */}
            <div className="reco-why-wrap">
              <button
                className="reco-why-btn"
                onClick={() => setWhyOpen(v => !v)}
                aria-expanded={whyOpen}
                aria-controls="reco-why-content"
              >
                <WhyIcon />
                {t.aiSection.whyThisTrain}
                <span className={`reco-why-chevron${whyOpen ? ' reco-why-chevron-open' : ''}`} aria-hidden="true">
                  <ChevronIcon />
                </span>
              </button>

              <div
                id="reco-why-content"
                className={`reco-why-content${whyOpen ? ' reco-why-content-open' : ''}`}
                aria-hidden={!whyOpen}
              >
                <p className="reco-why-text">{t.aiSection.whyExplanation}</p>
              </div>
            </div>

          </article>
        </div>

      </div>
    </section>
  );
});

export default RecommendationPreview;

/* ---- Icons ---- */
function StarIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2l2.4 7.2H22l-6.2 4.5 2.4 7.3L12 17l-6.2 4 2.4-7.3L2 9.2h7.6z"/>
    </svg>
  );
}
function CheckIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 12l5 5L20 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}
function ArrowIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}
function WhyIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.7"/>
      <path d="M12 8v4M12 16h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}
function ChevronIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}
