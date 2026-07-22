import { Router } from "express";
import authRouter from "./modules/auth/auth.routes.js";
import roomRouter from "./modules/rooms/room.routes.js";
import bookingRouter from "./modules/bookings/booking.routes.js";
import enquiryRouter from "./modules/enquiries/enquiry.routes.js";
import galleryRouter from "./modules/gallery/gallery.routes.js";
import { globalErrorHandler } from "./core/errors.js";
const router = Router();
// Domain-Specific Modular Routers
router.use("/auth", authRouter);
router.use(roomRouter);
router.use(bookingRouter);
router.use(enquiryRouter);
router.use(galleryRouter);
// Centralized error handling middleware mounted at the end of the routing chain
router.use(globalErrorHandler);
export default router;
