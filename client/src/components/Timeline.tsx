import { motion } from "framer-motion";
import { TimelineEvent } from "@shared/schema";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarClock } from "lucide-react";

interface TimelineProps {
  events: TimelineEvent[];
}

export function Timeline({ events }: TimelineProps) {
  // Sort events by year
  const sortedEvents = [...events].sort((a, b) => parseInt(a.year) - parseInt(b.year));

  return (
    <Card className="border-none shadow-lg shadow-black/5 bg-white/80 backdrop-blur-sm overflow-hidden h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-display text-xl">
          <CalendarClock className="h-5 w-5 text-accent" />
          Strategic Timeline
        </CardTitle>
      </CardHeader>
      <CardContent className="relative">
        <div className="absolute left-8 top-6 bottom-6 w-0.5 bg-gradient-to-b from-primary/20 via-primary/10 to-transparent" />
        
        <div className="space-y-8 pl-2">
          {sortedEvents.map((event, index) => (
            <motion.div 
              key={event.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 + 0.3 }}
              className="relative pl-10 group"
            >
              {/* Dot */}
              <div className="absolute left-[3px] top-1.5 h-3 w-3 rounded-full border-2 border-primary bg-background group-hover:bg-primary transition-colors duration-300 z-10 shadow-sm" />
              
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:gap-4">
                <span className="text-sm font-bold text-primary font-display w-16 shrink-0">{event.year}</span>
                <span className="text-foreground/80 font-medium group-hover:text-foreground transition-colors">
                  {event.event}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
