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
    <div className="group relative mb-8 h-[280px] overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-900 shadow-sm sm:mb-10 sm:h-[420px] md:h-[500px] lg:h-[560px]">
      <AnimatePresence mode="wait">
        <motion.img
          key={activeIndex}
          src={images[activeIndex]}
          alt={`Dream Conference & Banquet Hall - View ${activeIndex + 1}`}
          className="absolute inset-0 h-full w-full object-cover object-center"
          initial={{ opacity: 0, scale: 1.01 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          referrerPolicy="no-referrer"
        />
      </AnimatePresence>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent" />

      <div className="absolute inset-0 flex items-center justify-between p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100 sm:p-4">
        <button
          onClick={onPrev}
          className="cursor-pointer rounded-full bg-black/40 p-2.5 text-white backdrop-blur-sm transition-all hover:scale-105 hover:bg-black/60"
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          onClick={onNext}
          className="cursor-pointer rounded-full bg-black/40 p-2.5 text-white backdrop-blur-sm transition-all hover:scale-105 hover:bg-black/60"
          aria-label="Next slide"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      <div className="absolute bottom-6 left-4 right-4 z-10 flex flex-col gap-4 sm:bottom-8 sm:left-8 sm:right-8 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-2xl">
          <span className="mb-1 block text-[10px] font-sans uppercase tracking-[0.32em] text-indigo-400">
            Fourth Floor Venue
          </span>
          <h3 className="text-lg font-semibold text-white sm:text-xl md:text-2xl">
            G+4 Premium Event Space
          </h3>
          <p className="mt-1 text-xs leading-6 text-slate-300 sm:text-sm font-sans">
            Accommodating up to 150 seated guests with full lift access, professional PA setups, and custom catering options.
          </p>
        </div>

        <div className="pointer-events-auto flex items-center gap-1.5 rounded-full bg-black/30 px-3 py-1.5 backdrop-blur-xs">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => onSelect(idx)}
              className={`h-2 w-2 cursor-pointer rounded-full transition-all ${
                activeIndex === idx ? "w-4 bg-white" : "bg-white/50 hover:bg-white/80"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
