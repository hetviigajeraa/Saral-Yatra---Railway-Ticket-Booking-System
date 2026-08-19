import React from 'react';
import './Button.css';

/**
 * Button component
 * @param {string} variant - 'primary' | 'secondary' | 'ghost' | 'danger'
 * @param {string} size - 'sm' | 'md' | 'lg'
 * @param {boolean} fullWidth
 * @param {boolean} loading
 * @param {string} iconLeft - JSX icon element
 * @param {string} iconRight - JSX icon element
 */
export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  loading = false,
  disabled = false,
  iconLeft,
  iconRight,
  className = '',
  type = 'button',
  ...props
}) {
  return (
    <button
      type={type}
      className={[
        'btn',
        `btn-${variant}`,
        `btn-${size}`,
        fullWidth ? 'btn-full' : '',
        loading ? 'btn-loading' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <span className="btn-spinner" aria-hidden="true" />
      )}
      {!loading && iconLeft && (
        <span className="btn-icon btn-icon-left" aria-hidden="true">
          {iconLeft}
        </span>
      )}
      <span className="btn-label">{children}</span>
      {!loading && iconRight && (
        <span className="btn-icon btn-icon-right" aria-hidden="true">
          {iconRight}
        </span>
      )}
    </button>
  );
}
