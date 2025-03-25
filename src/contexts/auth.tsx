import { useSessionStore } from '@/hooks/use-session-store';
import { createContext, useContext, useEffect, type ReactNode } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const verifySession = useSessionStore(s => s.verifySession);

  useEffect(() => {
    // TODO: Implement verify session logic
    verifySession();
  }, [verifySession]);

  return <AuthContext.Provider value={null}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
}
