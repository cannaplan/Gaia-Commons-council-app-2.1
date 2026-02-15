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

  // === Global Regeneration Regions (World Map) ===
  app.get(api.globalRegenerationRegions.list.path, async (_req, res) => {
    const data = await storage.getGlobalRegenerationRegions();
    res.json(data);
  });

  // === Mining Alternatives (Twin Metals Replacement) ===
  app.get(api.miningAlternatives.list.path, async (_req, res) => {
    const data = await storage.getMiningAlternatives();
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
      hourlyWage: "$25-32/hr + full benefits",
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
      { phase: "Foundation", quarter: "2027 Q1", milestone: "Board Elections & Corpus Receipt", details: "Board elections; receive $5B corpus from state filings", greenhouseCount: 0, jobsCreated: 50, studentsServed: 0 },
      { phase: "Launch", quarter: "2027 Q2-Q4", milestone: "First 50 Greenhouses", details: "Build first 50 greenhouses; hire staff, train teachers", greenhouseCount: 50, jobsCreated: 260, studentsServed: 159000 },
      { phase: "Launch", quarter: "2027 Q3", milestone: "First Harvest", details: "First harvest; K-12 curriculum pilots with 9 school districts", greenhouseCount: 50, jobsCreated: 260, studentsServed: 159000 },
      { phase: "Scale", quarter: "2028 Q1-Q4", milestone: "Scale to 200 Greenhouses", details: "Expand to 200 greenhouses across all 8 congressional districts", greenhouseCount: 200, jobsCreated: 1040, studentsServed: 636000 },
      { phase: "Full Operation", quarter: "2029 Q4", milestone: "All 1,200 Greenhouses Operational", details: "712,500 students fed (75 lb/yr each); 2,400 FTE jobs created; 9M sqft statewide", greenhouseCount: 1200, jobsCreated: 2400, studentsServed: 712500 }
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
    // Carbon sequestration rates: USDA conservative estimates (tons CO2/acre/year)
    // Hemp: 2.0 (low end of 2-8 range), Market gardens: 0.75 (USDA median cropland),
    // Food forests: 3.0 (conservative agroforestry), Silvopasture: 1.5 (conservative managed grazing + trees)
    const operations = [
      { operationType: "hemp_production", name: "Industrial Hemp Multi-Stream", description: "Fiber, seed, biomass, soil remediation", acresAllocated: usAcres * 0.25, revenuePerAcre: 2850, jobsPer1000Acres: 6.8, avgWage: 48000, carbonSequestration: 2.0, peopleFedPerAcre: 12, totalJobs: Math.floor(usAcres * 0.25 / 1000 * 6.8), totalRevenue: usAcres * 0.25 * 2850, totalCarbonSequestered: usAcres * 0.25 * 2.0 },
      { operationType: "market_garden", name: "Diversified Market Garden", description: "50+ vegetable crops for local markets", acresAllocated: usAcres * 0.20, revenuePerAcre: 8500, jobsPer1000Acres: 12.5, avgWage: 45000, carbonSequestration: 0.75, peopleFedPerAcre: 8, totalJobs: Math.floor(usAcres * 0.20 / 1000 * 12.5), totalRevenue: usAcres * 0.20 * 8500, totalCarbonSequestered: usAcres * 0.20 * 0.75 },
      { operationType: "food_forest", name: "Agroforestry/Food Forest", description: "Perennial nuts, fruits, berries, mushrooms", acresAllocated: usAcres * 0.20, revenuePerAcre: 3200, jobsPer1000Acres: 6.8, avgWage: 42000, carbonSequestration: 3.0, peopleFedPerAcre: 4, totalJobs: Math.floor(usAcres * 0.20 / 1000 * 6.8), totalRevenue: usAcres * 0.20 * 3200, totalCarbonSequestered: usAcres * 0.20 * 3.0 },
      { operationType: "silvopasture", name: "Silvopasture Livestock", description: "Rotational grazing with trees", acresAllocated: usAcres * 0.35, revenuePerAcre: 850, jobsPer1000Acres: 4.2, avgWage: 48000, carbonSequestration: 1.5, peopleFedPerAcre: 1.2, totalJobs: Math.floor(usAcres * 0.35 / 1000 * 4.2), totalRevenue: usAcres * 0.35 * 850, totalCarbonSequestered: usAcres * 0.35 * 1.5 }
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
    // CO2: 52M students × 75 lbs/yr = 3.9B lbs = 1.95M tons produce
    //   1.95M tons × 1,200 mi × 161.8 g/ton-mi = 378,612 metric tons (EPA methodology)
    // Water: 52M students × 75 lbs × 2.6 gal/lb saved (conservative 10x vs traditional) = 10.1B gallons
    await storage.createNationwideFoodSecurity({
      scope: "All 50 states",
      totalStudents: totalStudents,
      facilitiesNeeded: facilitiesNeeded,
      jobsCreated: facilitiesNeeded * 4,
      constructionCost: facilitiesNeeded * 400000,
      annualOperating: facilitiesNeeded * 150000,
      co2ReductionTons: 375000,
      waterSavingsGallons: 10000000000,
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
  
  // Seed K-12 Curriculum if empty (detailed per-grade curriculum)
  const curriculumData = await storage.getK12Curriculum();
  if (curriculumData.length === 0) {
    console.log("Seeding detailed K-12 curriculum...");
    // Kindergarten
    await storage.createK12Curriculum({
      gradeRange: "K",
      title: "Seeds & Sprouts",
      description: "Introduction to plant life through hands-on seed planting. Students observe germination, learn plant parts (roots, stems, leaves), practice daily watering responsibility, and create plant journals with drawings. Culminates in 'Sprout Celebration' where students share their first harvest of microgreens.",
      durationWeeks: 6,
      standards: "NGSS: K-LS1-1 (What plants need), K-ESS2-2 (Weather patterns)"
    });
    await storage.createK12Curriculum({
      gradeRange: "1",
      title: "Garden Helpers",
      description: "Exploring the ecosystem of helpers in our greenhouse: earthworms, beneficial insects, and pollinators. Students create 'bug hotels', learn composting basics, identify helpful vs. harmful insects, and understand the food web. Field trips to observe bees and butterflies in action.",
      durationWeeks: 8,
      standards: "NGSS: 1-LS1-1 (Animal survival), 1-LS3-1 (Inheritance)"
    });
    await storage.createK12Curriculum({
      gradeRange: "2",
      title: "Soil Scientists",
      description: "Deep dive into soil health: texture, composition, and life underground. Students conduct soil tests, compare different growing mediums, learn about decomposition, and create terrariums. Introduction to the nutrient cycle through 'feeding the soil' activities with compost.",
      durationWeeks: 8,
      standards: "NGSS: 2-LS2-1 (Seed dispersal), 2-LS4-1 (Habitats), K-ESS3-1 (Human impact)"
    });
    await storage.createK12Curriculum({
      gradeRange: "3",
      title: "Plant Detectives",
      description: "Scientific observation and data collection. Students maintain growth charts, measure plant height/width weekly, learn to use digital thermometers and moisture meters, create graphs of growth data, and conduct simple experiments on light and water variables.",
      durationWeeks: 10,
      standards: "NGSS: 3-LS1-1 (Life cycles), 3-LS4-3 (Fossils & environment)"
    });
    await storage.createK12Curriculum({
      gradeRange: "4",
      title: "Energy Explorers",
      description: "Understanding photosynthesis and energy flow. Students measure light intensity in different greenhouse zones, track plant growth under varying light conditions, learn about solar energy and greenhouse heating, and create energy flow diagrams from sun to plate.",
      durationWeeks: 10,
      standards: "NGSS: 4-LS1-1 (Energy in organisms), 4-PS3-2 (Energy transfer)"
    });
    await storage.createK12Curriculum({
      gradeRange: "5",
      title: "Food Systems Analysts",
      description: "Introduction to systems thinking through food. Students map the journey of food from seed to table, calculate food miles for imported vs. local produce, analyze grocery store produce origins, and design their ideal local food system.",
      durationWeeks: 12,
      standards: "NGSS: 5-LS2-1 (Matter cycling), 5-ESS3-1 (Human impact on Earth)"
    });
    await storage.createK12Curriculum({
      gradeRange: "6",
      title: "Hydroponics Engineers",
      description: "Building and managing hydroponic systems. Students learn water chemistry (pH, EC, dissolved oxygen), build simple DWC systems, monitor nutrient solutions, troubleshoot plant health issues, and compare hydroponic vs. soil growing efficiency.",
      durationWeeks: 14,
      standards: "NGSS: MS-LS1-6 (Photosynthesis), MS-PS1-2 (Chemical reactions)"
    });
    await storage.createK12Curriculum({
      gradeRange: "7",
      title: "Aquaponics Masters",
      description: "Integration of fish and plant systems. Students understand the nitrogen cycle, manage tilapia populations, monitor water quality for fish and plants, calculate feed ratios, and design balanced aquaponic ecosystems. Introduction to business basics through produce sales.",
      durationWeeks: 16,
      standards: "NGSS: MS-LS2-3 (Ecosystem dynamics), MS-LS2-4 (Biodiversity & ecosystem services)"
    });
    await storage.createK12Curriculum({
      gradeRange: "8",
      title: "Climate Action Scientists",
      description: "Connecting greenhouse operations to climate science. Students calculate the carbon footprint of food production, measure CO2 sequestration in greenhouse operations, model climate scenarios using real data, and develop school-wide sustainability plans.",
      durationWeeks: 16,
      standards: "NGSS: MS-ESS3-3 (Human impact on climate), MS-ESS3-4 (Natural hazards)"
    });
    await storage.createK12Curriculum({
      gradeRange: "9",
      title: "Agricultural Economics",
      description: "Business of sustainable farming. Students develop business plans for greenhouse operations, analyze profit/loss statements, understand supply chains and market dynamics, learn agricultural finance basics, and explore cooperative ownership models.",
      durationWeeks: 18,
      standards: "NGSS: HS-LS2-7 (Human activity & ecosystems), HS-ETS1-1 (Engineering design)"
    });
    await storage.createK12Curriculum({
      gradeRange: "10",
      title: "Food Security & Justice",
      description: "Examining food access and equity. Students research food deserts and their causes, interview community members about food access, analyze USDA data on food insecurity, explore the history of agricultural policy, and design community food access solutions.",
      durationWeeks: 18,
      standards: "NGSS: HS-ESS3-1 (Resource availability), HS-ESS3-3 (Sustainability)"
    });
    await storage.createK12Curriculum({
      gradeRange: "11",
      title: "Food Policy & Advocacy",
      description: "Civic engagement through food policy analysis. Students study Farm Bill history, analyze SNAP and school lunch programs, draft policy proposals, meet with local legislators, and learn advocacy strategies. Mock ballot initiative development and campaign planning.",
      durationWeeks: 18,
      standards: "NGSS: HS-ESS3-1 (Resource availability), HS-ESS3-4 (Sustainability solutions)"
    });
    await storage.createK12Curriculum({
      gradeRange: "12",
      title: "Capstone: Community Food Project",
      description: "Year-long capstone integrating all K-12 learning. Students design, propose, and implement a community food security project. Includes grant writing, community engagement, project management, outcome measurement, and final presentation to school board and community partners. Career pathway exploration in sustainable agriculture.",
      durationWeeks: 36,
      standards: "NGSS: HS-LS2-7, HS-ESS3-4, HS-ETS1-3 (Integrated application)"
    });
  }
  
  // Seed Funding Sources if empty (updated per user specifications - $9.13B total)
  const fundingData = await storage.getFundingSources();
  if (fundingData.length === 0) {
    console.log("Seeding funding sources with corrected rates...");
    await storage.createFundingSource({
      sourceType: "Top 20 Local Corps",
      description: "0.4% contribution from top 20 Minnesota-headquartered corporations",
      targetAmount: 1000000000,
      percentage: 0.4,
      entities: "Target, UnitedHealth, Best Buy, 3M, General Mills, US Bancorp, Xcel Energy, CHS, Land O'Lakes, Hormel, Polaris, Fastenal, Patterson, CH Robinson, Graco, Pentair, Donaldson, Ameriprise, Ecolab, Thrivent"
    });
    await storage.createFundingSource({
      sourceType: "Pro Sports Franchises",
      description: "5% contribution from Minnesota professional sports franchises annual revenue",
      targetAmount: 100000000,
      percentage: 5.0,
      entities: "Minnesota Vikings (NFL), Minnesota Twins (MLB), Minnesota Timberwolves (NBA), Minnesota Lynx (WNBA), Minnesota Wild (NHL), Minnesota United FC (MLS), St. Paul Saints (MiLB)"
    });
    await storage.createFundingSource({
      sourceType: "Local Med/Ins",
      description: "0.4% contribution from Minnesota-based healthcare and insurance companies",
      targetAmount: 600000000,
      percentage: 0.4,
      entities: "UnitedHealth Group, Medtronic, Mayo Clinic, Allina Health, Fairview Health, HealthPartners, Blue Cross Blue Shield of MN, Securian Financial"
    });
    await storage.createFundingSource({
      sourceType: "Out-State Corp/Med/Ins",
      description: "0.45% surcharge on out-of-state corporations, medical, and insurance companies with significant MN presence",
      targetAmount: 3150000000,
      percentage: 0.45,
      entities: "Major out-of-state insurers, banks, retailers, healthcare systems, and ag-conglomerates with >$100M MN revenue"
    });
    await storage.createFundingSource({
      sourceType: "Data/Online Retail",
      description: "2% surcharge on major tech data centers and online retail operations in Minnesota",
      targetAmount: 2100000000,
      percentage: 2.0,
      entities: "Amazon, Microsoft, Google, Meta, Apple, Walmart.com, Target.com, Best Buy online, Wayfair, and major data center operators"
    });
    await storage.createFundingSource({
      sourceType: "Out-of-Country Mining",
      description: "10% surcharge on out-of-country mining corporations seeking to operate in Minnesota",
      targetAmount: 1000000000,
      percentage: 10.0,
      entities: "Antofagasta (Chile/UK - Twin Metals owner), Codelco (Chile), Vale (Brazil), Glencore (Switzerland), Rio Tinto (UK/Australia), BHP (Australia), Anglo American (UK), Teck Resources (Canada)"
    });
    await storage.createFundingSource({
      sourceType: "Federal Government",
      description: "Federal grants and matching funds for food security and education initiatives",
      targetAmount: 500000000,
      percentage: null,
      entities: "USDA Farm to School, USDA Community Food Projects, Dept of Education, EPA Environmental Education, HHS Community Health"
    });
    await storage.createFundingSource({
      sourceType: "Local Billionaires",
      description: "Voluntary philanthropic contributions from Minnesota billionaires",
      targetAmount: 200000000,
      percentage: null,
      entities: "Glen Taylor (Wolves, Lynx, Star Tribune), Whitney MacMillan (Cargill heir), Stanley Hubbard (Hubbard Broadcasting), Marilyn Carlson Nelson (Carlson Companies), Richard Schulze (Best Buy founder)"
    });
  }
  
  // Seed Scale Projections if empty (may have been cleared for updates)
  const scaleData = await storage.getScaleProjections();
  if (scaleData.length === 0) {
    console.log("Seeding scale projections...");
    // State Savings = Students × 180 school days × $1.82/meal (1/3 of $5.45 meal cost = fruits/vegetables)
    // This represents money the state saves when greenhouses provide produce instead of purchasing it
    await storage.createScaleProjection({
      scale: "pilot",
      schools: 6,
      students: 5630,
      greenhouses: 6,
      sqft: 45050,
      capex: 2950000,
      annualRevenue: 1844000,    // 5,630 × 180 days × $1.82/meal = ~$1.84M state savings
      annualOpex: 360000,
      npv5yr: 12847000,
      roiPct: 435,
      endowmentTarget: 5000000,
      endowmentYr15: 15400000,
      jobs: 36,
      co2TonsAnnual: 41,       // Avoided transport: 211 tons produce × 1,200 mi × 161.8 g/ton-mi (EPA)
      mealsPerDay: 15500
    });

    // Statewide: 1,200 school greenhouses (7,500 sqft avg), 9M sqft total, 712,500 students (75% of 950K)
    // State Savings: 712,500 students × 180 days × $1.82/meal = ~$233M/year
    await storage.createScaleProjection({
      scale: "statewide",
      schools: 3100,         // ~3,100 total MN schools (1,200 get greenhouses)
      students: 712500,      // 75% of 950K K-12 enrollment = 712,500 lunch participation
      greenhouses: 1200,     // 1,200 school greenhouses (schools with proper infrastructure/space)
      sqft: 9000000,         // 1,200 × 7,500 sqft avg = 9M sqft total
      capex: 1390000000,     // $1.39B-$2.69B capex range (mid-point ~$1.39B)
      annualRevenue: 233415000,   // State savings: 712,500 × 180 days × $1.82/meal = ~$233M
      annualOpex: 90000000,       // 1,200 greenhouses × $75K/yr avg opex
      npv5yr: 950000000,
      roiPct: 435,
      endowmentTarget: 5000000000,  // $5B @ 4.5% = $225M/yr
      endowmentYr15: 12000000000,
      jobs: 2400,            // 2,400 FTE jobs
      co2TonsAnnual: 5200,   // Avoided transport: 26,700 tons produce × 1,200 mi × 161.8 g/ton-mi (EPA)
      mealsPerDay: 712500    // 712,500 students served daily
    });

    // National: 50M students × 180 days × $1.82/meal = ~$16.4B state savings
    await storage.createScaleProjection({
      scale: "national",
      schools: 130000,
      students: 50000000,
      greenhouses: 130000,
      sqft: 1040000000,
      capex: 48000000000,
      annualRevenue: 16380000000,  // 50M × 180 days × $1.82/meal = ~$16.4B state savings
      annualOpex: 7800000000,
      npv5yr: 740000000000,
      roiPct: 435,
      endowmentTarget: 48000000000,
      endowmentYr15: 740000000000,
      jobs: 250000,
      co2TonsAnnual: 364000,  // Avoided transport: 1.875M tons produce × 1,200 mi × 161.8 g/ton-mi
      mealsPerDay: 50000000
    });

    // Global: 500M students × 180 days × $1.82/meal = ~$163.8B state savings
    await storage.createScaleProjection({
      scale: "global",
      schools: 1000000,
      students: 500000000,
      greenhouses: 1000000,
      sqft: 8000000000,
      capex: 370000000000,
      annualRevenue: 163800000000,  // 500M × 180 days × $1.82/meal = ~$163.8B state savings
      annualOpex: 60000000000,
      npv5yr: 5700000000000,
      roiPct: 435,
      endowmentTarget: 370000000000,
      endowmentYr15: 5700000000000,
      jobs: 2000000,
      co2TonsAnnual: 3640000,  // Avoided transport: 18.75M tons produce × 1,200 mi × 161.8 g/ton-mi
      mealsPerDay: 500000000
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

    // Seed Endowment - v5.0 Updated ($5B statewide target @ 4.5% = $225M)
    await storage.updateEndowmentStats({
      size: "5.0B",
      annual: "225M",
      greenhouses: 1200
    });

    // Seed Financials (v4.1 from Python - 6 schools)
    await storage.updateFinancialMetrics({
      schoolCount: 6,
      initialInvestment: 2950000,
      annualOpex: 360000,
      yieldPerSchool: 120000,
      foodPricePerLb: 1.82,             // $1.82/meal state savings (1/3 of $5.45 meal cost)
      discountRate: 0.08,
      npv10yr: 12847000,
      roi10yrPct: 435,
      investmentPerSchool: 491667,
      opexPerSchool: 60000,
      annualRevenuePerSchool: 307000,   // Per school state savings: ~938 students × 180 days × $1.82/meal
      totalAnnualYield: 720000,
      totalAnnualRevenue: 1844000,     // Total state savings: 5,630 × 180 days × $1.82/meal = ~$1.84M
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
      co2TonsSequestered: 13
    });
    
    const mendotaCluster = await storage.createSchoolCluster({
      name: "Mendota Heights",
      region: "Mendota Heights, MN",
      totalStudents: 2837,
      totalSqft: 22700,
      greenhouses: 3,
      yr5Students: 3262,
      co2TonsSequestered: 13
    });

    // Seed Individual Schools (from Python ST_PAUL_CLUSTER and MENDOTA_CLUSTER)
    await storage.createSchool({ clusterId: stPaulCluster.id, name: "Saint Paul Academy (SPA)", enrollment: 952, grades: "PK-12", sqftTarget: 7600 });
    await storage.createSchool({ clusterId: stPaulCluster.id, name: "Highland Park High School", enrollment: 1456, grades: "9-12", sqftTarget: 11650 });
    await storage.createSchool({ clusterId: stPaulCluster.id, name: "Groveland Elementary", enrollment: 385, grades: "K-5", sqftTarget: 3100 });
    await storage.createSchool({ clusterId: mendotaCluster.id, name: "Saint Thomas Academy (STA)", enrollment: 588, grades: "6-12", sqftTarget: 4700 });
    await storage.createSchool({ clusterId: mendotaCluster.id, name: "Visitation School", enrollment: 601, grades: "PK-12", sqftTarget: 4800 });
    await storage.createSchool({ clusterId: mendotaCluster.id, name: "Two Rivers High School", enrollment: 1648, grades: "9-12", sqftTarget: 13200 });

    // Seed Environmental Impact by Scale
    // CO2: Avoided transport emissions (EPA 161.8 g/ton-mile × 1,200 avg miles)
    // Water: 10x conservative savings vs traditional farming (Arizona State research)
    // Food miles: Truck-miles eliminated (produce tons / 20-ton truck × 1,200 miles)
    await storage.createEnvironmentalImpact({
      scale: "pilot",
      co2SequesteredTons: 41,           // 211 tons produce × 1,200 mi avoided transport
      waterSavedGallons: 3500000,       // 5,630 students × 75 lbs × 2.6 gal/lb saved (10x savings)
      landPreservedAcres: 50,
      foodMilesReduced: 12000,          // 211 tons / 20 per truck × 1,200 mi = 12,660 truck-miles
      renewableEnergyPct: 85,
      wasteReducedTons: 120
    });

    await storage.createEnvironmentalImpact({
      scale: "statewide",
      co2SequesteredTons: 5200,         // 26,700 tons × 1,200 mi × 161.8 g/ton-mi = 5,184 metric tons
      waterSavedGallons: 450000000,     // 712,500 students × 75 lbs × 2.6 gal/lb saved (conservative 10x)
      landPreservedAcres: 2300,
      foodMilesReduced: 1600000,        // 26,700 tons / 20 × 1,200 = 1.6M truck-miles
      renewableEnergyPct: 85,
      wasteReducedTons: 5500
    });

    await storage.createEnvironmentalImpact({
      scale: "national",
      co2SequesteredTons: 364000,       // 1.875M tons × 1,200 mi × 161.8 g/ton-mi
      waterSavedGallons: 30000000000,   // 50M students × 75 lbs × 2.6 gal/lb (conservative 10x)
      landPreservedAcres: 1100000,
      foodMilesReduced: 112000000,      // 1.875M tons / 20 × 1,200 = 112M truck-miles
      renewableEnergyPct: 85,
      wasteReducedTons: 2600000
    });

    await storage.createEnvironmentalImpact({
      scale: "global",
      co2SequesteredTons: 3640000,      // 18.75M tons × 1,200 mi × 161.8 g/ton-mi
      waterSavedGallons: 250000000000,  // 500M students, conservative with scale inefficiencies
      landPreservedAcres: 8500000,
      foodMilesReduced: 1125000000,     // 18.75M tons / 20 × 1,200 = 1.125B truck-miles
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

    // Seed Ballot Slide Deck (15 slides matching UI in BallotPresentation.tsx)
    const slides = [
      { n: 1, title: "One Vote, Forever Fed", text: "712,500 Students | $225M/Year | Forever - Minnesota 2026 Ballot Initiative" },
      { n: 2, title: "The Problem", text: "1 in 6 MN children face food insecurity | 87% of school produce from outside MN | $2.8B spent on out-of-state produce" },
      { n: 3, title: "Our Solution", text: "1,200 Greenhouses at schools with proper infrastructure + Orchards + Exotic Trees + $5B Perpetual Endowment" },
      { n: 4, title: "What We'll Grow", text: "100+ Varieties: Salad Greens, Vegetables, Berries, Herbs & Specialty | 53.4M lb/year" },
      { n: 5, title: "Exotic Greenhouse Trees", text: "Year-Round Tropical Fruits: Meyer Lemons, Key Limes, Dwarf Bananas, Papaya, Avocado, Dragon Fruit" },
      { n: 6, title: "Outdoor Orchards", text: "Traditional Cold-Hardy Trees: Apple, Pear, Cherry, Peach + Nut Trees + Berry Bushes" },
      { n: 7, title: "The Endowment Model", text: "$5B Initial Endowment | 4.5% Annual Draw | $225M/Year Forever - Principal never touched" },
      { n: 8, title: "Jobs Created", text: "2,400 Permanent MN Jobs: 1,440 Greenhouse Staff + 240 Educators + 360 Distribution + 360 School Staff | 100% Union Labor $32-35/hr" },
      { n: 9, title: "vs. Foreign Mining", text: "Twin Metals (100% Chilean-owned, 50% profits abroad, temporary jobs) vs Gaia (100% MN-owned, 2,400 permanent jobs, forever)" },
      { n: 10, title: "330 School Districts", text: "712,500 Students | 330 Districts | 1,200 Greenhouses | Priority: Tribal food sovereignty" },
      { n: 11, title: "Land Conservation", text: "10% of Revenue: $22.5M Annual | $1.125B over 50 Years | 375K+ Acres Protected Forever" },
      { n: 12, title: "Environmental Impact", text: "450M Gallons Water Saved | 5,200 Metric Tons CO2 Emissions Avoided | 1.6M Truck-Miles Eliminated | Zero Pesticides" },
      { n: 13, title: "Educational Benefits", text: "STEM Integration + Agriculture + Career Pathways | K-12 participation from seed planting to internships" },
      { n: 14, title: "Scaling Beyond Minnesota", text: "Pilot (6 Schools) → Statewide (1,200 Greenhouses) → National (130K) → Global (1M Schools, 350M children, 6.5M jobs)" },
      { n: 15, title: "Vote YES in 2026", text: "330 Districts | 712,500 Students | Forever - One Vote to Feed Minnesota Forever" }
    ];
    for (const s of slides) {
      await storage.createSlide({ slideNumber: s.n, title: s.title, content: s.text });
    }

    // Seed Timeline - v4.1 Deliverables
    await storage.createTimelineEvent({ year: "2026 Q1", event: "St. Paul/Mendota 6-School Pilots Live" });
    await storage.createTimelineEvent({ year: "2026 Q2", event: "Principal Meetings Complete (Jan 20)" });
    await storage.createTimelineEvent({ year: "2026 Q4", event: "Ballot Signature Drive Begins" });
    await storage.createTimelineEvent({ year: "2027", event: "Statewide Expansion Planning" });
    await storage.createTimelineEvent({ year: "2028", event: "Constitutional Amendment Vote - $5B Funded" });
    await storage.createTimelineEvent({ year: "2029", event: "1,200 Greenhouses Deployed Statewide" });
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
      { year: 2028, quarter: 4, schoolCount: 350, totalRevenue: 52250000, totalOpex: 26250000, totalYieldLbs: 14940000, endowmentValue: 1500000000, studentsServed: 199170 },
      { year: 2029, quarter: 4, schoolCount: 1200, totalRevenue: 186900000, totalOpex: 90000000, totalYieldLbs: 53400000, endowmentValue: 5000000000, studentsServed: 712500 },
    ];
    for (const h of historicalData) {
      await storage.createHistoricalFinancial(h);
    }

    // Seed 50-Year Endowment Projections
    // Starting 2028 with $5B corpus @ 4.5% draw, 7% avg returns = 2.5% net growth per year
    // Formula: corpus = corpus × (1 + 0.07 - 0.045) = corpus × 1.025 annually
    const endowmentYears = [
      { year: 2028, corpus: 5000000000, annualDraw: 225000000, inflationAdjusted: 225000000 },
      { year: 2033, corpus: 5657000000, annualDraw: 255000000, inflationAdjusted: 210000000 },
      { year: 2038, corpus: 6400000000, annualDraw: 288000000, inflationAdjusted: 195000000 },
      { year: 2048, corpus: 8193000000, annualDraw: 369000000, inflationAdjusted: 185000000 },
      { year: 2058, corpus: 10491000000, annualDraw: 472000000, inflationAdjusted: 175000000 },
      { year: 2068, corpus: 13435000000, annualDraw: 605000000, inflationAdjusted: 170000000 },
      { year: 2078, corpus: 17203000000, annualDraw: 774000000, inflationAdjusted: 165000000 }
    ];
    for (const e of endowmentYears) {
      await storage.createEndowmentProjection(e);
    }

    // Seed Expanded Jobs Data (FTE + Internships + Volunteers + Construction from ballot deck)
    // Wages match or exceed Twin Metals mining wages (~$25-30/hr)
    // Construction jobs calculated at ~1 job per $100K construction spend
    await storage.createExpandedJobs({
      scale: "pilot",
      fteJobs: 36,
      studentInternships: 144,
      volunteerPositions: 66,
      hourlyWage: 28,
      directWages: 2100000,
      economicMultiplier: 2.4,
      // Pilot: 6 schools × 15K sqft = 90K sqft @ $85/sqft = $7.65M
      constructionJobs: 76,
      constructionGeneral: 30,
      constructionElectricians: 15,
      constructionPlumbers: 12,
      constructionHvac: 12,
      constructionSpecialists: 7,
      constructionWage: 35,
      constructionDurationYears: "1-2 years",
      constructionSpending: 7650000
    });
    await storage.createExpandedJobs({
      scale: "statewide",
      fteJobs: 2400,  // 2,400 FTE permanent jobs
      studentInternships: 9600,
      volunteerPositions: 4400,
      hourlyWage: 28,
      directWages: 140160000,  // 2400 jobs × $58,400 avg salary
      economicMultiplier: 2.4,
      // Statewide: 1,200 greenhouses × 7,500 sqft = 9M sqft @ $155/sqft avg = $1.39B
      constructionJobs: 13900,
      constructionGeneral: 5560,
      constructionElectricians: 2780,
      constructionPlumbers: 2085,
      constructionHvac: 2085,
      constructionSpecialists: 1390,
      constructionWage: 35,
      constructionDurationYears: "4 years (2026-2029)",
      constructionSpending: 1390000000
    });
    await storage.createExpandedJobs({
      scale: "national",
      fteJobs: 67500,
      studentInternships: 312000,
      volunteerPositions: 143000,
      hourlyWage: 26,
      directWages: 3650000000,
      economicMultiplier: 2.4,
      // National: 130K schools × 12K sqft avg = 1.56B sqft @ $75/sqft = $117B (economies of scale)
      constructionJobs: 1170000,
      constructionGeneral: 468000,
      constructionElectricians: 234000,
      constructionPlumbers: 175500,
      constructionHvac: 175500,
      constructionSpecialists: 117000,
      constructionWage: 32,
      constructionDurationYears: "10-15 years (rolling)",
      constructionSpending: 117000000000
    });
    await storage.createExpandedJobs({
      scale: "global",
      fteJobs: 520000,
      studentInternships: 2400000,
      volunteerPositions: 1100000,
      hourlyWage: 22,
      directWages: 23800000000,
      economicMultiplier: 2.2,
      // Global: 1M schools × 10K sqft avg = 10B sqft @ $65/sqft = $650B (global economies of scale)
      constructionJobs: 6500000,
      constructionGeneral: 2600000,
      constructionElectricians: 1300000,
      constructionPlumbers: 975000,
      constructionHvac: 975000,
      constructionSpecialists: 650000,
      constructionWage: 28,
      constructionDurationYears: "20-30 years (phased)",
      constructionSpending: 650000000000
    });

    // Seed K-12 NGSS Curriculum (from ballot deck slide 9) - Expanded with detailed units
    // Kindergarten
    await storage.createK12Curriculum({
      gradeRange: "K",
      title: "Seeds & Sprouts",
      description: "Introduction to plant life through hands-on seed planting. Students observe germination, learn plant parts (roots, stems, leaves), practice daily watering responsibility, and create plant journals with drawings. Culminates in 'Sprout Celebration' where students share their first harvest of microgreens.",
      durationWeeks: 6,
      standards: "NGSS: K-LS1-1 (What plants need), K-ESS2-2 (Weather patterns)"
    });
    await storage.createK12Curriculum({
      gradeRange: "1",
      title: "Garden Helpers",
      description: "Exploring the ecosystem of helpers in our greenhouse: earthworms, beneficial insects, and pollinators. Students create 'bug hotels', learn composting basics, identify helpful vs. harmful insects, and understand the food web. Field trips to observe bees and butterflies in action.",
      durationWeeks: 8,
      standards: "NGSS: 1-LS1-1 (Animal survival), 1-LS3-1 (Inheritance)"
    });
    await storage.createK12Curriculum({
      gradeRange: "2",
      title: "Soil Scientists",
      description: "Deep dive into soil health: texture, composition, and life underground. Students conduct soil tests, compare different growing mediums, learn about decomposition, and create terrariums. Introduction to the nutrient cycle through 'feeding the soil' activities with compost.",
      durationWeeks: 8,
      standards: "NGSS: 2-LS2-1 (Seed dispersal), 2-LS4-1 (Habitats), K-ESS3-1 (Human impact)"
    });
    // Elementary (3-5)
    await storage.createK12Curriculum({
      gradeRange: "3",
      title: "Plant Detectives",
      description: "Scientific observation and data collection. Students maintain growth charts, measure plant height/width weekly, learn to use digital thermometers and moisture meters, create graphs of growth data, and conduct simple experiments on light and water variables.",
      durationWeeks: 10,
      standards: "NGSS: 3-LS1-1 (Life cycles), 3-LS4-3 (Fossils & environment)"
    });
    await storage.createK12Curriculum({
      gradeRange: "4",
      title: "Energy Flow",
      description: "Understanding photosynthesis and the carbon cycle. Students trace energy from sun to plant to plate, learn about chlorophyll through leaf chromatography, explore how plants 'breathe' CO2, and calculate carbon sequestration of classroom plants. Introduction to renewable energy concepts.",
      durationWeeks: 12,
      standards: "NGSS: 4-LS1-1 (Plant structures), 4-PS3-2 (Energy transfer), 4-ESS3-1 (Energy resources)"
    });
    await storage.createK12Curriculum({
      gradeRange: "5",
      title: "Ecosystem Engineers",
      description: "Designing balanced ecosystems. Students create and manage mini aquaponic systems, understand nitrogen cycling, learn about symbiotic relationships, troubleshoot ecosystem problems, and present solutions. Capstone: Design a self-sustaining closed ecosystem.",
      durationWeeks: 14,
      standards: "NGSS: 5-LS2-1 (Ecosystem interactions), 5-PS3-1 (Energy in food), 5-ESS3-1 (Earth resources)"
    });
    // Middle School (6-8)
    await storage.createK12Curriculum({
      gradeRange: "6",
      title: "Hydroponic Systems",
      description: "Engineering hydroponic growing systems. Students learn water chemistry (pH, EC, nutrients), design and build NFT and DWC systems, calculate nutrient solutions, monitor water quality, and optimize growing conditions. Focus on STEM integration with math applications.",
      durationWeeks: 14,
      standards: "NGSS: MS-LS1-6 (Photosynthesis), MS-PS1-2 (Chemical reactions), MS-ETS1-4 (Design process)"
    });
    await storage.createK12Curriculum({
      gradeRange: "7",
      title: "Food Systems & Justice",
      description: "Examining food access, food deserts, and community solutions. Students map local food access, interview community members, analyze nutritional disparities, research food policy history, and design community food security proposals. Guest speakers from local food banks and urban farms.",
      durationWeeks: 12,
      standards: "NGSS: MS-LS2-1 (Resource competition), MS-LS2-3 (Ecosystem cycling), MS-ESS3-3 (Human impacts)"
    });
    await storage.createK12Curriculum({
      gradeRange: "8",
      title: "Regenerative Agriculture",
      description: "Soil health and sustainable farming practices. Students learn no-till methods, cover cropping, crop rotation, companion planting, and integrated pest management. Hands-on soil biology analysis using microscopes. Compare conventional vs. regenerative farming outcomes.",
      durationWeeks: 16,
      standards: "NGSS: MS-LS2-4 (Ecosystem disruption), MS-ESS3-4 (Human solutions), MS-ETS1-1 (Engineering criteria)"
    });
    // High School (9-12)
    await storage.createK12Curriculum({
      gradeRange: "9",
      title: "Climate Science & Agriculture",
      description: "Understanding climate change impacts on food systems. Students analyze climate data, model greenhouse gas emissions, study agricultural adaptation strategies, and examine the carbon footprint of food. Lab work includes soil carbon measurement and emissions calculations.",
      durationWeeks: 16,
      standards: "NGSS: HS-LS2-7 (Carbon cycling), HS-ESS2-4 (Energy balance), HS-ESS3-5 (Human impacts)"
    });
    await storage.createK12Curriculum({
      gradeRange: "10",
      title: "Agricultural Economics",
      description: "Business of sustainable food production. Students develop greenhouse business plans, analyze cost-benefit of different crops, learn supply chain management, calculate break-even points, and study cooperative economics. Partnerships with local farmers markets for real-world sales experience.",
      durationWeeks: 14,
      standards: "NGSS: HS-ETS1-3 (Design optimization), HS-ESS3-2 (Resource management)"
    });
    await storage.createK12Curriculum({
      gradeRange: "11",
      title: "Food Policy & Advocacy",
      description: "Civic engagement through food policy analysis. Students study Farm Bill history, analyze SNAP and school lunch programs, draft policy proposals, meet with local legislators, and learn advocacy strategies. Mock ballot initiative development and campaign planning.",
      durationWeeks: 18,
      standards: "NGSS: HS-ESS3-1 (Resource availability), HS-ESS3-4 (Sustainability solutions)"
    });
    await storage.createK12Curriculum({
      gradeRange: "12",
      title: "Capstone: Community Food Project",
      description: "Year-long capstone integrating all K-12 learning. Students design, propose, and implement a community food security project. Includes grant writing, community engagement, project management, outcome measurement, and final presentation to school board and community partners. Career pathway exploration in sustainable agriculture.",
      durationWeeks: 36,
      standards: "NGSS: HS-LS2-7, HS-ESS3-4, HS-ETS1-3 (Integrated application)"
    });

    console.log("K-12 curriculum seeded successfully");
  }

  // Seed Coalition Partners (independent block)
  const coalitionPartnersData = await storage.getCoalitionPartners();
  if (coalitionPartnersData.length === 0) {
    console.log("Seeding coalition partners...");
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
    // Tier 3 - Business (Top 10 Minnesota-Headquartered Corporations + Key Partners)
    await storage.createCoalitionPartner({ tier: 3, name: "UnitedHealth Group", category: "Healthcare", memberCount: null, focus: "Employee wellness, nutrition programs" });
    await storage.createCoalitionPartner({ tier: 3, name: "Target Corporation", category: "Retail", memberCount: null, focus: "Corporate sponsorship, supply chain" });
    await storage.createCoalitionPartner({ tier: 3, name: "Cargill", category: "Agriculture", memberCount: null, focus: "Ag technology, distribution" });
    await storage.createCoalitionPartner({ tier: 3, name: "Best Buy", category: "Technology", memberCount: null, focus: "Greenhouse automation, tech systems" });
    await storage.createCoalitionPartner({ tier: 3, name: "U.S. Bancorp", category: "Finance", memberCount: null, focus: "Endowment management, financing" });
    await storage.createCoalitionPartner({ tier: 3, name: "3M Company", category: "Manufacturing", memberCount: null, focus: "Sustainability tech, materials" });
    await storage.createCoalitionPartner({ tier: 3, name: "General Mills", category: "Food", memberCount: null, focus: "Food production, nutrition education" });
    await storage.createCoalitionPartner({ tier: 3, name: "C.H. Robinson", category: "Logistics", memberCount: null, focus: "Distribution, supply chain logistics" });
    await storage.createCoalitionPartner({ tier: 3, name: "Ameriprise Financial", category: "Finance", memberCount: null, focus: "Investment partnerships, funding" });
    await storage.createCoalitionPartner({ tier: 3, name: "Ecolab", category: "Environmental", memberCount: null, focus: "Water systems, hygiene solutions" });
    await storage.createCoalitionPartner({ tier: 3, name: "CHS Inc.", category: "Agriculture", memberCount: null, focus: "Agricultural cooperative, grain systems" });
    await storage.createCoalitionPartner({ tier: 3, name: "Minneapolis Chamber of Commerce", category: "Business", memberCount: 1200, focus: "Economic development" });
    console.log("Coalition partners seeded successfully");
  }

  // Seed Transparency Features (independent block)
  const transparencyData = await storage.getTransparencyFeatures();
  if (transparencyData.length === 0) {
    console.log("Seeding transparency features...");
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
    console.log("Transparency features seeded successfully");
  }

  // Seed Accountability Mechanisms (independent block)
  const accountabilityData = await storage.getAccountabilityMechanisms();
  if (accountabilityData.length === 0) {
    console.log("Seeding accountability mechanisms...");
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
    console.log("Accountability mechanisms seeded successfully");
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
      { parameter: "CO2 Avoided", scale: "statewide", baselineValue: 5200, p10Value: 4160, p25Value: 4680, p50Value: 5200, p75Value: 5720, p90Value: 6240, iterations: 10000, confidenceLevel: 0.95, unit: "metric tons/year", description: "Annual CO2 emissions avoided from eliminated food transport (EPA 161.8 g/ton-mile)" },
      { parameter: "Job Creation", scale: "statewide", baselineValue: 2400, p10Value: 2160, p25Value: 2280, p50Value: 2400, p75Value: 2520, p90Value: 2640, iterations: 10000, confidenceLevel: 0.95, unit: "FTE jobs", description: "Direct employment with economic multiplier effects" },
      { parameter: "Endowment Growth", scale: "statewide", baselineValue: 5000000000, p10Value: 4000000000, p25Value: 4500000000, p50Value: 5000000000, p75Value: 5500000000, p90Value: 6000000000, iterations: 10000, confidenceLevel: 0.95, unit: "USD", description: "15-year endowment projection with market volatility" },
      { parameter: "Student Meals Served", scale: "statewide", baselineValue: 712500, p10Value: 641250, p25Value: 676875, p50Value: 712500, p75Value: 748125, p90Value: 783750, iterations: 10000, confidenceLevel: 0.95, unit: "meals/day", description: "Daily meals with participation rate uncertainty" },
      { parameter: "Greenhouse Yield", scale: "statewide", baselineValue: 53400000, p10Value: 45390000, p25Value: 49395000, p50Value: 53400000, p75Value: 57405000, p90Value: 61410000, iterations: 10000, confidenceLevel: 0.95, unit: "lbs/year", description: "Annual produce yield (712,500 students × 75 lb/yr)" },
      { parameter: "Revenue Generation", scale: "national", baselineValue: 19500000000, p10Value: 15600000000, p25Value: 17550000000, p50Value: 19500000000, p75Value: 21450000000, p90Value: 23400000000, iterations: 10000, confidenceLevel: 0.95, unit: "USD/year", description: "National revenue with food price and demand uncertainty" }
    ];
    for (const mc of monteCarloSims) {
      await storage.createMonteCarloSimulation(mc);
    }

    // Scenario Comparisons - baseline vs optimistic vs conservative
    const scenarios = [
      { metric: "Greenhouses Deployed", category: "Infrastructure", baselineValue: 1200, optimisticValue: 1320, conservativeValue: 1080, unit: "greenhouses", description: "Number of school greenhouses (7,500 sqft avg) at schools with proper infrastructure and space", keyAssumptions: "Baseline: current plan; Optimistic: accelerated adoption; Conservative: regulatory delays" },
      { metric: "Year 5 Endowment", category: "Financial", baselineValue: 5000000000, optimisticValue: 6500000000, conservativeValue: 4000000000, unit: "USD", description: "Endowment value after 5 years of operation", keyAssumptions: "Baseline: 7% return; Optimistic: 10% return; Conservative: 5% return + higher costs" },
      { metric: "CO2 Avoided", category: "Climate", baselineValue: 5200, optimisticValue: 7000, conservativeValue: 4000, unit: "metric tons/year", description: "Annual CO2 emissions avoided from eliminated food transport (EPA methodology)", keyAssumptions: "Baseline: 1,200 mi avg transport; Optimistic: longer distances replaced; Conservative: partial local sourcing" },
      { metric: "Jobs Created", category: "Economic", baselineValue: 2400, optimisticValue: 2800, conservativeValue: 2000, unit: "FTE", description: "Full-time equivalent employment", keyAssumptions: "Baseline: standard staffing; Optimistic: expanded services; Conservative: automation" },
      { metric: "Truck-Miles Eliminated", category: "Environmental", baselineValue: 1600000, optimisticValue: 2000000, conservativeValue: 1200000, unit: "truck-miles/year", description: "Truck transport miles eliminated through local greenhouse production", keyAssumptions: "Baseline: 1,200 mi avg; Optimistic: replacing longer-distance imports; Conservative: partial implementation" },
      { metric: "Voter Support", category: "Political", baselineValue: 0.62, optimisticValue: 0.72, conservativeValue: 0.52, unit: "approval rate", description: "Expected ballot initiative approval", keyAssumptions: "Baseline: current polling; Optimistic: successful outreach; Conservative: opposition campaign" },
      { metric: "Implementation Speed", category: "Operations", baselineValue: 48, optimisticValue: 36, conservativeValue: 60, unit: "months to full scale", description: "Time to reach 1,200-greenhouse deployment (4 years)", keyAssumptions: "Baseline: standard timeline; Optimistic: streamlined permits; Conservative: supply chain issues" }
    ];
    for (const s of scenarios) {
      await storage.createScenarioComparison(s);
    }

    // Optimization Parameters - target-seeking analysis
    const optimizations = [
      { targetMetric: "Avoided Carbon Emissions", optimizationType: "maximize", currentValue: 5200, targetValue: 10000, optimalValue: 7500, constraintName: "Budget Cap", constraintValue: 5000000000, unit: "metric tons CO2/year", feasibility: "achievable", description: "Maximize avoided transport emissions by replacing imported produce with local greenhouse production" },
      { targetMetric: "ROI Maximization", optimizationType: "maximize", currentValue: 0.12, targetValue: 0.18, optimalValue: 0.165, constraintName: "Risk Tolerance", constraintValue: 0.15, unit: "annual return", feasibility: "achievable", description: "Optimize endowment returns within risk parameters" },
      { targetMetric: "Jobs per Dollar", optimizationType: "maximize", currentValue: 0.68, targetValue: 1.0, optimalValue: 0.85, constraintName: "Wage Floor", constraintValue: 18, unit: "jobs per $1M", feasibility: "partially achievable", description: "Maximize employment while maintaining living wages" },
      { targetMetric: "Student Coverage", optimizationType: "maximize", currentValue: 712500, targetValue: 800000, optimalValue: 750000, constraintName: "Greenhouse Capacity", constraintValue: 1200, unit: "students/day", feasibility: "achievable", description: "Maximize student participation within infrastructure" },
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
      { regionName: "Southeast Asia", countryCode: "VN", latitude: 16.0, longitude: 108.0, category: "Agroforestry", projectName: "Mekong Regenerative Zone", description: "Rice-fish-tree integrated systems replacing monoculture", greenhouseFacilities: 180, jobsCreated: 680000, annualCarbonSequestrationTons: 42000000, peopleFed: 45000000, acresRestored: 25000000, waterSavedGallons: 680000000000, investmentMillions: 15000, status: "Active", impactHighlight: "45M people fed, 42M tons CO2 captured" },
      { regionName: "Australia Outback", countryCode: "AU", latitude: -25.3, longitude: 134.5, category: "Silvopasture", projectName: "Regenerative Rangelands Australia", description: "Holistic managed grazing with tree integration", greenhouseFacilities: 45, jobsCreated: 85000, annualCarbonSequestrationTons: 28000000, peopleFed: 5000000, acresRestored: 55000000, waterSavedGallons: 180000000000, investmentMillions: 9500, status: "Planning", impactHighlight: "55M acres restored, drought-resilient" },
      { regionName: "Mediterranean Basin", countryCode: "ES", latitude: 40.4, longitude: -3.7, category: "Drought-Resilient", projectName: "Mediterranean Food Forest Alliance", description: "Drought-resistant perennial food systems", greenhouseFacilities: 280, jobsCreated: 145000, annualCarbonSequestrationTons: 15000000, peopleFed: 22000000, acresRestored: 12000000, waterSavedGallons: 420000000000, investmentMillions: 18500, status: "Active", impactHighlight: "Climate adaptation model for dry regions" },
      { regionName: "Midwest USA", countryCode: "US", latitude: 46.0, longitude: -94.0, category: "School Greenhouses", projectName: "Minnesota Gaia Commons", description: "1,200 school greenhouses (7,500 sqft avg, 9M sqft total) feeding 712,500 students 75 lb/yr", greenhouseFacilities: 1200, jobsCreated: 2400, annualCarbonSequestrationTons: 5200, peopleFed: 712500, acresRestored: 0, waterSavedGallons: 450000000, investmentMillions: 5000, status: "Active", impactHighlight: "Anti-Boundary Waters mining alternative" },
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

  // Seed Mining Alternative data (Twin Metals Replacement) if empty
  const miningAltData = await storage.getMiningAlternatives();
  if (miningAltData.length === 0) {
    console.log("Seeding mining alternatives data...");
    // Financial constants: $85/sqft construction, $12/sqft/year ops, 40 lbs/sqft/year production, $3.50/lb wholesale
    // 60% for schools, 40% excess for stores/markets
    const miningAlternatives = [
      {
        community: "Ely",
        county: "St. Louis",
        latitude: 47.9033,
        longitude: -91.8672,
        population: 3460,
        miningJobsPromised: 600,  // Updated: Twin Metals total ~1,500 jobs
        miningAvgSalary: 65000,
        miningDuration: "20-25 years (then depleted)",
        greenhouseComplexSqft: 225000,  // Halved from 450K
        greenhouseJobs: 270,
        greenhouseAvgSalary: 52000,
        schoolGreenhouseJobs: 25,
        totalGreenhouseJobs: 295,
        annualEndowmentFunding: 15340000,
        jobDuration: "Permanent (endowment-funded forever)",
        environmentalRisk: "None - clean food production",
        boundaryWatersImpact: "Protective - no sulfide mining pollution risk",
        economicMultiplier: 2.4,
        localFoodProduction: 9000000,  // 225K sqft × 40 lbs/sqft
        co2Sequestered: 980,            // Avoided transport: 4,500 tons produce × 1,200 mi × 161.8 g/ton-mi
        status: "Proposed Alternative",
        specialtyCrops: "Mushrooms, Microgreens, Specialty Peppers",
        suppliesAllSchools: "Yes - Supplies all 330 MN school districts",
        // Financial & Production
        annualProductionLbs: 9000000,      // 225K × 40 lbs/sqft
        schoolDistributionLbs: 5400000,    // 60% to schools
        excessForSaleLbs: 3600000,         // 40% excess for stores
        wholesalePricePerLb: 3.50,
        annualSalesRevenue: 12600000,      // 3.6M lbs × $3.50
        constructionCost: 19125000,        // 225K × $85
        annualOperatingCost: 2700000,      // 225K × $12
        netAnnualRevenue: 9900000,         // $12.6M - $2.7M ops
        // Distribution Infrastructure Jobs (for 3.6M lbs excess to stores/markets)
        sortingPackagingJobs: 12,          // ~1 per 300K lbs/year
        deliveryDriverJobs: 9,             // ~1 per 400K lbs/year
        warehouseLogisticsJobs: 3,         // Supervisors/coordinators
        totalDistributionJobs: 24,
        // School Distribution Jobs (for 5.4M lbs to 330 school districts)
        schoolSortingJobs: 18,             // Sorting/packaging for schools
        schoolDeliveryDrivers: 14,         // Refrigerated trucks to districts
        schoolLogisticsCoordinators: 4,    // Route planning/scheduling
        totalSchoolDistributionJobs: 36,
        grandTotalJobs: 355                // 295 greenhouse + 24 stores + 36 schools
      },
      {
        community: "Babbitt",
        county: "St. Louis",
        latitude: 47.7083,
        longitude: -91.9436,
        population: 1475,
        miningJobsPromised: 285,  // Updated: Twin Metals total ~1,500 jobs
        miningAvgSalary: 62000,
        miningDuration: "20-25 years (then depleted)",
        greenhouseComplexSqft: 127500,  // Halved from 255K
        greenhouseJobs: 153,
        greenhouseAvgSalary: 50000,
        schoolGreenhouseJobs: 12,
        totalGreenhouseJobs: 165,
        annualEndowmentFunding: 8250000,
        jobDuration: "Permanent (endowment-funded forever)",
        environmentalRisk: "None - clean food production",
        boundaryWatersImpact: "Protective - no sulfide mining pollution risk",
        economicMultiplier: 2.4,
        localFoodProduction: 5100000,
        co2Sequestered: 555,            // Avoided transport: 2,550 tons produce × 1,200 mi × 161.8 g/ton-mi
        status: "Proposed Alternative",
        specialtyCrops: "Edible Flowers, Exotic Herbs, Gourmet Greens",
        suppliesAllSchools: "Yes - Supplies all 330 MN school districts",
        // Financial & Production
        annualProductionLbs: 5100000,      // 127.5K × 40 lbs/sqft
        schoolDistributionLbs: 3060000,    // 60% to schools
        excessForSaleLbs: 2040000,         // 40% excess for stores
        wholesalePricePerLb: 3.50,
        annualSalesRevenue: 7140000,
        constructionCost: 10837500,        // 127.5K × $85
        annualOperatingCost: 1530000,      // 127.5K × $12
        netAnnualRevenue: 5610000,
        // Distribution Infrastructure Jobs (for 2.04M lbs excess to stores/markets)
        sortingPackagingJobs: 7,
        deliveryDriverJobs: 5,
        warehouseLogisticsJobs: 2,
        totalDistributionJobs: 14,
        // School Distribution Jobs (for 3.06M lbs to 330 school districts)
        schoolSortingJobs: 10,
        schoolDeliveryDrivers: 8,
        schoolLogisticsCoordinators: 2,
        totalSchoolDistributionJobs: 20,
        grandTotalJobs: 199                // 165 greenhouse + 14 stores + 20 schools
      },
      {
        community: "Hibbing",
        county: "St. Louis",
        latitude: 47.4272,
        longitude: -92.9378,
        population: 15560,
        miningJobsPromised: 400,  // Updated: Twin Metals total ~1,500 jobs
        miningAvgSalary: 64000,
        miningDuration: "20-25 years (then depleted)",
        greenhouseComplexSqft: 375000,  // Halved from 750K
        greenhouseJobs: 450,
        greenhouseAvgSalary: 52000,
        schoolGreenhouseJobs: 35,
        totalGreenhouseJobs: 485,
        annualEndowmentFunding: 25220000,
        jobDuration: "Permanent (endowment-funded forever)",
        environmentalRisk: "None - clean food production",
        boundaryWatersImpact: "Protective - no sulfide mining pollution risk",
        economicMultiplier: 2.4,
        localFoodProduction: 15000000,
        co2Sequestered: 1640,           // Avoided transport: 7,500 tons produce × 1,200 mi × 161.8 g/ton-mi
        status: "Proposed Alternative",
        specialtyCrops: "Year-Round Strawberries, Specialty Melons, Heirloom Tomatoes",
        suppliesAllSchools: "Yes - Supplies all 330 MN school districts",
        // Financial & Production
        annualProductionLbs: 15000000,     // 375K × 40 lbs/sqft
        schoolDistributionLbs: 9000000,    // 60% to schools
        excessForSaleLbs: 6000000,         // 40% excess for stores
        wholesalePricePerLb: 3.50,
        annualSalesRevenue: 21000000,
        constructionCost: 31875000,        // 375K × $85
        annualOperatingCost: 4500000,
        netAnnualRevenue: 16500000,
        // Distribution Infrastructure Jobs (for 6M lbs excess to stores/markets - largest hub)
        sortingPackagingJobs: 20,
        deliveryDriverJobs: 15,
        warehouseLogisticsJobs: 5,
        totalDistributionJobs: 40,
        // School Distribution Jobs (for 9M lbs to 330 school districts - main hub)
        schoolSortingJobs: 30,
        schoolDeliveryDrivers: 23,
        schoolLogisticsCoordinators: 7,
        totalSchoolDistributionJobs: 60,
        grandTotalJobs: 585                // 485 greenhouse + 40 stores + 60 schools
      },
      {
        community: "Tower",
        county: "St. Louis",
        latitude: 47.8053,
        longitude: -92.2917,
        population: 490,
        miningJobsPromised: 60,   // Updated: Twin Metals total ~1,500 jobs
        miningAvgSalary: 58000,
        miningDuration: "20-25 years (then depleted)",
        greenhouseComplexSqft: 52500,   // Halved from 105K
        greenhouseJobs: 63,
        greenhouseAvgSalary: 48000,
        schoolGreenhouseJobs: 6,
        totalGreenhouseJobs: 69,
        annualEndowmentFunding: 3312000,
        jobDuration: "Permanent (endowment-funded forever)",
        environmentalRisk: "None - clean food production",
        boundaryWatersImpact: "Protective - no sulfide mining pollution risk",
        economicMultiplier: 2.4,
        localFoodProduction: 2100000,
        co2Sequestered: 230,            // Avoided transport: 1,050 tons produce × 1,200 mi × 161.8 g/ton-mi
        status: "Proposed Alternative",
        specialtyCrops: "Specialty Squash, Artisan Cucumbers",
        suppliesAllSchools: "Yes - Supplies all 330 MN school districts",
        // Financial & Production
        annualProductionLbs: 2100000,      // 52.5K × 40 lbs/sqft
        schoolDistributionLbs: 1260000,    // 60% to schools
        excessForSaleLbs: 840000,          // 40% excess for stores
        wholesalePricePerLb: 3.50,
        annualSalesRevenue: 2940000,
        constructionCost: 4462500,         // 52.5K × $85
        annualOperatingCost: 630000,
        netAnnualRevenue: 2310000,
        // Distribution Infrastructure Jobs (for 0.84M lbs excess to stores/markets - smallest)
        sortingPackagingJobs: 3,
        deliveryDriverJobs: 2,
        warehouseLogisticsJobs: 1,
        totalDistributionJobs: 6,
        // School Distribution Jobs (for 1.26M lbs to 330 school districts)
        schoolSortingJobs: 4,
        schoolDeliveryDrivers: 3,
        schoolLogisticsCoordinators: 1,
        totalSchoolDistributionJobs: 8,
        grandTotalJobs: 83                 // 69 greenhouse + 6 stores + 8 schools
      },
      {
        community: "Virginia",
        county: "St. Louis",
        latitude: 47.5233,
        longitude: -92.5364,
        population: 8060,
        miningJobsPromised: 155,  // Updated: Twin Metals total ~1,500 jobs
        miningAvgSalary: 60000,
        miningDuration: "20-25 years (then depleted)",
        greenhouseComplexSqft: 180000,  // Halved from 360K
        greenhouseJobs: 216,
        greenhouseAvgSalary: 50000,
        schoolGreenhouseJobs: 18,
        totalGreenhouseJobs: 234,
        annualEndowmentFunding: 11700000,
        jobDuration: "Permanent (endowment-funded forever)",
        environmentalRisk: "None - clean food production",
        boundaryWatersImpact: "Protective - no sulfide mining pollution risk",
        economicMultiplier: 2.4,
        localFoodProduction: 7200000,
        co2Sequestered: 795,            // Avoided transport: 3,600 tons produce × 1,200 mi × 161.8 g/ton-mi
        status: "Proposed Alternative",
        specialtyCrops: "Gourmet Mushrooms, Asian Vegetables, Baby Root Vegetables",
        suppliesAllSchools: "Yes - Supplies all 330 MN school districts",
        // Financial & Production
        annualProductionLbs: 7200000,      // 180K × 40 lbs/sqft
        schoolDistributionLbs: 4320000,    // 60% to schools
        excessForSaleLbs: 2880000,         // 40% excess for stores
        wholesalePricePerLb: 3.50,
        annualSalesRevenue: 10080000,
        constructionCost: 15300000,        // 180K × $85
        annualOperatingCost: 2160000,
        netAnnualRevenue: 7920000,
        // Distribution Infrastructure Jobs (for 2.88M lbs excess to stores/markets)
        sortingPackagingJobs: 10,
        deliveryDriverJobs: 7,
        warehouseLogisticsJobs: 3,
        totalDistributionJobs: 20,
        // School Distribution Jobs (for 4.32M lbs to 330 school districts)
        schoolSortingJobs: 14,
        schoolDeliveryDrivers: 11,
        schoolLogisticsCoordinators: 3,
        totalSchoolDistributionJobs: 28,
        grandTotalJobs: 282                // 234 greenhouse + 20 stores + 28 schools
      }
    ];
    
    for (const alt of miningAlternatives) {
      await storage.createMiningAlternative(alt);
    }
    
    console.log("Mining alternatives data seeded successfully");
  }
}
