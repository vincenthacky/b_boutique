// pages/Home/HomePage.tsx
import { memo, useState, useEffect,lazy,Suspense } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import bannerImage from '@/assets/banner-redi.jpg'
import { useTheme } from '../../components/theme/ThemeProvider'
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
  
} from 'lucide-react'

// Importations dynamiques avec lazy
// Importations dynamiques avec lazy
const HeroSection = lazy(() => import('./sections/HeroSection'))
const CategoriesSection = lazy(() => import('./sections/CategoriesSection'))
const FeaturedProductsSection = lazy(() => import('./sections/FeaturedProductsSection'))
const NewProductsSection = lazy(() => import('./sections/NewProductsSection'))
const CollectionsSection = lazy(() => import('./sections/CollectionsSection'))
const BrandPartnersSection = lazy(() => import('./sections/BrandPartenersSection'))
const TestimonialsSection = lazy(() => import('./sections/TestimonialsSection'))
const ServicesSection = lazy(() => import('./sections/ServicesSection'))
const FinalCTASection = lazy(() => import('./sections/FinalCTASection'))
const NewsletterSection = lazy(() => import('./sections/NewsletterSection'))


// Composant de fallback personnalisé
const SectionFallback = () => (
  <div className="min-h-[50vh] flex items-center justify-center">
    <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
  </div>
)


// ============================================
// DATA CONSTANTS - Easy to modify for API integration
// ============================================

// Hero Section Data
const heroData = {
  title: {
    line1: "L'Afrique",
    line2: "se révèle"
  },
  subtitle: "Nous croyons en une Afrique créative, fière et prospère. Consommez autrement. Consommez local. Consommez Be !",
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
      <div className="relative bg-white rounded-3xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-500 border border-gray-100">
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
            <span className="px-3 py-1 bg-red-pink text-white text-xs font-bold rounded-full shadow-lg">
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
            className="absolute inset-0 bg-overlay opacity-0 group-hover:opacity-100 transition-all duration-300"
            initial={false}
          >
            <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
              <motion.button
                className="p-3 backdrop-blur-sm rounded-2xl text-gray-700 hover:text-amber-600 transition-colors shadow-lg"
                style={{ backgroundColor: 'var(--backdrop-blur-white)' }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsQuickView(true)}
              >
                <Eye size={20} />
              </motion.button>
              
              <motion.button
                className={`p-3 backdrop-blur-sm rounded-2xl transition-all duration-300 shadow-lg ${
                  isLiked ? 'text-red-500' : 'text-gray-700 hover:text-red-500'
                }`}
                style={{ backgroundColor: 'var(--backdrop-blur-white)' }}
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
            className="w-full py-3.5 bg-be-primary text-white rounded-2xl font-semibold hover:bg-amber-hover transition-all duration-300 flex items-center justify-center gap-2 shadow-button hover:shadow-button-hover"
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
// 2. Pour le SectionTitle Component
const SectionTitle = ({ preTitle, title, subtitle, icon, color = 'amber' }: any) => {
  // Définir les couleurs directement
  const colorClasses = {
    amber: {
      preTitleBg: 'bg-amber-100',
      preTitleText: 'text-amber-700',
      iconColor: 'text-amber-500',
      titleGradient: 'bg-gradient-to-r from-amber-600 to-amber-500 bg-clip-text text-transparent'
    },
    violet: {
      preTitleBg: 'bg-violet-100',
      preTitleText: 'text-violet-700',
      iconColor: 'text-violet-500',
      titleGradient: 'bg-gradient-to-r from-violet-600 to-violet-500 bg-clip-text text-transparent'
    },
    emerald: {
      preTitleBg: 'bg-emerald-100',
      preTitleText: 'text-emerald-700',
      iconColor: 'text-emerald-500',
      titleGradient: 'bg-gradient-to-r from-emerald-600 to-emerald-500 bg-clip-text text-transparent'
    }
  }

  const currentColors = colorClasses[color as keyof typeof colorClasses] || colorClasses.amber

  return (
    <motion.div
      className="text-center mb-16"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      {preTitle && (
        <motion.span
          className={`inline-block px-5 py-2 ${currentColors.preTitleBg} ${currentColors.preTitleText} rounded-full text-sm font-bold uppercase tracking-wider mb-6`}
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring" }}
        >
          {preTitle}
        </motion.span>
      )}
      
      <div className="flex items-center justify-center gap-4 mb-6">
        {icon && <icon.component className={`${currentColors.iconColor} w-8 h-8`} />}
        <h2 className={`text-5xl font-bold ${icon ? currentColors.titleGradient : 'text-gray-900'}`}>
          {title}
        </h2>
        {icon && <icon.component className={`${currentColors.iconColor} w-8 h-8`} />}
      </div>
      
      {subtitle && (
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          {subtitle}
        </p>
      )}
    </motion.div>
  )
}



// Timer Component
// 1. Timer Component corrigé
// 1. Pour le Timer Component
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
      className="inline-flex items-center gap-6 px-6 py-3 rounded-full bg-red-50 border border-red-200"
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
        className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 p-3 backdrop-blur-sm rounded-full shadow-xl hover:bg-white transition-all duration-200 hover:scale-110"
        style={{ backgroundColor: 'var(--backdrop-blur-white)' }}
      >
        <ChevronLeft size={24} className="text-gray-700" />
      </button>
      <button
        onClick={() => scrollContainer('right')}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 p-3 backdrop-blur-sm rounded-full shadow-xl hover:bg-white transition-all duration-200 hover:scale-110"
        style={{ backgroundColor: 'var(--backdrop-blur-white)' }}
      >
        <ChevronRight size={24} className="text-gray-700" />
      </button>

      {/* Scrollable Container */}
      <div className={`${containerClass} flex gap-6 overflow-x-auto hide-scrollbar px-12 pb-4`}>
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
   const { currentTheme } = useTheme()
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0.3])
  const heroScale = useTransform(scrollY, [0, 300], [1, 1.1])

   // Utilisez les couleurs du thème dans les styles
  const heroGradient = `linear-gradient(to-b, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.6) 100%)`
  const sideGradient = `linear-gradient(to-r, rgba(${currentTheme.colors.primary[900]}, 0.3) 0%, transparent 50%, rgba(${currentTheme.colors.primary[900]}, 0.3) 100%)`

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
     <Suspense fallback={<SectionFallback />}>
        <HeroSection heroData={heroData} scrollY={scrollY} />
      </Suspense>


      {/* Categories Section */}
      {/* Categories Section */}
