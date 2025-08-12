import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Instagram, Facebook, Globe, Phone, Mail, MapPin, Star, Award, Users, Calendar, TrendingUp, Play, Pause, Volume2, VolumeX, Heart, Share2, ExternalLink, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

// Données du partenaire enrichies
const partner = {
  id: '1',
  name: 'Artisanat d\'Afrique',
  tagline: 'L\'art authentique au cœur de l\'Afrique',
  logo: 'https://images.unsplash.com/photo-1616781290382-f597924e2358?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  coverImage: 'https://images.unsplash.com/photo-1549419356-991f86821217?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  heroVideo: 'https://player.vimeo.com/external/434045526.sd.mp4?s=c27eecc69cf312c8f8e7b6d4b7f6e3c1&profile_id=164&oauth2_token_id=57447761',
  specialty: 'Textiles traditionnels et modernes',
  founded: '1985',
  description: 'Depuis 1985, Artisanat d\'Afrique perpétue les traditions textiles africaines tout en innovant avec des designs contemporains. Chaque pièce est tissée à la main par nos artisans expérimentés dans le respect des techniques ancestrales.',
  story: 'Fondé par Aminata Diallo dans un petit village du Mali, notre atelier familial s\'est transformé en une coopérative internationale reconnue pour la qualité exceptionnelle de nos tissus et notre engagement indéfectible envers le commerce équitable. Aujourd\'hui, nous travaillons avec plus de 120 artisans dans 8 pays africains.',
  mission: 'Préserver et valoriser l\'artisanat africain traditionnel tout en offrant des opportunités économiques durables aux communautés locales.',
  values: ['Authenticité', 'Commerce Équitable', 'Durabilité', 'Excellence'],
  certifications: [
    { name: 'Fair Trade Certified', icon: '🏆' },
    { name: 'GOTS Organic', icon: '🌱' },
    { name: 'B Corp Certified', icon: '🌍' },
  ],
  awards: [
    { year: '2023', title: 'Prix de l\'Excellence Artisanale Africaine' },
    { year: '2022', title: 'Meilleur Partenaire Commerce Équitable' },
    { year: '2021', title: 'Innovation Textile Durable' },
  ],
  products: [
    { 
      id: 'p1', 
      title: 'Tissu Bogolan Premium', 
      price: 45000, 
      originalPrice: 55000,
      image: 'https://images.unsplash.com/photo-1627918451829-4a0b2b8c9b3e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 
      rating: 4.9, 
      reviews: 124,
      badge: 'Bestseller',
      description: 'Tissu traditionnel malien aux motifs authentiques',
      craftTime: '3-5 jours'
    },
    { 
      id: 'p2', 
      title: 'Écharpe Kente Royal', 
      price: 32000, 
      originalPrice: 38000,
      image: 'https://images.unsplash.com/photo-1599818815147-320e8b1b6f0e?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 
      rating: 4.8, 
      reviews: 89,
      badge: 'Limited',
      description: 'Écharpe royale tissée selon la tradition ghanéenne',
      craftTime: '2-3 jours'
    },
    { 
      id: 'p3', 
      title: 'Coussin Wax Deluxe', 
      price: 28000, 
      originalPrice: 33000,
      image: 'https://images.unsplash.com/photo-1627918451996-515a4529d288?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 
      rating: 4.7, 
      reviews: 156,
      badge: 'New',
      description: 'Coussin décoratif en tissu wax premium',
      craftTime: '1-2 jours'
    },
  ],
  stats: [
    { label: 'Années d\'expérience', value: '39', icon: Calendar, suffix: '+' },
    { label: 'Artisans partenaires', value: '120', icon: Users, suffix: '+' },
    { label: 'Pays desservis', value: '28', icon: Globe, suffix: '' },
    { label: 'Croissance annuelle', value: '25', icon: TrendingUp, suffix: '%' },
  ],
  testimonials: [
    {
      name: 'Marie Dubois',
      role: 'Décoratrice d\'intérieur',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b77c?q=80&w=150&auto=format&fit=crop',
      content: 'La qualité exceptionnelle des tissus et l\'authenticité des motifs font d\'Artisanat d\'Afrique notre partenaire privilégié pour tous nos projets haut de gamme.',
      rating: 5
    },
    {
      name: 'Jean-Baptiste Martin',
      role: 'Collectionneur d\'art africain',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=150&auto=format&fit=crop',
      content: 'Chaque pièce raconte une histoire. C\'est bien plus qu\'un simple tissu, c\'est un morceau de culture africaine préservé avec passion.',
      rating: 5
    },
  ],
  contact: {
    phone: '+223 75 12 34 56',
    email: 'contact@artisanat-afrique.ml',
    website: 'www.artisanat-afrique.ml',
    address: 'Rue des Artisans, Quartier des Arts, Bamako, Mali',
    workingHours: 'Lun-Ven: 8h-17h | Sam: 9h-13h',
    social: {
      instagram: '@artisanat_afrique',
      facebook: 'ArtisanatAfriqueOfficiel',
      followers: '125K'
    },
  },
  gallery: [
    'https://images.unsplash.com/photo-1627918451829-4a0b2b8c9b3e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1627918451996-515a4529d288?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1589139599543-8557345f061d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1576826785542-0ac95ce0e2e0?q=80&w=2070&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=2070&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=2070&auto=format&fit=crop',
  ],
};

