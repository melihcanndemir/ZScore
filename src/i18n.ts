import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translation files
import translationEN from './locales/en/translation.json';
import translationTR from './locales/tr/translation.json';

// Get language from localStorage if available
const savedLanguage = localStorage.getItem('language-storage')
  ? JSON.parse(localStorage.getItem('language-storage') || '{}')?.state?.language
  : null;

// Define supported languages
const supportedLanguages = ['en', 'tr'];

// Helper function to determine language
const determineLanguage = (): string => {
  // If user already has a saved language preference, use that
  if (savedLanguage) {
    return savedLanguage;
  }
  
  // Otherwise detect from browser
  const browserLang = navigator.language.split('-')[0];
  
  // Check if browser language is supported
  if (supportedLanguages.includes(browserLang)) {
    return browserLang;
  }
  
  // Default fallback
  return 'en';
};

const resources = {
  en: {
    translation: translationEN,
  },
  tr: {
    translation: translationTR,
  },
};

i18n
  .use(LanguageDetector) // Use language detector plugin
  .use(initReactI18next)
  .init({
    resources,
    lng: determineLanguage(), // Use determined language
    fallbackLng: 'en',
    detection: {
      order: ['localStorage', 'navigator'],
      lookupLocalStorage: 'language-storage',
      caches: ['localStorage'],
    },
    interpolation: {
      escapeValue: false, // React already safes from XSS
    },
  });

export default i18n; 