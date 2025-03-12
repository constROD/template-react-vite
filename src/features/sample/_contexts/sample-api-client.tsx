import { createContext, useContext, type ReactNode } from 'react';
import { createSampleData } from '../_data/create-sample';
import { deleteSampleData } from '../_data/delete-sample';
import { getSampleData } from '../_data/get-sample';
import { getSamplesData } from '../_data/get-samples';
import { updateSampleData } from '../_data/update-sample';

export type SampleApiClientContext = {
  getSamplesData: typeof getSamplesData;
  getSampleData: typeof getSampleData;
  createSampleData: typeof createSampleData;
  updateSampleData: typeof updateSampleData;
  deleteSampleData: typeof deleteSampleData;
};

export function createSampleApiClientContext(): SampleApiClientContext {
  return {
    getSamplesData,
    getSampleData,
    createSampleData,
    updateSampleData,
    deleteSampleData,
  };
}

const SampleApiClientContext = createContext<SampleApiClientContext | null>(null);

export type SampleApiClientProviderProps = {
  children: ReactNode;
  client?: SampleApiClientContext;
};

export function SampleApiClientProvider({ children, client }: SampleApiClientProviderProps) {
  const apiClient = client ?? createSampleApiClientContext();
  return (
    <SampleApiClientContext.Provider value={apiClient}>{children}</SampleApiClientContext.Provider>
  );
}

export function useSampleApiClientContext() {
  const ctx = useContext(SampleApiClientContext);
  if (!ctx) {
    throw new Error('useSampleApiClientContext must be used within an SampleApiClientProvider.');
  }
  return ctx;
}
