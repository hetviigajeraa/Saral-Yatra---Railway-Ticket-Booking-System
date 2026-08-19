import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useT } from '../../context/LanguageContext';
import './SearchSummaryBar.css';

export default function SearchSummaryBar({
  fromCode,
  toCode,
  fromLabel,
  toLabel,
  date,
  adults,
  cls,
}) {
  const t = useT();
  const navigate = useNavigate();

  const formattedDate = date
    ? new Date(date).toLocaleDateString('en-IN', {
        weekday: 'short',
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      })
    : '15 Aug 2026';

  return (
    <div className="search-bar-wrap">
      <div className="container search-bar-inner">
        <div className="search-summary-info">
          <div className="search-summary-route">
            <span className="search-summary-station">{fromLabel || 'Mumbai Central'}</span>
            <span className="search-summary-arrow" aria-hidden="true">→</span>
            <span className="search-summary-station">{toLabel || 'Ahmedabad'}</span>
          </div>
          <div className="search-summary-meta">
            <span className="search-meta-item">📅 {formattedDate}</span>
            <span className="search-meta-dot">•</span>
            <span className="search-meta-item">👤 {adults} Adult{adults > 1 ? 's' : ''}</span>
            {cls && (
              <>
                <span className="search-meta-dot">•</span>
                <span className="search-meta-item">💺 {cls}</span>
              </>
            )}
          </div>
        </div>

        <button
          type="button"
          className="search-summary-edit-btn"
          onClick={() => navigate('/')}
        >
          ✏️ {t.common.edit}
        </button>
      </div>
    </div>
  );
}
