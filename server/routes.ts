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

  // === Seed Data ===
  await seedDatabase();

  return httpServer;
}

async function seedDatabase() {
  const isEmpty = await storage.isEmpty();
  if (isEmpty) {
    console.log("Seeding database...");
    
    // Seed Pilot - Data from Gaia v4.2 Endowment Master
    // Updated per user request: 6 schools, 5640 students, 44950 sqft
    await storage.updatePilotStats({
      students: 5640,
      sqft: 44950,
      schools: 6,
      status: "live"
    });

    // Seed Endowment - v4.2 Locked Model
    await storage.updateEndowmentStats({
      size: "2.1B",
      annual: "63M", // 3% of 2.1B
      greenhouses: 275
    });

    // Seed Timeline - v4.2 Deliverables
    await storage.createTimelineEvent({ year: "2026 Q1", event: "St. Paul/Mendota Pilots Live" });
    await storage.createTimelineEvent({ year: "2026 Q4", event: "Ballot Signature Drive" });
    await storage.createTimelineEvent({ year: "2028", event: "$2.1B Funded" });
    await storage.createTimelineEvent({ year: "2030", event: "275 Greenhouses Deployed" });
    
    console.log("Database seeded successfully");
  }
}
