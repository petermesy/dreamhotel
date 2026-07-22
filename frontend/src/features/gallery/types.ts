export type GalleryCategory = "all" | "lobby" | "rooms" | "dining" | "meetings";

export interface GalleryImage {
  id: string | number;
  url: string;
  category: Exclude<GalleryCategory, "all">;
  title: string;
  description: string;
}

export interface GalleryCategoryOption {
  id: GalleryCategory;
  label: string;
}
