// src/components/ui/ScrollableProductsSection.tsx

import { memo, useRef } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import ProductCard from './ProductCard'
import type { Product } from '../../types/homeTypes'

interface ScrollableProductsSectionProps {
  products: Product[]
  containerClass?: string
  showNavigation?: boolean
  cardSize?: 'small' | 'medium' | 'large'
}

const ScrollableProductsSection = memo(({ 
  products, 
  containerClass = 'products-container',
  showNavigation = true,
  cardSize = 'medium'
}: ScrollableProductsSectionProps) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const scrollContainer = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = cardSize === 'small' ? 280 : cardSize === 'medium' ? 320 : 380
      scrollContainerRef.current.scrollBy({ 
        left: direction === 'left' ? -scrollAmount : scrollAmount, 
        behavior: 'smooth' 
      })
    }
  }

  if (!products || products.length === 0) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-gray-500">Aucun produit disponible</p>
      </div>
    )
  }

  return (
    <div className="relative">
      {/* Navigation Buttons */}
      {showNavigation && products.length > 3 && (
        <>
          <motion.button
            onClick={() => scrollContainer('left')}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-xl hover:bg-white transition-all duration-200 hover:scale-110"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <ChevronLeft size={24} className="text-gray-700" />
          </motion.button>
          
          <motion.button
            onClick={() => scrollContainer('right')}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-xl hover:bg-white transition-all duration-200 hover:scale-110"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <ChevronRight size={24} className="text-gray-700" />
          </motion.button>
        </>
      )}

      {/* Scrollable Container */}
      <div 
        ref={scrollContainerRef}
        className={`${containerClass} flex gap-6 overflow-x-auto hide-scrollbar px-12 pb-4 scroll-smooth`}
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          WebkitScrollbar: { display: 'none' }
        }}
      >
        {products.map((product, index) => {
          const cardWidth = cardSize === 'small' ? 'w-64' : cardSize === 'medium' ? 'w-80' : 'w-96'
          return (
            <div key={product.id} className={`flex-shrink-0 ${cardWidth}`}>
              <ProductCard 
                product={product} 
                index={index}
                size={cardSize}
              />
            </div>
          )
        })}
      </div>

      {/* Gradient overlays pour indiquer la possibilité de scroll */}
      {showNavigation && products.length > 3 && (
        <>
          <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-white via-white/50 to-transparent pointer-events-none z-5" />
          <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-white via-white/50 to-transparent pointer-events-none z-5" />
        </>
      )}
    </div>
  )
})

ScrollableProductsSection.displayName = 'ScrollableProductsSection'

export default ScrollableProductsSection