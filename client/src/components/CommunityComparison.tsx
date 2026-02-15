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
  ArrowRight
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
  { name: "Twin Cities Metro", region: "Metro", schools: 660, students: 391875, greenhouseSqft: 4950000, jobs: 1320, produceAnnual: 29370000, endowmentShare: 2750000000, co2Tons: 29354 },
  { name: "Rochester Area", region: "Southeast", schools: 65, students: 38593, greenhouseSqft: 487500, jobs: 130, produceAnnual: 2892500, endowmentShare: 270833333, co2Tons: 2891 },
  { name: "Duluth/Iron Range", region: "Northeast", schools: 125, students: 74219, greenhouseSqft: 937500, jobs: 250, produceAnnual: 5562500, endowmentShare: 520833333, co2Tons: 5559 },
  { name: "St. Cloud Area", region: "Central", schools: 80, students: 47500, greenhouseSqft: 600000, jobs: 160, produceAnnual: 3560000, endowmentShare: 333333333, co2Tons: 3558 },
  { name: "Mankato/Southern MN", region: "South", schools: 110, students: 65313, greenhouseSqft: 825000, jobs: 220, produceAnnual: 4895000, endowmentShare: 458333333, co2Tons: 4892 },
  { name: "Moorhead/Red River Valley", region: "Northwest", schools: 60, students: 35625, greenhouseSqft: 450000, jobs: 120, produceAnnual: 2670000, endowmentShare: 250000000, co2Tons: 2669 },
  { name: "Alexandria/Lakes Region", region: "West Central", schools: 55, students: 32656, greenhouseSqft: 412500, jobs: 110, produceAnnual: 2447500, endowmentShare: 229166667, co2Tons: 2446 },
  { name: "Tribal Nations (Combined)", region: "Statewide", schools: 45, students: 26719, greenhouseSqft: 337500, jobs: 90, produceAnnual: 2002500, endowmentShare: 187500001, co2Tons: 2001 },
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

      </CardContent>
    </Card>
  );
}
