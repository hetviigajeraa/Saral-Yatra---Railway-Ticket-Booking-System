import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useLanguage, useT } from '../../context/LanguageContext';
import './Navbar.css';

const NAV_LINKS = [
  { key: 'nav.home',      path: '/',       end: true },
  { key: 'nav.explore',   path: '/trains', end: false },
  { key: 'nav.book',      path: '/book',   end: false },
  { key: 'nav.myTrips',   path: '/trips',  end: false },
  { key: 'nav.pnrStatus', path: '/pnr',    end: false },
];

const MOBILE_NAV = [
  { key: 'nav.home',      path: '/',       end: true,  icon: <HomeIcon /> },
  { key: 'nav.explore',   path: '/trains', end: false, icon: <ExploreIcon /> },
  { key: 'nav.book',      path: '/book',   end: false, icon: <BookIcon /> },
  { key: 'nav.myTrips',   path: '/trips',  end: false, icon: <TripsIcon /> },
  { key: 'nav.pnrStatus', path: '/pnr',    end: false, icon: <PnrIcon /> },
];

export default function Navbar() {
  const { lang, toggleLang, setShowWelcomeModal } = useLanguage();
  const t = useT();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled]  = useState(false);
  const location  = useLocation();
  const menuRef   = useRef(null);
  const burgerRef = useRef(null);

  // Close on route change
  useEffect(() => { setMenuOpen(false); }, [location.pathname]);

  // Scroll shadow
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close on outside click
  useEffect(() => {
    if (!menuOpen) return;
    const onClick = (e) => {
      if (
        menuRef.current && !menuRef.current.contains(e.target) &&
        burgerRef.current && !burgerRef.current.contains(e.target)
      ) setMenuOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, [menuOpen]);

  // Get translation value by dotted key
  function tKey(key) {
    const parts = key.split('.');
    let v = t;
    for (const p of parts) { if (!v) return key; v = v[p]; }
    return v ?? key;
  }

  return (
    <>
      <header
        className={`navbar${scrolled ? ' navbar--scrolled' : ''}`}
        role="banner"
      >
        <div className="container navbar-inner">

          {/* Logo */}
          <Link to="/" className="navbar-logo" aria-label="SaralYatra — Home">
            <LogoIcon />
            <span className="navbar-logo-text">
              Saral<span className="navbar-logo-accent">Yatra</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="navbar-links" aria-label="Main navigation">
            {NAV_LINKS.map(link => (
              <NavLink
                key={link.path}
                to={link.path}
                end={link.end}
                className={({ isActive }) =>
                  `navbar-link${isActive ? ' navbar-link--active' : ''}`
                }
              >
                {tKey(link.key)}
              </NavLink>
            ))}
          </nav>

          {/* Actions */}
          <div className="navbar-actions">
            {/* Lang toggle */}
            <button
              className="navbar-lang-btn"
              onClick={toggleLang}
              aria-label={t.lang.switchTo}
              title={t.lang.switchTo}
            >
              <span className={lang === 'en' ? 'lang-on' : ''}>EN</span>
              <span className="lang-pipe" aria-hidden="true">|</span>
              <span className={lang === 'hi' ? 'lang-on' : ''} lang="hi">हि</span>
            </button>

            {/* Profile */}
            <button className="navbar-profile-btn" aria-label={t.nav.profile}>
              <ProfileIcon />
            </button>

            {/* Burger (mobile) */}
            <button
              ref={burgerRef}
              className={`navbar-burger${menuOpen ? ' navbar-burger--open' : ''}`}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              onClick={() => setMenuOpen(v => !v)}
            >
              <span /><span /><span />
            </button>
          </div>
        </div>

        {/* Mobile slide-down menu */}
        <div
          id="mobile-menu"
          ref={menuRef}
          className={`navbar-mobile${menuOpen ? ' navbar-mobile--open' : ''}`}
          aria-hidden={!menuOpen}
        >
          <nav aria-label="Mobile main navigation">
            {NAV_LINKS.map(link => (
              <NavLink
                key={link.path}
                to={link.path}
                end={link.end}
                className={({ isActive }) =>
                  `navbar-mobile-link${isActive ? ' navbar-mobile-link--active' : ''}`
                }
                tabIndex={menuOpen ? 0 : -1}
              >
                {tKey(link.key)}
              </NavLink>
            ))}
          </nav>
          <div className="navbar-mobile-footer">
            <button
              className="navbar-lang-btn navbar-lang-btn--wide"
              onClick={() => { setMenuOpen(false); setShowWelcomeModal(true); }}
              tabIndex={menuOpen ? 0 : -1}
              aria-label="Change Language"
            >
              🌐 Change Language / भाषा बदलें
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Bottom Nav */}
      <nav className="bottom-nav" aria-label="Mobile bottom navigation" role="navigation">
        {MOBILE_NAV.map(link => (
          <NavLink
            key={link.path}
            to={link.path}
            end={link.end}
            className={({ isActive }) =>
              `bottom-nav-item${isActive ? ' bottom-nav-item--active' : ''}`
            }
          >
            <span className="bottom-nav-icon" aria-hidden="true">{link.icon}</span>
            <span className="bottom-nav-label">{tKey(link.key)}</span>
          </NavLink>
        ))}
      </nav>
    </>
  );
}

/* ---- SVG Icons ---- */
function LogoIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="4" width="18" height="12" rx="3" stroke="currentColor" strokeWidth="1.8"/>
      <path d="M3 13h18" stroke="currentColor" strokeWidth="1.8"/>
      <circle cx="7.5" cy="18.5" r="1.5" fill="currentColor"/>
      <circle cx="16.5" cy="18.5" r="1.5" fill="currentColor"/>
      <path d="M7.5 17L6 20M16.5 17l1.5 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}
function ProfileIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.8"/>
      <path d="M4 19.5C4 16.42 7.58 14 12 14s8 2.42 8 5.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  );
}
function HomeIcon() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M3 10.5L12 3l9 7.5V20a1 1 0 01-1 1H5a1 1 0 01-1-1v-9.5z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/><path d="M9 21V12h6v9" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/></svg>;
}
function ExploreIcon() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8"/><path d="M16.24 7.76l-2.12 6.36-6.36 2.12 2.12-6.36 6.36-2.12z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/></svg>;
}
function BookIcon() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="18" height="18" rx="3" stroke="currentColor" strokeWidth="1.8"/><path d="M8 12h8M8 8h5M8 16h4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/></svg>;
}
function TripsIcon() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>;
}
function PnrIcon() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><rect x="2" y="5" width="20" height="14" rx="3" stroke="currentColor" strokeWidth="1.8"/><path d="M6 9h3M6 12h4M6 15h2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><rect x="13" y="8" width="5" height="7" rx="1" stroke="currentColor" strokeWidth="1.5"/></svg>;
}
