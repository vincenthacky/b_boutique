import React, { memo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
// Importez votre logo
import logo_orange from '@/assets/Logo_orange.png'

interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large' | 'xlarge'
  variant?: 'logo' | 'minimal' | 'elegant' | 'luxury'
  color?: 'primary' | 'secondary' | 'white' | 'gold'
  text?: string
  showLogo?: boolean
  fullScreen?: boolean
}

const LoadingSpinner = memo(({
  size = 'medium',
  variant = 'logo',
  color = 'primary',
  text = 'Chargement...',
  showLogo = true,
  fullScreen = false
}: LoadingSpinnerProps) => {

  const sizeConfig = {
    small: { container: 'w-16 h-16', logo: 'w-8 h-8', text: 'text-xs' },
    medium: { container: 'w-24 h-24', logo: 'w-12 h-12', text: 'text-sm' },
    large: { container: 'w-32 h-32', logo: 'w-16 h-16', text: 'text-base' },
    xlarge: { container: 'w-40 h-40', logo: 'w-20 h-20', text: 'text-lg' }
  }

  // Utilisez votre vraie image logo
  

  const BeLogo = ({ className }: { className?: string }) => (
    <img
      src={logo_orange}
      alt="Be Boutique Logo"
      className={`${className} object-contain`}
    />
  )

  const LogoVariant = () => (
    <div className="relative flex flex-col items-center justify-center">
      {/* Cercles dorés concentriques animés */}
      <div className="relative">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute inset-0 rounded-full border border-amber-400/30"
            style={{
              width: `${120 + i * 20}px`,
              height: `${120 + i * 20}px`,
              left: `${-10 - i * 10}px`,
              top: `${-10 - i * 10}px`
            }}
            animate={{
              rotate: 360,
              scale: [1, 1.05, 1],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{
              rotate: { duration: 4 + i, repeat: Infinity, ease: "linear" },
              scale: { duration: 2, repeat: Infinity, ease: "easeInOut" },
              opacity: { duration: 3, repeat: Infinity, ease: "easeInOut" },
              delay: i * 0.2
            }}
          />
        ))}

        {/* Logo central avec animation de respiration */}
        <motion.div
          className={`${sizeConfig[size].container} relative flex items-center justify-center`}
          animate={{
            scale: [1, 1.08, 1],
            filter: [
              "drop-shadow(0 0 10px rgba(212, 175, 55, 0.3))",
              "drop-shadow(0 0 25px rgba(255, 215, 0, 0.5))",
              "drop-shadow(0 0 10px rgba(212, 175, 55, 0.3))"
            ]
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <BeLogo className={`${sizeConfig[size].logo} z-10`} />
        </motion.div>

        {/* Particules dorées flottantes */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-amber-400 rounded-full"
            style={{
              left: `${50 + Math.cos((i * 45) * Math.PI / 180) * 60}px`,
              top: `${50 + Math.sin((i * 45) * Math.PI / 180) * 60}px`
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0],
              y: [0, -10, 0]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.25
            }}
          />
        ))}
      </div>

      {/* Texte avec effet de typing */}
      <AnimatePresence>
        {text && (
          <motion.div
            className={`mt-8 ${sizeConfig[size].text} font-light tracking-wide text-amber-600 text-center`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <motion.span
              animate={{ opacity: [1, 0.4, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              {text}
            </motion.span>
            {/* Points de suspension animés */}
            <motion.span className="inline-block ml-1">
              {[...Array(3)].map((_, i) => (
                <motion.span
                  key={i}
                  className="inline-block"
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: i * 0.2,
                    ease: "easeInOut"
                  }}
                >
                  .
                </motion.span>
              ))}
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )

  const ElegantVariant = () => (
    <div className="relative flex flex-col items-center justify-center">
      {/* Anneau doré principal */}
      <motion.div
        className={`${sizeConfig[size].container} border-2 border-amber-400/20 rounded-full relative flex items-center justify-center backdrop-blur-sm`}
        style={{
          background: 'conic-gradient(from 0deg, transparent 0deg, rgba(212, 175, 55, 0.2) 90deg, transparent 180deg, rgba(255, 215, 0, 0.3) 270deg, transparent 360deg)'
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
      >
        {/* Logo au centre */}
        <BeLogo className={`${sizeConfig[size].logo} opacity-90`} />
        
        {/* Indicateur de progression */}
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-transparent"
          style={{
            borderTopColor: '#D4AF37',
            borderRightColor: '#FFD700'
          }}
          animate={{ rotate: -360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />
      </motion.div>

      {/* Texte élégant */}
      {text && (
        <motion.p
          className={`mt-6 ${sizeConfig[size].text} font-light text-amber-700 tracking-wider uppercase`}
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          {text}
        </motion.p>
      )}
    </div>
  )

  const LuxuryVariant = () => (
    <div className="relative flex flex-col items-center justify-center">
      {/* Cadre diamant avec éclats */}
      <div className="relative">
        {/* Éclats de lumière */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-0.5 h-8 bg-gradient-to-t from-transparent via-amber-400 to-transparent origin-bottom"
            style={{
              left: '50%',
              top: '50%',
              transformOrigin: '50% 100px',
              transform: `translate(-50%, -100%) rotate(${i * 30}deg)`
            }}
            animate={{
              opacity: [0, 1, 0],
              scaleY: [0.5, 1.2, 0.5]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.1
            }}
          />
        ))}

        {/* Logo avec effet cristal */}
        <motion.div
          className={`${sizeConfig[size].container} relative flex items-center justify-center`}
          style={{
            background: 'radial-gradient(circle, rgba(212, 175, 55, 0.1) 0%, transparent 70%)',
            backdropFilter: 'blur(10px)',
            borderRadius: '50%',
            border: '1px solid rgba(212, 175, 55, 0.3)'
          }}
          animate={{
            boxShadow: [
              '0 0 20px rgba(212, 175, 55, 0.2)',
              '0 0 40px rgba(255, 215, 0, 0.4)',
              '0 0 20px rgba(212, 175, 55, 0.2)'
            ]
          }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <BeLogo className={`${sizeConfig[size].logo}`} />
        </motion.div>
      </div>

      {/* Texte avec effet premium */}
      {text && (
        <motion.div
          className={`mt-8 ${sizeConfig[size].text} font-serif text-amber-600 tracking-wider text-center`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <motion.span
            className="inline-block"
            animate={{
              background: [
                'linear-gradient(90deg, #D4AF37 0%, #FFD700 50%, #D4AF37 100%)',
                'linear-gradient(90deg, #FFD700 0%, #D4AF37 50%, #FFD700 100%)',
                'linear-gradient(90deg, #D4AF37 0%, #FFD700 50%, #D4AF37 100%)'
              ]
            }}
            style={{
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent'
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            {text}
          </motion.span>
        </motion.div>
      )}
    </div>
  )

  const MinimalVariant = () => (
    <div className="flex flex-col items-center justify-center">
      <motion.div
        className={`${sizeConfig[size].container} flex items-center justify-center`}
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      >
        <BeLogo className={`${sizeConfig[size].logo}`} />
      </motion.div>
      {text && (
        <p className={`mt-4 ${sizeConfig[size].text} text-amber-600 font-light`}>
          {text}
        </p>
      )}
    </div>
  )

  const renderVariant = () => {
    switch (variant) {
      case 'logo': return <LogoVariant />
      case 'elegant': return <ElegantVariant />
      case 'luxury': return <LuxuryVariant />
      case 'minimal': return <MinimalVariant />
      default: return <LogoVariant />
    }
  }

  const containerClasses = fullScreen
    ? "fixed inset-0 bg-white/95 backdrop-blur-md flex items-center justify-center z-50"
    : "flex items-center justify-center"

  return (
    <div className={containerClasses}>
      {renderVariant()}
    </div>
  )
})

LoadingSpinner.displayName = 'LoadingSpinner'

// Export avec exemples d'utilisation
export default LoadingSpinner

// Exemples d'utilisation :
export const LoadingExamples = () => (
  <div className="grid grid-cols-2 gap-8 p-8 bg-gray-50">
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h3 className="text-sm font-medium mb-4">Logo Premium</h3>
      <LoadingSpinner variant="logo" size="large" text="Chargement de vos créations..." />
    </div>
    
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h3 className="text-sm font-medium mb-4">Élégant</h3>
      <LoadingSpinner variant="elegant" size="medium" text="Préparation..." />
    </div>
    
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h3 className="text-sm font-medium mb-4">Luxe</h3>
      <LoadingSpinner variant="luxury" size="large" text="Excellence en cours..." />
    </div>
    
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h3 className="text-sm font-medium mb-4">Minimal</h3>
      <LoadingSpinner variant="minimal" size="medium" />
    </div>
  </div>
)