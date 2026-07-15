import { Response } from "express";
import { prisma } from "../../core/db.js";
import {
  updateReservationStatusSchema,
  updatePaymentStatusSchema
} from "./booking.schemas.js";
import { ValidationError, NotFoundError, UnauthorizedError } from "../../core/errors.js";
import { AuthenticatedRequest } from "../../core/middleware.js";

export async function getReservations(req: AuthenticatedRequest, res: Response) {
  const { status, paymentStatus, search } = req.query;

  const whereClause: any = {};
  if (status) whereClause.status = status as string;
  if (paymentStatus) whereClause.paymentStatus = paymentStatus as string;
  if (search) {
    whereClause.OR = [
      { id: { contains: search as string } },
      { fullName: { contains: search as string } },
      { phone: { contains: search as string } },
      { roomNumber: { contains: search as string } },
      { paymentMessage: { contains: search as string } },
    ];
  }

  const bookings = await prisma.booking.findMany({
    where: whereClause,
    include: { roomType: true, room: true },
    orderBy: { createdAt: "desc" }
  });

  res.json(bookings);
}

export async function updateReservationStatus(req: AuthenticatedRequest, res: Response) {
  const { id } = req.params;
  const result = updateReservationStatusSchema.safeParse(req.body);
  if (!result.success) {
    throw new ValidationError("Invalid status value", result.error.flatten().fieldErrors);
  }

  const { status } = result.data;

  const booking = await prisma.booking.findUnique({ where: { id } });
  if (!booking) {
    throw new NotFoundError("Booking not found");
  }

  const updated = await prisma.booking.update({
    where: { id },
    data: { status },
    include: { roomType: true, room: true }
  });

  res.json(updated);
}

export async function updatePaymentStatus(req: AuthenticatedRequest, res: Response) {
  const { id } = req.params;
  const result = updatePaymentStatusSchema.safeParse(req.body);
  if (!result.success) {
    throw new ValidationError("Invalid paymentStatus value", result.error.flatten().fieldErrors);
  }

  const { paymentStatus } = result.data;

  const booking = await prisma.booking.findUnique({ where: { id } });
  if (!booking) {
    throw new NotFoundError("Booking not found");
  }

  const staffUser = req.user;
  if (!staffUser) {
    throw new UnauthorizedError("Authentication required");
  }

  const updated = await prisma.booking.update({
    where: { id },
    data: { paymentStatus },
    include: { roomType: true }
  });

  await prisma.auditLog.create({
    data: {
      bookingId: id,
      userId: staffUser.id,
      action: "PAYMENT_STATUS_CHANGE",
      details: `Payment updated from ${booking.paymentStatus} to ${paymentStatus} by ${staffUser.name}`,
    }
  });

  res.json(updated);
}

export async function staffCancelBooking(req: AuthenticatedRequest, res: Response) {
  const { id } = req.params;
  const booking = await prisma.booking.findUnique({ where: { id } });
  if (!booking) {
    throw new NotFoundError("Booking not found");
  }

  const staffUser = req.user;
  if (!staffUser) {
    throw new UnauthorizedError("Authentication required");
  }

  const updated = await prisma.booking.update({
    where: { id },
    data: { status: "CANCELLED" },
    include: { roomType: true }
  });

  await prisma.auditLog.create({
    data: {
      bookingId: id,
      userId: staffUser.id,
      action: "CANCEL",
      details: `Reservation cancelled via phone/front desk by ${staffUser.name}`,
    }
  });

  res.json(updated);
}

export async function deleteBooking(req: AuthenticatedRequest, res: Response) {
  const { id } = req.params;
  try {
    await prisma.booking.delete({ where: { id } });
    res.json({ success: true, message: "Booking permanently deleted" });
  } catch {
    throw new NotFoundError(`Booking with ID ${id} not found`);
  }
}
