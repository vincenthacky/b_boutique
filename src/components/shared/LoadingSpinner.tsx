// src/components/shared/LoadingSpinner.tsx

import { memo } from 'react'
import { motion } from 'framer-motion'

interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large'
  color?: 'primary' | 'secondary' | 'white'
  text?: string
}

const LoadingSpinner = memo(({ 
  size = 'medium', 
  color = 'primary',
  text 
}: LoadingSpinnerProps) => {
  const sizeClasses = {
    small: 'w-4 h-4',
    medium: 'w-8 h-8',
    large: 'w-12 h-12'
  }

  const colorClasses = {
    primary: 'border-amber-500',
    secondary: 'border-gray-400',
    white: 'border-white'
  }

  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <motion.div
        className={`${sizeClasses[size]} border-2 ${colorClasses[color]} border-t-transparent rounded-full`}
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
      {text && (
        <motion.p
          className={`text-sm ${color === 'white' ? 'text-white' : 'text-gray-600'}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {text}
        </motion.p>
      )}
    </div>
  )
})

LoadingSpinner.displayName = 'LoadingSpinner'

export default LoadingSpinner