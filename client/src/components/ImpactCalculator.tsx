import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { 
  Calculator, 
  School, 
  Users, 
  Salad, 
  DollarSign,
  Briefcase,
  Leaf,
  Building
} from "lucide-react";

interface CalculatorInputs {
  schoolCount: number;
  avgStudentsPerSchool: number;
  avgGreenhouseSqft: number;
}

interface CalculatedImpact {
  totalStudents: number;
  totalSqft: number;
  annualProduceLbs: number;
  jobsFTE: number;
  constructionJobs: number;
  annualCO2Tons: number;
  annualValue: number;
  endowmentShare: number;
}

const STATEWIDE_DEFAULTS = {
  schoolCount: 1200,
  avgStudentsPerSchool: 594,
  avgGreenhouseSqft: 7500,
};

export function ImpactCalculator() {
  const [inputs, setInputs] = useState<CalculatorInputs>({
    schoolCount: 6,
    avgStudentsPerSchool: 938,
    avgGreenhouseSqft: 7500,
  });

  const impact = useMemo<CalculatedImpact>(() => {
    const totalStudents = inputs.schoolCount * inputs.avgStudentsPerSchool;
    const totalSqft = inputs.schoolCount * inputs.avgGreenhouseSqft;
    const annualProduceLbs = totalStudents * 75;
    const jobsFTE = inputs.schoolCount * 2;
    const constructionJobs = Math.round(inputs.schoolCount * 11.58);
    // Avoided transport emissions: produce weight × avg distance × EPA emission factor
    // EPA: 161.8 g CO2/ton-mile for freight trucks, avg food transport: 1,200 miles
    const produceTons = annualProduceLbs / 2000;
    const annualCO2Tons = Math.round(produceTons * 1200 * 161.8 / 1000000);
    // State savings: Students × 180 school days × $1.82/meal (1/3 of $5.45 meal cost = fruits/vegetables)
    const annualValue = totalStudents * 180 * 1.82;
    const endowmentShare = (inputs.schoolCount / 1200) * 5000000000;

    return {
      totalStudents,
      totalSqft,
      annualProduceLbs,
      jobsFTE,
      constructionJobs,
      annualCO2Tons,
      annualValue,
      endowmentShare,
    };
  }, [inputs]);

  const formatNumber = (num: number): string => {
    if (num >= 1000000000) return `$${(num / 1000000000).toFixed(1)}B`;
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toLocaleString();
  };

  const formatCurrency = (num: number): string => {
    if (num >= 1000000000) return `$${(num / 1000000000).toFixed(2)}B`;
    if (num >= 1000000) return `$${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `$${(num / 1000).toFixed(0)}K`;
    return `$${num.toLocaleString()}`;
  };

  return (
    <Card className="glass-panel" data-testid="card-impact-calculator">
      <CardHeader className="flex flex-row items-center gap-2 space-y-0 pb-4">
        <Calculator className="h-5 w-5 text-muted-foreground" />
        <div>
          <CardTitle className="text-lg font-semibold">Impact Calculator</CardTitle>
          <CardDescription>See what Gaia Commons means for YOUR community</CardDescription>
        </div>
        <Badge variant="secondary" className="ml-auto">Interactive</Badge>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <Label className="flex items-center gap-2 mb-3" data-testid="label-school-count">
                <School className="h-4 w-4 text-muted-foreground" />
                Number of Schools in Your District
              </Label>
              <div className="flex items-center gap-4">
                <Slider
                  value={[inputs.schoolCount]}
                  onValueChange={(v) => setInputs({ ...inputs, schoolCount: v[0] })}
                  min={1}
                  max={100}
                  step={1}
                  className="flex-1"
                  data-testid="slider-school-count"
                />
                <Input
                  type="number"
                  value={inputs.schoolCount}
                  onChange={(e) => setInputs({ ...inputs, schoolCount: Math.max(1, parseInt(e.target.value) || 1) })}
                  className="w-20"
                  data-testid="input-school-count"
                />
              </div>
            </div>

            <div>
              <Label className="flex items-center gap-2 mb-3" data-testid="label-students">
                <Users className="h-4 w-4 text-muted-foreground" />
                Average Students per School
              </Label>
              <div className="flex items-center gap-4">
                <Slider
                  value={[inputs.avgStudentsPerSchool]}
                  onValueChange={(v) => setInputs({ ...inputs, avgStudentsPerSchool: v[0] })}
                  min={100}
                  max={2000}
                  step={50}
                  className="flex-1"
                  data-testid="slider-students"
                />
                <Input
                  type="number"
                  value={inputs.avgStudentsPerSchool}
                  onChange={(e) => setInputs({ ...inputs, avgStudentsPerSchool: Math.max(100, parseInt(e.target.value) || 100) })}
                  className="w-20"
                  data-testid="input-students"
                />
              </div>
            </div>

            <div>
              <Label className="flex items-center gap-2 mb-3" data-testid="label-sqft">
                <Building className="h-4 w-4 text-muted-foreground" />
                Greenhouse Size (sqft per school)
              </Label>
              <div className="flex items-center gap-4">
                <Slider
                  value={[inputs.avgGreenhouseSqft]}
                  onValueChange={(v) => setInputs({ ...inputs, avgGreenhouseSqft: v[0] })}
                  min={2500}
                  max={15000}
                  step={500}
                  className="flex-1"
                  data-testid="slider-sqft"
                />
                <Input
                  type="number"
                  value={inputs.avgGreenhouseSqft}
                  onChange={(e) => setInputs({ ...inputs, avgGreenhouseSqft: Math.max(2500, parseInt(e.target.value) || 2500) })}
                  className="w-24"
                  data-testid="input-sqft"
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setInputs({
                  schoolCount: 6,
                  avgStudentsPerSchool: 938,
                  avgGreenhouseSqft: 7500,
                })}
                data-testid="button-reset-pilot"
              >
                Reset to Pilot (6 schools)
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setInputs(STATEWIDE_DEFAULTS)}
                data-testid="button-reset-statewide"
              >
                Use Statewide Average
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-900/50" data-testid="result-students">
              <div className="flex items-center gap-2 mb-2">
                <Users className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                <span className="text-sm font-medium text-blue-700 dark:text-blue-400" data-testid="label-result-students">Students Fed</span>
              </div>
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400" data-testid="value-result-students">{formatNumber(impact.totalStudents)}</p>
              <p className="text-xs text-muted-foreground">daily fresh produce</p>
            </div>

            <div className="p-4 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-900/50" data-testid="result-produce">
              <div className="flex items-center gap-2 mb-2">
                <Salad className="h-4 w-4 text-green-600 dark:text-green-400" />
                <span className="text-sm font-medium text-green-700 dark:text-green-400" data-testid="label-result-produce">Annual Produce</span>
              </div>
              <p className="text-2xl font-bold text-green-600 dark:text-green-400" data-testid="value-result-produce">{formatNumber(impact.annualProduceLbs)} lb</p>
              <p className="text-xs text-muted-foreground">75 lb per student/year</p>
            </div>

            <div className="p-4 bg-purple-50 dark:bg-purple-950/20 rounded-lg border border-purple-200 dark:border-purple-900/50" data-testid="result-jobs">
              <div className="flex items-center gap-2 mb-2">
                <Briefcase className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                <span className="text-sm font-medium text-purple-700 dark:text-purple-400" data-testid="label-result-jobs">FTE Jobs</span>
              </div>
              <p className="text-2xl font-bold text-purple-600 dark:text-purple-400" data-testid="value-result-jobs">{impact.jobsFTE.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground">permanent positions</p>
            </div>

            <div className="p-4 bg-amber-50 dark:bg-amber-950/20 rounded-lg border border-amber-200 dark:border-amber-900/50" data-testid="result-construction">
              <div className="flex items-center gap-2 mb-2">
                <Building className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                <span className="text-sm font-medium text-amber-700 dark:text-amber-400" data-testid="label-result-construction">Construction Jobs</span>
              </div>
              <p className="text-2xl font-bold text-amber-600 dark:text-amber-400" data-testid="value-result-construction">{impact.constructionJobs.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground">during build phase</p>
            </div>

            <div className="p-4 bg-emerald-50 dark:bg-emerald-950/20 rounded-lg border border-emerald-200 dark:border-emerald-900/50" data-testid="result-co2">
              <div className="flex items-center gap-2 mb-2">
                <Leaf className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                <span className="text-sm font-medium text-emerald-700 dark:text-emerald-400" data-testid="label-result-co2">CO2 Emissions Avoided</span>
              </div>
              <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400" data-testid="value-result-co2">{impact.annualCO2Tons.toLocaleString()} tons</p>
              <p className="text-xs text-muted-foreground">annually</p>
            </div>

            <div className="p-4 bg-muted/50 rounded-lg border border-border/50" data-testid="result-value">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="h-4 w-4 text-foreground" />
                <span className="text-sm font-medium text-foreground" data-testid="label-result-value">State Savings</span>
              </div>
              <p className="text-2xl font-bold text-foreground" data-testid="value-result-value">{formatCurrency(impact.annualValue)}</p>
              <p className="text-xs text-muted-foreground">$1.82/meal × 180 days</p>
            </div>
          </div>
        </div>

        <div className="mt-6 p-4 bg-muted/30 rounded-lg border border-border/50" data-testid="result-endowment">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div>
              <p className="text-sm font-medium text-foreground" data-testid="label-endowment-share">Your District's Share of $5B Endowment</p>
              <p className="text-xs text-muted-foreground">Proportional funding based on school count</p>
            </div>
            <p className="text-2xl font-bold text-foreground" data-testid="value-endowment-share">{formatCurrency(impact.endowmentShare)}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
