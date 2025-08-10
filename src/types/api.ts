// types/api.ts - Types API
import type { User } from './user'

// Types de base pour les réponses API
export interface ApiError {
  message: string
  errors?: Record<string, string[]>
  status: number
  code?: string
}

export interface AuthResponse {
  user: User
  token: string
  expires_at: string
  refresh_token?: string
}

// Types pour les requêtes HTTP
export interface RequestConfig {
  headers?: Record<string, string>
  timeout?: number
  retry?: number
  retryDelay?: number
}

export interface ApiClient {
  get<T>(url: string, config?: RequestConfig): Promise<T>
  post<T>(url: string, data?: unknown, config?: RequestConfig): Promise<T>
  put<T>(url: string, data?: unknown, config?: RequestConfig): Promise<T>
  patch<T>(url: string, data?: unknown, config?: RequestConfig): Promise<T>
  delete<T>(url: string, config?: RequestConfig): Promise<T>
}

// Types pour l'authentification
export interface AuthTokens {
  access_token: string
  refresh_token?: string
  token_type: string
  expires_in: number
  expires_at: string
}

export interface RefreshTokenRequest {
  refresh_token: string
}

export interface ForgotPasswordRequest {
  email: string
}

export interface ResetPasswordRequest {
  email: string
  token: string
  password: string
  password_confirmation: string
}

export interface ChangePasswordRequest {
  current_password: string
  password: string
  password_confirmation: string
}

export interface UpdateProfileRequest {
  first_name?: string
  last_name?: string
  phone?: string
  birth_date?: string
  gender?: 'male' | 'female' | 'other'
  preferences?: {
    language?: 'fr' | 'en'
    currency?: 'CFA' | 'EUR' | 'USD'
    newsletter?: boolean
    sms_notifications?: boolean
    email_notifications?: boolean
    theme?: 'light' | 'dark' | 'colorful'
  }
}

// Types pour les uploads
export interface UploadResponse {
  url: string
  filename: string
  size: number
  mime_type: string
  path: string
}

export interface FileUploadRequest {
  file: File
  directory?: string
  public?: boolean
}

// Types pour les emails
export interface SendEmailRequest {
  to: string | string[]
  template: string
  data?: Record<string, unknown>
  subject?: string
  from?: string
}

// Types pour les webhooks
export interface WebhookPayload {
  event: string
  data: Record<string, unknown>
  timestamp: string
  signature?: string
}

export interface WebhookResponse {
  success: boolean
  message?: string
  processed_at: string
}

// Types pour la pagination des API
export interface PaginationParams {
  page?: number
  per_page?: number
  sort?: string
  order?: 'asc' | 'desc'
}

export interface CursorPagination {
  cursor?: string
  limit?: number
}

// Types pour les filtres génériques
export interface DateRangeFilter {
  start_date?: string
  end_date?: string
}

export interface SearchParams {
  query?: string
  filters?: Record<string, unknown>
  includes?: string[]
  excludes?: string[]
}

// Types pour les statistiques et analytics
export interface StatsResponse {
  period: string
  data: Array<{
    date: string
    value: number
    label?: string
  }>
  total: number
  change_percent?: number
}

export interface AnalyticsRequest {
  event: string
  properties: Record<string, unknown>
  user_id?: string
  session_id?: string
  timestamp?: string
}

// Types pour les configurations
export interface ApiConfig {
  baseURL: string
  timeout: number
  retries: number
  retryDelay: number
  headers: Record<string, string>
}

export interface EnvironmentConfig {
  api: ApiConfig
  features: {
    registration: boolean
    social_login: boolean
    guest_checkout: boolean
    reviews: boolean
    wishlist: boolean
    loyalty_program: boolean
  }
  payment_providers: string[]
  supported_currencies: string[]
  default_language: string
}

// Types pour les erreurs spécifiques
export interface ValidationError extends ApiError {
  errors: Record<string, string[]>
}

export interface AuthenticationError extends ApiError {
  code: 'UNAUTHENTICATED' | 'TOKEN_EXPIRED' | 'TOKEN_INVALID'
}

export interface AuthorizationError extends ApiError {
  code: 'UNAUTHORIZED' | 'INSUFFICIENT_PERMISSIONS'
}

export interface RateLimitError extends ApiError {
  code: 'RATE_LIMIT_EXCEEDED'
  retry_after: number
}

export interface ServerError extends ApiError {
  code: 'SERVER_ERROR' | 'MAINTENANCE' | 'SERVICE_UNAVAILABLE'
}

// Types pour les réponses de santé de l'API
export interface HealthCheckResponse {
  status: 'healthy' | 'degraded' | 'unhealthy'
  services: {
    database: 'up' | 'down'
    redis: 'up' | 'down'
    mail: 'up' | 'down'
    storage: 'up' | 'down'
  }
  version: string
  timestamp: string
}

// Types pour les métriques
export interface ApiMetrics {
  requests_per_minute: number
  average_response_time: number
  error_rate: number
  active_connections: number
  memory_usage: number
  cpu_usage: number
}