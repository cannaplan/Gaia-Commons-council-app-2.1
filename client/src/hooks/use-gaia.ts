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

// Historical Financials for Trend Analysis
export function useHistoricalFinancials() {
  return useQuery({
    queryKey: [api.historicalFinancials.list.path],
    queryFn: async () => {
      const res = await fetch(api.historicalFinancials.list.path);
      if (!res.ok) throw new Error("Failed to fetch historical financials");
      return api.historicalFinancials.list.responses[200].parse(await res.json());
    },
  });
}

// School Clusters (St. Paul and Mendota Heights)
export function useSchoolClusters() {
  return useQuery({
    queryKey: [api.schoolClusters.list.path],
    queryFn: async () => {
      const res = await fetch(api.schoolClusters.list.path);
      if (!res.ok) throw new Error("Failed to fetch school clusters");
      return api.schoolClusters.list.responses[200].parse(await res.json());
    },
  });
}

// Individual Schools
export function useSchools() {
  return useQuery({
    queryKey: [api.schools.list.path],
    queryFn: async () => {
      const res = await fetch(api.schools.list.path);
      if (!res.ok) throw new Error("Failed to fetch schools");
      return api.schools.list.responses[200].parse(await res.json());
    },
  });
}

// Multi-Scale Projections (Pilot, Statewide, National, Global)
export function useScaleProjections() {
  return useQuery({
    queryKey: [api.scaleProjections.list.path],
    queryFn: async () => {
      const res = await fetch(api.scaleProjections.list.path);
      if (!res.ok) throw new Error("Failed to fetch scale projections");
      return api.scaleProjections.list.responses[200].parse(await res.json());
    },
  });
}

// Environmental Impact Metrics
export function useEnvironmentalImpact() {
  return useQuery({
    queryKey: [api.environmentalImpact.list.path],
    queryFn: async () => {
      const res = await fetch(api.environmentalImpact.list.path);
      if (!res.ok) throw new Error("Failed to fetch environmental impact");
      return api.environmentalImpact.list.responses[200].parse(await res.json());
    },
  });
}

// Job Creation Projections
export function useJobCreation() {
  return useQuery({
    queryKey: [api.jobCreation.list.path],
    queryFn: async () => {
      const res = await fetch(api.jobCreation.list.path);
      if (!res.ok) throw new Error("Failed to fetch job creation data");
      return api.jobCreation.list.responses[200].parse(await res.json());
    },
  });
}

// Legal Framework and Governance
export function useLegalFramework() {
  return useQuery({
    queryKey: [api.legalFramework.get.path],
    queryFn: async () => {
      const res = await fetch(api.legalFramework.get.path);
      if (!res.ok) throw new Error("Failed to fetch legal framework");
      return api.legalFramework.get.responses[200].parse(await res.json());
    },
  });
}

// 50-Year Endowment Projections
export function useEndowmentProjections() {
  return useQuery({
    queryKey: [api.endowmentProjections.list.path],
    queryFn: async () => {
      const res = await fetch(api.endowmentProjections.list.path);
      if (!res.ok) throw new Error("Failed to fetch endowment projections");
      return api.endowmentProjections.list.responses[200].parse(await res.json());
    },
  });
}

// Expanded Jobs (FTE + Internships + Volunteers)
export function useExpandedJobs() {
  return useQuery({
    queryKey: [api.expandedJobs.list.path],
    queryFn: async () => {
      const res = await fetch(api.expandedJobs.list.path);
      if (!res.ok) throw new Error("Failed to fetch expanded jobs");
      return api.expandedJobs.list.responses[200].parse(await res.json());
    },
  });
}

// K-12 NGSS Curriculum
export function useK12Curriculum() {
  return useQuery({
    queryKey: [api.k12Curriculum.list.path],
    queryFn: async () => {
      const res = await fetch(api.k12Curriculum.list.path);
      if (!res.ok) throw new Error("Failed to fetch K-12 curriculum");
      return api.k12Curriculum.list.responses[200].parse(await res.json());
    },
  });
}

// Coalition Partners
export function useCoalitionPartners() {
  return useQuery({
    queryKey: [api.coalitionPartners.list.path],
    queryFn: async () => {
      const res = await fetch(api.coalitionPartners.list.path);
      if (!res.ok) throw new Error("Failed to fetch coalition partners");
      return api.coalitionPartners.list.responses[200].parse(await res.json());
    },
  });
}

// Funding Sources
export function useFundingSources() {
  return useQuery({
    queryKey: [api.fundingSources.list.path],
    queryFn: async () => {
      const res = await fetch(api.fundingSources.list.path);
      if (!res.ok) throw new Error("Failed to fetch funding sources");
      return api.fundingSources.list.responses[200].parse(await res.json());
    },
  });
}

