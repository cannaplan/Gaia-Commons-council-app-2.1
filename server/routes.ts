import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  // === Health ===
  app.get(api.health.get.path, (_req, res) => {
    res.json({
      status: "healthy",
      version: "5.0",
      service: "gaia-commons-api"
    });
  });

  // === Pilot Stats ===
  app.get(api.pilot.get.path, async (_req, res) => {
    const stats = await storage.getPilotStats();
    if (!stats) {
      return res.status(404).json({ message: "Pilot stats not initialized" });
    }
    res.json(stats);
  });

  // === Endowment Stats ===
  app.get(api.endowment.get.path, async (_req, res) => {
    const stats = await storage.getEndowmentStats();
    if (!stats) {
      return res.status(404).json({ message: "Endowment stats not initialized" });
    }
    res.json(stats);
  });

  // === Timeline ===
  app.get(api.timeline.list.path, async (_req, res) => {
    const events = await storage.getTimelineEvents();
    res.json(events);
  });

  // === Financial Metrics ===
  app.get(api.financials.get.path, async (_req, res) => {
    const metrics = await storage.getFinancialMetrics();
    if (!metrics) return res.status(404).json({ message: "Financial metrics not found" });
    res.json(metrics);
  });

  // === Climate Metrics ===
  app.get(api.climate.get.path, async (_req, res) => {
    const metrics = await storage.getClimateMetrics();
    if (!metrics) return res.status(404).json({ message: "Climate metrics not found" });
    res.json(metrics);
  });

  // === Slide Deck ===
  app.get(api.slides.list.path, async (_req, res) => {
    const slides = await storage.getSlides();
    res.json(slides);
  });

  // === Historical Financials ===
  app.get(api.historicalFinancials.list.path, async (_req, res) => {
    const data = await storage.getHistoricalFinancials();
    res.json(data);
  });

  // === School Clusters ===
  app.get(api.schoolClusters.list.path, async (_req, res) => {
    const clusters = await storage.getSchoolClusters();
    res.json(clusters);
  });

  // === Schools ===
  app.get(api.schools.list.path, async (_req, res) => {
    const schoolsList = await storage.getSchools();
    res.json(schoolsList);
  });

  // === Scale Projections ===
  app.get(api.scaleProjections.list.path, async (_req, res) => {
    const projections = await storage.getScaleProjections();
    res.json(projections);
  });

  // === Environmental Impact ===
  app.get(api.environmentalImpact.list.path, async (_req, res) => {
    const impacts = await storage.getEnvironmentalImpacts();
    res.json(impacts);
  });

  // === Job Creation ===
  app.get(api.jobCreation.list.path, async (_req, res) => {
    const jobs = await storage.getJobCreations();
    res.json(jobs);
  });

  // === Legal Framework ===
  app.get(api.legalFramework.get.path, async (_req, res) => {
    const legal = await storage.getLegalFramework();
    if (!legal) return res.status(404).json({ message: "Legal framework not found" });
    res.json(legal);
  });

  // === Seed Data ===
  await seedDatabase();

  return httpServer;
}

