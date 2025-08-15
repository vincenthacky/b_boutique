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
  Tag,
  Award,
  Calendar,
  TrendingUp,
  Users,
  Badge,
  Palette,
  Scissors
} from 'lucide-react';

// Données simulées pour les nouveaux produits
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
    category: 'Femme',
    addedDate: '2025-08-15',
    isTrending: true,
    description: 'Robe élégante en tissu Ankara authentique, coupe moderne',
    materials: ['Coton Ankara', 'Doublure soie'],
    colors: ['Rouge', 'Bleu', 'Vert'],
    sizes: ['S', 'M', 'L', 'XL'],
    inStock: true,
    stockCount: 15,
    isFeatured: true
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
    category: 'Homme',
    addedDate: '2025-08-14',
    description: 'Chemise en batik traditionnel, finitions premium',
    materials: ['Coton batik', 'Boutons nacre'],
    colors: ['Indigo', 'Marron', 'Beige'],
    sizes: ['M', 'L', 'XL', 'XXL'],
    inStock: true,
    stockCount: 22,
    isHandmade: true
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
    category: 'Bijoux',
    addedDate: '2025-08-13',
    isExclusive: true,
    description: 'Collier traditionnel Baoulé fait main avec perles authentiques',
    materials: ['Perles bronze', 'Fil coton'],
    colors: ['Bronze', 'Doré'],
    inStock: true,
    stockCount: 8,
    isLimitedEdition: true
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
    category: 'Homme',
    addedDate: '2025-08-12',
    isPremium: true,
    description: 'Boubou traditionnel brodé main, pièce d\'exception',
    materials: ['Coton brodé', 'Fils dorés'],
    colors: ['Blanc', 'Crème', 'Beige'],
    sizes: ['M', 'L', 'XL'],
    inStock: true,
    stockCount: 5,
    isFeatured: true
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
    category: 'Accessoires',
    addedDate: '2025-08-11',
    description: 'Sac élégant en tissu wax avec finitions cuir',
    materials: ['Tissu Wax', 'Cuir véritable'],
    colors: ['Multicolore', 'Rouge', 'Bleu'],
    inStock: true,
    stockCount: 18,
    isTrending: true
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
    category: 'Textile',
    addedDate: '2025-08-10',
    isEcoFriendly: true,
    description: 'Pagne teint artisanalement avec teintures naturelles',
    materials: ['Coton bio', 'Teintures végétales'],
    colors: ['Terre de Sienne', 'Ocre', 'Indigo'],
    inStock: true,
    stockCount: 25,
    isHandmade: true
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
    category: 'Bijoux',
    addedDate: '2025-08-09',
    description: 'Bracelet traditionnel en perles colorées fait main',
    materials: ['Perles verre', 'Fil élastique'],
    colors: ['Multicolore', 'Rouge', 'Bleu', 'Vert'],
    inStock: true,
    stockCount: 35,
    isTrending: true
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
    category: 'Accessoires',
    addedDate: '2025-08-08',
    description: 'Chapeau traditionnel tissé main',
    materials: ['Paille tressée', 'Cuir'],
    colors: ['Naturel', 'Marron'],
    inStock: true,
    stockCount: 12,
    isHandmade: true
  },
  {
    id: 9,
    title: 'Ensemble Kente Royal',
    price: 89000,
    image: 'https://images.unsplash.com/photo-1594623930572-300a3011d9ae?w=600&h=800&fit=crop&q=90',
    creator: 'Maître Tisseur',
    rating: 5.0,
    reviews: 8,
    isNew: true,
    category: 'Femme',
    addedDate: '2025-08-07',
    isPremium: true,
    isExclusive: true,
    description: 'Ensemble traditionnel Kente tissé main, pièce unique',
    materials: ['Soie Kente', 'Fils d\'or'],
    colors: ['Or et Rouge', 'Bleu Royal'],
    sizes: ['S', 'M', 'L'],
    inStock: true,
    stockCount: 3,
    isFeatured: true
  },
  {
    id: 10,
    title: 'Sandales Cuir Artisanales',
    price: 19000,
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&h=800&fit=crop&q=90',
    creator: 'Atelier Cuir',
    rating: 4.7,
    reviews: 22,
    isNew: true,
    category: 'Chaussures',
    addedDate: '2025-08-06',
    description: 'Sandales en cuir véritable, finitions artisanales',
    materials: ['Cuir pleine fleur', 'Semelle caoutchouc'],
    colors: ['Marron', 'Noir', 'Tan'],
    sizes: ['36', '37', '38', '39', '40', '41', '42'],
    inStock: true,
    stockCount: 28,
    isEcoFriendly: true
  }
];

