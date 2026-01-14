import { db } from "./db";
import {
  pilotStats, endowmentStats, timelineEvents, financialMetrics, climateMetrics, slideDeck, historicalFinancials,
  schoolClusters, schools, scaleProjections, environmentalImpact, jobCreation, legalFramework,
  endowmentProjections, expandedJobs, k12Curriculum, coalitionPartners, fundingSources,
  transparencyFeatures, accountabilityMechanisms, tribalPartnerships,
  implementationTimeline, politicalRoadmap, stressTests,
  tieredCarbonPricing, regenerativeAgriculture, nationwideFoodSecurity, laborTransition, politicalCoalition, globalRegenerationSummary,
  planetaryBoundaries, calibrationTargets, modelMaturity, historicalClimateData,
  monteCarloSimulations, scenarioComparisons, optimizationParams, sensitivityAnalysis,
  type PilotStats, type InsertPilotStats,
  type EndowmentStats, type InsertEndowmentStats,
  type TimelineEvent, type InsertTimelineEvent,
  type FinancialMetric, type InsertFinancialMetrics,
  type ClimateMetric, type InsertClimateMetrics,
  type Slide, type InsertSlide,
  type HistoricalFinancial, type InsertHistoricalFinancial,
  type SchoolCluster, type InsertSchoolCluster,
  type School, type InsertSchool,
  type ScaleProjection, type InsertScaleProjection,
  type EnvironmentalImpactType, type InsertEnvironmentalImpact,
  type JobCreationType, type InsertJobCreation,
  type LegalFrameworkType, type InsertLegalFramework,
  type EndowmentProjection, type InsertEndowmentProjection,
  type ExpandedJobs, type InsertExpandedJobs,
  type K12Curriculum, type InsertK12Curriculum,
  type CoalitionPartner, type InsertCoalitionPartner,
  type FundingSource, type InsertFundingSource,
  type TransparencyFeature, type InsertTransparencyFeature,
  type AccountabilityMechanism, type InsertAccountabilityMechanism,
  type TribalPartnership, type InsertTribalPartnership,
  type ImplementationTimelineType, type InsertImplementationTimeline,
  type PoliticalRoadmapType, type InsertPoliticalRoadmap,
  type StressTest, type InsertStressTest,
  type TieredCarbonPricingType, type InsertTieredCarbonPricing,
  type RegenerativeAgricultureType, type InsertRegenerativeAgriculture,
  type NationwideFoodSecurityType, type InsertNationwideFoodSecurity,
  type LaborTransitionType, type InsertLaborTransition,
  type PoliticalCoalitionType, type InsertPoliticalCoalition,
  type GlobalRegenerationSummaryType, type InsertGlobalRegenerationSummary,
  type PlanetaryBoundaryType, type InsertPlanetaryBoundary,
  type CalibrationTargetType, type InsertCalibrationTarget,
  type ModelMaturityType, type InsertModelMaturity,
  type HistoricalClimateDataType, type InsertHistoricalClimateData,
  type MonteCarloSimulationType, type InsertMonteCarloSimulation,
  type ScenarioComparisonType, type InsertScenarioComparison,
  type OptimizationParamType, type InsertOptimizationParam,
  type SensitivityAnalysisType, type InsertSensitivityAnalysis,
  greenhouseLocations,
  type GreenhouseLocationType, type InsertGreenhouseLocation
} from "@shared/schema";
import { eq, asc } from "drizzle-orm";

