// src/data/constants/homeData.ts

import {
  ShoppingBag, Users, Gift, CreditCard, Truck, Headphones,
  Star, Heart, Play, Crown, Award, Shield, Check, Sparkles,
  MapPin, Zap, TrendingUp, Clock
} from 'lucide-react'
import bannerImage from '@/assets/banner-redi.jpg'
import type {
  HeroData, Category, Collection, Brand, Service, 
  Statistic, TrustIndicator, TimerData
} from '../types/homeTypes'

// Hero Section Data
export const heroData: HeroData = {
  title: {
    line1: "L'Afrique",
    line2: "se révèle"
  },
  subtitle: "Découvrez l'excellence du savoir-faire africain à travers des créations uniques qui célèbrent notre héritage culturel",
  preTitle: "Artisanat Premium Africain",
  ctaButtons: [
    {
      text: "Explorer nos créations",
      icon: ShoppingBag,
      variant: "primary",
      link: "/shop"
    },
    {
      text: "Voir notre histoire",
      icon: Play,
      variant: "secondary",
      link: "/about"
    }
  ],
  backgroundImage: bannerImage
}

// Categories Data
export const categoriesData: Category[] = [
  { 
    id: 1,
    name: 'Homme', 
    icon: '👔', 
    count: '150+ articles', 
    color: 'from-blue-600/20 to-indigo-500/30',
    hoverColor: 'hover:from-blue-600/30 hover:to-indigo-500/40',
    description: 'Style et élégance masculine',
    link: '/categories/homme'
  },
  { 
    id: 2,
    name: 'Femme', 
    icon: '👗', 
    count: '200+ articles', 
    color: 'from-fuchsia-600/20 to-pink-500/30',
    hoverColor: 'hover:from-fuchsia-600/30 hover:to-pink-500/40',
    description: 'Grâce et beauté féminine',
    link: '/categories/femme'
  },
  { 
    id: 3,
    name: 'Enfants', 
    icon: '👶', 
    count: '80+ articles', 
    color: 'from-emerald-600/20 to-teal-500/30',
    hoverColor: 'hover:from-emerald-600/30 hover:to-teal-500/40',
    description: 'Confort et joie pour les petits',
    link: '/categories/enfants'
  },
  { 
    id: 4,
    name: 'Bijoux', 
    icon: '💎', 
    count: '50+ pièces', 
    color: 'from-violet-600/20 to-purple-500/30',
    hoverColor: 'hover:from-violet-600/30 hover:to-purple-500/40',
    description: 'Éclat et prestige',
    link: '/categories/bijoux'
  },
  { 
    id: 5,
    name: 'Textile', 
    icon: '🧵', 
    count: '100+ motifs', 
    color: 'from-amber-600/20 to-orange-500/30',
    hoverColor: 'hover:from-amber-600/30 hover:to-orange-500/40',
    description: 'Tissus authentiques',
    link: '/categories/textile'
  },
  { 
    id: 6,
    name: 'Soins', 
    icon: '🌿', 
    count: '30+ produits', 
    color: 'from-green-600/20 to-lime-500/30',
    hoverColor: 'hover:from-green-600/30 hover:to-lime-500/40',
    description: 'Bien-être naturel',
    link: '/categories/soins'
  }
]

// Collections Data
export const collectionsData: Collection[] = [
  {
    id: 1,
    title: 'Heritage Ivoirienne',
    description: 'Une célébration de nos traditions ancestrales revisitées avec modernité',
    image: 'https://images.unsplash.com/photo-1554412933-514a83d2f3c8?w=1000&h=1200&fit=crop&q=90',
    creator: 'Atelier Royal Akan',
    itemCount: 12,
    color: 'from-amber-600 to-orange-500',
    link: '/collections/heritage-ivoirienne'
  },
  {
    id: 2,
    title: 'Modernité Africaine',
    description: 'Des designs contemporains inspirés des motifs traditionnels',
    image: 'https://images.unsplash.com/photo-1551232864-3f0890e580d9?w=1000&h=1200&fit=crop&q=90',
    creator: 'Studio Abidjan',
    itemCount: 8,
    color: 'from-purple-600 to-pink-500',
    link: '/collections/modernite-africaine'
  },
  {
    id: 3,
    title: 'Art Sacré',
    description: 'Pièces uniques inspirées par les rituels et croyances traditionnelles',
    image: 'https://images.unsplash.com/photo-1479064555552-3ef4979f8908?w=1000&h=1200&fit=crop&q=90',
    creator: 'Maître Koffi',
    itemCount: 5,
    color: 'from-emerald-600 to-teal-500',
    link: '/collections/art-sacre'
  }
]

