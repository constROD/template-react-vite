import { testMocksWrapper } from '@/utils/__test-utils__/test-mocks-wrapper';
import { renderHook, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { mockSampleApiClient } from '../../_contexts/__test-utils__/mock-sample-api-client';
import { SampleApiClientProvider } from '../../_contexts/sample-api-client';
import { makeFakeSample } from '../../_data/__test-utils__/make-fake-sample';
import {
  useDeleteSampleMutation,
  type UseDeleteSampleMutationArgs,
} from './use-delete-sample-mutation';

const mockSample = makeFakeSample();
const mockDeleteSampleData = {
  id: mockSample.id,
};

function renderTestHook(args: UseDeleteSampleMutationArgs = {}) {
  return renderHook(() => useDeleteSampleMutation(args), {
    wrapper: ({ children }) => (
      <SampleApiClientProvider client={mockSampleApiClient}>
        {testMocksWrapper({ children })}
      </SampleApiClientProvider>
    ),
  });
}

describe('useDeleteSampleMutation', () => {
  it('should delete sample data', async () => {
    // Usually delete operations return the deleted item or a success message
    mockSampleApiClient.deleteSampleData.mockResolvedValueOnce({ success: true });

    const { result } = renderTestHook();

    result.current.mutate(mockDeleteSampleData);

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(mockSampleApiClient.deleteSampleData).toHaveBeenCalledWith(mockDeleteSampleData);
    expect(mockSampleApiClient.deleteSampleData).toHaveBeenCalledTimes(1);
    expect(result.current.data).toEqual({ success: true });
  });

  it('should handle error state', async () => {
    const error = new Error('Failed to delete sample');
    mockSampleApiClient.deleteSampleData.mockRejectedValueOnce(error);

    const { result } = renderTestHook();

    result.current.mutate(mockDeleteSampleData);

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    expect(result.current.error).toBeDefined();
  });

  it('should call onSuccess callback when provided', async () => {
    mockSampleApiClient.deleteSampleData.mockResolvedValueOnce({ success: true });

    const onSuccessMock = vi.fn();
    const { result } = renderTestHook({
      onSuccess: onSuccessMock,
    });

    result.current.mutate(mockDeleteSampleData);

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(onSuccessMock).toHaveBeenCalledWith({ success: true }, mockDeleteSampleData, undefined);
  });

  it('should call onError callback when provided', async () => {
    const error = new Error('Failed to delete sample');
    mockSampleApiClient.deleteSampleData.mockRejectedValueOnce(error);

    const onErrorMock = vi.fn();
    const { result } = renderTestHook({
      onError: onErrorMock,
    });

    result.current.mutate(mockDeleteSampleData);

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    expect(onErrorMock).toHaveBeenCalledWith(error, mockDeleteSampleData, undefined);
  });
});
