import React, { useState, useEffect, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Heart, 
  ShoppingBag, 
  Share2, 
  Filter,
  SortAsc,
  Grid3X3,
  List,
  Search,
  X,
  Star,
  Plus,
  Minus,
  Eye,
  ArrowLeft,
  Sparkles,
  Crown,
  Gift,
  Trash2,
  ShoppingCart,
  Clock,
  ArrowRight,
  Zap,
  Flame,
  Timer,
  Bell,
  Tag
} from 'lucide-react';

// Données simulées pour les offres exceptionnelles
const exceptionalOffersData = [
  {
    id: 1,
    name: "Sérum Anti-Âge Platinum",
    brand: "Luxe Beauté Africaine",
    price: 79.99,
    originalPrice: 159.99,
    discount: 50,
    rating: 4.9,
    reviews: 287,
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=400&fit=crop",
    category: "Soin du visage",
    inStock: true,
    isFlashSale: true,
    stockLeft: 12,
    soldCount: 156,
    offerEndTime: "2025-08-16T23:59:59",
    isBestseller: true,
    originalStock: 200
  },
  {
    id: 2,
    name: "Collection Rouge Velours Prestige",
    brand: "Atelier Dakar",
    price: 89.99,
    originalPrice: 149.99,
    discount: 40,
    rating: 4.8,
    reviews: 203,
    image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400&h=400&fit=crop",
    category: "Maquillage",
    inStock: true,
    isLimitedTime: true,
    stockLeft: 23,
    soldCount: 89,
    offerEndTime: "2025-08-15T18:30:00",
    isLimitedEdition: true,
    originalStock: 150
  },
  {
    id: 3,
    name: "Coffret Rituel Karité Déluxe",
    brand: "Essence du Sahel",
    price: 69.99,
    originalPrice: 119.99,
    discount: 42,
    rating: 4.7,
    reviews: 145,
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&h=400&fit=crop",
    category: "Soin du corps",
    inStock: true,
    isBundle: true,
    stockLeft: 34,
    soldCount: 67,
    offerEndTime: "2025-08-17T12:00:00",
    originalStock: 100
  },
  {
    id: 4,
    name: "Parfum Signature Ylang Précieux",
    brand: "Maison des Fragrances",
    price: 159.99,
    originalPrice: 269.99,
    discount: 41,
    rating: 4.9,
    reviews: 312,
    image: "https://images.unsplash.com/photo-1588405748880-12d1d2a59d32?w=400&h=400&fit=crop",
    category: "Parfumerie",
    inStock: true,
    isPremium: true,
    stockLeft: 8,
    soldCount: 142,
    offerEndTime: "2025-08-16T14:45:00",
    originalStock: 80
  },
  {
    id: 5,
    name: "Kit Masques Purifiants Premium",
    brand: "Rituel Beauté",
    price: 49.99,
    originalPrice: 89.99,
    discount: 44,
    rating: 4.6,
    reviews: 198,
    image: "https://images.unsplash.com/photo-1556228578-dd6f2c0b6c0b?w=400&h=400&fit=crop",
    category: "Soin du visage",
    inStock: true,
    isFlashSale: true,
    stockLeft: 19,
    soldCount: 123,
    offerEndTime: "2025-08-15T20:15:00",
    originalStock: 120
  },
  {
    id: 6,
    name: "Huile Précieuse Ultime Collection",
    brand: "Trésor d'Afrique",
    price: 99.99,
    originalPrice: 179.99,
    discount: 44,
    rating: 4.8,
    reviews: 267,
    image: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=400&h=400&fit=crop",
    category: "Soin du visage",
    inStock: true,
    isOrganic: true,
    stockLeft: 15,
    soldCount: 178,
    offerEndTime: "2025-08-18T09:30:00",
    originalStock: 200
  },
  {
    id: 7,
    name: "Palette Maquillage Éclat Doré",
    brand: "Studio Beauté",
    price: 39.99,
    originalPrice: 79.99,
    discount: 50,
    rating: 4.5,
    reviews: 156,
    image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&h=400&fit=crop",
    category: "Maquillage",
    inStock: true,
    isFlashSale: true,
    stockLeft: 27,
    soldCount: 94,
    offerEndTime: "2025-08-16T16:20:00",
    originalStock: 150
  },
  {
    id: 8,
    name: "Crème Corps Réparatrice Nuit",
    brand: "Douceur Africaine",
    price: 44.99,
    originalPrice: 74.99,
    discount: 40,
    rating: 4.7,
    reviews: 89,
    image: "https://images.unsplash.com/photo-1570194065650-d99bdd4317b0?w=400&h=400&fit=crop",
    category: "Soin du corps",
    inStock: true,
    stockLeft: 31,
    soldCount: 45,
    offerEndTime: "2025-08-17T22:00:00",
    originalStock: 100
  }
];

