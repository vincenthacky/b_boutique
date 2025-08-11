// components/common/Loader.tsx
import logo_orange from '@/assets/Logo_orange.png'

import React, { memo, useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// Remplacez par votre vraie image


const Loader = memo(() => {
  const [loadingStage, setLoadingStage] = useState(0)
  const [progress, setProgress] = useState(0)

  // Messages de chargement créatifs
  const loadingMessages = [
    "Dévoilant l'élégance africaine...",
    "Tissant des créations uniques...",
    "Révélant l'art du style...",
    "Préparant votre expérience premium..."
  ]

  // Simulation du chargement progressif
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) return 100
        const increment = Math.random() * 15 + 5
        return Math.min(prev + increment, 100)
      })
    }, 1000)

    const stageInterval = setInterval(() => {
      setLoadingStage(prev => (prev + 1) % loadingMessages.length)
    }, 1500)

    return () => {
      clearInterval(interval)
      clearInterval(stageInterval)
    }
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100 relative overflow-hidden">
      
      {/* Particules de fond subtiles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-amber-300/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 0.5, 0],
              scale: [0, 1, 0]
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      <div className="text-center relative z-10">
        
        {/* Logo avec animations sophistiquées */}
        <div className="relative mb-8">
          {/* Cercles dorés en arrière-plan */}
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute inset-0 rounded-full border border-amber-300/30"
              style={{
                width: `${120 + i * 30}px`,
                height: `${120 + i * 30}px`,
                left: `${-15 - i * 15}px`,
                top: `${-15 - i * 15}px`
              }}
              animate={{
                rotate: i % 2 === 0 ? 360 : -360,
                scale: [1, 1.1, 1]
              }}
              transition={{
                rotate: { duration: 8 + i * 2, repeat: Infinity, ease: "linear" },
                scale: { duration: 3, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }
              }}
            />
          ))}
          
          {/* Conteneur du logo principal */}
          <motion.div
            className="relative w-32 h-32 mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden flex items-center justify-center"
            animate={{
              scale: [1, 1.05, 1],
              rotateY: [0, 5, -5, 0]
            }}
            transition={{
              scale: { duration: 2, repeat: Infinity, ease: "easeInOut" },
              rotateY: { duration: 4, repeat: Infinity, ease: "easeInOut" }
            }}
            style={{
              background: 'linear-gradient(145deg, #ffffff, #f8f9fa)',
              boxShadow: '0 25px 50px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.6)'
            }}
          >
            <motion.img
              src={logo_orange}
              alt="Be Boutique Logo"
              className="w-40 h-40 object-contain"
              animate={{
                filter: [
                  "brightness(1) saturate(1)",
                  "brightness(1.1) saturate(1.2)",
                  "brightness(1) saturate(1)"
                ]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </motion.div>

          {/* Éclats dorés autour du logo */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-amber-400 rounded-full"
              style={{
                left: `${50 + Math.cos((i * 60) * Math.PI / 180) * 50}px`,
                top: `${50 + Math.sin((i * 60) * Math.PI / 180) * 50}px`
              }}
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 1, 0],
                rotate: [0, 360]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>

        {/* Titre avec animation élégante */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-3xl sm:text-4xl font-bold mb-2"
        >
          <span className="bg-gradient-to-r from-amber-600 via-orange-500 to-amber-700 bg-clip-text text-transparent">
            Be Boutique
          </span>
        </motion.h1>

        {/* Sous-titre subtil */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-amber-700/70 text-sm font-light tracking-wider uppercase mb-8"
        >
          L'Afrique se révèle
        </motion.p>

        {/* Message de chargement rotatif */}
        <div className="h-6 mb-8">
          <AnimatePresence mode="wait">
            <motion.p
              key={loadingStage}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="text-gray-600 text-base font-light"
            >
              {loadingMessages[loadingStage]}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Barre de progression sophistiquée */}
        <div className="relative">
          {/* Conteneur principal */}
          <div className="w-80 h-3 bg-gradient-to-r from-gray-200 to-gray-100 rounded-full overflow-hidden mx-auto shadow-inner">
            {/* Barre de progression avec gradient animé */}
            <motion.div
              className="h-full rounded-full relative overflow-hidden"
              style={{
                background: 'linear-gradient(90deg, #D97706, #F59E0B, #EAB308, #D97706)',
                backgroundSize: '200% 100%'
              }}
              animate={{
                width: `${progress}%`,
                backgroundPosition: ['0% 0%', '100% 0%', '0% 0%']
              }}
              transition={{
                width: { duration: 0.3, ease: "easeOut" },
                backgroundPosition: { duration: 2, repeat: Infinity, ease: "linear" }
              }}
            >
              {/* Effet de brillance */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                animate={{
                  x: ['-100%', '100%']
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatDelay: 0.5,
                  ease: "easeInOut"
                }}
              />
            </motion.div>
          </div>

          {/* Pourcentage */}
          <motion.div
            className="mt-3 text-amber-600 text-sm font-semibold"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            {Math.round(progress)}%
          </motion.div>
        </div>

        {/* Points de chargement décoratifs */}
        <div className="flex justify-center space-x-2 mt-8">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="w-2 h-2 bg-amber-400 rounded-full"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.3, 1, 0.3]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
      </div>

      {/* Effet de vague subtil en bas */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-amber-100/50 to-transparent pointer-events-none">
        <svg className="absolute bottom-0 w-full h-20" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <motion.path
            d="M0,60 C400,100 800,20 1200,60 L1200,120 L0,120 Z"
            fill="rgba(217, 119, 6, 0.1)"
            animate={{
              d: [
                "M0,60 C400,100 800,20 1200,60 L1200,120 L0,120 Z",
                "M0,60 C400,20 800,100 1200,60 L1200,120 L0,120 Z",
                "M0,60 C400,100 800,20 1200,60 L1200,120 L0,120 Z"
              ]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </svg>
      </div>
    </div>
  )
})

Loader.displayName = 'Loader'
export default Loader