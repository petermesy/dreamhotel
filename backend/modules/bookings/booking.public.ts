import { Response } from "express";
import { prisma } from "../../core/db.js";
import {
  createBookingSchema,
  updateBookingDetailsSchema,
  submitReceiptSchema
} from "./booking.schemas.js";
import { ValidationError, NotFoundError, ConflictError, UnauthorizedError } from "../../core/errors.js";
import { AuthenticatedRequest } from "../../core/middleware.js";

const PAYMENT_WINDOW_MS = 12 * 60 * 60 * 1000;

async function autoCancelIfExpired(booking: any) {
  if (!booking) return booking;
  if (booking.status !== "BOOKED" || booking.paymentStatus !== "PENDING") return booking;
  if (booking.paymentMessage) return booking;

  const now = new Date();
  const deadline = new Date(booking.createdAt.getTime() + PAYMENT_WINDOW_MS);
  if (now < deadline) return booking;

  return prisma.booking.update({
    where: { id: booking.id },
    data: { status: "CANCELLED" },
    include: { roomType: true, room: true }
  });
}

export async function createBooking(req: AuthenticatedRequest, res: Response) {
  const result = createBookingSchema.safeParse(req.body);
  if (!result.success) {
    throw new ValidationError("Missing or invalid booking fields", result.error.flatten().fieldErrors);
  }

  const {
    fullName,
    purpose,
    address,
    nationalId,
    roomTypeId,
    checkIn,
    checkOut,
    phone,
    paymentMessage,
    userId
  } = result.data;

  const authenticatedUser = req.user;
  const resolvedUserId = userId ?? authenticatedUser?.id ?? null;

  const start = new Date(checkIn);
  const end = new Date(checkOut);

  if (isNaN(start.getTime()) || isNaN(end.getTime()) || start >= end) {
    throw new ValidationError("Check-out date must be after check-in date");
  }

  const roomType = await prisma.roomType.findUnique({ where: { id: roomTypeId } });
  if (!roomType) {
    throw new NotFoundError("Selected room type not found");
  }

  const overlappingBookings = await prisma.booking.findMany({
    where: {
      status: { in: ["BOOKED", "CHECKED_IN"] },
      OR: [
        { checkIn: { lt: end }, checkOut: { gt: start } }
      ]
    },
    select: { roomNumber: true }
  });

  const bookedRoomNumbers = overlappingBookings
    .map(b => b.roomNumber)
    .filter((n): n is string => !!n);

  const availableRoom = await prisma.room.findFirst({
    where: {
      roomTypeId,
      status: "AVAILABLE",
      roomNumber: { notIn: bookedRoomNumbers }
    }
  });

  if (!availableRoom) {
    throw new ConflictError("No rooms of this type are available for the selected dates.");
  }

  const nights = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
  const totalPrice = nights * roomType.rate;
  const refCode = `DP-${Math.floor(10000 + Math.random() * 90000)}`;

  const booking = await prisma.booking.create({
    data: {
      id: refCode,
      fullName,
      purpose,
      address,
      nationalId,
      roomTypeId,
      roomNumber: availableRoom.roomNumber,
      checkIn: start,
      checkOut: end,
      phone,
      status: "BOOKED",
      paymentStatus: "PENDING",
      totalPrice,
      paymentMessage: paymentMessage || null,
      userId: resolvedUserId,
    },
    include: { roomType: true, room: true }
  });

  res.status(201).json(booking);
}

export async function getBookingLookup(req: AuthenticatedRequest, res: Response) {
  const { id } = req.params;
  const booking = await prisma.booking.findUnique({
    where: { id },
    include: { roomType: true, room: true }
  });

  if (!booking) {
    throw new NotFoundError("Booking not found with this reference code");
  }

  const resolvedBooking = await autoCancelIfExpired(booking);
  res.json(resolvedBooking);
}

export async function submitReceiptMessage(req: AuthenticatedRequest, res: Response) {
  const { id } = req.params;
  const result = submitReceiptSchema.safeParse(req.body);
  if (!result.success) {
    throw new ValidationError("Receipt verification is required", result.error.flatten().fieldErrors);
  }

  const { paymentMessage } = result.data;

  const booking = await prisma.booking.findUnique({ where: { id } });
  if (!booking) {
    throw new NotFoundError("Booking not found");
  }

  const resolvedBooking = await autoCancelIfExpired(booking);
  if (resolvedBooking.status === "CANCELLED" && resolvedBooking.id === booking.id) {
    throw new ValidationError("This reservation was automatically cancelled because no payment receipt was submitted within 12 hours.");
  }

  const updated = await prisma.booking.update({
    where: { id },
    data: { paymentMessage },
    include: { roomType: true, room: true }
  });

  res.json(updated);
}

