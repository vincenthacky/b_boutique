import { memo, useState } from 'react'
import { motion } from 'framer-motion'
import { ShoppingBag, Heart, Eye, Star, TrendingUp } from 'lucide-react'

interface Product {
  id: number
  title: string
  price: number
  originalPrice?: number
  discount?: number
  image: string
  badge: string
  badgeColor: string
  rating: number
  reviews: number
  sold?: number
  isBestseller?: boolean
  creator?: string
}

interface ProductCardProps {
  product: Product
  index: number
}

const formatPrice = (price: number) => {
  return price.toLocaleString('fr-FR')
}

export const ProductCard = memo(({ product, index }: ProductCardProps) => {
  const [isLiked, setIsLiked] = useState(false)
  //const [ setIsQuickView] = useState(false)

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
                //onClick={() => setIsQuickView(true)}
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
})

ProductCard.displayName = 'ProductCard'

// Export des types si besoin dans d'autres fichiers
export type { Product, ProductCardProps }