import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage, useT } from '../../context/LanguageContext';
import './Footer.css';

const FOOTER_LINKS = [
  { key: 'book',      to: '/book' },
  { key: 'explore',   to: '/trains' },
  { key: 'myTrips',   to: '/trips' },
  { key: 'pnrStatus', to: '/pnr' },
  { key: 'help',      to: '/about' },
  { key: 'about',     to: '/about' },
];

export default function Footer() {
  const { lang, toggleLang } = useLanguage();
  const t = useT();
  const year = new Date().getFullYear();

  return (
    <footer className="footer" role="contentinfo">
      <div className="container footer-top">

        {/* Brand */}
        <div className="footer-brand">
          <Link to="/" className="footer-logo" aria-label="SaralYatra home">
            Saral<span className="footer-logo-accent">Yatra</span>
          </Link>
          <p className="footer-tagline">{t.footer.tagline}</p>
          <button
            className="footer-lang-btn"
            onClick={toggleLang}
            aria-label={t.lang.switchTo}
          >
            <span className={lang === 'en' ? 'flang-active' : ''}>English</span>
            <span className="flang-sep" aria-hidden="true">|</span>
            <span className={lang === 'hi' ? 'flang-active' : ''} lang="hi">हिन्दी</span>
          </button>
        </div>

        {/* Navigation links */}
        <nav className="footer-links" aria-label="Footer navigation">
          {FOOTER_LINKS.map(link => (
            <Link key={link.key} to={link.to} className="footer-link">
              {t.footer.links[link.key]}
            </Link>
          ))}
        </nav>

      </div>

      {/* Bottom bar */}
      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <p className="footer-copy">{t.footer.copyright(year)}</p>
          <p className="footer-disclaimer">{t.footer.disclaimer}</p>
        </div>
        <div className="container">
          <p className="footer-credit">© 2026 SaralYatra · Designed &amp; Developed by Hetvi Gajera</p>
        </div>
      </div>
    </footer>
  );
}
