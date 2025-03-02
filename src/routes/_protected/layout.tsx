import { useAuthContext } from '@/contexts/auth';
import { createFileRoute, Outlet, useNavigate } from '@tanstack/react-router';
import { useEffect } from 'react';

export const Route = createFileRoute('/_protected')({
  component: PrivateLayout,
});

function PrivateLayout() {
  const { isAuthenticated } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    const handleNavigation = () => {
      const url = new URL(window.location.href);
      const pathname = url.pathname;
      const redirect = url.searchParams.get('redirect');

      const encodedRedirect = encodeURIComponent(pathname);

      if (!isAuthenticated) {
        navigate({ to: `/?redirect=${encodedRedirect}` });
        return;
      }

      if (redirect && redirect !== pathname) {
        navigate({ to: redirect, replace: true });
      }
    };

    handleNavigation();
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) return null;

  return <Outlet />;
}
