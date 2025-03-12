import { createContext, type ReactNode, useContext } from 'react';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export type ApiClientContextState = {
  // getSomethingData: typeof getSomethingData;
};

export function createApiClientContext(): ApiClientContextState {
  return {
    // getSomethingData: getSomethingData,
  };
}

const ApiClientContext = createContext<ApiClientContextState | null>(null);

export type ApiClientProviderProps = {
  children: ReactNode;
  client?: ApiClientContextState;
};

export function ApiClientProvider({ children, client }: ApiClientProviderProps) {
  const apiClient = client ?? createApiClientContext();
  return <ApiClientContext.Provider value={apiClient}>{children}</ApiClientContext.Provider>;
}

export function useApiClientContext() {
  const ctx = useContext(ApiClientContext);
  if (!ctx) {
    throw new Error('useApiClientContext must be used within an ApiClientProvider.');
  }
  return ctx;
}
