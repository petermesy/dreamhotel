import { Response } from "express";
import { prisma } from "../../core/db.js";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import path from "path";
import { createGalleryImageSchema, updateGalleryImageSchema } from "./gallery.schemas.js";
import { ValidationError, NotFoundError } from "../../core/errors.js";
import { AuthenticatedRequest } from "../../core/middleware.js";

// Initialize Cloudinary if credentials exist
const isCloudinaryConfigured = !!(
  process.env.CLOUDINARY_CLOUD_NAME &&
  process.env.CLOUDINARY_API_KEY &&
  process.env.CLOUDINARY_API_SECRET
);

if (isCloudinaryConfigured) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
  console.log("Cloudinary successfully configured for Gallery image uploads.");
} else {
  console.log("Cloudinary credentials missing. Gallery uploads will fallback to local disk storage (/uploads).");
}

// Upload buffer to Cloudinary
function uploadBufferToCloudinary(buffer: Buffer): Promise<string> {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: "dream_hotel_gallery" },
      (error, result) => {
        if (error) return reject(error);
        if (!result) return reject(new Error("No response from Cloudinary."));
        resolve(result.secure_url);
      }
    );
    uploadStream.end(buffer);
  });
}

// Fallback: save file locally on disk
async function saveFileLocally(buffer: Buffer, originalname: string): Promise<string> {
  const uploadsDir = path.join(process.cwd(), "uploads");
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }
  const ext = path.extname(originalname) || ".jpg";
  const filename = `gallery-${Date.now()}-${Math.floor(Math.random() * 1000)}${ext}`;
  const filePath = path.join(uploadsDir, filename);
  await fs.promises.writeFile(filePath, buffer);
  return `/uploads/${filename}`;
}

// Helper to process uploaded file or get the URL
async function processImageUpload(file?: Express.Multer.File): Promise<string | null> {
  if (!file) return null;

  if (isCloudinaryConfigured) {
    try {
      return await uploadBufferToCloudinary(file.buffer);
    } catch (err) {
      console.error("Cloudinary upload failed, falling back to local file storage:", err);
      return await saveFileLocally(file.buffer, file.originalname);
    }
  } else {
    return await saveFileLocally(file.buffer, file.originalname);
  }
}

// --- CONTROLLER ACTIONS ---

// Get All Gallery Images
export async function getGalleryImages(_req: AuthenticatedRequest, res: Response) {
  const images = await prisma.galleryImage.findMany({
    orderBy: { createdAt: "desc" },
  });
  res.json(images);
}

// Create Gallery Image (Reception / Admin)
export async function createGalleryImage(req: AuthenticatedRequest, res: Response) {
  const result = createGalleryImageSchema.safeParse(req.body);
  if (!result.success) {
    throw new ValidationError("Invalid gallery image data", result.error.flatten().fieldErrors);
  }

  const { title, description, category, url: bodyUrl } = result.data;
  
  let imageUrl = bodyUrl || "";

  if (req.file) {
    const uploadedUrl = await processImageUpload(req.file);
    if (uploadedUrl) {
      imageUrl = uploadedUrl;
    }
  }

  if (!imageUrl) {
    throw new ValidationError("An image file upload or image URL is required.");
  }

  const galleryItem = await prisma.galleryImage.create({
    data: {
      url: imageUrl,
      category,
      title,
      description,
    },
  });

  res.status(201).json(galleryItem);
}

// Update Gallery Image (Reception / Admin)
export async function updateGalleryImage(req: AuthenticatedRequest, res: Response) {
  const { id } = req.params;
  const imageId = parseInt(id, 10);

  if (isNaN(imageId)) {
    throw new ValidationError("Invalid gallery image ID");
  }

  const result = updateGalleryImageSchema.safeParse(req.body);
  if (!result.success) {
    throw new ValidationError("Invalid update data", result.error.flatten().fieldErrors);
  }

  const { title, description, category, url: bodyUrl } = result.data;

  // Retrieve existing record first to check if it exists
  const existing = await prisma.galleryImage.findUnique({
    where: { id: imageId },
  });

  if (!existing) {
    throw new NotFoundError(`Gallery image with ID ${imageId} not found`);
  }

  let imageUrl = bodyUrl || undefined;

  if (req.file) {
    const uploadedUrl = await processImageUpload(req.file);
    if (uploadedUrl) {
      imageUrl = uploadedUrl;
    }
  }

  const updated = await prisma.galleryImage.update({
    where: { id: imageId },
    data: {
      url: imageUrl,
      category: category ?? undefined,
      title: title ?? undefined,
      description: description ?? undefined,
    },
  });

  res.json(updated);
}

// Delete Gallery Image (Reception / Admin)
export async function deleteGalleryImage(req: AuthenticatedRequest, res: Response) {
  const { id } = req.params;
  const imageId = parseInt(id, 10);

  if (isNaN(imageId)) {
    throw new ValidationError("Invalid gallery image ID");
  }

  try {
    await prisma.galleryImage.delete({
      where: { id: imageId },
    });
    res.json({ success: true, message: "Gallery image deleted successfully" });
  } catch (error) {
    throw new NotFoundError(`Gallery image with ID ${imageId} not found`);
  }
}
