import { useState, useMemo } from "react";
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";
import { useGreenhouseLocations, useMnSchoolDistricts } from "@/hooks/use-gaia";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Loader2, MapPin, Users, Leaf, Building2, School, Factory, X, Sun, Filter } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

const statusColors: Record<string, string> = {
  "Operational": "#22c55e",
  "Construction": "#f59e0b",
  "Planning": "#3b82f6",
  "High Priority": "#ec4899",
  "Active Planning": "#8b5cf6",
  "Evaluation": "#6b7280",
};

const statusBgColors: Record<string, string> = {
  "Operational": "bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20",
  "Construction": "bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20",
  "Planning": "bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/20",
  "High Priority": "bg-pink-500/10 text-pink-700 dark:text-pink-400 border-pink-500/20",
  "Active Planning": "bg-purple-500/10 text-purple-700 dark:text-purple-400 border-purple-500/20",
  "Evaluation": "bg-gray-500/10 text-gray-700 dark:text-gray-400 border-gray-500/20",
};

interface GreenhouseLocation {
  id: number;
  name: string;
  congressionalDistrict: string;
  schoolDistrict: string;
  latitude: number;
  longitude: number;
  greenhouseCount: number;
  studentsServed: number;
  annualFoodLbs: number;
  produceTypes: string;
  sqft: number;
  status: string;
}

interface SchoolDistrict {
  id: number;
  districtName: string;
  districtNumber: string;
  county: string;
  latitude: number;
  longitude: number;
  totalSchools: number;
  totalEnrollment: number;
  candidateSites: number;
  avgSouthFacingScore: number;
  estimatedGreenhouseSqft: number;
  topCandidateSchool: string;
  topCandidateSqft: number;
  topCandidateScore: number;
  status: string;
  notes: string;
}

type ViewMode = "greenhouses" | "districts";

