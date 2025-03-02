import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { RouterProvider, createRouter } from '@tanstack/react-router';
import { AuthProvider } from './contexts/auth';
import { ThemeProvider } from './contexts/theme';
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
  context: {
    auth: undefined,
  },
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export function App() {
  return (
    <ThemeProvider defaultTheme="dark">
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <RouterProvider router={router} />
          <ReactQueryDevtools initialIsOpen={false} />
        </AuthProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
