// pages/Collection/CollectionPage.tsx
import { memo, useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, useParams } from 'react-router-dom'
import {
  ShoppingBag,
  Heart,
  Eye,
  Star,
  Filter,
  Grid,
  List,
  ArrowRight,
  ChevronDown,
  Share2,
  Bookmark,
  Award,
  Users,
  Calendar,
  MapPin,
  Instagram,
  Facebook,
  Twitter,
  Check,
  X,
  SortAsc,
  TrendingUp,
  Sparkles,
  Crown,
  Info
} from 'lucide-react'

// ============================================
// DATA
// ============================================

// Collection détaillée - Heritage Ivoirienne
const collectionData = {
  id: 1,
  title: 'Heritage Ivoirienne',
  slug: 'heritage-ivoirienne',
  shortDescription: 'Une célébration de nos traditions ancestrales revisitées avec modernité',
  fullDescription: `La collection Heritage Ivoirienne célèbre la richesse culturelle de la Côte d'Ivoire à travers des créations uniques qui allient tradition et modernité. Chaque pièce raconte l'histoire de nos ancêtres, de leurs savoir-faire ancestraux transmis de génération en génération.

Inspirée par les motifs traditionnels Akan, Baoulé et Senoufo, cette collection exclusive présente des œuvres d'art contemporaines qui respectent l'authenticité de nos cultures tout en s'adaptant aux codes esthétiques modernes.`,
  
  heroImage: 'https://images.unsplash.com/photo-1554412933-514a83d2f3c8?w=1400&h=800&fit=crop&q=90',
  
  gallery: [
    'https://images.unsplash.com/photo-1554412933-514a83d2f3c8?w=800&q=90',
    'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&q=90',
    'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=800&q=90',
    'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&q=90'
  ],
  
  creator: {
    name: 'Atelier Royal Akan',
    bio: 'Maître artisan spécialisé dans la création de pièces authentiques Akan depuis plus de 20 ans',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
    location: 'Kumasi, Ghana / Abidjan, Côte d\'Ivoire',
    since: 2003,
    totalWorks: 150,
    awards: 3,
    social: {
      instagram: '@atelierroyalakan',
      facebook: 'Atelier Royal Akan',
      website: 'www.atelierroyalakan.com'
    }
  },
  
  stats: {
    itemCount: 12,
    totalSales: 234,
    averageRating: 4.9,
    reviewsCount: 127,
    viewsCount: 2847
  },
  
  themes: ['Tradition', 'Royauté', 'Spiritualité', 'Artisanat'],
  colors: ['Doré', 'Terre cuite', 'Noir ébène', 'Rouge traditionnel'],
  materials: ['Bronze', 'Bois d\'ébène', 'Perles traditionnelles', 'Tissu Kente'],
  
  color: 'from-amber-600 to-orange-500',
  textColor: 'text-amber-600',
  
  launchDate: '2024-01-15',
  status: 'active', // active, coming-soon, sold-out
  exclusivity: 'limited-edition',
  
  story: {
    inspiration: 'Cette collection puise son inspiration dans les cours royales Akan où l\'art et l\'artisanat atteignaient des sommets d\'excellence.',
    process: 'Chaque pièce est façonnée à la main selon des techniques ancestrales, nécessitant parfois plusieurs semaines de travail minutieux.',
    impact: 'En acquérant une pièce de cette collection, vous participez à la préservation et à la transmission de notre patrimoine culturel.'
  }
}

