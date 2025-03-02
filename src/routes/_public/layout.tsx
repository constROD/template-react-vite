import { useAuthContext } from '@/contexts/auth';
import { createFileRoute, Outlet, useNavigate } from '@tanstack/react-router';
import { useEffect } from 'react';

export const Route = createFileRoute('/_public')({
  component: PublicLayout,
});

function PublicLayout() {
  const { isAuthenticated } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    const handleNavigation = () => {
      const url = new URL(window.location.href);
      const pathname = url.pathname;
      const redirect = url.searchParams.get('redirect');

      if (!redirect) return;

      const decodedRedirect = decodeURIComponent(redirect);

      if (isAuthenticated && decodedRedirect !== pathname) {
        navigate({ to: decodedRedirect, replace: true });
      }
    };

    handleNavigation();
  }, [isAuthenticated, navigate]);

  return <Outlet />;
}
