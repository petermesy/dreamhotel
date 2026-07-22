import { z } from "zod";
export const createGalleryImageSchema = z.object({
    category: z.enum(["lobby", "rooms", "dining", "meetings"]),
    title: z.string().min(1, "Title is required"),
    description: z.string().min(1, "Description is required"),
    url: z.string().optional()
});
export const updateGalleryImageSchema = z.object({
    category: z.enum(["lobby", "rooms", "dining", "meetings"]).optional(),
    title: z.string().min(1, "Title cannot be empty").optional(),
    description: z.string().min(1, "Description cannot be empty").optional(),
    url: z.string().optional()
});
