import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { Image as ImageIcon, ChevronLeft, ChevronRight, X, ZoomIn, Info } from "lucide-react";

interface GalleryImage {
  id: string | number;
  url: string;
  category: "lobby" | "rooms" | "dining" | "meetings";
  title: string;
  description: string;
}

const galleryImages: GalleryImage[] = [
  // Facade & Lobby
  {
    id: "lobby-1",
    url: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80",
    category: "lobby",
    title: "Dream Hotel Exterior Facade",
    description: "Modern architectural lines with regional boutique accents welcoming guests in Sawla."
  },
  {
    id: "lobby-2",
    url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80",
    category: "lobby",
    title: "Grand Lobby Entrance",
    description: "Spacious, double-height main lobby bathed in natural sunlight and soft ambient design."
  },
  {
    id: "lobby-3",
    url: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80",
    category: "lobby",
    title: "Boutique Reception Desk",
    description: "Friendly front desk team welcoming corporate executives and travelers 24/7."
  },
  {
    id: "lobby-4",
    url: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1200&q=80",
    category: "lobby",
    title: "Cozy Guest Lounge",
    description: "Plush leather seating and locally hand-carved wood elements ideal for relaxed networking."
  },
  {
    id: "lobby-5",
    url: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1200&q=80",
    category: "lobby",
    title: "Atrium and Interior Art Decor",
    description: "Stunning boutique detailing combining local heritage artifacts and modern minimal frames."
  },
  {
    id: "lobby-6",
    url: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80",
    category: "lobby",
    title: "Lobby Botanical Decor",
    description: "Lush regional foliage and aromatic flowers providing a clean and safe sanctuary ambiance."
  },

  // Rooms
  {
    id: "rooms-1",
    url: "https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=1200&q=80",
    category: "rooms",
    title: "Deluxe King Bed Room",
    description: "Premium orthopaedic bedding with security-coded lockers, quiet acoustic walls, and high-speed Wi-Fi."
  },
  {
    id: "rooms-2",
    url: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80",
    category: "rooms",
    title: "Executive Suite Living Space",
    description: "Panoramic vistas of Gofa Zone paired with custom executive workstation, minibar, and premium drapery."
  },
  {
    id: "rooms-3",
    url: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1200&q=80",
    category: "rooms",
    title: "Premium Twin Bedroom",
    description: "Two cozy single beds ideal for regional conference delegates and business partners traveling together."
  },
  {
    id: "rooms-4",
    url: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80",
    category: "rooms",
    title: "Sleek Ensuite Bathroom",
    description: "Pristine floor-to-ceiling tiling with rain shower, organic hand towels, and sanitization certificate."
  },
  {
    id: "rooms-5",
    url: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1200&q=80",
    category: "rooms",
    title: "Boutique Suite Bed Details",
    description: "Organic Egyptian cotton linens meticulously pressed to guarantee flawless sanitization."
  },
  {
    id: "rooms-6",
    url: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=1200&q=80",
    category: "rooms",
    title: "Superior Room Executive Desk",
    description: "Ergonomic workspace layout optimized for high-productivity business remote sessions."
  },

  // Dining
  {
    id: "dining-1",
    url: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80",
    category: "dining",
    title: "The Bistro Fine Dining Area",
    description: "Elegant seating serving a premium mix of local specialties and international culinary cuisine."
  },
  {
    id: "dining-2",
    url: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1200&q=80",
    category: "dining",
    title: "Exquisite Gourmet Plating",
    description: "Masterful dishes styled by our Executive Chefs using fresh ingredients from Gofa highland farms."
  },
  {
    id: "dining-3",
    url: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1200&q=80",
    category: "dining",
    title: "The Skyline Bar & Lounge",
    description: "Warmly lit boutique bar showcasing refreshing non-alcoholic beverages, mocktails, and local coffee blends."
  },
  {
    id: "dining-4",
    url: "https://images.unsplash.com/photo-1493770348161-369560ae357d?auto=format&fit=crop&w=1200&q=80",
    category: "dining",
    title: "Continental Breakfast Platter",
    description: "Daily breakfast buffet featuring freshly baked rolls, fresh fruit slices, and rich highland espresso."
  },
  {
    id: "dining-5",
    url: "https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=1200&q=80",
    category: "dining",
    title: "Artisanal Dessert Buffet",
    description: "Freshly prepared chocolate delights and pastry treats crafted daily at the hotel bakery."
  },
  {
    id: "dining-6",
    url: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=1200&q=80",
    category: "dining",
    title: "Organic Highland Salads",
    description: "Crispy green garden salads prepared with stringent sanitation and clean-washed procedures."
  },

  // Meetings
  {
    id: "meetings-1",
    url: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80",
    category: "meetings",
    title: "Grand Sawla Conference Hall",
    description: "A comprehensive corporate venue configured for regional workshops, delegates, and keynote presentations."
  },
  {
    id: "meetings-2",
    url: "https://images.unsplash.com/photo-1431540015161-0bf868a2d407?auto=format&fit=crop&w=1200&q=80",
    category: "meetings",
    title: "Executive Boardroom Layout",
    description: "State-of-the-art multimedia table setup for streamlined team brainstorms and high-level decisions."
  },
  {
    id: "meetings-3",
    url: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=1200&q=80",
    category: "meetings",
    title: "Interactive Briefing Room",
    description: "Bright room layout designed with modern acoustics and whiteboards optimized for training workshops."
  },
  {
    id: "meetings-4",
    url: "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=1200&q=80",
    category: "meetings",
    title: "VIP Gala Banquet Configuration",
    description: "Elegantly arranged banquet roundtables with customized fine linens for celebratory events."
  },
  {
    id: "meetings-5",
    url: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=1200&q=80",
    category: "meetings",
    title: "Advanced Presentation Systems",
    description: "High-resolution overhead projectors, digital audio mixers, and secure wireless presenter mics."
  },
  {
    id: "meetings-6",
    url: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=1200&q=80",
    category: "meetings",
    title: "Fireside Panel Discussion Stage",
    description: "Professional microphone and comfortable seat arrangements on-stage perfect for guest lectures."
  }
];

