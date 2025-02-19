import { type MutationOptions, useMutation } from '@tanstack/react-query';

import { deleteSampleData } from '@/features/sample/_data/delete-sample';

export type UseDeleteSampleMutationArgs = MutationOptions<
  Awaited<ReturnType<typeof deleteSampleData>>,
  Error,
  Parameters<typeof deleteSampleData>[0]
>;

export function useDeleteSampleMutation(args: UseDeleteSampleMutationArgs = {}) {
  return useMutation({
    mutationFn: deleteSampleData,
    onSuccess: async (data, params, context) => {
      args.onSuccess?.(data, params, context);
    },
    onError: (error, variables, context) => {
      if (args?.onError) return args.onError(error, variables, context);
    },
  });
}
