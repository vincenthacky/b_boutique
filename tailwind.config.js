/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      // =============================================
      // COULEURS
      // =============================================
      colors: {
        // --- COULEURS PRINCIPALES ---
        'be-primary': {
          50: 'rgb(var(--color-primary-50) / <alpha-value>)',
          100: 'rgb(var(--color-primary-100) / <alpha-value>)',
          200: 'rgb(var(--color-primary-200) / <alpha-value>)',
          300: 'rgb(var(--color-primary-300) / <alpha-value>)',
          400: 'rgb(var(--color-primary-400) / <alpha-value>)',
          500: 'rgb(var(--color-primary-500) / <alpha-value>)',
          600: 'rgb(var(--color-primary-600) / <alpha-value>)',
          700: 'rgb(var(--color-primary-700) / <alpha-value>)',
          800: 'rgb(var(--color-primary-800) / <alpha-value>)',
          900: 'rgb(var(--color-primary-900) / <alpha-value>)',
        },
        'be-secondary': {
          50: 'rgb(var(--color-secondary-50) / <alpha-value>)',
          100: 'rgb(var(--color-secondary-100) / <alpha-value>)',
          200: 'rgb(var(--color-secondary-200) / <alpha-value>)',
          300: 'rgb(var(--color-secondary-300) / <alpha-value>)',
          400: 'rgb(var(--color-secondary-400) / <alpha-value>)',
          500: 'rgb(var(--color-secondary-500) / <alpha-value>)',
          600: 'rgb(var(--color-secondary-600) / <alpha-value>)',
          700: 'rgb(var(--color-secondary-700) / <alpha-value>)',
          800: 'rgb(var(--color-secondary-800) / <alpha-value>)',
          900: 'rgb(var(--color-secondary-900) / <alpha-value>)',
        },

        // --- SURCHARGES COULEURS TAILWIND ---
        'white': 'rgb(var(--color-white) / <alpha-value>)',
        'black': 'rgb(var(--color-black) / <alpha-value>)',
        'gray': {
          50: 'rgb(var(--color-gray-50) / <alpha-value>)',
          100: 'rgb(var(--color-gray-100) / <alpha-value>)',
          200: 'rgb(var(--color-gray-200) / <alpha-value>)',
          300: 'rgb(var(--color-gray-300) / <alpha-value>)',
          400: 'rgb(var(--color-gray-400) / <alpha-value>)',
          500: 'rgb(var(--color-gray-500) / <alpha-value>)',
          600: 'rgb(var(--color-gray-600) / <alpha-value>)',
          700: 'rgb(var(--color-gray-700) / <alpha-value>)',
          800: 'rgb(var(--color-gray-800) / <alpha-value>)',
          900: 'rgb(var(--color-gray-900) / <alpha-value>)',
        },
        'red': {
          400: 'rgb(var(--color-red-400) / <alpha-value>)',
          500: 'rgb(var(--color-red-500) / <alpha-value>)',
          600: 'rgb(var(--color-red-600) / <alpha-value>)',
        },
        'pink': {
          500: 'rgb(var(--color-pink-500) / <alpha-value>)',
        },
        'amber': {
          50: 'rgb(var(--color-primary-50) / <alpha-value>)',
          100: 'rgb(var(--color-primary-100) / <alpha-value>)',
          200: 'rgb(var(--color-primary-200) / <alpha-value>)',
          300: 'rgb(var(--color-primary-300) / <alpha-value>)',
          400: 'rgb(var(--color-primary-400) / <alpha-value>)',
          500: 'rgb(var(--color-primary-500) / <alpha-value>)',
          600: 'rgb(var(--color-primary-600) / <alpha-value>)',
          700: 'rgb(var(--color-primary-700) / <alpha-value>)',
          800: 'rgb(var(--color-primary-800) / <alpha-value>)',
          900: 'rgb(var(--color-primary-900) / <alpha-value>)',
        },
        'orange': {
          200: 'rgb(var(--color-secondary-200) / <alpha-value>)',
          400: 'rgb(var(--color-secondary-400) / <alpha-value>)',
          500: 'rgb(var(--color-secondary-500) / <alpha-value>)',
          600: 'rgb(var(--color-secondary-600) / <alpha-value>)',
        },

        // --- COULEURS SYSTÈME ---
        'background': 'rgb(var(--color-background) / <alpha-value>)',
        'foreground': 'rgb(var(--color-foreground) / <alpha-value>)',
        'card': 'rgb(var(--color-card) / <alpha-value>)',
        'card-foreground': 'rgb(var(--color-card-foreground) / <alpha-value>)',
        'muted': 'rgb(var(--color-muted) / <alpha-value>)',
        'muted-foreground': 'rgb(var(--color-muted-foreground) / <alpha-value>)',
        'border': 'rgb(var(--color-border) / <alpha-value>)',
        'input': 'rgb(var(--color-input) / <alpha-value>)',
        'ring': 'rgb(var(--color-ring) / <alpha-value>)',
        'success': 'rgb(var(--color-success) / <alpha-value>)',
        'warning': 'rgb(var(--color-warning) / <alpha-value>)',
        'error': 'rgb(var(--color-error) / <alpha-value>)',
        'info': 'rgb(var(--color-info) / <alpha-value>)',

        // --- COULEURS SECTIONS SPÉCIFIQUES ---
        // Featured Section
        'featured': {
          'btn-primary': 'rgb(var(--featured-btn-text) / <alpha-value>)',
        },

        // New Products Section
        'new-products': {
          'bg': 'rgb(var(--new-products-bg) / <alpha-value>)',
          'btn-text': 'rgb(var(--new-products-btn-text) / <alpha-value>)',
        },

        // Collections Section
        'collections': {
          'card-bg': 'rgb(var(--collections-card-bg) / <alpha-value>)',
          'card-border': 'rgb(var(--collections-card-border) / <alpha-value>)',
          'text-primary': 'rgb(var(--collections-text-primary) / <alpha-value>)',
          'text-secondary': 'rgba(var(--collections-text-secondary))',
          'text-tertiary': 'rgba(var(--collections-text-tertiary))',
        },

        // Brands Section
        'brands': {
          'card-bg': 'rgb(var(--brands-card-bg) / <alpha-value>)',
          'card-border': 'rgb(var(--brands-card-border) / <alpha-value>)',
          'text-primary': 'rgb(var(--brands-text-primary) / <alpha-value>)',
          'text-secondary': 'rgb(var(--brands-text-secondary) / <alpha-value>)',
          'text-hover': 'rgb(var(--brands-text-hover) / <alpha-value>)',
          'stats-icon': 'rgb(var(--brands-stats-icon-color) / <alpha-value>)',
          'stats-text-primary': 'rgb(var(--brands-stats-text-primary) / <alpha-value>)',
          'stats-text-secondary': 'rgb(var(--brands-stats-text-secondary) / <alpha-value>)',
        },

        // Testimonials Section
        'testimonials': {
          'card-bg': 'rgb(var(--testimonials-card-bg) / <alpha-value>)',
          'card-border': 'rgb(var(--testimonials-card-border) / <alpha-value>)',
          'avatar-border': 'rgb(var(--testimonials-avatar-border) / <alpha-value>)',
          'verified-bg': 'rgb(var(--testimonials-verified-bg) / <alpha-value>)',
          'star': 'rgb(var(--testimonials-star-color) / <alpha-value>)',
          'text-primary': 'rgb(var(--testimonials-text-primary) / <alpha-value>)',
          'text-secondary': 'rgb(var(--testimonials-text-secondary) / <alpha-value>)',
          'text-accent': 'rgb(var(--testimonials-text-accent) / <alpha-value>)',
          'dot-active': 'rgb(var(--testimonials-dot-active) / <alpha-value>)',
          'dot-inactive': 'rgb(var(--testimonials-dot-inactive) / <alpha-value>)',
          'dot-hover': 'rgb(var(--testimonials-dot-hover) / <alpha-value>)',
        },

        // Services Section
        'services': {
          'card-bg': 'rgb(var(--services-card-bg) / <alpha-value>)',
          'card-border': 'rgb(var(--services-card-border) / <alpha-value>)',
          'text-primary': 'rgb(var(--services-text-primary) / <alpha-value>)',
          'text-secondary': 'rgb(var(--services-text-secondary) / <alpha-value>)',
          'text-hover': 'rgb(var(--services-text-hover) / <alpha-value>)',
          'icon-text': 'rgb(var(--services-icon-text) / <alpha-value>)',
        },

        // Newsletter Section
        'newsletter': {
          'section-bg': 'rgb(var(--newsletter-section-bg) / <alpha-value>)',
        },

        // Final CTA Section
        'final-cta': {
          'badge-bg': 'rgba(var(--final-cta-badge-bg))',
          'text-primary': 'rgb(var(--final-cta-text-primary) / <alpha-value>)',
          'text-secondary': 'rgb(var(--final-cta-text-secondary) / <alpha-value>)',
          'text-tertiary': 'rgb(var(--final-cta-text-tertiary) / <alpha-value>)',
          'btn-primary-bg': 'rgb(var(--final-cta-btn-primary-bg) / <alpha-value>)',
          'btn-primary-text': 'rgb(var(--final-cta-btn-primary-text) / <alpha-value>)',
          'btn-secondary-text': 'rgb(var(--final-cta-btn-secondary-text) / <alpha-value>)',
          'stats-icon': 'rgb(var(--final-cta-stats-icon-color) / <alpha-value>)',
          'stats-number': 'rgb(var(--final-cta-stats-number-color) / <alpha-value>)',
          'stats-label': 'rgb(var(--final-cta-stats-label-color) / <alpha-value>)',
        },
      },

      // =============================================
      // OMBRES
      // =============================================
      boxShadow: {
        // --- OMBRES GLOBALES ---
        'be-soft': 'var(--shadow-soft)',
        'be-medium': 'var(--shadow-medium)',
        'be-large': 'var(--shadow-large)',
        'be-xl': 'var(--shadow-xl)',

        // --- OMBRES COMPOSANTS GÉNÉRIQUES ---
        'card': 'var(--shadow-card)',
        'card-hover': 'var(--shadow-card-hover)',
        'button': 'var(--shadow-button)',
        'button-hover': 'var(--shadow-button-hover)',

        // --- OMBRES SECTIONS SPÉCIFIQUES ---
        // Featured Section
        'featured-btn': 'var(--featured-btn-primary-shadow)',
        'featured-btn-hover': '0 25px 50px -12px var(--featured-btn-primary-shadow-hover)',

        // New Products Section
        'new-products-btn': 'var(--new-products-btn-shadow)',
        'new-products-btn-hover': '0 25px 50px -12px var(--new-products-btn-shadow-hover)',

        // Collections Section
        'collections-card': 'var(--collections-card-shadow)',
        'collections-card-hover': 'var(--collections-card-shadow-hover)',
        'collections-btn': 'var(--collections-btn-primary-shadow)',
        'collections-btn-hover': '0 25px 50px -12px var(--collections-btn-primary-shadow-hover)',

        // Brands Section
        'brands-card': 'var(--brands-card-shadow)',
        'brands-card-hover': 'var(--brands-card-shadow-hover)',

        // Testimonials Section
        'testimonials-card': 'var(--testimonials-card-shadow)',

        // Services Section
        'services-card': 'var(--services-card-shadow)',

        // Final CTA Section
        'final-cta-btn-primary': '0 25px 50px -12px var(--final-cta-btn-primary-shadow)',
      },

      // =============================================
      // ARRIÈRE-PLANS & GRADIENTS
      // =============================================
      backgroundImage: {
        // --- GRADIENTS PRINCIPAUX ---
        'be-primary': 'var(--gradient-primary)',
        'be-secondary': 'var(--gradient-secondary)',
        'be-hero': 'var(--gradient-hero)',
        'red-pink': 'var(--gradient-red-pink)',
        'amber-primary': 'var(--gradient-amber-primary)',
        'amber-hover': 'var(--gradient-amber-hover)',
        'newsletter': 'var(--newsletter-bg-gradient)',
        'overlay': 'var(--overlay-gradient)',

        // --- GRADIENTS HERO ---
        'hero-primary-overlay': 'var(--hero-overlay-primary)',
        'hero-secondary-overlay': 'var(--hero-overlay-secondary)',
        'hero-divider': 'var(--hero-divider-gradient)',
        'hero-title': 'var(--hero-title-gradient)',
        'hero-btn-primary': 'var(--hero-btn-primary-bg)',

        // --- GRADIENTS CATEGORIES ---
        'categories-bg': 'var(--categories-bg-gradient)',
        'categories-card-hover': 'var(--categories-card-hover-overlay)',

        // --- GRADIENTS SECTIONS ---
        // Featured Section
        'featured-section': 'var(--featured-bg-gradient)',
        'featured-btn-primary': 'var(--featured-btn-primary-bg)',

        // New Products Section
        'new-products-btn': 'var(--new-products-btn-bg)',

        // Collections Section
        'collections-section': 'var(--collections-bg-gradient)',
        'collections-btn': 'var(--collections-btn-primary-bg)',

        // Brands Section
        'brands-section': 'var(--brands-bg-gradient)',
        'brands-overlay': 'var(--brands-overlay-gradient)',
        'brands-overlay-hover': 'var(--brands-overlay-hover-gradient)',

        // Testimonials Section
        'testimonials-section': 'var(--testimonials-bg-gradient)',
        'testimonials-pattern': 'var(--testimonials-pattern-bg)',

        // Services Section
        'services-section': 'var(--services-bg-gradient)',

        // Final CTA Section
        'final-cta-section': 'var(--final-cta-bg-gradient)',
        'final-cta-btn-secondary': 'var(--final-cta-btn-secondary-bg)',
      },

      // =============================================
      // COULEURS D'ARRIÈRE-PLAN
      // =============================================
      backgroundColor: {
        // Collections Section
        'collections-badge': 'var(--collections-badge-bg)',
        'collections-overlay': 'var(--collections-overlay-bg)',
        'collections-overlay-hover': 'var(--collections-overlay-hover-bg)',

        // Final CTA Section
        'final-cta-badge': 'var(--final-cta-badge-bg)',
        'final-cta-btn-secondary': 'var(--final-cta-btn-secondary-bg)',
        'final-cta-btn-secondary-hover': 'var(--final-cta-btn-secondary-hover)',
        'final-cta-stats-card': 'var(--final-cta-stats-card-bg)',
        'final-cta-stats-card-hover': 'var(--final-cta-stats-card-hover)',
      },

      // =============================================
      // COULEURS DE BORDURE
      // =============================================
      borderColor: {
        // Final CTA Section
        'final-cta-btn-secondary': 'var(--final-cta-btn-secondary-border)',
        'final-cta-stats-card': 'var(--final-cta-stats-card-border)',
      },

      // =============================================
      // TYPOGRAPHIE
      // =============================================
      fontFamily: {
        'inter': ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        'playfair': ['Playfair Display', 'serif'],
      },

      // =============================================
      // ESPACEMENTS
      // =============================================
      spacing: {
        '18': '4.5rem',
      },

      // =============================================
      // ANIMATIONS
      // =============================================
      animation: {
        'fade-in-up': 'fadeInUp 0.6s ease-out',
        'fade-in-scale': 'fadeInScale 0.4s ease-out',
        'slide-in-right': 'slideInRight 0.5s ease-out',
        'float': 'float 3s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'be-float': 'float 4s ease-in-out infinite',
        'be-glow': 'pulse-glow 3s ease-in-out infinite',
      },

      // =============================================
      // KEYFRAMES
      // =============================================
      keyframes: {
        fadeInUp: {
          from: {
            opacity: '0',
            transform: 'translateY(30px)',
          },
          to: {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        fadeInScale: {
          from: {
            opacity: '0',
            transform: 'scale(0.95)',
          },
          to: {
            opacity: '1',
            transform: 'scale(1)',
          },
        },
        slideInRight: {
          from: {
            opacity: '0',
            transform: 'translateX(30px)',
          },
          to: {
            opacity: '1',
            transform: 'translateX(0)',
          },
        },
        float: {
          '0%, 100%': {
            transform: 'translateY(0px)',
          },
          '50%': {
            transform: 'translateY(-10px)',
          },
        },
        'pulse-glow': {
          '0%, 100%': {
            'box-shadow': '0 0 20px rgba(var(--color-primary-400), 0.4)',
          },
          '50%': {
            'box-shadow': '0 0 30px rgba(var(--color-primary-400), 0.8)',
          },
        },
      },

      // =============================================
      // BACKDROP BLUR
      // =============================================
      backdropBlur: {
        'sm': '4px',
        'DEFAULT': '8px',
        'md': '12px',
        'lg': '16px',
        'xl': '24px',
        '2xl': '40px',
        '3xl': '64px',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
  ],
}