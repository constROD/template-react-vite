import { useToastClientContext } from '@/contexts/toast-client';
import { useSessionStore } from '@/stores/use-session-store';
import { createFileRoute, Outlet, useNavigate } from '@tanstack/react-router';
import { useEffect } from 'react';

export const Route = createFileRoute('/_protected')({
  component: PrivateLayout,
});

function PrivateLayout() {
  const navigate = useNavigate();

  const toastClient = useToastClientContext();
  const isAuthenticated = useSessionStore(s => !!s.user);

  useEffect(() => {
    const handleNavigation = () => {
      const url = new URL(window.location.href);
      const pathname = url.pathname;
      const redirect = url.searchParams.get('redirect');

      const encodedRedirect = encodeURIComponent(pathname);

      if (!isAuthenticated) {
        toastClient.error('You must be logged in to access this page');
        navigate({ to: `/?redirect=${encodedRedirect}` });
        return;
      }

      if (redirect && redirect !== pathname) {
        navigate({ to: redirect, replace: true });
      }
    };

    handleNavigation();
  }, [isAuthenticated, navigate, toastClient]);

  if (!isAuthenticated) return null;

  return <Outlet />;
}
