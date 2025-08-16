// pages/Home/HomePage.tsx
import { memo, useState, useEffect,lazy,Suspense } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import bannerImage from '@/assets/femme-rastafarienne.jpg'
import { useTheme } from '../../components/theme/ThemeProvider'
import { Link } from 'react-router-dom';
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
  Tag,
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
      text: "Découvrir nos marques",
      icon: ShoppingBag,
      variant: "primary",
      link: "/shop"
    },
    {
      text: "Découvrir notre identité",
      icon: Play,
      variant: "secondary",
      link: "/about"
    }
  ],
  backgroundImage: bannerImage
}


const ctaButtonsCategoriePhares= [
    {
      text: "Offres exceptionnelles",
      icon: Tag,
      variant: "primary",
      link: "/offers"
    },
    {
      text: "Nouvelles créations",
      icon: Sparkles,
      variant: "primary",
      link: "/new-products"
    }
  ]

// Categories Data
 const categoriesData = [
  {
    id: 1,
    name: 'Homme',
    icon: '👔',
    image: 'https://www.mooseknucklescanada.com/cdn/shop/files/m15ms653_1576_front_category.jpg?format=webp&quality=90&v=1752702617&width=800',
    count: '150+ articles',
    description: 'Style et élégance masculine',
    link: '/categories/homme'
  },
  {
    id: 2,
    name: 'Femme',
    icon: '👗',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrclJ3WybWPmTdJS93U_qohPLO-H5FngfcFw&s',
    count: '200+ articles',
    description: 'Grâce et beauté féminine',
    link: '/categories/femme'
  },
  {
    id: 3,
    name: 'Enfants',
    icon: '👶',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQv1G5O6oPyd_qOXyI8njaZC9cwWn4S0YvGjQ&s',
    count: '80+ articles',
    description: 'Confort et joie pour les petits',
    link: '/categories/enfants'
  },
  {
    id: 4,
    name: 'Textile',
    icon: '🧵',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8DjExUnXUwRFC4LHcjGe8kzodz4KB_aFgIA&s',
    count: '100+ motifs',
    description: 'Tissus authentiques',
    link: '/categories/textile'
  },
  {
    id: 5,
    name: 'Vetements',
    icon: '💎',
    image: 'data:image/jpeg;base64,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',
    count: '50+ pièces',
    description: 'Éclat et prestige',
    link: '/categories/bijoux'
  },
  {
    id: 6,
    name: 'Bijoux',
    icon: '💎',
    image: 'data:image/jpeg;base64,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',
    count: '50+ pièces',
    description: 'Éclat et prestige',
    link: '/categories/bijoux'
  },
  {
    id: 7,
    name: 'Soins',
    icon: '🌿',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRs__3bLw5hcvsaTyL4U4E0LHtIAH4sAhJf2Q&s',
    count: '30+ produits',
    description: 'Bien-être naturel',
    link: '/categories/soins'
  }
 ];
 

// Featured Products Data


// New Products Data


// Collections Data
// Collections Data - Version mise à jour pour HomePage.tsx
// Remplacer collectionsData existant par cette version