// Transparency Features
export function useTransparencyFeatures() {
  return useQuery({
    queryKey: [api.transparencyFeatures.list.path],
    queryFn: async () => {
      const res = await fetch(api.transparencyFeatures.list.path);
      if (!res.ok) throw new Error("Failed to fetch transparency features");
      return api.transparencyFeatures.list.responses[200].parse(await res.json());
    },
  });
}

// Accountability Mechanisms
export function useAccountabilityMechanisms() {
  return useQuery({
    queryKey: [api.accountabilityMechanisms.list.path],
    queryFn: async () => {
      const res = await fetch(api.accountabilityMechanisms.list.path);
      if (!res.ok) throw new Error("Failed to fetch accountability mechanisms");
      return api.accountabilityMechanisms.list.responses[200].parse(await res.json());
    },
  });
}

// Tribal Partnerships
export function useTribalPartnerships() {
  return useQuery({
    queryKey: [api.tribalPartnerships.list.path],
    queryFn: async () => {
      const res = await fetch(api.tribalPartnerships.list.path);
      if (!res.ok) throw new Error("Failed to fetch tribal partnerships");
      return api.tribalPartnerships.list.responses[200].parse(await res.json());
    },
  });
}

// Implementation Timeline
export function useImplementationTimeline() {
  return useQuery({
    queryKey: [api.implementationTimeline.list.path],
    queryFn: async () => {
      const res = await fetch(api.implementationTimeline.list.path);
      if (!res.ok) throw new Error("Failed to fetch implementation timeline");
      return api.implementationTimeline.list.responses[200].parse(await res.json());
    },
  });
}

// Political Roadmap
export function usePoliticalRoadmap() {
  return useQuery({
    queryKey: [api.politicalRoadmap.list.path],
    queryFn: async () => {
      const res = await fetch(api.politicalRoadmap.list.path);
      if (!res.ok) throw new Error("Failed to fetch political roadmap");
      return api.politicalRoadmap.list.responses[200].parse(await res.json());
    },
  });
}

// Stress Tests
export function useStressTests() {
  return useQuery({
    queryKey: [api.stressTests.list.path],
    queryFn: async () => {
      const res = await fetch(api.stressTests.list.path);
      if (!res.ok) throw new Error("Failed to fetch stress tests");
      return api.stressTests.list.responses[200].parse(await res.json());
    },
  });
}

// Tiered Carbon Pricing
export function useTieredCarbonPricing() {
  return useQuery({
    queryKey: [api.tieredCarbonPricing.list.path],
    queryFn: async () => {
      const res = await fetch(api.tieredCarbonPricing.list.path);
      if (!res.ok) throw new Error("Failed to fetch tiered carbon pricing");
      return api.tieredCarbonPricing.list.responses[200].parse(await res.json());
    },
  });
}

// Regenerative Agriculture
export function useRegenerativeAgriculture() {
  return useQuery({
    queryKey: [api.regenerativeAgriculture.list.path],
    queryFn: async () => {
      const res = await fetch(api.regenerativeAgriculture.list.path);
      if (!res.ok) throw new Error("Failed to fetch regenerative agriculture");
      return api.regenerativeAgriculture.list.responses[200].parse(await res.json());
    },
  });
}

// Nationwide Food Security
export function useNationwideFoodSecurity() {
  return useQuery({
    queryKey: [api.nationwideFoodSecurity.get.path],
    queryFn: async () => {
      const res = await fetch(api.nationwideFoodSecurity.get.path);
      if (!res.ok) throw new Error("Failed to fetch nationwide food security");
      return api.nationwideFoodSecurity.get.responses[200].parse(await res.json());
    },
  });
}

// Labor Transition
export function useLaborTransition() {
  return useQuery({
    queryKey: [api.laborTransition.list.path],
    queryFn: async () => {
      const res = await fetch(api.laborTransition.list.path);
      if (!res.ok) throw new Error("Failed to fetch labor transition");
      return api.laborTransition.list.responses[200].parse(await res.json());
    },
  });
}

// Political Coalition
export function usePoliticalCoalitionData() {
  return useQuery({
    queryKey: [api.politicalCoalition.list.path],
    queryFn: async () => {
      const res = await fetch(api.politicalCoalition.list.path);
      if (!res.ok) throw new Error("Failed to fetch political coalition");
      return api.politicalCoalition.list.responses[200].parse(await res.json());
    },
  });
}

// Global Regeneration Summary
export function useGlobalRegenerationSummary() {
  return useQuery({
    queryKey: [api.globalRegenerationSummary.get.path],
    queryFn: async () => {
      const res = await fetch(api.globalRegenerationSummary.get.path);
      if (!res.ok) throw new Error("Failed to fetch global regeneration summary");
      return api.globalRegenerationSummary.get.responses[200].parse(await res.json());
    },
  });
}

