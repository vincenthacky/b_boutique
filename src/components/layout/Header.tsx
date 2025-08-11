// components/layout/Header.tsx
import { memo, useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

import logo_orange from '@/assets/Logo_orange.png'
import { 
  Search, 
  ShoppingCart, 
  User, 
  ChevronDown,
  Menu,
  X,
  Home,
  List,
  Bell
} from 'lucide-react'

interface CategoryItem {
  [key: string]: string[]
}

interface CategoryDropdown {
  [key: string]: CategoryItem
}

const categories: CategoryDropdown = {
  "Homme": {
    "Textile": ["Pagne", "Kita"],
    "Vêtements": ["Chemises & Tuniques", "Ensembles"],
    "Bijoux": ["Chaînes", "Bracelets", "Boucles d'oreilles"],
    "Soins": ["Parfums", "Huiles", "Crèmes"]
  },
  "Femme": {
    "Textile": ["Pagne", "Kita"],
    "Vêtements": ["Chemises & Tuniques", "Ensembles"],
    "Bijoux": ["Chaînes", "Bracelets", "Boucles d'oreilles"],
    "Soins": ["Parfums", "Huiles", "Crèmes"]
  },
  "Enfants": {
    "Textile": ["Pagne", "Kita"],
    "Vêtements": ["Chemises & Tuniques", "Ensembles"],
    "Bijoux": ["Chaînes", "Bracelets", "Boucles d'oreilles"],
    "Soins": ["Parfums", "Huiles", "Crèmes"]
  }
}

const Header = memo(() => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [cartCount] = useState(3) // Mock cart count
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <>
      {/* Desktop Header */}
      <motion.header 
        className="hidden md:block fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-white/80 border-b border-white/20 shadow-lg shadow-black/5"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
           {/* Logo */}
            <Link to="/" className="flex-shrink-0">
              <motion.img
                src={logo_orange}
                alt="Logo Be Boutique"
                className="h-40 w-auto" // ajuste la taille si nécessaire
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              />
            </Link>


            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {/* Categories Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <motion.button
                  className="flex items-center space-x-1 px-4 py-2 text-gray-700 hover:text-amber-600 transition-colors duration-200 font-medium"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span>Nos catégories</span>
                  <motion.div
                    animate={{ rotate: isDropdownOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown size={16} />
                  </motion.div>
                </motion.button>

                <AnimatePresence>
                  {isDropdownOpen && (
                    <motion.div
                      className="absolute top-full left-0 mt-2 w-96 bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 overflow-hidden"
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="p-6">
                        <div className="grid grid-cols-3 gap-6">
                          {Object.entries(categories).map(([mainCategory, subcategories]) => (
                            <div key={mainCategory} className="space-y-3">
                              <h3 className="font-semibold text-gray-900 text-sm uppercase tracking-wider">
                                {mainCategory}
                              </h3>
                              <div className="space-y-2">
                                {Object.entries(subcategories).map(([subCategory, items]) => (
                                  <div key={subCategory} className="space-y-1">
                                    <h4 className="font-medium text-gray-700 text-sm">
                                      {subCategory}
                                    </h4>
                                    {items.map((item) => (
                                      <motion.a
                                        key={item}
                                        href="#"
                                        className="block text-sm text-gray-600 hover:text-amber-600 hover:pl-2 transition-all duration-200"
                                        whileHover={{ x: 4 }}
                                      >
                                        {item}
                                      </motion.a>
                                    ))}
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link
                to="/services"
                className="px-4 py-2 text-gray-700 hover:text-amber-600 transition-colors duration-200 font-medium"
              >
                Services
              </Link>
            </nav>

            {/* Search Bar */}
            <div className="hidden md:flex flex-1 max-w-md mx-8">
              <motion.div 
                className="relative w-full group"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Search 
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-amber-500 transition-colors duration-200" 
                  size={18} 
                />
                <input
                  type="text"
                  placeholder="Rechercher des créations africaines..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-gray-50/80 backdrop-blur-sm rounded-2xl border border-gray-200/50 focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-transparent transition-all duration-200 placeholder-gray-500 hover:bg-white/80"
                />
              </motion.div>
            </div>

            {/* Right Actions */}
            <div className="flex items-center space-x-4">
              {/* Notifications */}
              <motion.button
                className="relative p-3 text-gray-700 hover:text-amber-600 transition-colors duration-200 hover:bg-amber-50/50 rounded-xl"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Bell size={20} />
                <span className="sr-only">Notifications</span>
              </motion.button>

              {/* Cart */}
              <motion.button
                className="relative p-3 text-gray-700 hover:text-amber-600 transition-colors duration-200 hover:bg-amber-50/50 rounded-xl"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ShoppingCart size={20} />
                {cartCount > 0 && (
                  <motion.span
                    className="absolute -top-1 -right-1 bg-gradient-to-r from-amber-500 to-amber-400 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium shadow-lg"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 500, damping: 15 }}
                  >
                    {cartCount}
                  </motion.span>
                )}
              </motion.button>

              {/* User Profile */}
              <motion.button
                className="p-3 text-gray-700 hover:text-amber-600 transition-colors duration-200 hover:bg-amber-50/50 rounded-xl"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <User size={20} />
              </motion.button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Header (Top) */}
      <motion.header 
        className="md:hidden fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-white/80 border-b border-white/20 shadow-lg shadow-black/5"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
           <Link to="/" className="flex-shrink-0">
              <motion.img
                src={logo_orange}
                alt="Logo Be Boutique"
                className="h-40 w-auto" // ajuste la taille si nécessaire
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              />
            </Link>

            {/* Mobile Search and Menu */}
            <div className="flex items-center space-x-4">
              {/* Search Button */}
              <motion.button
                className="p-2 text-gray-700 hover:text-amber-600 transition-colors duration-200"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Search size={20} />
              </motion.button>

              {/* Menu Toggle */}
              <motion.button
                className="p-2 text-gray-700 hover:text-amber-600 transition-colors duration-200"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </motion.button>
            </div>
          </div>

          {/* Mobile Search Bar */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                className="pb-3"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="relative">
                  <Search 
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
                    size={18} 
                  />
                  <input
                    type="text"
                    placeholder="Rechercher..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-gray-50/80 backdrop-blur-sm rounded-xl border border-gray-200/50 focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-transparent transition-all duration-200 placeholder-gray-500"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.header>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white shadow-lg border-t border-gray-200 rounded-t-xl" 
           style={{ boxShadow: '0px -1px 10px rgba(0, 0, 0, 0.15)' }}>
        <div className="flex items-center justify-around h-16">
          {/* Accueil */}
          <Link 
            to="/" 
            className="flex flex-col items-center justify-center text-center pt-1 flex-1"
          >
            <Home size={20} className="text-gray-700" />
            <span className="text-xs font-medium text-gray-700 mt-1">Accueil</span>
          </Link>

          {/* Catégories */}
          <Link 
            to="/categories" 
            className="flex flex-col items-center justify-center text-center pt-1 flex-1"
          >
            <List size={20} className="text-gray-700" />
            <span className="text-xs font-medium text-gray-700 mt-1">Catégories</span>
          </Link>

          {/* Panier */}
          <Link 
            to="/cart" 
            className="flex flex-col items-center justify-center text-center pt-1 flex-1 relative"
          >
            <div className="absolute -top-7 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-amber-600 to-amber-500 text-white rounded-full p-3 border-4 border-white shadow-md">
              <ShoppingCart size={20} />
            </div>
            <span className="text-xs font-medium text-gray-700 mt-6">
              Panier
              {cartCount > 0 && (
                <span className="ml-1">({cartCount})</span>
              )}
            </span>
          </Link>

          {/* Notifications */}
          <Link 
            to="/notifications" 
            className="flex flex-col items-center justify-center text-center pt-1 flex-1"
          >
            <div className="relative">
              <Bell size={20} className="text-gray-700" />
              <span className="sr-only">Notifications</span>
            </div>
            <span className="text-xs font-medium text-gray-700 mt-1">Notifications</span>
          </Link>

          {/* Compte */}
          <Link 
            to="/account" 
            className="flex flex-col items-center justify-center text-center pt-1 flex-1"
          >
            <User size={20} className="text-gray-700" />
            <span className="text-xs font-medium text-gray-700 mt-1">Compte</span>
          </Link>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="md:hidden fixed inset-0 z-40 bg-white/95 backdrop-blur-xl pt-20"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ duration: 0.3 }}
          >
           
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
})

Header.displayName = 'Header'

export default Header