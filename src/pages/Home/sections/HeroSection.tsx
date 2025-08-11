import { motion, useTransform } from 'framer-motion'

import { ShoppingBag, Users, Gift, CreditCard, Truck, Headphones, Star, Heart, ArrowRight, Play, Crown,Shield } from 'lucide-react'

export const HeroSection = ({ 
  heroData,
  scrollY 
}: { 
  heroData: {
    title: { line1: string, line2: string }
    subtitle: string
    preTitle: string
    ctaButtons: Array<{
      text: string
      icon: any
      variant: string
      link: string
    }>
    backgroundImage: string
  }
  scrollY: any
}) => {

  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0.3])
  const heroScale = useTransform(scrollY, [0, 300], [1, 1.1])

  return (
    <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
      <motion.div 
        className="absolute inset-0 w-full h-full"
        style={{ scale: heroScale, opacity: heroOpacity }}
      >
        <img
          src={heroData.backgroundImage}
          alt="Be Boutique - L'Afrique se révèle"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0" style={{ background: 'var(--hero-overlay-primary)' }}></div>
        <div className="absolute inset-0" style={{ background: 'var(--hero-overlay-secondary)' }}></div>
      </motion.div>

      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 left-10 w-64 h-64 rounded-full blur-3xl"
          style={{ background: 'linear-gradient(to bottom right, var(--hero-bubble-amber), var(--hero-bubble-orange))' }}
          animate={{ x: [0, 100, 0], y: [0, -50, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 rounded-full blur-3xl"
          style={{ background: 'linear-gradient(to bottom right, var(--hero-bubble-fuchsia), var(--hero-bubble-pink))' }}
          animate={{ x: [0, -100, 0], y: [0, 50, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="relative z-10 text-center w-full max-w-5xl mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: "easeOut" }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center justify-center gap-4 mb-6"
          >
            <div className="h-px w-20" style={{ background: 'var(--hero-divider-gradient)' }}></div>
            <span className="text-amber-400 font-medium tracking-widest text-sm uppercase">
              {heroData.preTitle}
            </span>
            <div className="h-px w-20" style={{ background: 'linear-gradient(to left, transparent, rgb(251, 191, 36))' }}></div>
          </motion.div>

          <motion.h1
            className="text-5xl sm:text-6xl md:text-8xl font-bold mb-8 leading-tight"
            style={{ color: 'rgb(var(--hero-text-white))' }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {heroData.title.line1}
            <br />
            <span className="inline-flex items-center gap-4 bg-clip-text text-transparent"
              style={{ background: 'var(--hero-title-gradient)', WebkitBackgroundClip: 'text' }}>
              {heroData.title.line2}
              <motion.div
                animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <Crown className="text-amber-400 w-12 h-12 md:w-16 md:h-16" />
              </motion.div>
            </span>
          </motion.h1>
          
          <motion.p
            className="text-xl md:text-2xl lg:text-3xl mb-12 leading-relaxed max-w-4xl mx-auto"
            style={{ color: 'rgb(var(--hero-text-white))' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            {heroData.subtitle}
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
          >
            {heroData.ctaButtons.map((button, index) => {
              const Icon = button.icon
              return (
                <motion.button
                  key={index}
                  className={`group px-8 py-4 ${
                    button.variant === 'primary' 
                      ? 'text-white shadow-2xl' 
                      : 'backdrop-blur-md text-white border-2'
                  } rounded-full font-bold transition-all duration-300 flex items-center gap-3 text-lg`}
                  style={{
                    background: button.variant === 'primary' 
                      ? 'var(--hero-btn-primary-bg)' 
                      : 'var(--hero-btn-secondary-bg)',
                    borderColor: button.variant === 'secondary' ? 'var(--hero-btn-secondary-border)' : 'transparent',
                    boxShadow: button.variant === 'primary' 
                      ? '0 25px 50px -12px var(--hero-btn-primary-shadow)' 
                      : 'none'
                  }}
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon className="w-5 h-5" />
                  <span>{button.text}</span>
                  {button.variant === 'primary' && (
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  )}
                </motion.button>
              )
            })}
          </motion.div>

          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.6 }}
          >
            {[
              { id: 1, icon: Shield, text: 'Paiement 100% sécurisé', highlight: 'Sécurisé' },
              { id: 2, icon: Truck, text: 'Livraison rapide 48-72h', highlight: '48-72h' },
              { id: 3, icon: Heart, text: 'Satisfait ou remboursé 30j', highlight: '30 jours' },
              { id: 4, icon: Users, text: 'Plus de 10,000 clients', highlight: '10,000+' }
            ].map((indicator, index) => {
              const Icon = indicator.icon
              return (
                <motion.div
                  key={indicator.id}
                  className="flex flex-col items-center gap-2"
                  style={{ color: 'rgba(255, 255, 255, 0.8)' }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.3 + index * 0.1 }}
                >
                  <Icon className="w-6 h-6 text-amber-400" />
                  <span className="text-xs text-center">
                    <span className="font-bold text-amber-400">{indicator.highlight}</span>
                    <br />
                    {indicator.text.replace(indicator.highlight, '')}
                  </span>
                </motion.div>
              )
            })}
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="w-7 h-12 border-2 rounded-full flex justify-center backdrop-blur-sm"
          style={{ color: 'var(--hero-scroll-border)' }}>
          <motion.div
            className="w-1.5 h-3 rounded-full mt-2"
            style={{ backgroundColor: 'var(--hero-scroll-dot)' }}
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </section>
  )
}
HeroSection.displayName = 'HeroSection'
export default HeroSection