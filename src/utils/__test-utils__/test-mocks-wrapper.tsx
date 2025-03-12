// query-client-wrapper.tsx
import { type PropsWithChildren } from 'react';

import { mockApiClient } from '@/contexts/__test-utils__/mock-api-client';
import { mockNuqsClient } from '@/contexts/__test-utils__/mock-nuqs-client';
import { ApiClientProvider } from '@/contexts/api-client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { NuqsTestingAdapter } from 'nuqs/adapters/testing';

export function testMocksWrapper({ children }: PropsWithChildren) {
  const queryClient = new QueryClient({
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

  return (
    <QueryClientProvider client={queryClient}>
      <ApiClientProvider client={mockApiClient}>
        {/* <RouterClientProvider client={mockRouterClient}> */}
        {/* <ToastClientProvider client={mockToastClient}> */}
        <NuqsTestingAdapter
          searchParams={mockNuqsClient.searchParams}
          onUrlUpdate={mockNuqsClient.onUrlUpdate}
        >
          {children}
        </NuqsTestingAdapter>
        {/* </ToastClientProvider> */}
        {/* </RouterClientProvider> */}
      </ApiClientProvider>
    </QueryClientProvider>
  );
}
