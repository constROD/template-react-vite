import { type MutationOptions, useMutation } from '@tanstack/react-query';

import { updateSampleData } from '@/features/sample/_data/update-sample';

export type UseUpdateSampleMutationArgs = MutationOptions<
  Awaited<ReturnType<typeof updateSampleData>>,
  Error,
  Parameters<typeof updateSampleData>[0]
>;

export function useUpdateSampleMutation(args: UseUpdateSampleMutationArgs = {}) {
  return useMutation({
    mutationFn: updateSampleData,
    onSuccess: async (data, params, context) => {
      args.onSuccess?.(data, params, context);
    },
    onError: (error, variables, context) => {
      if (args?.onError) return args.onError(error, variables, context);
    },
  });
}