export interface IStorage {
  getPilotStats(): Promise<PilotStats | undefined>;
  updatePilotStats(stats: InsertPilotStats): Promise<PilotStats>;
  getEndowmentStats(): Promise<EndowmentStats | undefined>;
  updateEndowmentStats(stats: InsertEndowmentStats): Promise<EndowmentStats>;
  getTimelineEvents(): Promise<TimelineEvent[]>;
  createTimelineEvent(event: InsertTimelineEvent): Promise<TimelineEvent>;
  getFinancialMetrics(): Promise<FinancialMetric | undefined>;
  updateFinancialMetrics(metrics: InsertFinancialMetrics): Promise<FinancialMetric>;
  getClimateMetrics(): Promise<ClimateMetric | undefined>;
  updateClimateMetrics(metrics: InsertClimateMetrics): Promise<ClimateMetric>;
  getSlides(): Promise<Slide[]>;
  createSlide(slide: InsertSlide): Promise<Slide>;
  getHistoricalFinancials(): Promise<HistoricalFinancial[]>;
  createHistoricalFinancial(data: InsertHistoricalFinancial): Promise<HistoricalFinancial>;
  getSchoolClusters(): Promise<SchoolCluster[]>;
  createSchoolCluster(cluster: InsertSchoolCluster): Promise<SchoolCluster>;
  getSchools(): Promise<School[]>;
  getSchoolsByCluster(clusterId: number): Promise<School[]>;
  createSchool(school: InsertSchool): Promise<School>;
  getScaleProjections(): Promise<ScaleProjection[]>;
  getScaleProjection(scale: string): Promise<ScaleProjection | undefined>;
  createScaleProjection(projection: InsertScaleProjection): Promise<ScaleProjection>;
  getEnvironmentalImpacts(): Promise<EnvironmentalImpactType[]>;
  createEnvironmentalImpact(impact: InsertEnvironmentalImpact): Promise<EnvironmentalImpactType>;
  getJobCreations(): Promise<JobCreationType[]>;
  createJobCreation(job: InsertJobCreation): Promise<JobCreationType>;
  getLegalFramework(): Promise<LegalFrameworkType | undefined>;
  createLegalFramework(legal: InsertLegalFramework): Promise<LegalFrameworkType>;
  getEndowmentProjections(): Promise<EndowmentProjection[]>;
  createEndowmentProjection(proj: InsertEndowmentProjection): Promise<EndowmentProjection>;
  getExpandedJobs(): Promise<ExpandedJobs[]>;
  createExpandedJobs(job: InsertExpandedJobs): Promise<ExpandedJobs>;
  getK12Curriculum(): Promise<K12Curriculum[]>;
  createK12Curriculum(curr: InsertK12Curriculum): Promise<K12Curriculum>;
  getCoalitionPartners(): Promise<CoalitionPartner[]>;
  createCoalitionPartner(partner: InsertCoalitionPartner): Promise<CoalitionPartner>;
  getFundingSources(): Promise<FundingSource[]>;
  createFundingSource(source: InsertFundingSource): Promise<FundingSource>;
  getTransparencyFeatures(): Promise<TransparencyFeature[]>;
  createTransparencyFeature(feature: InsertTransparencyFeature): Promise<TransparencyFeature>;
  getAccountabilityMechanisms(): Promise<AccountabilityMechanism[]>;
  createAccountabilityMechanism(mechanism: InsertAccountabilityMechanism): Promise<AccountabilityMechanism>;
  getTribalPartnerships(): Promise<TribalPartnership[]>;
  createTribalPartnership(partnership: InsertTribalPartnership): Promise<TribalPartnership>;
  getImplementationTimeline(): Promise<ImplementationTimelineType[]>;
  createImplementationTimeline(item: InsertImplementationTimeline): Promise<ImplementationTimelineType>;
  getPoliticalRoadmap(): Promise<PoliticalRoadmapType[]>;
  createPoliticalRoadmap(item: InsertPoliticalRoadmap): Promise<PoliticalRoadmapType>;
  getStressTests(): Promise<StressTest[]>;
  createStressTest(item: InsertStressTest): Promise<StressTest>;
  getTieredCarbonPricing(): Promise<TieredCarbonPricingType[]>;
  createTieredCarbonPricing(item: InsertTieredCarbonPricing): Promise<TieredCarbonPricingType>;
  getRegenerativeAgriculture(): Promise<RegenerativeAgricultureType[]>;
  createRegenerativeAgriculture(item: InsertRegenerativeAgriculture): Promise<RegenerativeAgricultureType>;
  getNationwideFoodSecurity(): Promise<NationwideFoodSecurityType | undefined>;
  createNationwideFoodSecurity(item: InsertNationwideFoodSecurity): Promise<NationwideFoodSecurityType>;
  getLaborTransition(): Promise<LaborTransitionType[]>;
  createLaborTransition(item: InsertLaborTransition): Promise<LaborTransitionType>;
  getPoliticalCoalition(): Promise<PoliticalCoalitionType[]>;
  createPoliticalCoalition(item: InsertPoliticalCoalition): Promise<PoliticalCoalitionType>;
  getGlobalRegenerationSummary(): Promise<GlobalRegenerationSummaryType | undefined>;
  createGlobalRegenerationSummary(item: InsertGlobalRegenerationSummary): Promise<GlobalRegenerationSummaryType>;
  getPlanetaryBoundaries(): Promise<PlanetaryBoundaryType[]>;
  createPlanetaryBoundary(item: InsertPlanetaryBoundary): Promise<PlanetaryBoundaryType>;
  getCalibrationTargets(): Promise<CalibrationTargetType[]>;
  createCalibrationTarget(item: InsertCalibrationTarget): Promise<CalibrationTargetType>;
  getModelMaturity(): Promise<ModelMaturityType[]>;
  createModelMaturity(item: InsertModelMaturity): Promise<ModelMaturityType>;
  getHistoricalClimateData(): Promise<HistoricalClimateDataType[]>;
  createHistoricalClimateData(item: InsertHistoricalClimateData): Promise<HistoricalClimateDataType>;
  getMonteCarloSimulations(): Promise<MonteCarloSimulationType[]>;
  createMonteCarloSimulation(item: InsertMonteCarloSimulation): Promise<MonteCarloSimulationType>;
  getScenarioComparisons(): Promise<ScenarioComparisonType[]>;
  createScenarioComparison(item: InsertScenarioComparison): Promise<ScenarioComparisonType>;
  getOptimizationParams(): Promise<OptimizationParamType[]>;
  createOptimizationParam(item: InsertOptimizationParam): Promise<OptimizationParamType>;
  getSensitivityAnalysis(): Promise<SensitivityAnalysisType[]>;
  createSensitivityAnalysis(item: InsertSensitivityAnalysis): Promise<SensitivityAnalysisType>;
  getGreenhouseLocations(): Promise<GreenhouseLocationType[]>;
  createGreenhouseLocation(item: InsertGreenhouseLocation): Promise<GreenhouseLocationType>;
  isEmpty(): Promise<boolean>;
}

