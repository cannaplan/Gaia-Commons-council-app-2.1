import { useState, useEffect, createContext, useContext } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface HighContrastContextType {
  isHighContrast: boolean;
  toggleHighContrast: () => void;
}

const HighContrastContext = createContext<HighContrastContextType>({
  isHighContrast: false,
  toggleHighContrast: () => {},
});

export function useHighContrast() {
  return useContext(HighContrastContext);
}

export function HighContrastProvider({ children }: { children: React.ReactNode }) {
  const [isHighContrast, setIsHighContrast] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("highContrast");
    if (stored === "true") {
      setIsHighContrast(true);
      document.documentElement.classList.add("high-contrast");
    }
  }, []);

  const toggleHighContrast = () => {
    setIsHighContrast(prev => {
      const newValue = !prev;
      if (newValue) {
        document.documentElement.classList.add("high-contrast");
        localStorage.setItem("highContrast", "true");
      } else {
        document.documentElement.classList.remove("high-contrast");
        localStorage.setItem("highContrast", "false");
      }
      return newValue;
    });
  };

  return (
    <HighContrastContext.Provider value={{ isHighContrast, toggleHighContrast }}>
      {children}
    </HighContrastContext.Provider>
  );
}

export function HighContrastToggle() {
  const { isHighContrast, toggleHighContrast } = useHighContrast();
  const { toast } = useToast();

  const handleToggle = () => {
    toggleHighContrast();
    toast({
      title: isHighContrast ? "High contrast disabled" : "High contrast enabled",
      description: isHighContrast 
        ? "Standard color scheme restored" 
        : "Enhanced visibility for better readability",
    });
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleToggle}
      className="relative"
      title={isHighContrast ? "Disable high contrast" : "Enable high contrast"}
      data-testid="button-high-contrast"
    >
      {isHighContrast ? (
        <Eye className="h-5 w-5" />
      ) : (
        <EyeOff className="h-5 w-5" />
      )}
    </Button>
  );
}
