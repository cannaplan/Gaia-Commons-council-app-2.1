import { ReactNode } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  icon: ReactNode;
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function StatsCard({ title, icon, children, className, delay = 0 }: StatsCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      className={cn("h-full", className)}
    >
      <Card className="h-full border-none shadow-lg shadow-black/5 bg-white/80 backdrop-blur-sm hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 overflow-hidden group">
        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity duration-300 group-hover:scale-110 transform origin-top-right">
          {icon}
        </div>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider flex items-center gap-2">
            <span className="text-primary">{icon}</span>
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {children}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

interface StatItemProps {
  label: string;
  value: string | number;
  trend?: string;
  trendUp?: boolean;
}

export function StatItem({ label, value, trend, trendUp }: StatItemProps) {
  return (
    <div className="flex items-end justify-between border-b border-border/40 last:border-0 pb-3 last:pb-0">
      <div>
        <p className="text-xs text-muted-foreground font-medium mb-1">{label}</p>
        <p className="text-2xl font-bold font-display text-foreground tracking-tight">{value}</p>
      </div>
      {trend && (
        <span className={cn(
          "text-xs px-2 py-1 rounded-full font-medium mb-1",
          trendUp ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700"
        )}>
          {trend}
        </span>
      )}
    </div>
  );
}
