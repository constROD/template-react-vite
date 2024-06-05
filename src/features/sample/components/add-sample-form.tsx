'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { createSampleData } from '@/data/create-sample';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { z } from 'zod';

export const addSampleSchema = z.object({
  email: z.string().email().toLowerCase(),
  name: z.string().min(1),
  description: z.string().min(1),
});

export type AddSample = z.infer<typeof addSampleSchema>;

export const AddSampleForm = () => {
  const { register, handleSubmit, formState } = useForm<AddSample>({
    resolver: zodResolver(addSampleSchema),
  });

  const onSubmit: SubmitHandler<AddSample> = async data => {
    const createdSample = await createSampleData({
      title: data.email,
      body: data.description,
      userId: 1,
    });
    // eslint-disable-next-line no-console
    console.log(createdSample);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input
        aria-label="Email"
        label="Email"
        error={formState.errors.email?.message}
        {...register('email')}
      />
      <Input
        aria-label="Name"
        label="Name"
        error={formState.errors.name?.message}
        {...register('name')}
      />
      <Input
        aria-label="Description"
        label="Description"
        error={formState.errors.description?.message}
        {...register('description')}
      />
      <Button type="submit">Add Sample</Button>
    </form>
  );
};
