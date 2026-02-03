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

// Expanded Job Creation (includes internships, volunteers, construction)
export const expandedJobs = pgTable("expanded_jobs", {
  id: serial("id").primaryKey(),
  scale: text("scale").notNull(),
  fteJobs: integer("fte_jobs").notNull(),
  studentInternships: integer("student_internships").notNull(),
  volunteerPositions: integer("volunteer_positions").notNull(),
  hourlyWage: real("hourly_wage").notNull(),
  directWages: real("direct_wages").notNull(),
  economicMultiplier: real("economic_multiplier").notNull(),
  // Construction Phase Jobs
  constructionJobs: integer("construction_jobs").default(0),
  constructionGeneral: integer("construction_general").default(0),
  constructionElectricians: integer("construction_electricians").default(0),
  constructionPlumbers: integer("construction_plumbers").default(0),
  constructionHvac: integer("construction_hvac").default(0),
  constructionSpecialists: integer("construction_specialists").default(0),
  constructionWage: real("construction_wage").default(35),
  constructionDurationYears: text("construction_duration_years"),
  constructionSpending: real("construction_spending").default(0),
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

// Implementation Timeline - Greenhouse rollout milestones
export const implementationTimeline = pgTable("implementation_timeline", {
  id: serial("id").primaryKey(),
  phase: text("phase").notNull(),
  quarter: text("quarter").notNull(),
  milestone: text("milestone").notNull(),
  details: text("details").notNull(),
  greenhouseCount: integer("greenhouse_count"),
  jobsCreated: integer("jobs_created"),
  studentsServed: integer("students_served"),
});

// Political Roadmap - Congressional district strategy
export const politicalRoadmap = pgTable("political_roadmap", {
  id: serial("id").primaryKey(),
  district: text("district").notNull(),
  supportLevel: text("support_level").notNull(),
  supportPct: text("support_pct").notNull(),
  strategy: text("strategy").notNull(),
  keyMessaging: text("key_messaging").notNull(),
});

// Stress Tests - Financial resilience scenarios
export const stressTests = pgTable("stress_tests", {
  id: serial("id").primaryKey(),
  scenario: text("scenario").notNull(),
  description: text("description").notNull(),
  impact: text("impact").notNull(),
  mitigation: text("mitigation").notNull(),
  solvencyProbability: text("solvency_probability").notNull(),
});

// Global Regeneration: Tiered Carbon Pricing
export const tieredCarbonPricing = pgTable("tiered_carbon_pricing", {
  id: serial("id").primaryKey(),
  tierName: text("tier_name").notNull(),
  thresholdMin: real("threshold_min").notNull(),
  thresholdMax: real("threshold_max"),
  carbonTaxRate: real("carbon_tax_rate").notNull(),
  description: text("description").notNull(),
  emissionFraction: real("emission_fraction").notNull(),
  reductionRate: real("reduction_rate").notNull(),
  businessSurvival: real("business_survival").notNull(),
  revenueMillions: real("revenue_millions"),
});

// Global Regeneration: Regenerative Agriculture Operations
export const regenerativeAgriculture = pgTable("regenerative_agriculture", {
  id: serial("id").primaryKey(),
  operationType: text("operation_type").notNull(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  acresAllocated: real("acres_allocated").notNull(),
  revenuePerAcre: real("revenue_per_acre").notNull(),
  jobsPer1000Acres: real("jobs_per_1000_acres").notNull(),
  avgWage: real("avg_wage").notNull(),
  carbonSequestration: real("carbon_sequestration").notNull(),
  peopleFedPerAcre: real("people_fed_per_acre").notNull(),
  totalJobs: integer("total_jobs").notNull(),
  totalRevenue: real("total_revenue").notNull(),
  totalCarbonSequestered: real("total_carbon_sequestered").notNull(),
});

// Global Regeneration: Nationwide Food Security
export const nationwideFoodSecurity = pgTable("nationwide_food_security", {
  id: serial("id").primaryKey(),
  scope: text("scope").notNull(),
  totalStudents: integer("total_students").notNull(),
  facilitiesNeeded: integer("facilities_needed").notNull(),
  jobsCreated: integer("jobs_created").notNull(),
  constructionCost: real("construction_cost").notNull(),
  annualOperating: real("annual_operating").notNull(),
  co2ReductionTons: real("co2_reduction_tons").notNull(),
  waterSavingsGallons: real("water_savings_gallons").notNull(),
  pesticideElimination: text("pesticide_elimination").notNull(),
  replicationModel: text("replication_model").notNull(),
});

// Global Regeneration: Labor Transition Program
export const laborTransition = pgTable("labor_transition", {
  id: serial("id").primaryKey(),
  sector: text("sector").notNull(),
  workersAffected: integer("workers_affected").notNull(),
  avgWage: real("avg_wage").notNull(),
  incomeGuaranteeRate: real("income_guarantee_rate").notNull(),
  transitionDurationYears: integer("transition_duration_years").notNull(),
  retrainingCostPerWorker: real("retraining_cost_per_worker").notNull(),
  successRate: real("success_rate").notNull(),
  totalCost: real("total_cost").notNull(),
  choicePreservation: text("choice_preservation").notNull(),
});

// Global Regeneration: Political Coalition
export const politicalCoalition = pgTable("political_coalition", {
  id: serial("id").primaryKey(),
  groupName: text("group_name").notNull(),
  memberCount: integer("member_count").notNull(),
  description: text("description"),
  isCalculated: integer("is_calculated").default(0),
});

// Global Regeneration Summary
export const globalRegenerationSummary = pgTable("global_regeneration_summary", {
  id: serial("id").primaryKey(),
  totalJobsCreated: integer("total_jobs_created").notNull(),
  totalCoalitionSize: integer("total_coalition_size").notNull(),
  coalitionPercentage: real("coalition_percentage").notNull(),
  politicalPowerAssessment: text("political_power_assessment").notNull(),
  oppositionSize: integer("opposition_size").notNull(),
  coalitionAdvantage: text("coalition_advantage").notNull(),
  totalTransitionCosts: real("total_transition_costs").notNull(),
  choicePreservationAchieved: integer("choice_preservation_achieved").default(1),
});

// Mining Alternative - Twin Metals Replacement Jobs for Northern MN
export const miningAlternative = pgTable("mining_alternative", {
  id: serial("id").primaryKey(),
  community: text("community").notNull(),
  county: text("county").notNull(),
  latitude: real("latitude").notNull(),
  longitude: real("longitude").notNull(),
  population: integer("population").notNull(),
  miningJobsPromised: integer("mining_jobs_promised").notNull(),
  miningAvgSalary: real("mining_avg_salary").notNull(),
  miningDuration: text("mining_duration").notNull(),
  greenhouseComplexSqft: integer("greenhouse_complex_sqft").notNull(),
  greenhouseJobs: integer("greenhouse_jobs").notNull(),
  greenhouseAvgSalary: real("greenhouse_avg_salary").notNull(),
  schoolGreenhouseJobs: integer("school_greenhouse_jobs").notNull(),
  totalGreenhouseJobs: integer("total_greenhouse_jobs").notNull(),
  annualEndowmentFunding: real("annual_endowment_funding").notNull(),
  jobDuration: text("job_duration").notNull(),
  environmentalRisk: text("environmental_risk").notNull(),
  boundaryWatersImpact: text("boundary_waters_impact").notNull(),
  economicMultiplier: real("economic_multiplier").notNull(),
  localFoodProduction: real("local_food_production").notNull(),
  co2Sequestered: real("co2_sequestered").notNull(),
  status: text("status").notNull(),
  specialtyCrops: text("specialty_crops"),
  suppliesAllSchools: text("supplies_all_schools"),
  // Financial & Production Fields
  annualProductionLbs: real("annual_production_lbs"),
  schoolDistributionLbs: real("school_distribution_lbs"),
  excessForSaleLbs: real("excess_for_sale_lbs"),
  wholesalePricePerLb: real("wholesale_price_per_lb"),
  annualSalesRevenue: real("annual_sales_revenue"),
  constructionCost: real("construction_cost"),
  annualOperatingCost: real("annual_operating_cost"),
  netAnnualRevenue: real("net_annual_revenue"),
  // Distribution Infrastructure Jobs (for 40% excess to stores/markets)
  sortingPackagingJobs: integer("sorting_packaging_jobs"),
  deliveryDriverJobs: integer("delivery_driver_jobs"),
  warehouseLogisticsJobs: integer("warehouse_logistics_jobs"),
  totalDistributionJobs: integer("total_distribution_jobs"),
  // School Distribution Jobs (for 60% to 330 school districts)
  schoolSortingJobs: integer("school_sorting_jobs"),
  schoolDeliveryDrivers: integer("school_delivery_drivers"),
  schoolLogisticsCoordinators: integer("school_logistics_coordinators"),
  totalSchoolDistributionJobs: integer("total_school_distribution_jobs"),
  // Grand totals
  grandTotalJobs: integer("grand_total_jobs"),
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
export const insertImplementationTimelineSchema = createInsertSchema(implementationTimeline).omit({ id: true });
export const insertPoliticalRoadmapSchema = createInsertSchema(politicalRoadmap).omit({ id: true });
export const insertStressTestSchema = createInsertSchema(stressTests).omit({ id: true });
export const insertTieredCarbonPricingSchema = createInsertSchema(tieredCarbonPricing).omit({ id: true });
export const insertRegenerativeAgricultureSchema = createInsertSchema(regenerativeAgriculture).omit({ id: true });
export const insertNationwideFoodSecuritySchema = createInsertSchema(nationwideFoodSecurity).omit({ id: true });
export const insertLaborTransitionSchema = createInsertSchema(laborTransition).omit({ id: true });
export const insertPoliticalCoalitionSchema = createInsertSchema(politicalCoalition).omit({ id: true });
export const insertGlobalRegenerationSummarySchema = createInsertSchema(globalRegenerationSummary).omit({ id: true });
export const insertMiningAlternativeSchema = createInsertSchema(miningAlternative).omit({ id: true });

// Planetary Boundaries (Steffen et al. 2015, updated Richardson et al. 2023)
export const planetaryBoundaries = pgTable("planetary_boundaries", {
  id: serial("id").primaryKey(),
  boundary: text("boundary").notNull(),
  currentValue: real("current_value").notNull(),
  safeLimit: real("safe_limit").notNull(),
  criticalLimit: real("critical_limit").notNull(),
  unit: text("unit").notNull(),
  source: text("source").notNull(),
  status: text("status").notNull(), // safe, caution, danger
  description: text("description").notNull(),
});

// Calibration Targets for model validation
export const calibrationTargets = pgTable("calibration_targets", {
  id: serial("id").primaryKey(),
  parameter: text("parameter").notNull(),
  dataSource: text("data_source").notNull(),
  targetAccuracy: real("target_accuracy").notNull(),
  actualAccuracy: real("actual_accuracy").notNull(),
  validationPeriodStart: integer("validation_period_start").notNull(),
  validationPeriodEnd: integer("validation_period_end").notNull(),
  status: text("status").notNull(), // passed, warning, failed
  description: text("description").notNull(),
});

// Model Maturity Levels
export const modelMaturity = pgTable("model_maturity", {
  id: serial("id").primaryKey(),
  subsystem: text("subsystem").notNull(),
  maturityLevel: text("maturity_level").notNull(), // sandbox, calibrated, validated
  description: text("description").notNull(),
  dataSourcesCount: integer("data_sources_count").notNull(),
  validationTests: integer("validation_tests").notNull(),
  lastUpdated: text("last_updated").notNull(),
});

// Historical Climate Data (2015-2024 for validation charts)
export const historicalClimateData = pgTable("historical_climate_data", {
  id: serial("id").primaryKey(),
  year: integer("year").notNull(),
  tempAnomaly: real("temp_anomaly").notNull(),
  co2Ppm: real("co2_ppm").notNull(),
  seaLevelMm: real("sea_level_mm").notNull(),
  arcticIceExtent: real("arctic_ice_extent").notNull(),
  renewableShare: real("renewable_share").notNull(),
  globalGdpTrillion: real("global_gdp_trillion").notNull(),
  povertyRate: real("poverty_rate").notNull(),
  carbonIntensity: real("carbon_intensity").notNull(),
});

// Monte Carlo Simulation Results
export const monteCarloSimulations = pgTable("monte_carlo_simulations", {
  id: serial("id").primaryKey(),
  parameter: text("parameter").notNull(),
  scale: text("scale").notNull(),
  baselineValue: real("baseline_value").notNull(),
  p10Value: real("p10_value").notNull(),
  p25Value: real("p25_value").notNull(),
  p50Value: real("p50_value").notNull(),
  p75Value: real("p75_value").notNull(),
  p90Value: real("p90_value").notNull(),
  iterations: integer("iterations").notNull(),
  confidenceLevel: real("confidence_level").notNull(),
  unit: text("unit").notNull(),
  description: text("description").notNull(),
});

// Scenario Comparisons (Baseline, Optimistic, Conservative)
export const scenarioComparisons = pgTable("scenario_comparisons", {
  id: serial("id").primaryKey(),
  metric: text("metric").notNull(),
  category: text("category").notNull(),
  baselineValue: real("baseline_value").notNull(),
  optimisticValue: real("optimistic_value").notNull(),
  conservativeValue: real("conservative_value").notNull(),
  unit: text("unit").notNull(),
  description: text("description").notNull(),
  keyAssumptions: text("key_assumptions").notNull(),
});

// Optimization Parameters
export const optimizationParams = pgTable("optimization_params", {
  id: serial("id").primaryKey(),
  targetMetric: text("target_metric").notNull(),
  optimizationType: text("optimization_type").notNull(),
  currentValue: real("current_value").notNull(),
  targetValue: real("target_value").notNull(),
  optimalValue: real("optimal_value").notNull(),
  constraintName: text("constraint_name").notNull(),
  constraintValue: real("constraint_value").notNull(),
  unit: text("unit").notNull(),
  feasibility: text("feasibility").notNull(),
  description: text("description").notNull(),
});

// Sensitivity Analysis Results
export const sensitivityAnalysis = pgTable("sensitivity_analysis", {
  id: serial("id").primaryKey(),
  inputParameter: text("input_parameter").notNull(),
  outputMetric: text("output_metric").notNull(),
  baselineInput: real("baseline_input").notNull(),
  perturbationPct: real("perturbation_pct").notNull(),
  outputChange: real("output_change").notNull(),
  elasticity: real("elasticity").notNull(),
  rank: integer("rank").notNull(),
  description: text("description").notNull(),
});

// Global Regeneration Regions - World Map Data
export const globalRegenerationRegions = pgTable("global_regeneration_regions", {
  id: serial("id").primaryKey(),
  regionName: text("region_name").notNull(),
  countryCode: text("country_code").notNull(),
  latitude: real("latitude").notNull(),
  longitude: real("longitude").notNull(),
  category: text("category").notNull(),
  projectName: text("project_name").notNull(),
  description: text("description").notNull(),
  greenhouseFacilities: integer("greenhouse_facilities").notNull(),
  jobsCreated: integer("jobs_created").notNull(),
  annualCarbonSequestrationTons: real("annual_carbon_sequestration_tons").notNull(),
  peopleFed: integer("people_fed").notNull(),
  acresRestored: real("acres_restored").notNull(),
  waterSavedGallons: real("water_saved_gallons").notNull(),
  investmentMillions: real("investment_millions").notNull(),
  status: text("status").notNull(),
  impactHighlight: text("impact_highlight").notNull(),
});

export const insertGlobalRegenerationRegionSchema = createInsertSchema(globalRegenerationRegions).omit({ id: true });


export const insertPlanetaryBoundariesSchema = createInsertSchema(planetaryBoundaries).omit({ id: true });
export const insertCalibrationTargetsSchema = createInsertSchema(calibrationTargets).omit({ id: true });
export const insertModelMaturitySchema = createInsertSchema(modelMaturity).omit({ id: true });
export const insertHistoricalClimateDataSchema = createInsertSchema(historicalClimateData).omit({ id: true });
export const insertMonteCarloSimulationsSchema = createInsertSchema(monteCarloSimulations).omit({ id: true });
export const insertScenarioComparisonsSchema = createInsertSchema(scenarioComparisons).omit({ id: true });
export const insertOptimizationParamsSchema = createInsertSchema(optimizationParams).omit({ id: true });
export const insertSensitivityAnalysisSchema = createInsertSchema(sensitivityAnalysis).omit({ id: true });

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
export type ImplementationTimelineType = typeof implementationTimeline.$inferSelect;
export type PoliticalRoadmapType = typeof politicalRoadmap.$inferSelect;
export type StressTest = typeof stressTests.$inferSelect;
export type TieredCarbonPricingType = typeof tieredCarbonPricing.$inferSelect;
export type RegenerativeAgricultureType = typeof regenerativeAgriculture.$inferSelect;
export type NationwideFoodSecurityType = typeof nationwideFoodSecurity.$inferSelect;
export type LaborTransitionType = typeof laborTransition.$inferSelect;
export type PoliticalCoalitionType = typeof politicalCoalition.$inferSelect;
export type GlobalRegenerationSummaryType = typeof globalRegenerationSummary.$inferSelect;
export type MiningAlternativeType = typeof miningAlternative.$inferSelect;
export type PlanetaryBoundaryType = typeof planetaryBoundaries.$inferSelect;
export type CalibrationTargetType = typeof calibrationTargets.$inferSelect;
export type ModelMaturityType = typeof modelMaturity.$inferSelect;
export type HistoricalClimateDataType = typeof historicalClimateData.$inferSelect;
export type MonteCarloSimulationType = typeof monteCarloSimulations.$inferSelect;
export type ScenarioComparisonType = typeof scenarioComparisons.$inferSelect;
export type OptimizationParamType = typeof optimizationParams.$inferSelect;
export type SensitivityAnalysisType = typeof sensitivityAnalysis.$inferSelect;
export type GlobalRegenerationRegionType = typeof globalRegenerationRegions.$inferSelect;

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
export type InsertImplementationTimeline = z.infer<typeof insertImplementationTimelineSchema>;
export type InsertPoliticalRoadmap = z.infer<typeof insertPoliticalRoadmapSchema>;
export type InsertStressTest = z.infer<typeof insertStressTestSchema>;
export type InsertTieredCarbonPricing = z.infer<typeof insertTieredCarbonPricingSchema>;
export type InsertRegenerativeAgriculture = z.infer<typeof insertRegenerativeAgricultureSchema>;
export type InsertNationwideFoodSecurity = z.infer<typeof insertNationwideFoodSecuritySchema>;
export type InsertLaborTransition = z.infer<typeof insertLaborTransitionSchema>;
export type InsertPoliticalCoalition = z.infer<typeof insertPoliticalCoalitionSchema>;
export type InsertGlobalRegenerationSummary = z.infer<typeof insertGlobalRegenerationSummarySchema>;
export type InsertMiningAlternative = z.infer<typeof insertMiningAlternativeSchema>;
export type InsertPlanetaryBoundary = z.infer<typeof insertPlanetaryBoundariesSchema>;
export type InsertCalibrationTarget = z.infer<typeof insertCalibrationTargetsSchema>;
export type InsertModelMaturity = z.infer<typeof insertModelMaturitySchema>;
export type InsertHistoricalClimateData = z.infer<typeof insertHistoricalClimateDataSchema>;
export type InsertMonteCarloSimulation = z.infer<typeof insertMonteCarloSimulationsSchema>;
export type InsertScenarioComparison = z.infer<typeof insertScenarioComparisonsSchema>;
export type InsertOptimizationParam = z.infer<typeof insertOptimizationParamsSchema>;
export type InsertSensitivityAnalysis = z.infer<typeof insertSensitivityAnalysisSchema>;
export type InsertGlobalRegenerationRegion = z.infer<typeof insertGlobalRegenerationRegionSchema>;
