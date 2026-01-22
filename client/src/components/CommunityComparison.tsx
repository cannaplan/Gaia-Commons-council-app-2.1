import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  Scale, 
  MapPin,
  Users,
  Salad,
  Briefcase,
  DollarSign,
  Leaf,
  School,
  ArrowRight,
  Check,
  X
} from "lucide-react";

interface CommunityData {
  name: string;
  region: string;
  schools: number;
  students: number;
  greenhouseSqft: number;
  jobs: number;
  produceAnnual: number;
  endowmentShare: number;
  co2Tons: number;
}

const MINNESOTA_COMMUNITIES: CommunityData[] = [
  { name: "Twin Cities Metro", region: "Metro", schools: 450, students: 267750, greenhouseSqft: 3375000, jobs: 900, produceAnnual: 20081250, endowmentShare: 1875000000, co2Tons: 20014 },
  { name: "Rochester Area", region: "Southeast", schools: 45, students: 26775, greenhouseSqft: 337500, jobs: 90, produceAnnual: 2008125, endowmentShare: 187500000, co2Tons: 2001 },
  { name: "Duluth/Iron Range", region: "Northeast", schools: 85, students: 50575, greenhouseSqft: 637500, jobs: 170, produceAnnual: 3793125, endowmentShare: 354166667, co2Tons: 3780 },
  { name: "St. Cloud Area", region: "Central", schools: 55, students: 32725, greenhouseSqft: 412500, jobs: 110, produceAnnual: 2454375, endowmentShare: 229166667, co2Tons: 2446 },
  { name: "Mankato/Southern MN", region: "South", schools: 75, students: 44625, greenhouseSqft: 562500, jobs: 150, produceAnnual: 3346875, endowmentShare: 312500000, co2Tons: 3336 },
  { name: "Moorhead/Red River Valley", region: "Northwest", schools: 40, students: 23800, greenhouseSqft: 300000, jobs: 80, produceAnnual: 1785000, endowmentShare: 166666667, co2Tons: 1779 },
  { name: "Alexandria/Lakes Region", region: "West Central", schools: 35, students: 20825, greenhouseSqft: 262500, jobs: 70, produceAnnual: 1561875, endowmentShare: 145833333, co2Tons: 1557 },
  { name: "Tribal Nations (Combined)", region: "Statewide", schools: 25, students: 14875, greenhouseSqft: 187500, jobs: 50, produceAnnual: 1115625, endowmentShare: 104166667, co2Tons: 1112 },
];

const formatNumber = (num: number): string => {
  if (num >= 1000000000) return `${(num / 1000000000).toFixed(1)}B`;
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
  return num.toLocaleString();
};

const formatCurrency = (num: number): string => {
  if (num >= 1000000000) return `$${(num / 1000000000).toFixed(2)}B`;
  if (num >= 1000000) return `$${(num / 1000000).toFixed(0)}M`;
  if (num >= 1000) return `$${(num / 1000).toFixed(0)}K`;
  return `$${num.toLocaleString()}`;
};

