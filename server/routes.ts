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

  // === Seed Data ===
  await seedDatabase();

  return httpServer;
}

async function seedDatabase() {
  const isEmpty = await storage.isEmpty();
  if (isEmpty) {
    console.log("Seeding database with GAIA v5.0 data...");
    
    // Seed Pilot - 6 schools, 5640 students, 44950 sqft
    await storage.updatePilotStats({
      students: 5640,
      sqft: 44950,
      schools: 6,
      status: "live"
    });

    // Seed Endowment - v4.2 Locked
    await storage.updateEndowmentStats({
      size: "2.1B",
      annual: "63M",
      greenhouses: 275
    });

    // Seed Financials (v3.1 Master Production Suite - 6 schools)
    await storage.updateFinancialMetrics({
      schoolCount: 6,
      initialInvestment: 3000000,
      annualOpex: 360000,
      yieldPerSchool: 120000,
      foodPricePerLb: 2.5,
      discountRate: 0.05,
      npv10yr: 8640000,
      roi10yrPct: 288,
      investmentPerSchool: 500000,
      opexPerSchool: 60000,
      annualRevenuePerSchool: 300000,
      totalAnnualYield: 720000,
      totalAnnualRevenue: 1800000,
      paybackYears: 2.1
    });

    // Seed Climate (v5.0 ETL)
    await storage.updateClimateMetrics({
      avgTemp: 45.8,
      growingSeasonDays: 165,
      co2Ppm: 425,
      annualTons: 22550,
      studentMealsAnnual: "175,000,000"
    });

    // Seed Ballot Slide Deck (20 slides)
    const slides = [
      { n: 1, title: "The Problem", text: "875k MN kids face food insecurity" },
      { n: 2, title: "The Solution", text: "275 greenhouses = 875,000 meals/day" },
      { n: 3, title: "Endowment Engine", text: "0.27% tax → $2.1B PERPETUAL" },
      { n: 4, title: "Math Works", text: "3% draw = $63M/yr" },
      { n: 5, title: "St. Paul Pilot", text: "3,816 students | 26,550 sqft" },
      { n: 6, title: "Mendota Pilot", text: "3,262 students | 22,700 sqft" },
      { n: 7, title: "MCS Yield Model", text: "50 lbs/1000 sqft hydroponic" },
      { n: 8, title: "Breakeven", text: "$2.75B CAPEX amortized 20yr" },
      { n: 9, title: "Inflation Proof", text: "Real budget maintained forever" },
      { n: 10, title: "Governance", text: "7 Board Seats | Tribal Rep" },
      { n: 11, title: "Legal Path", text: "MN Ballot → Constitutional Amendment" },
      { n: 12, title: "National Vision", text: "MN → 50 States | $48B+" },
      { n: 13, title: "Risks Mitigated", text: "Planetary boundaries clause" },
      { n: 14, title: "Timeline", text: "2026 Pilots → 2028 Ballot → 2030 Full" },
      { n: 15, title: "The Ask", text: "$5M Seed for Ballot + Pilots" },
      { n: 16, title: "Legacy", text: "Generations of kids fed, sustainably" },
      { n: 17, title: "Principals Brief", text: "Jan 20 Meetings Ready" },
      { n: 18, title: "Donor Accelerant", text: "Pro-Sports/Billionaires OPTIONAL" },
      { n: 19, title: "MCS Partnership", text: "Analytics for Yield + Risk" },
      { n: 20, title: "Vote Yes on Gaia", text: "Forever Funding" }
    ];
    for (const s of slides) {
      await storage.createSlide({
        slideNumber: s.n,
        title: s.title,
        content: s.text
      });
    }

    // Seed Timeline - v4.2 Deliverables
    await storage.createTimelineEvent({ year: "2026 Q1", event: "St. Paul/Mendota Pilots Live" });
    await storage.createTimelineEvent({ year: "2026 Q4", event: "Ballot Signature Drive" });
    await storage.createTimelineEvent({ year: "2028", event: "$2.1B Funded" });
    await storage.createTimelineEvent({ year: "2030", event: "275 Greenhouses Deployed" });

    // Seed Historical Financials for Trend Analysis (quarterly data from 2024-2026)
    const historicalData = [
      { year: 2024, quarter: 1, schoolCount: 1, totalRevenue: 75000, totalOpex: 45000, totalYieldLbs: 30000, endowmentValue: 500000000, studentsServed: 940 },
      { year: 2024, quarter: 2, schoolCount: 1, totalRevenue: 85000, totalOpex: 48000, totalYieldLbs: 34000, endowmentValue: 550000000, studentsServed: 940 },
      { year: 2024, quarter: 3, schoolCount: 2, totalRevenue: 165000, totalOpex: 95000, totalYieldLbs: 66000, endowmentValue: 650000000, studentsServed: 1880 },
      { year: 2024, quarter: 4, schoolCount: 2, totalRevenue: 180000, totalOpex: 98000, totalYieldLbs: 72000, endowmentValue: 800000000, studentsServed: 1880 },
      { year: 2025, quarter: 1, schoolCount: 3, totalRevenue: 270000, totalOpex: 145000, totalYieldLbs: 108000, endowmentValue: 1000000000, studentsServed: 2820 },
      { year: 2025, quarter: 2, schoolCount: 4, totalRevenue: 380000, totalOpex: 195000, totalYieldLbs: 152000, endowmentValue: 1300000000, studentsServed: 3760 },
      { year: 2025, quarter: 3, schoolCount: 5, totalRevenue: 425000, totalOpex: 240000, totalYieldLbs: 170000, endowmentValue: 1600000000, studentsServed: 4700 },
      { year: 2025, quarter: 4, schoolCount: 6, totalRevenue: 450000, totalOpex: 260000, totalYieldLbs: 180000, endowmentValue: 1900000000, studentsServed: 5640 },
      { year: 2026, quarter: 1, schoolCount: 6, totalRevenue: 480000, totalOpex: 270000, totalYieldLbs: 192000, endowmentValue: 2100000000, studentsServed: 5640 },
    ];
    for (const h of historicalData) {
      await storage.createHistoricalFinancial(h);
    }
    
    console.log("Database seeded successfully with complete GAIA platform data");
  }
}
