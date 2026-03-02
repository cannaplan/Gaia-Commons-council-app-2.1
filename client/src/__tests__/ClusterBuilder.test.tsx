import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';

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
    AnimatePresence: ({ children }: any) => children,
  };
});

vi.mock('wouter', async () => {
  const { default: React } = await import('react');
  return {
    Link: ({ href, children, ...props }: { href: string; children?: React.ReactNode } & React.HTMLAttributes<HTMLAnchorElement>) =>
      React.createElement('a', { href, ...props }, children),
  };
});

import ClusterBuilder from '../pages/ClusterBuilder';

describe('ClusterBuilder page', () => {
  it('renders without crashing', () => {
    render(<ClusterBuilder />);
  });

  it('contains greenhouse-related content', () => {
    render(<ClusterBuilder />);
    expect(screen.getAllByText(/greenhouse/i).length).toBeGreaterThan(0);
  });

  it('renders interactive elements (buttons or inputs)', () => {
    render(<ClusterBuilder />);
    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBeGreaterThan(0);
  });
});
