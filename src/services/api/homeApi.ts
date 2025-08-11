// src/data/api/homeApi.ts

import type { Product, Testimonial } from '../types/homeTypes'

// Configuration de base de l'API
const API_BASE_URL = process.env.VITE_API_BASE_URL || 'https://api.beboutique.com/v1'

// Interface pour la réponse de l'API
interface ApiResponse<T> {
  data: T
  status: 'success' | 'error'
  message?: string
}

// Fonction utilitaire pour les appels API
const apiCall = async <T>(endpoint: string): Promise<T> => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        // Ajoutez d'autres headers si nécessaire (auth token, etc.)
      },
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const result: ApiResponse<T> = await response.json()
    
    if (result.status === 'error') {
      throw new Error(result.message || 'API Error')
    }

    return result.data
  } catch (error) {
    console.error(`API call failed for ${endpoint}:`, error)
    throw error
  }
}

// API Functions
export const homeApi = {
  // Récupérer les produits en vedette
  getFeaturedProducts: async (): Promise<Product[]> => {
    return apiCall<Product[]>('/products/featured')
  },

  // Récupérer les nouveaux produits
  getNewProducts: async (): Promise<Product[]> => {
    return apiCall<Product[]>('/products/new')
  },

  // Récupérer les témoignages
  getTestimonials: async (): Promise<Testimonial[]> => {
    return apiCall<Testimonial[]>('/testimonials')
  },

  // Inscription à la newsletter
  subscribeNewsletter: async (email: string): Promise<{ success: boolean }> => {
    try {
      const response = await fetch(`${API_BASE_URL}/newsletter/subscribe`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const result = await response.json()
      return { success: result.status === 'success' }
    } catch (error) {
      console.error('Newsletter subscription failed:', error)
      return { success: false }
    }
  },

  // Récupérer les statistiques de la page d'accueil
  getHomeStats: async (): Promise<{
    totalProducts: number
    totalArtisans: number
    totalClients: number
    averageRating: number
  }> => {
    return apiCall('/stats/home')
  }
}

// Fonction de fallback avec données statiques
export const getStaticFallbackData = () => {
  // Données statiques de fallback si l'API n'est pas disponible
  const featuredProductsData: Product[] = [
    {
      id: 1,
      title: 'Collier Traditionnel Akan',
      price: 35000,
      originalPrice: 50000,
      discount: 30,
      image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&q=90',
      badge: 'TENDANCE',
      badgeColor: 'from-amber-500 to-amber-400',
      rating: 4.9,
      reviews: 127,
      sold: 234,
      isNew: false,
      isBestseller: true,
      category: 'Bijoux'
    },
    // ... autres produits
  ]

  const newProductsData: Product[] = [
    {
      id: 1,
      title: 'Robe Ankara Moderne',
      price: 42000,
      image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=600&h=800&fit=crop&q=90',
      creator: 'Atelier Korhogo',
      rating: 4.9,
      reviews: 24,
      isNew: true,
      isBestseller: false,
      category: 'Femme'
    },
    // ... autres produits
  ]

  const testimonialsData: Testimonial[] = [
    {
      id: 1,
      name: 'Aminata Koné',
      location: 'Abidjan',
      avatar: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=150&h=150&fit=crop',
      rating: 5,
      text: "La qualité est exceptionnelle ! J'ai trouvé des pièces uniques que je ne trouve nulle part ailleurs. Le service client est très réactif.",
      product: 'Collier Akan',
      verified: true,
      date: '2024-01-15'
    },
    // ... autres témoignages
  ]

  return {
    featuredProducts: featuredProductsData,
    newProducts: newProductsData,
    testimonials: testimonialsData
  }
}