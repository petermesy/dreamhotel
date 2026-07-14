import { Router } from "express";
import { createEnquiry, getEnquiries, updateEnquiryStatus } from "./enquiry.controller.js";
import { authenticate, requireAdminOrOwner } from "../../core/middleware.js";
import { asyncHandler } from "../../core/errors.js";

const router = Router();

// Public route
router.post("/enquiries", asyncHandler(createEnquiry));

// Admin/Staff routes
router.get("/admin/enquiries", authenticate, requireAdminOrOwner, asyncHandler(getEnquiries));
router.post("/admin/enquiries/:id/status", authenticate, requireAdminOrOwner, asyncHandler(updateEnquiryStatus));

export default router;
