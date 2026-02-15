import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Calculator, DollarSign, TrendingUp, Users, Building2, Leaf, Heart, Trophy, Globe, Server } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";

interface FundingSource {
  name: string;
  baseRate: number;
  baseRevenue: number;
  maxRate: number;
  icon: React.ReactNode;
  color: string;
}

const fundingSources: FundingSource[] = [
  { name: "Top 20 Local Corps", baseRate: 0.4, baseRevenue: 1000, maxRate: 1.5, icon: <Building2 className="h-4 w-4" />, color: "bg-blue-500" },
  { name: "Pro Sports Franchises", baseRate: 5, baseRevenue: 100, maxRate: 10, icon: <Trophy className="h-4 w-4" />, color: "bg-orange-500" },
  { name: "Local Med/Ins", baseRate: 0.4, baseRevenue: 600, maxRate: 1.5, icon: <Heart className="h-4 w-4" />, color: "bg-red-500" },
  { name: "Out-State Corp/Med/Ins", baseRate: 0.45, baseRevenue: 3150, maxRate: 1.5, icon: <Globe className="h-4 w-4" />, color: "bg-emerald-500" },
  { name: "Data/Online Retail", baseRate: 2, baseRevenue: 2100, maxRate: 8, icon: <Server className="h-4 w-4" />, color: "bg-purple-500" },
  { name: "Out-of-Country Mining", baseRate: 10, baseRevenue: 1000, maxRate: 25, icon: <Leaf className="h-4 w-4" />, color: "bg-amber-500" },
  { name: "Federal Government", baseRate: 1, baseRevenue: 500, maxRate: 3, icon: <Building2 className="h-4 w-4" />, color: "bg-indigo-500" },
  { name: "Local Billionaires", baseRate: 1, baseRevenue: 200, maxRate: 5, icon: <Users className="h-4 w-4" />, color: "bg-pink-500" },
];

function formatMoney(millions: number): string {
  if (millions >= 1000) return `$${(millions / 1000).toFixed(2)}B`;
  return `$${millions.toFixed(0)}M`;
}

export function FundingCalculator() {
  const [rates, setRates] = useState<number[]>(fundingSources.map(s => s.baseRate));

  const calculations = useMemo(() => {
    const revenues = fundingSources.map((source, i) => {
      const ratio = rates[i] / source.baseRate;
      return source.baseRevenue * ratio;
    });
    
    const totalRevenue = revenues.reduce((a, b) => a + b, 0);
    const endowmentTarget = 5000;
    const excessRevenue = Math.max(0, totalRevenue - endowmentTarget);
    const yearlyDraw = endowmentTarget * 0.045;
    
    return {
      revenues,
      totalRevenue,
      endowmentTarget,
      excessRevenue,
      yearlyDraw,
    };
  }, [rates]);

  const updateRate = (index: number, value: number[]) => {
    const newRates = [...rates];
    newRates[index] = value[0];
    setRates(newRates);
  };

  const resetRates = () => {
    setRates(fundingSources.map(s => s.baseRate));
  };

  return (
    <Card className="glass-panel" data-testid="funding-calculator">
      <CardHeader className="flex flex-row items-center gap-2 space-y-0 pb-4">
        <Calculator className="h-5 w-5 text-primary" />
        <CardTitle className="text-lg font-semibold">Interactive Funding Calculator</CardTitle>
        <Badge 
          variant="outline" 
          className="ml-auto cursor-pointer hover-elevate"
          onClick={resetRates}
          data-testid="button-reset-calculator"
        >
          Reset
        </Badge>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-6">
          Adjust the surcharge rates to explore different funding scenarios. See how changes affect total revenue, jobs created, and students fed.
        </p>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-6">
            <h4 className="font-medium text-foreground">Adjust Surcharge Rates</h4>
            {fundingSources.map((source, index) => (
              <div key={source.name} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {source.icon}
                    <span className="text-sm font-medium">{source.name}</span>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {rates[index].toFixed(2)}% → {formatMoney(calculations.revenues[index])}
                  </Badge>
                </div>
                <Slider
                  value={[rates[index]]}
                  onValueChange={(value) => updateRate(index, value)}
                  max={source.maxRate}
                  min={0.01}
                  step={0.01}
                  className="w-full"
                  data-testid={`slider-${source.name.toLowerCase().replace(/\s/g, '-')}`}
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>0.01%</span>
                  <span className="text-primary">{source.baseRate}% (current)</span>
                  <span>{source.maxRate}%</span>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-4">
            <h4 className="font-medium text-foreground">Projected Impact</h4>
            
            <motion.div 
              key={calculations.totalRevenue}
              initial={{ scale: 0.95, opacity: 0.5 }}
              animate={{ scale: 1, opacity: 1 }}
              className="grid grid-cols-2 gap-3"
            >
              <div className="p-4 bg-primary/10 rounded-xl">
                <div className="flex items-center gap-2 mb-1">
                  <DollarSign className="h-4 w-4 text-primary" />
                  <span className="text-xs text-muted-foreground">Total Revenue</span>
                </div>
                <p className="text-2xl font-bold text-primary">{formatMoney(calculations.totalRevenue)}</p>
              </div>
              
              <div className="p-4 bg-emerald-500/10 rounded-xl">
                <div className="flex items-center gap-2 mb-1">
                  <TrendingUp className="h-4 w-4 text-emerald-600" />
                  <span className="text-xs text-muted-foreground">Excess for Expansion</span>
                </div>
                <p className="text-2xl font-bold text-emerald-600">{formatMoney(calculations.excessRevenue)}</p>
              </div>
            </motion.div>

            <div className="p-3 bg-muted/50 rounded-lg">
              <p className="text-xs text-muted-foreground">
                <strong>Note:</strong> These projections are estimates based on proposed surcharge rates. 
                The core endowment target is $5B @ 4.5% = $225M/year, with excess funds allocated to tribal programs, 
                mining alternatives, and distribution infrastructure.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
