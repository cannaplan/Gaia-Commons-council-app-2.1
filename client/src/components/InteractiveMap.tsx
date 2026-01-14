import { useState, useMemo } from "react";
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";
import { useGreenhouseLocations } from "@/hooks/use-gaia";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, MapPin, Users, Leaf, Building2, School } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

const statusColors: Record<string, string> = {
  "Operational": "#22c55e",
  "Construction": "#f59e0b",
  "Planning": "#3b82f6",
};

const statusBgColors: Record<string, string> = {
  "Operational": "bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20",
  "Construction": "bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20",
  "Planning": "bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/20",
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

export function InteractiveMap() {
  const { data: locations, isLoading, error } = useGreenhouseLocations();
  const [selectedLocation, setSelectedLocation] = useState<GreenhouseLocation | null>(null);
  const [hoveredLocation, setHoveredLocation] = useState<number | null>(null);

  const summaryStats = useMemo(() => {
    if (!locations) return { operational: 0, construction: 0, planning: 0, totalStudents: 0, totalFood: 0 };
    
    const operational = locations.filter(l => l.status === "Operational").length;
    const construction = locations.filter(l => l.status === "Construction").length;
    const planning = locations.filter(l => l.status === "Planning").length;
    const totalStudents = locations.reduce((sum, l) => sum + l.studentsServed, 0);
    const totalFood = locations.reduce((sum, l) => sum + l.annualFoodLbs, 0);
    
    return { operational, construction, planning, totalStudents, totalFood };
  }, [locations]);

  if (isLoading) {
    return (
      <Card className="h-full">
        <CardContent className="flex items-center justify-center h-[500px]">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="h-full">
        <CardContent className="flex items-center justify-center h-[500px]">
          <p className="text-destructive">Failed to load greenhouse locations</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-full overflow-hidden" data-testid="card-interactive-map">
      <CardHeader className="pb-2">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-primary" />
            Minnesota Greenhouse Network
          </CardTitle>
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
        </div>
        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mt-2">
          <span className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            {summaryStats.totalStudents.toLocaleString()} students served
          </span>
          <span className="flex items-center gap-1">
            <Leaf className="h-4 w-4" />
            {(summaryStats.totalFood / 1000000).toFixed(2)}M lbs produce/year
          </span>
        </div>
      </CardHeader>
      <CardContent className="p-0 relative">
        <div className="flex flex-col lg:flex-row">
          <div className="w-full lg:w-2/3 relative" style={{ height: "480px" }}>
            <ComposableMap
              projection="geoAlbersUsa"
              projectionConfig={{
                scale: 3500,
                center: [-94.5, 46.3]
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
                        stroke={isMN ? "hsl(var(--border))" : "hsl(var(--border) / 0.5)"}
                        strokeWidth={isMN ? 1.5 : 0.5}
                        style={{
                          default: { outline: "none" },
                          hover: { outline: "none", fill: isMN ? "hsl(var(--muted))" : "hsl(var(--muted) / 0.3)" },
                          pressed: { outline: "none" },
                        }}
                      />
                    );
                  })
                }
              </Geographies>
              {locations?.map((location) => (
                <Marker
                  key={location.id}
                  coordinates={[location.longitude, location.latitude]}
                  onClick={() => setSelectedLocation(location as GreenhouseLocation)}
                  onMouseEnter={() => setHoveredLocation(location.id)}
                  onMouseLeave={() => setHoveredLocation(null)}
                >
                  <circle
                    r={hoveredLocation === location.id ? 10 : 7}
                    fill={statusColors[location.status] || "#888"}
                    stroke="#fff"
                    strokeWidth={2}
                    style={{
                      cursor: "pointer",
                      transition: "r 0.2s ease-out",
                      filter: hoveredLocation === location.id ? "drop-shadow(0 0 6px rgba(0,0,0,0.3))" : "none"
                    }}
                  />
                  <circle
                    r={3}
                    fill="#fff"
                  />
                </Marker>
              ))}
            </ComposableMap>
          </div>
          
          <div className="w-full lg:w-1/3 border-t lg:border-t-0 lg:border-l border-border p-4 overflow-y-auto" style={{ maxHeight: "480px" }}>
            <AnimatePresence mode="wait">
              {selectedLocation ? (
                <motion.div
                  key={selectedLocation.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-4"
                >
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-semibold text-lg">{selectedLocation.name}</h3>
                    <Badge variant="outline" className={statusBgColors[selectedLocation.status]}>
                      {selectedLocation.status}
                    </Badge>
                  </div>
                  
                  <div className="grid gap-3 text-sm">
                    <div className="flex items-start gap-2">
                      <Building2 className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                      <div>
                        <p className="font-medium">Congressional District</p>
                        <p className="text-muted-foreground">{selectedLocation.congressionalDistrict}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-2">
                      <School className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                      <div>
                        <p className="font-medium">School District</p>
                        <p className="text-muted-foreground">{selectedLocation.schoolDistrict}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-2">
                      <Users className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                      <div>
                        <p className="font-medium">Students Served</p>
                        <p className="text-muted-foreground">{selectedLocation.studentsServed.toLocaleString()}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-2">
                      <Leaf className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                      <div>
                        <p className="font-medium">Annual Food Production</p>
                        <p className="text-muted-foreground">{selectedLocation.annualFoodLbs.toLocaleString()} lbs</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                      <div>
                        <p className="font-medium">Greenhouses</p>
                        <p className="text-muted-foreground">{selectedLocation.greenhouseCount} facilities ({selectedLocation.sqft.toLocaleString()} sq ft)</p>
                      </div>
                    </div>
                    
                    <div>
                      <p className="font-medium mb-1">Produce Types</p>
                      <div className="flex flex-wrap gap-1">
                        {selectedLocation.produceTypes.split(", ").map((produce, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {produce}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => setSelectedLocation(null)}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    data-testid="button-close-details"
                  >
                    Close details
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  key="placeholder"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center h-full text-center py-8"
                >
                  <MapPin className="h-12 w-12 text-muted-foreground/40 mb-4" />
                  <p className="text-muted-foreground">Click a greenhouse location on the map to view details</p>
                  <p className="text-sm text-muted-foreground/60 mt-2">
                    {locations?.length} locations across {new Set(locations?.map(l => l.congressionalDistrict)).size} congressional districts
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
        
        <div className="p-4 border-t border-border">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            {["MN-01", "MN-02", "MN-03", "MN-04", "MN-05", "MN-06", "MN-07", "MN-08"].map(district => {
              const districtLocations = locations?.filter(l => l.congressionalDistrict === district) || [];
              const totalStudents = districtLocations.reduce((sum, l) => sum + l.studentsServed, 0);
              return (
                <div key={district} className="text-center p-2 rounded-md bg-muted/50">
                  <p className="font-medium">{district}</p>
                  <p className="text-muted-foreground text-xs">
                    {districtLocations.length} site{districtLocations.length !== 1 ? 's' : ''} | {totalStudents.toLocaleString()} students
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
