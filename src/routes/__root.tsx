import { Footer } from '@/components/footer';
import { Navbar } from '@/components/navbar';
import { NotFound } from '@/components/not-found';
import { cn } from '@/lib/utils';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { HeadContent, Outlet, createRootRoute } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import '../global.css';

export const Route = createRootRoute({
  component: RootPage,
  head: () => ({
    title: 'Template React Vite',
    meta: [
      { name: 'title', content: 'Template React Vite' },
      { name: 'description', content: 'Template React Vite' },
      { name: 'application_name', content: 'Template React Vite App' },

      // Open Graph / Facebook
      { property: 'og:title', content: 'Template React Vite' },
      { property: 'og:type', content: 'website' },
      { property: 'og:site_name', content: 'Template React Vite' },
      { property: 'og:url', content: 'https://www.youtube.com/bossRODTV' },
      { property: 'og:description', content: 'Template React Vite' },

      // Twitter
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:image:alt', content: 'banner_description' },

      // For Analytics
      { property: 'fb:app_id', content: 'your_app_id' },
      { name: 'twitter:site', content: '@username' },

      // Favicon
      { name: 'msapplication-TileColor', content: '#3b82f6' },
      { name: 'theme-color', content: '#ffffff' },
    ],
  }),
  notFoundComponent: NotFound,
});

function RootPage() {
  return (
    <>
      <HeadContent />
      <div className="grid min-h-screen">
        <main className="grid h-full grid-rows-[auto_1fr_auto]">
          <Navbar />
          <main className={cn('h-full w-full')}>
            <Outlet />
          </main>
          <Footer />
        </main>
      </div>
      <TanStackDevtools />
    </>
  );
}

function TanStackDevtools() {
  if (process.env.NODE_ENV !== 'development') return null;

  return (
    <>
      <ReactQueryDevtools initialIsOpen={false} />
      <TanStackRouterDevtools />
    </>
  );
}