// Brand Partners Data
export const brandsData: Brand[] = [
  { 
    id: 1,
    name: 'Atelier Korhogo', 
    logo: 'https://images.unsplash.com/photo-1596464716127-f2a82984de30?w=240&h=120&fit=crop&q=90', 
    specialty: 'Textiles Premium',
    productsCount: 45,
    since: 2018
  },
  { 
    id: 2,
    name: 'Studio Abidjan', 
    logo: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=240&h=120&fit=crop&q=90', 
    specialty: 'Design Moderne',
    productsCount: 32,
    since: 2019
  },
  { 
    id: 3,
    name: 'Maître Koffi', 
    logo: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=240&h=120&fit=crop&q=90', 
    specialty: 'Bijoux Artisanaux',
    productsCount: 28,
    since: 2017
  },
  { 
    id: 4,
    name: 'Collectif Artisans', 
    logo: 'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=240&h=120&fit=crop&q=90', 
    specialty: 'Art Traditionnel',
    productsCount: 56,
    since: 2016
  },
  { 
    id: 5,
    name: 'Afro-Futuriste', 
    logo: 'https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=240&h=120&fit=crop&q=90', 
    specialty: 'Mode Urbaine',
    productsCount: 38,
    since: 2020
  },
  { 
    id: 6,
    name: 'Royal Akan', 
    logo: 'https://images.unsplash.com/photo-1554412933-514a83d2f3c8?w=240&h=120&fit=crop&q=90', 
    specialty: 'Haute Couture',
    productsCount: 22,
    since: 2015
  }
]

// Trust Indicators Data
export const trustIndicatorsData: TrustIndicator[] = [
  { id: 1, icon: Shield, text: 'Paiement 100% sécurisé', highlight: 'Sécurisé' },
  { id: 2, icon: Truck, text: 'Livraison rapide 48-72h', highlight: '48-72h' },
  { id: 3, icon: Heart, text: 'Satisfait ou remboursé 30j', highlight: '30 jours' },
  { id: 4, icon: Users, text: 'Plus de 10,000 clients', highlight: '10,000+' }
]

// Services Data
export const servicesData: Service[] = [
  {
    id: 1,
    icon: Users,
    title: 'Programme de fidélité',
    description: 'Gagnez des points à chaque achat et profitez d\'avantages exclusifs',
    color: 'from-violet-600 to-purple-500',
    link: '/services/fidelite'
  },
  {
    id: 2,
    icon: Gift,
    title: 'Carte cadeau Be',
    description: 'Offrez le choix avec nos cartes cadeaux personnalisables',
    color: 'from-fuchsia-600 to-pink-500',
    link: '/services/carte-cadeau'
  },
  {
    id: 3,
    icon: CreditCard,
    title: 'Moyens de paiement',
    description: 'Paiement sécurisé par carte, mobile money ou virement',
    color: 'from-emerald-600 to-teal-500',
    link: '/services/paiement'
  },
  {
    id: 4,
    icon: Truck,
    title: 'Mode de livraison',
    description: 'Livraison rapide dans toute la Côte d\'Ivoire et l\'Afrique de l\'Ouest',
    color: 'from-blue-600 to-cyan-500',
    link: '/services/livraison'
  },
  {
    id: 5,
    icon: Headphones,
    title: 'Service client',
    description: 'Une équipe dédiée pour vous accompagner 7j/7',
    color: 'from-amber-600 to-orange-500',
    link: '/services/support'
  }
]

// Statistics Data
export const statisticsData: Statistic[] = [
  { id: 1, number: '500+', label: 'Créations uniques', icon: Sparkles },
  { id: 2, number: '50+', label: 'Artisans partenaires', icon: Users },
  { id: 3, number: '10K+', label: 'Clients satisfaits', icon: Heart },
  { id: 4, number: '4.9/5', label: 'Note moyenne', icon: Star }
]

// Partner Stats Data
export const partnerStatsData: Statistic[] = [
  { id: 1, number: '50+', label: 'Artisans vérifiés', icon: Shield },
  { id: 2, number: '100%', label: 'Produits authentiques', icon: Check },
  { id: 3, number: '5 ans', label: "D'expertise", icon: Award },
  { id: 4, number: '24/7', label: 'Support artisan', icon: Headphones }
]

// Timer Data for Special Offers
export const timerData: TimerData = {
  endDate: '2024-12-31T23:59:59',
  message: 'Offre limitée!'
}