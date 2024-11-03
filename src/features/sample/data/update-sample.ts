export type UpdateSampleDataArgs = {
  id: number;
  title: string;
  body: string;
  userId: number;
};

export async function updateSampleData(args: UpdateSampleDataArgs) {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'PUT',
    body: JSON.stringify(args),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });
  return await response.json();
}
