'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'solar' | 'mushroom';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('solar');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Read theme from localStorage or default to solar
    const savedTheme = localStorage.getItem('business-theme') as Theme;
    if (savedTheme === 'solar' || savedTheme === 'mushroom') {
      setThemeState(savedTheme);
      document.body.setAttribute('data-theme', savedTheme);
    } else {
      document.body.setAttribute('data-theme', 'solar');
    }
    setMounted(true);
  }, []);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem('business-theme', newTheme);
    document.body.setAttribute('data-theme', newTheme);
  };

  const toggleTheme = () => {
    const newTheme = theme === 'solar' ? 'mushroom' : 'solar';
    setTheme(newTheme);
  };

  // Prevent flash of unthemed content by outputting a placeholder until mounted
  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {mounted ? children : <div style={{ visibility: 'hidden' }}>{children}</div>}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
