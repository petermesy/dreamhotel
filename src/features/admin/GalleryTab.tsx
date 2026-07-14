import React from "react";
import { Upload, Edit3, Trash2, Plus, RefreshCw, Image as ImageIcon, Sparkles, Check, X } from "lucide-react";
import { optimizeCloudinaryUrl } from "../gallery/cloudinary";

interface GalleryImage {
  id: number;
  url: string;
  category: "lobby" | "rooms" | "dining" | "meetings";
  title: string;
  description: string;
  createdAt: string;
}

export default function GalleryTab() {
  const [images, setImages] = React.useState<GalleryImage[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [submitLoading, setSubmitLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [success, setSuccess] = React.useState<string | null>(null);

  // Form states
  const [editingId, setEditingId] = React.useState<number | null>(null);
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [category, setCategory] = React.useState<"lobby" | "rooms" | "dining" | "meetings">("lobby");
  const [file, setFile] = React.useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = React.useState<string | null>(null);
  const [directUrl, setDirectUrl] = React.useState("");

  const fetchImages = () => {
    setLoading(true);
    setError(null);
    fetch("/api/gallery")
      .then((res) => {
        if (!res.ok) throw new Error("Could not retrieve gallery records.");
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setImages(data);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Gallery fetch failed:", err);
        setError("Failed to fetch gallery items from the database. Please make sure the backend is running.");
        setLoading(false);
      });
  };

  React.useEffect(() => {
    fetchImages();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setPreviewUrl(URL.createObjectURL(selectedFile));
      setDirectUrl(""); // Reset manual URL if file is chosen
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const selectedFile = e.dataTransfer.files[0];
      setFile(selectedFile);
      setPreviewUrl(URL.createObjectURL(selectedFile));
      setDirectUrl("");
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setTitle("");
    setDescription("");
    setCategory("lobby");
    setFile(null);
    setPreviewUrl(null);
    setDirectUrl("");
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!title.trim() || !description.trim()) {
      setError("Title and description are required.");
      return;
    }

    if (!file && !directUrl.trim() && !editingId) {
      setError("Please drag & drop an image, upload a file, or provide a direct image URL.");
      return;
    }

    setSubmitLoading(true);

    const formData = new FormData();
    formData.append("title", title.trim());
    formData.append("description", description.trim());
    formData.append("category", category);
    
    if (file) {
      formData.append("image", file);
    } else if (directUrl.trim()) {
      formData.append("url", directUrl.trim());
    }

    const token = localStorage.getItem("dp_token") || "";

    const endpoint = editingId ? `/api/admin/gallery/${editingId}` : "/api/admin/gallery";
    const method = editingId ? "PUT" : "POST";

    try {
      const res = await fetch(endpoint, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to save the gallery record.");
      }

      setSuccess(editingId ? "Gallery item updated successfully!" : "Gallery image uploaded successfully!");
      handleCancelEdit();
      fetchImages();
    } catch (err: any) {
      setError(err.message || "An error occurred during submission.");
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleEditInit = (img: GalleryImage) => {
    setEditingId(img.id);
    setTitle(img.title);
    setDescription(img.description);
    setCategory(img.category);
    setDirectUrl(img.url);
    setPreviewUrl(img.url);
    setFile(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to permanently delete this photo from the gallery?")) {
      return;
    }

    setError(null);
    setSuccess(null);
    const token = localStorage.getItem("dp_token") || "";

    try {
      const res = await fetch(`/api/admin/gallery/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to delete item.");
      }

      setSuccess("Gallery item deleted successfully.");
      fetchImages();
    } catch (err: any) {
      setError(err.message || "Could not delete gallery item.");
    }
  };

  return (
    <div className="space-y-8 animate-fade-in" id="gallery-manager-tab-content">
      {/* Upper header section */}
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
          onClick={fetchImages}
          disabled={loading}
          className="bg-slate-50 hover:bg-slate-100 border border-slate-200 hover:border-slate-300 text-slate-700 px-3.5 py-2 rounded-lg text-xs font-mono font-bold flex items-center justify-center gap-1.5 transition-all active:scale-95 cursor-pointer disabled:opacity-50"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
          Refresh Database
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Side: Creation/Edition Form */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm font-mono text-xs flex flex-col justify-between h-fit self-start">
          <div>
            <h4 className="text-sm font-bold text-slate-950 mb-1 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-indigo-600" />
              {editingId ? "Modify Gallery Photo" : "Upload New Gallery Photo"}
            </h4>
            <p className="text-[10px] text-slate-400 mb-6">
              {editingId ? "Updating existing records in SQLite database" : "Accepts JPG/PNG uploads with auto-Cloudinary delivery"}
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex flex-col gap-1">
                <label className="font-bold text-slate-700">Photo Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Cozy Double Bedroom Set"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 outline-none text-slate-950 focus:border-indigo-500 transition-all font-mono"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-bold text-slate-700">Category Tag *</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
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
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 outline-none text-slate-950 focus:border-indigo-500 transition-all font-mono leading-relaxed"
                />
              </div>

              {/* Upload Zone */}
              <div className="flex flex-col gap-1">
                <label className="font-bold text-slate-700">Image Asset Source *</label>
                
                {/* Drag and Drop Zone */}
                <div
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                  onClick={() => document.getElementById("gallery-file-input")?.click()}
                  className="border-2 border-dashed border-slate-200 hover:border-indigo-400 bg-slate-50 hover:bg-slate-100/55 rounded-xl p-6 text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-2 group relative overflow-hidden"
                >
                  <input
                    type="file"
                    id="gallery-file-input"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  
                  {previewUrl ? (
                    <div className="relative w-full h-32 rounded-lg overflow-hidden border border-slate-200">
                      <img
                        src={previewUrl}
                        alt="Preview"
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
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
                  onChange={(e) => {
                    setDirectUrl(e.target.value);
                    setPreviewUrl(e.target.value || null);
                    setFile(null); // Reset file if URL is written
                  }}
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
                    onClick={handleCancelEdit}
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

        {/* Right Side: Existing Photos Grid and CRUD Controls */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm lg:col-span-2">
          <h4 className="text-sm font-bold text-slate-950 mb-1">Live Gallery Database</h4>
          <p className="text-xs font-mono text-slate-400 mb-6">
            Displaying photos loaded from the SQLite database. Reception can modify details or delete photos.
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
                <div
                  key={img.id}
                  className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex gap-4 hover:shadow-sm transition-all relative group"
                >
                  {/* Photo representation */}
                  <div className="w-20 h-20 bg-slate-200 rounded-lg overflow-hidden shrink-0 border border-slate-300 relative">
                    <img
                      src={optimizeCloudinaryUrl(img.url, {
                                width: 400,
                                crop: "fill",
                                gravity: "auto",
                                quality: "auto",
                                dpr: "auto",
                                format: "auto",
                              })}
                      alt={img.title}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <span className="absolute top-1 left-1 bg-slate-900/80 text-[8px] font-mono text-white px-1 py-0.5 rounded scale-90 origin-top-left font-bold uppercase tracking-wide">
                      {img.category}
                    </span>
                  </div>

                  {/* Details representation */}
                  <div className="flex-1 flex flex-col justify-between min-w-0 font-mono text-[11px]">
                    <div>
                      <h5 className="font-sans font-bold text-slate-900 truncate pr-6" title={img.title}>
                        {img.title}
                      </h5>
                      <p className="text-slate-500 leading-tight mt-1 line-clamp-2 text-[10px]" title={img.description}>
                        {img.description}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-200/50">
                      <span className="text-[9px] text-slate-400 font-bold uppercase">ID: {img.id}</span>
                      <div className="flex gap-1.5">
                        <button
                          onClick={() => handleEditInit(img)}
                          className="p-1 bg-white hover:bg-indigo-50 border border-slate-200 hover:border-indigo-200 text-slate-600 hover:text-indigo-600 rounded transition-all cursor-pointer"
                          title="Edit Details"
                        >
                          <Edit3 className="w-3 h-3" />
                        </button>
                        <button
                          onClick={() => handleDelete(img.id)}
                          className="p-1 bg-white hover:bg-rose-50 border border-slate-200 hover:border-rose-200 text-slate-600 hover:text-rose-600 rounded transition-all cursor-pointer"
                          title="Delete Photo Permanently"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
