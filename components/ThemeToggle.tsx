'use client';

import { useTheme } from '@/components/ThemeProvider';
import { Moon, Sun, CloudMoon } from 'lucide-react';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const cycle = () => {
    if (theme === 'light') setTheme('dark');
    else if (theme === 'dark') setTheme('night');
    else setTheme('light');
  };

  return (
    <button
      type="button"
      onClick={cycle}
      className="p-2 rounded-xl border border-border bg-card hover:bg-accent transition-colors"
      aria-label="Toggle theme"
    >
      {theme === 'light' && <Sun className="w-5 h-5 text-foreground" />}
      {theme === 'dark' && <Moon className="w-5 h-5 text-foreground" />}
      {theme === 'night' && <CloudMoon className="w-5 h-5 text-foreground" />}
    </button>
  );
}
