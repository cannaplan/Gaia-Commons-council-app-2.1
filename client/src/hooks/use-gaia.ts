import { useQuery } from "@tanstack/react-query";
import { api } from "@shared/routes";

// Health
export function useHealth() {
  return useQuery({
    queryKey: [api.health.get.path],
    queryFn: async () => {
      const res = await fetch(api.health.get.path);
      if (!res.ok) throw new Error("Failed to fetch health status");
      return api.health.get.responses[200].parse(await res.json());
    },
    refetchInterval: 30000,
  });
}

// Pilot Stats
export function usePilotStats() {
  return useQuery({
    queryKey: [api.pilot.get.path],
    queryFn: async () => {
      const res = await fetch(api.pilot.get.path);
      if (!res.ok) throw new Error("Failed to fetch pilot stats");
      return api.pilot.get.responses[200].parse(await res.json());
    },
  });
}

// Endowment Stats
export function useEndowmentStats() {
  return useQuery({
    queryKey: [api.endowment.get.path],
    queryFn: async () => {
      const res = await fetch(api.endowment.get.path);
      if (!res.ok) throw new Error("Failed to fetch endowment stats");
      return api.endowment.get.responses[200].parse(await res.json());
    },
  });
}

// Timeline
export function useTimeline() {
  return useQuery({
    queryKey: [api.timeline.list.path],
    queryFn: async () => {
      const res = await fetch(api.timeline.list.path);
      if (!res.ok) throw new Error("Failed to fetch timeline");
      return api.timeline.list.responses[200].parse(await res.json());
    },
  });
}

// Financial Metrics (v3.1)
export function useFinancialMetrics() {
  return useQuery({
    queryKey: [api.financials.get.path],
    queryFn: async () => {
      const res = await fetch(api.financials.get.path);
      if (!res.ok) throw new Error("Failed to fetch financial metrics");
      return api.financials.get.responses[200].parse(await res.json());
    },
  });
}

// Climate Metrics (v5.0)
export function useClimateMetrics() {
  return useQuery({
    queryKey: [api.climate.get.path],
    queryFn: async () => {
      const res = await fetch(api.climate.get.path);
      if (!res.ok) throw new Error("Failed to fetch climate metrics");
      return api.climate.get.responses[200].parse(await res.json());
    },
  });
}

// Slide Deck
export function useSlides() {
  return useQuery({
    queryKey: [api.slides.list.path],
    queryFn: async () => {
      const res = await fetch(api.slides.list.path);
      if (!res.ok) throw new Error("Failed to fetch slides");
      return api.slides.list.responses[200].parse(await res.json());
    },
  });
}
