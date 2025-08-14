// components/layout/Header.tsx
import { memo, useState, useRef, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
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
  Heart
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
  const location = useLocation()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [cartCount] = useState(3) // Mock cart count
  const [favoritesCount] = useState(5) // Mock favorites count
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Helper function to check if a path is active
  const isActiveRoute = (path: string) => {
    if (path === '/' && location.pathname === '/') return true
    if (path !== '/' && location.pathname.startsWith(path)) return true
    return false
  }

  // Helper function to check if we're on a category page
  const isCategoryPageActive = () => {
    return location.pathname.startsWith('/categories')
  }

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
            <Link to="/" className="flex-shrink-0">
              <motion.img
                src={logo_orange}
                alt="Logo Be Boutique"
                className="h-40 w-auto"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {/* Categories Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <motion.button
                  className={`flex items-center space-x-1 px-4 py-2 transition-all duration-200 font-medium relative ${
                    isCategoryPageActive() 
                      ? 'text-amber-600 bg-amber-50/50 rounded-xl' 
                      : 'text-gray-700 hover:text-amber-600'
                  }`}
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
                  {/* Active indicator */}
                  {isCategoryPageActive() && (
                    <motion.div
                      className="absolute -bottom-3 left-1/2 w-2 h-2 bg-amber-600 rounded-full transform -translate-x-1/2"
                      layoutId="activeNavIndicator"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                </motion.button>

                <AnimatePresence>
                  {isDropdownOpen && (
                    <motion.div
                      className="absolute top-full left-0 mt-2 w-[550px] bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 overflow-hidden"
                      initial={{ opacity: 0, y: -10, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.98 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="p-8 grid grid-cols-3 gap-x-8 gap-y-6">
                        {Object.entries(categories).map(([mainCategory, subcategories]) => (
                          <div key={mainCategory} className="border-r border-gray-100 last:border-none pr-4">
                            <Link 
                              to={`/categories/${mainCategory.toLowerCase()}`}
                              className={`font-extrabold text-lg uppercase tracking-wide pb-2 mb-4 border-b block transition-colors ${
                                isActiveRoute(`/categories/${mainCategory.toLowerCase()}`)
                                  ? 'text-amber-600 border-amber-200'
                                  : 'text-amber-600 border-amber-200 hover:text-amber-800'
                              }`}
                            >
                              {mainCategory}
                            </Link>
                            <div className="space-y-4 mt-4">
                              {Object.entries(subcategories).map(([subCategory, items]) => (
                                <div key={subCategory} className="space-y-1">
                                  <Link 
                                    to={`/categories/${mainCategory.toLowerCase()}/${subCategory.toLowerCase()}`}
                                    className={`font-bold text-sm block transition-colors ${
                                      isActiveRoute(`/categories/${mainCategory.toLowerCase()}/${subCategory.toLowerCase()}`)
                                        ? 'text-amber-600'
                                        : 'text-gray-900 hover:text-amber-600'
                                    }`}
                                  >
                                    {subCategory}
                                  </Link>
                                  <ul className="space-y-1">
                                    {items.map((item) => (
                                      <motion.li
                                        key={item}
                                        initial={{ x: -10, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        transition={{ duration: 0.2, delay: 0.1 }}
                                      >
                                        <Link
                                          to={`/categories/${mainCategory.toLowerCase()}/${subCategory.toLowerCase()}/${item.toLowerCase()}`}
                                          className={`block text-sm transition-all duration-200 ${
                                            isActiveRoute(`/categories/${mainCategory.toLowerCase()}/${subCategory.toLowerCase()}/${item.toLowerCase()}`)
                                              ? 'text-amber-600 font-semibold'
                                              : 'text-gray-600 hover:text-amber-600 hover:font-semibold'
                                          }`}
                                        >
                                          {item}
                                        </Link>
                                      </motion.li>
                                    ))}
                                  </ul>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link
                to="/services"
                className={`px-4 py-2 transition-all duration-200 font-medium rounded-xl relative ${
                  isActiveRoute('/services')
                    ? 'text-amber-600 bg-amber-50/50'
                    : 'text-gray-700 hover:text-amber-600 hover:bg-amber-50/30'
                }`}
              >
                Services
                {isActiveRoute('/services') && (
                  <motion.div
                    className="absolute -bottom-3 left-1/2 w-2 h-2 bg-amber-600 rounded-full transform -translate-x-1/2"
                    layoutId="activeNavIndicator"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
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
              {/* Favoris desktop */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/favorites"
                  className={`relative p-3 transition-all duration-200 rounded-xl flex items-center justify-center ${
                    isActiveRoute('/favorites')
                      ? 'text-amber-600 bg-amber-50/70'
                      : 'text-gray-700 hover:text-amber-600 hover:bg-amber-50/50'
                  }`}
                >
                  <Heart size={20} fill={isActiveRoute('/favorites') ? 'currentColor' : 'none'} />
                  {favoritesCount > 0 && (
                    <motion.span
                      className="absolute -top-1 -right-1 bg-gradient-to-r from-amber-500 to-amber-400 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium shadow-lg"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 500, damping: 15 }}
                    >
                      {favoritesCount}
                    </motion.span>
                  )}
                  <span className="sr-only">Favoris</span>
                </Link>
              </motion.div>

              {/* Cart desktop */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/cart"
                  className={`relative p-3 transition-all duration-200 rounded-xl flex items-center justify-center ${
                    isActiveRoute('/cart')
                      ? 'text-amber-600 bg-amber-50/70'
                      : 'text-gray-700 hover:text-amber-600 hover:bg-amber-50/50'
                  }`}
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
                </Link>
              </motion.div>

              {/* User Profile desktop */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/account"
                  className={`p-3 transition-all duration-200 rounded-xl flex items-center justify-center ${
                    isActiveRoute('/account')
                      ? 'text-amber-600 bg-amber-50/70'
                      : 'text-gray-700 hover:text-amber-600 hover:bg-amber-50/50'
                  }`}
                >
                  <User size={20} />
                </Link>
              </motion.div>
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
                className="h-40 w-auto"
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
          {/* Mobile Search Bar */}
<AnimatePresence>
  {isMobileMenuOpen && (
    <motion.div
      className="pb-3 space-y-3"
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Search Input */}
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

      {/* Services Link */}
      <Link
        to="/services"
        className={`block text-center px-4 py-2 transition-all duration-200 font-medium rounded-xl relative ${
          isActiveRoute('/services')
            ? 'text-amber-600 bg-amber-50/50'
            : 'text-gray-700 hover:text-amber-600 hover:bg-amber-50/30'
        }`}
      >
        Services
        {isActiveRoute('/services') && (
          <motion.div
            className="absolute -bottom-1 left-1/2 w-2 h-2 bg-amber-600 rounded-full transform -translate-x-1/2"
            layoutId="activeNavIndicator"
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
          />
        )}
      </Link>
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
            className={`flex flex-col items-center justify-center text-center pt-1 flex-1 transition-all duration-200 ${
              isActiveRoute('/') && location.pathname === '/'
                ? 'text-amber-600'
                : 'text-gray-700'
            }`}
          >
            <div className="relative">
              <Home 
                size={20} 
                fill={isActiveRoute('/') && location.pathname === '/' ? 'currentColor' : 'none'} 
              />
              {isActiveRoute('/') && location.pathname === '/' && (
                <motion.div
                  className="absolute -top-1 left-1/2 w-1 h-1 bg-amber-600 rounded-full transform -translate-x-1/2"
                  layoutId="activeMobileIndicator"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
            </div>
            <span className="text-xs font-medium mt-1">Accueil</span>
          </Link>

          {/* Catégories */}
          <button
            onClick={() => setIsCategoryModalOpen(true)}
            className={`flex flex-col items-center justify-center text-center pt-1 flex-1 transition-all duration-200 ${
              isCategoryPageActive()
                ? 'text-amber-600'
                : 'text-gray-700'
            }`}
          >
            <div className="relative">
              <List size={20} />
              {isCategoryPageActive() && (
                <motion.div
                  className="absolute -top-1 left-1/2 w-1 h-1 bg-amber-600 rounded-full transform -translate-x-1/2"
                  layoutId="activeMobileIndicator"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
            </div>
            <span className="text-xs font-medium mt-1">Catégories</span>
          </button>

          {/* Panier */}
          <Link 
            to="/cart" 
            className="flex flex-col items-center justify-center text-center pt-1 flex-1 relative"
          >
            <div className={`absolute -top-7 left-1/2 transform -translate-x-1/2 rounded-full p-3 border-4 border-white shadow-md transition-all duration-200 ${
              isActiveRoute('/cart')
                ? 'bg-gradient-to-r from-amber-700 to-amber-600'
                : 'bg-gradient-to-r from-amber-600 to-amber-500'
            }`}>
              <div className="relative">
                <ShoppingCart size={20} className="text-white" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center font-medium">
                    {cartCount > 9 ? '9+' : cartCount}
                  </span>
                )}
              </div>
            </div>
            <span className={`text-xs font-medium mt-6 transition-colors duration-200 ${
              isActiveRoute('/cart') ? 'text-amber-600' : 'text-gray-700'
            }`}>
              Panier
            </span>
          </Link>

          {/* Favoris */}
          <Link 
            to="/favorites" 
            className={`flex flex-col items-center justify-center text-center pt-1 flex-1 transition-all duration-200 ${
              isActiveRoute('/favorites')
                ? 'text-amber-600'
                : 'text-gray-700'
            }`}
          >
            <div className="relative">
              <Heart 
                size={20} 
                fill={isActiveRoute('/favorites') ? 'currentColor' : 'none'}
              />
              {favoritesCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center font-medium">
                  {favoritesCount > 9 ? '9+' : favoritesCount}
                </span>
              )}
              {isActiveRoute('/favorites') && (
                <motion.div
                  className="absolute -top-1 left-1/2 w-1 h-1 bg-amber-600 rounded-full transform -translate-x-1/2"
                  layoutId="activeMobileIndicator"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
            </div>
            <span className="text-xs font-medium mt-1">Favoris</span>
          </Link>

          {/* Compte */}
          <Link 
            to="/account" 
            className={`flex flex-col items-center justify-center text-center pt-1 flex-1 transition-all duration-200 ${
              isActiveRoute('/account')
                ? 'text-amber-600'
                : 'text-gray-700'
            }`}
          >
            <div className="relative">
              <User size={20} />
              {isActiveRoute('/account') && (
                <motion.div
                  className="absolute -top-1 left-1/2 w-1 h-1 bg-amber-600 rounded-full transform -translate-x-1/2"
                  layoutId="activeMobileIndicator"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
            </div>
            <span className="text-xs font-medium mt-1">Compte</span>
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

      {/* Mobile Category Modal */}
      <AnimatePresence>
        {isCategoryModalOpen && (
          <motion.div
            className="md:hidden fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setIsCategoryModalOpen(false)}
          >
            <motion.div
              className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-2xl max-h-[85vh] overflow-hidden"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="sticky top-0 bg-white z-10 px-6 py-4 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">Nos catégories</h2>
                    <p className="text-sm text-gray-500 mt-1">Découvrez nos créations africaines</p>
                  </div>
                  <motion.button
                    onClick={() => setIsCategoryModalOpen(false)}
                    className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <X size={20} className="text-gray-600" />
                  </motion.button>
                </div>
                {/* Handle bar */}
                <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-gray-300 rounded-full"></div>
              </div>

              {/* Modal Content */}
              <div className="p-6 overflow-y-auto max-h-[calc(85vh-80px)]">
                <div className="space-y-8">
                  {Object.entries(categories).map(([mainCategory, subcategories], index) => (
                    <motion.div
                      key={mainCategory}
                      className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-5 border border-amber-100"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      {/* Main Category */}
                      <Link 
                        to={`/categories/${mainCategory.toLowerCase()}`}
                        onClick={() => setIsCategoryModalOpen(false)}
                        className="block mb-4"
                      >
                        <div className="flex items-center justify-between p-3 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 border border-amber-200">
                          <h3 className="font-bold text-lg text-amber-700 uppercase tracking-wide">
                            {mainCategory}
                          </h3>
                          <div className="w-8 h-8 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center">
                            <ChevronDown size={16} className="text-white rotate-[-90deg]" />
                          </div>
                        </div>
                      </Link>

                      {/* Subcategories Grid */}
                      <div className="grid grid-cols-2 gap-3">
                        {Object.entries(subcategories).map(([subCategory, items]) => (
                          <motion.div
                            key={subCategory}
                            className="bg-white rounded-xl p-4 shadow-sm border border-gray-100"
                            whileHover={{ scale: 1.02 }}
                            transition={{ type: "spring", stiffness: 400, damping: 17 }}
                          >
                            {/* Subcategory Title */}
                            <Link 
                              to={`/categories/${mainCategory.toLowerCase()}/${subCategory.toLowerCase()}`}
                              onClick={() => setIsCategoryModalOpen(false)}
                              className="block mb-3"
                            >
                              <h4 className="font-semibold text-gray-900 text-sm border-b border-gray-100 pb-2">
                                {subCategory}
                              </h4>
                            </Link>

                            {/* Items List */}
                            <ul className="space-y-2">
                              {items.map((item, itemIndex) => (
                                <motion.li
                                  key={item}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: (index * 0.1) + (itemIndex * 0.05) }}
                                >
                                  <Link
                                    to={`/categories/${mainCategory.toLowerCase()}/${subCategory.toLowerCase()}/${item.toLowerCase()}`}
                                    onClick={() => setIsCategoryModalOpen(false)}
                                    className="block text-xs text-gray-600 hover:text-amber-600 transition-colors duration-200 py-1 px-2 rounded-lg hover:bg-amber-50"
                                  >
                                    • {item}
                                  </Link>
                                </motion.li>
                              ))}
                            </ul>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Bottom Padding */}
                <div className="h-6"></div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
})

Header.displayName = 'Header'

export default Header