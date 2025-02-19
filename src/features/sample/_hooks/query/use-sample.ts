import { useQuery } from '@tanstack/react-query';

import { type GetSampleDataArgs, getSampleData } from '@/features/sample/_data/get-sample';

export type UseSampleQueryArgs = GetSampleDataArgs & {
  enabled?: boolean;
};

export function useSampleQuery(args: UseSampleQueryArgs) {
  return useQuery({
    queryKey: ['/samples', args.id],
    queryFn: () => getSampleData({ id: args.id }),
    enabled: args.enabled ?? !!args.id,
  });
}
