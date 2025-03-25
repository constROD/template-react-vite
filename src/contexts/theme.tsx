import { useThemeStore } from '@/stores/use-theme-store';
import { createContext, type ReactNode, useContext, useEffect } from 'react';

const ThemeProviderContext = createContext(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const theme = useThemeStore(s => s.theme);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');

    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';

      root.classList.add(systemTheme);
      return;
    }

    root.classList.add(theme);
  }, [theme]);

  return <ThemeProviderContext.Provider value={null}>{children}</ThemeProviderContext.Provider>;
}

export const useThemeContext = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined) throw new Error('useThemeContext must be used within a ThemeProvider');

  return context;
};
