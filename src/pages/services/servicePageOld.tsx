import React, { useState, useEffect, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users,
  UserCheck,
  Gift,
  CreditCard,
  Truck,
  Headphones,
  ArrowLeft,
  ArrowRight,
  Star,
  Crown,
  Sparkles,
  Shield,
  Clock,
  Phone,
  Mail,
  MessageCircle,
  MapPin,
  Calendar,
  CheckCircle,
  Award,
  Heart,
  Zap,
  Globe,
  Lock,
  Percent,
  Package,
  CreditCard as Card,
  Smartphone,
  Building,
  Plane,
  Car,
  Home,
  AlertCircle,
  Info,
  ExternalLink,
  Plus,
  ChevronRight,
  Target,
  Palette,
  Eye,
  ShoppingBag,
  Share2,
  Bookmark,
  TrendingUp,
  X
} from 'lucide-react';

// ============================================
// DATA
// ============================================

const servicesData = [
  {
    id: 1,
    icon: Users,
    title: 'Programme de fidélité',
    description: 'Gagnez des points à chaque achat et profitez d\'avantages exclusifs',
    shortDescription: 'Points de fidélité et avantages VIP',
    color: 'from-amber-600 to-orange-500',
    textColor: 'text-amber-600',
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=90',
    badge: 'PREMIUM',
    badgeColor: 'from-amber-500 to-amber-400',
    rating: 4.9,
    reviews: 1247,
    details: {
      benefits: [
        '1€ dépensé = 1 point gagné',
        '100 points = 5€ de réduction',
        'Accès prioritaire aux ventes privées',
        'Cadeaux d\'anniversaire personnalisés',
        'Livraison gratuite dès le niveau Gold'
      ],
      levels: [
        { name: 'Bronze', threshold: '0€', perks: 'Points de base + newsletter exclusive', color: 'from-orange-500 to-orange-400' },
        { name: 'Argent', threshold: '100€', perks: 'Bonus +20% points + avant-premières', color: 'from-gray-400 to-gray-500' },
        { name: 'Or', threshold: '300€', perks: 'Bonus +50% points + livraison gratuite', color: 'from-yellow-400 to-yellow-500' },
        { name: 'Platine', threshold: '600€', perks: 'Bonus +100% points + conseillère dédiée', color: 'from-purple-600 to-purple-500' }
      ]
    }
  },
  {
    id: 2,
    icon: UserCheck,
    title: 'Consultation beauté personnalisée',
    description: 'Conseils beauté sur-mesure adaptés à votre type de peau et vos besoins',
    shortDescription: 'Diagnostic personnalisé par nos expertes',
    color: 'from-amber-600 to-orange-500',
    textColor: 'text-amber-600',
    image: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=800&q=90',
    badge: 'EXPERT',
    badgeColor: 'from-pink-500 to-pink-400',
    rating: 4.8,
    reviews: 892,
    details: {
      services: [
        'Diagnostic beauté personnalisé',
        'Routine sur-mesure par nos experts',
        'Conseils d\'application en vidéo',
        'Suivi mensuel de votre évolution',
        'Box beauté personnalisée'
      ],
      process: [
        'Questionnaire beauté détaillé',
        'Analyse par notre experte',
        'Recommandations personnalisées',
        'Suivi et ajustements'
      ]
    }
  },
  {
    id: 3,
    icon: Gift,
    title: 'Carte cadeau Be',
    description: 'Offrez le choix avec nos cartes cadeaux personnalisables',
    shortDescription: 'Le cadeau parfait pour toutes les occasions',
    color: 'from-amber-600 to-orange-500',
    textColor: 'text-amber-600',
    image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800&q=90',
    badge: 'POPULAIRE',
    badgeColor: 'from-green-500 to-green-400',
    rating: 4.7,
    reviews: 2156,
    details: {
      amounts: ['25€', '50€', '100€', '150€', 'Montant libre'],
      features: [
        'Valable 12 mois sans limite',
        'Utilisable en plusieurs fois',
        'Design personnalisable',
        'Envoi instantané par email',
        'Emballage cadeau offert'
      ],
      occasions: ['Anniversaire', 'Fête des mères', 'Saint-Valentin', 'Noël', 'Remise de diplôme']
    }
  },
  {
    id: 4,
    icon: CreditCard,
    title: 'Paiement sécurisé',
    description: 'Paiement sécurisé par carte, mobile money ou virement',
    shortDescription: 'Tous les moyens de paiement acceptés',
    color: 'from-amber-600 to-orange-500',
    textColor: 'text-amber-600',
    image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&q=90',
    badge: 'SÉCURISÉ',
    badgeColor: 'from-blue-500 to-blue-400',
    rating: 4.9,
    reviews: 3421,
    details: {
      methods: [
        { name: 'Cartes bancaires', icons: ['Visa', 'Mastercard', 'Amex'], fee: 'Gratuit' },
        { name: 'Mobile Money', icons: ['Orange Money', 'MTN Money', 'Moov Money'], fee: 'Gratuit' },
        { name: 'Virement bancaire', icons: ['BCEAO', 'UBA', 'Ecobank'], fee: 'Gratuit' },
        { name: 'Paiement en 3x', icons: ['Sans frais'], fee: 'Dès 100€' }
      ],
      security: [
        'Cryptage SSL 256 bits',
        'Protocole 3D Secure',
        'Certification PCI DSS',
        'Données non stockées'
      ]
    }
  },
  {
    id: 5,
    icon: Truck,
    title: 'Livraison express',
    description: 'Livraison rapide dans toute la Côte d\'Ivoire et l\'Afrique de l\'Ouest',
    shortDescription: 'Livraison 24h à Abidjan, 48h en Côte d\'Ivoire',
    color: 'from-amber-600 to-orange-500',
    textColor: 'text-amber-600',
    image: 'https://images.unsplash.com/photo-1586880244386-8b3e34c8382c?w=800&q=90',
    badge: 'EXPRESS',
    badgeColor: 'from-cyan-500 to-cyan-400',
    rating: 4.8,
    reviews: 1876,
    details: {
      zones: [
        { area: 'Abidjan', time: '24-48h', price: 'Gratuit dès 50€' },
        { area: 'Côte d\'Ivoire', time: '2-4 jours', price: 'Gratuit dès 75€' },
        { area: 'Afrique de l\'Ouest', time: '5-7 jours', price: 'Gratuit dès 150€' },
        { area: 'Afrique Centrale', time: '7-10 jours', price: 'Sur devis' }
      ],
      options: [
        'Livraison standard',
        'Livraison express',
        'Point relais',
        'Livraison sur rendez-vous'
      ]
    }
  },
  {
    id: 6,
    icon: Headphones,
    title: 'Service client 24/7',
    description: 'Une équipe dédiée pour vous accompagner à tout moment',
    shortDescription: 'Support multicanal disponible 24h/24',
    color: 'from-amber-600 to-orange-500',
    textColor: 'text-amber-600',
    image: 'https://images.unsplash.com/photo-1553484771-371a605b060b?w=800&q=90',
    badge: 'DISPONIBLE',
    badgeColor: 'from-emerald-500 to-emerald-400',
    rating: 4.9,
    reviews: 2847,
    details: {
      channels: [
        { type: 'Chat en direct', time: '9h-22h', response: 'Immédiat' },
        { type: 'WhatsApp', time: '24h/24', response: '< 1h' },
        { type: 'Email', time: '24h/24', response: '< 4h' },
        { type: 'Téléphone', time: '9h-19h', response: 'Immédiat' }
      ],
      expertise: [
        'Conseils produits',
        'Aide à la commande',
        'Suivi livraison',
        'Retours et échanges',
        'Support technique'
      ]
    }
  }
];

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

