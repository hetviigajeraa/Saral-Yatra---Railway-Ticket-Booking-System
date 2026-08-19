import React, { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useT } from '../context/LanguageContext';
import './PNRStatus.css';

const SAMPLE_PNRS = [
  { pnr: '8420193751', label: 'Confirmed (CNF)', type: 'CNF' },
  { pnr: '5102938471', label: 'RAC Status', type: 'RAC' },
  { pnr: '7849201538', label: 'Waiting List (WL)', type: 'WL' },
];

export default function PNRStatus() {
  const [params] = useSearchParams();
  const t = useT();

  const [pnrQuery, setPnrQuery] = useState(params.get('pnr') || '8420193751');
  const [activeResult, setActiveResult] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  function searchPnr(pnrToSearch) {
    const cleanPnr = pnrToSearch.trim();
    if (!cleanPnr || !/^\d{10}$/.test(cleanPnr)) {
      setError(t.errors.invalidPNR);
      setActiveResult(null);
      return;
    }

    setError('');
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);

      // Check localStorage trips first
      try {
        const storedRaw = localStorage.getItem('saralyatra_my_trips');
        if (storedRaw) {
          const trips = JSON.parse(storedRaw);
          const found = trips.find(t => t.pnr === cleanPnr);
          if (found) {
            setActiveResult({
              pnr: found.pnr,
              statusType: found.status === 'CANCELLED' ? 'CANCELLED' : 'CNF',
              statusText: found.status === 'CANCELLED' ? 'Cancelled' : 'Confirmed (CNF)',
              chartStatus: 'Chart Prepared',
              train: found.train,
              date: found.date,
              classCode: found.classObj?.code || '3A',
              passengers: found.passengers.map((p, idx) => ({
                name: p.fullName,
                ageGender: `${p.age}/${p.gender}`,
                bookingStatus: 'CNF',
                currentStatus: `CNF / Coach ${found.coach} / Seat ${found.seats[idx]?.number || (idx + 1)} (${found.seats[idx]?.code || 'LOWER'})`,
              })),
            });
            return;
          }
        }
      } catch (e) {
        // Ignore
      }

      // Dynamic demo fallback based on PNR pattern
      const lastDigit = parseInt(cleanPnr.slice(-1), 10);

      if (lastDigit === 3 || lastDigit === 7) {
        // RAC Demo
        setActiveResult({
          pnr: cleanPnr,
          statusType: 'RAC',
          statusText: 'Reservation Against Cancellation (RAC)',
          chartStatus: 'Chart Not Prepared',
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
          },
          date: 'Sat, 15 Aug 2026',
          classCode: 'CC',
          passengers: [
            { name: 'Amit Patel', ageGender: '32/M', bookingStatus: 'RAC 14', currentStatus: 'RAC 4' },
            { name: 'Sneha Patel', ageGender: '29/F', bookingStatus: 'RAC 15', currentStatus: 'RAC 5' },
          ],
        });
      } else if (lastDigit === 4 || lastDigit === 8 || lastDigit === 9) {
        // WL Demo
        setActiveResult({
          pnr: cleanPnr,
          statusType: 'WL',
          statusText: 'Waiting List (WL)',
          chartStatus: 'Chart Not Prepared',
          train: {
            number: '19010',
            name: 'Saurashtra Mail',
            type: 'Mail / Express',
            from: 'Mumbai Central',
            fromCode: 'BCT',
            to: 'Ahmedabad Junction',
            toCode: 'ADI',
            departureTime: '21:50',
            arrivalTime: '07:15',
          },
          date: 'Sat, 15 Aug 2026',
          classCode: 'SL',
          passengers: [
            { name: 'Vikram Singh', ageGender: '45/M', bookingStatus: 'WL 38', currentStatus: 'WL 9' },
          ],
        });
      } else {
        // Confirmed Demo
        setActiveResult({
          pnr: cleanPnr,
          statusType: 'CNF',
          statusText: 'Confirmed (CNF)',
          chartStatus: 'Chart Prepared',
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
          },
          date: 'Sat, 15 Aug 2026',
          classCode: '3A',
          passengers: [
            { name: 'Rahul Sharma', ageGender: '28/M', bookingStatus: 'CNF', currentStatus: 'CNF / Coach B1 / Seat 1 (LB)' },
            { name: 'Priya Sharma', ageGender: '26/F', bookingStatus: 'CNF', currentStatus: 'CNF / Coach B1 / Seat 3 (UB)' },
          ],
        });
      }
    }, 300);
  }

  function handleSubmit(e) {
    e.preventDefault();
    searchPnr(pnrQuery);
  }

  function handleQuickPnr(pnr) {
    setPnrQuery(pnr);
    searchPnr(pnr);
  }

  return (
    <div className="pnr-page page-main">
      <div className="container pnr-container">
        {/* Search Card */}
        <div className="pnr-card pnr-search-card">
          <div className="pnr-card-head">
            <span className="pnr-head-icon">🔎</span>
            <div>
              <h1 className="pnr-title">{t.pnr.title}</h1>
              <p className="pnr-subtitle">{t.pnr.subtitle}</p>
            </div>
          </div>

          <form className="pnr-form" onSubmit={handleSubmit} noValidate>
            <div className="pnr-input-group">
              <input
                type="text"
                maxLength="10"
                className={`pnr-input ${error ? 'pnr-input--err' : ''}`}
                placeholder={t.pnr.enterPNR}
                value={pnrQuery}
                onChange={e => {
                  setPnrQuery(e.target.value);
                  setError('');
                }}
              />
              <button type="submit" className="pnr-submit-btn" disabled={isLoading}>
                {isLoading ? 'Checking...' : t.pnr.checkStatus}
              </button>
            </div>
            {error && <span className="pnr-error-msg">{error}</span>}
          </form>

          {/* Quick Demo PNR Chips */}
          <div className="pnr-quick-chips">
            <span className="chips-label">Try Demo PNRs:</span>
            {SAMPLE_PNRS.map(sample => (
              <button
                key={sample.pnr}
                type="button"
                className="chip-btn"
                onClick={() => handleQuickPnr(sample.pnr)}
              >
                {sample.pnr} ({sample.type})
              </button>
            ))}
          </div>
        </div>

        {/* Results Card */}
        {activeResult && (
          <div className="pnr-card pnr-result-card">
            {/* Header / PNR status banner */}
            <div className={`pnr-status-header pnr-status--${activeResult.statusType.toLowerCase()}`}>
              <div className="status-main-info">
                <span className="status-label-pnr">PNR {activeResult.pnr}</span>
                <h2 className="status-title-text">{activeResult.statusText}</h2>
              </div>
              <span className="chart-badge">{activeResult.chartStatus}</span>
            </div>

            {/* Train & Journey overview */}
            <div className="pnr-journey-info">
              <div className="train-info-col">
                <h3 className="pnr-train-name">{activeResult.train.name}</h3>
                <p className="pnr-train-num">#{activeResult.train.number} • {activeResult.train.type} • {activeResult.classCode}</p>
              </div>

              <div className="pnr-route-box">
                <div className="endpoint">
                  <span className="time">{activeResult.train.departureTime}</span>
                  <span className="st">{activeResult.train.fromCode}</span>
                </div>
                <span className="arrow">→</span>
                <div className="endpoint">
                  <span className="time">{activeResult.train.arrivalTime}</span>
                  <span className="st">{activeResult.train.toCode}</span>
                </div>
              </div>
            </div>

            <div className="pnr-date-row">
              📅 Journey Date: <strong>{activeResult.date}</strong>
            </div>

            {/* Passenger Status Table */}
            <div className="pnr-passengers-table-wrap">
              <h3 className="table-heading">Passenger Current Status</h3>
              <table className="pnr-table">
                <thead>
                  <tr>
                    <th>Passenger</th>
                    <th>Booking Status</th>
                    <th>Current Status</th>
                  </tr>
                </thead>
                <tbody>
                  {activeResult.passengers.map((p, idx) => (
                    <tr key={idx}>
                      <td>
                        <div className="p-cell">
                          <span className="p-cell-name">{p.name}</span>
                          <span className="p-cell-meta">{p.ageGender}</span>
                        </div>
                      </td>
                      <td>
                        <span className="status-pill status-pill-bkg">{p.bookingStatus}</span>
                      </td>
                      <td>
                        <span className={`status-pill status-pill-cur status-pill--${activeResult.statusType.toLowerCase()}`}>
                          {p.currentStatus}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Footer options */}
            <div className="pnr-result-footer">
              <Link to="/trips" className="pnr-footer-btn">
                🧳 View in My Trips
              </Link>
              <button type="button" className="pnr-footer-btn pnr-footer-btn-alt" onClick={() => window.print()}>
                🖨️ Print Status
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
