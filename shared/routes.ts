import { z } from 'zod';
import { 
  insertPilotStatsSchema, 
  insertEndowmentStatsSchema, 
  insertTimelineEventSchema,
  insertFinancialMetricsSchema,
  insertClimateMetricsSchema,
  pilotStats,
  endowmentStats,
  timelineEvents,
  financialMetrics,
  climateMetrics,
  slideDeck,
  historicalFinancials,
  schoolClusters,
  schools,
  scaleProjections,
  environmentalImpact,
  jobCreation,
  legalFramework,
  endowmentProjections,
  expandedJobs,
  k12Curriculum,
  coalitionPartners,
  fundingSources,
  transparencyFeatures,
  accountabilityMechanisms,
  tribalPartnerships,
  implementationTimeline,
  politicalRoadmap,
  stressTests,
  tieredCarbonPricing,
  regenerativeAgriculture,
  nationwideFoodSecurity,
  laborTransition,
  politicalCoalition,
  globalRegenerationSummary,
  planetaryBoundaries,
  calibrationTargets,
  modelMaturity,
  historicalClimateData,
  monteCarloSimulations,
  scenarioComparisons,
  optimizationParams,
  sensitivityAnalysis,
  globalRegenerationRegions,
  miningAlternative
} from './schema';

export const errorSchemas = {
  validation: z.object({ message: z.string(), field: z.string().optional() }),
  notFound: z.object({ message: z.string() }),
  internal: z.object({ message: z.string() }),
};

