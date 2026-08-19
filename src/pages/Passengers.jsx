import React, { useState, useMemo } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useT } from '../context/LanguageContext';
import { getTrainById, trains } from '../data/trains';
import './Passengers.css';

const BERTH_OPTIONS = [
  { value: 'NO_PREF', label: 'No Preference' },
  { value: 'LOWER', label: 'Lower Berth' },
  { value: 'MIDDLE', label: 'Middle Berth' },
  { value: 'UPPER', label: 'Upper Berth' },
  { value: 'SIDE_LOWER', label: 'Side Lower' },
  { value: 'SIDE_UPPER', label: 'Side Upper' },
  { value: 'WINDOW', label: 'Window Seat' },
];

const GENDER_OPTIONS = [
  { value: 'M', label: 'Male' },
  { value: 'F', label: 'Female' },
  { value: 'O', label: 'Other' },
];

export default function Passengers() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const t = useT();

  const trainId = params.get('trainId') || 'T22435';
  const fromCode = params.get('from') || 'BCT';
  const toCode = params.get('to') || 'ADI';
  const date = params.get('date') || '2026-08-15';
  const initialAdultsCount = parseInt(params.get('adults') || '1', 10);
  const selectedClassCode = params.get('class') || '3A';

  const train = useMemo(() => getTrainById(trainId) || trains[0], [trainId]);
  const selectedClassObj = useMemo(
    () => train.classes.find(c => c.code === selectedClassCode) || train.classes[0],
    [train, selectedClassCode]
  );

  // Initialize passenger rows based on initial count
  const [passengers, setPassengers] = useState(() => {
    const initialList = [];
    for (let i = 0; i < Math.max(1, initialAdultsCount); i++) {
      initialList.push({
        id: i + 1,
        fullName: i === 0 ? 'Rahul Sharma' : '',
        age: i === 0 ? '28' : '',
        gender: 'M',
        berthPreference: 'NO_PREF',
      });
    }
    return initialList;
  });

  // Contact details state
  const [contact, setContact] = useState({
    mobile: '9876543210',
    email: 'rahul.sharma@example.com',
  });

  // Errors state
  const [errors, setErrors] = useState({});

  function handlePassengerChange(index, field, value) {
    setPassengers(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
    setErrors(prev => {
      const copy = { ...prev };
      delete copy[`p_${index}_${field}`];
      return copy;
    });
  }

  function handleAddPassenger() {
    if (passengers.length >= 6) return;
    setPassengers(prev => [
      ...prev,
      {
        id: prev.length + 1,
        fullName: '',
        age: '',
        gender: 'M',
        berthPreference: 'NO_PREF',
      },
    ]);
  }

  function handleRemovePassenger(index) {
    if (passengers.length <= 1) return;
    setPassengers(prev => prev.filter((_, i) => i !== index));
  }

  function validate() {
    const errs = {};

    // Validate passengers
    passengers.forEach((p, idx) => {
      if (!p.fullName.trim() || p.fullName.trim().length < 2) {
        errs[`p_${idx}_fullName`] = 'Full name is required (min 2 chars)';
      }
      const ageNum = parseInt(p.age, 10);
      if (!p.age || isNaN(ageNum) || ageNum < 1 || ageNum > 120) {
        errs[`p_${idx}_age`] = 'Enter a valid age (1-120)';
      }
    });

    // Validate contact
    const mobileClean = contact.mobile.trim();
    if (!mobileClean || !/^\d{10}$/.test(mobileClean)) {
      errs.mobile = 'Enter a valid 10-digit mobile number';
    }

    const emailClean = contact.email.trim();
    if (!emailClean || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailClean)) {
      errs.email = 'Enter a valid email address';
    }

    return errs;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);

    if (Object.keys(errs).length === 0) {
      // Save passengers to sessionStorage or navigate to /seats
      try {
        sessionStorage.setItem('saralyatra_booking_passengers', JSON.stringify({
          trainId: train.id,
          passengers,
          contact,
          date,
          classCode: selectedClassObj.code,
        }));
      } catch (err) {
        // Ignore storage errors
      }

      navigate(`/seats?trainId=${train.id}&from=${fromCode}&to=${toCode}&date=${date}&adults=${passengers.length}&class=${selectedClassObj.code}`);
    }
  }

  const baseFareTotal = selectedClassObj.fare * passengers.length;
  const taxesFee = Math.round(baseFareTotal * 0.05); // 5% GST demo calculation
  const totalAmount = baseFareTotal + taxesFee;

  const formattedDate = date
    ? new Date(date).toLocaleDateString('en-IN', {
        weekday: 'short',
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      })
    : '15 Aug 2026';

  return (
    <div className="psg-page page-main">
      {/* Header Bar */}
      <div className="psg-banner">
        <div className="container psg-banner-inner">
          <button type="button" className="psg-back-btn" onClick={() => navigate(-1)}>
            ← Back to Trains
          </button>
          <div className="psg-steps-bar">
            <span className="psg-step psg-step--active">1. Passengers</span>
            <span className="psg-step-arrow">→</span>
            <span className="psg-step">2. Seat Selection</span>
            <span className="psg-step-arrow">→</span>
            <span className="psg-step">3. Review & Pay</span>
          </div>
        </div>
      </div>

      <div className="container psg-grid">
        {/* Left Column: Form */}
        <form className="psg-form" onSubmit={handleSubmit} noValidate>
          {/* Passenger Cards Section */}
          <div className="psg-section">
            <div className="psg-section-head">
              <div>
                <h1 className="psg-heading">Passenger Details</h1>
                <p className="psg-subheading">Enter passenger information for ticket issuing</p>
              </div>
              {passengers.length < 6 && (
                <button
                  type="button"
                  className="psg-add-btn"
                  onClick={handleAddPassenger}
                >
                  + Add Passenger
                </button>
              )}
            </div>

            <div className="psg-cards-list">
              {passengers.map((p, idx) => (
                <div key={p.id} className="psg-card">
                  <div className="psg-card-head">
                    <span className="psg-num-badge">Passenger {idx + 1}</span>
                    {passengers.length > 1 && (
                      <button
                        type="button"
                        className="psg-remove-btn"
                        onClick={() => handleRemovePassenger(idx)}
                        title="Remove Passenger"
                      >
                        Remove
                      </button>
                    )}
                  </div>

                  <div className="psg-card-form-grid">
                    {/* Full Name */}
                    <div className="psg-field psg-field-full">
                      <label className="psg-label" htmlFor={`p-name-${idx}`}>
                        Full Name (as per ID proof) *
                      </label>
                      <input
                        id={`p-name-${idx}`}
                        type="text"
                        className={`psg-input ${errors[`p_${idx}_fullName`] ? 'psg-input--err' : ''}`}
                        placeholder="e.g. Rahul Sharma"
                        value={p.fullName}
                        onChange={e => handlePassengerChange(idx, 'fullName', e.target.value)}
                      />
                      {errors[`p_${idx}_fullName`] && (
                        <span className="psg-err-msg">{errors[`p_${idx}_fullName`]}</span>
                      )}
                    </div>

                    {/* Age */}
                    <div className="psg-field">
                      <label className="psg-label" htmlFor={`p-age-${idx}`}>
                        Age *
                      </label>
                      <input
                        id={`p-age-${idx}`}
                        type="number"
                        min="1"
                        max="120"
                        className={`psg-input ${errors[`p_${idx}_age`] ? 'psg-input--err' : ''}`}
                        placeholder="Age"
                        value={p.age}
                        onChange={e => handlePassengerChange(idx, 'age', e.target.value)}
                      />
                      {errors[`p_${idx}_age`] && (
                        <span className="psg-err-msg">{errors[`p_${idx}_age`]}</span>
                      )}
                    </div>

                    {/* Gender */}
                    <div className="psg-field">
                      <label className="psg-label" htmlFor={`p-gender-${idx}`}>
                        Gender *
                      </label>
                      <select
                        id={`p-gender-${idx}`}
                        className="psg-input psg-select"
                        value={p.gender}
                        onChange={e => handlePassengerChange(idx, 'gender', e.target.value)}
                      >
                        {GENDER_OPTIONS.map(g => (
                          <option key={g.value} value={g.value}>{g.label}</option>
                        ))}
                      </select>
                    </div>

                    {/* Berth Preference */}
                    <div className="psg-field psg-field-full">
                      <label className="psg-label" htmlFor={`p-berth-${idx}`}>
                        Berth Preference
                      </label>
                      <select
                        id={`p-berth-${idx}`}
                        className="psg-input psg-select"
                        value={p.berthPreference}
                        onChange={e => handlePassengerChange(idx, 'berthPreference', e.target.value)}
                      >
                        {BERTH_OPTIONS.map(b => (
                          <option key={b.value} value={b.value}>{b.label}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Details Section */}
          <div className="psg-section">
            <h2 className="psg-subheading-title">Contact & Ticket Delivery Details</h2>
            <p className="psg-subheading-desc">Ticket details and PNR update SMS will be sent here</p>

            <div className="psg-card-form-grid" style={{ marginTop: '16px' }}>
              {/* Mobile */}
              <div className="psg-field">
                <label className="psg-label" htmlFor="contact-mobile">
                  Mobile Number *
                </label>
                <div className="psg-phone-input">
                  <span className="psg-phone-prefix">+91</span>
                  <input
                    id="contact-mobile"
                    type="tel"
                    maxLength="10"
                    className={`psg-input ${errors.mobile ? 'psg-input--err' : ''}`}
                    placeholder="10-digit mobile number"
                    value={contact.mobile}
                    onChange={e => {
                      setContact(prev => ({ ...prev, mobile: e.target.value }));
                      setErrors(prev => ({ ...prev, mobile: undefined }));
                    }}
                  />
                </div>
                {errors.mobile && <span className="psg-err-msg">{errors.mobile}</span>}
              </div>

              {/* Email */}
              <div className="psg-field">
                <label className="psg-label" htmlFor="contact-email">
                  Email Address *
                </label>
                <input
                  id="contact-email"
                  type="email"
                  className={`psg-input ${errors.email ? 'psg-input--err' : ''}`}
                  placeholder="name@example.com"
                  value={contact.email}
                  onChange={e => {
                    setContact(prev => ({ ...prev, email: e.target.value }));
                    setErrors(prev => ({ ...prev, email: undefined }));
                  }}
                />
                {errors.email && <span className="psg-err-msg">{errors.email}</span>}
              </div>
            </div>
          </div>

          {/* Submit CTA */}
          <button type="submit" className="psg-submit-btn">
            Continue to Seat Selection →
          </button>
        </form>

        {/* Right Column: Selected Train & Fare Summary */}
        <aside className="psg-sidebar" aria-label="Booking summary">
          <div className="psg-summary-card">
            <h2 className="psg-summary-title">Train Summary</h2>

            {/* Train Info */}
            <div className="psg-train-info">
              <div className="psg-train-badge">{train.number}</div>
              <div>
                <h3 className="psg-summary-train-name">{train.name}</h3>
                <p className="psg-summary-type">{train.type}</p>
              </div>
            </div>

            {/* Route & Date */}
            <div className="psg-route-box">
              <div className="psg-route-times">
                <div>
                  <span className="psg-time">{train.departureTime}</span>
                  <span className="psg-st-code">{train.fromCode}</span>
                </div>
                <div className="psg-route-mid">
                  <span className="psg-dur">{train.duration}</span>
                  <span className="psg-arrow">→</span>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span className="psg-time">{train.arrivalTime}</span>
                  <span className="psg-st-code">{train.toCode}</span>
                </div>
              </div>
              <div className="psg-summary-date">📅 {formattedDate}</div>
            </div>

            {/* Class & Passengers Count */}
            <div className="psg-details-list">
              <div className="psg-detail-row">
                <span>Class:</span>
                <span className="psg-detail-val">{selectedClassObj.name} ({selectedClassObj.code})</span>
              </div>
              <div className="psg-detail-row">
                <span>Passengers:</span>
                <span className="psg-detail-val">{passengers.length} Adult{passengers.length > 1 ? 's' : ''}</span>
              </div>
            </div>

            {/* Fare Breakdown */}
            <div className="psg-fare-breakdown">
              <h3 className="psg-fare-title">Fare Breakdown</h3>
              <div className="psg-fare-row">
                <span>Base Fare ({passengers.length} × ₹{selectedClassObj.fare})</span>
                <span>₹{baseFareTotal}</span>
              </div>
              <div className="psg-fare-row">
                <span>Taxes & Service Charge (5% GST)</span>
                <span>₹{taxesFee}</span>
              </div>
              <div className="psg-fare-row psg-fare-total">
                <span>Total Amount</span>
                <span>₹{totalAmount}</span>
              </div>
            </div>

            <div className="psg-guarantee-note">
              <span>🔒 256-Bit Encrypted Secure Booking</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
