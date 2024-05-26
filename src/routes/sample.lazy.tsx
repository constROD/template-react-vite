import { AddSampleForm } from '@/features/sample/components/add-sample-form';
import { SampleList } from '@/features/sample/components/sample-list';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/sample')({
  component: SamplePage,
});

function SamplePage() {
  return (
    <main>
      This is sample page
      <div>
        <AddSampleForm />
      </div>
      <div>
        List of Samples(Todos)
        <SampleList />
      </div>
    </main>
  );
}
