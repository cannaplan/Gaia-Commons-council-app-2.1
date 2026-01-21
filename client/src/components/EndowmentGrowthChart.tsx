import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { TrendingUp, DollarSign, Calendar } from "lucide-react";
import { motion } from "framer-motion";

interface EndowmentDataPoint {
  year: number;
  corpus: number;
  cumulativeDraws: number;
  annualDraw: number;
}

interface EndowmentGrowthChartProps {
  initialCorpus?: number;
  drawRate?: number;
  growthRate?: number;
}

const generateEndowmentData = (
  initialCorpus: number = 5000000000,
  drawRate: number = 0.045,
  growthRate: number = 0.07
): EndowmentDataPoint[] => {
  const data: EndowmentDataPoint[] = [];
  let corpus = initialCorpus;
  let cumulativeDraws = 0;

  for (let year = 2028; year <= 2078; year++) {
    const annualDraw = corpus * drawRate;
    cumulativeDraws += annualDraw;
    
    data.push({
      year,
      corpus: Math.round(corpus),
      cumulativeDraws: Math.round(cumulativeDraws),
      annualDraw: Math.round(annualDraw),
    });

    corpus = corpus * (1 + growthRate - drawRate);
  }

  return data;
};

const formatCurrency = (value: number): string => {
  if (value >= 1000000000) {
    return `$${(value / 1000000000).toFixed(1)}B`;
  }
  if (value >= 1000000) {
    return `$${(value / 1000000).toFixed(0)}M`;
  }
  return `$${value.toLocaleString()}`;
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background border rounded-lg shadow-lg p-4">
        <p className="font-bold text-foreground mb-2">Year {label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} style={{ color: entry.color }} className="text-sm">
            {entry.name}: {formatCurrency(entry.value)}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function EndowmentGrowthChart({
  initialCorpus = 5000000000,
  drawRate = 0.045,
  growthRate = 0.07
}: EndowmentGrowthChartProps = {}) {
  const [viewMode, setViewMode] = useState<"growth" | "draws">("growth");
  const data = useMemo(
    () => generateEndowmentData(initialCorpus, drawRate, growthRate),
    [initialCorpus, drawRate, growthRate]
  );

  const startData = data[0];
  const endData = data[data.length - 1];
  const year25Data = data.find(d => d.year === 2053) || data[25];

  return (
    <Card className="w-full" data-testid="endowment-growth-chart">
      <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-primary" />
          50-Year Endowment Projections
        </CardTitle>
        <div className="flex gap-2">
          <Button
            size="sm"
            variant={viewMode === "growth" ? "default" : "outline"}
            onClick={() => setViewMode("growth")}
            data-testid="btn-view-growth"
          >
            Corpus Growth
          </Button>
          <Button
            size="sm"
            variant={viewMode === "draws" ? "default" : "outline"}
            onClick={() => setViewMode("draws")}
            data-testid="btn-view-draws"
          >
            Cumulative Draws
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4 mb-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-primary/10 rounded-lg p-4 text-center"
          >
            <DollarSign className="h-6 w-6 mx-auto mb-2 text-primary" />
            <div className="text-2xl font-bold text-foreground" data-testid="text-initial-corpus">
              {formatCurrency(startData.corpus)}
            </div>
            <p className="text-sm text-muted-foreground">Initial Corpus (2028)</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-emerald-500/10 rounded-lg p-4 text-center"
          >
            <Calendar className="h-6 w-6 mx-auto mb-2 text-emerald-600" />
            <div className="text-2xl font-bold text-foreground" data-testid="text-year25-draws">
              {formatCurrency(year25Data.cumulativeDraws)}
            </div>
            <p className="text-sm text-muted-foreground">25-Year Total Draws</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-blue-500/10 rounded-lg p-4 text-center"
          >
            <TrendingUp className="h-6 w-6 mx-auto mb-2 text-blue-600" />
            <div className="text-2xl font-bold text-foreground" data-testid="text-final-corpus">
              {formatCurrency(endData.corpus)}
            </div>
            <p className="text-sm text-muted-foreground">50-Year Corpus</p>
          </motion.div>
        </div>

        <motion.div
          key={viewMode}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="h-[350px]"
          data-testid={`chart-container-${viewMode}`}
        >
          <ResponsiveContainer width="100%" height="100%">
            {viewMode === "growth" ? (
              <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorCorpus" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.1} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis
                  dataKey="year"
                  tick={{ fontSize: 12 }}
                  tickFormatter={(value) => `'${String(value).slice(-2)}`}
                />
                <YAxis
                  tick={{ fontSize: 12 }}
                  tickFormatter={(value) => formatCurrency(value)}
                  width={80}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="corpus"
                  name="Endowment Corpus"
                  stroke="#10b981"
                  fillOpacity={1}
                  fill="url(#colorCorpus)"
                  strokeWidth={2}
                />
              </AreaChart>
            ) : (
              <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorDraws" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1} />
                  </linearGradient>
                  <linearGradient id="colorAnnual" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.1} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis
                  dataKey="year"
                  tick={{ fontSize: 12 }}
                  tickFormatter={(value) => `'${String(value).slice(-2)}`}
                />
                <YAxis
                  tick={{ fontSize: 12 }}
                  tickFormatter={(value) => formatCurrency(value)}
                  width={80}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="cumulativeDraws"
                  name="Cumulative Draws"
                  stroke="#3b82f6"
                  fillOpacity={1}
                  fill="url(#colorDraws)"
                  strokeWidth={2}
                />
              </AreaChart>
            )}
          </ResponsiveContainer>
        </motion.div>

        <div className="mt-4 p-4 bg-muted/50 rounded-lg">
          <p className="text-sm text-muted-foreground text-center">
            <strong>Key Insight:</strong> With a 4.5% annual draw rate and 7% average market returns, 
            the endowment grows to <strong>{formatCurrency(endData.corpus)}</strong> over 50 years 
            while distributing <strong>{formatCurrency(endData.cumulativeDraws)}</strong> in total funding.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
