import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    include: ['**/*.test.{ts,tsx}'],
    exclude: ['node_modules', '.next/**'],
    coverage: {
      all: true,
      provider: 'v8',
      reporter: ['lcov', 'text-summary'],
    },
    setupFiles: ['./src/vitest-setup.ts'],
    poolOptions: {
      threads: {
        singleThread: true,
      },
    },
  },
  resolve: { alias: { '@': '/src' } },
});
