import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

/**
 * Interface for the theme store state
 */
interface ThemeStore {
  /** Current theme mode (light or dark) */
  isDarkMode: boolean;
  /** Toggle theme between light and dark */
  toggleTheme: () => void;
  /** Set specific theme mode */
  setTheme: (isDark: boolean) => void;
}

/**
 * Theme store with persistent storage
 * Manages application theme (light/dark mode)
 */
export const useThemeStore = create<ThemeStore>()(
  persist(
    (set) => ({
      // Default to system preference if available, otherwise light mode
      isDarkMode: window.matchMedia?.('(prefers-color-scheme: dark)').matches || false,
      
      /**
       * Toggle between light and dark mode
       */
      toggleTheme: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
      
      /**
       * Set specific theme mode
       */
      setTheme: (isDark: boolean) => set({ isDarkMode: isDark }),
    }),
    {
      name: 'shannon-entropy-theme',
      storage: createJSONStorage(() => localStorage),
    }
  )
); 