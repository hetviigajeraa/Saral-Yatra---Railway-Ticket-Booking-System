import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { translations } from '../translations';

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(() => {
    try {
      return localStorage.getItem('saralyatra_lang') || 'en';
    } catch (e) {
      return 'en';
    }
  });

  const [showWelcomeModal, setShowWelcomeModal] = useState(() => {
    try {
      return !localStorage.getItem('saralyatra_lang_has_chosen');
    } catch (e) {
      return false;
    }
  });

  const setLanguage = useCallback((l) => {
    if (l === 'en' || l === 'hi') {
      setLangState(l);
      try {
        localStorage.setItem('saralyatra_lang', l);
        localStorage.setItem('saralyatra_lang_has_chosen', 'true');
      } catch (e) {
        // Ignore
      }
    }
  }, []);

  const selectInitialLanguage = useCallback((l) => {
    setLanguage(l);
    setShowWelcomeModal(false);
  }, [setLanguage]);

  const toggleLang = useCallback(() => {
    setLangState((prev) => {
      const next = prev === 'en' ? 'hi' : 'en';
      try {
        localStorage.setItem('saralyatra_lang', next);
        localStorage.setItem('saralyatra_lang_has_chosen', 'true');
      } catch (e) {
        // Ignore
      }
      return next;
    });
  }, []);

  const t = useCallback(
    (keyPath) => {
      const keys = keyPath.split('.');
      let value = translations[lang];
      for (const key of keys) {
        if (value === undefined || value === null) return keyPath;
        value = value[key];
      }
      return value ?? keyPath;
    },
    [lang]
  );

  return (
    <LanguageContext.Provider
      value={{
        lang,
        t,
        toggleLang,
        setLanguage,
        showWelcomeModal,
        setShowWelcomeModal,
        selectInitialLanguage,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
}

export function useT() {
  const { lang } = useLanguage();
  return translations[lang];
}
