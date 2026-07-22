import React from "react";
import { Image as ImageIcon } from "lucide-react";
import GalleryImageCard from "./GalleryImageCard";

interface GalleryImage {
  id: number;
  url: string;
  category: "lobby" | "rooms" | "dining" | "meetings";
  title: string;
  description: string;
  createdAt: string;
}

interface GalleryImageGridProps {
  images: GalleryImage[];
  loading: boolean;
  onEdit: (image: GalleryImage) => void;
  onDelete: (id: number) => void;
}

export default function GalleryImageGrid({ images, loading, onEdit, onDelete }: GalleryImageGridProps) {
  return (
    <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm lg:col-span-2">
      <h4 className="text-sm font-bold text-slate-950 mb-1">Live Gallery Database</h4>
      <p className="text-xs font-mono text-slate-400 mb-6">
        Displaying photos loaded from the MySQL database. Reception can modify details or delete photos.
      </p>

      {loading ? (
        <div className="text-center py-20 flex flex-col items-center justify-center">
          <div className="w-8 h-8 border-3 border-indigo-600 border-t-transparent rounded-full animate-spin mb-3"></div>
          <p className="text-slate-500 text-[11px] font-mono">Loading dynamic media files...</p>
        </div>
      ) : images.length === 0 ? (
        <div className="text-center py-20 border border-dashed border-slate-150 rounded-2xl bg-slate-50/50">
          <ImageIcon className="w-10 h-10 text-slate-300 mx-auto mb-3 animate-bounce" />
          <h5 className="text-slate-700 font-bold text-xs font-mono">No Photos Registered Yet</h5>
          <p className="text-slate-400 text-[10px] font-mono mt-1">Please use the left form to upload your first photo.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[640px] overflow-y-auto pr-2">
          {images.map((img) => (
            <GalleryImageCard key={img.id} image={img} onEdit={onEdit} onDelete={onDelete} />
          ))}
        </div>
      )}
    </div>
  );
}
