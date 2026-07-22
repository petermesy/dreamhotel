import React from "react";
import { Image as ImageIcon, RefreshCw } from "lucide-react";

interface GalleryManagerHeaderProps {
  loading: boolean;
  onRefresh: () => void;
}

export default function GalleryManagerHeader({ loading, onRefresh }: GalleryManagerHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200">
      <div>
        <h3 className="text-lg font-bold text-slate-950 flex items-center gap-2">
          <ImageIcon className="w-5 h-5 text-indigo-600" />
          Boutique Gallery & Cloudinary Media Manager
        </h3>
        <p className="text-xs font-mono text-slate-500 mt-1">
          Standard operating procedure for front-desk receptionists and owners to manage gallery assets.
        </p>
      </div>
      <button
        onClick={onRefresh}
        disabled={loading}
        className="bg-slate-50 hover:bg-slate-100 border border-slate-200 hover:border-slate-300 text-slate-700 px-3.5 py-2 rounded-lg text-xs font-mono font-bold flex items-center justify-center gap-1.5 transition-all active:scale-95 cursor-pointer disabled:opacity-50"
      >
        <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
        Refresh Database
      </button>
    </div>
  );
}
