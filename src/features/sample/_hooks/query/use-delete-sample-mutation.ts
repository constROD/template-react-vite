import { type MutationOptions, useMutation, useQueryClient } from '@tanstack/react-query';

import {
  type DeleteSampleDataArgs,
  type deleteSampleData,
} from '@/features/sample/_data/delete-sample';
import { useSampleApiClientContext } from '../../_contexts/sample-api-client';

export type UseDeleteSampleMutationArgs = MutationOptions<
  Awaited<ReturnType<typeof deleteSampleData>>,
  Error,
  DeleteSampleDataArgs
>;

export function useDeleteSampleMutation(args: UseDeleteSampleMutationArgs = {}) {
  const sampleApiClient = useSampleApiClientContext();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: sampleApiClient.deleteSampleData,
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
