// types/order.ts - Types commandes
import type { BaseEntity } from './common'
import type { Address } from './user'

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

export interface PaymentMethodInfo {
  id: PaymentMethod
  name: string
  provider: PaymentProvider
  icon: string
  available: boolean
  fees?: number
  processing_time?: string
}

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

// Types pour le processus de checkout
export interface CheckoutData {
  billing_address: Omit<Address, 'id' | 'created_at' | 'updated_at'>
  shipping_address: Omit<Address, 'id' | 'created_at' | 'updated_at'>
  payment_method: PaymentMethod
  payment_provider: PaymentProvider
  customer_notes?: string
  newsletter_signup?: boolean
  terms_accepted: boolean
}

// Types pour les étapes de checkout
export type CheckoutStep = 'cart' | 'shipping' | 'billing' | 'payment' | 'confirmation'

export interface CheckoutState {
  current_step: CheckoutStep
  completed_steps: CheckoutStep[]
  data: Partial<CheckoutData>
  errors: Record<string, string>
  is_loading: boolean
}

// Types pour les rapports de commandes
export interface OrderSummary {
  total_orders: number
  total_revenue: number
  pending_orders: number
  completed_orders: number
  cancelled_orders: number
  average_order_value: number
  popular_products: Array<{
    product_id: string
    product_name: string
    quantity_sold: number
    revenue: number
  }>
}

// Types pour les retours et remboursements
export interface Return extends BaseEntity {
  order_id: string
  reason: ReturnReason
  status: ReturnStatus
  items: ReturnItem[]
  refund_amount: number
  customer_notes?: string
  admin_notes?: string
  processed_at?: string
}

export interface ReturnItem {
  order_item_id: string
  quantity: number
  reason: string
  condition: 'new' | 'used' | 'damaged'
}

export type ReturnReason = 
  | 'defective'
  | 'wrong_item'
  | 'not_as_described'
  | 'changed_mind'
  | 'damaged_in_shipping'
  | 'other'

export type ReturnStatus = 
  | 'requested'
  | 'approved'
  | 'rejected'
  | 'received'
  | 'processed'
  | 'refunded'