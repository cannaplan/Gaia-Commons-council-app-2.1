import { Leaf } from "lucide-react";
import { useTranslation } from "react-i18next";
import { HealthIndicator } from "./HealthIndicator";
import { LanguageSelector } from "./LanguageSelector";
import { ThemeSelector } from "./ThemeSelector";
import { ColorSchemeSelector } from "./ColorSchemeSelector";
import { ExportPanel } from "./ExportPanel";
import { ShareButtons } from "./ShareButtons";
import { PrintButton } from "./PrintView";
import { HighContrastToggle } from "./HighContrastToggle";

export function Header() {
  const { t } = useTranslation();
  
  return (
    <header className="py-8 mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-border/40 pb-6 print:hidden">
      <div className="flex items-center gap-4">
        <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-lg shadow-primary/20 text-white">
          <Leaf className="h-7 w-7" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-foreground font-display tracking-tight whitespace-nowrap">{t('dashboard.title')}</h1>
          <p className="text-muted-foreground font-medium">{t('dashboard.subtitle')}</p>
        </div>
      </div>
      
      <div className="flex items-center gap-2 flex-wrap">
        <ShareButtons />
        <PrintButton />
        <ExportPanel />
        <LanguageSelector />
        <ColorSchemeSelector />
        <ThemeSelector />
        <HighContrastToggle />
        <HealthIndicator />
      </div>
    </header>
  );
}
