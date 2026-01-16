import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type ColorScheme = 'default' | 'forest' | 'ocean' | 'sunset' | 'earth' | 'lavender';

interface ThemeContextType {
  colorScheme: ColorScheme;
  setColorScheme: (scheme: ColorScheme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const colorSchemes: { id: ColorScheme; name: string; description: string; primary: string; accent: string }[] = [
  { id: 'default', name: 'Emerald', description: 'Fresh green theme', primary: '#10b981', accent: '#34d399' },
  { id: 'forest', name: 'Forest', description: 'Deep woodland greens', primary: '#166534', accent: '#22c55e' },
  { id: 'ocean', name: 'Ocean', description: 'Calming blue tones', primary: '#0369a1', accent: '#38bdf8' },
  { id: 'sunset', name: 'Sunset', description: 'Warm amber hues', primary: '#d97706', accent: '#fbbf24' },
  { id: 'earth', name: 'Earth', description: 'Natural brown tones', primary: '#92400e', accent: '#d97706' },
  { id: 'lavender', name: 'Lavender', description: 'Soft purple palette', primary: '#7c3aed', accent: '#a78bfa' }
];

const schemeStyles: Record<ColorScheme, string> = {
  default: `
    --primary: 158 64% 42%;
    --primary-foreground: 0 0% 100%;
    --accent: 158 64% 52%;
    --accent-foreground: 158 64% 10%;
  `,
  forest: `
    --primary: 142 72% 24%;
    --primary-foreground: 0 0% 100%;
    --accent: 142 71% 45%;
    --accent-foreground: 142 72% 10%;
  `,
  ocean: `
    --primary: 201 96% 32%;
    --primary-foreground: 0 0% 100%;
    --accent: 199 89% 60%;
    --accent-foreground: 201 96% 10%;
  `,
  sunset: `
    --primary: 38 92% 44%;
    --primary-foreground: 0 0% 100%;
    --accent: 45 93% 56%;
    --accent-foreground: 38 92% 10%;
  `,
  earth: `
    --primary: 28 80% 31%;
    --primary-foreground: 0 0% 100%;
    --accent: 38 92% 44%;
    --accent-foreground: 28 80% 10%;
  `,
  lavender: `
    --primary: 263 70% 58%;
    --primary-foreground: 0 0% 100%;
    --accent: 263 70% 72%;
    --accent-foreground: 263 70% 10%;
  `
};

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [colorScheme, setColorScheme] = useState<ColorScheme>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('colorScheme') as ColorScheme) || 'default';
    }
    return 'default';
  });

  useEffect(() => {
    const root = document.documentElement;
    const styleId = 'theme-colors';
    
    let styleEl = document.getElementById(styleId) as HTMLStyleElement;
    if (!styleEl) {
      styleEl = document.createElement('style');
      styleEl.id = styleId;
      document.head.appendChild(styleEl);
    }
    
    styleEl.textContent = `
      :root {
        ${schemeStyles[colorScheme]}
      }
      .dark {
        ${schemeStyles[colorScheme]}
      }
    `;
    
    localStorage.setItem('colorScheme', colorScheme);
  }, [colorScheme]);

  return (
    <ThemeContext.Provider value={{ colorScheme, setColorScheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useColorScheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useColorScheme must be used within a ThemeProvider');
  }
  return context;
}
