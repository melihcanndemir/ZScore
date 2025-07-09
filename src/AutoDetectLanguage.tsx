import { useEffect, useRef } from "react";
import { useLocale } from "react-intlayer";
import { Locales } from "intlayer";

const LOCALE_STORAGE_KEY = "preferred_locale";

export default function AutoDetectLanguage() {
  const { setLocale, availableLocales } = useLocale();
  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    // Read language from localStorage
    const savedLocale = localStorage.getItem(LOCALE_STORAGE_KEY);
    if (savedLocale && availableLocales.includes(savedLocale as Locales)) {
      setLocale(savedLocale as Locales);
      return;
    }

    // If no saved language, use browser language
    const browserLang = navigator.language.split("-")[0];
    if (availableLocales.includes(browserLang as Locales)) {
      setLocale(browserLang as Locales);
      localStorage.setItem(LOCALE_STORAGE_KEY, browserLang);
    }
  }, [availableLocales, setLocale]);

  return null;
}