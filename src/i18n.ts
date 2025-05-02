import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import translation files
import translationEN from './locales/en/translation.json';
import translationTR from './locales/tr/translation.json';

// Get language from localStorage if available
const savedLanguage = localStorage.getItem('language-storage')
  ? JSON.parse(localStorage.getItem('language-storage') || '{}')?.state?.language
  : null;

const resources = {
  en: {
    translation: translationEN,
  },
  tr: {
    translation: translationTR,
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: savedLanguage || 'en', // Use saved language or default to English
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // React already safes from XSS
    },
  });

export default i18n; 