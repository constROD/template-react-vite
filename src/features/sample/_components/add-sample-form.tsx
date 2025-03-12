'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useCreateSampleMutation } from '../_hooks/query/use-create-sample-mutation';
import { useSampleStore } from '../_stores/use-sample-store';

export const addSampleSchema = z.object({
  email: z.string().email().toLowerCase(),
  name: z.string().min(1, { message: 'Name is required' }),
  description: z.string().min(1, { message: 'Description is required' }),
});

export type AddSample = z.infer<typeof addSampleSchema>;

export const AddSampleForm = () => {
  const { register, handleSubmit, formState } = useForm<AddSample>({
    resolver: zodResolver(addSampleSchema),
  });
  const { data } = useSampleStore();

  const { mutate: createSampleMutate, isPending } = useCreateSampleMutation();

  // eslint-disable-next-line no-console
  console.log('Sample Store Data: ', data);

  const onSubmit = async (data: AddSample) => {
    createSampleMutate({
      title: data.email,
      body: data.description,
      userId: 1,
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input label="Email" error={formState.errors.email?.message} {...register('email')} />
      <Input label="Name" error={formState.errors.name?.message} {...register('name')} />
      <Input
        label="Description"
        error={formState.errors.description?.message}
        {...register('description')}
      />
      <Button type="submit" disabled={isPending}>
        {isPending ? 'Adding...' : 'Add Sample'}
      </Button>
    </form>
  );
};
