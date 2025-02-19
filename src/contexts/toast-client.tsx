// import { createContext, type ReactNode, useContext } from 'react';
// import { toast } from 'react-toastify';

// export type ToastClientContextState = {
//   success: (message: string) => void;
//   error: (message: string) => void;
// };

// export function createToastClientContext(): ToastClientContextState {
//   return {
//     success: message => toast.success(message),
//     error: message => toast.error(message),
//   };
// }

// const ToastClientContext = createContext<ToastClientContextState | null>(null);

// export type ToastClientProviderProps = {
//   children: ReactNode;
//   client?: ToastClientContextState;
// };

// export function ToastClientProvider({ children, client }: ToastClientProviderProps) {
//   const toastClient = client ?? createToastClientContext();
//   return <ToastClientContext.Provider value={toastClient}>{children}</ToastClientContext.Provider>;
// }

// export function useToastClientContext() {
//   const ctx = useContext(ToastClientContext);
//   if (!ctx) {
//     throw new Error('useToastClientContext must be used within a ToastClientProvider.');
//   }
//   return ctx;
// }
