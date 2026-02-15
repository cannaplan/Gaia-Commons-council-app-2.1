import { useState, useMemo } from "react";
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";
import { useGlobalRegenerationRegions } from "@/hooks/use-gaia";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Loader2, Globe, Users, Leaf, Factory, Droplets, DollarSign, TreeDeciduous, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const categoryColors: Record<string, string> = {
  "Regenerative Agriculture": "#22c55e",
  "Market Gardens": "#10b981",
  "Forest Restoration": "#059669",
  "Desert Restoration": "#f59e0b",
  "Indoor Agriculture": "#3b82f6",
  "Food Security": "#8b5cf6",
  "Agroforestry": "#06b6d4",
  "Silvopasture": "#84cc16",
  "Drought-Resilient": "#eab308",
  "School Greenhouses": "#ec4899",
  "Water Security": "#0ea5e9",
  "Indigenous Systems": "#f97316",
  "Soil Restoration": "#a3e635",
  "Carbon Farming": "#6366f1",
};

const statusBadgeColors: Record<string, string> = {
  "Active": "bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20",
  "Planning": "bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/20",
};

interface GlobalRegion {
  id: number;
  regionName: string;
  countryCode: string;
  latitude: number;
  longitude: number;
  category: string;
  projectName: string;
  description: string;
  greenhouseFacilities: number;
  jobsCreated: number;
  annualCarbonSequestrationTons: number;
  peopleFed: number;
  acresRestored: number;
  waterSavedGallons: number;
  investmentMillions: number;
  status: string;
  impactHighlight: string;
}

function formatLargeNumber(num: number): string {
  if (num >= 1000000000) return `${(num / 1000000000).toFixed(1)}B`;
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
  return num.toLocaleString();
}

