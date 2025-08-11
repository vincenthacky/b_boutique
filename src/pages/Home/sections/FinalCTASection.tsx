import { motion } from 'framer-motion'
import { Zap, Heart, ArrowRight, Crown, Award, Clock } from 'lucide-react'

export const FinalCTASection = ({ statisticsData }: {
  statisticsData: Array<{
    id: number
    number: string
    label: string
    icon: any
  }>
}) => {
  return (
    <section className="py-32 bg-final-cta-section relative overflow-hidden">
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-0 left-0 w-96 h-96 rounded-full blur-3xl"
          style={{ backgroundColor: 'var(--final-cta-bubble-primary)' }}
          animate={{
            x: [0, 100, 0],
            y: [0, -100, 0],
          }}
          transition={{ duration: 20, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-0 right-0 w-96 h-96 rounded-full blur-3xl"
          style={{ backgroundColor: 'var(--final-cta-bubble-secondary)' }}
          animate={{
            x: [0, -100, 0],
            y: [0, 100, 0],
          }}
          transition={{ duration: 25, repeat: Infinity }}
        />
      </div>

      <div className="max-w-5xl mx-auto px-4 text-center relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-flex items-center gap-3 px-6 py-3 backdrop-blur-md rounded-full mb-8"
            style={{ backgroundColor: 'var(--final-cta-badge-bg)' }}
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", delay: 0.2 }}
          >
            <Crown className="text-final-cta-text-primary w-6 h-6" />
            <span className="text-final-cta-text-primary font-bold text-lg">Plus de 10,000 clients satisfaits</span>
            <Crown className="text-final-cta-text-primary w-6 h-6" />
          </motion.div>

          <h2 className="text-5xl md:text-7xl font-bold text-final-cta-text-primary mb-8 leading-tight">
            Exprimez votre
            <br />
            <span className="text-final-cta-text-secondary">
              fierté africaine
            </span>
          </h2>

          <p className="text-2xl text-final-cta-text-tertiary mb-12 max-w-3xl mx-auto leading-relaxed">
            Chaque achat soutient nos artisans locaux et préserve 
            nos traditions tout en créant l'Afrique de demain
          </p>

          <motion.div
            className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <motion.button
              className="group px-10 py-5 bg-final-cta-btn-primary-bg text-final-cta-btn-primary-text rounded-full font-bold text-lg shadow-final-cta-btn-primary transition-all duration-300 flex items-center gap-3"
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
            >
              <Zap className="w-6 h-6" />
              <span>Commencer mon shopping</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </motion.button>
            
            <motion.button
              className="px-10 py-5 bg-final-cta-btn-secondary text-final-cta-btn-secondary-text rounded-full font-bold text-lg border-3 border-final-cta-btn-secondary hover:bg-final-cta-btn-secondary-hover backdrop-blur-sm transition-all duration-300 flex items-center gap-3"
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
            >
              <Heart className="w-6 h-6" />
              <span>Devenir artisan partenaire</span>
            </motion.button>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-4 gap-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, staggerChildren: 0.1 }}
          >
            {statisticsData.map((stat, index) => {
              const Icon = stat.icon
              return (
                <motion.div
                  key={stat.id}
                  className="bg-final-cta-stats-card backdrop-blur-md rounded-2xl p-6 border border-final-cta-stats-card"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  whileHover={{ scale: 1.05, backgroundColor: 'var(--final-cta-stats-card-hover)' }}
                >
                  <Icon className="w-8 h-8 text-final-cta-stats-icon mx-auto mb-3" />
                  <motion.div
                    className="text-4xl font-bold text-final-cta-stats-number mb-2"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.9 + index * 0.1, type: "spring" }}
                  >
                    {stat.number}
                  </motion.div>
                  <p className="text-final-cta-stats-label font-medium">{stat.label}</p>
                </motion.div>
              )
            })}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
FinalCTASection.displayName = 'FinalCTASection'
export default FinalCTASection