import { createContext, useContext, useState, type ReactNode } from 'react';

export type LayoutsContextState = {
  hideNavbar: boolean;
  hideFooter: boolean;
  setHideNavbar: (hideNavbar: boolean) => void;
  setHideFooter: (hideFooter: boolean) => void;
};

const LayoutsContext = createContext<LayoutsContextState | undefined>(undefined);

export function LayoutsProvider({ children }: { children: ReactNode }) {
  const [hideNavbar, setHideNavbar] = useState(false);
  const [hideFooter, setHideFooter] = useState(false);

  const contextValue: LayoutsContextState = {
    hideNavbar,
    hideFooter,
    setHideNavbar,
    setHideFooter,
  };

  return <LayoutsContext.Provider value={contextValue}>{children}</LayoutsContext.Provider>;
}

export function useLayoutsContext() {
  const context = useContext(LayoutsContext);
  if (context === undefined) {
    throw new Error('useLayoutsContext must be used within an LayoutsProvider');
  }
  return context;
}
