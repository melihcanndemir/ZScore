import React, { useEffect, useRef } from "react";
import Navbar from "./components/Navbar";
import Header from "./components/Header";
import TextInput from "./components/TextInput";
import ResultsDisplay from "./components/ResultsDisplay";
import HistoryPanel from "./components/HistoryPanel";
import Footer from "./components/Footer";
import { useThemeStore } from "./store/themeStore";
import { useLocale } from "react-intlayer";
import { Locales } from "intlayer";

const LOCALE_STORAGE_KEY = "preferred_locale";

function useAutoDetectLanguage() {
  const { setLocale, availableLocales } = useLocale();
  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    const savedLocale = localStorage.getItem(LOCALE_STORAGE_KEY);
    if (savedLocale && availableLocales.includes(savedLocale as Locales)) {
      setLocale(savedLocale as Locales);
      return;
    }

    const browserLang = navigator.language.split("-")[0];
    if (availableLocales.includes(browserLang as Locales)) {
      setLocale(browserLang as Locales);
      localStorage.setItem(LOCALE_STORAGE_KEY, browserLang);
    }
  }, [availableLocales, setLocale]);
}

/**
 * Main App component that composes all other components
 */
const App: React.FC = () => {
  const { isDarkMode } = useThemeStore();
  useAutoDetectLanguage();

  // Apply dark mode class to document on mount based on store state
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <Header />

        <main className="flex-grow py-6">
          <div className="container mx-auto px-4">
            <TextInput />
            <ResultsDisplay />
            <HistoryPanel />
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default App;
