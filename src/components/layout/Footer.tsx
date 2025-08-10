// components/layout/Footer.tsx
import { memo, useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Instagram, 
  Facebook, 
  MessageCircle, 
  Mail,
  MapPin,
  Phone,
  Send,
  Heart
} from 'lucide-react'

const Footer = memo(() => {
  const [email, setEmail] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setIsSubscribed(true)
      setEmail('')
      setTimeout(() => setIsSubscribed(false), 3000)
    }
  }

  const socialLinks = [
    { icon: Instagram, href: '#', label: 'Instagram', color: 'hover:text-pink-500' },
    { icon: Facebook, href: '#', label: 'Facebook', color: 'hover:text-blue-500' },
    { icon: MessageCircle, href: '#', label: 'WhatsApp', color: 'hover:text-green-500' },
  ]

  const services = [
    'Programme Fidélité',
    'Carte Cadeau',
    'Guide des Tailles',
    'Retours & Échanges',
    'Service Client'
  ]

  const informations = [
    'À Propos',
    'Notre Histoire',
    'Nos Artisans',
    'CGV',
    'Politique de Confidentialité'
  ]

  return (
    <footer className="relative mt-20">
      {/* Glassmorphic Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50/50 to-gray-100/80 backdrop-blur-sm"></div>
      
      <div className="relative">
        {/* Newsletter Section */}
        <div className="bg-gradient-to-r from-amber-500/10 to-amber-400/10 backdrop-blur-xl border-y border-white/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <motion.div
              className="text-center max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Restez connecté à l'Afrique
              </h2>
              <p className="text-gray-600 mb-8">
                Recevez les dernières créations et offres exclusives directement dans votre boîte mail
              </p>
              
              <form onSubmit={handleNewsletterSubmit} className="flex max-w-md mx-auto">
                <motion.input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Votre adresse email"
                  className="flex-1 px-6 py-4 bg-white/80 backdrop-blur-sm rounded-l-2xl border border-gray-200/50 focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-transparent transition-all duration-200"
                  whileFocus={{ scale: 1.02 }}
                  required
                />
                <motion.button
                  type="submit"
                  className="px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-400 text-white rounded-r-2xl hover:from-amber-600 hover:to-amber-500 transition-all duration-200 font-semibold shadow-lg"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={isSubscribed}
                >
                  {isSubscribed ? (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="flex items-center space-x-2"
                    >
                      <Heart size={18} />
                      <span>Merci!</span>
                    </motion.span>
                  ) : (
                    <Send size={18} />
                  )}
                </motion.button>
              </form>
            </motion.div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Brand Column */}
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-amber-600 to-amber-400 bg-clip-text text-transparent mb-2">
                  Be Boutique
                </h2>
                <p className="text-amber-600 font-medium">Côte d'Ivoire</p>
              </div>
              
              <p className="text-gray-600 leading-relaxed">
                Chez Be Boutique, nous croyons en une Afrique créative, fière et prospère. 
                Découvrez l'excellence du savoir-faire africain.
              </p>

              {/* Social Links */}
              <div className="flex space-x-4">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    className={`p-3 bg-white/50 backdrop-blur-sm rounded-xl text-gray-600 ${social.color} transition-all duration-200 hover:bg-white/80 shadow-lg hover:shadow-xl`}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={social.label}
                  >
                    <social.icon size={20} />
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Services Column */}
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h3 className="text-lg font-semibold text-gray-900">Nos Services</h3>
              <ul className="space-y-3">
                {services.map((service) => (
                  <li key={service}>
                    <motion.a
                      href="#"
                      className="text-gray-600 hover:text-amber-600 transition-colors duration-200 block"
                      whileHover={{ x: 4 }}
                    >
                      {service}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Informations Column */}
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3 className="text-lg font-semibold text-gray-900">Informations</h3>
              <ul className="space-y-3">
                {informations.map((info) => (
                  <li key={info}>
                    <motion.a
                      href="#"
                      className="text-gray-600 hover:text-amber-600 transition-colors duration-200 block"
                      whileHover={{ x: 4 }}
                    >
                      {info}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Contact Column */}
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h3 className="text-lg font-semibold text-gray-900">Contact</h3>
              <div className="space-y-4">
                <motion.div 
                  className="flex items-start space-x-3"
                  whileHover={{ x: 4 }}
                >
                  <MapPin className="text-amber-500 mt-1 flex-shrink-0" size={18} />
                  <span className="text-gray-600">
                    Abidjan, Côte d'Ivoire
                  </span>
                </motion.div>
                
                <motion.div 
                  className="flex items-center space-x-3"
                  whileHover={{ x: 4 }}
                >
                  <Phone className="text-amber-500 flex-shrink-0" size={18} />
                  <a href="tel:+225" className="text-gray-600 hover:text-amber-600 transition-colors">
                    +225 XX XX XX XX
                  </a>
                </motion.div>
                
                <motion.div 
                  className="flex items-center space-x-3"
                  whileHover={{ x: 4 }}
                >
                  <Mail className="text-amber-500 flex-shrink-0" size={18} />
                  <a href="mailto:contact@beboutiques.com" className="text-gray-600 hover:text-amber-600 transition-colors">
                    contact@beboutiques.com
                  </a>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200/50 bg-white/30 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <motion.div
              className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <p className="text-gray-600 text-sm">
                © 2025 Be Boutique — Tous droits réservés
              </p>
              
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <span>Fait avec</span>
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}
                >
                  <Heart className="text-red-500" size={16} fill="currentColor" />
                </motion.div>
                <span>pour l'Afrique</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </footer>
  )
})

Footer.displayName = 'Footer'

export default Footer