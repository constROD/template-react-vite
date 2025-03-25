import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { type AuthenticatedUser } from '@/types/auth';

export type SessionStoreState = {
  user: AuthenticatedUser | null;
};

export type SessionStoreActions = {
  reset: () => void;
  setUser: (user: AuthenticatedUser | null) => void;
};

export type SessionStore = SessionStoreState & SessionStoreActions;

export const DEFAULT_SESSION_STORE_STATE: SessionStoreState = {
  user: null,
};

export const useSessionStore = create<SessionStore>()(
  persist(
    set => ({
      ...DEFAULT_SESSION_STORE_STATE,
      reset: () => set(DEFAULT_SESSION_STORE_STATE),
      setUser: (user: AuthenticatedUser | null) => set({ user }),
    }),
    {
      name: '__session_storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
