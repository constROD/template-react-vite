import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/')({
  component: IndexPage,
});

function IndexPage() {
  function testFunc() {
    return 'func';
  }

  testFunc();

  return (
    <div className="p-2">
      <h3>Welcome Home!</h3>
    </div>
  );
}
