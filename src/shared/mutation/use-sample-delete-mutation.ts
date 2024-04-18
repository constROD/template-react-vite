import { useMutation } from '@tanstack/react-query';
import { deleteSampleData } from '../data/delete-sample';

export type UseSampleDeleteMutationArgs = {
  onSuccess?: () => void;
  onError?: () => void;
};

export function useSampleDeleteMutation(args: UseSampleDeleteMutationArgs = {}) {
  return useMutation({
    mutationFn: deleteSampleData,
    onSuccess: args.onSuccess,
    onError: args.onError,
  });
}
