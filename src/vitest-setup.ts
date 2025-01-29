import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { setupServer } from 'msw/node';
import { afterAll, afterEach, beforeAll, beforeEach, vi } from 'vitest';

export const server = setupServer();

beforeEach(() => {
  cleanup();
  vi.clearAllMocks();
  server.resetHandlers();
});

afterEach(() => {
  vi.clearAllMocks();
});

beforeAll(() => server.listen());
afterAll(() => server.close());
