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

  // === Endowment Projections ===
  app.get(api.endowmentProjections.list.path, async (_req, res) => {
    const projections = await storage.getEndowmentProjections();
    res.json(projections);
  });

  // === Expanded Jobs ===
  app.get(api.expandedJobs.list.path, async (_req, res) => {
    const jobs = await storage.getExpandedJobs();
    res.json(jobs);
  });

  // === K-12 Curriculum ===
  app.get(api.k12Curriculum.list.path, async (_req, res) => {
    const curriculum = await storage.getK12Curriculum();
    res.json(curriculum);
  });

  // === Coalition Partners ===
  app.get(api.coalitionPartners.list.path, async (_req, res) => {
    const partners = await storage.getCoalitionPartners();
    res.json(partners);
  });

  // === Funding Sources ===
  app.get(api.fundingSources.list.path, async (_req, res) => {
    const sources = await storage.getFundingSources();
    res.json(sources);
  });

  // === Transparency Features ===
  app.get(api.transparencyFeatures.list.path, async (_req, res) => {
    const features = await storage.getTransparencyFeatures();
    res.json(features);
  });

  // === Accountability Mechanisms ===
  app.get(api.accountabilityMechanisms.list.path, async (_req, res) => {
    const mechanisms = await storage.getAccountabilityMechanisms();
    res.json(mechanisms);
  });

  // === Tribal Partnerships ===
  app.get(api.tribalPartnerships.list.path, async (_req, res) => {
    const partnerships = await storage.getTribalPartnerships();
    res.json(partnerships);
  });

  // === Implementation Timeline ===
  app.get(api.implementationTimeline.list.path, async (_req, res) => {
    const timeline = await storage.getImplementationTimeline();
    res.json(timeline);
  });

  // === Political Roadmap ===
  app.get(api.politicalRoadmap.list.path, async (_req, res) => {
    const roadmap = await storage.getPoliticalRoadmap();
    res.json(roadmap);
  });

  // === Stress Tests ===
  app.get(api.stressTests.list.path, async (_req, res) => {
    const tests = await storage.getStressTests();
    res.json(tests);
  });

  app.get(api.tieredCarbonPricing.list.path, async (_req, res) => {
    const data = await storage.getTieredCarbonPricing();
    res.json(data);
  });

  app.get(api.regenerativeAgriculture.list.path, async (_req, res) => {
    const data = await storage.getRegenerativeAgriculture();
    res.json(data);
  });

  app.get(api.nationwideFoodSecurity.get.path, async (_req, res) => {
    const data = await storage.getNationwideFoodSecurity();
    if (!data) return res.status(404).json({ message: "Food security data not found" });
    res.json(data);
  });

  app.get(api.laborTransition.list.path, async (_req, res) => {
    const data = await storage.getLaborTransition();
    res.json(data);
  });

  app.get(api.politicalCoalition.list.path, async (_req, res) => {
    const data = await storage.getPoliticalCoalition();
    res.json(data);
  });

  app.get(api.globalRegenerationSummary.get.path, async (_req, res) => {
    const data = await storage.getGlobalRegenerationSummary();
    if (!data) return res.status(404).json({ message: "Global regeneration summary not found" });
    res.json(data);
  });

  // === Calibration & Validation ===
  app.get(api.planetaryBoundaries.list.path, async (_req, res) => {
    const data = await storage.getPlanetaryBoundaries();
    res.json(data);
  });

  app.get(api.calibrationTargets.list.path, async (_req, res) => {
    const data = await storage.getCalibrationTargets();
    res.json(data);
  });

  app.get(api.modelMaturity.list.path, async (_req, res) => {
    const data = await storage.getModelMaturity();
    res.json(data);
  });

  app.get(api.historicalClimateData.list.path, async (_req, res) => {
    const data = await storage.getHistoricalClimateData();
    res.json(data);
  });

  // === Advanced Modeling ===
  app.get(api.monteCarloSimulations.list.path, async (_req, res) => {
    const data = await storage.getMonteCarloSimulations();
    res.json(data);
  });

  app.get(api.scenarioComparisons.list.path, async (_req, res) => {
    const data = await storage.getScenarioComparisons();
    res.json(data);
  });

  app.get(api.optimizationParams.list.path, async (_req, res) => {
    const data = await storage.getOptimizationParams();
    res.json(data);
  });

  app.get(api.sensitivityAnalysis.list.path, async (_req, res) => {
    const data = await storage.getSensitivityAnalysis();
    res.json(data);
  });

  // === Greenhouse Locations (Interactive Map) ===
  app.get(api.greenhouseLocations.list.path, async (_req, res) => {
    const data = await storage.getGreenhouseLocations();
    res.json(data);
  });

  // === Global Regeneration Regions (World Map) ===
  app.get(api.globalRegenerationRegions.list.path, async (_req, res) => {
    const data = await storage.getGlobalRegenerationRegions();
    res.json(data);
  });

  // === Seed Data ===
  await seedDatabase();

  return httpServer;
}

