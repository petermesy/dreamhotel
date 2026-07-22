import { Router } from "express";
import { getRoomTypes, getRoomsAvailability, getRooms, toggleRoomStatus, updateRoomType } from "./room.controller.js";
import { authenticate, requireOwner, requireAdminOrOwner } from "../../core/middleware.js";
import { asyncHandler } from "../../core/errors.js";
const router = Router();
// Public routes
router.get("/room-types", asyncHandler(getRoomTypes));
router.get("/rooms/availability", asyncHandler(getRoomsAvailability));
// Admin/Staff routes
router.get("/admin/rooms", authenticate, requireAdminOrOwner, asyncHandler(getRooms));
// Owner-only routes
router.post("/admin/rooms/:roomNumber/status", authenticate, requireOwner, asyncHandler(toggleRoomStatus));
router.put("/admin/room-types/:id", authenticate, requireOwner, asyncHandler(updateRoomType));
export default router;
