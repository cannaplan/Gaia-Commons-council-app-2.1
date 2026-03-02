// @vitest-environment node
import { vi, describe, it, expect, beforeAll } from 'vitest';

// Mock storage before importing routes (prevents DB connection)
vi.mock('../storage', () => ({
  storage: {
    isEmpty: vi.fn().mockResolvedValue(false),
    // Always-checked tables – return non-empty so seedDatabase skips re-seeding
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
    // Route handlers – return appropriate data
    getPilotStats: vi.fn().mockResolvedValue({ id: 1, students: 5630, sqft: 49250, schools: 6, status: 'live' }),
    getEndowmentStats: vi.fn().mockResolvedValue({ id: 1, size: '5.0B', annual: '225M', greenhouses: 1200 }),
    getTimelineEvents: vi.fn().mockResolvedValue([]),
    getFinancialMetrics: vi.fn().mockResolvedValue({ id: 1 }),
    getClimateMetrics: vi.fn().mockResolvedValue({ id: 1 }),
    getSlides: vi.fn().mockResolvedValue([]),
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
    // Create/update methods – no-ops
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

// ── Health ──────────────────────────────────────────────────────────────────
describe('Health endpoint', () => {
  it('GET /health returns 200 with healthy status', async () => {
    const res = await supertest(app).get('/health');
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('healthy');
  });
});

// ── DAO Stats ───────────────────────────────────────────────────────────────
describe('GET /api/dao/stats', () => {
  it('returns 200 with correct shape', async () => {
    const res = await supertest(app).get('/api/dao/stats');
    expect(res.status).toBe(200);
    expect(typeof res.body.totalSignatures).toBe('number');
    expect(typeof res.body.uniqueVoters).toBe('number');
    expect(typeof res.body.goalPercentage).toBe('number');
    expect(res.body.signatureGoal).toBe(120_000);
    expect(typeof res.body.daysRemaining).toBe('number');
    expect(typeof res.body.filingDeadline).toBe('string');
    expect(Array.isArray(res.body.activeProposals)).toBe(true);
  });

  it('activeProposals has 3 proposals with canonical values', async () => {
    const res = await supertest(app).get('/api/dao/stats');
    expect(res.body.activeProposals).toHaveLength(3);
    const descriptions = res.body.activeProposals.map((p: { description: string }) => p.description).join(' ');
    expect(descriptions).toContain('$225M/year');
    expect(descriptions).toContain('900,000 students');
    expect(descriptions).toContain('6,553 metric tons');
  });
});

// ── DAO Signature Submission ────────────────────────────────────────────────
// Note: daoSignatures is an in-memory array in routes.ts; state accumulates
// across tests in this file (tests run sequentially in declaration order).
describe('POST /api/dao/signature', () => {
  it('valid submission returns 200 with success: true', async () => {
    const res = await supertest(app)
      .post('/api/dao/signature')
      .send({ name: 'Jane Doe', email: 'test-unique-jane@example.com' });
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
  });

  it('missing name returns 400', async () => {
    const res = await supertest(app)
      .post('/api/dao/signature')
      .send({ email: 'no-name@example.com' });
    expect(res.status).toBe(400);
  });

  it('missing email returns 400', async () => {
    const res = await supertest(app)
      .post('/api/dao/signature')
      .send({ name: 'No Email' });
    expect(res.status).toBe(400);
  });

  it('invalid email format returns 400', async () => {
    const res = await supertest(app)
      .post('/api/dao/signature')
      .send({ name: 'Bad Email', email: 'not-an-email' });
    expect(res.status).toBe(400);
  });

  it('duplicate email returns 409', async () => {
    // Re-submit the same email used in the valid-submission test above
    const res = await supertest(app)
      .post('/api/dao/signature')
      .send({ name: 'Jane Doe Again', email: 'test-unique-jane@example.com' });
    expect(res.status).toBe(409);
  });

  it('after successful submission totalSignatures is incremented', async () => {
    const before = await supertest(app).get('/api/dao/stats');
    const countBefore: number = before.body.totalSignatures;

    await supertest(app)
      .post('/api/dao/signature')
      .send({ name: 'New Signer', email: 'test-new-signer@example.com' });

    const after = await supertest(app).get('/api/dao/stats');
    expect(after.body.totalSignatures).toBe(countBefore + 1);
  });
});

// ── Data endpoint smoke tests ────────────────────────────────────────────────
describe('Data endpoints (smoke tests)', () => {
  it('GET /api/pilot returns 200', async () => {
    const res = await supertest(app).get('/api/pilot');
    expect(res.status).toBe(200);
  });

  it('GET /api/endowment returns 200', async () => {
    const res = await supertest(app).get('/api/endowment');
    expect(res.status).toBe(200);
  });

  it('GET /api/timeline returns 200 with an array', async () => {
    const res = await supertest(app).get('/api/timeline');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('GET /api/slides returns 200 with an array', async () => {
    const res = await supertest(app).get('/api/slides');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('GET /api/scale-projections returns 200 with an array', async () => {
    const res = await supertest(app).get('/api/scale-projections');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