// Service Card Component (style Collection)
const ServiceCard = ({ service, index, onServiceClick }) => {
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
        {/* Badge */}
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
          <span className={`px-3 py-1 bg-gradient-to-r ${service.badgeColor} text-white text-xs font-bold rounded-full shadow-sm`}>
            {service.badge}
          </span>
        </div>

        {/* Image */}
        <div className="relative aspect-[4/5] overflow-hidden">
          <img
            src={service.image}
            alt={service.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          
          {/* Gradient Overlay */}
          <div className={`absolute inset-0 bg-gradient-to-t ${service.color} opacity-60`} />
          
          {/* Overlay Actions */}
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300 flex items-end justify-end p-4">
            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <button
                className="p-2 bg-white bg-opacity-90 backdrop-blur-sm rounded-xl text-gray-700 hover:text-amber-600 transition-colors shadow-lg"
                onClick={() => onServiceClick(service)}
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
          {/* Title */}
          <div>
            <h3 className="font-bold text-gray-900 mb-1 text-lg group-hover:text-amber-600 transition-colors">
              {service.title}
            </h3>
            <p className="text-sm text-gray-500">{service.shortDescription}</p>
          </div>

          {/* Description */}
          <p className="text-sm text-gray-600 line-clamp-2">{service.description}</p>

          {/* Rating and Reviews */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={14}
                  className={i < Math.floor(service.rating) ? 'text-amber-400 fill-current' : 'text-gray-300'}
                />
              ))}
              <span className="text-sm text-gray-600 ml-1">({service.reviews})</span>
            </div>
            <span className="text-sm text-gray-500 flex items-center gap-1">
              <TrendingUp size={12} />
              Populaire
            </span>
          </div>

          {/* Features */}
          <div className="flex flex-wrap gap-1">
            {service.details.benefits?.slice(0, 2).map((benefit, idx) => (
              <span key={idx} className="px-2 py-1 bg-amber-50 text-amber-700 text-xs rounded-full">
                {benefit.split(' ').slice(0, 2).join(' ')}
              </span>
            )) || service.details.services?.slice(0, 2).map((serviceItem, idx) => (
              <span key={idx} className="px-2 py-1 bg-amber-50 text-amber-700 text-xs rounded-full">
                {serviceItem.split(' ').slice(0, 2).join(' ')}
              </span>
            )) || service.details.features?.slice(0, 2).map((feature, idx) => (
              <span key={idx} className="px-2 py-1 bg-amber-50 text-amber-700 text-xs rounded-full">
                {feature.split(' ').slice(0, 2).join(' ')}
              </span>
            )) || []}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 pt-2">
            <button 
              className="flex-1 py-3 bg-amber-500 text-white rounded-xl font-semibold hover:bg-amber-600 transition-all duration-300 flex items-center justify-center gap-2 shadow-md"
              onClick={() => onServiceClick(service)}
            >
              <service.icon size={16} />
              <span>Découvrir</span>
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

