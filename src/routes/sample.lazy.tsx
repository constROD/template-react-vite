import { AddSampleForm } from '@/features/sample/components/add-sample-form';
import { SampleList } from '@/features/sample/components/sample-list';
import { useAddSampleForm } from '@/features/sample/components/use-add-sample-form';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/sample')({
  component: SamplePage,
});

function SamplePage() {
  const { onSubmit } = useAddSampleForm();

  return (
    <main>
      This is sample page
      <div>
        <AddSampleForm onSubmit={onSubmit} />
      </div>
      <div>
        List of Samples(Todos)
        <SampleList />
      </div>
    </main>
  );
}
