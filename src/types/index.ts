// types/index.ts - Types principaux
export * from './api'
export * from './product'
export * from './user'
export * from './cart'
export * from './order'
export * from './common'

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

// types/product.ts - Types produits
export interface Product extends BaseEntity {
  name: string
  description: string
  price: number
  original_price?: number
  sku: string
  stock: number
  is_active: boolean
  weight?: number
  dimensions?: {
    length: number
    width: number
    height: number
  }
  
  // Relations Laravel
  category: Category
  brand: Brand
  images: ProductImage[]
  variants: ProductVariant[]
  reviews: Review[]
  tags: Tag[]
  
  // Attributs calculés Laravel
  average_rating: number
  reviews_count: number
  is_in_stock: boolean
  discount_percentage?: number
  is_new: boolean
  is_featured: boolean
  is_sale: boolean
}

export interface Category extends BaseEntity {
  name: string
  slug: string
  description?: string
  image?: string
  parent_id?: string
  is_active: boolean
  sort_order: number
  
  // Relations
  parent?: Category
  children: Category[]
  products_count: number
}

export interface Brand extends BaseEntity {
  name: string
  slug: string
  description?: string
  logo?: string
  website?: string
  is_active: boolean
  
  // Relations
  products_count: number
}

export interface ProductImage extends BaseEntity {
  product_id: string
  url: string
  alt?: string
  is_primary: boolean
  sort_order: number
  
  // URLs optimisées
  thumbnail_url: string
  medium_url: string
  large_url: string
}

export interface ProductVariant extends BaseEntity {
  product_id: string
  name: string
  sku: string
  price?: number
  stock: number
  is_active: boolean
  
  // Attributs dynamiques (taille, couleur, etc.)
  attributes: Record<string, string>
}

export interface Review extends BaseEntity {
  product_id: string
  user_id: string
  rating: number
  title?: string
  comment?: string
  is_verified: boolean
  is_approved: boolean
  
  // Relations
  user: User
}

export interface Tag extends BaseEntity {
  name: string
  slug: string
  color?: string
}

// Filtres et recherche
export interface ProductFilters {
  category_id?: string
  brand_id?: string
  min_price?: number
  max_price?: number
  in_stock?: boolean
  is_new?: boolean
  is_featured?: boolean
  is_sale?: boolean
  tags?: string[]
  rating?: number
  sort?: 'price_asc' | 'price_desc' | 'name_asc' | 'name_desc' | 'created_asc' | 'created_desc' | 'rating_desc'
  per_page?: number
  page?: number
}

export interface SearchFilters extends ProductFilters {
  query: string
}

// types/user.ts - Types utilisateurs
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

// types/cart.ts - Types panier
export interface CartItem {
  id: string
  product_id: string
  variant_id?: string
  quantity: number
  price: number
  
  // Relations dénormalisées pour performance
  product: Pick<Product, 'id' | 'name' | 'images' | 'stock' | 'is_active'>
  variant?: Pick<ProductVariant, 'id' | 'name' | 'attributes' | 'stock'>
}

export interface Cart {
  items: CartItem[]
  subtotal: number
  tax_amount: number
  shipping_amount: number
  discount_amount: number
  total: number
  items_count: number
  applied_coupons: AppliedCoupon[]
}

export interface Coupon extends BaseEntity {
  code: string
  type: 'fixed' | 'percentage'
  value: number
  minimum_amount?: number
  maximum_discount?: number
  usage_limit?: number
  usage_count: number
  expires_at?: string
  is_active: boolean
}

export interface AppliedCoupon {
  coupon: Coupon
  discount_amount: number
}

// types/order.ts - Types commandes
export interface Order extends BaseEntity {
  order_number: string
  user_id: string
  status: OrderStatus
  payment_status: PaymentStatus
  
  // Montants
  subtotal: number
  tax_amount: number
  shipping_amount: number
  discount_amount: number
  total: number
  
