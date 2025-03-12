import { useQuery } from '@tanstack/react-query';

import { useSampleApiClientContext } from '../../_contexts/sample-api-client';

export function useSamplesQuery() {
  const sampleApiClient = useSampleApiClientContext();

  return useQuery({
    queryKey: ['/samples'],
    queryFn: sampleApiClient.getSamplesData,
  });
}
