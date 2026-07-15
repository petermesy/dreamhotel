import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ConferenceCarouselProps {
  images: string[];
  activeIndex: number;
  onPrev: () => void;
  onNext: () => void;
  onSelect: (index: number) => void;
}

export default function ConferenceCarousel({
  images,
  activeIndex,
  onPrev,
  onNext,
  onSelect,
}: ConferenceCarouselProps) {
  return (
    <div className="w-full h-[400px] sm:h-[500px] md:h-[560px] rounded-3xl overflow-hidden relative shadow-sm mb-12 border border-slate-200 group bg-slate-900">
      <AnimatePresence mode="wait">
        <motion.img
          key={activeIndex}
          src={images[activeIndex]}
          alt={`Dream Conference & Banquet Hall - View ${activeIndex + 1}`}
          className="w-full h-full object-cover object-center absolute inset-0"
          initial={{ opacity: 0, scale: 1.01 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          referrerPolicy="no-referrer"
        />
      </AnimatePresence>

      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent pointer-events-none" />

      <div className="absolute inset-0 flex items-center justify-between p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <button
          onClick={onPrev}
          className="p-2.5 rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur-sm transition-all transform hover:scale-105 cursor-pointer"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={onNext}
          className="p-2.5 rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur-sm transition-all transform hover:scale-105 cursor-pointer"
          aria-label="Next slide"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      <div className="absolute bottom-8 left-8 right-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4 pointer-events-none z-10">
        <div>
          <span className="text-[10px] font-accent uppercase text-indigo-400 tracking-widest block mb-1">Fourth Floor Venue</span>
          <h3 className="text-xl sm:text-2xl font-bold text-white font-sans">G+4 Premium Event Space</h3>
          <p className="text-xs sm:text-sm text-slate-300 font-mono mt-1">Accommodating up to 150 seated guests with full lift access, professional PA setups, and custom catering options.</p>
        </div>

        <div className="flex items-center gap-1.5 bg-black/30 px-3 py-1.5 rounded-full backdrop-blur-xs pointer-events-auto">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => onSelect(idx)}
              className={`w-2 h-2 rounded-full transition-all cursor-pointer ${
                activeIndex === idx ? "bg-white w-4" : "bg-white/50 hover:bg-white/80"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
