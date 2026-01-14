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

// School Clusters (St. Paul and Mendota Heights)
export const schoolClusters = pgTable("school_clusters", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  region: text("region").notNull(),
  totalStudents: integer("total_students").notNull(),
  totalSqft: integer("total_sqft").notNull(),
  greenhouses: integer("greenhouses").notNull(),
  yr5Students: integer("yr5_students").notNull(),
  co2TonsSequestered: real("co2_tons_sequestered").notNull(),
});

// Individual Schools within Clusters
export const schools = pgTable("schools", {
  id: serial("id").primaryKey(),
  clusterId: integer("cluster_id").notNull(),
  name: text("name").notNull(),
  enrollment: integer("enrollment").notNull(),
  grades: text("grades").notNull(),
  sqftTarget: integer("sqft_target").notNull(),
});

// Multi-Scale Projections (Pilot, Statewide, National, Global)
export const scaleProjections = pgTable("scale_projections", {
  id: serial("id").primaryKey(),
  scale: text("scale").notNull(),
  schools: real("schools").notNull(),
  students: real("students").notNull(),
  greenhouses: real("greenhouses").notNull(),
  sqft: real("sqft").notNull(),
  capex: real("capex").notNull(),
  annualRevenue: real("annual_revenue").notNull(),
  annualOpex: real("annual_opex").notNull(),
  npv5yr: real("npv_5yr").notNull(),
  roiPct: real("roi_pct").notNull(),
  endowmentTarget: real("endowment_target").notNull(),
  endowmentYr15: real("endowment_yr15").notNull(),
  jobs: real("jobs").notNull(),
  co2TonsAnnual: real("co2_tons_annual").notNull(),
  mealsPerDay: real("meals_per_day").notNull(),
});

// Environmental Impact Metrics
export const environmentalImpact = pgTable("environmental_impact", {
  id: serial("id").primaryKey(),
  scale: text("scale").notNull(),
  co2SequesteredTons: real("co2_sequestered_tons").notNull(),
  waterSavedGallons: real("water_saved_gallons").notNull(),
  landPreservedAcres: real("land_preserved_acres").notNull(),
  foodMilesReduced: real("food_miles_reduced").notNull(),
  renewableEnergyPct: real("renewable_energy_pct").notNull(),
  wasteReducedTons: real("waste_reduced_tons").notNull(),
});

// Job Creation Projections
export const jobCreation = pgTable("job_creation", {
  id: serial("id").primaryKey(),
  scale: text("scale").notNull(),
  directJobs: integer("direct_jobs").notNull(),
  indirectJobs: integer("indirect_jobs").notNull(),
  inducedJobs: integer("induced_jobs").notNull(),
  totalJobs: integer("total_jobs").notNull(),
  avgSalary: real("avg_salary").notNull(),
  economicImpact: real("economic_impact").notNull(),
});