<section 
  className="py-24 relative overflow-hidden"
  style={{ background: 'var(--categories-bg-gradient)' }}
>
  {/* Background Pattern */}
  <div 
    className="absolute inset-0"
    style={{ opacity: 'var(--categories-pattern-opacity)' }}
  >
    <div 
      className="absolute inset-0" 
      style={{ backgroundImage: 'var(--categories-pattern-svg)' }}
    />
  </div>
  
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
    <SectionTitle
      preTitle="DÉCOUVREZ NOS UNIVERS"
      title="Catégories Phares"
      subtitle="Explorez nos collections soigneusement sélectionnées, chaque catégorie raconte une histoire unique"
      icon={{ component: Sparkles }}
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
          className={`group relative p-8 rounded-3xl bg-gradient-to-br ${category.color} ${category.hoverColor} backdrop-blur-sm transition-all duration-500 cursor-pointer overflow-hidden`}
          style={{
            border: `1px solid var(--categories-card-border)`,
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
          }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.05 }}
          whileHover={{ 
            scale: 1.05, 
            y: -8,
            boxShadow: 'var(--categories-card-shadow-hover)'
          }}
          whileTap={{ scale: 0.95 }}
        >
          {/* Background Effect */}
          <motion.div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{ background: 'var(--categories-card-hover-overlay)' }}
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
            
            <h3 
              className="font-bold mb-1 text-lg"
              style={{ color: `rgb(var(--categories-text-primary))` }}
            >
              {category.name}
            </h3>
            
            <p 
              className="text-sm font-medium mb-2"
              style={{ color: `rgb(var(--categories-text-secondary))` }}
            >
              {category.count}
            </p>
            
            <p 
              className="text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ color: `rgb(var(--categories-text-tertiary))` }}
            >
              {category.description}
            </p>
          </div>
          
          {/* Hover Arrow */}
          <motion.div
            className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            initial={{ x: -10 }}
            whileHover={{ x: 0 }}
          >
            <ArrowRight 
              className="w-4 h-4" 
              style={{ color: `rgb(var(--categories-arrow-color))` }}
            />
          </motion.div>
        </motion.div>
      ))}
    </motion.div>
  </div>
</section>

      {/* Featured Products Section */}
      {/* Featured Products Section */}
<section className="py-24 bg-featured-section relative">
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
        className="group px-10 py-5 bg-featured-btn-primary text-featured-btn-primary rounded-full font-bold text-lg shadow-featured-btn hover:shadow-featured-btn-hover transition-all duration-300 flex items-center gap-3 mx-auto"
        whileHover={{ scale: 1.05, y: -3 }}
        whileTap={{ scale: 0.95 }}
      >
        <span>Voir toutes les offres</span>
        <ArrowRight 
          className="w-5 h-5 transition-transform" 
          style={{
            transform: 'var(--group-hover-translate-x, translateX(0))'
          }}
        />
      </motion.button>
    </motion.div>
  </div>