export function InteractiveMap() {
  const { data: locations, isLoading: locationsLoading, error: locationsError } = useGreenhouseLocations();
  const { data: districts, isLoading: districtsLoading, error: districtsError } = useMnSchoolDistricts();
  const [selectedLocation, setSelectedLocation] = useState<GreenhouseLocation | null>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<SchoolDistrict | null>(null);
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>("districts");
  const [minSqft, setMinSqft] = useState<number>(5000);
  const [maxSqft, setMaxSqft] = useState<number>(15000);
  const [minScore, setMinScore] = useState<number>(0.8);

  const isLoading = locationsLoading || districtsLoading;

  const filteredDistricts = useMemo(() => {
    if (!districts) return [];
    return districts.filter(d => 
      d.topCandidateSqft >= minSqft && 
      d.topCandidateSqft <= maxSqft &&
      d.topCandidateScore >= minScore
    );
  }, [districts, minSqft, maxSqft, minScore]);

  const summaryStats = useMemo(() => {
    if (!locations) return { operational: 0, construction: 0, planning: 0, totalStudents: 0, totalFood: 0 };
    
    const operational = locations.filter(l => l.status === "Operational").length;
    const construction = locations.filter(l => l.status === "Construction").length;
    const planning = locations.filter(l => l.status === "Planning").length;
    const totalStudents = locations.reduce((sum, l) => sum + l.studentsServed, 0);
    const totalFood = locations.reduce((sum, l) => sum + l.annualFoodLbs, 0);
    
    return { operational, construction, planning, totalStudents, totalFood };
  }, [locations]);

  const districtStats = useMemo(() => {
    if (!filteredDistricts || filteredDistricts.length === 0) {
      return { total: 0, highPriority: 0, totalEnrollment: 0, totalCandidateSites: 0 };
    }
    return {
      total: filteredDistricts.length,
      highPriority: filteredDistricts.filter(d => d.status === "High Priority").length,
      totalEnrollment: filteredDistricts.reduce((sum, d) => sum + d.totalEnrollment, 0),
      totalCandidateSites: filteredDistricts.reduce((sum, d) => sum + d.candidateSites, 0),
    };
  }, [filteredDistricts]);

  if (isLoading) {
    return (
      <Card className="h-full">
        <CardContent className="flex items-center justify-center h-[600px]">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </CardContent>
      </Card>
    );
  }

  if (locationsError || districtsError) {
    return (
      <Card className="h-full">
        <CardContent className="flex items-center justify-center h-[600px]">
          <div className="text-center">
            <p className="text-destructive font-medium">Failed to load map data</p>
            <p className="text-sm text-muted-foreground mt-1">
              {locationsError ? "Could not load greenhouse locations. " : ""}
              {districtsError ? "Could not load school districts." : ""}
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-full overflow-hidden" data-testid="card-interactive-map">
      <CardHeader className="pb-2">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              Minnesota Greenhouse Network
            </CardTitle>
            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === "greenhouses" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("greenhouses")}
                data-testid="button-view-greenhouses"
              >
                <Factory className="h-4 w-4 mr-1" />
                Active Sites ({locations?.length || 0})
              </Button>
              <Button
                variant={viewMode === "districts" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("districts")}
                data-testid="button-view-districts"
              >
                <School className="h-4 w-4 mr-1" />
                All Districts ({filteredDistricts.length})
              </Button>
            </div>
          </div>
          
          {viewMode === "greenhouses" ? (
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="outline" className={statusBgColors["Operational"]}>
                <span className="w-2 h-2 rounded-full bg-green-500 mr-1.5" />
                {summaryStats.operational} Operational
              </Badge>
              <Badge variant="outline" className={statusBgColors["Construction"]}>
                <span className="w-2 h-2 rounded-full bg-amber-500 mr-1.5" />
                {summaryStats.construction} Construction
              </Badge>
              <Badge variant="outline" className={statusBgColors["Planning"]}>
                <span className="w-2 h-2 rounded-full bg-blue-500 mr-1.5" />
                {summaryStats.planning} Planning
              </Badge>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="outline" className={statusBgColors["High Priority"]}>
                  {districtStats.highPriority} High Priority
                </Badge>
                <span className="text-sm text-muted-foreground">
                  {districtStats.totalEnrollment.toLocaleString()} students • {districtStats.totalCandidateSites} candidate sites
                </span>
              </div>
              <div className="bg-muted/50 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-2">
                  <Filter className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Filter Greenhouse Candidates</span>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <div className="flex items-center gap-2">
                    <label className="text-xs text-muted-foreground whitespace-nowrap">Size:</label>
                    <select 
                      value={`${minSqft}-${maxSqft}`} 
                      onChange={(e) => {
                        const [min, max] = e.target.value.split("-").map(Number);
                        setMinSqft(min);
                        setMaxSqft(max);
                      }}
                      className="h-8 px-2 rounded-md border border-input bg-background text-sm"
                      data-testid="select-sqft-range"
                    >
                      <option value="5000-15000">5K - 15K sqft</option>
                      <option value="5000-10000">5K - 10K sqft</option>
                      <option value="10000-15000">10K - 15K sqft</option>
                      <option value="7000-12000">7K - 12K sqft</option>
                    </select>
                  </div>
                  <div className="flex items-center gap-2">
                    <Sun className="h-4 w-4 text-amber-500" />
                    <label className="text-xs text-muted-foreground whitespace-nowrap">Min Score:</label>
                    <select 
                      value={minScore.toString()} 
                      onChange={(e) => setMinScore(Number(e.target.value))}
                      className="h-8 px-2 rounded-md border border-input bg-background text-sm"
                      data-testid="select-min-score"
                    >
                      <option value="0.7">70%</option>
                      <option value="0.75">75%</option>
                      <option value="0.8">80%</option>
                      <option value="0.85">85%</option>
                      <option value="0.9">90%</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="p-0 relative">
        <div className="flex flex-col lg:flex-row">
          <div className="w-full lg:w-2/3 relative" style={{ height: "520px" }}>
            <ComposableMap
              projection="geoMercator"
              projectionConfig={{
                scale: 2800,
                center: [-94.5, 46.0]
              }}
              style={{ width: "100%", height: "100%" }}
            >
              <Geographies geography={geoUrl}>
                {({ geographies }: { geographies: Array<{ rsmKey: string; properties: { name: string } }> }) =>
                  geographies.map((geo) => {
                    const isMN = geo.properties.name === "Minnesota";
                    return (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        fill={isMN ? "hsl(var(--muted))" : "hsl(var(--muted) / 0.3)"}
                        stroke={isMN ? "hsl(var(--primary) / 0.4)" : "hsl(var(--border) / 0.5)"}
                        strokeWidth={isMN ? 2 : 0.5}
                        style={{
                          default: { outline: "none" },
                          hover: { outline: "none" },
                          pressed: { outline: "none" },
                        }}
                      />
                    );
                  })
                }
              </Geographies>
              
              {viewMode === "districts" && filteredDistricts.map((district) => {
                const isSelected = selectedDistrict?.id === district.id;
                const isHovered = hoveredId === district.id;
                const color = statusColors[district.status] || "#6b7280";
                const size = Math.max(4, Math.min(10, district.candidateSites * 0.6));
                
                return (
                  <Marker
                    key={`district-${district.id}`}
                    coordinates={[district.longitude, district.latitude]}
                    onClick={() => {
                      setSelectedDistrict(district);
                      setSelectedLocation(null);
                    }}
                    onMouseEnter={() => setHoveredId(district.id)}
                    onMouseLeave={() => setHoveredId(null)}
                  >
                    <motion.circle
                      r={isHovered || isSelected ? size * 1.3 : size}
                      fill={color}
                      fillOpacity={isSelected ? 1 : 0.7}
                      stroke={isSelected ? "hsl(var(--foreground))" : "white"}
                      strokeWidth={isSelected ? 2 : 1}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      style={{ cursor: "pointer" }}
                    />
                  </Marker>
                );
              })}
              
              {viewMode === "greenhouses" && locations?.map((location) => {
                const isSelected = selectedLocation?.id === location.id;
                const isHovered = hoveredId === location.id;
                const color = statusColors[location.status] || "#888";
                
                return (
                  <Marker
                    key={`location-${location.id}`}
                    coordinates={[location.longitude, location.latitude]}
                    onClick={() => {
                      setSelectedLocation(location as GreenhouseLocation);
                      setSelectedDistrict(null);
                    }}
                    onMouseEnter={() => setHoveredId(location.id)}
                    onMouseLeave={() => setHoveredId(null)}
                  >
                    <circle
                      r={isHovered || isSelected ? 10 : 7}
                      fill={color}
                      stroke="#fff"
                      strokeWidth={2}
                      style={{
                        cursor: "pointer",
                        transition: "r 0.2s ease-out",
                        filter: isHovered || isSelected ? "drop-shadow(0 0 6px rgba(0,0,0,0.3))" : "none"
                      }}
                    />
                    <circle r={3} fill="#fff" />
                  </Marker>
                );
              })}
            </ComposableMap>
          </div>
          
          <div className="w-full lg:w-1/3 border-t lg:border-t-0 lg:border-l border-border">
            <AnimatePresence mode="wait">
              {selectedDistrict ? (
                <motion.div
                  key={`district-${selectedDistrict.id}`}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="p-4 h-full"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-lg">{selectedDistrict.districtName}</h3>
                      <p className="text-sm text-muted-foreground">{selectedDistrict.county} County • District #{selectedDistrict.districtNumber}</p>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => setSelectedDistrict(null)}
                      data-testid="button-close-district"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <Badge variant="outline" className={statusBgColors[selectedDistrict.status]}>
                    {selectedDistrict.status}
                  </Badge>

                  <div className="mt-4 p-3 bg-primary/10 rounded-lg border border-primary/20" data-testid="district-top-candidate">
                    <div className="flex items-center gap-2 mb-2">
                      <Sun className="h-4 w-4 text-primary" />
                      <span className="font-medium text-sm">Top Candidate Site</span>
                    </div>
                    <p className="font-semibold" data-testid="text-top-candidate-school">{selectedDistrict.topCandidateSchool}</p>
                    <div className="flex items-center gap-4 mt-2 text-sm">
                      <span data-testid="text-top-candidate-sqft">{selectedDistrict.topCandidateSqft.toLocaleString()} sqft</span>
                      <span className="text-primary font-medium" data-testid="text-top-candidate-score">
                        {(selectedDistrict.topCandidateScore * 100).toFixed(0)}% south-facing score
                      </span>
                    </div>
                  </div>

                  <ScrollArea className="h-[280px] mt-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between py-2 border-b border-border/50" data-testid="row-total-schools">
                        <span className="flex items-center gap-2 text-sm text-muted-foreground">
                          <School className="h-4 w-4" />
                          Total Schools
                        </span>
                        <span className="font-semibold">{selectedDistrict.totalSchools}</span>
                      </div>
                      <div className="flex items-center justify-between py-2 border-b border-border/50" data-testid="row-total-enrollment">
                        <span className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Users className="h-4 w-4" />
                          Total Enrollment
                        </span>
                        <span className="font-semibold">{selectedDistrict.totalEnrollment.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center justify-between py-2 border-b border-border/50" data-testid="row-candidate-sites">
                        <span className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Building2 className="h-4 w-4" />
                          Candidate Sites
                        </span>
                        <span className="font-semibold">{selectedDistrict.candidateSites}</span>
                      </div>
                      <div className="flex items-center justify-between py-2 border-b border-border/50" data-testid="row-avg-score">
                        <span className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Sun className="h-4 w-4" />
                          Avg South-Facing Score
                        </span>
                        <span className="font-semibold">{(selectedDistrict.avgSouthFacingScore * 100).toFixed(0)}%</span>
                      </div>
                      <div className="flex items-center justify-between py-2 border-b border-border/50" data-testid="row-est-sqft">
                        <span className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Factory className="h-4 w-4" />
                          Est. Greenhouse Sqft
                        </span>
                        <span className="font-semibold">{selectedDistrict.estimatedGreenhouseSqft.toLocaleString()}</span>
                      </div>
                      <div className="py-2" data-testid="row-notes">
                        <p className="text-sm text-muted-foreground mb-1">Notes</p>
                        <p className="text-sm">{selectedDistrict.notes}</p>
                      </div>
                    </div>
                  </ScrollArea>
                </motion.div>
              ) : selectedLocation ? (
                <motion.div
                  key={`location-${selectedLocation.id}`}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="p-4 space-y-4"
                >
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-semibold text-lg">{selectedLocation.name}</h3>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className={statusBgColors[selectedLocation.status]}>
                        {selectedLocation.status}
                      </Badge>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => setSelectedLocation(null)}
                        data-testid="button-close-location"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="text-sm text-muted-foreground space-y-1">
                    <div className="flex items-center gap-2">
                      <School className="h-4 w-4" />
                      {selectedLocation.schoolDistrict}
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      {selectedLocation.congressionalDistrict}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-muted/50 rounded-lg" data-testid="metric-greenhouses">
                      <p className="text-xs text-muted-foreground">Greenhouses</p>
                      <p className="text-xl font-bold">{selectedLocation.greenhouseCount}</p>
                    </div>
                    <div className="p-3 bg-muted/50 rounded-lg" data-testid="metric-students-served">
                      <p className="text-xs text-muted-foreground">Students Served</p>
                      <p className="text-xl font-bold">{selectedLocation.studentsServed.toLocaleString()}</p>
                    </div>
                    <div className="p-3 bg-muted/50 rounded-lg" data-testid="metric-annual-produce">
                      <p className="text-xs text-muted-foreground">Annual Produce</p>
                      <p className="text-xl font-bold">{(selectedLocation.annualFoodLbs / 1000).toFixed(0)}K lbs</p>
                    </div>
                    <div className="p-3 bg-muted/50 rounded-lg" data-testid="metric-total-sqft">
                      <p className="text-xs text-muted-foreground">Total Sqft</p>
                      <p className="text-xl font-bold">{selectedLocation.sqft.toLocaleString()}</p>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-medium mb-2">Produce Types</p>
                    <div className="flex flex-wrap gap-1">
                      {selectedLocation.produceTypes.split(", ").map((type, i) => (
                        <Badge key={i} variant="secondary" className="text-xs">
                          {type}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="placeholder"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="p-4 h-full flex flex-col"
                >
                  <h3 className="font-semibold mb-2">
                    {viewMode === "districts" ? "Select a School District" : "Select a Location"}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {viewMode === "districts" 
                      ? "Click on a marker to view greenhouse candidate sites and south-facing analysis."
                      : "Click on a marker to view greenhouse details and production data."}
                  </p>
                  <ScrollArea className="flex-1">
                    <div className="space-y-2">
                      {viewMode === "districts" ? (
                        filteredDistricts.slice(0, 20).map((district) => (
                          <button
                            key={district.id}
                            onClick={() => setSelectedDistrict(district)}
                            onMouseEnter={() => setHoveredId(district.id)}
                            onMouseLeave={() => setHoveredId(null)}
                            className="w-full text-left p-3 rounded-lg border border-border hover-elevate transition-colors"
                            data-testid={`button-district-${district.id}`}
                          >
                            <div className="flex items-center justify-between gap-2">
                              <div className="min-w-0 flex-1">
                                <p className="font-medium text-sm truncate">{district.districtName}</p>
                                <p className="text-xs text-muted-foreground">
                                  {district.candidateSites} sites • {(district.topCandidateScore * 100).toFixed(0)}% score
                                </p>
                              </div>
                              <Badge variant="outline" className={`text-xs ${statusBgColors[district.status]}`}>
                                {district.status === "High Priority" ? "Priority" : district.status}
                              </Badge>
                            </div>
                          </button>
                        ))
                      ) : (
                        locations?.map((location) => (
                          <button
                            key={location.id}
                            onClick={() => setSelectedLocation(location as GreenhouseLocation)}
                            onMouseEnter={() => setHoveredId(location.id)}
                            onMouseLeave={() => setHoveredId(null)}
                            className="w-full text-left p-3 rounded-lg border border-border hover-elevate transition-colors"
                            data-testid={`button-location-${location.id}`}
                          >
                            <div className="flex items-center justify-between gap-2">
                              <div className="min-w-0 flex-1">
                                <p className="font-medium text-sm truncate">{location.name}</p>
                                <p className="text-xs text-muted-foreground">
                                  {location.studentsServed.toLocaleString()} students
                                </p>
                              </div>
                              <Badge variant="outline" className={`text-xs ${statusBgColors[location.status]}`}>
                                {location.status}
                              </Badge>
                            </div>
                          </button>
                        ))
                      )}
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
