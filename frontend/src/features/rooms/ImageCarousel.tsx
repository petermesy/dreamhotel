import React, { useState, useEffect, useCallback } from "react";

interface ImageCarouselProps {
  images: string[];
  title: string;
}

export const ImageCarousel: React.FC<ImageCarouselProps> = React.memo(({ images, title }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  useEffect(() => {
    if (images.length <= 1) return;
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [nextSlide, images.length]);

  return (
    <div className="space-y-4">
      <div className="relative w-full h-[240px] sm:h-[350px] md:h-[420px] rounded-sm overflow-hidden group shadow border border-slate-100">
        <img
          src={images[currentIndex]}
          alt={`${title} - View ${currentIndex + 1}`}
          className="w-full h-full object-cover transition-all duration-700"
          referrerPolicy="no-referrer"
        />

        {images.length > 1 && (
          <>
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/90 text-white w-9 h-9 flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-all"
              aria-label="Previous image"
            >
              ←
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/90 text-white w-9 h-9 flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-all"
              aria-label="Next image"
            >
              →
            </button>

            <div className="absolute top-4 right-4 bg-black/80 px-3 py-1 text-xs font-mono text-white rounded">
              {currentIndex + 1} / {images.length}
            </div>
          </>
        )}
      </div>

      {images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-2">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`relative w-20 h-14 rounded-sm overflow-hidden border-2 shrink-0 transition-all ${
                currentIndex === idx ? "border-indigo-600" : "border-slate-200 hover:border-slate-300"
              }`}
            >
              <img 
                src={img} 
                alt={`Thumbnail ${idx + 1}`} 
                className="w-full h-full object-cover" 
                referrerPolicy="no-referrer" 
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
});