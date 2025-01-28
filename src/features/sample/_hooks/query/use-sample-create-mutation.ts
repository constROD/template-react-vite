import { useMutation } from '@tanstack/react-query';

import { createSampleData } from '@/features/sample/_data/create-sample';

export type UseSampleCreateMutationArgs = {
  onSuccess?: () => void;
  onError?: () => void;
};

export function useSampleCreateMutation(args: UseSampleCreateMutationArgs = {}) {
  return useMutation({
    mutationFn: createSampleData,
    onSuccess: args.onSuccess,
    onError: args.onError,
  });
}
