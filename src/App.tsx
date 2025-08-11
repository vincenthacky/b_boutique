
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
              {/*<Route path="/products" element={<ProductsPage />} />
              <Route path="/product/:id" element={<ProductDetailPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />*/}
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