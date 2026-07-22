import { z } from "zod";
export const createEnquirySchema = z.object({
    name: z.string().min(1, "Name is required"),
    organization: z.string().min(1, "Organization is required"),
    eventType: z.string().min(1, "Event type is required"),
    date: z.string().min(1, "Event date is required"),
    estimatedAttendance: z.union([z.number(), z.string()]).transform((val) => {
        const parsed = typeof val === "string" ? parseInt(val, 10) : val;
        if (isNaN(parsed))
            return 0;
        return parsed;
    }).refine((val) => val > 0, "Estimated attendance must be greater than 0"),
    cateringRequirement: z.boolean().optional().default(false),
    message: z.string().min(1, "Message is required")
});
export const updateEnquiryStatusSchema = z.object({
    status: z.enum(["PENDING", "RESPONDED"])
});
