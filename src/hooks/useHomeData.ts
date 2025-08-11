// src/hooks/useHomeData.ts

import { useState, useEffect } from 'react'
import { homeApi, getStaticFallbackData } from '../services/api/homeApi'
import type { Product, Testimonial } from '../types/homeTypes'

interface HomeDataState {
  featuredProducts: Product[]
  newProducts: Product[]
  testimonials: Testimonial[]
  loading: boolean
  error: string | null
}

export const useHomeData = () => {
  const [state, setState] = useState<HomeDataState>({
    featuredProducts: [],
    newProducts: [],
    testimonials: [],
    loading: true,
    error: null
  })

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        setState(prev => ({ ...prev, loading: true, error: null }))

        // Tentative de récupération des données via l'API
        const [featuredProducts, newProducts, testimonials] = await Promise.all([
          homeApi.getFeaturedProducts().catch(() => []),
          homeApi.getNewProducts().catch(() => []),
          homeApi.getTestimonials().catch(() => [])
        ])

        // Si l'API retourne des données vides, utiliser le fallback
        const fallbackData = getStaticFallbackData()
        
        setState({
          featuredProducts: featuredProducts.length > 0 ? featuredProducts : fallbackData.featuredProducts,
          newProducts: newProducts.length > 0 ? newProducts : fallbackData.newProducts,
          testimonials: testimonials.length > 0 ? testimonials : fallbackData.testimonials,
          loading: false,
          error: null
        })

      } catch (error) {
        console.error('Error fetching home data:', error)
        
        // En cas d'erreur, utiliser les données statiques
        const fallbackData = getStaticFallbackData()
        setState({
          featuredProducts: fallbackData.featuredProducts,
          newProducts: fallbackData.newProducts,
          testimonials: fallbackData.testimonials,
          loading: false,
          error: 'Impossible de charger les données. Utilisation des données par défaut.'
        })
      }
    }

    fetchHomeData()
  }, [])

  const refetch = () => {
    setState(prev => ({ ...prev, loading: true }))
    // Re-exécuter la logique de fetchHomeData
  }

  return {
    ...state,
    refetch
  }
}