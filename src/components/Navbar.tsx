import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useThemeStore } from "../store/themeStore";
import { useIntlayer } from "react-intlayer";
import { useLocale } from "react-intlayer";
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
  const content = useIntlayer("app");
  const { isDarkMode, toggleTheme } = useThemeStore();
  const { locale, setLocale } = useLocale();
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

  // Toggle language between English and Turkish (Intlayer)
  const handleLocaleChange = (newLocale: typeof locale) => {
    setLocale(newLocale);
    localStorage.setItem("preferred_locale", newLocale);
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
    <motion.button
      onClick={toggleTheme}
      className={`p-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 ${className}`}
      aria-label={isDarkMode ? content.navbar.lightMode : content.navbar.darkMode}
      title={isDarkMode ? content.navbar.lightMode : content.navbar.darkMode}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        key={isDarkMode ? "dark" : "light"}
        initial={{ rotate: -90, opacity: 0 }}
        animate={{ rotate: 0, opacity: 1 }}
        exit={{ rotate: 90, opacity: 0 }}
        transition={{ duration: 0.2 }}
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
      </motion.div>
    </motion.button>
  );

  // Language toggle button component for reuse
  const LanguageToggleButton = ({ className = "", showLabel = false }) => (
    <motion.button
      onClick={() => handleLocaleChange(locale === "en" ? "tr" : "en")}
      className={`p-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 ${className}`}
      aria-label={content.navbar.language}
      title={content.navbar.language}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="flex items-center">
        <motion.span 
          className="font-semibold text-sm"
          key={locale}
          initial={{ rotateY: 90, opacity: 0 }}
          animate={{ rotateY: 0, opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          {locale === "en" ? "TR" : "EN"}
        </motion.span>
        {showLabel && (
          <span className="ml-2 text-sm">{content.navbar.language}</span>
        )}
      </div>
    </motion.button>
  );

  return (
    <motion.nav
      className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo and brand */}
          <div className="flex items-center">
            <a href="#" className="flex items-center gap-3">
              <motion.div
                onClick={cycleLightningStyle}
                className="cursor-pointer transition-all duration-300 hover:scale-110 p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                title="Click to change lightning style"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {renderLightningIcon()}
              </motion.div>
              <span className="text-xl font-bold bg-gradient-to-r from-primary-600 to-primary-800 dark:from-primary-400 dark:to-primary-600 bg-clip-text text-transparent">
                {content.navbar.title}
              </span>
            </a>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center">
            <ul className="flex space-x-1 mr-6">
              {navItems.map((item) => (
                <li key={item.id}>
                  <motion.a
                    href={item.href}
                    className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400 transition-all duration-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                    target={item.isExternal ? "_blank" : undefined}
                    rel={item.isExternal ? "noopener noreferrer" : undefined}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {content.navbar[item.translationKey.split('.')[1]]}
                  </motion.a>
                </li>
              ))}
            </ul>

            {/* Desktop Theme & Language Toggles */}
            <div className="flex items-center space-x-3">
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
            <motion.button
              className="mobile-menu-button p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-expanded={isMobileMenuOpen}
              aria-label="Toggle menu"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
                animate={isMobileMenuOpen ? { rotate: 90 } : { rotate: 0 }}
                transition={{ duration: 0.2 }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </motion.svg>
            </motion.button>
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
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <motion.div 
              className="px-4 py-4 space-y-2 border-t border-gray-200 dark:border-gray-700 bg-white/95 dark:bg-gray-800/95 backdrop-blur-md"
              initial={{ y: -20 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              {navItems.map((item, index) => (
                <motion.a
                  key={item.id}
                  href={item.href}
                  className="block py-3 px-4 text-base font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 hover:text-primary-600 dark:hover:text-primary-400 rounded-lg transition-all duration-200"
                  target={item.isExternal ? "_blank" : undefined}
                  rel={item.isExternal ? "noopener noreferrer" : undefined}
                  onClick={handleNavLinkClick}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, x: 4 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {content.navbar[item.translationKey.split('.')[1]]}
                </motion.a>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;