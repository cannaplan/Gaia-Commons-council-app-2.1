import { motion } from "framer-motion";
import { Header } from "@/components/Header";
import { StatsCard, StatItem } from "@/components/StatsCard";
import { Timeline } from "@/components/Timeline";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  usePilotStats, 
  useEndowmentStats, 
  useTimeline,
  useFinancialMetrics,
  useClimateMetrics,
  useSlides
} from "@/hooks/use-gaia";
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
  Target
} from "lucide-react";

export default function Dashboard() {
  const { data: pilot, isLoading: loadingPilot } = usePilotStats();
  const { data: endowment, isLoading: loadingEndowment } = useEndowmentStats();
  const { data: timeline, isLoading: loadingTimeline } = useTimeline();
  const { data: financials, isLoading: loadingFinancials } = useFinancialMetrics();
  const { data: climate, isLoading: loadingClimate } = useClimateMetrics();
  const { data: slides, isLoading: loadingSlides } = useSlides();

  const isLoading = loadingPilot || loadingEndowment || loadingTimeline || loadingFinancials || loadingClimate || loadingSlides;

  if (isLoading) {
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-background to-secondary/30">
        <Loader2 className="h-10 w-10 text-primary animate-spin mb-4" data-testid="loader-main" />
        <p className="text-muted-foreground font-medium animate-pulse">Loading Gaia systems...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/30 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Header />
        </motion.div>

        {/* Row 1: Overview Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Pilot Stats */}
          <StatsCard 
            title="Minnesota School Greenhouse Pilot" 
            icon={<Sprout className="h-5 w-5" />}
            delay={0.1}
          >
            {pilot && (
              <>
                <StatItem 
                  label="Students Served by Program" 
                  value={pilot.students.toLocaleString()} 
                  trend="+12%"
                  trendUp={true}
                />
                <StatItem 
                  label="School Districts Participating" 
                  value={pilot.schools} 
                />
                <StatItem 
                  label="Total Greenhouse Square Footage" 
                  value={`${(pilot.sqft / 1000).toFixed(1)}k sqft`} 
                />
                <div className="pt-2">
                  <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20" data-testid="badge-status">
                    <Activity className="w-3 h-3 mr-1.5" />
                    Pilot Status: {pilot.status}
                  </Badge>
                </div>
              </>
            )}
          </StatsCard>

          {/* Endowment Stats */}
          <StatsCard 
            title="Gaia Commons Perpetual Endowment" 
            icon={<Landmark className="h-5 w-5" />}
            delay={0.2}
          >
            {endowment && (
              <>
                <StatItem 
                  label="Total Endowment Principal" 
                  value={endowment.size} 
                  trend="Stable"
                  trendUp={true}
                />
                <StatItem 
                  label="Annual 3% Distribution" 
                  value={endowment.annual} 
                />
                <StatItem 
                  label="Greenhouses Fully Funded" 
                  value={endowment.greenhouses} 
                />
                <div className="mt-4 grid grid-cols-2 gap-2">
                   <div className="bg-emerald-50 dark:bg-emerald-950/30 p-3 rounded-lg border border-emerald-100 dark:border-emerald-900/50 text-center">
                      <Trees className="w-5 h-5 text-emerald-600 mx-auto mb-1" />
                      <span className="text-xs text-emerald-800 dark:text-emerald-400 font-medium">Carbon Neutral</span>
                   </div>
                   <div className="bg-amber-50 dark:bg-amber-950/30 p-3 rounded-lg border border-amber-100 dark:border-amber-900/50 text-center">
                      <TrendingUp className="w-5 h-5 text-amber-600 mx-auto mb-1" />
                      <span className="text-xs text-amber-800 dark:text-amber-400 font-medium">Perpetual Growth</span>
                   </div>
                </div>
              </>
            )}
          </StatsCard>

          {/* Timeline */}
          <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.5, delay: 0.3 }}
             className="h-full"
          >
            {timeline && <Timeline events={timeline} />}
          </motion.div>
        </div>

        {/* Row 2: Financial Engine & Climate */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Financial Engine */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card className="glass-panel card-hover h-full" data-testid="card-financials">
              <CardHeader className="flex flex-row items-center gap-2 space-y-0 pb-2">
                <Calculator className="h-5 w-5 text-primary" />
                <CardTitle className="text-lg font-semibold">Financial Projection Engine v3.1 — Pilot Program ROI Model</CardTitle>
                {financials && (
                  <Badge variant="secondary" className="ml-auto">{financials.schoolCount} School Pilot</Badge>
                )}
              </CardHeader>
              <CardContent>
                {financials && (
                  <div className="space-y-4">
                    {/* Program Totals */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 p-4 rounded-xl border border-green-100 dark:border-green-900/50">
                        <div className="flex items-center gap-2 mb-2">
                          <DollarSign className="h-4 w-4 text-green-600" />
                          <span className="text-xs font-medium text-green-800 dark:text-green-400 uppercase tracking-wide">Net Present Value (10-Year Horizon)</span>
                        </div>
                        <p className="text-2xl font-bold text-green-700 dark:text-green-300" data-testid="text-npv">
                          ${(financials.npv10yr / 1e6).toFixed(2)}M
                        </p>
                      </div>
                      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 p-4 rounded-xl border border-blue-100 dark:border-blue-900/50">
                        <div className="flex items-center gap-2 mb-2">
                          <TrendingUp className="h-4 w-4 text-blue-600" />
                          <span className="text-xs font-medium text-blue-800 dark:text-blue-400 uppercase tracking-wide">Return on Investment (10-Year)</span>
                        </div>
                        <p className="text-2xl font-bold text-blue-700 dark:text-blue-300" data-testid="text-roi">
                          {financials.roi10yrPct}%
                        </p>
                      </div>
                    </div>

                    {/* Program Overview */}
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mt-4 mb-2">Total Pilot Program Investment & Returns</p>
                    <div className="grid grid-cols-4 gap-3">
                      <div className="text-center p-3 bg-muted/50 rounded-lg">
                        <p className="text-xs text-muted-foreground">Capital Investment</p>
                        <p className="font-semibold text-foreground" data-testid="text-investment">${(financials.initialInvestment / 1e6).toFixed(1)}M</p>
                      </div>
                      <div className="text-center p-3 bg-muted/50 rounded-lg">
                        <p className="text-xs text-muted-foreground">Annual Operating Cost</p>
                        <p className="font-semibold text-foreground">${(financials.annualOpex / 1e3).toFixed(0)}K</p>
                      </div>
                      <div className="text-center p-3 bg-muted/50 rounded-lg">
                        <p className="text-xs text-muted-foreground">Annual Gross Revenue</p>
                        <p className="font-semibold text-foreground">${(financials.totalAnnualRevenue / 1e3).toFixed(0)}K</p>
                      </div>
                      <div className="text-center p-3 bg-muted/50 rounded-lg">
                        <p className="text-xs text-muted-foreground">Investment Payback Period</p>
                        <p className="font-semibold text-foreground">{financials.paybackYears} yrs</p>
                      </div>
                    </div>

                    {/* Per-School Economics */}
                    <div className="border-t border-border/50 pt-4 mt-4">
                      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-3">Individual School Greenhouse Economics</p>
                      <div className="grid grid-cols-4 gap-3">
                        <div className="text-center p-3 bg-primary/5 rounded-lg border border-primary/10">
                          <p className="text-xs text-muted-foreground">Greenhouse Build Cost</p>
                          <p className="font-semibold text-primary" data-testid="text-investment-per-school">${(financials.investmentPerSchool / 1e3).toFixed(0)}K</p>
                        </div>
                        <div className="text-center p-3 bg-primary/5 rounded-lg border border-primary/10">
                          <p className="text-xs text-muted-foreground">Annual Operating Cost</p>
                          <p className="font-semibold text-primary">${(financials.opexPerSchool / 1e3).toFixed(0)}K</p>
                        </div>
                        <div className="text-center p-3 bg-primary/5 rounded-lg border border-primary/10">
                          <p className="text-xs text-muted-foreground">Annual Produce Yield</p>
                          <p className="font-semibold text-primary">{financials.yieldPerSchool.toLocaleString()} lbs</p>
                        </div>
                        <div className="text-center p-3 bg-primary/5 rounded-lg border border-primary/10">
                          <p className="text-xs text-muted-foreground">Annual Revenue Generated</p>
                          <p className="font-semibold text-primary">${(financials.annualRevenuePerSchool / 1e3).toFixed(1)}K</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Climate & Yield */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Card className="glass-panel card-hover h-full" data-testid="card-climate">
              <CardHeader className="flex flex-row items-center gap-2 space-y-0 pb-2">
                <Thermometer className="h-5 w-5 text-primary" />
                <CardTitle className="text-lg font-semibold">Year-Round Climate Control & Aquaponics Yield Model v5.0</CardTitle>
              </CardHeader>
              <CardContent>
                {climate && (
                  <div className="space-y-4">
                    {/* Climate Control Features */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-950/30 dark:to-amber-950/30 p-4 rounded-xl border border-orange-100 dark:border-orange-900/50">
                        <div className="flex items-center gap-2 mb-2">
                          <Thermometer className="h-4 w-4 text-orange-600" />
                          <span className="text-xs font-medium text-orange-800 dark:text-orange-400 uppercase tracking-wide">Greenhouse Internal Temp (Winter Avg)</span>
                        </div>
                        <p className="text-2xl font-bold text-orange-700 dark:text-orange-300" data-testid="text-temp">
                          {climate.avgTemp}°F
                        </p>
                      </div>
                      <div className="bg-gradient-to-br from-slate-50 to-gray-50 dark:from-slate-950/30 dark:to-gray-950/30 p-4 rounded-xl border border-slate-100 dark:border-slate-900/50">
                        <div className="flex items-center gap-2 mb-2">
                          <Wind className="h-4 w-4 text-slate-600" />
                          <span className="text-xs font-medium text-slate-800 dark:text-slate-400 uppercase tracking-wide">CO2 Enrichment Level</span>
                        </div>
                        <p className="text-2xl font-bold text-slate-700 dark:text-slate-300" data-testid="text-co2">
                          {climate.co2Ppm} ppm
                        </p>
                      </div>
                    </div>

                    {/* Heating Systems */}
                    <div className="grid grid-cols-3 gap-2">
                      <div className="text-center p-2 bg-amber-50 dark:bg-amber-950/30 rounded-lg border border-amber-100 dark:border-amber-900/50">
                        <span className="text-xs font-medium text-amber-700 dark:text-amber-400">School HVAC Integration</span>
                      </div>
                      <div className="text-center p-2 bg-emerald-50 dark:bg-emerald-950/30 rounded-lg border border-emerald-100 dark:border-emerald-900/50">
                        <span className="text-xs font-medium text-emerald-700 dark:text-emerald-400">Geothermal Heat Pumps</span>
                      </div>
                      <div className="text-center p-2 bg-sky-50 dark:bg-sky-950/30 rounded-lg border border-sky-100 dark:border-sky-900/50">
                        <span className="text-xs font-medium text-sky-700 dark:text-sky-400">Passive Solar Design</span>
                      </div>
                    </div>

                    {/* Production Metrics */}
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mt-2">Year-Round Aquaponics Production Output</p>
                    <div className="grid grid-cols-3 gap-3">
                      <div className="text-center p-3 bg-muted/50 rounded-lg">
                        <p className="text-xs text-muted-foreground">Growing Season (MN Winter-Proof)</p>
                        <p className="font-semibold text-foreground">{climate.growingSeasonDays} days</p>
                      </div>
                      <div className="text-center p-3 bg-muted/50 rounded-lg">
                        <p className="text-xs text-muted-foreground">Annual Harvest (6 Schools)</p>
                        <p className="font-semibold text-foreground">{climate.annualTons.toLocaleString()} tons</p>
                      </div>
                      <div className="text-center p-3 bg-muted/50 rounded-lg">
                        <p className="text-xs text-muted-foreground">Student Meals Produced Annually</p>
                        <p className="font-semibold text-foreground">{climate.studentMealsAnnual}</p>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Row 3: Ballot Slide Deck */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mb-8"
        >
          <Card className="glass-panel" data-testid="card-slides">
            <CardHeader className="flex flex-row items-center gap-2 space-y-0 pb-4">
              <Presentation className="h-5 w-5 text-primary" />
              <CardTitle className="text-lg font-semibold">2028 Ballot Initiative Presentation Deck — Gaia Commons Amendment</CardTitle>
              <Badge variant="secondary" className="ml-auto">Vote Yes on Gaia</Badge>
            </CardHeader>
            <CardContent>
              {slides && slides.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                  {slides.map((slide) => (
                    <motion.div
                      key={slide.id}
                      whileHover={{ scale: 1.03 }}
                      className="group relative bg-gradient-to-br from-white to-secondary/20 dark:from-gray-900 dark:to-gray-800 p-4 rounded-xl border border-border/50 hover:border-primary/30 transition-all cursor-pointer"
                      data-testid={`card-slide-${slide.slideNumber}`}
                    >
                      <div className="absolute top-2 right-2">
                        <Badge variant="outline" className="text-[10px] px-1.5 py-0">
                          #{slide.slideNumber}
                        </Badge>
                      </div>
                      <div className="mt-4">
                        <h4 className="font-semibold text-sm text-foreground truncate">{slide.title}</h4>
                        <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{slide.content}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Row 4: Info / Footer Section */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 border-t border-border/40 pt-8"
        >
          <div className="flex gap-4 items-start p-4 rounded-xl hover:bg-white/40 dark:hover:bg-white/5 transition-colors">
            <div className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 p-2 rounded-lg">
              <Users className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Community-Led Democratic Governance</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Distributed governance across student councils, faculty boards, and local food policy councils.
              </p>
            </div>
          </div>
          
          <div className="flex gap-4 items-start p-4 rounded-xl hover:bg-white/40 dark:hover:bg-white/5 transition-colors">
            <div className="bg-purple-100 dark:bg-purple-900/30 text-purple-600 p-2 rounded-lg">
              <Leaf className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Perpetual Sustainability with Planetary Boundaries</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Constitutional endowment with 3% annual distribution and planetary boundaries clause protecting future generations.
              </p>
            </div>
          </div>

          <div className="flex gap-4 items-start p-4 rounded-xl hover:bg-white/40 dark:hover:bg-white/5 transition-colors">
            <div className="bg-orange-100 dark:bg-orange-900/30 text-orange-600 p-2 rounded-lg">
              <Target className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">2028 Statewide Ballot Initiative — Vote Yes on Gaia</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Full deployment to 275 school greenhouses serving 875,000 students across Minnesota.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
