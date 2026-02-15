import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
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
  Home,
  Ruler,
  Box,
  Lightbulb,
  Droplets,
  Thermometer,
  Layers,
  GraduationCap,
  Wrench,
  Heart,
  AlertCircle,
  Building,
  Lock,
  Unlock
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";

interface SchoolGreenhouse {
  id: string;
  name: string;
  enrollment: number;
  gradeLevel: "elementary" | "middle" | "high" | "k8" | "k12";
  schoolType: "public" | "private" | "charter";
  isCustom?: boolean;
  greenhouseLength: number;
  greenhouseWidth: number;
  greenhouseSqft: number;
}

interface ProduceItem {
  id: string;
  name: string;
  category: "greens" | "vegetables" | "berries" | "fruits" | "exotictrees" | "orchard" | "herbs" | "specialty";
  yieldPerSqft: number;
  growingDays: number;
  nutritionValue: string;
  selected: boolean;
  allocation: number;
}

interface EquipmentItem {
  id: string;
  name: string;
  category: "growing" | "lighting" | "irrigation" | "climate" | "infrastructure";
  unitCost: number;
  unitsPerSqft: number;
  description: string;
}

interface StaffPosition {
  role: string;
  type: "employee" | "student" | "volunteer";
  countPerSchool: number;
  hoursPerWeek: number;
  hourlyWage: number;
  description: string;
}

