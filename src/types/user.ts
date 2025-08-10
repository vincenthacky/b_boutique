// types/user.ts - Types utilisateurs
import type{ BaseEntity } from './common'

export interface User extends BaseEntity {
  first_name: string
  last_name: string
  email: string
  email_verified_at?: string
  phone?: string
  birth_date?: string
  gender?: 'male' | 'female' | 'other'
  avatar?: string
  is_active: boolean
  
  // Préférences
  preferences: UserPreferences
  
  // Adresses
  addresses: Address[]
  
  // Relations
  orders_count: number
  total_spent: number
  loyalty_points: number
}

export interface UserPreferences {
  language: 'fr' | 'en'
  currency: 'CFA' | 'EUR' | 'USD'
  newsletter: boolean
  sms_notifications: boolean
  email_notifications: boolean
  theme: 'light' | 'dark' | 'colorful'
}

export interface Address extends BaseEntity {
  user_id: string
  type: 'billing' | 'shipping'
  first_name: string
  last_name: string
  compunknown?: string
  address_line_1: string
  address_line_2?: string
  city: string
  state?: string
  postal_code: string
  country: string
  phone?: string
  is_default: boolean
}

// Types pour les contextes
export interface ThemeContextType {
  theme: 'light' | 'dark' | 'colorful'
  setTheme: (theme: 'light' | 'dark' | 'colorful') => void
}

export interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (credentials: LoginCredentials) => Promise<void>
  register: (credentials: RegisterCredentials) => Promise<void>
  logout: () => Promise<void>
  refreshUser: () => Promise<void>
}

// Types pour les formulaires
export interface LoginCredentials {
  email: string
  password: string
  remember_me?: boolean
}

export interface RegisterCredentials {
  first_name: string
  last_name: string
  email: string
  phone?: string
  password: string
  password_confirmation: string
}

export interface ContactFormData {
  name: string
  email: string
  phone?: string
  subject: string
  message: string
}

export interface NewsletterFormData {
  email: string
  preferences?: {
    new_products: boolean
    offers: boolean
    events: boolean
  }
}

// Types pour les notifications
export interface Notification extends BaseEntity {
  user_id: string
  type: NotificationType
  title: string
  message: string
  data?: Record<string, unknown>
  read_at?: string
  action_url?: string
}

export type NotificationType = 
  | 'order_confirmed'
  | 'order_shipped' 
  | 'order_delivered'
  | 'payment_received'
  | 'product_back_in_stock'
  | 'price_drop'
  | 'new_message'
  | 'system_update'