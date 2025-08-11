import { motion } from 'framer-motion'
import { ArrowRight, Crown } from 'lucide-react'

export const CollectionsSection = ({ collectionsData }: {
  collectionsData: Array<{
    id: number
    title: string
    description: string
    image: string
    creator: string
    itemCount: number
    color: string
    link: string
  }>
}) => {
  return (
    <section className="py-24 bg-collections-section relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <motion.span
            className="inline-block px-5 py-2 bg-gradient-to-r from-purple-100 to-purple-100 text-purple-700 rounded-full text-sm font-bold uppercase tracking-wider mb-6"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring" }}
          >
            COLLECTIONS EXCLUSIVES
          </motion.span>
          <h2 className="text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-6">
            Nos Collections Signature
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Des collections thématiques qui racontent l'histoire de l'Afrique moderne avec élégance et authenticité
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {collectionsData.map((collection, index) => (
            <motion.div
              key={collection.id}
              className="group cursor-pointer relative"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              whileHover={{ y: -10 }}
            >
              <div className="relative bg-collections-card-bg rounded-3xl overflow-hidden shadow-collections-card hover:shadow-collections-card-hover transition-all duration-500 border border-collections-card-border">
                <div className="aspect-[4/5] overflow-hidden relative">
                  <img
                    src={collection.image}
                    alt={collection.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${collection.color} opacity-60 group-hover:opacity-70 transition-opacity duration-500`} />
                  <div className="absolute inset-0 flex flex-col justify-end p-8 text-collections-text-primary">
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                    >
                      <div className="mb-3">
                        <span className="px-3 py-1 bg-collections-badge backdrop-blur-md rounded-full text-xs font-bold">
                          {collection.itemCount} pièces exclusives
                        </span>
                      </div>
                      <h3 className="text-3xl font-bold mb-3 drop-shadow-lg">
                        {collection.title}
                      </h3>
                      <p className="text-sm text-collections-text-secondary mb-4 line-clamp-2 drop-shadow">
                        {collection.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-collections-text-tertiary">
                          Par <span className="font-semibold">{collection.creator}</span>
                        </p>
                        <motion.div
                          className="p-2 bg-collections-overlay backdrop-blur-sm rounded-full"
                          whileHover={{ scale: 1.1, backgroundColor: 'var(--collections-overlay-hover-bg)' }}
                        >
                          <ArrowRight className="w-5 h-5" />
                        </motion.div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
        >
          <motion.button
            className="group px-10 py-4 bg-collections-btn text-collections-text-primary rounded-full font-bold text-lg shadow-collections-btn hover:shadow-collections-btn-hover transition-all duration-300 flex items-center gap-3 mx-auto"
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.95 }}
          >
            <Crown className="w-5 h-5" />
            <span>Explorer toutes nos collections</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}

CollectionsSection.displayName = 'CollectionsSection'
export default CollectionsSection