// src/components/ui/SectionTitle.tsx

import { memo } from 'react'
import { motion } from 'framer-motion'
import type{ LucideIcon } from 'lucide-react'

interface SectionTitleProps {
  preTitle?: string
  title: string
  subtitle?: string
  icon?: {
    component: LucideIcon
  }
  color?: string
  align?: 'left' | 'center' | 'right'
}

const SectionTitle = memo(({ 
  preTitle, 
  title, 
  subtitle, 
  icon, 
  color = 'amber',
  align = 'center'
}: SectionTitleProps) => {
  const alignmentClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right'
  }

  return (
    <motion.div
      className={`mb-16 ${alignmentClasses[align]}`}
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
        {icon && <icon.component className={`text-${color}-500 w-8 h-8`} />}
        <h2 className={`text-5xl font-bold bg-gradient-to-r from-${icon ? color : 'gray'}-${icon ? '600' : '900'} to-${icon ? color : 'gray'}-${icon ? '500' : '700'} bg-clip-text text-transparent`}>
          {title}
        </h2>
        {icon && <icon.component className={`text-${color}-500 w-8 h-8`} />}
      </div>
      
      {subtitle && (
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          {subtitle}
        </p>
      )}
    </motion.div>
  )
})

SectionTitle.displayName = 'SectionTitle'

export default SectionTitle