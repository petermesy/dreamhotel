import React from "react";
import { AnimatePresence, motion } from "motion/react";
import { GalleryImage } from "../types";
import GalleryCard from "./GalleryCard";

interface GalleryGridProps {
  images: GalleryImage[];
  onSelectImage: (index: number) => void;
}

export default function GalleryGrid({ images, onSelectImage }: GalleryGridProps) {
  return (
    <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
      <AnimatePresence mode="popLayout">
        {images.map((image, index) => (
          <GalleryCard key={image.id} image={image} onSelect={() => onSelectImage(index)} />
        ))}
      </AnimatePresence>
    </motion.div>
  );
}