const collectionsData = [
  {
    id: 1,
    title: 'Heritage Ivoirienne',
    slug: 'heritage-ivoirienne', // Ajouté pour URL friendly
    description: 'Une célébration de nos traditions ancestrales revisitées avec modernité',
    shortDescription: 'Traditions ancestrales et modernité', // Version courte pour cards
    image: 'https://images.unsplash.com/photo-1554412933-514a83d2f3c8?w=1000&h=1200&fit=crop&q=90',
    creator: 'Atelier Royal Akan',
    itemCount: 12,
    color: 'from-amber-600 to-orange-500',
    link: '/collections/heritage-ivoirienne', // URL de la collection
    status: 'active', // active, coming-soon, sold-out
    featured: true, // Collection mise en avant
    launchDate: '2024-01-15',
    averagePrice: 45000, // Prix moyen des produits
    themes: ['Tradition', 'Royauté', 'Spiritualité'],
    totalSales: 234,
    rating: 4.9,
    reviewsCount: 127
  },
  {
    id: 2,
    title: 'Modernité Africaine',
    slug: 'modernite-africaine',
    description: 'Des designs contemporains inspirés des motifs traditionnels',
    shortDescription: 'Design contemporain africain',
    image: 'https://images.unsplash.com/photo-1551232864-3f0890e580d9?w=1000&h=1200&fit=crop&q=90',
    creator: 'Studio Abidjan',
    itemCount: 8,
    color: 'from-purple-600 to-pink-500',
    link: '/collections/modernite-africaine',
    status: 'active',
    featured: true,
    launchDate: '2024-02-01',
    averagePrice: 32000,
    themes: ['Modernité', 'Innovation', 'Fusion'],
    totalSales: 156,
    rating: 4.8,
    reviewsCount: 89
  },
  {
    id: 3,
    title: 'Art Sacré',
    slug: 'art-sacre',
    description: 'Pièces uniques inspirées par les rituels et croyances traditionnelles',
    shortDescription: 'Spiritualité et art traditionnel',
    image: 'https://images.unsplash.com/photo-1479064555552-3ef4979f8908?w=1000&h=1200&fit=crop&q=90',
    creator: 'Maître Koffi',
    itemCount: 5,
    color: 'from-emerald-600 to-teal-500',
    link: '/collections/art-sacre',
    status: 'active',
    featured: false,
    launchDate: '2024-01-20',
    averagePrice: 68000,
    themes: ['Spiritualité', 'Rituel', 'Ancestral'],
    totalSales: 89,
    rating: 5.0,
    reviewsCount: 45
  },
  {
    id: 4,
    title: 'Mode Urbaine',
    slug: 'mode-urbaine',
    description: 'L\'élégance africaine adaptée à la vie moderne et urbaine',
    shortDescription: 'Style urbain africain moderne',
    image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=1000&h=1200&fit=crop&q=90',
    creator: 'Afro-Futuriste',
    itemCount: 15,
    color: 'from-blue-600 to-cyan-500',
    link: '/collections/mode-urbaine',
    status: 'coming-soon',
    featured: true,
    launchDate: '2024-03-15',
    averagePrice: 28000,
    themes: ['Urbain', 'Moderne', 'Jeunesse'],
    totalSales: 0,
    rating: 0,
    reviewsCount: 0
  },
  {
    id: 5,
    title: 'Bijoux Royaux',
    slug: 'bijoux-royaux',
    description: 'Collection de bijoux inspirée des parures des cours royales africaines',
    shortDescription: 'Parures royales authentiques',
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1000&h=1200&fit=crop&q=90',
    creator: 'Maison des Orfèvres',
    itemCount: 7,
    color: 'from-yellow-600 to-amber-500',
    link: '/collections/bijoux-royaux',
    status: 'active',
    featured: false,
    launchDate: '2024-01-10',
    averagePrice: 85000,
    themes: ['Royauté', 'Luxe', 'Prestige'],
    totalSales: 67,
    rating: 4.9,
    reviewsCount: 34
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
    title: 'Services Personnalisés',
    description: 'Offrez le choix avec nos cartes cadeaux personnalisables',
    color: 'from-fuchsia-600 to-pink-500',
    link: '/services/carte-cadeau'
  },
    {
    id: 3,
    icon: Gift,
    title: 'Carte cadeau Be',
    description: 'Offrez le choix avec nos cartes cadeaux personnalisables',
    color: 'from-fuchsia-600 to-pink-500',
    link: '/services/carte-cadeau'
  },
  {
    id: 4,
    icon: CreditCard,
    title: 'Moyens de paiement',
    description: 'Paiement sécurisé par carte, mobile money ou virement',
    color: 'from-emerald-600 to-teal-500',
    link: '/services/paiement'
  },
  {
    id: 5,
    icon: Truck,
    title: 'Mode de livraison',
    description: 'Livraison rapide dans toute la Côte d\'Ivoire et l\'Afrique de l\'Ouest',
    color: 'from-blue-600 to-cyan-500',
    link: '/services/livraison'
  },
  {
    id: 6,
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
const ProductCard = ({ product, index }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isQuickView, setIsQuickView] = useState(false);

  return (
    <motion.div
      className="group relative"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className="relative bg-white rounded-2xl overflow-hidden shadow-md transition-all duration-300 border border-gray-100">
        {/* Badges - Tailles et espacements adaptés au mobile */}
        <div className="absolute top-2 left-2 z-10 flex flex-col gap-1">
          <motion.span
            className={`px-2 py-0.5 bg-gradient-to-r ${product.badgeColor} text-white text-xs font-bold rounded-full shadow-sm`}
            initial={{ x: -100 }}
            animate={{ x: 0 }}
            transition={{ type: "spring", delay: 0.2 + index * 0.1 }}
          >
            {product.badge}
          </motion.span>
          {product.isBestseller && (
            <span className="px-2 py-0.5 bg-red-500 text-white text-xs font-bold rounded-full shadow-sm">
              BESTSELLER
            </span>
          )}
        </div>

        {/* Discount Badge - Taille réduite pour ne pas être trop intrusif */}
        {product.discount && (
          <motion.div
            className="absolute top-2 right-2 z-10"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", delay: 0.3 + index * 0.1 }}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-400 rounded-full flex items-center justify-center text-white font-bold shadow-md">
              <span className="text-xs">-{product.discount}%</span>
            </div>
          </motion.div>
        )}

        {/* Image Container */}
        <div className="relative aspect-[4/5] overflow-hidden">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-cover transition-transform duration-500"
          />

          {/* Overlay Actions - Toujours visibles pour les mobiles */}
          <div className="absolute inset-0 bg-black bg-opacity-10 transition-all duration-300 flex items-end justify-end p-4">
            <div className="flex gap-2">
              <motion.button
                className="p-2 backdrop-blur-sm rounded-xl text-gray-700 hover:text-amber-600 transition-colors shadow-lg"
                style={{ backgroundColor: 'rgba(255, 255, 255, 0.7)' }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsQuickView(true)}
              >
                <Eye size={18} />
              </motion.button>

              <motion.button
                className={`p-2 backdrop-blur-sm rounded-xl transition-all duration-300 shadow-lg ${
                  isLiked ? 'text-red-500' : 'text-gray-700 hover:text-red-500'
                }`}
                style={{ backgroundColor: 'rgba(255, 255, 255, 0.7)' }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsLiked(!isLiked)}
              >
                <Heart size={18} fill={isLiked ? 'currentColor' : 'none'} />
              </motion.button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 space-y-3">
          {/* Title and Rating */}
          <div>
            <h3 className="font-bold text-gray-900 mb-1 text-base">
              {product.title}
            </h3>

            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={12}
                    className={i < Math.floor(product.rating) ? 'text-amber-400 fill-current' : 'text-gray-300'}
                  />
                ))}
                <span className="text-xs text-gray-600 ml-1">({product.reviews})</span>
              </div>
              {product.sold && (
                <span className="text-xs text-gray-500 flex items-center gap-1">
                  <TrendingUp size={10} />
                  {product.sold} vendus
                </span>
              )}
            </div>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-bold text-gray-900">
              {formatPrice(product.price)} CFA
            </span>
            {product.originalPrice && (
              <span className="text-sm text-gray-400 line-through">
                {formatPrice(product.originalPrice)} CFA
              </span>
            )}
          </div>

          {product.creator && (
            <p className="text-xs text-gray-500">{product.creator}</p>
          )}

          {/* Add to Cart Button */}
          <motion.button
            className="w-full py-2.5 bg-amber-500 text-white rounded-xl font-semibold text-sm hover:bg-amber-600 transition-all duration-300 flex items-center justify-center gap-2 shadow-md"
            whileTap={{ scale: 0.98 }}
          >
            <ShoppingBag size={16} />
            <span>Ajouter au panier</span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

