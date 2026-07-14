import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setTab } from "../../store";
import { 
  ArrowRight, 
  Star, 
  Shield, 
  Award, 
  Calendar, 
  CheckCircle, 
  Wifi, 
  Tv, 
  Wind, 
  Coffee, 
  MapPin, 
  ChevronLeft, 
  ChevronRight, 
  X, 
  Sparkles,
  Phone,
  Mail,
  Compass,
  Utensils
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const hotelImages = [
  {
    url: "https://res.cloudinary.com/cpusqoyy/image/upload/f_auto,q_auto,dpr_auto,w_1920,c_fill,g_auto/v1783758085/0V1A3647_ivxcem.jpg",
    title: "Elegant Boutique Rooms & Premium Guest Suites",
    subtitle: "A modern, highly safe, and serene environment welcoming you to Sawla",
  },
  {
    url: "https://res.cloudinary.com/cpusqoyy/image/upload/f_auto,q_auto,dpr_auto,w_1920,c_fill,g_auto/v1783760814/0V1A3628_tl0tdr.jpg",
    title: "Luxury Queen Suite & Premium Linen",
    subtitle: "Experience bespoke comfort and meticulous custom room setups",
  },
  {
    url: "https://res.cloudinary.com/cpusqoyy/image/upload/f_auto,q_auto,dpr_auto,w_1920,c_fill,g_auto/v1783760813/0V1A3652_foedgo.jpg",
    title: "Deluxe Modern Restrooms",
    subtitle: "Impeccably clean, fully-stocked, and safe private ensuite amenities",
  },
  {
    url: "https://res.cloudinary.com/cpusqoyy/image/upload/f_auto,q_auto,dpr_auto,w_1920,c_fill,g_auto/v1783760805/0V1A3496_c7npdk.jpg",
    title: "The Executive Dining Room",
    subtitle: "Savor gourmet meals and local culinary delicacies in absolute elegance",
  },
  {
    url: "https://res.cloudinary.com/cpusqoyy/image/upload/f_auto,q_auto,dpr_auto,w_1920,c_fill,g_auto/v1783760802/0V1A3580_lvirqe.jpg",
    title: "Charming Boutique Guest Lounge",
    subtitle: "Relax or network with colleagues in our warm, beautifully designed lounge",
  },
  {
    url: "https://res.cloudinary.com/cpusqoyy/image/upload/f_auto,q_auto,dpr_auto,w_1920,c_fill,g_auto/v1783760791/0V1A3568_bdc8wc.jpg",
    title: "The Boardroom & Meeting Hub",
    subtitle: "A fully equipped collaborative space optimized for corporate workshops and regional conferences",
  },
  {
    url: "https://res.cloudinary.com/cpusqoyy/image/upload/f_auto,q_auto,dpr_auto,w_1920,c_fill,g_auto/v1783760786/0V1A3615_jbyjae.jpg",
    title: "Premium Double Deluxe Room",
    subtitle: "Cozy twin bed layouts optimized for business partners and travelers alike",
  },
  {
    url: "https://res.cloudinary.com/cpusqoyy/image/upload/f_auto,q_auto,dpr_auto,w_1920,c_fill,g_auto/v1783760844/0V1A3514_h8qh72.jpg",
    title: "Fine Dining & Breakfast Bar",
    subtitle: "Enjoy refreshing beverages and exquisite dishes prepared daily by our chefs",
  },
  {
    url: "https://res.cloudinary.com/cpusqoyy/image/upload/f_auto,q_auto,dpr_auto,w_1920,c_fill,g_auto/v1783760850/0V1A3535_i1ceqd.jpg",
    title: "Boutique Cafe & Refreshment Hub",
    subtitle: "Sip outstanding local coffee blends and fresh mocktails in a welcoming environment",
  },
  {
    url: "https://res.cloudinary.com/cpusqoyy/image/upload/f_auto,q_auto,dpr_auto,w_1920,c_fill,g_auto/v1783760835/0V1A3533_hntj6e.jpg",
    title: "Modern Workspace Lounge",
    subtitle: "Productive breakout seating areas designed specifically for business remote professionals",
  },
];

const sightseeingPlaces = [
  {
    title: "Mt. Gughe Cloud Forests",
    desc: "Trek up the tallest peaks of Gofa to witness cloud forest canopies, organic highland plantations, and majestic vistas of the Rift Valley.",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80",
    tip: "Bring a light fleece as temperatures drop rapidly above 2,000m.",
    altitude: "1,950m - 2,700m",
    timeNeeded: "Full Day Tour"
  },
  {
    title: "Cultural Coffee Ceremony",
    desc: "Experience the deep aroma of slow-roasted Gofa Arabica beans, hand-poured in custom clay pots accompanied by freshly popped popcorn and local sweet-herbs.",
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80",
    tip: "Accept at least three cups (Abol, Tona, Baraka) as custom dictates.",
    altitude: "1,950m",
    timeNeeded: "1 - 2 Hours"
  },
  {
    title: "Sawla Highland Central Market",
    desc: "An energetic open-air trading post where Gofa communities exchange handmade bamboo basketry, organic mountain spices, and traditional cotton shawls.",
    image: "https://images.unsplash.com/photo-1533900298318-6b8da08a523e?auto=format&fit=crop&w=800&q=80",
    tip: "Best visited on Tuesday and Saturday mornings when trading peaks.",
    altitude: "1,940m",
    timeNeeded: "Half Day Tour"
  },
  {
    title: "Dorze Bamboo Dome Village",
    desc: "Behold the towering 12-meter bamboo structures resembling beehives, crafted by master Dorze weavers who preserve age-old spinning traditions.",
    image: "https://images.unsplash.com/photo-1547989453-11e67ffb3885?auto=format&fit=crop&w=800&q=80",
    tip: "Try the traditional Kocho flatbread prepared from false banana stalks.",
    altitude: "2,400m",
    timeNeeded: "Half Day Tour"
  }
];

export default function HomeHero() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [bgIndex, setBgIndex] = React.useState(0);
  const [currentTime, setCurrentTime] = React.useState(new Date());
  
  // Conference carousel state
  const [confIndex, setConfIndex] = React.useState(0);
  const conferenceImages = [
    "https://res.cloudinary.com/cpusqoyy/image/upload/v1783768436/0V1A3568_cb5a05.jpg",
    "https://res.cloudinary.com/cpusqoyy/image/upload/v1783768391/0V1A3574_khwj2b.jpg",
    "https://res.cloudinary.com/cpusqoyy/image/upload/v1783760802/0V1A3580_lvirqe.jpg",
    "https://res.cloudinary.com/cpusqoyy/image/upload/v1783768677/0V1A3582_jrconh.jpg"
  ];

  const nextConf = () => setConfIndex((prev) => (prev + 1) % conferenceImages.length);
  const prevConf = () => setConfIndex((prev) => (prev - 1 + conferenceImages.length) % conferenceImages.length);

  // Sightseeing list state
  const [sightseeingIndex, setSightseeingIndex] = React.useState(0);
  const [selectedSightseeing, setSelectedSightseeing] = React.useState<typeof sightseeingPlaces[0] | null>(null);

  // Subscribe form state
  const [subForm, setSubForm] = React.useState({ name: "", email: "", phone: "" });
  const [subSuccess, setSubSuccess] = React.useState(false);

  React.useEffect(() => {
    const bgInterval = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % hotelImages.length);
    }, 6000);

    const clockInterval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      clearInterval(bgInterval);
      clearInterval(clockInterval);
    };
  }, []);

  const nextBg = () => setBgIndex((prev) => (prev + 1) % hotelImages.length);
  const prevBg = () => setBgIndex((prev) => (prev - 1 + hotelImages.length) % hotelImages.length);

  // Redirection handler keeping tabs in sync with Router
  const handleNavigate = (tab: "HOME" | "ROOMS" | "CONFERENCE" | "LOOKUP" | "ABOUT" | "BOOK_NOW", path: string) => {
    dispatch(setTab(tab));
    navigate(path);
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (subForm.name && subForm.email) {
      setSubSuccess(true);
      setTimeout(() => {
        setSubSuccess(false);
        setSubForm({ name: "", email: "", phone: "" });
      }, 5000);
    }
  };

  const dayOfWeek = currentTime.toLocaleDateString("en-US", { weekday: "long", timeZone: "Africa/Addis_Ababa" });
  const formattedDate = currentTime.toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Africa/Addis_Ababa"
  });

  const nextSightseeing = () => {
    setSightseeingIndex((prev) => (prev + 1) % (sightseeingPlaces.length - 2));
  };

  const prevSightseeing = () => {
    setSightseeingIndex((prev) => (prev - 1 + (sightseeingPlaces.length - 2)) % (sightseeingPlaces.length - 2));
  };

  return (
    <div className="flex flex-col w-full bg-slate-50 animate-fade-in">
      {/* Main Hero Header Section with sliding background carousel */}
      <section className="relative w-full min-h-[550px] sm:min-h-[620px] flex items-center justify-center overflow-hidden bg-slate-950 text-white py-16 sm:py-24 px-4 sm:px-6 lg:px-8 text-center rounded-b-[40px] shadow-lg mb-12">
        {/* Sliding Background Images */}
        <div className="absolute inset-0 z-0">
          <AnimatePresence>
            <motion.div
              key={bgIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.0, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <img
                src={hotelImages[bgIndex].url}
                alt={hotelImages[bgIndex].title}
                className="w-full h-full object-cover object-center filter brightness-105 contrast-105"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          </AnimatePresence>
          {/* Pure, clear premium gradient: preserves image quality and sharpness in the center, with soft shadow vignettes at the borders */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/10 to-black/80 z-10" />
        </div>

        {/* Hero Content Area */}
        <div className="relative z-20 max-w-4xl mx-auto flex flex-col items-center gap-6">
          <div className="inline-flex items-center gap-1.5 bg-black/40 border border-white/20 text-white/90 px-4 py-1.5 rounded-full text-xs font-accent uppercase tracking-widest backdrop-blur-md shadow-md">
            <Star className="w-3.5 h-3.5 fill-indigo-400 text-indigo-400 animate-pulse-slow" />
            Boutique Guest House • Sawla, Ethiopia
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-medium text-white tracking-tight leading-tight max-w-3xl drop-shadow-[0_4px_12px_rgba(0,0,0,0.85)]">
            Where Comfort Meets <span className="text-indigo-300 underline decoration-indigo-200 decoration-wavy underline-offset-4">Distinction</span>
          </h1>
          
          <p className="text-white text-sm sm:text-base md:text-lg font-mono leading-relaxed max-w-2xl bg-black/50 py-2.5 px-6 rounded-2xl backdrop-blur-md border border-white/10 shadow-xl">
            "Your Home Away from Home in the Heart of Sawla."
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-4 w-full sm:w-auto">
            <button
              onClick={() => handleNavigate("BOOK_NOW", "/book-now")}
              className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white font-bold px-8 py-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 text-base cursor-pointer font-sans border border-indigo-500/30"
            >
              Check Room Availability
              <ArrowRight className="w-5 h-5" />
            </button>
            <button
              onClick={() => handleNavigate("ROOMS", "/rooms")}
              className="w-full sm:w-auto border border-white/30 hover:border-white/60 bg-white/10 hover:bg-white/20 active:scale-95 text-white font-semibold px-8 py-4 rounded-xl transition-all text-base cursor-pointer font-sans backdrop-blur-md"
            >
              Explore Rooms
            </button>
          </div>

          {/* Micro-controls and Current slide title */}
          <div className="mt-8 flex flex-col items-center gap-2">
            <p className="text-[10px] sm:text-xs font-accent text-slate-300 uppercase tracking-widest bg-slate-950/60 px-4 py-1.5 rounded-full backdrop-blur-md border border-white/10 shadow-sm">
              Current View: <span className="text-indigo-300 font-bold">{hotelImages[bgIndex].title}</span>
            </p>
            <div className="flex items-center gap-3 mt-1">
              <button
                onClick={prevBg}
                className="text-white/70 hover:text-white bg-white/10 hover:bg-white/25 w-8 h-8 flex items-center justify-center rounded-full transition-all cursor-pointer text-xs"
                title="Previous Image"
              >
                &#10094;
              </button>
              <div className="flex gap-1.5">
                {hotelImages.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setBgIndex(i)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${bgIndex === i ? "w-6 bg-indigo-400" : "w-1.5 bg-white/30 hover:bg-white/50"}`}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>
              <button
                onClick={nextBg}
                className="text-white/70 hover:text-white bg-white/10 hover:bg-white/25 w-8 h-8 flex items-center justify-center rounded-full transition-all cursor-pointer text-xs"
                title="Next Image"
              >
                &#10095;
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ----------------- REDESIGNED AREA TO MATCH ETHIOPIAN SKYLIGHT HOTEL SCREENSHOT ----------------- */}

      {/* 1. Welcome to Dream Hotel Section */}
      <section className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
          {/* Welcome Date/Time Widget */}
          <div className="lg:col-span-2 relative h-64 md:h-80 w-full rounded-2xl overflow-hidden shadow-lg border border-slate-200 group">
            <img 
              src="https://res.cloudinary.com/cpusqoyy/image/upload/f_auto,q_auto,dpr_auto,w_800,c_limit/v1783767610/0V1A3528_lel5sc.jpg" 
              alt="Dream Hotel Exterior" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/50 to-indigo-950/30" />
            
            {/* Widget Content */}
            <div className="absolute inset-0 p-8 flex flex-col justify-between text-white z-10">
              <div>
                <span className="text-xs font-accent uppercase tracking-widest text-indigo-300 font-bold">Local Spotlight</span>
                <p className="text-xs text-slate-300 font-mono mt-1">EAT (UTC +3) Standard Time</p>
              </div>
              
              <div>
                <h3 className="text-3xl md:text-4xl font-serif font-medium tracking-tight text-white mb-1">
                  {dayOfWeek}
                </h3>
                <p className="text-sm font-mono text-slate-200">
                  {formattedDate}
                </p>
                <div className="flex items-center gap-2 mt-3 text-xs font-mono text-indigo-300 bg-black/40 py-1.5 px-3 rounded-lg w-fit border border-white/10">
                  <span className="animate-ping w-1.5 h-1.5 rounded-full bg-indigo-400 shrink-0"></span>
                  Sawla, Gofa, Ethiopia
                </div>
              </div>
            </div>
          </div>

          {/* Welcome Text Content */}
          <div className="lg:col-span-3 flex flex-col justify-center h-full">
            <h2 className="text-3xl sm:text-4xl font-serif font-medium text-slate-950 tracking-tight mb-6">
              Welcome to Dream Hotel.
            </h2>
            <div className="space-y-4 text-slate-600 text-sm sm:text-base leading-relaxed font-sans">
              <p>
                A striking boutique property with elegant local design and outstanding security features in a prime location. Dream Hotel promises business executives, regional conference delegates, and leisure travelers an unforgettable stay.
              </p>
              <p>
                Be spoilt for choice with comfortably modern guest accommodations, customized configuration setups, and dedicated local catering. Every room is meticulously sanitized and offers dynamic workspace, high-grade personal digital vaults, and persistent high-speed internet.
              </p>
              <p>
                If you are planning an educational workshop, high-level municipal meeting, or family celebration, our dedicated banquet halls and panoramic rooftop recreation decks are equipped with modern audiovisual devices to elevate your gatherings with ultimate elegance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Key Feature Icons Row */}
      <section className="bg-white border-y border-slate-200 py-10 px-4 sm:px-6 lg:px-8 shadow-sm">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          <div className="flex flex-col items-center text-center p-3">
            <div className="p-3 bg-indigo-50 rounded-full text-indigo-600 mb-3">
              <MapPin className="w-5 h-5" />
            </div>
            <p className="text-[11px] font-mono font-medium text-slate-800 leading-snug">
              Walking distance from Center
            </p>
          </div>

          <div className="flex flex-col items-center text-center p-3">
            <div className="p-3 bg-indigo-50 rounded-full text-indigo-600 mb-3">
              <Coffee className="w-5 h-5" />
            </div>
            <p className="text-[11px] font-mono font-medium text-slate-800 leading-snug">
              Newly Furnished & Spacious Rooms
            </p>
          </div>

          <div className="flex flex-col items-center text-center p-3">
            <div className="p-3 bg-indigo-50 rounded-full text-indigo-600 mb-3">
              <Award className="w-5 h-5" />
            </div>
            <p className="text-[11px] font-mono font-medium text-slate-800 leading-snug">
              Conference & Meeting Halls
            </p>
          </div>

          <div className="flex flex-col items-center text-center p-3">
            <div className="p-3 bg-indigo-50 rounded-full text-indigo-600 mb-3">
              <Calendar className="w-5 h-5" />
            </div>
            <p className="text-[11px] font-mono font-medium text-slate-800 leading-snug">
              24hrs Attentive Front Desk
            </p>
          </div>

          <div className="flex flex-col items-center text-center p-3">
            <div className="p-3 bg-indigo-50 rounded-full text-indigo-600 mb-3">
              <Wifi className="w-5 h-5" />
            </div>
            <p className="text-[11px] font-mono font-medium text-slate-800 leading-snug">
              High Speed Free Wi-Fi
            </p>
          </div>

          <div className="flex flex-col items-center text-center p-3">
            <div className="p-3 bg-indigo-50 rounded-full text-indigo-600 mb-3">
              <Shield className="w-5 h-5" />
            </div>
            <p className="text-[11px] font-mono font-medium text-slate-800 leading-snug">
              Highly Secure and Safe
            </p>
          </div>
        </div>
      </section>

      {/* 3. Alternating Category Spotlights (Rooms, Dining, Events, Recreations) */}
      <section className="py-16 space-y-24 bg-slate-100/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
          
          {/* Spotlight 1: Rooms & Suites */}
          <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Overlay Text Card */}
            <div className="lg:col-span-5 bg-white p-8 md:p-10 rounded-2xl shadow-md border border-slate-200/80 z-10 lg:translate-x-6 relative order-2 lg:order-1">
              <h3 className="text-2xl md:text-3xl font-serif font-medium text-slate-900 mb-4">
                Superior Twin Rooms
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-6 font-sans">
                Spread over an area of 26 sq. m., the Superior Twin Rooms offers 2 × single beds and are the perfect choice for a relaxing and comfortable stay. Offering gorgeous views of the highland valleys and coming with a plethora of complimentary facilities to ensure that you have an incredibly comfortable stay.
              </p>
              <button
                onClick={() => handleNavigate("ROOMS", "/rooms")}
                className="inline-block border border-amber-600 text-amber-700 hover:bg-amber-600 hover:text-white transition-all py-2.5 px-6 font-accent text-xs tracking-widest font-semibold uppercase rounded cursor-pointer"
              >
                VIEW DETAIL
              </button>
            </div>
            {/* Large Image Block */}
             <div className="lg:col-span-7 h-80 sm:h-96 md:h-[450px] rounded-3xl overflow-hidden shadow-lg border border-slate-200 relative order-1 lg:order-2">
                <img
                  src="https://res.cloudinary.com/cpusqoyy/image/upload/f_auto,q_auto,dpr_auto,w_1200,c_limit/v1783768011/0V1A3512_vsen2s.jpg"
                  srcSet={`
                    https://res.cloudinary.com/cpusqoyy/image/upload/f_auto,q_auto,dpr_auto,w_768,c_limit/v1783768011/0V1A3512_vsen2s.jpg 768w,
                    https://res.cloudinary.com/cpusqoyy/image/upload/f_auto,q_auto,dpr_auto,w_1200,c_limit/v1783768011/0V1A3512_vsen2s.jpg 1200w,
                    https://res.cloudinary.com/cpusqoyy/image/upload/f_auto,q_auto,dpr_auto,w_1600,c_limit/v1783768011/0V1A3512_vsen2s.jpg 1600w
                  `}
                  sizes="(max-width: 768px) 100vw,
                        (max-width: 1024px) 90vw,
                        58vw"
                  alt="Superior Twin Rooms"
                  className="w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                  fetchPriority="low"
                  referrerPolicy="no-referrer"
                />
            </div>
          </div>

          {/* Spotlight 2: Dining */}
          <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Large Image Block */}
            <div className="lg:col-span-7 h-80 sm:h-96 md:h-[450px] rounded-3xl overflow-hidden shadow-lg border border-slate-200 relative order-1">
              <img 
              src="https://res.cloudinary.com/cpusqoyy/image/upload/f_auto,q_auto,dpr_auto,w_1200,c_limit/v1783951364/2U0B0210_vj9jmx.jpg"
                  srcSet={`
                    https://res.cloudinary.com/cpusqoyy/image/upload/f_auto,q_auto,dpr_auto,w_768,c_limit/v1783951364/2U0B0210_vj9jmx.jpg 768w,
                    https://res.cloudinary.com/cpusqoyy/image/upload/f_auto,q_auto,dpr_auto,w_1200,c_limit/v1783951364/2U0B0210_vj9jmx.jpg 1200w,
                    https://res.cloudinary.com/cpusqoyy/image/upload/f_auto,q_auto,dpr_auto,w_1600,c_limit/v1783951364/2U0B0210_vj9jmx.jpg 1600w
                  `}
                  sizes="(max-width: 768px) 100vw,
                        (max-width: 1024px) 90vw,
                        58vw"
                alt="Dining" 
                className="w-full h-full object-cover"
                 loading="lazy"
                  decoding="async"
                  fetchPriority="low"
                referrerPolicy="no-referrer"
              />
            </div>
            {/* Overlay Text Card */}
            <div className="lg:col-span-5 bg-white p-8 md:p-10 rounded-2xl shadow-md border border-slate-200/80 z-10 lg:-translate-x-6 relative order-2">
              <h3 className="text-2xl md:text-3xl font-serif font-medium text-slate-900 mb-4">
                Dining & Gathering
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-6 font-sans">
                Experience authentic local dining and traditional coffee gatherings right inside Gofa Zone. From freshly roasted organic coffee beans served with mountain herbs to delightful Ethiopian and continental plates prepared by skilled culinary experts, we provide excellent catering for conferences and private guests.
              </p>
              <button
                onClick={() => handleNavigate("ABOUT", "/about")}
                className="inline-block border border-amber-600 text-amber-700 hover:bg-amber-600 hover:text-white transition-all py-2.5 px-6 font-accent text-xs tracking-widest font-semibold uppercase rounded cursor-pointer"
              >
                VIEW DETAIL
              </button>
            </div>
          </div>

          {/* Spotlight 3: Events */}
          <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Overlay Text Card */}
            <div className="lg:col-span-5 bg-white p-8 md:p-10 rounded-2xl shadow-md border border-slate-200/80 z-10 lg:translate-x-6 relative order-2 lg:order-1">
              <h3 className="text-2xl md:text-3xl font-serif font-medium text-slate-900 mb-4">
                Events & Conferences
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-6 font-sans">
                If you are looking for a state-of-the-art venue to conduct regional training workshops, corporate summits, or local weddings, our G+4 banquet and meeting facility offers hosting for up to 150 delegates. Configured with high-fidelity microphones, visual projection screens, and robust seating layouts.
              </p>
              <button
                onClick={() => handleNavigate("CONFERENCE", "/conference")}
                className="inline-block border border-amber-600 text-amber-700 hover:bg-amber-600 hover:text-white transition-all py-2.5 px-6 font-accent text-xs tracking-widest font-semibold uppercase rounded cursor-pointer"
              >
                VIEW DETAIL
              </button>
            </div>
            {/* Large Image Block */}
            <div className="lg:col-span-7 h-80 sm:h-96 md:h-[450px] rounded-3xl overflow-hidden shadow-lg border border-slate-200 relative order-1 lg:order-2">
              {/* <img 
                src="https://res.cloudinary.com/cpusqoyy/image/upload/v1783760802/0V1A3580_lvirqe.jpg" 
                alt="Conference Hall" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              /> */}
              <img 
              src="https://res.cloudinary.com/cpusqoyy/image/upload/f_auto,q_auto,dpr_auto,w_1200,c_limit/v1783760802/0V1A3580_lvirqe.jpg"
                  srcSet={`
                    https://res.cloudinary.com/cpusqoyy/image/upload/f_auto,q_auto,dpr_auto,w_768,c_limit/v1783760802/0V1A3580_lvirqe.jpg 768w,
                    https://res.cloudinary.com/cpusqoyy/image/upload/f_auto,q_auto,dpr_auto,w_1200,c_limit/v1783760802/0V1A3580_lvirqe.jpg 1200w,
                    https://res.cloudinary.com/cpusqoyy/image/upload/f_auto,q_auto,dpr_auto,w_1600,c_limit/v1783760802/0V1A3580_lvirqe.jpg 1600w
                  `}
                  sizes="(max-width: 768px) 100vw,
                        (max-width: 1024px) 90vw,
                        58vw"
               alt="Conference Hall" 
                className="w-full h-full object-cover"
                 loading="lazy"
                  decoding="async"
                  fetchPriority="low"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

          {/* Spotlight 4: Recreations */}
          <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Large Image Block */}
            <div className="lg:col-span-7 h-80 sm:h-96 md:h-[450px] rounded-3xl overflow-hidden shadow-lg border border-slate-200 relative order-1">
              <img 
                src="https://res.cloudinary.com/cpusqoyy/image/upload/v1783769325/0V1A3589_jfn9wg.jpg" 
                alt="Recreations & Rooftop" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            {/* Overlay Text Card */}
            <div className="lg:col-span-5 bg-white p-8 md:p-10 rounded-2xl shadow-md border border-slate-200/80 z-10 lg:-translate-x-6 relative order-2">
              <h3 className="text-2xl md:text-3xl font-serif font-medium text-slate-900 mb-4">
                Recreations & Rooftop
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-6 font-sans">
                Our active rooftop sunset lounge offers a panoramic visual sanctuary. Indulge in warm herbal teas, relax with traditional ambient Gofa hospitality, and capture perfect snapshots of Sawla’s natural highland valleys and pristine mountain horizons.
              </p>
              <button
                onClick={() => handleNavigate("ABOUT", "/about")}
                className="inline-block border border-amber-600 text-amber-700 hover:bg-amber-600 hover:text-white transition-all py-2.5 px-6 font-mono text-xs tracking-wider font-semibold uppercase rounded"
              >
                VIEW DETAIL
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* 4. Sightseeing Slider Section */}
      <section className="py-16 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-serif font-medium text-center text-slate-950 tracking-tight leading-tight mb-2">
            Sightseeing
          </h2>
          <p className="text-slate-500 text-xs font-accent text-center tracking-widest uppercase mb-10">
            Immerse yourself in Gofa's majestic highlands
          </p>

          <div className="relative flex items-center">
            {/* Left navigation arrow */}
            <button
              onClick={prevSightseeing}
              className="absolute left-0 lg:-left-6 z-10 bg-white hover:bg-slate-50 text-slate-700 p-3.5 rounded-full border border-slate-200 shadow-md transition-all cursor-pointer focus:outline-none"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Slide Container (Display 3 cards dynamically on lg screens, 1 on mobile) */}
            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 md:px-8 overflow-hidden">
              {sightseeingPlaces.slice(sightseeingIndex, sightseeingIndex + 3).map((place, idx) => (
                <div 
                  key={place.title + idx} 
                  className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm flex flex-col h-full hover:shadow-md transition-all duration-300"
                >
                  <div className="relative h-48 w-full overflow-hidden">
                    <img 
                      src={place.image} 
                      alt={place.title} 
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-3 left-3 bg-indigo-600 text-white font-mono text-[10px] px-2.5 py-1 rounded-full font-bold shadow-sm">
                      {place.altitude}
                    </div>
                  </div>
                  
                  <div className="p-6 flex flex-col justify-between flex-1">
                    <div>
                      <h4 className="text-lg font-serif font-medium text-slate-950 mb-2">
                        {place.title}
                      </h4>
                      <p className="text-slate-600 text-xs font-sans leading-relaxed mb-4 line-clamp-3">
                        {place.desc}
                      </p>
                    </div>

                    <div className="border-t border-slate-100 pt-4 flex justify-between items-center">
                      <span className="text-[10px] font-mono text-slate-500 uppercase">
                        🕒 {place.timeNeeded}
                      </span>
                      <button
                        onClick={() => setSelectedSightseeing(place)}
                        className="bg-amber-600/10 hover:bg-amber-600 text-amber-800 hover:text-white px-4 py-1.5 rounded text-xs font-mono transition-all font-semibold"
                      >
                        Read More
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Right navigation arrow */}
            <button
              onClick={nextSightseeing}
              className="absolute right-0 lg:-right-6 z-10 bg-white hover:bg-slate-50 text-slate-700 p-3.5 rounded-full border border-slate-200 shadow-md transition-all cursor-pointer focus:outline-none"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* 5. Map and GDS/Contact Section */}
      <section className="py-16 bg-slate-100 border-t border-b border-slate-200">
        <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-serif font-medium text-center text-slate-950 tracking-tight mb-10">
            Map & Contact GDS
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Interactive Map Visual */}
            <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 shadow-md p-6 flex flex-col justify-between overflow-hidden relative min-h-[350px]">
              {/* Map Address Badge overlay */}
              <div className="absolute top-6 left-6 z-10 bg-white/95 backdrop-blur shadow-md rounded-xl p-4 border border-slate-200 font-sans max-w-sm">
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <h4 className="text-sm font-serif font-bold text-slate-900">Dream Hotel Sawla</h4>
                    <p className="text-[10px] font-mono text-slate-500 mt-1">Main Street, Sawla Gofa Zone, Ethiopia</p>
                    <div className="flex items-center gap-1.5 mt-2">
                      <div className="flex text-amber-500 text-xs">★★★★★</div>
                      <span className="text-[10px] font-mono text-slate-500 font-bold">4.9 (84 reviews)</span>
                    </div>
                  </div>
                  <a 
                    href="https://maps.google.com" 
                    target="_blank" 
                    rel="noreferrer"
                    className="p-2 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition-colors cursor-pointer"
                    title="Open in Google Maps"
                  >
                    <MapPin className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {/* Styled Vector Map Placeholder Background */}
              <div className="absolute inset-0 z-0 bg-[#e5e1d8]/40">
                <div className="absolute inset-0 opacity-20 pointer-events-none" style={{
                  backgroundImage: `radial-gradient(#8c867a 1.2px, transparent 1.2px), radial-gradient(#8c867a 1.2px, #e5e1d8 1.2px)`,
                  backgroundSize: "24px 24px",
                  backgroundPosition: "0 0, 12px 12px"
                }} />
                
                {/* Styled Rivers/Roads inside map */}
                <div className="absolute top-1/3 left-0 w-full h-12 bg-sky-200/50 rotate-6" />
                <div className="absolute top-0 left-1/4 w-8 h-full bg-slate-300/40 -rotate-12" />
                <div className="absolute top-1/2 left-0 w-full h-10 bg-slate-300/40 rotate-12" />

                {/* Pulsing red pin pointing to Dream Hotel */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                  <span className="relative flex h-8 w-8">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-8 w-8 bg-red-600 items-center justify-center text-white text-xs font-bold shadow-md">
                      📍
                    </span>
                  </span>
                  <div className="mt-1 bg-slate-900 text-white text-[9px] font-mono px-2 py-0.5 rounded font-bold shadow">
                    DREAM HOTEL
                  </div>
                </div>
              </div>

              {/* Footer row of map card */}
              <div className="relative z-10 mt-auto pt-4 border-t border-slate-200/60 bg-white/80 backdrop-blur -mx-6 -mb-6 px-6 py-4 flex flex-wrap justify-between items-center text-xs text-slate-600 font-mono gap-4">
                <span>Latitude: 6.3128° N • Longitude: 36.8184° E</span>
                <span className="text-indigo-600 font-bold">海拔 Elevation: 1,950m</span>
              </div>
            </div>

            {/* GDS Information side card */}
            <div className="lg:col-span-5 bg-[#e5e1d8] p-8 md:p-10 rounded-3xl flex flex-col justify-between shadow-md border border-slate-300/50">
              <div>
                <h3 className="text-xl font-serif font-medium text-slate-900 leading-tight mb-2">
                  Dream Hotel Sawla
                </h3>
                <p className="text-slate-600 text-xs font-accent uppercase tracking-widest mb-6">
                  Official GDS & Reservation Codes
                </p>

                <div className="space-y-4 font-mono text-xs text-slate-700">
                  <div className="flex justify-between border-b border-slate-300/60 pb-2.5">
                    <span className="font-bold text-slate-950">Amadeus GDS:</span>
                    <span>DP SAWLA1</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-300/60 pb-2.5">
                    <span className="font-bold text-slate-950">Galileo/Apollo:</span>
                    <span>DP 49132</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-300/60 pb-2.5">
                    <span className="font-bold text-slate-950">Sabre GDS:</span>
                    <span>DP 32755</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-300/60 pb-2.5">
                    <span className="font-bold text-slate-950">WorldSpan GDS:</span>
                    <span>DP ADDES</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-300/60 pb-2.5">
                    <span className="font-bold text-slate-950">Direct Booking:</span>
                    <span>Offline Cash Ledger Only</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 border-t border-slate-300/60 pt-6 space-y-3 font-mono text-xs text-slate-700">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-slate-900" />
                  <span>+251 985 876 478</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-slate-900" />
                  <span>dreamhotel@gmail.com</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Subscribe Form Section */}
      <section className="py-16 bg-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-serif font-medium text-slate-950 tracking-tight mb-3">
            Subscribe
          </h2>
          <p className="text-slate-500 text-sm font-sans mb-8 max-w-lg mx-auto">
            Be the first to hear about new Dream Hotel special packages and seasonal offers that are perfect for you.
          </p>

          <AnimatePresence mode="wait">
            {!subSuccess ? (
              <motion.form 
                onSubmit={handleSubscribe}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="grid grid-cols-1 md:grid-cols-4 gap-4 font-mono text-sm max-w-3xl mx-auto"
              >
                <input 
                  type="text" 
                  placeholder="Name" 
                  required
                  value={subForm.name}
                  onChange={(e) => setSubForm(prev => ({ ...prev, name: e.target.value }))}
                  className="bg-white border border-slate-300 rounded px-4 py-3 text-xs w-full focus:outline-none focus:border-amber-600 focus:ring-1 focus:ring-amber-600 shadow-sm"
                />
                <input 
                  type="email" 
                  placeholder="Email Address" 
                  required
                  value={subForm.email}
                  onChange={(e) => setSubForm(prev => ({ ...prev, email: e.target.value }))}
                  className="bg-white border border-slate-300 rounded px-4 py-3 text-xs w-full focus:outline-none focus:border-amber-600 focus:ring-1 focus:ring-amber-600 shadow-sm"
                />
                <input 
                  type="tel" 
                  placeholder="Phone (Optional)" 
                  value={subForm.phone}
                  onChange={(e) => setSubForm(prev => ({ ...prev, phone: e.target.value }))}
                  className="bg-white border border-slate-300 rounded px-4 py-3 text-xs w-full focus:outline-none focus:border-amber-600 focus:ring-1 focus:ring-amber-600 shadow-sm"
                />
                <button
                  type="submit"
                  className="bg-amber-600 hover:bg-amber-700 active:scale-95 text-white font-bold py-3 px-6 rounded text-xs transition-all tracking-wider uppercase cursor-pointer shadow-sm border border-amber-700/20"
                >
                  Subscribe
                </button>
              </motion.form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="bg-indigo-50 border border-indigo-200 text-indigo-900 p-6 rounded-2xl max-w-xl mx-auto flex flex-col items-center gap-2 shadow-sm"
              >
                <span className="text-2xl">🎉</span>
                <h4 className="font-serif font-bold text-lg text-indigo-950">Subscription Successful!</h4>
                <p className="text-xs font-mono text-slate-600">
                  Thank you, <span className="font-bold text-indigo-900">{subForm.name}</span>. You have successfully joined the Dream Hotel Newsletter list. We will send updates to <span className="font-bold text-indigo-900">{subForm.email}</span>.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* ----------------- SIGHTSEEING PLACE DETAILS MODAL ----------------- */}
      <AnimatePresence>
        {selectedSightseeing && (
          <div className="fixed inset-0 bg-black/65 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-200 max-w-lg w-full relative"
            >
              <button
                onClick={() => setSelectedSightseeing(null)}
                className="absolute top-4 right-4 z-10 bg-black/60 hover:bg-black/80 text-white p-2 rounded-full cursor-pointer transition-colors"
                title="Close"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="relative h-56 w-full">
                <img 
                  src={selectedSightseeing.image} 
                  alt={selectedSightseeing.title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-6 text-white">
                  <span className="text-[10px] font-mono uppercase bg-indigo-600 px-2.5 py-1 rounded-full font-bold shadow">
                    {selectedSightseeing.altitude}
                  </span>
                  <h3 className="text-2xl font-serif font-medium mt-2">{selectedSightseeing.title}</h3>
                </div>
              </div>

              <div className="p-6 font-sans">
                <p className="text-slate-600 text-sm leading-relaxed mb-6">
                  {selectedSightseeing.desc}
                </p>

                <div className="bg-amber-50 border border-amber-100 p-4 rounded-xl text-amber-900 text-xs leading-normal mb-6 flex gap-2">
                  <span className="text-base">💡</span>
                  <div>
                    <strong className="font-sans block mb-0.5">Travel tip:</strong>
                    <p className="font-mono">{selectedSightseeing.tip}</p>
                  </div>
                </div>

                <div className="flex justify-between items-center text-xs font-mono text-slate-500 pt-4 border-t border-slate-100">
                  <span>⏱️ Duration: <strong>{selectedSightseeing.timeNeeded}</strong></span>
                  <button
                    onClick={() => setSelectedSightseeing(null)}
                    className="bg-slate-900 hover:bg-slate-800 text-white py-2 px-6 rounded font-bold font-sans cursor-pointer transition-colors"
                  >
                    Got It
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