const categories = ["Tous", "Soin du visage", "Maquillage", "Soin du corps", "Parfumerie"];
const sortOptions = [
  { value: "discount", label: "Plus grande réduction" },
  { value: "ending-soon", label: "Se termine bientôt" },
  { value: "price-asc", label: "Prix croissant" },
  { value: "price-desc", label: "Prix décroissant" },
  { value: "rating", label: "Mieux notés" },
  { value: "popularity", label: "Plus vendus" }
];

const filterOptions = [
  { value: "all", label: "Toutes les offres" },
  { value: "flash-sale", label: "Ventes flash" },
  { value: "limited-time", label: "Temps limité" },
  { value: "bundle", label: "Coffrets" },
  { value: "premium", label: "Produits premium" }
];

// Composant Timer de compte à rebours
const CountdownTimer = memo(({ endTime, size = "normal" }) => {
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const end = new Date(endTime).getTime();
      const distance = end - now;

      if (distance > 0) {
        setTimeLeft({
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      } else {
        setIsExpired(true);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [endTime]);

  if (isExpired) {
    return (
      <span className="text-xs text-red-500 font-medium">Offre expirée</span>
    );
  }

  const isSmall = size === "small";

  return (
    <div className={`flex items-center gap-1 ${isSmall ? 'text-xs' : 'text-sm'}`}>
      <Clock className={`text-red-500 ${isSmall ? 'w-3 h-3' : 'w-4 h-4'}`} />
      <span className="text-red-600 font-bold">
        {String(timeLeft.hours).padStart(2, '0')}:
        {String(timeLeft.minutes).padStart(2, '0')}:
        {String(timeLeft.seconds).padStart(2, '0')}
      </span>
    </div>
  );
});

const ExceptionalOffersPage = memo(() => {
  const [offers, setOffers] = useState(exceptionalOffersData);
  const [filteredOffers, setFilteredOffers] = useState(exceptionalOffersData);
  const [selectedCategory, setSelectedCategory] = useState("Tous");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [sortBy, setSortBy] = useState("discount");
  const [viewMode, setViewMode] = useState("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [cart, setCart] = useState([]);

  // Filtrage et tri
  useEffect(() => {
    let filtered = [...offers];

    // Filtre par catégorie
    if (selectedCategory !== "Tous") {
      filtered = filtered.filter(item => item.category === selectedCategory);
    }

    // Filtre par type d'offre
    if (selectedFilter !== "all") {
      switch (selectedFilter) {
        case "flash-sale":
          filtered = filtered.filter(item => item.isFlashSale);
          break;
        case "limited-time":
          filtered = filtered.filter(item => item.isLimitedTime);
          break;
        case "bundle":
          filtered = filtered.filter(item => item.isBundle);
          break;
        case "premium":
          filtered = filtered.filter(item => item.isPremium);
          break;
      }
    }

    // Filtre par recherche
    if (searchQuery) {
      filtered = filtered.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.brand.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Tri
    switch (sortBy) {
      case "discount":
        filtered.sort((a, b) => b.discount - a.discount);
        break;
      case "ending-soon":
        filtered.sort((a, b) => new Date(a.offerEndTime) - new Date(b.offerEndTime));
        break;
      case "price-asc":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case "popularity":
        filtered.sort((a, b) => b.soldCount - a.soldCount);
        break;
    }

    setFilteredOffers(filtered);
  }, [offers, selectedCategory, selectedFilter, searchQuery, sortBy]);

  const toggleFavorite = (id) => {
    setFavorites(prev =>
      prev.includes(id)
        ? prev.filter(fav => fav !== id)
        : [...prev, id]
    );
  };

  const addToCart = (product) => {
    setCart(prev => [...prev, product]);
    // Animation ou notification d'ajout au panier
  };

  // Composant OfferCard
  const OfferCard = ({ product }) => {
    const isFavorite = favorites.includes(product.id);
    const stockPercentage = (product.stockLeft / product.originalStock) * 100;
    const soldPercentage = (product.soldCount / product.originalStock) * 100;

    return (
      <motion.div
        className={`group relative bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden ${
          viewMode === 'list' ? 'flex items-center p-4' : 'flex flex-col'
        }`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: viewMode === 'grid' ? 1.02 : 1 }}
        whileTap={{ scale: 0.98 }}
      >
        {/* Boutons d'action */}
        <div className="absolute top-3 right-3 z-10 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-200">
          <motion.button
            className={`p-2 rounded-full shadow-sm transition-all duration-200 ${
              isFavorite ? 'bg-red-50 text-red-500' : 'bg-white text-gray-600 hover:bg-red-50 hover:text-red-500'
            }`}
            onClick={() => toggleFavorite(product.id)}
            whileTap={{ scale: 0.9 }}
          >
            <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
          </motion.button>
          <motion.button
            className="p-2 bg-white rounded-full shadow-sm text-gray-600 hover:bg-gray-50 transition-colors"
            whileTap={{ scale: 0.9 }}
          >
            <Share2 className="w-4 h-4" />
          </motion.button>
        </div>

        {/* Image */}
        <div className={`relative ${viewMode === 'list' ? 'w-24 h-24 mr-4' : 'aspect-square'} overflow-hidden rounded-xl`}>
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          
          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            <span className="px-2 py-0.5 bg-red-500 text-white text-xs rounded-full font-bold">
              -{product.discount}%
            </span>
            {product.isFlashSale && (
              <span className="px-2 py-0.5 bg-orange-500 text-white text-xs rounded-full font-medium flex items-center gap-1">
                <Zap className="w-3 h-3" />
                Flash
              </span>
            )}
            {product.isLimitedTime && (
              <span className="px-2 py-0.5 bg-purple-500 text-white text-xs rounded-full font-medium flex items-center gap-1">
                <Timer className="w-3 h-3" />
                Limité
              </span>
            )}
            {product.isBundle && (
              <span className="px-2 py-0.5 bg-blue-500 text-white text-xs rounded-full font-medium flex items-center gap-1">
                <Gift className="w-3 h-3" />
                Coffret
              </span>
            )}
            {product.isPremium && (
              <span className="px-2 py-0.5 bg-amber-500 text-white text-xs rounded-full font-medium flex items-center gap-1">
                <Crown className="w-3 h-3" />
                Premium
              </span>
            )}
          </div>

          {/* Indicateur de stock faible */}
          {product.stockLeft <= 10 && (
            <div className="absolute bottom-2 left-2">
              <span className="px-2 py-0.5 bg-red-100 text-red-600 text-xs rounded-full font-medium flex items-center gap-1">
                <Flame className="w-3 h-3" />
                Plus que {product.stockLeft}
              </span>
            </div>
          )}
        </div>

        {/* Contenu */}
        <div className={`${viewMode === 'list' ? 'flex-1' : 'p-4'}`}>
          <div className="flex items-start justify-between mb-2">
            <div className="flex-1">
              <p className="text-xs text-gray-500 mb-1">{product.brand}</p>
              <h3 className="font-semibold text-gray-900 text-sm leading-tight line-clamp-2">
                {product.name}
              </h3>
            </div>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-1 mb-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={12}
                  className={`${
                    i < Math.floor(product.rating) 
                      ? 'text-amber-400 fill-current' 
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-gray-500">
              {product.rating} ({product.reviews})
            </span>
          </div>

          {/* Prix */}
          <div className="flex items-center gap-2 mb-2">
            <span className="font-bold text-red-600 text-lg">{product.price}€</span>
            <span className="text-sm text-gray-400 line-through">
              {product.originalPrice}€
            </span>
            <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full font-medium">
              Économie: {(product.originalPrice - product.price).toFixed(2)}€
            </span>
          </div>

          {/* Compte à rebours */}
          <div className="mb-3">
            <CountdownTimer endTime={product.offerEndTime} size="small" />
          </div>

          {/* Barre de progression du stock */}
          <div className="mb-3">
            <div className="flex justify-between text-xs text-gray-500 mb-1">
              <span>{product.soldCount} vendus</span>
              <span>{product.stockLeft} restants</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-red-500 to-orange-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${soldPercentage}%` }}
              ></div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <motion.button
              className="flex-1 px-3 py-2 bg-red-500 text-white rounded-xl font-medium text-sm hover:bg-red-600 transition-all duration-200 flex items-center justify-center gap-1"
              onClick={() => addToCart(product)}
              whileTap={{ scale: 0.98 }}
            >
              <ShoppingCart className="w-4 h-4" />
              Ajouter
            </motion.button>
            <motion.button
              className="p-2 border border-gray-200 rounded-xl hover:border-red-500 transition-colors"
              whileTap={{ scale: 0.9 }}
            >
              <Eye className="w-4 h-4 text-gray-600" />
            </motion.button>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header avec animation d'arrière-plan */}
      <div className="bg-gradient-to-r from-red-500 via-orange-500 to-amber-500 relative overflow-hidden">
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-6">
            <div className="flex items-center gap-4">
              <motion.button
                className="p-2 hover:bg-white hover:bg-opacity-20 rounded-xl transition-colors"
                whileTap={{ scale: 0.9 }}
              >
                <ArrowLeft className="w-5 h-5 text-white" />
              </motion.button>
              <div>
                <motion.h1 
                  className="text-2xl md:text-3xl font-bold text-white flex items-center gap-3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <div className="relative">
                    <Sparkles className="w-7 h-7 text-amber-300" />
                    <motion.div
                      className="absolute inset-0"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    >
                      <Sparkles className="w-7 h-7 text-white opacity-50" />
                    </motion.div>
                  </div>
                  Offres Exceptionnelles
                </motion.h1>
                <motion.p 
                  className="text-white text-opacity-90 text-sm md:text-base"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  Jusqu'à -50% sur une sélection exclusive - Stocks limités
                </motion.p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <motion.button
                className="p-2 hover:bg-white hover:bg-opacity-20 rounded-xl transition-colors"
                onClick={() => setShowFilters(!showFilters)}
                whileTap={{ scale: 0.9 }}
              >
                <Filter className="w-5 h-5 text-white" />
              </motion.button>
              
              <div className="flex items-center bg-white bg-opacity-20 rounded-xl p-1">
                <motion.button
                  className={`p-1.5 rounded-lg transition-all duration-200 ${
                    viewMode === 'grid' ? 'bg-white bg-opacity-30' : 'hover:bg-white hover:bg-opacity-20'
                  }`}
                  onClick={() => setViewMode('grid')}
                  whileTap={{ scale: 0.9 }}
                >
                  <Grid3X3 className="w-4 h-4 text-white" />
                </motion.button>
                <motion.button
                  className={`p-1.5 rounded-lg transition-all duration-200 ${
                    viewMode === 'list' ? 'bg-white bg-opacity-30' : 'hover:bg-white hover:bg-opacity-20'
                  }`}
                  onClick={() => setViewMode('list')}
                  whileTap={{ scale: 0.9 }}
                >
                  <List className="w-4 h-4 text-white" />
                </motion.button>
              </div>
            </div>
          </div>
        </div>

        {/* Particules d'animation */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-white bg-opacity-30 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [-20, -100],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
      </div>

      {/* Timer global */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="text-center">
            <motion.div
              className="inline-flex items-center gap-4 px-6 py-3 rounded-full bg-red-50 border border-red-200"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
            >
              <Bell className="text-red-500 w-5 h-5" />
              <span className="text-red-600 font-medium">Offres valables jusqu'à épuisement des stocks</span>
              <div className="flex gap-4 items-center">
                <div className="text-center">
                  <div className="text-xl font-bold text-red-600">23</div>
                  <div className="text-xs text-gray-600">H</div>
                </div>
                <span className="text-red-500 text-xl">:</span>
                <div className="text-center">
                  <div className="text-xl font-bold text-red-600">47</div>
                  <div className="text-xs text-gray-600">M</div>
                </div>
                <span className="text-red-500 text-xl">:</span>
                <div className="text-center">
                  <div className="text-xl font-bold text-red-600">12</div>
                  <div className="text-xs text-gray-600">S</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Filtres et recherche */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            className="bg-white border-b border-gray-100"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
              <div className="flex flex-col sm:flex-row gap-4">
                {/* Barre de recherche */}
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Rechercher dans les offres..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  {searchQuery && (
                    <button
                      className="absolute right-3 top-1/2 transform -translate-y-1/2"
                      onClick={() => setSearchQuery("")}
                    >
                      <X className="w-4 h-4 text-gray-400" />
                    </button>
                  )}
                </div>

                {/* Filtres par catégorie */}
                <div className="flex gap-2 overflow-x-auto">
                  {categories.map(category => (
                    <motion.button
                      key={category}
                      className={`px-4 py-2 rounded-xl font-medium text-sm whitespace-nowrap transition-all duration-200 ${
                        selectedCategory === category
                          ? 'bg-red-500 text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                      onClick={() => setSelectedCategory(category)}
                      whileTap={{ scale: 0.98 }}
                    >
                      {category}
                    </motion.button>
                  ))}
                </div>

                {/* Filtres par type d'offre */}
                <select
                  className="px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  value={selectedFilter}
                  onChange={(e) => setSelectedFilter(e.target.value)}
                >
                  {filterOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>

                {/* Tri */}
                <select
                  className="px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  {sortOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Statistiques des offres */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="text-sm text-gray-600">
                <span className="font-semibold text-red-600">{filteredOffers.length}</span> offre{filteredOffers.length > 1 ? 's' : ''} exceptionnelle{filteredOffers.length > 1 ? 's' : ''}
              </div>
              <div className="text-sm text-gray-600">
                <span className="font-semibold text-green-600">
                  {filteredOffers.reduce((acc, offer) => acc + (offer.originalPrice - offer.price), 0).toFixed(2)}€
                </span> d'économies totales possibles
              </div>
            </div>
            
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Tag className="w-4 h-4" />
              <span>Mise à jour il y a 2 min</span>
            </div>
          </div>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {filteredOffers.length === 0 ? (
          <motion.div
            className="text-center py-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="relative mb-6">
              <Sparkles className="w-16 h-16 text-gray-300 mx-auto" />
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="w-12 h-12 text-gray-200" />
              </motion.div>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {searchQuery || selectedCategory !== "Tous" || selectedFilter !== "all"
                ? "Aucune offre trouvée" 
                : "Aucune offre disponible"
              }
            </h3>
            <p className="text-gray-500 mb-6">
              {searchQuery || selectedCategory !== "Tous" || selectedFilter !== "all"
                ? "Essayez de modifier vos critères de recherche"
                : "Revenez bientôt pour découvrir nos nouvelles offres exceptionnelles"
              }
            </p>
            <motion.button
              className="px-6 py-3 bg-red-500 text-white rounded-xl font-medium hover:bg-red-600 transition-colors"
              whileTap={{ scale: 0.98 }}
            >
              Découvrir nos produits
            </motion.button>
          </motion.div>
        ) : (
          <>
            {/* Grille des offres */}
            <motion.div
              className={`${
                viewMode === 'grid' 
                  ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' 
                  : 'space-y-4'
              }`}
              layout
            >
              <AnimatePresence mode="popLayout">
                {filteredOffers.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <OfferCard product={product} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            {/* Section offres spéciales */}
            <motion.div
              className="mt-12 pt-8 border-t border-gray-200"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <div className="text-center mb-8">
                <motion.h2 
                  className="text-2xl font-bold text-gray-900 mb-2 flex items-center justify-center gap-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <Flame className="w-6 h-6 text-red-500" />
                  Offres Flash - Dernières Heures
                </motion.h2>
                <motion.p 
                  className="text-gray-600"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  Ces offres se terminent dans quelques heures
                </motion.p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {filteredOffers
                  .filter(offer => offer.isFlashSale)
                  .slice(0, 3)
                  .map((product, index) => (
                    <motion.div
                      key={`flash-${product.id}`}
                      className="relative bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl border-2 border-red-200 p-4"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="absolute top-2 right-2">
                        <motion.div
                          className="w-3 h-3 bg-red-500 rounded-full"
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 1, repeat: Infinity }}
                        />
                      </div>
                      
                      <div className="flex items-center gap-3 mb-3">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-16 h-16 rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 text-sm line-clamp-2">
                            {product.name}
                          </h4>
                          <p className="text-xs text-gray-500">{product.brand}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-red-600">{product.price}€</span>
                          <span className="text-xs text-gray-400 line-through">
                            {product.originalPrice}€
                          </span>
                        </div>
                        <span className="text-xs bg-red-500 text-white px-2 py-1 rounded-full font-bold">
                          -{product.discount}%
                        </span>
                      </div>
                      
                      <CountdownTimer endTime={product.offerEndTime} size="small" />
                      
                      <motion.button
                        className="w-full mt-3 px-3 py-2 bg-red-500 text-white rounded-xl font-medium text-sm hover:bg-red-600 transition-colors"
                        whileTap={{ scale: 0.98 }}
                      >
                        Acheter maintenant
                      </motion.button>
                    </motion.div>
                  ))}
              </div>

              {/* Newsletter offres */}
              <motion.div
                className="bg-gradient-to-r from-amber-500 to-red-500 rounded-2xl p-6 text-center text-white"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <h3 className="text-xl font-bold mb-2 flex items-center justify-center gap-2">
                  <Bell className="w-5 h-5" />
                  Ne ratez plus aucune offre !
                </h3>
                <p className="mb-4 text-white text-opacity-90">
                  Inscrivez-vous pour être alerté des nouvelles offres exceptionnelles
                </p>
                <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                  <input
                    type="email"
                    placeholder="Votre email"
                    className="flex-1 px-4 py-2 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
                  />
                  <motion.button
                    className="px-6 py-2 bg-white text-red-500 rounded-xl font-medium hover:bg-gray-100 transition-colors"
                    whileTap={{ scale: 0.98 }}
                  >
                    S'abonner
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}

        {/* Section recommandations basées sur les offres */}
        {filteredOffers.length > 0 && (
          <motion.div
            className="mt-12 pt-8 border-t border-gray-200"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center justify-center gap-2">
                <Gift className="w-6 h-6 text-amber-500" />
                Offres Similaires
              </h2>
              <p className="text-gray-600">D'autres offres qui pourraient vous intéresser</p>
            </div>
            
            <motion.button
              className="w-full py-4 border-2 border-dashed border-gray-300 rounded-2xl text-gray-500 hover:border-red-500 hover:text-red-600 transition-all duration-200 flex items-center justify-center gap-2"
              whileTap={{ scale: 0.98 }}
            >
              <ArrowRight className="w-5 h-5" />
              Découvrir plus d'offres exceptionnelles
            </motion.button>
          </motion.div>
        )}
      </div>

      {/* Bouton flottant de panier */}
      <AnimatePresence>
        {cart.length > 0 && (
          <motion.div
            className="fixed bottom-6 right-6 z-50"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
          >
            <motion.button
              className="relative p-4 bg-red-500 text-white rounded-full shadow-lg hover:bg-red-600 transition-colors"
              whileTap={{ scale: 0.9 }}
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <ShoppingCart className="w-6 h-6" />
              <span className="absolute -top-2 -right-2 w-6 h-6 bg-amber-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
                {cart.length}
              </span>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});

export default ExceptionalOffersPage;