const PRODUCE_OPTIONS: ProduceItem[] = [
  // SALAD GREENS
  { id: "lettuce", name: "Butterhead Lettuce", category: "greens", yieldPerSqft: 4.5, growingDays: 45, nutritionValue: "Vitamins A, K", selected: false, allocation: 0 },
  { id: "romaine", name: "Romaine Lettuce", category: "greens", yieldPerSqft: 4.2, growingDays: 50, nutritionValue: "Vitamins A, K, Folate", selected: false, allocation: 0 },
  { id: "spinach", name: "Baby Spinach", category: "greens", yieldPerSqft: 3.8, growingDays: 40, nutritionValue: "Iron, Vitamins A, C", selected: false, allocation: 0 },
  { id: "kale", name: "Tuscan Kale", category: "greens", yieldPerSqft: 3.2, growingDays: 55, nutritionValue: "Vitamins K, A, C", selected: false, allocation: 0 },
  { id: "arugula", name: "Wild Arugula", category: "greens", yieldPerSqft: 4.0, growingDays: 35, nutritionValue: "Vitamin K, Folate", selected: false, allocation: 0 },
  { id: "microgreens", name: "Microgreen Mix", category: "greens", yieldPerSqft: 6.0, growingDays: 14, nutritionValue: "40x concentrated nutrients", selected: false, allocation: 0 },
  { id: "swisschard", name: "Rainbow Swiss Chard", category: "greens", yieldPerSqft: 3.5, growingDays: 50, nutritionValue: "Vitamins K, A, C, Magnesium", selected: false, allocation: 0 },
  { id: "mizuna", name: "Mizuna", category: "greens", yieldPerSqft: 3.8, growingDays: 35, nutritionValue: "Vitamins A, C, K", selected: false, allocation: 0 },
  { id: "bokchoy", name: "Baby Bok Choy", category: "greens", yieldPerSqft: 4.0, growingDays: 45, nutritionValue: "Vitamins A, C, Calcium", selected: false, allocation: 0 },
  { id: "mustardgreens", name: "Mustard Greens", category: "greens", yieldPerSqft: 3.6, growingDays: 40, nutritionValue: "Vitamins K, A, C", selected: false, allocation: 0 },
  
  // VEGETABLES
  { id: "tomatoes", name: "Heirloom Tomatoes", category: "vegetables", yieldPerSqft: 8.0, growingDays: 80, nutritionValue: "Vitamins C, K, Lycopene", selected: false, allocation: 0 },
  { id: "cherrytomatoes", name: "Cherry Tomatoes", category: "vegetables", yieldPerSqft: 7.5, growingDays: 65, nutritionValue: "Vitamins C, K, Lycopene", selected: false, allocation: 0 },
  { id: "cucumbers", name: "English Cucumbers", category: "vegetables", yieldPerSqft: 6.5, growingDays: 55, nutritionValue: "Vitamin K, Hydration", selected: false, allocation: 0 },
  { id: "peppers", name: "Sweet Bell Peppers", category: "vegetables", yieldPerSqft: 5.0, growingDays: 75, nutritionValue: "Vitamins C, A, B6", selected: false, allocation: 0 },
  { id: "hotpeppers", name: "Hot Peppers Mix", category: "vegetables", yieldPerSqft: 4.5, growingDays: 80, nutritionValue: "Vitamins C, A, Capsaicin", selected: false, allocation: 0 },
  { id: "carrots", name: "Rainbow Carrots", category: "vegetables", yieldPerSqft: 4.2, growingDays: 70, nutritionValue: "Vitamin A, Beta-carotene", selected: false, allocation: 0 },
  { id: "beans", name: "French Green Beans", category: "vegetables", yieldPerSqft: 3.5, growingDays: 60, nutritionValue: "Fiber, Vitamins C, K", selected: false, allocation: 0 },
  { id: "squash", name: "Zucchini", category: "vegetables", yieldPerSqft: 5.5, growingDays: 50, nutritionValue: "Vitamins C, B6", selected: false, allocation: 0 },
  { id: "yellowsquash", name: "Yellow Summer Squash", category: "vegetables", yieldPerSqft: 5.2, growingDays: 50, nutritionValue: "Vitamins C, B6, Manganese", selected: false, allocation: 0 },
  { id: "eggplant", name: "Japanese Eggplant", category: "vegetables", yieldPerSqft: 4.8, growingDays: 70, nutritionValue: "Fiber, Antioxidants", selected: false, allocation: 0 },
  { id: "radishes", name: "French Breakfast Radishes", category: "vegetables", yieldPerSqft: 3.8, growingDays: 25, nutritionValue: "Vitamin C, Potassium", selected: false, allocation: 0 },
  { id: "beets", name: "Golden & Red Beets", category: "vegetables", yieldPerSqft: 3.5, growingDays: 55, nutritionValue: "Folate, Manganese, Nitrates", selected: false, allocation: 0 },
  { id: "peas", name: "Sugar Snap Peas", category: "vegetables", yieldPerSqft: 2.8, growingDays: 60, nutritionValue: "Vitamins C, K, Fiber", selected: false, allocation: 0 },
  { id: "snowpeas", name: "Snow Peas", category: "vegetables", yieldPerSqft: 2.6, growingDays: 55, nutritionValue: "Vitamins C, K", selected: false, allocation: 0 },
  { id: "broccoli", name: "Broccoli", category: "vegetables", yieldPerSqft: 3.2, growingDays: 70, nutritionValue: "Vitamins C, K, Sulforaphane", selected: false, allocation: 0 },
  { id: "cauliflower", name: "Colorful Cauliflower", category: "vegetables", yieldPerSqft: 3.0, growingDays: 75, nutritionValue: "Vitamins C, K, B6", selected: false, allocation: 0 },
  { id: "kohlrabi", name: "Purple Kohlrabi", category: "vegetables", yieldPerSqft: 3.2, growingDays: 55, nutritionValue: "Vitamins C, B6, Potassium", selected: false, allocation: 0 },
  { id: "leeks", name: "Baby Leeks", category: "vegetables", yieldPerSqft: 2.8, growingDays: 90, nutritionValue: "Vitamins K, A, Manganese", selected: false, allocation: 0 },
  { id: "scallions", name: "Green Onions", category: "vegetables", yieldPerSqft: 3.5, growingDays: 60, nutritionValue: "Vitamins K, C", selected: false, allocation: 0 },
  
  // BERRIES
  { id: "strawberries", name: "Everbearing Strawberries", category: "berries", yieldPerSqft: 2.8, growingDays: 90, nutritionValue: "Vitamin C, Antioxidants", selected: false, allocation: 0 },
  { id: "alpinestrawberries", name: "Alpine Strawberries", category: "berries", yieldPerSqft: 1.8, growingDays: 100, nutritionValue: "Vitamin C, Intense flavor", selected: false, allocation: 0 },
  { id: "blueberries", name: "Highbush Blueberries", category: "berries", yieldPerSqft: 1.5, growingDays: 120, nutritionValue: "Antioxidants, Vitamin C, K", selected: false, allocation: 0 },
  { id: "raspberries", name: "Red Raspberries", category: "berries", yieldPerSqft: 1.8, growingDays: 110, nutritionValue: "Fiber, Vitamin C, Manganese", selected: false, allocation: 0 },
  { id: "goldenraspberries", name: "Golden Raspberries", category: "berries", yieldPerSqft: 1.6, growingDays: 115, nutritionValue: "Vitamin C, Antioxidants", selected: false, allocation: 0 },
  { id: "blackberries", name: "Thornless Blackberries", category: "berries", yieldPerSqft: 2.0, growingDays: 105, nutritionValue: "Vitamins C, K, Fiber", selected: false, allocation: 0 },
  { id: "gooseberries", name: "Gooseberries", category: "berries", yieldPerSqft: 1.4, growingDays: 120, nutritionValue: "Vitamin C, Fiber", selected: false, allocation: 0 },
  { id: "currants", name: "Red & Black Currants", category: "berries", yieldPerSqft: 1.5, growingDays: 110, nutritionValue: "Vitamin C, Iron, Potassium", selected: false, allocation: 0 },
  { id: "mulberries", name: "Dwarf Mulberries", category: "berries", yieldPerSqft: 2.2, growingDays: 100, nutritionValue: "Vitamin C, Iron, Resveratrol", selected: false, allocation: 0 },
  { id: "groundcherries", name: "Ground Cherries", category: "berries", yieldPerSqft: 2.5, growingDays: 75, nutritionValue: "Vitamins A, C, Antioxidants", selected: false, allocation: 0 },
  { id: "honeyberries", name: "Honeyberries (Haskap)", category: "berries", yieldPerSqft: 1.3, growingDays: 130, nutritionValue: "Antioxidants, Vitamin C", selected: false, allocation: 0 },
  { id: "lingonberries", name: "Lingonberries", category: "berries", yieldPerSqft: 1.2, growingDays: 140, nutritionValue: "Vitamin E, Antioxidants", selected: false, allocation: 0 },
  { id: "goji", name: "Goji Berries", category: "berries", yieldPerSqft: 1.0, growingDays: 150, nutritionValue: "Vitamins A, C, Iron, Zeaxanthin", selected: false, allocation: 0 },
  
  // GREENHOUSE FRUITS
  { id: "melons", name: "Charentais Melons", category: "fruits", yieldPerSqft: 3.2, growingDays: 85, nutritionValue: "Vitamins A, C", selected: false, allocation: 0 },
  { id: "watermelon", name: "Personal Watermelons", category: "fruits", yieldPerSqft: 3.0, growingDays: 80, nutritionValue: "Vitamins A, C, Lycopene", selected: false, allocation: 0 },
  { id: "honeydew", name: "Honeydew Melons", category: "fruits", yieldPerSqft: 2.8, growingDays: 90, nutritionValue: "Vitamins C, B6, Potassium", selected: false, allocation: 0 },
  { id: "cantaloupe", name: "French Cantaloupe", category: "fruits", yieldPerSqft: 3.0, growingDays: 85, nutritionValue: "Vitamins A, C", selected: false, allocation: 0 },
  { id: "passionfruit", name: "Passion Fruit", category: "fruits", yieldPerSqft: 1.8, growingDays: 180, nutritionValue: "Vitamins A, C, Iron, Fiber", selected: false, allocation: 0 },
  { id: "figs", name: "Fresh Figs", category: "fruits", yieldPerSqft: 2.0, growingDays: 150, nutritionValue: "Fiber, Potassium, Calcium", selected: false, allocation: 0 },
  { id: "kiwi", name: "Hardy Kiwi", category: "fruits", yieldPerSqft: 1.5, growingDays: 180, nutritionValue: "Vitamins C, K, E", selected: false, allocation: 0 },
  { id: "grapes", name: "Table Grapes", category: "fruits", yieldPerSqft: 2.5, growingDays: 170, nutritionValue: "Vitamins C, K, Resveratrol", selected: false, allocation: 0 },
  
  // EXOTIC GREENHOUSE TREES
  { id: "dwarflemons", name: "Meyer Lemon Trees", category: "exotictrees", yieldPerSqft: 0.8, growingDays: 365, nutritionValue: "Vitamin C, Citric acid", selected: false, allocation: 0 },
  { id: "dwarflimes", name: "Key Lime Trees", category: "exotictrees", yieldPerSqft: 0.7, growingDays: 365, nutritionValue: "Vitamin C, Antioxidants", selected: false, allocation: 0 },
  { id: "dwarforanges", name: "Calamondin Orange Trees", category: "exotictrees", yieldPerSqft: 0.9, growingDays: 365, nutritionValue: "Vitamins C, A", selected: false, allocation: 0 },
  { id: "kumquats", name: "Nagami Kumquat Trees", category: "exotictrees", yieldPerSqft: 0.6, growingDays: 365, nutritionValue: "Vitamins C, A, Fiber", selected: false, allocation: 0 },
  { id: "dwarfbananas", name: "Dwarf Cavendish Bananas", category: "exotictrees", yieldPerSqft: 1.2, growingDays: 270, nutritionValue: "Potassium, Vitamin B6", selected: false, allocation: 0 },
  { id: "papaya", name: "Dwarf Papaya Trees", category: "exotictrees", yieldPerSqft: 1.5, growingDays: 240, nutritionValue: "Vitamins C, A, Papain enzyme", selected: false, allocation: 0 },
  { id: "avocado", name: "Dwarf Avocado Trees", category: "exotictrees", yieldPerSqft: 0.5, growingDays: 365, nutritionValue: "Healthy fats, Vitamins K, E", selected: false, allocation: 0 },
  { id: "guava", name: "Tropical Guava Trees", category: "exotictrees", yieldPerSqft: 0.8, growingDays: 300, nutritionValue: "Vitamin C, Fiber, Lycopene", selected: false, allocation: 0 },
  { id: "pomegranate", name: "Dwarf Pomegranate Trees", category: "exotictrees", yieldPerSqft: 0.6, growingDays: 365, nutritionValue: "Antioxidants, Vitamin C, K", selected: false, allocation: 0 },
  { id: "olivetrees", name: "Arbequina Olive Trees", category: "exotictrees", yieldPerSqft: 0.4, growingDays: 365, nutritionValue: "Healthy fats, Vitamin E", selected: false, allocation: 0 },
  { id: "dragonfruit", name: "Dragon Fruit Cactus", category: "exotictrees", yieldPerSqft: 0.7, growingDays: 180, nutritionValue: "Vitamin C, Fiber, Antioxidants", selected: false, allocation: 0 },
  { id: "cherimoya", name: "Cherimoya Trees", category: "exotictrees", yieldPerSqft: 0.5, growingDays: 365, nutritionValue: "Vitamins C, B6, Fiber", selected: false, allocation: 0 },
  
  // ORCHARD FRUIT TREES (Outdoor)
  { id: "appletrees", name: "Apple Orchard (Outdoor)", category: "orchard", yieldPerSqft: 0.3, growingDays: 180, nutritionValue: "Fiber, Vitamin C, Antioxidants", selected: false, allocation: 0 },
  { id: "peartrees", name: "Pear Orchard (Outdoor)", category: "orchard", yieldPerSqft: 0.3, growingDays: 180, nutritionValue: "Fiber, Vitamin C, K", selected: false, allocation: 0 },
  { id: "cherrytrees", name: "Cherry Orchard (Outdoor)", category: "orchard", yieldPerSqft: 0.25, growingDays: 120, nutritionValue: "Antioxidants, Vitamin C, Melatonin", selected: false, allocation: 0 },
  { id: "plumtrees", name: "Plum Orchard (Outdoor)", category: "orchard", yieldPerSqft: 0.28, growingDays: 150, nutritionValue: "Vitamins C, K, Fiber", selected: false, allocation: 0 },
  { id: "peachtrees", name: "Peach Orchard (Outdoor)", category: "orchard", yieldPerSqft: 0.35, growingDays: 160, nutritionValue: "Vitamins A, C, Potassium", selected: false, allocation: 0 },
  { id: "apricottrees", name: "Apricot Orchard (Outdoor)", category: "orchard", yieldPerSqft: 0.28, growingDays: 140, nutritionValue: "Vitamins A, C, E", selected: false, allocation: 0 },
  { id: "hazelnuttrees", name: "Hazelnut Grove (Outdoor)", category: "orchard", yieldPerSqft: 0.15, growingDays: 200, nutritionValue: "Vitamin E, Healthy fats", selected: false, allocation: 0 },
  { id: "walnuttrees", name: "Walnut Grove (Outdoor)", category: "orchard", yieldPerSqft: 0.12, growingDays: 210, nutritionValue: "Omega-3, Antioxidants", selected: false, allocation: 0 },
  { id: "chestnuttrees", name: "Chestnut Grove (Outdoor)", category: "orchard", yieldPerSqft: 0.18, growingDays: 180, nutritionValue: "Fiber, Vitamins C, B6", selected: false, allocation: 0 },
  { id: "elderberrytrees", name: "Elderberry Bushes (Outdoor)", category: "orchard", yieldPerSqft: 0.4, growingDays: 120, nutritionValue: "Antioxidants, Immune support", selected: false, allocation: 0 },
  { id: "aronia", name: "Aronia Berry Bushes (Outdoor)", category: "orchard", yieldPerSqft: 0.5, growingDays: 110, nutritionValue: "Highest antioxidants of any berry", selected: false, allocation: 0 },
  { id: "serviceberry", name: "Serviceberry Trees (Outdoor)", category: "orchard", yieldPerSqft: 0.35, growingDays: 100, nutritionValue: "Fiber, Manganese, Antioxidants", selected: false, allocation: 0 },
  
  // HERBS
  { id: "basil", name: "Genovese Basil", category: "herbs", yieldPerSqft: 2.5, growingDays: 28, nutritionValue: "Vitamin K, Antioxidants", selected: false, allocation: 0 },
  { id: "thaibasil", name: "Thai Basil", category: "herbs", yieldPerSqft: 2.3, growingDays: 30, nutritionValue: "Vitamins A, K", selected: false, allocation: 0 },
  { id: "cilantro", name: "Cilantro", category: "herbs", yieldPerSqft: 2.2, growingDays: 25, nutritionValue: "Vitamins A, C, K", selected: false, allocation: 0 },
  { id: "parsley", name: "Italian Parsley", category: "herbs", yieldPerSqft: 2.0, growingDays: 30, nutritionValue: "Vitamins K, C, A", selected: false, allocation: 0 },
  { id: "mint", name: "Spearmint", category: "herbs", yieldPerSqft: 2.3, growingDays: 30, nutritionValue: "Vitamin A, Antioxidants", selected: false, allocation: 0 },
  { id: "peppermint", name: "Peppermint", category: "herbs", yieldPerSqft: 2.2, growingDays: 30, nutritionValue: "Menthol, Antioxidants", selected: false, allocation: 0 },
  { id: "dill", name: "Fresh Dill", category: "herbs", yieldPerSqft: 1.8, growingDays: 40, nutritionValue: "Vitamins A, C, Manganese", selected: false, allocation: 0 },
  { id: "chives", name: "Chives", category: "herbs", yieldPerSqft: 2.0, growingDays: 60, nutritionValue: "Vitamins K, A, C", selected: false, allocation: 0 },
  { id: "oregano", name: "Greek Oregano", category: "herbs", yieldPerSqft: 1.8, growingDays: 45, nutritionValue: "Vitamin K, Antioxidants", selected: false, allocation: 0 },
  { id: "thyme", name: "French Thyme", category: "herbs", yieldPerSqft: 1.5, growingDays: 50, nutritionValue: "Vitamin C, Manganese", selected: false, allocation: 0 },
  { id: "rosemary", name: "Rosemary", category: "herbs", yieldPerSqft: 1.2, growingDays: 80, nutritionValue: "Vitamin A, Calcium, Iron", selected: false, allocation: 0 },
  { id: "sage", name: "Garden Sage", category: "herbs", yieldPerSqft: 1.3, growingDays: 75, nutritionValue: "Vitamin K, Antioxidants", selected: false, allocation: 0 },
  { id: "lemongrass", name: "Lemongrass", category: "herbs", yieldPerSqft: 1.8, growingDays: 100, nutritionValue: "Citral, Antioxidants", selected: false, allocation: 0 },
  { id: "tarragon", name: "French Tarragon", category: "herbs", yieldPerSqft: 1.5, growingDays: 60, nutritionValue: "Vitamin A, Potassium", selected: false, allocation: 0 },
  { id: "lavender", name: "Culinary Lavender", category: "herbs", yieldPerSqft: 1.0, growingDays: 90, nutritionValue: "Calming properties, Antioxidants", selected: false, allocation: 0 },
  
  // SPECIALTY CROPS
  { id: "mushrooms", name: "Shiitake Mushrooms", category: "specialty", yieldPerSqft: 4.0, growingDays: 21, nutritionValue: "Vitamin D, B vitamins", selected: false, allocation: 0 },
  { id: "oyster", name: "Oyster Mushrooms", category: "specialty", yieldPerSqft: 4.5, growingDays: 18, nutritionValue: "Protein, B vitamins, Iron", selected: false, allocation: 0 },
  { id: "lionsmane", name: "Lion's Mane Mushrooms", category: "specialty", yieldPerSqft: 3.0, growingDays: 28, nutritionValue: "Nerve growth factors, Antioxidants", selected: false, allocation: 0 },
  { id: "maitake", name: "Maitake Mushrooms", category: "specialty", yieldPerSqft: 2.5, growingDays: 35, nutritionValue: "Beta-glucans, Vitamin D", selected: false, allocation: 0 },
  { id: "edibleflowers", name: "Edible Flower Mix", category: "specialty", yieldPerSqft: 1.5, growingDays: 45, nutritionValue: "Antioxidants, Natural colors", selected: false, allocation: 0 },
  { id: "nasturtium", name: "Nasturtium Flowers", category: "specialty", yieldPerSqft: 1.8, growingDays: 50, nutritionValue: "Vitamin C, Peppery flavor", selected: false, allocation: 0 },
  { id: "borage", name: "Borage Flowers", category: "specialty", yieldPerSqft: 1.3, growingDays: 55, nutritionValue: "Omega-6, Anti-inflammatory", selected: false, allocation: 0 },
  { id: "sprouts", name: "Sprouted Seeds Mix", category: "specialty", yieldPerSqft: 8.0, growingDays: 7, nutritionValue: "Enzymes, Concentrated nutrients", selected: false, allocation: 0 },
  { id: "wheatgrass", name: "Wheatgrass", category: "specialty", yieldPerSqft: 5.0, growingDays: 10, nutritionValue: "Chlorophyll, Vitamins A, C, E", selected: false, allocation: 0 },
  { id: "sunflowergreens", name: "Sunflower Greens", category: "specialty", yieldPerSqft: 4.5, growingDays: 12, nutritionValue: "Protein, Vitamins E, B", selected: false, allocation: 0 },
  { id: "peagreens", name: "Pea Shoot Greens", category: "specialty", yieldPerSqft: 4.0, growingDays: 14, nutritionValue: "Vitamins A, C, Folic acid", selected: false, allocation: 0 },
];

