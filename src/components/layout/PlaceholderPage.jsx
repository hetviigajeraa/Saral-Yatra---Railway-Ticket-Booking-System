import React from 'react';
import { Link } from 'react-router-dom';
import './PlaceholderPage.css';

/**
 * Shared placeholder for pages not yet built.
 */
export default function PlaceholderPage({
  title,
  subtitle,
  icon,
  backTo = '/',
  backLabel = 'Back to Home',
  badge,
}) {
  return (
    <main className="placeholder-page page-main">
      <div className="container placeholder-content">
        {icon && (
          <div className="placeholder-icon" aria-hidden="true">
            {icon}
          </div>
        )}
        {badge && (
          <span className="placeholder-badge">{badge}</span>
        )}
        <h1 className="placeholder-title">{title}</h1>
        {subtitle && (
          <p className="placeholder-subtitle">{subtitle}</p>
        )}
        <div className="placeholder-note">
          <span className="placeholder-note-dot" aria-hidden="true" />
          This page is under construction. Full functionality coming soon.
        </div>
        <Link to={backTo} className="placeholder-back-btn">
          ← {backLabel}
        </Link>
      </div>
    </main>
  );
}
