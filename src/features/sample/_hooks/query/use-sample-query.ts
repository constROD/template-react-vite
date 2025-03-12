import { useQuery } from '@tanstack/react-query';

import { type GetSampleDataArgs } from '@/features/sample/_data/get-sample';
import { useSampleApiClientContext } from '../../_contexts/sample-api-client';
export type UseSampleQueryArgs = GetSampleDataArgs & {
  enabled?: boolean;
};

export function useSampleQuery(args: UseSampleQueryArgs) {
  const sampleApiClient = useSampleApiClientContext();

  return useQuery({
    queryKey: ['/samples', args.id],
    queryFn: () => sampleApiClient.getSampleData({ id: args.id }),
    enabled: args.enabled ?? !!args.id,
  });
}