export const api = {
  pilot: {
    get: { method: 'GET' as const, path: '/api/pilot', responses: { 200: z.custom<typeof pilotStats.$inferSelect>(), 404: errorSchemas.notFound } },
  },
  endowment: {
    get: { method: 'GET' as const, path: '/api/endowment', responses: { 200: z.custom<typeof endowmentStats.$inferSelect>(), 404: errorSchemas.notFound } },
  },
  timeline: {
    list: { method: 'GET' as const, path: '/api/timeline', responses: { 200: z.array(z.custom<typeof timelineEvents.$inferSelect>()) } },
  },
  financials: {
    get: { method: 'GET' as const, path: '/api/financials', responses: { 200: z.custom<typeof financialMetrics.$inferSelect>(), 404: errorSchemas.notFound } },
  },
  climate: {
    get: { method: 'GET' as const, path: '/api/climate', responses: { 200: z.custom<typeof climateMetrics.$inferSelect>(), 404: errorSchemas.notFound } },
  },
  slides: {
    list: { method: 'GET' as const, path: '/api/slides', responses: { 200: z.array(z.custom<typeof slideDeck.$inferSelect>()) } },
  },
  historicalFinancials: {
    list: { method: 'GET' as const, path: '/api/historical-financials', responses: { 200: z.array(z.custom<typeof historicalFinancials.$inferSelect>()) } },
  },
  schoolClusters: {
    list: { method: 'GET' as const, path: '/api/school-clusters', responses: { 200: z.array(z.custom<typeof schoolClusters.$inferSelect>()) } },
  },
  schools: {
    list: { method: 'GET' as const, path: '/api/schools', responses: { 200: z.array(z.custom<typeof schools.$inferSelect>()) } },
  },
  scaleProjections: {
    list: { method: 'GET' as const, path: '/api/scale-projections', responses: { 200: z.array(z.custom<typeof scaleProjections.$inferSelect>()) } },
  },
  environmentalImpact: {
    list: { method: 'GET' as const, path: '/api/environmental-impact', responses: { 200: z.array(z.custom<typeof environmentalImpact.$inferSelect>()) } },
  },
  jobCreation: {
    list: { method: 'GET' as const, path: '/api/job-creation', responses: { 200: z.array(z.custom<typeof jobCreation.$inferSelect>()) } },
  },
  legalFramework: {
    get: { method: 'GET' as const, path: '/api/legal-framework', responses: { 200: z.custom<typeof legalFramework.$inferSelect>(), 404: errorSchemas.notFound } },
  },
  endowmentProjections: {
    list: { method: 'GET' as const, path: '/api/endowment-projections', responses: { 200: z.array(z.custom<typeof endowmentProjections.$inferSelect>()) } },
  },
  expandedJobs: {
    list: { method: 'GET' as const, path: '/api/expanded-jobs', responses: { 200: z.array(z.custom<typeof expandedJobs.$inferSelect>()) } },
  },
  k12Curriculum: {
    list: { method: 'GET' as const, path: '/api/k12-curriculum', responses: { 200: z.array(z.custom<typeof k12Curriculum.$inferSelect>()) } },
  },
  coalitionPartners: {
    list: { method: 'GET' as const, path: '/api/coalition-partners', responses: { 200: z.array(z.custom<typeof coalitionPartners.$inferSelect>()) } },
  },
  fundingSources: {
    list: { method: 'GET' as const, path: '/api/funding-sources', responses: { 200: z.array(z.custom<typeof fundingSources.$inferSelect>()) } },
  },
  transparencyFeatures: {
    list: { method: 'GET' as const, path: '/api/transparency-features', responses: { 200: z.array(z.custom<typeof transparencyFeatures.$inferSelect>()) } },
  },
  accountabilityMechanisms: {
    list: { method: 'GET' as const, path: '/api/accountability-mechanisms', responses: { 200: z.array(z.custom<typeof accountabilityMechanisms.$inferSelect>()) } },
  },
  tribalPartnerships: {
    list: { method: 'GET' as const, path: '/api/tribal-partnerships', responses: { 200: z.array(z.custom<typeof tribalPartnerships.$inferSelect>()) } },
  },
  implementationTimeline: {
    list: { method: 'GET' as const, path: '/api/implementation-timeline', responses: { 200: z.array(z.custom<typeof implementationTimeline.$inferSelect>()) } },
  },
  politicalRoadmap: {
    list: { method: 'GET' as const, path: '/api/political-roadmap', responses: { 200: z.array(z.custom<typeof politicalRoadmap.$inferSelect>()) } },
  },
  stressTests: {
    list: { method: 'GET' as const, path: '/api/stress-tests', responses: { 200: z.array(z.custom<typeof stressTests.$inferSelect>()) } },
  },
  tieredCarbonPricing: {
    list: { method: 'GET' as const, path: '/api/tiered-carbon-pricing', responses: { 200: z.array(z.custom<typeof tieredCarbonPricing.$inferSelect>()) } },
  },
  regenerativeAgriculture: {
    list: { method: 'GET' as const, path: '/api/regenerative-agriculture', responses: { 200: z.array(z.custom<typeof regenerativeAgriculture.$inferSelect>()) } },
  },
  nationwideFoodSecurity: {
    get: { method: 'GET' as const, path: '/api/nationwide-food-security', responses: { 200: z.custom<typeof nationwideFoodSecurity.$inferSelect>(), 404: errorSchemas.notFound } },
  },
  laborTransition: {
    list: { method: 'GET' as const, path: '/api/labor-transition', responses: { 200: z.array(z.custom<typeof laborTransition.$inferSelect>()) } },
  },
  politicalCoalition: {
    list: { method: 'GET' as const, path: '/api/political-coalition', responses: { 200: z.array(z.custom<typeof politicalCoalition.$inferSelect>()) } },
  },
  globalRegenerationSummary: {
    get: { method: 'GET' as const, path: '/api/global-regeneration-summary', responses: { 200: z.custom<typeof globalRegenerationSummary.$inferSelect>(), 404: errorSchemas.notFound } },
  },
  planetaryBoundaries: {
    list: { method: 'GET' as const, path: '/api/planetary-boundaries', responses: { 200: z.array(z.custom<typeof planetaryBoundaries.$inferSelect>()) } },
  },
  calibrationTargets: {
    list: { method: 'GET' as const, path: '/api/calibration-targets', responses: { 200: z.array(z.custom<typeof calibrationTargets.$inferSelect>()) } },
  },
  modelMaturity: {
    list: { method: 'GET' as const, path: '/api/model-maturity', responses: { 200: z.array(z.custom<typeof modelMaturity.$inferSelect>()) } },
  },
  historicalClimateData: {
    list: { method: 'GET' as const, path: '/api/historical-climate-data', responses: { 200: z.array(z.custom<typeof historicalClimateData.$inferSelect>()) } },
  },
  monteCarloSimulations: {
    list: { method: 'GET' as const, path: '/api/monte-carlo-simulations', responses: { 200: z.array(z.custom<typeof monteCarloSimulations.$inferSelect>()) } },
  },
  scenarioComparisons: {
    list: { method: 'GET' as const, path: '/api/scenario-comparisons', responses: { 200: z.array(z.custom<typeof scenarioComparisons.$inferSelect>()) } },
  },
  optimizationParams: {
    list: { method: 'GET' as const, path: '/api/optimization-params', responses: { 200: z.array(z.custom<typeof optimizationParams.$inferSelect>()) } },
  },
  sensitivityAnalysis: {
    list: { method: 'GET' as const, path: '/api/sensitivity-analysis', responses: { 200: z.array(z.custom<typeof sensitivityAnalysis.$inferSelect>()) } },
  },
  globalRegenerationRegions: {
    list: { method: 'GET' as const, path: '/api/global-regeneration-regions', responses: { 200: z.array(z.custom<typeof globalRegenerationRegions.$inferSelect>()) } },
  },
  miningAlternatives: {
    list: { method: 'GET' as const, path: '/api/mining-alternatives', responses: { 200: z.array(z.custom<typeof miningAlternative.$inferSelect>()) } },
  },
  health: {
    get: { method: 'GET' as const, path: '/health', responses: { 200: z.object({ status: z.string(), version: z.string(), service: z.string() }) } },
  },
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) url = url.replace(`:${key}`, String(value));
    });
  }
  return url;
}