const EQUIPMENT_LIST: EquipmentItem[] = [
  { id: "growtowers", name: "Vertical Grow Towers", category: "growing", unitCost: 350, unitsPerSqft: 0.05, description: "ZipGrow-style vertical towers for leafy greens and herbs" },
  { id: "growbeds", name: "NFT Grow Channels", category: "growing", unitCost: 45, unitsPerSqft: 0.15, description: "Nutrient Film Technique channels for lettuce and greens" },
  { id: "deepwater", name: "Deep Water Culture Rafts", category: "growing", unitCost: 25, unitsPerSqft: 0.20, description: "Floating raft systems for larger plants" },
  { id: "ledpanels", name: "LED Grow Panels (400W)", category: "lighting", unitCost: 450, unitsPerSqft: 0.02, description: "Full-spectrum LED panels for supplemental lighting" },
  { id: "ledstrips", name: "LED Strip Lighting", category: "lighting", unitCost: 85, unitsPerSqft: 0.08, description: "Inter-canopy lighting for vertical systems" },
  { id: "lightcontrol", name: "Light Timer Controllers", category: "lighting", unitCost: 150, unitsPerSqft: 0.005, description: "Programmable lighting schedules" },
  { id: "mainpump", name: "Main Circulation Pumps", category: "irrigation", unitCost: 280, unitsPerSqft: 0.003, description: "High-efficiency recirculating pumps" },
  { id: "drippers", name: "Drip Irrigation Lines", category: "irrigation", unitCost: 3, unitsPerSqft: 0.5, description: "Precision drip emitters and tubing" },
  { id: "nutrient", name: "Nutrient Dosing System", category: "irrigation", unitCost: 1200, unitsPerSqft: 0.001, description: "Automated pH and EC management" },
  { id: "reservoir", name: "Nutrient Reservoirs", category: "irrigation", unitCost: 450, unitsPerSqft: 0.004, description: "Food-grade tanks with covers" },
  { id: "hvac", name: "Climate Control HVAC", category: "climate", unitCost: 2500, unitsPerSqft: 0.002, description: "Heating, cooling, and dehumidification" },
  { id: "vents", name: "Automated Roof Vents", category: "climate", unitCost: 650, unitsPerSqft: 0.003, description: "Temperature-responsive ventilation" },
  { id: "fans", name: "Circulation Fans", category: "climate", unitCost: 120, unitsPerSqft: 0.01, description: "Air movement for plant health" },
  { id: "co2", name: "CO2 Enrichment System", category: "climate", unitCost: 800, unitsPerSqft: 0.001, description: "Controlled CO2 supplementation" },
  { id: "sensors", name: "Environmental Sensors", category: "climate", unitCost: 350, unitsPerSqft: 0.005, description: "Temperature, humidity, CO2 monitoring" },
  { id: "benches", name: "Growing Benches", category: "infrastructure", unitCost: 95, unitsPerSqft: 0.12, description: "Aluminum growing benches with drainage" },
  { id: "flooring", name: "Greenhouse Flooring", category: "infrastructure", unitCost: 8, unitsPerSqft: 1.0, description: "Permeable, cleanable floor covering" },
  { id: "storage", name: "Tool & Supply Storage", category: "infrastructure", unitCost: 400, unitsPerSqft: 0.01, description: "Organized storage for supplies" },
  { id: "workstation", name: "Harvest Workstations", category: "infrastructure", unitCost: 650, unitsPerSqft: 0.008, description: "Stainless steel prep areas" },
];

