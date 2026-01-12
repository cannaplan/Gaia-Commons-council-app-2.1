import { db } from "./db";
import {
  pilotStats, endowmentStats, timelineEvents,
  type PilotStats, type InsertPilotStats,
  type EndowmentStats, type InsertEndowmentStats,
  type TimelineEvent, type InsertTimelineEvent
} from "@shared/schema";
import { eq } from "drizzle-orm";

export interface IStorage {
  // Pilot
  getPilotStats(): Promise<PilotStats | undefined>;
  updatePilotStats(stats: InsertPilotStats): Promise<PilotStats>;
  
  // Endowment
  getEndowmentStats(): Promise<EndowmentStats | undefined>;
  updateEndowmentStats(stats: InsertEndowmentStats): Promise<EndowmentStats>;

  // Timeline
  getTimelineEvents(): Promise<TimelineEvent[]>;
  createTimelineEvent(event: InsertTimelineEvent): Promise<TimelineEvent>;
  deleteTimelineEvent(id: number): Promise<void>;
  
  // Seeding check
  isEmpty(): Promise<boolean>;
}

export class DatabaseStorage implements IStorage {
  async getPilotStats(): Promise<PilotStats | undefined> {
    const [stats] = await db.select().from(pilotStats).limit(1);
    return stats;
  }

  async updatePilotStats(stats: InsertPilotStats): Promise<PilotStats> {
    // Check if exists, if not create, else update
    const existing = await this.getPilotStats();
    if (!existing) {
      const [newStats] = await db.insert(pilotStats).values(stats).returning();
      return newStats;
    }
    const [updated] = await db.update(pilotStats)
      .set(stats)
      .where(eq(pilotStats.id, existing.id))
      .returning();
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
    const [updated] = await db.update(endowmentStats)
      .set(stats)
      .where(eq(endowmentStats.id, existing.id))
      .returning();
    return updated;
  }

  async getTimelineEvents(): Promise<TimelineEvent[]> {
    return await db.select().from(timelineEvents).orderBy(timelineEvents.year);
  }

  async createTimelineEvent(event: InsertTimelineEvent): Promise<TimelineEvent> {
    const [newEvent] = await db.insert(timelineEvents).values(event).returning();
    return newEvent;
  }

  async deleteTimelineEvent(id: number): Promise<void> {
    await db.delete(timelineEvents).where(eq(timelineEvents.id, id));
  }

  async isEmpty(): Promise<boolean> {
    const [stats] = await db.select().from(pilotStats).limit(1);
    return !stats;
  }
}

export const storage = new DatabaseStorage();
