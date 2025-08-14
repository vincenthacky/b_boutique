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
  X,
  ThumbsUp,
  Verified,
  Timer,
  Gift as GiftIcon,
  CreditCard as PaymentIcon,
  Truck as ShippingIcon,
  MessageSquare,
  UserPlus,
  Settings
} from 'lucide-react';

// ============================================
// DATA
// ============================================

const servicesData = [
  {
    id: 1,
    icon: Users,
    title: 'Programme de fidélité Be',
    description: 'Rejoignez notre programme de fidélité exclusif et gagnez des points à chaque achat pour débloquer des récompenses exceptionnelles.',
    benefits: [
      '1€ dépensé = 1 point gagné',
      '100 points = 5€ de réduction automatique',
      'Accès prioritaire aux ventes privées',
      'Cadeaux d\'anniversaire personnalisés',
      'Livraison gratuite dès le niveau Gold',
      'Conseillère beauté dédiée niveau Platine'
    ],
    color: 'from-purple-600 to-purple-500',
    bgColor: 'bg-purple-50',
    textColor: 'text-purple-600',
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=90',
    badge: 'POPULAIRE',
    badgeColor: 'bg-purple-500',
    rating: 4.9,
    reviews: 1247,
    why: 'Le seul programme qui récompense vraiment votre fidélité avec des avantages tangibles dès le premier achat.',
    levels: [
      { name: 'Bronze', threshold: '0€', perks: 'Points de base + newsletter exclusive', color: 'from-orange-500 to-orange-400' },
      { name: 'Argent', threshold: '100€', perks: 'Bonus +20% points + avant-premières', color: 'from-gray-400 to-gray-500' },
      { name: 'Or', threshold: '300€', perks: 'Bonus +50% points + livraison gratuite', color: 'from-yellow-400 to-yellow-500' },
      { name: 'Platine', threshold: '600€', perks: 'Bonus +100% points + conseillère dédiée', color: 'from-purple-600 to-purple-500' }
    ]
  },
  {
    id: 2,
    icon: UserCheck,
    title: 'Consultation beauté personnalisée',
    description: 'Bénéficiez d\'un diagnostic beauté complet et personnalisé réalisé par nos expertes certifiées pour créer votre routine idéale.',
    benefits: [
      'Diagnostic beauté personnalisé approfondi',
      'Routine sur-mesure par nos expertes certifiées',
      'Conseils d\'application en vidéo exclusive',
      'Suivi mensuel de votre évolution beauté',
      'Box beauté personnalisée chaque trimestre',
      'Accès VIP à notre communauté beauté'
    ],
    color: 'from-pink-600 to-rose-500',
    bgColor: 'bg-pink-50',
    textColor: 'text-pink-600',
    image: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=800&q=90',
    badge: 'EXPERT',
    badgeColor: 'bg-pink-500',
    rating: 4.8,
    reviews: 892,
    why: 'La seule consultation qui s\'adapte réellement à votre peau africaine avec un suivi personnalisé.'
  },
  {
    id: 3,
    icon: Gift,
    title: 'Cartes cadeaux Be',
    description: 'Offrez le cadeau parfait avec nos cartes cadeaux personnalisables valables sur tout notre catalogue premium.',
    benefits: [
      'Valable 12 mois sans aucune restriction',
      'Utilisable en plusieurs fois selon vos envies',
      'Design personnalisable pour chaque occasion',
      'Envoi instantané par email sécurisé',
      'Emballage cadeau premium offert',
      'Notification de livraison au destinataire'
    ],
    color: 'from-green-600 to-emerald-500',
    bgColor: 'bg-green-50',
    textColor: 'text-green-600',
    image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800&q=90',
    badge: 'CADEAU',
    badgeColor: 'bg-green-500',
    rating: 4.7,
    reviews: 2156,
    why: 'Le seul système de carte cadeau qui garantit le choix parfait avec notre vaste sélection premium.'
  },
  {
    id: 4,
    icon: CreditCard,
    title: 'Paiement ultra-sécurisé',
    description: 'Payez en toute sérénité avec nos solutions de paiement adaptées à l\'Afrique, sécurisées et sans frais cachés.',
    benefits: [
      'Paiement par carte bancaire international',
      'Mobile Money (Orange, MTN, Moov)',
      'Virement bancaire BCEAO sécurisé',
      'Paiement en 3x sans frais dès 100€',
      'Cryptage SSL 256 bits maximum',
      'Aucune donnée stockée sur nos serveurs'
    ],
    color: 'from-blue-600 to-indigo-500',
    bgColor: 'bg-blue-50',
    textColor: 'text-blue-600',
    image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&q=90',
    badge: 'SÉCURISÉ',
    badgeColor: 'bg-blue-500',
    rating: 4.9,
    reviews: 3421,
    why: 'La seule plateforme qui accepte tous les moyens de paiement africains avec une sécurité maximale.'
  },
  {
    id: 5,
    icon: Truck,
    title: 'Livraison express garantie',
    description: 'Recevez vos commandes rapidement partout en Afrique avec notre réseau logistique optimisé et suivi en temps réel.',
    benefits: [
      'Livraison 24h à Abidjan garantie',
      'Livraison 48h en Côte d\'Ivoire',
      'Réseau dans 15 pays africains',
      'Suivi temps réel de votre commande',
      'Emballage soigné et sécurisé',
      'Livraison gratuite selon votre niveau'
    ],
    color: 'from-orange-600 to-red-500',
    bgColor: 'bg-orange-50',
    textColor: 'text-orange-600',
    image: 'https://images.unsplash.com/photo-1586880244386-8b3e34c8382c?w=800&q=90',
    badge: 'EXPRESS',
    badgeColor: 'bg-orange-500',
    rating: 4.8,
    reviews: 1876,
    why: 'Le seul service qui garantit une livraison rapide dans toute l\'Afrique avec suivi complet.'
  },
  {
    id: 6,
    icon: Headphones,
    title: 'Support client exceptionnel',
    description: 'Bénéficiez d\'un accompagnement personnalisé 24h/24 par notre équipe d\'expertes multilingues dédiées.',
    benefits: [
      'Support 24h/24, 7j/7 disponible',
      'Équipe multilingue (Français, Anglais)',
      'Chat en direct instantané',
      'WhatsApp Business certifié',
      'Résolution sous 1h garantie',
      'Conseils beauté personnalisés inclus'
    ],
    color: 'from-teal-600 to-cyan-500',
    bgColor: 'bg-teal-50',
    textColor: 'text-teal-600',
    image: 'https://images.unsplash.com/photo-1553484771-371a605b060b?w=800&q=90',
    badge: '24/7',
    badgeColor: 'bg-teal-500',
    rating: 4.9,
    reviews: 2847,
    why: 'Le seul support qui vous accompagne vraiment avec des conseils beauté en plus de l\'aide technique.'
  }
];

