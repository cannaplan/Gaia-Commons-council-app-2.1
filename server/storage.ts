import { db } from "./db";
import {
  pilotStats, endowmentStats, timelineEvents, financialMetrics, climateMetrics, slideDeck, historicalFinancials,
  schoolClusters, schools, scaleProjections, environmentalImpact, jobCreation, legalFramework,
  endowmentProjections, expandedJobs, k12Curriculum, coalitionPartners, fundingSources,
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
  type FundingSource, type InsertFundingSource
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
  async isEmpty(): Promise<boolean> {
    const [stats] = await db.select().from(pilotStats).limit(1);
    return !stats;
  }
}

export const storage = new DatabaseStorage();