// Section Title Component
const SectionTitle = ({ preTitle, title, subtitle, icon, color = 'amber' }) => {
  const colorClasses = {
    amber: {
      preTitleBg: 'bg-amber-100',
      preTitleText: 'text-amber-700',
      iconColor: 'text-amber-500',
      titleGradient: 'bg-gradient-to-r from-amber-600 to-amber-500 bg-clip-text text-transparent',
    },
    violet: {
      preTitleBg: 'bg-violet-100',
      preTitleText: 'text-violet-700',
      iconColor: 'text-violet-500',
      titleGradient: 'bg-gradient-to-r from-violet-600 to-violet-500 bg-clip-text text-transparent',
    },
    emerald: {
      preTitleBg: 'bg-emerald-100',
      preTitleText: 'text-emerald-700',
      iconColor: 'text-emerald-500',
      titleGradient: 'bg-gradient-to-r from-emerald-600 to-emerald-500 bg-clip-text text-transparent',
    },
  };

  const currentColors = colorClasses[color] || colorClasses.amber;

  return (
    <motion.div
      className="text-center mb-8 md:mb-16"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      {preTitle && (
        <motion.span
          className={`inline-block px-4 py-1.5 ${currentColors.preTitleBg} ${currentColors.preTitleText} rounded-full text-xs font-bold uppercase tracking-wider mb-4 md:mb-6`}
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring" }}
        >
          {preTitle}
        </motion.span>
      )}

      <div className="flex items-center justify-center gap-2 md:gap-4 mb-4 md:mb-6">
        {icon && <icon.component className={`${currentColors.iconColor} w-6 h-6 md:w-8 md:h-8`} />}
        <h2 className={`text-3xl md:text-5xl font-bold ${icon ? currentColors.titleGradient : 'text-gray-900'}`}>
          {title}
        </h2>
        {icon && <icon.component className={`${currentColors.iconColor} w-6 h-6 md:w-8 md:h-8`} />}
      </div>

      {subtitle && (
        <p className="text-sm md:text-xl text-gray-600 max-w-3xl mx-auto px-4">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
};

// Timer Component
const CountdownTimer = ({ endDate }) => {
  const [timeLeft, setTimeLeft] = useState({ hours: 23, minutes: 47, seconds: 12 });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const end = new Date(endDate).getTime();
      const distance = end - now;

      if (distance > 0) {
        setTimeLeft({
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [endDate]);

  return (
    <motion.div
      className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-red-50 border border-red-200"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay: 0.3 }}
    >
      <Clock className="text-red-500 w-4 h-4 md:w-5 md:h-5" />
      <div className="flex gap-2 md:gap-4 items-center">
        <div className="text-center">
          <div className="text-lg md:text-2xl font-bold text-red-600">{timeLeft.hours}</div>
          <div className="text-xs text-gray-600">Heures</div>
        </div>
        <span className="text-red-500 text-lg md:text-2xl">:</span>
        <div className="text-center">
          <div className="text-lg md:text-2xl font-bold text-red-600">{timeLeft.minutes}</div>
          <div className="text-xs text-gray-600">Minutes</div>
        </div>
        <span className="text-red-500 text-lg md:text-2xl">:</span>
        <div className="text-center">
          <div className="text-lg md:text-2xl font-bold text-red-600">{timeLeft.seconds}</div>
          <div className="text-xs text-gray-600">Secondes</div>
        </div>
      </div>
      <span className="text-xs md:text-sm font-semibold text-red-600">{timerData.message}</span>
    </motion.div>
  );
};

// Scrollable Products Section Component
const ScrollableProductsSection = ({ products, containerClass = 'products-container' }) => {
  const scrollContainer = (direction) => {
    const container = document.querySelector(`.${containerClass}`);
    if (container) {
      const scrollAmount = 320;
      container.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="relative">
      {/* Navigation Buttons - Cacher sur mobile, afficher sur desktop */}
      <button
        onClick={() => scrollContainer('left')}
        className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 p-3 backdrop-blur-sm rounded-full shadow-xl transition-all duration-200 hidden md:block"
        style={{ backgroundColor: 'rgba(255, 255, 255, 0.7)' }}
      >
        <ChevronLeft size={24} className="text-gray-700" />
      </button>
      <button
        onClick={() => scrollContainer('right')}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 p-3 backdrop-blur-sm rounded-full shadow-xl transition-all duration-200 hidden md:block"
        style={{ backgroundColor: 'rgba(255, 255, 255, 0.7)' }}
      >
        <ChevronRight size={24} className="text-gray-700" />
      </button>

      {/* Scrollable Container - Ajout de padding pour le défilement tactile */}
      <div className={`${containerClass} flex gap-4 md:gap-6 overflow-x-auto hide-scrollbar px-4 md:px-12 pb-4`}>
        {products.map((product, index) => (
          <div key={product.id} className="flex-shrink-0 w-64 md:w-80">
            <ProductCard product={product} index={index} />
          </div>
        ))}
      </div>
    </div>
  );
};

  const darkOverlays = {
    mainBackground: 'from-gray-900 via-gray-800 to-black',
    imageOpacity: 0.2, // Légèrement augmentée pour mobile
    blackOverlay: 0.5, // Augmentée pour meilleur contraste mobile
    gradientOverlay: 'from-gray-900/70 via-transparent to-gray-900/40',
    buttonBackdrop: 'bg-white/20',
    scrollIndicator: 'bg-black/20'
  }

// Main Homepage Component
const HomePage = memo(() => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const { scrollY } = useScroll();
  const { currentTheme } = useTheme();
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0.3]);
  const heroScale = useTransform(scrollY, [0, 300], [1, 1.1]);

  const heroGradient = `linear-gradient(to-b, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.6) 100%)`;
  const sideGradient = `linear-gradient(to-r, rgba(${currentTheme.colors.primary[900]}, 0.3) 0%, transparent 50%, rgba(${currentTheme.colors.primary[900]}, 0.3) 100%)`;

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonialsData.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Suspense fallback={<SectionFallback />}>
        <HeroSection heroData={heroData} scrollY={scrollY} />
      </Suspense>

      {/* Categories Section */}
      <section
        className="py-12 md:py-24 relative overflow-hidden"
        style={{ background: 'var(--categories-bg-gradient)' }}
      >
        <div className="absolute inset-0" style={{ opacity: 'var(--categories-pattern-opacity)' }}>
          <div className="absolute inset-0" style={{ backgroundImage: 'var(--categories-pattern-svg)' }} />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <SectionTitle
            preTitle="DÉCOUVREZ NOS UNIVERS"
            title="Catégories Phares"
            subtitle="Explorez nos collections soigneusement sélectionnées"
            icon={{ component: Sparkles }}
          />
          <motion.div
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ staggerChildren: 0.1 }}
          >
            {categoriesData.map((category, index) => (
              <motion.div
                key={category.id}
                className="group relative rounded-2xl transition-all duration-500 cursor-pointer overflow-hidden aspect-[3/4]"
                style={{
                  border: '1px solid var(--categories-card-border)',
                  boxShadow: '0 5px 10px rgba(0, 0, 0, 0.1)',
                  backgroundImage: `url(${category.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent transition-all duration-500" />
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <h3 className="font-bold text-base">
                    {category.name}
                  </h3>
                  <p className="text-xs font-medium text-neutral-300 mb-2">
                    {category.count}
                  </p>
                  <p className="text-xs text-neutral-400 max-h-0 opacity-0 group-hover:max-h-20 group-hover:opacity-100 transition-all duration-300">
                    {category.description}
                  </p>
                </div>
                <motion.div
                  className="absolute bottom-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  whileInView={{ x: 0 }}
                >
                  <ArrowRight className="w-4 h-4" />
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
          <motion.div
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mt-8 mb-8 sm:mb-10 md:mb-12 px-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
          >
            {ctaButtonsCategoriePhares.map((button, index) => {
              const Icon = button.icon
              return (
                <Link to={button.link} key={index}> 


                <motion.button
                  key={index}
                  className={`group w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 ${
                    button.variant === 'primary' 
                      ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-2xl shadow-amber-500/25' 
                      : `backdrop-blur-md text-white border-2 border-amber-400/50 ${darkOverlays.buttonBackdrop}`
                  } rounded-full font-bold transition-all duration-300 flex items-center justify-center gap-2 sm:gap-3 text-base sm:text-lg hover:shadow-xl`}
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>{button.text}</span>
                  {button.variant === 'primary' && (
                    <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
                  )}
                </motion.button>

                 </Link> // <-- Close
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* Featured Products Section */}
     

      {/* New Products Section */}
      
      {/* Collections Section */}
      <section className="py-12 md:py-24 bg-gray-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <SectionTitle
            preTitle="COLLECTIONS EXCLUSIVES"
            title="Nos Collections Signature"
            subtitle="Des collections thématiques qui racontent l'histoire de l'Afrique moderne"
            icon={{ component: Sparkles }}
          />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {collectionsData.map((collection, index) => (
              <motion.div
                key={collection.id}
                className="group cursor-pointer relative"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                whileTap={{ scale: 0.98 }}
              >
               <Link to={`/collections/${collection.id}`}>
                <div className="relative bg-white rounded-2xl overflow-hidden shadow-md transition-all duration-500 border border-gray-100">
                  <div className="aspect-[4/5] overflow-hidden relative">
                    <img
                      src={collection.image}
                      alt={collection.title}
                      className="w-full h-full object-cover transition-transform duration-1000"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${collection.color} opacity-60`} />
                    <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                      <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3 + index * 0.1 }}
                      >
                        <div className="mb-2">
                          <span className="px-2 py-0.5 bg-white bg-opacity-30 backdrop-blur-md rounded-full text-xs font-bold">
                            {collection.itemCount} pièces exclusives
                          </span>
                        </div>
                        <h3 className="text-xl font-bold mb-2 drop-shadow-lg">
                          {collection.title}
                        </h3>
                        <p className="text-sm text-gray-200 mb-4 line-clamp-2 drop-shadow">
                          {collection.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <p className="text-xs text-gray-300">
                            Par <span className="font-semibold">{collection.creator}</span>
                          </p>
                          <motion.div
                            className="p-2 bg-white bg-opacity-30 backdrop-blur-sm rounded-full"
                            whileTap={{ scale: 0.9 }}
                          >
                            <ArrowRight className="w-4 h-4" />
                          </motion.div>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </Link>

              </motion.div>
            ))}
          </div>
          <motion.div
            className="text-center mt-8 md:mt-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
          >
            <motion.button
              className="group px-6 py-3 bg-amber-500 text-white rounded-full font-bold text-base shadow-md hover:bg-amber-600 transition-all duration-300 flex items-center gap-2 mx-auto"
              whileTap={{ scale: 0.95 }}
            >
              <Crown className="w-4 h-4" />
              <span>Explorer toutes nos collections</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Brand Partners Section */}
      {/* Brand Partners Section */}
      <section className="py-12 md:py-24 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
           <SectionTitle
            preTitle="PARTENAIRES DE CONFIANCE"
            title="Nos Marques Partenaires"
            subtitle="Une sélection rigoureuse d'ateliers et créateurs"
            icon={{ component: Sparkles }}
          />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6 mb-8 md:mb-12">
            {brandsData.map((brand, index) => (
              <motion.div
                key={brand.id}
                className="group relative cursor-pointer"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Modifié : le premier lien redirige vers une page spécifique du partenaire */}
                <Link to={`/brand/${brand.id}`}>
                  <div className="bg-gray-50 rounded-xl p-4 md:p-6 shadow-sm transition-all duration-300 border border-gray-100 overflow-hidden hover:shadow-lg hover:border-amber-500">
                    <div className="relative">
                      <img
                        src={brand.logo}
                        alt={brand.name}
                        className="w-full h-16 object-contain mb-2 filter grayscale group-hover:grayscale-0 transition-all duration-500"
                      />
                      <h3 className="font-bold text-gray-900 text-center text-sm mb-1 group-hover:text-amber-500 transition-colors">
                        {brand.name}
                      </h3>
                      <p className="text-xs text-gray-500 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {brand.specialty}
                      </p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-12 md:py-24 bg-gray-50 relative overflow-hidden">
        <div className="absolute inset-0" style={{ opacity: 'var(--testimonials-pattern-opacity)' }}>
          <div className="absolute inset-0" style={{ background: 'linear-gradient(rgba(255,255,255,0.7), rgba(255,255,255,0.7)), url(/path-to-pattern.svg)' }} />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <SectionTitle
            preTitle="TÉMOIGNAGES CLIENTS"
            title="Ils nous font confiance"
            subtitle="Découvrez les avis de nos clients satisfaits"
            icon={{ component: Sparkles }}
          />
          <div className="relative max-w-4xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTestimonial}
                className="bg-white rounded-2xl p-6 md:p-12 shadow-lg border border-gray-100"
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8 text-center md:text-left">
                  {/* Avatar */}
                  <div className="relative">
                    <img
                      src={testimonialsData[activeTestimonial].avatar}
                      alt={testimonialsData[activeTestimonial].name}
                      className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover border-2 border-amber-500"
                    />
                    {testimonialsData[activeTestimonial].verified && (
                      <div className="absolute -bottom-1 -right-1 bg-amber-500 text-white p-1 rounded-full">
                        <Check className="w-3 h-3" />
                      </div>
                    )}
                  </div>
                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-center justify-center md:justify-start gap-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          className="text-amber-400 fill-current"
                        />
                      ))}
                    </div>
                    <p className="text-sm text-gray-600 mb-4 italic leading-relaxed">
                      "{testimonialsData[activeTestimonial].text}"
                    </p>
                    <div className="space-y-1">
                      <h4 className="font-bold text-gray-900 text-sm">
                        {testimonialsData[activeTestimonial].name}
                      </h4>
                      <p className="text-xs text-gray-500 flex items-center justify-center md:justify-start gap-1">
                        <MapPin className="w-3 h-3" />
                        {testimonialsData[activeTestimonial].location}
                      </p>
                      <p className="text-xs text-amber-500 font-medium">
                        A acheté: {testimonialsData[activeTestimonial].product}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Dots */}
            <div className="flex justify-center gap-2 mt-6">
              {testimonialsData.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTestimonial(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === activeTestimonial
                      ? 'w-6 bg-amber-500'
                      : 'w-2 bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-12 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Nos Services"
            subtitle="Une expérience shopping complète pensée pour votre satisfaction"
            icon={{ component: Sparkles }}
          />
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ staggerChildren: 0.1 }}
          >
            {servicesData.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.id}
                  className="group p-4 md:p-6 bg-gray-50 rounded-2xl border border-gray-100 shadow-sm transition-all duration-300 cursor-pointer text-center"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="flex justify-center mb-4">
                    <Icon className="w-8 h-8 text-amber-500 group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <h3 className="font-bold text-gray-900 text-base mb-1">{service.title}</h3>
                  <p className="text-sm text-gray-600">{service.description}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>
    </div>
  );
});

HomePage.displayName = 'HomePage';
export default HomePage;