// ============================================
// COMPONENTS
// ============================================

// Service Card Component - Style spécifique aux services
const ServiceCard = ({ service, index, onServiceClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div className={`relative bg-white rounded-3xl overflow-hidden border-2 border-gray-100 hover:border-opacity-50 transition-all duration-500 group ${service.bgColor} hover:shadow-2xl`}>
        
        {/* Badge Premium */}
        <div className="absolute top-6 right-6 z-10">
          <span className={`px-4 py-2 ${service.badgeColor} text-white text-sm font-bold rounded-full shadow-lg`}>
            {service.badge}
          </span>
        </div>

        {/* Header avec icône */}
        <div className={`relative p-8 bg-gradient-to-br ${service.color} text-white`}>
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white bg-opacity-20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                <service.icon className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-2">{service.title}</h3>
                <div className="flex items-center gap-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      className={i < Math.floor(service.rating) ? 'text-yellow-300 fill-current' : 'text-white text-opacity-30'}
                    />
                  ))}
                  <span className="text-sm opacity-90">({service.reviews})</span>
                </div>
              </div>
            </div>
          </div>
          
          <p className="text-white text-opacity-95 leading-relaxed">
            {service.description}
          </p>
        </div>

        {/* Contenu principal */}
        <div className="p-8">
          {/* Pourquoi nous choisir */}
          <div className="mb-6">
            <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
              <Sparkles className={`w-5 h-5 ${service.textColor}`} />
              Pourquoi nous choisir ?
            </h4>
            <p className={`text-sm ${service.textColor} bg-white p-4 rounded-xl border-l-4 italic`} style={{ borderLeftColor: service.color.split(' ')[1] }}>
              {service.why}
            </p>
          </div>

          {/* Avantages */}
          <div className="mb-6">
            <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <CheckCircle className={`w-5 h-5 ${service.textColor}`} />
              Ce que vous obtenez
            </h4>
            <div className="space-y-3">
              {service.benefits.map((benefit, idx) => (
                <motion.div
                  key={idx}
                  className="flex items-start gap-3 p-3 bg-white rounded-xl hover:shadow-md transition-all duration-300"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * idx }}
                >
                  <div className={`w-6 h-6 rounded-full bg-gradient-to-r ${service.color} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                    <CheckCircle className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-gray-700 text-sm leading-relaxed">{benefit}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="text-center p-4 bg-white rounded-xl border">
              <div className={`text-2xl font-bold ${service.textColor}`}>{service.rating}/5</div>
              <div className="text-xs text-gray-500">Satisfaction</div>
            </div>
            <div className="text-center p-4 bg-white rounded-xl border">
              <div className={`text-2xl font-bold ${service.textColor}`}>{service.reviews.toLocaleString()}</div>
              <div className="text-xs text-gray-500">Avis clients</div>
            </div>
          </div>

          {/* CTA */}
          <motion.button
            className={`w-full py-4 bg-gradient-to-r ${service.color} text-white rounded-2xl font-bold text-lg hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onServiceClick(service)}
          >
            <service.icon className="w-5 h-5" />
            <span>Profiter maintenant</span>
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </div>

        {/* Effet de hover */}
        <motion.div
          className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 pointer-events-none`}
          animate={{ opacity: isHovered ? 0.05 : 0 }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </motion.div>
  );
};

// Services Header Component
const ServicesHeader = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const heroImages = [
    'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1400&h=800&fit=crop&q=90',
    'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=1400&h=800&fit=crop&q=90',
    'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=1400&h=800&fit=crop&q=90'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [heroImages.length]);

  return (
    <section className="relative h-[70vh] lg:h-[80vh] overflow-hidden">
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
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900 via-purple-800 to-pink-800 opacity-85" />
        <div className="absolute inset-0 bg-black bg-opacity-20" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Breadcrumb */}
              <nav className="mb-8">
                <div className="flex items-center space-x-2 text-sm">
                  <span className="hover:text-yellow-300 transition-colors cursor-pointer">Accueil</span>
                  <ArrowRight size={16} />
                  <span className="text-yellow-300">Nos Services</span>
                </div>
              </nav>

              {/* Main Content */}
              <div className="mb-8">
                <span className="inline-flex items-center px-4 py-2 bg-white bg-opacity-20 backdrop-blur-sm rounded-full text-sm font-medium mb-6">
                  <Crown size={18} className="mr-2" />
                  Services Premium Exclusifs
                </span>
                <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
                  Ce qui nous rend<br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-300">Uniques</span>
                </h1>
                <p className="text-xl lg:text-2xl text-gray-200 mb-8 leading-relaxed max-w-3xl">
                  Découvrez pourquoi plus de 50,000 femmes nous font confiance avec des services pensés spécialement pour la beauté africaine
                </p>
              </div>

              {/* Key Differentiators */}
              <div className="grid md:grid-cols-3 gap-6 mb-10">
                <div className="flex items-center gap-3 bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-4">
                  <Shield className="w-8 h-8 text-yellow-300" />
                  <div>
                    <div className="font-bold">100% Sécurisé</div>
                    <div className="text-sm opacity-80">Paiements protégés</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-4">
                  <Globe className="w-8 h-8 text-yellow-300" />
                  <div>
                    <div className="font-bold">15 Pays Couverts</div>
                    <div className="text-sm opacity-80">Livraison Afrique</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-4">
                  <Clock className="w-8 h-8 text-yellow-300" />
                  <div>
                    <div className="font-bold">Support 24/7</div>
                    <div className="text-sm opacity-80">Toujours là pour vous</div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4">
                <button className="px-8 py-4 bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-900 rounded-full font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center gap-2">
                  <Eye size={20} />
                  Découvrir tous nos services
                </button>
                <button className="px-8 py-4 border-2 border-white text-white rounded-full font-bold text-lg hover:bg-white hover:text-gray-900 transition-all duration-300 flex items-center gap-2">
                  <Users size={20} />
                  Rejoindre le programme
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Gallery Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentImageIndex ? 'bg-white w-8' : 'bg-white bg-opacity-50 w-2'
            }`}
          />
        ))}
      </div>
    </section>
  );
};

