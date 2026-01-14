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
            title="Pilot Program" 
            icon={<Sprout className="h-5 w-5" />}
            delay={0.1}
          >
            {pilot && (
              <>
                <StatItem 
                  label="Active Students" 
                  value={pilot.students.toLocaleString()} 
                  trend="+12%"
                  trendUp={true}
                />
                <StatItem 
                  label="Participating Schools" 
                  value={pilot.schools} 
                />
                <StatItem 
                  label="Total Square Footage" 
                  value={`${(pilot.sqft / 1000).toFixed(1)}k sqft`} 
                />
                <div className="pt-2">
                  <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20" data-testid="badge-status">
                    <Activity className="w-3 h-3 mr-1.5" />
                    Status: {pilot.status}
                  </Badge>
                </div>
              </>
            )}
          </StatsCard>

          {/* Endowment Stats */}
          <StatsCard 
            title="Endowment Fund" 
            icon={<Landmark className="h-5 w-5" />}
            delay={0.2}
          >
            {endowment && (
              <>
                <StatItem 
                  label="Total Fund Size" 
                  value={endowment.size} 
                  trend="Stable"
                  trendUp={true}
                />
                <StatItem 
                  label="Annual Distribution" 
                  value={endowment.annual} 
                />
                <StatItem 
                  label="Greenhouses Funded" 
                  value={endowment.greenhouses} 
                />
                <div className="mt-4 grid grid-cols-2 gap-2">
                   <div className="bg-emerald-50 dark:bg-emerald-950/30 p-3 rounded-lg border border-emerald-100 dark:border-emerald-900/50 text-center">
                      <Trees className="w-5 h-5 text-emerald-600 mx-auto mb-1" />
                      <span className="text-xs text-emerald-800 dark:text-emerald-400 font-medium">Eco Impact</span>
                   </div>
                   <div className="bg-amber-50 dark:bg-amber-950/30 p-3 rounded-lg border border-amber-100 dark:border-amber-900/50 text-center">
                      <TrendingUp className="w-5 h-5 text-amber-600 mx-auto mb-1" />
                      <span className="text-xs text-amber-800 dark:text-amber-400 font-medium">Growth</span>
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
                <CardTitle className="text-lg font-semibold">Financial Engine (v3.1)</CardTitle>
              </CardHeader>
              <CardContent>
                {financials && (
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 p-4 rounded-xl border border-green-100 dark:border-green-900/50">
                      <div className="flex items-center gap-2 mb-2">
                        <DollarSign className="h-4 w-4 text-green-600" />
                        <span className="text-xs font-medium text-green-800 dark:text-green-400 uppercase tracking-wide">NPV (10yr)</span>
                      </div>
                      <p className="text-2xl font-bold text-green-700 dark:text-green-300" data-testid="text-npv">
                        ${(financials.npv10yr / 1e9).toFixed(2)}B
                      </p>
                    </div>
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 p-4 rounded-xl border border-blue-100 dark:border-blue-900/50">
                      <div className="flex items-center gap-2 mb-2">
                        <TrendingUp className="h-4 w-4 text-blue-600" />
                        <span className="text-xs font-medium text-blue-800 dark:text-blue-400 uppercase tracking-wide">ROI</span>
                      </div>
                      <p className="text-2xl font-bold text-blue-700 dark:text-blue-300" data-testid="text-roi">
                        {financials.roi10yrPct}%
                      </p>
                    </div>
                    <div className="col-span-2 grid grid-cols-3 gap-3 mt-2">
                      <div className="text-center p-3 bg-muted/50 rounded-lg">
                        <p className="text-xs text-muted-foreground">Investment</p>
                        <p className="font-semibold text-foreground" data-testid="text-investment">${(financials.initialInvestment / 1e6).toFixed(0)}M</p>
                      </div>
                      <div className="text-center p-3 bg-muted/50 rounded-lg">
                        <p className="text-xs text-muted-foreground">Annual OPEX</p>
                        <p className="font-semibold text-foreground">${(financials.annualOpex / 1e6).toFixed(0)}M</p>
                      </div>
                      <div className="text-center p-3 bg-muted/50 rounded-lg">
                        <p className="text-xs text-muted-foreground">Yield/School</p>
                        <p className="font-semibold text-foreground">{financials.yieldPerSchool.toLocaleString()} lbs</p>
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
                <CardTitle className="text-lg font-semibold">Climate & Yield (v5.0)</CardTitle>
              </CardHeader>
              <CardContent>
                {climate && (
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-950/30 dark:to-amber-950/30 p-4 rounded-xl border border-orange-100 dark:border-orange-900/50">
                      <div className="flex items-center gap-2 mb-2">
                        <Thermometer className="h-4 w-4 text-orange-600" />
                        <span className="text-xs font-medium text-orange-800 dark:text-orange-400 uppercase tracking-wide">Avg Temp</span>
                      </div>
                      <p className="text-2xl font-bold text-orange-700 dark:text-orange-300" data-testid="text-temp">
                        {climate.avgTemp}°F
                      </p>
                    </div>
                    <div className="bg-gradient-to-br from-slate-50 to-gray-50 dark:from-slate-950/30 dark:to-gray-950/30 p-4 rounded-xl border border-slate-100 dark:border-slate-900/50">
                      <div className="flex items-center gap-2 mb-2">
                        <Wind className="h-4 w-4 text-slate-600" />
                        <span className="text-xs font-medium text-slate-800 dark:text-slate-400 uppercase tracking-wide">CO2</span>
                      </div>
                      <p className="text-2xl font-bold text-slate-700 dark:text-slate-300" data-testid="text-co2">
                        {climate.co2Ppm} ppm
                      </p>
                    </div>
                    <div className="col-span-2 grid grid-cols-3 gap-3 mt-2">
                      <div className="text-center p-3 bg-muted/50 rounded-lg">
                        <p className="text-xs text-muted-foreground">Growing Days</p>
                        <p className="font-semibold text-foreground">{climate.growingSeasonDays}</p>
                      </div>
                      <div className="text-center p-3 bg-muted/50 rounded-lg">
                        <p className="text-xs text-muted-foreground">Annual Tons</p>
                        <p className="font-semibold text-foreground">{climate.annualTons.toLocaleString()}</p>
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
              <CardTitle className="text-lg font-semibold">Ballot Slide Deck (20 Slides)</CardTitle>
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
              <h3 className="font-semibold text-foreground">Community Led</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Governance distributed across student councils and faculty boards.
              </p>
            </div>
          </div>
          
          <div className="flex gap-4 items-start p-4 rounded-xl hover:bg-white/40 dark:hover:bg-white/5 transition-colors">
            <div className="bg-purple-100 dark:bg-purple-900/30 text-purple-600 p-2 rounded-lg">
              <Leaf className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Sustainable Model</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Perpetual endowment with 3% annual draw and planetary boundaries clause.
              </p>
            </div>
          </div>

          <div className="flex gap-4 items-start p-4 rounded-xl hover:bg-white/40 dark:hover:bg-white/5 transition-colors">
            <div className="bg-orange-100 dark:bg-orange-900/30 text-orange-600 p-2 rounded-lg">
              <Target className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">2028 Ballot Ready</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Full deployment to 275 greenhouses serving 875k students statewide.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
