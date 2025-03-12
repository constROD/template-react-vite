import { type MutationOptions, useMutation, useQueryClient } from '@tanstack/react-query';

import {
  type CreateSampleDataArgs,
  type createSampleData,
} from '@/features/sample/_data/create-sample';
import { useSampleApiClientContext } from '../../_contexts/sample-api-client';

export type UseCreateSampleMutationArgs = MutationOptions<
  Awaited<ReturnType<typeof createSampleData>>,
  Error,
  CreateSampleDataArgs
>;

export function useCreateSampleMutation(args: UseCreateSampleMutationArgs = {}) {
  const sampleApiClient = useSampleApiClientContext();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: sampleApiClient.createSampleData,
    onSuccess: (data, params, context) => {
      queryClient.invalidateQueries({ queryKey: ['/samples'] });
      if (args?.onSuccess) return args.onSuccess(data, params, context);
    },
    onError: (error, variables, context) => {
      if (args?.onError) return args.onError(error, variables, context);
    },
  });
}
