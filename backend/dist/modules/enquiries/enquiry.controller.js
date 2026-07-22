import { prisma } from "../../core/db.js";
import { createEnquirySchema, updateEnquiryStatusSchema } from "./enquiry.schemas.js";
import { ValidationError, NotFoundError } from "../../core/errors.js";
// Create Conference Hall Enquiry
export async function createEnquiry(req, res) {
    const result = createEnquirySchema.safeParse(req.body);
    if (!result.success) {
        throw new ValidationError("Invalid enquiry request data", result.error.flatten().fieldErrors);
    }
    const { name, organization, eventType, date, estimatedAttendance, cateringRequirement, message } = result.data;
    const enquiry = await prisma.enquiry.create({
        data: {
            name,
            organization,
            eventType,
            date: new Date(date),
            estimatedAttendance,
            cateringRequirement,
            message,
            status: "PENDING",
        }
    });
    res.status(201).json(enquiry);
}
// Get All Enquiries (Admin/Staff)
export async function getEnquiries(_req, res) {
    const enquiries = await prisma.enquiry.findMany({
        orderBy: { createdAt: "desc" }
    });
    res.json(enquiries);
}
// Update Enquiry Status (Admin/Staff)
export async function updateEnquiryStatus(req, res) {
    const { id } = req.params;
    if (!id) {
        throw new ValidationError("Invalid enquiry ID");
    }
    const result = updateEnquiryStatusSchema.safeParse(req.body);
    if (!result.success) {
        throw new ValidationError("Invalid enquiry status update", result.error.flatten().fieldErrors);
    }
    const { status } = result.data;
    const enquiryId = Number.parseInt(id, 10);
    if (!Number.isInteger(enquiryId)) {
        throw new ValidationError("Invalid enquiry ID");
    }
    try {
        const updated = await prisma.enquiry.update({
            where: { id: enquiryId },
            data: { status }
        });
        res.json(updated);
    }
    catch (error) {
        throw new NotFoundError(`Enquiry with ID ${enquiryId} not found`);
    }
}
