import { motion } from 'framer-motion'
import { Sparkles, ArrowRight } from 'lucide-react'
import {ProductCard} from '../components/ProductCard'
import { SectionTitle } from '../components/SectionTitle'
import { CountdownTimer } from '../components/CountdownTimer'

interface Product {
  id: number
  title: string
  price: number
  originalPrice?: number
  discount?: number
  image: string
  badge?: string
  badgeColor?: string
  rating: number
  reviews: number
  sold?: number
  isNew?: boolean
  isBestseller?: boolean
  category?: string
  creator?: string
}

interface FeaturedProductsSectionProps {
  featuredProductsData: Product[]
  timerData: {
    endDate: string
    message?: string
  }
}

export const FeaturedProductsSection = ({ 
  featuredProductsData,
  timerData 
}: FeaturedProductsSectionProps) => {
  return (
    <section className="py-24 bg-amber-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title="Offres Exceptionnelles"
          subtitle="Profitez de réductions allant jusqu'à -40% sur une sélection exclusive"
          icon={Sparkles}
          color="amber"
        />

        <div className="text-center mb-12">
          <CountdownTimer 
            endDate={timerData.endDate} 
            message={timerData.message} 
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
          {featuredProductsData.map((product, index) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              index={index} 
            />
          ))}
        </div>

        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <motion.button
            className="group px-10 py-5 bg-amber-600 text-white rounded-full font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-3 mx-auto"
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>Voir toutes les offres</span>
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}

FeaturedProductsSection.displayName = 'FeaturedProductsSection'