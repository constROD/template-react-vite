import { testMocksWrapper } from '@/utils/__test-utils__/test-mocks-wrapper';
import { renderHook, waitFor } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { mockSampleApiClient } from '../../_contexts/__test-utils__/mock-sample-api-client';
import { SampleApiClientProvider } from '../../_contexts/sample-api-client';
import { makeFakeSample } from '../../_data/__test-utils__/make-fake-sample';
import { useSamplesQuery } from './use-samples-query';

const mockSamples = [makeFakeSample(), makeFakeSample()];

function renderTestHook() {
  return renderHook(() => useSamplesQuery(), {
    wrapper: ({ children }) => (
      <SampleApiClientProvider client={mockSampleApiClient}>
        {testMocksWrapper({ children })}
      </SampleApiClientProvider>
    ),
  });
}

describe('useSamplesQuery', () => {
  it('should fetch samples data', async () => {
    mockSampleApiClient.getSamplesData.mockResolvedValueOnce(mockSamples);

    const { result } = renderTestHook();

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(mockSampleApiClient.getSamplesData).toHaveBeenCalledTimes(1);
    expect(result.current.data).toEqual(mockSamples);
  });

  it('should handle error state', async () => {
    const error = new Error('Failed to fetch samples');
    mockSampleApiClient.getSamplesData.mockRejectedValueOnce(error);

    const { result } = renderTestHook();

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    expect(result.current.error).toBeDefined();
  });
});