const categories = [
  "Tous", 
  "Femme", 
  "Homme", 
  "Bijoux", 
  "Accessoires", 
  "Textile", 
  "Chaussures"
];

const sortOptions = [
  { value: "recent", label: "Plus récents" },
  { value: "trending", label: "Tendances" },
  { value: "price-asc", label: "Prix croissant" },
  { value: "price-desc", label: "Prix décroissant" },
  { value: "rating", label: "Mieux notés" },
  { value: "reviews", label: "Plus commentés" },
  { value: "name", label: "Nom A-Z" }
];

const filterOptions = [
  { value: "all", label: "Tous les produits" },
  { value: "featured", label: "Mis en avant" },
  { value: "trending", label: "Tendances" },
  { value: "premium", label: "Premium" },
  { value: "handmade", label: "Fait main" },
  { value: "exclusive", label: "Exclusif" },
  { value: "eco-friendly", label: "Éco-responsable" }
];

// Composant pour calculer les jours depuis l'ajout
const DaysFromAdded = memo(({ addedDate }) => {
  const days = Math.floor((new Date() - new Date(addedDate)) / (1000 * 60 * 60 * 24));
  
  if (days === 0) return <span className="text-green-600 font-medium">Aujourd'hui</span>;
  if (days === 1) return <span className="text-green-600 font-medium">Hier</span>;
  if (days <= 7) return <span className="text-blue-600 font-medium">Il y a {days} jours</span>;
  return <span className="text-gray-500">Il y a {days} jours</span>;
});

