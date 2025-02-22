import { useSamplesQuery } from '../_hooks/query/use-samples-query';

export function SampleList() {
  const { data = [], isLoading, isFetching, error } = useSamplesQuery();

  if (isLoading || isFetching) return <div>Loading...</div>;

  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="flex flex-col gap-5">
      {data.map(sample => (
        <div className="flex max-w-96 flex-col gap-2" key={sample.id}>
          <div>ID: {sample.id}</div>
          <div>TITLE: {sample.title}</div>
          <div>BODY: {sample.body}</div>
          <div>USER ID: {sample.userId}</div>
        </div>
      ))}
    </div>
  );
}
