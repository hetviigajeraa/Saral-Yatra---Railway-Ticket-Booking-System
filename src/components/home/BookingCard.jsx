import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useT } from '../../context/LanguageContext';
import { stations } from '../../data/stations';
import HelpMeChooseModal from '../ui/HelpMeChooseModal';
import './BookingCard.css';

const CLASSES = ['SL', '3A', '2A', '1A', 'CC', 'EC', 'GN'];
const TODAY = new Date().toISOString().split('T')[0];

// Default pre-filled values for the demo
const DEFAULT_FROM = { code: 'BCT', name: 'Mumbai Central', city: 'Mumbai' };
const DEFAULT_TO   = { code: 'ADI', name: 'Ahmedabad Junction', city: 'Ahmedabad' };
const DEFAULT_DATE = '2026-08-15';

export default function BookingCard({ onAiClick }) {
  const t = useT();
  const navigate = useNavigate();

  const [from, setFrom]             = useState(DEFAULT_FROM);
  const [to, setTo]                 = useState(DEFAULT_TO);
  const [fromQuery, setFromQuery]   = useState(`${DEFAULT_FROM.name} (${DEFAULT_FROM.code})`);
  const [toQuery, setToQuery]       = useState(`${DEFAULT_TO.name} (${DEFAULT_TO.code})`);
  const [fromSugg, setFromSugg]     = useState([]);
  const [toSugg, setToSugg]         = useState([]);
  const [fromFocused, setFromFocused] = useState(false);
  const [toFocused, setToFocused]   = useState(false);
  const [date, setDate]             = useState(DEFAULT_DATE);
  const [adults, setAdults]         = useState(2);
  const [travelClass, setTravelClass] = useState('3A');
  const [errors, setErrors]         = useState({});
  const [swapping, setSwapping]     = useState(false);
  const [isHmcOpen, setIsHmcOpen]   = useState(false);

  const fromRef = useRef(null);
  const toRef   = useRef(null);

  // Station autocomplete search
  function searchStations(query) {
    if (query.length < 2) return [];
    const q = query.toLowerCase();
    return stations
      .filter(s =>
        s.name.toLowerCase().includes(q) ||
        s.city.toLowerCase().includes(q) ||
        s.code.toLowerCase().includes(q)
      )
      .slice(0, 7);
  }

  function handleFromInput(val) {
    setFromQuery(val);
    setErrors(p => ({ ...p, from: undefined }));
    if (!val) { setFrom(null); setFromSugg([]); return; }
    setFromSugg(searchStations(val));
    if (from && `${from.name} (${from.code})` !== val) setFrom(null);
  }

  function handleToInput(val) {
    setToQuery(val);
    setErrors(p => ({ ...p, to: undefined }));
    if (!val) { setTo(null); setToSugg([]); return; }
    setToSugg(searchStations(val));
    if (to && `${to.name} (${to.code})` !== val) setTo(null);
  }

  function selectFrom(s) {
    setFrom(s);
    setFromQuery(`${s.name} (${s.code})`);
    setFromSugg([]);
    setFromFocused(false);
  }

  function selectTo(s) {
    setTo(s);
    setToQuery(`${s.name} (${s.code})`);
    setToSugg([]);
    setToFocused(false);
  }

  function handleSwap() {
    setSwapping(true);
    setTimeout(() => setSwapping(false), 350);
    const prevFrom = from;
    const prevFromQuery = fromQuery;
    setFrom(to);
    setFromQuery(toQuery);
    setTo(prevFrom);
    setToQuery(prevFromQuery);
    setErrors({});
  }

  function validate() {
    const errs = {};
    if (!from) errs.from = t.errors.required;
    if (!to)   errs.to   = t.errors.required;
    if (from && to && from.code === to.code) errs.to = t.errors.sameStation;
    if (!date) errs.date = t.errors.required;
    else if (date < TODAY) errs.date = t.errors.pastDate;
    return errs;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      navigate(`/trains?from=${from.code}&to=${to.code}&date=${date}&adults=${adults}&class=${travelClass}`);
    }
  }

  // Close suggestions on outside click
  useEffect(() => {
    function onClick(e) {
      if (fromRef.current && !fromRef.current.contains(e.target)) {
        setFromSugg([]);
        setFromFocused(false);
      }
      if (toRef.current && !toRef.current.contains(e.target)) {
        setToSugg([]);
        setToFocused(false);
      }
    }
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  const showFromSugg = fromFocused && fromSugg.length > 0;
  const showToSugg   = toFocused   && toSugg.length > 0;

  return (
    <div className="bcard" role="search" aria-label={t.booking.findTrains}>
      {/* Heading row */}
      <div className="bcard-head">
        <h2 className="bcard-title">Book your ticket</h2>
      </div>

      <form className="bcard-form" onSubmit={handleSubmit} noValidate>
        {/* --- FROM / SWAP / TO --- */}
        <div className="bcard-stations-row">

          {/* FROM */}
          <div className="bcard-field bcard-field-station" ref={fromRef}>
            <label className="bcard-label" htmlFor="bc-from">
              <span className="bcard-label-dot bcard-label-dot-from" aria-hidden="true" />
              {t.booking.from}
            </label>
            <input
              id="bc-from"
              type="text"
              className={`bcard-input${errors.from ? ' bcard-input-err' : ''}${from ? ' bcard-input-selected' : ''}`}
              placeholder={t.booking.selectStation}
              value={fromQuery}
              onChange={e => handleFromInput(e.target.value)}
              onFocus={() => { setFromFocused(true); if (fromQuery.length >= 2) setFromSugg(searchStations(fromQuery)); }}
              autoComplete="off"
              aria-autocomplete="list"
              aria-expanded={showFromSugg}
            />
            {from && (
              <span className="bcard-city-sub">{from.city}</span>
            )}
            {errors.from && <span className="bcard-error" role="alert">{errors.from}</span>}
            {showFromSugg && (
              <StationDropdown
                suggestions={fromSugg}
                selected={from}
                onSelect={selectFrom}
                label="From station suggestions"
              />
            )}
          </div>

          {/* SWAP */}
          <button
            type="button"
            className={`bcard-swap${swapping ? ' bcard-swap-spin' : ''}`}
            onClick={handleSwap}
            aria-label={t.booking.swapStations}
            title={t.booking.swapStations}
          >
            <SwapIcon />
          </button>

          {/* TO */}
          <div className="bcard-field bcard-field-station" ref={toRef}>
            <label className="bcard-label" htmlFor="bc-to">
              <span className="bcard-label-dot bcard-label-dot-to" aria-hidden="true" />
              {t.booking.to}
            </label>
            <input
              id="bc-to"
              type="text"
              className={`bcard-input${errors.to ? ' bcard-input-err' : ''}${to ? ' bcard-input-selected' : ''}`}
              placeholder={t.booking.selectStation}
              value={toQuery}
              onChange={e => handleToInput(e.target.value)}
              onFocus={() => { setToFocused(true); if (toQuery.length >= 2) setToSugg(searchStations(toQuery)); }}
              autoComplete="off"
              aria-autocomplete="list"
              aria-expanded={showToSugg}
            />
            {to && (
              <span className="bcard-city-sub">{to.city}</span>
            )}
            {errors.to && <span className="bcard-error" role="alert">{errors.to}</span>}
            {showToSugg && (
              <StationDropdown
                suggestions={toSugg}
                selected={to}
                onSelect={selectTo}
                label="To station suggestions"
              />
            )}
          </div>
        </div>

        {/* --- DATE / PASSENGERS / CLASS --- */}
        <div className="bcard-details-row">

          {/* Date */}
          <div className="bcard-field">
            <label className="bcard-label" htmlFor="bc-date">
              <CalIcon /> {t.booking.journeyDate}
            </label>
            <input
              id="bc-date"
              type="date"
              className={`bcard-input bcard-input-date${errors.date ? ' bcard-input-err' : ''}`}
              value={date}
              min={TODAY}
              onChange={e => { setErrors(p => ({ ...p, date: undefined })); setDate(e.target.value); }}
            />
            {errors.date && <span className="bcard-error" role="alert">{errors.date}</span>}
          </div>

          {/* Adults */}
          <div className="bcard-field">
            <label className="bcard-label" id="bc-adults-label">
              <PersonIcon /> {t.booking.passengers}
            </label>
            <div className="bcard-stepper" role="group" aria-labelledby="bc-adults-label">
              <button
                type="button"
                className="bcard-step-btn"
                onClick={() => setAdults(p => Math.max(1, p - 1))}
                disabled={adults <= 1}
                aria-label="Decrease passengers"
              >
                <MinusIcon />
              </button>
              <span className="bcard-step-val" aria-live="polite">
                {t.booking.adultsLabel(adults)}
              </span>
              <button
                type="button"
                className="bcard-step-btn"
                onClick={() => setAdults(p => Math.min(6, p + 1))}
                disabled={adults >= 6}
                aria-label="Increase passengers"
              >
                <PlusIcon />
              </button>
            </div>
          </div>

          {/* Class */}
          <div className="bcard-field">
            <label className="bcard-label" htmlFor="bc-class">
              <SeatIcon /> {t.booking.class}
            </label>
            <div className="bcard-select-wrap">
              <select
                id="bc-class"
                className="bcard-input bcard-select"
                value={travelClass}
                onChange={e => setTravelClass(e.target.value)}
              >
                {CLASSES.map(cls => (
                  <option key={cls} value={cls}>{t.classes[cls]}</option>
                ))}
              </select>
              <ChevronIcon />
            </div>
          </div>
        </div>

        {/* Submit */}
        <button type="submit" className="bcard-submit">
          {t.booking.findTrains}
        </button>
      </form>

      {/* AI hint */}
      <div className="bcard-ai-hint">
        <div className="bcard-ai-hint-icon" aria-hidden="true"><SparkIcon /></div>
        <div className="bcard-ai-hint-body">
          <p className="bcard-ai-hint-title">{t.booking.aiHelp}</p>
          <p className="bcard-ai-hint-desc">{t.booking.aiHelpDesc}</p>
        </div>
        <button
          type="button"
          className="bcard-ai-hint-btn"
          onClick={() => setIsHmcOpen(true)}
          aria-label={t.booking.aiHelp}
        >
          {t.booking.getRecommendation}
        </button>
      </div>

      {/* Help Me Choose Preferences Modal */}
      <HelpMeChooseModal
        isOpen={isHmcOpen}
        onClose={() => setIsHmcOpen(false)}
      />
    </div>
  );
}

function StationDropdown({ suggestions, selected, onSelect, label }) {
  return (
    <ul className="bcard-dropdown" role="listbox" aria-label={label}>
      {suggestions.map(s => (
        <li key={s.code} role="option" aria-selected={selected?.code === s.code}>
          <button
            type="button"
            className={`bcard-dropdown-item${selected?.code === s.code ? ' bcard-dropdown-item-active' : ''}`}
            onClick={() => onSelect(s)}
          >
            <span className="bcard-dd-code">{s.code}</span>
            <span className="bcard-dd-info">
              <span className="bcard-dd-name">{s.name}</span>
              <span className="bcard-dd-city">{s.city}, {s.state}</span>
            </span>
          </button>
        </li>
      ))}
    </ul>
  );
}

/* ---- SVG Icons ---- */
function SwapIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M7 4L3 8l4 4M3 8h14M17 20l4-4-4-4M21 16H7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}
function CalIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.8"/>
      <path d="M3 10h18M8 2v4M16 2v4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  );
}
function PersonIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.8"/>
      <path d="M4 20c0-4 3.58-7 8-7s8 3 8 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  );
}
function SeatIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 5v9a2 2 0 002 2h10a2 2 0 002-2V5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      <path d="M3 16h18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  );
}
function ChevronIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}
function SparkIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 2l2.4 7.2H22l-6.2 4.5 2.4 7.3L12 17l-6.2 4 2.4-7.3L2 9.2h7.6L12 2z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round"/>
    </svg>
  );
}
function MinusIcon() {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>;
}
function PlusIcon() {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>;
}
