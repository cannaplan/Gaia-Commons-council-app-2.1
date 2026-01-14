import { pgTable, text, serial, integer, real, timestamp, jsonb } from "drizzle-orm/pg-core";
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

// Advanced Financial Metrics
export const financialMetrics = pgTable("financial_metrics", {
  id: serial("id").primaryKey(),
  schoolCount: integer("school_count").notNull(),
  initialInvestment: real("initial_investment").notNull(),
  annualOpex: real("annual_opex").notNull(),
  yieldPerSchool: real("yield_per_school").notNull(),
  foodPricePerLb: real("food_price_per_lb").notNull(),
  discountRate: real("discount_rate").notNull(),
  npv10yr: real("npv_10yr").notNull(),
  roi10yrPct: real("roi_10yr_pct").notNull(),
  investmentPerSchool: real("investment_per_school").notNull(),
  opexPerSchool: real("opex_per_school").notNull(),
  annualRevenuePerSchool: real("annual_revenue_per_school").notNull(),
  totalAnnualYield: real("total_annual_yield").notNull(),
  totalAnnualRevenue: real("total_annual_revenue").notNull(),
  paybackYears: real("payback_years").notNull(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Climate and Yield Metrics
export const climateMetrics = pgTable("climate_metrics", {
  id: serial("id").primaryKey(),
  avgTemp: real("avg_temp").notNull(),
  growingSeasonDays: integer("growing_season_days").notNull(),
  co2Ppm: integer("co2_ppm").notNull(),
  annualTons: real("annual_tons").notNull(),
  studentMealsAnnual: text("student_meals_annual").notNull(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Slide Deck for Ballot Initiative
export const slideDeck = pgTable("slide_deck", {
  id: serial("id").primaryKey(),
  slideNumber: integer("slide_number").notNull(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  chartData: jsonb("chart_data"),
});

// === INSERT SCHEMAS ===

export const insertPilotStatsSchema = createInsertSchema(pilotStats).omit({ id: true });
export const insertEndowmentStatsSchema = createInsertSchema(endowmentStats).omit({ id: true });
export const insertTimelineEventSchema = createInsertSchema(timelineEvents).omit({ id: true });
export const insertFinancialMetricsSchema = createInsertSchema(financialMetrics).omit({ id: true, updatedAt: true });
export const insertClimateMetricsSchema = createInsertSchema(climateMetrics).omit({ id: true, updatedAt: true });
export const insertSlideSchema = createInsertSchema(slideDeck).omit({ id: true });

// === TYPES ===

// Select types
export type PilotStats = typeof pilotStats.$inferSelect;
export type EndowmentStats = typeof endowmentStats.$inferSelect;
export type TimelineEvent = typeof timelineEvents.$inferSelect;
export type FinancialMetric = typeof financialMetrics.$inferSelect;
export type ClimateMetric = typeof climateMetrics.$inferSelect;
export type Slide = typeof slideDeck.$inferSelect;

// Insert types
export type InsertPilotStats = z.infer<typeof insertPilotStatsSchema>;
export type InsertEndowmentStats = z.infer<typeof insertEndowmentStatsSchema>;
export type InsertTimelineEvent = z.infer<typeof insertTimelineEventSchema>;
export type InsertFinancialMetrics = z.infer<typeof insertFinancialMetricsSchema>;
export type InsertClimateMetrics = z.infer<typeof insertClimateMetricsSchema>;
export type InsertSlide = z.infer<typeof insertSlideSchema>;
