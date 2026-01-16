import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { useMnSchoolDistricts } from "@/hooks/use-gaia";
import { 
  ArrowLeft, 
  ArrowRight, 
  School, 
  Users, 
  Leaf, 
  Building2, 
  DollarSign,
  Briefcase,
  Salad,
  CheckCircle2,
  Loader2,
  MapPin,
  Sprout,
  Calculator,
  FileText,
  Home
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";

interface SelectedSchool {
  id: string;
  name: string;
  enrollment: number;
  isCustom?: boolean;
}

interface ProduceItem {
  id: string;
  name: string;
  category: "greens" | "vegetables" | "fruits" | "herbs" | "staples";
  yieldPerSqft: number;
  growingDays: number;
  nutritionValue: string;
  selected: boolean;
}

const PRODUCE_OPTIONS: ProduceItem[] = [
  { id: "lettuce", name: "Lettuce", category: "greens", yieldPerSqft: 4.5, growingDays: 45, nutritionValue: "Vitamins A, K", selected: false },
  { id: "spinach", name: "Spinach", category: "greens", yieldPerSqft: 3.8, growingDays: 40, nutritionValue: "Iron, Vitamins A, C", selected: false },
  { id: "kale", name: "Kale", category: "greens", yieldPerSqft: 3.2, growingDays: 55, nutritionValue: "Vitamins K, A, C", selected: false },
  { id: "arugula", name: "Arugula", category: "greens", yieldPerSqft: 4.0, growingDays: 35, nutritionValue: "Vitamin K, Folate", selected: false },
  { id: "tomatoes", name: "Tomatoes", category: "vegetables", yieldPerSqft: 8.0, growingDays: 80, nutritionValue: "Vitamins C, K, Lycopene", selected: false },
  { id: "cucumbers", name: "Cucumbers", category: "vegetables", yieldPerSqft: 6.5, growingDays: 55, nutritionValue: "Vitamin K, Hydration", selected: false },
  { id: "peppers", name: "Bell Peppers", category: "vegetables", yieldPerSqft: 5.0, growingDays: 75, nutritionValue: "Vitamins C, A, B6", selected: false },
  { id: "carrots", name: "Carrots", category: "vegetables", yieldPerSqft: 4.2, growingDays: 70, nutritionValue: "Vitamin A, Beta-carotene", selected: false },
  { id: "beans", name: "Green Beans", category: "vegetables", yieldPerSqft: 3.5, growingDays: 60, nutritionValue: "Fiber, Vitamins C, K", selected: false },
  { id: "strawberries", name: "Strawberries", category: "fruits", yieldPerSqft: 2.8, growingDays: 90, nutritionValue: "Vitamin C, Antioxidants", selected: false },
  { id: "microgreens", name: "Microgreens", category: "greens", yieldPerSqft: 6.0, growingDays: 14, nutritionValue: "Concentrated nutrients", selected: false },
  { id: "basil", name: "Basil", category: "herbs", yieldPerSqft: 2.5, growingDays: 28, nutritionValue: "Vitamin K, Antioxidants", selected: false },
  { id: "cilantro", name: "Cilantro", category: "herbs", yieldPerSqft: 2.2, growingDays: 25, nutritionValue: "Vitamins A, C, K", selected: false },
  { id: "parsley", name: "Parsley", category: "herbs", yieldPerSqft: 2.0, growingDays: 30, nutritionValue: "Vitamins K, C, A", selected: false },
  { id: "squash", name: "Summer Squash", category: "vegetables", yieldPerSqft: 5.5, growingDays: 50, nutritionValue: "Vitamins C, B6", selected: false },
];

const CATEGORY_LABELS: Record<string, string> = {
  greens: "Salad Greens",
  vegetables: "Vegetables",
  fruits: "Fruits",
  herbs: "Fresh Herbs",
  staples: "Staples"
};

const STEPS = [
  { id: 1, title: "Select Schools", icon: School },
  { id: 2, title: "Choose Produce", icon: Leaf },
  { id: 3, title: "Review Program", icon: Calculator },
  { id: 4, title: "Your Pilot Plan", icon: FileText },
];

export default function ClusterBuilder() {
  const { data: districts, isLoading } = useMnSchoolDistricts();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedDistrict, setSelectedDistrict] = useState<string>("");
  const [selectedSchools, setSelectedSchools] = useState<SelectedSchool[]>([]);
  const [customSchoolName, setCustomSchoolName] = useState("");
  const [customEnrollment, setCustomEnrollment] = useState("");
  const [produceItems, setProduceItems] = useState<ProduceItem[]>(PRODUCE_OPTIONS);
  const [clusterName, setClusterName] = useState("");

  const selectedDistricts = useMemo(() => {
    if (!districts) return [];
    return districts.filter(d => d.districtName === selectedDistrict);
  }, [districts, selectedDistrict]);

  const totalEnrollment = useMemo(() => {
    return selectedSchools.reduce((sum, s) => sum + s.enrollment, 0);
  }, [selectedSchools]);

  const selectedProduce = useMemo(() => {
    return produceItems.filter(p => p.selected);
  }, [produceItems]);

  const pilotMetrics = useMemo(() => {
    if (totalEnrollment === 0 || selectedProduce.length === 0) {
      return null;
    }

    const mealsPerStudentPerYear = 180;
    const producePerMealLbs = 0.25;
    const totalProduceNeededLbs = totalEnrollment * mealsPerStudentPerYear * producePerMealLbs;
    
    const avgYieldPerSqft = selectedProduce.reduce((sum, p) => sum + p.yieldPerSqft, 0) / selectedProduce.length;
    const cyclesPerYear = 4;
    const sqftNeeded = Math.ceil(totalProduceNeededLbs / (avgYieldPerSqft * cyclesPerYear));
    
    const greenhouseCount = Math.ceil(sqftNeeded / 15000);
    const jobsCreated = Math.ceil(sqftNeeded / 5000) * 0.8;
    const annualProductionLbs = sqftNeeded * avgYieldPerSqft * cyclesPerYear;
    
    const costPerSqft = 85;
    const totalInvestment = sqftNeeded * costPerSqft;
    const annualOperatingCost = sqftNeeded * 12;
    const costPerMeal = annualOperatingCost / (totalEnrollment * mealsPerStudentPerYear);
    
    const carbonSequesteredTons = (sqftNeeded / 1000) * 0.9;
    const waterSavedGallons = sqftNeeded * 25;
    const foodMilesSaved = totalProduceNeededLbs * 1500;

    return {
      sqftNeeded,
      greenhouseCount,
      jobsCreated,
      annualProductionLbs,
      totalInvestment,
      annualOperatingCost,
      costPerMeal,
      carbonSequesteredTons,
      waterSavedGallons,
      foodMilesSaved,
      studentsServed: totalEnrollment,
      schoolCount: selectedSchools.length,
      produceVarieties: selectedProduce.length
    };
  }, [totalEnrollment, selectedProduce, selectedSchools.length]);

  const handleAddCustomSchool = () => {
    if (customSchoolName && customEnrollment) {
      const enrollment = parseInt(customEnrollment) || 0;
      if (enrollment > 0) {
        setSelectedSchools([...selectedSchools, {
          id: `custom-${Date.now()}`,
          name: customSchoolName,
          enrollment,
          isCustom: true
        }]);
        setCustomSchoolName("");
        setCustomEnrollment("");
      }
    }
  };

  const handleRemoveSchool = (id: string) => {
    setSelectedSchools(selectedSchools.filter(s => s.id !== id));
  };

  const handleToggleProduce = (id: string) => {
    setProduceItems(produceItems.map(p => 
      p.id === id ? { ...p, selected: !p.selected } : p
    ));
  };

  const handleSelectAllCategory = (category: string) => {
    const categoryItems = produceItems.filter(p => p.category === category);
    const allSelected = categoryItems.every(p => p.selected);
    setProduceItems(produceItems.map(p => 
      p.category === category ? { ...p, selected: !allSelected } : p
    ));
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1: return selectedSchools.length > 0;
      case 2: return selectedProduce.length > 0;
      case 3: return clusterName.trim().length > 0;
      default: return true;
    }
  };

  const progressPercent = (currentStep / STEPS.length) * 100;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/">
                <Button variant="ghost" size="sm" data-testid="button-back-home">
                  <Home className="h-4 w-4 mr-2" />
                  Dashboard
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold flex items-center gap-2">
                  <Sprout className="h-6 w-6 text-primary" />
                  Greenhouse Cluster Builder
                </h1>
                <p className="text-sm text-muted-foreground">Design your school's pilot program</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            {STEPS.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                  currentStep === step.id 
                    ? "bg-primary text-primary-foreground" 
                    : currentStep > step.id 
                      ? "bg-primary/20 text-primary" 
                      : "bg-muted text-muted-foreground"
                }`}>
                  {currentStep > step.id ? (
                    <CheckCircle2 className="h-5 w-5" />
                  ) : (
                    <step.icon className="h-5 w-5" />
                  )}
                  <span className="hidden md:inline font-medium">{step.title}</span>
                </div>
                {index < STEPS.length - 1 && (
                  <div className={`w-8 md:w-16 h-0.5 mx-2 ${
                    currentStep > step.id ? "bg-primary" : "bg-muted"
                  }`} />
                )}
              </div>
            ))}
          </div>
          <Progress value={progressPercent} className="h-2" />
        </div>

        <AnimatePresence mode="wait">
          {currentStep === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <div className="grid lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MapPin className="h-5 w-5" />
                      Select Your District
                    </CardTitle>
                    <CardDescription>
                      Choose your school district or add schools manually
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <Label>School District</Label>
                        <select
                          value={selectedDistrict}
                          onChange={(e) => setSelectedDistrict(e.target.value)}
                          className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm mt-1"
                          data-testid="select-district"
                        >
                          <option value="">Select a district...</option>
                          {districts?.map(d => (
                            <option key={d.id} value={d.districtName}>{d.districtName}</option>
                          ))}
                        </select>
                      </div>

                      {selectedDistrict && selectedDistricts[0] && (
                        <div className="p-3 bg-muted/50 rounded-lg">
                          <p className="text-sm font-medium">{selectedDistricts[0].districtName}</p>
                          <p className="text-xs text-muted-foreground">
                            {selectedDistricts[0].totalSchools} schools • {selectedDistricts[0].totalEnrollment.toLocaleString()} students
                          </p>
                          <Button
                            variant="outline"
                            size="sm"
                            className="mt-2"
                            onClick={() => {
                              const district = selectedDistricts[0];
                              if (!selectedSchools.some(s => s.id === `district-${district.id}`)) {
                                setSelectedSchools([...selectedSchools, {
                                  id: `district-${district.id}`,
                                  name: district.topCandidateSchool,
                                  enrollment: Math.floor(district.totalEnrollment / district.totalSchools)
                                }]);
                              }
                            }}
                            data-testid="button-add-district-school"
                          >
                            Add {selectedDistricts[0].topCandidateSchool}
                          </Button>
                        </div>
                      )}

                      <div className="border-t pt-4">
                        <Label className="text-sm font-medium">Or Add Custom School</Label>
                        <div className="grid grid-cols-2 gap-2 mt-2">
                          <Input
                            placeholder="School name"
                            value={customSchoolName}
                            onChange={(e) => setCustomSchoolName(e.target.value)}
                            data-testid="input-custom-school-name"
                          />
                          <Input
                            type="number"
                            placeholder="Enrollment"
                            value={customEnrollment}
                            onChange={(e) => setCustomEnrollment(e.target.value)}
                            data-testid="input-custom-enrollment"
                          />
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          className="mt-2"
                          onClick={handleAddCustomSchool}
                          disabled={!customSchoolName || !customEnrollment}
                          data-testid="button-add-custom-school"
                        >
                          Add School
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <School className="h-5 w-5" />
                      Your Cluster
                    </CardTitle>
                    <CardDescription>
                      Schools in your greenhouse network
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {selectedSchools.length === 0 ? (
                      <div className="text-center py-8 text-muted-foreground">
                        <School className="h-12 w-12 mx-auto mb-2 opacity-50" />
                        <p>No schools added yet</p>
                        <p className="text-sm">Select a district or add schools manually</p>
                      </div>
                    ) : (
                      <ScrollArea className="h-[300px]">
                        <div className="space-y-2">
                          {selectedSchools.map(school => (
                            <div
                              key={school.id}
                              className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
                              data-testid={`school-item-${school.id}`}
                            >
                              <div>
                                <p className="font-medium">{school.name}</p>
                                <p className="text-sm text-muted-foreground flex items-center gap-1">
                                  <Users className="h-3 w-3" />
                                  {school.enrollment.toLocaleString()} students
                                  {school.isCustom && (
                                    <Badge variant="secondary" className="ml-2 text-xs">Custom</Badge>
                                  )}
                                </p>
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleRemoveSchool(school.id)}
                                data-testid={`button-remove-school-${school.id}`}
                              >
                                Remove
                              </Button>
                            </div>
                          ))}
                        </div>
                      </ScrollArea>
                    )}

                    {selectedSchools.length > 0 && (
                      <div className="mt-4 pt-4 border-t">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Total Schools</span>
                          <span className="font-semibold">{selectedSchools.length}</span>
                        </div>
                        <div className="flex items-center justify-between mt-1">
                          <span className="text-sm text-muted-foreground">Total Students</span>
                          <span className="font-semibold">{totalEnrollment.toLocaleString()}</span>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          )}

          {currentStep === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Salad className="h-5 w-5" />
                    Select Produce for Your Lunch Program
                  </CardTitle>
                  <CardDescription>
                    Choose which vegetables, fruits, and herbs you want to grow in your greenhouse
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {Object.keys(CATEGORY_LABELS).map(category => {
                      const categoryItems = produceItems.filter(p => p.category === category);
                      if (categoryItems.length === 0) return null;
                      const allSelected = categoryItems.every(p => p.selected);
                      
                      return (
                        <div key={category}>
                          <div className="flex items-center justify-between mb-3">
                            <h3 className="font-semibold">{CATEGORY_LABELS[category]}</h3>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleSelectAllCategory(category)}
                              data-testid={`button-select-all-${category}`}
                            >
                              {allSelected ? "Deselect All" : "Select All"}
                            </Button>
                          </div>
                          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                            {categoryItems.map(item => (
                              <div
                                key={item.id}
                                className={`p-3 rounded-lg border cursor-pointer transition-all ${
                                  item.selected 
                                    ? "border-primary bg-primary/10" 
                                    : "border-border hover-elevate"
                                }`}
                                onClick={() => handleToggleProduce(item.id)}
                                data-testid={`produce-item-${item.id}`}
                              >
                                <div className="flex items-start gap-2">
                                  <Checkbox
                                    checked={item.selected}
                                    onCheckedChange={() => handleToggleProduce(item.id)}
                                  />
                                  <div className="flex-1 min-w-0">
                                    <p className="font-medium text-sm">{item.name}</p>
                                    <p className="text-xs text-muted-foreground truncate">
                                      {item.nutritionValue}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {selectedProduce.length > 0 && (
                    <div className="mt-6 pt-4 border-t">
                      <div className="flex flex-wrap gap-2">
                        <span className="text-sm text-muted-foreground">Selected:</span>
                        {selectedProduce.map(p => (
                          <Badge key={p.id} variant="secondary">{p.name}</Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          )}

          {currentStep === 3 && pilotMetrics && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <div className="grid lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calculator className="h-5 w-5" />
                      Pilot Program Metrics
                    </CardTitle>
                    <CardDescription>
                      Calculated based on your selections
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 bg-primary/10 rounded-lg" data-testid="metric-sqft">
                          <Building2 className="h-5 w-5 text-primary mb-2" />
                          <p className="text-2xl font-bold">{pilotMetrics.sqftNeeded.toLocaleString()}</p>
                          <p className="text-sm text-muted-foreground">Square Feet Needed</p>
                        </div>
                        <div className="p-4 bg-green-500/10 rounded-lg" data-testid="metric-production">
                          <Leaf className="h-5 w-5 text-green-600 mb-2" />
                          <p className="text-2xl font-bold">{Math.round(pilotMetrics.annualProductionLbs / 1000)}K</p>
                          <p className="text-sm text-muted-foreground">Lbs Produce/Year</p>
                        </div>
                        <div className="p-4 bg-blue-500/10 rounded-lg" data-testid="metric-students">
                          <Users className="h-5 w-5 text-blue-600 mb-2" />
                          <p className="text-2xl font-bold">{pilotMetrics.studentsServed.toLocaleString()}</p>
                          <p className="text-sm text-muted-foreground">Students Served</p>
                        </div>
                        <div className="p-4 bg-amber-500/10 rounded-lg" data-testid="metric-jobs">
                          <Briefcase className="h-5 w-5 text-amber-600 mb-2" />
                          <p className="text-2xl font-bold">{pilotMetrics.jobsCreated.toFixed(1)}</p>
                          <p className="text-sm text-muted-foreground">Jobs Created</p>
                        </div>
                      </div>

                      <div className="border-t pt-4 space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Greenhouses Required</span>
                          <span className="font-semibold">{pilotMetrics.greenhouseCount}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Produce Varieties</span>
                          <span className="font-semibold">{pilotMetrics.produceVarieties}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Carbon Sequestered</span>
                          <span className="font-semibold">{pilotMetrics.carbonSequesteredTons.toFixed(1)} tons/year</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Water Saved</span>
                          <span className="font-semibold">{(pilotMetrics.waterSavedGallons / 1000000).toFixed(1)}M gallons</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <DollarSign className="h-5 w-5" />
                      Financial Summary
                    </CardTitle>
                    <CardDescription>
                      Investment and operational costs
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-4 bg-muted rounded-lg">
                        <p className="text-sm text-muted-foreground mb-1">Initial Investment</p>
                        <p className="text-3xl font-bold">${(pilotMetrics.totalInvestment / 1000000).toFixed(2)}M</p>
                      </div>
                      <div className="p-4 bg-muted rounded-lg">
                        <p className="text-sm text-muted-foreground mb-1">Annual Operating Cost</p>
                        <p className="text-3xl font-bold">${(pilotMetrics.annualOperatingCost / 1000).toFixed(0)}K</p>
                      </div>
                      <div className="p-4 bg-green-500/10 rounded-lg border border-green-500/20">
                        <p className="text-sm text-muted-foreground mb-1">Cost Per Student Meal</p>
                        <p className="text-3xl font-bold text-green-600">${pilotMetrics.costPerMeal.toFixed(2)}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          vs $0.50-1.00 for conventional produce
                        </p>
                      </div>
                    </div>

                    <div className="mt-6">
                      <Label htmlFor="cluster-name">Name Your Pilot Program</Label>
                      <Input
                        id="cluster-name"
                        placeholder="e.g., North Metro Green Schools Initiative"
                        value={clusterName}
                        onChange={(e) => setClusterName(e.target.value)}
                        className="mt-2"
                        data-testid="input-cluster-name"
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          )}

          {currentStep === 4 && pilotMetrics && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <Card className="max-w-4xl mx-auto">
                <CardHeader className="text-center border-b">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <CheckCircle2 className="h-8 w-8 text-green-500" />
                  </div>
                  <CardTitle className="text-2xl">{clusterName || "Your Pilot Program"}</CardTitle>
                  <CardDescription>
                    Greenhouse Cluster Pilot Proposal
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-6">
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="text-center p-4 bg-muted rounded-lg">
                        <School className="h-8 w-8 mx-auto text-primary mb-2" />
                        <p className="text-2xl font-bold">{selectedSchools.length}</p>
                        <p className="text-sm text-muted-foreground">Schools</p>
                      </div>
                      <div className="text-center p-4 bg-muted rounded-lg">
                        <Users className="h-8 w-8 mx-auto text-blue-500 mb-2" />
                        <p className="text-2xl font-bold">{totalEnrollment.toLocaleString()}</p>
                        <p className="text-sm text-muted-foreground">Students Served</p>
                      </div>
                      <div className="text-center p-4 bg-muted rounded-lg">
                        <Building2 className="h-8 w-8 mx-auto text-amber-500 mb-2" />
                        <p className="text-2xl font-bold">{pilotMetrics.greenhouseCount}</p>
                        <p className="text-sm text-muted-foreground">Greenhouses</p>
                      </div>
                    </div>

                    <div className="border rounded-lg p-4">
                      <h3 className="font-semibold mb-3">Participating Schools</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedSchools.map(s => (
                          <Badge key={s.id} variant="outline">
                            {s.name} ({s.enrollment.toLocaleString()} students)
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="border rounded-lg p-4">
                      <h3 className="font-semibold mb-3">Produce Varieties</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedProduce.map(p => (
                          <Badge key={p.id} variant="secondary">{p.name}</Badge>
                        ))}
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="border rounded-lg p-4">
                        <h3 className="font-semibold mb-3 flex items-center gap-2">
                          <Leaf className="h-4 w-4 text-green-500" />
                          Production Metrics
                        </h3>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Greenhouse Space</span>
                            <span className="font-medium">{pilotMetrics.sqftNeeded.toLocaleString()} sqft</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Annual Production</span>
                            <span className="font-medium">{Math.round(pilotMetrics.annualProductionLbs).toLocaleString()} lbs</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Jobs Created</span>
                            <span className="font-medium">{pilotMetrics.jobsCreated.toFixed(1)}</span>
                          </div>
                        </div>
                      </div>

                      <div className="border rounded-lg p-4">
                        <h3 className="font-semibold mb-3 flex items-center gap-2">
                          <DollarSign className="h-4 w-4 text-green-500" />
                          Financial Summary
                        </h3>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Initial Investment</span>
                            <span className="font-medium">${(pilotMetrics.totalInvestment / 1000000).toFixed(2)}M</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Annual Operations</span>
                            <span className="font-medium">${(pilotMetrics.annualOperatingCost / 1000).toFixed(0)}K</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Cost Per Meal</span>
                            <span className="font-medium text-green-600">${pilotMetrics.costPerMeal.toFixed(2)}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="border rounded-lg p-4 bg-green-500/5">
                      <h3 className="font-semibold mb-3 flex items-center gap-2">
                        <Sprout className="h-4 w-4 text-green-600" />
                        Environmental Impact
                      </h3>
                      <div className="grid md:grid-cols-3 gap-4 text-center">
                        <div>
                          <p className="text-xl font-bold text-green-600">{pilotMetrics.carbonSequesteredTons.toFixed(1)}</p>
                          <p className="text-xs text-muted-foreground">Tons CO2 Sequestered/Year</p>
                        </div>
                        <div>
                          <p className="text-xl font-bold text-blue-600">{(pilotMetrics.waterSavedGallons / 1000000).toFixed(1)}M</p>
                          <p className="text-xs text-muted-foreground">Gallons Water Saved</p>
                        </div>
                        <div>
                          <p className="text-xl font-bold text-amber-600">{(pilotMetrics.foodMilesSaved / 1000000).toFixed(1)}M</p>
                          <p className="text-xs text-muted-foreground">Food Miles Eliminated</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-center gap-4 pt-4">
                      <Button variant="outline" onClick={() => window.print()} data-testid="button-print">
                        Print Proposal
                      </Button>
                      <Link href="/">
                        <Button data-testid="button-back-to-dashboard">
                          Back to Dashboard
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex justify-between mt-8">
          <Button
            variant="outline"
            onClick={() => setCurrentStep(currentStep - 1)}
            disabled={currentStep === 1}
            data-testid="button-previous-step"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Previous
          </Button>
          
          {currentStep < STEPS.length && (
            <Button
              onClick={() => setCurrentStep(currentStep + 1)}
              disabled={!canProceed()}
              data-testid="button-next-step"
            >
              Next
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
