import { Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export function PrintButton() {
  const { toast } = useToast();

  const handlePrint = () => {
    toast({
      title: "Preparing print view...",
      description: "Opening print dialog with optimized layout",
    });
    
    setTimeout(() => {
      window.print();
    }, 300);
  };

  return (
    <Button 
      variant="outline" 
      size="sm" 
      className="gap-2"
      onClick={handlePrint}
      data-testid="button-print"
    >
      <Printer className="h-4 w-4" />
      Print
    </Button>
  );
}
