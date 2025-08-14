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
  ShoppingCart
} from 'lucide-react';

// Données simulées pour les favoris
const favoritesData = [
  {
    id: 1,
    name: "Sérum Éclat Diamant",
    brand: "Luxe Beauté Africaine",
    price: 89.99,
    originalPrice: 119.99,
    discount: 25,
    rating: 4.8,
    reviews: 156,
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=400&fit=crop",
    category: "Soin du visage",
    inStock: true,
    isNew: true,
    addedDate: "2024-01-15"
  },
  {
    id: 2,
    name: "Rouge à Lèvres Velours Royal",
    brand: "Atelier Dakar",
    price: 45.00,
    originalPrice: 45.00,
    rating: 4.9,
    reviews: 203,
    image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400&h=400&fit=crop",
    category: "Maquillage",
    inStock: true,
    isLimitedEdition: true,
    addedDate: "2024-01-10"
  },
  {
    id: 3,
    name: "Crème Corps Karité Premium",
    brand: "Essence du Sahel",
    price: 34.99,
    originalPrice: 49.99,
    discount: 30,
    rating: 4.7,
    reviews: 89,
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&h=400&fit=crop",
    category: "Soin du corps",
    inStock: false,
    expectedRestock: "Dans 3 jours",
    addedDate: "2024-01-12"
  },
  {
    id: 4,
    name: "Parfum Essence d'Ylang",
    brand: "Maison des Fragrances",
    price: 128.00,
    originalPrice: 128.00,
    rating: 4.6,
    reviews: 67,
    image: "https://images.unsplash.com/photo-1588405748880-12d1d2a59d32?w=400&h=400&fit=crop",
    category: "Parfumerie",
    inStock: true,
    isBestseller: true,
    addedDate: "2024-01-08"
  },
  {
    id: 5,
    name: "Masque Purifiant Argile Rose",
    brand: "Rituel Beauté",
    price: 29.99,
    originalPrice: 39.99,
    discount: 25,
    rating: 4.5,
    reviews: 124,
    image: "https://images.unsplash.com/photo-1556228578-dd6-f-2c0b6c0b6c0b?w=400&h=400&fit=crop",
    category: "Soin du visage",
    inStock: true,
    addedDate: "2024-01-14"
  },
  {
    id: 6,
    name: "Huile Précieuse Multi-Usage",
    brand: "Trésor d'Afrique",
    price: 67.50,
    originalPrice: 67.50,
    rating: 4.9,
    reviews: 301,
    image: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=400&h=400&fit=crop",
    category: "Soin du visage",
    inStock: true,
    isOrganic: true,
    addedDate: "2024-01-06"
  }
];

const categories = ["Tous", "Soin du visage", "Maquillage", "Soin du corps", "Parfumerie"];
const sortOptions = [
  { value: "recent", label: "Ajoutés récemment" },
  { value: "price-asc", label: "Prix croissant" },
  { value: "price-desc", label: "Prix décroissant" },
  { value: "rating", label: "Mieux notés" },
  { value: "name", label: "Nom A-Z" }
];

