import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useT } from '../context/LanguageContext';
import './MyTrips.css';

// Seed mock trips if user hasn't booked any yet
const SEED_TRIPS = [
  {
    pnr: '8420193751',
    bookingId: 'SY-2026-93751',
    status: 'CONFIRMED',
    train: {
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
    date: 'Sat, 15 Aug 2026',
    classObj: { code: '3A', name: '3 Tier AC' },
    passengers: [
      { fullName: 'Rahul Sharma', age: '28', gender: 'M', berthPreference: 'LOWER' },
      { fullName: 'Priya Sharma', age: '26', gender: 'F', berthPreference: 'UPPER' },
    ],
    seats: [
      { id: 'B1-1', number: 1, code: '1 LB', typeName: 'Lower', coach: 'B1' },
      { id: 'B1-3', number: 3, code: '3 UB', typeName: 'Upper', coach: 'B1' },
    ],
    coach: 'B1',
    fare: { total: 2640 },
    bookedAt: '2026-08-09T10:00:00.000Z',
  },
  {
    pnr: '6192048512',
    bookingId: 'SY-2026-48512',
    status: 'COMPLETED',
    train: {
      number: '12951',
      name: 'Mumbai Rajdhani Express',
      type: 'Rajdhani',
      from: 'New Delhi',
      fromCode: 'NDLS',
      to: 'Mumbai Central',
      toCode: 'BCT',
      departureTime: '17:00',
      arrivalTime: '08:35',
      duration: '15h 35m',
      distance: 1384,
    },
    date: 'Sun, 10 Jul 2026',
    classObj: { code: '2A', name: '2 Tier AC' },
    passengers: [
      { fullName: 'Rahul Sharma', age: '28', gender: 'M', berthPreference: 'LOWER' },
    ],
    seats: [
      { id: 'A1-12', number: 12, code: '12 LB', typeName: 'Lower', coach: 'A1' },
    ],
    coach: 'A1',
    fare: { total: 2772 },
    bookedAt: '2026-07-05T14:20:00.000Z',
  },
  {
    pnr: '3910582710',
    bookingId: 'SY-2026-82710',
    status: 'CANCELLED',
    train: {
      number: '12009',
      name: 'Shatabdi Express',
      type: 'Shatabdi',
      from: 'Mumbai Central',
      fromCode: 'BCT',
      to: 'Ahmedabad Junction',
      toCode: 'ADI',
      departureTime: '06:25',
      arrivalTime: '13:10',
      duration: '6h 45m',
      distance: 492,
    },
    date: 'Fri, 01 May 2026',
    classObj: { code: 'CC', name: 'Chair Car' },
    passengers: [
      { fullName: 'Rahul Sharma', age: '28', gender: 'M', berthPreference: 'WINDOW' },
    ],
    seats: [
      { id: 'C1-14', number: 14, code: '14 W', typeName: 'Window', coach: 'C1' },
    ],
    coach: 'C1',
    fare: { total: 934 },
    bookedAt: '2026-04-28T09:15:00.000Z',
  },
];

export default function MyTrips() {
  const t = useT();
  const [activeTab, setActiveTab] = useState('UPCOMING'); // UPCOMING, COMPLETED, CANCELLED
  const [trips, setTrips] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [cancelPromptTrip, setCancelPromptTrip] = useState(null);

  // Read from localStorage on mount, seed if empty
  useEffect(() => {
    try {
      const storedRaw = localStorage.getItem('saralyatra_my_trips');
      if (storedRaw) {
        const parsed = JSON.parse(storedRaw);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setTrips(parsed);
          return;
        }
      }
      // Seed default trips if empty
      setTrips(SEED_TRIPS);
      localStorage.setItem('saralyatra_my_trips', JSON.stringify(SEED_TRIPS));
    } catch (e) {
      setTrips(SEED_TRIPS);
    }
  }, []);

  // Filter trips based on activeTab
  const filteredTrips = useMemo(() => {
    if (activeTab === 'UPCOMING') {
      return trips.filter(t => t.status === 'CONFIRMED' || t.status === 'UPCOMING');
    }
    if (activeTab === 'COMPLETED') {
      return trips.filter(t => t.status === 'COMPLETED');
    }
    if (activeTab === 'CANCELLED') {
      return trips.filter(t => t.status === 'CANCELLED');
    }
    return trips;
  }, [trips, activeTab]);

  function handleCancelConfirm() {
    if (!cancelPromptTrip) return;

    const updated = trips.map(t => {
      if (t.pnr === cancelPromptTrip.pnr) {
        return { ...t, status: 'CANCELLED' };
      }
      return t;
    });

    setTrips(updated);
    try {
      localStorage.setItem('saralyatra_my_trips', JSON.stringify(updated));
    } catch (e) {
      // Ignore
    }

    setCancelPromptTrip(null);
  }

  return (
    <div className="trips-page page-main">
      <div className="container trips-container">
        {/* Header */}
        <div className="trips-header">
          <div>
            <h1 className="trips-title">My Trips</h1>
            <p className="trips-subtitle">Manage your upcoming journeys, view e-tickets, and booking history</p>
          </div>
          <Link to="/" className="trips-book-new-btn">
            + Book New Ticket
          </Link>
        </div>

        {/* Navigation Tabs */}
        <div className="trips-tabs-bar" role="tablist">
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'UPCOMING'}
            className={`trips-tab ${activeTab === 'UPCOMING' ? 'trips-tab--active' : ''}`}
            onClick={() => setActiveTab('UPCOMING')}
          >
            Upcoming Trips ({trips.filter(t => t.status === 'CONFIRMED' || t.status === 'UPCOMING').length})
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'COMPLETED'}
            className={`trips-tab ${activeTab === 'COMPLETED' ? 'trips-tab--active' : ''}`}
            onClick={() => setActiveTab('COMPLETED')}
          >
            Completed ({trips.filter(t => t.status === 'COMPLETED').length})
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'CANCELLED'}
            className={`trips-tab ${activeTab === 'CANCELLED' ? 'trips-tab--active' : ''}`}
            onClick={() => setActiveTab('CANCELLED')}
          >
            Cancelled ({trips.filter(t => t.status === 'CANCELLED').length})
          </button>
        </div>

        {/* Trips List */}
        {filteredTrips.length === 0 ? (
          <div className="trips-empty-card">
            <span className="empty-icon">🧳</span>
            <h2 className="empty-title">No {activeTab.toLowerCase()} trips found</h2>
            <p className="empty-sub">When you book tickets on SaralYatra, they will appear here.</p>
            <Link to="/" className="empty-cta-btn">Find Trains Now</Link>
          </div>
        ) : (
          <div className="trips-list" role="list">
            {filteredTrips.map(trip => (
              <article key={trip.pnr} className="trip-card" role="listitem">
                {/* Header info */}
                <div className="trip-card-head">
                  <div className="trip-pnr-info">
                    <span className="trip-pnr-label">PNR:</span>
                    <span className="trip-pnr-val">{trip.pnr}</span>
                    <span className={`trip-status-tag tag-${trip.status.toLowerCase()}`}>
                      {trip.status}
                    </span>
                  </div>
                  <span className="trip-date-pill">📅 {trip.date}</span>
                </div>

                {/* Train & Route Details */}
                <div className="trip-details-grid">
                  <div className="trip-train-col">
                    <h3 className="trip-train-name">{trip.train.name}</h3>
                    <p className="trip-train-sub">#{trip.train.number} • {trip.train.type} • {trip.classObj.code}</p>
                  </div>

                  <div className="trip-route-col">
                    <div className="trip-endpoint">
                      <span className="trip-time">{trip.train.departureTime}</span>
                      <span className="trip-st">{trip.train.fromCode}</span>
                    </div>
                    <div className="trip-mid">
                      <span className="trip-dur">{trip.train.duration}</span>
                      <span className="trip-arrow">→</span>
                    </div>
                    <div className="trip-endpoint trip-endpoint-right">
                      <span className="trip-time">{trip.train.arrivalTime}</span>
                      <span className="trip-st">{trip.train.toCode}</span>
                    </div>
                  </div>
                </div>

                {/* Passengers & Seats snippet */}
                <div className="trip-passengers-bar">
                  <div className="psg-meta-info">
                    <span className="psg-count-label">Passengers:</span>
                    <span className="psg-names-list">
                      {trip.passengers.map(p => p.fullName).join(', ')}
                    </span>
                  </div>
                  <div className="seats-meta-info">
                    <span className="seats-label">Seats:</span>
                    <span className="seats-val">
                      Coach {trip.coach} ({trip.seats.map(s => s.code || s.number).join(', ')})
                    </span>
                  </div>
                </div>

                {/* Card Footer Actions */}
                <div className="trip-card-footer">
                  <div className="trip-fare">
                    <span className="fare-sub">Total Paid</span>
                    <span className="fare-val">₹{trip.fare.total.toLocaleString('en-IN')}</span>
                  </div>

                  <div className="trip-actions">
                    <button
                      type="button"
                      className="trip-btn trip-btn-primary"
                      onClick={() => setSelectedTicket(trip)}
                    >
                      📄 View Ticket
                    </button>

                    {trip.status === 'CONFIRMED' && (
                      <button
                        type="button"
                        className="trip-btn trip-btn-danger"
                        onClick={() => setCancelPromptTrip(trip)}
                      >
                        ✕ Cancel
                      </button>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      {/* Ticket Modal */}
      {selectedTicket && (
        <div className="tkt-modal-overlay" onClick={() => setSelectedTicket(null)}>
          <div className="tkt-modal" onClick={e => e.stopPropagation()}>
            <div className="tkt-header">
              <span>SARAL YATRA E-TICKET</span>
              <button type="button" className="tkt-close-btn" onClick={() => setSelectedTicket(null)}>✕</button>
            </div>
            <div className="tkt-body">
              <div className="tkt-pnr-row">
                <div>
                  <span className="tkt-lbl">PNR</span>
                  <span className="tkt-val">{selectedTicket.pnr}</span>
                </div>
                <div>
                  <span className="tkt-lbl">STATUS</span>
                  <span className={`tkt-status-pill tag-${selectedTicket.status.toLowerCase()}`}>
                    {selectedTicket.status}
                  </span>
                </div>
              </div>
              <div className="tkt-train-row">
                <span className="tkt-name">{selectedTicket.train.name} (#{selectedTicket.train.number})</span>
                <span className="tkt-cls">{selectedTicket.classObj.code}</span>
              </div>
              <div className="tkt-route-row">
                <span>{selectedTicket.train.fromCode} ({selectedTicket.train.departureTime})</span>
                <span>→</span>
                <span>{selectedTicket.train.toCode} ({selectedTicket.train.arrivalTime})</span>
              </div>
              <div className="tkt-psg-list">
                {selectedTicket.passengers.map((p, idx) => (
                  <div key={idx} className="tkt-psg-row">
                    <span>{p.fullName}</span>
                    <span>Seat {selectedTicket.seats[idx]?.number || (idx + 1)} ({selectedTicket.seats[idx]?.code || 'Selected'})</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="tkt-footer">
              <button type="button" className="trip-btn trip-btn-primary" onClick={() => window.print()}>
                🖨️ Print / Download Ticket
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cancel Confirmation Prompt */}
      {cancelPromptTrip && (
        <div className="tkt-modal-overlay" onClick={() => setCancelPromptTrip(null)}>
          <div className="cancel-prompt-modal" onClick={e => e.stopPropagation()}>
            <h3 className="cancel-prompt-title">Cancel Ticket Confirmation</h3>
            <p className="cancel-prompt-desc">
              Are you sure you want to cancel ticket for <strong>{cancelPromptTrip.train.name}</strong> (PNR: {cancelPromptTrip.pnr})?
            </p>
            <p className="cancel-refund-note">
              Refund of ₹{Math.round(cancelPromptTrip.fare.total * 0.9)} will be credited to your original payment method.
            </p>
            <div className="cancel-prompt-actions">
              <button type="button" className="trip-btn trip-btn-secondary" onClick={() => setCancelPromptTrip(null)}>
                Keep Ticket
              </button>
              <button type="button" className="trip-btn trip-btn-danger" onClick={handleCancelConfirm}>
                Yes, Cancel Ticket
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
