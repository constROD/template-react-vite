'use client';

import { useSamplesQuery } from '@/shared/query/use-samples-query';

export function SampleList() {
  const { data = [], isLoading, isFetching } = useSamplesQuery();

  if (isLoading || isFetching) return <div>Loading...</div>;

  return (
    <div className="flex flex-col gap-5">
      {data.map(sample => (
        <div className="flex max-w-96 flex-col gap-2" key={sample.id}>
          <div>ID: {sample.id}</div>
          <div>TITLE: {sample.title}</div>
          <div>BODY: {sample.body}</div>
          <div>USERID: {sample.userId}</div>
        </div>
      ))}
    </div>
  );
}
