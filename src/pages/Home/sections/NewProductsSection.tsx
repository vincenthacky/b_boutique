import { motion } from 'framer-motion'
import { Award, ArrowRight } from 'lucide-react'
import  ProductCard  from './../components/ProductCard'

export const NewProductsSection = ({ newProductsData }: {
  newProductsData: Array<{
    id: number
    title: string
    price: number
    image: string
    creator: string
    rating: number
    reviews: number
    isNew: boolean
    category: string
  }>
}) => {
  return (
    <section className="py-24 bg-new-products-bg relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <motion.span
            className="inline-block px-5 py-2 bg-gradient-to-r from-green-100 to-green-100 text-green-700 rounded-full text-sm font-bold uppercase tracking-wider mb-6"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring" }}
          >
            FRAÎCHEMENT ARRIVÉ
          </motion.span>
          <div className="flex items-center justify-center gap-4 mb-6">
            <Award className="text-green-500 w-8 h-8" />
            <h2 className="text-5xl font-bold bg-gradient-to-r from-green-600 to-green-500 bg-clip-text text-transparent">
              Nouvelles Créations
            </h2>
            <Award className="text-green-500 w-8 h-8" />
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Les dernières œuvres de nos artisans talentueux, des pièces uniques qui fusionnent tradition et modernité
          </p>
        </div>

        <div className="relative">
          <div className="flex gap-6 overflow-x-auto hide-scrollbar px-12 pb-4">
            {newProductsData.map((product, index) => (
              <div key={product.id} className="flex-shrink-0 w-80">
                <ProductCard product={product} index={index} />
              </div>
            ))}
          </div>
        </div>

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <motion.button
            className="group px-8 py-4 bg-new-products-btn text-new-products-btn-text rounded-full font-bold shadow-new-products-btn hover:shadow-new-products-btn-hover transition-all duration-300 flex items-center gap-3 mx-auto"
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>Voir toutes les créations</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
NewProductsSection.displayName = 'NewProductsSection'
export default NewProductsSection