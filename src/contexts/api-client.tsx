// import { getSamplesData } from '@/features/sample/_data/get-samples';
// import { createContext, type ReactNode, useContext } from 'react';

// export type ApiClientContext = {
//   searchSample: typeof getSamplesData;
// };

// export function createApiClientContext(): ApiClientContext {
//   return {
//     searchSample: getSamplesData,
//   };
// }

// const ApiClientContext = createContext<ApiClientContext | null>(null);

// export type ApiClientProviderProps = {
//   children: ReactNode;
//   client?: ApiClientContext;
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