const FavoritesPage = memo(() => {
  const [favorites, setFavorites] = useState(favoritesData);
  const [filteredFavorites, setFilteredFavorites] = useState(favoritesData);
  const [selectedCategory, setSelectedCategory] = useState("Tous");
  const [sortBy, setSortBy] = useState("recent");
  const [viewMode, setViewMode] = useState("grid"); // grid or list
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [ setShowBulkActions] = useState(false);

  // Filtrage et tri
  useEffect(() => {
    let filtered = [...favorites];

    // Filtre par catégorie
    if (selectedCategory !== "Tous") {
      filtered = filtered.filter(item => item.category === selectedCategory);
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
      case "price-asc":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case "name":
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "recent":
      default:
        filtered.sort((a, b) => new Date(b.addedDate) - new Date(a.addedDate));
        break;
    }

    setFilteredFavorites(filtered);
  }, [favorites, selectedCategory, searchQuery, sortBy]);

  const removeFavorite = (id) => {
    setFavorites(prev => prev.filter(item => item.id !== id));
    setSelectedItems(prev => prev.filter(itemId => itemId !== id));
  };

  const toggleSelectItem = (id) => {
    setSelectedItems(prev =>
      prev.includes(id)
        ? prev.filter(itemId => itemId !== id)
        : [...prev, id]
    );
  };

  const selectAllItems = () => {
    setSelectedItems(filteredFavorites.map(item => item.id));
  };

  const clearSelection = () => {
    setSelectedItems([]);
  };

  const removeSelectedItems = () => {
    setFavorites(prev => prev.filter(item => !selectedItems.includes(item.id)));
    setSelectedItems([]);
    setShowBulkActions(false);
  };

  const addToCartBulk = () => {
    // Logique d'ajout au panier en lot
    console.log("Ajout au panier:", selectedItems);
    setSelectedItems([]);
    setShowBulkActions(false);
  };

  // Composant ProductCard pour favoris
  const FavoriteCard = ({ product, isSelected, onToggleSelect }) => (
    <motion.div
      className={`group relative bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden ${
        viewMode === 'list' ? 'flex items-center p-4' : 'flex flex-col'
      }`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Checkbox de sélection */}
      <motion.button
        className={`absolute top-3 left-3 z-10 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
          isSelected 
            ? 'bg-amber-500 border-amber-500 text-white' 
            : 'bg-white border-gray-300 hover:border-amber-500'
        }`}
        onClick={() => onToggleSelect(product.id)}
        whileTap={{ scale: 0.9 }}
      >
        {isSelected && <Plus className="w-3 h-3 rotate-45" />}
      </motion.button>

      {/* Bouton de suppression */}
      <motion.button
        className="absolute top-3 right-3 z-10 p-2 bg-white rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-red-50"
        onClick={() => removeFavorite(product.id)}
        whileTap={{ scale: 0.9 }}
      >
        <Heart className="w-4 h-4 text-red-500 fill-current" />
      </motion.button>

      {/* Image */}
      <div className={`relative ${viewMode === 'list' ? 'w-20 h-20 mr-4' : 'aspect-square'} overflow-hidden rounded-xl`}>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        
        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {product.discount && (
            <span className="px-2 py-0.5 bg-red-500 text-white text-xs rounded-full font-medium">
              -{product.discount}%
            </span>
          )}
          {product.isNew && (
            <span className="px-2 py-0.5 bg-green-500 text-white text-xs rounded-full font-medium">
              Nouveau
            </span>
          )}
          {product.isLimitedEdition && (
            <span className="px-2 py-0.5 bg-purple-500 text-white text-xs rounded-full font-medium">
              <Crown className="w-3 h-3 inline mr-1" />
              Édition limitée
            </span>
          )}
          {product.isBestseller && (
            <span className="px-2 py-0.5 bg-amber-500 text-white text-xs rounded-full font-medium">
              <Sparkles className="w-3 h-3 inline mr-1" />
              Best-seller
            </span>
          )}
        </div>

        {!product.inStock && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="text-white font-medium text-sm">Rupture de stock</span>
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
        <div className="flex items-center gap-2 mb-3">
          <span className="font-bold text-amber-600">{product.price}€</span>
          {product.originalPrice && product.originalPrice !== product.price && (
            <span className="text-xs text-gray-400 line-through">
              {product.originalPrice}€
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <motion.button
            className={`flex-1 px-3 py-2 rounded-xl font-medium text-sm transition-all duration-200 ${
              product.inStock
                ? 'bg-amber-500 text-white hover:bg-amber-600'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
            disabled={!product.inStock}
            whileTap={{ scale: 0.98 }}
          >
            <ShoppingCart className="w-4 h-4 inline mr-1" />
            {product.inStock ? 'Ajouter au panier' : product.expectedRestock}
          </motion.button>
          <motion.button
            className="p-2 border border-gray-200 rounded-xl hover:border-amber-500 transition-colors"
            whileTap={{ scale: 0.9 }}
          >
            <Eye className="w-4 h-4 text-gray-600" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center gap-4">
              <motion.button
                className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
                whileTap={{ scale: 0.9 }}
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </motion.button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                  <Heart className="w-6 h-6 text-red-500 fill-current" />
                  Mes Favoris
                </h1>
                <p className="text-sm text-gray-500">
                  {favorites.length} article{favorites.length > 1 ? 's' : ''} ajouté{favorites.length > 1 ? 's' : ''}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <motion.button
                className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
                onClick={() => setShowFilters(!showFilters)}
                whileTap={{ scale: 0.9 }}
              >
                <Filter className="w-5 h-5 text-gray-600" />
              </motion.button>
              
              <div className="flex items-center bg-gray-100 rounded-xl p-1">
                <motion.button
                  className={`p-1.5 rounded-lg transition-all duration-200 ${
                    viewMode === 'grid' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'
                  }`}
                  onClick={() => setViewMode('grid')}
                  whileTap={{ scale: 0.9 }}
                >
                  <Grid3X3 className="w-4 h-4 text-gray-600" />
                </motion.button>
                <motion.button
                  className={`p-1.5 rounded-lg transition-all duration-200 ${
                    viewMode === 'list' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'
                  }`}
                  onClick={() => setViewMode('list')}
                  whileTap={{ scale: 0.9 }}
                >
                  <List className="w-4 h-4 text-gray-600" />
                </motion.button>
              </div>
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
                    placeholder="Rechercher dans mes favoris..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
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
                          ? 'bg-amber-500 text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                      onClick={() => setSelectedCategory(category)}
                      whileTap={{ scale: 0.98 }}
                    >
                      {category}
                    </motion.button>
                  ))}
                </div>

                {/* Tri */}
                <select
                  className="px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
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

      {/* Actions de masse */}
      <AnimatePresence>
        {selectedItems.length > 0 && (
          <motion.div
            className="bg-amber-50 border-b border-amber-200"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span className="text-sm font-medium text-amber-800">
                    {selectedItems.length} article{selectedItems.length > 1 ? 's' : ''} sélectionné{selectedItems.length > 1 ? 's' : ''}
                  </span>
                  <button
                    className="text-sm text-amber-600 hover:text-amber-700"
                    onClick={selectAllItems}
                  >
                    Tout sélectionner
                  </button>
                  <button
                    className="text-sm text-gray-600 hover:text-gray-700"
                    onClick={clearSelection}
                  >
                    Tout désélectionner
                  </button>
                </div>
                <div className="flex items-center gap-2">
                  <motion.button
                    className="px-4 py-2 bg-amber-500 text-white rounded-xl font-medium text-sm hover:bg-amber-600 transition-colors flex items-center gap-2"
                    onClick={addToCartBulk}
                    whileTap={{ scale: 0.98 }}
                  >
                    <ShoppingCart className="w-4 h-4" />
                    Ajouter au panier
                  </motion.button>
                  <motion.button
                    className="px-4 py-2 bg-red-500 text-white rounded-xl font-medium text-sm hover:bg-red-600 transition-colors flex items-center gap-2"
                    onClick={removeSelectedItems}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Trash2 className="w-4 h-4" />
                    Supprimer
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Contenu principal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {filteredFavorites.length === 0 ? (
          <motion.div
            className="text-center py-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {searchQuery || selectedCategory !== "Tous" 
                ? "Aucun favori trouvé" 
                : "Votre liste de favoris est vide"
              }
            </h3>
            <p className="text-gray-500 mb-6">
              {searchQuery || selectedCategory !== "Tous"
                ? "Essayez de modifier vos filtres de recherche"
                : "Découvrez nos produits et ajoutez vos coups de cœur ici"
              }
            </p>
            <motion.button
              className="px-6 py-3 bg-amber-500 text-white rounded-xl font-medium hover:bg-amber-600 transition-colors"
              whileTap={{ scale: 0.98 }}
            >
              Découvrir nos produits
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            className={`${
              viewMode === 'grid' 
                ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' 
                : 'space-y-4'
            }`}
            layout
          >
            <AnimatePresence mode="popLayout">
              {filteredFavorites.map((product) => (
                <FavoriteCard
                  key={product.id}
                  product={product}
                  isSelected={selectedItems.includes(product.id)}
                  onToggleSelect={toggleSelectItem}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Section recommandations */}
        {filteredFavorites.length > 0 && (
          <motion.div
            className="mt-12 pt-8 border-t border-gray-200"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center justify-center gap-2">
                <Sparkles className="w-6 h-6 text-amber-500" />
                Vous pourriez aussi aimer
              </h2>
              <p className="text-gray-600">Basé sur vos favoris actuels</p>
            </div>
            
            <motion.button
              className="w-full py-4 border-2 border-dashed border-gray-300 rounded-2xl text-gray-500 hover:border-amber-500 hover:text-amber-600 transition-all duration-200 flex items-center justify-center gap-2"
              whileTap={{ scale: 0.98 }}
            >
              <Gift className="w-5 h-5" />
              Voir nos recommandations personnalisées
            </motion.button>
          </motion.div>
        )}
      </div>
    </div>
  );
});

export default FavoritesPage;