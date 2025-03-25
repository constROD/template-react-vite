import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export type ThemeStoreState = {
  theme: 'light' | 'dark' | 'system';
};

export type ThemeStoreActions = {
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
};

export type ThemeStore = ThemeStoreState & ThemeStoreActions;

export const DEFAULT_THEME_STORE_STATE: ThemeStoreState = {
  theme: 'system',
};

export const useThemeStore = create<ThemeStore>()(
  persist(
    set => ({
      ...DEFAULT_THEME_STORE_STATE,
      setTheme: (theme: ThemeStoreState['theme']) => set({ theme }),
    }),
    {
      name: '__theme_storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
