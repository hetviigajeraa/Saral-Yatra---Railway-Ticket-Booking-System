import React, { useState, useMemo } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useT } from '../context/LanguageContext';
import { getTrainById, trains } from '../data/trains';
import './SeatSelection.css';

// Realistic 3A / Sleeper Coach Bays Mock Generator
// 8 berths per bay: 1-LB, 2-MB, 3-UB, 4-LB, 5-MB, 6-UB, 7-SL, 8-SU
const BERTH_TYPES = ['LB', 'MB', 'UB', 'LB', 'MB', 'UB', 'SL', 'SU'];
const BERTH_LABELS = {
  LB: 'Lower',
  MB: 'Middle',
  UB: 'Upper',
  SL: 'Side Lower',
  SU: 'Side Upper',
};

function generateCoachSeats(coachName) {
  const seats = [];
  const occupiedNumbers = new Set([2, 5, 8, 11, 14, 19, 22, 27, 30]); // Pre-occupied seats

  for (let i = 1; i <= 32; i++) {
    const type = BERTH_TYPES[(i - 1) % 8];
    const isOccupied = occupiedNumbers.has(i);
    seats.push({
      id: `${coachName}-${i}`,
      number: i,
      code: `${i} ${type}`,
      type: type,
      typeName: BERTH_LABELS[type],
      isOccupied: isOccupied,
      bay: Math.ceil(i / 8),
    });
  }
  return seats;
}

