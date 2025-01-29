import { renderWithQueryClient } from '@/hooks/query/__test-utils__/mock-query-client';
import { server } from '@/vitest-setup';
import { screen } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import { beforeEach, describe, expect, it } from 'vitest';
import { SampleList } from './sample-list';

const mockSamples = [
  {
    id: 1,
    title: 'Test Title 1',
    body: 'Test Body 1',
    userId: 101,
  },
  {
    id: 2,
    title: 'Test Title 2',
    body: 'Test Body 2',
    userId: 102,
  },
];

describe('SampleList', () => {
  beforeEach(() => {
    server.use(
      http.get('*', () => {
        return new HttpResponse(JSON.stringify(mockSamples));
      })
    );
  });

  it('should render loading state initially', () => {
    renderWithQueryClient(<SampleList />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('should render the list of samples', async () => {
    renderWithQueryClient(<SampleList />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();

    await screen.findByText('ID: 1');

    mockSamples.forEach(sample => {
      expect(screen.getByText(`ID: ${sample.id}`)).toBeInTheDocument();
      expect(screen.getByText(`TITLE: ${sample.title}`)).toBeInTheDocument();
      expect(screen.getByText(`BODY: ${sample.body}`)).toBeInTheDocument();
      expect(screen.getByText(`USER ID: ${sample.userId}`)).toBeInTheDocument();
    });
  });

  it('should handle error state', async () => {
    server.use(
      http.get('*', () => {
        return new HttpResponse('Something went wrong', { status: 400 });
      })
    );
    renderWithQueryClient(<SampleList />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();

    // Wait for the error message to appear
    await screen.findByText(/Something went wrong/i);
  });
});
