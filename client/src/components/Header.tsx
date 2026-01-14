import { Leaf } from "lucide-react";
import { HealthIndicator } from "./HealthIndicator";

export function Header() {
  return (
    <header className="py-8 mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-border/40 pb-6">
      <div className="flex items-center gap-4">
        <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-lg shadow-primary/20 text-white">
          <Leaf className="h-7 w-7" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-foreground font-display tracking-tight whitespace-nowrap">Gaia Commons Council</h1>
          <p className="text-muted-foreground font-medium">Dashboard & Analytics</p>
        </div>
      </div>
      
      <HealthIndicator />
    </header>
  );
}
