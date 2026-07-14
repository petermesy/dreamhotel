import { z } from "zod";

export const checkAvailabilitySchema = z.object({
  checkIn: z.string().optional(),
  checkOut: z.string().optional(),
  roomTypeId: z.string().optional()
});

export const updateRoomTypeSchema = z.object({
  rate: z.number().min(0, "Rate cannot be negative"),
  description: z.string().min(1, "Description cannot be empty")
});
