import React from "react";
import { Edit3, Trash2 } from "lucide-react";
import { optimizeCloudinaryUrl } from "../../gallery/cloudinary";

interface GalleryImage {
  id: number;
  url: string;
  category: "lobby" | "rooms" | "dining" | "meetings";
  title: string;
  description: string;
  createdAt: string;
}

interface GalleryImageCardProps {
  image: GalleryImage;
  onEdit: (image: GalleryImage) => void;
  onDelete: (id: number) => void;
}

export default function GalleryImageCard({ image, onEdit, onDelete }: GalleryImageCardProps) {
  return (
    <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex gap-4 hover:shadow-sm transition-all relative group">
      <div className="w-20 h-20 bg-slate-200 rounded-lg overflow-hidden shrink-0 border border-slate-300 relative">
        <img
          src={optimizeCloudinaryUrl(image.url, {
            width: 400,
            crop: "fill",
            gravity: "auto",
            quality: "auto",
            dpr: "auto",
            format: "auto",
          })}
          alt={image.title}
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <span className="absolute top-1 left-1 bg-slate-900/80 text-[8px] font-mono text-white px-1 py-0.5 rounded scale-90 origin-top-left font-bold uppercase tracking-wide">
          {image.category}
        </span>
      </div>

      <div className="flex-1 flex flex-col justify-between min-w-0 font-mono text-[11px]">
        <div>
          <h5 className="font-sans font-bold text-slate-900 truncate pr-6" title={image.title}>
            {image.title}
          </h5>
          <p className="text-slate-500 leading-tight mt-1 line-clamp-2 text-[10px]" title={image.description}>
            {image.description}
          </p>
        </div>

        <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-200/50">
          <span className="text-[9px] text-slate-400 font-bold uppercase">ID: {image.id}</span>
          <div className="flex gap-1.5">
            <button
              onClick={() => onEdit(image)}
              className="p-1 bg-white hover:bg-indigo-50 border border-slate-200 hover:border-indigo-200 text-slate-600 hover:text-indigo-600 rounded transition-all cursor-pointer"
              title="Edit Details"
            >
              <Edit3 className="w-3 h-3" />
            </button>
            <button
              onClick={() => onDelete(image.id)}
              className="p-1 bg-white hover:bg-rose-50 border border-slate-200 hover:border-rose-200 text-slate-600 hover:text-rose-600 rounded transition-all cursor-pointer"
              title="Delete Photo Permanently"
            >
              <Trash2 className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
