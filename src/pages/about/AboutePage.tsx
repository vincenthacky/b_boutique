import React, { useState, useRef, useEffect, memo } from 'react';
import { 
  ArrowLeft, Heart, Share2, Award, Users, Globe, MapPin, Phone, Mail,
  Clock, Truck, CreditCard, Gift, Star, Shield, Zap, TrendingUp,
  Target, Eye, Compass, Lightbulb, Handshake, Leaf, Crown, Calendar,
  PlayCircle, PauseCircle, ChevronLeft, ChevronRight, ExternalLink,
  MessageCircle, Facebook, Instagram, Twitter, Youtube, Check,
  Package, RefreshCw, HeadphonesIcon, Camera, PenTool, Palette
} from 'lucide-react';
import { motion } from 'framer-motion';

// Données de la boutique
const boutique = {
  name: 'Be Boutique Côte d\'Ivoire',
  tagline: 'L\'Afrique créative à portée de main',
  website: 'www.beboutiques.com',
  founded: '2019',
  slogan: 'Consommez autrement. Consommez local. Consommez Be !',
  
  identity: {
    vision: 'Chez Be Boutique, nous croyons en une Afrique créative, fière et prospère. Nous mettons à l\'honneur la richesse des savoir-faire africains à travers une sélection exclusive de produits conçus par des créateurs et artisans du continent.',
    mission: 'Be Boutique propose une vitrine nouvelle génération et équitable. Nous collaborons avec des créateurs et artisans passionnés et engagés pour un écosystème durable de marques africaines fortes, visibles et attractives.',
    engagement: 'Be Boutique, C\'est un mouvement engagé pour une consommation locale et fière. En valorisant la création africaine dans toute sa diversité, nous contribuons à bâtir une économie africaine inclusive et rayonnante durablement.'
  },

  stats: [
    { label: 'Années d\'expérience', value: '6', icon: Calendar, suffix: '+' },
    { label: 'Artisans partenaires', value: '200', icon: Users, suffix: '+' },
    { label: 'Produits uniques', value: '1500', icon: Package, suffix: '+' },
    { label: 'Clients satisfaits', value: '15000', icon: Heart, suffix: '+' },
    { label: 'Pays couverts', value: '12', icon: Globe, suffix: '' },
    { label: 'Boutiques physiques', value: '3', icon: MapPin, suffix: '' }
  ],

  services: [
    {
      title: 'Programme de fidélité',
      description: 'Gagnez des points à chaque achat et profitez d\'avantages exclusifs',
      icon: Crown,
      features: ['Points de fidélité', 'Réductions exclusives', 'Accès prioritaire', 'Cadeaux personnalisés'],
      color: 'from-purple-500 to-purple-600'
    },
    {
      title: 'Carte cadeau Be',
      description: 'Offrez le choix avec nos cartes cadeaux personnalisables',
      icon: Gift,
      features: ['Montants flexibles', 'Design personnalisé', 'Validité 2 ans', 'Utilisation en ligne et boutique'],
      color: 'from-pink-500 to-pink-600'
    },
    {
      title: 'Livraison rapide',
      description: 'Livraison rapide dans toute la Côte d\'Ivoire et l\'Afrique de l\'Ouest',
      icon: Truck,
      features: ['24-48h Abidjan', '2-5 jours CI', 'Suivi en temps réel', 'Emballage soigné'],
      color: 'from-blue-500 to-blue-600'
    },
    {
      title: 'Service client 7j/7',
      description: 'Une équipe dédiée pour vous accompagner tous les jours',
      icon: HeadphonesIcon,
      features: ['Support multicanal', 'Conseillers experts', 'Réponse rapide', 'Satisfaction garantie'],
      color: 'from-green-500 to-green-600'
    }
  ],

  values: [
    {
      title: 'Authenticité',
      description: 'Nous célébrons l\'authenticité des créations africaines',
      icon: Shield,
      details: 'Chaque produit est sélectionné pour son caractère authentique et sa qualité exceptionnelle.'
    },
    {
      title: 'Équité',
      description: 'Commerce équitable et partenariats durables',
      icon: Handshake,
      details: 'Nous garantissons une rémunération juste à nos artisans partenaires et des conditions de travail éthiques.'
    },
    {
      title: 'Durabilité',
      description: 'Engagement pour un avenir durable',
      icon: Leaf,
      details: 'Nos pratiques respectent l\'environnement et soutiennent le développement durable.'
    },
    {
      title: 'Excellence',
      description: 'La qualité au cœur de chaque création',
      icon: Award,
      details: 'Nous sélectionnons uniquement les créateurs les plus talentueux et les produits de haute qualité.'
    }
  ],

  team: [
    {
      name: 'Aminata Koné',
      role: 'Fondatrice & CEO',
      avatar: 'https://picsum.photos/300/300?random=20',
      bio: 'Passionnée par la promotion de l\'artisanat africain, Aminata a créé Be Boutique pour valoriser les créateurs du continent.',
      expertise: ['Strategy', 'Partenariats', 'Vision']
    },
    {
      name: 'Mamadou Traoré',
      role: 'Directeur Artistique',
      avatar: 'https://picsum.photos/300/300?random=21',
      bio: 'Designer expérimenté, Mamadou supervise la sélection des créateurs et la curation de nos collections.',
      expertise: ['Design', 'Curation', 'Créativité']
    },
    {
      name: 'Fatou Diallo',
      role: 'Responsable Partenariats',
      avatar: 'https://picsum.photos/300/300?random=22',
      bio: 'Fatou développe notre réseau d\'artisans et maintient nos relations avec les créateurs partenaires.',
      expertise: ['Relations', 'Développement', 'Communication']
    },
    {
      name: 'Ibrahim Ouattara',
      role: 'Directeur Technique',
      avatar: 'https://picsum.photos/300/300?random=23',
      bio: 'Expert en e-commerce, Ibrahim assure le bon fonctionnement de notre plateforme digitale.',
      expertise: ['Technologie', 'Innovation', 'Digital']
    }
  ],

  process: [
    {
      step: '01',
      title: 'Sélection rigoureuse',
      description: 'Nous parcourons l\'Afrique à la recherche des meilleurs créateurs',
      icon: Eye,
      details: 'Notre équipe visite les ateliers, rencontre les artisans et évalue la qualité des créations selon nos standards stricts.'
    },
    {
      step: '02',
      title: 'Partenariat équitable',
      description: 'Établissement de partenariats durables et équitables',
      icon: Handshake,
      details: 'Nous négocions des conditions justes et mettons en place un accompagnement personnalisé pour chaque créateur.'
    },
    {
      step: '03',
      title: 'Curation experte',
      description: 'Sélection et mise en valeur des meilleures pièces',
      icon: Palette,
      details: 'Nos experts sélectionnent les produits qui correspondent à notre vision et aux attentes de nos clients.'
    },
    {
      step: '04',
      title: 'Expérience premium',
      description: 'Livraison et service client d\'excellence',
      icon: Crown,
      details: 'Emballage soigné, livraison rapide et accompagnement personnalisé pour une expérience inoubliable.'
    }
  ],

  categories: [
    {
      name: 'Mode & Accessoires',
      count: 450,
      image: 'https://picsum.photos/400/300?random=30',
      description: 'Vêtements, bijoux et accessoires créés par des designers africains'
    },
    {
      name: 'Art & Décoration',
      count: 320,
      image: 'https://picsum.photos/400/300?random=31',
      description: 'Œuvres d\'art, sculptures et objets décoratifs authentiques'
    },
    {
      name: 'Textiles & Maroquinerie',
      count: 280,
      image: 'https://picsum.photos/400/300?random=32',
      description: 'Tissus traditionnels, sacs et articles en cuir artisanaux'
    },
    {
      name: 'Cosmétiques Naturels',
      count: 150,
      image: 'https://picsum.photos/400/300?random=33',
      description: 'Produits de beauté à base d\'ingrédients africains naturels'
    },
    {
      name: 'Épicerie Fine',
      count: 200,
      image: 'https://picsum.photos/400/300?random=34',
      description: 'Épices, thés et produits gastronomiques du continent'
    },
    {
      name: 'Mobilier & Objets',
      count: 100,
      image: 'https://picsum.photos/400/300?random=35',
      description: 'Meubles et objets du quotidien créés par nos artisans'
    }
  ],

  locations: [
    {
      name: 'Be Boutique Plateau',
      address: 'Avenue Chardy, Plateau, Abidjan',
      hours: 'Lun-Sam: 9h-19h | Dim: 10h-17h',
      phone: '+225 27 20 25 50 60',
      image: 'https://picsum.photos/500/300?random=40',
      features: ['Showroom', 'Espace événements', 'Atelier créatif']
    },
    {
      name: 'Be Boutique Cocody',
      address: 'Boulevard Lagunaire, Cocody, Abidjan',
      hours: 'Lun-Sam: 10h-20h | Dim: 12h-18h',
      phone: '+225 27 22 48 95 75',
      image: 'https://picsum.photos/500/300?random=41',
      features: ['Boutique premium', 'Personal shopping', 'Café artisanal']
    },
    {
      name: 'Be Boutique Grand-Bassam',
      address: 'Quartier Colonial, Grand-Bassam',
      hours: 'Mer-Dim: 10h-18h',
      phone: '+225 27 21 30 15 80',
      image: 'https://picsum.photos/500/300?random=42',
      features: ['Boutique historique', 'Exposition permanente', 'Ateliers découverte']
    }
  ],

  testimonials: [
    {
      name: 'Sophie Kouassi',
      role: 'Cliente VIP',
      avatar: 'https://picsum.photos/150/150?random=50',
      content: 'Be Boutique a révolutionné ma façon de consommer. Je trouve des pièces uniques qui racontent l\'histoire de notre continent.',
      rating: 5,
      location: 'Abidjan'
    },
    {
      name: 'David Mensah',
      role: 'Collectionneur',
      avatar: 'https://picsum.photos/150/150?random=51',
      content: 'La qualité des produits et l\'authenticité des créations font de Be Boutique ma référence absolue pour l\'art africain.',
      rating: 5,
      location: 'Accra'
    },
    {
      name: 'Marie Kaba',
      role: 'Influenceuse Mode',
      avatar: 'https://picsum.photos/150/150?random=52',
      content: 'Chaque achat chez Be Boutique est une découverte. L\'équipe connaît parfaitement ses produits et ses créateurs.',
      rating: 5,
      location: 'Dakar'
    }
  ],

  partnerships: [
    { name: 'Institut Français', logo: 'https://picsum.photos/200/100?random=60' },
    { name: 'UNESCO', logo: 'https://picsum.photos/200/100?random=61' },
    { name: 'Chambre de Commerce CI', logo: 'https://picsum.photos/200/100?random=62' },
    { name: 'Orange Money', logo: 'https://picsum.photos/200/100?random=63' },
    { name: 'DHL Express', logo: 'https://picsum.photos/200/100?random=64' },
    { name: 'Visa', logo: 'https://picsum.photos/200/100?random=65' }
  ],

  contact: {
    phone: '+225 27 20 25 50 60',
    email: 'hello@beboutiques.com',
    website: 'www.beboutiques.com',
    address: 'Avenue Chardy, Plateau, Abidjan, Côte d\'Ivoire',
    workingHours: 'Lun-Sam: 9h-19h | Dim: 10h-17h',
    social: {
      instagram: '@beboutique_ci',
      facebook: 'BeBoutiqueCI',
      youtube: 'BeBoutique',
      tiktok: '@beboutique_ci'
    }
  }
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

const AnimatedCounter = memo(({ value, suffix = '', duration = 2000 }) => {
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

  return <span ref={ref}>{count.toLocaleString('fr-FR')}{suffix}</span>;
});

const SectionTitle = memo(({ title, subtitle }) => (
  <div className="text-center mb-16">
    <motion.h2
      className="text-4xl md:text-5xl font-black text-gray-900 mb-4"
      initial={{ opacity: 0, y: -20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">
        {title}
      </span>
    </motion.h2>
    <motion.p
      className="text-xl text-gray-600 max-w-2xl mx-auto"
      initial={{ opacity: 0, y: -20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      {subtitle}
    </motion.p>
  </div>
));

const ServiceCard = memo(({ service, index }) => {
  const Icon = service.icon;
  
  return (
    <motion.div
      className="group relative"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
    >
      <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-gray-100 overflow-hidden">
        <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${service.color} opacity-10 rounded-full -translate-y-8 translate-x-8 group-hover:scale-150 transition-transform duration-700`} />
        
        <div className="relative z-10">
          <div className={`w-16 h-16 bg-gradient-to-br ${service.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
            <Icon className="w-8 h-8 text-white" />
          </div>
          
          <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-orange-600 transition-colors">
            {service.title}
          </h3>
          
          <p className="text-gray-600 mb-6 leading-relaxed">
            {service.description}
          </p>
          
          <div className="space-y-2">
            {service.features.map((feature, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <div className="w-2 h-2 bg-orange-500 rounded-full" />
                <span className="text-sm text-gray-700">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
});

const ValueCard = memo(({ value, index }) => {
  const Icon = value.icon;
  return (
    <motion.div
      className="group text-center"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
    >
      <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-gray-100">
        <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-orange-500 to-amber-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
          <Icon className="w-10 h-10 text-white" />
        </div>
        
        <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-orange-600 transition-colors">
          {value.title}
        </h3>
        
        <p className="text-gray-600 mb-4 leading-relaxed">
          {value.description}
        </p>
        
        <p className="text-sm text-gray-500 italic">
          {value.details}
        </p>
      </div>
    </motion.div>
  );
});

const ProcessStep = memo(({ step, index }) => {
  const Icon = step.icon;
  return (
    <motion.div
      className="relative text-center group"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
    >
      <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 group-hover:-translate-y-2">
        <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-orange-500 to-amber-500 rounded-2xl flex items-center justify-center text-white font-black text-2xl shadow-xl group-hover:scale-110 transition-transform duration-300">
          {step.step}
        </div>
        
        <div className="mb-4">
          <Icon className="w-8 h-8 mx-auto text-orange-500 mb-3" />
        </div>
        
        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-orange-600 transition-colors">
          {step.title}
        </h3>
        
        <p className="text-gray-600 mb-4">
          {step.description}
        </p>
        
        <p className="text-sm text-gray-500 italic">
          {step.details}
        </p>
      </div>
      
      {index < boutique.process.length - 1 && (
        <div className="hidden lg:block absolute top-1/2 -right-16 transform -translate-y-1/2 w-32 h-1 bg-gradient-to-r from-orange-300 to-amber-300" />
      )}
    </motion.div>
  );
});

const CategoryCard = memo(({ category, index }) => (
  <motion.div
    className="group cursor-pointer"
    initial={{ opacity: 0, scale: 0.9 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
  >
    <div className="bg-white rounded-3xl shadow-lg hover:shadow-2xl overflow-hidden transition-all duration-500 transform hover:-translate-y-2 border border-gray-100">
      <div className="relative h-48 overflow-hidden">
        <img
          src={category.image}
          alt={category.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute top-4 right-4 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold">
          {category.count} produits
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-orange-600 transition-colors">
          {category.name}
        </h3>
        <p className="text-gray-600">
          {category.description}
        </p>
      </div>
    </div>
  </motion.div>
));

const TeamCard = memo(({ member, index }) => (
  <motion.div
    className="group"
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay: index * 0.15 }}
  >
    <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 overflow-hidden">
      <div className="relative mb-6">
        <div className="w-32 h-32 mx-auto rounded-full overflow-hidden ring-4 ring-orange-100 group-hover:ring-orange-300 transition-all">
          <img
            src={member.avatar}
            alt={member.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        </div>
        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
          <div className="bg-gradient-to-r from-orange-500 to-amber-500 rounded-full px-4 py-1">
            <span className="text-white text-sm font-medium">{member.role}</span>
          </div>
        </div>
      </div>
      
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
        <p className="text-gray-600 text-sm leading-relaxed">{member.bio}</p>
      </div>
      
      <div className="flex flex-wrap justify-center gap-2">
        {member.expertise.map((skill, idx) => (
          <span
            key={idx}
            className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-xs font-medium"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  </motion.div>
));

const LocationCard = memo(({ location, index }) => (
  <motion.div
    className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-500 group"
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay: index * 0.15 }}
  >
    <div className="relative h-48 overflow-hidden">
      <img
        src={location.image}
        alt={location.name}
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      <div className="absolute bottom-4 left-4 text-white">
        <h3 className="text-xl font-bold mb-1">{location.name}</h3>
      </div>
    </div>
    
    <div className="p-6">
      <div className="space-y-4">
        <div className="flex items-start gap-3">
          <MapPin className="w-5 h-5 text-orange-500 mt-1 flex-shrink-0" />
          <p className="text-gray-700">{location.address}</p>
        </div>
        
        <div className="flex items-start gap-3">
          <Clock className="w-5 h-5 text-orange-500 mt-1 flex-shrink-0" />
          <p className="text-gray-700">{location.hours}</p>
        </div>
        
        <div className="flex items-start gap-3">
          <Phone className="w-5 h-5 text-orange-500 mt-1 flex-shrink-0" />
          <p className="text-gray-700">{location.phone}</p>
        </div>
      </div>
      
      <div className="mt-6 pt-4 border-t border-gray-100">
        <div className="flex flex-wrap gap-2">
          {location.features.map((feature, idx) => (
            <span
              key={idx}
              className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-xs font-medium"
            >
              {feature}
            </span>
          ))}
        </div>
      </div>
    </div>
  </motion.div>
));

const TestimonialCard = memo(({ testimonial, index }) => (
  <motion.div
    className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100"
    initial={{ opacity: 0, scale: 0.95 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay: index * 0.1 }}
  >
    <div className="flex items-center gap-4 mb-6">
      <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
        <img src={testimonial.avatar} alt={testimonial.name} className="w-full h-full object-cover" />
      </div>
      <div>
        <h3 className="text-lg font-bold text-gray-900">{testimonial.name}</h3>
        <p className="text-sm text-gray-500">{testimonial.role} | {testimonial.location}</p>
      </div>
    </div>
    <div className="flex mb-4">
      {[...Array(testimonial.rating)].map((_, i) => (
        <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
      ))}
    </div>
    <p className="text-gray-700 italic leading-relaxed">"{testimonial.content}"</p>
  </motion.div>
));

const AboutPage = () => {
  const [activeTab, setActiveTab] = useState('vision');

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50/30 to-orange-50">
      {/* Hero Section Ultra Premium */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-600 via-amber-500 to-yellow-400" />
          <div className="absolute inset-0 bg-black/50" />
          <div className="absolute inset-0 opacity-20">
            {[...Array(50)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-white rounded-full animate-pulse"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${i * 0.1}s`,
                  animationDuration: `${2 + Math.random() * 3}s`
                }}
              />
            ))}
          </div>
        </div>

        <button className="absolute top-8 left-8 flex items-center gap-3 text-white hover:text-orange-200 transition-all duration-300 group z-50">
          <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center group-hover:bg-white/20 transition-all">
            <ArrowLeft className="w-6 h-6" />
          </div>
          <span className="font-medium hidden sm:block">Retour</span>
        </button>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center text-white">
          <div className="mb-8">
            <div className="w-32 h-32 mx-auto mb-8 bg-white/20 backdrop-blur-lg rounded-3xl p-6 shadow-2xl">
              <div className="w-full h-full bg-gradient-to-br from-orange-500 to-amber-500 rounded-2xl flex items-center justify-center">
                <span className="text-white text-4xl font-bold">Be</span>
              </div>
            </div>
            
            <h1 className="text-4xl md:text-7xl font-black mb-6 leading-tight">
              <span className="bg-gradient-to-r from-white via-orange-200 to-white bg-clip-text text-transparent">
                {boutique.name}
              </span>
            </h1>
            
            <p className="text-xl md:text-3xl text-orange-200 font-light mb-8">
              {boutique.tagline}
            </p>
            
            <div className="max-w-3xl mx-auto mb-12">
              <p className="text-lg md:text-xl text-white/90 leading-relaxed">
                {boutique.identity.vision}
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <a href="#locations" className="group px-10 py-5 bg-white text-orange-600 rounded-full font-bold text-lg shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300">
              <span className="flex items-center gap-3">
                Découvrir nos boutiques
                <ExternalLink className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </span>
            </a>
            
            <a href="#team" className="group px-10 py-5 border-2 border-white/30 text-white rounded-full font-bold text-lg backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
              <span className="flex items-center gap-3">
                Voir nos créateurs
                <Users className="w-6 h-6" />
              </span>
            </a>
          </div>
          
          <div className="mt-12 text-orange-200">
            <p className="text-lg font-medium">{boutique.slogan}</p>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white animate-bounce">
          <div className="w-8 h-12 rounded-full border-2 border-white/30 flex justify-center">
            <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </section>

      {/* Section Statistiques */}
      <section className="py-20 -mt-20 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {boutique.stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-3xl p-6 text-center shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 group"
                >
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-orange-500 to-amber-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-3xl font-black text-gray-900 mb-2">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  </div>
                  <p className="text-sm font-medium text-gray-600 leading-tight">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Identité avec onglets */}
        <section className="py-20">
          <SectionTitle
            title="Notre Identité"
            subtitle="Découvrez les valeurs et la mission qui nous animent au quotidien"
          />

          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {[
              { key: 'vision', label: 'Vision', icon: Eye },
              { key: 'mission', label: 'Mission', icon: Target },
              { key: 'engagement', label: 'Engagement', icon: Handshake }
            ].map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`flex items-center gap-3 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 ${
                    activeTab === tab.key
                      ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-xl'
                      : 'bg-white text-gray-700 hover:bg-orange-50 shadow-lg'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {tab.label}
                </button>
              );
            })}
          </div>

          <motion.div
            className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl border border-gray-100"
            key={activeTab} // Important pour re-déclencher l'animation
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="max-w-4xl mx-auto text-center">
              <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
                {boutique.identity[activeTab]}
              </p>
            </div>
          </motion.div>
        </section>

        {/* Section Services */}
        <section className="py-20">
          <SectionTitle
            title="Une Expérience Complète"
            subtitle="Pensée pour votre satisfaction et votre confiance"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {boutique.services.map((service, index) => (
              <ServiceCard key={index} service={service} index={index} />
            ))}
          </div>
        </section>

        {/* Section Valeurs */}
        <section className="py-20">
          <SectionTitle
            title="Nos Valeurs"
            subtitle="Les principes qui guident chacune de nos actions"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {boutique.values.map((value, index) => (
              <ValueCard key={index} value={value} index={index} />
            ))}
          </div>
        </section>

        {/* Section Notre Processus */}
        <section className="py-20">
          <SectionTitle
            title="Notre Processus"
            subtitle="De la découverte à la livraison, chaque étape est pensée pour l'excellence"
          />

          <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {boutique.process.map((step, index) => (
              <ProcessStep key={index} step={step} index={index} />
            ))}
          </div>
        </section>

        {/* Section Catégories */}
        <section className="py-20">
          <SectionTitle
            title="Nos Univers"
            subtitle="Découvrez la richesse et la diversité de nos collections"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {boutique.categories.map((category, index) => (
              <CategoryCard key={index} category={category} index={index} />
            ))}
          </div>
        </section>

        {/* Section L'équipe */}
        <section id="team" className="py-20">
          <SectionTitle
            title="Notre Équipe"
            subtitle="Les visages derrière la vision de Be Boutique"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {boutique.team.map((member, index) => (
              <TeamCard key={index} member={member} index={index} />
            ))}
          </div>
        </section>

        {/* Section Nos Boutiques */}
        <section id="locations" className="py-20">
          <SectionTitle
            title="Nos Boutiques"
            subtitle="Venez nous rendre visite et vivez l'expérience en personne"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {boutique.locations.map((location, index) => (
              <LocationCard key={index} location={location} index={index} />
            ))}
          </div>
        </section>

        {/* Section Témoignages */}
        <section className="py-20">
          <SectionTitle
            title="Ce que nos clients disent"
            subtitle="Leurs mots, notre fierté"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {boutique.testimonials.map((testimonial, index) => (
              <TestimonialCard key={index} testimonial={testimonial} index={index} />
            ))}
          </div>
        </section>

        {/* Section Partenaires */}
        <section className="py-20">
          <SectionTitle
            title="Nos Partenaires"
            subtitle="Ils nous font confiance et contribuent à notre succès"
          />
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl border border-gray-100 flex flex-wrap justify-center items-center gap-8 md:gap-16 grayscale opacity-80">
            {boutique.partnerships.map((partner, index) => (
              <div key={index} className="w-24 h-12 md:w-32 md:h-16 flex items-center justify-center">
                <img src={partner.logo} alt={partner.name} className="object-contain" />
              </div>
            ))}
          </div>
        </section>

        {/* Section Contact */}
        <section className="py-20">
          <SectionTitle
            title="Nous contacter"
            subtitle="Pour toute question ou collaboration, nous sommes à votre écoute"
          />
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl border border-gray-100 grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <h3 className="text-3xl font-bold text-gray-900 mb-4">Informations</h3>
              <div className="flex items-start gap-4">
                <div className="p-3 bg-orange-100 rounded-xl text-orange-600 flex-shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-bold text-gray-900">Adresse</p>
                  <p className="text-gray-700">{boutique.contact.address}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-3 bg-orange-100 rounded-xl text-orange-600 flex-shrink-0">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-bold text-gray-900">Téléphone</p>
                  <p className="text-gray-700">{boutique.contact.phone}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-3 bg-orange-100 rounded-xl text-orange-600 flex-shrink-0">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-bold text-gray-900">Email</p>
                  <p className="text-gray-700">{boutique.contact.email}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-3 bg-orange-100 rounded-xl text-orange-600 flex-shrink-0">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-bold text-gray-900">Horaires</p>
                  <p className="text-gray-700">{boutique.contact.workingHours}</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <h3 className="text-3xl font-bold text-gray-900 mb-4">Réseaux sociaux</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {Object.entries(boutique.contact.social).map(([platform, handle]) => {
                  const Icon = { instagram: Instagram, facebook: Facebook, youtube: Youtube, tiktok: PenTool }[platform];
                  const color = {
                    instagram: 'from-pink-500 to-purple-500',
                    facebook: 'from-blue-600 to-blue-400',
                    youtube: 'from-red-600 to-red-400',
                    tiktok: 'from-gray-900 to-gray-700',
                  }[platform];
                  return (
                    <a
                      key={platform}
                      href={`https://${platform}.com/${handle}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100 hover:border-orange-300 transition-all"
                    >
                      <div className={`p-2 bg-gradient-to-br ${color} rounded-lg text-white`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 capitalize">{platform}</p>
                        <p className="font-medium text-gray-900">{handle}</p>
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;