// Planetary Boundaries
export function usePlanetaryBoundaries() {
  return useQuery({
    queryKey: [api.planetaryBoundaries.list.path],
    queryFn: async () => {
      const res = await fetch(api.planetaryBoundaries.list.path);
      if (!res.ok) throw new Error("Failed to fetch planetary boundaries");
      return api.planetaryBoundaries.list.responses[200].parse(await res.json());
    },
  });
}

// Calibration Targets
export function useCalibrationTargets() {
  return useQuery({
    queryKey: [api.calibrationTargets.list.path],
    queryFn: async () => {
      const res = await fetch(api.calibrationTargets.list.path);
      if (!res.ok) throw new Error("Failed to fetch calibration targets");
      return api.calibrationTargets.list.responses[200].parse(await res.json());
    },
  });
}

// Model Maturity
export function useModelMaturity() {
  return useQuery({
    queryKey: [api.modelMaturity.list.path],
    queryFn: async () => {
      const res = await fetch(api.modelMaturity.list.path);
      if (!res.ok) throw new Error("Failed to fetch model maturity");
      return api.modelMaturity.list.responses[200].parse(await res.json());
    },
  });
}

// Historical Climate Data
export function useHistoricalClimateData() {
  return useQuery({
    queryKey: [api.historicalClimateData.list.path],
    queryFn: async () => {
      const res = await fetch(api.historicalClimateData.list.path);
      if (!res.ok) throw new Error("Failed to fetch historical climate data");
      return api.historicalClimateData.list.responses[200].parse(await res.json());
    },
  });
}

// Monte Carlo Simulations
export function useMonteCarloSimulations() {
  return useQuery({
    queryKey: [api.monteCarloSimulations.list.path],
    queryFn: async () => {
      const res = await fetch(api.monteCarloSimulations.list.path);
      if (!res.ok) throw new Error("Failed to fetch monte carlo simulations");
      return api.monteCarloSimulations.list.responses[200].parse(await res.json());
    },
  });
}

// Scenario Comparisons
export function useScenarioComparisons() {
  return useQuery({
    queryKey: [api.scenarioComparisons.list.path],
    queryFn: async () => {
      const res = await fetch(api.scenarioComparisons.list.path);
      if (!res.ok) throw new Error("Failed to fetch scenario comparisons");
      return api.scenarioComparisons.list.responses[200].parse(await res.json());
    },
  });
}

// Optimization Parameters
export function useOptimizationParams() {
  return useQuery({
    queryKey: [api.optimizationParams.list.path],
    queryFn: async () => {
      const res = await fetch(api.optimizationParams.list.path);
      if (!res.ok) throw new Error("Failed to fetch optimization params");
      return api.optimizationParams.list.responses[200].parse(await res.json());
    },
  });
}

// Sensitivity Analysis
export function useSensitivityAnalysis() {
  return useQuery({
    queryKey: [api.sensitivityAnalysis.list.path],
    queryFn: async () => {
      const res = await fetch(api.sensitivityAnalysis.list.path);
      if (!res.ok) throw new Error("Failed to fetch sensitivity analysis");
      return api.sensitivityAnalysis.list.responses[200].parse(await res.json());
    },
  });
}

// Greenhouse Locations (Interactive Map)
export function useGreenhouseLocations() {
  return useQuery({
    queryKey: [api.greenhouseLocations.list.path],
    queryFn: async () => {
      const res = await fetch(api.greenhouseLocations.list.path);
      if (!res.ok) throw new Error("Failed to fetch greenhouse locations");
      return api.greenhouseLocations.list.responses[200].parse(await res.json());
    },
  });
}

// Global Regeneration Regions (World Map)
export function useGlobalRegenerationRegions() {
  return useQuery({
    queryKey: [api.globalRegenerationRegions.list.path],
    queryFn: async () => {
      const res = await fetch(api.globalRegenerationRegions.list.path);
      if (!res.ok) throw new Error("Failed to fetch global regeneration regions");
      return api.globalRegenerationRegions.list.responses[200].parse(await res.json());
    },
  });
}

// MN School Districts (Interactive Map)
export function useMnSchoolDistricts() {
  return useQuery({
    queryKey: [api.mnSchoolDistricts.list.path],
    queryFn: async () => {
      const res = await fetch(api.mnSchoolDistricts.list.path);
      if (!res.ok) throw new Error("Failed to fetch MN school districts");
      return api.mnSchoolDistricts.list.responses[200].parse(await res.json());
    },
  });
}

// Mining Alternatives (Twin Metals Replacement)
export function useMiningAlternatives() {
  return useQuery({
    queryKey: [api.miningAlternatives.list.path],
    queryFn: async () => {
      const res = await fetch(api.miningAlternatives.list.path);
      if (!res.ok) throw new Error("Failed to fetch mining alternatives");
      return api.miningAlternatives.list.responses[200].parse(await res.json());
    },
  });
}
