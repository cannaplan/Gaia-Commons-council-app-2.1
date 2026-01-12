import { useHealth } from "@/hooks/use-gaia";
import { Activity, Server } from "lucide-react";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

export function HealthIndicator() {
  const { data: health, isLoading, isError } = useHealth();

  const statusColor = isError ? "bg-destructive" : "bg-emerald-500";
  const statusText = isError ? "Error" : health?.status || "Connecting...";

  return (
    <div className="flex items-center gap-3 bg-white/50 backdrop-blur px-3 py-1.5 rounded-full border border-border/50 shadow-sm">
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex items-center gap-2 cursor-help">
            <span className="relative flex h-2.5 w-2.5">
              <span className={cn("animate-ping absolute inline-flex h-full w-full rounded-full opacity-75", statusColor)}></span>
              <span className={cn("relative inline-flex rounded-full h-2.5 w-2.5", statusColor)}></span>
            </span>
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              {statusText}
            </span>
          </div>
        </TooltipTrigger>
        <TooltipContent side="bottom" className="text-xs bg-foreground text-background">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <Server className="h-3 w-3" />
              <span>Service: {health?.service || "Unknown"}</span>
            </div>
            <div className="flex items-center gap-2">
              <Activity className="h-3 w-3" />
              <span>Version: {health?.version || "Unknown"}</span>
            </div>
          </div>
        </TooltipContent>
      </Tooltip>
    </div>
  );
}
