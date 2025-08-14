import React, { useState, useEffect, memo } from 'react';
import {
 User,
 Settings,
 Lock,
 Heart,
 ShoppingBag,
 MapPin,
 CreditCard,
 Bell,
 HelpCircle,
 LogOut,
 Edit,
 Check,
 X,
 Star,
 ChevronRight,
 Shield,
 Package,
 MessageSquare,
 Crown
} from 'lucide-react';


const AccountPage = memo(() => {
 const [activeTab, setActiveTab] = useState('profile');
 const [editMode, setEditMode] = useState(false);
 const [userData, setUserData] = useState({
   firstName: 'Aïcha',
   lastName: 'Diop',
   email: 'aicha.diop@example.com',
   phone: '+33 6 12 34 56 78',
   birthDate: '15/03/1990',
   joinedDate: 'Membre depuis janvier 2022',
   loyaltyPoints: 1250,
   tier: 'Gold',
   avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop'
 });


 const [formData, setFormData] = useState({ ...userData });
 const [orders, setOrders] = useState([
   {
     id: 'CMD-78945',
     date: '15/01/2024',
     status: 'Livré',
     items: 3,
     total: 187.50,
     products: [
       { id: 1, name: 'Sérum Éclat Diamant', image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=100&h=100&fit=crop' },
       { id: 2, name: 'Masque Purifiant Argile Rose', image: 'https://images.unsplash.com/photo-1556228578-dd6f-2c0b6c0b6c0b?w=100&h=100&fit=crop' },
       { id: 3, name: 'Huile Précieuse Multi-Usage', image: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=100&h=100&fit=crop' }
     ]
   },
   {
     id: 'CMD-78412',
     date: '05/01/2024',
     status: 'Expédié',
     items: 2,
     total: 134.99,
     products: [
       { id: 4, name: 'Rouge à Lèvres Velours Royal', image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=100&h=100&fit=crop' },
       { id: 5, name: 'Crème Corps Karité Premium', image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=100&h=100&fit=crop' }
     ]
   }
 ]);


 const [addresses, setAddresses] = useState([
   {
     id: 1,
     title: 'Domicile',
     name: 'Aïcha Diop',
     address: '12 Rue de la Paix',
     city: 'Paris',
     postalCode: '75002',
     country: 'France',
     phone: '+33 6 12 34 56 78',
     isDefault: true
   },
   {
     id: 2,
     title: 'Bureau',
     name: 'Aïcha Diop',
     address: '45 Avenue des Champs-Élysées',
     city: 'Paris',
     postalCode: '75008',
     country: 'France',
     phone: '+33 6 12 34 56 78',
     isDefault: false
   }
 ]);


 const handleInputChange = (e) => {
   const { name, value } = e.target;
   setFormData(prev => ({ ...prev, [name]: value }));
 };


 const saveProfile = () => {
   setUserData({ ...formData });
   setEditMode(false);
 };


 const cancelEdit = () => {
   setFormData({ ...userData });
   setEditMode(false);
 };


 const OrderCard = ({ order }) => (
   <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 p-5">
     <div className="flex justify-between items-start mb-4">
       <div>
         <p className="text-xs text-gray-500">Commande #{order.id}</p>
         <h3 className="font-semibold text-gray-900">{order.date}</h3>
       </div>
       <span className={`px-3 py-1 rounded-full text-xs font-medium ${
         order.status === 'Livré' ? 'bg-green-100 text-green-800' :
         order.status === 'Expédié' ? 'bg-blue-100 text-blue-800' :
         'bg-amber-100 text-amber-800'
       }`}>
         {order.status}
       </span>
     </div>
    
     <div className="flex items-center mb-4">
       {order.products.map((product, index) => (
         <div
           key={product.id}
           className={`w-12 h-12 rounded-lg overflow-hidden border-2 border-white ${index > 0 ? '-ml-3' : ''}`}
           style={{ zIndex: order.products.length - index }}
         >
           <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
         </div>
       ))}
       {order.items > 3 && (
         <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center text-xs font-medium text-gray-500 -ml-3">
           +{order.items - 3}
         </div>
       )}
     </div>
    
     <div className="flex justify-between items-center pt-4 border-t border-gray-100">
       <p className="text-sm text-gray-600">{order.items} article{order.items > 1 ? 's' : ''}</p>
       <p className="font-semibold text-gray-900">{order.total.toFixed(2)}€</p>
     </div>
   </div>
 );


 const AddressCard = ({ address }) => (
   <div className={`bg-white rounded-2xl border ${address.isDefault ? 'border-amber-500' : 'border-gray-100'} shadow-sm hover:shadow-lg transition-all duration-300 p-5`}>
     <div className="flex justify-between items-start mb-3">
       <div className="flex items-center gap-2">
         <h3 className="font-semibold text-gray-900">{address.title}</h3>
         {address.isDefault && (
           <span className="px-2 py-0.5 bg-amber-100 text-amber-800 text-xs rounded-full font-medium">
             Par défaut
           </span>
         )}
       </div>
       <button className="text-amber-600 hover:text-amber-700">
         <Edit className="w-4 h-4" />
       </button>
     </div>
    
     <div className="text-sm text-gray-600 mb-4">
       <p>{address.name}</p>
       <p>{address.address}</p>
       <p>{address.postalCode} {address.city}</p>
       <p>{address.country}</p>
       <p className="mt-2">{address.phone}</p>
     </div>
    
     <div className="flex gap-2 pt-4 border-t border-gray-100">
       {!address.isDefault && (
         <button className="text-xs font-medium text-amber-600 hover:text-amber-700">
           Définir comme adresse par défaut
         </button>
       )}
       <button className="text-xs font-medium text-red-500 hover:text-red-600 ml-auto">
         Supprimer
       </button>
     </div>
   </div>
 );


 return (
   <div className="min-h-screen bg-gray-50">
     {/* Header */}
     <div className="bg-white border-b border-gray-100">
       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
         <div className="flex items-center justify-between py-4">
           <div className="flex items-center gap-4">
             <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
               <User className="w-6 h-6 text-amber-500" />
               Mon Compte
             </h1>
           </div>
         </div>
       </div>
     </div>


     {/* Main Content */}
     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
       <div className="flex flex-col lg:flex-row gap-8">
         {/* Sidebar */}
         <div className="lg:w-1/4">
           <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
             {/* Profile Summary */}
             <div className="p-6 border-b border-gray-100">
               <div className="flex items-center gap-4 mb-4">
                 <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-amber-500">
                   <img src={userData.avatar} alt="Profile" className="w-full h-full object-cover" />
                 </div>
                 <div>
                   <h3 className="font-semibold text-gray-900">{userData.firstName} {userData.lastName}</h3>
                   <p className="text-sm text-gray-500">{userData.email}</p>
                 </div>
               </div>
               <div className="flex justify-between items-center">
                 <div className="flex items-center gap-2">
                   <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center">
                     <Crown className="w-4 h-4 text-amber-600" />
                   </div>
                   <span className="text-sm font-medium text-gray-900">{userData.tier}</span>
                 </div>
                 <div className="text-right">
                   <p className="text-xs text-gray-500">Points</p>
                   <p className="text-sm font-semibold text-amber-600">{userData.loyaltyPoints}</p>
                 </div>
               </div>
             </div>


             {/* Navigation */}
             <nav className="p-2">
               <button
                 onClick={() => setActiveTab('profile')}
                 className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${activeTab === 'profile' ? 'bg-amber-50 text-amber-600' : 'hover:bg-gray-50 text-gray-700'}`}
               >
                 <div className="flex items-center gap-3">
                   <User className="w-5 h-5" />
                   <span>Profil</span>
                 </div>
                 <ChevronRight className="w-5 h-5" />
               </button>


               <button
                 onClick={() => setActiveTab('orders')}
                 className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${activeTab === 'orders' ? 'bg-amber-50 text-amber-600' : 'hover:bg-gray-50 text-gray-700'}`}
               >
                 <div className="flex items-center gap-3">
                   <ShoppingBag className="w-5 h-5" />
                   <span>Commandes</span>
                 </div>
                 <ChevronRight className="w-5 h-5" />
               </button>


               <button
                 onClick={() => setActiveTab('addresses')}
                 className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${activeTab === 'addresses' ? 'bg-amber-50 text-amber-600' : 'hover:bg-gray-50 text-gray-700'}`}
               >
                 <div className="flex items-center gap-3">
                   <MapPin className="w-5 h-5" />
                   <span>Adresses</span>
                 </div>
                 <ChevronRight className="w-5 h-5" />
               </button>


               <button
                 onClick={() => setActiveTab('security')}
                 className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${activeTab === 'security' ? 'bg-amber-50 text-amber-600' : 'hover:bg-gray-50 text-gray-700'}`}
               >
                 <div className="flex items-center gap-3">
                   <Lock className="w-5 h-5" />
                   <span>Sécurité</span>
                 </div>
                 <ChevronRight className="w-5 h-5" />
               </button>


               <button
                 onClick={() => setActiveTab('notifications')}
                 className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${activeTab === 'notifications' ? 'bg-amber-50 text-amber-600' : 'hover:bg-gray-50 text-gray-700'}`}
               >
                 <div className="flex items-center gap-3">
                   <Bell className="w-5 h-5" />
                   <span>Notifications</span>
                 </div>
                 <ChevronRight className="w-5 h-5" />
               </button>


               <button className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 text-gray-700 transition-colors">
                 <div className="flex items-center gap-3">
                   <HelpCircle className="w-5 h-5" />
                   <span>Aide & Support</span>
                 </div>
                 <ChevronRight className="w-5 h-5" />
               </button>


               <button className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 text-red-500 transition-colors mt-2">
                 <div className="flex items-center gap-3">
                   <LogOut className="w-5 h-5" />
                   <span>Déconnexion</span>
                 </div>
               </button>
             </nav>
           </div>
         </div>


         {/* Main Panel */}
         <div className="lg:w-3/4">
           {/* Profile Tab */}
           {activeTab === 'profile' && (
             <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
               <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                 <h2 className="text-xl font-semibold text-gray-900">Informations personnelles</h2>
                 {!editMode ? (
                   <button
                     onClick={() => setEditMode(true)}
                     className="flex items-center gap-2 text-amber-600 hover:text-amber-700"
                   >
                     <Edit className="w-4 h-4" />
                     <span>Modifier</span>
                   </button>
                 ) : (
                   <div className="flex gap-2">
                     <button
                       onClick={cancelEdit}
                       className="flex items-center gap-2 text-gray-600 hover:text-gray-700"
                     >
                       <X className="w-4 h-4" />
                       <span>Annuler</span>
                     </button>
                     <button
                       onClick={saveProfile}
                       className="flex items-center gap-2 text-green-600 hover:text-green-700"
                     >
                       <Check className="w-4 h-4" />
                       <span>Enregistrer</span>
                     </button>
                   </div>
                 )}
               </div>


               <div className="p-6">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                   <div>
                     <label className="block text-sm font-medium text-gray-700 mb-1">Prénom</label>
                     {editMode ? (
                       <input
                         type="text"
                         name="firstName"
                         value={formData.firstName}
                         onChange={handleInputChange}
                         className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                       />
                     ) : (
                       <p className="text-gray-900">{userData.firstName}</p>
                     )}
                   </div>
                   <div>
                     <label className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
                     {editMode ? (
                       <input
                         type="text"
                         name="lastName"
                         value={formData.lastName}
                         onChange={handleInputChange}
                         className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                       />
                     ) : (
                       <p className="text-gray-900">{userData.lastName}</p>
                     )}
                   </div>
                   <div>
                     <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                     {editMode ? (
                       <input
                         type="email"
                         name="email"
                         value={formData.email}
                         onChange={handleInputChange}
                         className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                       />
                     ) : (
                       <p className="text-gray-900">{userData.email}</p>
                     )}
                   </div>
                   <div>
                     <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
                     {editMode ? (
                       <input
                         type="tel"
                         name="phone"
                         value={formData.phone}
                         onChange={handleInputChange}
                         className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                       />
                     ) : (
                       <p className="text-gray-900">{userData.phone}</p>
                     )}
                   </div>
                   <div>
                     <label className="block text-sm font-medium text-gray-700 mb-1">Date de naissance</label>
                     {editMode ? (
                       <input
                         type="text"
                         name="birthDate"
                         value={formData.birthDate}
                         onChange={handleInputChange}
                         className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                       />
                     ) : (
                       <p className="text-gray-900">{userData.birthDate}</p>
                     )}
                   </div>
                   <div>
                     <label className="block text-sm font-medium text-gray-700 mb-1">Membre depuis</label>
                     <p className="text-gray-900">{userData.joinedDate}</p>
                   </div>
                 </div>


                 <div className="border-t border-gray-200 pt-6">
                   <h3 className="text-lg font-semibold text-gray-900 mb-4">Programme de fidélité</h3>
                   <div className="bg-gradient-to-r from-amber-500 to-amber-600 rounded-xl p-5 text-white">
                     <div className="flex justify-between items-center mb-4">
                       <div>
                         <p className="text-sm opacity-80">Niveau actuel</p>
                         <h4 className="text-xl font-bold">{userData.tier}</h4>
                       </div>
                       <div className="w-12 h-12 rounded-full bg-white bg-opacity-20 flex items-center justify-center">
                         <Crown className="w-6 h-6" />
                       </div>
                     </div>
                     <div className="mb-3">
                       <div className="flex justify-between text-sm mb-1">
                         <span>{userData.loyaltyPoints} / 2000 points</span>
                         <span>{Math.round((userData.loyaltyPoints / 2000) * 100)}%</span>
                       </div>
                       <div className="w-full bg-white bg-opacity-30 rounded-full h-2">
                         <div
                           className="bg-white h-2 rounded-full transition-all duration-300"
                           style={{ width: `${Math.min((userData.loyaltyPoints / 2000) * 100, 100)}%` }}
                         ></div>
                       </div>
                     </div>
                     <p className="text-xs opacity-80">2000 points requis pour atteindre le niveau Platinum</p>
                   </div>
                 </div>
               </div>
             </div>
           )}


           {/* Orders Tab */}
           {activeTab === 'orders' && (
             <div>
               <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-6">
                 <div className="p-6 border-b border-gray-100">
                   <h2 className="text-xl font-semibold text-gray-900">Historique des commandes</h2>
                 </div>
                 <div className="p-6">
                   {orders.length === 0 ? (
                     <div className="text-center py-8">
                       <Package className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                       <h3 className="text-lg font-semibold text-gray-900 mb-2">Aucune commande passée</h3>
                       <p className="text-gray-500 mb-6">Vos commandes apparaîtront ici une fois passées</p>
                       <button className="px-6 py-3 bg-amber-500 text-white rounded-xl font-medium hover:bg-amber-600 transition-colors">
                         Découvrir nos produits
                       </button>
                     </div>
                   ) : (
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                       {orders.map(order => (
                         <OrderCard key={order.id} order={order} />
                       ))}
                     </div>
                   )}
                 </div>
               </div>


               <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                 <div className="p-6 border-b border-gray-100">
                   <h2 className="text-xl font-semibold text-gray-900">Retours et remboursements</h2>
                 </div>
                 <div className="p-6">
                   <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                     <Shield className="w-6 h-6 text-amber-500 mt-1" />
                     <div>
                       <h3 className="font-medium text-gray-900 mb-2">Politique de retour</h3>
                       <p className="text-sm text-gray-600">
                         Vous avez 30 jours à partir de la date de réception pour retourner un article.
                         Les articles doivent être non utilisés, dans leur emballage d'origine.
                       </p>
                     </div>
                   </div>
                 </div>
               </div>
             </div>
           )}


           {/* Addresses Tab */}
           {activeTab === 'addresses' && (
             <div>
               <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-6">
                 <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                   <h2 className="text-xl font-semibold text-gray-900">Mes adresses</h2>
                   <button className="px-4 py-2 bg-amber-500 text-white rounded-xl font-medium hover:bg-amber-600 transition-colors">
                     + Ajouter une adresse
                   </button>
                 </div>
                 <div className="p-6">
                   {addresses.length === 0 ? (
                     <div className="text-center py-8">
                       <MapPin className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                       <h3 className="text-lg font-semibold text-gray-900 mb-2">Aucune adresse enregistrée</h3>
                       <p className="text-gray-500 mb-6">Ajoutez une adresse pour faciliter vos achats futurs</p>
                       <button className="px-6 py-3 bg-amber-500 text-white rounded-xl font-medium hover:bg-amber-600 transition-colors">
                         Ajouter une adresse
                       </button>
                     </div>
                   ) : (
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                       {addresses.map(address => (
                         <AddressCard key={address.id} address={address} />
                       ))}
                     </div>
                   )}
                 </div>
               </div>
             </div>
           )}


           {/* Security Tab */}
           {activeTab === 'security' && (
             <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
               <div className="p-6 border-b border-gray-100">
                 <h2 className="text-xl font-semibold text-gray-900">Sécurité du compte</h2>
               </div>
               <div className="p-6">
                 <div className="space-y-6">
                   <div className="flex justify-between items-center p-4 border border-gray-100 rounded-xl">
                     <div>
                       <h3 className="font-medium text-gray-900 mb-1">Mot de passe</h3>
                       <p className="text-sm text-gray-600">••••••••••</p>
                     </div>
                     <button className="text-amber-600 hover:text-amber-700">
                       Modifier
                     </button>
                   </div>


                   <div className="flex justify-between items-center p-4 border border-gray-100 rounded-xl">
                     <div>
                       <h3 className="font-medium text-gray-900 mb-1">Authentification à deux facteurs</h3>
                       <p className="text-sm text-gray-600">Non activée</p>
                     </div>
                     <button className="text-amber-600 hover:text-amber-700">
                       Activer
                     </button>
                   </div>


                   <div className="flex justify-between items-center p-4 border border-gray-100 rounded-xl">
                     <div>
                       <h3 className="font-medium text-gray-900 mb-1">Appareils connectés</h3>
                       <p className="text-sm text-gray-600">3 appareils</p>
                     </div>
                     <button className="text-amber-600 hover:text-amber-700">
                       Gérer
                     </button>
                   </div>
                 </div>
               </div>
             </div>
           )}


           {/* Notifications Tab */}
           {activeTab === 'notifications' && (
             <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
               <div className="p-6 border-b border-gray-100">
                 <h2 className="text-xl font-semibold text-gray-900">Préférences de notification</h2>
               </div>
               <div className="p-6">
                 <div className="space-y-6">
                   <div className="flex justify-between items-center">
                     <div>
                       <h3 className="font-medium text-gray-900 mb-1">E-mails promotionnels</h3>
                       <p className="text-sm text-gray-600">Recevez nos offres exclusives et nouveautés</p>
                     </div>
                     <label className="relative inline-flex items-center cursor-pointer">
                       <input type="checkbox" className="sr-only peer" defaultChecked />
                       <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-amber-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-500"></div>
                     </label>
                   </div>


                   <div className="flex justify-between items-center">
                     <div>
                       <h3 className="font-medium text-gray-900 mb-1">Notifications push</h3>
                       <p className="text-sm text-gray-600">Recevez des alertes sur votre appareil</p>
                     </div>
                     <label className="relative inline-flex items-center cursor-pointer">
                       <input type="checkbox" className="sr-only peer" />
                       <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-amber-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-500"></div>
                     </label>
                   </div>
                 </div>
               </div>
             </div>
           )}
         </div>
       </div>
     </div>
   </div>
 );
});


export default AccountPage;

