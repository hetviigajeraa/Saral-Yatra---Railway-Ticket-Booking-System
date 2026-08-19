import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useT } from '../context/LanguageContext';
import BookingCard from '../components/home/BookingCard';
import './Book.css';

const QUICK_ROUTES = [
  { fromCode: 'BCT', fromName: 'Mumbai Central', toCode: 'ADI', toName: 'Ahmedabad' },
  { pnrRoute: 'NDLS-JP', fromCode: 'NDLS', fromName: 'New Delhi', toCode: 'JP', toName: 'Jaipur' },
  { fromCode: 'SBC', fromName: 'Bengaluru', toCode: 'MAS', toName: 'Chennai' },
  { fromCode: 'CST', fromName: 'Mumbai CST', toCode: 'PUNE', toName: 'Pune' },
];

export default function Book() {
  const t = useT();
  const navigate = useNavigate();

  function handleQuickRouteClick(route) {
    navigate(`/trains?from=${route.fromCode}&to=${route.toCode}&date=2026-08-15&adults=2&class=3A`);
  }

  return (
    <div className="book-page page-main">
      {/* Page Header */}
      <div className="book-header-banner">
        <div className="container book-header-content">
          <div className="book-badge">
            <span className="book-badge-dot" aria-hidden="true" />
            Instant Search & Booking
          </div>
          <h1 className="book-title">{t.nav.book} Train Tickets</h1>
          <p className="book-subtitle">
            Find the right train, compare fares, and book seats across 500+ Indian Railway routes.
          </p>
        </div>
      </div>

      {/* Main Search Container */}
      <div className="container book-container">
        <div className="book-card-wrap">
          <BookingCard />
        </div>

        {/* Quick Route Shortcuts */}
        <div className="book-quick-section">
          <h2 className="quick-section-title">Popular Quick Searches</h2>
          <div className="quick-routes-grid">
            {QUICK_ROUTES.map((route, idx) => (
              <button
                key={idx}
                type="button"
                className="quick-route-chip"
                onClick={() => handleQuickRouteClick(route)}
              >
                <span className="chip-from">{route.fromName}</span>
                <span className="chip-arrow">→</span>
                <span className="chip-to">{route.toName}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Booking Benefits Bar */}
        <div className="book-benefits-grid">
          <div className="benefit-item">
            <span className="benefit-icon">⚡</span>
            <div>
              <h3 className="benefit-title">Instant Seat Status</h3>
              <p className="benefit-desc">Real-time availability for 3A, 2A, 1A, SL & Chair Car</p>
            </div>
          </div>
          <div className="benefit-item">
            <span className="benefit-icon">🎯</span>
            <div>
              <h3 className="benefit-title">Smart AI Assistant</h3>
              <p className="benefit-desc">Compare duration, fare & availability in one tap</p>
            </div>
          </div>
          <div className="benefit-item">
            <span className="benefit-icon">🔒</span>
            <div>
              <h3 className="benefit-title">No Hidden Fees</h3>
              <p className="benefit-desc">Transparent pricing with zero surprise charges</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
