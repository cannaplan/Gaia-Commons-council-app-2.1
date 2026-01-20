import { useState } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  ChevronLeft,
  ChevronRight,
  Home,
  Sprout,
  Users,
  Building2,
  Globe,
  DollarSign,
  GraduationCap,
  Leaf,
  Heart,
  TrendingUp,
  Shield,
  MapPin,
  Award,
  Vote,
  TreePine,
  Droplets,
  Sun,
  Factory,
  Briefcase,
  Scale,
  CircleDollarSign,
  Apple,
  Cherry,
  Grape,
  Banana,
  Citrus,
  TreeDeciduous,
  Flower,
  X,
  Check,
  FlaskConical,
} from "lucide-react";

interface SlideData {
  id: number;
  title: string;
  subtitle?: string;
  content: React.ReactNode;
  bgGradient: string;
  icon: React.ReactNode;
}

export default function BallotPresentation() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides: SlideData[] = [
    {
      id: 1,
      title: "One Vote, Forever Fed",
      subtitle: "Minnesota 2026 Ballot Initiative",
      bgGradient: "from-emerald-600 via-emerald-500 to-teal-500",
      icon: <Vote className="h-24 w-24" />,
      content: (
        <div className="flex flex-col items-center gap-8">
          <div className="text-center">
            <div className="text-8xl font-black mb-4 drop-shadow-2xl">2026</div>
            <p className="text-2xl opacity-90 max-w-2xl mx-auto">
              A bold initiative to feed every Minnesota student with fresh, local produce 
              grown right at their schools - forever.
            </p>
          </div>
          <div className="flex gap-6 mt-8">
            <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-6 text-center">
              <div className="text-4xl font-bold">830,000+</div>
              <div className="text-sm opacity-80">Students Served</div>
            </div>
            <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-6 text-center">
              <div className="text-4xl font-bold">$117M</div>
              <div className="text-sm opacity-80">Endowment Draw/Year</div>
            </div>
            <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-6 text-center">
              <div className="text-4xl font-bold">Forever</div>
              <div className="text-sm opacity-80">Perpetual Funding</div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 2,
      title: "The Problem",
      subtitle: "Food Insecurity in Minnesota Schools",
      bgGradient: "from-red-600 via-orange-500 to-amber-500",
      icon: <Heart className="h-24 w-24" />,
      content: (
        <div className="grid grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-6">
              <div className="text-5xl font-bold mb-2">1 in 6</div>
              <p className="text-lg">Minnesota children face food insecurity</p>
            </div>
            <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-6">
              <div className="text-5xl font-bold mb-2">1,500+</div>
              <p className="text-lg">Average miles food travels to schools</p>
            </div>
            <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-6">
              <div className="text-5xl font-bold mb-2">$2.8B</div>
              <p className="text-lg">Spent annually on out-of-state produce</p>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="relative">
              <div className="w-72 h-72 rounded-full bg-white/10 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-7xl font-black">87%</div>
                  <p className="text-lg mt-2">of school produce<br/>comes from outside MN</p>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 bg-red-500 rounded-full p-4 animate-pulse">
                <Factory className="h-8 w-8" />
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 3,
      title: "Our Solution",
      subtitle: "School Greenhouses Funded Forever",
      bgGradient: "from-emerald-600 via-green-500 to-lime-500",
      icon: <Sprout className="h-24 w-24" />,
      content: (
        <div className="flex flex-col items-center gap-8">
          <div className="grid grid-cols-4 gap-6 w-full max-w-4xl">
            <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-6 text-center transform hover:scale-105 transition-transform">
              <Sprout className="h-12 w-12 mx-auto mb-3" />
              <div className="text-2xl font-bold">Greenhouses</div>
              <p className="text-sm opacity-80 mt-2">At every school district</p>
            </div>
            <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-6 text-center transform hover:scale-105 transition-transform">
              <TreeDeciduous className="h-12 w-12 mx-auto mb-3" />
              <div className="text-2xl font-bold">Orchards</div>
              <p className="text-sm opacity-80 mt-2">Outdoor fruit trees</p>
            </div>
            <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-6 text-center transform hover:scale-105 transition-transform">
              <Citrus className="h-12 w-12 mx-auto mb-3" />
              <div className="text-2xl font-bold">Exotic Trees</div>
              <p className="text-sm opacity-80 mt-2">Year-round citrus</p>
            </div>
            <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-6 text-center transform hover:scale-105 transition-transform">
              <DollarSign className="h-12 w-12 mx-auto mb-3" />
              <div className="text-2xl font-bold">Endowment</div>
              <p className="text-sm opacity-80 mt-2">Perpetual funding</p>
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 max-w-3xl text-center">
            <p className="text-xl leading-relaxed">
              Build greenhouses at all 53 Minnesota school districts, complete with year-round 
              production of <span className="font-bold text-lime-300">vegetables, berries, fruits, herbs</span>, 
              and even <span className="font-bold text-yellow-300">exotic citrus trees</span> - all funded 
              by a perpetual endowment that never runs out.
            </p>
          </div>
        </div>
      ),
    },
    {
      id: 4,
      title: "What We'll Grow",
      subtitle: "100+ Varieties of Fresh Produce",
      bgGradient: "from-purple-600 via-pink-500 to-rose-500",
      icon: <Apple className="h-24 w-24" />,
      content: (
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-5 space-y-3">
            <div className="flex items-center gap-2">
              <Leaf className="h-8 w-8 text-green-300" />
              <h3 className="font-bold text-lg">Salad Greens</h3>
            </div>
            <ul className="text-sm space-y-1 opacity-90">
              <li>Butterhead Lettuce</li>
              <li>Baby Spinach</li>
              <li>Tuscan Kale</li>
              <li>Wild Arugula</li>
              <li>Microgreen Mix</li>
              <li>Rainbow Swiss Chard</li>
              <li>Baby Bok Choy</li>
              <li>Mizuna</li>
            </ul>
          </div>
          <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-5 space-y-3">
            <div className="flex items-center gap-2">
              <Apple className="h-8 w-8 text-red-300" />
              <h3 className="font-bold text-lg">Vegetables</h3>
            </div>
            <ul className="text-sm space-y-1 opacity-90">
              <li>Heirloom Tomatoes</li>
              <li>English Cucumbers</li>
              <li>Sweet Bell Peppers</li>
              <li>Rainbow Carrots</li>
              <li>Zucchini</li>
              <li>Japanese Eggplant</li>
              <li>Sugar Snap Peas</li>
              <li>Purple Kohlrabi</li>
            </ul>
          </div>
          <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-5 space-y-3">
            <div className="flex items-center gap-2">
              <Cherry className="h-8 w-8 text-pink-300" />
              <h3 className="font-bold text-lg">Berries</h3>
            </div>
            <ul className="text-sm space-y-1 opacity-90">
              <li>Everbearing Strawberries</li>
              <li>Highbush Blueberries</li>
              <li>Red Raspberries</li>
              <li>Thornless Blackberries</li>
              <li>Red & Black Currants</li>
              <li>Goji Berries</li>
              <li>Ground Cherries</li>
              <li>Honeyberries</li>
            </ul>
          </div>
          <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-5 space-y-3">
            <div className="flex items-center gap-2">
              <Flower className="h-8 w-8 text-yellow-300" />
              <h3 className="font-bold text-lg">Herbs & Specialty</h3>
            </div>
            <ul className="text-sm space-y-1 opacity-90">
              <li>Genovese Basil</li>
              <li>French Thyme</li>
              <li>Greek Oregano</li>
              <li>Shiitake Mushrooms</li>
              <li>Lion's Mane</li>
              <li>Edible Flowers</li>
              <li>Microgreens</li>
              <li>Wheatgrass</li>
            </ul>
          </div>
        </div>
      ),
    },
    {
      id: 5,
      title: "Exotic Greenhouse Trees",
      subtitle: "Year-Round Tropical Fruits in Minnesota",
      bgGradient: "from-orange-500 via-yellow-500 to-amber-400",
      icon: <Banana className="h-24 w-24" />,
      content: (
        <div className="flex flex-col items-center gap-8">
          <p className="text-xl text-center max-w-3xl opacity-90">
            Climate-controlled greenhouses allow us to grow tropical and subtropical 
            fruit trees right here in Minnesota - all year round!
          </p>
          <div className="grid grid-cols-4 gap-5">
            <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-5 text-center transform hover:scale-105 transition-transform">
              <Citrus className="h-12 w-12 mx-auto mb-3 text-yellow-300" />
              <h3 className="font-bold">Meyer Lemons</h3>
              <p className="text-sm opacity-80">Year-round citrus</p>
            </div>
            <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-5 text-center transform hover:scale-105 transition-transform">
              <Citrus className="h-12 w-12 mx-auto mb-3 text-green-300" />
              <h3 className="font-bold">Key Limes</h3>
              <p className="text-sm opacity-80">Fresh for cooking</p>
            </div>
            <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-5 text-center transform hover:scale-105 transition-transform">
              <Banana className="h-12 w-12 mx-auto mb-3 text-yellow-200" />
              <h3 className="font-bold">Dwarf Bananas</h3>
              <p className="text-sm opacity-80">Sweet & nutritious</p>
            </div>
            <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-5 text-center transform hover:scale-105 transition-transform">
              <Apple className="h-12 w-12 mx-auto mb-3 text-orange-300" />
              <h3 className="font-bold">Papaya Trees</h3>
              <p className="text-sm opacity-80">Tropical vitamins</p>
            </div>
            <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-5 text-center transform hover:scale-105 transition-transform">
              <Leaf className="h-12 w-12 mx-auto mb-3 text-green-400" />
              <h3 className="font-bold">Avocado Trees</h3>
              <p className="text-sm opacity-80">Healthy fats</p>
            </div>
            <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-5 text-center transform hover:scale-105 transition-transform">
              <Citrus className="h-12 w-12 mx-auto mb-3 text-orange-300" />
              <h3 className="font-bold">Kumquats</h3>
              <p className="text-sm opacity-80">Bite-sized citrus</p>
            </div>
            <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-5 text-center transform hover:scale-105 transition-transform">
              <Apple className="h-12 w-12 mx-auto mb-3 text-pink-300" />
              <h3 className="font-bold">Guava Trees</h3>
              <p className="text-sm opacity-80">Vitamin C rich</p>
            </div>
            <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-5 text-center transform hover:scale-105 transition-transform">
              <Flower className="h-12 w-12 mx-auto mb-3 text-pink-400" />
              <h3 className="font-bold">Dragon Fruit</h3>
              <p className="text-sm opacity-80">Exotic superfood</p>
            </div>
          </div>
          <div className="bg-black/20 backdrop-blur-lg rounded-2xl p-6 flex items-center gap-4">
            <Sun className="h-12 w-12 text-yellow-300" />
            <p className="text-lg">LED grow lights + climate control = tropical harvests in -20°F winters</p>
          </div>
        </div>
      ),
    },
    {
      id: 6,
      title: "Outdoor Orchards",
      subtitle: "Traditional Fruit Trees for Each School",
      bgGradient: "from-green-600 via-emerald-500 to-teal-400",
      icon: <TreePine className="h-24 w-24" />,
      content: (
        <div className="flex flex-col items-center gap-8">
          <p className="text-xl text-center max-w-3xl opacity-90">
            Every school can have their own outdoor orchard with cold-hardy fruit and nut trees 
            native to Minnesota's climate.
          </p>
          <div className="grid grid-cols-3 gap-6 w-full max-w-4xl">
            <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-6">
              <h3 className="font-bold text-xl mb-4 flex items-center gap-2">
                <Apple className="h-6 w-6" /> Fruit Trees
              </h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2"><Apple className="h-4 w-4 text-red-300" /> Apple Orchards</li>
                <li className="flex items-center gap-2"><Apple className="h-4 w-4 text-green-300" /> Pear Trees</li>
                <li className="flex items-center gap-2"><Cherry className="h-4 w-4 text-red-400" /> Cherry Trees</li>
                <li className="flex items-center gap-2"><Apple className="h-4 w-4 text-orange-300" /> Peach Trees</li>
                <li className="flex items-center gap-2"><Apple className="h-4 w-4 text-orange-400" /> Apricot Trees</li>
                <li className="flex items-center gap-2"><Apple className="h-4 w-4 text-purple-400" /> Plum Trees</li>
              </ul>
            </div>
            <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-6">
              <h3 className="font-bold text-xl mb-4 flex items-center gap-2">
                <TreeDeciduous className="h-6 w-6" /> Nut Trees
              </h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2"><TreeDeciduous className="h-4 w-4 text-amber-400" /> Hazelnut Groves</li>
                <li className="flex items-center gap-2"><TreeDeciduous className="h-4 w-4 text-amber-500" /> Walnut Groves</li>
                <li className="flex items-center gap-2"><TreeDeciduous className="h-4 w-4 text-amber-600" /> Chestnut Groves</li>
              </ul>
              <p className="text-xs mt-4 opacity-70">Heart-healthy fats & protein</p>
            </div>
            <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-6">
              <h3 className="font-bold text-xl mb-4 flex items-center gap-2">
                <Grape className="h-6 w-6" /> Berry Bushes
              </h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2"><Grape className="h-4 w-4 text-purple-400" /> Elderberry Bushes</li>
                <li className="flex items-center gap-2"><Grape className="h-4 w-4 text-indigo-400" /> Aronia Berries</li>
                <li className="flex items-center gap-2"><Cherry className="h-4 w-4 text-blue-400" /> Serviceberries</li>
              </ul>
              <p className="text-xs mt-4 opacity-70">Highest antioxidants found in nature</p>
            </div>
          </div>
          <div className="bg-black/20 backdrop-blur-lg rounded-2xl p-6 flex items-center gap-4 max-w-3xl">
            <GraduationCap className="h-12 w-12 text-lime-300 flex-shrink-0" />
            <p className="text-lg">Students learn agriculture, ecology, and sustainability while tending their school orchard</p>
          </div>
        </div>
      ),
    },
    {
      id: 7,
      title: "The Endowment Model",
      subtitle: "Funded Forever, Never Depleted",
      bgGradient: "from-blue-600 via-indigo-500 to-purple-500",
      icon: <CircleDollarSign className="h-24 w-24" />,
      content: (
        <div className="flex flex-col items-center gap-8">
          <div className="grid grid-cols-3 gap-6 w-full max-w-4xl">
            <div className="bg-white/20 backdrop-blur-lg rounded-3xl p-8 text-center">
              <div className="text-5xl font-black mb-2">$3B</div>
              <p className="text-lg">Initial Endowment</p>
              <p className="text-sm opacity-70 mt-2">Principal never touched</p>
            </div>
            <div className="bg-white/20 backdrop-blur-lg rounded-3xl p-8 text-center">
              <div className="text-5xl font-black mb-2">3.9%</div>
              <p className="text-lg">Annual Distribution</p>
              <p className="text-sm opacity-70 mt-2">Conservative draw rate</p>
            </div>
            <div className="bg-white/20 backdrop-blur-lg rounded-3xl p-8 text-center">
              <div className="text-5xl font-black mb-2">$117M</div>
              <p className="text-lg">Annual Draw</p>
              <p className="text-sm opacity-70 mt-2">Forever, inflation-adjusted</p>
            </div>
          </div>
          <div className="bg-gradient-to-r from-green-500/30 to-emerald-500/30 backdrop-blur-lg rounded-3xl p-8 max-w-3xl">
            <div className="flex items-center gap-6">
              <div className="flex-shrink-0">
                <div className="w-24 h-24 rounded-full bg-white/20 flex items-center justify-center">
                  <TrendingUp className="h-12 w-12" />
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-2">How It Works</h3>
                <p className="opacity-90">
                  Like university endowments, the principal grows tax-free while annual returns 
                  fund operations. After 50 years: <span className="font-bold text-lime-300">$5.85 billion in total draws</span> while 
                  principal remains at $3B+.
                </p>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 8,
      title: "Jobs Created",
      subtitle: "Local, Union, Permanent Employment",
      bgGradient: "from-amber-500 via-orange-500 to-red-500",
      icon: <Briefcase className="h-24 w-24" />,
      content: (
        <div className="grid grid-cols-2 gap-8">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold mb-4">Construction Phase</h3>
            <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-5">
              <div className="flex justify-between items-center">
                <span>Pilot (6 Schools)</span>
                <Badge className="bg-white/30 text-white">76 Jobs</Badge>
              </div>
            </div>
            <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-5">
              <div className="flex justify-between items-center">
                <span>Statewide (3,100 Schools)</span>
                <Badge className="bg-white/30 text-white">4,320 Jobs</Badge>
              </div>
            </div>
            <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-5">
              <div className="flex justify-between items-center">
                <span>National (130K Schools)</span>
                <Badge className="bg-white/30 text-white">1.17M Jobs</Badge>
              </div>
            </div>
            <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-5">
              <div className="flex justify-between items-center">
                <span>Global (1M Schools)</span>
                <Badge className="bg-white/30 text-white">6.5M Jobs</Badge>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-2xl font-bold mb-4">Permanent Operations</h3>
            <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-5">
              <div className="text-4xl font-bold mb-2">1,815</div>
              <p>Permanent jobs in Minnesota</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white/10 rounded-xl p-3 text-center">
                <div className="text-xl font-bold">1,152</div>
                <p className="text-xs">Greenhouse Staff</p>
              </div>
              <div className="bg-white/10 rounded-xl p-3 text-center">
                <div className="text-xl font-bold">96</div>
                <p className="text-xs">Educators</p>
              </div>
              <div className="bg-white/10 rounded-xl p-3 text-center">
                <div className="text-xl font-bold">256</div>
                <p className="text-xs">Distribution</p>
              </div>
              <div className="bg-white/10 rounded-xl p-3 text-center">
                <div className="text-xl font-bold">311</div>
                <p className="text-xs">School Staff</p>
              </div>
            </div>
            <div className="bg-green-500/30 rounded-2xl p-4 flex items-center gap-3">
              <Award className="h-8 w-8" />
              <span className="font-semibold">100% Union Labor at $32-35/hr</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 9,
      title: "vs. Foreign Mining",
      subtitle: "Keep Minnesota's Wealth in Minnesota",
      bgGradient: "from-slate-700 via-gray-600 to-slate-800",
      icon: <Scale className="h-24 w-24" />,
      content: (
        <div className="grid grid-cols-2 gap-8">
          <div className="bg-red-500/30 backdrop-blur-lg rounded-2xl p-6 border-2 border-red-400/50">
            <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Factory className="h-8 w-8" /> Twin Metals Mining
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2"><X className="h-4 w-4 text-red-300" /> 100% foreign owned (Chile)</li>
              <li className="flex items-center gap-2"><X className="h-4 w-4 text-red-300" /> 50% profits to billionaire family</li>
              <li className="flex items-center gap-2"><X className="h-4 w-4 text-red-300" /> 0.4% gross proceeds tax</li>
              <li className="flex items-center gap-2"><X className="h-4 w-4 text-red-300" /> ~1,500 temporary jobs</li>
              <li className="flex items-center gap-2"><X className="h-4 w-4 text-red-300" /> 20-25 year mine lifespan</li>
              <li className="flex items-center gap-2"><X className="h-4 w-4 text-red-300" /> Ore shipped out of state</li>
              <li className="flex items-center gap-2"><X className="h-4 w-4 text-red-300" /> MN pays cleanup costs</li>
              <li className="flex items-center gap-2"><X className="h-4 w-4 text-red-300" /> Threatens Boundary Waters</li>
            </ul>
          </div>
          <div className="bg-green-500/30 backdrop-blur-lg rounded-2xl p-6 border-2 border-green-400/50">
            <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Sprout className="h-8 w-8" /> Gaia Commons
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2"><Check className="h-4 w-4 text-green-300" /> 100% Minnesota owned</li>
              <li className="flex items-center gap-2"><Check className="h-4 w-4 text-green-300" /> 100% reinvested locally</li>
              <li className="flex items-center gap-2"><Check className="h-4 w-4 text-green-300" /> Revenue stays in communities</li>
              <li className="flex items-center gap-2"><Check className="h-4 w-4 text-green-300" /> 1,815 permanent jobs</li>
              <li className="flex items-center gap-2"><Check className="h-4 w-4 text-green-300" /> Forever - perpetual model</li>
              <li className="flex items-center gap-2"><Check className="h-4 w-4 text-green-300" /> Food stays in Minnesota</li>
              <li className="flex items-center gap-2"><Check className="h-4 w-4 text-green-300" /> Self-sustaining operations</li>
              <li className="flex items-center gap-2"><Check className="h-4 w-4 text-green-300" /> Protects natural resources</li>
            </ul>
          </div>
        </div>
      ),
    },
    {
      id: 10,
      title: "330 School Districts",
      subtitle: "Serving All of Minnesota",
      bgGradient: "from-blue-600 via-sky-500 to-cyan-400",
      icon: <MapPin className="h-24 w-24" />,
      content: (
        <div className="flex flex-col items-center gap-6">
          <div className="grid grid-cols-4 gap-4 w-full">
            <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-4 text-center">
              <div className="text-3xl font-bold">830K</div>
              <p className="text-sm">Students</p>
            </div>
            <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-4 text-center">
              <div className="text-3xl font-bold">330</div>
              <p className="text-sm">Districts</p>
            </div>
            <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-4 text-center">
              <div className="text-3xl font-bold">3,100</div>
              <p className="text-sm">Schools</p>
            </div>
            <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-4 text-center">
              <div className="text-3xl font-bold">~710</div>
              <p className="text-sm">Avg Sqft/School</p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4 w-full text-sm">
            <div className="bg-white/10 rounded-xl p-4">
              <h4 className="font-bold mb-2">Twin Cities Metro</h4>
              <p className="text-xs opacity-80">Minneapolis, St. Paul, Bloomington, Eden Prairie, Anoka-Hennepin, Osseo, Rosemount-AV-Eagan...</p>
            </div>
            <div className="bg-white/10 rounded-xl p-4">
              <h4 className="font-bold mb-2">Greater Minnesota</h4>
              <p className="text-xs opacity-80">Rochester, Duluth, St. Cloud, Mankato, Moorhead, Bemidji, Brainerd, Winona...</p>
            </div>
            <div className="bg-white/10 rounded-xl p-4">
              <h4 className="font-bold mb-2">Tribal Communities</h4>
              <p className="text-xs opacity-80">Cass Lake-Bena (Leech Lake), Red Lake Nation, Nay Ah Shing (Mille Lacs)</p>
            </div>
          </div>
          <div className="bg-gradient-to-r from-emerald-500/30 to-green-500/30 rounded-2xl p-6 flex items-center gap-4">
            <Heart className="h-10 w-10 text-red-300" />
            <p className="text-lg">Priority: <span className="font-bold">Tribal food sovereignty</span> and high-need communities served first</p>
          </div>
        </div>
      ),
    },
    {
      id: 11,
      title: "Land Conservation",
      subtitle: "10% of Revenue Protects Natural Resources",
      bgGradient: "from-teal-600 via-cyan-500 to-sky-400",
      icon: <TreePine className="h-24 w-24" />,
      content: (
        <div className="flex flex-col items-center gap-8">
          <div className="grid grid-cols-3 gap-6 w-full max-w-4xl">
            <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-6 text-center">
              <Droplets className="h-12 w-12 mx-auto mb-3 text-blue-300" />
              <div className="text-3xl font-bold">$6.3M</div>
              <p className="text-sm">Annual Conservation Fund</p>
            </div>
            <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-6 text-center">
              <TreePine className="h-12 w-12 mx-auto mb-3 text-green-300" />
              <div className="text-3xl font-bold">$315M</div>
              <p className="text-sm">Total Over 50 Years</p>
            </div>
            <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-6 text-center">
              <MapPin className="h-12 w-12 mx-auto mb-3 text-amber-300" />
              <div className="text-3xl font-bold">100K+</div>
              <p className="text-sm">Acres Protected Forever</p>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-4 w-full max-w-4xl">
            <div className="bg-green-500/30 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold">35%</div>
              <p className="text-xs">Forests</p>
            </div>
            <div className="bg-amber-500/30 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold">30%</div>
              <p className="text-xs">Farmland</p>
            </div>
            <div className="bg-blue-500/30 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold">25%</div>
              <p className="text-xs">Waterways</p>
            </div>
            <div className="bg-purple-500/30 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold">10%</div>
              <p className="text-xs">Tribal Lands</p>
            </div>
          </div>
          <div className="bg-black/20 backdrop-blur-lg rounded-2xl p-6 flex items-center gap-4">
            <Shield className="h-10 w-10 text-green-300" />
            <p className="text-lg">All lands held in <span className="font-bold">permanent land trust</span> - never to be sold or developed</p>
          </div>
        </div>
      ),
    },
    {
      id: 12,
      title: "Environmental Impact",
      subtitle: "Healing Minnesota's Land & Water",
      bgGradient: "from-green-600 via-emerald-500 to-lime-400",
      icon: <Leaf className="h-24 w-24" />,
      content: (
        <div className="grid grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-5">
              <div className="flex items-center gap-3 mb-2">
                <Droplets className="h-8 w-8 text-blue-300" />
                <span className="font-bold text-lg">Water Saved</span>
              </div>
              <div className="text-3xl font-bold">280 Billion Gallons/Year</div>
              <p className="text-sm opacity-70">90% less water than traditional farming</p>
            </div>
            <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-5">
              <div className="flex items-center gap-3 mb-2">
                <Globe className="h-8 w-8 text-green-300" />
                <span className="font-bold text-lg">Carbon Sequestered</span>
              </div>
              <div className="text-3xl font-bold">85,000 Tons/Year</div>
              <p className="text-sm opacity-70">Net carbon negative operations</p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-5">
              <div className="flex items-center gap-3 mb-2">
                <Factory className="h-8 w-8 text-amber-300" />
                <span className="font-bold text-lg">Food Miles Eliminated</span>
              </div>
              <div className="text-3xl font-bold">1.5 Billion Miles/Year</div>
              <p className="text-sm opacity-70">Local food = zero transport emissions</p>
            </div>
            <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-5">
              <div className="flex items-center gap-3 mb-2">
                <Shield className="h-8 w-8 text-red-300" />
                <span className="font-bold text-lg">Pesticides Used</span>
              </div>
              <div className="text-3xl font-bold">ZERO</div>
              <p className="text-sm opacity-70">100% organic hydroponic systems</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 13,
      title: "Educational Benefits",
      subtitle: "Learning by Growing",
      bgGradient: "from-indigo-600 via-violet-500 to-purple-400",
      icon: <GraduationCap className="h-24 w-24" />,
      content: (
        <div className="flex flex-col items-center gap-8">
          <div className="grid grid-cols-3 gap-6 w-full max-w-4xl">
            <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-6 text-center">
              <FlaskConical className="h-12 w-12 mx-auto mb-3 text-cyan-300" />
              <h3 className="font-bold text-lg">STEM Integration</h3>
              <p className="text-sm opacity-80 mt-2">Biology, chemistry, physics, math - all in one living lab</p>
            </div>
            <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-6 text-center">
              <Sprout className="h-12 w-12 mx-auto mb-3 text-green-300" />
              <h3 className="font-bold text-lg">Agriculture</h3>
              <p className="text-sm opacity-80 mt-2">Modern farming techniques and food systems</p>
            </div>
            <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-6 text-center">
              <Briefcase className="h-12 w-12 mx-auto mb-3 text-amber-300" />
              <h3 className="font-bold text-lg">Career Pathways</h3>
              <p className="text-sm opacity-80 mt-2">Real work experience and job skills</p>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-4 w-full max-w-4xl">
            <div className="bg-white/10 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold">4</div>
              <p className="text-xs">HS Interns/School</p>
            </div>
            <div className="bg-white/10 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold">6</div>
              <p className="text-xs">MS Helpers/School</p>
            </div>
            <div className="bg-white/10 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold">8</div>
              <p className="text-xs">Elementary Explorers</p>
            </div>
            <div className="bg-white/10 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold">7</div>
              <p className="text-xs">Community Volunteers</p>
            </div>
          </div>
          <div className="bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-2xl p-6 flex items-center gap-4 max-w-3xl">
            <Users className="h-10 w-10" />
            <p className="text-lg">Every student participates - from <span className="font-bold">kindergarten seed planting</span> to <span className="font-bold">high school internships</span></p>
          </div>
        </div>
      ),
    },
    {
      id: 14,
      title: "Scaling Beyond Minnesota",
      subtitle: "A Model for America & the World",
      bgGradient: "from-blue-700 via-blue-500 to-cyan-400",
      icon: <Globe className="h-24 w-24" />,
      content: (
        <div className="flex flex-col items-center gap-8">
          <div className="grid grid-cols-4 gap-4 w-full">
            <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-5 text-center transform hover:scale-105 transition-transform">
              <div className="text-lg font-bold text-amber-300">PILOT</div>
              <div className="text-3xl font-bold my-2">6</div>
              <p className="text-sm">Schools</p>
              <p className="text-xs opacity-70 mt-2">$7.65M Investment</p>
            </div>
            <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-5 text-center transform hover:scale-105 transition-transform">
              <div className="text-lg font-bold text-green-300">STATEWIDE</div>
              <div className="text-3xl font-bold my-2">275</div>
              <p className="text-sm">Schools</p>
              <p className="text-xs opacity-70 mt-2">$432M Investment</p>
            </div>
            <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-5 text-center transform hover:scale-105 transition-transform">
              <div className="text-lg font-bold text-blue-300">NATIONAL</div>
              <div className="text-3xl font-bold my-2">130K</div>
              <p className="text-sm">Schools</p>
              <p className="text-xs opacity-70 mt-2">$117B Investment</p>
            </div>
            <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-5 text-center transform hover:scale-105 transition-transform">
              <div className="text-lg font-bold text-purple-300">GLOBAL</div>
              <div className="text-3xl font-bold my-2">1M</div>
              <p className="text-sm">Schools</p>
              <p className="text-xs opacity-70 mt-2">$650B Investment</p>
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 max-w-3xl">
            <h3 className="text-2xl font-bold mb-4 text-center">Global Impact Potential</h3>
            <div className="grid grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-green-300">350M</div>
                <p className="text-sm">Children Fed</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-300">6.5M</div>
                <p className="text-sm">Jobs Created</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-amber-300">$650B</div>
                <p className="text-sm">Global Investment</p>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 15,
      title: "Vote YES in 2026",
      subtitle: "One Vote to Feed Minnesota Forever",
      bgGradient: "from-emerald-600 via-green-500 to-lime-400",
      icon: <Vote className="h-24 w-24" />,
      content: (
        <div className="flex flex-col items-center gap-8">
          <div className="text-center max-w-3xl">
            <p className="text-2xl leading-relaxed mb-8">
              One vote creates greenhouses at every school. One vote feeds every student fresh, 
              local produce. One vote keeps Minnesota's wealth in Minnesota - <span className="font-bold text-yellow-300">forever</span>.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-6 w-full max-w-4xl">
            <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-6 text-center">
              <Sprout className="h-12 w-12 mx-auto mb-3" />
              <p className="font-bold">330 Districts</p>
              <p className="text-sm opacity-80">Every corner of MN</p>
            </div>
            <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-6 text-center">
              <Users className="h-12 w-12 mx-auto mb-3" />
              <p className="font-bold">830,000 Students</p>
              <p className="text-sm opacity-80">Fed fresh daily</p>
            </div>
            <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-6 text-center">
              <Heart className="h-12 w-12 mx-auto mb-3" />
              <p className="font-bold">Forever</p>
              <p className="text-sm opacity-80">Perpetual endowment</p>
            </div>
          </div>
          <div className="mt-8">
            <div className="bg-white text-emerald-800 rounded-full px-12 py-6 text-3xl font-black shadow-2xl transform hover:scale-105 transition-transform cursor-pointer">
              VOTE YES on Question 1
            </div>
          </div>
          <p className="text-lg opacity-80 mt-4">
            November 2026 • gaiacommons.org
          </p>
        </div>
      ),
    },
  ];

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const currentSlideData = slides[currentSlide];

  return (
    <div className={`min-h-screen bg-gradient-to-br ${currentSlideData.bgGradient} text-white overflow-hidden`}>
      <div className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/">
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/20" data-testid="button-back-dashboard">
              <Home className="h-4 w-4 mr-2" />
              Dashboard
            </Button>
          </Link>
          <div className="flex items-center gap-2">
            <span className="text-sm opacity-80">Slide {currentSlide + 1} of {slides.length}</span>
            <Progress value={((currentSlide + 1) / slides.length) * 100} className="w-32 h-2 bg-white/20" />
          </div>
          <div className="flex gap-2">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={prevSlide} 
              disabled={currentSlide === 0}
              className="text-white hover:bg-white/20 disabled:opacity-30"
              data-testid="button-prev-slide"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={nextSlide} 
              disabled={currentSlide === slides.length - 1}
              className="text-white hover:bg-white/20 disabled:opacity-30"
              data-testid="button-next-slide"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="min-h-screen pt-20 pb-24 px-8 flex flex-col"
        >
          <div className="flex-1 flex flex-col items-center justify-center max-w-6xl mx-auto w-full">
            <div className="text-center mb-8">
              <div className="mb-4 opacity-80">{currentSlideData.icon}</div>
              <h1 className="text-5xl font-black mb-2 drop-shadow-lg">{currentSlideData.title}</h1>
              {currentSlideData.subtitle && (
                <p className="text-2xl opacity-90">{currentSlideData.subtitle}</p>
              )}
            </div>
            <div className="w-full">
              {currentSlideData.content}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="fixed bottom-0 left-0 right-0 bg-black/20 backdrop-blur-sm py-3">
        <div className="container mx-auto px-4">
          <div className="flex justify-center gap-2 flex-wrap">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentSlide 
                    ? 'bg-white scale-125' 
                    : 'bg-white/40 hover:bg-white/60'
                }`}
                data-testid={`slide-dot-${index}`}
              />
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
