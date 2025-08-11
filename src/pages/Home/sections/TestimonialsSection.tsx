import { motion, AnimatePresence } from 'framer-motion'
import { MapPin, Check, Star } from 'lucide-react'

export const TestimonialsSection = ({ 
  testimonialsData,
  activeTestimonial,
  setActiveTestimonial
}: {
  testimonialsData: Array<{
    id: number
    name: string
    location: string
    avatar: string
    rating: number
    text: string
    product: string
    verified: boolean
    date: string
  }>
  activeTestimonial: number
  setActiveTestimonial: (index: number) => void
}) => {
  return (
    <section className="py-24 bg-testimonials-section relative overflow-hidden">
      <div className="absolute inset-0" style={{ opacity: 'var(--testimonials-pattern-opacity)' }}>
        <div className="absolute inset-0 bg-testimonials-pattern" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <motion.span
            className="inline-block px-5 py-2 bg-gradient-to-r from-pink-100 to-pink-100 text-pink-700 rounded-full text-sm font-bold uppercase tracking-wider mb-6"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring" }}
          >
            TÉMOIGNAGES CLIENTS
          </motion.span>
          <h2 className="text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-6">
            Ils nous font confiance
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Découvrez les avis de nos clients satisfaits à travers toute l'Afrique
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTestimonial}
              className="bg-testimonials-card-bg rounded-3xl p-8 md:p-12 shadow-testimonials-card border border-testimonials-card-border"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="relative">
                  <img
                    src={testimonialsData[activeTestimonial].avatar}
                    alt={testimonialsData[activeTestimonial].name}
                    className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-4 border-testimonials-avatar-border"
                  />
                  {testimonialsData[activeTestimonial].verified && (
                    <div className="absolute -bottom-2 -right-2 bg-testimonials-verified-bg text-white p-2 rounded-full">
                      <Check className="w-4 h-4" />
                    </div>
                  )}
                </div>

                <div className="flex-1 text-center md:text-left">
                  <div className="flex items-center justify-center md:justify-start gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={20}
                        className="text-testimonials-star fill-current"
                      />
                    ))}
                  </div>
                  
                  <p className="text-lg text-testimonials-text-secondary mb-6 italic leading-relaxed">
                    "{testimonialsData[activeTestimonial].text}"
                  </p>
                  
                  <div className="space-y-1">
                    <h4 className="font-bold text-testimonials-text-primary text-lg">
                      {testimonialsData[activeTestimonial].name}
                    </h4>
                    <p className="text-testimonials-text-secondary flex items-center justify-center md:justify-start gap-2">
                      <MapPin className="w-4 h-4" />
                      {testimonialsData[activeTestimonial].location}
                    </p>
                    <p className="text-sm text-testimonials-text-accent font-medium">
                      A acheté: {testimonialsData[activeTestimonial].product}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-center gap-2 mt-8">
            {testimonialsData.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveTestimonial(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === activeTestimonial 
                    ? 'w-8 bg-testimonials-dot-active' 
                    : 'w-2 bg-testimonials-dot-inactive hover:bg-testimonials-dot-hover'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
TestimonialsSection.displayName = 'TestimonialsSection'
export default TestimonialsSection