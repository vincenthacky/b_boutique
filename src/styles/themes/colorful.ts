import { baseTheme } from './base'

export const colorfulTheme = {
  ...baseTheme,
  colors: {
    ...baseTheme.colors,
    primary: {
      ...baseTheme.colors.primary,
      500: '236 72 153'  // Rose vif
    },
    secondary: {
      ...baseTheme.colors.secondary,
      500: '147 51 234' // Violet
    }
  },
  gradients: {
    ...baseTheme.gradients,
    primary: 'linear-gradient(135deg, rgb(236 72 153) 0%, rgb(147 51 234) 100%)'
  }
}