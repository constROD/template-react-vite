import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

export interface SampleStore {
  /* States */
  data?: unknown;

  /* Functions */
  setData: (data?: unknown) => void;
}

export const useSampleStore = create(
  immer<SampleStore>(set => ({
    /* States */
    data: undefined,

    /* Functions */
    setData: data => {
      set(state => {
        state.data = data;
      });
    },
  }))
);
