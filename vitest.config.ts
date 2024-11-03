import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    include: ['**/*.test.{ts,tsx}'],
    exclude: ['node_modules', 'dist'],
    coverage: {
      all: true,
      provider: 'v8',
      reporter: ['lcov', 'text-summary'],
      exclude: ['**/__test-utils__/**'],
    },
    setupFiles: ['./src/vitest-setup.ts'],
    poolOptions: {
      forks: {
        singleFork: true,
      },
    },
  },
  resolve: { alias: { '@': '/src' } },
});
