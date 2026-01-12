import { db } from "./db";
import {
  pilotStats, endowmentStats, timelineEvents, financialMetrics, climateMetrics, slideDeck,
  type PilotStats, type InsertPilotStats,
  type EndowmentStats, type InsertEndowmentStats,
  type TimelineEvent, type InsertTimelineEvent,
  type FinancialMetric, type ClimateMetric, type Slide
} from "@shared/schema";
import { eq } from "drizzle-orm";

export interface IStorage {
  getPilotStats(): Promise<PilotStats | undefined>;
  updatePilotStats(stats: InsertPilotStats): Promise<PilotStats>;
  getEndowmentStats(): Promise<EndowmentStats | undefined>;
  updateEndowmentStats(stats: InsertEndowmentStats): Promise<EndowmentStats>;
  getTimelineEvents(): Promise<TimelineEvent[]>;
  createTimelineEvent(event: InsertTimelineEvent): Promise<TimelineEvent>;
  getFinancialMetrics(): Promise<FinancialMetric | undefined>;
  updateFinancialMetrics(metrics: any): Promise<FinancialMetric>;
  getClimateMetrics(): Promise<ClimateMetric | undefined>;
  updateClimateMetrics(metrics: any): Promise<ClimateMetric>;
  getSlides(): Promise<Slide[]>;
  createSlide(slide: any): Promise<Slide>;
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
  async updateFinancialMetrics(metrics: any): Promise<FinancialMetric> {
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
  async updateClimateMetrics(metrics: any): Promise<ClimateMetric> {
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
  async createSlide(slide: any): Promise<Slide> {
    const [s] = await db.insert(slideDeck).values(slide).returning();
    return s;
  }
  async isEmpty(): Promise<boolean> {
    const [stats] = await db.select().from(pilotStats).limit(1);
    return !stats;
  }
}

export const storage = new DatabaseStorage();
