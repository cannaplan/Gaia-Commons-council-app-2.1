import { motion } from "framer-motion";

interface ProgressBarProps {
  current: number;
  target: number;
  label?: string;
  showPercentage?: boolean;
  color?: "primary" | "emerald" | "amber" | "blue" | "purple";
  size?: "sm" | "md" | "lg";
}

const colorClasses = {
  primary: "bg-primary",
  emerald: "bg-emerald-500",
  amber: "bg-amber-500",
  blue: "bg-blue-500",
  purple: "bg-purple-500",
};

const sizeClasses = {
  sm: "h-1.5",
  md: "h-2.5",
  lg: "h-4",
};

export function ProgressBar({
  current,
  target,
  label,
  showPercentage = true,
  color = "primary",
  size = "md",
}: ProgressBarProps) {
  const percentage = Math.min((current / target) * 100, 100);
  const isOverTarget = current > target;
  const overPercentage = isOverTarget ? ((current - target) / target) * 100 : 0;

  return (
    <div className="w-full" data-testid="progress-bar">
      {(label || showPercentage) && (
        <div className="flex justify-between items-center mb-1">
          {label && <span className="text-sm text-muted-foreground">{label}</span>}
          {showPercentage && (
            <span className="text-sm font-medium">
              {percentage.toFixed(0)}%
              {isOverTarget && (
                <span className="text-emerald-600 ml-1">(+{overPercentage.toFixed(0)}% over)</span>
              )}
            </span>
          )}
        </div>
      )}
      <div className={`w-full bg-muted rounded-full overflow-hidden ${sizeClasses[size]}`}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${Math.min(percentage, 100)}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          className={`${sizeClasses[size]} ${colorClasses[color]} rounded-full relative`}
        >
          {isOverTarget && (
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(overPercentage, 100)}%` }}
              transition={{ duration: 0.5, delay: 1, ease: "easeOut" }}
              className="absolute right-0 top-0 h-full bg-emerald-400 rounded-r-full"
              style={{ marginRight: `-${Math.min(overPercentage, 100)}%` }}
            />
          )}
        </motion.div>
      </div>
    </div>
  );
}