// Legal Framework and Governance
export const legalFramework = pgTable("legal_framework", {
  id: serial("id").primaryKey(),
  entityName: text("entity_name").notNull(),
  entityType: text("entity_type").notNull(),
  boardSize: integer("board_size").notNull(),
  boardComposition: text("board_composition").notNull(),
  endowmentRules: text("endowment_rules").notNull(),
  filings: text("filings").notNull(),
  complianceHash: text("compliance_hash"),
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

// 50-Year Endowment Growth Projections
export const endowmentProjections = pgTable("endowment_projections", {
  id: serial("id").primaryKey(),
  year: integer("year").notNull(),
  corpus: real("corpus").notNull(),
  annualDraw: real("annual_draw").notNull(),
  inflationAdjusted: real("inflation_adjusted"),
});

// Expanded Job Creation (includes internships, volunteers)
export const expandedJobs = pgTable("expanded_jobs", {
  id: serial("id").primaryKey(),
  scale: text("scale").notNull(),
  fteJobs: integer("fte_jobs").notNull(),
  studentInternships: integer("student_internships").notNull(),
  volunteerPositions: integer("volunteer_positions").notNull(),
  hourlyWage: real("hourly_wage").notNull(),
  directWages: real("direct_wages").notNull(),
  economicMultiplier: real("economic_multiplier").notNull(),
});

// K-12 NGSS Curriculum
export const k12Curriculum = pgTable("k12_curriculum", {
  id: serial("id").primaryKey(),
  gradeRange: text("grade_range").notNull(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  durationWeeks: integer("duration_weeks").notNull(),
  standards: text("standards").notNull(),
});

// Coalition Partners
export const coalitionPartners = pgTable("coalition_partners", {
  id: serial("id").primaryKey(),
  tier: integer("tier").notNull(),
  name: text("name").notNull(),
  category: text("category").notNull(),
  memberCount: integer("member_count"),
  focus: text("focus"),
});

// Funding Sources Breakdown
export const fundingSources = pgTable("funding_sources", {
  id: serial("id").primaryKey(),
  sourceType: text("source_type").notNull(),
  description: text("description").notNull(),
  targetAmount: real("target_amount").notNull(),
  percentage: real("percentage"),
  entities: text("entities"),
});

// Historical Financial Data for Trend Analysis
export const historicalFinancials = pgTable("historical_financials", {
  id: serial("id").primaryKey(),
  year: integer("year").notNull(),
  quarter: integer("quarter").notNull(),
  schoolCount: integer("school_count").notNull(),
  totalRevenue: real("total_revenue").notNull(),
  totalOpex: real("total_opex").notNull(),
  totalYieldLbs: real("total_yield_lbs").notNull(),
  endowmentValue: real("endowment_value").notNull(),
  studentsServed: integer("students_served").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

// Transparency Features - Dashboard visibility
export const transparencyFeatures = pgTable("transparency_features", {
  id: serial("id").primaryKey(),
  category: text("category").notNull(),
  feature: text("feature").notNull(),
  description: text("description").notNull(),
  whoSees: text("who_sees").notNull(),
  fraudPrevention: text("fraud_prevention").notNull(),
});

// Accountability Mechanisms - Audit layers
export const accountabilityMechanisms = pgTable("accountability_mechanisms", {
  id: serial("id").primaryKey(),
  mechanism: text("mechanism").notNull(),
  description: text("description").notNull(),
  frequency: text("frequency").notNull(),
  whoAudits: text("who_audits").notNull(),
  visibility: text("visibility").notNull(),
});

// Tribal Partnerships - Sovereign nation food systems
export const tribalPartnerships = pgTable("tribal_partnerships", {
  id: serial("id").primaryKey(),
  tribeName: text("tribe_name").notNull(),
  location: text("location").notNull(),
  greenhouseCount: text("greenhouse_count").notNull(),
  jobsCreated: text("jobs_created").notNull(),
  hourlyWage: text("hourly_wage").notNull(),
  firstHarvest: text("first_harvest").notNull(),
  schoolsServed: text("schools_served").notNull(),
  studentsServed: integer("students_served").notNull(),
  annualSurplus: text("annual_surplus"),
  surplusSplit: text("surplus_split"),
  breakEvenYear: integer("break_even_year"),
  governance: text("governance").notNull(),
  complementaryProjects: text("complementary_projects"),
  status: text("status").notNull(),
});

// === INSERT SCHEMAS ===

export const insertPilotStatsSchema = createInsertSchema(pilotStats).omit({ id: true });
export const insertEndowmentStatsSchema = createInsertSchema(endowmentStats).omit({ id: true });
export const insertTimelineEventSchema = createInsertSchema(timelineEvents).omit({ id: true });
export const insertFinancialMetricsSchema = createInsertSchema(financialMetrics).omit({ id: true, updatedAt: true });
export const insertClimateMetricsSchema = createInsertSchema(climateMetrics).omit({ id: true, updatedAt: true });
export const insertSlideSchema = createInsertSchema(slideDeck).omit({ id: true });
export const insertHistoricalFinancialsSchema = createInsertSchema(historicalFinancials).omit({ id: true, createdAt: true });
export const insertSchoolClusterSchema = createInsertSchema(schoolClusters).omit({ id: true });
export const insertSchoolSchema = createInsertSchema(schools).omit({ id: true });
export const insertScaleProjectionSchema = createInsertSchema(scaleProjections).omit({ id: true });
export const insertEnvironmentalImpactSchema = createInsertSchema(environmentalImpact).omit({ id: true });
export const insertJobCreationSchema = createInsertSchema(jobCreation).omit({ id: true });
export const insertLegalFrameworkSchema = createInsertSchema(legalFramework).omit({ id: true });
export const insertEndowmentProjectionSchema = createInsertSchema(endowmentProjections).omit({ id: true });
export const insertExpandedJobsSchema = createInsertSchema(expandedJobs).omit({ id: true });
export const insertK12CurriculumSchema = createInsertSchema(k12Curriculum).omit({ id: true });
export const insertCoalitionPartnerSchema = createInsertSchema(coalitionPartners).omit({ id: true });
export const insertFundingSourceSchema = createInsertSchema(fundingSources).omit({ id: true });
export const insertTransparencyFeatureSchema = createInsertSchema(transparencyFeatures).omit({ id: true });
export const insertAccountabilityMechanismSchema = createInsertSchema(accountabilityMechanisms).omit({ id: true });
export const insertTribalPartnershipSchema = createInsertSchema(tribalPartnerships).omit({ id: true });

// === TYPES ===

// Select types
export type PilotStats = typeof pilotStats.$inferSelect;
export type EndowmentStats = typeof endowmentStats.$inferSelect;
export type TimelineEvent = typeof timelineEvents.$inferSelect;
export type FinancialMetric = typeof financialMetrics.$inferSelect;
export type ClimateMetric = typeof climateMetrics.$inferSelect;
export type Slide = typeof slideDeck.$inferSelect;
export type HistoricalFinancial = typeof historicalFinancials.$inferSelect;
export type SchoolCluster = typeof schoolClusters.$inferSelect;
export type School = typeof schools.$inferSelect;
export type ScaleProjection = typeof scaleProjections.$inferSelect;
export type EnvironmentalImpactType = typeof environmentalImpact.$inferSelect;
export type JobCreationType = typeof jobCreation.$inferSelect;
export type LegalFrameworkType = typeof legalFramework.$inferSelect;
export type EndowmentProjection = typeof endowmentProjections.$inferSelect;
export type ExpandedJobs = typeof expandedJobs.$inferSelect;
export type K12Curriculum = typeof k12Curriculum.$inferSelect;
export type CoalitionPartner = typeof coalitionPartners.$inferSelect;
export type FundingSource = typeof fundingSources.$inferSelect;
export type TransparencyFeature = typeof transparencyFeatures.$inferSelect;
export type AccountabilityMechanism = typeof accountabilityMechanisms.$inferSelect;
export type TribalPartnership = typeof tribalPartnerships.$inferSelect;

// Insert types
export type InsertPilotStats = z.infer<typeof insertPilotStatsSchema>;
export type InsertEndowmentStats = z.infer<typeof insertEndowmentStatsSchema>;
export type InsertTimelineEvent = z.infer<typeof insertTimelineEventSchema>;
export type InsertFinancialMetrics = z.infer<typeof insertFinancialMetricsSchema>;
export type InsertClimateMetrics = z.infer<typeof insertClimateMetricsSchema>;
export type InsertSlide = z.infer<typeof insertSlideSchema>;
export type InsertHistoricalFinancial = z.infer<typeof insertHistoricalFinancialsSchema>;
export type InsertSchoolCluster = z.infer<typeof insertSchoolClusterSchema>;
export type InsertSchool = z.infer<typeof insertSchoolSchema>;
export type InsertScaleProjection = z.infer<typeof insertScaleProjectionSchema>;
export type InsertEnvironmentalImpact = z.infer<typeof insertEnvironmentalImpactSchema>;
export type InsertJobCreation = z.infer<typeof insertJobCreationSchema>;
export type InsertLegalFramework = z.infer<typeof insertLegalFrameworkSchema>;
export type InsertEndowmentProjection = z.infer<typeof insertEndowmentProjectionSchema>;
export type InsertExpandedJobs = z.infer<typeof insertExpandedJobsSchema>;
export type InsertK12Curriculum = z.infer<typeof insertK12CurriculumSchema>;
export type InsertCoalitionPartner = z.infer<typeof insertCoalitionPartnerSchema>;
export type InsertFundingSource = z.infer<typeof insertFundingSourceSchema>;
export type InsertTransparencyFeature = z.infer<typeof insertTransparencyFeatureSchema>;
export type InsertAccountabilityMechanism = z.infer<typeof insertAccountabilityMechanismSchema>;
export type InsertTribalPartnership = z.infer<typeof insertTribalPartnershipSchema>;
