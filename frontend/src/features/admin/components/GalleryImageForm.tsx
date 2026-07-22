import React from "react";
import { Upload, Plus, RefreshCw, Sparkles, Check, X } from "lucide-react";

interface GalleryImage {
  id: number;
  url: string;
  category: "lobby" | "rooms" | "dining" | "meetings";
  title: string;
  description: string;
  createdAt: string;
}

interface GalleryImageFormProps {
  editingId: number | null;
  title: string;
  description: string;
  category: "lobby" | "rooms" | "dining" | "meetings";
  file: File | null;
  previewUrl: string | null;
  directUrl: string;
  error: string | null;
  success: string | null;
  submitLoading: boolean;
  onTitleChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
  onCategoryChange: (value: "lobby" | "rooms" | "dining" | "meetings") => void;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDragOver: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent) => void;
  onDirectUrlChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onCancelEdit: () => void;
}

export default function GalleryImageForm({
  editingId,
  title,
  description,
  category,
  file,
  previewUrl,
  directUrl,
  error,
  success,
  submitLoading,
  onTitleChange,
  onDescriptionChange,
  onCategoryChange,
  onFileChange,
  onDragOver,
  onDrop,
  onDirectUrlChange,
  onSubmit,
  onCancelEdit,
}: GalleryImageFormProps) {
  return (
    <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm font-mono text-xs flex flex-col justify-between h-fit self-start">
      <div>
        <h4 className="text-sm font-bold text-slate-950 mb-1 flex items-center gap-1.5">
          <Sparkles className="w-4 h-4 text-indigo-600" />
          {editingId ? "Modify Gallery Photo" : "Upload New Gallery Photo"}
        </h4>
        <p className="text-[10px] text-slate-400 mb-6">
          {editingId ? "Updating existing records in MySQL database" : "Accepts JPG/PNG uploads with auto-Cloudinary delivery"}
        </p>

        <form onSubmit={onSubmit} className="space-y-4">
          <div className="flex flex-col gap-1">
            <label className="font-bold text-slate-700">Photo Title *</label>
            <input
              type="text"
              required
              placeholder="e.g., Cozy Double Bedroom Set"
              value={title}
              onChange={(e) => onTitleChange(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 outline-none text-slate-950 focus:border-indigo-500 transition-all font-mono"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="font-bold text-slate-700">Category Tag *</label>
            <select
              value={category}
              onChange={(e) => onCategoryChange(e.target.value as GalleryImage["category"])}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 outline-none text-slate-950 focus:border-indigo-500 transition-all font-mono"
            >
              <option value="lobby">Lobby & Exterior</option>
              <option value="rooms">Boutique Guest Rooms</option>
              <option value="dining">The Bistro Dining & Bar</option>
              <option value="meetings">Sawla Conference Halls</option>
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="font-bold text-slate-700">Detailed Description *</label>
            <textarea
              required
              rows={3}
              placeholder="e.g., Offering breathtaking views of Gofa highlands with pristine double bedding sets..."
              value={description}
              onChange={(e) => onDescriptionChange(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 outline-none text-slate-950 focus:border-indigo-500 transition-all font-mono leading-relaxed"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="font-bold text-slate-700">Image Asset Source *</label>

            <div
              onDragOver={onDragOver}
              onDrop={onDrop}
              onClick={() => document.getElementById("gallery-file-input")?.click()}
              className="border-2 border-dashed border-slate-200 hover:border-indigo-400 bg-slate-50 hover:bg-slate-100/55 rounded-xl p-6 text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-2 group relative overflow-hidden"
            >
              <input
                type="file"
                id="gallery-file-input"
                accept="image/*"
                onChange={onFileChange}
                className="hidden"
              />

              {previewUrl ? (
                <div className="relative w-full h-32 rounded-lg overflow-hidden border border-slate-200">
                  <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white font-bold text-[10px]">
                    Click to Swap Image
                  </div>
                </div>
              ) : (
                <>
                  <div className="p-3 bg-white rounded-full shadow-sm text-slate-400 group-hover:text-indigo-600 transition-colors">
                    <Upload className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-bold text-slate-700">Drag & Drop Image here</span>
                  <span className="text-[9px] text-slate-400">or click to browse from device (PNG/JPG)</span>
                </>
              )}
            </div>

            <div className="flex items-center my-3 text-[10px] text-slate-400 font-bold justify-center">
              <span className="h-px bg-slate-200 w-1/3"></span>
              <span className="px-2">OR ENTER DIRECT URL</span>
              <span className="h-px bg-slate-200 w-1/3"></span>
            </div>

            <input
              type="url"
              placeholder="https://example.com/photo.jpg"
              value={directUrl}
              onChange={(e) => onDirectUrlChange(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 outline-none text-slate-950 focus:border-indigo-500 transition-all font-mono text-[11px]"
            />
          </div>

          {error && (
            <div className="bg-rose-50 border border-rose-100 text-rose-700 p-3 rounded-xl font-bold leading-relaxed text-[11px]">
              ✕ Error: {error}
            </div>
          )}

          {success && (
            <div className="bg-emerald-50 border border-emerald-100 text-emerald-800 p-3 rounded-xl font-bold leading-relaxed text-[11px]">
              ✓ {success}
            </div>
          )}

          <div className="flex gap-2 pt-2">
            <button
              type="submit"
              disabled={submitLoading}
              className="flex-1 bg-indigo-600 hover:bg-indigo-750 text-white font-bold py-3 rounded-lg flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50 transition-all active:scale-95 font-sans text-xs"
            >
              {submitLoading ? (
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              ) : editingId ? (
                <Check className="w-3.5 h-3.5" />
              ) : (
                <Plus className="w-3.5 h-3.5" />
              )}
              {submitLoading ? "Uploading..." : editingId ? "Save Changes" : "Publish Photo"}
            </button>

            {editingId && (
              <button
                type="button"
                onClick={onCancelEdit}
                className="border border-slate-200 hover:bg-slate-50 text-slate-600 font-bold px-3 py-3 rounded-lg cursor-pointer transition-all"
                title="Cancel Edit"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
