import { useLayoutsContext } from '@/contexts/layouts';

export function Footer() {
  const layoutsContext = useLayoutsContext();
  const currentYear = new Date().getFullYear();

  if (layoutsContext.hideFooter) return null;

  return (
    <footer className="border-t py-4">
      <div className="container mx-auto text-center text-sm text-muted-foreground">
        &copy; {currentYear} Template React Vite by bossROD. All rights reserved.
      </div>
    </footer>
  );
}
