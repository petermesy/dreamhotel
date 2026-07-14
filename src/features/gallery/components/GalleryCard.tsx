import React from "react";
import { motion } from "motion/react";
import { Info, ZoomIn } from "lucide-react";
import { optimizeCloudinaryUrl } from "../cloudinary";
import { GalleryImage } from "../types";

interface GalleryCardProps {
  image: GalleryImage;
  onSelect: () => void;
}

export default function GalleryCard({ image, onSelect }: GalleryCardProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      onClick={onSelect}
      id={`gallery-card-${image.id}`}
      className="group relative bg-white rounded-2xl shadow-sm border border-slate-200/60 overflow-hidden cursor-pointer hover:shadow-md transition-all duration-300 flex flex-col"
    >
      <div className="aspect-[4/3] w-full bg-slate-100 overflow-hidden relative">
        <img
          src={optimizeCloudinaryUrl(image.url, {
            width: 600,
            crop: "fill",
            gravity: "auto",
            quality: "auto",
            dpr: "auto",
            format: "auto",
          })}
          alt={image.title}
          loading="lazy"
          onError={(e) => {
            console.error("Failed to load image URL:", image.url);
            e.currentTarget.className = "w-full h-full object-cover opacity-75";
          }}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500 ease-out"
        />

        <div className="absolute inset-0 bg-slate-950/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="bg-white/95 backdrop-blur text-slate-950 p-3 rounded-full shadow-lg transform scale-90 group-hover:scale-100 transition-transform duration-300">
            <ZoomIn className="w-5 h-5 text-indigo-600" />
          </div>
        </div>

        <span className="absolute top-4 left-4 bg-slate-950/80 backdrop-blur text-white text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-md">
          {image.category}
        </span>
      </div>

      <div className="p-5 flex-1 flex flex-col justify-between border-t border-slate-100">
        <div>
          <h3 className="font-sans font-bold text-slate-900 text-sm tracking-tight mb-1 group-hover:text-indigo-600 transition-colors">
            {image.title}
          </h3>
          <p className="text-slate-500 text-xs font-mono leading-relaxed line-clamp-2">
            {image.description}
          </p>
        </div>

        <div className="flex items-center gap-1.5 mt-4 text-[10px] text-slate-400 font-mono">
          <Info className="w-3.5 h-3.5 text-indigo-500" />
          <span>Dream Hotel Sawla Official Image</span>
        </div>
      </div>
    </motion.div>
  );
}
