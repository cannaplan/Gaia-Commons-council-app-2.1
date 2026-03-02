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

import BallotPresentation from '../pages/BallotPresentation';

describe('BallotPresentation page', () => {
  it('renders without crashing', () => {
    render(<BallotPresentation />);
  });

  it('renders the first slide title "One Vote, Forever Fed"', () => {
    render(<BallotPresentation />);
    expect(screen.getByText(/One Vote, Forever Fed/i)).toBeInTheDocument();
  });

  it('contains canonical value 900,000 students', () => {
    render(<BallotPresentation />);
    expect(screen.getByText('900,000')).toBeInTheDocument();
  });

  it('contains canonical value $225M endowment draw', () => {
    render(<BallotPresentation />);
    expect(screen.getByText('$225M')).toBeInTheDocument();
  });

  it('contains slide navigation buttons', () => {
    render(<BallotPresentation />);
    // Should have next/previous navigation buttons
    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBeGreaterThan(0);
  });
});