const STAFF_POSITIONS: StaffPosition[] = [
  { role: "Greenhouse Manager", type: "employee", countPerSchool: 0.5, hoursPerWeek: 40, hourlyWage: 28, description: "Oversees daily operations, planting schedules, and staff" },
  { role: "Growing Technician", type: "employee", countPerSchool: 1, hoursPerWeek: 40, hourlyWage: 22, description: "Manages plant care, harvesting, and equipment maintenance" },
  { role: "Nutrition Educator", type: "employee", countPerSchool: 0.25, hoursPerWeek: 20, hourlyWage: 25, description: "Integrates greenhouse learning into curriculum" },
  { role: "Student Intern (HS)", type: "student", countPerSchool: 4, hoursPerWeek: 10, hourlyWage: 15, description: "High school students earning credits and experience" },
  { role: "Student Helper (MS)", type: "student", countPerSchool: 6, hoursPerWeek: 4, hourlyWage: 0, description: "Middle school students learning agriculture basics" },
  { role: "Student Explorer (K-5)", type: "student", countPerSchool: 8, hoursPerWeek: 2, hourlyWage: 0, description: "Elementary students participating in garden activities" },
  { role: "Master Gardener", type: "volunteer", countPerSchool: 2, hoursPerWeek: 4, hourlyWage: 0, description: "Community experts mentoring students" },
  { role: "Parent Volunteer", type: "volunteer", countPerSchool: 4, hoursPerWeek: 2, hourlyWage: 0, description: "Parent helpers for special events and harvests" },
  { role: "Retiree Mentor", type: "volunteer", countPerSchool: 1, hoursPerWeek: 6, hourlyWage: 0, description: "Senior community members sharing knowledge" },
];

const CATEGORY_LABELS: Record<string, string> = {
  greens: "Salad Greens",
  vegetables: "Vegetables",
  berries: "Berries",
  fruits: "Greenhouse Fruits",
  exotictrees: "Exotic Trees (Indoor)",
  orchard: "Orchard Trees (Outdoor)",
  herbs: "Fresh Herbs",
  specialty: "Specialty Crops"
};

const GRADE_LABELS: Record<string, string> = {
  elementary: "Elementary (K-5)",
  middle: "Middle (6-8)",
  high: "High School (9-12)",
  k8: "K-8",
  k12: "K-12"
};

const SCHOOL_TYPE_LABELS: Record<string, string> = {
  public: "Public",
  private: "Private",
  charter: "Charter"
};

const MIN_GREENHOUSE_SQFT = 3500;
const MAX_GREENHOUSE_SQFT = 4500;
const DEFAULT_GREENHOUSE_LENGTH = 70;
const DEFAULT_GREENHOUSE_WIDTH = 55;

const STEPS = [
  { id: 1, title: "Select Schools", icon: School },
  { id: 2, title: "Configure Greenhouses", icon: Ruler },
  { id: 3, title: "Choose Produce", icon: Leaf },
  { id: 4, title: "Equipment & Staff", icon: Wrench },
  { id: 5, title: "Review Plan", icon: FileText },
];

