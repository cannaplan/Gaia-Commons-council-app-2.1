import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  PieChart,
  Pie,
  Legend,
} from "recharts";
import { Briefcase, Users, HardHat, Building2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type Scale = "pilot" | "statewide" | "national" | "global";

interface JobCategory {
  name: string;
  jobs: number;
  color: string;
  icon: string;
}

interface ScaleData {
  permanentJobs: number;
  constructionJobs: number;
  categories: JobCategory[];
  constructionBreakdown: JobCategory[];
}

const scaleData: Record<Scale, ScaleData> = {
  pilot: {
    permanentJobs: 18,
    constructionJobs: 76,
    categories: [
      { name: "Greenhouse Staff", jobs: 12, color: "#10b981", icon: "sprout" },
      { name: "Educators", jobs: 2, color: "#3b82f6", icon: "graduation" },
      { name: "Distribution", jobs: 2, color: "#f59e0b", icon: "truck" },
      { name: "School Staff", jobs: 2, color: "#8b5cf6", icon: "building" },
    ],
    constructionBreakdown: [
      { name: "General Construction", jobs: 30, color: "#6b7280", icon: "hammer" },
      { name: "Electricians", jobs: 15, color: "#f59e0b", icon: "zap" },
      { name: "Plumbers", jobs: 11, color: "#3b82f6", icon: "droplet" },
      { name: "HVAC Technicians", jobs: 11, color: "#10b981", icon: "wind" },
      { name: "Greenhouse Specialists", jobs: 9, color: "#22c55e", icon: "leaf" },
    ],
  },
  statewide: {
    permanentJobs: 1815,
    constructionJobs: 4320,
    categories: [
      { name: "Greenhouse Staff", jobs: 1152, color: "#10b981", icon: "sprout" },
      { name: "Educators", jobs: 96, color: "#3b82f6", icon: "graduation" },
      { name: "Distribution", jobs: 256, color: "#f59e0b", icon: "truck" },
      { name: "School Staff", jobs: 311, color: "#8b5cf6", icon: "building" },
    ],
    constructionBreakdown: [
      { name: "General Construction", jobs: 1728, color: "#6b7280", icon: "hammer" },
      { name: "Electricians", jobs: 864, color: "#f59e0b", icon: "zap" },
      { name: "Plumbers", jobs: 648, color: "#3b82f6", icon: "droplet" },
      { name: "HVAC Technicians", jobs: 648, color: "#10b981", icon: "wind" },
      { name: "Greenhouse Specialists", jobs: 432, color: "#22c55e", icon: "leaf" },
    ],
  },
  national: {
    permanentJobs: 250000,
    constructionJobs: 1170000,
    categories: [
      { name: "Greenhouse Staff", jobs: 156000, color: "#10b981", icon: "sprout" },
      { name: "Educators", jobs: 26000, color: "#3b82f6", icon: "graduation" },
      { name: "Distribution", jobs: 39000, color: "#f59e0b", icon: "truck" },
      { name: "School Staff", jobs: 29000, color: "#8b5cf6", icon: "building" },
    ],
    constructionBreakdown: [
      { name: "General Construction", jobs: 468000, color: "#6b7280", icon: "hammer" },
      { name: "Electricians", jobs: 234000, color: "#f59e0b", icon: "zap" },
      { name: "Plumbers", jobs: 175500, color: "#3b82f6", icon: "droplet" },
      { name: "HVAC Technicians", jobs: 175500, color: "#10b981", icon: "wind" },
      { name: "Greenhouse Specialists", jobs: 117000, color: "#22c55e", icon: "leaf" },
    ],
  },
  global: {
    permanentJobs: 2000000,
    constructionJobs: 6500000,
    categories: [
      { name: "Greenhouse Staff", jobs: 1200000, color: "#10b981", icon: "sprout" },
      { name: "Educators", jobs: 200000, color: "#3b82f6", icon: "graduation" },
      { name: "Distribution", jobs: 350000, color: "#f59e0b", icon: "truck" },
      { name: "School Staff", jobs: 250000, color: "#8b5cf6", icon: "building" },
    ],
    constructionBreakdown: [
      { name: "General Construction", jobs: 2600000, color: "#6b7280", icon: "hammer" },
      { name: "Electricians", jobs: 1300000, color: "#f59e0b", icon: "zap" },
      { name: "Plumbers", jobs: 975000, color: "#3b82f6", icon: "droplet" },
      { name: "HVAC Technicians", jobs: 975000, color: "#10b981", icon: "wind" },
      { name: "Greenhouse Specialists", jobs: 650000, color: "#22c55e", icon: "leaf" },
    ],
  },
};

const formatNumber = (value: number): string => {
  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(1)}M`;
  }
  if (value >= 1000) {
    return `${(value / 1000).toFixed(value >= 10000 ? 0 : 1)}K`;
  }
  return value.toLocaleString();
};

const scaleLabels: Record<Scale, string> = {
  pilot: "Pilot (6 Schools)",
  statewide: "Statewide (3,100 Schools)",
  national: "National (130K Schools)",
  global: "Global (1M Schools)",
};

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-background border rounded-lg shadow-lg p-3">
        <p className="font-bold text-foreground">{data.name}</p>
        <p className="text-sm text-muted-foreground">
          {formatNumber(data.jobs)} jobs
        </p>
      </div>
    );
  }
  return null;
};

interface JobsBreakdownChartProps {
  defaultScale?: Scale;
}

const validScales: Scale[] = ["pilot", "statewide", "national", "global"];

export default function JobsBreakdownChart({ defaultScale = "statewide" }: JobsBreakdownChartProps) {
  const safeDefaultScale = validScales.includes(defaultScale) ? defaultScale : "statewide";
  const [scale, setScale] = useState<Scale>(safeDefaultScale);
  const [viewType, setViewType] = useState<"permanent" | "construction">("permanent");
  const data = scaleData[scale] || scaleData.statewide;

  const chartData = viewType === "permanent" ? data.categories : data.constructionBreakdown;
  const totalJobs = viewType === "permanent" ? data.permanentJobs : data.constructionJobs;

  return (
    <Card className="w-full" data-testid="jobs-breakdown-chart">
      <CardHeader className="flex flex-col gap-4 space-y-0 pb-2">
        <div className="flex flex-row items-center justify-between gap-2">
          <CardTitle className="flex items-center gap-2">
            <Briefcase className="h-5 w-5 text-primary" />
            Jobs Breakdown
          </CardTitle>
          <div className="flex gap-2">
            <Button
              size="sm"
              variant={viewType === "permanent" ? "default" : "outline"}
              onClick={() => setViewType("permanent")}
              data-testid="btn-permanent-jobs"
            >
              <Users className="h-4 w-4 mr-1" />
              Permanent
            </Button>
            <Button
              size="sm"
              variant={viewType === "construction" ? "default" : "outline"}
              onClick={() => setViewType("construction")}
              data-testid="btn-construction-jobs"
            >
              <HardHat className="h-4 w-4 mr-1" />
              Construction
            </Button>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {(Object.keys(scaleData) as Scale[]).map((s) => (
            <Button
              key={s}
              size="sm"
              variant={scale === s ? "secondary" : "ghost"}
              onClick={() => setScale(s)}
              data-testid={`btn-scale-${s}`}
            >
              {scaleLabels[s]}
            </Button>
          ))}
        </div>
      </CardHeader>
      <CardContent>
        <AnimatePresence mode="wait">
          <motion.div
            key={`${scale}-${viewType}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <Building2 className="h-8 w-8 text-primary" />
              <span className="text-3xl font-bold" data-testid="text-total-jobs">
                {formatNumber(totalJobs)}
              </span>
              <span className="text-muted-foreground">
                {viewType === "permanent" ? "permanent jobs" : "construction phase jobs"}
              </span>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={chartData}
                    layout="vertical"
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                    <XAxis type="number" tickFormatter={(value) => formatNumber(value)} />
                    <YAxis
                      dataKey="name"
                      type="category"
                      width={120}
                      tick={{ fontSize: 11 }}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="jobs" radius={[0, 4, 4, 0]}>
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={chartData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={2}
                      dataKey="jobs"
                      nameKey="name"
                      label={({ name, percent }) =>
                        `${name.split(" ")[0]} ${(percent * 100).toFixed(0)}%`
                      }
                      labelLine={false}
                    >
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3" data-testid="container-job-categories">
              {chartData.slice(0, 4).map((cat, idx) => (
                <motion.div
                  key={cat.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.1 }}
                  className="p-3 rounded-lg text-center"
                  style={{ backgroundColor: `${cat.color}20` }}
                  data-testid={`card-job-category-${cat.name.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  <div className="font-bold text-lg" style={{ color: cat.color }}>
                    {formatNumber(cat.jobs)}
                  </div>
                  <div className="text-xs text-muted-foreground">{cat.name}</div>
                </motion.div>
              ))}
            </div>

            {viewType === "permanent" && scale === "statewide" && (
              <div className="mt-4 p-4 bg-emerald-500/10 rounded-lg border border-emerald-500/20">
                <p className="text-sm text-center">
                  <strong className="text-emerald-600">100% Union Labor</strong> at{" "}
                  <strong>$32-35/hr</strong> prevailing wages. All jobs are permanent with
                  full benefits, funded perpetually by the endowment.
                </p>
              </div>
            )}

            {viewType === "construction" && (
              <div className="mt-4 p-4 bg-amber-500/10 rounded-lg border border-amber-500/20">
                <p className="text-sm text-center">
                  <strong className="text-amber-600">Union trades:</strong> IBEW
                  (electricians), UA (plumbers), SMART (HVAC), UBC (carpenters).
                  100% local hire priority.
                </p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}
