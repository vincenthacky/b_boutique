// src/pages/Home/sections/NewsletterSection.tsx

import {  useState } from 'react'
import { motion } from 'framer-motion'
import { Gift, Check } from 'lucide-react'


const NewsletterSection = () => {
  const [email, setEmail] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setIsSubscribed(true)
      setTimeout(() => setIsSubscribed(false), 3000)
      setEmail('')
    }
  }

  return (
    <motion.div 
      className="relative bg-newsletter rounded-3xl p-8 md:p-12 overflow-hidden"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      {/* Background decoration */}
      <div 
        className="absolute -top-20 -right-20 w-64 h-64 rounded-full blur-3xl" 
        style={{ backgroundColor: 'var(--newsletter-decoration-amber)' }}
      />
      <div 
        className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full blur-3xl" 
        style={{ backgroundColor: 'var(--newsletter-decoration-orange)' }}
      />
      
      <div className="relative max-w-2xl mx-auto text-center">
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", duration: 0.6 }}
          className="inline-flex p-3 rounded-2xl mb-6"
          style={{ backgroundColor: 'var(--newsletter-icon-bg)' }}
        >
          <Gift className="w-8 h-8 text-amber-600" />
        </motion.div>
        
        <h3 className="text-3xl font-bold text-gray-900 mb-4">
          Recevez 10% de réduction
        </h3>
        <p className="text-gray-600 mb-8">
          Inscrivez-vous et soyez les premiers informés de nos nouveautés et offres exclusives
        </p>
        
        <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Votre adresse email"
            className="flex-1 px-6 py-4 rounded-2xl border border-gray-200 focus:outline-none focus:border-amber-500 transition-colors"
            required
          />
          <motion.button
            type="submit"
            className="px-8 py-4 bg-be-primary text-white rounded-2xl font-semibold hover:bg-amber-hover transition-all duration-200"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {isSubscribed ? (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center gap-2"
              >
                <Check className="w-5 h-5" />
                Inscrit !
              </motion.span>
            ) : (
              "S'inscrire"
            )}
          </motion.button>
        </form>
        
        <p className="text-xs text-gray-500 mt-4">
          En vous inscrivant, vous acceptez notre politique de confidentialité
        </p>
      </div>
    </motion.div>
  )
}

NewsletterSection.displayName = 'NewsletterSection'

export default NewsletterSection