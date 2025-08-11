// src/data/types/homeTypes.ts

import type{ LucideIcon } from 'lucide-react'

export interface HeroData {
  title: {
    line1: string
    line2: string
  }
  subtitle: string
  preTitle: string
  ctaButtons: CTAButton[]
  backgroundImage: string
}

export interface CTAButton {
  text: string
  icon: LucideIcon
  variant: 'primary' | 'secondary'
  link: string
}

export interface Category {
  id: number
  name: string
  icon: string
  count: string
  color: string
  hoverColor: string
  description: string
  link: string
}

export interface Product {
  id: number
  title: string
  price: number
  originalPrice?: number
  discount?: number
  image: string
  badge?: string
  badgeColor?: string
  rating: number
  reviews: number
  sold?: number
  isNew: boolean
  isBestseller: boolean
  category: string
  creator?: string
}

export interface Collection {
  id: number
  title: string
  description: string
  image: string
  creator: string
  itemCount: number
  color: string
  link: string
}

export interface Brand {
  id: number
  name: string
  logo: string
  specialty: string
  productsCount: number
  since: number
}

export interface Testimonial {
  id: number
  name: string
  location: string
  avatar: string
  rating: number
  text: string
  product: string
  verified: boolean
  date: string
}

export interface Service {
  id: number
  icon: LucideIcon
  title: string
  description: string
  color: string
  link: string
}

export interface Statistic {
  id: number
  number: string
  label: string
  icon: LucideIcon
}

export interface TrustIndicator {
  id: number
  icon: LucideIcon
  text: string
  highlight: string
}

export interface TimerData {
  endDate: string
  message: string
}