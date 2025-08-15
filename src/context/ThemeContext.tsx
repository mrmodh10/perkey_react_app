import { createContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { lightTheme } from '../themes/light';
import { darkTheme } from '../themes/dark';

interface ThemeContextType {
  theme: 'light' | 'dark';
}

export const ThemeContext = createContext<ThemeContextType>({ theme: 'light' });

interface Props {
  children: ReactNode;
}

// Tell styled-components the shape of your theme
const themeObject = { light: lightTheme, dark: darkTheme };

export const ThemeProvider = ({ children }: Props) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const matchMedia = window.matchMedia('(prefers-color-scheme: dark)');

    const updateTheme = (e: MediaQueryListEvent | MediaQueryList) => {
      setTheme(e.matches ? 'dark' : 'light');
    };

    updateTheme(matchMedia); // Initial
    matchMedia.addEventListener('change', updateTheme);

    return () => matchMedia.removeEventListener('change', updateTheme);
  }, []);

  return (
    <StyledThemeProvider theme={themeObject[theme]}>
      {children}
    </StyledThemeProvider>
  );
};