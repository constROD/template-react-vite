import { testMocksWrapper } from '@/utils/__test-utils__/test-mocks-wrapper';
import { renderHook, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { mockSampleApiClient } from '../../_contexts/__test-utils__/mock-sample-api-client';
import { SampleApiClientProvider } from '../../_contexts/sample-api-client';
import { makeFakeSample } from '../../_data/__test-utils__/make-fake-sample';
import {
  useCreateSampleMutation,
  type UseCreateSampleMutationArgs,
} from './use-create-sample-mutation';

const mockSample = makeFakeSample();
const mockCreateSampleData = {
  title: mockSample.title,
  body: mockSample.body,
  userId: mockSample.userId,
};

function renderTestHook(args: UseCreateSampleMutationArgs = {}) {
  return renderHook(() => useCreateSampleMutation(args), {
    wrapper: ({ children }) => (
      <SampleApiClientProvider client={mockSampleApiClient}>
        {testMocksWrapper({ children })}
      </SampleApiClientProvider>
    ),
  });
}

describe('useCreateSampleMutation', () => {
  it('should create sample data', async () => {
    mockSampleApiClient.createSampleData.mockResolvedValueOnce(mockSample);

    const { result } = renderTestHook();

    result.current.mutate(mockCreateSampleData);

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(mockSampleApiClient.createSampleData).toHaveBeenCalledWith(mockCreateSampleData);
    expect(mockSampleApiClient.createSampleData).toHaveBeenCalledTimes(1);
    expect(result.current.data).toEqual(mockSample);
  });

  it('should handle error state', async () => {
    const error = new Error('Failed to create sample');
    mockSampleApiClient.createSampleData.mockRejectedValueOnce(error);

    const { result } = renderTestHook();

    result.current.mutate(mockCreateSampleData);

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    expect(result.current.error).toBeDefined();
  });

  it('should call onSuccess callback when provided', async () => {
    mockSampleApiClient.createSampleData.mockResolvedValueOnce(mockSample);

    const onSuccessMock = vi.fn();
    const { result } = renderTestHook({
      onSuccess: onSuccessMock,
    });

    result.current.mutate(mockCreateSampleData);

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(onSuccessMock).toHaveBeenCalledWith(mockSample, mockCreateSampleData, undefined);
  });

  it('should call onError callback when provided', async () => {
    const error = new Error('Failed to create sample');
    mockSampleApiClient.createSampleData.mockRejectedValueOnce(error);

    const onErrorMock = vi.fn();
    const { result } = renderTestHook({
      onError: onErrorMock,
    });

    result.current.mutate(mockCreateSampleData);

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    expect(onErrorMock).toHaveBeenCalledWith(error, mockCreateSampleData, undefined);
  });
});
