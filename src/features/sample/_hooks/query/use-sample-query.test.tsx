import { testMocksWrapper } from '@/utils/__test-utils__/test-mocks-wrapper';
import { renderHook, waitFor } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { mockSampleApiClient } from '../../_contexts/__test-utils__/mock-sample-api-client';
import { SampleApiClientProvider } from '../../_contexts/sample-api-client';
import { makeFakeSample } from '../../_data/__test-utils__/make-fake-sample';
import { useSampleQuery, type UseSampleQueryArgs } from './use-sample-query';

const mockSample = makeFakeSample();

function renderTestHook(args: UseSampleQueryArgs) {
  return renderHook(() => useSampleQuery(args), {
    wrapper: ({ children }) => (
      <SampleApiClientProvider client={mockSampleApiClient}>
        {testMocksWrapper({ children })}
      </SampleApiClientProvider>
    ),
  });
}

describe('useSampleQuery', () => {
  it('should fetch sample data', async () => {
    mockSampleApiClient.getSampleData.mockResolvedValueOnce(mockSample);

    const { result } = renderTestHook({ id: mockSample.id });

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(mockSampleApiClient.getSampleData).toHaveBeenCalledWith({ id: mockSample.id });
    expect(mockSampleApiClient.getSampleData).toHaveBeenCalledTimes(1);

    expect(result.current.data).toEqual(mockSample);
  });

  it('should handle error state', async () => {
    const error = new Error('Failed to fetch codes');
    mockSampleApiClient.getSampleData.mockRejectedValueOnce(error);

    const { result } = renderTestHook({ id: mockSample.id });

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    expect(result.current.error).toBeDefined();
  });
});
