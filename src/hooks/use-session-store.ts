import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { type AuthenticatedUser } from '@/types/auth';

export type SessionStoreState = {
  user: AuthenticatedUser | null;
};

export type SessionStoreActions = {
  reset: () => void;
  setUser: (user: AuthenticatedUser | null) => void;
  login: (email: string, password: string) => void;
  logout: () => void;
  verifySession: () => void;
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
      login: (email: string, password: string) => {
        // TODO: Implement login logic
        // eslint-disable-next-line no-console
        console.log(email, password);
        const user = {
          id: '1',
          email,
          name: 'Test User',
          role: 'Admin',
        } satisfies AuthenticatedUser;
        set({ user });
      },
      logout: () => {
        // TODO: Implement logout logic
        set({ user: null });
      },
      verifySession: () => {
        // TODO: Implement verify session logic
      },
    }),
    {
      name: '__session_storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