</section>

      {/* New Products Section */}
      {/* New Products Section */}
<section className="py-24 bg-new-products-bg relative overflow-hidden">
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
        className="group px-8 py-4 bg-new-products-btn text-new-products-btn-text rounded-full font-bold shadow-new-products-btn hover:shadow-new-products-btn-hover transition-all duration-300 flex items-center gap-3 mx-auto"
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
      {/* Collections Section */}
<section className="py-24 bg-collections-section relative overflow-hidden">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
    <SectionTitle
      preTitle="COLLECTIONS EXCLUSIVES"
      title="Nos Collections Signature"
      subtitle="Des collections thématiques qui racontent l'histoire de l'Afrique moderne avec élégance et authenticité"
      icon={{ component: Sparkles }}
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
          <div className="relative bg-collections-card-bg rounded-3xl overflow-hidden shadow-collections-card hover:shadow-collections-card-hover transition-all duration-500 border border-collections-card-border">
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
              <div className="absolute inset-0 flex flex-col justify-end p-8 text-collections-text-primary">
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  <div className="mb-3">
                    <span className="px-3 py-1 bg-collections-badge backdrop-blur-md rounded-full text-xs font-bold">
                      {collection.itemCount} pièces exclusives
                    </span>
                  </div>
                  
                  <h3 className="text-3xl font-bold mb-3 drop-shadow-lg">
                    {collection.title}
                  </h3>
                  
                  <p className="text-sm text-collections-text-secondary mb-4 line-clamp-2 drop-shadow">
                    {collection.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-collections-text-tertiary">
                      Par <span className="font-semibold">{collection.creator}</span>
                    </p>
                    <motion.div
                      className="p-2 bg-collections-overlay backdrop-blur-sm rounded-full"
                      whileHover={{ scale: 1.1, backgroundColor: 'var(--collections-overlay-hover-bg)' }}
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
        className="group px-10 py-4 bg-collections-btn text-collections-text-primary rounded-full font-bold text-lg shadow-collections-btn hover:shadow-collections-btn-hover transition-all duration-300 flex items-center gap-3 mx-auto"
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
      {/* Brand Partners Section */}
<section className="py-24 bg-brands-section relative overflow-hidden">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
    <SectionTitle
      preTitle="PARTENAIRES DE CONFIANCE"
      title="Nos Marques Partenaires"
      subtitle="Une sélection rigoureuse d'ateliers et créateurs reconnus pour leur excellence et leur savoir-faire unique"
      icon={{ component: Sparkles }}
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
          <div className="bg-brands-card-bg rounded-2xl p-6 shadow-brands-card hover:shadow-brands-card-hover transition-all duration-300 border border-brands-card-border overflow-hidden">
            <div className="relative">
              <img
                src={brand.logo}
                alt={brand.name}
                className="w-full h-20 object-contain mb-4 filter grayscale group-hover:grayscale-0 transition-all duration-500"
              />
              
              <h3 className="font-bold text-brands-text-primary text-center mb-1 group-hover:text-brands-text-hover transition-colors">
                {brand.name}
              </h3>
              
              <p className="text-xs text-brands-text-secondary text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {brand.specialty}
              </p>
              
              {/* Hover Effect */}
              <motion.div
                className="absolute inset-0 bg-brands-overlay group-hover:bg-brands-overlay-hover rounded-2xl transition-all duration-500"
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
            <Icon className="w-8 h-8 text-brands-stats-icon mx-auto mb-3" />
            <div className="text-2xl font-bold text-brands-stats-text-primary">{stat.number}</div>
            <div className="text-sm text-brands-stats-text-secondary">{stat.label}</div>
          </motion.div>
        )
      })}
    </motion.div>
  </div>
