import { type MutationOptions, useMutation } from '@tanstack/react-query';

import { createSampleData } from '@/features/sample/_data/create-sample';

export type UseCreateSampleMutationArgs = MutationOptions<
  Awaited<ReturnType<typeof createSampleData>>,
  Error,
  Parameters<typeof createSampleData>[0]
>;

export function useCreateSampleMutation(args: UseCreateSampleMutationArgs = {}) {
  return useMutation({
    mutationFn: createSampleData,
    onSuccess: async (data, params, context) => {
      args.onSuccess?.(data, params, context);
    },
    onError: (error, variables, context) => {
      if (args?.onError) return args.onError(error, variables, context);
    },
  });
}
