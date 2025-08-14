import React, { useState, useEffect, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShoppingCart, 
  Plus, 
  Minus, 
  Trash2, 
  Heart,
  ArrowLeft,
  ArrowRight,
  Gift,
  Truck,
  Shield,
  CreditCard,
  Tag,
  Star,
  Info,
  AlertCircle,
  CheckCircle,
  Lock,
  Sparkles,
  Crown,
  MapPin,
  Clock,
  Percent,
  X
} from 'lucide-react';

// Données simulées du panier
const cartData = [
  {
    id: 1,
    name: "Sérum Éclat Diamant",
    brand: "Luxe Beauté Africaine",
    price: 89.99,
    originalPrice: 119.99,
    quantity: 2,
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=400&fit=crop",
    variant: "30ml",
    inStock: true,
    maxQuantity: 5,
    discount: 25,
    isGift: false,
    estimatedDelivery: "2-3 jours"
  },
  {
    id: 2,
    name: "Rouge à Lèvres Velours Royal",
    brand: "Atelier Dakar",
    price: 45.00,
    originalPrice: 45.00,
    quantity: 1,
    image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400&h=400&fit=crop",
    variant: "Rouge Passion",
    inStock: true,
    maxQuantity: 3,
    isLimitedEdition: true,
    isGift: true,
    estimatedDelivery: "2-3 jours"
  },
  {
    id: 3,
    name: "Crème Corps Karité Premium",
    brand: "Essence du Sahel",
    price: 34.99,
    originalPrice: 49.99,
    quantity: 1,
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&h=400&fit=crop",
    variant: "250ml",
    inStock: false,
    maxQuantity: 2,
    discount: 30,
    stockAlert: "Plus que 2 en stock",
    estimatedDelivery: "5-7 jours"
  }
];

// Codes promo simulés
const promoCodes = [
  { code: "BEAUTE20", discount: 20, type: "percentage", minAmount: 100 },
  { code: "WELCOME10", discount: 10, type: "fixed", minAmount: 50 },
  { code: "LIVRAISON", discount: 0, type: "shipping", minAmount: 0 }
];

