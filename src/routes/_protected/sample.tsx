import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AddSampleForm } from '@/features/sample/_components/add-sample-form';
import { SampleList } from '@/features/sample/_components/sample-list';
import { SampleApiClientProvider } from '@/features/sample/_contexts/sample-api-client';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_protected/sample')({
  component: SamplePage,
});

function SamplePage() {
  return (
    <SampleApiClientProvider>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Sample</h1>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Add New Sample</CardTitle>
              <CardDescription>Create a new sample item using TanStack React Query</CardDescription>
            </CardHeader>
            <CardContent>
              <AddSampleForm />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Sample List</CardTitle>
              <CardDescription>List of samples fetched with React Query</CardDescription>
            </CardHeader>
            <CardContent>
              <SampleList />
            </CardContent>
          </Card>
        </div>
      </div>
    </SampleApiClientProvider>
  );
}