// Produits de la collection
const collectionProducts = [
  {
    id: 1,
    title: 'Masque Royal Akan',
    price: 85000,
    originalPrice: 120000,
    discount: 29,
    image: 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=600&q=90',
    badge: 'PIÈCE MAÎTRESSE',
    badgeColor: 'from-amber-500 to-amber-400',
    rating: 5.0,
    reviews: 24,
    sold: 8,
    isNew: false,
    isBestseller: true,
    isLimitedEdition: true,
    category: 'Art Traditionnel',
    description: 'Masque cérémoniel authentique sculpté à la main dans du bois d\'ébène',
    materials: ['Bois d\'ébène', 'Dorure à la feuille', 'Perles traditionnelles'],
    dimensions: '35cm x 25cm x 15cm',
    weight: '2.1 kg',
    craftingTime: '3 semaines',
    story: 'Inspiré des masques portés lors des cérémonies d\'intronisation des rois Akan'
  },
  {
    id: 2,
    title: 'Collier Traditionnel Kente',
    price: 35000,
    originalPrice: 50000,
    discount: 30,
    image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=600&q=90',
    badge: 'BESTSELLER',
    badgeColor: 'from-green-500 to-green-400',
    rating: 4.9,
    reviews: 67,
    sold: 89,
    isNew: false,
    isBestseller: true,
    isLimitedEdition: false,
    category: 'Bijoux',
    description: 'Collier tissé selon la tradition Kente avec des motifs royaux',
    materials: ['Fils de coton premium', 'Fermoir en bronze', 'Perles de verre'],
    dimensions: '45cm de longueur',
    weight: '150g',
    craftingTime: '1 semaine',
    story: 'Chaque motif raconte une histoire et porte une signification spirituelle'
  },
  {
    id: 3,
    title: 'Vase Rituel en Terre Cuite',
    price: 28000,
    originalPrice: 35000,
    discount: 20,
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&q=90',
    badge: 'ARTISANAL',
    badgeColor: 'from-orange-500 to-red-400',
    rating: 4.8,
    reviews: 31,
    sold: 45,
    isNew: true,
    isBestseller: false,
    isLimitedEdition: true,
    category: 'Décoration',
    description: 'Vase cérémoniel traditionnel avec motifs gravés à la main',
    materials: ['Argile locale', 'Engobe naturel', 'Motifs gravés'],
    dimensions: '28cm x 20cm',
    weight: '1.8 kg',
    craftingTime: '2 semaines',
    story: 'Utilisé traditionnellement pour les libations lors des cérémonies ancestrales'
  },
  {
    id: 4,
    title: 'Bracelet Akan en Bronze',
    price: 15000,
    originalPrice: 20000,
    discount: 25,
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&q=90',
    badge: 'HERITAGE',
    badgeColor: 'from-purple-500 to-purple-400',
    rating: 4.9,
    reviews: 89,
    sold: 156,
    isNew: false,
    isBestseller: true,
    isLimitedEdition: false,
    category: 'Bijoux',
    description: 'Bracelet en bronze ciselé avec symboles Adinkra',
    materials: ['Bronze patiné', 'Gravures Adinkra', 'Finition artisanale'],
    dimensions: 'Diamètre ajustable 6-8cm',
    weight: '85g',
    craftingTime: '3 jours',
    story: 'Les symboles Adinkra représentent des concepts philosophiques akan'
  }
]

// Filtres et tri
const filterOptions = {
  categories: ['Tous', 'Art Traditionnel', 'Bijoux', 'Décoration', 'Textile'],
  priceRanges: [
    { label: 'Tous les prix', min: 0, max: Infinity },
    { label: 'Moins de 20,000 CFA', min: 0, max: 20000 },
    { label: '20,000 - 50,000 CFA', min: 20000, max: 50000 },
    { label: '50,000 - 100,000 CFA', min: 50000, max: 100000 },
    { label: 'Plus de 100,000 CFA', min: 100000, max: Infinity }
  ],
  materials: ['Tous', 'Bois d\'ébène', 'Bronze', 'Terre cuite', 'Coton', 'Perles'],
  availability: ['Tous', 'En stock', 'Dernières pièces', 'Sur commande']
}

const sortOptions = [
  { label: 'Pertinence', value: 'relevance' },
  { label: 'Prix croissant', value: 'price-asc' },
  { label: 'Prix décroissant', value: 'price-desc' },
  { label: 'Nouveautés', value: 'newest' },
  { label: 'Meilleures ventes', value: 'bestsellers' },
  { label: 'Mieux notés', value: 'rating' }
]

// ============================================
// UTILITY FUNCTIONS
// ============================================

const formatPrice = (price) => price.toLocaleString('fr-FR')

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

// ============================================
// COMPONENTS
// ============================================

