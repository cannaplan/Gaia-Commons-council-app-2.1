import { motion } from "framer-motion";
import { Header } from "@/components/Header";
import { StatsCard, StatItem } from "@/components/StatsCard";
import { Timeline } from "@/components/Timeline";
import { usePilotStats, useEndowmentStats, useTimeline } from "@/hooks/use-gaia";
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
  Loader2
} from "lucide-react";

export default function Dashboard() {
  const { data: pilot, isLoading: loadingPilot } = usePilotStats();
  const { data: endowment, isLoading: loadingEndowment } = useEndowmentStats();
  const { data: timeline, isLoading: loadingTimeline } = useTimeline();

  const isLoading = loadingPilot || loadingEndowment || loadingTimeline;

  if (isLoading) {
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-background to-secondary/30">
        <Loader2 className="h-10 w-10 text-primary animate-spin mb-4" />
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Column 1: Pilot Stats */}
          <div className="lg:col-span-1 space-y-8">
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
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">
                      <Activity className="w-3 h-3 mr-1.5" />
                      Status: {pilot.status}
                    </span>
                  </div>
                </>
              )}
            </StatsCard>
          </div>

          {/* Column 2: Endowment Stats */}
          <div className="lg:col-span-1 space-y-8">
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
                     <div className="bg-emerald-50 p-3 rounded-lg border border-emerald-100 text-center">
                        <Trees className="w-5 h-5 text-emerald-600 mx-auto mb-1" />
                        <span className="text-xs text-emerald-800 font-medium">Eco Impact</span>
                     </div>
                     <div className="bg-amber-50 p-3 rounded-lg border border-amber-100 text-center">
                        <TrendingUp className="w-5 h-5 text-amber-600 mx-auto mb-1" />
                        <span className="text-xs text-amber-800 font-medium">Growth</span>
                     </div>
                  </div>
                </>
              )}
            </StatsCard>
          </div>

          {/* Column 3: Timeline */}
          <div className="lg:col-span-1">
            <motion.div
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.5, delay: 0.3 }}
               className="h-full"
            >
              {timeline && <Timeline events={timeline} />}
            </motion.div>
          </div>
        </div>

        {/* Info / Footer Section */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 border-t border-border/40 pt-8"
        >
          <div className="flex gap-4 items-start p-4 rounded-xl hover:bg-white/40 transition-colors">
            <div className="bg-blue-100 text-blue-600 p-2 rounded-lg">
              <Users className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Community Led</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Governance distributed across student councils and faculty boards.
              </p>
            </div>
          </div>
          
          <div className="flex gap-4 items-start p-4 rounded-xl hover:bg-white/40 transition-colors">
            <div className="bg-purple-100 text-purple-600 p-2 rounded-lg">
              <Ruler className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Open Standards</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Curriculum and greenhouse designs are open source for global adoption.
              </p>
            </div>
          </div>

          <div className="flex gap-4 items-start p-4 rounded-xl hover:bg-white/40 transition-colors">
            <div className="bg-orange-100 text-orange-600 p-2 rounded-lg">
              <School className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Education First</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Focus on hands-on learning, biology, and systems thinking.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
