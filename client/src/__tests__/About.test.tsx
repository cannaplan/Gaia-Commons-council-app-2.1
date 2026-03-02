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

import About from '../pages/About';

describe('About page', () => {
  it('renders the hero section', () => {
    render(<About />);
    expect(screen.getByText(/Gaia Commons Council/i)).toBeInTheDocument();
  });

  it('renders 6 feature cards', () => {
    render(<About />);
    expect(screen.getByText('Climate Modeling')).toBeInTheDocument();
    expect(screen.getByText('Tiered Carbon Pricing')).toBeInTheDocument();
    expect(screen.getByText('Agricultural Revolution')).toBeInTheDocument();
    expect(screen.getByText('Food Security Networks')).toBeInTheDocument();
    expect(screen.getByText('Worker Transition')).toBeInTheDocument();
    expect(screen.getByText('Political Coalition')).toBeInTheDocument();
  });
});
