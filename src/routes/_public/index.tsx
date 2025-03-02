import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { createFileRoute, Link } from '@tanstack/react-router';
import { ArrowRight } from 'lucide-react';

export const Route = createFileRoute('/_public/')({
  component: IndexPage,
});

function IndexPage() {
  return (
    <div className="flex flex-col gap-8">
      <section className="flex flex-col gap-4 py-12 text-center">
        <h1 className="text-4xl font-bold tracking-tight">Welcome to Template React Vite</h1>
        <p className="mx-auto max-w-[700px] text-xl text-muted-foreground">
          A modern React Vite template with TanStack Router, TypeScript, Tailwind CSS, and shadcn/ui
          components.
        </p>
      </section>

      <section className="grid gap-6 md:grid-cols-2">
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle>Sample Page</CardTitle>
            <CardDescription>Using TanStack React Query and Server Actions</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-1 flex-col">
            <p className="mb-6 text-muted-foreground">
              This page demonstrates how to use TanStack React Query for efficient data fetching and
              state management.
            </p>
            <div className="mt-auto">
              <Button asChild className="w-full justify-center gap-2" variant="outline">
                <Link to="/sample">
                  Visit Sample Page <ArrowRight size={16} />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
