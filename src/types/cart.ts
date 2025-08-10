// types/cart.ts - Types panier
import type { BaseEntity } from './common'
import type { Product, ProductVariant } from './product'

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

// Types pour le contexte panier
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

// Types pour les événements panier
export interface CartEvent {
  type: 'item_added' | 'item_updated' | 'item_removed' | 'coupon_applied' | 'coupon_removed' | 'cart_cleared'
  item?: CartItem
  coupon?: Coupon
  metadata?: Record<string, unknown>
}

// Types pour la persistance du panier
export interface CartStorage {
  items: Omit<CartItem, 'product' | 'variant'>[]
  applied_coupons: string[] // Codes des coupons
  last_updated: string
}

// Types pour les calculs de panier
export interface CartCalculation {
  subtotal: number
  tax_amount: number
  shipping_amount: number
  discount_amount: number
  total: number
  savings?: number
}

// Types pour les règles de livraison
export interface ShippingRule {
  id: string
  name: string
  min_amount?: number
  max_amount?: number
  cost: number
  estimated_days: number
  regions?: string[]
  is_free: boolean
}

// Types pour les règles de taxe
export interface TaxRule {
  id: string
  name: string
  rate: number
  regions?: string[]
  product_categories?: string[]
}