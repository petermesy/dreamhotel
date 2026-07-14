import React from "react";
import { AnimatePresence } from "motion/react";
import { GalleryCategory } from "./types";
import { galleryCategoryOptions } from "./data";
import { useGalleryImages } from "./useGalleryImages";
import GalleryFilterBar from "./components/GalleryFilterBar";
import GalleryHeader from "./components/GalleryHeader";
import GalleryGrid from "./components/GalleryGrid";
import GalleryLightbox from "./components/GalleryLightbox";
import GalleryLoadingState from "./components/GalleryLoadingState";
import GalleryEmptyState from "./components/GalleryEmptyState";

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = React.useState<GalleryCategory>("all");
  const [lightboxIndex, setLightboxIndex] = React.useState<number | null>(null);
  const { images, loading } = useGalleryImages();

  const filteredImages = React.useMemo(() => {
    if (activeCategory === "all") {
      return images;
    }

    return images.filter((image) => image.category === activeCategory);
  }, [activeCategory, images]);

  const handleCategoryChange = (category: GalleryCategory) => {
    setActiveCategory(category);
    setLightboxIndex(null);
  };

  const handleSelectImage = (index: number) => {
    setLightboxIndex(index);
  };

  const handlePrevImage = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => {
      if (prev === null) return null;
      return prev === 0 ? filteredImages.length - 1 : prev - 1;
    });
  };

  const handleNextImage = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => {
      if (prev === null) return null;
      return prev === filteredImages.length - 1 ? 0 : prev + 1;
    });
  };

  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (event.key === "Escape") setLightboxIndex(null);
      if (event.key === "ArrowLeft") handlePrevImage();
      if (event.key === "ArrowRight") handleNextImage();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, filteredImages.length]);

  return (
    <div className="w-full bg-slate-50 min-h-screen pb-20 animate-fade-in" id="gallery-root">
      <GalleryFilterBar
        activeCategory={activeCategory}
        options={galleryCategoryOptions}
        onCategoryChange={handleCategoryChange}
      />

      <GalleryHeader activeCategory={activeCategory} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4" id="gallery-grid-section">
        {loading ? (
          <GalleryLoadingState />
        ) : filteredImages.length > 0 ? (
          <GalleryGrid images={filteredImages} onSelectImage={handleSelectImage} />
        ) : (
          <GalleryEmptyState />
        )}
      </div>

      <AnimatePresence>
        {lightboxIndex !== null && filteredImages[lightboxIndex] && (
          <GalleryLightbox
            image={filteredImages[lightboxIndex]}
            index={lightboxIndex}
            totalImages={filteredImages.length}
            onClose={() => setLightboxIndex(null)}
            onPrev={handlePrevImage}
            onNext={handleNextImage}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
