import { envConfig } from '@/env';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: IndexPage,
});

function IndexPage() {
  function testFunc() {
    return 'func';
  }

  testFunc();

  return (
    <div className="p-2">
      {JSON.stringify(envConfig, null, 2)}

      <h3>Welcome Home!</h3>
    </div>
  );
}
