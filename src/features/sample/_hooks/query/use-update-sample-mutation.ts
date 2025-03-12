import { type MutationOptions, useMutation, useQueryClient } from '@tanstack/react-query';

import {
  type UpdateSampleDataArgs,
  type updateSampleData,
} from '@/features/sample/_data/update-sample';
import { useSampleApiClientContext } from '../../_contexts/sample-api-client';

export type UseUpdateSampleMutationArgs = MutationOptions<
  Awaited<ReturnType<typeof updateSampleData>>,
  Error,
  UpdateSampleDataArgs
>;

export function useUpdateSampleMutation(args: UseUpdateSampleMutationArgs = {}) {
  const sampleApiClient = useSampleApiClientContext();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: sampleApiClient.updateSampleData,
    onSuccess: (data, params, context) => {
      queryClient.invalidateQueries({ queryKey: ['/samples'] });
      queryClient.invalidateQueries({ queryKey: ['/samples', params.id] });
      if (args?.onSuccess) return args.onSuccess(data, params, context);
    },
    onError: (error, variables, context) => {
      if (args?.onError) return args.onError(error, variables, context);
    },
  });
}