</section>

      {/* Testimonials Section */}
      <section className="py-24 bg-testimonials-section relative overflow-hidden">
        <div className="absolute inset-0" style={{ opacity: 'var(--testimonials-pattern-opacity)' }}>
          <div className="absolute inset-0 bg-testimonials-pattern" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <SectionTitle
            preTitle="TÉMOIGNAGES CLIENTS"
            title="Ils nous font confiance"
            subtitle="Découvrez les avis de nos clients satisfaits à travers toute l'Afrique"
            icon={{ component: Sparkles }}
          />

          <div className="relative max-w-4xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTestimonial}
                className="bg-testimonials-card-bg rounded-3xl p-8 md:p-12 shadow-testimonials-card border border-testimonials-card-border"
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
                      className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-4 border-testimonials-avatar-border"
                    />
                    {testimonialsData[activeTestimonial].verified && (
                      <div className="absolute -bottom-2 -right-2 bg-testimonials-verified-bg text-white p-2 rounded-full">
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
                          className="text-testimonials-star fill-current"
                        />
                      ))}
                    </div>
                    
                    <p className="text-lg text-testimonials-text-secondary mb-6 italic leading-relaxed">
                      "{testimonialsData[activeTestimonial].text}"
                    </p>
                    
                    <div className="space-y-1">
                      <h4 className="font-bold text-testimonials-text-primary text-lg">
                        {testimonialsData[activeTestimonial].name}
                      </h4>
                      <p className="text-testimonials-text-secondary flex items-center justify-center md:justify-start gap-2">
                        <MapPin className="w-4 h-4" />
                        {testimonialsData[activeTestimonial].location}
                      </p>
                      <p className="text-sm text-testimonials-text-accent font-medium">
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
                      ? 'w-8 bg-testimonials-dot-active' 
                      : 'w-2 bg-testimonials-dot-inactive hover:bg-testimonials-dot-hover'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-services-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Nos Services"
            subtitle="Une expérience shopping complète pensée pour votre satisfaction"
            icon={{ component: Sparkles }}
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
                  className="group p-6 bg-services-card-bg rounded-3xl border border-services-card-border hover:shadow-services-card transition-all duration-300 cursor-pointer text-center"
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
                    <Icon className="w-full h-full text-services-icon-text" />
                  </motion.div>
                  
                  <h3 className="font-semibold text-services-text-primary mb-3 group-hover:text-services-text-hover transition-colors">
                    {service.title}
                  </h3>
                  
                  <p className="text-sm text-services-text-secondary leading-relaxed">
                    {service.description}
                  </p>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-24 bg-newsletter-section-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <NewsletterSection />
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-32 bg-final-cta-section relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <motion.div
            className="absolute top-0 left-0 w-96 h-96 rounded-full blur-3xl"
            style={{ backgroundColor: 'var(--final-cta-bubble-primary)' }}
            animate={{
              x: [0, 100, 0],
              y: [0, -100, 0],
            }}
            transition={{ duration: 20, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-0 right-0 w-96 h-96 rounded-full blur-3xl"
            style={{ backgroundColor: 'var(--final-cta-bubble-secondary)' }}
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
              className="inline-flex items-center gap-3 px-6 py-3 backdrop-blur-md rounded-full mb-8"
              style={{ backgroundColor: 'var(--final-cta-badge-bg)' }}
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", delay: 0.2 }}
            >
              <Crown className="text-final-cta-text-primary w-6 h-6" />
              <span className="text-final-cta-text-primary font-bold text-lg">Plus de 10,000 clients satisfaits</span>
              <Crown className="text-final-cta-text-primary w-6 h-6" />
            </motion.div>

            <h2 className="text-5xl md:text-7xl font-bold text-final-cta-text-primary mb-8 leading-tight">
              Exprimez votre
              <br />
              <span className="text-final-cta-text-secondary">
                fierté africaine
              </span>
            </h2>

            <p className="text-2xl text-final-cta-text-tertiary mb-12 max-w-3xl mx-auto leading-relaxed">
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
                className="group px-10 py-5 bg-final-cta-btn-primary-bg text-final-cta-btn-primary-text rounded-full font-bold text-lg shadow-final-cta-btn-primary transition-all duration-300 flex items-center gap-3"
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
              >
                <Zap className="w-6 h-6" />
                <span>Commencer mon shopping</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </motion.button>
              
              <motion.button
                className="px-10 py-5 bg-final-cta-btn-secondary text-final-cta-btn-secondary-text rounded-full font-bold text-lg border-3 border-final-cta-btn-secondary hover:bg-final-cta-btn-secondary-hover backdrop-blur-sm transition-all duration-300 flex items-center gap-3"
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
                    className="bg-final-cta-stats-card backdrop-blur-md rounded-2xl p-6 border border-final-cta-stats-card"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.7 + index * 0.1 }}
                    whileHover={{ scale: 1.05, backgroundColor: 'var(--final-cta-stats-card-hover)' }}
                  >
                    <Icon className="w-8 h-8 text-final-cta-stats-icon mx-auto mb-3" />
                    <motion.div
                      className="text-4xl font-bold text-final-cta-stats-number mb-2"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.9 + index * 0.1, type: "spring" }}
                    >
                      {stat.number}
                    </motion.div>
                    <p className="text-final-cta-stats-label font-medium">{stat.label}</p>
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