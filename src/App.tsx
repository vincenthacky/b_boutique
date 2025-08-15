
// App.tsx
import { memo, Suspense, lazy } from 'react'
import { Routes, Route } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import Loader from './components/common/Loader'

// Lazy loading des pages pour performance optimale
const HomePage = lazy(() => import('./pages/Home/HomePage'))
const BrandPartnerPage = lazy(() => import('./pages/BrandPartner/BrandPartnerPage'));
const AboutPage = lazy(() => import('./pages/about/AboutePage'));
const CollectionPage = lazy(() => import('./pages/collection/CollectionPage'));
const FavoritesPage = lazy(() => import('./pages/favorites/favoritesPage'));
const CartPage = lazy(() => import('./pages/Cart/CartPage'));
const ServicesPage = lazy(() => import('./pages/Services/ServicesPage'));
const AccountPage = lazy(() => import('./pages/Account/account'));
const ExceptionalOffersPage = lazy(() => import('./pages/FeaturedProduct/ExceptionalOffersPage'));
const NewProductsPage= lazy(() => import('./pages/NewProduct/NewProductsPage'));

//const ProductsPage = lazy(() => import('./pages/Products/ProductsPage'))
//const ProductDetailPage = lazy(() => import('./pages/ProductDetail/ProductDetailPage'))
//const CartPage = lazy(() => import('./pages/Cart/CartPage'))
//const CheckoutPage = lazy(() => import('./pages/Checkout/CheckoutPage'))

const App = memo(() => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      
      <main className="pt-20"> {/* Offset pour header fixe */}
        <AnimatePresence mode="wait">
          <Suspense fallback={<Loader />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
               <Route path="/brand/:id" element={<BrandPartnerPage />} />
               <Route path="/about" element={<AboutPage />} />
               <Route path="/about" element={<AboutPage />} />
               <Route path="/favorites" element={<FavoritesPage />} /> {/* Page des favoris */}
               <Route path="/cart" element={<CartPage />} /> {/* Page du panier */}
                <Route path="/services" element={<ServicesPage />} /> {/* Page des services */}
               <Route path="/account" element={<AccountPage />} /> {/* Page du compte */}
              <Route path="/offers" element={<ExceptionalOffersPage />} /> {/* Page des offres exceptionnelles */}
              <Route path="/new-products" element={<NewProductsPage />} /> {/* Page des nouveaux produits */}

               

              {/*<Route path="/products" element={<ProductsPage />} />
              <Route path="/product/:id" element={<ProductDetailPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />*/}
              <Route path="/collections/:id" element={<CollectionPage />} /> {/* Nouvelle route */}
              <Route path="/collections/:slug" element={<CollectionPage />} /> {/* Route alternative avec slug */}
            </Routes>
          </Suspense>
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  )
})

App.displayName = 'App'
export default App