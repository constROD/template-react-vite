import { TanStackRouterVite } from '@tanstack/router-vite-plugin';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react(), TanStackRouterVite()],
  resolve: {
    alias: { '@': '/src' },
  },
});
