import { TanStackRouterVite } from '@tanstack/router-plugin/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [
    TanStackRouterVite({
      target: 'react',
      autoCodeSplitting: true,
      routeToken: 'layout',
    }),
    react(),
  ],
  resolve: {
    alias: { '@': '/src' },
  },
});