  // Adresses (snapshot au moment de la commande)
  billing_address: Address
  shipping_address: Address
  
  // Notes
  customer_notes?: string
  admin_notes?: string
  
  // Relations
  items: OrderItem[]
  payments: Payment[]
  shipments: Shipment[]
  status_history: OrderStatusHistory[]
  
  // Dates importantes
  shipped_at?: string
  delivered_at?: string
  cancelled_at?: string
}

export interface OrderItem extends BaseEntity {
  order_id: string
  product_id: string
  variant_id?: string
  quantity: number
  price: number
  total: number
  
  // Snapshot du produit au moment de l'achat
  product_snapshot: {
    name: string
    image: string
    sku: string
    variant_name?: string
    variant_attributes?: Record<string, string>
  }
}

export type OrderStatus = 
  | 'pending'
  | 'confirmed' 
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'cancelled'
  | 'refunded'

export type PaymentStatus =
  | 'pending'
  | 'processing'
  | 'completed'
  | 'failed'
  | 'cancelled'
  | 'refunded'

export interface Payment extends BaseEntity {
  order_id: string
  method: PaymentMethod
  provider: PaymentProvider
  amount: number
  currency: string
  status: PaymentStatus
  reference: string
  provider_transaction_id?: string
  metadata?: Record<string, unknown>
}

export type PaymentMethod = 'mobile_money' | 'card' | 'bank_transfer' | 'cash_on_delivery'
export type PaymentProvider = 'orange_money' | 'mtn_money' | 'stripe' | 'paypal' | 'wave'

export interface Shipment extends BaseEntity {
  order_id: string
  tracking_number: string
  carrier: string
  status: ShipmentStatus
  shipped_at?: string
  estimated_delivery_date?: string
  delivered_at?: string
  notes?: string
}

export type ShipmentStatus = 'preparing' | 'shipped' | 'in_transit' | 'delivered' | 'failed'

export interface OrderStatusHistory extends BaseEntity {
  order_id: string
  status: OrderStatus
  notes?: string
  created_by?: string
}

// types/api.ts - Types API
export interface ApiError {
  message: string
  errors?: Record<string, string[]>
  status: number
}

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

export interface AuthResponse {
  user: User
  token: string
  expires_at: string
}

// Types pour les hooks et contextes
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

export interface CartContextType {
  cart: Cart
  isLoading: boolean
  addItem: (productId: string, quantity?: number, variantId?: string) => Promise<void>
  updateItem: (itemId: string, quantity: number) => Promise<void>
  removeItem: (itemId: string) => Promise<void>
  clearCart: () => Promise<void>
  applyCoupon: (code: string) => Promise<void>
  removeCoupon: (couponId: string) => Promise<void>
}

// Types pour les formulaires
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

export interface ReviewFormData {
  rating: number
  title?: string
  comment?: string
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

// Types pour les animations
export interface AnimationVariant {
  initial?: unknown
  animate?: unknown
  exit?: unknown
  transition?: unknown
  hover?: unknown
  tap?: unknown
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

export interface PaymentMethodInfo {
  id: PaymentMethod
  name: string
  provider: PaymentProvider
  icon: string
  available: boolean
  fees?: number
  processing_time?: string
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

// Types pour la recherche
export interface SearchSuggestion {
  type: 'product' | 'category' | 'brand' | 'query'
  value: string
  label: string
  image?: string
  count?: number
}

export interface SearchResults {
  products: Product[]
  categories: Category[]
  brands: Brand[]
  suggestions: SearchSuggestion[]
  total: number
  query: string
  filters: SearchFilters
}

// Types pour les favoris
export interface Wishlist {
  id: string
  name: string
  is_default: boolean
  items: WishlistItem[]
  created_at: string
  updated_at: string
}

export interface WishlistItem {
  id: string
  wishlist_id: string
  product_id: string
  product: Product
  added_at: string
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