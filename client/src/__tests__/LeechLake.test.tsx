import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';

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

vi.mock('wouter', async () => {
  const { default: React } = await import('react');
  return {
    Link: ({ href, children, ...props }: { href: string; children?: React.ReactNode } & React.HTMLAttributes<HTMLAnchorElement>) =>
      React.createElement('a', { href, ...props }, children),
  };
});

import LeechLake from '../pages/LeechLake';

describe('LeechLake page', () => {
  it('renders the page title', () => {
    render(<LeechLake />);
    expect(screen.getByText(/Leech Lake Greenhouse Pilot/i)).toBeInTheDocument();
  });

  it('contains "Cass Lake-Bena" school reference', () => {
    render(<LeechLake />);
    expect(screen.getByText(/Cass Lake-Bena/i)).toBeInTheDocument();
  });

  it('contains the wage range "$18–24/hr"', () => {
    render(<LeechLake />);
    expect(screen.getByText(/\$18.{1,3}24\/hr/i)).toBeInTheDocument();
  });

  it('contains "1,500 kids" reference', () => {
    render(<LeechLake />);
    expect(screen.getByText(/1,500 kids/i)).toBeInTheDocument();
  });
});
