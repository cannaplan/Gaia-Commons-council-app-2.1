import { useState } from "react";
import { motion } from "framer-motion";
import { Header } from "@/components/Header";
import { StatsCard, StatItem } from "@/components/StatsCard";
import { Timeline } from "@/components/Timeline";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  usePilotStats, 
  useEndowmentStats, 
  useTimeline,
  useFinancialMetrics,
  useClimateMetrics,
  useSlides,
  useHistoricalFinancials,
  useSchoolClusters,
  useSchools,
  useScaleProjections,
  useEnvironmentalImpact,
  useJobCreation,
  useLegalFramework,
  useEndowmentProjections,
  useExpandedJobs,
  useK12Curriculum,
  useCoalitionPartners,
  useFundingSources,
  useTransparencyFeatures,
  useAccountabilityMechanisms,
  useTribalPartnerships,
  useImplementationTimeline,
  usePoliticalRoadmap,
  useStressTests
} from "@/hooks/use-gaia";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from "recharts";
import { 
  Sprout, 
  Landmark, 
  Users, 
  Ruler, 
  School, 
  Activity,
  Trees,
  DollarSign,
  TrendingUp,
  Loader2,
  Thermometer,
  Wind,
  Presentation,
  Calculator,
  Leaf,
  Target,
  Shield,
  Vote,
  PiggyBank,
  Scale,
  Building2,
  Coins,
  Globe,
  MapPin,
  Briefcase,
  Factory,
  Droplets,
  Zap,
  Recycle,
  GraduationCap,
  Globe2,
  Map,
  Building,
  BookOpen,
  Users2,
  Banknote,
  HandCoins,
  Handshake,
  Clock,
  Eye,
  ShieldCheck,
  ClipboardCheck,
  AlertTriangle,
  Feather,
  Calendar,
  MapPinned,
  ShieldAlert,
  CheckCircle2
} from "lucide-react";

const SCALE_LABELS: Record<string, string> = {
  pilot: "Pilot (6 Schools)",
  statewide: "Statewide (275 Schools)",
  national: "National (130K Schools)",
  global: "Global (1M Schools)"
};

const SCALE_COLORS = {
  pilot: "bg-blue-500",
  statewide: "bg-emerald-500",
  national: "bg-purple-500",
  global: "bg-amber-500"
};

function formatLargeNumber(num: number): string {
  if (num >= 1e12) return `$${(num / 1e12).toFixed(1)}T`;
  if (num >= 1e9) return `$${(num / 1e9).toFixed(1)}B`;
  if (num >= 1e6) return `$${(num / 1e6).toFixed(1)}M`;
  if (num >= 1e3) return `$${(num / 1e3).toFixed(0)}K`;
  return `$${num.toFixed(0)}`;
}

function formatNumber(num: number): string {
  if (num >= 1e9) return `${(num / 1e9).toFixed(1)}B`;
  if (num >= 1e6) return `${(num / 1e6).toFixed(1)}M`;
  if (num >= 1e3) return `${(num / 1e3).toFixed(0)}K`;
  return num.toLocaleString();
}

