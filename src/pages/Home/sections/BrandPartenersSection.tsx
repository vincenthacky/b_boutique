import { motion } from 'framer-motion'


export const BrandPartnersSection = ({ 
  brandsData,
  partnerStatsData 
}: {
  brandsData: Array<{
    id: number
    name: string
    logo: string
    specialty: string
    productsCount: number
    since: number
  }>
  partnerStatsData: Array<{
    id: number
    number: string
    label: string
    icon: any
  }>
}) => {
  return (
    <section className="py-24 bg-brands-section relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <motion.span
            className="inline-block px-5 py-2 bg-gradient-to-r from-blue-100 to-blue-100 text-blue-700 rounded-full text-sm font-bold uppercase tracking-wider mb-6"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring" }}
          >
            PARTENAIRES DE CONFIANCE
          </motion.span>
          <h2 className="text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-6">
            Nos Marques Partenaires
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Une sélection rigoureuse d'ateliers et créateurs reconnus pour leur excellence et leur savoir-faire unique
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-12">
          {brandsData.map((brand, index) => (
            <motion.div
              key={brand.id}
              className="group relative"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <div className="bg-brands-card-bg rounded-2xl p-6 shadow-brands-card hover:shadow-brands-card-hover transition-all duration-300 border border-brands-card-border overflow-hidden">
                <div className="relative">
                  <img
                    src={brand.logo}
                    alt={brand.name}
                    className="w-full h-20 object-contain mb-4 filter grayscale group-hover:grayscale-0 transition-all duration-500"
                  />
                  <h3 className="font-bold text-brands-text-primary text-center mb-1 group-hover:text-brands-text-hover transition-colors">
                    {brand.name}
                  </h3>
                  <p className="text-xs text-brands-text-secondary text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {brand.specialty}
                  </p>
                  <motion.div
                    className="absolute inset-0 bg-brands-overlay group-hover:bg-brands-overlay-hover rounded-2xl transition-all duration-500"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
        >
          {partnerStatsData.map((stat, index) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={stat.id}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.7 + index * 0.1 }}
              >
                <Icon className="w-8 h-8 text-brands-stats-icon mx-auto mb-3" />
                <div className="text-2xl font-bold text-brands-stats-text-primary">{stat.number}</div>
                <div className="text-sm text-brands-stats-text-secondary">{stat.label}</div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}

BrandPartnersSection.displayName = 'BrandPartnersSection'

export default BrandPartnersSection