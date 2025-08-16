// components/layout/Footer.tsx
import { memo, useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from "react-router-dom";
import { 
  Mail,
  MapPin,
  Phone,
  Send,
  Heart,
  User
} from 'lucide-react'

// Import du logo et des icônes sociales
import Logo from '@/assets/Logo_orange.png'
import FacebookIcon from '@/assets/Facebook.png'
import InstagramIcon from '@/assets/Instagram.png'
import LinkedInIcon from '@/assets/LinkedIn.png'
import TikTokIcon from '@/assets/TikTok.png'

const Footer = memo(() => {
  
  const [formData, setFormData] = useState({
    name: '',
    contact: ''
  });
  const [contactType, setContactType] = useState('email');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.contact) {
      setIsSubscribed(true);
      setTimeout(() => {
        setIsSubscribed(false);
        setFormData({ name: '', contact: '' });
      }, 3000);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const toggleContactType = () => {
    setContactType(prev => prev === 'email' ? 'phone' : 'email');
    setFormData(prev => ({ ...prev, contact: '' }));
  };

  const socialLinks = [
    { icon: FacebookIcon, href: '#', label: 'Facebook' },
    { icon: InstagramIcon, href: '#', label: 'Instagram' },
    { icon: LinkedInIcon, href: '#', label: 'LinkedIn' },
    { icon: TikTokIcon, href: '#', label: 'TikTok' },
  ]

  const services = [
    'Programme fidélité',
    'Service personnalisé',
    'Carte cadeau',
    'Paiement sécurisé',
    'Livraison rapide',
    'Service client'
  ]
  
  const informations = [
    { label: 'Notre identité', to: '/about' },
    { label: 'Nos marques partenaires', to: '/marques' },
    { label: 'Guide de taille', to: '/guide-taille' },
    { label: 'Politique de Confidentialité', to: '/privacy-policy' },
  ];

  return (
    <footer className="relative mt-16">
      {/* Newsletter Section - Plus compacte */}
      <div className="py-12 md:py-16 bg-gray-900 relative overflow-hidden">
        {/* Background optimisé avec logo */}
        <div className="absolute inset-0">
          {/* Logo en arrière-plan */}
          <img
            src={Logo}
            alt="Be Boutique Background"
            className="absolute inset-0 w-full h-full object-cover opacity-5 scale-150"
          />
          <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-amber-500/15 to-amber-400/8 opacity-60" />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/80 to-gray-900/40" />
          {/* Pattern décoratif plus subtil */}
          <div className="absolute inset-0 opacity-8">
            <div className="absolute top-8 left-8 w-24 h-24 border border-amber-400/30 rounded-full"></div>
            <div className="absolute bottom-8 right-8 w-16 h-16 border border-amber-400/30 rounded-full"></div>
            <div className="absolute top-1/2 left-1/4 w-12 h-12 border border-amber-400/30 rounded-full"></div>
          </div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header plus compact */}
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3 leading-tight">
              Restez connecté à 
              <span className="bg-gradient-to-r from-amber-400 to-amber-300 bg-clip-text text-transparent">
                {' '}l'Afrique
              </span>
            </h2>
            <p className="text-base text-gray-300 max-w-xl mx-auto">
              Recevez nos dernières créations et offres exclusives
            </p>
          </div>

          {/* Formulaire plus compact */}
          <div className="max-w-xl mx-auto">
            <div className="space-y-4">
              {/* Ligne avec nom et contact côte à côte sur desktop */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Champ Nom */}
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-4 w-4 text-amber-400" />
                  </div>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Votre nom"
                    className="w-full pl-10 pr-4 py-3 bg-white/10 backdrop-blur-md text-white placeholder-gray-300 rounded-xl border border-white/20 focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400 transition-all duration-300"
                    required
                  />
                </div>

                {/* Input contact */}
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    {contactType === 'email' ? (
                      <Mail className="h-4 w-4 text-amber-400" />
                    ) : (
                      <Phone className="h-4 w-4 text-amber-400" />
                    )}
                  </div>
                  <input
                    type={contactType === 'email' ? 'email' : 'tel'}
                    name="contact"
                    value={formData.contact}
                    onChange={handleInputChange}
                    placeholder={
                      contactType === 'email' 
                        ? "Email" 
                        : "Téléphone"
                    }
                    className="w-full pl-10 pr-4 py-3 bg-white/10 backdrop-blur-md text-white placeholder-gray-300 rounded-xl border border-white/20 focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400 transition-all duration-300"
                    required
                  />
                </div>
              </div>

              {/* Toggle button plus petit */}
              <div className="flex justify-center">
                <button
                  type="button"
                  onClick={toggleContactType}
                  className="flex items-center space-x-2 text-amber-400 hover:text-amber-300 transition-colors duration-200 text-sm"
                >
                  {contactType === 'email' ? (
                    <>
                      <Phone className="h-3 w-3" />
                      <span>Utiliser téléphone</span>
                    </>
                  ) : (
                    <>
                      <Mail className="h-3 w-3" />
                      <span>Utiliser email</span>
                    </>
                  )}
                </button>
              </div>

              {/* Bouton Submit plus compact */}
              <div className="text-center">
                <button
                  type="submit"
                  onClick={handleSubmit}
                  disabled={isSubscribed}
                  className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-400 text-white rounded-xl hover:from-amber-600 hover:to-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-400/50 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isSubscribed ? (
                    <>
                      <Heart className="h-4 w-4 text-red-300" />
                      <span>Merci!</span>
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      <span>S'inscrire</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Message de confirmation plus compact */}
            {isSubscribed && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-3 bg-green-500/20 backdrop-blur-md border border-green-400/30 rounded-lg text-center"
              >
                <p className="text-green-300 text-sm font-medium">
                  🎉 Inscription réussie!
                </p>
              </motion.div>
            )}
          </div>
        </div>

        {/* Lignes décoratives plus fines */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-400/50 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-400/50 to-transparent"></div>
      </div>

      {/* Contenu principal footer */}
      <div className="bg-gradient-to-b from-gray-50/50 to-gray-100/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            
            {/* Colonne marque */}
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center space-x-3">
                <img src={Logo} alt="Be Boutique" className="w-auto h-32 object-contain" />
                <div>
                  <h2 className="text-xl font-bold bg-gradient-to-r from-amber-600 to-amber-400 bg-clip-text text-transparent mb-1">
                    Be Boutique
                  </h2>
                  <p className="text-amber-600 font-medium text-sm">Côte d'Ivoire</p>
                </div>
              </div>
              
              <p className="text-gray-600 leading-relaxed text-sm">
                Chez Be Boutique, nous croyons en une Afrique créative, fière et prospère. 
                Découvrez l'excellence du savoir-faire africain.
              </p>

              {/* Réseaux sociaux */}
              <div className="flex space-x-3">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    className="p-2 bg-white/50 backdrop-blur-sm rounded-lg text-gray-600 hover:bg-white/80 shadow-md hover:shadow-lg"
                    whileHover={{ scale: 1.1, y: -1 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={social.label}
                  >
                    <img src={social.icon} alt={social.label} className="w-4 h-4" />
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Services */}
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h3 className="text-lg font-semibold text-gray-900">Nos Services</h3>
              <ul className="space-y-2">
                {services.map((service) => (
                  <li key={service}>
                    <motion.a
                      href="#"
                      className="text-gray-600 hover:text-amber-600 transition-colors duration-200 block text-sm"
                      whileHover={{ x: 4 }}
                    >
                      {service}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Infos */}
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3 className="text-lg font-semibold text-gray-900">Informations</h3>
              <ul className="space-y-2">
                {informations.map((info) => (
                  <li key={info.label}>
                    <motion.div whileHover={{ x: 4 }}>
                      <Link
                        to={info.to}
                        className="text-gray-600 hover:text-amber-600 transition-colors duration-200 block text-sm"
                      >
                        {info.label}
                      </Link>
                    </motion.div>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Contact */}
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h3 className="text-lg font-semibold text-gray-900">Contact</h3>
              <div className="space-y-3">
                <motion.div className="flex items-start space-x-2" whileHover={{ x: 4 }}>
                  <MapPin className="text-amber-500 mt-0.5 flex-shrink-0" size={16} />
                  <span className="text-gray-600 text-sm">Abidjan, Côte d'Ivoire</span>
                </motion.div>
                
                <motion.div className="flex items-start space-x-2" whileHover={{ x: 4 }}>
                  <Phone className="text-amber-500 mt-0.5 flex-shrink-0" size={16} />
                  <a href="tel:+2250799977646" className="text-gray-600 hover:text-amber-600 transition-colors text-sm">
                    07 99 97 76 46<br />05 06 09 86 25
                  </a>
                </motion.div>
                
                <motion.div className="flex items-start space-x-2" whileHover={{ x: 4 }}>
                  <Mail className="text-amber-500 mt-0.5 flex-shrink-0" size={16} />
                  <a href="mailto:beboutique225@gmail.com" className="text-gray-600 hover:text-amber-600 transition-colors text-sm break-all">
                    beboutique225@gmail.com
                  </a>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bas du footer */}
        <div className="border-t border-gray-200/50 bg-white/30 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <motion.div
              className="flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0"
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
                  <Heart className="text-red-500" size={14} fill="currentColor" />
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