import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

export interface SampleStore {
  /* States */
  data?: unknown;

  /* Events */
  setDataEvent: (data?: unknown) => void;
}

export const useSampleStore = create(
  immer<SampleStore>(set => ({
    /* States */
    data: undefined,

    /* Events */
    setDataEvent: data => {
      set(state => {
        state.data = data;
      });
    },
  }))
);
