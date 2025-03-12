import { testMocksWrapper } from '@/utils/__test-utils__/test-mocks-wrapper';
import { renderHook, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { mockSampleApiClient } from '../../_contexts/__test-utils__/mock-sample-api-client';
import { SampleApiClientProvider } from '../../_contexts/sample-api-client';
import { makeFakeSample } from '../../_data/__test-utils__/make-fake-sample';
import {
  useUpdateSampleMutation,
  type UseUpdateSampleMutationArgs,
} from './use-update-sample-mutation';

const mockSample = makeFakeSample();
const mockUpdateSampleData = {
  id: mockSample.id,
  title: 'Updated Title',
  body: 'Updated Body',
  userId: mockSample.userId,
};

function renderTestHook(args: UseUpdateSampleMutationArgs = {}) {
  return renderHook(() => useUpdateSampleMutation(args), {
    wrapper: ({ children }) => (
      <SampleApiClientProvider client={mockSampleApiClient}>
        {testMocksWrapper({ children })}
      </SampleApiClientProvider>
    ),
  });
}

describe('useUpdateSampleMutation', () => {
  it('should update sample data', async () => {
    mockSampleApiClient.updateSampleData.mockResolvedValueOnce(mockUpdateSampleData);

    const { result } = renderTestHook();

    result.current.mutate(mockUpdateSampleData);

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(mockSampleApiClient.updateSampleData).toHaveBeenCalledWith(mockUpdateSampleData);
    expect(mockSampleApiClient.updateSampleData).toHaveBeenCalledTimes(1);
    expect(result.current.data).toEqual(mockUpdateSampleData);
  });

  it('should handle error state', async () => {
    const error = new Error('Failed to update sample');
    mockSampleApiClient.updateSampleData.mockRejectedValueOnce(error);

    const { result } = renderTestHook();

    result.current.mutate(mockUpdateSampleData);

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    expect(result.current.error).toBeDefined();
  });

  it('should call onSuccess callback when provided', async () => {
    mockSampleApiClient.updateSampleData.mockResolvedValueOnce(mockUpdateSampleData);

    const onSuccessMock = vi.fn();
    const { result } = renderTestHook({
      onSuccess: onSuccessMock,
    });

    result.current.mutate(mockUpdateSampleData);

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(onSuccessMock).toHaveBeenCalledWith(
      mockUpdateSampleData,
      mockUpdateSampleData,
      undefined
    );
  });

  it('should call onError callback when provided', async () => {
    const error = new Error('Failed to update sample');
    mockSampleApiClient.updateSampleData.mockRejectedValueOnce(error);

    const onErrorMock = vi.fn();
    const { result } = renderTestHook({
      onError: onErrorMock,
    });

    result.current.mutate(mockUpdateSampleData);

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    expect(onErrorMock).toHaveBeenCalledWith(error, mockUpdateSampleData, undefined);
  });
});
