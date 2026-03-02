import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';

function makeWrapper() {
  const qc = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return ({ children }: { children: React.ReactNode }) =>
    React.createElement(QueryClientProvider, { client: qc }, children);
}

describe('useDAOStats hook', () => {
  beforeEach(() => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({
          totalSignatures: 42,
          uniqueVoters: 38,
          goalPercentage: 0.04,
          signatureGoal: 120000,
          daysRemaining: 120,
          filingDeadline: '2026-07-01T00:00:00.000Z',
          activeProposals: [],
        }),
      })
    );
  });

  it('calls /api/dao/stats endpoint and returns data', async () => {
    const { useDAOStats } = await import('@/hooks/use-gaia');
    const { result } = renderHook(() => useDAOStats(), { wrapper: makeWrapper() });
    await waitFor(() => expect(result.current.data).toBeDefined());
    expect(result.current.data).toMatchObject({
      totalSignatures: 42,
      signatureGoal: 120000,
    });
    expect(vi.mocked(fetch)).toHaveBeenCalledWith(expect.stringContaining('/api/dao/stats'));
  });
});

describe('useSubmitSignature hook', () => {
  beforeEach(() => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({ success: true }),
      })
    );
  });

  it('sends POST to /api/dao/signature with correct payload', async () => {
    const { useSubmitSignature } = await import('@/hooks/use-gaia');
    const { result } = renderHook(() => useSubmitSignature(), { wrapper: makeWrapper() });
    result.current.mutate({ name: 'Test User', email: 'test@example.com' });
    await waitFor(() => expect(vi.mocked(fetch)).toHaveBeenCalled());
    const [url, opts] = vi.mocked(fetch).mock.calls[0] as [string, RequestInit];
    expect(url).toContain('/api/dao/signature');
    expect(opts.method).toBe('POST');
    const body = JSON.parse(opts.body as string);
    expect(body.name).toBe('Test User');
    expect(body.email).toBe('test@example.com');
  });
});
