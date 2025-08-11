// BrandPartnerPage.tsx
import { memo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Instagram, Facebook, Globe, Phone, Mail, MapPin, Star } from 'lucide-react';

// Données statiques du premier partenaire
const partner = {
  id: '1',
  name: 'Artisanat d\'Afrique',
  logo: 'https://images.unsplash.com/photo-1616781290382-f597924e2358?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  coverImage: 'https://images.unsplash.com/photo-1549419356-991f86821217?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  specialty: 'Textiles traditionnels et modernes',
  description: 'Depuis 1985, Artisanat d\'Afrique perpétue les traditions textiles africaines tout en innovant avec des designs contemporains. Chaque pièce est tissée à la main par nos artisans expérimentés.',
  story: 'Fondé par Aminata Diallo dans un petit village du Mali, notre atelier est devenu une référence internationale pour la qualité de nos tissus et notre engagement envers le commerce équitable.',
  products: [
    { id: 'p1', title: 'Tissu Bogolan', price: 45000, image: 'https://images.unsplash.com/photo-1627918451829-4a0b2b8c9b3e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', rating: 4.8, reviews: 124 },
    { id: 'p2', title: 'Écharpe Kente', price: 32000, image: 'https://images.unsplash.com/photo-1599818815147-320e8b1b6f0e?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', rating: 4.9, reviews: 89 },
    { id: 'p3', title: 'Coussin Wax', price: 28000, image: 'https://images.unsplash.com/photo-1627918451996-515a4529d288?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', rating: 4.7, reviews: 56 },
  ],
  stats: [
    { label: 'Années d\'expérience', value: '35+' },
    { label: 'Artisans employés', value: '120' },
    { label: 'Pays desservis', value: '18' },
  ],
  contact: {
    phone: '+223 75 12 34 56',
    email: 'contact@artisanat-afrique.ml',
    website: 'www.artisanat-afrique.ml',
    address: 'Rue des Artisans, Bamako, Mali',
    social: {
      instagram: '@artisanat_afrique',
      facebook: 'ArtisanatAfriqueOfficiel',
    },
  },
  images: [
    'https://images.unsplash.com/photo-1627918451829-4a0b2b8c9b3e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1627918451996-515a4529d288?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1589139599543-8557345f061d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  ],
};

// Composant SectionTitle
const SectionTitle = memo(({ title, subtitle }) => (
  <div className="text-center mb-12 md:mb-16">
    <motion.h2
      className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-2"
      initial={{ opacity: 0, y: -20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      {title}
    </motion.h2>
    <motion.p
      className="text-amber-600 text-lg md:text-xl font-medium"
      initial={{ opacity: 0, y: -20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.1, duration: 0.5 }}
    >
      {subtitle}
    </motion.p>
  </div>
));

// Composant ProductCard
const ProductCard = memo(({ product }) => (
  <Link to={`/products/${product.id}`}>
    <motion.div
      className="bg-white rounded-2xl shadow-lg hover:shadow-xl overflow-hidden transition-all duration-300 transform hover:-translate-y-1 group border border-gray-100"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="relative overflow-hidden aspect-square">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-4 right-4 bg-black/60 text-white text-xs font-bold px-3 py-1 rounded-full backdrop-blur-sm">
          {product.price.toLocaleString('fr-FR')} FCFA
        </div>
      </div>
      <div className="p-4 md:p-6">
        <h3 className="text-lg font-bold text-gray-900 group-hover:text-amber-600 transition-colors">
          {product.title}
        </h3>
        <div className="flex items-center mt-2 text-sm text-gray-600">
          <Star className="w-4 h-4 fill-amber-400 text-amber-400 mr-1" />
          <span>{product.rating.toFixed(1)} ({product.reviews} avis)</span>
        </div>
      </div>
    </motion.div>
  </Link>
));

const BrandPartnerPage = memo(() => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-[60vh] md:h-[70vh] flex items-end text-center overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${partner.coverImage})` }}
          initial={{ scale: 1.1, opacity: 0.8 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative w-full mb-8 z-10">
          <Link
            to="/"
            className="absolute top-0 left-0 -mt-8 md:-mt-12 flex items-center text-white hover:text-amber-300 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            <span className="font-medium">Retour à l'accueil</span>
          </Link>
          <motion.div
            className="flex flex-col md:flex-row items-center gap-8 md:gap-12"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <div className="w-32 h-32 md:w-48 md:h-48 flex-shrink-0 bg-white rounded-2xl p-4 shadow-lg flex items-center justify-center">
              <img
                src={partner.logo}
                alt={partner.name}
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <h1 className="text-3xl md:text-5xl font-bold text-white mb-2 leading-tight drop-shadow-lg">
                {partner.name}
              </h1>
              <p className="text-lg md:text-xl text-amber-300 font-medium drop-shadow">
                {partner.specialty}
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <section className="mb-16 md:mb-24">
          <SectionTitle
            title="Notre Histoire"
            subtitle="Découvrez les origines et les valeurs de notre marque"
          />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
            <motion.div
              className="space-y-6 text-gray-700"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-lg leading-relaxed">{partner.story}</p>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-8">
                {partner.stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    className="bg-amber-50 rounded-xl p-4 text-center border border-amber-100 shadow-sm"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="text-2xl font-bold text-amber-600 mb-1">{stat.value}</div>
                    <div className="text-xs font-medium text-gray-600">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            <motion.div
              className="grid grid-cols-2 gap-4"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {partner.images.map((image, index) => (
                <div key={index} className={`${index === 0 ? 'col-span-2' : ''} rounded-xl overflow-hidden shadow-md group`}>
                  <img
                    src={image}
                    alt={`Galerie ${index + 1}`}
                    className="w-full h-full object-cover aspect-[4/3] transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        <section className="mb-16 md:mb-24">
          <SectionTitle
            title="Nos Créations"
            subtitle="Découvrez notre sélection exclusive pour ce partenaire"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {partner.products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        </section>

        <section>
          <SectionTitle
            title="Contact & Réseaux"
            subtitle="Comment nous joindre et nous suivre"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100 shadow-md"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-xl font-bold text-gray-900 mb-6">Coordonnées</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-amber-100 rounded-lg text-amber-600">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Téléphone</p>
                    <p className="font-medium text-gray-900">{partner.contact.phone}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-amber-100 rounded-lg text-amber-600">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium text-gray-900">{partner.contact.email}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-amber-100 rounded-lg text-amber-600">
                    <Globe className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Site web</p>
                    <p className="font-medium text-gray-900">{partner.contact.website}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-amber-100 rounded-lg text-amber-600">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Adresse</p>
                    <p className="font-medium text-gray-900">{partner.contact.address}</p>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100 shadow-md"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3 className="text-xl font-bold text-gray-900 mb-6">Réseaux sociaux</h3>
              <div className="space-y-4">
                <a
                  href={`https://instagram.com/${partner.contact.social.instagram}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 bg-gradient-to-r from-amber-50 to-white rounded-xl border border-gray-200 hover:border-amber-300 transition-all"
                >
                  <div className="p-2 bg-gradient-to-br from-pink-600 to-amber-500 rounded-lg text-white">
                    <Instagram className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Instagram</p>
                    <p className="font-medium text-gray-900">{partner.contact.social.instagram}</p>
                  </div>
                </a>
                
                <a
                  href={`https://facebook.com/${partner.contact.social.facebook}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 bg-gradient-to-r from-amber-50 to-white rounded-xl border border-gray-200 hover:border-amber-300 transition-all"
                >
                  <div className="p-2 bg-gradient-to-br from-blue-600 to-blue-400 rounded-lg text-white">
                    <Facebook className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Facebook</p>
                    <p className="font-medium text-gray-900">{partner.contact.social.facebook}</p>
                  </div>
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
});

BrandPartnerPage.displayName = 'BrandPartnerPage';
export default BrandPartnerPage;