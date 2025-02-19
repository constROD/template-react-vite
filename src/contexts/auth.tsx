// import { useQueryClient } from '@tanstack/react-query';
// import { useRouter } from 'expo-router';
import { createContext, useCallback, useContext, useMemo, type ReactNode } from 'react';

// import { ROUTES } from '@/constants/routes';
// import { useProfileQuery } from '@/hooks/query/me/use-profile-query';
// import { privateAxios } from '@/lib/axios';
// import { useSessionStore } from '@/stores/use-session-store';

export type AuthContextState = {
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextState | undefined>(undefined);

export function AuthContextProvider({ children }: { children: ReactNode }) {
  // const router = useRouter();
  // const queryClient = useQueryClient();

  // const accessToken = useSessionStore(state => state.accessToken);
  // const sessionStoreEvents = useSessionStore(state => ({
  //   setAccessToken: state.setAccessToken,
  //   clearSession: state.clearSession,
  // }));

  const logout = useCallback(async () => {
    // await queryClient.resetQueries();
    // sessionStoreEvents.clearSession();
    // router.replace(ROUTES.AUTH.LOGIN);
  }, []);

  // const { refetch: refetchProfile } = useProfileQuery();

  // useEffect(() => {
  //   const verifySession = async () => {
  //     try {
  //       const response = await privateAxios.get(`/auth/verify-session`);
  //       sessionStoreEvents.setAccessToken(response.data.access_token);
  //       await refetchProfile();
  //     } catch {
  //       sessionStoreEvents.clearSession();
  //     }
  //   };

  //   verifySession();
  // }, [accessToken]);

  const contextValue = useMemo(() => ({ logout }), [logout]);

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthContextProvider');
  }
  return context;
}
