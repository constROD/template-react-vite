import { useToast } from '@/components/ui/toast/use-toast';
import { createContext, type ReactNode, useContext } from 'react';

export type ToastClientContextState = {
  useToast: typeof useToast;
};

export function createToastClientContext(): ToastClientContextState {
  return {
    useToast: () => useToast(),
  };
}

const ToastClientContext = createContext<ToastClientContextState | null>(null);

export type ToastClientProviderProps = {
  children: ReactNode;
  client?: ToastClientContextState;
};

export function ToastClientProvider({ children, client }: ToastClientProviderProps) {
  const toastClient = client ?? createToastClientContext();
  return <ToastClientContext.Provider value={toastClient}>{children}</ToastClientContext.Provider>;
}

export function useToastClientContext() {
  const ctx = useContext(ToastClientContext);
  if (!ctx) {
    throw new Error('useToastClientContext must be used within a ToastClientProvider.');
  }
  return ctx.useToast();
}
