import { motion } from 'framer-motion'
import { Clock } from 'lucide-react'
import { useState, useEffect } from 'react'

interface CountdownTimerProps {
  endDate: string
  message?: string
}

export const CountdownTimer = ({ 
  endDate,
  message = "Offre limitée!" 
}: CountdownTimerProps) => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0
  })

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date()
      const end = new Date(endDate)
      const distance = end.getTime() - now.getTime()

      if (distance > 0) {
        setTimeLeft({
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        })
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [endDate])

  return (
    <motion.div
      className="inline-flex items-center gap-6 px-6 py-3 rounded-full bg-gray-100"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay: 0.3 }}
    >
      <Clock className="text-red-500 w-5 h-5" />
      <div className="flex gap-4 items-center">
        <div className="text-center">
          <div className="text-2xl font-bold text-red-600">
            {String(timeLeft.hours).padStart(2, '0')}
          </div>
          <div className="text-xs text-gray-600">Heures</div>
        </div>
        <span className="text-red-500 text-2xl">:</span>
        <div className="text-center">
          <div className="text-2xl font-bold text-red-600">
            {String(timeLeft.minutes).padStart(2, '0')}
          </div>
          <div className="text-xs text-gray-600">Minutes</div>
        </div>
        <span className="text-red-500 text-2xl">:</span>
        <div className="text-center">
          <div className="text-2xl font-bold text-red-600">
            {String(timeLeft.seconds).padStart(2, '0')}
          </div>
          <div className="text-xs text-gray-600">Secondes</div>
        </div>
      </div>
      <span className="text-sm font-semibold text-red-600">{message}</span>
    </motion.div>
  )
}