async function seedDatabase() {
  const isEmpty = await storage.isEmpty();
  if (isEmpty) {
    console.log("Seeding database with GAIA v4.1 MASTER PLATFORM data...");
    
    // Seed Pilot - 6 schools, 6155 students, 49250 sqft (from Python PILOT_SUMMARY)
    await storage.updatePilotStats({
      students: 6155,
      sqft: 49250,
      schools: 6,
      status: "live"
    });

    // Seed Endowment - v4.2 Locked ($2.1B statewide target)
    await storage.updateEndowmentStats({
      size: "2.1B",
      annual: "63M",
      greenhouses: 275
    });

    // Seed Financials (v4.1 from Python - 6 schools)
    await storage.updateFinancialMetrics({
      schoolCount: 6,
      initialInvestment: 2950000,
      annualOpex: 360000,
      yieldPerSchool: 120000,
      foodPricePerLb: 2.5,
      discountRate: 0.08,
      npv10yr: 12847000,
      roi10yrPct: 435,
      investmentPerSchool: 491667,
      opexPerSchool: 60000,
      annualRevenuePerSchool: 610000,
      totalAnnualYield: 720000,
      totalAnnualRevenue: 3660000,
      paybackYears: 0.8
    });

    // Seed Climate (v5.0 ETL - 365-day year-round aquaponics)
    await storage.updateClimateMetrics({
      avgTemp: 45.2,
      growingSeasonDays: 365,
      co2Ppm: 425,
      annualTons: 246000,
      studentMealsAnnual: "175,000,000"
    });

    // Seed School Clusters (St. Paul and Mendota Heights from Python)
    const stPaulCluster = await storage.createSchoolCluster({
      name: "Saint Paul",
      region: "St. Paul, MN",
      totalStudents: 3318,
      totalSqft: 26550,
      greenhouses: 3,
      yr5Students: 3816,
      co2TonsSequestered: 123000
    });
    
    const mendotaCluster = await storage.createSchoolCluster({
      name: "Mendota Heights",
      region: "Mendota Heights, MN",
      totalStudents: 2837,
      totalSqft: 22700,
      greenhouses: 3,
      yr5Students: 3262,
      co2TonsSequestered: 123000
    });

    // Seed Individual Schools (from Python ST_PAUL_CLUSTER and MENDOTA_CLUSTER)
    await storage.createSchool({ clusterId: stPaulCluster.id, name: "Saint Paul Academy (SPA)", enrollment: 952, grades: "PK-12", sqftTarget: 7600 });
    await storage.createSchool({ clusterId: stPaulCluster.id, name: "Highland Park High School", enrollment: 1456, grades: "9-12", sqftTarget: 11650 });
    await storage.createSchool({ clusterId: stPaulCluster.id, name: "Groveland Elementary", enrollment: 910, grades: "K-5", sqftTarget: 7300 });
    await storage.createSchool({ clusterId: mendotaCluster.id, name: "Saint Thomas Academy (STA)", enrollment: 588, grades: "6-12", sqftTarget: 4700 });
    await storage.createSchool({ clusterId: mendotaCluster.id, name: "Visitation School", enrollment: 601, grades: "PK-12", sqftTarget: 4800 });
    await storage.createSchool({ clusterId: mendotaCluster.id, name: "Two Rivers High School", enrollment: 1648, grades: "9-12", sqftTarget: 13200 });

    // Seed Multi-Scale Projections (Pilot, Statewide, National, Global)
    await storage.createScaleProjection({
      scale: "pilot",
      schools: 6,
      students: 6155,
      greenhouses: 6,
      sqft: 49250,
      capex: 2950000,
      annualRevenue: 3660000,
      annualOpex: 360000,
      npv5yr: 12847000,
      roiPct: 435,
      endowmentTarget: 5000000,
      endowmentYr15: 15400000,
      jobs: 36,
      co2TonsAnnual: 246,
      mealsPerDay: 17000
    });

    await storage.createScaleProjection({
      scale: "statewide",
      schools: 275,
      students: 875000,
      greenhouses: 275,
      sqft: 2200000,
      capex: 2750000000,
      annualRevenue: 168750000,
      annualOpex: 16500000,
      npv5yr: 590000000,
      roiPct: 435,
      endowmentTarget: 2100000000,
      endowmentYr15: 6450000000,
      jobs: 1650,
      co2TonsAnnual: 11275,
      mealsPerDay: 875000
    });

    await storage.createScaleProjection({
      scale: "national",
      schools: 130000,
      students: 50000000,
      greenhouses: 130000,
      sqft: 1040000000,
      capex: 48000000000,
      annualRevenue: 600000000000,
      annualOpex: 7800000000,
      npv5yr: 740000000000,
      roiPct: 435,
      endowmentTarget: 48000000000,
      endowmentYr15: 740000000000,
      jobs: 250000,
      co2TonsAnnual: 5330000,
      mealsPerDay: 50000000
    });

    await storage.createScaleProjection({
      scale: "global",
      schools: 1000000,
      students: 500000000,
      greenhouses: 1000000,
      sqft: 8000000000,
      capex: 370000000000,
      annualRevenue: 4600000000000,
      annualOpex: 60000000000,
      npv5yr: 5700000000000,
      roiPct: 435,
      endowmentTarget: 370000000000,
      endowmentYr15: 5700000000000,
      jobs: 2000000,
      co2TonsAnnual: 41000000,
      mealsPerDay: 500000000
    });

    // Seed Environmental Impact by Scale
    await storage.createEnvironmentalImpact({
      scale: "pilot",
      co2SequesteredTons: 246,
      waterSavedGallons: 2500000,
      landPreservedAcres: 50,
      foodMilesReduced: 500000,
      renewableEnergyPct: 85,
      wasteReducedTons: 120
    });

    await storage.createEnvironmentalImpact({
      scale: "statewide",
      co2SequesteredTons: 11275,
      waterSavedGallons: 115000000,
      landPreservedAcres: 2300,
      foodMilesReduced: 23000000,
      renewableEnergyPct: 85,
      wasteReducedTons: 5500
    });

    await storage.createEnvironmentalImpact({
      scale: "national",
      co2SequesteredTons: 5330000,
      waterSavedGallons: 54000000000,
      landPreservedAcres: 1100000,
      foodMilesReduced: 11000000000,
      renewableEnergyPct: 85,
      wasteReducedTons: 2600000
    });

    await storage.createEnvironmentalImpact({
      scale: "global",
      co2SequesteredTons: 41000000,
      waterSavedGallons: 420000000000,
      landPreservedAcres: 8500000,
      foodMilesReduced: 85000000000,
      renewableEnergyPct: 85,
      wasteReducedTons: 20000000
    });

    // Seed Job Creation by Scale
    await storage.createJobCreation({
      scale: "pilot",
      directJobs: 24,
      indirectJobs: 8,
      inducedJobs: 4,
      totalJobs: 36,
      avgSalary: 52000,
      economicImpact: 1872000
    });

    await storage.createJobCreation({
      scale: "statewide",
      directJobs: 1100,
      indirectJobs: 380,
      inducedJobs: 170,
      totalJobs: 1650,
      avgSalary: 52000,
      economicImpact: 85800000
    });

    await storage.createJobCreation({
      scale: "national",
      directJobs: 165000,
      indirectJobs: 57500,
      inducedJobs: 27500,
      totalJobs: 250000,
      avgSalary: 52000,
      economicImpact: 13000000000
    });

    await storage.createJobCreation({
      scale: "global",
      directJobs: 1300000,
      indirectJobs: 480000,
      inducedJobs: 220000,
      totalJobs: 2000000,
      avgSalary: 45000,
      economicImpact: 90000000000
    });

    // Seed Legal Framework (from Python)
    await storage.createLegalFramework({
      entityName: "Gaia Commons Council",
      entityType: "501(c)(3) Nonprofit Trust",
      boardSize: 7,
      boardComposition: "Multi-Stakeholder: Schools, Donors, Ag Experts, Tribal Rep, Student Council",
      endowmentRules: "4% Annual Spend | Planetary Boundaries Clause | Inflation-Proof Principal",
      filings: "MN SOS Articles, IRS Form 1023, Endowment Trust Agreement",
      complianceHash: "sha256:gaia-pilot-v4.1"
    });

    // Seed Ballot Slide Deck (15 slides from Python + extended)
    const slides = [
      { n: 1, title: "Executive Summary", text: "6,155 Students | $12.8M NPV | 6 Greenhouses" },
      { n: 2, title: "The Problem", text: "875k MN kids face food insecurity annually" },
      { n: 3, title: "The Solution", text: "275 greenhouses = 875,000 meals/day, year-round" },
      { n: 4, title: "Endowment Engine", text: "0.27% tax → $2.1B PERPETUAL endowment" },
      { n: 5, title: "St. Paul Cluster", text: "3,318 → 3,816 students | SPA, Highland Park, Groveland" },
      { n: 6, title: "Mendota Cluster", text: "2,837 → 3,262 students | STA, Visitation, Two Rivers" },
      { n: 7, title: "Financial Model", text: "CAPEX $2.95M | 5-Yr NPV $12.8M | 435% ROI" },
      { n: 8, title: "Year-Round Production", text: "365-day HVAC/geothermal/passive solar aquaponics" },
      { n: 9, title: "Climate Impact", text: "246,000 tons CO2 sequestered annually" },
      { n: 10, title: "National Vision", text: "MN → 50 States | $48B → $740B by Year 15" },
      { n: 11, title: "Job Creation", text: "250,000 jobs nationally | $13B economic impact" },
      { n: 12, title: "Governance", text: "7-Member Board | Tri-Cameral | Planetary Boundaries" },
      { n: 13, title: "Legal Framework", text: "501(c)(3) Trust | Constitutional Amendment Path" },
      { n: 14, title: "Timeline", text: "2026 Pilots → 2028 Ballot → 2030 Full Deployment" },
      { n: 15, title: "The Ask", text: "$5M Seed → $48B National | Vote Yes on Gaia" }
    ];
    for (const s of slides) {
      await storage.createSlide({ slideNumber: s.n, title: s.title, content: s.text });
    }

    // Seed Timeline - v4.1 Deliverables
    await storage.createTimelineEvent({ year: "2026 Q1", event: "St. Paul/Mendota 6-School Pilots Live" });
    await storage.createTimelineEvent({ year: "2026 Q2", event: "Principal Meetings Complete (Jan 20)" });
    await storage.createTimelineEvent({ year: "2026 Q4", event: "Ballot Signature Drive Begins" });
    await storage.createTimelineEvent({ year: "2027", event: "Statewide Expansion Planning" });
    await storage.createTimelineEvent({ year: "2028", event: "Constitutional Amendment Vote - $2.1B Funded" });
    await storage.createTimelineEvent({ year: "2030", event: "275 Greenhouses Deployed Statewide" });
    await storage.createTimelineEvent({ year: "2035", event: "National Rollout - 50 States" });
    await storage.createTimelineEvent({ year: "2040", event: "Global Deployment Initiated" });

    // Seed Historical Financials for Trend Analysis
    const historicalData = [
      { year: 2024, quarter: 1, schoolCount: 1, totalRevenue: 75000, totalOpex: 45000, totalYieldLbs: 30000, endowmentValue: 500000000, studentsServed: 940 },
      { year: 2024, quarter: 2, schoolCount: 1, totalRevenue: 85000, totalOpex: 48000, totalYieldLbs: 34000, endowmentValue: 550000000, studentsServed: 940 },
      { year: 2024, quarter: 3, schoolCount: 2, totalRevenue: 165000, totalOpex: 95000, totalYieldLbs: 66000, endowmentValue: 650000000, studentsServed: 1880 },
      { year: 2024, quarter: 4, schoolCount: 2, totalRevenue: 180000, totalOpex: 98000, totalYieldLbs: 72000, endowmentValue: 800000000, studentsServed: 1880 },
      { year: 2025, quarter: 1, schoolCount: 3, totalRevenue: 270000, totalOpex: 145000, totalYieldLbs: 108000, endowmentValue: 1000000000, studentsServed: 2820 },
      { year: 2025, quarter: 2, schoolCount: 4, totalRevenue: 380000, totalOpex: 195000, totalYieldLbs: 152000, endowmentValue: 1300000000, studentsServed: 3760 },
      { year: 2025, quarter: 3, schoolCount: 5, totalRevenue: 425000, totalOpex: 240000, totalYieldLbs: 170000, endowmentValue: 1600000000, studentsServed: 4700 },
      { year: 2025, quarter: 4, schoolCount: 6, totalRevenue: 450000, totalOpex: 260000, totalYieldLbs: 180000, endowmentValue: 1900000000, studentsServed: 5640 },
      { year: 2026, quarter: 1, schoolCount: 6, totalRevenue: 480000, totalOpex: 270000, totalYieldLbs: 192000, endowmentValue: 2100000000, studentsServed: 6155 },
    ];
    for (const h of historicalData) {
      await storage.createHistoricalFinancial(h);
    }
    
    console.log("Database seeded successfully with GAIA v4.1 MASTER PLATFORM data");
  }
}
