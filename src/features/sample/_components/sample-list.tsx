import { useSamplesQuery } from '../_hooks/query/use-samples-query';

export function SampleList() {
  const { data = [], isLoading, error } = useSamplesQuery();

  if (isLoading)
    return (
      <div className="flex items-center justify-center py-10 text-muted-foreground">Loading...</div>
    );

  if (error)
    return (
      <div className="rounded-md bg-destructive/15 p-4 text-destructive">
        Error: {error.message}
      </div>
    );

  return (
    <div className="flex flex-col gap-6 py-4">
      {data.map(sample => (
        <div
          className="rounded-lg border bg-card p-5 shadow-sm transition-all hover:shadow-md"
          key={sample.id}
        >
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                ID: {sample.id}
              </span>
              <span className="text-sm text-muted-foreground">User ID: {sample.userId}</span>
            </div>

            <h3 className="text-xl font-semibold tracking-tight">{sample.title}</h3>

            <p className="text-muted-foreground">{sample.body}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