export class DatabaseStorage implements IStorage {
  async getPilotStats(): Promise<PilotStats | undefined> {
    const [stats] = await db.select().from(pilotStats).limit(1);
    return stats;
  }
  async updatePilotStats(stats: InsertPilotStats): Promise<PilotStats> {
    const existing = await this.getPilotStats();
    if (!existing) {
      const [newStats] = await db.insert(pilotStats).values(stats).returning();
      return newStats;
    }
    const [updated] = await db.update(pilotStats).set(stats).where(eq(pilotStats.id, existing.id)).returning();
    return updated;
  }
  async getEndowmentStats(): Promise<EndowmentStats | undefined> {
    const [stats] = await db.select().from(endowmentStats).limit(1);
    return stats;
  }
  async updateEndowmentStats(stats: InsertEndowmentStats): Promise<EndowmentStats> {
    const existing = await this.getEndowmentStats();
    if (!existing) {
      const [newStats] = await db.insert(endowmentStats).values(stats).returning();
      return newStats;
    }
    const [updated] = await db.update(endowmentStats).set(stats).where(eq(endowmentStats.id, existing.id)).returning();
    return updated;
  }
  async getTimelineEvents(): Promise<TimelineEvent[]> {
    return await db.select().from(timelineEvents).orderBy(timelineEvents.year);
  }
  async createTimelineEvent(event: InsertTimelineEvent): Promise<TimelineEvent> {
    const [newEvent] = await db.insert(timelineEvents).values(event).returning();
    return newEvent;
  }
  async getFinancialMetrics(): Promise<FinancialMetric | undefined> {
    const [m] = await db.select().from(financialMetrics).limit(1);
    return m;
  }
  async updateFinancialMetrics(metrics: InsertFinancialMetrics): Promise<FinancialMetric> {
    const existing = await this.getFinancialMetrics();
    if (!existing) {
      const [nm] = await db.insert(financialMetrics).values(metrics).returning();
      return nm;
    }
    const [up] = await db.update(financialMetrics).set(metrics).where(eq(financialMetrics.id, existing.id)).returning();
    return up;
  }
  async getClimateMetrics(): Promise<ClimateMetric | undefined> {
    const [m] = await db.select().from(climateMetrics).limit(1);
    return m;
  }
  async updateClimateMetrics(metrics: InsertClimateMetrics): Promise<ClimateMetric> {
    const existing = await this.getClimateMetrics();
    if (!existing) {
      const [nm] = await db.insert(climateMetrics).values(metrics).returning();
      return nm;
    }
    const [up] = await db.update(climateMetrics).set(metrics).where(eq(climateMetrics.id, existing.id)).returning();
    return up;
  }
  async getSlides(): Promise<Slide[]> {
    return await db.select().from(slideDeck).orderBy(slideDeck.slideNumber);
  }
  async createSlide(slide: InsertSlide): Promise<Slide> {
    const [s] = await db.insert(slideDeck).values(slide).returning();
    return s;
  }
  async getHistoricalFinancials(): Promise<HistoricalFinancial[]> {
    return await db.select().from(historicalFinancials).orderBy(asc(historicalFinancials.year), asc(historicalFinancials.quarter));
  }
  async createHistoricalFinancial(data: InsertHistoricalFinancial): Promise<HistoricalFinancial> {
    const [h] = await db.insert(historicalFinancials).values(data).returning();
    return h;
  }
  async getSchoolClusters(): Promise<SchoolCluster[]> {
    return await db.select().from(schoolClusters);
  }
  async createSchoolCluster(cluster: InsertSchoolCluster): Promise<SchoolCluster> {
    const [c] = await db.insert(schoolClusters).values(cluster).returning();
    return c;
  }
  async getSchools(): Promise<School[]> {
    return await db.select().from(schools);
  }
  async getSchoolsByCluster(clusterId: number): Promise<School[]> {
    return await db.select().from(schools).where(eq(schools.clusterId, clusterId));
  }
  async createSchool(school: InsertSchool): Promise<School> {
    const [s] = await db.insert(schools).values(school).returning();
    return s;
  }
  async getScaleProjections(): Promise<ScaleProjection[]> {
    return await db.select().from(scaleProjections);
  }
  async getScaleProjection(scale: string): Promise<ScaleProjection | undefined> {
    const [p] = await db.select().from(scaleProjections).where(eq(scaleProjections.scale, scale));
    return p;
  }
  async createScaleProjection(projection: InsertScaleProjection): Promise<ScaleProjection> {
    const [p] = await db.insert(scaleProjections).values(projection).returning();
    return p;
  }
  async getEnvironmentalImpacts(): Promise<EnvironmentalImpactType[]> {
    return await db.select().from(environmentalImpact);
  }
  async createEnvironmentalImpact(impact: InsertEnvironmentalImpact): Promise<EnvironmentalImpactType> {
    const [i] = await db.insert(environmentalImpact).values(impact).returning();
    return i;
  }
  async getJobCreations(): Promise<JobCreationType[]> {
    return await db.select().from(jobCreation);
  }
  async createJobCreation(job: InsertJobCreation): Promise<JobCreationType> {
    const [j] = await db.insert(jobCreation).values(job).returning();
    return j;
  }
  async getLegalFramework(): Promise<LegalFrameworkType | undefined> {
    const [l] = await db.select().from(legalFramework).limit(1);
    return l;
  }
  async createLegalFramework(legal: InsertLegalFramework): Promise<LegalFrameworkType> {
    const [l] = await db.insert(legalFramework).values(legal).returning();
    return l;
  }
  async getEndowmentProjections(): Promise<EndowmentProjection[]> {
    return await db.select().from(endowmentProjections).orderBy(asc(endowmentProjections.year));
  }
  async createEndowmentProjection(proj: InsertEndowmentProjection): Promise<EndowmentProjection> {
    const [p] = await db.insert(endowmentProjections).values(proj).returning();
    return p;
  }
  async getExpandedJobs(): Promise<ExpandedJobs[]> {
    return await db.select().from(expandedJobs);
  }
  async createExpandedJobs(job: InsertExpandedJobs): Promise<ExpandedJobs> {
    const [j] = await db.insert(expandedJobs).values(job).returning();
    return j;
  }
  async getK12Curriculum(): Promise<K12Curriculum[]> {
    return await db.select().from(k12Curriculum);
  }
  async createK12Curriculum(curr: InsertK12Curriculum): Promise<K12Curriculum> {
    const [c] = await db.insert(k12Curriculum).values(curr).returning();
    return c;
  }
  async getCoalitionPartners(): Promise<CoalitionPartner[]> {
    return await db.select().from(coalitionPartners).orderBy(asc(coalitionPartners.tier));
  }
  async createCoalitionPartner(partner: InsertCoalitionPartner): Promise<CoalitionPartner> {
    const [p] = await db.insert(coalitionPartners).values(partner).returning();
    return p;
  }
  async getFundingSources(): Promise<FundingSource[]> {
    return await db.select().from(fundingSources);
  }
  async createFundingSource(source: InsertFundingSource): Promise<FundingSource> {
    const [s] = await db.insert(fundingSources).values(source).returning();
    return s;
  }
  async getTransparencyFeatures(): Promise<TransparencyFeature[]> {
    return await db.select().from(transparencyFeatures);
  }
  async createTransparencyFeature(feature: InsertTransparencyFeature): Promise<TransparencyFeature> {
    const [f] = await db.insert(transparencyFeatures).values(feature).returning();
    return f;
  }
  async getAccountabilityMechanisms(): Promise<AccountabilityMechanism[]> {
    return await db.select().from(accountabilityMechanisms);
  }
  async createAccountabilityMechanism(mechanism: InsertAccountabilityMechanism): Promise<AccountabilityMechanism> {
    const [m] = await db.insert(accountabilityMechanisms).values(mechanism).returning();
    return m;
  }
  async getTribalPartnerships(): Promise<TribalPartnership[]> {
    return await db.select().from(tribalPartnerships);
  }
  async createTribalPartnership(partnership: InsertTribalPartnership): Promise<TribalPartnership> {
    const [p] = await db.insert(tribalPartnerships).values(partnership).returning();
    return p;
  }
  async getImplementationTimeline(): Promise<ImplementationTimelineType[]> {
    return await db.select().from(implementationTimeline);
  }
  async createImplementationTimeline(item: InsertImplementationTimeline): Promise<ImplementationTimelineType> {
    const [i] = await db.insert(implementationTimeline).values(item).returning();
    return i;
  }
  async getPoliticalRoadmap(): Promise<PoliticalRoadmapType[]> {
    return await db.select().from(politicalRoadmap);
  }
  async createPoliticalRoadmap(item: InsertPoliticalRoadmap): Promise<PoliticalRoadmapType> {
    const [p] = await db.insert(politicalRoadmap).values(item).returning();
    return p;
  }
  async getStressTests(): Promise<StressTest[]> {
    return await db.select().from(stressTests);
  }
  async createStressTest(item: InsertStressTest): Promise<StressTest> {
    const [s] = await db.insert(stressTests).values(item).returning();
    return s;
  }
  async getTieredCarbonPricing(): Promise<TieredCarbonPricingType[]> {
    return await db.select().from(tieredCarbonPricing);
  }
  async createTieredCarbonPricing(item: InsertTieredCarbonPricing): Promise<TieredCarbonPricingType> {
    const [c] = await db.insert(tieredCarbonPricing).values(item).returning();
    return c;
  }
  async getRegenerativeAgriculture(): Promise<RegenerativeAgricultureType[]> {
    return await db.select().from(regenerativeAgriculture);
  }
  async createRegenerativeAgriculture(item: InsertRegenerativeAgriculture): Promise<RegenerativeAgricultureType> {
    const [a] = await db.insert(regenerativeAgriculture).values(item).returning();
    return a;
  }
  async getNationwideFoodSecurity(): Promise<NationwideFoodSecurityType | undefined> {
    const [n] = await db.select().from(nationwideFoodSecurity).limit(1);
    return n;
  }
  async createNationwideFoodSecurity(item: InsertNationwideFoodSecurity): Promise<NationwideFoodSecurityType> {
    const [n] = await db.insert(nationwideFoodSecurity).values(item).returning();
    return n;
  }
  async getLaborTransition(): Promise<LaborTransitionType[]> {
    return await db.select().from(laborTransition);
  }
  async createLaborTransition(item: InsertLaborTransition): Promise<LaborTransitionType> {
    const [l] = await db.insert(laborTransition).values(item).returning();
    return l;
  }
  async getPoliticalCoalition(): Promise<PoliticalCoalitionType[]> {
    return await db.select().from(politicalCoalition);
  }
  async createPoliticalCoalition(item: InsertPoliticalCoalition): Promise<PoliticalCoalitionType> {
    const [p] = await db.insert(politicalCoalition).values(item).returning();
    return p;
  }
  async getGlobalRegenerationSummary(): Promise<GlobalRegenerationSummaryType | undefined> {
    const [g] = await db.select().from(globalRegenerationSummary).limit(1);
    return g;
  }
  async createGlobalRegenerationSummary(item: InsertGlobalRegenerationSummary): Promise<GlobalRegenerationSummaryType> {
    const [g] = await db.insert(globalRegenerationSummary).values(item).returning();
    return g;
  }
  async getPlanetaryBoundaries(): Promise<PlanetaryBoundaryType[]> {
    return await db.select().from(planetaryBoundaries);
  }
  async createPlanetaryBoundary(item: InsertPlanetaryBoundary): Promise<PlanetaryBoundaryType> {
    const [p] = await db.insert(planetaryBoundaries).values(item).returning();
    return p;
  }
  async getCalibrationTargets(): Promise<CalibrationTargetType[]> {
    return await db.select().from(calibrationTargets);
  }
  async createCalibrationTarget(item: InsertCalibrationTarget): Promise<CalibrationTargetType> {
    const [c] = await db.insert(calibrationTargets).values(item).returning();
    return c;
  }
  async getModelMaturity(): Promise<ModelMaturityType[]> {
    return await db.select().from(modelMaturity);
  }
  async createModelMaturity(item: InsertModelMaturity): Promise<ModelMaturityType> {
    const [m] = await db.insert(modelMaturity).values(item).returning();
    return m;
  }
  async getHistoricalClimateData(): Promise<HistoricalClimateDataType[]> {
    return await db.select().from(historicalClimateData).orderBy(asc(historicalClimateData.year));
  }
  async createHistoricalClimateData(item: InsertHistoricalClimateData): Promise<HistoricalClimateDataType> {
    const [h] = await db.insert(historicalClimateData).values(item).returning();
    return h;
  }
  async getMonteCarloSimulations(): Promise<MonteCarloSimulationType[]> {
    return await db.select().from(monteCarloSimulations);
  }
  async createMonteCarloSimulation(item: InsertMonteCarloSimulation): Promise<MonteCarloSimulationType> {
    const [m] = await db.insert(monteCarloSimulations).values(item).returning();
    return m;
  }
  async getScenarioComparisons(): Promise<ScenarioComparisonType[]> {
    return await db.select().from(scenarioComparisons);
  }
  async createScenarioComparison(item: InsertScenarioComparison): Promise<ScenarioComparisonType> {
    const [s] = await db.insert(scenarioComparisons).values(item).returning();
    return s;
  }
  async getOptimizationParams(): Promise<OptimizationParamType[]> {
    return await db.select().from(optimizationParams);
  }
  async createOptimizationParam(item: InsertOptimizationParam): Promise<OptimizationParamType> {
    const [o] = await db.insert(optimizationParams).values(item).returning();
    return o;
  }
  async getSensitivityAnalysis(): Promise<SensitivityAnalysisType[]> {
    return await db.select().from(sensitivityAnalysis).orderBy(asc(sensitivityAnalysis.rank));
  }
  async createSensitivityAnalysis(item: InsertSensitivityAnalysis): Promise<SensitivityAnalysisType> {
    const [s] = await db.insert(sensitivityAnalysis).values(item).returning();
    return s;
  }
  async getGreenhouseLocations(): Promise<GreenhouseLocationType[]> {
    return await db.select().from(greenhouseLocations);
  }
  async createGreenhouseLocation(item: InsertGreenhouseLocation): Promise<GreenhouseLocationType> {
    const [g] = await db.insert(greenhouseLocations).values(item).returning();
    return g;
  }
  async isEmpty(): Promise<boolean> {
    const [stats] = await db.select().from(pilotStats).limit(1);
    return !stats;
  }
}

export const storage = new DatabaseStorage();