const NewProductsPage = memo(() => {
  const [products, setProducts] = useState(newProductsData);
  const [filteredProducts, setFilteredProducts] = useState(newProductsData);
  const [selectedCategory, setSelectedCategory] = useState("Tous");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [sortBy, setSortBy] = useState("recent");
  const [viewMode, setViewMode] = useState("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [cart, setCart] = useState([]);

  // Filtrage et tri
  useEffect(() => {
    let filtered = [...products];

    // Filtre par catégorie
    if (selectedCategory !== "Tous") {
      filtered = filtered.filter(item => item.category === selectedCategory);
    }

    // Filtre par type
    if (selectedFilter !== "all") {
      switch (selectedFilter) {
        case "featured":
          filtered = filtered.filter(item => item.isFeatured);
          break;
        case "trending":
          filtered = filtered.filter(item => item.isTrending);
          break;
        case "premium":
          filtered = filtered.filter(item => item.isPremium);
          break;
        case "handmade":
          filtered = filtered.filter(item => item.isHandmade);
          break;
        case "exclusive":
          filtered = filtered.filter(item => item.isExclusive);
          break;
        case "eco-friendly":
          filtered = filtered.filter(item => item.isEcoFriendly);
          break;
      }
    }

    // Filtre par recherche
    if (searchQuery) {
      filtered = filtered.filter(item =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.creator.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.materials.some(material => 
          material.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }

    // Tri
    switch (sortBy) {
      case "recent":
        filtered.sort((a, b) => new Date(b.addedDate) - new Date(a.addedDate));
        break;
      case "trending":
        filtered.sort((a, b) => (b.isTrending ? 1 : 0) - (a.isTrending ? 1 : 0));
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
      case "reviews":
        filtered.sort((a, b) => b.reviews - a.reviews);
        break;
      case "name":
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
    }

    setFilteredProducts(filtered);
  }, [products, selectedCategory, selectedFilter, searchQuery, sortBy]);

  const toggleFavorite = (id) => {
    setFavorites(prev =>
      prev.includes(id)
        ? prev.filter(fav => fav !== id)
        : [...prev, id]
    );
  };

  const addToCart = (product) => {
    setCart(prev => [...prev, product]);
  };

  // Composant NewProductCard
  const NewProductCard = ({ product }) => {
    const isFavorite = favorites.includes(product.id);
    const daysFromAdded = Math.floor((new Date() - new Date(product.addedDate)) / (1000 * 60 * 60 * 24));

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
            alt={product.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          
          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {daysFromAdded <= 3 && (
              <span className="px-2 py-0.5 bg-green-500 text-white text-xs rounded-full font-bold flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                Nouveau
              </span>
            )}
            {product.isFeatured && (
              <span className="px-2 py-0.5 bg-amber-500 text-white text-xs rounded-full font-medium flex items-center gap-1">
                <Crown className="w-3 h-3" />
                Vedette
              </span>
            )}
            {product.isTrending && (
              <span className="px-2 py-0.5 bg-blue-500 text-white text-xs rounded-full font-medium flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                Tendance
              </span>
            )}
            {product.isPremium && (
              <span className="px-2 py-0.5 bg-purple-500 text-white text-xs rounded-full font-medium flex items-center gap-1">
                <Award className="w-3 h-3" />
                Premium
              </span>
            )}
            {product.isExclusive && (
              <span className="px-2 py-0.5 bg-red-500 text-white text-xs rounded-full font-medium flex items-center gap-1">
                <Badge className="w-3 h-3" />
                Exclusif
              </span>
            )}
            {product.isHandmade && (
              <span className="px-2 py-0.5 bg-orange-500 text-white text-xs rounded-full font-medium flex items-center gap-1">
                <Scissors className="w-3 h-3" />
                Fait main
              </span>
            )}
            {product.isEcoFriendly && (
              <span className="px-2 py-0.5 bg-emerald-500 text-white text-xs rounded-full font-medium flex items-center gap-1">
                <Palette className="w-3 h-3" />
                Éco
              </span>
            )}
          </div>

          {/* Indicateur de stock */}
          {product.stockCount <= 10 && (
            <div className="absolute bottom-2 left-2">
              <span className="px-2 py-0.5 bg-red-100 text-red-600 text-xs rounded-full font-medium">
                Plus que {product.stockCount}
              </span>
            </div>
          )}
        </div>

        {/* Contenu */}
        <div className={`${viewMode === 'list' ? 'flex-1' : 'p-4'}`}>
          <div className="flex items-start justify-between mb-2">
            <div className="flex-1">
              <p className="text-xs text-gray-500 mb-1">{product.creator}</p>
              <h3 className="font-semibold text-gray-900 text-sm leading-tight line-clamp-2">
                {product.title}
              </h3>
            </div>
          </div>

          {/* Description */}
          <p className="text-xs text-gray-600 mb-2 line-clamp-2">
            {product.description}
          </p>

          {/* Matériaux */}
          <div className="flex flex-wrap gap-1 mb-2">
            {product.materials.slice(0, 2).map((material, index) => (
              <span key={index} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                {material}
              </span>
            ))}
            {product.materials.length > 2 && (
              <span className="text-xs text-gray-500">+{product.materials.length - 2}</span>
            )}
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
          <div className="flex items-center justify-between mb-3">
            <span className="font-bold text-gray-900 text-lg">
              {product.price.toLocaleString()} FCFA
            </span>
            <DaysFromAdded addedDate={product.addedDate} />
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <motion.button
              className="flex-1 px-3 py-2 bg-gray-900 text-white rounded-xl font-medium text-sm hover:bg-gray-800 transition-all duration-200 flex items-center justify-center gap-1"
              onClick={() => addToCart(product)}
              whileTap={{ scale: 0.98 }}
            >
              <ShoppingCart className="w-4 h-4" />
              Ajouter
            </motion.button>
            <motion.button
              className="p-2 border border-gray-200 rounded-xl hover:border-gray-900 transition-colors"
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
      {/* Header avec gradient et animations */}
      <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-amber-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        
        {/* Motifs décoratifs animés */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-amber-400 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                opacity: [0, 1, 0],
                scale: [1, 2, 1],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

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
                    <Award className="w-7 h-7 text-amber-400" />
                    <motion.div
                      className="absolute inset-0"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    >
                      <Sparkles className="w-7 h-7 text-white opacity-30" />
                    </motion.div>
                  </div>
                  Nouvelles Créations
                </motion.h1>
                <motion.p 
                  className="text-white text-opacity-90 text-sm md:text-base"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  Les dernières œuvres de nos artisans talentueux
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
      </div>

      {/* Statistiques des nouveaux produits */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="text-sm text-gray-600">
                <span className="font-semibold text-gray-900">{products.length}</span> nouvelle{products.length > 1 ? 's' : ''} création{products.length > 1 ? 's' : ''}
              </div>
              <div className="text-sm text-gray-600">
                <span className="font-semibold text-green-600">
                  {products.filter(p => p.isTrending).length}
                </span> en tendance
              </div>
              <div className="text-sm text-gray-600">
                <span className="font-semibold text-amber-600">
                  {products.filter(p => p.isFeatured).length}
                </span> mis en avant
              </div>
            </div>
            
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Calendar className="w-4 h-4" />
              <span>Dernière mise à jour: Aujourd'hui</span>
            </div>
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
                    placeholder="Rechercher par nom, créateur, matériau..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
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
                          ? 'bg-gray-900 text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                      onClick={() => setSelectedCategory(category)}
                      whileTap={{ scale: 0.98 }}
                    >
                      {category}
                    </motion.button>
                  ))}
                </div>

                {/* Filtres par type */}
                <select
                  className="px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
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
                  className="px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
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

      {/* Contenu principal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {filteredProducts.length === 0 ? (
          <motion.div
            className="text-center py-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="relative mb-6">
              <Award className="w-16 h-16 text-gray-300 mx-auto" />
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
                ? "Aucune création trouvée" 
                : "Aucune nouvelle création"
              }
            </h3>
            <p className="text-gray-500 mb-6">
              {searchQuery || selectedCategory !== "Tous" || selectedFilter !== "all"
                ? "Essayez de modifier vos critères de recherche"
                : "Revenez bientôt pour découvrir les nouvelles créations de nos artisans"
              }
            </p>
            <motion.button
              className="px-6 py-3 bg-gray-900 text-white rounded-xl font-medium hover:bg-gray-800 transition-colors"
              whileTap={{ scale: 0.98 }}
            >
              Découvrir tous nos produits
            </motion.button>
          </motion.div>
        ) : (
          <>
            {/* Section produits en vedette */}
            {filteredProducts.some(p => p.isFeatured) && (
              <motion.div
                className="mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <Crown className="w-5 h-5 text-amber-500" />
                  <h2 className="text-lg font-bold text-gray-900">Créations en Vedette</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredProducts
                    .filter(product => product.isFeatured)
                    .slice(0, 3)
                    .map((product, index) => (
                      <motion.div
                        key={`featured-${product.id}`}
                        className="relative bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl border-2 border-amber-200 p-4"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.02 }}
                      >
                        <div className="absolute top-2 right-2">
                          <motion.div
                            className="w-3 h-3 bg-amber-500 rounded-full"
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          />
                        </div>
                        
                        <div className="flex items-center gap-3 mb-3">
                          <img
                            src={product.image}
                            alt={product.title}
                            className="w-16 h-16 rounded-lg object-cover"
                          />
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900 text-sm line-clamp-2">
                              {product.title}
                            </h4>
                            <p className="text-xs text-gray-500">{product.creator}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-bold text-gray-900">
                            {product.price.toLocaleString()} FCFA
                          </span>
                          <div className="flex items-center gap-1">
                            <Star className="w-3 h-3 text-amber-400 fill-current" />
                            <span className="text-xs text-gray-600">{product.rating}</span>
                          </div>
                        </div>
                        
                        <DaysFromAdded addedDate={product.addedDate} />
                        
                        <motion.button
                          className="w-full mt-3 px-3 py-2 bg-amber-500 text-white rounded-xl font-medium text-sm hover:bg-amber-600 transition-colors"
                          whileTap={{ scale: 0.98 }}
                        >
                          Voir les détails
                        </motion.button>
                      </motion.div>
                    ))}
                </div>
              </motion.div>
            )}

            {/* Grille des produits */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-gray-900">
                  Toutes les Créations ({filteredProducts.length})
                </h2>
                <div className="text-sm text-gray-500">
                  Triés par: {sortOptions.find(opt => opt.value === sortBy)?.label}
                </div>
              </div>

              <motion.div
                className={`${
                  viewMode === 'grid' 
                    ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' 
                    : 'space-y-4'
                }`}
                layout
              >
                <AnimatePresence mode="popLayout">
                  {filteredProducts.map((product, index) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <NewProductCard product={product} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            </div>

            {/* Section tendances */}
            {filteredProducts.some(p => p.isTrending) && (
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
                    <TrendingUp className="w-6 h-6 text-blue-500" />
                    Créations Tendances
                  </motion.h2>
                  <motion.p 
                    className="text-gray-600"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    Les créations les plus populaires du moment
                  </motion.p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  {filteredProducts
                    .filter(product => product.isTrending)
                    .slice(0, 4)
                    .map((product, index) => (
                      <motion.div
                        key={`trending-${product.id}`}
                        className="relative bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border-2 border-blue-200 p-4"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.02 }}
                      >
                        <div className="absolute top-2 right-2">
                          <motion.div
                            className="flex items-center gap-1 px-2 py-1 bg-blue-500 text-white text-xs rounded-full"
                            animate={{ scale: [1, 1.05, 1] }}
                            transition={{ duration: 3, repeat: Infinity }}
                          >
                            <TrendingUp className="w-3 h-3" />
                            <span>Tendance</span>
                          </motion.div>
                        </div>
                        
                        <img
                          src={product.image}
                          alt={product.title}
                          className="w-full h-32 rounded-lg object-cover mb-3"
                        />
                        
                        <h4 className="font-semibold text-gray-900 text-sm mb-1 line-clamp-2">
                          {product.title}
                        </h4>
                        <p className="text-xs text-gray-500 mb-2">{product.creator}</p>
                        
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-blue-600">
                            {product.price.toLocaleString()} FCFA
                          </span>
                          <div className="flex items-center gap-1">
                            <Users className="w-3 h-3 text-gray-400" />
                            <span className="text-xs text-gray-500">{product.reviews}</span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                </div>
              </motion.div>
            )}

            {/* Section newsletter artisans */}
            <motion.div
              className="mt-12 pt-8 border-t border-gray-200"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <motion.div
                className="bg-gradient-to-r from-gray-900 to-amber-900 rounded-2xl p-6 text-center text-white"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <h3 className="text-xl font-bold mb-2 flex items-center justify-center gap-2">
                  <Bell className="w-5 h-5" />
                  Suivez nos Artisans
                </h3>
                <p className="mb-4 text-white text-opacity-90">
                  Soyez informé en premier des nouvelles créations de vos artisans préférés
                </p>
                <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                  <input
                    type="email"
                    placeholder="Votre email"
                    className="flex-1 px-4 py-2 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
                  />
                  <motion.button
                    className="px-6 py-2 bg-white text-gray-900 rounded-xl font-medium hover:bg-gray-100 transition-colors"
                    whileTap={{ scale: 0.98 }}
                  >
                    S'abonner
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>

            {/* Section recommandations */}
            <motion.div
              className="mt-12 pt-8 border-t border-gray-200"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center justify-center gap-2">
                  <Gift className="w-6 h-6 text-amber-500" />
                  Découvrez Aussi
                </h2>
                <p className="text-gray-600">D'autres créations qui pourraient vous plaire</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <motion.button
                  className="p-4 border-2 border-dashed border-gray-300 rounded-2xl text-gray-500 hover:border-gray-900 hover:text-gray-900 transition-all duration-200 flex flex-col items-center gap-2"
                  whileTap={{ scale: 0.98 }}
                >
                  <Award className="w-6 h-6" />
                  <span className="font-medium">Collections Complètes</span>
                  <span className="text-sm">Voir toutes nos collections</span>
                </motion.button>
                
                <motion.button
                  className="p-4 border-2 border-dashed border-gray-300 rounded-2xl text-gray-500 hover:border-gray-900 hover:text-gray-900 transition-all duration-200 flex flex-col items-center gap-2"
                  whileTap={{ scale: 0.98 }}
                >
                  <Users className="w-6 h-6" />
                  <span className="font-medium">Nos Artisans</span>
                  <span className="text-sm">Découvrir les créateurs</span>
                </motion.button>
                
                <motion.button
                  className="p-4 border-2 border-dashed border-gray-300 rounded-2xl text-gray-500 hover:border-gray-900 hover:text-gray-900 transition-all duration-200 flex flex-col items-center gap-2"
                  whileTap={{ scale: 0.98 }}
                >
                  <Sparkles className="w-6 h-6" />
                  <span className="font-medium">Personnalisation</span>
                  <span className="text-sm">Créations sur mesure</span>
                </motion.button>
              </div>
            </motion.div>
          </>
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
              className="relative p-4 bg-gray-900 text-white rounded-full shadow-lg hover:bg-gray-800 transition-colors"
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

      {/* Bouton flottant de favoris */}
      <AnimatePresence>
        {favorites.length > 0 && (
          <motion.div
            className="fixed bottom-6 left-6 z-50"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
          >
            <motion.button
              className="relative p-4 bg-red-500 text-white rounded-full shadow-lg hover:bg-red-600 transition-colors"
              whileTap={{ scale: 0.9 }}
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: 1 }}
            >
              <Heart className="w-6 h-6 fill-current" />
              <span className="absolute -top-2 -right-2 w-6 h-6 bg-white text-red-500 text-xs rounded-full flex items-center justify-center font-bold">
                {favorites.length}
              </span>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});

export default NewProductsPage;