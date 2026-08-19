import React, { useState } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { useT } from '../context/LanguageContext';
import { getTrainById, trains } from '../data/trains';
import './TrainDetail.css';

// Mock intermediate stations generator/data
const MOCK_STATIONS_DATA = {
  T22435: [
    { code: 'BCT', name: 'Mumbai Central', arrival: '--', departure: '06:10', halt: '--', distance: '0 km', platform: 'PF 1', day: 'Day 1' },
    { code: 'BVI', name: 'Borivali', arrival: '06:43', departure: '06:45', halt: '2 min', distance: '30 km', platform: 'PF 6', day: 'Day 1' },
    { code: 'VAPI', name: 'Vapi', arrival: '08:14', departure: '08:16', halt: '2 min', distance: '168 km', platform: 'PF 1', day: 'Day 1' },
    { code: 'ST', name: 'Surat', arrival: '09:30', departure: '09:35', halt: '5 min', distance: '263 km', platform: 'PF 1', day: 'Day 1' },
    { code: 'BRC', name: 'Vadodara Junction', arrival: '11:00', departure: '11:05', halt: '5 min', distance: '392 km', platform: 'PF 2', day: 'Day 1' },
    { code: 'ADI', name: 'Ahmedabad Junction', arrival: '12:40', departure: '--', halt: '--', distance: '492 km', platform: 'PF 5', day: 'Day 1' },
  ],
  T12009: [
    { code: 'BCT', name: 'Mumbai Central', arrival: '--', departure: '06:25', halt: '--', distance: '0 km', platform: 'PF 1', day: 'Day 1' },
    { code: 'BVI', name: 'Borivali', arrival: '06:58', departure: '07:00', halt: '2 min', distance: '30 km', platform: 'PF 6', day: 'Day 1' },
    { code: 'ST', name: 'Surat', arrival: '09:42', departure: '09:47', halt: '5 min', distance: '263 km', platform: 'PF 1', day: 'Day 1' },
    { code: 'BRC', name: 'Vadodara Junction', arrival: '11:20', departure: '11:25', halt: '5 min', distance: '392 km', platform: 'PF 3', day: 'Day 1' },
    { code: 'ADI', name: 'Ahmedabad Junction', arrival: '13:10', departure: '--', halt: '--', distance: '492 km', platform: 'PF 1', day: 'Day 1' },
  ],
  T12951: [
    { code: 'BCT', name: 'Mumbai Central', arrival: '--', departure: '17:00', halt: '--', distance: '0 km', platform: 'PF 1', day: 'Day 1' },
    { code: 'ST', name: 'Surat', arrival: '19:43', departure: '19:48', halt: '5 min', distance: '263 km', platform: 'PF 1', day: 'Day 1' },
    { code: 'BRC', name: 'Vadodara Junction', arrival: '21:16', departure: '21:26', halt: '10 min', distance: '392 km', platform: 'PF 2', day: 'Day 1' },
    { code: 'RTM', name: 'Ratlam Junction', arrival: '00:35', departure: '00:38', halt: '3 min', distance: '653 km', platform: 'PF 5', day: 'Day 2' },
    { code: 'KOTA', name: 'Kota Junction', arrival: '03:15', departure: '03:25', halt: '10 min', distance: '920 km', platform: 'PF 1', day: 'Day 2' },
    { code: 'NDLS', name: 'New Delhi', arrival: '08:35', departure: '--', halt: '--', distance: '1384 km', platform: 'PF 3', day: 'Day 2' },
  ],
};

const AMENITY_ICONS = {
  wifi: { label: 'Free Wi-Fi', icon: '📶' },
  catering: { label: 'Onboard Catering', icon: '🍽️' },
  ac: { label: 'Air Conditioned', icon: '❄️' },
  charging: { label: 'Charging Points', icon: '🔌' },
  bedding: { label: 'Clean Bedding', icon: '🛏️' },
  pantry: { label: 'Pantry Car', icon: '🛒' },
  mobile_charging: { label: 'Charging Outlets', icon: '🔌' },
};

