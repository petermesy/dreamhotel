import React from "react";
import { GalleryCategory, GalleryCategoryOption } from "../types";

interface GalleryFilterBarProps {
  activeCategory: GalleryCategory;
  options: GalleryCategoryOption[];
  onCategoryChange: (category: GalleryCategory) => void;
}

export default function GalleryFilterBar({ activeCategory, options, onCategoryChange }: GalleryFilterBarProps) {
  return (
    <div className="bg-white border-b border-slate-200 sticky top-[80px] z-40 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between overflow-x-auto whitespace-nowrap scrollbar-none py-1.5">
        <div className="flex items-center gap-1 sm:gap-2 mx-auto">
          {options.map((option) => {
            const isActive = activeCategory === option.id;
            return (
              <button
                key={option.id}
                onClick={() => onCategoryChange(option.id)}
                id={`gallery-filter-${option.id}`}
                className={`px-5 py-3 text-xs sm:text-sm font-sans font-medium uppercase tracking-wider transition-all border-b-2 cursor-pointer ${
                  isActive
                    ? "text-indigo-600 border-indigo-600 font-bold"
                    : "text-slate-500 border-transparent hover:text-indigo-600 hover:border-slate-300"
                }`}
              >
                {option.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
