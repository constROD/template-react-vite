// import { getSamplesData } from '@/features/sample/_data/get-samples';
// import { createContext, type ReactNode, useContext } from 'react';

// export type ApiClientContextState = {
//   searchSample: typeof getSamplesData;
// };

// export function createApiClientContext(): ApiClientContextState {
//   return {
//     searchSample: getSamplesData,
//   };
// }

// const ApiClientContext = createContext<ApiClientContextState | null>(null);

// export type ApiClientProviderProps = {
//   children: ReactNode;
//   client?: ApiClientContextState;
// };

// export function ApiClientProvider({ children, client }: ApiClientProviderProps) {
//   const apiClient = client ?? createApiClientContext();
//   return <ApiClientContext.Provider value={apiClient}>{children}</ApiClientContext.Provider>;
// }

// export function useApiClientContext() {
//   const ctx = useContext(ApiClientContext);
//   if (!ctx) {
//     throw new Error('useApiClientContext must be used within an ApiClientProvider.');
//   }
//   return ctx;
// }
