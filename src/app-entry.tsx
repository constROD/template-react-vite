import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider, createRouter } from '@tanstack/react-router';
import { Toaster } from './components/ui/toast/sonner';
import { ApiClientProvider } from './contexts/api-client';
import { AuthProvider } from './contexts/auth';
import { LayoutsProvider } from './contexts/layouts';
import { ThemeProvider } from './contexts/theme';
import { ToastClientProvider } from './contexts/toast-client';
import './global.css';
import { routeTree } from './routeTree.gen';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
    },
  },
});

const router = createRouter({
  routeTree,
  context: {},
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export function App() {
  return (
    <ThemeProvider>
      <ToastClientProvider>
        <LayoutsProvider>
          <QueryClientProvider client={queryClient}>
            <ApiClientProvider>
              <AuthProvider>
                <RouterProvider router={router} />
                <Toaster position="top-right" />
              </AuthProvider>
            </ApiClientProvider>
          </QueryClientProvider>
        </LayoutsProvider>
      </ToastClientProvider>
    </ThemeProvider>
  );
}
