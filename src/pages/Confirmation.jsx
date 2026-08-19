import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useT } from '../context/LanguageContext';
import './Confirmation.css';

export default function Confirmation() {
  const [params] = useSearchParams();
  const t = useT();
  const urlPnr = params.get('pnr');

  const [showTicketModal, setShowTicketModal] = useState(false);

  // Load or construct active booking object
  const booking = useMemo(() => {
    let active = null;
    try {
      const raw = sessionStorage.getItem('saralyatra_active_booking');
      if (raw) active = JSON.parse(raw);
    } catch (e) {
      // Ignore
    }

    const pnr = urlPnr || active?.pnr || '8420193751';
    const bookingId = active?.bookingId || `SY-2026-${pnr.slice(-5)}`;

    return {
      pnr,
      bookingId,
      status: 'CONFIRMED',
      train: active?.train || {
        number: '22435',
        name: 'Vande Bharat Express',
        type: 'Vande Bharat',
        from: 'Mumbai Central',
        fromCode: 'BCT',
        to: 'Ahmedabad Junction',
        toCode: 'ADI',
        departureTime: '06:10',
        arrivalTime: '12:40',
        duration: '6h 30m',
        distance: 492,
      },
      date: active?.formattedDate || 'Sat, 15 Aug 2026',
      classObj: active?.classObj || { code: '3A', name: '3 Tier AC' },
      passengers: active?.passengers || [
        { fullName: 'Rahul Sharma', age: '28', gender: 'M', berthPreference: 'LOWER' },
        { fullName: 'Priya Sharma', age: '26', gender: 'F', berthPreference: 'UPPER' },
      ],
      seats: active?.seats || [
        { id: 'B1-1', number: 1, code: '1 LB', typeName: 'Lower', coach: 'B1' },
        { id: 'B1-3', number: 3, code: '3 UB', typeName: 'Upper', coach: 'B1' },
      ],
      coach: active?.coach || 'B1',
      fare: active?.fare || {
        base: 2500,
        tax: 125,
        fee: 15,
        total: 2640,
      },
      bookedAt: active?.bookedAt || new Date().toISOString(),
    };
  }, [urlPnr]);

  // Save to localStorage under saralyatra_my_trips
  useEffect(() => {
    try {
      const existingRaw = localStorage.getItem('saralyatra_my_trips');
      let trips = existingRaw ? JSON.parse(existingRaw) : [];
      if (!Array.isArray(trips)) trips = [];

      // Avoid duplicates
      const exists = trips.some(t => t.pnr === booking.pnr);
      if (!exists) {
        trips.unshift(booking);
        localStorage.setItem('saralyatra_my_trips', JSON.stringify(trips));
      }
    } catch (e) {
      console.error('Failed to save trip to localStorage', e);
    }
  }, [booking]);

  return (
    <div className="cfm-page page-main">
      <div className="container cfm-container">
        {/* Success Header */}
        <div className="cfm-card cfm-success-card">
          <div className="cfm-icon-circle">
            <span>✓</span>
          </div>
          <h1 className="cfm-heading">Booking Confirmed!</h1>
          <p className="cfm-subheading">
            Your train ticket has been booked successfully. A copy has been saved to your account.
          </p>

          <div className="cfm-pnr-banner">
            <div className="pnr-block">
              <span className="pnr-label">PNR NUMBER</span>
              <span className="pnr-value">{booking.pnr}</span>
            </div>
            <div className="pnr-divider" />
            <div className="pnr-block">
              <span className="pnr-label">BOOKING ID</span>
              <span className="pnr-value">{booking.bookingId}</span>
            </div>
          </div>
        </div>

        {/* Details Card */}
        <div className="cfm-card cfm-details-card">
          <h2 className="cfm-section-title">Journey Overview</h2>

          {/* Train info */}
          <div className="cfm-train-row">
            <div>
              <h3 className="cfm-train-name">{booking.train.name}</h3>
              <p className="cfm-train-num">#{booking.train.number} • {booking.train.type}</p>
            </div>
            <span className="cfm-class-badge">{booking.classObj.name} ({booking.classObj.code})</span>
          </div>

          {/* Route info */}
          <div className="cfm-route-box">
            <div className="cfm-endpoint">
              <span className="cfm-time">{booking.train.departureTime}</span>
              <span className="cfm-st-name">{booking.train.from}</span>
              <span className="cfm-st-code">({booking.train.fromCode})</span>
            </div>
            <div className="cfm-mid">
              <span className="cfm-dur">{booking.train.duration}</span>
              <div className="cfm-track">
                <span className="cfm-dot" />
                <span className="cfm-line" />
                <span className="cfm-dot" />
              </div>
              <span className="cfm-dist">{booking.train.distance} km</span>
            </div>
            <div className="cfm-endpoint cfm-endpoint-right">
              <span className="cfm-time">{booking.train.arrivalTime}</span>
              <span className="cfm-st-name">{booking.train.to}</span>
              <span className="cfm-st-code">({booking.train.toCode})</span>
            </div>
          </div>

          <div className="cfm-date-info">
            📅 Journey Date: <strong>{booking.date}</strong>
          </div>

          {/* Passengers & Seats Grid */}
          <div className="cfm-passengers-section">
            <h3 className="cfm-sub-title">Passengers & Seats (Coach {booking.coach})</h3>
            <div className="cfm-psg-grid">
              {booking.passengers.map((p, idx) => {
                const s = booking.seats[idx] || booking.seats[0];
                return (
                  <div key={idx} className="cfm-psg-card">
                    <div className="cfm-psg-head">
                      <span className="psg-name">{p.fullName}</span>
                      <span className="psg-meta">{p.age} yrs • {p.gender}</span>
                    </div>
                    <div className="cfm-seat-tag">
                      Coach {booking.coach} • Seat {s.number} ({s.code})
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Total Fare Row */}
          <div className="cfm-fare-row">
            <span className="fare-label">Total Amount Paid:</span>
            <span className="fare-amount">₹{booking.fare.total.toLocaleString('en-IN')}</span>
          </div>
        </div>

        {/* Action CTAs */}
        <div className="cfm-actions-row">
          <button
            type="button"
            className="cfm-btn cfm-btn-primary"
            onClick={() => setShowTicketModal(true)}
          >
            📄 View Ticket
          </button>
          <Link to="/trips" className="cfm-btn cfm-btn-secondary">
            🧳 My Trips
          </Link>
          <Link to="/" className="cfm-btn cfm-btn-outline">
            🚆 Book Another Ticket
          </Link>
        </div>
      </div>

      {/* E-Ticket Modal */}
      {showTicketModal && (
        <div className="tkt-modal-overlay" onClick={() => setShowTicketModal(false)}>
          <div className="tkt-modal" onClick={e => e.stopPropagation()}>
            <div className="tkt-header">
              <div className="tkt-brand">
                <span>SARAL YATRA E-TICKET</span>
              </div>
              <button type="button" className="tkt-close-btn" onClick={() => setShowTicketModal(false)}>✕</button>
            </div>

            <div className="tkt-body">
              <div className="tkt-pnr-row">
                <div>
                  <span className="tkt-lbl">PNR</span>
                  <span className="tkt-val">{booking.pnr}</span>
                </div>
                <div>
                  <span className="tkt-lbl">STATUS</span>
                  <span className="tkt-status-pill">CONFIRMED</span>
                </div>
              </div>

              <div className="tkt-train-row">
                <span className="tkt-name">{booking.train.name} (#{booking.train.number})</span>
                <span className="tkt-cls">{booking.classObj.code}</span>
              </div>

              <div className="tkt-route-row">
                <span>{booking.train.fromCode} {booking.train.departureTime}</span>
                <span>→</span>
                <span>{booking.train.toCode} {booking.train.arrivalTime}</span>
              </div>

              <div className="tkt-psg-list">
                {booking.passengers.map((p, idx) => (
                  <div key={idx} className="tkt-psg-row">
                    <span>{p.fullName}</span>
                    <span>Seat {booking.seats[idx]?.number} ({booking.seats[idx]?.code})</span>
                  </div>
                ))}
              </div>

              <div className="tkt-qr-stub">
                <div className="fake-qr">
                  <span>📱 QR VERIFIED</span>
                </div>
                <p className="tkt-qr-sub">Scan on train for conductor verification</p>
              </div>
            </div>

            <div className="tkt-footer">
              <button type="button" className="cfm-btn cfm-btn-primary" onClick={() => window.print()}>
                🖨️ Print / Download Ticket
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