async function seedDatabase() {
  const isEmpty = await storage.isEmpty();
  
  // Always check if tribal partnerships needs seeding (may have been added after initial seed)
  const tribalData = await storage.getTribalPartnerships();
  if (tribalData.length === 0) {
    console.log("Seeding tribal partnerships...");
    await storage.createTribalPartnership({
      tribeName: "Leech Lake Band of Ojibwe",
      location: "Leech Lake Reservation, Minnesota",
      greenhouseCount: "5-10",
      jobsCreated: "50-100",
      hourlyWage: "$18-24/hr",
      firstHarvest: "Fall 2027",
      schoolsServed: "Cass Lake-Bena, Bug-O-Nay-Ge-Shig, Head Start",
      studentsServed: 1500,
      annualSurplus: "$400,000/year",
      surplusSplit: "35% Tribal Govt, 35% Growing Endowment, 30% Youth Scholarships & Food Pantry",
      breakEvenYear: 5,
      governance: "Council veto power, majority board seats, walk-away clause, annual Big-4 audits, public dashboard",
      complementaryProjects: "New $3.6M wild-rice facility - together lock in permanent food sovereignty and generational wealth",
      status: "Partnership Development"
    });
  }

  // Seed implementation timeline if empty
  const timelineData = await storage.getImplementationTimeline();
  if (timelineData.length === 0) {
    console.log("Seeding implementation timeline...");
    const milestones = [
      { phase: "Foundation", quarter: "2027 Q1", milestone: "Board Elections & Corpus Receipt", details: "Board elections; receive $2.1B corpus from state filings", greenhouseCount: 0, jobsCreated: 50, studentsServed: 0 },
      { phase: "Launch", quarter: "2027 Q2-Q4", milestone: "First 50 Greenhouses", details: "Build first 50 greenhouses; hire staff, train teachers", greenhouseCount: 50, jobsCreated: 260, studentsServed: 159000 },
      { phase: "Launch", quarter: "2027 Q3", milestone: "First Harvest", details: "First harvest; K-12 curriculum pilots with 9 school districts", greenhouseCount: 50, jobsCreated: 260, studentsServed: 159000 },
      { phase: "Scale", quarter: "2028 Q1-Q4", milestone: "Scale to 200 Greenhouses", details: "Expand to 200 greenhouses across all 8 congressional districts", greenhouseCount: 200, jobsCreated: 1040, studentsServed: 636000 },
      { phase: "Full Operation", quarter: "2028 Q4", milestone: "All 275 Greenhouses Operational", details: "875K students fed daily; 1,430 FTE jobs created; full statewide coverage", greenhouseCount: 275, jobsCreated: 1430, studentsServed: 875000 }
    ];
    for (const m of milestones) {
      await storage.createImplementationTimeline(m);
    }
  }

  // Seed political roadmap if empty
  const roadmapData = await storage.getPoliticalRoadmap();
  if (roadmapData.length === 0) {
    console.log("Seeding political roadmap...");
    const districts = [
      { district: "MN-03", supportLevel: "Strong YES", supportPct: "70%+", strategy: "Bankroll field ops for weak districts", keyMessaging: "Education investment, suburban families" },
      { district: "MN-04", supportLevel: "Strong YES", supportPct: "70%+", strategy: "Bankroll field ops for weak districts", keyMessaging: "Urban food access, jobs" },
      { district: "MN-05", supportLevel: "Strong YES", supportPct: "70%+", strategy: "Bankroll field ops for weak districts", keyMessaging: "Climate action, equity" },
      { district: "MN-01", supportLevel: "Competitive", supportPct: "50-56%", strategy: "Ground game + local partnerships", keyMessaging: "Rural jobs, farm partnerships" },
      { district: "MN-06", supportLevel: "Competitive", supportPct: "50-56%", strategy: "Ground game + local partnerships", keyMessaging: "Local food, school nutrition" },
      { district: "MN-07", supportLevel: "Competitive", supportPct: "50-56%", strategy: "Ground game + local partnerships", keyMessaging: "Agricultural innovation, jobs" },
      { district: "MN-08", supportLevel: "Competitive", supportPct: "50-56%", strategy: "Ground game + local partnerships", keyMessaging: "Iron Range jobs, Boundary Waters protection" },
      { district: "MN-02", supportLevel: "Lean NO", supportPct: "48-52%", strategy: "Regenerative ag + jobs messaging", keyMessaging: "Economic development, local hiring" }
    ];
    for (const d of districts) {
      await storage.createPoliticalRoadmap(d);
    }
  }

  // Seed stress tests if empty
  const stressData = await storage.getStressTests();
  if (stressData.length === 0) {
    console.log("Seeding stress tests...");
    const scenarios = [
      { scenario: "Bear Market", description: "5% annual loss for 5 consecutive years", impact: "Corpus temporarily reduced by ~22%", mitigation: "Spending-smoothing policy maintains draw; recovery within 10 years", solvencyProbability: "99%+" },
      { scenario: "Inflation Surge", description: "4% annual inflation for 10 years", impact: "Purchasing power erosion risk", mitigation: "CPI adjustment protects purchasing power; corpus grows real 2%", solvencyProbability: "99%+" },
      { scenario: "Combined Shock", description: "Bear market + inflation surge simultaneously", impact: "Maximum stress on corpus and spending", mitigation: "1000-path Monte Carlo using 1926-2022 data shows resilience", solvencyProbability: "99%+" },
      { scenario: "Spending Policy", description: "3-year rolling-average corpus with caps", impact: "Smooths volatility in annual draws", mitigation: "Max 10% year-to-year change; emergency 5% cap (board vote)", solvencyProbability: "100%" }
    ];
    for (const s of scenarios) {
      await storage.createStressTest(s);
    }
  }

  // Seed Global Regeneration: Tiered Carbon Pricing
  const carbonData = await storage.getTieredCarbonPricing();
  if (carbonData.length === 0) {
    console.log("Seeding tiered carbon pricing...");
    const tiers = [
      { tierName: "small_emitters", thresholdMin: 0, thresholdMax: 25000, carbonTaxRate: 25, description: "Small businesses, local operations", emissionFraction: 0.15, reductionRate: 0.10, businessSurvival: 0.95, revenueMillions: 262 },
      { tierName: "medium_emitters", thresholdMin: 25000, thresholdMax: 100000, carbonTaxRate: 75, description: "Regional companies, mid-size operations", emissionFraction: 0.25, reductionRate: 0.25, businessSurvival: 0.90, revenueMillions: 984 },
      { tierName: "large_emitters", thresholdMin: 100000, thresholdMax: 1000000, carbonTaxRate: 150, description: "Major corporations, large industrial facilities", emissionFraction: 0.35, reductionRate: 0.45, businessSurvival: 0.80, revenueMillions: 2021 },
      { tierName: "mega_polluters", thresholdMin: 1000000, thresholdMax: null, carbonTaxRate: 200, description: "Fossil fuel companies, massive industrial polluters", emissionFraction: 0.25, reductionRate: 0.70, businessSurvival: 0.40, revenueMillions: 1050 }
    ];
    for (const t of tiers) {
      await storage.createTieredCarbonPricing(t);
    }
  }

  // Seed Global Regeneration: Regenerative Agriculture
  const agData = await storage.getRegenerativeAgriculture();
  if (agData.length === 0) {
    console.log("Seeding regenerative agriculture...");
    const usAcres = 180000000 * 0.8; // 80% transition at $150 carbon
    const operations = [
      { operationType: "hemp_production", name: "Industrial Hemp Multi-Stream", description: "Fiber, seed, biomass, soil remediation", acresAllocated: usAcres * 0.20, revenuePerAcre: 2850, jobsPer1000Acres: 6.8, avgWage: 48000, carbonSequestration: 4.2, peopleFedPerAcre: 12, totalJobs: Math.floor(usAcres * 0.20 / 1000 * 6.8), totalRevenue: usAcres * 0.20 * 2850, totalCarbonSequestered: usAcres * 0.20 * 4.2 },
      { operationType: "market_garden", name: "Diversified Market Garden", description: "50+ vegetable crops for local markets", acresAllocated: usAcres * 0.16, revenuePerAcre: 8500, jobsPer1000Acres: 12.5, avgWage: 45000, carbonSequestration: 3.2, peopleFedPerAcre: 8, totalJobs: Math.floor(usAcres * 0.16 / 1000 * 12.5), totalRevenue: usAcres * 0.16 * 8500, totalCarbonSequestered: usAcres * 0.16 * 3.2 },
      { operationType: "food_forest", name: "Agroforestry/Food Forest", description: "Perennial nuts, fruits, berries, mushrooms", acresAllocated: usAcres * 0.12, revenuePerAcre: 3200, jobsPer1000Acres: 6.8, avgWage: 42000, carbonSequestration: 5.8, peopleFedPerAcre: 4, totalJobs: Math.floor(usAcres * 0.12 / 1000 * 6.8), totalRevenue: usAcres * 0.12 * 3200, totalCarbonSequestered: usAcres * 0.12 * 5.8 },
      { operationType: "silvopasture", name: "Silvopasture Livestock", description: "Rotational grazing with trees", acresAllocated: usAcres * 0.20, revenuePerAcre: 850, jobsPer1000Acres: 4.2, avgWage: 48000, carbonSequestration: 2.8, peopleFedPerAcre: 1.2, totalJobs: Math.floor(usAcres * 0.20 / 1000 * 4.2), totalRevenue: usAcres * 0.20 * 850, totalCarbonSequestered: usAcres * 0.20 * 2.8 },
      { operationType: "grain_diversification", name: "Diversified Grain Systems", description: "10+ grain crops in rotation", acresAllocated: usAcres * 0.32, revenuePerAcre: 680, jobsPer1000Acres: 2.8, avgWage: 52000, carbonSequestration: 1.8, peopleFedPerAcre: 2.1, totalJobs: Math.floor(usAcres * 0.32 / 1000 * 2.8), totalRevenue: usAcres * 0.32 * 680, totalCarbonSequestered: usAcres * 0.32 * 1.8 }
    ];
    for (const op of operations) {
      await storage.createRegenerativeAgriculture(op);
    }
  }

  // Seed Global Regeneration: Nationwide Food Security
  const foodSecData = await storage.getNationwideFoodSecurity();
  if (!foodSecData) {
    console.log("Seeding nationwide food security...");
    const totalStudents = 52000000; // ~52 million public school students
    const facilitiesNeeded = Math.ceil(totalStudents / 3000);
    await storage.createNationwideFoodSecurity({
      scope: "All 50 states",
      totalStudents: totalStudents,
      facilitiesNeeded: facilitiesNeeded,
      jobsCreated: facilitiesNeeded * 4,
      constructionCost: facilitiesNeeded * 400000,
      annualOperating: facilitiesNeeded * 150000,
      co2ReductionTons: totalStudents * 365 * 0.0003 * 1500 * 0.90 * 0.0004,
      waterSavingsGallons: facilitiesNeeded * 50000,
      pesticideElimination: "100% - no pesticides in controlled environment",
      replicationModel: "State-by-state using MCS template"
    });
  }

  // Seed Global Regeneration: Labor Transition
  const laborData = await storage.getLaborTransition();
  if (laborData.length === 0) {
    console.log("Seeding labor transition...");
    const sectors = [
      { sector: "Coal", workersAffected: 43000, avgWage: 75000, incomeGuaranteeRate: 1.25, transitionDurationYears: 3, retrainingCostPerWorker: 45000, successRate: 0.78, totalCost: 43000 * (75000 * 1.25 * 3 + 45000), choicePreservation: "Workers choose timing and pathway" },
      { sector: "Oil & Gas", workersAffected: 1200000, avgWage: 75000, incomeGuaranteeRate: 1.25, transitionDurationYears: 3, retrainingCostPerWorker: 45000, successRate: 0.78, totalCost: 1200000 * (75000 * 1.25 * 3 + 45000), choicePreservation: "Workers choose timing and pathway" },
      { sector: "Pipeline", workersAffected: 125000, avgWage: 75000, incomeGuaranteeRate: 1.25, transitionDurationYears: 3, retrainingCostPerWorker: 45000, successRate: 0.78, totalCost: 125000 * (75000 * 1.25 * 3 + 45000), choicePreservation: "Workers choose timing and pathway" },
      { sector: "Auto (ICE)", workersAffected: 180000, avgWage: 75000, incomeGuaranteeRate: 1.25, transitionDurationYears: 3, retrainingCostPerWorker: 45000, successRate: 0.78, totalCost: 180000 * (75000 * 1.25 * 3 + 45000), choicePreservation: "Workers choose timing and pathway" }
    ];
    for (const s of sectors) {
      await storage.createLaborTransition(s);
    }
  }

  // Seed Global Regeneration: Political Coalition
  const coalitionData = await storage.getPoliticalCoalition();
  if (coalitionData.length === 0) {
    console.log("Seeding political coalition...");
    const groups = [
      { groupName: "Green Job Workers", memberCount: 0, description: "New jobs from energy transition", isCalculated: 1 },
      { groupName: "Students & Families", memberCount: 0, description: "Beneficiaries of food security program", isCalculated: 1 },
      { groupName: "Farmers Transitioned", memberCount: 0, description: "Regenerative agriculture adopters", isCalculated: 1 },
      { groupName: "Environmental Activists", memberCount: 15000000, description: "Climate advocacy organizations", isCalculated: 0 },
      { groupName: "Healthcare Workers", memberCount: 18000000, description: "Support universal programs", isCalculated: 0 },
      { groupName: "Teachers", memberCount: 3500000, description: "Support education investments", isCalculated: 0 },
      { groupName: "Young Voters (18-35)", memberCount: 65000000, description: "Climate-concerned generation", isCalculated: 0 }
    ];
    for (const g of groups) {
      await storage.createPoliticalCoalition(g);
    }
  }

  // Seed Global Regeneration Summary
  const summaryData = await storage.getGlobalRegenerationSummary();
  if (!summaryData) {
    console.log("Seeding global regeneration summary...");
    const totalJobs = 840000 + 69334 + 2500000; // ag jobs + food security + green energy
    const totalCoalition = 101500000 + totalJobs + 26000000; // base + jobs + calculated families
    await storage.createGlobalRegenerationSummary({
      totalJobsCreated: totalJobs,
      totalCoalitionSize: totalCoalition,
      coalitionPercentage: (totalCoalition / 240000000) * 100,
      politicalPowerAssessment: "Overwhelming - largest coalition in US history",
      oppositionSize: 75000,
      coalitionAdvantage: "1000:1 ratio favoring Gaia coalition",
      totalTransitionCosts: 525000000000, // ~$525B
      choicePreservationAchieved: 1
    });
  }
  
  if (isEmpty) {
    console.log("Seeding database with GAIA v4.1 MASTER PLATFORM data...");
    
    // Seed Pilot - 6 schools, 5630 students (corrected), 49250 sqft (from Python PILOT_SUMMARY)
    await storage.updatePilotStats({
      students: 5630,
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
    // St. Paul: SPA 952 + Highland Park 1456 + Groveland 385 = 2793
    const stPaulCluster = await storage.createSchoolCluster({
      name: "Saint Paul",
      region: "St. Paul, MN",
      totalStudents: 2793,
      totalSqft: 22350,
      greenhouses: 3,
      yr5Students: 3212,
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
    await storage.createSchool({ clusterId: stPaulCluster.id, name: "Groveland Elementary", enrollment: 385, grades: "K-5", sqftTarget: 3100 });
    await storage.createSchool({ clusterId: mendotaCluster.id, name: "Saint Thomas Academy (STA)", enrollment: 588, grades: "6-12", sqftTarget: 4700 });
    await storage.createSchool({ clusterId: mendotaCluster.id, name: "Visitation School", enrollment: 601, grades: "PK-12", sqftTarget: 4800 });
    await storage.createSchool({ clusterId: mendotaCluster.id, name: "Two Rivers High School", enrollment: 1648, grades: "9-12", sqftTarget: 13200 });

    // Seed Multi-Scale Projections (Pilot, Statewide, National, Global)
    await storage.createScaleProjection({
      scale: "pilot",
      schools: 6,
      students: 5630,
      greenhouses: 6,
      sqft: 45050,
      capex: 2950000,
      annualRevenue: 3660000,
      annualOpex: 360000,
      npv5yr: 12847000,
      roiPct: 435,
      endowmentTarget: 5000000,
      endowmentYr15: 15400000,
      jobs: 36,
      co2TonsAnnual: 246,
      mealsPerDay: 15500
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
      { n: 1, title: "Executive Summary", text: "5,630 Students | $12.8M NPV | 6 Greenhouses" },
      { n: 2, title: "The Problem", text: "875k MN kids face food insecurity annually" },
      { n: 3, title: "The Solution", text: "275 greenhouses = 875,000 meals/day, year-round" },
      { n: 4, title: "Endowment Engine", text: "0.27% tax → $2.1B PERPETUAL endowment" },
      { n: 5, title: "St. Paul Cluster", text: "2,793 → 3,212 students | SPA, Highland Park, Groveland" },
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

    // Seed Historical Financials for Trend Analysis (starting 2026)
    const historicalData = [
      { year: 2026, quarter: 1, schoolCount: 6, totalRevenue: 915000, totalOpex: 90000, totalYieldLbs: 180000, endowmentValue: 5000000, studentsServed: 5630 },
      { year: 2026, quarter: 2, schoolCount: 6, totalRevenue: 915000, totalOpex: 90000, totalYieldLbs: 180000, endowmentValue: 5250000, studentsServed: 5630 },
      { year: 2026, quarter: 3, schoolCount: 6, totalRevenue: 915000, totalOpex: 90000, totalYieldLbs: 180000, endowmentValue: 5512000, studentsServed: 5630 },
      { year: 2026, quarter: 4, schoolCount: 6, totalRevenue: 915000, totalOpex: 90000, totalYieldLbs: 180000, endowmentValue: 5788000, studentsServed: 5630 },
      { year: 2027, quarter: 1, schoolCount: 25, totalRevenue: 3812500, totalOpex: 375000, totalYieldLbs: 750000, endowmentValue: 25000000, studentsServed: 23460 },
      { year: 2027, quarter: 2, schoolCount: 50, totalRevenue: 7625000, totalOpex: 750000, totalYieldLbs: 1500000, endowmentValue: 75000000, studentsServed: 46920 },
      { year: 2027, quarter: 3, schoolCount: 100, totalRevenue: 15250000, totalOpex: 1500000, totalYieldLbs: 3000000, endowmentValue: 175000000, studentsServed: 93840 },
      { year: 2027, quarter: 4, schoolCount: 150, totalRevenue: 22875000, totalOpex: 2250000, totalYieldLbs: 4500000, endowmentValue: 350000000, studentsServed: 140760 },
      { year: 2028, quarter: 1, schoolCount: 200, totalRevenue: 30500000, totalOpex: 3000000, totalYieldLbs: 6000000, endowmentValue: 700000000, studentsServed: 187680 },
      { year: 2028, quarter: 2, schoolCount: 225, totalRevenue: 34312500, totalOpex: 3375000, totalYieldLbs: 6750000, endowmentValue: 1050000000, studentsServed: 211140 },
      { year: 2028, quarter: 3, schoolCount: 250, totalRevenue: 38125000, totalOpex: 3750000, totalYieldLbs: 7500000, endowmentValue: 1400000000, studentsServed: 234600 },
      { year: 2028, quarter: 4, schoolCount: 275, totalRevenue: 41937500, totalOpex: 4125000, totalYieldLbs: 8250000, endowmentValue: 2100000000, studentsServed: 875000 },
    ];
    for (const h of historicalData) {
      await storage.createHistoricalFinancial(h);
    }

    // Seed 50-Year Endowment Projections (from ballot deck slide 5)
    const endowmentYears = [
      { year: 2027, corpus: 2100000000, annualDraw: 73500000, inflationAdjusted: 73500000 },
      { year: 2032, corpus: 2800000000, annualDraw: 98000000, inflationAdjusted: 85000000 },
      { year: 2037, corpus: 3950000000, annualDraw: 121200000, inflationAdjusted: 95000000 },
      { year: 2047, corpus: 7850000000, annualDraw: 274750000, inflationAdjusted: 165000000 },
      { year: 2057, corpus: 17380000000, annualDraw: 520700000, inflationAdjusted: 245000000 },
      { year: 2067, corpus: 39500000000, annualDraw: 1185000000, inflationAdjusted: 430000000 },
      { year: 2077, corpus: 89590000000, annualDraw: 2660000000, inflationAdjusted: 750000000 }
    ];
    for (const e of endowmentYears) {
      await storage.createEndowmentProjection(e);
    }

    // Seed Expanded Jobs Data (FTE + Internships + Volunteers from ballot deck)
    await storage.createExpandedJobs({
      scale: "pilot",
      fteJobs: 36,
      studentInternships: 144,
      volunteerPositions: 66,
      hourlyWage: 15,
      directWages: 1420000,
      economicMultiplier: 2.4
    });
    await storage.createExpandedJobs({
      scale: "statewide",
      fteJobs: 1430,
      studentInternships: 6600,
      volunteerPositions: 3025,
      hourlyWage: 15,
      directWages: 65000000,
      economicMultiplier: 2.4
    });
    await storage.createExpandedJobs({
      scale: "national",
      fteJobs: 67500,
      studentInternships: 312000,
      volunteerPositions: 143000,
      hourlyWage: 15,
      directWages: 3070000000,
      economicMultiplier: 2.4
    });
    await storage.createExpandedJobs({
      scale: "global",
      fteJobs: 520000,
      studentInternships: 2400000,
      volunteerPositions: 1100000,
      hourlyWage: 12,
      directWages: 18700000000,
      economicMultiplier: 2.2
    });

    // Seed K-12 NGSS Curriculum (from ballot deck slide 9)
    await storage.createK12Curriculum({
      gradeRange: "K-2",
      title: "Life Cycles",
      description: "Plant growth, responsibility, soil science. Students learn the basics of how plants grow and their importance in ecosystems.",
      durationWeeks: 8,
      standards: "NGSS: K-LS1-1, K-ESS2-2, K-ESS3-1"
    });
    await storage.createK12Curriculum({
      gradeRange: "3-5",
      title: "Ecosystems",
      description: "Data collection, carbon cycle, environmental science. Students analyze real greenhouse data and understand nutrient cycling.",
      durationWeeks: 12,
      standards: "NGSS: 3-LS4-3, 4-LS1-1, 5-LS2-1"
    });
    await storage.createK12Curriculum({
      gradeRange: "6-8",
      title: "Sustainability",
      description: "Hydroponics, soil health, regenerative agriculture. Students design and manage aquaponic systems.",
      durationWeeks: 16,
      standards: "NGSS: MS-LS2-1, MS-LS2-3, MS-ESS3-3"
    });
    await storage.createK12Curriculum({
      gradeRange: "9-12",
      title: "Policy + Systems",
      description: "Climate modeling, ballot initiatives, food policy design. Semester-long capstone project with real policy analysis.",
      durationWeeks: 18,
      standards: "NGSS: HS-LS2-7, HS-ESS3-4, HS-ETS1-3"
    });

    // Seed Coalition Partners (from ballot deck slide 11)
    // Tier 1 - Essential
    await storage.createCoalitionPartner({ tier: 1, name: "Minnesota Education Association", category: "Labor", memberCount: 200000, focus: "Teacher support, curriculum" });
    await storage.createCoalitionPartner({ tier: 1, name: "Minnesota AFL-CIO", category: "Labor", memberCount: 300000, focus: "Job creation, fair wages" });
    await storage.createCoalitionPartner({ tier: 1, name: "Sierra Club Minnesota", category: "Environmental", memberCount: 25000, focus: "Climate action, sustainability" });
    await storage.createCoalitionPartner({ tier: 1, name: "Minnesota Farmers Union", category: "Agriculture", memberCount: 20000, focus: "Local food systems" });
    // Tier 2 - Amplification
    await storage.createCoalitionPartner({ tier: 2, name: "NAACP Minnesota", category: "Equity", memberCount: 5000, focus: "Food equity, access" });
    await storage.createCoalitionPartner({ tier: 2, name: "Minnesota Council of Churches", category: "Faith", memberCount: 50000, focus: "Community outreach" });
    await storage.createCoalitionPartner({ tier: 2, name: "University of Minnesota", category: "Academic", memberCount: 70000, focus: "Research, ag extension" });
    await storage.createCoalitionPartner({ tier: 2, name: "Mayo Clinic", category: "Health", memberCount: 73000, focus: "Nutrition, public health" });
    // Tier 3 - Business
    await storage.createCoalitionPartner({ tier: 3, name: "Target Corporation", category: "Retail", memberCount: null, focus: "Corporate sponsorship, supply chain" });
    await storage.createCoalitionPartner({ tier: 3, name: "Cargill", category: "Agriculture", memberCount: null, focus: "Ag technology, distribution" });
    await storage.createCoalitionPartner({ tier: 3, name: "3M Company", category: "Manufacturing", memberCount: null, focus: "Sustainability tech, materials" });
    await storage.createCoalitionPartner({ tier: 3, name: "Minneapolis Chamber of Commerce", category: "Business", memberCount: 1200, focus: "Economic development" });

    // Seed Funding Sources (from ballot deck slides 2, 5.5, 6)
    await storage.createFundingSource({
      sourceType: "Fortune 500",
      description: "0.27% pre-tax profit redirect from Minnesota Fortune 500 companies",
      targetAmount: 1890000000,
      percentage: 0.27,
      entities: "Target, UnitedHealth, Best Buy, 3M, General Mills, US Bancorp, Xcel Energy, CHS, Land O'Lakes, Hormel, Polaris, Fastenal, Patterson, CH Robinson, Graco, Pentair, Donaldson"
    });
    await storage.createFundingSource({
      sourceType: "Billionaires & Sports",
      description: "Voluntary large-gift contributions from MN billionaires and pro sports teams",
      targetAmount: 200000000,
      percentage: null,
      entities: "Glen Taylor, Whitney MacMillan, Stanley Hubbard, Vikings, Twins, Timberwolves, Wild"
    });
    await storage.createFundingSource({
      sourceType: "Out-of-Country Mining",
      description: "1% surcharge on out-of-country mining corporations operating in Minnesota",
      targetAmount: 400000000,
      percentage: 1.0,
      entities: "Codelco, Antofagasta, Vale, SQM, Glencore, Rio Tinto, BHP, Anglo American"
    });
    await storage.createFundingSource({
      sourceType: "Out-of-State Corporations",
      description: "0.5% surcharge on out-of-state corps with >$1B MN revenue",
      targetAmount: 240000000,
      percentage: 0.5,
      entities: "Major insurers, banks, retailers, ag-conglomerates with significant MN presence"
    });
    await storage.createFundingSource({
      sourceType: "Data Center Giants",
      description: "1% surcharge on major tech companies with MN data center operations",
      targetAmount: 170000000,
      percentage: 1.0,
      entities: "Amazon, Microsoft, Google, Meta, Apple"
    });

    // Seed Transparency Features (from Accountability slide)
    await storage.createTransparencyFeature({
      category: "Radical Visibility",
      feature: "Real-Time Dashboard",
      description: "Public quarterly dashboard showing corpus balance, investment performance, spending breakdown, production metrics",
      whoSees: "Politicians, school districts, students, stewards, media, auditors, public",
      fraudPrevention: "No hiding place - every dollar accounted for, visible, traceable"
    });
    await storage.createTransparencyFeature({
      category: "Distributed Construction",
      feature: "Visible Building Process",
      description: "Weekly construction photos, public permits, school staff inspections, budget transparency",
      whoSees: "Community, teachers, students, local media",
      fraudPrevention: "Can't hide cost overruns, shoddy construction, or corrupted contractors"
    });
    await storage.createTransparencyFeature({
      category: "Distributed Hiring",
      feature: "Local Jobs Transparency",
      description: "Local hiring preference, published wages, visible career ladder, equity tracking",
      whoSees: "Community, school boards, parents, unions",
      fraudPrevention: "Can't pay workers less, create fake jobs, or exploit workers secretly"
    });
    await storage.createTransparencyFeature({
      category: "Distributed Learning",
      feature: "Teacher-Controlled Curriculum",
      description: "Curriculum designed by K-12 educators, public lesson plans, tracked student outcomes",
      whoSees: "Teachers, parents, students, auditors",
      fraudPrevention: "Can't fake learning outcomes or use curriculum as money-laundering"
    });
    await storage.createTransparencyFeature({
      category: "Distributed Governance",
      feature: "Community Board Elections",
      description: "3 of 13 seats elected by community, public meetings, published minutes, 10-year reviews",
      whoSees: "Voters, citizens, media, attorney general",
      fraudPrevention: "Can't control board indefinitely or hide governance decisions"
    });

    // Seed Accountability Mechanisms (from Accountability slide)
    await storage.createAccountabilityMechanism({
      mechanism: "Big 4 Independent Audit",
      description: "Full financial and compliance audit by Deloitte, EY, PwC, or KPMG",
      frequency: "Annual",
      whoAudits: "External Big 4 auditor",
      visibility: "Results published publicly via Form 990 and IRS record"
    });
    await storage.createAccountabilityMechanism({
      mechanism: "Steward Review",
      description: "Major donors ($500K+) review financials and raise questions publicly",
      frequency: "Quarterly",
      whoAudits: "Steward Advisory Council",
      visibility: "Meeting documentation shared with stakeholders"
    });
    await storage.createAccountabilityMechanism({
      mechanism: "Community Inspection",
      description: "School staff, student interns, parents can visit greenhouses unannounced",
      frequency: "Ongoing",
      whoAudits: "Teachers, students, parents, journalists",
      visibility: "Open access policy for media and community members"
    });
    await storage.createAccountabilityMechanism({
      mechanism: "Board Elections",
      description: "3 community-elected seats with public candidates and debates",
      frequency: "Every 3 years",
      whoAudits: "Minnesota voters",
      visibility: "Public election process with recorded votes"
    });
    await storage.createAccountabilityMechanism({
      mechanism: "Multi-Layer Verification",
      description: "Multiple auditors prevent corruption - requires conspiracy of 3+ people",
      frequency: "Continuous",
      whoAudits: "Big 4 + Stewards + Community + Media",
      visibility: "Discovery is inevitable - public shame and legal prosecution for fraud"
    });

    console.log("Database seeded successfully with GAIA v4.1 MASTER PLATFORM data + expanded ballot initiative data + accountability framework");
  }

  // Seed Calibration & Validation data if empty
  const boundariesData = await storage.getPlanetaryBoundaries();
  if (boundariesData.length === 0) {
    console.log("Seeding calibration and validation data...");
    
    // Planetary Boundaries (Steffen et al. 2015, updated Richardson et al. 2023)
    const boundaries = [
      { boundary: "Climate Change", currentValue: 1.2, safeLimit: 1.5, criticalLimit: 2.0, unit: "°C warming", source: "IPCC AR6 2023", status: "caution", description: "Atmospheric CO2 concentration driving global temperature rise" },
      { boundary: "Biosphere Integrity", currentValue: 0.82, safeLimit: 0.90, criticalLimit: 0.70, unit: "intact fraction", source: "Newbold et al. 2016", status: "caution", description: "Biodiversity loss and ecosystem degradation" },
      { boundary: "Land-System Change", currentValue: 0.69, safeLimit: 0.75, criticalLimit: 0.60, unit: "forest fraction", source: "FAO 2023", status: "caution", description: "Deforestation and land use conversion" },
      { boundary: "Nitrogen Cycle", currentValue: 1.8, safeLimit: 1.0, criticalLimit: 2.5, unit: "safe boundary ratio", source: "Steffen et al. 2015", status: "danger", description: "Industrial nitrogen fixation exceeding safe limits" },
      { boundary: "Phosphorus Cycle", currentValue: 2.1, safeLimit: 1.0, criticalLimit: 3.0, unit: "safe boundary ratio", source: "Steffen et al. 2015", status: "danger", description: "Phosphorus loading in freshwater systems" },
      { boundary: "Ocean Acidification", currentValue: 8.04, safeLimit: 8.10, criticalLimit: 7.95, unit: "pH units", source: "IPCC Ocean 2023", status: "caution", description: "CO2 absorption reducing ocean pH levels" }
    ];
    for (const b of boundaries) {
      await storage.createPlanetaryBoundary(b);
    }

    // Calibration Targets
    const targets = [
      { parameter: "Temperature Anomaly", dataSource: "NASA GISS Surface Temperature", targetAccuracy: 0.05, actualAccuracy: 0.03, validationPeriodStart: 2015, validationPeriodEnd: 2024, status: "passed", description: "Global mean surface temperature deviation from 1951-1980 baseline" },
      { parameter: "Renewable Energy Share", dataSource: "IEA World Energy Outlook", targetAccuracy: 0.02, actualAccuracy: 0.015, validationPeriodStart: 2020, validationPeriodEnd: 2024, status: "passed", description: "Share of renewables in global electricity generation" },
      { parameter: "CO2 Concentration", dataSource: "NOAA Global Monitoring Lab", targetAccuracy: 0.01, actualAccuracy: 0.008, validationPeriodStart: 2015, validationPeriodEnd: 2024, status: "passed", description: "Atmospheric CO2 measured at Mauna Loa Observatory" },
      { parameter: "Sea Level Rise", dataSource: "NASA Satellite Altimetry", targetAccuracy: 0.03, actualAccuracy: 0.025, validationPeriodStart: 2015, validationPeriodEnd: 2024, status: "passed", description: "Global mean sea level change from satellite measurements" },
      { parameter: "Arctic Ice Extent", dataSource: "NSIDC Sea Ice Index", targetAccuracy: 0.05, actualAccuracy: 0.045, validationPeriodStart: 2015, validationPeriodEnd: 2024, status: "passed", description: "September minimum Arctic sea ice extent" }
    ];
    for (const t of targets) {
      await storage.createCalibrationTarget(t);
    }

    // Model Maturity Levels
    const maturity = [
      { subsystem: "Climate Science", maturityLevel: "validated", description: "IPCC-aligned climate projections with multi-model ensemble validation", dataSourcesCount: 12, validationTests: 48, lastUpdated: "2024-01" },
      { subsystem: "Energy Transition", maturityLevel: "calibrated", description: "IEA-validated renewable deployment curves and cost trajectories", dataSourcesCount: 8, validationTests: 32, lastUpdated: "2024-01" },
      { subsystem: "Economic Modeling", maturityLevel: "calibrated", description: "World Bank GDP and inequality projections with regional calibration", dataSourcesCount: 6, validationTests: 24, lastUpdated: "2024-01" },
      { subsystem: "Agricultural Transformation", maturityLevel: "sandbox", description: "Regenerative agriculture scaling models under development", dataSourcesCount: 4, validationTests: 12, lastUpdated: "2024-01" },
      { subsystem: "Political Coalition", maturityLevel: "sandbox", description: "Voter behavior and coalition formation models", dataSourcesCount: 3, validationTests: 8, lastUpdated: "2024-01" }
    ];
    for (const m of maturity) {
      await storage.createModelMaturity(m);
    }

    // Historical Climate Data (2015-2024)
    const climateHistory = [
      { year: 2015, tempAnomaly: 0.90, co2Ppm: 400.8, seaLevelMm: 68.5, arcticIceExtent: 11.6, renewableShare: 0.234, globalGdpTrillion: 78.3, povertyRate: 0.098, carbonIntensity: 0.45 },
      { year: 2016, tempAnomaly: 1.02, co2Ppm: 404.2, seaLevelMm: 70.1, arcticIceExtent: 11.1, renewableShare: 0.248, globalGdpTrillion: 80.1, povertyRate: 0.094, carbonIntensity: 0.44 },
      { year: 2017, tempAnomaly: 0.92, co2Ppm: 406.6, seaLevelMm: 72.8, arcticIceExtent: 10.6, renewableShare: 0.259, globalGdpTrillion: 82.8, povertyRate: 0.091, carbonIntensity: 0.43 },
      { year: 2018, tempAnomaly: 0.85, co2Ppm: 408.5, seaLevelMm: 74.2, arcticIceExtent: 10.8, renewableShare: 0.269, globalGdpTrillion: 86.2, povertyRate: 0.088, carbonIntensity: 0.42 },
      { year: 2019, tempAnomaly: 0.98, co2Ppm: 411.4, seaLevelMm: 76.5, arcticIceExtent: 10.4, renewableShare: 0.278, globalGdpTrillion: 87.8, povertyRate: 0.085, carbonIntensity: 0.41 },
      { year: 2020, tempAnomaly: 1.02, co2Ppm: 414.2, seaLevelMm: 78.1, arcticIceExtent: 10.2, renewableShare: 0.288, globalGdpTrillion: 84.5, povertyRate: 0.091, carbonIntensity: 0.40 },
      { year: 2021, tempAnomaly: 0.85, co2Ppm: 416.5, seaLevelMm: 79.8, arcticIceExtent: 10.5, renewableShare: 0.295, globalGdpTrillion: 96.5, povertyRate: 0.088, carbonIntensity: 0.39 },
      { year: 2022, tempAnomaly: 0.89, co2Ppm: 421.1, seaLevelMm: 82.3, arcticIceExtent: 10.1, renewableShare: 0.305, globalGdpTrillion: 100.3, povertyRate: 0.085, carbonIntensity: 0.38 },
      { year: 2023, tempAnomaly: 1.17, co2Ppm: 424.0, seaLevelMm: 84.7, arcticIceExtent: 9.9, renewableShare: 0.315, globalGdpTrillion: 104.8, povertyRate: 0.082, carbonIntensity: 0.37 },
      { year: 2024, tempAnomaly: 1.21, co2Ppm: 427.2, seaLevelMm: 87.1, arcticIceExtent: 9.7, renewableShare: 0.325, globalGdpTrillion: 109.1, povertyRate: 0.079, carbonIntensity: 0.36 }
    ];
    for (const c of climateHistory) {
      await storage.createHistoricalClimateData(c);
    }

    console.log("Calibration and validation data seeded successfully");
  }

  // Seed Advanced Modeling data if empty
  const monteCarloData = await storage.getMonteCarloSimulations();
  if (monteCarloData.length === 0) {
    console.log("Seeding advanced modeling data...");
    
    // Monte Carlo Simulations - uncertainty analysis for key projections
    const monteCarloSims = [
      { parameter: "CO2 Sequestration", scale: "statewide", baselineValue: 24750, p10Value: 19800, p25Value: 22000, p50Value: 24750, p75Value: 27500, p90Value: 29700, iterations: 10000, confidenceLevel: 0.95, unit: "tons/year", description: "Annual CO2 sequestration from 275 greenhouses with yield uncertainty" },
      { parameter: "Job Creation", scale: "statewide", baselineValue: 1430, p10Value: 1143, p25Value: 1287, p50Value: 1430, p75Value: 1573, p90Value: 1716, iterations: 10000, confidenceLevel: 0.95, unit: "FTE jobs", description: "Direct employment with economic multiplier effects" },
      { parameter: "Endowment Growth", scale: "statewide", baselineValue: 3200000000, p10Value: 2400000000, p25Value: 2800000000, p50Value: 3200000000, p75Value: 3600000000, p90Value: 4000000000, iterations: 10000, confidenceLevel: 0.95, unit: "USD", description: "15-year endowment projection with market volatility" },
      { parameter: "Student Meals Served", scale: "statewide", baselineValue: 875000, p10Value: 787500, p25Value: 831250, p50Value: 875000, p75Value: 918750, p90Value: 962500, iterations: 10000, confidenceLevel: 0.95, unit: "meals/day", description: "Daily meals with participation rate uncertainty" },
      { parameter: "Greenhouse Yield", scale: "statewide", baselineValue: 4950000, p10Value: 4207500, p25Value: 4578750, p50Value: 4950000, p75Value: 5321250, p90Value: 5692500, iterations: 10000, confidenceLevel: 0.95, unit: "lbs/year", description: "Annual produce yield with seasonal and pest variation" },
      { parameter: "Revenue Generation", scale: "national", baselineValue: 19500000000, p10Value: 15600000000, p25Value: 17550000000, p50Value: 19500000000, p75Value: 21450000000, p90Value: 23400000000, iterations: 10000, confidenceLevel: 0.95, unit: "USD/year", description: "National revenue with food price and demand uncertainty" }
    ];
    for (const mc of monteCarloSims) {
      await storage.createMonteCarloSimulation(mc);
    }

    // Scenario Comparisons - baseline vs optimistic vs conservative
    const scenarios = [
      { metric: "Schools Deployed", category: "Infrastructure", baselineValue: 275, optimisticValue: 325, conservativeValue: 225, unit: "schools", description: "Number of schools with greenhouse installations", keyAssumptions: "Baseline: current plan; Optimistic: accelerated adoption; Conservative: regulatory delays" },
      { metric: "Year 5 Endowment", category: "Financial", baselineValue: 3200000000, optimisticValue: 4100000000, conservativeValue: 2400000000, unit: "USD", description: "Endowment value after 5 years of operation", keyAssumptions: "Baseline: 7% return; Optimistic: 10% return; Conservative: 5% return + higher costs" },
      { metric: "CO2 Reduction", category: "Climate", baselineValue: 24750, optimisticValue: 35000, conservativeValue: 18000, unit: "tons/year", description: "Annual CO2 sequestration and avoided emissions", keyAssumptions: "Baseline: standard yields; Optimistic: enhanced practices; Conservative: weather challenges" },
      { metric: "Jobs Created", category: "Economic", baselineValue: 1430, optimisticValue: 1850, conservativeValue: 1100, unit: "FTE", description: "Full-time equivalent employment", keyAssumptions: "Baseline: standard staffing; Optimistic: expanded services; Conservative: automation" },
      { metric: "Food Miles Saved", category: "Environmental", baselineValue: 12500000, optimisticValue: 18000000, conservativeValue: 9000000, unit: "miles/year", description: "Transportation emissions avoided through local production", keyAssumptions: "Baseline: current sourcing; Optimistic: full local; Conservative: partial implementation" },
      { metric: "Voter Support", category: "Political", baselineValue: 0.62, optimisticValue: 0.72, conservativeValue: 0.52, unit: "approval rate", description: "Expected ballot initiative approval", keyAssumptions: "Baseline: current polling; Optimistic: successful outreach; Conservative: opposition campaign" },
      { metric: "Implementation Speed", category: "Operations", baselineValue: 24, optimisticValue: 18, conservativeValue: 36, unit: "months to full scale", description: "Time to reach 275-school deployment", keyAssumptions: "Baseline: standard timeline; Optimistic: streamlined permits; Conservative: supply chain issues" }
    ];
    for (const s of scenarios) {
      await storage.createScenarioComparison(s);
    }

    // Optimization Parameters - target-seeking analysis
    const optimizations = [
      { targetMetric: "Net Zero Carbon", optimizationType: "minimize", currentValue: 24750, targetValue: 50000, optimalValue: 48500, constraintName: "Budget Cap", constraintValue: 2100000000, unit: "tons CO2/year", feasibility: "achievable", description: "Maximize carbon sequestration within budget constraints" },
      { targetMetric: "ROI Maximization", optimizationType: "maximize", currentValue: 0.12, targetValue: 0.18, optimalValue: 0.165, constraintName: "Risk Tolerance", constraintValue: 0.15, unit: "annual return", feasibility: "achievable", description: "Optimize endowment returns within risk parameters" },
      { targetMetric: "Jobs per Dollar", optimizationType: "maximize", currentValue: 0.68, targetValue: 1.0, optimalValue: 0.85, constraintName: "Wage Floor", constraintValue: 18, unit: "jobs per $1M", feasibility: "partially achievable", description: "Maximize employment while maintaining living wages" },
      { targetMetric: "Student Coverage", optimizationType: "maximize", currentValue: 875000, targetValue: 950000, optimalValue: 920000, constraintName: "Greenhouse Capacity", constraintValue: 275, unit: "students/day", feasibility: "achievable", description: "Maximize student participation within infrastructure" },
      { targetMetric: "Food Waste", optimizationType: "minimize", currentValue: 0.12, targetValue: 0.05, optimalValue: 0.06, constraintName: "Quality Standards", constraintValue: 0.95, unit: "waste fraction", feasibility: "achievable", description: "Minimize food waste while maintaining quality" }
    ];
    for (const o of optimizations) {
      await storage.createOptimizationParam(o);
    }

    // Sensitivity Analysis - parameter impact ranking
    const sensitivities = [
      { inputParameter: "Carbon Price", outputMetric: "Project NPV", baselineInput: 50, perturbationPct: 0.20, outputChange: 0.35, elasticity: 1.75, rank: 1, description: "Carbon pricing has highest impact on project value" },
      { inputParameter: "Endowment Return Rate", outputMetric: "Year 15 Value", baselineInput: 0.07, perturbationPct: 0.20, outputChange: 0.28, elasticity: 1.40, rank: 2, description: "Investment returns significantly affect long-term endowment" },
      { inputParameter: "Food Price Index", outputMetric: "Annual Revenue", baselineInput: 1.0, perturbationPct: 0.20, outputChange: 0.22, elasticity: 1.10, rank: 3, description: "Food prices directly impact greenhouse revenue" },
      { inputParameter: "Labor Costs", outputMetric: "Operating Margin", baselineInput: 18, perturbationPct: 0.20, outputChange: -0.18, elasticity: -0.90, rank: 4, description: "Wage increases reduce margins but support workers" },
      { inputParameter: "Energy Costs", outputMetric: "Operating Costs", baselineInput: 0.12, perturbationPct: 0.20, outputChange: 0.08, elasticity: 0.40, rank: 5, description: "Energy costs have moderate impact on operations" },
      { inputParameter: "Greenhouse Yield", outputMetric: "Meals Served", baselineInput: 18000, perturbationPct: 0.20, outputChange: 0.16, elasticity: 0.80, rank: 6, description: "Yield variation affects food security outcomes" },
      { inputParameter: "Student Participation", outputMetric: "Program Impact", baselineInput: 0.85, perturbationPct: 0.20, outputChange: 0.12, elasticity: 0.60, rank: 7, description: "Participation rates affect educational outcomes" }
    ];
    for (const s of sensitivities) {
      await storage.createSensitivityAnalysis(s);
    }

    console.log("Advanced modeling data seeded successfully");
  }

  // Seed Greenhouse Locations for Interactive Map
  const greenhouseData = await storage.getGreenhouseLocations();
  if (greenhouseData.length === 0) {
    console.log("Seeding greenhouse locations data...");
    
    const locations = [
      { name: "Saint Paul Central", congressionalDistrict: "MN-04", schoolDistrict: "Saint Paul Public Schools", latitude: 44.9537, longitude: -93.0900, greenhouseCount: 3, studentsServed: 12500, annualFoodLbs: 225000, produceTypes: "Lettuce, Tomatoes, Peppers, Herbs, Spinach", sqft: 45000, status: "Operational" },
      { name: "Minneapolis North", congressionalDistrict: "MN-05", schoolDistrict: "Minneapolis Public Schools", latitude: 44.9778, longitude: -93.2650, greenhouseCount: 4, studentsServed: 18200, annualFoodLbs: 324000, produceTypes: "Kale, Cucumbers, Carrots, Beans, Tomatoes", sqft: 60000, status: "Operational" },
      { name: "Mendota Heights Hub", congressionalDistrict: "MN-04", schoolDistrict: "West St. Paul-Mendota Heights", latitude: 44.8833, longitude: -93.1380, greenhouseCount: 2, studentsServed: 5800, annualFoodLbs: 108000, produceTypes: "Microgreens, Lettuce, Herbs, Strawberries", sqft: 30000, status: "Operational" },
      { name: "Duluth Lakeside", congressionalDistrict: "MN-08", schoolDistrict: "Duluth Public Schools", latitude: 46.7867, longitude: -92.1005, greenhouseCount: 3, studentsServed: 9200, annualFoodLbs: 162000, produceTypes: "Cold-hardy greens, Root vegetables, Herbs", sqft: 42000, status: "Operational" },
      { name: "Rochester Medical District", congressionalDistrict: "MN-01", schoolDistrict: "Rochester Public Schools", latitude: 44.0121, longitude: -92.4802, greenhouseCount: 5, studentsServed: 22400, annualFoodLbs: 405000, produceTypes: "Tomatoes, Peppers, Lettuce, Spinach, Herbs, Cucumbers", sqft: 75000, status: "Operational" },
      { name: "Bloomington South", congressionalDistrict: "MN-03", schoolDistrict: "Bloomington Public Schools", latitude: 44.8408, longitude: -93.2983, greenhouseCount: 3, studentsServed: 11800, annualFoodLbs: 216000, produceTypes: "Lettuce, Tomatoes, Peppers, Microgreens", sqft: 48000, status: "Operational" },
      { name: "Eden Prairie West", congressionalDistrict: "MN-03", schoolDistrict: "Eden Prairie Schools", latitude: 44.8547, longitude: -93.4708, greenhouseCount: 2, studentsServed: 8900, annualFoodLbs: 162000, produceTypes: "Greens, Tomatoes, Herbs, Strawberries", sqft: 36000, status: "Operational" },
      { name: "St. Cloud Metro", congressionalDistrict: "MN-06", schoolDistrict: "St. Cloud Area Schools", latitude: 45.5579, longitude: -94.1632, greenhouseCount: 4, studentsServed: 15600, annualFoodLbs: 288000, produceTypes: "Lettuce, Kale, Tomatoes, Peppers, Beans", sqft: 56000, status: "Operational" },
      { name: "Mankato Regional", congressionalDistrict: "MN-01", schoolDistrict: "Mankato Area Public Schools", latitude: 44.1636, longitude: -94.0016, greenhouseCount: 3, studentsServed: 10200, annualFoodLbs: 189000, produceTypes: "Root vegetables, Greens, Tomatoes, Squash", sqft: 42000, status: "Operational" },
      { name: "Moorhead Prairie", congressionalDistrict: "MN-07", schoolDistrict: "Moorhead Area Public Schools", latitude: 46.8739, longitude: -96.7678, greenhouseCount: 2, studentsServed: 6800, annualFoodLbs: 126000, produceTypes: "Hardy greens, Potatoes, Onions, Carrots", sqft: 32000, status: "Construction" },
      { name: "Bemidji Northwoods", congressionalDistrict: "MN-07", schoolDistrict: "Bemidji Area Schools", latitude: 47.4733, longitude: -94.8803, greenhouseCount: 2, studentsServed: 5200, annualFoodLbs: 97000, produceTypes: "Cold-climate greens, Root vegetables, Herbs", sqft: 28000, status: "Construction" },
      { name: "Leech Lake Tribal", congressionalDistrict: "MN-08", schoolDistrict: "Cass Lake-Bena Schools", latitude: 47.3797, longitude: -94.5428, greenhouseCount: 3, studentsServed: 1500, annualFoodLbs: 54000, produceTypes: "Wild rice integration, Greens, Squash, Beans, Traditional foods", sqft: 24000, status: "Planning" },
      { name: "Winona River Valley", congressionalDistrict: "MN-01", schoolDistrict: "Winona Area Public Schools", latitude: 44.0499, longitude: -91.6393, greenhouseCount: 2, studentsServed: 4800, annualFoodLbs: 88000, produceTypes: "Tomatoes, Peppers, Greens, Herbs", sqft: 24000, status: "Planning" },
      { name: "Alexandria Lakes", congressionalDistrict: "MN-07", schoolDistrict: "Alexandria Public Schools", latitude: 45.8852, longitude: -95.3775, greenhouseCount: 2, studentsServed: 4200, annualFoodLbs: 78000, produceTypes: "Lettuce, Spinach, Tomatoes, Cucumbers", sqft: 22000, status: "Planning" },
      { name: "Brainerd Lakes", congressionalDistrict: "MN-08", schoolDistrict: "Brainerd Public Schools", latitude: 46.3583, longitude: -94.2008, greenhouseCount: 3, studentsServed: 7400, annualFoodLbs: 135000, produceTypes: "Hardy greens, Root vegetables, Tomatoes, Peppers", sqft: 38000, status: "Planning" },
      { name: "Woodbury East Metro", congressionalDistrict: "MN-02", schoolDistrict: "South Washington County Schools", latitude: 44.9239, longitude: -92.9594, greenhouseCount: 4, studentsServed: 19800, annualFoodLbs: 360000, produceTypes: "Lettuce, Tomatoes, Peppers, Herbs, Microgreens, Cucumbers", sqft: 64000, status: "Planning" },
      { name: "Shakopee Southwest", congressionalDistrict: "MN-02", schoolDistrict: "Shakopee Public Schools", latitude: 44.7969, longitude: -93.5266, greenhouseCount: 3, studentsServed: 12400, annualFoodLbs: 225000, produceTypes: "Greens, Tomatoes, Peppers, Beans, Squash", sqft: 48000, status: "Planning" },
      { name: "Anoka-Hennepin North", congressionalDistrict: "MN-06", schoolDistrict: "Anoka-Hennepin Schools", latitude: 45.1983, longitude: -93.3822, greenhouseCount: 6, studentsServed: 38500, annualFoodLbs: 702000, produceTypes: "Full variety: Greens, Tomatoes, Peppers, Cucumbers, Herbs, Root vegetables", sqft: 110000, status: "Planning" }
    ];
    
    for (const loc of locations) {
      await storage.createGreenhouseLocation(loc);
    }
    
    console.log("Greenhouse locations data seeded successfully");
  }

  // Seed Global Regeneration Regions for World Map
  const globalRegionsData = await storage.getGlobalRegenerationRegions();
  if (globalRegionsData.length === 0) {
    console.log("Seeding global regeneration regions data...");
    
    const regions = [
      { regionName: "Great Plains USA", countryCode: "US", latitude: 41.5, longitude: -99.8, category: "Regenerative Agriculture", projectName: "Great Plains Hemp & Grain Initiative", description: "Industrial hemp and diversified grain production on restored farmland", greenhouseFacilities: 450, jobsCreated: 285000, annualCarbonSequestrationTons: 45000000, peopleFed: 25000000, acresRestored: 28800000, waterSavedGallons: 850000000000, investmentMillions: 42000, status: "Active", impactHighlight: "Largest regenerative transition in US history" },
      { regionName: "California Central Valley", countryCode: "US", latitude: 36.7, longitude: -119.8, category: "Market Gardens", projectName: "Valley Food Forest Network", description: "Diversified market gardens and agroforestry replacing monoculture", greenhouseFacilities: 380, jobsCreated: 195000, annualCarbonSequestrationTons: 18000000, peopleFed: 18000000, acresRestored: 12500000, waterSavedGallons: 1200000000000, investmentMillions: 28000, status: "Active", impactHighlight: "80% reduction in water usage vs conventional" },
      { regionName: "Amazon Basin", countryCode: "BR", latitude: -3.4, longitude: -62.2, category: "Forest Restoration", projectName: "Amazon Agroforestry Alliance", description: "Reforestation with integrated food production systems", greenhouseFacilities: 120, jobsCreated: 450000, annualCarbonSequestrationTons: 120000000, peopleFed: 8000000, acresRestored: 45000000, waterSavedGallons: 0, investmentMillions: 18000, status: "Active", impactHighlight: "45M acres restored, carbon-negative by 2030" },
      { regionName: "Sahel Region", countryCode: "SN", latitude: 14.5, longitude: -14.5, category: "Desert Restoration", projectName: "Great Green Wall Initiative", description: "Combating desertification through regenerative practices", greenhouseFacilities: 85, jobsCreated: 380000, annualCarbonSequestrationTons: 35000000, peopleFed: 12000000, acresRestored: 30000000, waterSavedGallons: 450000000000, investmentMillions: 12000, status: "Active", impactHighlight: "Reversing desertification across 8,000km" },
      { regionName: "Northern Europe", countryCode: "DE", latitude: 51.2, longitude: 10.5, category: "Indoor Agriculture", projectName: "EU Climate-Smart Greenhouse Network", description: "High-tech greenhouse facilities for year-round production", greenhouseFacilities: 850, jobsCreated: 125000, annualCarbonSequestrationTons: 8500000, peopleFed: 35000000, acresRestored: 2500000, waterSavedGallons: 280000000000, investmentMillions: 35000, status: "Active", impactHighlight: "90% less water, zero pesticides" },
      { regionName: "Indo-Gangetic Plains", countryCode: "IN", latitude: 28.6, longitude: 77.2, category: "Regenerative Agriculture", projectName: "Bharat Regenerative Farming Mission", description: "Transitioning smallholder farms to regenerative practices", greenhouseFacilities: 220, jobsCreated: 2500000, annualCarbonSequestrationTons: 65000000, peopleFed: 180000000, acresRestored: 85000000, waterSavedGallons: 2100000000000, investmentMillions: 45000, status: "Active", impactHighlight: "180M people fed through regenerative systems" },
      { regionName: "East Africa", countryCode: "KE", latitude: -1.3, longitude: 36.8, category: "Food Security", projectName: "East African Food Sovereignty Network", description: "Community-owned greenhouse and permaculture systems", greenhouseFacilities: 165, jobsCreated: 520000, annualCarbonSequestrationTons: 22000000, peopleFed: 28000000, acresRestored: 18000000, waterSavedGallons: 380000000000, investmentMillions: 8500, status: "Active", impactHighlight: "28M food-secure, community ownership" },
      { regionName: "Southeast Asia", countryCode: "VN", latitude: 16.0, longitude: 108.0, category: "Agroforestry", projectName: "Mekong Regenerative Zone", description: "Rice-fish-tree integrated systems replacing monoculture", greenhouseFacilities: 180, jobsCreated: 680000, annualCarbonSequestrationTons: 42000000, peopleFed: 45000000, acresRestored: 25000000, waterSavedGallons: 680000000000, investmentMillions: 15000, status: "Active", impactHighlight: "45M people fed, 42M tons CO2 sequestered" },
      { regionName: "Australia Outback", countryCode: "AU", latitude: -25.3, longitude: 134.5, category: "Silvopasture", projectName: "Regenerative Rangelands Australia", description: "Holistic managed grazing with tree integration", greenhouseFacilities: 45, jobsCreated: 85000, annualCarbonSequestrationTons: 28000000, peopleFed: 5000000, acresRestored: 55000000, waterSavedGallons: 180000000000, investmentMillions: 9500, status: "Planning", impactHighlight: "55M acres restored, drought-resilient" },
      { regionName: "Mediterranean Basin", countryCode: "ES", latitude: 40.4, longitude: -3.7, category: "Drought-Resilient", projectName: "Mediterranean Food Forest Alliance", description: "Drought-resistant perennial food systems", greenhouseFacilities: 280, jobsCreated: 145000, annualCarbonSequestrationTons: 15000000, peopleFed: 22000000, acresRestored: 12000000, waterSavedGallons: 420000000000, investmentMillions: 18500, status: "Active", impactHighlight: "Climate adaptation model for dry regions" },
      { regionName: "Midwest USA", countryCode: "US", latitude: 46.0, longitude: -94.0, category: "School Greenhouses", projectName: "Minnesota Gaia Commons Pilot", description: "School-integrated greenhouse network feeding students", greenhouseFacilities: 275, jobsCreated: 1430, annualCarbonSequestrationTons: 24750, peopleFed: 875000, acresRestored: 0, waterSavedGallons: 2800000000, investmentMillions: 2100, status: "Active", impactHighlight: "Model for nationwide school food security" },
      { regionName: "Southern Africa", countryCode: "ZA", latitude: -33.9, longitude: 18.4, category: "Water Security", projectName: "Cape Water-Food Nexus", description: "Integrated water harvesting and food production", greenhouseFacilities: 95, jobsCreated: 175000, annualCarbonSequestrationTons: 12000000, peopleFed: 15000000, acresRestored: 8500000, waterSavedGallons: 850000000000, investmentMillions: 11000, status: "Planning", impactHighlight: "Water-positive food production" },
      { regionName: "Central America", countryCode: "GT", latitude: 14.6, longitude: -90.5, category: "Indigenous Systems", projectName: "Mesoamerican Milpa Revival", description: "Traditional polyculture with modern enhancements", greenhouseFacilities: 65, jobsCreated: 280000, annualCarbonSequestrationTons: 18000000, peopleFed: 12000000, acresRestored: 9500000, waterSavedGallons: 220000000000, investmentMillions: 6500, status: "Active", impactHighlight: "Indigenous knowledge driving regeneration" },
      { regionName: "Eastern Europe", countryCode: "UA", latitude: 48.4, longitude: 31.2, category: "Soil Restoration", projectName: "Black Earth Revival", description: "Restoring degraded chernozem soils through regenerative practices", greenhouseFacilities: 185, jobsCreated: 320000, annualCarbonSequestrationTons: 38000000, peopleFed: 35000000, acresRestored: 28000000, waterSavedGallons: 480000000000, investmentMillions: 22000, status: "Planning", impactHighlight: "World's most fertile soils restored" },
      { regionName: "China Northeast", countryCode: "CN", latitude: 45.8, longitude: 126.5, category: "Carbon Farming", projectName: "Manchurian Carbon Initiative", description: "Large-scale carbon farming with food production", greenhouseFacilities: 520, jobsCreated: 850000, annualCarbonSequestrationTons: 85000000, peopleFed: 120000000, acresRestored: 45000000, waterSavedGallons: 1500000000000, investmentMillions: 55000, status: "Active", impactHighlight: "85M tons CO2 annually, 120M fed" }
    ];
    
    for (const region of regions) {
      await storage.createGlobalRegenerationRegion(region);
    }
    
    console.log("Global regeneration regions data seeded successfully");
  }
}
