import { useEffect, useState } from "react";
import { galleryImages } from "./data";
import { GalleryImage } from "./types";
import { API_URL } from "@/src/config/api"; 
export function useGalleryImages() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/api/gallery`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch gallery images");
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setImages(data);
        } else {
          setImages(galleryImages);
        }
      })
      .catch((error) => {
        console.error("API error fetching gallery, falling back to local list:", error);
        setImages(galleryImages);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return { images, loading };
}
