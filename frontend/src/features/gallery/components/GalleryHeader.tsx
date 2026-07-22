import React from "react";
import { GalleryCategory } from "../types";
import { galleryCategoryOptions } from "../data";

interface GalleryHeaderProps {
  activeCategory: GalleryCategory;
}

export default function GalleryHeader({ activeCategory }: GalleryHeaderProps) {
  const activeOption = galleryCategoryOptions.find((option) => option.id === activeCategory);
  const title = activeOption?.label || "All Photos";

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-6 text-center" id="gallery-header-info">
      <h1 className="text-[#222] font-serif font-bold text-3xl sm:text-4xl tracking-wider mb-2">
        {title}
      </h1>
      <div className="h-1 w-16 bg-indigo-600 mx-auto rounded-full mb-4"></div>
      <p className="text-slate-500 text-xs sm:text-sm font-mono max-w-2xl mx-auto">
        Explore our luxurious boutique guest house accommodations, high-safety security systems, fine restaurant halls, and modern conference workspaces in Sawla Gofa, Ethiopia.
      </p>
    </div>
  );
}
