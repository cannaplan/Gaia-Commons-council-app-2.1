import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  // === Health ===
  app.get(api.health.get.path, (_req, res) => {
    res.json({
      status: "healthy",
      version: "8.7",
      service: "gaia-commons-api"
    });
  });

  // === Docs ===
  app.get(api.docs.get.path, (_req, res) => {
    res.json({
      endpoints: [
        "/health",
        "/api/pilot",
        "/api/endowment",
        "/api/timeline",
        "/api/docs"
      ],
      description: "Gaia Commons Council API"
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

  app.put(api.pilot.update.path, async (req, res) => {
    try {
      const input = api.pilot.update.input.parse(req.body);
      const stats = await storage.updatePilotStats(input);
      res.json(stats);
    } catch (err) {
      if (err instanceof z.ZodError) {
        res.status(400).json({ message: err.errors[0].message });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  });

  // === Endowment Stats ===
  app.get(api.endowment.get.path, async (_req, res) => {
    const stats = await storage.getEndowmentStats();
    if (!stats) {
      return res.status(404).json({ message: "Endowment stats not initialized" });
    }
    res.json(stats);
  });

  app.put(api.endowment.update.path, async (req, res) => {
    try {
      const input = api.endowment.update.input.parse(req.body);
      const stats = await storage.updateEndowmentStats(input);
      res.json(stats);
    } catch (err) {
      if (err instanceof z.ZodError) {
        res.status(400).json({ message: err.errors[0].message });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  });

  // === Timeline ===
  app.get(api.timeline.list.path, async (_req, res) => {
    const events = await storage.getTimelineEvents();
    res.json(events);
  });

  app.post(api.timeline.create.path, async (req, res) => {
    try {
      const input = api.timeline.create.input.parse(req.body);
      const event = await storage.createTimelineEvent(input);
      res.status(201).json(event);
    } catch (err) {
      if (err instanceof z.ZodError) {
        res.status(400).json({ message: err.errors[0].message });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  });

  app.delete(api.timeline.delete.path, async (req, res) => {
    await storage.deleteTimelineEvent(Number(req.params.id));
    res.status(204).send();
  });

  // === Financial Metrics ===
  app.get(api.financials.get.path, async (_req, res) => {
    const metrics = await storage.getFinancialMetrics();
    if (!metrics) return res.status(404).json({ message: "Metrics not found" });
    res.json(metrics);
  });

  // === Climate Metrics ===
  app.get(api.climate.get.path, async (_req, res) => {
    const metrics = await storage.getClimateMetrics();
    if (!metrics) return res.status(404).json({ message: "Metrics not found" });
    res.json(metrics);
  });

  // === Slide Deck ===
  app.get(api.slides.list.path, async (_req, res) => {
    const slides = await storage.getSlides();
    res.json(slides);
  });

  // === Seed Data ===
  await seedDatabase();

  return httpServer;
}

async function seedDatabase() {
  const isEmpty = await storage.isEmpty();
  if (isEmpty) {
    console.log("Seeding database...");
    
    // Seed Pilot
    await storage.updatePilotStats({
      students: 5640,
      sqft: 44950,
      schools: 6,
      status: "live"
    });

    // Seed Endowment
    await storage.updateEndowmentStats({
      size: "2.1B",
      annual: "63M",
      greenhouses: 275
    });

    // Seed Financials (v3.1)
    await storage.updateFinancialMetrics({
      initialInvestment: 5000000,
      annualOpex: 1000000,
      yieldPerSchool: 8000,
      foodPricePerKg: 2.5,
      discountRate: 0.05,
      npv10yr: 1250000000,
      roi10yrPct: 250
    });

    // Seed Climate (v5.0)
    await storage.updateClimateMetrics({
      avgTemp: 45.8,
      growingSeasonDays: 165,
      co2Ppm: 425,
      annualTons: 22550,
      studentMealsAnnual: "175,000,000"
    });

    // Seed Slides
    const slides = [
      { n: 1, title: "The Problem", text: "875k MN kids face food insecurity" },
      { n: 2, title: "The Solution", text: "275 greenhouses = 875,000 meals/day" },
      { n: 3, title: "Endowment Engine", text: "0.27% tax → $2.1B PERPETUAL" },
      { n: 20, title: "Vote Yes on Gaia", text: "Forever Funding" }
    ];
    for (const s of slides) {
      await storage.createSlide({
        slideNumber: s.n,
        title: s.title,
        content: s.text
      });
    }

    // Seed Timeline
    await storage.createTimelineEvent({ year: "2026 Q1", event: "St. Paul/Mendota Pilots Live" });
    await storage.createTimelineEvent({ year: "2026 Q4", event: "Ballot Signature Drive" });
    await storage.createTimelineEvent({ year: "2028", event: "$2.1B Funded" });
    await storage.createTimelineEvent({ year: "2030", event: "275 Greenhouses Deployed" });
    
    console.log("Database seeded successfully");
  }
}
