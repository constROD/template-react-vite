import { testMocksWrapper } from '@/utils/__test-utils__/test-mocks-wrapper';
import { render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';
import { mockSampleApiClient } from '../_contexts/__test-utils__/mock-sample-api-client';
import { SampleApiClientProvider } from '../_contexts/sample-api-client';
import { makeFakeSample } from '../_data/__test-utils__/make-fake-sample';
import { SampleList } from './sample-list';

function renderTestComponent() {
  return render(<SampleList />, {
    wrapper: ({ children }) => (
      <SampleApiClientProvider client={mockSampleApiClient}>
        {testMocksWrapper({ children })}
      </SampleApiClientProvider>
    ),
  });
}

const mockSamples = Array.from({ length: 3 }, makeFakeSample);

describe('SampleList', () => {
  beforeEach(() => {
    mockSampleApiClient.getSamplesData.mockResolvedValueOnce(mockSamples);
  });

  it('should render loading state initially', async () => {
    renderTestComponent();

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('should render the list of samples', async () => {
    renderTestComponent();

    expect(screen.getByText('Loading...')).toBeInTheDocument();

    await waitFor(() => {
      for (const sample of mockSamples) {
        expect(screen.getByText(`ID: ${sample.id}`)).toBeInTheDocument();
        expect(screen.getByText(`User ID: ${sample.userId}`)).toBeInTheDocument();
        expect(screen.getByText(sample.title)).toBeInTheDocument();
        expect(screen.getByText(sample.body)).toBeInTheDocument();
      }
    });
  });

  it('should handle error state', async () => {
    mockSampleApiClient.getSamplesData.mockReset();
    mockSampleApiClient.getSamplesData.mockRejectedValueOnce(new Error('Something went wrong'));

    renderTestComponent();

    expect(screen.getByText('Loading...')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText(/Something went wrong/i)).toBeInTheDocument();
    });
  });
});
