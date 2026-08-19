import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useT } from '../context/LanguageContext';
import { trains, getTrainsByRoute } from '../data/trains';
import TrainCard from '../components/trains/TrainCard';
import SearchSummaryBar from '../components/trains/SearchSummaryBar';
import HelpMeChooseModal from '../components/ui/HelpMeChooseModal';
import { fetchAiRecommendations } from '../api/aiClient';
import './TrainResults.css';

const SORT_OPTIONS = [
  { key: 'recommended', labelKey: 'sortRecommended' },
  { key: 'cheapest',    labelKey: 'sortCheapest' },
  { key: 'fastest',     labelKey: 'sortFastest' },
];

export default function TrainResults() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const t = useT();

  const fromCode = params.get('from') || '';
  const toCode   = params.get('to')   || '';
  const date     = params.get('date') || '';
  const adults   = parseInt(params.get('adults') || '1', 10);
  const cls      = params.get('class') || '';

  const [sortKey, setSortKey] = useState('recommended');
  const [isHmcOpen, setIsHmcOpen] = useState(false);
  const [apiTrains, setApiTrains] = useState(null);
  const [isFromPython, setIsFromPython] = useState(false);

  // Fetch Python Flask recommendations on mount / route param change
  useEffect(() => {
    let isMounted = true;
    fetchAiRecommendations({ fromCode, toCode }).then(res => {
      if (isMounted && res.success && res.trains) {
        setApiTrains(res.trains);
        setIsFromPython(true);
      }
    });
    return () => { isMounted = false; };
  }, [fromCode, toCode]);

  // Get matching trains (Python API or local fallback)
  const routeTrains = useMemo(() => {
    if (apiTrains && apiTrains.length > 0) return apiTrains;
    return getTrainsByRoute(fromCode, toCode);
  }, [apiTrains, fromCode, toCode]);
  const hasExactMatch = fromCode && toCode && routeTrains.length > 0 &&
    routeTrains[0].fromCode === fromCode && routeTrains[0].toCode === toCode;

  // Sort
  const sorted = useMemo(() => {
    const arr = [...routeTrains];
    if (sortKey === 'recommended') {
      return arr.sort((a, b) => b.aiScore - a.aiScore);
    }
    if (sortKey === 'cheapest') {
      return arr.sort((a, b) => {
        const aMin = Math.min(...a.classes.map(c => c.fare));
        const bMin = Math.min(...b.classes.map(c => c.fare));
        return aMin - bMin;
      });
    }
    if (sortKey === 'fastest') {
      return arr.sort((a, b) => a.durationMins - b.durationMins);
    }
    return arr;
  }, [routeTrains, sortKey]);

  // Labels from stations data
  const fromLabel = fromCode || 'Origin';
  const toLabel   = toCode   || 'Destination';

  function handleSelectTrain(train) {
    navigate(`/passengers?trainId=${train.id}&from=${fromCode}&to=${toCode}&date=${date}&adults=${adults}&class=${cls}`);
  }

  function handleViewDetails(train) {
    navigate(`/train/${train.id}`);
  }

  return (
    <div className="results-page page-main">

      {/* Top summary bar */}
      <SearchSummaryBar
        fromCode={fromCode}
        toCode={toCode}
        fromLabel={fromLabel}
        toLabel={toLabel}
        date={date}
        adults={adults}
        cls={cls}
      />

      <div className="container results-layout">

        {/* ---- Results Column ---- */}
        <main className="results-main" id="main-content" aria-label="Train results">

          {/* Header row */}
          <div className="results-header">
            <div className="results-count-wrap">
              <h1 className="results-heading">
                {t.results.title}
              </h1>
              <span className="results-count">
                {t.results.showing(sorted.length)}
              </span>
            </div>

            {/* Sort tabs */}
            <div
              className="sort-tabs"
              role="group"
              aria-label={t.results.sortBy}
            >
              <span className="sort-label">{t.results.sortBy}:</span>
              {SORT_OPTIONS.map(opt => (
                <button
                  key={opt.key}
                  className={`sort-tab${sortKey === opt.key ? ' sort-tab--active' : ''}`}
                  onClick={() => setSortKey(opt.key)}
                  aria-pressed={sortKey === opt.key}
                >
                  {opt.key === 'recommended' && <SparkIcon />}
                  {opt.key === 'cheapest'    && <RupeeIcon />}
                  {opt.key === 'fastest'     && <ZapIcon />}
                  {t.results[opt.labelKey]}
                </button>
              ))}

              <button
                type="button"
                className="sort-tab hmc-trigger-tab"
                onClick={() => setIsHmcOpen(true)}
              >
                ⚙️ Priorities
              </button>
            </div>
          </div>

          {/* Route notice if showing fallback */}
          {!hasExactMatch && fromCode && (
            <div className="results-notice" role="status">
              <InfoIcon />
              <span>{t.results.noTrainsRoute} {t.results.showingAll}</span>
            </div>
          )}

          {/* Train list */}
          {sorted.length === 0 ? (
            <div className="results-empty">
              <EmptyIcon />
              <p>{t.results.noResults}</p>
            </div>
          ) : (
            <div className="train-list" role="list">
              {sorted.map((train, idx) => (
                <TrainCard
                  key={train.id}
                  train={train}
                  position={idx}
                  sortKey={sortKey}
                  onSelect={handleSelectTrain}
                  onViewDetails={handleViewDetails}
                />
              ))}
            </div>
          )}
        </main>
      </div>

      <HelpMeChooseModal
        isOpen={isHmcOpen}
        onClose={() => setIsHmcOpen(false)}
      />
    </div>
  );
}

/* ---- Icons ---- */
function SparkIcon() {
  return <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2l2.4 7.2H22l-6.2 4.5 2.4 7.3L12 17l-6.2 4 2.4-7.3L2 9.2h7.6z"/></svg>;
}
function RupeeIcon() {
  return <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6 3h12M6 8h12M15 21 6 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><path d="M6 8c0 4 2.7 6 6 6s6-2 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>;
}
function ZapIcon() {
  return <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/></svg>;
}
function InfoIcon() {
  return <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8"/><path d="M12 8v4M12 16h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>;
}
function EmptyIcon() {
  return <svg width="48" height="48" viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3" y="4" width="18" height="12" rx="3" stroke="currentColor" strokeWidth="1.5"/><path d="M3 13h18" stroke="currentColor" strokeWidth="1.5"/><circle cx="7.5" cy="18.5" r="1.5" fill="currentColor" opacity="0.3"/><circle cx="16.5" cy="18.5" r="1.5" fill="currentColor" opacity="0.3"/></svg>;
}