export default function Dashboard() {
  const [selectedScale, setSelectedScale] = useState("pilot");
  
  const { data: pilot, isLoading: loadingPilot } = usePilotStats();
  const { data: endowment, isLoading: loadingEndowment } = useEndowmentStats();
  const { data: timeline, isLoading: loadingTimeline } = useTimeline();
  const { data: financials, isLoading: loadingFinancials } = useFinancialMetrics();
  const { data: climate, isLoading: loadingClimate } = useClimateMetrics();
  const { data: slides, isLoading: loadingSlides } = useSlides();
  const { data: historicalData, isLoading: loadingHistorical } = useHistoricalFinancials();
  const { data: clusters, isLoading: loadingClusters } = useSchoolClusters();
  const { data: schoolsList, isLoading: loadingSchools } = useSchools();
  const { data: scaleProjections, isLoading: loadingScales } = useScaleProjections();
  const { data: envImpacts, isLoading: loadingEnv } = useEnvironmentalImpact();
  const { data: jobData, isLoading: loadingJobs } = useJobCreation();
  const { data: endowmentProjections } = useEndowmentProjections();
  const { data: expandedJobs } = useExpandedJobs();
  const { data: curriculum } = useK12Curriculum();
  const { data: coalition } = useCoalitionPartners();
  const { data: fundingSources } = useFundingSources();
  const { data: transparencyFeatures } = useTransparencyFeatures();
  const { data: accountabilityMechanisms } = useAccountabilityMechanisms();
  const { data: tribalPartnerships } = useTribalPartnerships();
  const { data: implementationTimeline } = useImplementationTimeline();
  const { data: politicalRoadmap } = usePoliticalRoadmap();
  const { data: stressTests } = useStressTests();
  const { data: legalFramework, isLoading: loadingLegal } = useLegalFramework();

  const isLoading = loadingPilot || loadingEndowment || loadingTimeline || loadingFinancials || 
    loadingClimate || loadingSlides || loadingHistorical || loadingClusters || loadingSchools || 
    loadingScales || loadingEnv || loadingJobs || loadingLegal;

  const currentScale = scaleProjections?.find(s => s.scale === selectedScale);
  const currentEnv = envImpacts?.find(e => e.scale === selectedScale);
  const currentJobs = jobData?.find(j => j.scale === selectedScale);

  const chartData = historicalData?.map(h => ({
    period: `${h.year} Q${h.quarter}`,
    revenue: h.totalRevenue / 1000,
    opex: h.totalOpex / 1000,
    yield: h.totalYieldLbs / 1000,
    endowment: h.endowmentValue / 1000000000,
    schools: h.schoolCount,
    students: h.studentsServed
  })) || [];

  const scaleComparisonData = scaleProjections?.map(s => ({
    name: s.scale.charAt(0).toUpperCase() + s.scale.slice(1),
    schools: s.schools,
    students: s.students,
    jobs: s.jobs,
    meals: s.mealsPerDay,
    co2: s.co2TonsAnnual
  })) || [];

  const jobBreakdownData = currentJobs ? [
    { name: "Direct Jobs", value: currentJobs.directJobs, color: "#3b82f6" },
    { name: "Indirect Jobs", value: currentJobs.indirectJobs, color: "#22c55e" },
    { name: "Induced Jobs", value: currentJobs.inducedJobs, color: "#f59e0b" }
  ] : [];

  if (isLoading) {
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-background to-secondary/30">
        <Loader2 className="h-10 w-10 text-primary animate-spin mb-4" data-testid="loader-main" />
        <p className="text-muted-foreground font-medium animate-pulse">Loading Gaia Commons Platform v4.1...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/30 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <Header />
        </motion.div>

        {/* Scale Selector Tabs */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="mb-8">
          <Card className="glass-panel" data-testid="card-scale-selector">
            <CardHeader className="flex flex-row items-center gap-2 space-y-0 pb-4">
              <Globe className="h-5 w-5 text-primary" />
              <CardTitle className="text-lg font-semibold">Multi-Scale Deployment Dashboard — From Pilot to Global</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs value={selectedScale} onValueChange={setSelectedScale} className="w-full">
                <TabsList className="grid w-full grid-cols-4 mb-6" data-testid="tabs-scale">
                  <TabsTrigger value="pilot" data-testid="tab-pilot" className="flex items-center gap-2">
                    <School className="h-4 w-4" />
                    <span className="hidden sm:inline">Pilot</span>
                  </TabsTrigger>
                  <TabsTrigger value="statewide" data-testid="tab-statewide" className="flex items-center gap-2">
                    <Map className="h-4 w-4" />
                    <span className="hidden sm:inline">Statewide</span>
                  </TabsTrigger>
                  <TabsTrigger value="national" data-testid="tab-national" className="flex items-center gap-2">
                    <Building className="h-4 w-4" />
                    <span className="hidden sm:inline">National</span>
                  </TabsTrigger>
                  <TabsTrigger value="global" data-testid="tab-global" className="flex items-center gap-2">
                    <Globe2 className="h-4 w-4" />
                    <span className="hidden sm:inline">Global</span>
                  </TabsTrigger>
                </TabsList>

                {currentScale && (
                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    <div className="p-4 bg-blue-50 dark:bg-blue-950/30 rounded-xl border border-blue-100 dark:border-blue-900/50 text-center">
                      <School className="h-5 w-5 text-blue-600 mx-auto mb-2" />
                      <p className="text-xs text-blue-800 dark:text-blue-400 font-medium">Schools</p>
                      <p className="text-xl font-bold text-blue-700 dark:text-blue-300" data-testid="text-scale-schools">{formatNumber(currentScale.schools)}</p>
                    </div>
                    <div className="p-4 bg-emerald-50 dark:bg-emerald-950/30 rounded-xl border border-emerald-100 dark:border-emerald-900/50 text-center">
                      <Users className="h-5 w-5 text-emerald-600 mx-auto mb-2" />
                      <p className="text-xs text-emerald-800 dark:text-emerald-400 font-medium">Students</p>
                      <p className="text-xl font-bold text-emerald-700 dark:text-emerald-300" data-testid="text-scale-students">{formatNumber(currentScale.students)}</p>
                    </div>
                    <div className="p-4 bg-purple-50 dark:bg-purple-950/30 rounded-xl border border-purple-100 dark:border-purple-900/50 text-center">
                      <Sprout className="h-5 w-5 text-purple-600 mx-auto mb-2" />
                      <p className="text-xs text-purple-800 dark:text-purple-400 font-medium">Greenhouses</p>
                      <p className="text-xl font-bold text-purple-700 dark:text-purple-300" data-testid="text-scale-greenhouses">{formatNumber(currentScale.greenhouses)}</p>
                    </div>
                    <div className="p-4 bg-amber-50 dark:bg-amber-950/30 rounded-xl border border-amber-100 dark:border-amber-900/50 text-center">
                      <DollarSign className="h-5 w-5 text-amber-600 mx-auto mb-2" />
                      <p className="text-xs text-amber-800 dark:text-amber-400 font-medium">CAPEX</p>
                      <p className="text-xl font-bold text-amber-700 dark:text-amber-300" data-testid="text-scale-capex">{formatLargeNumber(currentScale.capex)}</p>
                    </div>
                    <div className="p-4 bg-green-50 dark:bg-green-950/30 rounded-xl border border-green-100 dark:border-green-900/50 text-center">
                      <TrendingUp className="h-5 w-5 text-green-600 mx-auto mb-2" />
                      <p className="text-xs text-green-800 dark:text-green-400 font-medium">5-Yr NPV</p>
                      <p className="text-xl font-bold text-green-700 dark:text-green-300" data-testid="text-scale-npv">{formatLargeNumber(currentScale.npv5yr)}</p>
                    </div>
                    <div className="p-4 bg-rose-50 dark:bg-rose-950/30 rounded-xl border border-rose-100 dark:border-rose-900/50 text-center">
                      <Target className="h-5 w-5 text-rose-600 mx-auto mb-2" />
                      <p className="text-xs text-rose-800 dark:text-rose-400 font-medium">ROI</p>
                      <p className="text-xl font-bold text-rose-700 dark:text-rose-300" data-testid="text-scale-roi">{currentScale.roiPct}%</p>
                    </div>
                  </div>
                )}
              </Tabs>
            </CardContent>
          </Card>
        </motion.div>

        {/* Pilot School Clusters (only show for pilot scale) */}
        {selectedScale === "pilot" && clusters && clusters.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.15 }} className="mb-8">
            <Card className="glass-panel" data-testid="card-school-clusters">
              <CardHeader className="flex flex-row items-center gap-2 space-y-0 pb-4">
                <MapPin className="h-5 w-5 text-primary" />
                <CardTitle className="text-lg font-semibold">Minnesota Pilot School Clusters — St. Paul & Mendota Heights</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {clusters.map(cluster => {
                    const clusterSchools = schoolsList?.filter(s => s.clusterId === cluster.id) || [];
                    return (
                      <div key={cluster.id} className="p-4 bg-muted/30 rounded-xl border border-border/50" data-testid={`cluster-${cluster.name.toLowerCase().replace(' ', '-')}`}>
                        <div className="flex items-center gap-3 mb-4">
                          <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                            <Building2 className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-foreground">{cluster.name} Cluster</h3>
                            <p className="text-sm text-muted-foreground">{cluster.region}</p>
                          </div>
                        </div>
                        <div className="grid grid-cols-4 gap-3 mb-4">
                          <div className="text-center p-2 bg-background rounded-lg">
                            <p className="text-xs text-muted-foreground">Students</p>
                            <p className="font-semibold text-foreground">{cluster.totalStudents.toLocaleString()}</p>
                          </div>
                          <div className="text-center p-2 bg-background rounded-lg">
                            <p className="text-xs text-muted-foreground">Yr 5 Est.</p>
                            <p className="font-semibold text-emerald-600">{cluster.yr5Students.toLocaleString()}</p>
                          </div>
                          <div className="text-center p-2 bg-background rounded-lg">
                            <p className="text-xs text-muted-foreground">Sq Ft</p>
                            <p className="font-semibold text-foreground">{(cluster.totalSqft / 1000).toFixed(1)}K</p>
                          </div>
                          <div className="text-center p-2 bg-background rounded-lg">
                            <p className="text-xs text-muted-foreground">Greenhouses</p>
                            <p className="font-semibold text-foreground">{cluster.greenhouses}</p>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Individual Schools</p>
                          {clusterSchools.map(school => (
                            <div key={school.id} className="flex items-center justify-between p-2 bg-background rounded-lg border border-border/30">
                              <div className="flex items-center gap-2">
                                <GraduationCap className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm font-medium">{school.name}</span>
                                <Badge variant="outline" className="text-xs">{school.grades}</Badge>
                              </div>
                              <div className="text-right">
                                <span className="text-sm text-muted-foreground">{school.enrollment} students</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Environmental Impact & Job Creation */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Environmental Impact */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
            <Card className="glass-panel h-full" data-testid="card-environmental">
              <CardHeader className="flex flex-row items-center gap-2 space-y-0 pb-4">
                <Leaf className="h-5 w-5 text-primary" />
                <CardTitle className="text-lg font-semibold">Environmental Impact — {SCALE_LABELS[selectedScale]}</CardTitle>
              </CardHeader>
              <CardContent>
                {currentEnv && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 rounded-xl border border-green-100 dark:border-green-900/50">
                        <div className="flex items-center gap-2 mb-2">
                          <Trees className="h-4 w-4 text-green-600" />
                          <span className="text-xs font-medium text-green-800 dark:text-green-400 uppercase">CO2 Sequestered</span>
                        </div>
                        <p className="text-2xl font-bold text-green-700 dark:text-green-300" data-testid="text-env-co2">
                          {formatNumber(currentEnv.co2SequesteredTons)} tons/yr
                        </p>
                      </div>
                      <div className="p-4 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30 rounded-xl border border-blue-100 dark:border-blue-900/50">
                        <div className="flex items-center gap-2 mb-2">
                          <Droplets className="h-4 w-4 text-blue-600" />
                          <span className="text-xs font-medium text-blue-800 dark:text-blue-400 uppercase">Water Saved</span>
                        </div>
                        <p className="text-2xl font-bold text-blue-700 dark:text-blue-300" data-testid="text-env-water">
                          {formatNumber(currentEnv.waterSavedGallons)} gal
                        </p>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                      <div className="text-center p-3 bg-muted/50 rounded-lg">
                        <Map className="h-4 w-4 text-muted-foreground mx-auto mb-1" />
                        <p className="text-xs text-muted-foreground">Land Preserved</p>
                        <p className="font-semibold text-foreground">{formatNumber(currentEnv.landPreservedAcres)} acres</p>
                      </div>
                      <div className="text-center p-3 bg-muted/50 rounded-lg">
                        <Factory className="h-4 w-4 text-muted-foreground mx-auto mb-1" />
                        <p className="text-xs text-muted-foreground">Food Miles Cut</p>
                        <p className="font-semibold text-foreground">{formatNumber(currentEnv.foodMilesReduced)}</p>
                      </div>
                      <div className="text-center p-3 bg-muted/50 rounded-lg">
                        <Zap className="h-4 w-4 text-muted-foreground mx-auto mb-1" />
                        <p className="text-xs text-muted-foreground">Renewable Energy</p>
                        <p className="font-semibold text-foreground">{currentEnv.renewableEnergyPct}%</p>
                      </div>
                    </div>
                    <div className="p-3 bg-primary/5 rounded-lg border border-primary/10">
                      <div className="flex items-center gap-2">
                        <Recycle className="h-4 w-4 text-primary" />
                        <span className="text-sm font-medium text-foreground">Waste Reduced: {formatNumber(currentEnv.wasteReducedTons)} tons/year</span>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Job Creation */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.25 }}>
            <Card className="glass-panel h-full" data-testid="card-jobs">
              <CardHeader className="flex flex-row items-center gap-2 space-y-0 pb-4">
                <Briefcase className="h-5 w-5 text-primary" />
                <CardTitle className="text-lg font-semibold">Job Creation & Economic Impact — {SCALE_LABELS[selectedScale]}</CardTitle>
              </CardHeader>
              <CardContent>
                {currentJobs && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-950/30 dark:to-indigo-950/30 rounded-xl border border-purple-100 dark:border-purple-900/50">
                        <div className="flex items-center gap-2 mb-2">
                          <Users className="h-4 w-4 text-purple-600" />
                          <span className="text-xs font-medium text-purple-800 dark:text-purple-400 uppercase">Total Jobs Created</span>
                        </div>
                        <p className="text-2xl font-bold text-purple-700 dark:text-purple-300" data-testid="text-jobs-total">
                          {formatNumber(currentJobs.totalJobs)}
                        </p>
                      </div>
                      <div className="p-4 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30 rounded-xl border border-amber-100 dark:border-amber-900/50">
                        <div className="flex items-center gap-2 mb-2">
                          <DollarSign className="h-4 w-4 text-amber-600" />
                          <span className="text-xs font-medium text-amber-800 dark:text-amber-400 uppercase">Economic Impact</span>
                        </div>
                        <p className="text-2xl font-bold text-amber-700 dark:text-amber-300" data-testid="text-jobs-impact">
                          {formatLargeNumber(currentJobs.economicImpact)}
                        </p>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                      <div className="text-center p-3 bg-blue-50 dark:bg-blue-950/30 rounded-lg border border-blue-100 dark:border-blue-900/50">
                        <p className="text-xs text-blue-800 dark:text-blue-400 font-medium">Direct Jobs</p>
                        <p className="font-semibold text-blue-700 dark:text-blue-300">{formatNumber(currentJobs.directJobs)}</p>
                      </div>
                      <div className="text-center p-3 bg-green-50 dark:bg-green-950/30 rounded-lg border border-green-100 dark:border-green-900/50">
                        <p className="text-xs text-green-800 dark:text-green-400 font-medium">Indirect Jobs</p>
                        <p className="font-semibold text-green-700 dark:text-green-300">{formatNumber(currentJobs.indirectJobs)}</p>
                      </div>
                      <div className="text-center p-3 bg-amber-50 dark:bg-amber-950/30 rounded-lg border border-amber-100 dark:border-amber-900/50">
                        <p className="text-xs text-amber-800 dark:text-amber-400 font-medium">Induced Jobs</p>
                        <p className="font-semibold text-amber-700 dark:text-amber-300">{formatNumber(currentJobs.inducedJobs)}</p>
                      </div>
                    </div>
                    <div className="p-3 bg-primary/5 rounded-lg border border-primary/10">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Average Salary</span>
                        <span className="font-semibold text-foreground">${currentJobs.avgSalary.toLocaleString()}/year</span>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Scale Comparison Charts */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }} className="mb-8">
          <Card className="glass-panel" data-testid="card-scale-comparison">
            <CardHeader className="flex flex-row items-center gap-2 space-y-0 pb-4">
              <TrendingUp className="h-5 w-5 text-primary" />
              <CardTitle className="text-lg font-semibold">Scale Comparison — Pilot to Global Deployment Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="h-72">
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">Jobs Created by Scale</p>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={scaleComparisonData}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                      <XAxis dataKey="name" className="text-xs" />
                      <YAxis className="text-xs" tickFormatter={(v) => formatNumber(v)} />
                      <Tooltip formatter={(value: number) => formatNumber(value)} />
                      <Bar dataKey="jobs" fill="#8b5cf6" radius={[4, 4, 0, 0]} name="Jobs" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="h-72">
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">Meals Per Day by Scale</p>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={scaleComparisonData}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                      <XAxis dataKey="name" className="text-xs" />
                      <YAxis className="text-xs" tickFormatter={(v) => formatNumber(v)} />
                      <Tooltip formatter={(value: number) => formatNumber(value)} />
                      <Bar dataKey="meals" fill="#22c55e" radius={[4, 4, 0, 0]} name="Meals/Day" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Financial Engine & Climate (original sections) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.35 }}>
            <Card className="glass-panel card-hover h-full" data-testid="card-financials">
              <CardHeader className="flex flex-row items-center gap-2 space-y-0 pb-2">
                <Calculator className="h-5 w-5 text-primary" />
                <CardTitle className="text-lg font-semibold">Financial Projection Engine v4.1 — Pilot Program ROI</CardTitle>
                {financials && <Badge variant="secondary" className="ml-auto">{financials.schoolCount} Schools</Badge>}
              </CardHeader>
              <CardContent>
                {financials && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 p-4 rounded-xl border border-green-100 dark:border-green-900/50">
                        <div className="flex items-center gap-2 mb-2">
                          <DollarSign className="h-4 w-4 text-green-600" />
                          <span className="text-xs font-medium text-green-800 dark:text-green-400 uppercase">5-Year NPV</span>
                        </div>
                        <p className="text-2xl font-bold text-green-700 dark:text-green-300" data-testid="text-npv">
                          ${(financials.npv10yr / 1e6).toFixed(2)}M
                        </p>
                      </div>
                      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 p-4 rounded-xl border border-blue-100 dark:border-blue-900/50">
                        <div className="flex items-center gap-2 mb-2">
                          <TrendingUp className="h-4 w-4 text-blue-600" />
                          <span className="text-xs font-medium text-blue-800 dark:text-blue-400 uppercase">Return on Investment</span>
                        </div>
                        <p className="text-2xl font-bold text-blue-700 dark:text-blue-300" data-testid="text-roi">
                          {financials.roi10yrPct}%
                        </p>
                      </div>
                    </div>
                    <div className="grid grid-cols-4 gap-3">
                      <div className="text-center p-3 bg-muted/50 rounded-lg">
                        <p className="text-xs text-muted-foreground">CAPEX</p>
                        <p className="font-semibold text-foreground">${(financials.initialInvestment / 1e6).toFixed(1)}M</p>
                      </div>
                      <div className="text-center p-3 bg-muted/50 rounded-lg">
                        <p className="text-xs text-muted-foreground">Annual OpEx</p>
                        <p className="font-semibold text-foreground">${(financials.annualOpex / 1e3).toFixed(0)}K</p>
                      </div>
                      <div className="text-center p-3 bg-muted/50 rounded-lg">
                        <p className="text-xs text-muted-foreground">Annual Revenue</p>
                        <p className="font-semibold text-foreground">${(financials.totalAnnualRevenue / 1e6).toFixed(1)}M</p>
                      </div>
                      <div className="text-center p-3 bg-muted/50 rounded-lg">
                        <p className="text-xs text-muted-foreground">Payback</p>
                        <p className="font-semibold text-foreground">{financials.paybackYears} yrs</p>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.4 }}>
            <Card className="glass-panel card-hover h-full" data-testid="card-climate">
              <CardHeader className="flex flex-row items-center gap-2 space-y-0 pb-2">
                <Thermometer className="h-5 w-5 text-primary" />
                <CardTitle className="text-lg font-semibold">Year-Round Aquaponics & Climate Control v5.0</CardTitle>
              </CardHeader>
              <CardContent>
                {climate && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-950/30 dark:to-amber-950/30 p-4 rounded-xl border border-orange-100 dark:border-orange-900/50">
                        <div className="flex items-center gap-2 mb-2">
                          <Thermometer className="h-4 w-4 text-orange-600" />
                          <span className="text-xs font-medium text-orange-800 dark:text-orange-400 uppercase">Internal Temp</span>
                        </div>
                        <p className="text-2xl font-bold text-orange-700 dark:text-orange-300">{climate.avgTemp}°F</p>
                      </div>
                      <div className="bg-gradient-to-br from-slate-50 to-gray-50 dark:from-slate-950/30 dark:to-gray-950/30 p-4 rounded-xl border border-slate-100 dark:border-slate-900/50">
                        <div className="flex items-center gap-2 mb-2">
                          <Wind className="h-4 w-4 text-slate-600" />
                          <span className="text-xs font-medium text-slate-800 dark:text-slate-400 uppercase">CO2 Enrichment</span>
                        </div>
                        <p className="text-2xl font-bold text-slate-700 dark:text-slate-300">{climate.co2Ppm} ppm</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="text-center p-2 bg-amber-50 dark:bg-amber-950/30 rounded-lg border border-amber-100 dark:border-amber-900/50">
                        <span className="text-xs font-medium text-amber-700 dark:text-amber-400">HVAC Integration</span>
                      </div>
                      <div className="text-center p-2 bg-emerald-50 dark:bg-emerald-950/30 rounded-lg border border-emerald-100 dark:border-emerald-900/50">
                        <span className="text-xs font-medium text-emerald-700 dark:text-emerald-400">Geothermal</span>
                      </div>
                      <div className="text-center p-2 bg-sky-50 dark:bg-sky-950/30 rounded-lg border border-sky-100 dark:border-sky-900/50">
                        <span className="text-xs font-medium text-sky-700 dark:text-sky-400">Passive Solar</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                      <div className="text-center p-3 bg-muted/50 rounded-lg">
                        <p className="text-xs text-muted-foreground">Growing Days</p>
                        <p className="font-semibold text-foreground">{climate.growingSeasonDays}</p>
                      </div>
                      <div className="text-center p-3 bg-muted/50 rounded-lg">
                        <p className="text-xs text-muted-foreground">Annual Harvest</p>
                        <p className="font-semibold text-foreground">{climate.annualTons.toLocaleString()} tons</p>
                      </div>
                      <div className="text-center p-3 bg-muted/50 rounded-lg">
                        <p className="text-xs text-muted-foreground">Meals/Year</p>
                        <p className="font-semibold text-foreground">{climate.studentMealsAnnual}</p>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Legal Framework */}
        {legalFramework && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.45 }} className="mb-8">
            <Card className="glass-panel" data-testid="card-legal">
              <CardHeader className="flex flex-row items-center gap-2 space-y-0 pb-4">
                <Shield className="h-5 w-5 text-primary" />
                <CardTitle className="text-lg font-semibold">Legal Framework & Governance — {legalFramework.entityName}</CardTitle>
                <Badge variant="secondary" className="ml-auto">{legalFramework.entityType}</Badge>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="p-4 bg-muted/30 rounded-xl border border-border/50">
                    <div className="flex items-center gap-2 mb-3">
                      <Users className="h-4 w-4 text-primary" />
                      <h3 className="font-semibold text-foreground">Board Composition</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">{legalFramework.boardSize}-Member Board</p>
                    <p className="text-sm text-muted-foreground mt-1">{legalFramework.boardComposition}</p>
                  </div>
                  <div className="p-4 bg-muted/30 rounded-xl border border-border/50">
                    <div className="flex items-center gap-2 mb-3">
                      <Landmark className="h-4 w-4 text-primary" />
                      <h3 className="font-semibold text-foreground">Endowment Rules</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">{legalFramework.endowmentRules}</p>
                  </div>
                  <div className="p-4 bg-muted/30 rounded-xl border border-border/50">
                    <div className="flex items-center gap-2 mb-3">
                      <Scale className="h-4 w-4 text-primary" />
                      <h3 className="font-semibold text-foreground">Required Filings</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">{legalFramework.filings}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* 50-Year Endowment Growth Chart */}
        {endowmentProjections && endowmentProjections.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.46 }} className="mb-8">
            <Card className="glass-panel" data-testid="card-endowment-projections">
              <CardHeader className="flex flex-row items-center gap-2 space-y-0 pb-4">
                <TrendingUp className="h-5 w-5 text-primary" />
                <CardTitle className="text-lg font-semibold">50-Year Endowment Growth — 3.5% Annual Draw</CardTitle>
                <Badge variant="secondary" className="ml-auto">2027–2077</Badge>
              </CardHeader>
              <CardContent>
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={endowmentProjections}>
                      <defs>
                        <linearGradient id="colorCorpus" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                      <XAxis dataKey="year" className="text-xs" />
                      <YAxis className="text-xs" tickFormatter={(v) => formatLargeNumber(v)} />
                      <Tooltip 
                        formatter={(value: number, name: string) => [
                          formatLargeNumber(value), 
                          name === 'corpus' ? 'Corpus' : name === 'annualDraw' ? 'Annual Draw' : 'Inflation-Adjusted'
                        ]} 
                      />
                      <Legend />
                      <Area type="monotone" dataKey="corpus" name="Endowment Corpus" stroke="#22c55e" fillOpacity={1} fill="url(#colorCorpus)" />
                      <Line type="monotone" dataKey="annualDraw" name="Annual Draw (3.5%)" stroke="#8b5cf6" strokeWidth={2} dot={false} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                  <div className="text-center p-3 bg-emerald-50 dark:bg-emerald-950/30 rounded-lg border border-emerald-100 dark:border-emerald-900/50">
                    <p className="text-xs text-emerald-700 dark:text-emerald-400 font-medium">Year 1 (2027)</p>
                    <p className="font-semibold text-emerald-800 dark:text-emerald-300">{formatLargeNumber(endowmentProjections[0]?.corpus || 0)}</p>
                  </div>
                  <div className="text-center p-3 bg-blue-50 dark:bg-blue-950/30 rounded-lg border border-blue-100 dark:border-blue-900/50">
                    <p className="text-xs text-blue-700 dark:text-blue-400 font-medium">Year 20 (2047)</p>
                    <p className="font-semibold text-blue-800 dark:text-blue-300">{formatLargeNumber(endowmentProjections.find(e => e.year === 2047)?.corpus || 0)}</p>
                  </div>
                  <div className="text-center p-3 bg-purple-50 dark:bg-purple-950/30 rounded-lg border border-purple-100 dark:border-purple-900/50">
                    <p className="text-xs text-purple-700 dark:text-purple-400 font-medium">Year 40 (2067)</p>
                    <p className="font-semibold text-purple-800 dark:text-purple-300">{formatLargeNumber(endowmentProjections.find(e => e.year === 2067)?.corpus || 0)}</p>
                  </div>
                  <div className="text-center p-3 bg-amber-50 dark:bg-amber-950/30 rounded-lg border border-amber-100 dark:border-amber-900/50">
                    <p className="text-xs text-amber-700 dark:text-amber-400 font-medium">Year 50 (2077)</p>
                    <p className="font-semibold text-amber-800 dark:text-amber-300">{formatLargeNumber(endowmentProjections[endowmentProjections.length - 1]?.corpus || 0)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Expanded Jobs: FTE + Internships + Volunteers */}
        {expandedJobs && expandedJobs.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.47 }} className="mb-8">
            <Card className="glass-panel" data-testid="card-expanded-jobs">
              <CardHeader className="flex flex-row items-center gap-2 space-y-0 pb-4">
                <Briefcase className="h-5 w-5 text-primary" />
                <CardTitle className="text-lg font-semibold">Job Creation — FTE, Internships & Volunteers</CardTitle>
                <Badge variant="secondary" className="ml-auto">2.4× Economic Multiplier</Badge>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {expandedJobs.map((job) => (
                    <div key={job.id} className="p-4 bg-muted/30 rounded-xl border border-border/50" data-testid={`job-scale-${job.scale}`}>
                      <div className="flex items-center gap-2 mb-3">
                        <Badge className={SCALE_COLORS[job.scale as keyof typeof SCALE_COLORS]}>{SCALE_LABELS[job.scale]}</Badge>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground flex items-center gap-1">
                            <Users className="h-3 w-3" /> FTE Jobs
                          </span>
                          <span className="font-semibold text-foreground">{job.fteJobs.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground flex items-center gap-1">
                            <GraduationCap className="h-3 w-3" /> Internships
                          </span>
                          <span className="font-semibold text-foreground">{job.studentInternships.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground flex items-center gap-1">
                            <Handshake className="h-3 w-3" /> Volunteers
                          </span>
                          <span className="font-semibold text-foreground">{job.volunteerPositions.toLocaleString()}</span>
                        </div>
                        <div className="pt-2 mt-2 border-t border-border/30">
                          <div className="flex justify-between items-center">
                            <span className="text-xs text-muted-foreground">Direct Wages</span>
                            <span className="text-sm font-semibold text-primary">{formatLargeNumber(job.directWages)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 p-3 bg-primary/5 rounded-lg border border-primary/10 flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-primary" />
                  <span className="text-sm text-muted-foreground">Student internships pay</span>
                  <span className="font-semibold text-foreground">${expandedJobs[0]?.hourlyWage || 15}/hr</span>
                  <span className="text-sm text-muted-foreground ml-2">| Economic multiplier effect:</span>
                  <span className="font-semibold text-primary">{expandedJobs[0]?.economicMultiplier || 2.4}×</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* K-12 NGSS Curriculum & Coalition Partners Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* K-12 Curriculum */}
          {curriculum && curriculum.length > 0 && (
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.48 }}>
              <Card className="glass-panel h-full" data-testid="card-curriculum">
                <CardHeader className="flex flex-row items-center gap-2 space-y-0 pb-4">
                  <BookOpen className="h-5 w-5 text-primary" />
                  <CardTitle className="text-lg font-semibold">K-12 NGSS Curriculum</CardTitle>
                  <Badge variant="secondary" className="ml-auto">Standards-Aligned</Badge>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {curriculum.map((unit) => (
                      <div key={unit.id} className="p-3 bg-muted/30 rounded-lg border border-border/50" data-testid={`curriculum-${unit.gradeRange}`}>
                        <div className="flex items-center justify-between mb-2">
                          <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">{unit.gradeRange}</Badge>
                          <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <Clock className="h-3 w-3" /> {unit.durationWeeks} weeks
                          </span>
                        </div>
                        <h4 className="font-semibold text-foreground">{unit.title}</h4>
                        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{unit.description}</p>
                        <p className="text-xs text-muted-foreground/70 mt-2 italic">{unit.standards}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Coalition Partners */}
          {coalition && coalition.length > 0 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.49 }}>
              <Card className="glass-panel h-full" data-testid="card-coalition">
                <CardHeader className="flex flex-row items-center gap-2 space-y-0 pb-4">
                  <Users2 className="h-5 w-5 text-primary" />
                  <CardTitle className="text-lg font-semibold">Coalition Partners</CardTitle>
                  <Badge variant="secondary" className="ml-auto">400K+ Members</Badge>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[1, 2, 3].map(tier => {
                      const tierPartners = coalition.filter(p => p.tier === tier);
                      if (tierPartners.length === 0) return null;
                      return (
                        <div key={tier}>
                          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">
                            Tier {tier} {tier === 1 ? '— Core' : tier === 2 ? '— Strategic' : '— Corporate'}
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {tierPartners.map(partner => (
                              <Badge 
                                key={partner.id} 
                                variant="outline" 
                                className={`${tier === 1 ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300' : tier === 2 ? 'bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300' : 'bg-purple-50 dark:bg-purple-950/30 border-purple-200 dark:border-purple-800 text-purple-700 dark:text-purple-300'}`}
                                data-testid={`partner-${partner.id}`}
                              >
                                {partner.name}
                                {partner.memberCount && partner.memberCount > 0 && (
                                  <span className="ml-1 opacity-70">({formatNumber(partner.memberCount)})</span>
                                )}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>

        {/* Funding Sources */}
        {fundingSources && fundingSources.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.495 }} className="mb-8">
            <Card className="glass-panel" data-testid="card-funding">
              <CardHeader className="flex flex-row items-center gap-2 space-y-0 pb-4">
                <Banknote className="h-5 w-5 text-primary" />
                <CardTitle className="text-lg font-semibold">Endowment Funding Sources — $2.1B Target</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {fundingSources.map((source, idx) => (
                    <div key={source.id} className="p-4 bg-muted/30 rounded-xl border border-border/50" data-testid={`funding-source-${source.id}`}>
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-foreground">{source.sourceType}</h4>
                        {source.percentage && (
                          <Badge variant="outline" className="text-xs">{source.percentage}%</Badge>
                        )}
                      </div>
                      <p className="text-2xl font-bold text-primary mb-2">{formatLargeNumber(source.targetAmount)}</p>
                      <p className="text-sm text-muted-foreground line-clamp-2">{source.description}</p>
                      {source.entities && (
                        <p className="text-xs text-muted-foreground/70 mt-2 italic line-clamp-2">{source.entities}</p>
                      )}
                    </div>
                  ))}
                </div>
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-3 bg-emerald-50 dark:bg-emerald-950/30 rounded-lg border border-emerald-100 dark:border-emerald-900/50 flex items-center gap-3">
                    <PiggyBank className="h-5 w-5 text-emerald-600" />
                    <div>
                      <p className="text-xs text-emerald-700 dark:text-emerald-400 font-medium">Total Endowment Target</p>
                      <p className="font-semibold text-emerald-800 dark:text-emerald-300">$2.1 Billion</p>
                    </div>
                  </div>
                  <div className="p-3 bg-blue-50 dark:bg-blue-950/30 rounded-lg border border-blue-100 dark:border-blue-900/50 flex items-center gap-3">
                    <TrendingUp className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="text-xs text-blue-700 dark:text-blue-400 font-medium">Year 1 Draw (3.5%)</p>
                      <p className="font-semibold text-blue-800 dark:text-blue-300">$73.5 Million</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Accountability & Transparency - Fraud Prevention */}
        {transparencyFeatures && transparencyFeatures.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.496 }} className="mb-8">
            <Card className="glass-panel" data-testid="card-transparency">
              <CardHeader className="flex flex-row items-center gap-2 space-y-0 pb-4">
                <Eye className="h-5 w-5 text-primary" />
                <CardTitle className="text-lg font-semibold">Accountability & Transparency — Fraud Prevention by Design</CardTitle>
                <Badge variant="secondary" className="ml-auto">Everyone Sees Everything</Badge>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-3 flex items-center gap-2">
                      <Eye className="h-3 w-3" /> Transparency Features
                    </p>
                    <div className="space-y-3">
                      {transparencyFeatures.map((feature) => (
                        <div key={feature.id} className="p-3 bg-muted/30 rounded-lg border border-border/50" data-testid={`transparency-${feature.id}`}>
                          <div className="flex items-center gap-2 mb-1">
                            <Badge variant="outline" className="bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800 text-xs">{feature.category}</Badge>
                          </div>
                          <h4 className="font-semibold text-foreground text-sm">{feature.feature}</h4>
                          <p className="text-xs text-muted-foreground mt-1">{feature.description}</p>
                          <div className="mt-2 pt-2 border-t border-border/30">
                            <p className="text-xs text-muted-foreground/80"><span className="font-medium">Who sees:</span> {feature.whoSees}</p>
                            <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-1"><ShieldCheck className="h-3 w-3 inline mr-1" />{feature.fraudPrevention}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {accountabilityMechanisms && accountabilityMechanisms.length > 0 && (
                    <div>
                      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-3 flex items-center gap-2">
                        <ClipboardCheck className="h-3 w-3" /> Accountability Mechanisms
                      </p>
                      <div className="space-y-3">
                        {accountabilityMechanisms.map((mechanism) => (
                          <div key={mechanism.id} className="p-3 bg-muted/30 rounded-lg border border-border/50" data-testid={`accountability-${mechanism.id}`}>
                            <div className="flex items-center justify-between mb-1">
                              <h4 className="font-semibold text-foreground text-sm">{mechanism.mechanism}</h4>
                              <Badge variant="outline" className="text-xs">{mechanism.frequency}</Badge>
                            </div>
                            <p className="text-xs text-muted-foreground">{mechanism.description}</p>
                            <div className="mt-2 grid grid-cols-2 gap-2">
                              <div className="p-2 bg-blue-50 dark:bg-blue-950/30 rounded border border-blue-100 dark:border-blue-900/50">
                                <p className="text-xs text-blue-700 dark:text-blue-400 font-medium">Who Audits</p>
                                <p className="text-xs text-blue-800 dark:text-blue-300">{mechanism.whoAudits}</p>
                              </div>
                              <div className="p-2 bg-purple-50 dark:bg-purple-950/30 rounded border border-purple-100 dark:border-purple-900/50">
                                <p className="text-xs text-purple-700 dark:text-purple-400 font-medium">Visibility</p>
                                <p className="text-xs text-purple-800 dark:text-purple-300 line-clamp-2">{mechanism.visibility}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="mt-4 p-4 bg-amber-50 dark:bg-amber-950/30 rounded-lg border border-amber-100 dark:border-amber-900/50">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-amber-800 dark:text-amber-300 text-sm">Why Traditional Systems Fail</h4>
                      <p className="text-xs text-amber-700 dark:text-amber-400 mt-1">
                        Minnesota has seen $250M+ in COVID relief fraud, childcare system collapse, and ongoing school lunch contractor fraud. 
                        Root causes: opaque funding flows, fragmented oversight, profit incentives misaligned with kid welfare. 
                        Gaia Commons makes fraud almost impossible through radical visibility and distributed accountability.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Tribal Partnerships - Food Sovereignty */}
        {tribalPartnerships && tribalPartnerships.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.498 }} className="mb-8">
            <Card className="glass-panel" data-testid="card-tribal-partnerships">
              <CardHeader className="flex flex-row items-center gap-2 space-y-0 pb-4">
                <Feather className="h-5 w-5 text-primary" />
                <CardTitle className="text-lg font-semibold">Tribal Partnerships — Permanent Food Sovereignty</CardTitle>
                <Badge variant="secondary" className="ml-auto">{tribalPartnerships.length} Partnership{tribalPartnerships.length > 1 ? 's' : ''}</Badge>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {tribalPartnerships.map((partnership) => (
                    <div key={partnership.id} className="p-4 bg-muted/30 rounded-xl border border-border/50" data-testid={`tribal-${partnership.id}`}>
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-lg text-foreground">{partnership.tribeName}</h3>
                          <Badge variant="outline" className="bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800">{partnership.status}</Badge>
                        </div>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <MapPin className="h-4 w-4" />
                          {partnership.location}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-4 italic">Tribe owns everything, forever. No money leaves the reservation.</p>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                        <div className="p-3 bg-emerald-50 dark:bg-emerald-950/30 rounded-lg border border-emerald-100 dark:border-emerald-900/50">
                          <p className="text-xs text-emerald-700 dark:text-emerald-400 font-medium">Greenhouses</p>
                          <p className="text-lg font-bold text-emerald-800 dark:text-emerald-300">{partnership.greenhouseCount}</p>
                        </div>
                        <div className="p-3 bg-blue-50 dark:bg-blue-950/30 rounded-lg border border-blue-100 dark:border-blue-900/50">
                          <p className="text-xs text-blue-700 dark:text-blue-400 font-medium">Local Jobs</p>
                          <p className="text-lg font-bold text-blue-800 dark:text-blue-300">{partnership.jobsCreated}</p>
                          <p className="text-xs text-blue-600 dark:text-blue-400">{partnership.hourlyWage}</p>
                        </div>
                        <div className="p-3 bg-purple-50 dark:bg-purple-950/30 rounded-lg border border-purple-100 dark:border-purple-900/50">
                          <p className="text-xs text-purple-700 dark:text-purple-400 font-medium">Students Served</p>
                          <p className="text-lg font-bold text-purple-800 dark:text-purple-300">{partnership.studentsServed.toLocaleString()}</p>
                        </div>
                        <div className="p-3 bg-amber-50 dark:bg-amber-950/30 rounded-lg border border-amber-100 dark:border-amber-900/50">
                          <p className="text-xs text-amber-700 dark:text-amber-400 font-medium">First Harvest</p>
                          <p className="text-lg font-bold text-amber-800 dark:text-amber-300">{partnership.firstHarvest}</p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                        <div className="p-3 bg-muted/50 rounded-lg">
                          <p className="text-xs font-medium text-muted-foreground mb-1">Schools Served</p>
                          <p className="text-sm text-foreground">{partnership.schoolsServed}</p>
                        </div>
                        {partnership.annualSurplus && (
                          <div className="p-3 bg-muted/50 rounded-lg">
                            <p className="text-xs font-medium text-muted-foreground mb-1">Annual Surplus (after Year {partnership.breakEvenYear})</p>
                            <p className="text-sm font-semibold text-primary">{partnership.annualSurplus}</p>
                          </div>
                        )}
                      </div>
                      
                      {partnership.surplusSplit && (
                        <div className="p-3 bg-primary/5 rounded-lg border border-primary/10 mb-3">
                          <p className="text-xs font-medium text-primary/70 mb-1">Surplus Distribution</p>
                          <p className="text-sm text-foreground">{partnership.surplusSplit}</p>
                        </div>
                      )}
                      
                      <div className="p-3 bg-muted/30 rounded-lg mb-3">
                        <p className="text-xs font-medium text-muted-foreground mb-1 flex items-center gap-1">
                          <ShieldCheck className="h-3 w-3" /> Governance & Fraud Protection
                        </p>
                        <p className="text-sm text-foreground">{partnership.governance}</p>
                      </div>
                      
                      {partnership.complementaryProjects && (
                        <div className="p-3 bg-emerald-50/50 dark:bg-emerald-950/20 rounded-lg border border-emerald-100 dark:border-emerald-900/30">
                          <p className="text-xs font-medium text-emerald-700 dark:text-emerald-400 mb-1 flex items-center gap-1">
                            <Leaf className="h-3 w-3" /> Complementary Projects
                          </p>
                          <p className="text-sm text-emerald-800 dark:text-emerald-300">{partnership.complementaryProjects}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Implementation Timeline */}
        {implementationTimeline && implementationTimeline.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.50 }} className="mb-8">
            <Card className="glass-panel" data-testid="card-implementation-timeline">
              <CardHeader className="flex flex-row items-center gap-2 space-y-0 pb-4">
                <Calendar className="h-5 w-5 text-primary" />
                <CardTitle className="text-lg font-semibold">Implementation Timeline — Greenhouse Rollout 2027-2028</CardTitle>
                <Badge variant="secondary" className="ml-auto">{implementationTimeline.length} Milestones</Badge>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-primary/20" />
                  <div className="space-y-4">
                    {implementationTimeline.map((item, idx) => (
                      <div key={item.id} className="relative pl-10" data-testid={`timeline-item-${item.id}`}>
                        <div className={`absolute left-2 w-4 h-4 rounded-full border-2 ${idx === implementationTimeline.length - 1 ? 'bg-primary border-primary' : 'bg-background border-primary'}`} />
                        <div className="p-4 bg-muted/30 rounded-lg border border-border/50">
                          <div className="flex flex-wrap items-center gap-2 mb-2">
                            <Badge variant="outline" className="text-xs">{item.phase}</Badge>
                            <span className="text-sm font-semibold text-primary">{item.quarter}</span>
                            <span className="text-sm font-medium text-foreground">{item.milestone}</span>
                          </div>
                          <p className="text-sm text-muted-foreground mb-3">{item.details}</p>
                          <div className="grid grid-cols-3 gap-3 text-center">
                            <div className="p-2 bg-background/50 rounded">
                              <p className="text-lg font-bold text-primary">{item.greenhouseCount}</p>
                              <p className="text-xs text-muted-foreground">Greenhouses</p>
                            </div>
                            <div className="p-2 bg-background/50 rounded">
                              <p className="text-lg font-bold text-emerald-600">{item.jobsCreated?.toLocaleString()}</p>
                              <p className="text-xs text-muted-foreground">Jobs</p>
                            </div>
                            <div className="p-2 bg-background/50 rounded">
                              <p className="text-lg font-bold text-blue-600">{item.studentsServed?.toLocaleString()}</p>
                              <p className="text-xs text-muted-foreground">Students</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Political Roadmap */}
        {politicalRoadmap && politicalRoadmap.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.51 }} className="mb-8">
            <Card className="glass-panel" data-testid="card-political-roadmap">
              <CardHeader className="flex flex-row items-center gap-2 space-y-0 pb-4">
                <MapPinned className="h-5 w-5 text-primary" />
                <CardTitle className="text-lg font-semibold">Political Roadmap — 8 Districts, One Message</CardTitle>
                <Badge variant="secondary" className="ml-auto">Target: 58%+ Vote Share</Badge>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {politicalRoadmap.map((district) => (
                    <div 
                      key={district.id} 
                      className={`p-4 rounded-lg border ${
                        district.supportLevel === 'Strong YES' 
                          ? 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-900/50' 
                          : district.supportLevel === 'Competitive' 
                            ? 'bg-amber-50/50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-900/50'
                            : 'bg-red-50/50 dark:bg-red-950/20 border-red-200 dark:border-red-900/50'
                      }`}
                      data-testid={`district-${district.district}`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-bold text-foreground">{district.district}</span>
                        <Badge 
                          variant="outline" 
                          className={`text-xs ${
                            district.supportLevel === 'Strong YES' 
                              ? 'border-emerald-500 text-emerald-700 dark:text-emerald-400' 
                              : district.supportLevel === 'Competitive'
                                ? 'border-amber-500 text-amber-700 dark:text-amber-400'
                                : 'border-red-500 text-red-700 dark:text-red-400'
                          }`}
                        >
                          {district.supportPct}
                        </Badge>
                      </div>
                      <p className={`text-sm font-medium mb-2 ${
                        district.supportLevel === 'Strong YES' 
                          ? 'text-emerald-700 dark:text-emerald-400' 
                          : district.supportLevel === 'Competitive'
                            ? 'text-amber-700 dark:text-amber-400'
                            : 'text-red-700 dark:text-red-400'
                      }`}>{district.supportLevel}</p>
                      <p className="text-xs text-muted-foreground mb-2">{district.strategy}</p>
                      <div className="pt-2 border-t border-border/50">
                        <p className="text-xs text-muted-foreground">Key messaging:</p>
                        <p className="text-xs font-medium text-foreground">{district.keyMessaging}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Stress Tests / Resilience */}
        {stressTests && stressTests.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.52 }} className="mb-8">
            <Card className="glass-panel" data-testid="card-stress-tests">
              <CardHeader className="flex flex-row items-center gap-2 space-y-0 pb-4">
                <ShieldAlert className="h-5 w-5 text-primary" />
                <CardTitle className="text-lg font-semibold">Financial Resilience — Stress Tests Prove Sustainability</CardTitle>
                <Badge variant="secondary" className="ml-auto">99%+ Solvency</Badge>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  50-year stress tests using 1926-2022 market data show resilience across bear markets, inflation surges, and combined shocks.
                  More conservative than pension funds; tested against Great-Recession scenarios.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {stressTests.map((test) => (
                    <div key={test.id} className="p-4 bg-muted/30 rounded-lg border border-border/50" data-testid={`stress-test-${test.id}`}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold text-foreground">{test.scenario}</span>
                        <Badge variant="outline" className="text-xs border-emerald-500 text-emerald-700 dark:text-emerald-400">
                          <CheckCircle2 className="h-3 w-3 mr-1" />
                          {test.solvencyProbability}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{test.description}</p>
                      <div className="space-y-2">
                        <div className="flex items-start gap-2">
                          <AlertTriangle className="h-4 w-4 text-amber-500 mt-0.5 shrink-0" />
                          <p className="text-xs text-foreground"><span className="font-medium">Impact:</span> {test.impact}</p>
                        </div>
                        <div className="flex items-start gap-2">
                          <ShieldCheck className="h-4 w-4 text-emerald-500 mt-0.5 shrink-0" />
                          <p className="text-xs text-foreground"><span className="font-medium">Mitigation:</span> {test.mitigation}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Timeline & Endowment Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <StatsCard title="Perpetual Endowment" icon={<Landmark className="h-5 w-5" />} delay={0.5}>
            {endowment && (
              <>
                <StatItem label="Total Principal" value={endowment.size} trend="Stable" trendUp={true} />
                <StatItem label="Annual Draw (3.5%)" value={endowment.annual} />
                <StatItem label="Greenhouses Funded" value={endowment.greenhouses} />
              </>
            )}
          </StatsCard>

          <StatsCard title="Pilot Program Status" icon={<Sprout className="h-5 w-5" />} delay={0.55}>
            {pilot && (
              <>
                <StatItem label="Students Served" value={pilot.students.toLocaleString()} trend="+12%" trendUp={true} />
                <StatItem label="Schools Active" value={pilot.schools} />
                <StatItem label="Total Sq Ft" value={`${(pilot.sqft / 1000).toFixed(1)}k`} />
                <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 mt-2">
                  <Activity className="w-3 h-3 mr-1.5" />Status: {pilot.status}
                </Badge>
              </>
            )}
          </StatsCard>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.6 }} className="h-full">
            {timeline && <Timeline events={timeline} />}
          </motion.div>
        </div>

        {/* Slide Deck */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.65 }} className="mb-8">
          <Card className="glass-panel" data-testid="card-slides">
            <CardHeader className="flex flex-row items-center gap-2 space-y-0 pb-4">
              <Presentation className="h-5 w-5 text-primary" />
              <CardTitle className="text-lg font-semibold">2026 Ballot Initiative Deck — One Vote, Forever Fed</CardTitle>
              <Badge variant="secondary" className="ml-auto">{slides?.length || 0} Slides</Badge>
            </CardHeader>
            <CardContent>
              {slides && slides.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {slides.map((slide) => (
                    <div key={slide.id} className="p-3 bg-muted/30 rounded-lg border border-border/50 hover:border-primary/30 transition-colors" data-testid={`slide-${slide.slideNumber}`}>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-bold text-primary">#{slide.slideNumber}</span>
                        <span className="text-xs font-semibold text-foreground truncate">{slide.title}</span>
                      </div>
                      <p className="text-xs text-muted-foreground line-clamp-2">{slide.content}</p>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Footer */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }} className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 border-t border-border/40 pt-8">
          <div className="flex gap-4 items-start p-4 rounded-xl hover:bg-white/40 dark:hover:bg-white/5 transition-colors">
            <div className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 p-2 rounded-lg">
              <Users className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Democratic Governance</h3>
              <p className="text-sm text-muted-foreground mt-1">Tri-cameral board with student, educator, and community representation.</p>
            </div>
          </div>
          <div className="flex gap-4 items-start p-4 rounded-xl hover:bg-white/40 dark:hover:bg-white/5 transition-colors">
            <div className="bg-green-100 dark:bg-green-900/30 text-green-600 p-2 rounded-lg">
              <Leaf className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Planetary Boundaries</h3>
              <p className="text-sm text-muted-foreground mt-1">ESG-only investments with fossil fuel divestment mandate.</p>
            </div>
          </div>
          <div className="flex gap-4 items-start p-4 rounded-xl hover:bg-white/40 dark:hover:bg-white/5 transition-colors">
            <div className="bg-purple-100 dark:bg-purple-900/30 text-purple-600 p-2 rounded-lg">
              <Vote className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">2026 Ballot Initiative</h3>
              <p className="text-sm text-muted-foreground mt-1">One Vote, Forever Fed — Constitutional amendment for perpetual school food funding.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
