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

  // === Seed Data ===
  await seedDatabase();

  return httpServer;
}

async function seedDatabase() {
  const isEmpty = await storage.isEmpty();
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
}
