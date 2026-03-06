import { useState, useId, useEffect, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

type AccentColor = "emerald" | "blue" | "amber" | "violet" | "rose" | "none";

interface CollapsibleCardProps {
  title: string;
  subtitle?: string;
  icon?: ReactNode;
  badge?: string;
  defaultOpen?: boolean;
  className?: string;
  children: ReactNode;
  headerRight?: ReactNode;
  accent?: AccentColor;
  highlight?: boolean;
}

const accentBorder: Record<AccentColor, string> = {
  emerald: "border-l-4 border-l-emerald-500",
  blue:    "border-l-4 border-l-blue-500",
  amber:   "border-l-4 border-l-amber-500",
  violet:  "border-l-4 border-l-violet-500",
  rose:    "border-l-4 border-l-rose-500",
  none:    "",
};

const badgeColor: Record<AccentColor, string> = {
  emerald: "bg-emerald-100 text-emerald-800",
  blue:    "bg-blue-100 text-blue-800",
  amber:   "bg-amber-100 text-amber-800",
  violet:  "bg-violet-100 text-violet-800",
  rose:    "bg-rose-100 text-rose-800",
  none:    "bg-slate-100 text-slate-700",
};

const bodyVariants = {
  open:   { height: "auto", opacity: 1, transition: { duration: 0.28, ease: [0.4, 0, 0.2, 1] } },
  closed: { height: 0,      opacity: 0, transition: { duration: 0.22, ease: [0.4, 0, 1, 1] } },
};

export default function CollapsibleCard({
  title, subtitle, icon, badge, defaultOpen = true,
  className, children, headerRight, accent = "none", highlight = false,
}: CollapsibleCardProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const contentId = useId();

  return (
    <div className={cn(
      "rounded-xl border border-slate-200 dark:border-slate-700",
      "bg-white dark:bg-slate-900 shadow-sm overflow-hidden",
      accentBorder[accent], className
    )}>
      <button
        type="button"
        aria-expanded={isOpen}
        aria-controls={contentId}
        onClick={() => setIsOpen(v => !v)}
        className={cn(
          "w-full flex items-center justify-between gap-3 px-5 py-4 text-left",
          "transition-colors duration-150",
          "hover:bg-slate-50 dark:hover:bg-slate-800/60",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500",
          highlight && "bg-gradient-to-r from-slate-50 to-white dark:from-slate-800/50 dark:to-slate-900"
        )}
      >
        <div className="flex items-center gap-3 min-w-0">
          {icon && <span className="shrink-0 text-slate-500">{icon}</span>}
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-semibold text-slate-900 dark:text-slate-100 text-sm sm:text-base leading-tight truncate">
                {title}
              </span>
              {badge && (
                <span className={cn("inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium shrink-0", badgeColor[accent])}>
                  {badge}
                </span>
              )}
            </div>
            {subtitle && <p className="text-xs text-slate-500 mt-0.5 truncate">{subtitle}</p>}
          </div>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          {headerRight && <div className="hidden sm:flex items-center gap-2 text-xs text-slate-600">{headerRight}</div>}
          <motion.span
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.22, ease: "easeInOut" }}
            className="text-slate-400"
          >
            <ChevronDown className="w-4 h-4" />
          </motion.span>
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={contentId}
            key="body"
            variants={bodyVariants}
            initial="closed"
            animate="open"
            exit="closed"
            style={{ overflow: "hidden" }}
          >
            <div className="px-5 pb-5 pt-1">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