// Hooks personnalisés
const useScrollAnimation = () => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return [ref, isVisible];
};

// Composants
const AnimatedCounter = ({ value, suffix = '', duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const [ref, isVisible] = useScrollAnimation();

  useEffect(() => {
    if (!isVisible) return;
    
    const target = parseInt(value);
    const increment = target / (duration / 50);
    let current = 0;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, 50);
    
    return () => clearInterval(timer);
  }, [isVisible, value, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
};

const GalleryCarousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => setCurrentIndex((prev) => (prev + 1) % images.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);

  return (
    <div className="relative group">
      <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
        <img
          src={images[currentIndex]}
          alt="Galerie"
          className="w-full h-full object-cover transition-transform duration-700 transform group-hover:scale-105"
        />
      </div>
      
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white hover:scale-110"
      >
        <ChevronLeft className="w-6 h-6 text-gray-700" />
      </button>
      
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white hover:scale-110"
      >
        <ChevronRight className="w-6 h-6 text-gray-700" />
      </button>
      
      <div className="flex justify-center mt-4 gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex ? 'bg-amber-500 scale-125' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

const ProductCard = ({ product, index }) => {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <div className="group relative">
      <div className="bg-white rounded-3xl shadow-lg hover:shadow-2xl overflow-hidden transition-all duration-500 transform hover:-translate-y-2 border border-gray-100">
        {/* Badge */}
        {product.badge && (
          <div className="absolute top-4 left-4 z-10">
            <span className={`px-3 py-1 text-xs font-bold rounded-full backdrop-blur-sm ${
              product.badge === 'Bestseller' ? 'bg-emerald-500 text-white' :
              product.badge === 'Limited' ? 'bg-purple-500 text-white' :
              'bg-blue-500 text-white'
            }`}>
              {product.badge}
            </span>
          </div>
        )}

        {/* Actions */}
        <div className="absolute top-4 right-4 z-10 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={() => setIsLiked(!isLiked)}
            className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
          >
            <Heart className={`w-5 h-5 ${isLiked ? 'text-red-500 fill-current' : 'text-gray-600'}`} />
          </button>
          <button className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
            <Share2 className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Image */}
        <div className="relative overflow-hidden aspect-square">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-bold text-gray-900 group-hover:text-amber-600 transition-colors">
              {product.title}
            </h3>
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span className="text-sm font-medium text-gray-700">{product.rating}</span>
            </div>
          </div>
          
          <p className="text-sm text-gray-600 mb-3">{product.description}</p>
          
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold text-gray-900">
                {product.price.toLocaleString('fr-FR')} FCFA
              </span>
              {product.originalPrice && (
                <span className="text-sm text-gray-500 line-through">
                  {product.originalPrice.toLocaleString('fr-FR')} FCFA
                </span>
              )}
            </div>
          </div>
          
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>⏱ {product.craftTime}</span>
            <span>👀 {product.reviews} avis</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const TestimonialCard = ({ testimonial }) => {
  return (
    <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
      <div className="flex items-center mb-6">
        <img
          src={testimonial.avatar}
          alt={testimonial.name}
          className="w-16 h-16 rounded-full object-cover mr-4 ring-4 ring-amber-100"
        />
        <div>
          <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
          <p className="text-sm text-gray-600">{testimonial.role}</p>
          <div className="flex items-center mt-1">
            {[...Array(testimonial.rating)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
            ))}
          </div>
        </div>
      </div>
      
      <div className="relative">
        <Quote className="absolute -top-2 -left-2 w-8 h-8 text-amber-200" />
        <p className="text-gray-700 italic leading-relaxed pl-6">
          {testimonial.content}
        </p>
      </div>
    </div>
  );
};

// Composant principal
const BrandPartnerPage = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-amber-50/30 to-gray-50">
      {/* Hero Section Premium */}
      <div className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background avec parallax */}
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-[10s] ease-out"
          style={{ 
            backgroundImage: `url(${partner.coverImage})`,
            transform: 'scale(1.05)'
          }}
        />
        
        {/* Overlay gradient sophistiqué */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        
        {/* Particules flottantes */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-amber-400/30 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${3 + Math.random() * 4}s`
              }}
            />
          ))}
        </div>

        {/* Navigation */}
        <button className="absolute top-8 left-8 flex items-center gap-3 text-white hover:text-amber-300 transition-all duration-300 group z-50">
          <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center group-hover:bg-white/20 transition-all">
            <ArrowLeft className="w-6 h-6" />
          </div>
          <span className="font-medium hidden sm:block">Retour à l'accueil</span>
        </button>

        {/* Actions Hero */}
        <div className="absolute top-8 right-8 flex items-center gap-4 z-50">
          <button className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/20 transition-all">
            <Heart className="w-6 h-6" />
          </button>
          <button className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/20 transition-all">
            <Share2 className="w-6 h-6" />
          </button>
        </div>

        {/* Contenu Hero */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="mb-8">
            <div className="w-32 h-32 md:w-40 md:h-40 mx-auto bg-white rounded-3xl p-6 shadow-2xl mb-8 transform hover:scale-105 transition-transform duration-300">
              <img
                src={partner.logo}
                alt={partner.name}
                className="w-full h-full object-contain"
              />
            </div>
            
            <div className="space-y-4">
              <h1 className="text-4xl md:text-7xl font-black text-white mb-4 leading-tight">
                <span className="bg-gradient-to-r from-white via-amber-200 to-white bg-clip-text text-transparent">
                  {partner.name}
                </span>
              </h1>
              
              <p className="text-xl md:text-3xl text-amber-300 font-light mb-6">
                {partner.tagline}
              </p>
              
              <div className="flex items-center justify-center gap-6 text-white/80">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  <span>Depuis {partner.founded}</span>
                </div>
                <div className="w-1 h-1 bg-white/40 rounded-full" />
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5" />
                  <span>Certifié Commerce Équitable</span>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Hero */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12">
            <button className="group relative px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-full font-semibold text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 overflow-hidden">
              <span className="relative z-10">Découvrir nos créations</span>
              <div className="absolute inset-0 bg-gradient-to-r from-amber-600 to-amber-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
            
            <button className="group px-8 py-4 border-2 border-white/30 text-white rounded-full font-semibold text-lg backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
              <span className="flex items-center gap-2">
                <ExternalLink className="w-5 h-5" />
                Visiter le site web
              </span>
            </button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white animate-bounce">
          <div className="w-8 h-12 rounded-full border-2 border-white/30 flex justify-center">
            <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Stats Premium */}
        <section className="py-20 -mt-20 relative z-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {partner.stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-6 text-center shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full flex items-center justify-center">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-3xl font-black text-gray-900 mb-2">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  </div>
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Section Histoire Premium */}
        <section className="py-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
              Notre <span className="bg-gradient-to-r from-amber-500 to-amber-600 bg-clip-text text-transparent">Histoire</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Un voyage à travers le temps et les traditions africaines
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="prose prose-lg prose-gray">
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  {partner.story}
                </p>
                
                <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-8 border border-amber-100">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                    <div className="w-8 h-8 bg-amber-500 rounded-lg flex items-center justify-center">
                      <Award className="w-5 h-5 text-white" />
                    </div>
                    Notre Mission
                  </h3>
                  <p className="text-gray-700 italic">{partner.mission}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {partner.values.map((value, index) => (
                    <div key={index} className="bg-white rounded-xl p-4 shadow-lg border border-gray-100 text-center">
                      <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-br from-amber-400 to-amber-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-xl">{value[0]}</span>
                      </div>
                      <p className="font-semibold text-gray-800 text-sm">{value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <GalleryCarousel images={partner.gallery} />
            </div>
          </div>
        </section>

        {/* Section Certifications & Awards */}
        <section className="py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Certifications */}
            <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                  <Award className="w-6 h-6 text-white" />
                </div>
                Certifications
              </h3>
              <div className="space-y-4">
                {partner.certifications.map((cert, index) => (
                  <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                    <span className="text-2xl">{cert.icon}</span>
                    <span className="font-medium text-gray-800">{cert.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Prix & Récompenses */}
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl p-8 border border-amber-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center">
                  <Star className="w-6 h-6 text-white" />
                </div>
                Prix & Récompenses
              </h3>
              <div className="space-y-4">
                {partner.awards.map((award, index) => (
                  <div key={index} className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm">
                    <div className="w-12 h-12 bg-gradient-to-r from-amber-400 to-amber-500 rounded-full flex items-center justify-center text-white font-bold">
                      {award.year}
                    </div>
                    <span className="font-medium text-gray-800">{award.title}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Section Produits Premium */}
        <section className="py-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
              Nos <span className="bg-gradient-to-r from-amber-500 to-amber-600 bg-clip-text text-transparent">Créations</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Découvrez notre collection exclusive de textiles authentiques
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {partner.products.map((product, index) => (
              <div
                key={product.id}
                className="opacity-0 animate-[fadeInUp_0.6s_ease-out_forwards]"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <ProductCard product={product} index={index} />
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button className="group px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-full font-semibold text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
              <span className="flex items-center gap-2">
                Voir toute la collection
                <ExternalLink className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
          </div>
        </section>

        {/* Section Témoignages */}
        <section className="py-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
              Ce qu'ils <span className="bg-gradient-to-r from-amber-500 to-amber-600 bg-clip-text text-transparent">disent</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              La satisfaction de nos clients est notre plus belle récompense
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {partner.testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="opacity-0 animate-[fadeInUp_0.6s_ease-out_forwards]"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <TestimonialCard testimonial={testimonial} />
              </div>
            ))}
          </div>
        </section>

        {/* Section Process de Création */}
        <section className="py-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
              Notre <span className="bg-gradient-to-r from-amber-500 to-amber-600 bg-clip-text text-transparent">Processus</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              De la tradition à vos mains, chaque étape compte
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Sélection des matières', desc: 'Choix minutieux des fibres naturelles', icon: '🌱' },
              { step: '02', title: 'Tissage artisanal', desc: 'Travail à la main par nos maîtres artisans', icon: '🧵' },
              { step: '03', title: 'Contrôle qualité', desc: 'Vérification de chaque détail', icon: '🔍' },
              { step: '04', title: 'Expédition soignée', desc: 'Emballage premium et livraison sécurisée', icon: '📦' },
            ].map((process, index) => (
              <div
                key={index}
                className="relative text-center group"
              >
                <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl flex items-center justify-center text-white font-black text-2xl shadow-xl group-hover:scale-110 transition-transform duration-300">
                  {process.step}
                </div>
                
                <div className="text-4xl mb-4">{process.icon}</div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-3">{process.title}</h3>
                <p className="text-gray-600">{process.desc}</p>
                
                {index < 3 && (
                  <div className="hidden md:block absolute top-10 -right-4 w-8 h-0.5 bg-gradient-to-r from-amber-300 to-amber-500" />
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Section Contact Premium */}
        <section className="py-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
              Restons <span className="bg-gradient-to-r from-amber-500 to-amber-600 bg-clip-text text-transparent">Connectés</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Une question ? Un projet ? Nous sommes là pour vous accompagner
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Informations de contact */}
            <div className="lg:col-span-2 bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                Nos Coordonnées
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { icon: Phone, label: 'Téléphone', value: partner.contact.phone, color: 'from-blue-500 to-blue-600' },
                  { icon: Mail, label: 'Email', value: partner.contact.email, color: 'from-green-500 to-green-600' },
                  { icon: Globe, label: 'Site web', value: partner.contact.website, color: 'from-purple-500 to-purple-600' },
                  { icon: MapPin, label: 'Adresse', value: partner.contact.address, color: 'from-red-500 to-red-600' },
                ].map((contact, index) => {
                  const Icon = contact.icon;
                  return (
                    <div
                      key={index}
                      className="flex items-start gap-4 p-6 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors group cursor-pointer"
                    >
                      <div className={`p-3 bg-gradient-to-br ${contact.color} rounded-xl text-white group-hover:scale-110 transition-transform`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500 mb-1">{contact.label}</p>
                        <p className="font-semibold text-gray-900">{contact.value}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-8 p-6 bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl border border-amber-100">
                <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-amber-600" />
                  Horaires d'ouverture
                </h4>
                <p className="text-gray-700">{partner.contact.workingHours}</p>
              </div>
            </div>

            {/* Réseaux sociaux */}
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-3xl p-8 border border-pink-100">
                <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">
                  Suivez-nous
                </h3>
                
                <div className="space-y-4">
                  <a
                    href={`https://instagram.com/${partner.contact.social.instagram.replace('@', '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all group border border-gray-100"
                  >
                    <div className="w-14 h-14 bg-gradient-to-br from-pink-500 via-red-500 to-yellow-500 rounded-2xl flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                      <Instagram className="w-7 h-7" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900">{partner.contact.social.instagram}</p>
                      <p className="text-sm text-gray-500">{partner.contact.social.followers} abonnés</p>
                    </div>
                    <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-gray-600" />
                  </a>

                  <a
                    href={`https://facebook.com/${partner.contact.social.facebook}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all group border border-gray-100"
                  >
                    <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-blue-500 rounded-2xl flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                      <Facebook className="w-7 h-7" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900">{partner.contact.social.facebook}</p>
                      <p className="text-sm text-gray-500">Page officielle</p>
                    </div>
                    <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-gray-600" />
                  </a>
                </div>
              </div>

              {/* Newsletter */}
              <div className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-3xl p-8 text-white">
                <h3 className="text-xl font-bold mb-4 text-center">Newsletter</h3>
                <p className="text-amber-100 text-sm mb-6 text-center">
                  Restez informé de nos nouvelles créations et événements exclusifs
                </p>
                <div className="space-y-4">
                  <input
                    type="email"
                    placeholder="Votre email"
                    className="w-full p-4 rounded-xl bg-white/20 backdrop-blur-sm border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
                  />
                  <button className="w-full p-4 bg-white text-amber-600 rounded-xl font-semibold hover:bg-amber-50 transition-colors">
                    S'abonner
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section CTA Final */}
        <section className="py-20">
          <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 rounded-3xl p-12 text-center text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-orange-500/10" />
            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-black mb-6">
                Prêt à découvrir l'<span className="text-amber-400">excellence</span> ?
              </h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Rejoignez des milliers de clients satisfaits et découvrez la beauté authentique de l'artisanat africain
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button className="px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-full font-semibold text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
                  Découvrir la boutique
                </button>
                <button className="px-8 py-4 border-2 border-white/30 text-white rounded-full font-semibold text-lg backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
                  Nous contacter
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Footer Premium */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl flex items-center justify-center">
              <img
                src={partner.logo}
                alt={partner.name}
                className="w-12 h-12 object-contain filter brightness-0 invert"
              />
            </div>
            <h3 className="text-2xl font-bold mb-2">{partner.name}</h3>
            <p className="text-gray-400 mb-6">{partner.tagline}</p>
            <div className="flex items-center justify-center gap-6 text-sm text-gray-400">
              <span>© 2024 {partner.name}</span>
              <span>•</span>
              <span>Tous droits réservés</span>
              <span>•</span>
              <span>Fait avec ❤️ en Afrique</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Styles pour les animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default BrandPartnerPage;