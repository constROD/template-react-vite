import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

export type Session = { access_token: string };

export type SessionStoreState = {
  session: null | Session;
};

export type SessionStoreActions = {
  setSession: (session: null | Session) => void;
};

export const DEFAULT_SESSION_STORE_STATE: SessionStoreState = {
  session: null,
};

export type SessionStore = SessionStoreState & SessionStoreActions;

export const useSessionStore = create(
  immer<SessionStore>(set => ({
    ...DEFAULT_SESSION_STORE_STATE,

    /* Actions */
    setSession: data => {
      set(state => {
        state.session = data;
      });
    },
  }))
);
