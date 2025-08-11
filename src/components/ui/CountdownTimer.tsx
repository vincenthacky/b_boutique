// src/components/ui/CountdownTimer.tsx

import { memo, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Clock } from 'lucide-react'

interface CountdownTimerProps {
  endDate: string
  message?: string
  size?: 'small' | 'medium' | 'large'
}

interface TimeLeft {
  hours: number
  minutes: number
  seconds: number
}

const CountdownTimer = memo(({ 
  endDate, 
  message = 'Offre limitée!',
  size = 'medium'
}: CountdownTimerProps) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ hours: 0, minutes: 0, seconds: 0 })
  const [isExpired, setIsExpired] = useState(false)

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime()
      const end = new Date(endDate).getTime()
      const distance = end - now

      if (distance > 0) {
        setTimeLeft({
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        })
        setIsExpired(false)
      } else {
        setIsExpired(true)
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [endDate])

  const sizeClasses = {
    small: {
      container: 'px-4 py-2',
      icon: 'w-4 h-4',
      number: 'text-lg',
      label: 'text-xs',
      message: 'text-xs'
    },
    medium: {
      container: 'px-6 py-3',
      icon: 'w-5 h-5',
      number: 'text-2xl',
      label: 'text-xs',
      message: 'text-sm'
    },
    large: {
      container: 'px-8 py-4',
      icon: 'w-6 h-6',
      number: 'text-3xl',
      label: 'text-sm',
      message: 'text-base'
    }
  }

  const classes = sizeClasses[size]

  if (isExpired) {
    return (
      <motion.div
        className={`inline-flex items-center gap-4 ${classes.container} bg-gray-100 rounded-full`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <Clock className={`text-gray-500 ${classes.icon}`} />
        <span className={`${classes.message} font-semibold text-gray-600`}>
          Offre expirée
        </span>
      </motion.div>
    )
  }

  return (
    <motion.div
      className={`inline-flex items-center gap-6 ${classes.container} bg-white/90 backdrop-blur-md rounded-full shadow-lg border border-red-100`}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay: 0.3 }}
    >
      <motion.div
        animate={{ 
          scale: [1, 1.1, 1],
          rotate: [0, 5, -5, 0]
        }}
        transition={{ 
          duration: 2, 
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <Clock className={`text-red-500 ${classes.icon}`} />
      </motion.div>
      
      <div className="flex gap-4 items-center">
        <div className="text-center">
          <motion.div 
            className={`${classes.number} font-bold text-red-600`}
            key={timeLeft.hours}
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {timeLeft.hours.toString().padStart(2, '0')}
          </motion.div>
          <div className={`${classes.label} text-gray-600`}>Heures</div>
        </div>
        
        <span className="text-red-500 text-2xl font-bold">:</span>
        
        <div className="text-center">
          <motion.div 
            className={`${classes.number} font-bold text-red-600`}
            key={timeLeft.minutes}
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {timeLeft.minutes.toString().padStart(2, '0')}
          </motion.div>
          <div className={`${classes.label} text-gray-600`}>Minutes</div>
        </div>
        
        <span className="text-red-500 text-2xl font-bold">:</span>
        
        <div className="text-center">
          <motion.div 
            className={`${classes.number} font-bold text-red-600`}
            key={timeLeft.seconds}
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {timeLeft.seconds.toString().padStart(2, '0')}
          </motion.div>
          <div className={`${classes.label} text-gray-600`}>Secondes</div>
        </div>
      </div>
      
      <motion.span 
        className={`${classes.message} font-semibold text-red-600`}
        animate={{ 
          opacity: [1, 0.7, 1]
        }}
        transition={{ 
          duration: 1.5, 
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        {message}
      </motion.span>
    </motion.div>
  )
})

CountdownTimer.displayName = 'CountdownTimer'

export default CountdownTimer