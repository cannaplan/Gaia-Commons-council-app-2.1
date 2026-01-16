import { Palette } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { useColorScheme, colorSchemes } from '@/lib/theme-context';

export function ColorSchemeSelector() {
  const { t } = useTranslation();
  const { colorScheme, setColorScheme } = useColorScheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" data-testid="button-color-scheme-selector">
          <Palette className="h-4 w-4" />
          <span className="sr-only">Select color scheme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {colorSchemes.map((scheme) => (
          <DropdownMenuItem
            key={scheme.id}
            onClick={() => setColorScheme(scheme.id)}
            className={colorScheme === scheme.id ? 'bg-accent' : ''}
            data-testid={`menu-item-color-${scheme.id}`}
          >
            <div className="flex items-center gap-2">
              <div 
                className="w-4 h-4 rounded-full border border-border"
                style={{ backgroundColor: scheme.primary }}
              />
              <div className="flex flex-col">
                <span className="font-medium">{scheme.name}</span>
                <span className="text-xs text-muted-foreground">{scheme.description}</span>
              </div>
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