export default function SeatSelection() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const t = useT();

  const trainId = params.get('trainId') || 'T22435';
  const fromCode = params.get('from') || 'BCT';
  const toCode = params.get('to') || 'ADI';
  const date = params.get('date') || '2026-08-15';
  const requiredCount = Math.max(1, parseInt(params.get('adults') || '2', 10));
  const classCode = params.get('class') || '3A';

  const train = useMemo(() => getTrainById(trainId) || trains[0], [trainId]);

  // Read stored passengers if available
  const storedBooking = useMemo(() => {
    try {
      const data = sessionStorage.getItem('saralyatra_booking_passengers');
      return data ? JSON.parse(data) : null;
    } catch (e) {
      return null;
    }
  }, []);

  const passengerNames = useMemo(() => {
    if (storedBooking?.passengers && storedBooking.passengers.length > 0) {
      return storedBooking.passengers.map((p, i) => p.fullName || `Passenger ${i + 1}`);
    }
    const names = ['Rahul Sharma', 'Priya Sharma', 'Amit Patel', 'Sneha Patel'];
    return Array.from({ length: requiredCount }, (_, i) => names[i % names.length]);
  }, [storedBooking, requiredCount]);

  const [activeCoach, setActiveCoach] = useState('B1');
  const coachSeats = useMemo(() => generateCoachSeats(activeCoach), [activeCoach]);

  // Pre-select first N available seats
  const [selectedSeatIds, setSelectedSeatIds] = useState(() => {
    const initialAvailable = coachSeats.filter(s => !s.isOccupied).slice(0, requiredCount);
    return initialAvailable.map(s => s.id);
  });

  function handleSeatClick(seat) {
    if (seat.isOccupied) return;

    if (selectedSeatIds.includes(seat.id)) {
      // Unselect if count > 1
      if (selectedSeatIds.length > 1) {
        setSelectedSeatIds(prev => prev.filter(id => id !== seat.id));
      }
    } else {
      // Select seat: if capacity reached, replace last
      if (selectedSeatIds.length < requiredCount) {
        setSelectedSeatIds(prev => [...prev, seat.id]);
      } else {
        setSelectedSeatIds(prev => [...prev.slice(1), seat.id]);
      }
    }
  }

  // Get full objects of selected seats
  const selectedSeatObjects = useMemo(() => {
    return coachSeats.filter(s => selectedSeatIds.includes(s.id));
  }, [coachSeats, selectedSeatIds]);

  function handleContinue() {
    try {
      sessionStorage.setItem('saralyatra_booking_seats', JSON.stringify({
        coach: activeCoach,
        selectedSeats: selectedSeatObjects,
      }));
    } catch (e) {
      // Ignore
    }

    navigate(`/review?trainId=${train.id}&from=${fromCode}&to=${toCode}&date=${date}&adults=${requiredCount}&class=${classCode}`);
  }

  // Group seats by bays (8 per bay)
  const bays = useMemo(() => {
    const map = {};
    coachSeats.forEach(seat => {
      if (!map[seat.bay]) map[seat.bay] = [];
      map[seat.bay].push(seat);
    });
    return Object.entries(map).map(([bayNo, seats]) => ({
      bayNo,
      mainCabin: seats.slice(0, 6),
      sideCabin: seats.slice(6, 8),
    }));
  }, [coachSeats]);

  return (
    <div className="seats-page page-main">
      {/* Banner */}
      <div className="seats-banner">
        <div className="container seats-banner-inner">
          <button type="button" className="seats-back-btn" onClick={() => navigate(-1)}>
            ← Back to Passenger Details
          </button>
          <div className="seats-steps-bar">
            <span className="seats-step">1. Passengers</span>
            <span className="seats-step-arrow">→</span>
            <span className="seats-step seats-step--active">2. Seat Selection</span>
            <span className="seats-step-arrow">→</span>
            <span className="seats-step">3. Review & Pay</span>
          </div>
        </div>
      </div>

      <div className="container seats-grid">
        {/* Left Column: Coach Interactive Layout */}
        <main className="seats-main-col">
          <div className="seats-header-card">
            <div>
              <h1 className="seats-heading">Interactive Coach Layout ({classCode})</h1>
              <p className="seats-subheading">
                Select <strong>{requiredCount} seat{requiredCount > 1 ? 's' : ''}</strong> for your journey on {train.name} (#{train.number})
              </p>
            </div>

            {/* Coach Tabs */}
            <div className="coach-tabs" role="tablist">
              {['B1', 'B2', 'B3'].map(coach => (
                <button
                  key={coach}
                  type="button"
                  role="tab"
                  aria-selected={activeCoach === coach}
                  className={`coach-tab ${activeCoach === coach ? 'coach-tab--active' : ''}`}
                  onClick={() => setActiveCoach(coach)}
                >
                  Coach {coach}
                </button>
              ))}
            </div>
          </div>

          {/* Legend */}
          <div className="seats-legend-bar">
            <div className="legend-item">
              <span className="legend-box legend-available" />
              <span>Available</span>
            </div>
            <div className="legend-item">
              <span className="legend-box legend-selected" />
              <span>Selected ({selectedSeatIds.length}/{requiredCount})</span>
            </div>
            <div className="legend-item">
              <span className="legend-box legend-occupied" />
              <span>Occupied</span>
            </div>
          </div>

          {/* Coach Container */}
          <div className="coach-layout-container">
            <div className="coach-entry-door">
              <span>🚪 ENTRY DOOR & ENGINE SIDE</span>
            </div>

            {/* Bays Grid */}
            <div className="bays-wrapper">
              {bays.map(({ bayNo, mainCabin, sideCabin }) => (
                <div key={bayNo} className="bay-container">
                  <span className="bay-label">Bay {bayNo}</span>
                  <div className="bay-inner">
                    {/* Main Cabin (6 berths) */}
                    <div className="main-cabin-grid">
                      <div className="cabin-col">
                        {mainCabin.slice(0, 3).map(seat => (
                          <SeatButton
                            key={seat.id}
                            seat={seat}
                            isSelected={selectedSeatIds.includes(seat.id)}
                            onClick={() => handleSeatClick(seat)}
                          />
                        ))}
                      </div>
                      <div className="cabin-col">
                        {mainCabin.slice(3, 6).map(seat => (
                          <SeatButton
                            key={seat.id}
                            seat={seat}
                            isSelected={selectedSeatIds.includes(seat.id)}
                            onClick={() => handleSeatClick(seat)}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Aisle Path */}
                    <div className="aisle-path">
                      <span>AISLE</span>
                    </div>

                    {/* Side Cabin (2 berths) */}
                    <div className="side-cabin-grid">
                      {sideCabin.map(seat => (
                        <SeatButton
                          key={seat.id}
                          seat={seat}
                          isSelected={selectedSeatIds.includes(seat.id)}
                          onClick={() => handleSeatClick(seat)}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="coach-exit-door">
              <span>🚪 RESTROOM & VESTIBULE</span>
            </div>
          </div>
        </main>

        {/* Right Sidebar: Selected Seats Summary */}
        <aside className="seats-sidebar">
          <div className="seats-summary-card">
            <h2 className="seats-sidebar-heading">Selected Seats</h2>

            {/* Assigned Passengers List */}
            <div className="assigned-seats-list">
              {passengerNames.map((name, idx) => {
                const assignedSeat = selectedSeatObjects[idx];
                return (
                  <div key={idx} className="assigned-seat-row">
                    <div className="passenger-meta">
                      <span className="p-num">P{idx + 1}</span>
                      <span className="p-name">{name}</span>
                    </div>
                    {assignedSeat ? (
                      <div className="seat-badge">
                        <span className="sb-num">Seat {assignedSeat.number}</span>
                        <span className="sb-type">{assignedSeat.code}</span>
                      </div>
                    ) : (
                      <span className="seat-unassigned">Select a seat</span>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="seats-status-summary">
              <span className="status-count">
                {selectedSeatIds.length} of {requiredCount} seats selected
              </span>
              {selectedSeatIds.length < requiredCount && (
                <span className="status-alert">Please select {requiredCount - selectedSeatIds.length} more seat(s)</span>
              )}
            </div>

            <button
              type="button"
              className="seats-submit-btn"
              onClick={handleContinue}
              disabled={selectedSeatIds.length === 0}
            >
              Continue to Review →
            </button>

            <div className="seats-reassurance">
              <span>✓ Guaranteed adjacent berths where available</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

function SeatButton({ seat, isSelected, onClick }) {
  let stateClass = 'seat-btn--available';
  if (seat.isOccupied) stateClass = 'seat-btn--occupied';
  else if (isSelected) stateClass = 'seat-btn--selected';

  return (
    <button
      type="button"
      className={`seat-btn ${stateClass}`}
      onClick={onClick}
      disabled={seat.isOccupied}
      title={`${seat.code} (${seat.typeName}) - ${seat.isOccupied ? 'Occupied' : isSelected ? 'Selected' : 'Available'}`}
    >
      <span className="seat-num">{seat.number}</span>
      <span className="seat-type">{seat.type}</span>
    </button>
  );
}
