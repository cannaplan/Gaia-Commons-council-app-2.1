import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, buildUrl } from "@shared/routes";

// Health
export function useHealth() {
  return useQuery({
    queryKey: [api.health.get.path],
    queryFn: async () => {
      const res = await fetch(api.health.get.path);
      if (!res.ok) throw new Error("Failed to fetch health status");
      return api.health.get.responses[200].parse(await res.json());
    },
    refetchInterval: 30000, // Check every 30s
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

// Docs (Metadata)
export function useDocs() {
  return useQuery({
    queryKey: [api.docs.get.path],
    queryFn: async () => {
      const res = await fetch(api.docs.get.path);
      if (!res.ok) throw new Error("Failed to fetch docs");
      return api.docs.get.responses[200].parse(await res.json());
    },
  });
}
