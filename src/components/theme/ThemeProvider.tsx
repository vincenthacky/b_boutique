import React, { createContext, useContext, useState } from 'react'
import { baseTheme, darkTheme, colorfulTheme } from '../../styles/themes'

type Theme = 'light' | 'dark' | 'colorful'

type ThemeContextType = {
  theme: Theme
  setTheme: (theme: Theme) => void
  currentTheme: typeof baseTheme
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  setTheme: () => {},
  currentTheme: baseTheme
})

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<Theme>('light')
  
  const themes = {
    light: baseTheme,
    dark: darkTheme,
    colorful: colorfulTheme
  }

  return (
    <ThemeContext.Provider value={{ 
      theme, 
      setTheme, 
      currentTheme: themes[theme] 
    }}>
      {children}
    </ThemeContext.Provider>
  )
}
//tou commence
export const useTheme = () => useContext(ThemeContext)