const CartPage = memo(() => {
  const [cartItems, setCartItems] = useState(cartData);
  const [promoCode, setPromoCode] = useState("");
  const [appliedPromo, setAppliedPromo] = useState(null);
  const [showPromoInput, setShowPromoInput] = useState(false);
  const [deliveryOption, setDeliveryOption] = useState("standard");
  const [showRecommendations, setShowRecommendations] = useState(true);

  // Calculs
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const savings = cartItems.reduce((sum, item) => {
    const itemSavings = item.originalPrice && item.originalPrice !== item.price 
      ? (item.originalPrice - item.price) * item.quantity 
      : 0;
    return sum + itemSavings;
  }, 0);

  const promoDiscount = appliedPromo 
    ? appliedPromo.type === 'percentage' 
      ? (subtotal * appliedPromo.discount / 100)
      : appliedPromo.discount
    : 0;

  const deliveryFee = deliveryOption === "express" ? 9.99 : 
                     deliveryOption === "premium" ? 0 :
                     subtotal >= 75 ? 0 : 4.99;

  const total = subtotal - promoDiscount + deliveryFee;

  // Fonctions
  const updateQuantity = (id, newQuantity) => {
    if (newQuantity === 0) {
      removeItem(id);
      return;
    }
    
    setCartItems(prev => prev.map(item => 
      item.id === id 
        ? { ...item, quantity: Math.min(newQuantity, item.maxQuantity) }
        : item
    ));
  };

  const removeItem = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const toggleGift = (id) => {
    setCartItems(prev => prev.map(item => 
      item.id === id ? { ...item, isGift: !item.isGift } : item
    ));
  };

  const applyPromoCode = () => {
    const promo = promoCodes.find(p => p.code === promoCode.toUpperCase());
    if (promo && subtotal >= promo.minAmount) {
      setAppliedPromo(promo);
      setPromoCode("");
      setShowPromoInput(false);
    }
  };

  const removePromoCode = () => {
    setAppliedPromo(null);
  };

  // Composant CartItem
  const CartItem = ({ item }) => (
    <motion.div
      className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -100 }}
      layout
    >
      <div className="flex gap-4">
        {/* Image */}
        <div className="relative">
          <div className="w-20 h-20 rounded-xl overflow-hidden">
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Badges */}
          <div className="absolute -top-1 -right-1 flex flex-col gap-1">
            {item.discount && (
              <span className="px-1.5 py-0.5 bg-red-500 text-white text-xs rounded-full font-medium">
                -{item.discount}%
              </span>
            )}
            {item.isLimitedEdition && (
              <Crown className="w-4 h-4 text-purple-500" />
            )}
            {item.isGift && (
              <Gift className="w-4 h-4 text-green-500" />
            )}
          </div>
        </div>

        {/* Contenu */}
        <div className="flex-1">
          <div className="flex justify-between items-start mb-2">
            <div>
              <p className="text-xs text-gray-500 mb-1">{item.brand}</p>
              <h3 className="font-semibold text-gray-900 text-sm leading-tight">
                {item.name}
              </h3>
              <p className="text-xs text-gray-500 mt-1">{item.variant}</p>
            </div>
            
            <motion.button
              className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
              onClick={() => removeItem(item.id)}
              whileTap={{ scale: 0.9 }}
            >
              <Trash2 className="w-4 h-4 text-gray-400" />
            </motion.button>
          </div>

          {/* Stock Status */}
          {!item.inStock ? (
            <div className="flex items-center gap-1 mb-2">
              <AlertCircle className="w-3 h-3 text-red-500" />
              <span className="text-xs text-red-600">Rupture de stock</span>
            </div>
          ) : item.stockAlert && (
            <div className="flex items-center gap-1 mb-2">
              <AlertCircle className="w-3 h-3 text-orange-500" />
              <span className="text-xs text-orange-600">{item.stockAlert}</span>
            </div>
          )}

          {/* Prix et contrôles */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-bold text-amber-600">{item.price}€</span>
              {item.originalPrice && item.originalPrice !== item.price && (
                <span className="text-xs text-gray-400 line-through">
                  {item.originalPrice}€
                </span>
              )}
            </div>

            {/* Contrôles quantité */}
            <div className="flex items-center gap-2">
              <motion.button
                className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center hover:border-amber-500 transition-colors"
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                whileTap={{ scale: 0.9 }}
                disabled={item.quantity <= 1}
              >
                <Minus className="w-3 h-3 text-gray-600" />
              </motion.button>
              
              <span className="w-8 text-center font-medium">{item.quantity}</span>
              
              <motion.button
                className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center hover:border-amber-500 transition-colors"
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                whileTap={{ scale: 0.9 }}
                disabled={item.quantity >= item.maxQuantity}
              >
                <Plus className="w-3 h-3 text-gray-600" />
              </motion.button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4 mt-3">
            <motion.button
              className="text-xs text-gray-500 hover:text-red-500 transition-colors flex items-center gap-1"
              onClick={() => toggleGift(item.id)}
              whileTap={{ scale: 0.95 }}
            >
              <Gift className="w-3 h-3" />
              {item.isGift ? 'Retirer cadeau' : 'Offrir en cadeau'}
            </motion.button>
            
            <motion.button
              className="text-xs text-gray-500 hover:text-amber-500 transition-colors flex items-center gap-1"
              whileTap={{ scale: 0.95 }}
            >
              <Heart className="w-3 h-3" />
              Ajouter aux favoris
            </motion.button>
          </div>

          {/* Livraison estimée */}
          <div className="flex items-center gap-1 mt-2">
            <Truck className="w-3 h-3 text-green-500" />
            <span className="text-xs text-gray-500">
              Livraison estimée: {item.estimatedDelivery}
            </span>
          </div>
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
                  <ShoppingCart className="w-6 h-6 text-amber-500" />
                  Mon Panier
                </h1>
                <p className="text-sm text-gray-500">
                  {cartItems.length} article{cartItems.length > 1 ? 's' : ''} dans votre panier
                </p>
              </div>
            </div>

            {cartItems.length > 0 && (
              <div className="text-right">
                <p className="text-sm text-gray-500">Total</p>
                <p className="text-2xl font-bold text-gray-900">{total.toFixed(2)}€</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {cartItems.length === 0 ? (
        // Panier vide
        <motion.div
          className="max-w-lg mx-auto px-4 py-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Votre panier est vide
          </h2>
          <p className="text-gray-500 mb-6">
            Découvrez nos produits de beauté et ajoutez vos favoris
          </p>
          <motion.button
            className="px-6 py-3 bg-amber-500 text-white rounded-xl font-medium hover:bg-amber-600 transition-colors"
            whileTap={{ scale: 0.98 }}
          >
            Découvrir nos produits
          </motion.button>
        </motion.div>
      ) : (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="lg:grid lg:grid-cols-3 lg:gap-8">
            {/* Articles du panier */}
            <div className="lg:col-span-2">
              <motion.div 
                className="space-y-4"
                layout
              >
                <AnimatePresence mode="popLayout">
                  {cartItems.map((item) => (
                    <CartItem key={item.id} item={item} />
                  ))}
                </AnimatePresence>
              </motion.div>

              {/* Code promo */}
              <motion.div
                className="bg-white rounded-2xl border border-gray-100 p-4 mt-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                    <Tag className="w-4 h-4 text-amber-500" />
                    Code promo
                  </h3>
                  {!showPromoInput && !appliedPromo && (
                    <motion.button
                      className="text-sm text-amber-600 hover:text-amber-700"
                      onClick={() => setShowPromoInput(true)}
                      whileTap={{ scale: 0.95 }}
                    >
                      Ajouter un code
                    </motion.button>
                  )}
                </div>

                <AnimatePresence>
                  {showPromoInput && !appliedPromo && (
                    <motion.div
                      className="flex gap-2"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                    >
                      <input
                        type="text"
                        placeholder="Entrez votre code promo"
                        className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                      />
                      <motion.button
                        className="px-4 py-2 bg-amber-500 text-white rounded-lg font-medium hover:bg-amber-600 transition-colors"
                        onClick={applyPromoCode}
                        whileTap={{ scale: 0.98 }}
                      >
                        Appliquer
                      </motion.button>
                      <motion.button
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        onClick={() => setShowPromoInput(false)}
                        whileTap={{ scale: 0.9 }}
                      >
                        <X className="w-4 h-4 text-gray-400" />
                      </motion.button>
                    </motion.div>
                  )}

                  {appliedPromo && (
                    <motion.div
                      className="flex items-center justify-between p-3 bg-green-50 rounded-lg"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                    >
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-sm font-medium text-green-700">
                          Code {appliedPromo.code} appliqué
                        </span>
                      </div>
                      <motion.button
                        className="text-green-600 hover:text-green-700"
                        onClick={removePromoCode}
                        whileTap={{ scale: 0.9 }}
                      >
                        <X className="w-4 h-4" />
                      </motion.button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>

            {/* Résumé et checkout */}
            <div className="mt-8 lg:mt-0">
              <motion.div
                className="bg-white rounded-2xl border border-gray-100 p-6 sticky top-6"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-amber-500" />
                  Résumé de commande
                </h3>

                {/* Détails des prix */}
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Sous-total</span>
                    <span className="font-medium">{subtotal.toFixed(2)}€</span>
                  </div>

                  {savings > 0 && (
                    <div className="flex justify-between text-sm text-green-600">
                      <span>Économies</span>
                      <span>-{savings.toFixed(2)}€</span>
                    </div>
                  )}

                  {appliedPromo && (
                    <div className="flex justify-between text-sm text-green-600">
                      <span>Code promo ({appliedPromo.code})</span>
                      <span>-{promoDiscount.toFixed(2)}€</span>
                    </div>
                  )}

                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Livraison</span>
                    <span className={`font-medium ${deliveryFee === 0 ? 'text-green-600' : ''}`}>
                      {deliveryFee === 0 ? 'Gratuite' : `${deliveryFee.toFixed(2)}€`}
                    </span>
                  </div>

                  <div className="border-t border-gray-200 pt-3">
                    <div className="flex justify-between">
                      <span className="font-semibold text-gray-900">Total</span>
                      <span className="font-bold text-xl text-gray-900">{total.toFixed(2)}€</span>
                    </div>
                  </div>
                </div>

                {/* Options de livraison */}
                <div className="mb-6">
                  <h4 className="font-medium text-gray-900 mb-3">Livraison</h4>
                  <div className="space-y-2">
                    {[
                      { id: 'standard', name: 'Standard', time: '3-5 jours', price: subtotal >= 75 ? 0 : 4.99 },
                      { id: 'express', name: 'Express', time: '1-2 jours', price: 9.99 },
                      { id: 'premium', name: 'Premium', time: 'Même jour', price: 0, note: 'Gratuit pour les commandes > 150€' }
                    ].map((option) => (
                      <motion.label
                        key={option.id}
                        className={`flex items-center justify-between p-3 border rounded-lg cursor-pointer transition-all ${
                          deliveryOption === option.id ? 'border-amber-500 bg-amber-50' : 'border-gray-200 hover:border-gray-300'
                        }`}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="flex items-center gap-3">
                          <input
                            type="radio"
                            name="delivery"
                            value={option.id}
                            checked={deliveryOption === option.id}
                            onChange={(e) => setDeliveryOption(e.target.value)}
                            className="text-amber-500"
                          />
                          <div>
                            <p className="font-medium text-sm">{option.name}</p>
                            <p className="text-xs text-gray-500">{option.time}</p>
                            {option.note && (
                              <p className="text-xs text-amber-600">{option.note}</p>
                            )}
                          </div>
                        </div>
                        <span className="font-medium text-sm">
                          {option.price === 0 ? 'Gratuit' : `${option.price}€`}
                        </span>
                      </motion.label>
                    ))}
                  </div>
                </div>

                {/* Sécurité */}
                <div className="flex items-center gap-2 mb-6 p-3 bg-gray-50 rounded-lg">
                  <Lock className="w-4 h-4 text-green-500" />
                  <span className="text-xs text-gray-600">
                    Paiement 100% sécurisé
                  </span>
                </div>

                {/* Boutons d'action */}
                <div className="space-y-3">
                  <motion.button
                    className="w-full bg-amber-500 text-white py-4 rounded-xl font-semibold hover:bg-amber-600 transition-colors flex items-center justify-center gap-2"
                    whileTap={{ scale: 0.98 }}
                  >
                    <Lock className="w-4 h-4" />
                    Passer commande
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>

                  <motion.button
                    className="w-full border border-gray-200 text-gray-700 py-3 rounded-xl font-medium hover:bg-gray-50 transition-colors"
                    whileTap={{ scale: 0.98 }}
                  >
                    Continuer mes achats
                  </motion.button>
                </div>

                {/* Avantages */}
                <div className="mt-6 space-y-2">
                  {[
                    { icon: Truck, text: "Livraison gratuite dès 75€" },
                    { icon: Shield, text: "Garantie satisfait ou remboursé" },
                    { icon: Heart, text: "Service client 7j/7" }
                  ].map((benefit, index) => (
                    <div key={index} className="flex items-center gap-2 text-xs text-gray-600">
                      <benefit.icon className="w-3 h-3 text-amber-500" />
                      <span>{benefit.text}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>

          {/* Recommandations */}
          {showRecommendations && (
            <motion.div
              className="mt-12 pt-8 border-t border-gray-200"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-amber-500" />
                  Vous pourriez aussi aimer
                </h2>
                <motion.button
                  className="text-sm text-gray-500 hover:text-gray-700"
                  onClick={() => setShowRecommendations(false)}
                  whileTap={{ scale: 0.95 }}
                >
                  <X className="w-4 h-4" />
                </motion.button>
              </div>
              
              <motion.div
                className="grid grid-cols-2 md:grid-cols-4 gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {[1,2,3,4].map((i) => (
                  <motion.div
                    key={i}
                    className="bg-white rounded-xl border border-gray-100 p-4 hover:shadow-md transition-shadow cursor-pointer"
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="aspect-square bg-gray-100 rounded-lg mb-3"></div>
                    <h4 className="font-medium text-sm text-gray-900 mb-1">Produit recommandé {i}</h4>
                    <p className="text-xs text-gray-500 mb-2">Marque Beauté</p>
                    <p className="font-bold text-amber-600">39.99€</p>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          )}
        </div>
      )}
    </div>
  );
});

export default CartPage;