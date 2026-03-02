// @vitest-environment node
import { vi, describe, it, expect, beforeAll } from 'vitest';

// Mock storage before importing routes (prevents DB connection)
vi.mock('../storage', () => ({
  storage: {
    isEmpty: vi.fn().mockResolvedValue(false),
    getTribalPartnerships: vi.fn().mockResolvedValue([{ id: 1 }]),
    getImplementationTimeline: vi.fn().mockResolvedValue([{ id: 1 }]),
    getPoliticalRoadmap: vi.fn().mockResolvedValue([{ id: 1 }]),
    getStressTests: vi.fn().mockResolvedValue([{ id: 1 }]),
    getTieredCarbonPricing: vi.fn().mockResolvedValue([{ id: 1 }]),
    getRegenerativeAgriculture: vi.fn().mockResolvedValue([{ id: 1 }]),
    getNationwideFoodSecurity: vi.fn().mockResolvedValue({ id: 1 }),
    getLaborTransition: vi.fn().mockResolvedValue([{ id: 1 }]),
    getPoliticalCoalition: vi.fn().mockResolvedValue([{ id: 1 }]),
    getGlobalRegenerationSummary: vi.fn().mockResolvedValue({ id: 1 }),
    getK12Curriculum: vi.fn().mockResolvedValue([{ id: 1 }]),
    getFundingSources: vi.fn().mockResolvedValue([{ id: 1 }]),
    getScaleProjections: vi.fn().mockResolvedValue([
      { id: 1, scale: 'statewide', greenhouses: 1200, schools: 3100, students: 900000 },
    ]),
    getPilotStats: vi.fn().mockResolvedValue({ id: 1, students: 5630, sqft: 49250, schools: 6, status: 'live' }),
    getEndowmentStats: vi.fn().mockResolvedValue({ id: 1, size: '5.0B', annual: '225M', greenhouses: 1200 }),
    getTimelineEvents: vi.fn().mockResolvedValue([{ id: 1, event: 'test' }]),
    getFinancialMetrics: vi.fn().mockResolvedValue({ id: 1 }),
    getClimateMetrics: vi.fn().mockResolvedValue({ id: 1 }),
    getSlides: vi.fn().mockResolvedValue([{ id: 1, title: 'Slide 1' }]),
    getHistoricalFinancials: vi.fn().mockResolvedValue([]),
    getSchoolClusters: vi.fn().mockResolvedValue([]),
    getSchools: vi.fn().mockResolvedValue([]),
    getEnvironmentalImpacts: vi.fn().mockResolvedValue([]),
    getJobCreations: vi.fn().mockResolvedValue([]),
    getLegalFramework: vi.fn().mockResolvedValue({ id: 1 }),
    getEndowmentProjections: vi.fn().mockResolvedValue([]),
    getExpandedJobs: vi.fn().mockResolvedValue([]),
    getCoalitionPartners: vi.fn().mockResolvedValue([]),
    getTransparencyFeatures: vi.fn().mockResolvedValue([]),
    getAccountabilityMechanisms: vi.fn().mockResolvedValue([]),
    getPlanetaryBoundaries: vi.fn().mockResolvedValue([]),
    getCalibrationTargets: vi.fn().mockResolvedValue([]),
    getModelMaturity: vi.fn().mockResolvedValue([]),
    getHistoricalClimateData: vi.fn().mockResolvedValue([]),
    getMonteCarloSimulations: vi.fn().mockResolvedValue([]),
    getScenarioComparisons: vi.fn().mockResolvedValue([]),
    getOptimizationParams: vi.fn().mockResolvedValue([]),
    getSensitivityAnalysis: vi.fn().mockResolvedValue([]),
    getGlobalRegenerationRegions: vi.fn().mockResolvedValue([]),
    getMiningAlternatives: vi.fn().mockResolvedValue([]),
    createTribalPartnership: vi.fn().mockResolvedValue({ id: 1 }),
    createImplementationTimeline: vi.fn().mockResolvedValue({ id: 1 }),
    createPoliticalRoadmap: vi.fn().mockResolvedValue({ id: 1 }),
    createStressTest: vi.fn().mockResolvedValue({ id: 1 }),
    createTieredCarbonPricing: vi.fn().mockResolvedValue({ id: 1 }),
    createRegenerativeAgriculture: vi.fn().mockResolvedValue({ id: 1 }),
    createNationwideFoodSecurity: vi.fn().mockResolvedValue({ id: 1 }),
    createLaborTransition: vi.fn().mockResolvedValue({ id: 1 }),
    createPoliticalCoalition: vi.fn().mockResolvedValue({ id: 1 }),
    createGlobalRegenerationSummary: vi.fn().mockResolvedValue({ id: 1 }),
    createK12Curriculum: vi.fn().mockResolvedValue({ id: 1 }),
    createFundingSource: vi.fn().mockResolvedValue({ id: 1 }),
    createScaleProjection: vi.fn().mockResolvedValue({ id: 1 }),
    deleteAllScaleProjections: vi.fn().mockResolvedValue(undefined),
    updatePilotStats: vi.fn().mockResolvedValue({ id: 1 }),
    updateEndowmentStats: vi.fn().mockResolvedValue({ id: 1 }),
    updateFinancialMetrics: vi.fn().mockResolvedValue({ id: 1 }),
    updateClimateMetrics: vi.fn().mockResolvedValue({ id: 1 }),
    createSchoolCluster: vi.fn().mockResolvedValue({ id: 1 }),
    createSchool: vi.fn().mockResolvedValue({ id: 1 }),
    createEnvironmentalImpact: vi.fn().mockResolvedValue({ id: 1 }),
    createJobCreation: vi.fn().mockResolvedValue({ id: 1 }),
    createLegalFramework: vi.fn().mockResolvedValue({ id: 1 }),
    createEndowmentProjection: vi.fn().mockResolvedValue({ id: 1 }),
    createExpandedJobs: vi.fn().mockResolvedValue({ id: 1 }),
    createCoalitionPartner: vi.fn().mockResolvedValue({ id: 1 }),
    createTransparencyFeature: vi.fn().mockResolvedValue({ id: 1 }),
    createAccountabilityMechanism: vi.fn().mockResolvedValue({ id: 1 }),
    createSlide: vi.fn().mockResolvedValue({ id: 1 }),
    createTimelineEvent: vi.fn().mockResolvedValue({ id: 1 }),
    createHistoricalFinancial: vi.fn().mockResolvedValue({ id: 1 }),
    createPlanetaryBoundary: vi.fn().mockResolvedValue({ id: 1 }),
    createCalibrationTarget: vi.fn().mockResolvedValue({ id: 1 }),
    createModelMaturity: vi.fn().mockResolvedValue({ id: 1 }),
    createHistoricalClimateData: vi.fn().mockResolvedValue({ id: 1 }),
    createMonteCarloSimulation: vi.fn().mockResolvedValue({ id: 1 }),
    createScenarioComparison: vi.fn().mockResolvedValue({ id: 1 }),
    createOptimizationParam: vi.fn().mockResolvedValue({ id: 1 }),
    createSensitivityAnalysis: vi.fn().mockResolvedValue({ id: 1 }),
    createGlobalRegenerationRegion: vi.fn().mockResolvedValue({ id: 1 }),
    createMiningAlternative: vi.fn().mockResolvedValue({ id: 1 }),
    getSchoolsByCluster: vi.fn().mockResolvedValue([]),
    getScaleProjection: vi.fn().mockResolvedValue(undefined),
  },
}));

