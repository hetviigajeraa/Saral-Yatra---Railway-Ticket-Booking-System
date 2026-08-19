import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useT } from '../../context/LanguageContext';
import './HelpMeChooseModal.css';

const PRIORITIES = [
  {
    id: 'lower_price',
    title: 'Lower Price',
    description: 'Prioritize budget-friendly fares and value for money',
    icon: '💰',
  },
  {
    id: 'shorter_journey',
    title: 'Shorter Journey',
    description: 'Find superfast & express trains with shortest travel duration',
    icon: '⚡',
  },
  {
    id: 'departure_time',
    title: 'Preferred Departure Time',
    description: 'Filter by morning, afternoon, evening, or overnight departures',
    icon: '🌅',
  },
  {
    id: 'seat_availability',
    title: 'Better Seat Availability',
    description: 'Focus on trains with high confirmed seat availability',
    icon: '💺',
  },
];

export default function HelpMeChooseModal({ isOpen, onClose, onApply }) {
  const t = useT();
  const navigate = useNavigate();

  const [selectedPriorities, setSelectedPriorities] = useState(['lower_price', 'shorter_journey']);
  const [preferredTime, setPreferredTime] = useState('morning');
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Load existing saved preferences on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('saralyatra_ai_preferences');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.priorities) setSelectedPriorities(parsed.priorities);
        if (parsed.preferredTime) setPreferredTime(parsed.preferredTime);
      }
    } catch (e) {
      // Ignore storage errors
    }
  }, [isOpen]);

  if (!isOpen) return null;

  function togglePriority(id) {
    setSelectedPriorities(prev =>
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
  }

  function handleSaveAndSearch() {
    const preferencesData = {
      priorities: selectedPriorities,
      preferredTime: selectedPriorities.includes('departure_time') ? preferredTime : null,
      updatedAt: new Date().toISOString(),
    };

    // Save to localStorage for AI scoring simulation
    try {
      localStorage.setItem('saralyatra_ai_preferences', JSON.stringify(preferencesData));
    } catch (e) {
      console.error('Failed to save preferences', e);
    }

    setSavedSuccess(true);

    setTimeout(() => {
      setSavedSuccess(false);
      if (onApply) onApply(preferencesData);
      onClose();
      navigate('/trains?from=BCT&to=ADI&aiMode=1');
    }, 600);
  }

  return (
    <div className="hmc-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="hmc-modal-title">
      <div className="hmc-modal" onClick={e => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="hmc-header">
          <div className="hmc-title-group">
            <span className="hmc-icon-badge">✨</span>
            <div>
              <h2 className="hmc-title" id="hmc-modal-title">Help Me Choose</h2>
              <p className="hmc-subtitle">Select what matters most for your trip to get AI recommendations</p>
            </div>
          </div>
          <button type="button" className="hmc-close-btn" onClick={onClose} aria-label="Close modal">
            ✕
          </button>
        </div>

        {/* Priorities Selection List */}
        <div className="hmc-body">
          <p className="hmc-section-label">Select your travel priorities (select multiple):</p>
          <div className="hmc-priorities-grid">
            {PRIORITIES.map(item => {
              const isChecked = selectedPriorities.includes(item.id);
              return (
                <div
                  key={item.id}
                  className={`hmc-priority-card ${isChecked ? 'hmc-priority-card--selected' : ''}`}
                  onClick={() => togglePriority(item.id)}
                >
                  <div className="hmc-card-left">
                    <span className="hmc-item-icon">{item.icon}</span>
                    <div className="hmc-item-text">
                      <h3 className="hmc-item-title">{item.title}</h3>
                      <p className="hmc-item-desc">{item.description}</p>
                    </div>
                  </div>
                  <div className="hmc-checkbox">
                    {isChecked && <span>✓</span>}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Time Picker Sub-option if departure_time selected */}
          {selectedPriorities.includes('departure_time') && (
            <div className="hmc-time-section">
              <label className="hmc-time-label">Preferred Time Slot:</label>
              <div className="hmc-time-options">
                {[
                  { id: 'morning', label: '🌅 Morning (06:00 - 12:00)' },
                  { id: 'afternoon', label: '☀️ Afternoon (12:00 - 17:00)' },
                  { id: 'evening', label: '🌆 Evening (17:00 - 21:00)' },
                  { id: 'night', label: '🌙 Overnight (21:00 - 06:00)' },
                ].map(slot => (
                  <button
                    key={slot.id}
                    type="button"
                    className={`hmc-time-btn ${preferredTime === slot.id ? 'hmc-time-btn--active' : ''}`}
                    onClick={() => setPreferredTime(slot.id)}
                  >
                    {slot.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="hmc-footer">
          <span className="hmc-saved-badge">
            {savedSuccess ? '✓ Preferences saved!' : 'Saved locally for AI scoring'}
          </span>
          <div className="hmc-actions">
            <button type="button" className="hmc-btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="button" className="hmc-btn-primary" onClick={handleSaveAndSearch}>
              Save & Find Trains
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
