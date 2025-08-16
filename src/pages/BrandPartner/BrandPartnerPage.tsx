import React, { memo, useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { 
  Sparkles, 
  ArrowRight, 
  Crown, 
  Heart, 
  Leaf, 
  Award,
  Star,
  Check,
  ShoppingBag,
  Users,
  Globe,
  Shield
} from 'lucide-react';

// Import des images - remplacez par vos vrais chemins
//import bannerImage from '@/assets/femme-rastafarienne.jpg';
import beLogo from '@/assets/Logo_orange.png';
import brandEndImage from '@/assets/Logo_orange.png';
import collectionsSignatureImage from '@/assets/collections-signature-be.jpg';

// Images des produits huiles
import cocoHuile from '@/assets/etiquettes-huiles-coco.png';
import cocoVanilleHuile from '@/assets/etiquettes-huiles-coco-vanille.png';
import cocoAmandeHuile from '@/assets/etiquettes-huiles-coco-amande.png';
import cocoCarotteHuile from '@/assets/etiquettes-huiles-coco-carotte.png';
import cocoNoisetteHuile from '@/assets/etiquettes-huiles-coco-noisette.png';

// Images des produits chantilly
import kariteChantilly from '@/assets/etiquettes-chantilly-karite.png';
import cocoVanilleChantilly from '@/assets/etiquettes-chantilly-coco-vanille.png';
import cocoAmandeChantilly from '@/assets/etiquettes-chantilly-coco-amande.png';
import cocoCarotteChantilly from '@/assets/etiquettes-chantilly-coco-carotte.png';
import cocoNoisetteChantilly from '@/assets/etiquettes-chantilly-coco-noisette.png';
import amandeChantilly from '@/assets/etiquettes-chantilly-amande.png';
import carotteChantilly from '@/assets/etiquettes-chantilly-carotte.png';
import noisetteChantilly from '@/assets/etiquettes-chantilly-noisette.png';
import calendulaChantilly from '@/assets/etiquettes-chantilly-calendula.png';









// Données des collections d'huiles
const huilesData = [
  {
    id: 'coco',
    name: 'Coco',
    description: 'L\'essentiel pur, adoucissant et hydratant',
    image: cocoHuile,
    benefits: ['Hydratant', 'Adoucissant', 'Pur'],
    color: 'from-green-400 to-green-600'
  },
  {
    id: 'coco-vanille',
    name: 'Coco-Vanille',
    description: 'Douceur sucrée et parfum délicat pour une peau soyeuse',
    image: cocoVanilleHuile,
    benefits: ['Parfum délicat', 'Peau soyeuse', 'Douceur'],
    color: 'from-yellow-400 to-orange-500'
  },
  {
    id: 'coco-amande',
    name: 'Coco-Amande',
    description: 'Nutrition intense et confort absolu',
    image: cocoAmandeHuile,
    benefits: ['Nutrition intense', 'Confort', 'Réparateur'],
    color: 'from-amber-400 to-orange-600'
  },
  {
    id: 'coco-carotte',
    name: 'Coco-Carotte',
    description: 'Éclat naturel et bonne mine assurée',
    image: cocoCarotteHuile,
    benefits: ['Éclat naturel', 'Bonne mine', 'Vitamine C'],
    color: 'from-orange-400 to-red-500'
  },
  {
    id: 'coco-noisette',
    name: 'Coco-Noisette',
    description: 'Protection et souplesse avec une note gourmande',
    image: cocoNoisetteHuile,
    benefits: ['Protection', 'Souplesse', 'Gourmand'],
    color: 'from-yellow-600 to-amber-700'
  }
];

// Données des collections chantilly
const chantillyData = [
  {
    id: 'karite',
    name: 'Karité',
    description: 'Le classique nourrissant et réparateur',
    image: kariteChantilly,
    benefits: ['Nourrissant', 'Réparateur', 'Classique'],
    color: 'from-yellow-400 to-amber-500'
  },
  {
    id: 'coco-vanille-c',
    name: 'Coco-Vanille',
    description: 'Exotisme et douceur gourmande',
    image: cocoVanilleChantilly,
    benefits: ['Exotique', 'Gourmand', 'Douceur'],
    color: 'from-pink-400 to-rose-500'
  },
  {
    id: 'coco-amande-c',
    name: 'Coco-Amande',
    description: 'Confort riche et velouté',
    image: cocoAmandeChantilly,
    benefits: ['Riche', 'Velouté', 'Confort'],
    color: 'from-amber-400 to-orange-600'
  },
  {
    id: 'coco-carotte-c',
    name: 'Coco-Carotte',
    description: 'Coup d\'éclat et bonne mine',
    image: cocoCarotteChantilly,
    benefits: ['Éclat', 'Bonne mine', 'Vitaminé'],
    color: 'from-orange-400 to-red-500'
  },
  {
    id: 'coco-noisette-c',
    name: 'Coco-Noisette',
    description: 'Protection et note croquante',
    image: cocoNoisetteChantilly,
    benefits: ['Protection', 'Croquant', 'Réconfort'],
    color: 'from-yellow-600 to-amber-700'
  },
  {
    id: 'amande',
    name: 'Amande',
    description: 'Douceur soyeuse et apaisante',
    image: amandeChantilly,
    benefits: ['Soyeux', 'Apaisant', 'Douceur'],
    color: 'from-amber-300 to-yellow-500'
  },
  {
    id: 'carotte',
    name: 'Carotte',
    description: 'Éclat lumineux et vitalité',
    image: carotteChantilly,
    benefits: ['Lumineux', 'Vitalité', 'Éclat'],
    color: 'from-orange-400 to-red-500'
  },
  {
    id: 'noisette',
    name: 'Noisette',
    description: 'Souplesse et délicate gourmandise',
    image: noisetteChantilly,
    benefits: ['Souplesse', 'Gourmand', 'Délicat'],
    color: 'from-yellow-600 to-amber-700'
  },
  {
    id: 'calendula',
    name: 'Calendula',
    description: 'Spécial soin de bébé hydratant, adoucissant et apaisant',
    image: calendulaChantilly,
    benefits: ['Bébé', 'Hydratant', 'Apaisant'],
    color: 'from-yellow-300 to-orange-400',
    special: true
  }
];

// Valeurs de la marque
const brandValues = [
  {
    icon: Leaf,
    title: '100% Naturel',
    description: 'Des ingrédients purs et authentiques issus de la nature africaine'
  },
  {
    icon: Heart,
    title: 'Savoir-faire Artisanal',
    description: 'Chaque produit est élaboré avec passion et expertise traditionnelle'
  },
  {
    icon: Crown,
    title: 'Luxe Accessible',
    description: 'L\'excellence à portée de tous, sans compromis sur la qualité'
  },
  {
    icon: Globe,
    title: 'Héritage Culturel',
    description: 'Une marque fière de ses racines et de la richesse africaine'
  }
];

const SectionTitle = ({ preTitle, title, subtitle, icon }) => {
  const Icon = icon?.component;
  return (
    <motion.div 
      className="text-center mb-8 md:mb-16"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      {preTitle && (
        <div className="flex items-center justify-center gap-2 mb-2">
          {Icon && <Icon className="w-4 h-4 text-amber-500" />}
          <span className="text-xs font-bold text-amber-500 uppercase tracking-wider">
            {preTitle}
          </span>
        </div>
      )}
      <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-3">
        {title}
      </h2>
      {subtitle && (
        <p className="text-sm md:text-base text-gray-600 max-w-2xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
};

const BrandPartnerPage = memo(() => {
  const { scrollY } = useScroll();
  const [activeCollection, setActiveCollection] = useState('huiles');
  
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0.3]);
  const heroScale = useTransform(scrollY, [0, 300], [1, 1.1]);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      {/* <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div
          className="absolute inset-0 z-0"
          style={{ scale: heroScale, opacity: heroOpacity }}
        >
          <img
            src={bannerImage}
            alt="Be Brand Hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        </motion.div>
        
        <div className="relative z-10 text-center text-white px-4 max-w-4xl">
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <img
              src={beLogo}
              alt="Be Logo"
              className="h-20 md:h-32 mx-auto mb-6 filter brightness-0 invert"
            />
          </motion.div>
          
          <motion.h1
            className="text-3xl md:text-6xl font-bold mb-6 leading-tight"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            L'Élégance Africaine
            <br />
            <span className="text-amber-400">Authentique</span>
          </motion.h1>
          
          <motion.p
            className="text-lg md:text-xl mb-8 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Be incarne l'élégance, la créativité et le savoir-faire africain, 
            en s'appuyant sur des matières authentiques et des inspirations culturelles profondes.
          </motion.p>
          
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <motion.button
              className="group px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-full font-bold text-lg shadow-2xl shadow-amber-500/25 flex items-center gap-3"
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
            >
              <ShoppingBag className="w-5 h-5" />
              <span>Découvrir nos produits</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </motion.button>
            
            <motion.button
              className="group px-8 py-4 backdrop-blur-md text-white border-2 border-amber-400/50 bg-white/10 rounded-full font-bold text-lg flex items-center gap-3"
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
            >
              <Heart className="w-5 h-5" />
              <span>Notre Histoire</span>
            </motion.button>
          </motion.div>
        </div>
      </section> */}
         {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gray-900 relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={brandEndImage}
            alt="Be Brand"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/70 to-gray-900/30" />
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
             <motion.h1
            className="text-3xl md:text-6xl font-bold mb-6 leading-tight text-white"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            L'Élégance Africaine
            <br />
            <span className="text-amber-400">Authentique</span>
          </motion.h1>
          
            <motion.p
            className="text-lg md:text-xl mb-8 max-w-3xl mx-auto leading-relaxed text-white"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Be incarne l'élégance, la créativité et le savoir-faire africain, 
            en s'appuyant sur des matières <span className="text-amber-400">authentiques</span> 
            et des inspirations culturelles profondes.
          </motion.p>

          
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <motion.button
              className="group px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-full font-bold text-lg shadow-2xl shadow-amber-500/25 flex items-center gap-3"
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
            >
              <ShoppingBag className="w-5 h-5" />
              <span>Découvrir nos produits</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </motion.button>
            
            <motion.button
              className="group px-8 py-4 backdrop-blur-md text-white border-2 border-amber-400/50 bg-white/10 rounded-full font-bold text-lg flex items-center gap-3"
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
            >
              <Heart className="w-5 h-5" />
              <span>Notre Histoire</span>
            </motion.button>
          </motion.div>
            
            {/* Statistics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 pt-16 border-t border-white/20">
              <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <div className="text-3xl md:text-4xl font-bold text-amber-400 mb-2">100%</div>
                <div className="text-gray-300 text-sm">Naturel</div>
              </motion.div>
              
              <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <div className="text-3xl md:text-4xl font-bold text-amber-400 mb-2">14+</div>
                <div className="text-gray-300 text-sm">Variétés</div>
              </motion.div>
              
              <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                <div className="text-3xl md:text-4xl font-bold text-amber-400 mb-2">5★</div>
                <div className="text-gray-300 text-sm">Qualité</div>
              </motion.div>
              
              <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
              >
                <div className="text-3xl md:text-4xl font-bold text-amber-400 mb-2">🇨🇮</div>
                <div className="text-gray-300 text-sm">Made in CI</div>
              </motion.div>
            </div>
          </motion.div>
        </div>

      </section>

      {/* Brand Story Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            preTitle="NOTRE IDENTITÉ"
            title="L'Histoire de Be"
            subtitle="Une marque qui raconte l'histoire d'une Afrique sublime et fière de ses racines"
            icon={{ component: Sparkles }}
          />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <img
                src={collectionsSignatureImage}
                alt="Collections Be"
                className="w-full h-96 object-cover rounded-2xl shadow-xl"
              />
            </motion.div>
            
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Be : Plus qu'une marque, une philosophie
                </h3>
                <p className="text-gray-700 leading-relaxed mb-6">
                  Be est la marque originale développée par Be Boutique Côte d'Ivoire. 
                  Elle ne se contente pas de proposer des produits : elle raconte une histoire, 
                  celle d'une Afrique sublime et fière de ses racines.
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Crown className="w-6 h-6 text-amber-500 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Textiles & Vêtements</h4>
                    <p className="text-gray-600 text-sm">
                      Pagnes, Kita, tissus traditionnels et pièces contemporaines
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Sparkles className="w-6 h-6 text-amber-500 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Bijoux Artisanaux</h4>
                    <p className="text-gray-600 text-sm">
                      Créations qui allient modernité et héritage culturel
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Leaf className="w-6 h-6 text-amber-500 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Soins Naturels</h4>
                    <p className="text-gray-600 text-sm">
                      Huiles, crèmes et produits inspirés des secrets de beauté africains
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Brand Values Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            preTitle="NOS VALEURS"
            title="Ce qui nous anime"
            subtitle="Be se positionne à la croisée du luxe accessible et de l'artisanat contemporain"
            icon={{ component: Heart }}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {brandValues.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={index}
                  className="group p-6 bg-gray-50 rounded-2xl border border-gray-100 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-amber-500 text-center"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <div className="flex justify-center mb-4">
                    <Icon className="w-12 h-12 text-amber-500 group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <h3 className="font-bold text-gray-900 text-lg mb-2">{value.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{value.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Collections Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-amber-50 to-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            preTitle="NOS COLLECTIONS SIGNATURE"
            title="Soins 100% Naturels"
            subtitle="Découvrez nos gammes d'exception élaborées avec passion"
            icon={{ component: Leaf }}
          />
          
          {/* Collection Tabs */}
          <div className="flex justify-center mb-12">
            <div className="bg-white rounded-full p-2 shadow-lg border border-gray-200">
              <button
                onClick={() => setActiveCollection('huiles')}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                  activeCollection === 'huiles'
                    ? 'bg-amber-500 text-white shadow-lg'
                    : 'text-gray-600 hover:text-amber-500'
                }`}
              >
                Huiles de Coco
              </button>
              <button
                onClick={() => setActiveCollection('chantilly')}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                  activeCollection === 'chantilly'
                    ? 'bg-amber-500 text-white shadow-lg'
                    : 'text-gray-600 hover:text-amber-500'
                }`}
              >
                Chantilly Karité
              </button>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {activeCollection === 'huiles' && (
              <motion.div
                key="huiles"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <div className="bg-white rounded-3xl p-8 mb-8 shadow-lg border border-gray-100">
                  <h3 className="text-2xl font-bold text-center text-gray-900 mb-4">
                    Découvrez la richesse de notre gamme d'huiles 100% naturelles
                  </h3>
                  <p className="text-gray-700 text-center leading-relaxed mb-8 max-w-4xl mx-auto">
                    Plongez dans l'univers du soin authentique avec nos huiles fines, élaborées à partir 
                    d'une huile de coco pure et pressée à froid. Chaque déclinaison est pensée pour sublimer 
                    votre peau et vos cheveux, tout en offrant les bienfaits nourrissants des gammes natures 
                    et protecteurs des gammes enrichies en Vitamine C.
                  </p>
                  <div className="text-center">
                    <span className="inline-block px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-semibold">
                      Des soins naturels et sans compromis !
                    </span>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                  {huilesData.map((huile, index) => (
                    <motion.div
                      key={huile.id}
                      className="group bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ y: -5 }}
                    >
                      <div className="aspect-square overflow-hidden relative">
                        <img
                          src={huile.image}
                          alt={huile.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className={`absolute inset-0 bg-gradient-to-t ${huile.color} opacity-20 group-hover:opacity-30 transition-opacity`} />
                      </div>
                      <div className="p-4">
                        <h4 className="font-bold text-gray-900 text-lg mb-2">{huile.name}</h4>
                        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{huile.description}</p>
                        <div className="flex flex-wrap gap-1">
                          {huile.benefits.slice(0, 2).map((benefit, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-medium"
                            >
                              {benefit}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeCollection === 'chantilly' && (
              <motion.div
                key="chantilly"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <div className="bg-white rounded-3xl p-8 mb-8 shadow-lg border border-gray-100">
                  <h3 className="text-2xl font-bold text-center text-gray-900 mb-4">
                    Savourez le plaisir du soin avec nos Chantilly 100% naturelles
                  </h3>
                  <p className="text-gray-700 text-center leading-relaxed mb-8 max-w-4xl mx-auto">
                    Offrez à votre peau et vos cheveux une expérience unique avec notre collection de chantilly 
                    fouettées à la texture aérienne et fondante. Formulées à partir de beurre de karité pur et 
                    nourrissant, elles sont déclinées en saveurs délicates pour tous les goûts et tous les besoins, 
                    avec une version enrichie en vitamine C pour une action éclat renforcée.
                  </p>
                  <div className="text-center">
                    <span className="inline-block px-4 py-2 bg-pink-100 text-pink-800 rounded-full text-sm font-semibold">
                      Naturelles, onctueuses et irrésistibles !
                    </span>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {chantillyData.map((chantilly, index) => (
                    <motion.div
                      key={chantilly.id}
                      className={`group bg-white rounded-2xl overflow-hidden shadow-lg border transition-all duration-300 hover:shadow-xl ${
                        chantilly.special ? 'border-pink-200 ring-2 ring-pink-100' : 'border-gray-100'
                      }`}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ y: -5 }}
                    >
                      {chantilly.special && (
                        <div className="bg-gradient-to-r from-pink-400 to-rose-500 text-white text-center py-2">
                          <span className="text-xs font-bold">SPÉCIAL BÉBÉ</span>
                        </div>
                      )}
                      <div className="aspect-square overflow-hidden relative">
                        <img
                          src={chantilly.image}
                          alt={chantilly.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className={`absolute inset-0 bg-gradient-to-t ${chantilly.color} opacity-20 group-hover:opacity-30 transition-opacity`} />
                      </div>
                      <div className="p-4">
                        <h4 className="font-bold text-gray-900 text-lg mb-2">{chantilly.name}</h4>
                        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{chantilly.description}</p>
                        <div className="flex flex-wrap gap-1">
                          {chantilly.benefits.slice(0, 2).map((benefit, idx) => (
                            <span
                              key={idx}
                              className={`px-2 py-1 rounded-full text-xs font-medium ${
                                chantilly.special
                                  ? 'bg-pink-100 text-pink-700'
                                  : 'bg-amber-100 text-amber-700'
                              }`}
                            >
                              {benefit}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

     

      {/* Testimonials Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            preTitle="TÉMOIGNAGES"
            title="Ce que disent nos clients"
            subtitle="L'excellence reconnue par ceux qui nous font confiance"
            icon={{ component: Star }}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Aminata K.",
                location: "Abidjan",
                rating: 5,
                comment: "Les huiles Be ont transformé ma routine beauté. Ma peau n'a jamais été aussi douce et éclatante !",
                product: "Huile Coco-Carotte",
                verified: true
              },
              {
                name: "Fatoumata D.",
                location: "Bouaké",
                rating: 5,
                comment: "La chantilly Calendula est parfaite pour mon bébé. Naturelle et tellement efficace !",
                product: "Chantilly Calendula",
                verified: true
              },
              {
                name: "Mariam S.",
                location: "San Pedro",
                rating: 5,
                comment: "Enfin une marque qui respecte nos traditions tout en offrant des produits modernes. Je recommande !",
                product: "Collection Complète",
                verified: true
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={16} className="text-amber-400 fill-current" />
                  ))}
                </div>
                
                <p className="text-gray-700 mb-4 italic leading-relaxed">
                  "{testimonial.comment}"
                </p>
                
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-bold text-gray-900 text-sm">{testimonial.name}</h4>
                      {testimonial.verified && (
                        <Check className="w-4 h-4 text-green-500" />
                      )}
                    </div>
                    <p className="text-xs text-gray-500">{testimonial.location}</p>
                    <p className="text-xs text-amber-600 font-medium mt-1">
                      A acheté: {testimonial.product}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact & Social Section */}
      <section className="py-16 md:py-24 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Restez connectés avec <span className="text-amber-500">Be</span>
              </h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Suivez-nous pour découvrir nos dernières créations, bénéficier d'offres exclusives 
                et plonger encore plus profondément dans l'univers authentique de Be.
              </p>
              
              <div className="space-y-4">
                <motion.div
                  className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl"
                  whileHover={{ x: 5 }}
                >
                  <Globe className="w-6 h-6 text-amber-500" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Boutique en ligne</h4>
                    <p className="text-gray-600 text-sm">Commandez vos produits favoris</p>
                  </div>
                </motion.div>
                
                <motion.div
                  className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl"
                  whileHover={{ x: 5 }}
                >
                  <Shield className="w-6 h-6 text-amber-500" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Garantie qualité</h4>
                    <p className="text-gray-600 text-sm">Produits 100% naturels certifiés</p>
                  </div>
                </motion.div>
                
                <motion.div
                  className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl"
                  whileHover={{ x: 5 }}
                >
                  <Heart className="w-6 h-6 text-amber-500" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Service client</h4>
                    <p className="text-gray-600 text-sm">Une équipe dédiée à votre satisfaction</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
            
            <motion.div
              className="text-center"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="bg-gradient-to-br from-amber-400 to-orange-500 rounded-3xl p-8 text-white">
                <img
                  src={beLogo}
                  alt="Be Logo"
                  className="h-16 mx-auto mb-6 filter brightness-0 invert"
                />
                <h3 className="text-2xl font-bold mb-4">Rejoignez la famille Be</h3>
                <p className="mb-6 opacity-90">
                  Découvrez l'authenticité et l'excellence des soins naturels africains
                </p>
                
                <motion.button
                  className="group px-8 py-4 bg-white text-amber-600 rounded-full font-bold text-lg shadow-lg flex items-center gap-3 mx-auto hover:shadow-xl"
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ShoppingBag className="w-5 h-5" />
                  <span>Explorer Be</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
});

export default BrandPartnerPage;












