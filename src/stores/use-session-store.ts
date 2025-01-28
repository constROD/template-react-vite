import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

export type Session = { access_token: string };

export interface SessionStore {
  /* States */
  session: null | Session;

  /* Events */
  setSessionEvent: (session: null | Session) => void;
}

export const useSessionStore = create(
  immer<SessionStore>(set => ({
    /* States */
    session: null,

    /* Events */
    setSessionEvent: data => {
      set(state => {
        state.session = data;
      });
    },
  }))
);
