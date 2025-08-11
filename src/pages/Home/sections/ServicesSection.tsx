import { motion } from 'framer-motion'
import { Users, Gift, CreditCard, Truck, Headphones } from 'lucide-react'

export const ServicesSection = ({ servicesData }: {
  servicesData: Array<{
    id: number
    icon: any
    title: string
    description: string
    color: string
    link: string
  }>
}) => {
  return (
    <section className="py-24 bg-services-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-6">
            Nos Services
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Une expérience shopping complète pensée pour votre satisfaction
          </p>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.1 }}
        >
          {servicesData.map((service, index) => {
            const Icon = service.icon
            return (
              <motion.div
                key={service.id}
                className="group p-6 bg-services-card-bg rounded-3xl border border-services-card-border hover:shadow-services-card transition-all duration-300 cursor-pointer text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.03, y: -5 }}
              >
                <motion.div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.color} p-4 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}
                  whileHover={{ rotate: 5 }}
                >
                  <Icon className="w-full h-full text-services-icon-text" />
                </motion.div>
                
                <h3 className="font-semibold text-services-text-primary mb-3 group-hover:text-services-text-hover transition-colors">
                  {service.title}
                </h3>
                
                <p className="text-sm text-services-text-secondary leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
ServicesSection.displayName = 'ServicesSection'
export default ServicesSection