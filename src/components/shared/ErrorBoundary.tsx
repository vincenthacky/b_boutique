// src/components/shared/ErrorBoundary.tsx

import { Component, ErrorInfo, ReactNode } from 'react'
import { motion } from 'framer-motion'
import { AlertTriangle, RefreshCw } from 'lucide-react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo)
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined })
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <motion.div
            className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
            >
              <AlertTriangle className="w-8 h-8 text-red-500" />
            </motion.div>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Oups ! Une erreur s'est produite
            </h2>

            <p className="text-gray-600 mb-6">
              Nous sommes désolés, mais quelque chose s'est mal passé. 
              Veuillez réessayer ou contactez notre support si le problème persiste.
            </p>

            {process.env.NODE_ENV === 'development' && this.state.error && (
              <div className="bg-gray-100 rounded-lg p-4 mb-6 text-left">
                <p className="text-sm font-mono text-red-600">
                  {this.state.error.message}
                </p>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <motion.button
                onClick={this.handleRetry}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-amber-500 text-white rounded-lg font-semibold hover:bg-amber-600 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <RefreshCw className="w-4 h-4" />
                Réessayer
              </motion.button>

              <motion.button
                onClick={() => window.location.href = '/'}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Retour à l'accueil
              </motion.button>
            </div>
          </motion.div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary