import { describe, it, expect, vi, beforeAll } from 'vitest';
import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { TooltipProvider } from '@/components/ui/tooltip';
import React from 'react';

// jsdom polyfills required for UI components
beforeAll(() => {
  class MockResizeObserver {
    observe = vi.fn();
    unobserve = vi.fn();
    disconnect = vi.fn();
  }
  (global as any).ResizeObserver = MockResizeObserver;
});

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

vi.mock('recharts', async () => {
  const { default: React } = await import('react');
  const Noop = () => null;
  const Box = ({ children }: any) => React.createElement('div', {}, children);
  return {
    LineChart: Box,
    Line: Noop,
    XAxis: Noop,
    YAxis: Noop,
    CartesianGrid: Noop,
    Tooltip: Noop,
    Legend: Noop,
    ResponsiveContainer: Box,
    BarChart: Box,
    Bar: Noop,
    AreaChart: Box,
    Area: Noop,
    PieChart: Box,
    Pie: Noop,
    Cell: Noop,
    RadarChart: Box,
    PolarGrid: Noop,
    PolarAngleAxis: Noop,
    PolarRadiusAxis: Noop,
    Radar: Noop,
  };
});

vi.mock('html2canvas', () => ({ default: vi.fn().mockResolvedValue({ toDataURL: () => '' }) }));
vi.mock('jspdf', () => ({ default: vi.fn().mockImplementation(() => ({ addImage: vi.fn(), save: vi.fn() })) }));

vi.mock('@/lib/theme-context', () => ({
  ThemeProvider: ({ children }: any) => children,
  useColorScheme: () => ({ colorScheme: 'default', setColorScheme: vi.fn() }),
  colorSchemes: [{ id: 'default', name: 'Emerald', description: 'Fresh green theme', primary: '#10b981', accent: '#34d399' }],
}));

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: { language: 'en', changeLanguage: vi.fn() },
  }),
  initReactI18next: { type: '3rdParty', init: vi.fn() },
}));

// Mock Header and sub-components to avoid matchMedia / ThemeProvider / i18next issues
vi.mock('@/components/Header', () => ({ Header: () => null }));
vi.mock('@/components/QuickNav', () => ({ QuickNav: () => null }));
vi.mock('@/components/SocialSharing', () => ({ SocialSharing: () => null }));

const noData = { data: undefined, isLoading: false };
const emptyArr = { data: [], isLoading: false };

vi.mock('@/hooks/use-gaia', () => ({
  useHealth: () => ({ data: { status: 'healthy' }, isLoading: false }),
  usePilotStats: () => ({ data: { id: 1, students: 5630, sqft: 49250, schools: 6, status: 'live' }, isLoading: false }),
  useEndowmentStats: () => ({ data: { id: 1, size: '5.0B', annual: '225M', greenhouses: 1200 }, isLoading: false }),
  useTimeline: () => emptyArr,
  useFinancialMetrics: () => ({ data: { id: 1 }, isLoading: false }),
  useClimateMetrics: () => ({ data: { id: 1 }, isLoading: false }),
  useSlides: () => emptyArr,
  useHistoricalFinancials: () => emptyArr,
  useSchoolClusters: () => emptyArr,
  useSchools: () => emptyArr,
  useScaleProjections: () => ({
    data: [
      {
        id: 1,
        scale: 'statewide',
        greenhouses: 1200,
        schools: 3100,
        students: 900000,
        sqft: 12000000,
        capex: 2400000000,
        annualRevenue: 225000000,
        annualOpex: 96000000,
        npv5yr: 450000000,
        roiPct: 18.75,
        endowmentTarget: 5000000000,
        endowmentYr15: 7200000000,
        jobs: 3600,
        co2TonsAnnual: 6553,
        mealsPerDay: 900000,
      },
    ],
    isLoading: false,
  }),
  useEnvironmentalImpact: () => emptyArr,
  useJobCreation: () => emptyArr,
  useLegalFramework: () => ({ data: { id: 1 }, isLoading: false }),
  useEndowmentProjections: () => emptyArr,
  useExpandedJobs: () => emptyArr,
  useK12Curriculum: () => emptyArr,
  useCoalitionPartners: () => emptyArr,
  useFundingSources: () => emptyArr,
  useTransparencyFeatures: () => emptyArr,
  useAccountabilityMechanisms: () => emptyArr,
  useTribalPartnerships: () => emptyArr,
  useImplementationTimeline: () => emptyArr,
  usePoliticalRoadmap: () => emptyArr,
  useStressTests: () => emptyArr,
  useTieredCarbonPricing: () => emptyArr,
  useRegenerativeAgriculture: () => emptyArr,
  useNationwideFoodSecurity: () => ({ data: { id: 1 }, isLoading: false }),
  useLaborTransition: () => emptyArr,
  usePoliticalCoalitionData: () => emptyArr,
  useGlobalRegenerationSummary: () => ({
    data: {
      id: 1,
      totalJobsCreated: 5000000,
      totalCoalitionSize: 12000000,
      coalitionPercentage: 58.5,
      politicalPowerAssessment: 'Strong majority',
      oppositionSize: 3000000,
      coalitionAdvantage: '4:1 advantage',
      totalTransitionCosts: 250000000000,
      choicePreservationAchieved: 1,
    },
    isLoading: false,
  }),
  usePlanetaryBoundaries: () => emptyArr,
  useCalibrationTargets: () => emptyArr,
  useModelMaturity: () => emptyArr,
  useHistoricalClimateData: () => emptyArr,
  useMonteCarloSimulations: () => emptyArr,
  useScenarioComparisons: () => emptyArr,
  useOptimizationParams: () => emptyArr,
  useSensitivityAnalysis: () => emptyArr,
  useGlobalRegenerationRegions: () => emptyArr,
  useMiningAlternatives: () => emptyArr,
  useDAOStats: () => noData,
  useSubmitSignature: () => ({ mutate: vi.fn(), isPending: false }),
}));

import Dashboard from '../pages/Dashboard';

function Wrapper({ children }: { children: React.ReactNode }) {
  const qc = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return (
    <QueryClientProvider client={qc}>
      <TooltipProvider>
        {children}
      </TooltipProvider>
    </QueryClientProvider>
  );
}

describe('Dashboard page', () => {
  it('renders without crashing', () => {
    render(<Dashboard />, { wrapper: Wrapper });
  });

  it('displays 900,000 students metric', () => {
    render(<Dashboard />, { wrapper: Wrapper });
    expect(screen.getByText(/900,000 Students Fed/i)).toBeInTheDocument();
  });

  it('renders the statewide scale section', () => {
    render(<Dashboard />, { wrapper: Wrapper });
    expect(screen.getAllByText(/statewide/i).length).toBeGreaterThan(0);
  });

  it('renders greenhouse stats', () => {
    render(<Dashboard />, { wrapper: Wrapper });
    expect(screen.getAllByText(/1,200 Greenhouses/i).length).toBeGreaterThan(0);
  });

  it('renders tab navigation elements', () => {
    render(<Dashboard />, { wrapper: Wrapper });
    const tabs = screen.getAllByRole('tab');
    expect(tabs.length).toBeGreaterThan(0);
  });
});
