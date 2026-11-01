import React, { useState, useEffect, useRef } from 'react';
import { 
  ShoppingBag, 
  X, 
  Instagram, 
  Facebook, 
  Linkedin, 
  Menu as MenuIcon, 
  Info, 
  ShieldCheck,
  MessageCircle,
  ChevronLeft,
  ChevronRight,
  PhoneCall
} from 'lucide-react';

// ==========================================
// CONSTANTES DU RESTAURANT (LOMÉ, TOGO)
// ==========================================
export const WHATSAPP_NUMBER = "22893427482";
export const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}`;
export const PHONE_DISPLAY = "+228 93 42 74 82";

export const IMAGES = {
  hero: "/src/assets/images/hero_african_dish_1793177617620.jpg",
  offre1: "/src/assets/images/dish_poisson_braise_1793177619222.jpg",
  offre2: "/src/assets/images/dish_poulet_colombo_1793177618997.jpg",
  offre3: "/src/assets/images/dish_riz_creole_1793177619907.jpg",
  offreGrande: "/src/assets/images/offer_big_bowl_1793177618572.jpg",
  plat1: "/src/assets/images/dish_poisson_braise_1793177619222.jpg",
  plat2: "/src/assets/images/dish_poulet_colombo_1793177618997.jpg",
  plat3: "/src/assets/images/dish_riz_creole_1793177619907.jpg",
  banniere: "/src/assets/images/banner_food_bg_1793177619730.jpg",
};

// Données des 3 plats vedettes conformes à la maquette
const PLATS_VEDETTES = [
  {
    id: 1,
    scriptPrefix: "Délicieux",
    title: "poisson braisé",
    image: IMAGES.plat1,
    price: "5 000 FCFA",
    discount: "-33%",
    description: "Tilapia frais braisé aux aromates de Lomé, servi avec son attiéké moelleux et bananes alloco dorées.",
  },
  {
    id: 2,
    scriptPrefix: "Savoureux",
    title: "poulet colombo",
    image: IMAGES.plat2,
    price: "5 000 FCFA",
    discount: "-33%",
    description: "Morceaux de poulet tendres mijotés aux épices colombo des Caraïbes avec pommes de terre fondantes.",
  },
  {
    id: 3,
    scriptPrefix: "Délicieux",
    title: "riz créole",
    image: IMAGES.plat3,
    price: "5 000 FCFA",
    discount: "-33%",
    description: "Riz parfumé façon créole sauté aux crevettes grillées, poivrons doux et petits oignons caramélisés.",
  },
];

// Données des avis clients répartis sur 4 pages interactives (supporte le swipe mobile)
const REVIEW_PAGES = [
  [
    {
      id: 1,
      name: "Olivia Rose",
      initials: "OR",
      role: "Cliente Reinébène",
      text: "Un véritable voyage culinaire entre Lomé et les Antilles ! Le poisson braisé est d'une fraîcheur incomparable et le Bokit de la Guadeloupe m'a rappelé les îles. L'accueil chaleureux donne envie de revenir chaque week-end.",
    },
    {
      id: 2,
      name: "Koffi Mensah",
      initials: "KM",
      role: "Client Reinébène",
      text: "Je recommande vivement le poulet colombo et les accras croustillants. Les saveurs sont authentiques, généreuses et le service est très rapide. Le meilleur cadre convivial près du Carrefour AISED à Lomé !",
    },
    {
      id: 3,
      name: "Ablavi Lawson",
      initials: "AL",
      role: "Cliente Reinébène",
      text: "Une carte raffinée et un rapport qualité-prix imbattable. Le riz créole aux crevettes et la sauce Adémè sont un pur délice ! Bravo à toute l'équipe de Reinébène pour cette expérience gustative exceptionnelle.",
    },
  ],
  [
    {
      id: 4,
      name: "Estelle Mensah",
      initials: "EM",
      role: "Cliente Reinébène",
      text: "Découvert lors d'un déjeuner d'affaires, le restaurant Reinébène est devenu notre adresse coup de cœur. Les portions de grillades sont copieuses et la sauce maison est délicieuse. Un vrai sans-faute !",
    },
    {
      id: 5,
      name: "Jean-Marc Foley",
      initials: "JF",
      role: "Client Reinébène",
      text: "Le service est impeccable du début à la fin. Les plats mijotés comme le colombo et le foutou sauce arachide sont préparés avec un savoir-faire rare à Lomé. Bravo au chef et à toute la brigade !",
    },
    {
      id: 6,
      name: "Eleni Dossou",
      initials: "ED",
      role: "Cliente Reinébène",
      text: "Une ambiance chaleureuse et des plats d'une authenticité remarquable. Mention spéciale pour le poisson braisé avec son attiéké et ses bananes alloco dorées à la perfection. Nous reviendrons !",
    },
  ],
  [
    {
      id: 7,
      name: "Foussena Alassani",
      initials: "FA",
      role: "Cliente Reinébène",
      text: "Le meilleur restaurant afro-caribéen de la capitale togolaise. Tout est frais, fait maison avec passion. Le personnel est aux petits soins et les prix en FCFA sont tout à fait raisonnables.",
    },
    {
      id: 8,
      name: "Amavi Kuami",
      initials: "AK",
      role: "Client Reinébène",
      text: "Les jus de fruits locaux et les formules petit-déjeuner dès 7h sont parfaits pour bien démarrer la journée. Le cadre près du Carrefour AISED est calme, reposant et très accueillant.",
    },
    {
      id: 9,
      name: "Sena Agbeko",
      initials: "SA",
      role: "Cliente Reinébène",
      text: "Les bokits croustillants et les grillades kankan sont tout simplement succulents. C'est l'endroit parfait pour se détendre en famille ou entre amis le week-end dans un cadre propre et soigné.",
    },
  ],
  [
    {
      id: 10,
      name: "Marcelle Akou",
      initials: "MA",
      role: "Cliente Reinébène",
      text: "Toujours un régal à chaque visite. Les épices sont parfaitement dosées et le cadre reflète la convivialité togolaise et la générosité caribéenne. La commande WhatsApp est hyper pratique !",
    },
    {
      id: 11,
      name: "Kossiwa Tete",
      initials: "KT",
      role: "Cliente Reinébène",
      text: "Un restaurant digne de ce nom. Des grillades savoureuses, un service ponctuel pour les commandes et un accueil toujours souriant. Le goût de chez nous sublimé.",
    },
    {
      id: 12,
      name: "Didier Akakpo",
      initials: "DA",
      role: "Client Reinébène",
      text: "Qualité constante et assiettes bien garnies. Que ce soit pour un repas rapide le midi ou un dîner détente en terrasse, Reinébène ne déçoit jamais. Recommandé les yeux fermés !",
    },
  ],
];

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedOfferIndex, setSelectedOfferIndex] = useState(2);
  const [activeReviewPage, setActiveReviewPage] = useState(1);

  // Modales
  const [reservationModalOpen, setReservationModalOpen] = useState(false);
  const [orderModalOpen, setOrderModalOpen] = useState(false);
  const [modalTermsOpen, setModalTermsOpen] = useState(false);
  const [modalPrivacyOpen, setModalPrivacyOpen] = useState(false);

  // Formulaire réservation
  const [resName, setResName] = useState("");
  const [resDate, setResDate] = useState("");
  const [resTime, setResTime] = useState("19:30");
  const [resGuests, setResGuests] = useState("2");
  const [resNote, setResNote] = useState("");

  // Formulaire commande express
  const [orderName, setOrderName] = useState("");
  const [orderPhone, setOrderPhone] = useState("");
  const [orderDish, setOrderDish] = useState("Poisson braisé (5 000 FCFA)");
  const [orderNotes, setOrderNotes] = useState("");

  // Touch swipe support pour mobile à 60 FPS
  const touchStartX = useRef<number | null>(null);

  // Empêche le défilement de fond saccadé lors de l'ouverture des modales sur mobile
  useEffect(() => {
    const isAnyModalOpen = reservationModalOpen || orderModalOpen || modalTermsOpen || modalPrivacyOpen;
    if (isAnyModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [reservationModalOpen, orderModalOpen, modalTermsOpen, modalPrivacyOpen]);

  const handleOpenWhatsAppOrder = (customText?: string) => {
    const text = customText || `Bonjour REINÉBÈNE, je souhaite passer une commande.`;
    window.open(`${WHATSAPP_LINK}?text=${encodeURIComponent(text)}`, '_blank');
  };

  const handleSendReservation = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Bonjour REINÉBÈNE, je souhaite réserver une table :\n- Nombre de personnes : ${resGuests}\n- Nom : ${resName || 'Client'}\n- Date : ${resDate || 'Prochainement'}\n- Heure : ${resTime}\n- Précisions : ${resNote || 'Aucune'}`;
    window.open(`${WHATSAPP_LINK}?text=${encodeURIComponent(text)}`, '_blank');
    setReservationModalOpen(false);
  };

  const handleSendOrderForm = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Bonjour REINÉBÈNE, je souhaite commander :\n- Plat : ${orderDish}\n- Nom du client : ${orderName || 'Client'}\n- Tél : ${orderPhone || 'Non renseigné'}\n- Instructions / Accompagnement : ${orderNotes || 'Standard'}`;
    window.open(`${WHATSAPP_LINK}?text=${encodeURIComponent(text)}`, '_blank');
    setOrderModalOpen(false);
  };

  // Gestionnaires de swipe mobile 60fps pour les avis
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(deltaX) > 40) {
      if (deltaX < 0) {
        // Swipe gauche -> page suivante
        setActiveReviewPage((prev) => (prev + 1) % 4);
      } else {
        // Swipe droite -> page précédente
        setActiveReviewPage((prev) => (prev - 1 + 4) % 4);
      }
    }
    touchStartX.current = null;
  };

  return (
    <div className="min-h-screen flex flex-col font-outfit text-[#111111] bg-white selection:bg-[#FF5A0F] selection:text-white overscroll-none">

      {/* ==========================================
          1) HEADER + HERO SECTION
      ========================================== */}
      <header id="accueil" className="relative w-full overflow-hidden bg-white">
        
        {/* Forme orange organique découpée en haut à droite avec accélération GPU */}
        <div 
          className="gpu-layer absolute top-0 right-0 w-[55%] sm:w-[50%] lg:w-[48%] h-[85%] sm:h-[90%] lg:h-[92%] bg-[#FF5A0F] z-0 pointer-events-none transition-transform duration-300"
          style={{
            clipPath: 'polygon(20% 0%, 100% 0%, 100% 100%, 0% 100%, 12% 50%)',
            borderBottomLeftRadius: '180px',
          }}
        />

        {/* Contour arrondi fluide blanc autour de l'assiette dans le hero */}
        <div 
          className="hidden lg:block absolute top-12 right-12 w-[520px] h-[520px] bg-[#FF5A0F] rounded-full z-0 pointer-events-none"
          style={{
            boxShadow: '0 0 0 40px rgba(255, 255, 255, 0.15)'
          }}
        />

        {/* BARRE DE NAVIGATION */}
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-8 py-5 flex items-center justify-between">
          
          {/* Logo gauche (gras, foncé) */}
          <a href="#accueil" className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#111111] block transition-opacity hover:opacity-90">
            reinébène
          </a>

          {/* Liens de menu à droite (posés sur la zone orange) */}
          <nav className="hidden md:flex items-center gap-8 lg:gap-10 font-medium text-sm lg:text-base">
            <a href="#accueil" className="text-[#111111] font-bold border-b-2 border-[#111111] pb-0.5">
              Accueil
            </a>
            <a href="#menu" className="text-white/90 hover:text-white transition-colors">
              Menu
            </a>
            <a href="#apropos" className="text-white/90 hover:text-white transition-colors">
              À propos
            </a>
            <a href="#contact" className="text-white/90 hover:text-white transition-colors">
              Contact
            </a>
            <button 
              onClick={() => setReservationModalOpen(true)}
              className="bg-white text-[#FF5A0F] px-6 py-2.5 rounded-lg font-bold shadow-md hover:bg-orange-50 transition-all transform active:scale-95 cursor-pointer"
            >
              Réserver
            </button>
          </nav>

          {/* Boutons d'action rapides sur Mobile */}
          <div className="md:hidden flex items-center gap-2">
            <button 
              onClick={() => setOrderModalOpen(true)}
              className="bg-[#FF5A0F] text-white px-3 py-1.5 rounded-md text-xs font-bold shadow-xs active:scale-95 transition-transform flex items-center gap-1 cursor-pointer"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Commander</span>
            </button>
            <button 
              onClick={() => setReservationModalOpen(true)}
              className="border border-[#FF5A0F] text-[#FF5A0F] bg-white px-2.5 py-1.5 rounded-md text-xs font-bold active:scale-95 transition-transform cursor-pointer"
            >
              Réserver
            </button>
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#111111] focus:outline-hidden cursor-pointer"
              aria-label="Ouvrir le menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Menu Mobile déroulant fluide */}
        {mobileMenuOpen && (
          <div className="md:hidden relative z-30 bg-white border-b border-orange-100 px-6 py-5 space-y-4 shadow-xl animate-fadeIn">
            <a 
              href="#accueil" 
              onClick={() => setMobileMenuOpen(false)}
              className="block text-base font-semibold text-[#FF5A0F]"
            >
              Accueil
            </a>
            <a 
              href="#menu" 
              onClick={() => setMobileMenuOpen(false)}
              className="block text-base font-medium text-[#111111]"
            >
              Menu
            </a>
            <a 
              href="#apropos" 
              onClick={() => setMobileMenuOpen(false)}
              className="block text-base font-medium text-[#111111]"
            >
              À propos
            </a>
            <a 
              href="#contact" 
              onClick={() => setMobileMenuOpen(false)}
              className="block text-base font-medium text-[#111111]"
            >
              Contact
            </a>

            <div className="pt-2 border-t border-slate-100 grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setOrderModalOpen(true);
                }}
                className="w-full bg-[#FF5A0F] text-white py-2.5 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm active:scale-95 transition-transform"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Commander</span>
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setReservationModalOpen(true);
                }}
                className="w-full border border-[#FF5A0F] text-[#FF5A0F] py-2.5 rounded-lg text-xs font-bold active:scale-95 transition-transform"
              >
                Réserver table
              </button>
            </div>
          </div>
        )}

        {/* CONTENU HERO */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 pt-6 pb-16 lg:pt-12 lg:pb-24 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Colonne Gauche (Texte) */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Sur-titre script orange */}
            <span className="font-script text-[#FF5A0F] text-3xl sm:text-4xl block font-normal">
              Venez savourer
            </span>

            {/* Titre principal sur 2 lignes */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#111111] leading-[1.1] tracking-tight">
              Des saveurs africaines <br className="hidden sm:inline" />
              <span>sur </span>
              <span className="text-[#FF5A0F]">votre table.</span>
            </h1>

            {/* Paragraphe court fluide */}
            <p className="text-slate-600 text-base sm:text-lg max-w-lg leading-relaxed font-normal">
              Découvrez l'authenticité de notre cuisine africaine & caribéenne dans un cadre convivial, chaleureux et unique à Lomé.
            </p>

            {/* Boutons d'action Hero */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button 
                onClick={() => setOrderModalOpen(true)}
                className="bg-[#FF5A0F] text-white px-8 py-3.5 rounded-lg text-base font-semibold hover:bg-orange-600 transition-all shadow-md hover:shadow-lg transform active:scale-95 cursor-pointer flex items-center gap-2"
              >
                <ShoppingBag className="w-5 h-5" />
                <span>Commander</span>
              </button>
              <a 
                href="#menu"
                className="border border-[#FF5A0F] text-[#FF5A0F] px-8 py-3.5 rounded-lg text-base font-semibold hover:bg-orange-50 transition-colors transform active:scale-95 inline-block cursor-pointer"
              >
                Voir la sélection
              </a>
            </div>
          </div>

          {/* Colonne Droite (Image de l'assiette ronde avec accélération GPU 60 FPS) */}
          <div className="lg:col-span-5 relative flex justify-center lg:justify-end mt-4 lg:mt-0">
            <div className="relative w-72 h-72 sm:w-96 sm:h-96 lg:w-[440px] lg:h-[440px]">
              
              {/* Halo sous l'assiette */}
              <div className="absolute inset-0 rounded-full bg-white/20 p-3 shadow-2xl gpu-layer">
                {/* L'assiette ronde de plat */}
                <img 
                  src={IMAGES.hero} 
                  alt="Plat africain savoureux REINÉBÈNE" 
                  width={440}
                  height={440}
                  loading="eager"
                  decoding="async"
                  className="w-full h-full object-cover rounded-full shadow-2xl border-4 border-white transition-transform duration-500 hover:scale-[1.02] gpu-layer"
                  onError={(e) => {
                    const target = e.currentTarget;
                    target.style.display = 'none';
                  }}
                />
              </div>

            </div>
          </div>

        </div>

        {/* BORDURE DE FEUILLES DE SALADE VERTE TOUT EN BAS DU HERO (optimisée SVG) */}
        <div className="w-full relative z-10 -mt-8 sm:-mt-12 overflow-hidden leading-none select-none pointer-events-none">
          <svg className="w-full h-20 sm:h-28 lg:h-36 text-emerald-600" viewBox="0 0 1440 120" preserveAspectRatio="none">
            <defs>
              <linearGradient id="saladGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#22c55e" />
                <stop offset="35%" stopColor="#16a34a" />
                <stop offset="70%" stopColor="#15803d" />
                <stop offset="100%" stopColor="#22c55e" />
              </linearGradient>
            </defs>
            <path 
              fill="url(#saladGrad)" 
              d="M0,32 C60,10 120,60 180,20 C240,70 300,10 360,50 C420,15 480,65 540,25 C600,60 660,10 720,40 C780,15 840,65 900,30 C960,70 1020,20 1080,50 C1140,10 1200,60 1260,25 C1320,55 1380,15 1440,35 L1440,120 L0,120 Z" 
            />
            <path 
              fill="#15803d" 
              opacity="0.4"
              d="M0,50 C80,25 140,75 220,35 C300,85 380,30 460,70 C540,30 620,80 700,45 C780,25 860,75 940,40 C1020,80 1100,35 1180,75 C1260,30 1340,70 1440,50 L1440,120 L0,120 Z" 
            />
          </svg>
        </div>

      </header>


      {/* ==========================================
          2) SECTION OFFRE SPÉCIALE (Fond Orange Plein #FF5A0F)
      ========================================== */}
      <section className="relative w-full bg-[#FF5A0F] text-white py-16 lg:py-24 overflow-hidden">
        
        {/* Blob blanc organique à droite sur lequel repose le bol de plat */}
        <div 
          className="absolute top-1/2 -right-20 lg:-right-10 transform -translate-y-1/2 w-[350px] sm:w-[480px] lg:w-[600px] h-[350px] sm:h-[480px] lg:h-[600px] bg-white rounded-full opacity-95 -z-0 pointer-events-none gpu-layer"
          style={{
            borderRadius: '42% 58% 70% 30% / 45% 45% 55% 55%'
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Colonne Gauche */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Étiquette pilule contour blanc avec texte script */}
            <div>
              <span className="inline-block border border-white rounded-full px-6 py-1.5 text-white font-script text-xl sm:text-2xl tracking-wide bg-white/10">
                Offre spéciale
              </span>
            </div>

            {/* Gros titre blanc gras sur 2 lignes */}
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight tracking-tight">
              Profitez de -40% <br />
              <span className="text-3xl sm:text-4xl lg:text-5xl font-bold opacity-95">
                sur toute la carte
              </span>
            </h2>

            {/* Paragraphe blanc */}
            <p className="text-white/90 text-base sm:text-lg max-w-md font-normal leading-relaxed">
              Régalez-vous chez Reinébène avec vos plats préférés préparés chaque jour avec passion.
            </p>

            {/* Rangée de 3 miniatures rondes */}
            <div className="flex items-center gap-4 pt-2 pb-2">
              {[
                { img: IMAGES.offre1, name: "Poisson braisé", price: "5 000 FCFA" },
                { img: IMAGES.offre2, name: "Poulet colombo", price: "5 000 FCFA" },
                { img: IMAGES.offre3, name: "Riz créole", price: "5 000 FCFA" }
              ].map((item, idx) => {
                const isSelected = selectedOfferIndex === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => setSelectedOfferIndex(idx)}
                    className="focus:outline-hidden group cursor-pointer transition-transform transform active:scale-95"
                    title={`${item.name} (${item.price})`}
                  >
                    <div className={`relative w-20 h-20 sm:w-24 sm:h-24 rounded-full p-0.5 transition-all ${
                      isSelected 
                        ? 'ring-2 ring-white ring-offset-3 ring-offset-[#FF5A0F]' 
                        : 'border-2 border-white/80 hover:border-white'
                    }`}>
                      <img 
                        src={item.img} 
                        alt={item.name} 
                        width={96}
                        height={96}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover rounded-full shadow-md"
                      />
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Bouton contour blanc + note d'information */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button 
                onClick={() => {
                  const offerDishes = ["Poisson braisé", "Poulet colombo", "Riz créole aux crevettes"];
                  setOrderDish(`Offre -40% : ${offerDishes[selectedOfferIndex]}`);
                  setOrderModalOpen(true);
                }}
                className="border border-white text-white px-7 py-3 rounded-lg text-base font-semibold hover:bg-white hover:text-[#FF5A0F] transition-colors shadow-md active:scale-95 cursor-pointer flex items-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Profiter de l'offre</span>
              </button>

              <p className="text-white/80 text-xs sm:text-sm italic max-w-xs leading-snug">
                *Offre soumise à conditions en salle.
              </p>
            </div>

          </div>

          {/* Colonne Droite (Grand bol rond posé sur le blob blanc) */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end relative">
            <div className="relative w-72 h-72 sm:w-96 sm:h-96 lg:w-[420px] lg:h-[420px] z-10">
              <img 
                src={IMAGES.offreGrande} 
                alt="Plat à la carte chez Reinébène" 
                width={420}
                height={420}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover rounded-full shadow-2xl border-4 border-white transition-transform duration-500 hover:rotate-1 gpu-layer"
              />
            </div>
          </div>

        </div>

      </section>


      {/* ==========================================
          3) SECTION "NOS PLATS VEDETTES" (Fond Blanc)
      ========================================== */}
      <section id="menu" className="w-full bg-white py-20 lg:py-28 text-center scroll-mt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          
          {/* Header de la section */}
          <div className="mb-14 space-y-2">
            <span className="font-script text-[#FF5A0F] text-3xl sm:text-4xl block">
              Les plats de Reinébène
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
              <span className="text-[#FF5A0F]">Nos </span>
              <span className="text-[#111111]">plats vedettes</span>
            </h2>
            <p className="text-slate-500 text-sm sm:text-base max-w-md mx-auto pt-1">
              Découvrez les spécialités préférées de nos clients.
            </p>
          </div>

          {/* Grille des 3 cartes identiques en ligne (exactement comme sur la maquette) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-8 pt-6">
            {PLATS_VEDETTES.map((plat) => (
              <div 
                key={plat.id}
                className="relative bg-white border border-[#FF5A0F]/30 hover:border-[#FF5A0F] rounded-2xl pt-20 pb-6 px-6 text-center shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                
                {/* Image ronde du plat centrée en haut qui DÉBORDE au-dessus du cadre */}
                <div 
                  onClick={() => {
                    setOrderDish(`${plat.scriptPrefix} ${plat.title} (${plat.price})`);
                    setOrderModalOpen(true);
                  }}
                  className="absolute -top-16 left-1/2 transform -translate-x-1/2 w-32 h-32 sm:w-36 sm:h-36 rounded-full border-4 border-white shadow-md overflow-hidden bg-orange-50 group-hover:scale-105 transition-transform duration-300 cursor-pointer gpu-layer"
                >
                  <img 
                    src={plat.image} 
                    alt={plat.title} 
                    width={144}
                    height={144}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>

                {/* Contenu de la carte */}
                <div className="space-y-2 pt-2">
                  <div className="text-xl sm:text-2xl font-bold leading-tight">
                    <span className="font-script text-[#FF5A0F] text-2xl sm:text-3xl block -mb-1">
                      {plat.scriptPrefix}
                    </span>
                    <span className="text-[#FF5A0F] capitalize block font-extrabold">
                      {plat.title}
                    </span>
                  </div>

                  {/* Trait fin orange sous le titre */}
                  <div className="w-full h-[1px] bg-[#FF5A0F]/30 my-4" />
                </div>

                {/* En bas : bouton orange plein prix + texte -33% */}
                <div className="flex items-center justify-between pt-2">
                  <button 
                    onClick={() => {
                      setOrderDish(`${plat.scriptPrefix} ${plat.title} (${plat.price})`);
                      setOrderModalOpen(true);
                    }}
                    className="bg-[#FF5A0F] text-white text-xs sm:text-sm font-bold px-4 py-2.5 rounded-md hover:bg-orange-600 transition-colors shadow-xs active:scale-95 cursor-pointer flex items-center gap-1.5"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Prix {plat.price}</span>
                  </button>

                  <span className="text-[#FF5A0F] text-xs sm:text-sm font-extrabold tracking-wide">
                    {plat.discount}
                  </span>
                </div>

              </div>
            ))}
          </div>

        </div>
      </section>


      {/* ==========================================
          4) SECTION AVIS CLIENTS (Fond Blanc avec Touch Swipe 60 FPS)
      ========================================== */}
      <section 
        id="apropos" 
        className="w-full bg-white py-16 lg:py-24 text-center select-none touch-pan-y"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          
          {/* Header de la section */}
          <div className="mb-16 space-y-2">
            <span className="font-script text-[#FF5A0F] text-3xl sm:text-4xl block">
              Nos avis
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#FF5A0F] tracking-tight">
              Cuisine savoureuse & avis
            </h2>
            <p className="text-slate-500 text-sm sm:text-base max-w-md mx-auto pt-1">
              Ce que nos clients pensent de leur expérience chez Reinébène.
            </p>
          </div>

          {/* Grille de 3 cartes d'avis (dynamique selon la page de carrousel) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-8 pt-6 transition-opacity duration-300">
            {REVIEW_PAGES[activeReviewPage].map((avis) => (
              <div 
                key={avis.id}
                className="relative bg-white border border-[#FF5A0F]/30 hover:border-[#FF5A0F] rounded-2xl pt-12 pb-6 px-6 text-center shadow-xs transition-all duration-300 flex flex-col justify-between"
              >
                
                {/* Pastille ronde orange (avatar) centrée en haut */}
                <div className="absolute -top-7 left-1/2 transform -translate-x-1/2 w-14 h-14 bg-[#FF5A0F] rounded-full border-2 border-white shadow-md flex items-center justify-center text-white font-extrabold text-lg gpu-layer">
                  {avis.initials}
                </div>

                <div className="space-y-1">
                  <h3 className="text-lg font-extrabold text-[#111111] pt-2">
                    {avis.name}
                  </h3>
                  <p className="text-[#FF5A0F] text-xs font-semibold tracking-wide">
                    {avis.role}
                  </p>

                  {/* Texte de l'avis ~5 lignes justifié */}
                  <p className="text-slate-600 text-xs sm:text-sm text-justify leading-relaxed pt-3 px-1">
                    {avis.text}
                  </p>
                </div>

              </div>
            ))}
          </div>

          {/* Carrousel Pagination (4 points, le 2e actif en orange par défaut) */}
          <div className="flex items-center justify-center gap-3 mt-10">
            <button
              onClick={() => setActiveReviewPage((prev) => (prev - 1 + 4) % 4)}
              className="p-1 rounded-full text-slate-400 hover:text-[#FF5A0F] transition-colors cursor-pointer"
              aria-label="Avis précédents"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2">
              {[0, 1, 2, 3].map((pageIdx) => (
                <button
                  key={pageIdx}
                  onClick={() => setActiveReviewPage(pageIdx)}
                  className={`transition-all duration-200 rounded-full cursor-pointer ${
                    activeReviewPage === pageIdx
                      ? "w-8 h-2.5 bg-[#FF5A0F]"
                      : "w-2.5 h-2.5 bg-slate-300 hover:bg-slate-400"
                  }`}
                  aria-label={`Page avis ${pageIdx + 1}`}
                />
              ))}
            </div>

            <button
              onClick={() => setActiveReviewPage((prev) => (prev + 1) % 4)}
              className="p-1 rounded-full text-slate-400 hover:text-[#FF5A0F] transition-colors cursor-pointer"
              aria-label="Avis suivants"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

        </div>
      </section>


      {/* ==========================================
          5) BANNIÈRE FINALE "COMMANDER" (Pleine Largeur)
      ========================================== */}
      <section id="contact" className="relative w-full bg-[#FF5A0F] text-white py-16 sm:py-20 lg:py-24 px-6 sm:px-12 overflow-hidden">
        
        {/* Image de fond en transparence / superposition orange */}
        <img 
          src={IMAGES.banniere} 
          alt="Ingrédients et épices REINÉBÈNE" 
          width={1440}
          height={400}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-overlay pointer-events-none"
        />

        <div className="relative z-10 max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
          
          {/* Gauche : Textes */}
          <div className="space-y-1">
            <h2 className="text-white text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-wide">
              Commandez votre repas chez
            </h2>
            <span className="font-banner-script text-white text-6xl sm:text-8xl lg:text-9xl tracking-wide block -mt-2 drop-shadow-md">
              Reinébène
            </span>
          </div>

          {/* Droite : Gros bouton blanc arrondi */}
          <div>
            <button 
              onClick={() => setOrderModalOpen(true)}
              className="bg-white text-[#FF5A0F] px-10 py-4 sm:py-5 rounded-xl text-2xl sm:text-3xl font-extrabold hover:bg-orange-50 transition-all transform hover:scale-105 active:scale-95 shadow-2xl cursor-pointer flex items-center gap-3"
            >
              <ShoppingBag className="w-7 h-7 sm:w-8 sm:h-8" />
              <span>Commander</span>
            </button>
          </div>

        </div>
      </section>


      {/* ==========================================
          6) FOOTER (Plein Pied)
      ========================================== */}
      <footer className="w-full bg-white text-[#111111]">
        
        {/* Partie Haute du Footer */}
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10 flex flex-col md:flex-row items-center justify-between gap-6 border-b border-slate-100">
          
          {/* Gauche : Logo / Nom du site */}
          <div className="text-center md:text-left">
            <a href="#accueil" className="text-2xl font-extrabold tracking-tight text-[#111111] block">
              REINÉBÈNE
            </a>
          </div>

          {/* Centre : Deux liens avec petite puce */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs sm:text-sm text-slate-600 font-medium">
            <button 
              onClick={() => setModalTermsOpen(true)}
              className="hover:text-[#FF5A0F] transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <span className="text-[#FF5A0F]">•</span> Conditions générales
            </button>
            <button 
              onClick={() => setModalPrivacyOpen(true)}
              className="hover:text-[#FF5A0F] transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <span className="text-[#FF5A0F]">•</span> Politique de confidentialité
            </button>
          </div>

          {/* Droite : 3 icônes sociales rondes orange */}
          <div className="flex items-center gap-3">
            <a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noreferrer"
              className="w-9 h-9 rounded-full bg-[#FF5A0F] text-white flex items-center justify-center hover:opacity-90 transition-opacity shadow-xs"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-4 h-4 fill-white text-white" />
            </a>
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noreferrer"
              className="w-9 h-9 rounded-full bg-[#FF5A0F] text-white flex items-center justify-center hover:opacity-90 transition-opacity shadow-xs"
              aria-label="Instagram"
            >
              <Instagram className="w-4 h-4 text-white" />
            </a>
            <a 
              href="https://facebook.com" 
              target="_blank" 
              rel="noreferrer"
              className="w-9 h-9 rounded-full bg-[#FF5A0F] text-white flex items-center justify-center hover:opacity-90 transition-opacity shadow-xs"
              aria-label="Facebook"
            >
              <Facebook className="w-4 h-4 fill-white text-white" />
            </a>
          </div>

        </div>

        {/* Tout en bas : Fine barre orange pleine largeur */}
        <div className="w-full bg-[#FF5A0F] text-white text-center py-3.5 px-4 text-xs sm:text-sm font-normal tracking-wide leading-relaxed font-outfit">
          © 2026 REINÉBÈNE — Lomé, Togo (proche du Carrefour AISED) — Ouvert du mardi au dimanche de 07h à 23h, fermé le lundi
        </div>

      </footer>


      {/* ==========================================
          MODALES INTERACTIVES FLUIDES & PERFORMANCE
      ========================================== */}

      {/* Modal Réservation */}
      {reservationModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl relative border border-orange-100 gpu-layer">
            <button 
              onClick={() => setReservationModalOpen(false)}
              className="absolute top-4 right-4 p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center mb-6">
              <span className="font-script text-[#FF5A0F] text-2xl block">Réserver une table</span>
              <h3 className="text-2xl font-extrabold text-[#111111]">REINÉBÈNE Lomé</h3>
              <p className="text-xs text-slate-500 mt-1">Ouvert du mardi au dimanche de 07h à 23h · Proche Carrefour AISED</p>
            </div>

            <form onSubmit={handleSendReservation} className="space-y-4 text-left">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Votre Nom complet</label>
                <input 
                  type="text" 
                  required
                  placeholder="ex : Koffi Mensah"
                  value={resName}
                  onChange={(e) => setResName(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-hidden focus:border-[#FF5A0F]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Date</label>
                  <input 
                    type="date" 
                    required
                    value={resDate}
                    onChange={(e) => setResDate(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-hidden focus:border-[#FF5A0F]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Heure</label>
                  <select 
                    value={resTime}
                    onChange={(e) => setResTime(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-hidden focus:border-[#FF5A0F]"
                  >
                    <option>12:00</option>
                    <option>12:30</option>
                    <option>13:00</option>
                    <option>19:00</option>
                    <option>19:30</option>
                    <option>20:00</option>
                    <option>20:30</option>
                    <option>21:00</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Nombre de personnes</label>
                <select 
                  value={resGuests}
                  onChange={(e) => setResGuests(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-hidden focus:border-[#FF5A0F]"
                >
                  <option value="1">1 personne</option>
                  <option value="2">2 personnes</option>
                  <option value="4">4 personnes</option>
                  <option value="6">6+ personnes</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Note particulière (Optionnel)</label>
                <textarea 
                  rows={2}
                  placeholder="Anniversaire, table au calme, demande spéciale..."
                  value={resNote}
                  onChange={(e) => setResNote(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-hidden focus:border-[#FF5A0F]"
                />
              </div>

              <button 
                type="submit"
                className="w-full bg-[#FF5A0F] text-white py-3 rounded-lg font-bold text-sm hover:bg-orange-600 transition-colors shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-98"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Confirmer la réservation via WhatsApp</span>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Modal Commande Express */}
      {orderModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl relative border border-orange-100 gpu-layer">
            <button 
              onClick={() => setOrderModalOpen(false)}
              className="absolute top-4 right-4 p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center mb-6">
              <span className="font-script text-[#FF5A0F] text-2xl block">Commande express</span>
              <h3 className="text-2xl font-extrabold text-[#111111]">Passer commande</h3>
              <p className="text-xs text-slate-500 mt-1">Lomé, Togo · Sur place, à emporter ou livraison</p>
            </div>

            <form onSubmit={handleSendOrderForm} className="space-y-4 text-left">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Plat sélectionné</label>
                <select 
                  value={orderDish}
                  onChange={(e) => setOrderDish(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm font-semibold text-[#FF5A0F] focus:outline-hidden focus:border-[#FF5A0F]"
                >
                  <option>Poisson braisé & attiéké (5 000 FCFA)</option>
                  <option>Poulet colombo antillais (5 000 FCFA)</option>
                  <option>Riz créole aux crevettes (5 000 FCFA)</option>
                  <option>Offre spéciale -40% Dégustation</option>
                  <option>Bokit guadeloupéen & frites maison</option>
                  <option>Accras de morue croustillants</option>
                  <option>Grillades kankan & bananes alloco</option>
                  <option>Autre plat (À préciser en note)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Votre Nom</label>
                <input 
                  type="text" 
                  required
                  placeholder="ex : Ablavi Lawson"
                  value={orderName}
                  onChange={(e) => setOrderName(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-hidden focus:border-[#FF5A0F]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Numéro de téléphone</label>
                <input 
                  type="tel" 
                  required
                  placeholder="ex : +228 90 00 00 00"
                  value={orderPhone}
                  onChange={(e) => setOrderPhone(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-hidden focus:border-[#FF5A0F]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Accompagnement & Instructions</label>
                <textarea 
                  rows={2}
                  placeholder="Attiéké, alloco, frites, piment doux, adresse de livraison..."
                  value={orderNotes}
                  onChange={(e) => setOrderNotes(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-hidden focus:border-[#FF5A0F]"
                />
              </div>

              <div className="space-y-2 pt-1">
                <button 
                  type="submit"
                  className="w-full bg-[#FF5A0F] text-white py-3 rounded-lg font-bold text-sm hover:bg-orange-600 transition-colors shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Envoyer la commande sur WhatsApp</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleOpenWhatsAppOrder()}
                  className="w-full text-center text-xs text-slate-500 hover:text-[#FF5A0F] py-1 cursor-pointer transition-colors"
                >
                  Ou discuter directement avec l'équipe sur WhatsApp
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Conditions Générales */}
      {modalTermsOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl relative max-h-[80vh] overflow-y-auto gpu-layer">
            <button 
              onClick={() => setModalTermsOpen(false)}
              className="absolute top-4 right-4 p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-extrabold text-[#111111] mb-4 flex items-center gap-2">
              <Info className="w-5 h-5 text-[#FF5A0F]" /> Conditions Générales de Vente
            </h3>

            <div className="text-xs text-slate-600 space-y-3 leading-relaxed">
              <p><strong>1. Identification de l'établissement :</strong> REINÉBÈNE — Cuisine africaine & caribéenne, situé à Lomé, Togo, proche du Carrefour AISED.</p>
              <p><strong>2. Horaires d'ouverture :</strong> Ouvert du mardi au dimanche de 07h00 à 23h00. Fermé le lundi.</p>
              <p><strong>3. Réservations & Commandes :</strong> Les réservations et commandes s'effectuent par téléphone ou directement via WhatsApp officiel (+228 93 42 74 82).</p>
              <p><strong>4. Tarifs :</strong> Les prix sont affichés en Francs CFA (FCFA) toutes taxes comprises.</p>
            </div>

            <button 
              onClick={() => setModalTermsOpen(false)}
              className="mt-6 w-full bg-[#FF5A0F] text-white py-2.5 rounded-lg font-bold text-xs cursor-pointer active:scale-98"
            >
              Fermer
            </button>
          </div>
        </div>
      )}

      {/* Modal Politique de Confidentialité */}
      {modalPrivacyOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl relative max-h-[80vh] overflow-y-auto gpu-layer">
            <button 
              onClick={() => setModalPrivacyOpen(false)}
              className="absolute top-4 right-4 p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-extrabold text-[#111111] mb-4 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#FF5A0F]" /> Politique de Confidentialité
            </h3>

            <div className="text-xs text-slate-600 space-y-3 leading-relaxed">
              <p>Chez REINÉBÈNE, nous accordons une importance primordiale au respect de vos données personnelles.</p>
              <p><strong>Utilisation des données :</strong> Les informations transmises lors de votre réservation ou commande (Nom, Téléphone) servent uniquement au traitement de votre demande par notre équipe.</p>
              <p><strong>Engagement :</strong> Aucune donnée personnelle n'est cédée ni vendue à des tiers.</p>
            </div>

            <button 
              onClick={() => setModalPrivacyOpen(false)}
              className="mt-6 w-full bg-[#FF5A0F] text-white py-2.5 rounded-lg font-bold text-xs cursor-pointer active:scale-98"
            >
              Fermer
            </button>
          </div>
        </div>
      )}

      {/* BOUTON FLOTTANT COMMANDER RAPIDE (Optimisé 60 FPS mobile, masqué quand une modale est ouverte) */}
      {!reservationModalOpen && !orderModalOpen && !modalTermsOpen && !modalPrivacyOpen && (
        <div className="fixed bottom-5 right-5 z-40 gpu-layer">
          <button
            onClick={() => setOrderModalOpen(true)}
            className="group bg-[#FF5A0F] text-white px-5 py-3 rounded-full font-bold shadow-xl hover:bg-orange-600 active:scale-95 transition-all flex items-center gap-2.5 cursor-pointer border-2 border-white"
            aria-label="Passer commande"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white"></span>
            </span>
            <ShoppingBag className="w-4 h-4" />
            <span className="text-sm font-bold tracking-tight">Commander</span>
          </button>
        </div>
      )}

    </div>
  );
}