import express from 'express';
import { createServer } from 'http';
import supertest from 'supertest';
import { registerRoutes } from '../routes';

let app: ReturnType<typeof express>;

beforeAll(async () => {
  app = express();
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  const httpServer = createServer(app);
  await registerRoutes(httpServer, app);
});

// ── POST /api/dao/signature edge cases ──────────────────────────────────────
describe('POST /api/dao/signature edge cases', () => {
  it('ignores extra/unexpected fields and still succeeds', async () => {
    const res = await supertest(app)
      .post('/api/dao/signature')
      .send({ name: 'Edge Tester', email: 'edge-extra@example.com', extraField: 'ignored', foo: 42 });
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
  });

  it('accepts a very long (but valid) name', async () => {
    const longName = 'A'.repeat(200);
    const res = await supertest(app)
      .post('/api/dao/signature')
      .send({ name: longName, email: 'edge-longname@example.com' });
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
  });

  it('accepts a very long (but valid) email local part', async () => {
    const longLocal = 'b'.repeat(60);
    const res = await supertest(app)
      .post('/api/dao/signature')
      .send({ name: 'Long Email', email: `${longLocal}@example.com` });
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
  });
});

// ── GET /api/dao/stats daysRemaining calculation ─────────────────────────────
describe('GET /api/dao/stats daysRemaining calculation', () => {
  it('daysRemaining is a positive number less than 500', async () => {
    // The filing deadline is fixed at 2026-07-01. 500 days is a generous upper
    // bound that covers any reasonable test run date before the 2026 deadline.
    const res = await supertest(app).get('/api/dao/stats');
    expect(res.status).toBe(200);
    expect(res.body.daysRemaining).toBeGreaterThan(0);
    expect(res.body.daysRemaining).toBeLessThan(500);
  });
});

// ── GET /api/slides ─────────────────────────────────────────────────────────
describe('GET /api/slides', () => {
  it('returns an array', async () => {
    const res = await supertest(app).get('/api/slides');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});

// ── GET /api/scale-projections canonical values ──────────────────────────────
describe('GET /api/scale-projections canonical values', () => {
  it('returns an array', async () => {
    const res = await supertest(app).get('/api/scale-projections');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('contains a statewide projection with 900000 students', async () => {
    const res = await supertest(app).get('/api/scale-projections');
    expect(res.status).toBe(200);
    const statewide = res.body.find((p: { scale: string }) => p.scale === 'statewide');
    expect(statewide).toBeDefined();
    expect(statewide.students).toBe(900000);
  });
});

// ── GET /api/timeline ─────────────────────────────────────────────────────────
describe('GET /api/timeline', () => {
  it('returns an array', async () => {
    const res = await supertest(app).get('/api/timeline');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