// Services Header Component (style Collection)
const ServicesHeader = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  
  const heroImages = [
    'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1400&h=800&fit=crop&q=90',
    'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=1400&h=800&fit=crop&q=90',
    'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=1400&h=800&fit=crop&q=90'
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [heroImages.length])

  return (
    <section className="relative h-[60vh] lg:h-[70vh] overflow-hidden">
      {/* Background Image Slideshow */}
      <div className="absolute inset-0">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentImageIndex}
            src={heroImages[currentImageIndex]}
            alt="Services beauté"
            className="w-full h-full object-cover"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-r from-amber-600 to-orange-500 opacity-80" />
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
                  <span className="hover:text-amber-300 transition-colors cursor-pointer">Accueil</span>
                  <ArrowRight size={16} />
                  <span className="text-amber-300">Services</span>
                </div>
              </nav>

              {/* Services Info */}
              <div className="mb-6">
                <span className="inline-flex items-center px-3 py-1 bg-white bg-opacity-20 backdrop-blur-sm rounded-full text-sm font-medium mb-4">
                  <Crown size={16} className="mr-2" />
                  Services Premium
                </span>
                <h1 className="text-4xl lg:text-6xl font-bold mb-4">
                  Excellence &<br />
                  <span className="text-amber-300">Innovation</span>
                </h1>
                <p className="text-xl text-gray-200 mb-6 leading-relaxed">
                  Une expérience beauté sur-mesure avec des services d'exception pensés pour votre satisfaction et votre bien-être
                </p>
              </div>

              {/* Stats */}
              <div className="flex flex-wrap gap-6 mb-8">
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-amber-400" />
                  <span className="text-sm font-medium">6 services exclusifs</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-amber-400" />
                  <span className="text-sm font-medium">4.8/5 (12,439 avis)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-amber-400" />
                  <span className="text-sm font-medium">50,000+ clients satisfaits</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4">
                <button className="px-6 py-3 bg-white text-gray-900 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 flex items-center gap-2">
                  <Eye size={18} />
                  Découvrir nos services
                </button>
                <button className="px-6 py-3 border border-white text-white rounded-full font-semibold hover:bg-white hover:text-gray-900 transition-all duration-300 flex items-center gap-2">
                  <Heart size={18} />
                  Programme fidélité
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
        {heroImages.map((_, index) => (
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

// Service Modal Component
// PARTIE 2: Le composant principal de la modale
const ServiceModal = ({ service, onClose }) => {
  // Récupère le bon composant de contenu en fonction de l'ID du service.
  const ServiceSpecificContent = serviceContentMap[service.id];

  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      // Pour l'accessibilité : indique que c'est une boîte de dialogue modale
      role="dialog"
      aria-modal="true"
      aria-labelledby="service-title" // Lie le titre de la modale pour les lecteurs d'écran
    >
      <motion.div
        className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto flex flex-col"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        onClick={(e) => e.stopPropagation()} // Empêche la fermeture en cliquant dans la modale
      >
        {/* Header */}
        <header className={`relative bg-gradient-to-br ${service.color} p-8 text-white`}>
          <button
            className="absolute top-4 right-4 p-2 hover:bg-white hover:bg-opacity-20 rounded-xl transition-colors"
            onClick={onClose}
            aria-label="Fermer la modale" // Important pour l'accessibilité
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-white bg-opacity-20 rounded-2xl flex items-center justify-center flex-shrink-0">
              {/* Le rendu d'une icône passée en prop est correct */}
              <service.icon className="w-8 h-8" />
            </div>
            <div>
              <h2 id="service-title" className="text-3xl font-bold mb-2">{service.title}</h2>
              <p className="text-white text-opacity-90">{service.description}</p>
              <div className="flex items-center gap-2 mt-2" aria-label={`Note de ${service.rating} sur 5`}>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      // Utilisation de `fill-current` avec `text-color` est une bonne pratique
                      className={i < Math.floor(service.rating) ? 'text-amber-300 fill-current' : 'text-white text-opacity-30'}
                    />
                  ))}
                </div>
                <span className="text-sm" aria-hidden="true">({service.reviews} avis)</span>
              </div>
            </div>
          </div>
        </header>

        {/* Contenu principal */}
        <main className="p-8 flex-grow">
          {/* Affiche le contenu spécifique au service s'il existe */}
          {ServiceSpecificContent && <ServiceSpecificContent details={service.details} />}
        </main>

        {/* Pied de page avec CTA */}
        <footer className="p-8 pt-6 border-t border-gray-200">
          <motion.button
            className={`w-full bg-gradient-to-r ${service.color} text-white py-4 rounded-2xl font-bold text-lg hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span>Profiter de ce service</span>
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </footer>
      </motion.div>
    </motion.div>
  );
};


// Why Choose Us Section (style Collection)
const WhyChooseUsSection = () => {
  const features = [
    {
      icon: Award,
      title: "10 ans d'expertise",
      description: "Une expérience reconnue dans la beauté africaine",
      color: 'from-amber-500 to-orange-400'
    },
    {
      icon: Globe,
      title: "Présence internationale",
      description: "Services disponibles dans 15 pays d'Afrique",
      color: 'from-amber-500 to-orange-400'
    },
    {
      icon: Shield,
      title: "Qualité certifiée",
      description: "Services testés et approuvés par nos expertes",
      color: 'from-amber-500 to-orange-400'
    },
    {
      icon: Clock,
      title: "Support 24/7",
      description: "Une équipe dédiée disponible à tout moment",
      color: 'from-amber-500 to-orange-400'
    }
  ]

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Pourquoi choisir nos services ?
          </h2>
          <p className="text-lg text-gray-600">
            Une expertise unique au service de votre beauté
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <motion.div
                className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center shadow-lg`}
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <feature.icon className="w-8 h-8 text-white" />
              </motion.div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Services Grid Component (style Collection)
const ServicesGrid = () => {
  const [activeService, setActiveService] = useState(null)

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Nos Services Premium
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Découvrez notre gamme complète de services beauté pensés pour sublimer votre beauté naturelle
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesData.map((service, index) => (
            <ServiceCard
              key={service.id}
              service={service}
              index={index}
              onServiceClick={setActiveService}
            />
          ))}
        </div>

        {/* Service Modal */}
        <AnimatePresence>
          {activeService && (
            <ServiceModal 
              service={activeService} 
              onClose={() => setActiveService(null)} 
            />
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}

// Testimonials Section (style Collection)
const TestimonialsSection = () => {
  const testimonials = [
    {
      id: 1,
      name: "Aminata Diallo",
      location: "Abidjan, Côte d'Ivoire",
      service: "Programme fidélité",
      comment: "Grâce au programme fidélité, j'ai économisé plus de 200€ cette année ! Les avantages sont vraiment intéressants.",
      rating: 5,
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=150&h=150&fit=crop'
    },
    {
      id: 2,
      name: "Khadija Mamadou",
      location: "Dakar, Sénégal",
      service: "Consultation personnalisée",
      comment: "Les conseils beauté personnalisés ont transformé ma routine. Mon experte m'a aidée à trouver les produits parfaits !",
      rating: 5,
      image: 'https://images.unsplash.com/photo-1534751516642-a1af1ef26a56?w=150&h=150&fit=crop'
    },
    {
      id: 3,
      name: "Fatou Sy",
      location: "Bamako, Mali",
      service: "Service client",
      comment: "Support exceptionnel, réactif et très professionnel. L'équipe est toujours là pour nous aider, je recommande !",
      rating: 5,
      image: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=150&h=150&fit=crop'
    }
  ]

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Ce que disent nos clientes
          </h2>
          <p className="text-lg text-gray-600">
            Découvrez les témoignages de nos clientes satisfaites
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 hover:shadow-xl hover:border-amber-200 transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              {/* Rating */}
              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-amber-400 fill-current" />
                ))}
              </div>

              {/* Comment */}
              <p className="text-gray-700 mb-6 italic leading-relaxed">"{testimonial.comment}"</p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-bold text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.location}</p>
                  <p className="text-xs text-amber-600 font-medium">{testimonial.service}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Newsletter Section (style Collection)
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
            Restez informée de nos nouveaux services
          </h2>
          <p className="text-lg opacity-90 mb-8">
            Soyez la première à découvrir nos innovations beauté et bénéficiez d'offres privilégiées
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
          
          <p className="text-sm opacity-75 mt-4">
            Rejoignez plus de 50,000 femmes qui nous font confiance
          </p>
        </motion.div>
      </div>
    </section>
  )
}

