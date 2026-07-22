import React from "react";
import { Image as ImageIcon } from "lucide-react";

export default function GalleryEmptyState() {
  return (
    <div className="text-center py-20" id="gallery-empty-state">
      <ImageIcon className="w-12 h-12 text-slate-300 mx-auto mb-4 animate-bounce" />
      <h3 className="text-slate-700 font-bold font-sans text-base">No Photos Available</h3>
      <p className="text-slate-400 text-xs font-mono mt-1">Please check another filter category.</p>
    </div>
  );
}
