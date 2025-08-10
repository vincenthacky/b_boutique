// types/product.ts - Types produits
import type { BaseEntity } from './common'
import type { User } from './user'

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

// Types pour les formulaires
export interface ReviewFormData {
  rating: number
  title?: string
  comment?: string
}