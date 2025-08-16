import React, { memo, useState, useEffect, Suspense } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { 
  Shield, 
  Lock, 
  Eye, 
  UserCheck, 
  Database, 
  Cookie, 
  Mail, 
  Phone,
  Calendar,
  CheckCircle,
  AlertCircle,
  ArrowRight,
  Sparkles,
  Globe,
  Settings,
  FileText,
  Heart,
  Star,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

// Composant SectionTitle similaire à votre HomePage
const SectionTitle = ({ preTitle, title, subtitle, icon }) => {
  const Icon = icon?.component;
  
  return (
    <motion.div 
      className="text-center mb-8 md:mb-12"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      {preTitle && (
        <div className="flex items-center justify-center gap-2 mb-4">
          {Icon && <Icon className="w-4 h-4 text-amber-500" />}
          <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">
            {preTitle}
          </span>
        </div>
      )}
      <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
        {title}
      </h2>
      {subtitle && (
        <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
};

// Composant SectionFallback pour le Suspense
const SectionFallback = () => (
  <div className="flex items-center justify-center py-12">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-500"></div>
  </div>
);

// Section Hero adaptée pour la politique de confidentialité
const PrivacyHeroSection = ({ scrollY }) => {
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0.3]);
  const heroScale = useTransform(scrollY, [0, 300], [1, 1.1]);
  
  return (
    <section className="relative h-[60vh] md:h-[70vh] flex items-center justify-center overflow-hidden">
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-amber-500 via-orange-600 to-amber-700"
        style={{ opacity: heroOpacity, scale: heroScale }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />
      <div className="absolute inset-0 bg-[url('/api/placeholder/1920/1080')] bg-cover bg-center opacity-20" />
      
      <motion.div 
        className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <motion.div
          className="mb-6"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Shield className="w-16 h-16 md:w-20 md:h-20 mx-auto text-amber-300" />
        </motion.div>
        
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 drop-shadow-lg">
          Politique de
          <span className="block bg-gradient-to-r from-amber-300 to-yellow-300 bg-clip-text text-transparent">
            Confidentialité
          </span>
        </h1>
        
        <p className="text-lg md:text-xl text-gray-200 mb-8 leading-relaxed max-w-2xl mx-auto drop-shadow">
          Votre vie privée est notre priorité. Découvrez comment nous protégeons vos données personnelles avec transparence et respect.
        </p>
        
        <motion.div
          className="text-sm text-amber-300 flex items-center justify-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <Calendar className="w-4 h-4" />
          <span>Dernière mise à jour : 16 Août 2025</span>
        </motion.div>
      </motion.div>
    </section>
  );
};

// Données des sections de politique
const policyData = [
  {
    id: 'data-collection',
    icon: Database,
    title: 'Collecte des Données',
    description: 'Informations que nous collectons et pourquoi',
    content: [
      'Données d\'identification personnelle (nom, prénom, email)',
      'Informations de livraison et de facturation', 
      'Historique des commandes et préférences d\'achat',
      'Données de navigation et cookies techniques',
      'Communications avec notre service client'
    ]
  },
  {
    id: 'data-usage',
    icon: Settings,
    title: 'Utilisation des Données',
    description: 'Comment nous utilisons vos informations',
    content: [
      'Traitement et suivi de vos commandes',
      'Amélioration de votre expérience d\'achat',
      'Communications marketing (avec votre consentement)',
      'Prévention de la fraude et sécurité',
      'Respect de nos obligations légales'
    ]
  },
  {
    id: 'data-sharing',
    icon: Globe,
    title: 'Partage des Données',
    description: 'Avec qui nous partageons vos informations',
    content: [
      'Prestataires de paiement sécurisés',
      'Transporteurs pour la livraison',
      'Partenaires marketing (données anonymisées)',
      'Autorités légales si requis par la loi',
      'Jamais de vente à des tiers'
    ]
  },
  {
    id: 'cookies',
    icon: Cookie,
    title: 'Cookies et Traceurs',
    description: 'Notre utilisation des cookies',
    content: [
      'Cookies essentiels au fonctionnement du site',
      'Cookies d\'analyse pour améliorer nos services',
      'Cookies de personnalisation',
      'Cookies publicitaires (avec consentement)',
      'Gestion de vos préférences cookies'
    ]
  },
  {
    id: 'user-rights',
    icon: UserCheck,
    title: 'Vos Droits',
    description: 'Contrôlez vos données personnelles',
    content: [
      'Droit d\'accès à vos données',
      'Droit de rectification et mise à jour',
      'Droit à l\'effacement ("droit à l\'oubli")',
      'Droit à la portabilité des données',
      'Droit d\'opposition au traitement'
    ]
  },
  {
    id: 'security',
    icon: Lock,
    title: 'Sécurité',
    description: 'Protection de vos informations',
    content: [
      'Chiffrement SSL/TLS pour toutes les transactions',
      'Stockage sécurisé dans des centres de données certifiés',
      'Accès limité aux données par nos équipes',
      'Audits de sécurité réguliers',
      'Notification en cas de violation de données'
    ]
  }
];

// Données des services de confidentialité
const privacyServicesData = [
  {
    id: 1,
    icon: Shield,
    title: 'Protection Maximale',
    description: 'Chiffrement de bout en bout'
  },
  {
    id: 2,
    icon: Eye,
    title: 'Transparence Totale',
    description: 'Accès à toutes vos données'
  },
  {
    id: 3,
    icon: UserCheck,
    title: 'Contrôle Utilisateur',
    description: 'Gérez vos préférences'
  },
  {
    id: 4,
    icon: Mail,
    title: 'Support Dédié',
    description: 'Équipe confidentialité'
  },
  {
    id: 5,
    icon: CheckCircle,
    title: 'Conformité RGPD',
    description: 'Respect des réglementations'
  }
];

const PrivacyPolicyPage = memo(() => {
  const [expandedSection, setExpandedSection] = useState(null);
  const { scrollY } = useScroll();

  const toggleSection = (sectionId) => {
    setExpandedSection(expandedSection === sectionId ? null : sectionId);
  };

  return (
    <div className="min-h-screen bg-white">
      <Suspense fallback={<SectionFallback />}>
        <PrivacyHeroSection scrollY={scrollY} />
      </Suspense>

      {/* Introduction Section */}
      <section className="py-12 md:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 md:p-8 mb-8">
              <div className="flex items-center justify-center mb-4">
                <Heart className="w-6 h-6 text-amber-500 mr-2" />
                <span className="text-amber-700 font-semibold">Engagement de Confidentialité</span>
              </div>
              <p className="text-gray-700 leading-relaxed">
                Chez notre boutique, nous respectons profondément votre vie privée. Cette politique de confidentialité 
                explique de manière transparente comment nous collectons, utilisons et protégeons vos informations 
                personnelles dans le cadre de votre expérience d'achat.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Sections Détaillées */}
      <section className="py-12 md:py-24 bg-gray-50 relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <SectionTitle
            preTitle="PROTECTION DES DONNÉES"
            title="Détails de Notre Politique"
            subtitle="Chaque aspect de la protection de vos données personnelles expliqué en détail"
            icon={{ component: Sparkles }}
          />

          <div className="space-y-4">
            {policyData.map((section, index) => {
              const Icon = section.icon;
              const isExpanded = expandedSection === section.id;
              
              return (
                <motion.div
                  key={section.id}
                  className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <motion.button
                    className="w-full p-6 text-left flex items-center justify-between group hover:bg-gray-50 transition-colors"
                    onClick={() => toggleSection(section.id)}
                    whileTap={{ scale: 0.99 }}
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-amber-100 rounded-xl">
                        <Icon className="w-6 h-6 text-amber-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 group-hover:text-amber-600 transition-colors">
                          {section.title}
                        </h3>
                        <p className="text-sm text-gray-600 mt-1">
                          {section.description}
                        </p>
                      </div>
                    </div>
                    <motion.div
                      animate={{ rotate: isExpanded ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    </motion.div>
                  </motion.button>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 border-t border-gray-100">
                          <div className="pt-4 space-y-3">
                            {section.content.map((item, itemIndex) => (
                              <motion.div
                                key={itemIndex}
                                className="flex items-start gap-3"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: itemIndex * 0.1 }}
                              >
                                <CheckCircle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                                <p className="text-gray-700 text-sm leading-relaxed">
                                  {item}
                                </p>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Services de Confidentialité */}
      <section className="py-12 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            preTitle="NOS ENGAGEMENTS"
            title="Services de Protection"
            subtitle="Des mesures concrètes pour garantir la sécurité de vos données"
            icon={{ component: Sparkles }}
          />

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ staggerChildren: 0.1 }}
          >
            {privacyServicesData.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.id}
                  className="group p-4 md:p-6 bg-gray-50 rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:border-amber-500 transition-all duration-300 cursor-pointer text-center"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="flex justify-center mb-4">
                    <Icon className="w-8 h-8 text-amber-500 group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <h3 className="font-bold text-gray-900 text-base mb-1">{service.title}</h3>
                  <p className="text-sm text-gray-600">{service.description}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Section Contact */}
      <section className="py-12 md:py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <SectionTitle
            preTitle="BESOIN D'AIDE ?"
            title="Contactez Notre Équipe"
            subtitle="Des questions sur notre politique de confidentialité ? Notre équipe dédiée est là pour vous"
            icon={{ component: Sparkles }}
          />

          <motion.div
            className="grid md:grid-cols-2 gap-6 mb-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300"
              whileHover={{ y: -5 }}
            >
              <Mail className="w-8 h-8 text-amber-500 mx-auto mb-4" />
              <h3 className="font-bold text-gray-900 mb-2">Email</h3>
              <p className="text-gray-600 text-sm mb-3">
                Contactez notre délégué à la protection des données
              </p>
              <a 
                href="mailto:privacy@votreboutique.com"
                className="text-amber-600 font-semibold hover:text-amber-700 transition-colors"
              >
                beboutique225@gmail.com
              </a>
            </motion.div>

            <motion.div
              className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300"
              whileHover={{ y: -5 }}
            >
              <Phone className="w-8 h-8 text-amber-500 mx-auto mb-4" />
              <h3 className="font-bold text-gray-900 mb-2">Téléphone</h3>
              <p className="text-gray-600 text-sm mb-3">
                Ligne directe confidentialité
              </p>
              <a 
                href="tel:+33123456789"
                className="text-amber-600 font-semibold hover:text-amber-700 transition-colors"
              >
                +225 07 99 97 76 46 
              </a>
            </motion.div>
          </motion.div>

          <motion.div
            className="bg-white rounded-2xl p-6 md:p-8 shadow-lg border border-gray-100"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <AlertCircle className="w-8 h-8 text-blue-500 mx-auto mb-4" />
            <h3 className="font-bold text-gray-900 mb-3">Exercez Vos Droits</h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Vous pouvez à tout moment exercer vos droits concernant vos données personnelles. 
              Notre équipe traitera votre demande dans les meilleurs délais, conformément au RGPD.
            </p>
            <motion.button
              className="group px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-full font-bold text-base shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 mx-auto"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <FileText className="w-4 h-4" />
              <span>Faire une demande</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
});

PrivacyPolicyPage.displayName = 'PrivacyPolicyPage';
export default PrivacyPolicyPage;