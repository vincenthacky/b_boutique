// pages/Home/HomePage.tsx
import { memo, useState, useRef, useEffect, useCallback } from 'react'
import { motion, useInView, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import bannerImage from '@/assets/banner-redi.jpg'
import {
  ShoppingBag,
  Users,
  Gift,
  CreditCard,
  Truck,
  Headphones,
  Star,
  Heart,
  ArrowRight,
  Sparkles,
  Crown,
  Award,
  ChevronLeft,
  ChevronRight,
  Eye,
  Shield,
  Zap,
  TrendingUp,
  Clock,
  MapPin,
  Check,
  Play,
  Pause,
  Volume2,
  VolumeX
} from 'lucide-react'

// ============================================
// DATA CONSTANTS - Easy to modify for API integration
// ============================================

// Hero Section Data
const heroData = {
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
const categoriesData = [
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

// Featured Products Data
const featuredProductsData = [
  {
    id: 1,
    title: 'Collier Traditionnel Akan',
    price: 35000,
    originalPrice: 50000,
    discount: 30,
    image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&q=90',
    badge: 'TENDANCE',
    badgeColor: 'from-amber-500 to-amber-400',
    rating: 4.9,
    reviews: 127,
    sold: 234,
    isNew: false,
    isBestseller: true,
    category: 'Bijoux'
  },
  {
    id: 2,
    title: 'Sac Kente Premium',
    price: 22500,
    originalPrice: 30000,
    discount: 25,
    image: 'https://images.unsplash.com/photo-1590736969955-71cc94901144?w=800&q=90',
    badge: 'NOUVEAU',
    badgeColor: 'from-green-500 to-green-400',
    rating: 4.8,
    reviews: 89,
    sold: 156,
    isNew: true,
    isBestseller: false,
    category: 'Accessoires'
  },
  {
    id: 3,
    title: 'Masque Baoulé Authentique',
    price: 60000,
    originalPrice: 100000,
    discount: 40,
    image: 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=800&q=90',
    badge: 'EXCLUSIF',
    badgeColor: 'from-purple-500 to-purple-400',
    rating: 5.0,
    reviews: 43,
    sold: 67,
    isNew: false,
    isBestseller: true,
    category: 'Art'
  },
  {
    id: 4,
    title: 'Vase en Terre Cuite Ashanti',
    price: 16000,
    originalPrice: 20000,
    discount: 20,
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&q=90',
    badge: 'LIMITÉ',
    badgeColor: 'from-blue-500 to-blue-400',
    rating: 4.7,
    reviews: 65,
    sold: 98,
    isNew: false,
    isBestseller: false,
    category: 'Décoration'
  },
  {
    id: 5,
    title: 'Bracelet Wax Design',
    price: 13000,
    originalPrice: 20000,
    discount: 35,
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&q=90',
    badge: 'ARTISAN',
    badgeColor: 'from-pink-500 to-pink-400',
    rating: 4.9,
    reviews: 112,
    sold: 201,
    isNew: false,
    isBestseller: true,
    category: 'Bijoux'
  }
]

// New Products Data
const newProductsData = [
  {
    id: 1,
    title: 'Robe Ankara Moderne',
    price: 42000,
    image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=600&h=800&fit=crop&q=90',
    creator: 'Atelier Korhogo',
    rating: 4.9,
    reviews: 24,
    isNew: true,
    category: 'Femme'
  },
  {
    id: 2,
    title: 'Chemise Batik Premium',
    price: 28000,
    image: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=600&h=800&fit=crop&q=90',
    creator: 'Studio Abidjan',
    rating: 4.8,
    reviews: 18,
    isNew: true,
    category: 'Homme'
  },
  {
    id: 3,
    title: 'Collier Baoulé Artisanal',
    price: 15000,
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&h=800&fit=crop&q=90',
    creator: 'Maître Koffi',
    rating: 5.0,
    reviews: 12,
    isNew: true,
    category: 'Bijoux'
  },
  {
    id: 4,
    title: 'Boubou Traditionnel',
    price: 65000,
    image: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=600&h=800&fit=crop&q=90',
    creator: 'Atelier Yamoussoukro',
    rating: 4.9,
    reviews: 31,
    isNew: true,
    category: 'Homme'
  },
  {
    id: 5,
    title: 'Sac à Main Tissu Wax',
    price: 22000,
    image: 'https://images.unsplash.com/photo-1542831371-d531d36971e6?w=600&h=800&fit=crop&q=90',
    creator: 'Maison Abidjan',
    rating: 4.7,
    reviews: 20,
    isNew: true,
    category: 'Accessoires'
  },
  {
    id: 6,
    title: 'Pagne Teint Main',
    price: 18000,
    image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=600&h=800&fit=crop&q=90',
    creator: 'Atelier Korhogo',
    rating: 4.8,
    reviews: 15,
    isNew: true,
    category: 'Textile'
  },
  {
    id: 7,
    title: 'Bracelet Perles Multicolores',
    price: 10000,
    image: 'https://images.unsplash.com/photo-1519985176271-adb1088fa94c?w=600&h=800&fit=crop&q=90',
    creator: 'Artisan Kone',
    rating: 4.9,
    reviews: 28,
    isNew: true,
    category: 'Bijoux'
  },
  {
    id: 8,
    title: 'Chapeau Traditionnel',
    price: 12000,
    image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=600&h=800&fit=crop&q=90',
    creator: 'Studio Abidjan',
    rating: 4.6,
    reviews: 11,
    isNew: true,
    category: 'Accessoires'
  }
]

// Collections Data
const collectionsData = [
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
const brandsData = [
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
const trustIndicatorsData = [
  { id: 1, icon: Shield, text: 'Paiement 100% sécurisé', highlight: 'Sécurisé' },
  { id: 2, icon: Truck, text: 'Livraison rapide 48-72h', highlight: '48-72h' },
  { id: 3, icon: Heart, text: 'Satisfait ou remboursé 30j', highlight: '30 jours' },
  { id: 4, icon: Users, text: 'Plus de 10,000 clients', highlight: '10,000+' }
]

// Testimonials Data
const testimonialsData = [
  {
    id: 1,
    name: 'Aminata Koné',
    location: 'Abidjan',
    avatar: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=150&h=150&fit=crop',
    rating: 5,
    text: "La qualité est exceptionnelle ! J'ai trouvé des pièces uniques que je ne trouve nulle part ailleurs. Le service client est très réactif.",
    product: 'Collier Akan',
    verified: true,
    date: '2024-01-15'
  },
  {
    id: 2,
    name: 'Kouassi Yao',
    location: 'Yamoussoukro',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
    rating: 5,
    text: "Be Boutique valorise vraiment notre patrimoine culturel. Chaque achat raconte une histoire. Je recommande vivement !",
    product: 'Masque Baoulé',
    verified: true,
    date: '2024-01-20'
  },
  {
    id: 3,
    name: 'Mariam Diallo',
    location: 'Bouaké',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
    rating: 5,
    text: "Livraison rapide et emballage soigné. Les produits sont encore plus beaux en vrai ! Une vraie fierté de porter ces créations.",
    product: 'Sac Kente',
    verified: true,
    date: '2024-01-22'
  }
]

// Services Data
const servicesData = [
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
const statisticsData = [
  { id: 1, number: '500+', label: 'Créations uniques', icon: Sparkles },
  { id: 2, number: '50+', label: 'Artisans partenaires', icon: Users },
  { id: 3, number: '10K+', label: 'Clients satisfaits', icon: Heart },
  { id: 4, number: '4.9/5', label: 'Note moyenne', icon: Star }
]

// Partner Stats Data
const partnerStatsData = [
  { id: 1, number: '50+', label: 'Artisans vérifiés', icon: Shield },
  { id: 2, number: '100%', label: 'Produits authentiques', icon: Check },
  { id: 3, number: '5 ans', label: "D'expertise", icon: Award },
  { id: 4, number: '24/7', label: 'Support artisan', icon: Headphones }
]

// Timer Data for Special Offers
const timerData = {
  endDate: '2024-12-31T23:59:59',
  message: 'Offre limitée!'
}

// ============================================
// REUSABLE COMPONENTS
// ============================================

// Format price with separator
const formatPrice = (price: number) => {
  return price.toLocaleString('fr-FR')
}

// Calculate discount percentage
const calculateDiscount = (original: number, current: number) => {
  return Math.round(((original - current) / original) * 100)
}

// Product Card Component
const ProductCard = ({ product, index }: { product: any; index: number }) => {
  const [isLiked, setIsLiked] = useState(false)
  const [isQuickView, setIsQuickView] = useState(false)

  return (
    <motion.div
      className="group relative"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
    >
      <div className="relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100">
        {/* Badges */}
        <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
          <motion.span 
            className={`px-3 py-1 bg-gradient-to-r ${product.badgeColor} text-white text-xs font-bold rounded-full shadow-lg`}
            initial={{ x: -100 }}
            animate={{ x: 0 }}
            transition={{ type: "spring", delay: 0.2 + index * 0.1 }}
          >
            {product.badge}
          </motion.span>
          {product.isBestseller && (
            <span className="px-3 py-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold rounded-full shadow-lg">
              BESTSELLER
            </span>
          )}
        </div>
        
        {/* Discount Badge */}
        {product.discount && (
          <motion.div 
            className="absolute top-4 right-4 z-10"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", delay: 0.3 + index * 0.1 }}
          >
            <div className="w-14 h-14 bg-gradient-to-br from-red-500 to-red-400 rounded-full flex items-center justify-center text-white font-bold shadow-xl">
              <span className="text-sm">-{product.discount}%</span>
            </div>
          </motion.div>
        )}

        {/* Image Container */}
        <div className="relative aspect-[4/5] overflow-hidden bg-gradient-to-br from-gray-100 to-gray-50">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
          
          {/* Overlay Actions */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300"
            initial={false}
          >
            <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
              <motion.button
                className="p-3 bg-white/95 backdrop-blur-sm rounded-2xl text-gray-700 hover:text-amber-600 transition-colors shadow-lg"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsQuickView(true)}
              >
                <Eye size={20} />
              </motion.button>
              
              <motion.button
                className={`p-3 bg-white/95 backdrop-blur-sm rounded-2xl transition-all duration-300 shadow-lg ${
                  isLiked ? 'text-red-500' : 'text-gray-700 hover:text-red-500'
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsLiked(!isLiked)}
              >
                <Heart size={20} fill={isLiked ? 'currentColor' : 'none'} />
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {/* Title and Rating */}
          <div>
            <h3 className="font-bold text-gray-900 mb-2 group-hover:text-amber-600 transition-colors text-lg">
              {product.title}
            </h3>
            
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    className={i < Math.floor(product.rating) ? 'text-amber-400 fill-current' : 'text-gray-300'}
                  />
                ))}
                <span className="text-sm text-gray-600 ml-1">({product.reviews})</span>
              </div>
              {product.sold && (
                <span className="text-xs text-gray-500 flex items-center gap-1">
                  <TrendingUp size={12} />
                  {product.sold} vendus
                </span>
              )}
            </div>
          </div>
          
          {/* Price */}
          <div className="flex items-baseline gap-3">
            <span className="text-2xl font-bold text-gray-900">
              {formatPrice(product.price)} CFA
            </span>
            {product.originalPrice && (
              <span className="text-lg text-gray-400 line-through">
                {formatPrice(product.originalPrice)} CFA
              </span>
            )}
          </div>

          {/* Creator if exists */}
          {product.creator && (
            <p className="text-sm text-gray-500">{product.creator}</p>
          )}

          {/* Add to Cart Button */}
          <motion.button
            className="w-full py-3.5 bg-gradient-to-r from-amber-500 to-amber-400 text-white rounded-2xl font-semibold hover:from-amber-600 hover:to-amber-500 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <ShoppingBag size={18} />
            <span>Ajouter au panier</span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}

// Section Title Component
const SectionTitle = ({ preTitle, title, subtitle, icon, color = 'amber' }: any) => {
  return (
    <motion.div
      className="text-center mb-16"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      {preTitle && (
        <motion.span
          className={`inline-block px-5 py-2 bg-gradient-to-r from-${color}-100 to-${color}-100 text-${color}-700 rounded-full text-sm font-bold uppercase tracking-wider mb-6`}
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring" }}
        >
          {preTitle}
        </motion.span>
      )}
      
      <div className="flex items-center justify-center gap-4 mb-6">
        {icon && <icon.component className={`text-${color}-500 w-8 h-8`} />}
        <h2 className={`text-5xl font-bold bg-gradient-to-r from-${icon ? color : 'gray'}-${icon ? '600' : '900'} to-${icon ? color : 'gray'}-${icon ? '500' : '700'} bg-clip-text text-transparent`}>
          {title}
        </h2>
        {icon && <icon.component className={`text-${color}-500 w-8 h-8`} />}
      </div>
      
      {subtitle && (
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          {subtitle}
        </p>
      )}
    </motion.div>
  )
}

// Newsletter Component
const NewsletterSection = () => {
  const [email, setEmail] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setIsSubscribed(true)
      setTimeout(() => setIsSubscribed(false), 3000)
      setEmail('')
    }
  }

  return (
    <motion.div 
      className="relative bg-gradient-to-br from-amber-100 via-amber-50 to-white rounded-3xl p-8 md:p-12 overflow-hidden"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      {/* Background decoration */}
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-amber-200/30 rounded-full blur-3xl" />
      <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-orange-200/30 rounded-full blur-3xl" />
      
      <div className="relative max-w-2xl mx-auto text-center">
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", duration: 0.6 }}
          className="inline-flex p-3 bg-amber-500/10 rounded-2xl mb-6"
        >
          <Gift className="w-8 h-8 text-amber-600" />
        </motion.div>
        
        <h3 className="text-3xl font-bold text-gray-900 mb-4">
          Recevez 10% de réduction
        </h3>
        <p className="text-gray-600 mb-8">
          Inscrivez-vous et soyez les premiers informés de nos nouveautés et offres exclusives
        </p>
        
        <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Votre adresse email"
            className="flex-1 px-6 py-4 rounded-2xl border border-gray-200 focus:outline-none focus:border-amber-500 transition-colors"
            required
          />
          <motion.button
            type="submit"
            className="px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-400 text-white rounded-2xl font-semibold hover:from-amber-600 hover:to-amber-500 transition-all duration-200"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {isSubscribed ? (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center gap-2"
              >
                <Check className="w-5 h-5" />
                Inscrit !
              </motion.span>
            ) : (
              "S'inscrire"
            )}
          </motion.button>
        </form>
        
        <p className="text-xs text-gray-500 mt-4">
          En vous inscrivant, vous acceptez notre politique de confidentialité
        </p>
      </div>
    </motion.div>
  )
}

// Timer Component
const CountdownTimer = ({ endDate }: { endDate: string }) => {
  const [timeLeft, setTimeLeft] = useState({ hours: 23, minutes: 47, seconds: 12 })

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime()
      const end = new Date(endDate).getTime()
      const distance = end - now

      if (distance > 0) {
        setTimeLeft({
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        })
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [endDate])

  return (
    <motion.div
      className="inline-flex items-center gap-6 px-6 py-3 bg-red-500/10 rounded-full"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay: 0.3 }}
    >
      <Clock className="text-red-500 w-5 h-5" />
      <div className="flex gap-4 items-center">
        <div className="text-center">
          <div className="text-2xl font-bold text-red-600">{timeLeft.hours}</div>
          <div className="text-xs text-gray-600">Heures</div>
        </div>
        <span className="text-red-500 text-2xl">:</span>
        <div className="text-center">
          <div className="text-2xl font-bold text-red-600">{timeLeft.minutes}</div>
          <div className="text-xs text-gray-600">Minutes</div>
        </div>
        <span className="text-red-500 text-2xl">:</span>
        <div className="text-center">
          <div className="text-2xl font-bold text-red-600">{timeLeft.seconds}</div>
          <div className="text-xs text-gray-600">Secondes</div>
        </div>
      </div>
      <span className="text-sm font-semibold text-red-600">{timerData.message}</span>
    </motion.div>
  )
}

// Scrollable Products Section Component
const ScrollableProductsSection = ({ 
  products, 
  containerClass = 'products-container' 
}: { 
  products: any[], 
  containerClass?: string 
}) => {
  const scrollContainer = (direction: 'left' | 'right') => {
    const container = document.querySelector(`.${containerClass}`)
    if (container) {
      const scrollAmount = 320
      container.scrollBy({ 
        left: direction === 'left' ? -scrollAmount : scrollAmount, 
        behavior: 'smooth' 
      })
    }
  }

  return (
    <div className="relative">
      {/* Navigation Buttons */}
      <button
        onClick={() => scrollContainer('left')}
        className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 p-3 bg-white/95 backdrop-blur-sm rounded-full shadow-xl hover:bg-white transition-all duration-200 hover:scale-110"
      >
        <ChevronLeft size={24} className="text-gray-700" />
      </button>
      <button
        onClick={() => scrollContainer('right')}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 p-3 bg-white/95 backdrop-blur-sm rounded-full shadow-xl hover:bg-white transition-all duration-200 hover:scale-110"
      >
        <ChevronRight size={24} className="text-gray-700" />
      </button>

      {/* Scrollable Container */}
      <div className={`${containerClass} flex gap-6 overflow-x-auto scrollbar-hide px-12 pb-4`} 
           style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitScrollbar: { display: 'none' } }}>
        {products.map((product, index) => (
          <div key={product.id} className="flex-shrink-0 w-80">
            <ProductCard product={product} index={index} />
          </div>
        ))}
      </div>
    </div>
  )
}

// ============================================
// MAIN HOMEPAGE COMPONENT
// ============================================

const HomePage = memo(() => {
  const [activeTestimonial, setActiveTestimonial] = useState(0)
  const { scrollY } = useScroll()
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0.3])
  const heroScale = useTransform(scrollY, [0, 300], [1, 1.1])

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonialsData.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Parallax Background */}
        <motion.div 
          className="absolute inset-0 w-full h-full"
          style={{ scale: heroScale, opacity: heroOpacity }}
        >
          <img
            src={heroData.backgroundImage}
            alt="Be Boutique - L'Afrique se révèle"
            className="w-full h-full object-cover"
          />
          
          {/* Multiple gradient overlays for depth */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-amber-900/30 via-transparent to-amber-900/30"></div>
        </motion.div>

        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-br from-amber-400/20 to-orange-300/20 rounded-full blur-3xl"
            animate={{
              x: [0, 100, 0],
              y: [0, -50, 0],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-fuchsia-400/20 to-pink-300/20 rounded-full blur-3xl"
            animate={{
              x: [0, -100, 0],
              y: [0, 50, 0],
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center w-full max-w-5xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            {/* Pre-title */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-center justify-center gap-4 mb-6"
            >
              <div className="h-px w-20 bg-gradient-to-r from-transparent to-amber-400"></div>
              <span className="text-amber-400 font-medium tracking-widest text-sm uppercase">
                {heroData.preTitle}
              </span>
              <div className="h-px w-20 bg-gradient-to-l from-transparent to-amber-400"></div>
            </motion.div>

            {/* Main Title */}
            <motion.h1
              className="text-5xl sm:text-6xl md:text-8xl font-bold mb-8 text-white leading-tight"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              {heroData.title.line1}
              <br />
              <span className="inline-flex items-center gap-4 bg-gradient-to-r from-amber-300 via-amber-400 to-orange-400 bg-clip-text text-transparent">
                {heroData.title.line2}
                <motion.div
                  animate={{ 
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Crown className="text-amber-400 w-12 h-12 md:w-16 md:h-16" />
                </motion.div>
              </span>
            </motion.h1>
            
            {/* Subtitle */}
            <motion.p
              className="text-xl md:text-2xl lg:text-3xl text-amber-50/90 mb-12 leading-relaxed max-w-4xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              {heroData.subtitle}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.6 }}
            >
              {heroData.ctaButtons.map((button, index) => {
                const Icon = button.icon
                return (
                  <motion.button
                    key={index}
                    className={`group px-8 py-4 ${
                      button.variant === 'primary' 
                        ? 'bg-gradient-to-r from-amber-500 to-amber-400 text-white shadow-2xl hover:shadow-amber-500/25' 
                        : 'bg-white/10 backdrop-blur-md text-white border-2 border-white/30 hover:bg-white/20'
                    } rounded-full font-bold transition-all duration-300 flex items-center gap-3 text-lg`}
                    whileHover={{ scale: 1.05, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{button.text}</span>
                    {button.variant === 'primary' && (
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    )}
                  </motion.button>
                )
              })}
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.6 }}
            >
              {trustIndicatorsData.map((indicator, index) => {
                const Icon = indicator.icon
                return (
                  <motion.div
                    key={indicator.id}
                    className="flex flex-col items-center gap-2 text-white/80"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.3 + index * 0.1 }}
                  >
                    <Icon className="w-6 h-6 text-amber-400" />
                    <span className="text-xs text-center">
                      <span className="font-bold text-amber-400">{indicator.highlight}</span>
                      <br />
                      {indicator.text.replace(indicator.highlight, '')}
                    </span>
                  </motion.div>
                )
              })}
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="w-7 h-12 border-2 border-amber-400/50 rounded-full flex justify-center backdrop-blur-sm">
            <motion.div
              className="w-1.5 h-3 bg-amber-400 rounded-full mt-2"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      </section>

      {/* Categories Section */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <SectionTitle
            preTitle="DÉCOUVREZ NOS UNIVERS"
            title="Catégories Phares"
            subtitle="Explorez nos collections soigneusement sélectionnées, chaque catégorie raconte une histoire unique"
          />

          <motion.div
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ staggerChildren: 0.1 }}
          >
            {categoriesData.map((category, index) => (
              <motion.div
                key={category.id}
                className={`group relative p-8 rounded-3xl bg-gradient-to-br ${category.color} ${category.hoverColor} backdrop-blur-sm border border-white/50 hover:shadow-2xl transition-all duration-500 cursor-pointer overflow-hidden`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.05, y: -8 }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Background Effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-white/0 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                />
                
                <div className="relative text-center">
                  <motion.div 
                    className="text-5xl mb-4"
                    whileHover={{ 
                      scale: 1.2, 
                      rotate: [0, -10, 10, 0],
                      transition: { duration: 0.5 }
                    }}
                  >
                    {category.icon}
                  </motion.div>
                  
                  <h3 className="font-bold text-gray-900 mb-1 text-lg">
                    {category.name}
                  </h3>
                  <p className="text-sm text-gray-700 font-medium mb-2">
                    {category.count}
                  </p>
                  <p className="text-xs text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {category.description}
                  </p>
                </div>
                
                {/* Hover Arrow */}
                <motion.div
                  className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={{ x: -10 }}
                  whileHover={{ x: 0 }}
                >
                  <ArrowRight className="w-4 h-4 text-gray-700" />
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-24 bg-gradient-to-b from-white via-amber-50/30 to-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Offres Exceptionnelles"
            subtitle="Profitez de réductions allant jusqu'à -40% sur une sélection exclusive"
            icon={{ component: Sparkles }}
          />
          
          {/* Timer */}
          <div className="text-center mb-12">
            <CountdownTimer endDate={timerData.endDate} />
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
            {featuredProductsData.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>

          {/* View All Button */}
          <motion.div
            className="text-center mt-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            <motion.button
              className="group px-10 py-5 bg-gradient-to-r from-amber-500 to-amber-400 text-white rounded-full font-bold text-lg shadow-2xl hover:shadow-amber-500/25 transition-all duration-300 flex items-center gap-3 mx-auto"
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Voir toutes les offres</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* New Products Section */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <SectionTitle
            preTitle="FRAÎCHEMENT ARRIVÉ"
            title="Nouvelles Créations"
            subtitle="Les dernières œuvres de nos artisans talentueux, des pièces uniques qui fusionnent tradition et modernité"
            icon={{ component: Award }}
          />

          <ScrollableProductsSection 
            products={newProductsData} 
            containerClass="new-creations-container"
          />

          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            <motion.button
              className="group px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-400 text-white rounded-full font-bold shadow-2xl hover:shadow-amber-500/25 transition-all duration-300 flex items-center gap-3 mx-auto"
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Voir toutes les créations</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Collections Section */}
      <section className="py-24 bg-gradient-to-br from-amber-50 via-white to-amber-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <SectionTitle
            preTitle="COLLECTIONS EXCLUSIVES"
            title="Nos Collections Signature"
            subtitle="Des collections thématiques qui racontent l'histoire de l'Afrique moderne avec élégance et authenticité"
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {collectionsData.map((collection, index) => (
              <motion.div
                key={collection.id}
                className="group cursor-pointer relative"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                whileHover={{ y: -10 }}
              >
                <div className="relative bg-white rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 border border-gray-100">
                  {/* Image Container */}
                  <div className="aspect-[4/5] overflow-hidden relative">
                    <img
                      src={collection.image}
                      alt={collection.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                    />
                    
                    {/* Gradient Overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-t ${collection.color} opacity-60 group-hover:opacity-70 transition-opacity duration-500`} />
                    
                    {/* Content Overlay */}
                    <div className="absolute inset-0 flex flex-col justify-end p-8 text-white">
                      <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3 + index * 0.1 }}
                      >
                        <div className="mb-3">
                          <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold">
                            {collection.itemCount} pièces exclusives
                          </span>
                        </div>
                        
                        <h3 className="text-3xl font-bold mb-3 drop-shadow-lg">
                          {collection.title}
                        </h3>
                        
                        <p className="text-sm text-white/90 mb-4 line-clamp-2 drop-shadow">
                          {collection.description}
                        </p>
                        
                        <div className="flex items-center justify-between">
                          <p className="text-xs text-white/80">
                            Par <span className="font-semibold">{collection.creator}</span>
                          </p>
                          <motion.div
                            className="p-2 bg-white/20 backdrop-blur-sm rounded-full"
                            whileHover={{ scale: 1.1, backgroundColor: 'rgba(255,255,255,0.3)' }}
                          >
                            <ArrowRight className="w-5 h-5" />
                          </motion.div>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
          >
            <motion.button
              className="group px-10 py-4 bg-gradient-to-r from-purple-600 to-violet-600 text-white rounded-full font-bold text-lg shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 flex items-center gap-3 mx-auto"
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
            >
              <Crown className="w-5 h-5" />
              <span>Explorer toutes nos collections</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Brand Partners Section */}
      <section className="py-24 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <SectionTitle
            preTitle="PARTENAIRES DE CONFIANCE"
            title="Nos Marques Partenaires"
            subtitle="Une sélection rigoureuse d'ateliers et créateurs reconnus pour leur excellence et leur savoir-faire unique"
          />

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-12">
            {brandsData.map((brand, index) => (
              <motion.div
                key={brand.id}
                className="group relative"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 overflow-hidden">
                  <div className="relative">
                    <img
                      src={brand.logo}
                      alt={brand.name}
                      className="w-full h-20 object-contain mb-4 filter grayscale group-hover:grayscale-0 transition-all duration-500"
                    />
                    
                    <h3 className="font-bold text-gray-900 text-center mb-1 group-hover:text-amber-600 transition-colors">
                      {brand.name}
                    </h3>
                    
                    <p className="text-xs text-gray-500 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {brand.specialty}
                    </p>
                    
                    {/* Hover Effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-amber-400/0 to-orange-400/0 group-hover:from-amber-400/10 group-hover:to-orange-400/10 rounded-2xl transition-all duration-500"
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Partner Stats */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
          >
            {partnerStatsData.map((stat, index) => {
              const Icon = stat.icon
              return (
                <motion.div
                  key={stat.id}
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                >
                  <Icon className="w-8 h-8 text-amber-500 mx-auto mb-3" />
                  <div className="text-2xl font-bold text-gray-900">{stat.number}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(0,0,0,.05) 35px, rgba(0,0,0,.05) 70px)`,
          }} />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <SectionTitle
            preTitle="TÉMOIGNAGES CLIENTS"
            title="Ils nous font confiance"
            subtitle="Découvrez les avis de nos clients satisfaits à travers toute l'Afrique"
          />

          <div className="relative max-w-4xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTestimonial}
                className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100"
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                <div className="flex flex-col md:flex-row items-center gap-8">
                  {/* Avatar */}
                  <div className="relative">
                    <img
                      src={testimonialsData[activeTestimonial].avatar}
                      alt={testimonialsData[activeTestimonial].name}
                      className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-4 border-amber-400"
                    />
                    {testimonialsData[activeTestimonial].verified && (
                      <div className="absolute -bottom-2 -right-2 bg-green-500 text-white p-2 rounded-full">
                        <Check className="w-4 h-4" />
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 text-center md:text-left">
                    <div className="flex items-center justify-center md:justify-start gap-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={20}
                          className="text-amber-400 fill-current"
                        />
                      ))}
                    </div>
                    
                    <p className="text-lg text-gray-700 mb-6 italic leading-relaxed">
                      "{testimonialsData[activeTestimonial].text}"
                    </p>
                    
                    <div className="space-y-1">
                      <h4 className="font-bold text-gray-900 text-lg">
                        {testimonialsData[activeTestimonial].name}
                      </h4>
                      <p className="text-gray-500 flex items-center justify-center md:justify-start gap-2">
                        <MapPin className="w-4 h-4" />
                        {testimonialsData[activeTestimonial].location}
                      </p>
                      <p className="text-sm text-amber-600 font-medium">
                        A acheté: {testimonialsData[activeTestimonial].product}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Dots */}
            <div className="flex justify-center gap-2 mt-8">
              {testimonialsData.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTestimonial(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === activeTestimonial 
                      ? 'w-8 bg-amber-500' 
                      : 'w-2 bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-amber-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Nos Services"
            subtitle="Une expérience shopping complète pensée pour votre satisfaction"
          />

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ staggerChildren: 0.1 }}
          >
            {servicesData.map((service, index) => {
              const Icon = service.icon
              return (
                <motion.div
                  key={service.id}
                  className="group p-6 bg-white rounded-3xl border border-gray-100 hover:shadow-xl transition-all duration-300 cursor-pointer text-center"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.03, y: -5 }}
                >
                  <motion.div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.color} p-4 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}
                    whileHover={{ rotate: 5 }}
                  >
                    <Icon className="w-full h-full text-white" />
                  </motion.div>
                  
                  <h3 className="font-semibold text-gray-900 mb-3 group-hover:text-amber-600 transition-colors">
                    {service.title}
                  </h3>
                  
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {service.description}
                  </p>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <NewsletterSection />
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-32 bg-gradient-to-br from-amber-600 via-amber-500 to-orange-500 relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <motion.div
            className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"
            animate={{
              x: [0, 100, 0],
              y: [0, -100, 0],
            }}
            transition={{ duration: 20, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-0 right-0 w-96 h-96 bg-black/10 rounded-full blur-3xl"
            animate={{
              x: [0, -100, 0],
              y: [0, 100, 0],
            }}
            transition={{ duration: 25, repeat: Infinity }}
          />
        </div>

        <div className="max-w-5xl mx-auto px-4 text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {/* Badge */}
            <motion.div
              className="inline-flex items-center gap-3 px-6 py-3 bg-white/20 backdrop-blur-md rounded-full mb-8"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", delay: 0.2 }}
            >
              <Crown className="text-white w-6 h-6" />
              <span className="text-white font-bold text-lg">Plus de 10,000 clients satisfaits</span>
              <Crown className="text-white w-6 h-6" />
            </motion.div>

            <h2 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight">
              Exprimez votre
              <br />
              <span className="text-amber-100">
                fierté africaine
              </span>
            </h2>

            <p className="text-2xl text-amber-50 mb-12 max-w-3xl mx-auto leading-relaxed">
              Chaque achat soutient nos artisans locaux et préserve 
              nos traditions tout en créant l'Afrique de demain
            </p>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-20"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <motion.button
                className="group px-10 py-5 bg-white text-amber-600 rounded-full font-bold text-lg shadow-2xl hover:shadow-white/25 transition-all duration-300 flex items-center gap-3"
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
              >
                <Zap className="w-6 h-6" />
                <span>Commencer mon shopping</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </motion.button>
              
              <motion.button
                className="px-10 py-5 bg-transparent text-white rounded-full font-bold text-lg border-3 border-white/50 hover:bg-white/10 backdrop-blur-sm transition-all duration-300 flex items-center gap-3"
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
              >
                <Heart className="w-6 h-6" />
                <span>Devenir artisan partenaire</span>
              </motion.button>
            </motion.div>

            {/* Stats Grid */}
            <motion.div
              className="grid grid-cols-1 md:grid-cols-4 gap-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, staggerChildren: 0.1 }}
            >
              {statisticsData.map((stat, index) => {
                const Icon = stat.icon
                return (
                  <motion.div
                    key={stat.id}
                    className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.7 + index * 0.1 }}
                    whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.15)' }}
                  >
                    <Icon className="w-8 h-8 text-amber-200 mx-auto mb-3" />
                    <motion.div
                      className="text-4xl font-bold text-white mb-2"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.9 + index * 0.1, type: "spring" }}
                    >
                      {stat.number}
                    </motion.div>
                    <p className="text-amber-100 font-medium">{stat.label}</p>
                  </motion.div>
                )
              })}
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  )
})

HomePage.displayName = 'HomePage'

export default HomePage