// CTA Section (style Collection)
const CTASection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl p-8 lg:p-12 border border-amber-100">
            <Sparkles className="w-16 h-16 text-amber-500 mx-auto mb-6" />
            
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Prête à découvrir nos services ?
            </h2>
            
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Rejoignez des milliers de femmes qui ont déjà adopté nos services beauté premium
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-lg mx-auto">
              <motion.button
                className="bg-amber-500 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-amber-600 transition-colors flex items-center justify-center gap-2 shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Users className="w-5 h-5" />
                Programme fidélité
              </motion.button>
              
              <motion.button
                className="border-2 border-amber-500 text-amber-600 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-amber-500 hover:text-white transition-colors flex items-center justify-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <MessageCircle className="w-5 h-5" />
                Nous contacter
              </motion.button>
            </div>
            
            <div className="flex items-center justify-center gap-6 mt-8 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Service gratuit</span>
              </div>
              <div className="flex items-center gap-1">
                <Shield className="w-4 h-4 text-blue-500" />
                <span>Données sécurisées</span>
              </div>
              <div className="flex items-center gap-1">
                <Award className="w-4 h-4 text-amber-500" />
                <span>Qualité garantie</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// ============================================
// MAIN COMPONENT
// ============================================

const ServicesPage = memo(() => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="min-h-screen bg-white">
      {/* Services Header */}
      <ServicesHeader />

      {/* Why Choose Us Section */}
      <WhyChooseUsSection />

      {/* Services Grid */}
      <ServicesGrid />

      {/* Testimonials */}
      <TestimonialsSection />

      {/* CTA Section */}
      <CTASection />

      {/* Newsletter */}
      <NewsletterSection />
    </div>
  )
})

ServicesPage.displayName = 'ServicesPage';
export default ServicesPage;