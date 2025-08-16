import React from 'react'
import { motion, useTransform } from 'framer-motion'
import { Link } from 'react-router-dom';
import { ShoppingBag, Users, Gift, CreditCard, Truck, Headphones, Star, Heart, ArrowRight, Play, Crown, Shield } from 'lucide-react'

export const HeroSection = ({ 
  heroData = {
    title: { line1: "BE", line2: "BOUTIQUE" },
    subtitle: "Découvrez l'élégance africaine authentique avec nos créations uniques",
    preTitle: "L'AFRIQUE SE RÉVÈLE",
    ctaButtons: [
      { text: "Explorer", icon: ShoppingBag, variant: "primary", link: "#" },
      { text: "Regarder", icon: Play, variant: "secondary", link: "#" }
    ],
    backgroundImage: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
  },
  scrollY = { current: 0 }
}: { 
  heroData?: {
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
  scrollY?: any
}) => {

  // L'effet de scale (zoom) est conservé, mais l'effet d'opacité est supprimé.
  const heroScale = scrollY?.current ? useTransform(scrollY, [1, 1.1], [1, 1.1]) : { current: 1 }

  // Configuration simplifiée pour les styles restants
  const overlays = {
    buttonBackdrop: 'bg-white/20',
    scrollIndicator: 'bg-black/20'
  }

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* L'arrière-plan principal sombre a été supprimé. */}
      
      {/* Image de fond avec une teinte noire très légère */}
      <motion.div 
        className="absolute inset-0 w-full h-full"
        style={{ 
          scale: heroScale,
          // L'opacité qui changeait au scroll a été enlevée.
        }}
      >
        <img
          src={heroData.backgroundImage}
          alt="Be Boutique - L'Afrique se révèle"
          // la classe "mix-blend-overlay" a été supprimée pour ne pas assombrir l'image.
          className="w-full h-full object-cover object-center"
          loading="eager"
        />
        {/* Ceci est maintenant la seule couche qui teinte l'image, avec une opacité très faible. */}
        <div 
          className="absolute inset-0"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.15)' }} // Teinte noire très légère (15%)
        ></div>
        {/* Le dégradé sombre supplémentaire sur l'image a été supprimé. */}
      </motion.div>

      {/* Effets de lumière optimisés pour mobile */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-10 left-5 w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 rounded-full blur-2xl sm:blur-3xl opacity-20 sm:opacity-30"
          style={{ background: 'linear-gradient(to bottom right, rgb(251, 191, 36, 0.3), rgb(249, 115, 22, 0.2))' }}
          animate={{ x: [0, 50, 0], y: [0, -25, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-10 right-5 w-48 h-48 sm:w-72 sm:h-72 md:w-96 md:h-96 rounded-full blur-2xl sm:blur-3xl opacity-15 sm:opacity-20"
          style={{ background: 'linear-gradient(to bottom right, rgb(217, 70, 239, 0.2), rgb(236, 72, 153, 0.2))' }}
          animate={{ x: [0, -50, 0], y: [0, 25, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Contenu principal avec responsive amélioré */}
      <div className="relative z-10 text-center w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: "easeOut" }}>
          
          {/* Pré-titre responsive */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center justify-center gap-2 sm:gap-4 mb-4 sm:mb-6"
          >
            <div className="h-px w-8 sm:w-16 md:w-20 bg-gradient-to-r from-transparent to-amber-400"></div>
            <span className="text-amber-400 font-medium tracking-wider sm:tracking-widest text-xs sm:text-sm uppercase whitespace-nowrap">
              {heroData.preTitle}
            </span>
            <div className="h-px w-8 sm:w-16 md:w-20 bg-gradient-to-l from-transparent to-amber-400"></div>
          </motion.div>

          {/* Titre principal ultra-responsive */}
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-4 sm:mb-6 md:mb-8 leading-tight text-white"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {heroData.title.line1}
            <br />
            <span className="inline-flex items-center justify-center gap-2 sm:gap-3 md:gap-4 bg-gradient-to-r from-amber-400 via-yellow-500 to-orange-500 bg-clip-text text-transparent">
              {heroData.title.line2}
              <motion.div
                animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <Crown className="text-amber-400 w-6 h-6 sm:w-8 sm:h-8 md:w-12 md:h-12 lg:w-14 lg:h-14 xl:w-16 xl:h-16" />
              </motion.div>
            </span>
          </motion.h1>
          
          {/* Sous-titre responsive avec meilleure lisibilité mobile */}
          <motion.p
            className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl mb-6 sm:mb-8 md:mb-12 leading-relaxed max-w-sm sm:max-w-2xl md:max-w-3xl lg:max-w-4xl mx-auto text-gray-100 px-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            {heroData.subtitle}
          </motion.p>

          {/* Boutons CTA optimisés pour mobile */}
          <motion.div
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-8 sm:mb-10 md:mb-12 px-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
          >
            {heroData.ctaButtons.map((button, index) => {
              const Icon = button.icon
              const isAnchor = button.link.startsWith('#')

              return isAnchor ? (
                <a href={button.link} key={index}>
                  <motion.button
                    className={`group w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 ${
                      button.variant === 'primary' 
                        ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-2xl shadow-amber-500/25' 
                        : `backdrop-blur-md text-white border-2 border-amber-400/50 ${overlays.buttonBackdrop}`
                    } rounded-full font-bold transition-all duration-300 flex items-center justify-center gap-2 sm:gap-3 text-base sm:text-lg hover:shadow-xl`}
                    whileHover={{ scale: 1.05, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span>{button.text}</span>
                    {button.variant === 'primary' && (
                      <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
                    )}
                  </motion.button>
                </a>
              ) : (
                <Link to={button.link} key={index}>
                  <motion.button
                    className={`group w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 ${
                      button.variant === 'primary' 
                        ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-2xl shadow-amber-500/25' 
                        : `backdrop-blur-md text-white border-2 border-amber-400/50 ${overlays.buttonBackdrop}`
                    } rounded-full font-bold transition-all duration-300 flex items-center justify-center gap-2 sm:gap-3 text-base sm:text-lg hover:shadow-xl`}
                    whileHover={{ scale: 1.05, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span>{button.text}</span>
                    {button.variant === 'primary' && (
                      <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
                    )}
                  </motion.button>
                </Link>
              )
            })}
          </motion.div>

          {/* Indicateurs de confiance avec grille flexible */}
          <motion.div
            className="flex flex-wrap justify-center gap-3 sm:gap-4 md:gap-6 max-w-xs sm:max-w-2xl md:max-w-4xl mx-auto px-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.6 }}
          >
            {[
              { id: 1, icon: Shield, text: 'Paiement sécurisé', highlight: 'sécurisé', shortText: 'Sécurisé' },
              { id: 2, icon: Truck, text: 'Livraison 48-72h/Livraison express', highlight: '48-72h', shortText: '48-72h' },
              { id: 3, icon: Users, text: '10+ partenaires', highlight: '10+', shortText: '10k+' }
            ].filter(Boolean).map((indicator, index) => {
              const Icon = indicator.icon
              return (
                <motion.div
                  key={indicator.id}
                  className="flex flex-col items-center gap-1 sm:gap-2 text-gray-200 min-w-[100px] sm:min-w-[120px] px-2 py-1 flex-1 basis-[calc(50%-12px)] sm:basis-[calc(25%-16px)]"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.3 + index * 0.1 }}
                >
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-amber-400" />
                  <span className="text-xs sm:text-xs text-center leading-tight">
                    <span className="font-bold text-amber-400 block sm:inline">
                      {window.innerWidth < 640 ? indicator.shortText : indicator.highlight}
                    </span>
                    <span className="hidden sm:inline">
                      <br className="sm:hidden" />
                      {indicator.text.replace(indicator.highlight, '')}
                    </span>
                    <span className="sm:hidden block text-gray-400">
                      {indicator.text.replace(indicator.highlight, '').trim()}
                    </span>
                  </span>
                </motion.div>
              )
            })}
          </motion.div>
        </motion.div>
      </div>

      {/* Indicateur de scroll responsive */}
      <motion.div
        className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2 hidden sm:block"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className={`w-6 h-10 sm:w-7 sm:h-12 border-2 border-amber-400/50 rounded-full flex justify-center backdrop-blur-sm ${overlays.scrollIndicator}`}>
          <motion.div
            className="w-1 sm:w-1.5 h-2 sm:h-3 bg-amber-400 rounded-full mt-1.5 sm:mt-2"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>

      {/* Version mobile de l'indicateur de scroll */}
      <motion.div
        className="absolute bottom-2 left-1/2 transform -translate-x-1/2 sm:hidden"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="text-amber-400 text-xs font-medium">
          ↓ Faire défiler ↓
        </div>
      </motion.div>
    </section>
  )
}

HeroSection.displayName = 'HeroSection'
export default HeroSection