type CategoryFilter = "all" | "lobby" | "rooms" | "dining" | "meetings";

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = React.useState<CategoryFilter>("all");
  const [lightboxIndex, setLightboxIndex] = React.useState<number | null>(null);
  const [images, setImages] = React.useState<GalleryImage[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fetch("/api/gallery")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch gallery images");
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setImages(data);
        } else {
          setImages(galleryImages);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("API error fetching gallery, falling back to local list:", err);
        setImages(galleryImages);
        setLoading(false);
      });
  }, []);

  // Filtered list of images based on state
  const filteredImages = React.useMemo(() => {
    if (activeCategory === "all") return images;
    return images.filter((img) => img.category === activeCategory);
  }, [activeCategory, images]);

  const handlePrevImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => {
      if (prev === null) return null;
      return prev === 0 ? filteredImages.length - 1 : prev - 1;
    });
  };

  const handleNextImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => {
      if (prev === null) return null;
      return prev === filteredImages.length - 1 ? 0 : prev + 1;
    });
  };

  // Keyboard navigation for Lightbox
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === "Escape") setLightboxIndex(null);
      if (e.key === "ArrowLeft") handlePrevImage();
      if (e.key === "ArrowRight") handleNextImage();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, filteredImages]);

  return (
    <div className="w-full bg-slate-50 min-h-screen pb-20 animate-fade-in" id="gallery-root">
      {/* 1. Category Filter Navigation Bar - Styled like the Ramada layout screenshot */}
      <div className="bg-white border-b border-slate-200 sticky top-[80px] z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between overflow-x-auto whitespace-nowrap scrollbar-none py-1.5">
          <div className="flex items-center gap-1 sm:gap-2 mx-auto">
            {[
              { id: "all", label: "All Photos" },
              { id: "lobby", label: "Facade and Lobby" },
              { id: "rooms", label: "Accommodation" },
              { id: "dining", label: "Dining" },
              { id: "meetings", label: "Meetings" }
            ].map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    setActiveCategory(cat.id as CategoryFilter);
                    setLightboxIndex(null);
                  }}
                  id={`gallery-filter-${cat.id}`}
                  className={`px-5 py-3 text-xs sm:text-sm font-sans font-medium uppercase tracking-wider transition-all border-b-2 cursor-pointer ${
                    isActive
                      ? "text-indigo-600 border-indigo-600 font-bold"
                      : "text-slate-500 border-transparent hover:text-indigo-600 hover:border-slate-300"
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 2. Page Header Title Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-6 text-center" id="gallery-header-info">
        <h1 className="text-[#222] font-serif font-bold text-3xl sm:text-4xl uppercase tracking-wider mb-2">
          {activeCategory === "all" ? "ALL PHOTOS" : `${activeCategory.toUpperCase()} GALLERY`}
        </h1>
        <div className="h-1 w-16 bg-indigo-600 mx-auto rounded-full mb-4"></div>
        <p className="text-slate-500 text-xs sm:text-sm font-mono max-w-2xl mx-auto">
          Explore our luxurious boutique guest house accommodations, high-safety security systems, fine restaurant halls, and modern conference workspaces in Sawla Gofa, Ethiopia.
        </p>
      </div>

      {/* 3. Photo Gallery Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4" id="gallery-grid-section">
        {loading ? (
          <div className="text-center py-20 flex flex-col items-center justify-center" id="gallery-loading">
            <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-slate-500 text-xs font-mono">Retrieving official boutique photos...</p>
          </div>
        ) : (
          <>
            <motion.div 
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
            >
              <AnimatePresence mode="popLayout">
                {filteredImages.map((img, index) => (
                  <motion.div
                    layout
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    key={img.id}
                    onClick={() => setLightboxIndex(index)}
                    id={`gallery-card-${img.id}`}
                    className="group relative bg-white rounded-2xl shadow-sm border border-slate-200/60 overflow-hidden cursor-pointer hover:shadow-md transition-all duration-300 flex flex-col"
                  >
                    {/* Image block (Aspect ratio 4:3) */}
                    <div className="aspect-[4/3] w-full bg-slate-100 overflow-hidden relative">
                      <img
                        src={img.url}
                        alt={img.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500 ease-out"
                      />
                      {/* Subtle black overlay on hover with Zoom icon */}
                      <div className="absolute inset-0 bg-slate-950/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <div className="bg-white/95 backdrop-blur text-slate-950 p-3 rounded-full shadow-lg transform scale-90 group-hover:scale-100 transition-transform duration-300">
                          <ZoomIn className="w-5 h-5 text-indigo-600" />
                        </div>
                      </div>
                      {/* Category Tag Badge */}
                      <span className="absolute top-4 left-4 bg-slate-950/80 backdrop-blur text-white text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-md">
                        {img.category}
                      </span>
                    </div>

                    {/* Footer details */}
                    <div className="p-5 flex-1 flex flex-col justify-between border-t border-slate-100">
                      <div>
                        <h3 className="font-sans font-bold text-slate-900 text-sm tracking-tight mb-1 group-hover:text-indigo-600 transition-colors">
                          {img.title}
                        </h3>
                        <p className="text-slate-500 text-xs font-mono leading-relaxed line-clamp-2">
                          {img.description}
                        </p>
                      </div>
                      <div className="flex items-center gap-1.5 mt-4 text-[10px] text-slate-400 font-mono">
                        <Info className="w-3.5 h-3.5 text-indigo-500" />
                        <span>Dream Hotel Sawla Official Image</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            {filteredImages.length === 0 && (
              <div className="text-center py-20" id="gallery-empty-state">
                <ImageIcon className="w-12 h-12 text-slate-300 mx-auto mb-4 animate-bounce" />
                <h3 className="text-slate-700 font-bold font-sans text-base">No Photos Available</h3>
                <p className="text-slate-400 text-xs font-mono mt-1">Please check another filter category.</p>
              </div>
            )}
          </>
        )}
      </div>

      {/* 4. Lightbox Immersive Popup Modal */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-950/98 z-50 flex flex-col justify-between items-center p-4 sm:p-6"
            onClick={() => setLightboxIndex(null)}
            id="gallery-lightbox-modal"
          >
            {/* Top Toolbar */}
            <div className="w-full max-w-7xl flex justify-between items-center text-white py-2">
              <div className="font-mono text-xs text-slate-300">
                Image <span className="font-bold text-white">{lightboxIndex + 1}</span> of <span className="font-bold text-white">{filteredImages.length}</span>
              </div>
              <button
                onClick={() => setLightboxIndex(null)}
                className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all cursor-pointer outline-none focus:ring-2 focus:ring-indigo-500"
                title="Close Lightbox"
                id="lightbox-close-button"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Main Stage Image Display */}
            <div className="w-full flex-1 flex items-center justify-between max-w-7xl relative" onClick={(e) => e.stopPropagation()}>
              {/* Previous Arrow Button */}
              <button
                onClick={handlePrevImage}
                className="p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all cursor-pointer select-none border border-white/5 disabled:opacity-30 absolute left-2 sm:left-4 z-10"
                title="Previous Image (Left Arrow)"
                id="lightbox-prev-button"
              >
                <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8" />
              </button>

              {/* Central Photo View */}
              <div className="mx-auto max-w-5xl max-h-[70vh] flex items-center justify-center overflow-hidden px-12 relative">
                <motion.img
                  key={filteredImages[lightboxIndex].id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  src={filteredImages[lightboxIndex].url}
                  alt={filteredImages[lightboxIndex].title}
                  referrerPolicy="no-referrer"
                  className="max-w-full max-h-[70vh] object-contain rounded-lg shadow-2xl border border-white/10"
                />
              </div>

              {/* Next Arrow Button */}
              <button
                onClick={handleNextImage}
                className="p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all cursor-pointer select-none border border-white/5 disabled:opacity-30 absolute right-2 sm:right-4 z-10"
                title="Next Image (Right Arrow)"
                id="lightbox-next-button"
              >
                <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8" />
              </button>
            </div>

            {/* Bottom Caption & Info Panel */}
            <div 
              className="w-full max-w-4xl text-center text-white pb-6 px-4" 
              onClick={(e) => e.stopPropagation()}
              id="lightbox-caption-panel"
            >
              <span className="bg-indigo-600 text-white text-[9px] font-mono font-bold tracking-widest uppercase px-2.5 py-0.5 rounded-full inline-block mb-3">
                {filteredImages[lightboxIndex].category}
              </span>
              <h2 className="text-xl sm:text-2xl font-serif font-medium mb-1.5 tracking-tight">
                {filteredImages[lightboxIndex].title}
              </h2>
              <p className="text-slate-300 text-xs sm:text-sm font-mono max-w-2xl mx-auto leading-relaxed">
                {filteredImages[lightboxIndex].description}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
