import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

const shortcuts: Record<string, { action: () => void; description: string }> = {};

export function useKeyboardShortcuts() {
  const { toast } = useToast();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      if (e.key === "?" && !e.ctrlKey && !e.metaKey) {
        e.preventDefault();
        toast({
          title: "Keyboard Shortcuts",
          description: (
            <div className="mt-2 space-y-1 text-sm">
              <div><kbd className="px-1 bg-muted rounded">↑/↓</kbd> Scroll up/down</div>
              <div><kbd className="px-1 bg-muted rounded">Home</kbd> Go to top</div>
              <div><kbd className="px-1 bg-muted rounded">End</kbd> Go to bottom</div>
              <div><kbd className="px-1 bg-muted rounded">1-9</kbd> Jump to section</div>
              <div><kbd className="px-1 bg-muted rounded">?</kbd> Show shortcuts</div>
            </div>
          ) as any,
        });
        return;
      }

      if (e.key === "Home") {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }

      if (e.key === "End") {
        e.preventDefault();
        window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
        return;
      }

      const sectionIds = [
        "mission",
        "card-pilot-clusters",
        "card-multi-scale",
        "card-funding",
        "card-mining-alternative",
        "card-coalition",
        "card-curriculum",
        "interactive-map",
        "global-regeneration",
      ];

      const num = parseInt(e.key);
      if (num >= 1 && num <= 9 && num <= sectionIds.length) {
        e.preventDefault();
        const sectionId = sectionIds[num - 1];
        const element = document.querySelector(`[data-testid="${sectionId}"]`) || document.getElementById(sectionId);
        if (element) {
          const top = element.getBoundingClientRect().top + window.scrollY - 100;
          window.scrollTo({ top, behavior: "smooth" });
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [toast]);
}

export function KeyboardNavProvider({ children }: { children: React.ReactNode }) {
  useKeyboardShortcuts();
  return <>{children}</>;
}
