import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  isExternal?: boolean;
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
  {
    id: "github",
    translationKey: "navbar.github",
    href: "https://github.com/melihcanndemir/ZScore",
    isExternal: true,
  },
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (
        isMobileMenuOpen &&
        !target.closest(".mobile-menu") &&
        !target.closest(".mobile-menu-button")
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  // Close mobile menu when clicking a nav link
  const handleNavLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

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

  // Theme toggle button component for reuse
  const ThemeToggleButton = ({ className = "" }) => (
    <button
      onClick={toggleTheme}
      className={`p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 ${className}`}
      aria-label={isDarkMode ? t("navbar.lightMode") : t("navbar.darkMode")}
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
  );

  // Language toggle button component for reuse
  const LanguageToggleButton = ({ className = "", showLabel = false }) => (
    <button
      onClick={toggleLanguage}
      className={`p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 ${className}`}
      aria-label={t("navbar.language")}
      title={t("navbar.language")}
    >
      <div className="flex items-center">
        <span className="font-medium text-sm">
          {language === "en" ? "TR" : "EN"}
        </span>
        {showLabel && (
          <span className="ml-2 text-sm">{t("navbar.language")}</span>
        )}
      </div>
    </button>
  );

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

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center">
            <ul className="flex space-x-4 mr-4">
              {navItems.map((item) => (
                <li key={item.id}>
                  <a
                    href={item.href}
                    className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400 transition-colors"
                    target={item.isExternal ? "_blank" : undefined}
                    rel={item.isExternal ? "noopener noreferrer" : undefined}
                  >
                    {t(item.translationKey)}
                  </a>
                </li>
              ))}
            </ul>

            {/* Desktop Theme & Language Toggles */}
            <div className="flex items-center space-x-2">
              <LanguageToggleButton />
              <ThemeToggleButton />
            </div>
          </div>

          {/* Mobile menu button and toggles */}
          <div className="md:hidden flex items-center space-x-2">
            <div className="flex items-center space-x-2">
              <LanguageToggleButton />
              <ThemeToggleButton />
            </div>
            <button
              className="mobile-menu-button p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-expanded={isMobileMenuOpen}
              aria-label="Toggle menu"
            >
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

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="mobile-menu md:hidden"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="px-4 py-3 space-y-1 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-lg">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={item.href}
                  className="block py-2 px-3 text-base font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 hover:text-primary-600 dark:hover:text-primary-400 rounded-md transition-colors"
                  target={item.isExternal ? "_blank" : undefined}
                  rel={item.isExternal ? "noopener noreferrer" : undefined}
                  onClick={handleNavLinkClick}
                >
                  {t(item.translationKey)}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
