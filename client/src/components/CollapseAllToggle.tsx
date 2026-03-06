import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import { ChevronsDownUp, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface CollapsibleContextValue {
  globalState: boolean | undefined;
  collapseAll: () => void;
  expandAll: () => void;
}

const CollapsibleContext = createContext<CollapsibleContextValue>({
  globalState: undefined,
  collapseAll: () => {},
  expandAll: () => {},
});

export function useCollapsibleContext() {
  return useContext(CollapsibleContext);
}

export function CollapsibleProvider({ children }: { children: ReactNode }) {
  const [globalState, setGlobalState] = useState<boolean | undefined>(undefined);
  const collapseAll = useCallback(() => setGlobalState(false), []);
  const expandAll   = useCallback(() => setGlobalState(true),  []);
  return (
    <CollapsibleContext.Provider value={{ globalState, collapseAll, expandAll }}>
      {children}
    </CollapsibleContext.Provider>
  );
}

export default function CollapseAllToggle({ className }: { className?: string }) {
  const { globalState, collapseAll, expandAll } = useCollapsibleContext();
  const isCollapsed = globalState === false;
  return (
    <button
      type="button"
      onClick={isCollapsed ? expandAll : collapseAll}
      className={cn(
        "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium",
        "border border-slate-200 dark:border-slate-700",
        "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300",
        "hover:bg-slate-50 dark:hover:bg-slate-700",
        "transition-colors duration-150 shadow-sm",
        className
      )}
    >
      {isCollapsed ? (
        <><ChevronsUpDown className="w-3.5 h-3.5" />Expand All</>
      ) : (
        <><ChevronsDownUp className="w-3.5 h-3.5" />Collapse All</>
      )}
    </button>
  );
}
