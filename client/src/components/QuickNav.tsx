import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Menu, X, Home, Banknote, TreePine, Map, Users, 
  GraduationCap, Building2, Scale, Globe, Calculator,
  ChevronUp
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  { id: "mission", label: "Mission", icon: <Home className="h-4 w-4" /> },
  { id: "card-pilot-clusters", label: "Pilot Clusters", icon: <TreePine className="h-4 w-4" /> },
  { id: "card-multi-scale", label: "Scale Deployment", icon: <Scale className="h-4 w-4" /> },
  { id: "card-funding", label: "Funding Sources", icon: <Banknote className="h-4 w-4" /> },
  { id: "card-mining-alternative", label: "Mining Alternative", icon: <Building2 className="h-4 w-4" /> },
  { id: "card-coalition", label: "Coalition Partners", icon: <Users className="h-4 w-4" /> },
  { id: "card-curriculum", label: "K-12 Curriculum", icon: <GraduationCap className="h-4 w-4" /> },
  { id: "interactive-map", label: "MN Districts Map", icon: <Map className="h-4 w-4" /> },
  { id: "global-regeneration", label: "Global Projects", icon: <Globe className="h-4 w-4" /> },
];

export function QuickNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
      
      const sections = navItems.map(item => ({
        id: item.id,
        element: document.querySelector(`[data-testid="${item.id}"]`) || document.getElementById(item.id)
      })).filter(s => s.element);

      const scrollPosition = window.scrollY + 150;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section.element) {
          const rect = section.element.getBoundingClientRect();
          const top = rect.top + window.scrollY;
          if (scrollPosition >= top) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.querySelector(`[data-testid="${id}"]`) || document.getElementById(id);
    if (element) {
      const top = element.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top, behavior: "smooth" });
    }
    setIsOpen(false);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2" data-testid="quick-nav">
        <AnimatePresence>
          {showScrollTop && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
            >
              <Button
                size="icon"
                variant="outline"
                className="rounded-full shadow-lg bg-background/95 backdrop-blur-sm"
                onClick={scrollToTop}
                data-testid="button-scroll-top"
              >
                <ChevronUp className="h-5 w-5" />
              </Button>
            </motion.div>
          )}
        </AnimatePresence>

        <Button
          size="lg"
          className="rounded-full shadow-lg aspect-square p-0"
          onClick={() => setIsOpen(!isOpen)}
          data-testid="button-quick-nav-toggle"
          aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isOpen}
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            className="fixed bottom-24 right-6 z-50 bg-background/95 backdrop-blur-sm border rounded-xl shadow-xl p-2 min-w-[200px]"
            data-testid="quick-nav-menu"
          >
            <div className="text-xs font-medium text-muted-foreground px-3 py-2">
              Quick Navigation
            </div>
            <div className="space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors hover-elevate ${
                    activeSection === item.id
                      ? "bg-primary/10 text-primary font-medium"
                      : "text-foreground/80 hover:bg-muted"
                  }`}
                  data-testid={`nav-item-${item.id}`}
                >
                  {item.icon}
                  {item.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