export async function cancelBooking(req: AuthenticatedRequest, res: Response) {
  const { id } = req.params;
  const booking = await prisma.booking.findUnique({ where: { id } });

  if (!booking) {
    throw new NotFoundError("Booking not found");
  }

  if (booking.status === "CANCELLED") {
    throw new ValidationError("Reservation is already cancelled");
  }

  if (booking.status === "CHECKED_OUT") {
    throw new ValidationError("Cannot cancel a completed booking");
  }

  const updated = await prisma.booking.update({
    where: { id },
    data: { status: "CANCELLED" },
    include: { roomType: true }
  });

  res.json({ message: "Booking cancelled successfully", booking: updated });
}

export async function getUserBookings(req: AuthenticatedRequest, res: Response) {
  const user = req.user;
  if (!user) {
    throw new UnauthorizedError("Not authenticated");
  }

  const normalizedName = user.name?.trim();

  const bookings = await prisma.booking.findMany({
    where: {
      OR: [
        { userId: user.id },
        ...(normalizedName
          ? [{ AND: [{ userId: null }, { fullName: { contains: normalizedName } }] }]
          : [])
      ]
    },
    include: { roomType: true, room: true },
    orderBy: { createdAt: "desc" }
  });

  const resolvedBookings = await Promise.all(bookings.map((booking) => autoCancelIfExpired(booking)));
  res.json(resolvedBookings);
}

export async function updateBookingDetails(req: AuthenticatedRequest, res: Response) {
  const { id } = req.params;
  const result = updateBookingDetailsSchema.safeParse(req.body);
  if (!result.success) {
    throw new ValidationError("Invalid request body fields", result.error.flatten().fieldErrors);
  }

  const booking = await prisma.booking.findUnique({
    where: { id },
    include: { roomType: true }
  });

  if (!booking) {
    throw new NotFoundError("Booking not found");
  }

  const { fullName, purpose, address, nationalId, phone, checkIn, checkOut, roomTypeId } = result.data;

  const updateData: any = {};
  if (fullName !== undefined) updateData.fullName = fullName;
  if (purpose !== undefined) updateData.purpose = purpose;
  if (address !== undefined) updateData.address = address;
  if (nationalId !== undefined) updateData.nationalId = nationalId;
  if (phone !== undefined) updateData.phone = phone;

  const changeDates = checkIn || checkOut;
  const changeRoomType = roomTypeId && roomTypeId !== booking.roomTypeId;

  if (changeDates || changeRoomType) {
    if (booking.status === "CHECKED_OUT" || booking.status === "CANCELLED") {
      throw new ValidationError("Cannot change dates or room type of a completed or cancelled booking");
    }

    const start = checkIn ? new Date(checkIn) : new Date(booking.checkIn);
    const end = checkOut ? new Date(checkOut) : new Date(booking.checkOut);

    if (isNaN(start.getTime()) || isNaN(end.getTime()) || start >= end) {
      throw new ValidationError("Check-out date must be after check-in date");
    }

    const targetRoomTypeId = roomTypeId || booking.roomTypeId;
    const roomType = await prisma.roomType.findUnique({ where: { id: targetRoomTypeId } });
    if (!roomType) {
      throw new NotFoundError("Selected room type not found");
    }

    const overlappingBookings = await prisma.booking.findMany({
      where: {
        id: { not: booking.id },
        status: { in: ["BOOKED", "CHECKED_IN"] },
        OR: [
          { checkIn: { lt: end }, checkOut: { gt: start } }
        ]
      },
      select: { roomNumber: true }
    });

    const bookedRoomNumbers = overlappingBookings
      .map(b => b.roomNumber)
      .filter((n): n is string => !!n);

    const availableRoom = await prisma.room.findFirst({
      where: {
        roomTypeId: targetRoomTypeId,
        status: "AVAILABLE",
        roomNumber: { notIn: bookedRoomNumbers }
      }
    });

    if (!availableRoom) {
      throw new ConflictError("No rooms of this type are available for the selected dates.");
    }

    const nights = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));

    updateData.checkIn = start;
    updateData.checkOut = end;
    updateData.roomTypeId = targetRoomTypeId;
    updateData.roomNumber = availableRoom.roomNumber;
    updateData.totalPrice = nights * roomType.rate;
  }

  const updated = await prisma.booking.update({
    where: { id },
    data: updateData,
    include: { roomType: true, room: true }
  });

  res.json(updated);
}
