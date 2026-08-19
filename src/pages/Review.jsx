import React, { useMemo } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useT } from '../context/LanguageContext';
import { getTrainById, trains } from '../data/trains';
import './Review.css';

export default function Review() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const t = useT();

  const trainId = params.get('trainId') || 'T22435';
  const fromCode = params.get('from') || 'BCT';
  const toCode = params.get('to') || 'ADI';
  const date = params.get('date') || '2026-08-15';
  const classCode = params.get('class') || '3A';

  const train = useMemo(() => getTrainById(trainId) || trains[0], [trainId]);
  const selectedClassObj = useMemo(
    () => train.classes.find(c => c.code === classCode) || train.classes[0],
    [train, classCode]
  );

  // Retrieve stored passenger & seat details
  const storedPassengers = useMemo(() => {
    try {
      const data = sessionStorage.getItem('saralyatra_booking_passengers');
      return data ? JSON.parse(data) : null;
    } catch (e) {
      return null;
    }
  }, []);

  const storedSeats = useMemo(() => {
    try {
      const data = sessionStorage.getItem('saralyatra_booking_seats');
      return data ? JSON.parse(data) : null;
    } catch (e) {
      return null;
    }
  }, []);

  // Passengers list fallback
  const passengersList = useMemo(() => {
    if (storedPassengers?.passengers && storedPassengers.passengers.length > 0) {
      return storedPassengers.passengers;
    }
    return [
      { id: 1, fullName: 'Rahul Sharma', age: '28', gender: 'M', berthPreference: 'LOWER' },
      { id: 2, fullName: 'Priya Sharma', age: '26', gender: 'F', berthPreference: 'UPPER' },
    ];
  }, [storedPassengers]);

  const contactInfo = useMemo(() => {
    return storedPassengers?.contact || {
      mobile: '9876543210',
      email: 'rahul.sharma@example.com',
    };
  }, [storedPassengers]);

  // Selected seats list fallback
  const seatsList = useMemo(() => {
    if (storedSeats?.selectedSeats && storedSeats.selectedSeats.length > 0) {
      return storedSeats.selectedSeats;
    }
    return [
      { id: 'B1-1', number: 1, code: '1 LB', typeName: 'Lower', coach: 'B1' },
      { id: 'B1-3', number: 3, code: '3 UB', typeName: 'Upper', coach: 'B1' },
    ];
  }, [storedSeats]);

  const coachName = storedSeats?.coach || 'B1';

  // Fare Calculations
  const baseFareTotal = selectedClassObj.fare * passengersList.length;
  const taxesFee = Math.round(baseFareTotal * 0.05); // 5% GST
  const irctcFee = 15; // Convenient fee
  const totalAmount = baseFareTotal + taxesFee + irctcFee;

  const formattedDate = date
    ? new Date(date).toLocaleDateString('en-IN', {
        weekday: 'short',
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      })
    : '15 Aug 2026';

  function handleConfirmBooking() {
    // Generate 10-digit mock PNR
    const mockPnr = Math.floor(1000000000 + Math.random() * 9000000000).toString();

    const bookingPayload = {
      pnr: mockPnr,
      train,
      date,
      formattedDate,
      classObj: selectedClassObj,
      passengers: passengersList,
      contact: contactInfo,
      seats: seatsList,
      coach: coachName,
      fare: {
        base: baseFareTotal,
        tax: taxesFee,
        fee: irctcFee,
        total: totalAmount,
      },
      bookedAt: new Date().toISOString(),
    };

    try {
      sessionStorage.setItem('saralyatra_active_booking', JSON.stringify(bookingPayload));
    } catch (e) {
      // Ignore
    }

    navigate(`/confirmation?pnr=${mockPnr}`);
  }

  return (
    <div className="rev-page page-main">
      {/* Banner */}
      <div className="rev-banner">
        <div className="container rev-banner-inner">
          <button type="button" className="rev-back-btn" onClick={() => navigate(-1)}>
            ← Back to Seat Selection
          </button>
          <div className="rev-steps-bar">
            <span className="rev-step">1. Passengers</span>
            <span className="rev-step-arrow">→</span>
            <span className="rev-step">2. Seat Selection</span>
            <span className="rev-step-arrow">→</span>
            <span className="rev-step rev-step--active">3. Review & Pay</span>
          </div>
        </div>
      </div>

      <div className="container rev-grid">
        {/* Left Column: Comprehensive Details */}
        <main className="rev-main">
          {/* Journey & Train Card */}
          <section className="rev-card">
            <div className="rev-card-head">
              <span className="rev-card-icon">🚆</span>
              <div>
                <h2 className="rev-card-title">Train & Journey Details</h2>
                <p className="rev-card-sub">Verified route and schedule information</p>
              </div>
            </div>

            <div className="rev-train-header">
              <div>
                <h3 className="rev-train-name">{train.name}</h3>
                <p className="rev-train-sub">Train #{train.number} • {train.type}</p>
              </div>
              <span className="rev-class-pill">{selectedClassObj.name} ({selectedClassObj.code})</span>
            </div>

            <div className="rev-route-grid">
              <div className="rev-endpoint">
                <span className="rev-time">{train.departureTime}</span>
                <span className="rev-st-name">{train.from}</span>
                <span className="rev-st-code">({train.fromCode})</span>
              </div>
              <div className="rev-dur-block">
                <span className="rev-dur">{train.duration}</span>
                <div className="rev-line">
                  <span className="rev-dot" />
                  <span className="rev-track" />
                  <span className="rev-dot" />
                </div>
                <span className="rev-dist">{train.distance} km</span>
              </div>
              <div className="rev-endpoint rev-endpoint-right">
                <span className="rev-time">{train.arrivalTime}</span>
                <span className="rev-st-name">{train.to}</span>
                <span className="rev-st-code">({train.toCode})</span>
              </div>
            </div>

            <div className="rev-date-bar">
              <span>📅 Journey Date: <strong>{formattedDate}</strong></span>
              <span>⚡ Status: <strong>Confirmed Seat Allotment</strong></span>
            </div>
          </section>

          {/* Passenger & Seat Assignments Card */}
          <section className="rev-card">
            <div className="rev-card-head">
              <span className="rev-card-icon">👥</span>
              <div>
                <h2 className="rev-card-title">Passenger & Seat Assignments</h2>
                <p className="rev-card-sub">{passengersList.length} Passenger(s) • Coach {coachName}</p>
              </div>
            </div>

            <div className="rev-passengers-list">
              {passengersList.map((p, idx) => {
                const assignedSeat = seatsList[idx] || seatsList[0];
                return (
                  <div key={idx} className="rev-psg-item">
                    <div className="rev-psg-left">
                      <span className="rev-psg-num">{idx + 1}</span>
                      <div>
                        <h4 className="rev-psg-name">{p.fullName}</h4>
                        <p className="rev-psg-meta">
                          {p.age} yrs • {p.gender === 'M' ? 'Male' : p.gender === 'F' ? 'Female' : 'Other'} • Pref: {p.berthPreference}
                        </p>
                      </div>
                    </div>
                    {assignedSeat && (
                      <div className="rev-seat-badge">
                        <span className="seat-badge-coach">Coach {coachName}</span>
                        <span className="seat-badge-num">Seat {assignedSeat.number} ({assignedSeat.code})</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Contact Box */}
            <div className="rev-contact-box">
              <h4 className="contact-box-title">Ticket Delivery Contact</h4>
              <div className="contact-details-row">
                <span>📱 +91 {contactInfo.mobile}</span>
                <span>✉️ {contactInfo.email}</span>
              </div>
            </div>
          </section>
        </main>

        {/* Right Sidebar: Payment Summary */}
        <aside className="rev-sidebar">
          <div className="rev-payment-card">
            <h2 className="rev-sidebar-title">Payment Summary</h2>

            <div className="rev-fare-list">
              <div className="fare-item">
                <span>Base Fare ({passengersList.length} × ₹{selectedClassObj.fare})</span>
                <span>₹{baseFareTotal}</span>
              </div>
              <div className="fare-item">
                <span>GST (5%)</span>
                <span>₹{taxesFee}</span>
              </div>
              <div className="fare-item">
                <span>IRCTC Convenience Fee</span>
                <span>₹{irctcFee}</span>
              </div>
            </div>

            <div className="rev-total-box">
              <span className="total-label">Total Payable</span>
              <span className="total-val">₹{totalAmount.toLocaleString('en-IN')}</span>
            </div>

            <button
              type="button"
              className="rev-confirm-btn"
              onClick={handleConfirmBooking}
            >
              Confirm Booking (₹{totalAmount.toLocaleString('en-IN')})
            </button>

            <div className="rev-trust-notes">
              <span>🔒 Free Instant Ticket Generation</span>
              <span>⚡ Demo College AI Prototype</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
