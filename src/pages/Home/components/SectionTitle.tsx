import { motion } from 'framer-motion'
import type { LucideIcon } from 'lucide-react'

interface SectionTitleProps {
  preTitle?: string
  title: string
  subtitle?: string
  icon?: {
    component: LucideIcon
    position?: 'left' | 'right' | 'both'
    size?: number
  }
  color?: 'amber' | 'blue' | 'emerald' | 'rose' | 'gray'
}

export const SectionTitle = ({
  preTitle,
  title,
  subtitle,
  icon,
  color = 'amber'
}: SectionTitleProps) => {
  const IconComponent = icon?.component
  const iconSize = icon?.size || 8
  const iconPosition = icon?.position || 'both'
  
  return (
    <motion.div
      className="text-center mb-16"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      {preTitle && (
        <motion.span
          className={`inline-block px-5 py-2 bg-gradient-to-r from-${color}-100 to-${color}-100 text-${color}-700 rounded-full text-sm font-bold uppercase tracking-wider mb-6`}
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring" }}
        >
          {preTitle}
        </motion.span>
      )}
      
      <div className="flex items-center justify-center gap-4 mb-6">
        {(IconComponent && (iconPosition === 'left' || iconPosition === 'both')) && (
          <IconComponent className={`text-${color}-500 w-${iconSize} h-${iconSize}`} />
        )}
        
        <h2 className={`text-5xl font-bold bg-gradient-to-r from-${color}-900 to-${color}-700 bg-clip-text text-transparent`}>
          {title}
        </h2>
        
        {(IconComponent && (iconPosition === 'right' || iconPosition === 'both')) && (
          <IconComponent className={`text-${color}-500 w-${iconSize} h-${iconSize}`} />
        )}
      </div>
      
      {subtitle && (
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          {subtitle}
        </p>
      )}
    </motion.div>
  )
}