import React, { useEffect } from "react";
import Navbar from "./components/Navbar";
import Header from "./components/Header";
import TextInput from "./components/TextInput";
import ResultsDisplay from "./components/ResultsDisplay";
import HistoryPanel from "./components/HistoryPanel";
import Footer from "./components/Footer";
import { useThemeStore } from "./store/themeStore";
import { useLanguageStore } from "./store/languageStore";

/**
 * Main App component that composes all other components
 */
const App: React.FC = () => {
  const { isDarkMode } = useThemeStore();
  const { initializeLanguage } = useLanguageStore();

  // Initialize language on application load
  useEffect(() => {
    initializeLanguage();
  }, [initializeLanguage]);

  // Apply dark mode class to document on mount based on store state
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
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
  );
};

export default App;