export default function TrainDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const t = useT();

  const train = getTrainById(id) || trains[0];
  const [selectedClassCode, setSelectedClassCode] = useState(train.classes[0]?.code);

  const selectedClass = train.classes.find(c => c.code === selectedClassCode) || train.classes[0];

  // Get intermediate stations or fallback default schedule
  const routeStations = MOCK_STATIONS_DATA[train.id] || [
    { code: train.fromCode, name: train.from, arrival: '--', departure: train.departureTime, halt: '--', distance: '0 km', platform: 'PF 1', day: 'Day 1' },
    { code: 'MID', name: 'Intermediate Station', arrival: '10:00', departure: '10:10', halt: '10 min', distance: `${Math.round(train.distance / 2)} km`, platform: 'PF 2', day: 'Day 1' },
    { code: train.toCode, name: train.to, arrival: train.arrivalTime, departure: '--', halt: '--', distance: `${train.distance} km`, platform: 'PF 1', day: 'Day 1' },
  ];

  function handleSelectTrain() {
    const from = params.get('from') || train.fromCode;
    const to = params.get('to') || train.toCode;
    const date = params.get('date') || '';
    const adults = params.get('adults') || '1';
    navigate(`/passengers?trainId=${train.id}&from=${from}&to=${to}&date=${date}&adults=${adults}&class=${selectedClassCode}`);
  }

  return (
    <div className="detail-page page-main">
      {/* Top Header Banner */}
      <div className="detail-header-banner">
        <div className="container detail-header-inner">
          <button
            type="button"
            className="detail-back-btn"
            onClick={() => navigate(-1)}
          >
            ← {t.common.back}
          </button>

          <div className="detail-title-block">
            <div className="detail-name-tag-row">
              <h1 className="detail-train-name">{train.name}</h1>
              <span className="detail-train-num">#{train.number}</span>
              <span className="detail-train-type">{train.type}</span>
            </div>
            <p className="detail-train-route">
              {train.from} ({train.fromCode}) → {train.to} ({train.toCode})
            </p>
          </div>
        </div>
      </div>

      <div className="container detail-content-grid">
        {/* Main Left Column */}
        <div className="detail-left-col">
          {/* Key Quick Overview Card */}
          <section className="detail-card detail-overview-card">
            <h2 className="detail-card-heading">Trip Summary</h2>
            <div className="detail-overview-grid">
              <div className="overview-item">
                <span className="overview-label">Departure</span>
                <span className="overview-val">{train.departureTime}</span>
                <span className="overview-sub">{train.from}</span>
              </div>
              <div className="overview-item overview-center">
                <span className="overview-duration">{train.duration}</span>
                <div className="overview-track">
                  <span className="track-dot" />
                  <span className="track-line" />
                  <span className="track-dot" />
                </div>
                <span className="overview-sub">{train.distance} km</span>
              </div>
              <div className="overview-item overview-right">
                <span className="overview-label">Arrival</span>
                <span className="overview-val">{train.arrivalTime}</span>
                <span className="overview-sub">{train.to}</span>
              </div>
            </div>

            <div className="detail-runs-row">
              <span className="runs-icon">📅</span>
              <span className="runs-text"><strong>Running Days:</strong> {train.runsOn}</span>
            </div>
          </section>

          {/* Classes & Seat Availability */}
          <section className="detail-card">
            <h2 className="detail-card-heading">Select Class & Check Availability</h2>
            <div className="detail-classes-grid">
              {train.classes.map(c => {
                const isSelected = c.code === selectedClassCode;
                return (
                  <button
                    key={c.code}
                    type="button"
                    className={`detail-class-card ${isSelected ? 'detail-class-card--active' : ''}`}
                    onClick={() => setSelectedClassCode(c.code)}
                  >
                    <div className="class-card-head">
                      <span className="class-code">{c.code}</span>
                      <span className="class-name">{c.name}</span>
                    </div>
                    <div className="class-card-fare">
                      ₹{c.fare}
                    </div>
                    <div className="class-card-avail">
                      <span className={`status-badge status-${c.status.toLowerCase()}`}>
                        {c.status === 'AVAILABLE' ? `Available (${c.available})` : c.status}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </section>

          {/* Route & Intermediate Stations */}
          <section className="detail-card">
            <h2 className="detail-card-heading">Route & Station Timetable</h2>
            <div className="station-timeline">
              {routeStations.map((st, idx) => (
                <div key={st.code} className="timeline-item">
                  <div className="timeline-marker">
                    <span className="timeline-node" />
                    {idx < routeStations.length - 1 && <span className="timeline-connector" />}
                  </div>
                  <div className="timeline-content">
                    <div className="timeline-main">
                      <div className="timeline-station">
                        <span className="st-name">{st.name}</span>
                        <span className="st-code">({st.code})</span>
                      </div>
                      <div className="timeline-times">
                        <span className="st-arr">Arr: {st.arrival}</span>
                        <span className="st-dep">Dep: {st.departure}</span>
                      </div>
                    </div>
                    <div className="timeline-meta">
                      <span>Platform: {st.platform}</span>
                      <span>Halt: {st.halt}</span>
                      <span>{st.distance}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Amenities */}
          <section className="detail-card">
            <h2 className="detail-card-heading">Onboard Amenities</h2>
            <div className="amenities-grid">
              {train.amenities.map(key => {
                const item = AMENITY_ICONS[key] || { label: key, icon: '✨' };
                return (
                  <div key={key} className="amenity-chip">
                    <span className="amenity-icon">{item.icon}</span>
                    <span className="amenity-label">{item.label}</span>
                  </div>
                );
              })}
            </div>
          </section>
        </div>

        {/* Right Sticky Booking Widget Column */}
        <div className="detail-right-col">
          <div className="booking-widget-card">
            <h3 className="widget-title">Fare Details</h3>
            <div className="widget-fare-row">
              <span className="widget-class-title">{selectedClass.name} ({selectedClass.code})</span>
              <span className="widget-fare">₹{selectedClass.fare}</span>
            </div>

            <div className="widget-avail-row">
              <span>Availability Status:</span>
              <span className={`status-badge status-${selectedClass.status.toLowerCase()}`}>
                {selectedClass.status === 'AVAILABLE' ? `${selectedClass.available} Seats` : selectedClass.status}
              </span>
            </div>

            {train.aiReason && (
              <div className="widget-ai-note">
                <span className="ai-icon">💡</span>
                <p className="ai-reason">{train.aiReason}</p>
              </div>
            )}

            <button
              type="button"
              className="widget-cta-btn"
              onClick={handleSelectTrain}
            >
              Select Train ({selectedClass.code})
            </button>

            <p className="widget-guarantee">🔒 No hidden charges • Easy cancellation</p>
          </div>
        </div>
      </div>
    </div>
  );
}
