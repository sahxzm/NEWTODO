
"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes"
import { type ThemeProviderProps } from "next-themes/dist/types"

function CustomBackgroundManager() {
  const { theme } = useTheme();

  React.useEffect(() => {
    const customBg = localStorage.getItem('custom-background');
    if (customBg) {
      document.documentElement.style.setProperty('--custom-background-image', `url(${customBg})`);
      document.documentElement.style.setProperty('--background-opacity', '0.15');
    } else {
      // When there's no custom background, ensure theme-specific one is used
      // This is handled by the theme class setting the variable, but we clear the inline style
       document.documentElement.style.removeProperty('--custom-background-image');
       document.documentElement.style.removeProperty('--background-opacity');
    }
  }, [theme]); // Rerun when theme changes

  return null;
}

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider {...props}>
      {children}
      <CustomBackgroundManager />
    </NextThemesProvider>
  )
}

    