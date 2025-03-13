import { useAuthContext } from '@/contexts/auth';
import { useToastClientContext } from '@/contexts/toast-client';
import { createFileRoute, Outlet, useNavigate } from '@tanstack/react-router';
import { useEffect } from 'react';

export const Route = createFileRoute('/_protected')({
  component: PrivateLayout,
});

function PrivateLayout() {
  const authContext = useAuthContext();
  const toastClient = useToastClientContext();
  const navigate = useNavigate();

  useEffect(() => {
    const handleNavigation = () => {
      const url = new URL(window.location.href);
      const pathname = url.pathname;
      const redirect = url.searchParams.get('redirect');

      const encodedRedirect = encodeURIComponent(pathname);

      if (!authContext.isAuthenticated) {
        toastClient.error('You must be logged in to access this page');
        navigate({ to: `/?redirect=${encodedRedirect}` });
        return;
      }

      if (redirect && redirect !== pathname) {
        navigate({ to: redirect, replace: true });
      }
    };

    handleNavigation();
  }, [authContext.isAuthenticated, navigate, toastClient]);

  if (!authContext.isAuthenticated) return null;

  return <Outlet />;
}
