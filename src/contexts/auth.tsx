import { useSessionStore } from '@/stores/use-session-store';
import { type AuthenticatedUser } from '@/types/auth';
import { createContext, useContext, useEffect, type ReactNode } from 'react';

export type AuthContextState = {
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextState | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const actions = useSessionStore(s => ({
    reset: s.reset,
    setUser: s.setUser,
  }));

  const login = async (email: string, password: string) => {
    // TODO: Implement http login logic
    // eslint-disable-next-line no-console
    console.log(email, password);
    const user = {
      id: '1',
      email,
      name: 'Test User',
      role: 'Admin',
    } satisfies AuthenticatedUser;
    actions.setUser(user);
  };

  const logout = async () => {
    // TODO: Implement http logout logic
    actions.reset();
  };

  useEffect(() => {
    const verifySession = async () => {
      // TODO: Implement http verify session logic
    };
    verifySession();
  }, []);

  const contextValue: AuthContextState = { logout, login };

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
}
