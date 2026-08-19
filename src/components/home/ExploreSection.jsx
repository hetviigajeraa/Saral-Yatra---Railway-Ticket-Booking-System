import React from 'react';
import { Link } from 'react-router-dom';
import { useT } from '../../context/LanguageContext';
import './ExploreSection.css';

const CATEGORIES = [
  {
    key: 'weekend',
    to: '/trains?type=weekend',
    icon: <WeekendIcon />,
    color: '#2D7A3A',
    colorBg: '#EBF5ED',
  },
  {
    key: 'fast',
    to: '/trains?type=fast',
    icon: <FastIcon />,
    color: '#E8590C',
    colorBg: '#FEF0E8',
  },
  {
    key: 'popular',
    to: '/trains?type=popular',
    icon: <PopularIcon />,
    color: '#1B5FA8',
    colorBg: '#EBF3FD',
  },
  {
    key: 'comfortable',
    to: '/trains?type=comfortable',
    icon: <ComfortIcon />,
    color: '#B7791F',
    colorBg: '#FEF3C7',
  },
];

export default function ExploreSection() {
  const t = useT();

  return (
    <section className="explore section" aria-labelledby="explore-heading">
      <div className="container">

        <div className="explore-header">
          <div>
            <h2 className="section-title" id="explore-heading">
              {t.explore.title}
            </h2>
            <p className="section-subtitle">{t.explore.subtitle}</p>
          </div>
        </div>

        <div className="explore-grid" role="list">
          {CATEGORIES.map((cat) => {
            const data = t.explore.categories[cat.key];
            return (
              <Link
                key={cat.key}
                to={cat.to}
                className="explore-card"
                role="listitem"
                aria-label={data.title}
              >
                <div
                  className="explore-card-icon"
                  style={{ background: cat.colorBg, color: cat.color }}
                  aria-hidden="true"
                >
                  {cat.icon}
                </div>

                <div className="explore-card-body">
                  <h3 className="explore-card-title">{data.title}</h3>
                  <p className="explore-card-desc">{data.desc}</p>
                </div>

                <div className="explore-card-footer">
                  <span
                    className="explore-tag"
                    style={{ background: cat.colorBg, color: cat.color }}
                  >
                    {data.tag}
                  </span>
                  <span className="explore-arrow" aria-hidden="true">
                    <ArrowIcon />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

      </div>
    </section>
  );
}

/* ---- Icons ---- */
function WeekendIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8"/>
      <path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  );
}

function FastIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>
    </svg>
  );
}

function PopularIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="4" width="18" height="12" rx="3" stroke="currentColor" strokeWidth="1.8"/>
      <path d="M3 13h18" stroke="currentColor" strokeWidth="1.8"/>
      <circle cx="7.5" cy="18.5" r="1.5" fill="currentColor"/>
      <circle cx="16.5" cy="18.5" r="1.5" fill="currentColor"/>
    </svg>
  );
}

function ComfortIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 5v9a2 2 0 002 2h10a2 2 0 002-2V5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      <path d="M3 16h18M8 20h8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}
