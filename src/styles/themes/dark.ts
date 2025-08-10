import { baseTheme } from './base'

export const darkTheme = {
  ...baseTheme,
  colors: {
    ...baseTheme.colors,
    background: '15 23 42',
    foreground: '248 250 252',
    card: '30 41 59',
    cardForeground: '248 250 252',
    muted: '30 41 59',
    mutedForeground: '148 163 184',
    border: '51 65 85',
    input: '51 65 85'
  }
}