import React from "react";

export default function GalleryLoadingState() {
  return (
    <div className="text-center py-20 flex flex-col items-center justify-center" id="gallery-loading">
      <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mb-4"></div>
      <p className="text-slate-500 text-xs font-mono">Retrieving official boutique photos...</p>
    </div>
  );
}
