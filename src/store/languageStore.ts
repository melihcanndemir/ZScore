import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import i18n from '../i18n';

/**
 * Available languages supported by the application
 */
export type SupportedLanguage = 'en' | 'tr';

/**
 * Interface for the language state store
 */
interface LanguageState {
  language: SupportedLanguage;
  setLanguage: (language: SupportedLanguage) => void;
  initializeLanguage: () => void;
  isLanguageInitialized: boolean;
}

/**
 * Check if a language is supported by the application
 * @param lang - The language code to check
 * @returns boolean indicating if the language is supported
 */
const isSupportedLanguage = (lang: string): lang is SupportedLanguage => {
  return ['en', 'tr'].includes(lang);
};

/**
 * Zustand store for managing language state
 */
export const useLanguageStore = create<LanguageState>()(
  persist(
    (set, get) => ({
      language: (isSupportedLanguage(i18n.language) ? i18n.language : 'en') as SupportedLanguage,
      isLanguageInitialized: false,
      
      // Set the application language
      setLanguage: (language: SupportedLanguage) => {
        i18n.changeLanguage(language);
        set({ language });
      },
      
      // Initialize language from browser detection or stored value
      initializeLanguage: () => {
        const { isLanguageInitialized } = get();
        
        // Skip if already initialized
        if (isLanguageInitialized) return;
        
        // Current language from i18n (after detection)
        const detectedLanguage = i18n.language;
        
        if (isSupportedLanguage(detectedLanguage)) {
          set({ 
            language: detectedLanguage,
            isLanguageInitialized: true
          });
        } else {
          set({ 
            language: 'en', 
            isLanguageInitialized: true 
          });
        }
      }
    }),
    {
      name: 'language-storage',
    }
  )
); 