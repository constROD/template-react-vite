import { type Sample } from '../types/sample';

export async function getSamplesData(): Promise<Array<Sample>> {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts');
  return await response.json();
}
