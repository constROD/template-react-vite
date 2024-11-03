export type CreateSampleDataArgs = {
  title: string;
  body: string;
  userId: number;
};

export async function createSampleData(args: CreateSampleDataArgs) {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    body: JSON.stringify(args),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });
  return await response.json();
}
