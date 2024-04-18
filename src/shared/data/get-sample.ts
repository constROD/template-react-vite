import { type Sample } from '../types/sample';

export type GetSampleDataArgs = {
  id: number;
};

export async function getSampleData({ id }: GetSampleDataArgs): Promise<Sample> {
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
  return await response.json();
}
