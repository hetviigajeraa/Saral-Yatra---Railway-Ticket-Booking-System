import React from 'react';
import { Link } from 'react-router-dom';
import { useT } from '../../context/LanguageContext';
import { popularRoutes } from '../../data/routes';
import './PopularRoutes.css';

export default function PopularRoutes() {
  const t = useT();

  // Show only first 4 on homepage
  const displayed = popularRoutes.slice(0, 4);

  return (
    <section className="popular section" aria-labelledby="popular-heading">
      <div className="container">

        <div className="popular-header">
          <div>
            <h2 className="section-title" id="popular-heading">
              {t.popularRoutes.title}
            </h2>
            <p className="section-subtitle">{t.popularRoutes.subtitle}</p>
          </div>
          <Link to="/trains" className="popular-view-all">
            {t.popularRoutes.viewAll} →
          </Link>
        </div>

        <div className="popular-grid" role="list">
          {displayed.map((route) => (
            <RouteCard key={route.id} route={route} t={t} />
          ))}
        </div>

      </div>
    </section>
  );
}

function RouteCard({ route, t }) {
  return (
    <Link
      to={`/trains?from=${route.fromCode}&to=${route.toCode}`}
      className="rcard"
      role="listitem"
      aria-label={`${route.fromCity} to ${route.toCity} — from ₹${route.lowestFare}`}
    >
      {/* Top accent */}
      <span
        className="rcard-accent"
        style={{ background: route.color }}
        aria-hidden="true"
      />

      <div className="rcard-body">

        {/* Route cities */}
        <div className="rcard-route">
          <div className="rcard-city">
            <span className="rcard-city-name">{route.fromCity}</span>
            <span className="rcard-station">{route.from}</span>
          </div>

          <div className="rcard-route-mid" aria-hidden="true">
            <span className="rcard-emoji">{route.emoji}</span>
            <div className="rcard-route-line">
              <span className="rcard-dot" />
              <span className="rcard-dash" />
              <span className="rcard-arrow">→</span>
            </div>
          </div>

          <div className="rcard-city rcard-city-right">
            <span className="rcard-city-name">{route.toCity}</span>
            <span className="rcard-station">{route.to}</span>
          </div>
        </div>

        {/* Metadata row */}
        <div className="rcard-meta">
          <div className="rcard-meta-item">
            <span className="rcard-meta-label">{t.popularRoutes.from_label}</span>
            <span className="rcard-meta-val">₹{route.lowestFare.toLocaleString('en-IN')}</span>
          </div>
          <div className="rcard-meta-sep" aria-hidden="true" />
          <div className="rcard-meta-item">
            <span className="rcard-meta-label">{t.popularRoutes.duration}</span>
            <span className="rcard-meta-val">{route.duration}</span>
          </div>
          <div className="rcard-meta-sep" aria-hidden="true" />
          <div className="rcard-meta-item">
            <span className="rcard-meta-label">{t.popularRoutes.dailyTrains}</span>
            <span className="rcard-meta-val">{route.trainsPerDay}</span>
          </div>
        </div>

        {/* Train highlight */}
        <div className="rcard-highlight">
          <TrainIcon />
          <span>{route.highlight}</span>
        </div>

      </div>
    </Link>
  );
}

function TrainIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="4" width="18" height="12" rx="3" stroke="currentColor" strokeWidth="2"/>
      <path d="M3 13h18" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="7.5" cy="18.5" r="1.5" fill="currentColor"/>
      <circle cx="16.5" cy="18.5" r="1.5" fill="currentColor"/>
    </svg>
  );
}