// Service Modal Component
const ServiceModal = ({ service, onClose }) => {
  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className={`relative bg-gradient-to-br ${service.color} p-8 text-white`}>
          <button
            className="absolute top-4 right-4 p-2 hover:bg-white hover:bg-opacity-20 rounded-xl transition-colors"
            onClick={onClose}
          >
            <X className="w-6 h-6" />
          </button>
          
          <div className="flex items-center gap-6 mb-6">
            <div className="w-20 h-20 bg-white bg-opacity-20 rounded-3xl flex items-center justify-center">
              <service.icon className="w-10 h-10" />
            </div>
            <div>
              <h2 className="text-4xl font-bold mb-2">{service.title}</h2>
              <p className="text-white text-opacity-90 text-lg">{service.description}</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 space-y-8">
          {/* Pourquoi ce service */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Sparkles className={`w-6 h-6 ${service.textColor}`} />
              Pourquoi ce service est unique
            </h3>
            <p className={`text-lg ${service.textColor} bg-gradient-to-r ${service.color} bg-opacity-10 p-6 rounded-2xl border-l-4`}>
              {service.why}
            </p>
          </div>

          {/* Tous les avantages */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Tous les avantages inclus</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {service.benefits.map((benefit, idx) => (
                <div key={idx} className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
                  <div className={`w-6 h-6 rounded-full bg-gradient-to-r ${service.color} flex items-center justify-center flex-shrink-0 mt-1`}>
                    <CheckCircle className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-gray-700">{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Niveaux pour le programme fidélité */}
          {service.levels && (
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Niveaux de fidélité</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {service.levels.map((level, idx) => (
                  <div key={idx} className={`p-6 bg-gradient-to-br ${level.color} text-white rounded-2xl`}>
                    <h4 className="text-xl font-bold mb-2">{level.name}</h4>
                    <p className="text-sm opacity-90 mb-4">Dès {level.threshold}</p>
                    <p className="text-sm">{level.perks}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer CTA */}
        <div className="p-8 pt-0">
          <motion.button
            className={`w-full bg-gradient-to-r ${service.color} text-white py-4 rounded-2xl font-bold text-lg hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <service.icon className="w-5 h-5" />
            <span>Commencer maintenant</span>
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Why Choose Us Section
const WhyChooseUsSection = () => {
  const features = [
    {
      icon: Award,
      title: "Expertise 10 ans",
      description: "Une décennie d'expérience dans la beauté africaine avec des milliers de clientes satisfaites",
      color: 'from-amber-500 to-orange-400',
      stats: "50k+ clientes"
    },
    {
      icon: Globe,
      title: "Couverture Afrique",
      description: "Le seul service beauté présent dans 15 pays africains avec une logistique optimisée",
      color: 'from-blue-500 to-cyan-400',
      stats: "15 pays"
    },
    {
      icon: Shield,
      title: "Sécurité maximale",
      description: "Certification internationale et protection totale de vos données et paiements",
      color: 'from-green-500 to-emerald-400',
      stats: "100% sécurisé"
    },
    {
      icon: Clock,
      title: "Disponibilité totale",
      description: "Support multilingue 24h/24 avec résolution garantie sous 1 heure",
      color: 'from-purple-500 to-pink-400',
      stats: "< 1h réponse"
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Pourquoi Be est <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">différent</span> ?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Ce qui nous distingue des autres et fait de nous le choix préféré de milliers de femmes africaines
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="text-center group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <motion.div
                className={`w-20 h-20 mx-auto mb-6 rounded-3xl bg-gradient-to-r ${feature.color} flex items-center justify-center shadow-lg group-hover:shadow-2xl transition-all duration-300`}
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <feature.icon className="w-10 h-10 text-white" />
              </motion.div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600 mb-4 leading-relaxed">{feature.description}</p>
              <div className={`inline-block px-4 py-2 bg-gradient-to-r ${feature.color} text-white rounded-full text-sm font-bold`}>
                {feature.stats}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Services Grid Component
const ServicesGrid = () => {
  const [activeService, setActiveService] = useState(null);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Nos Services <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">Premium</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Chaque service a été pensé pour répondre aux besoins spécifiques de la femme africaine moderne
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
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
  );
};

// Testimonials Section
const TestimonialsSection = () => {
  const testimonials = [
    {
      id: 1,
      name: "Aminata Diallo",
      location: "Abidjan, Côte d'Ivoire",
      service: "Programme fidélité",
      comment: "En 6 mois, j'ai économisé plus de 150€ grâce au programme fidélité ! Les avantages VIP sont exceptionnels et le service client répond vraiment en moins d'une heure.",
      rating: 5,
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=150&h=150&fit=crop',
      verified: true
    },
    {
      id: 2,
      name: "Khadija Mamadou",
      location: "Dakar, Sénégal", 
      service: "Consultation personnalisée",
      comment: "La consultation beauté a complètement transformé ma routine ! Mon experte comprend vraiment les spécificités de ma peau noire et mes conseils sont parfaits.",
      rating: 5,
      image: 'https://images.unsplash.com/photo-1534751516642-a1af1ef26a56?w=150&h=150&fit=crop',
      verified: true
    },
    {
      id: 3,
      name: "Fatou Sy",
      location: "Bamako, Mali",
      service: "Livraison express",
      comment: "Incroyable ! Commandé un dimanche soir à Bamako, livré le mardi matin. Le suivi en temps réel et l'emballage soigné font vraiment la différence.",
      rating: 5,
      image: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=150&h=150&fit=crop',
      verified: true
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Elles nous font <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">confiance</span>
          </h2>
          <p className="text-xl text-gray-600">
            Découvrez les témoignages authentiques de nos clientes dans toute l'Afrique
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100 hover:shadow-2xl hover:border-purple-200 transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              {/* Rating */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                {testimonial.verified && (
                  <div className="flex items-center gap-1 text-green-600">
                    <Verified className="w-4 h-4" />
                    <span className="text-xs font-medium">Vérifié</span>
                  </div>
                )}
              </div>

              {/* Comment */}
              <p className="text-gray-700 mb-6 italic leading-relaxed text-lg">"{testimonial.comment}"</p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-14 h-14 rounded-full object-cover border-2 border-purple-200"
                />
                <div>
                  <p className="font-bold text-gray-900 text-lg">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.location}</p>
                  <p className="text-xs text-purple-600 font-medium bg-purple-100 px-2 py-1 rounded-full inline-block mt-1">
                    {testimonial.service}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust indicators */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">50,000+</div>
              <div className="text-gray-600">Clientes satisfaites</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">4.8/5</div>
              <div className="text-gray-600">Note moyenne</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">15</div>
              <div className="text-gray-600">Pays couverts</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">10</div>
              <div className="text-gray-600">Années d'expérience</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// CTA Section
const CTASection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-purple-900 via-purple-800 to-pink-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-white"
        >
          <Crown className="w-16 h-16 mx-auto mb-8 text-yellow-300" />
          
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Prête à vivre<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-300">l'expérience Be ?</span>
          </h2>
          
          <p className="text-2xl text-gray-200 mb-12 max-w-3xl mx-auto leading-relaxed">
            Rejoignez les milliers de femmes qui ont déjà choisi l'excellence avec nos services premium
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center max-w-2xl mx-auto mb-12">
            <motion.button
              className="bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-900 px-10 py-5 rounded-2xl font-bold text-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-3"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Users className="w-6 h-6" />
              Rejoindre le programme fidélité
            </motion.button>
            
            <motion.button
              className="border-2 border-white text-white px-10 py-5 rounded-2xl font-bold text-xl hover:bg-white hover:text-gray-900 transition-all duration-300 flex items-center justify-center gap-3"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <MessageCircle className="w-6 h-6" />
              Parler à un expert
            </motion.button>
          </div>
          
          <div className="flex items-center justify-center gap-8 text-lg">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-6 h-6 text-green-400" />
              <span>Inscription gratuite</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-6 h-6 text-blue-400" />
              <span>100% sécurisé</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-6 h-6 text-yellow-400" />
              <span>Satisfaction garantie</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Newsletter Section
const NewsletterSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-gray-50 to-purple-50 rounded-3xl p-12 border border-purple-100"
        >
          <Mail className="w-16 h-16 text-purple-600 mx-auto mb-6" />
          
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Restez connectée à l'innovation beauté
          </h2>
          
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Soyez la première informée de nos nouveaux services, conseils beauté exclusifs et offres privilégiées
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto mb-6">
            <input
              type="email"
              placeholder="Votre adresse email"
              className="flex-1 px-6 py-4 rounded-2xl border border-gray-300 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            />
            <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl font-bold hover:shadow-lg transition-all duration-300">
              S'abonner
            </button>
          </div>
          
          <div className="flex items-center justify-center gap-6 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              <span>50,000+ abonnées</span>
            </div>
            <div className="flex items-center gap-1">
              <Lock className="w-4 h-4" />
              <span>Pas de spam</span>
            </div>
            <div className="flex items-center gap-1">
              <Gift className="w-4 h-4" />
              <span>Offres exclusives</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// ============================================
// MAIN COMPONENT
// ============================================

const ServicesPage = memo(() => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
  );
});

ServicesPage.displayName = 'ServicesPage';
export default ServicesPage;