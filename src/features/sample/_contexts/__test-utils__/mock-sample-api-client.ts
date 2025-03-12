import { vi } from 'vitest';
import { type SampleApiClientContext } from '../sample-api-client';

export const mockSampleApiClient = {
  getSamplesData: vi.fn(),
  getSampleData: vi.fn(),
  createSampleData: vi.fn(),
  updateSampleData: vi.fn(),
  deleteSampleData: vi.fn(),
} satisfies SampleApiClientContext;