export function GlobalRegenerationMap() {
  const { data: regions, isLoading, error } = useGlobalRegenerationRegions();
  const [selectedRegion, setSelectedRegion] = useState<GlobalRegion | null>(null);
  const [hoveredRegion, setHoveredRegion] = useState<number | null>(null);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  const categories = useMemo(() => {
    if (!regions) return [];
    const catSet = new Set(regions.map(r => r.category));
    const cats = Array.from(catSet);
    return cats.sort();
  }, [regions]);

  const filteredRegions = useMemo(() => {
    if (!regions) return [];
    if (!activeFilter) return regions;
    return regions.filter(r => r.category === activeFilter);
  }, [regions, activeFilter]);

  const summaryStats = useMemo(() => {
    if (!filteredRegions || filteredRegions.length === 0) {
      return { totalRegions: 0, totalJobs: 0, totalCarbon: 0, totalPeopleFed: 0, totalInvestment: 0 };
    }
    return {
      totalRegions: filteredRegions.length,
      totalJobs: filteredRegions.reduce((sum, r) => sum + r.jobsCreated, 0),
      totalCarbon: filteredRegions.reduce((sum, r) => sum + r.annualCarbonSequestrationTons, 0),
      totalPeopleFed: filteredRegions.reduce((sum, r) => sum + r.peopleFed, 0),
      totalInvestment: filteredRegions.reduce((sum, r) => sum + r.investmentMillions, 0),
    };
  }, [filteredRegions]);

  if (isLoading) {
    return (
      <Card className="h-full">
        <CardContent className="flex items-center justify-center h-[600px]">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="h-full">
        <CardContent className="flex items-center justify-center h-[600px]">
          <p className="text-destructive">Failed to load global regeneration regions</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-full overflow-hidden" data-testid="card-global-regeneration-map">
      <CardHeader className="pb-2">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5 text-primary" />
              Global Regeneration Network
            </CardTitle>
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="outline" className={statusBadgeColors["Active"]}>
                {filteredRegions.filter(r => r.status === "Active").length} Active Projects
              </Badge>
              <Badge variant="outline" className={statusBadgeColors["Planning"]}>
                {filteredRegions.filter(r => r.status === "Planning").length} Planning
              </Badge>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              {formatLargeNumber(summaryStats.totalJobs)} jobs
            </span>
            <span className="flex items-center gap-1">
              <Leaf className="h-4 w-4" />
              {formatLargeNumber(summaryStats.totalCarbon)} tons CO₂/year
            </span>
            <span className="flex items-center gap-1">
              <Factory className="h-4 w-4" />
              {formatLargeNumber(summaryStats.totalPeopleFed)} people fed
            </span>
            <span className="flex items-center gap-1">
              <DollarSign className="h-4 w-4" />
              ${formatLargeNumber(summaryStats.totalInvestment * 1000000)} invested
            </span>
          </div>

          <ScrollArea className="w-full whitespace-nowrap">
            <div className="flex gap-2 pb-2">
              <Button
                variant={activeFilter === null ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveFilter(null)}
                data-testid="button-filter-all"
              >
                All Categories
              </Button>
              {categories.map((cat) => (
                <Button
                  key={cat}
                  variant={activeFilter === cat ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActiveFilter(cat)}
                  className="shrink-0"
                  data-testid={`button-filter-${cat.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  <span 
                    className="w-2 h-2 rounded-full mr-1.5" 
                    style={{ backgroundColor: categoryColors[cat] || "#6b7280" }}
                  />
                  {cat}
                </Button>
              ))}
            </div>
          </ScrollArea>
        </div>
      </CardHeader>
      
      <CardContent className="p-0 relative">
        <div className="flex flex-col lg:flex-row">
          <div className="w-full lg:w-2/3 relative" style={{ height: "520px" }}>
            <ComposableMap
              projection="geoMercator"
              projectionConfig={{
                scale: 130,
                center: [20, 20]
              }}
              style={{ width: "100%", height: "100%" }}
            >
              <Geographies geography={geoUrl}>
                {({ geographies }: { geographies: Array<{ rsmKey: string; properties: { name: string } }> }) =>
                  geographies.map((geo) => (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      fill="hsl(var(--muted))"
                      stroke="hsl(var(--border))"
                      strokeWidth={0.5}
                      style={{
                        default: { outline: "none" },
                        hover: { outline: "none", fill: "hsl(var(--muted-foreground) / 0.2)" },
                        pressed: { outline: "none" },
                      }}
                    />
                  ))
                }
              </Geographies>
              
              {filteredRegions.map((region) => {
                const isSelected = selectedRegion?.id === region.id;
                const isHovered = hoveredRegion === region.id;
                const color = categoryColors[region.category] || "#6b7280";
                const size = Math.min(12, Math.max(6, Math.log10(region.peopleFed) * 1.5));
                
                return (
                  <Marker
                    key={region.id}
                    coordinates={[region.longitude, region.latitude]}
                    onClick={() => setSelectedRegion(region)}
                    onMouseEnter={() => setHoveredRegion(region.id)}
                    onMouseLeave={() => setHoveredRegion(null)}
                  >
                    <motion.circle
                      r={isHovered || isSelected ? size * 1.4 : size}
                      fill={color}
                      fillOpacity={isSelected ? 1 : 0.8}
                      stroke={isSelected ? "hsl(var(--foreground))" : "white"}
                      strokeWidth={isSelected ? 2.5 : 1.5}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    />
                    {(isHovered || isSelected) && (
                      <motion.text
                        textAnchor="middle"
                        y={-size - 8}
                        style={{
                          fontSize: "11px",
                          fontWeight: 600,
                          fill: "hsl(var(--foreground))",
                          paintOrder: "stroke",
                          stroke: "hsl(var(--background))",
                          strokeWidth: 3,
                        }}
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        {region.regionName}
                      </motion.text>
                    )}
                  </Marker>
                );
              })}
            </ComposableMap>
          </div>

          <div className="w-full lg:w-1/3 border-t lg:border-t-0 lg:border-l border-border">
            <AnimatePresence mode="wait">
              {selectedRegion ? (
                <motion.div
                  key={selectedRegion.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                  className="p-4 h-full"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-lg">{selectedRegion.regionName}</h3>
                      <p className="text-sm text-muted-foreground">{selectedRegion.projectName}</p>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => setSelectedRegion(null)}
                      data-testid="button-close-region-details"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge 
                      variant="outline"
                      style={{ 
                        borderColor: categoryColors[selectedRegion.category],
                        color: categoryColors[selectedRegion.category]
                      }}
                    >
                      {selectedRegion.category}
                    </Badge>
                    <Badge variant="outline" className={statusBadgeColors[selectedRegion.status]}>
                      {selectedRegion.status}
                    </Badge>
                  </div>

                  <p className="text-sm text-muted-foreground mb-4">
                    {selectedRegion.description}
                  </p>

                  <div className="bg-muted/50 rounded-lg p-3 mb-4">
                    <p className="text-sm font-medium text-primary">
                      {selectedRegion.impactHighlight}
                    </p>
                  </div>

                  <ScrollArea className="h-[240px]">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between py-2 border-b border-border/50">
                        <span className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Factory className="h-4 w-4" />
                          Greenhouse Facilities
                        </span>
                        <span className="font-semibold">{selectedRegion.greenhouseFacilities.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center justify-between py-2 border-b border-border/50">
                        <span className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Users className="h-4 w-4" />
                          Jobs Created
                        </span>
                        <span className="font-semibold">{formatLargeNumber(selectedRegion.jobsCreated)}</span>
                      </div>
                      <div className="flex items-center justify-between py-2 border-b border-border/50">
                        <span className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Leaf className="h-4 w-4" />
                          Carbon Avoided/Year
                        </span>
                        <span className="font-semibold">{formatLargeNumber(selectedRegion.annualCarbonSequestrationTons)} tons</span>
                      </div>
                      <div className="flex items-center justify-between py-2 border-b border-border/50">
                        <span className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Users className="h-4 w-4" />
                          People Fed
                        </span>
                        <span className="font-semibold">{formatLargeNumber(selectedRegion.peopleFed)}</span>
                      </div>
                      <div className="flex items-center justify-between py-2 border-b border-border/50">
                        <span className="flex items-center gap-2 text-sm text-muted-foreground">
                          <TreeDeciduous className="h-4 w-4" />
                          Acres Restored
                        </span>
                        <span className="font-semibold">{formatLargeNumber(selectedRegion.acresRestored)}</span>
                      </div>
                      <div className="flex items-center justify-between py-2 border-b border-border/50">
                        <span className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Droplets className="h-4 w-4" />
                          Water Saved
                        </span>
                        <span className="font-semibold">{formatLargeNumber(selectedRegion.waterSavedGallons)} gal</span>
                      </div>
                      <div className="flex items-center justify-between py-2">
                        <span className="flex items-center gap-2 text-sm text-muted-foreground">
                          <DollarSign className="h-4 w-4" />
                          Investment
                        </span>
                        <span className="font-semibold">${formatLargeNumber(selectedRegion.investmentMillions * 1000000)}</span>
                      </div>
                    </div>
                  </ScrollArea>
                </motion.div>
              ) : (
                <motion.div
                  key="placeholder"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="p-4 h-full flex flex-col"
                >
                  <h3 className="font-semibold mb-2">Select a Region</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Click on any marker to view detailed project information and impact metrics.
                  </p>
                  <ScrollArea className="flex-1">
                    <div className="space-y-2">
                      {filteredRegions.map((region) => (
                        <button
                          key={region.id}
                          onClick={() => setSelectedRegion(region)}
                          onMouseEnter={() => setHoveredRegion(region.id)}
                          onMouseLeave={() => setHoveredRegion(null)}
                          className="w-full text-left p-3 rounded-lg border border-border hover-elevate transition-colors"
                          data-testid={`button-region-${region.id}`}
                        >
                          <div className="flex items-center gap-2">
                            <span 
                              className="w-3 h-3 rounded-full shrink-0" 
                              style={{ backgroundColor: categoryColors[region.category] || "#6b7280" }}
                            />
                            <div className="min-w-0 flex-1">
                              <p className="font-medium text-sm truncate">{region.regionName}</p>
                              <p className="text-xs text-muted-foreground truncate">{region.category}</p>
                            </div>
                            <Badge variant="outline" className={`text-xs ${statusBadgeColors[region.status]}`}>
                              {region.status}
                            </Badge>
                          </div>
                        </button>
                      ))}
                    </div>
                  </ScrollArea>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
