import { z } from "zod";

export const createBookingSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  email: z.string().email("A valid email address is required"),
  purpose: z.string().min(1, "Purpose of travel/stay is required"),
  address: z.string().min(1, "Address is required"),
  nationalId: z.string().min(1, "National ID / Passport Number is required"),
  roomTypeId: z.string().min(1, "Selected room type is required"),
  checkIn: z.string().min(1, "Check-in date is required"),
  checkOut: z.string().min(1, "Check-out date is required"),
  phone: z.string().min(1, "Phone number is required"),
  paymentMessage: z.string().optional().nullable(),
  userId: z.union([z.number(), z.string()]).optional().nullable().transform((val) => {
    if (!val) return null;
    const parsed = typeof val === "string" ? parseInt(val, 10) : val;
    return isNaN(parsed) ? null : parsed;
  })
});

export const updateBookingDetailsSchema = z.object({
  fullName: z.string().optional(),
  email: z.string().email("A valid email address is required").optional(),
  purpose: z.string().optional(),
  address: z.string().optional(),
  nationalId: z.string().optional(),
  phone: z.string().optional(),
  checkIn: z.string().optional(),
  checkOut: z.string().optional(),
  roomTypeId: z.string().optional()
});

export const submitReceiptSchema = z.object({
  paymentMessage: z.string().min(1, "Payment receipt message cannot be empty")
});

export const updateReservationStatusSchema = z.object({
  status: z.enum(["CHECKED_IN", "CHECKED_OUT", "BOOKED"])
});

export const updatePaymentStatusSchema = z.object({
  paymentStatus: z.enum(["PENDING", "RECEIVED"])
});

export const createStaffAccountSchema = z.object({
  email: z.string().email("A valid email address is required"),
  name: z.string().min(1, "Full name is required"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  role: z.enum(["RECEPTION", "OWNER", "ADMIN"])
});

export const updateStaffStatusSchema = z.object({
  status: z.enum(["ACTIVE", "SUSPENDED"])
});
