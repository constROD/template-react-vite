import { type AuthenticatedUser } from '@/types/auth';
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

export type AuthContextState = {
  isAuthenticated: boolean;
  user: null | AuthenticatedUser;
  login: (email: string, password: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextState | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthenticatedUser | null>(null);

  const isAuthenticated = !!user;

  const login = (email: string, password: string) => {
    void password;
    setUser({ id: '1', email, name: 'Test User', role: 'Admin' });
    setStoredUser(email);
  };

  const logout = () => {
    setUser(null);
    setStoredUser(null);
  };

  // Load user from localStorage only once on mount
  useEffect(() => {
    const storedUser = getStoredUser();
    if (storedUser) {
      setUser({ id: '1', email: storedUser, name: 'Test User', role: 'Admin' });
    }
  }, []); // Empty dependency array means this runs once on mount

  const contextValue: AuthContextState = { isAuthenticated, user, login, logout };

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
}

const key = 'tanstack.auth.user';

function getStoredUser() {
  return localStorage.getItem(key);
}

function setStoredUser(user: string | null) {
  if (user) {
    localStorage.setItem(key, user);
  } else {
    localStorage.removeItem(key);
  }
}
