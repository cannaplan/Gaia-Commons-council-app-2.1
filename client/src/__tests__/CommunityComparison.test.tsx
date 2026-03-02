import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { CommunityComparison } from '../components/CommunityComparison';

describe('CommunityComparison component', () => {
  it('renders without crashing', () => {
    render(<CommunityComparison />);
  });

  it('displays regional community data', () => {
    render(<CommunityComparison />);
    expect(screen.getAllByText(/Twin Cities Metro/i).length).toBeGreaterThan(0);
  });

  it('renders comparison table or metrics', () => {
    render(<CommunityComparison />);
    // Should display some community comparison headings
    expect(screen.getByText(/Students Fed Daily/i)).toBeInTheDocument();
  });

  it('contains Duluth or another community reference', () => {
    render(<CommunityComparison />);
    expect(screen.getAllByText(/Duluth/i).length).toBeGreaterThan(0);
  });
});
