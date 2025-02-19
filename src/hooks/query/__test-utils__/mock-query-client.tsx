import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render } from '@testing-library/react';
// import { ApiClientProvider } from '@/contexts/api-client';
// import { mockApiClient } from '@/contexts/__test-utils__/mock-api-client';

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        // ✅ turns retries off
        //   https://tkdodo.eu/blog/testing-react-query
        // It's one of the most common "gotchas" with React Query and testing:
        // The library defaults to three retries with exponential back-off,
        // which means that your tests are likely to timeout if you want to test an erroneous query.
        // The easiest way to turn retries off is, again, via the QueryClientProvider.
        retry: false,
      },
    },
  });

export function renderWithQueryClient(ui: React.ReactElement) {
  const testQueryClient = createTestQueryClient();

  const { rerender, ...result } = render(
    <QueryClientProvider client={testQueryClient}>{ui}</QueryClientProvider>
  );

  return {
    ...result,
    rerender: (rerenderUi: React.ReactElement) =>
      rerender(<QueryClientProvider client={testQueryClient}>{rerenderUi}</QueryClientProvider>),
  };
}

export function queryClientWrapper({ children }: { children: React.ReactNode }) {
  const testQueryClient = createTestQueryClient();
  return <QueryClientProvider client={testQueryClient}>{children}</QueryClientProvider>;
}

export function queryClientHookWrapper({ children }: { children: React.ReactNode }) {
  const testQueryClient = createTestQueryClient();
  return (
    <QueryClientProvider client={testQueryClient}>
      {/* <ApiClientProvider client={mockApiClient}>{children}</ApiClientProvider> */}
      {children}
    </QueryClientProvider>
  );
}
