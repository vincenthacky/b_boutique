// types/common.ts - Types communs
export interface BaseEntity {
  id: string
  created_at: string
  updated_at: string
}

export interface PaginatedResponse<T> {
  data: T[]
  current_page: number
  last_page: number
  per_page: number
  total: number
  from: number
  to: number
  next_page_url: string | null
  prev_page_url: string | null
}

export interface ApiResponse<T> {
  data: T
  message?: string
  status: 'success' | 'error'
}

export interface LoadingState {
  isLoading: boolean
  error: string | null
}

// Types pour les animations
export interface AnimationVariant {
  initial?: unknown
  animate?: unknown
  exit?: unknown
  transition?: unknown
  hover?: unknown
  tap?: unknown
}

// Types pour les composants UI
export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  isLoading?: boolean
  disabled?: boolean
  icon?: React.ReactNode
  children: React.ReactNode
  className?: string
  onClick?: () => void
}

export interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  children: React.ReactNode
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  closeOnOverlay?: boolean
}

export interface ToastType {
  id: string
  type: 'success' | 'error' | 'warning' | 'info'
  title: string
  message?: string
  duration?: number
  action?: {
    label: string
    onClick: () => void
  }
}

// Types pour les constantes
export interface NavigationItem {
  label: string
  href: string
  icon?: React.ComponentType
  children?: NavigationItem[]
  badge?: string | number
}

export interface SocialLink {
  name: string
  url: string
  icon: React.ComponentType
}

// Types utilitaires
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>
export type RequiredBy<T, K extends keyof T> = T & Required<Pick<T, K>>

// Types pour les événements analytics
export interface AnalyticsEvent {
  name: string
  properties?: Record<string, unknown>
  user_id?: string
  timestamp?: string
}

export interface ProductViewEvent extends AnalyticsEvent {
  name: 'product_view'
  properties: {
    product_id: string
    product_name: string
    category: string
    brand: string
    price: number
  }
}

export interface AddToCartEvent extends AnalyticsEvent {
  name: 'add_to_cart'
  properties: {
    product_id: string
    product_name: string
    quantity: number
    price: number
    variant_id?: string
  }
}

export interface PurchaseEvent extends AnalyticsEvent {
  name: 'purchase'
  properties: {
    order_id: string
    total: number
    currency: string
    items: Array<{
      product_id: string
      product_name: string
      category: string
      quantity: number
      price: number
    }>
  }
}