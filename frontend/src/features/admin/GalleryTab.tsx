import React from "react";
import GalleryManagerHeader from "./components/GalleryManagerHeader";
import GalleryImageForm from "./components/GalleryImageForm";
import GalleryImageGrid from "./components/GalleryImageGrid";
import { API_URL } from "../../config/api"; // adjust path

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
    fetch(`${API_URL}/api/gallery`)
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

    const endpoint = editingId ? `${API_URL}/api/admin/gallery/${editingId}` : `${API_URL}/api/admin/gallery`;
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
      <GalleryManagerHeader loading={loading} onRefresh={fetchImages} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <GalleryImageForm
          editingId={editingId}
          title={title}
          description={description}
          category={category}
          file={file}
          previewUrl={previewUrl}
          directUrl={directUrl}
          error={error}
          success={success}
          submitLoading={submitLoading}
          onTitleChange={setTitle}
          onDescriptionChange={setDescription}
          onCategoryChange={setCategory}
          onFileChange={handleFileChange}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onDirectUrlChange={(value) => {
            setDirectUrl(value);
            setPreviewUrl(value || null);
            setFile(null);
          }}
          onSubmit={handleSubmit}
          onCancelEdit={handleCancelEdit}
        />

        <GalleryImageGrid
          images={images}
          loading={loading}
          onEdit={handleEditInit}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
}
