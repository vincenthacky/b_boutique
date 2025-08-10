// components/common/Loader.tsx
import { memo } from 'react'
import { motion } from 'framer-motion'

const Loader = memo(() => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 to-orange-50">
      <div className="text-center">
        {/* Logo animé */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotateY: [0, 360]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="bg-gradient-to-r from-amber-500 to-orange-600 text-white w-20 h-20 rounded-2xl flex items-center justify-center font-bold text-3xl mx-auto mb-8 shadow-2xl"
        >
          Be
        </motion.div>

        {/* Texte de chargement */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-2xl font-bold text-gray-900 mb-4"
        >
          Be Boutique
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-gray-600 mb-8"
        >
          Chargement de l'excellence africaine...
        </motion.p>

        {/* Barre de progression animée */}
        <div className="w-64 h-2 bg-gray-200 rounded-full overflow-hidden mx-auto">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="h-full bg-gradient-to-r from-amber-500 to-orange-600 rounded-full"
          />
        </div>
      </div>
    </div>
  )
})

Loader.displayName = 'Loader'
export default Loader
