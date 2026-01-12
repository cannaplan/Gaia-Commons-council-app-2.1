import { pgTable, text, serial, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// === TABLE DEFINITIONS ===

export const pilotStats = pgTable("pilot_stats", {
  id: serial("id").primaryKey(),
  students: integer("students").notNull(),
  sqft: integer("sqft").notNull(),
  schools: integer("schools").notNull(),
  status: text("status").notNull(),
});

export const endowmentStats = pgTable("endowment_stats", {
  id: serial("id").primaryKey(),
  size: text("size").notNull(),
  annual: text("annual").notNull(),
  greenhouses: integer("greenhouses").notNull(),
});

export const timelineEvents = pgTable("timeline_events", {
  id: serial("id").primaryKey(),
  year: text("year").notNull(),
  event: text("event").notNull(),
});

// === INSERT SCHEMAS ===

export const insertPilotStatsSchema = createInsertSchema(pilotStats).omit({ id: true });
export const insertEndowmentStatsSchema = createInsertSchema(endowmentStats).omit({ id: true });
export const insertTimelineEventSchema = createInsertSchema(timelineEvents).omit({ id: true });

// === TYPES ===

export type PilotStats = typeof pilotStats.$inferSelect;
export type InsertPilotStats = z.infer<typeof insertPilotStatsSchema>;

export type EndowmentStats = typeof endowmentStats.$inferSelect;
export type InsertEndowmentStats = z.infer<typeof insertEndowmentStatsSchema>;

export type TimelineEvent = typeof timelineEvents.$inferSelect;
export type InsertTimelineEvent = z.infer<typeof insertTimelineEventSchema>;