export default function ClusterBuilder() {
  const districts: any[] = [];
  const isLoading = false;
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedDistrict, setSelectedDistrict] = useState<string>("");
  const [schools, setSchools] = useState<SchoolGreenhouse[]>([]);
  const [customSchoolName, setCustomSchoolName] = useState("");
  const [customEnrollment, setCustomEnrollment] = useState("");
  const [customGradeLevel, setCustomGradeLevel] = useState<SchoolGreenhouse["gradeLevel"]>("high");
  const [customSchoolType, setCustomSchoolType] = useState<SchoolGreenhouse["schoolType"]>("public");
  const [produceItems, setProduceItems] = useState<ProduceItem[]>(PRODUCE_OPTIONS);
  const [clusterName, setClusterName] = useState("");
  const [activeSchoolId, setActiveSchoolId] = useState<string | null>(null);

  const selectedDistricts = useMemo(() => {
    if (!districts) return [];
    return districts.filter(d => d.districtName === selectedDistrict);
  }, [districts, selectedDistrict]);

  const totalEnrollment = useMemo(() => {
    return schools.reduce((sum, s) => sum + s.enrollment, 0);
  }, [schools]);

  const totalGreenhouseSqft = useMemo(() => {
    return schools.reduce((sum, s) => sum + s.greenhouseSqft, 0);
  }, [schools]);

  const selectedProduce = useMemo(() => {
    return produceItems.filter(p => p.selected);
  }, [produceItems]);

  const clusterValidation = useMemo(() => {
    const hasElementary = schools.some(s => s.gradeLevel === "elementary" || s.gradeLevel === "k8" || s.gradeLevel === "k12");
    const hasMiddle = schools.some(s => s.gradeLevel === "middle" || s.gradeLevel === "k8" || s.gradeLevel === "k12");
    const hasHigh = schools.some(s => s.gradeLevel === "high" || s.gradeLevel === "k12");
    const hasK12Coverage = hasElementary && hasMiddle && hasHigh;
    
    const hasPublic = schools.some(s => s.schoolType === "public");
    const hasPrivate = schools.some(s => s.schoolType === "private" || s.schoolType === "charter");
    const hasMixedTypes = hasPublic && hasPrivate;
    
    return {
      hasK12Coverage,
      hasMixedTypes,
      hasElementary,
      hasMiddle,
      hasHigh,
      hasPublic,
      hasPrivate,
      schoolCount: schools.length,
      isValid: schools.length >= 2
    };
  }, [schools]);

  const equipmentForCluster = useMemo(() => {
    return EQUIPMENT_LIST.map(eq => ({
      ...eq,
      totalUnits: Math.ceil(totalGreenhouseSqft * eq.unitsPerSqft),
      totalCost: Math.ceil(totalGreenhouseSqft * eq.unitsPerSqft) * eq.unitCost
    }));
  }, [totalGreenhouseSqft]);

  const staffingForCluster = useMemo(() => {
    return STAFF_POSITIONS.map(pos => ({
      ...pos,
      totalCount: Math.ceil(pos.countPerSchool * schools.length),
      totalHours: Math.ceil(pos.countPerSchool * schools.length) * pos.hoursPerWeek,
      totalWeeklyCost: Math.ceil(pos.countPerSchool * schools.length) * pos.hoursPerWeek * pos.hourlyWage
    }));
  }, [schools.length]);

  const pilotMetrics = useMemo(() => {
    if (totalEnrollment === 0 || selectedProduce.length === 0) {
      return null;
    }

    const mealsPerStudentPerYear = 180;
    const producePerMealLbs = 0.25;
    const totalProduceNeededLbs = totalEnrollment * mealsPerStudentPerYear * producePerMealLbs;
    
    const avgYieldPerSqft = selectedProduce.reduce((sum, p) => sum + p.yieldPerSqft, 0) / selectedProduce.length;
    const cyclesPerYear = 4;
    const annualProductionLbs = totalGreenhouseSqft * avgYieldPerSqft * cyclesPerYear;
    
    const employeeStaff = staffingForCluster.filter(s => s.type === "employee");
    const totalEmployees = employeeStaff.reduce((sum, s) => sum + s.totalCount, 0);
    const totalStudents = staffingForCluster.filter(s => s.type === "student").reduce((sum, s) => sum + s.totalCount, 0);
    const totalVolunteers = staffingForCluster.filter(s => s.type === "volunteer").reduce((sum, s) => sum + s.totalCount, 0);
    
    const equipmentCost = equipmentForCluster.reduce((sum, e) => sum + e.totalCost, 0);
    const constructionCostPerSqft = 85;
    const totalConstructionCost = totalGreenhouseSqft * constructionCostPerSqft;
    const totalInvestment = equipmentCost + totalConstructionCost;
    
    const annualLaborCost = staffingForCluster
      .filter(s => s.type === "employee")
      .reduce((sum, s) => sum + (s.totalWeeklyCost * 52), 0);
    const annualOperatingCost = (totalGreenhouseSqft * 12) + annualLaborCost;
    const costPerMeal = annualOperatingCost / (totalEnrollment * mealsPerStudentPerYear);
    
    // Avoided transport emissions: produce weight × avg distance × EPA emission factor
    // EPA: 161.8 g CO2/ton-mile, avg food transport: 1,200 miles
    const produceTons = annualProductionLbs / 2000;
    const carbonAvoidedTons = produceTons * 1200 * 161.8 / 1000000;
    const waterSavedGallons = annualProductionLbs * 2.6; // conservative 10x water savings per lb (Arizona State research)
    const foodMilesSaved = (produceTons / 20) * 1200; // truck-miles eliminated

    return {
      sqftNeeded: totalGreenhouseSqft,
      greenhouseCount: schools.length,
      totalEmployees,
      totalStudents,
      totalVolunteers,
      annualProductionLbs,
      totalInvestment,
      equipmentCost,
      constructionCost: totalConstructionCost,
      annualOperatingCost,
      costPerMeal,
      carbonAvoidedTons,
      waterSavedGallons,
      foodMilesSaved,
      studentsServed: totalEnrollment,
      schoolCount: schools.length,
      produceVarieties: selectedProduce.length
    };
  }, [totalEnrollment, selectedProduce, schools.length, totalGreenhouseSqft, equipmentForCluster, staffingForCluster]);

  const handleAddCustomSchool = () => {
    if (customSchoolName && customEnrollment) {
      const enrollment = parseInt(customEnrollment) || 0;
      if (enrollment > 0) {
        const defaultSqft = Math.round((MIN_GREENHOUSE_SQFT + MAX_GREENHOUSE_SQFT) / 2);
        setSchools([...schools, {
          id: `custom-${Date.now()}`,
          name: customSchoolName,
          enrollment,
          gradeLevel: customGradeLevel,
          schoolType: customSchoolType,
          isCustom: true,
          greenhouseLength: DEFAULT_GREENHOUSE_LENGTH,
          greenhouseWidth: DEFAULT_GREENHOUSE_WIDTH,
          greenhouseSqft: defaultSqft
        }]);
        setCustomSchoolName("");
        setCustomEnrollment("");
      }
    }
  };

  const handleAddDistrictSchool = () => {
    const district = selectedDistricts[0];
    if (district && !schools.some(s => s.id === `district-${district.id}`)) {
      const defaultSqft = Math.round((MIN_GREENHOUSE_SQFT + MAX_GREENHOUSE_SQFT) / 2);
      setSchools([...schools, {
        id: `district-${district.id}`,
        name: district.topCandidateSchool,
        enrollment: Math.floor(district.totalEnrollment / district.totalSchools),
        gradeLevel: "high",
        schoolType: "public",
        greenhouseLength: DEFAULT_GREENHOUSE_LENGTH,
        greenhouseWidth: DEFAULT_GREENHOUSE_WIDTH,
        greenhouseSqft: defaultSqft
      }]);
    }
  };

  const handleRemoveSchool = (id: string) => {
    setSchools(schools.filter(s => s.id !== id));
    if (activeSchoolId === id) setActiveSchoolId(null);
  };

  const handleUpdateGreenhouseDimensions = (id: string, length: number, width: number) => {
    const sqft = length * width;
    let finalLength = length;
    let finalWidth = width;
    let finalSqft = sqft;
    
    if (sqft < MIN_GREENHOUSE_SQFT) {
      const ratio = length / width;
      finalSqft = MIN_GREENHOUSE_SQFT;
      finalWidth = Math.ceil(Math.sqrt(MIN_GREENHOUSE_SQFT / ratio));
      finalLength = Math.ceil(finalWidth * ratio);
      finalSqft = finalLength * finalWidth;
    }
    
    setSchools(schools.map(s => 
      s.id === id ? { ...s, greenhouseLength: finalLength, greenhouseWidth: finalWidth, greenhouseSqft: finalSqft } : s
    ));
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
      case 1: 
        return schools.length >= 2 && clusterValidation.hasK12Coverage;
      case 2: return schools.every(s => s.greenhouseSqft >= MIN_GREENHOUSE_SQFT);
      case 3: return selectedProduce.length > 0;
      case 4: return true;
      default: return true;
    }
  };

  const getStepBlockerMessage = () => {
    if (currentStep === 1) {
      if (schools.length < 2) return "Add at least 2 schools to your cluster";
      if (!clusterValidation.hasK12Coverage) return "Include K-12 coverage (elementary + middle + high schools)";
    }
    return null;
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
          <div className="flex items-center justify-between flex-wrap gap-4">
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
                <p className="text-sm text-muted-foreground">Design your K-12 pilot program with custom greenhouses</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant={clusterValidation.hasK12Coverage ? "default" : "outline"} className="gap-1">
                {clusterValidation.hasK12Coverage ? <CheckCircle2 className="h-3 w-3" /> : <AlertCircle className="h-3 w-3" />}
                K-12 Coverage
              </Badge>
              <Badge variant={clusterValidation.hasMixedTypes ? "default" : "outline"} className="gap-1">
                {clusterValidation.hasMixedTypes ? <CheckCircle2 className="h-3 w-3" /> : <AlertCircle className="h-3 w-3" />}
                Public+Private
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2 overflow-x-auto">
            {STEPS.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors whitespace-nowrap ${
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
                  <div className={`w-4 md:w-12 h-0.5 mx-1 md:mx-2 ${
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
                      Add Schools to Your Cluster
                    </CardTitle>
                    <CardDescription>
                      Select schools from Minnesota districts or add custom schools. Each school gets its own greenhouse (min {MIN_GREENHOUSE_SQFT.toLocaleString()} sqft).
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
                            {selectedDistricts[0].totalSchools} schools | {selectedDistricts[0].totalEnrollment.toLocaleString()} students
                          </p>
                          <Button
                            variant="outline"
                            size="sm"
                            className="mt-2"
                            onClick={handleAddDistrictSchool}
                            disabled={schools.some(s => s.id === `district-${selectedDistricts[0].id}`)}
                            data-testid="button-add-district-school"
                          >
                            Add {selectedDistricts[0].topCandidateSchool}
                          </Button>
                        </div>
                      )}

                      <div className="border-t pt-4">
                        <Label className="text-sm font-medium">Or Add Custom School</Label>
                        <div className="space-y-2 mt-2">
                          <div className="grid grid-cols-2 gap-2">
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
                          <div className="grid grid-cols-2 gap-2">
                            <select
                              value={customGradeLevel}
                              onChange={(e) => setCustomGradeLevel(e.target.value as SchoolGreenhouse["gradeLevel"])}
                              className="h-10 px-3 rounded-md border border-input bg-background text-sm"
                              data-testid="select-grade-level"
                            >
                              {Object.entries(GRADE_LABELS).map(([value, label]) => (
                                <option key={value} value={value}>{label}</option>
                              ))}
                            </select>
                            <select
                              value={customSchoolType}
                              onChange={(e) => setCustomSchoolType(e.target.value as SchoolGreenhouse["schoolType"])}
                              className="h-10 px-3 rounded-md border border-input bg-background text-sm"
                              data-testid="select-school-type"
                            >
                              {Object.entries(SCHOOL_TYPE_LABELS).map(([value, label]) => (
                                <option key={value} value={value}>{label}</option>
                              ))}
                            </select>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={handleAddCustomSchool}
                            disabled={!customSchoolName || !customEnrollment}
                            data-testid="button-add-custom-school"
                          >
                            Add School
                          </Button>
                        </div>
                      </div>

                      <div className="p-3 bg-amber-50 dark:bg-amber-950/30 rounded-lg border border-amber-200 dark:border-amber-800">
                        <h4 className="text-sm font-medium text-amber-800 dark:text-amber-300 flex items-center gap-2">
                          <AlertCircle className="h-4 w-4" />
                          Cluster Requirements
                        </h4>
                        <ul className="mt-2 space-y-1 text-xs text-amber-700 dark:text-amber-400">
                          <li className="flex items-center gap-2">
                            {clusterValidation.hasK12Coverage ? <CheckCircle2 className="h-3 w-3 text-green-600" /> : <AlertCircle className="h-3 w-3" />}
                            Include K-12 grade coverage (elementary + middle + high)
                          </li>
                          <li className="flex items-center gap-2">
                            {clusterValidation.hasMixedTypes ? <CheckCircle2 className="h-3 w-3 text-green-600" /> : <AlertCircle className="h-3 w-3" />}
                            Mix public and private/charter schools when possible
                          </li>
                          <li className="flex items-center gap-2">
                            {clusterValidation.schoolCount >= 2 ? <CheckCircle2 className="h-3 w-3 text-green-600" /> : <AlertCircle className="h-3 w-3" />}
                            Minimum 2 schools per cluster
                          </li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <School className="h-5 w-5" />
                      Your Cluster Schools
                    </CardTitle>
                    <CardDescription>
                      Each school will have its own greenhouse facility
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {schools.length === 0 ? (
                      <div className="text-center py-8 text-muted-foreground">
                        <School className="h-12 w-12 mx-auto mb-2 opacity-50" />
                        <p>No schools added yet</p>
                        <p className="text-sm">Add at least 2 schools with K-12 coverage</p>
                      </div>
                    ) : (
                      <ScrollArea className="h-[350px]">
                        <div className="space-y-2">
                          {schools.map(school => (
                            <div
                              key={school.id}
                              className="p-3 bg-muted/50 rounded-lg border border-border/50"
                              data-testid={`school-item-${school.id}`}
                            >
                              <div className="flex items-start justify-between gap-2">
                                <div className="flex-1 min-w-0">
                                  <p className="font-medium truncate">{school.name}</p>
                                  <div className="flex flex-wrap gap-1 mt-1">
                                    <Badge variant="outline" className="text-xs">
                                      {GRADE_LABELS[school.gradeLevel]}
                                    </Badge>
                                    <Badge variant={school.schoolType === "public" ? "secondary" : "default"} className="text-xs gap-1">
                                      {school.schoolType === "public" ? <Unlock className="h-2 w-2" /> : <Lock className="h-2 w-2" />}
                                      {SCHOOL_TYPE_LABELS[school.schoolType]}
                                    </Badge>
                                    {school.isCustom && (
                                      <Badge variant="outline" className="text-xs">Custom</Badge>
                                    )}
                                  </div>
                                  <p className="text-sm text-muted-foreground mt-1 flex items-center gap-2">
                                    <Users className="h-3 w-3" />
                                    {school.enrollment.toLocaleString()} students
                                    <span className="text-muted-foreground/50">|</span>
                                    <Building2 className="h-3 w-3" />
                                    {school.greenhouseSqft.toLocaleString()} sqft
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
                            </div>
                          ))}
                        </div>
                      </ScrollArea>
                    )}

                    {schools.length > 0 && (
                      <div className="mt-4 pt-4 border-t space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Total Schools</span>
                          <span className="font-semibold">{schools.length}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Total Students</span>
                          <span className="font-semibold">{totalEnrollment.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Total Greenhouse Space</span>
                          <span className="font-semibold">{totalGreenhouseSqft.toLocaleString()} sqft</span>
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
              <div className="grid lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <School className="h-5 w-5" />
                        School Greenhouses
                      </CardTitle>
                      <CardDescription>
                        Select a school to configure its greenhouse dimensions
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ScrollArea className="h-[400px]">
                        <div className="space-y-2">
                          {schools.map(school => (
                            <div
                              key={school.id}
                              className={`p-3 rounded-lg border cursor-pointer transition-all ${
                                activeSchoolId === school.id 
                                  ? "border-primary bg-primary/10" 
                                  : "border-border hover-elevate"
                              }`}
                              onClick={() => setActiveSchoolId(school.id)}
                              data-testid={`greenhouse-config-${school.id}`}
                            >
                              <p className="font-medium text-sm">{school.name}</p>
                              <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                                <span>{school.greenhouseLength}' x {school.greenhouseWidth}'</span>
                                <span className="text-muted-foreground/50">|</span>
                                <span className={school.greenhouseSqft >= MIN_GREENHOUSE_SQFT ? "text-green-600" : "text-red-600"}>
                                  {school.greenhouseSqft.toLocaleString()} sqft
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </ScrollArea>
                    </CardContent>
                  </Card>
                </div>

                <div className="lg:col-span-2">
                  {activeSchoolId ? (
                    <>
                      {(() => {
                        const school = schools.find(s => s.id === activeSchoolId);
                        if (!school) return null;
                        return (
                          <div className="space-y-6">
                            <Card>
                              <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                  <Ruler className="h-5 w-5" />
                                  {school.name} - Greenhouse Dimensions
                                </CardTitle>
                                <CardDescription>
                                  Minimum size: {MIN_GREENHOUSE_SQFT.toLocaleString()} sqft | Average statewide: ~7,500 sqft
                                </CardDescription>
                              </CardHeader>
                              <CardContent>
                                <div className="grid md:grid-cols-2 gap-6">
                                  <div className="space-y-4">
                                    <div>
                                      <Label>Length (feet)</Label>
                                      <Input
                                        type="number"
                                        value={school.greenhouseLength}
                                        onChange={(e) => handleUpdateGreenhouseDimensions(
                                          school.id, 
                                          parseInt(e.target.value) || 50, 
                                          school.greenhouseWidth
                                        )}
                                        min={50}
                                        max={200}
                                        className="mt-1"
                                        data-testid="input-greenhouse-length"
                                      />
                                    </div>
                                    <div>
                                      <Label>Width (feet)</Label>
                                      <Input
                                        type="number"
                                        value={school.greenhouseWidth}
                                        onChange={(e) => handleUpdateGreenhouseDimensions(
                                          school.id, 
                                          school.greenhouseLength, 
                                          parseInt(e.target.value) || 50
                                        )}
                                        min={30}
                                        max={100}
                                        className="mt-1"
                                        data-testid="input-greenhouse-width"
                                      />
                                    </div>
                                    <div className="p-3 bg-muted rounded-lg">
                                      <p className="text-sm text-muted-foreground">Total Square Feet</p>
                                      <p className={`text-2xl font-bold ${school.greenhouseSqft >= MIN_GREENHOUSE_SQFT ? "text-green-600" : "text-red-600"}`}>
                                        {school.greenhouseSqft.toLocaleString()} sqft
                                      </p>
                                      {school.greenhouseSqft < MIN_GREENHOUSE_SQFT && (
                                        <p className="text-xs text-red-600 mt-1">
                                          Below minimum {MIN_GREENHOUSE_SQFT.toLocaleString()} sqft
                                        </p>
                                      )}
                                    </div>
                                  </div>

                                  <div className="space-y-4">
                                    <Tabs defaultValue="2d">
                                      <TabsList className="w-full">
                                        <TabsTrigger value="2d" className="flex-1">2D Layout</TabsTrigger>
                                        <TabsTrigger value="3d" className="flex-1">3D View</TabsTrigger>
                                      </TabsList>
                                      <TabsContent value="2d" className="mt-4">
                                        <div className="border rounded-lg p-4 bg-slate-50 dark:bg-slate-900">
                                          <svg viewBox={`0 0 ${school.greenhouseLength + 20} ${school.greenhouseWidth + 20}`} className="w-full h-auto" data-testid="greenhouse-2d-layout">
                                            <rect x="10" y="10" width={school.greenhouseLength} height={school.greenhouseWidth} fill="none" stroke="currentColor" strokeWidth="2" className="text-primary" />
                                            
                                            {Array.from({ length: Math.floor(school.greenhouseLength / 8) }).map((_, i) => (
                                              <g key={`tower-${i}`}>
                                                <rect x={15 + i * 8} y={15} width="4" height={school.greenhouseWidth - 10} fill="currentColor" className="text-green-500/30" />
                                                <line x1={17 + i * 8} y1={15} x2={17 + i * 8} y2={school.greenhouseWidth + 5} stroke="currentColor" strokeWidth="0.5" className="text-green-600" />
                                              </g>
                                            ))}
                                            
                                            <rect x={school.greenhouseLength - 8} y={school.greenhouseWidth - 8} width="6" height="6" fill="currentColor" className="text-blue-500" />
                                            <text x={school.greenhouseLength - 5} y={school.greenhouseWidth + 8} fontSize="4" textAnchor="middle" className="fill-muted-foreground">Tank</text>
                                            
                                            <rect x="12" y={school.greenhouseWidth - 8} width="8" height="6" fill="currentColor" className="text-amber-500" />
                                            <text x="16" y={school.greenhouseWidth + 8} fontSize="4" textAnchor="middle" className="fill-muted-foreground">Entry</text>
                                            
                                            <text x={school.greenhouseLength / 2 + 10} y={school.greenhouseWidth + 18} fontSize="5" textAnchor="middle" className="fill-foreground font-medium">
                                              {school.greenhouseLength}' x {school.greenhouseWidth}' = {school.greenhouseSqft.toLocaleString()} sqft
                                            </text>
                                          </svg>
                                          <div className="mt-3 flex flex-wrap gap-2 text-xs">
                                            <Badge variant="outline" className="gap-1"><div className="w-2 h-2 bg-green-500 rounded" /> Grow Towers</Badge>
                                            <Badge variant="outline" className="gap-1"><div className="w-2 h-2 bg-blue-500 rounded" /> Reservoir</Badge>
                                            <Badge variant="outline" className="gap-1"><div className="w-2 h-2 bg-amber-500 rounded" /> Entry</Badge>
                                          </div>
                                        </div>
                                      </TabsContent>
                                      <TabsContent value="3d" className="mt-4">
                                        <div className="border rounded-lg p-4 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 min-h-[200px] flex items-center justify-center" data-testid="greenhouse-3d-view">
                                          <div className="relative" style={{ perspective: "500px" }}>
                                            <div 
                                              className="border-2 border-green-600 bg-green-500/10 rounded"
                                              style={{
                                                width: `${Math.min(school.greenhouseLength * 1.5, 250)}px`,
                                                height: `${Math.min(school.greenhouseWidth * 0.8, 120)}px`,
                                                transform: "rotateX(15deg) rotateY(-15deg)",
                                                transformStyle: "preserve-3d"
                                              }}
                                            >
                                              <div className="absolute inset-2 grid grid-cols-6 gap-1">
                                                {Array.from({ length: 18 }).map((_, i) => (
                                                  <div key={i} className="bg-green-600/40 rounded-sm" />
                                                ))}
                                              </div>
                                              <div className="absolute -top-4 left-0 right-0 h-4 bg-gradient-to-b from-sky-200/50 to-transparent rounded-t border-t-2 border-l-2 border-r-2 border-green-600/50" 
                                                style={{ transform: "rotateX(-30deg)", transformOrigin: "bottom" }} 
                                              />
                                            </div>
                                            <div className="text-center mt-4 text-sm font-medium">
                                              {school.name} Greenhouse
                                            </div>
                                          </div>
                                        </div>
                                      </TabsContent>
                                    </Tabs>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>

                            <Card>
                              <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                  <Calculator className="h-5 w-5" />
                                  Quick Metrics for {school.name}
                                </CardTitle>
                              </CardHeader>
                              <CardContent>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                  <div className="p-3 bg-green-500/10 rounded-lg text-center">
                                    <Leaf className="h-5 w-5 mx-auto text-green-600 mb-1" />
                                    <p className="text-lg font-bold">{Math.round(school.greenhouseSqft * 4 * 4 / 1000)}K</p>
                                    <p className="text-xs text-muted-foreground">Lbs/Year</p>
                                  </div>
                                  <div className="p-3 bg-blue-500/10 rounded-lg text-center">
                                    <Users className="h-5 w-5 mx-auto text-blue-600 mb-1" />
                                    <p className="text-lg font-bold">{Math.round(school.greenhouseSqft * 4 * 4 / 180 / 0.25)}</p>
                                    <p className="text-xs text-muted-foreground">Students Fed</p>
                                  </div>
                                  <div className="p-3 bg-amber-500/10 rounded-lg text-center">
                                    <DollarSign className="h-5 w-5 mx-auto text-amber-600 mb-1" />
                                    <p className="text-lg font-bold">${Math.round(school.greenhouseSqft * 85 / 1000)}K</p>
                                    <p className="text-xs text-muted-foreground">Build Cost</p>
                                  </div>
                                  <div className="p-3 bg-purple-500/10 rounded-lg text-center">
                                    <Briefcase className="h-5 w-5 mx-auto text-purple-600 mb-1" />
                                    <p className="text-lg font-bold">{(school.greenhouseSqft / 5000 * 0.8).toFixed(1)}</p>
                                    <p className="text-xs text-muted-foreground">FTE Jobs</p>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          </div>
                        );
                      })()}
                    </>
                  ) : (
                    <Card className="h-full flex items-center justify-center">
                      <CardContent className="text-center py-12">
                        <Building2 className="h-16 w-16 mx-auto text-muted-foreground/30 mb-4" />
                        <p className="text-muted-foreground">Select a school to configure its greenhouse</p>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {currentStep === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Salad className="h-5 w-5" />
                    Select Produce for Your Cluster
                  </CardTitle>
                  <CardDescription>
                    Choose which crops to grow across your {schools.length} school greenhouses ({totalGreenhouseSqft.toLocaleString()} sqft total)
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
                                    <p className="text-xs text-muted-foreground">
                                      {item.yieldPerSqft} lbs/sqft | {item.growingDays}d
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
                      <div className="flex flex-wrap gap-2 items-center">
                        <span className="text-sm text-muted-foreground">Selected ({selectedProduce.length}):</span>
                        {selectedProduce.map(p => (
                          <Badge key={p.id} variant="secondary">{p.name}</Badge>
                        ))}
                      </div>
                      <div className="mt-4 p-3 bg-green-500/10 rounded-lg">
                        <p className="text-sm font-medium text-green-700 dark:text-green-300">
                          Estimated Annual Production: {Math.round(totalGreenhouseSqft * (selectedProduce.reduce((sum, p) => sum + p.yieldPerSqft, 0) / selectedProduce.length) * 4).toLocaleString()} lbs
                        </p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          )}

          {currentStep === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <div className="grid lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Layers className="h-5 w-5" />
                      Equipment List
                    </CardTitle>
                    <CardDescription>
                      Required equipment for {totalGreenhouseSqft.toLocaleString()} sqft across {schools.length} greenhouses
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Tabs defaultValue="growing">
                      <TabsList className="w-full flex-wrap h-auto">
                        <TabsTrigger value="growing" className="gap-1"><Sprout className="h-3 w-3" /> Growing</TabsTrigger>
                        <TabsTrigger value="lighting" className="gap-1"><Lightbulb className="h-3 w-3" /> Lighting</TabsTrigger>
                        <TabsTrigger value="irrigation" className="gap-1"><Droplets className="h-3 w-3" /> Irrigation</TabsTrigger>
                        <TabsTrigger value="climate" className="gap-1"><Thermometer className="h-3 w-3" /> Climate</TabsTrigger>
                        <TabsTrigger value="infrastructure" className="gap-1"><Building className="h-3 w-3" /> Infrastructure</TabsTrigger>
                      </TabsList>
                      {["growing", "lighting", "irrigation", "climate", "infrastructure"].map(cat => (
                        <TabsContent key={cat} value={cat} className="mt-4">
                          <ScrollArea className="h-[300px]">
                            <div className="space-y-2">
                              {equipmentForCluster.filter(e => e.category === cat).map(eq => (
                                <div key={eq.id} className="p-3 bg-muted/50 rounded-lg" data-testid={`equipment-${eq.id}`}>
                                  <div className="flex items-center justify-between">
                                    <div>
                                      <p className="font-medium text-sm">{eq.name}</p>
                                      <p className="text-xs text-muted-foreground">{eq.description}</p>
                                    </div>
                                    <div className="text-right">
                                      <p className="font-semibold">{eq.totalUnits} units</p>
                                      <p className="text-sm text-muted-foreground">${eq.totalCost.toLocaleString()}</p>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </ScrollArea>
                        </TabsContent>
                      ))}
                    </Tabs>
                    <div className="mt-4 pt-4 border-t">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold">Total Equipment Cost</span>
                        <span className="text-xl font-bold text-primary">
                          ${equipmentForCluster.reduce((sum, e) => sum + e.totalCost, 0).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-5 w-5" />
                      Staffing Requirements
                    </CardTitle>
                    <CardDescription>
                      Employees, students, and volunteers for {schools.length} schools
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Tabs defaultValue="employee">
                      <TabsList className="w-full">
                        <TabsTrigger value="employee" className="flex-1 gap-1"><Briefcase className="h-3 w-3" /> Employees</TabsTrigger>
                        <TabsTrigger value="student" className="flex-1 gap-1"><GraduationCap className="h-3 w-3" /> Students</TabsTrigger>
                        <TabsTrigger value="volunteer" className="flex-1 gap-1"><Heart className="h-3 w-3" /> Volunteers</TabsTrigger>
                      </TabsList>
                      {["employee", "student", "volunteer"].map(type => (
                        <TabsContent key={type} value={type} className="mt-4">
                          <ScrollArea className="h-[250px]">
                            <div className="space-y-2">
                              {staffingForCluster.filter(s => s.type === type).map((pos, idx) => (
                                <div key={idx} className="p-3 bg-muted/50 rounded-lg" data-testid={`staff-${pos.role.toLowerCase().replace(/\s+/g, "-")}`}>
                                  <div className="flex items-center justify-between">
                                    <div>
                                      <p className="font-medium text-sm">{pos.role}</p>
                                      <p className="text-xs text-muted-foreground">{pos.description}</p>
                                    </div>
                                    <div className="text-right">
                                      <p className="font-semibold">{pos.totalCount} people</p>
                                      <p className="text-xs text-muted-foreground">
                                        {pos.totalHours} hrs/wk
                                        {pos.hourlyWage > 0 && ` @ $${pos.hourlyWage}/hr`}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </ScrollArea>
                        </TabsContent>
                      ))}
                    </Tabs>
                    <div className="mt-4 pt-4 border-t space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Total Employees</span>
                        <span className="font-semibold">{staffingForCluster.filter(s => s.type === "employee").reduce((sum, s) => sum + s.totalCount, 0)}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Total Students Engaged</span>
                        <span className="font-semibold">{staffingForCluster.filter(s => s.type === "student").reduce((sum, s) => sum + s.totalCount, 0)}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Total Volunteers</span>
                        <span className="font-semibold">{staffingForCluster.filter(s => s.type === "volunteer").reduce((sum, s) => sum + s.totalCount, 0)}</span>
                      </div>
                      <div className="flex items-center justify-between pt-2 border-t">
                        <span className="font-semibold">Weekly Labor Cost</span>
                        <span className="font-bold text-primary">
                          ${staffingForCluster.filter(s => s.type === "employee").reduce((sum, s) => sum + s.totalWeeklyCost, 0).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          )}

          {currentStep === 5 && pilotMetrics && (
            <motion.div
              key="step5"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <div className="space-y-6">
                <div className="mb-4">
                  <Label htmlFor="cluster-name">Name Your Pilot Program</Label>
                  <Input
                    id="cluster-name"
                    placeholder="e.g., North Metro Green Schools Initiative"
                    value={clusterName}
                    onChange={(e) => setClusterName(e.target.value)}
                    className="mt-2 max-w-md"
                    data-testid="input-cluster-name"
                  />
                </div>

                <Card className="border-primary/50">
                  <CardHeader className="text-center border-b bg-primary/5">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <Sprout className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle className="text-2xl">{clusterName || "Your Pilot Program"}</CardTitle>
                    <CardDescription>
                      Greenhouse Cluster Proposal | {schools.length} Schools | {totalGreenhouseSqft.toLocaleString()} sqft
                    </CardDescription>
                    <div className="flex justify-center gap-2 mt-2">
                      <Badge variant={clusterValidation.hasK12Coverage ? "default" : "secondary"}>
                        {clusterValidation.hasK12Coverage ? "Full K-12 Coverage" : "Partial K-12"}
                      </Badge>
                      <Badge variant={clusterValidation.hasMixedTypes ? "default" : "secondary"}>
                        {clusterValidation.hasMixedTypes ? "Public + Private" : "Single Type"}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-6">
                      <div className="grid md:grid-cols-4 gap-4">
                        <div className="text-center p-4 bg-muted rounded-lg">
                          <School className="h-8 w-8 mx-auto text-primary mb-2" />
                          <p className="text-2xl font-bold">{pilotMetrics.schoolCount}</p>
                          <p className="text-sm text-muted-foreground">Schools</p>
                        </div>
                        <div className="text-center p-4 bg-muted rounded-lg">
                          <Users className="h-8 w-8 mx-auto text-blue-500 mb-2" />
                          <p className="text-2xl font-bold">{pilotMetrics.studentsServed.toLocaleString()}</p>
                          <p className="text-sm text-muted-foreground">Students Served</p>
                        </div>
                        <div className="text-center p-4 bg-muted rounded-lg">
                          <Building2 className="h-8 w-8 mx-auto text-amber-500 mb-2" />
                          <p className="text-2xl font-bold">{pilotMetrics.sqftNeeded.toLocaleString()}</p>
                          <p className="text-sm text-muted-foreground">Total Sqft</p>
                        </div>
                        <div className="text-center p-4 bg-muted rounded-lg">
                          <Leaf className="h-8 w-8 mx-auto text-green-500 mb-2" />
                          <p className="text-2xl font-bold">{Math.round(pilotMetrics.annualProductionLbs / 1000)}K</p>
                          <p className="text-sm text-muted-foreground">Lbs/Year</p>
                        </div>
                      </div>

                      <div className="border rounded-lg p-4">
                        <h3 className="font-semibold mb-3">Participating Schools</h3>
                        <div className="grid md:grid-cols-2 gap-2">
                          {schools.map(s => (
                            <div key={s.id} className="flex items-center justify-between p-2 bg-muted/50 rounded">
                              <div>
                                <p className="font-medium text-sm">{s.name}</p>
                                <p className="text-xs text-muted-foreground">
                                  {GRADE_LABELS[s.gradeLevel]} | {s.enrollment.toLocaleString()} students
                                </p>
                              </div>
                              <Badge variant="outline">{s.greenhouseSqft.toLocaleString()} sqft</Badge>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="border rounded-lg p-4">
                        <h3 className="font-semibold mb-3">Produce Varieties ({selectedProduce.length})</h3>
                        <div className="flex flex-wrap gap-2">
                          {selectedProduce.map(p => (
                            <Badge key={p.id} variant="secondary">{p.name}</Badge>
                          ))}
                        </div>
                      </div>

                      <div className="grid md:grid-cols-3 gap-4">
                        <div className="border rounded-lg p-4">
                          <h3 className="font-semibold mb-3 flex items-center gap-2">
                            <Briefcase className="h-4 w-4 text-blue-500" />
                            Staffing
                          </h3>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Employees</span>
                              <span className="font-medium">{pilotMetrics.totalEmployees}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Student Participants</span>
                              <span className="font-medium">{pilotMetrics.totalStudents}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Volunteers</span>
                              <span className="font-medium">{pilotMetrics.totalVolunteers}</span>
                            </div>
                          </div>
                        </div>

                        <div className="border rounded-lg p-4">
                          <h3 className="font-semibold mb-3 flex items-center gap-2">
                            <DollarSign className="h-4 w-4 text-green-500" />
                            Investment
                          </h3>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Construction</span>
                              <span className="font-medium">${(pilotMetrics.constructionCost / 1000000).toFixed(2)}M</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Equipment</span>
                              <span className="font-medium">${(pilotMetrics.equipmentCost / 1000).toFixed(0)}K</span>
                            </div>
                            <div className="flex justify-between pt-2 border-t">
                              <span className="font-medium">Total</span>
                              <span className="font-bold text-primary">${(pilotMetrics.totalInvestment / 1000000).toFixed(2)}M</span>
                            </div>
                          </div>
                        </div>

                        <div className="border rounded-lg p-4">
                          <h3 className="font-semibold mb-3 flex items-center gap-2">
                            <Calculator className="h-4 w-4 text-amber-500" />
                            Operations
                          </h3>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Annual Cost</span>
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
                            <p className="text-xl font-bold text-green-600">{pilotMetrics.carbonAvoidedTons.toFixed(1)}</p>
                            <p className="text-xs text-muted-foreground">Metric Tons CO2 Avoided/Year</p>
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
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex justify-between items-center mt-8">
          <Button
            variant="outline"
            onClick={() => setCurrentStep(currentStep - 1)}
            disabled={currentStep === 1}
            data-testid="button-previous-step"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Previous
          </Button>
          
          <div className="flex items-center gap-4">
            {!canProceed() && getStepBlockerMessage() && (
              <div className="flex items-center gap-2 text-amber-600 text-sm" data-testid="validation-message">
                <AlertCircle className="h-4 w-4" />
                {getStepBlockerMessage()}
              </div>
            )}
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
    </div>
  );
}
