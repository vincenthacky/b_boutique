import { motion } from 'framer-motion'
import { ArrowRight ,Sparkles} from 'lucide-react'
import { SectionTitle } from '../components/SectionTitle'

export const CategoriesSection = ({ categoriesData }: {
  categoriesData: Array<{
    id: number
    name: string
    icon: string
    count: string
    color: string
    hoverColor: string
    description: string
    link: string
  }>
}) => {
  return (
    <section className="py-24 relative overflow-hidden" style={{ background: 'var(--categories-bg-gradient)' }}>
      <div className="absolute inset-0" style={{ opacity: 'var(--categories-pattern-opacity)' }}>
        <div className="absolute inset-0" style={{ backgroundImage: 'var(--categories-pattern-svg)' }} />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          
         <SectionTitle
          preTitle="DÉCOUVREZ NOS UNIVERS"
          title="Catégories Phares"
          subtitle="Explorez nos collections soigneusement sélectionnées, chaque catégorie raconte une histoire unique"
          icon={{ component: Sparkles, size: 8 }}
          
        />
        </div>
        
        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.1 }}
        >
          {categoriesData.map((category, index) => (
            <motion.div
              key={category.id}
              className={`group relative p-8 rounded-3xl bg-gradient-to-br ${category.color} ${category.hoverColor} backdrop-blur-sm transition-all duration-500 cursor-pointer overflow-hidden`}
              style={{
                border: `1px solid var(--categories-card-border)`,
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
              }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ 
                scale: 1.05, 
                y: -8,
                boxShadow: 'var(--categories-card-shadow-hover)'
              }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: 'var(--categories-card-hover-overlay)' }}
              />
              
              <div className="relative text-center">
                <motion.div
                  className="text-5xl mb-4"
                  whileHover={{
                    scale: 1.2,
                    rotate: [0, -10, 10, 0],
                    transition: { duration: 0.5 }
                  }}
                >
                  {category.icon}
                </motion.div>
                
                <h3 className="font-bold mb-1 text-lg" style={{ color: 'rgb(var(--categories-text-primary))' }}>
                  {category.name}
                </h3>
                
                <p className="text-sm font-medium mb-2" style={{ color: 'rgb(var(--categories-text-secondary))' }}>
                  {category.count}
                </p>
                
                <p className="text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ color: 'rgb(var(--categories-text-tertiary))' }}>
                  {category.description}
                </p>
              </div>
              
              <motion.div
                className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={{ x: -10 }}
                whileHover={{ x: 0 }}
              >
                <ArrowRight className="w-4 h-4" style={{ color: 'rgb(var(--categories-arrow-color))' }} />
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

CategoriesSection.displayName = 'CategoriesSection'

export default CategoriesSection