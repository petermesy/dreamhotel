import { Router } from "express";
import multer from "multer";
import { getGalleryImages, createGalleryImage, updateGalleryImage, deleteGalleryImage } from "./gallery.controller.js";
import { authenticate, requireAdminOrOwner } from "../../core/middleware.js";
import { asyncHandler } from "../../core/errors.js";

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  }
});

const router = Router();

// Public route to fetch all images
router.get("/gallery", asyncHandler(getGalleryImages));

// Admin/Staff routes (accessible by reception and owner roles)
router.post("/admin/gallery", authenticate, requireAdminOrOwner, upload.single("image"), asyncHandler(createGalleryImage));
router.put("/admin/gallery/:id", authenticate, requireAdminOrOwner, upload.single("image"), asyncHandler(updateGalleryImage));
router.delete("/admin/gallery/:id", authenticate, requireAdminOrOwner, asyncHandler(deleteGalleryImage));

export default router;
