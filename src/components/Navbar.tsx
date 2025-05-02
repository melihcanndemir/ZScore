import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useThemeStore } from "../store/themeStore";
import { useLanguageStore } from "../store/languageStore";
import { useTranslation } from "react-i18next";
import { Lightning, LightningAlt, LightningFilled } from "./icons";

/**
 * Navigation item interface
 */
interface NavItem {
  id: string;
  translationKey: string;
  href: string;
}

/**
 * Navigation items for the application
 */
const navItems: NavItem[] = [
  { id: "home", translationKey: "navbar.home", href: "#" },
  { id: "about", translationKey: "navbar.about", href: "#about" },
  {
    id: "calculator",
    translationKey: "navbar.calculator",
    href: "#calculator",
  },
  { id: "history", translationKey: "navbar.history", href: "#history" },
];

// Lightning icon type enum
type LightningType = "default" | "alt" | "filled";

// Declare window.updateFavicon for TypeScript
declare global {
  interface Window {
    updateFavicon: (type: LightningType) => void;
  }
}

/**
 * Navbar component with navigation items, theme toggle and language switcher
 */
const Navbar: React.FC = () => {
  const { t } = useTranslation();
  const { isDarkMode, toggleTheme } = useThemeStore();
  const { language, setLanguage } = useLanguageStore();
  const [lightningType, setLightningType] = useState<LightningType>(() => {
    // Initialize from localStorage if available
    const storedType = localStorage.getItem("zscore-favicon-type");
    if (
      storedType === "alt" ||
      storedType === "filled" ||
      storedType === "default"
    ) {
      return storedType;
    }
    return "default";
  });

  // Apply dark mode class to document
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  // Cycle through lightning styles
  const cycleLightningStyle = () => {
    setLightningType((prev) => {
      const newType =
        prev === "default" ? "alt" : prev === "alt" ? "filled" : "default";

      // Update favicon to match lightning style
      if (window.updateFavicon) {
        window.updateFavicon(newType);
      }

      return newType;
    });
  };

  // Toggle language between English and Turkish
  const toggleLanguage = () => {
    setLanguage(language === "en" ? "tr" : "en");
  };

  // Render the current lightning icon
  const renderLightningIcon = () => {
    switch (lightningType) {
      case "alt":
        return (
          <LightningAlt className="w-8 h-8 text-primary-600 dark:text-primary-400" />
        );
      case "filled":
        return (
          <LightningFilled className="w-8 h-8 text-primary-600 dark:text-primary-400" />
        );
      default:
        return (
          <Lightning className="w-8 h-8 text-primary-600 dark:text-primary-400" />
        );
    }
  };

  return (
    <motion.nav
      className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo and brand */}
          <div className="flex items-center">
            <a href="#" className="flex items-center gap-2">
              <div
                onClick={cycleLightningStyle}
                className="cursor-pointer transition-all duration-300 hover:scale-110"
                title="Click to change lightning style"
              >
                {renderLightningIcon()}
              </div>
              <span className="text-lg font-bold text-primary-700 dark:text-primary-400">
                {t("navbar.title")}
              </span>
            </a>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex">
            <ul className="flex space-x-4">
              {navItems.map((item) => (
                <li key={item.id}>
                  <a
                    href={item.href}
                    className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400 transition-colors"
                  >
                    {t(item.translationKey)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Theme Toggle and Language Switcher */}
          <div className="flex items-center space-x-2">
            {/* Language Switcher */}
            <button
              onClick={toggleLanguage}
              className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500"
              aria-label={t("navbar.language")}
              title={t("navbar.language")}
            >
              <span className="font-medium text-sm">
                {language === "en" ? "TR" : "EN"}
              </span>
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500"
              aria-label={
                isDarkMode ? t("navbar.lightMode") : t("navbar.darkMode")
              }
              title={isDarkMode ? t("navbar.lightMode") : t("navbar.darkMode")}
            >
              {isDarkMode ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
                  />
                </svg>
              )}
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button className="mobile-menu-button p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu (hidden by default) */}
      {/* This would be expanded with state management for mobile menu toggle */}
    </motion.nav>
  );
};

export default Navbar;