// Product Card Component
const ProductCard = ({ product, index }) => {
  const [isLiked, setIsLiked] = useState(false)
  const [isQuickView, setIsQuickView] = useState(false)

  return (
    <motion.div
      className="group relative"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className="relative bg-white rounded-2xl overflow-hidden shadow-md transition-all duration-300 border border-gray-100 hover:shadow-xl hover:border-amber-200">
        {/* Badges */}
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
          <span className={`px-3 py-1 bg-gradient-to-r ${product.badgeColor} text-white text-xs font-bold rounded-full shadow-sm`}>
            {product.badge}
          </span>
          {product.isBestseller && (
            <span className="px-3 py-1 bg-red-500 text-white text-xs font-bold rounded-full shadow-sm">
              BESTSELLER
            </span>
          )}
          {product.isLimitedEdition && (
            <span className="px-3 py-1 bg-purple-600 text-white text-xs font-bold rounded-full shadow-sm">
              ÉDITION LIMITÉE
            </span>
          )}
        </div>

        {/* Discount Badge */}
        {product.discount && (
          <div className="absolute top-3 right-3 z-10 w-12 h-12 bg-gradient-to-br from-red-500 to-red-400 rounded-full flex items-center justify-center text-white font-bold shadow-md">
            <span className="text-xs">-{product.discount}%</span>
          </div>
        )}

        {/* Image */}
        <div className="relative aspect-[4/5] overflow-hidden">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          
          {/* Overlay Actions */}
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300 flex items-end justify-end p-4">
            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <button
                className="p-2 bg-white bg-opacity-90 backdrop-blur-sm rounded-xl text-gray-700 hover:text-amber-600 transition-colors shadow-lg"
                onClick={() => setIsQuickView(true)}
              >
                <Eye size={18} />
              </button>
              <button
                className={`p-2 bg-white bg-opacity-90 backdrop-blur-sm rounded-xl transition-all duration-300 shadow-lg ${
                  isLiked ? 'text-red-500' : 'text-gray-700 hover:text-red-500'
                }`}
                onClick={() => setIsLiked(!isLiked)}
              >
                <Heart size={18} fill={isLiked ? 'currentColor' : 'none'} />
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 space-y-3">
          {/* Title and Category */}
          <div>
            <h3 className="font-bold text-gray-900 mb-1 text-lg group-hover:text-amber-600 transition-colors">
              {product.title}
            </h3>
            <p className="text-sm text-gray-500">{product.category}</p>
          </div>

          {/* Description */}
          <p className="text-sm text-gray-600 line-clamp-2">{product.description}</p>

          {/* Rating and Reviews */}
          <div className="flex items-center justify-between">
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
            <span className="text-sm text-gray-500 flex items-center gap-1">
              <TrendingUp size={12} />
              {product.sold} vendus
            </span>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-gray-900">
              {formatPrice(product.price)} CFA
            </span>
            {product.originalPrice && (
              <span className="text-sm text-gray-400 line-through">
                {formatPrice(product.originalPrice)} CFA
              </span>
            )}
          </div>

          {/* Materials */}
          <div className="flex flex-wrap gap-1">
            {product.materials.slice(0, 2).map((material, idx) => (
              <span key={idx} className="px-2 py-1 bg-amber-50 text-amber-700 text-xs rounded-full">
                {material}
              </span>
            ))}
            {product.materials.length > 2 && (
              <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                +{product.materials.length - 2}
              </span>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 pt-2">
            <button className="flex-1 py-3 bg-amber-500 text-white rounded-xl font-semibold hover:bg-amber-600 transition-all duration-300 flex items-center justify-center gap-2 shadow-md">
              <ShoppingBag size={16} />
              <span>Ajouter au panier</span>
            </button>
            <button className="px-4 py-3 border border-amber-500 text-amber-600 rounded-xl hover:bg-amber-50 transition-all duration-300">
              <Info size={16} />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// Filter Sidebar Component
const FilterSidebar = ({ isOpen, onClose, filters, onFiltersChange }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay for mobile */}
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          
          {/* Sidebar */}
          <motion.div
            className="fixed lg:relative top-0 right-0 h-full lg:h-auto w-80 lg:w-64 bg-white shadow-xl lg:shadow-none z-50 overflow-y-auto"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
          >
            <div className="p-6 border-b lg:border-b-0">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-gray-900">Filtres</h3>
                <button
                  onClick={onClose}
                  className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Categories */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Catégories</h4>
                <div className="space-y-2">
                  {filterOptions.categories.map((category) => (
                    <label key={category} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name="category"
                        className="text-amber-500 focus:ring-amber-500"
                        defaultChecked={category === 'Tous'}
                      />
                      <span className="text-sm text-gray-700">{category}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Prix</h4>
                <div className="space-y-2">
                  {filterOptions.priceRanges.map((range, idx) => (
                    <label key={idx} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name="price"
                        className="text-amber-500 focus:ring-amber-500"
                        defaultChecked={idx === 0}
                      />
                      <span className="text-sm text-gray-700">{range.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Materials */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Matériaux</h4>
                <div className="space-y-2">
                  {filterOptions.materials.map((material) => (
                    <label key={material} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        className="text-amber-500 focus:ring-amber-500 rounded"
                      />
                      <span className="text-sm text-gray-700">{material}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Availability */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Disponibilité</h4>
                <div className="space-y-2">
                  {filterOptions.availability.map((status) => (
                    <label key={status} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        className="text-amber-500 focus:ring-amber-500 rounded"
                      />
                      <span className="text-sm text-gray-700">{status}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Reset Filters */}
              <button className="w-full py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                Réinitialiser les filtres
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

// Collection Header Component
const CollectionHeader = ({ collection }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % collection.gallery.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [collection.gallery.length])

  return (
    <section className="relative h-[60vh] lg:h-[70vh] overflow-hidden">
      {/* Background Image Slideshow */}
      <div className="absolute inset-0">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentImageIndex}
            src={collection.gallery[currentImageIndex]}
            alt={collection.title}
            className="w-full h-full object-cover"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          />
        </AnimatePresence>
        <div className={`absolute inset-0 bg-gradient-to-r ${collection.color} opacity-80`} />
        <div className="absolute inset-0 bg-black bg-opacity-30" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Breadcrumb */}
              <nav className="mb-6">
                <div className="flex items-center space-x-2 text-sm">
                  <Link to="/" className="hover:text-amber-300 transition-colors">Accueil</Link>
                  <ArrowRight size={16} />
                  <Link to="/collections" className="hover:text-amber-300 transition-colors">Collections</Link>
                  <ArrowRight size={16} />
                  <span className="text-amber-300">{collection.title}</span>
                </div>
              </nav>

              {/* Collection Info */}
              <div className="mb-6">
                <span className="inline-flex items-center px-3 py-1 bg-white bg-opacity-20 backdrop-blur-sm rounded-full text-sm font-medium mb-4">
                  <Crown size={16} className="mr-2" />
                  Collection Exclusive
                </span>
                <h1 className="text-4xl lg:text-6xl font-bold mb-4">
                  {collection.title}
                </h1>
                <p className="text-xl text-gray-200 mb-6 leading-relaxed">
                  {collection.shortDescription}
                </p>
              </div>

              {/* Stats */}
              <div className="flex flex-wrap gap-6 mb-8">
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-amber-400" />
                  <span className="text-sm font-medium">{collection.stats.itemCount} œuvres uniques</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-amber-400" />
                  <span className="text-sm font-medium">{collection.stats.averageRating}/5 ({collection.stats.reviewsCount} avis)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-amber-400" />
                  <span className="text-sm font-medium">{collection.stats.totalSales} ventes</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4">
                <button className="px-6 py-3 bg-white text-gray-900 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 flex items-center gap-2">
                  <ShoppingBag size={18} />
                  Explorer la collection
                </button>
                <button className="px-6 py-3 border border-white text-white rounded-full font-semibold hover:bg-white hover:text-gray-900 transition-all duration-300 flex items-center gap-2">
                  <Heart size={18} />
                  Ajouter aux favoris
                </button>
                <button className="px-6 py-3 border border-white text-white rounded-full font-semibold hover:bg-white hover:text-gray-900 transition-all duration-300 flex items-center gap-2">
                  <Share2 size={18} />
                  Partager
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Gallery Indicators */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2">
        {collection.gallery.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentImageIndex ? 'bg-white w-6' : 'bg-white bg-opacity-50'
            }`}
          />
        ))}
      </div>
    </section>
  )
}

// Creator Profile Component
const CreatorProfile = ({ creator }) => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="bg-white rounded-2xl p-8 shadow-lg"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col lg:flex-row items-center gap-8">
            {/* Avatar */}
            <div className="flex-shrink-0">
              <img
                src={creator.avatar}
                alt={creator.name}
                className="w-32 h-32 rounded-full object-cover border-4 border-amber-500"
              />
            </div>

            {/* Info */}
            <div className="flex-1 text-center lg:text-left">
              <h3 className="text-3xl font-bold text-gray-900 mb-2">{creator.name}</h3>
              <p className="text-lg text-gray-600 mb-4">{creator.bio}</p>
              
              <div className="flex flex-wrap justify-center lg:justify-start gap-6 mb-6">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-amber-500" />
                  <span className="text-sm text-gray-600">{creator.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-amber-500" />
                  <span className="text-sm text-gray-600">Depuis {creator.since}</span>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 mb-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-amber-600">{creator.totalWorks}</div>
                  <div className="text-sm text-gray-600">Œuvres créées</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-amber-600">{creator.awards}</div>
                  <div className="text-sm text-gray-600">Récompenses</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-amber-600">{new Date().getFullYear() - creator.since}</div>
                  <div className="text-sm text-gray-600">Années d'expérience</div>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex justify-center lg:justify-start gap-4">
                <a href="#" className="p-2 bg-gray-100 rounded-lg hover:bg-amber-100 hover:text-amber-600 transition-colors">
                  <Instagram size={20} />
                </a>
                <a href="#" className="p-2 bg-gray-100 rounded-lg hover:bg-amber-100 hover:text-amber-600 transition-colors">
                  <Facebook size={20} />
                </a>
                <a href="#" className="p-2 bg-gray-100 rounded-lg hover:bg-amber-100 hover:text-amber-600 transition-colors">
                  <Twitter size={20} />
                </a>
              </div>
            </div>

            {/* Contact Button */}
            <div className="flex-shrink-0">
              <button className="px-6 py-3 bg-amber-500 text-white rounded-xl font-semibold hover:bg-amber-600 transition-all duration-300 flex items-center gap-2">
                <Users size={18} />
                Contacter l'artisan
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// Collection Story Component
const CollectionStory = ({ collection }) => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          {/* Title */}
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              L'Histoire de la Collection
            </h2>
            <p className="text-lg text-gray-600">
              Découvrez l'inspiration et le processus créatif derrière chaque œuvre
            </p>
          </div>

          {/* Description */}
          <div className="prose prose-lg mx-auto mb-12">
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
              {collection.fullDescription}
            </p>
          </div>

          {/* Story Sections */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-amber-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Inspiration</h3>
              <p className="text-gray-600">{collection.story.inspiration}</p>
            </motion.div>

            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-amber-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Processus</h3>
              <p className="text-gray-600">{collection.story.process}</p>
            </motion.div>

            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-amber-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Impact</h3>
              <p className="text-gray-600">{collection.story.impact}</p>
            </motion.div>
          </div>

          {/* Collection Details */}
          <div className="bg-gray-50 rounded-2xl p-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Thèmes</h4>
                <div className="flex flex-wrap gap-2">
                  {collection.themes.map((theme, idx) => (
                    <span key={idx} className="px-3 py-1 bg-amber-100 text-amber-700 text-sm rounded-full">
                      {theme}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Couleurs</h4>
                <div className="flex flex-wrap gap-2">
                  {collection.colors.map((color, idx) => (
                    <span key={idx} className="px-3 py-1 bg-gray-200 text-gray-700 text-sm rounded-full">
                      {color}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Matériaux</h4>
                <div className="flex flex-wrap gap-2">
                  {collection.materials.map((material, idx) => (
                    <span key={idx} className="px-3 py-1 bg-green-100 text-green-700 text-sm rounded-full">
                      {material}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Informations</h4>
                <div className="space-y-2 text-sm text-gray-600">
                  <div>Lancé le {formatDate(collection.launchDate)}</div>
                  <div>{collection.stats.viewsCount.toLocaleString()} vues</div>
                  <div className="flex items-center gap-1">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    Collection active
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// Products Grid Component
const ProductsGrid = ({ products }) => {
  const [filters, setFilters] = useState({})
  const [sortBy, setSortBy] = useState('relevance')
  const [viewMode, setViewMode] = useState('grid') // grid or list
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [filteredProducts, setFilteredProducts] = useState(products)

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Œuvres de la Collection
            </h2>
            <p className="text-gray-600">
              {filteredProducts.length} produit{filteredProducts.length > 1 ? 's' : ''} trouvé{filteredProducts.length > 1 ? 's' : ''}
            </p>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-4 mt-4 lg:mt-0">
            {/* View Mode Toggle */}
            <div className="flex items-center bg-white rounded-lg shadow-sm">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-l-lg transition-colors ${
                  viewMode === 'grid' ? 'bg-amber-500 text-white' : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Grid size={18} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-r-lg transition-colors ${
                  viewMode === 'list' ? 'bg-amber-500 text-white' : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <List size={18} />
              </button>
            </div>

            {/* Sort Dropdown */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>

            {/* Filter Button */}
            <button
              onClick={() => setIsFilterOpen(true)}
              className="lg:hidden flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Filter size={18} />
              Filtres
            </button>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Sidebar Filters - Desktop */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <FilterSidebar
              isOpen={true}
              onClose={() => {}}
              filters={filters}
              onFiltersChange={setFilters}
            />
          </div>

          {/* Mobile Filter Sidebar */}
          <FilterSidebar
            isOpen={isFilterOpen}
            onClose={() => setIsFilterOpen(false)}
            filters={filters}
            onFiltersChange={setFilters}
          />

          {/* Products Grid */}
          <div className="flex-1">
            <motion.div
              className={`grid gap-6 ${
                viewMode === 'grid'
                  ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3'
                  : 'grid-cols-1'
              }`}
              layout
            >
              {filteredProducts.map((product, index) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  index={index}
                />
              ))}
            </motion.div>

            {/* Load More Button */}
            <div className="text-center mt-12">
              <button className="px-8 py-3 bg-amber-500 text-white rounded-xl font-semibold hover:bg-amber-600 transition-all duration-300 shadow-md">
                Voir plus de produits
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// Related Collections Component
const RelatedCollections = () => {
  const relatedCollections = [
    {
      id: 2,
      title: 'Modernité Africaine',
      image: 'https://images.unsplash.com/photo-1551232864-3f0890e580d9?w=400&h=300&fit=crop&q=90',
      itemCount: 8,
      color: 'from-purple-600 to-pink-500'
    },
    {
      id: 3,
      title: 'Art Sacré',
      image: 'https://images.unsplash.com/photo-1479064555552-3ef4979f8908?w=400&h=300&fit=crop&q=90',
      itemCount: 5,
      color: 'from-emerald-600 to-teal-500'
    }
  ]

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Collections Similaires
          </h2>
          <p className="text-lg text-gray-600">
            Découvrez d'autres créations qui pourraient vous plaire
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {relatedCollections.map((collection, index) => (
            <motion.div
              key={collection.id}
              className="group cursor-pointer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link to={`/collections/${collection.id}`}>
                <div className="relative bg-white rounded-2xl overflow-hidden shadow-lg transition-all duration-300 group-hover:shadow-xl">
                  <div className="aspect-[4/3] overflow-hidden relative">
                    <img
                      src={collection.image}
                      alt={collection.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${collection.color} opacity-60`} />
                    <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                      <h3 className="text-2xl font-bold mb-2">{collection.title}</h3>
                      <p className="text-sm opacity-90 mb-4">
                        {collection.itemCount} œuvres exclusives
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Découvrir la collection</span>
                        <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Newsletter Section
const NewsletterSection = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-amber-600 to-orange-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto text-white"
        >
          <Crown className="w-12 h-12 mx-auto mb-4" />
          <h2 className="text-3xl font-bold mb-4">
            Restez informé de nos nouvelles collections
          </h2>
          <p className="text-lg opacity-90 mb-8">
            Soyez les premiers à découvrir nos créations exclusives et bénéficiez d'offres privilégiées
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Votre adresse email"
              className="flex-1 px-4 py-3 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button className="px-6 py-3 bg-white text-amber-600 rounded-xl font-semibold hover:bg-gray-100 transition-colors">
              S'abonner
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// ============================================
// MAIN COMPONENT
// ============================================

const CollectionPage = memo(() => {
  const { id } = useParams()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="min-h-screen bg-white">
      {/* Collection Header */}
      <CollectionHeader collection={collectionData} />

      {/* Collection Story */}
      <CollectionStory collection={collectionData} />

      {/* Creator Profile */}
      <CreatorProfile creator={collectionData.creator} />

      {/* Products Grid */}
      <ProductsGrid products={collectionProducts} />

      {/* Related Collections */}
      <RelatedCollections />

      {/* Newsletter */}
      <NewsletterSection />
    </div>
  )
})

CollectionPage.displayName = 'CollectionPage'
export default CollectionPage