// src/utils/formatters.ts

// Format price with separator
export const formatPrice = (price: number): string => {
  return price.toLocaleString('fr-FR')
}

// Calculate discount percentage
export const calculateDiscount = (original: number, current: number): number => {
  return Math.round(((original - current) / original) * 100)
}

// Format date
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString)
  return date.toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

// Truncate text
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength) + '...'
}

// Validate email
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}