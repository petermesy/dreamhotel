import React from "react";
import { motion } from "motion/react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { optimizeCloudinaryUrl } from "../cloudinary";
import { GalleryImage } from "../types";

interface GalleryLightboxProps {
  image: GalleryImage;
  index: number;
  totalImages: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export default function GalleryLightbox({ image, index, totalImages, onClose, onPrev, onNext }: GalleryLightboxProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-slate-950/98 z-50 flex flex-col justify-between items-center p-4 sm:p-6"
      onClick={onClose}
      id="gallery-lightbox-modal"
    >
      <div className="w-full max-w-7xl flex justify-between items-center text-white py-2">
        <div className="font-mono text-xs text-slate-300">
          Image <span className="font-bold text-white">{index + 1}</span> of <span className="font-bold text-white">{totalImages}</span>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all cursor-pointer outline-none focus:ring-2 focus:ring-indigo-500"
          title="Close Lightbox"
          id="lightbox-close-button"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      <div className="w-full flex-1 flex items-center justify-between max-w-7xl relative" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={onPrev}
          className="p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all cursor-pointer select-none border border-white/5 disabled:opacity-30 absolute left-2 sm:left-4 z-10"
          title="Previous Image (Left Arrow)"
          id="lightbox-prev-button"
        >
          <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8" />
        </button>

        <div className="mx-auto max-w-5xl max-h-[70vh] flex items-center justify-center overflow-hidden px-12 relative">
          <motion.img
            key={image.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            src={optimizeCloudinaryUrl(image.url, {
              width: 1200,
              crop: "limit",
              quality: "auto",
              dpr: "auto",
              format: "auto",
            })}
            alt={image.title}
            loading="eager"
            decoding="async"
            fetchPriority="high"
            referrerPolicy="no-referrer"
            className="max-w-full max-h-[70vh] object-contain rounded-lg shadow-2xl border border-white/10"
          />
        </div>

        <button
          onClick={onNext}
          className="p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all cursor-pointer select-none border border-white/5 disabled:opacity-30 absolute right-2 sm:right-4 z-10"
          title="Next Image (Right Arrow)"
          id="lightbox-next-button"
        >
          <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8" />
        </button>
      </div>

      <div className="w-full max-w-4xl text-center text-white pb-6 px-4" id="lightbox-caption-panel">
        <span className="bg-indigo-600 text-white text-[9px] font-mono font-bold tracking-widest uppercase px-2.5 py-0.5 rounded-full inline-block mb-3">
          {image.category}
        </span>
        <h2 className="text-xl sm:text-2xl font-serif font-medium mb-1.5 tracking-tight">
          {image.title}
        </h2>
        <p className="text-slate-300 text-xs sm:text-sm font-mono max-w-2xl mx-auto leading-relaxed">
          {image.description}
        </p>
      </div>
    </motion.div>
  );
}
