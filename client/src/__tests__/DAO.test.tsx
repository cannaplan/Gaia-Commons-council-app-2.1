import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';

// Inline mock for framer-motion to avoid animation issues in jsdom
vi.mock('framer-motion', async () => {
  const { default: React } = await import('react');
  return {
    motion: new Proxy(
      {},
      {
        get:
          (_target, tag: string) =>
          ({ children, initial: _i, animate: _a, transition: _t, exit: _e, ...props }: any) =>
            React.createElement(tag, props, children),
      }
    ),
  };
});

// Mock the DAO hooks
vi.mock('@/hooks/use-gaia', () => ({
  useDAOStats: () => ({
    data: {
      totalSignatures: 42,
      uniqueVoters: 38,
      goalPercentage: 0.04,
      signatureGoal: 120000,
      daysRemaining: 120,
      filingDeadline: '2026-07-01T00:00:00.000Z',
      activeProposals: [
        {
          id: 1,
          title: 'Proposal A',
          description: '$225M/year endowment',
          quorumRequired: 67,
          votesFor: 48,
          votesAgainst: 12,
        },
        {
          id: 2,
          title: 'Proposal B',
          description: '900,000 Students',
          quorumRequired: 51,
          votesFor: 39,
          votesAgainst: 5,
        },
        {
          id: 3,
          title: 'Proposal C',
          description: '6,553 MT/year',
          quorumRequired: 51,
          votesFor: 44,
          votesAgainst: 3,
        },
      ],
    },
    isLoading: false,
  }),
  useSubmitSignature: () => ({
    mutate: vi.fn(),
    isPending: false,
  }),
}));

import DAO from '../pages/DAO';

function Wrapper({ children }: { children: React.ReactNode }) {
  const qc = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return <QueryClientProvider client={qc}>{children}</QueryClientProvider>;
}

describe('DAO page', () => {
  it('renders the signature goal (120,000)', () => {
    render(<DAO />, { wrapper: Wrapper });
    expect(screen.getByText(/of 120,000 goal/)).toBeInTheDocument();
  });

  it('renders 4 stat cards in the header grid', () => {
    render(<DAO />, { wrapper: Wrapper });
    expect(screen.getByText('Signatures')).toBeInTheDocument();
    expect(screen.getByText(/120,000 goal/)).toBeInTheDocument();
    expect(screen.getByText('Unique Voters')).toBeInTheDocument();
    expect(screen.getByText('Days Remaining')).toBeInTheDocument();
  });

  it('renders name and email inputs in the signature form', () => {
    render(<DAO />, { wrapper: Wrapper });
    expect(screen.getByPlaceholderText('Jane Doe')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('jane@example.com')).toBeInTheDocument();
  });
});
