import React, { useState } from 'react';
import { useT } from '../../context/LanguageContext';
import './TrainCard.css';

export default function TrainCard({ train, onSelect, onViewDetails }) {
  const t = useT();
  const [selectedClassCode, setSelectedClassCode] = useState(train.classes[0]?.code);

  const selectedClass = train.classes.find(c => c.code === selectedClassCode) || train.classes[0];
  const isRecommended = train.aiRecommended;

  return (
    <article className={`tcard ${isRecommended ? 'tcard--recommended' : ''}`}>
      {/* Recommended Top Ribbon / Callout */}
      {isRecommended && (
        <div className="tcard-reco-banner">
          <div className="tcard-reco-tag">
            <span className="tcard-reco-star" aria-hidden="true">✨</span>
            <span className="tcard-reco-label">Recommended for you</span>
          </div>
          <div className="tcard-reco-score">
            <span className="score-val">{train.aiScore || 92}</span>
            <span className="score-denom">/100</span>
          </div>
        </div>
      )}

      {/* Top Header / Identity */}
      <div className="tcard-top">
        <div className="tcard-identity">
          <div className="tcard-name-row">
            <h3 className="tcard-name">{train.name}</h3>
            <span className="tcard-number">#{train.number}</span>
          </div>
          <div className="tcard-sub-info">
            <span className="tcard-type">{train.type}</span>
            <span className="tcard-dot">•</span>
            <span className="tcard-runs">{t.results.runs}: {train.runsOn}</span>
          </div>
        </div>
      </div>

      {/* Schedule Row */}
      <div className="tcard-schedule">
        <div className="tcard-time-block">
          <span className="tcard-time">{train.departureTime}</span>
          <span className="tcard-station-name">{train.from}</span>
          <span className="tcard-station-code">{train.fromCode}</span>
        </div>

        <div className="tcard-duration-block">
          <span className="tcard-duration">{train.duration}</span>
          <div className="tcard-track-line">
            <span className="tcard-track-dot start" />
            <span className="tcard-line" />
            <span className="tcard-track-dot end" />
          </div>
          <span className="tcard-distance">{train.distance} km</span>
        </div>

        <div className="tcard-time-block tcard-time-right">
          <span className="tcard-time">{train.arrivalTime}</span>
          <span className="tcard-station-name">{train.to}</span>
          <span className="tcard-station-code">{train.toCode}</span>
        </div>
      </div>

      {/* AI Explanation Banner (subtle and professional) */}
      {isRecommended && (
        <div className="tcard-ai-explanation">
          <span className="explanation-icon" aria-hidden="true">💡</span>
          <p className="explanation-text">
            {train.aiReason || 'Good balance of fare, journey time and seat availability.'}
          </p>
        </div>
      )}

      {/* Class Selector Grid */}
      <div className="tcard-classes-section">
        <div className="tcard-classes-grid">
          {train.classes.map((cls) => {
            const isSelected = cls.code === selectedClassCode;
            return (
              <button
                key={cls.code}
                type="button"
                className={`tcard-class-chip ${isSelected ? 'tcard-class-chip--selected' : ''}`}
                onClick={() => setSelectedClassCode(cls.code)}
              >
                <div className="tcard-chip-top">
                  <span className="tcard-chip-code">{cls.code}</span>
                  <span className="tcard-chip-fare">₹{cls.fare}</span>
                </div>
                <div className="tcard-chip-bottom">
                  <span className={`tcard-chip-status tcard-chip-status--${cls.status.toLowerCase()}`}>
                    {cls.status === 'AVAILABLE' ? `${cls.available} seats` : cls.status}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Footer / CTA Actions */}
      <div className="tcard-footer">
        <div className="tcard-fare-summary">
          <span className="tcard-fare-label">{selectedClass.name}</span>
          <span className="tcard-fare-amount">₹{selectedClass.fare}</span>
        </div>

        <div className="tcard-actions">
          <button
            type="button"
            className="tcard-btn-secondary"
            onClick={() => onViewDetails(train)}
          >
            {t.results.viewDetails}
          </button>
          <button
            type="button"
            className="tcard-btn-primary"
            onClick={() => onSelect(train)}
          >
            {t.results.bookNow}
          </button>
        </div>
      </div>
    </article>
  );
}
