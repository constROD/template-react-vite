export type DeleteSampleDataArgs = {
  id: number;
};

export async function deleteSampleData(args: DeleteSampleDataArgs) {
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${args.id}`, {
    method: 'DELETE',
  });
  return await response.json();
}
