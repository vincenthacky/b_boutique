// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [react()],
  
  // Configuration des alias pour l'architecture (compatible ESM)
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@components': fileURLToPath(new URL('./src/components', import.meta.url)),
      '@pages': fileURLToPath(new URL('./src/pages', import.meta.url)),
      '@features': fileURLToPath(new URL('./src/features', import.meta.url)),
      '@services': fileURLToPath(new URL('./src/services', import.meta.url)),
      '@hooks': fileURLToPath(new URL('./src/hooks', import.meta.url)),
      '@utils': fileURLToPath(new URL('./src/utils', import.meta.url)),
      '@types': fileURLToPath(new URL('./src/types', import.meta.url)),
      '@contexts': fileURLToPath(new URL('./src/contexts', import.meta.url)),
      '@styles': fileURLToPath(new URL('./src/styles', import.meta.url)),
      '@store': fileURLToPath(new URL('./src/store', import.meta.url)),
      '@assets': fileURLToPath(new URL('./src/assets', import.meta.url))
    }
  },

  // Configuration du serveur de développement
  server: {
    port: 3000,
    open: true,
    host: true,
    cors: true,
    // Proxy pour API Laravel en développement
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },

  // Optimisations de build avancées
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'esbuild',
    target: 'es2022',
    
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'router': ['react-router-dom'],
          'state-management': ['zustand', '@tanstack/react-query'],
          'ui-animations': ['framer-motion', 'lucide-react'],
          'utils': ['axios', 'clsx', 'react-intersection-observer'],
          'forms': ['react-hook-form'],
          'virtualization': ['react-window']
        },
        
        chunkFileNames: (chunkInfo) => {
          const facadeModuleId = chunkInfo.facadeModuleId
          if (facadeModuleId) {
            return 'js/[name].[hash].js'
          }
          return 'js/chunk-[hash].js'
        },
        entryFileNames: 'js/[name].[hash].js',
        assetFileNames: (assetInfo) => {
          if (/\.(css)$/.test(assetInfo.name || '')) {
            return 'css/[name].[hash].[ext]'
          }
          if (/\.(png|jpe?g|svg|gif|tiff|bmp|ico|webp)$/i.test(assetInfo.name || '')) {
            return 'images/[name].[hash].[ext]'
          }
          if (/\.(woff|woff2|eot|ttf|otf)$/i.test(assetInfo.name || '')) {
            return 'fonts/[name].[hash].[ext]'
          }
          return 'assets/[name].[hash].[ext]'
        }
      },
      external: () => false
    },

    chunkSizeWarningLimit: 1000,
    cssCodeSplit: true,
    cssMinify: 'esbuild',
    reportCompressedSize: true,
    write: true
  },

  define: {
    __APP_VERSION__: JSON.stringify('1.0.0'),
    __BUILD_DATE__: JSON.stringify(new Date().toISOString()),
    __DEV__: JSON.stringify(process.env.NODE_ENV === 'development'),
  },

  optimizeDeps: {
    include: [
      'react/jsx-runtime',
      'react', 
      'react-dom', 
      'react-router-dom',
      'framer-motion',
      'lucide-react',
      'zustand',
      '@tanstack/react-query',
      'axios',
      'react-hook-form',
      'clsx',
      'react-intersection-observer',
      'react-window'
    ],
    exclude: ['@vitejs/plugin-react'],
    force: false
  },

  // 🎯 CONFIGURATION CSS CORRIGÉE POUR TAILWIND
  css: {
    devSourcemap: true,
    modules: {
      localsConvention: 'camelCaseOnly'
    },
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/styles/variables.scss";`,
        includePaths: ['node_modules']
      }
    },
    // 🔥 AJOUT DE LA CONFIGURATION POSTCSS EXPLICITE
    postcss: './postcss.config.js'
  },

  esbuild: {
    logOverride: { 
      'this-is-undefined-in-esm': 'silent',
      'direct-eval': 'silent'
    },
    target: 'es2022',
    platform: 'browser',
    format: 'esm',
    jsxFactory: 'React.createElement',
    jsxFragment: 'React.Fragment',
    treeShaking: true,
    minifyIdentifiers: true,
    minifySyntax: true,
    minifyWhitespace: true
  },

  worker: {
    format: 'es',
    rollupOptions: {
      external: ['react', 'react-dom']
    }
  },

  json: {
    namedExports: true,
    stringify: false
  },

  cacheDir: 'node_modules/.vite',
  publicDir: 'public',
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',

  experimental: {
    renderBuiltUrl(filename, { hostType }) {
      if (hostType === 'js') {
        return { js: `/${filename}` }
      }
      return { relative: true }
    }
  }
})