export function CommunityComparison() {
  const [community1, setCommunity1] = useState<string>("Twin Cities Metro");
  const [community2, setCommunity2] = useState<string>("Duluth/Iron Range");

  const data1 = MINNESOTA_COMMUNITIES.find(c => c.name === community1)!;
  const data2 = MINNESOTA_COMMUNITIES.find(c => c.name === community2)!;

  const comparisonMetrics = [
    { 
      label: "Schools with Greenhouses",
      icon: <School className="h-4 w-4" />,
      value1: data1.schools,
      value2: data2.schools,
      format: (n: number) => n.toLocaleString(),
    },
    { 
      label: "Students Fed Daily",
      icon: <Users className="h-4 w-4" />,
      value1: data1.students,
      value2: data2.students,
      format: formatNumber,
    },
    { 
      label: "Greenhouse Space (sqft)",
      icon: <Leaf className="h-4 w-4" />,
      value1: data1.greenhouseSqft,
      value2: data2.greenhouseSqft,
      format: formatNumber,
    },
    { 
      label: "Permanent Jobs Created",
      icon: <Briefcase className="h-4 w-4" />,
      value1: data1.jobs,
      value2: data2.jobs,
      format: (n: number) => n.toLocaleString(),
    },
    { 
      label: "Annual Produce (lbs)",
      icon: <Salad className="h-4 w-4" />,
      value1: data1.produceAnnual,
      value2: data2.produceAnnual,
      format: formatNumber,
    },
    { 
      label: "Endowment Share",
      icon: <DollarSign className="h-4 w-4" />,
      value1: data1.endowmentShare,
      value2: data2.endowmentShare,
      format: formatCurrency,
    },
  ];

  const miningComparison = [
    { metric: "Ownership", gaia: "Minnesota communities", mining: "Chilean billionaires (Luksic family)", gaiaWins: true },
    { metric: "Job Duration", gaia: "Permanent (50+ years)", mining: "Temporary (20-25 years)", gaiaWins: true },
    { metric: "Profit Destination", gaia: "Stays in Minnesota", mining: "50%+ leaves USA", gaiaWins: true },
    { metric: "Environmental Impact", gaia: "Regenerative", mining: "Destructive", gaiaWins: true },
    { metric: "Water Use", gaia: "Recirculating systems", mining: "Billions of gallons/year", gaiaWins: true },
    { metric: "Post-Closure", gaia: "Assets remain", mining: "Cleanup liability", gaiaWins: true },
  ];

  return (
    <Card className="glass-panel" data-testid="card-community-comparison">
      <CardHeader className="flex flex-row items-center gap-2 space-y-0 pb-4">
        <Scale className="h-5 w-5 text-muted-foreground" />
        <div>
          <CardTitle className="text-lg font-semibold">Community Comparison Tool</CardTitle>
          <CardDescription>Compare impact across Minnesota regions</CardDescription>
        </div>
        <Badge variant="secondary" className="ml-auto">Interactive</Badge>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block" data-testid="label-community-1">First Community</label>
            <Select value={community1} onValueChange={setCommunity1}>
              <SelectTrigger data-testid="select-community-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {MINNESOTA_COMMUNITIES.map(c => (
                  <SelectItem key={c.name} value={c.name} data-testid={`option-community-1-${c.name.toLowerCase().replace(/[^a-z]/g, '-')}`}>
                    <span className="flex items-center gap-2">
                      <MapPin className="h-3 w-3" />
                      {c.name}
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-center">
            <ArrowRight className="h-6 w-6 text-muted-foreground hidden md:block" />
            <span className="text-sm text-muted-foreground md:hidden">vs.</span>
          </div>

          <div>
            <label className="text-sm font-medium text-foreground mb-2 block" data-testid="label-community-2">Second Community</label>
            <Select value={community2} onValueChange={setCommunity2}>
              <SelectTrigger data-testid="select-community-2">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {MINNESOTA_COMMUNITIES.map(c => (
                  <SelectItem key={c.name} value={c.name} data-testid={`option-community-2-${c.name.toLowerCase().replace(/[^a-z]/g, '-')}`}>
                    <span className="flex items-center gap-2">
                      <MapPin className="h-3 w-3" />
                      {c.name}
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table data-testid="table-community-comparison">
            <TableHeader>
              <TableRow>
                <TableHead data-testid="th-metric">Metric</TableHead>
                <TableHead className="text-right" data-testid="th-community-1">{community1}</TableHead>
                <TableHead className="text-right" data-testid="th-community-2">{community2}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {comparisonMetrics.map((metric, idx) => (
                <TableRow key={metric.label} data-testid={`row-metric-${idx}`}>
                  <TableCell>
                    <div className="flex items-center gap-2 text-sm text-foreground" data-testid={`cell-metric-label-${idx}`}>
                      {metric.icon}
                      {metric.label}
                    </div>
                  </TableCell>
                  <TableCell className="text-right text-sm font-medium" data-testid={`cell-metric-value1-${idx}`}>
                    {metric.format(metric.value1)}
                  </TableCell>
                  <TableCell className="text-right text-sm font-medium" data-testid={`cell-metric-value2-${idx}`}>
                    {metric.format(metric.value2)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="mt-8 pt-6 border-t border-border/50">
          <h4 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2" data-testid="heading-gaia-vs-mining">
            <Scale className="h-4 w-4 text-muted-foreground" />
            Gaia Commons vs. Twin Metals Mining — Side by Side
          </h4>
          <div className="overflow-x-auto">
            <Table data-testid="table-gaia-vs-mining">
              <TableHeader>
                <TableRow>
                  <TableHead data-testid="th-comparison">Comparison</TableHead>
                  <TableHead data-testid="th-gaia">Gaia Commons</TableHead>
                  <TableHead data-testid="th-mining">Twin Metals Mining</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {miningComparison.map((row, idx) => (
                  <TableRow key={row.metric} data-testid={`row-mining-${idx}`}>
                    <TableCell className="text-foreground" data-testid={`cell-mining-metric-${idx}`}>{row.metric}</TableCell>
                    <TableCell data-testid={`cell-gaia-value-${idx}`}>
                      <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
                        <Check className="h-4 w-4" />
                        {row.gaia}
                      </div>
                    </TableCell>
                    <TableCell data-testid={`cell-mining-value-${idx}`}>
                      <div className="flex items-center gap-2 text-red-600 dark:text-red-400">
                        <X className="h-4 w-4" />
                        {row.mining}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
