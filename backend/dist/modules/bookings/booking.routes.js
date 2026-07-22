import { Router } from "express";
import { createBooking, getBookingLookup, submitReceiptMessage, cancelBooking, getUserBookings, getReservations, updateReservationStatus, updatePaymentStatus, staffCancelBooking, deleteBooking, getDashboardStats, getMonthlyReports, getStaffRoster, createStaffAccount, updateStaffStatus, deleteStaffAccount, getAuditLogs, updateBookingDetails } from "./booking.controller.js";
import { authenticate, authenticateOptional, requireOwner, requireAdminOrOwner } from "../../core/middleware.js";
import { asyncHandler } from "../../core/errors.js";
const router = Router();
// ======================== PUBLIC ENDPOINTS ========================
router.post("/bookings", authenticateOptional, asyncHandler(createBooking));
router.get("/bookings/lookup/:id", asyncHandler(getBookingLookup));
router.post("/bookings/lookup/:id/cancel", asyncHandler(cancelBooking));
router.post("/bookings/lookup/:id/receipt", asyncHandler(submitReceiptMessage));
router.put("/bookings/lookup/:id", asyncHandler(updateBookingDetails));
// Personal bookings (authenticated client)
router.get("/bookings/my", authenticate, asyncHandler(getUserBookings));
// ======================== ADMIN & STAFF ENDPOINTS ========================
router.get("/admin/reservations", authenticate, requireAdminOrOwner, asyncHandler(getReservations));
router.post("/admin/reservations/:id/status", authenticate, requireAdminOrOwner, asyncHandler(updateReservationStatus));
router.post("/admin/reservations/:id/payment", authenticate, requireAdminOrOwner, asyncHandler(updatePaymentStatus));
router.post("/admin/reservations/:id/cancel", authenticate, requireAdminOrOwner, asyncHandler(staffCancelBooking));
// ======================== OWNER ONLY ENDPOINTS ========================
router.delete("/admin/reservations/:id", authenticate, requireOwner, asyncHandler(deleteBooking));
router.get("/admin/audit-logs", authenticate, requireOwner, asyncHandler(getAuditLogs));
router.get("/admin/dashboard-stats", authenticate, requireOwner, asyncHandler(getDashboardStats));
router.get("/admin/reports/monthly", authenticate, requireOwner, asyncHandler(getMonthlyReports));
// Staff roster management
router.get("/admin/staff", authenticate, requireOwner, asyncHandler(getStaffRoster));
router.post("/admin/staff", authenticate, requireOwner, asyncHandler(createStaffAccount));
router.put("/admin/staff/:id/status", authenticate, requireOwner, asyncHandler(updateStaffStatus));
router.delete("/admin/staff/:id", authenticate, requireOwner, asyncHandler(deleteStaffAccount));
export default router;
