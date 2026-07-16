
import React, { useState, useEffect, useCallback } from "react";
import { ArrowRight, Star } from "lucide-react";
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

interface HeroCarouselProps {
  handleNavigate: (tab: "HOME" | "ROOMS" | "CONFERENCE" | "LOOKUP" | "ABOUT" | "BOOK_NOW", path: string) => void;
}

export default function HeroCarousel({ handleNavigate }: HeroCarouselProps) {
  const [bgIndex, setBgIndex] = useState(0);
  const currentImage = hotelImages[bgIndex] ?? hotelImages[0] ?? { url: "", title: "" };

  // Preload next image to eliminate transition flickering/loading delay
  useEffect(() => {
    const nextIndex = (bgIndex + 1) % hotelImages.length;
    const nextImage = hotelImages[nextIndex];
    if (nextImage) {
      const img = new Image();
      img.src = nextImage.url;
    }
  }, [bgIndex]);

  // Handle manual navigation actions with stable callbacks
  const nextBg = useCallback(() => {
    setBgIndex((prev) => (prev + 1) % hotelImages.length);
  }, []);

  const prevBg = useCallback(() => {
    setBgIndex((prev) => (prev - 1 + hotelImages.length) % hotelImages.length);
  }, []);

  // Setup auto-advance interval with clean teardown
  useEffect(() => {
    const bgInterval = setInterval(nextBg, 6000);
    return () => clearInterval(bgInterval);
  }, [nextBg]);

  return (
    <section className="relative w-full min-h-[550px] sm:min-h-[620px] flex items-center justify-center overflow-hidden bg-slate-950 text-white py-16 sm:py-24 px-4 sm:px-6 lg:px-8 text-center rounded-b-[40px] shadow-lg mb-12">
      {/* Sliding Background Images */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={bgIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.0, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <img
              src={currentImage.url}
              alt={currentImage.title}
              className="w-full h-full object-cover object-center filter brightness-105 contrast-105"
              referrerPolicy="no-referrer"
              fetchPriority={bgIndex === 0 ? "high" : "auto"}
              loading={bgIndex === 0 ? "eager" : "lazy"}
            />
          </motion.div>
        </AnimatePresence>
        {/* Gradient Overlay */}
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
            Current View: <span className="text-indigo-300 font-bold">{currentImage.title}</span>
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
  );
}