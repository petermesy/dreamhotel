import { Response } from "express";
import { prisma } from "../../core/db.js";
import * as crypto from "crypto";
import {
  createBookingSchema,
  updateBookingDetailsSchema,
  submitReceiptSchema,
  updateReservationStatusSchema,
  updatePaymentStatusSchema,
  createStaffAccountSchema,
  updateStaffStatusSchema
} from "./booking.schemas.js";
import { ValidationError, NotFoundError, ForbiddenError, ConflictError, UnauthorizedError } from "../../core/errors.js";
import { AuthenticatedRequest } from "../../core/middleware.js";

function hashPassword(password: string): string {
  return crypto.createHash("sha256").update(password).digest("hex");
}

// 1. Create Room Booking
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

  // Check availability
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

// 2. Lookup Booking by Reference ID
export async function getBookingLookup(req: AuthenticatedRequest, res: Response) {
  const { id } = req.params;
  const booking = await prisma.booking.findUnique({
    where: { id },
    include: { roomType: true, room: true }
  });

  if (!booking) {
    throw new NotFoundError("Booking not found with this reference code");
  }

  res.json(booking);
}

// 3. User submitting or updating bank SMS verification
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

  const updated = await prisma.booking.update({
    where: { id },
    data: { paymentMessage },
    include: { roomType: true, room: true }
  });

  res.json(updated);
}

// 4. Cancel Booking (Guest Self-Service)
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

// 5. Get User Bookings (Fetch all bookings associated with logged in USER)
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

  res.json(bookings);
}

// ======================== BACK-OFFICE / ADMIN CONTROLLERS ========================

// 6. Get All Reservations (with filtering)
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

// 7. Update Reservation Status (Check-In / Check-Out)
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

// 8. Approve/Toggle Payment Status (Pending -> Received) + Log Audit Log
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

// 9. Staff manual cancellation
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

// 10. Delete Booking (Owner exclusive)
export async function deleteBooking(req: AuthenticatedRequest, res: Response) {
  const { id } = req.params;
  try {
    await prisma.booking.delete({ where: { id } });
    res.json({ success: true, message: "Booking permanently deleted" });
  } catch {
    throw new NotFoundError(`Booking with ID ${id} not found`);
  }
}

// 11. Real-time Revenue Dashboard Stats & Room Usage (Owner Exclusive)
export async function getDashboardStats(_req: AuthenticatedRequest, res: Response) {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  const firstDayOfWeek = new Date(today);
  firstDayOfWeek.setDate(today.getDate() - today.getDay()); // Sunday
  const lastDayOfWeek = new Date(firstDayOfWeek);
  lastDayOfWeek.setDate(firstDayOfWeek.getDate() + 7); // Next Sunday

  const allBookings = await prisma.booking.findMany({
    where: { status: { not: "CANCELLED" } }
  });

  const receivedBookings = allBookings.filter(b => b.paymentStatus === "RECEIVED");
  const cumulativeRevenue = receivedBookings.reduce((sum, b) => sum + b.totalPrice, 0);

  const pendingBookings = allBookings.filter(b => b.paymentStatus === "PENDING");
  const pendingRevenue = pendingBookings.reduce((sum, b) => sum + b.totalPrice, 0);

  const activeCheckedInToday = await prisma.booking.findMany({
    where: {
      status: "CHECKED_IN",
      checkIn: { lte: now },
      checkOut: { gte: today }
    }
  });
  const occupiedRoomCount = activeCheckedInToday.length;

  const totalRoomsCount = await prisma.room.count({
    where: { status: "AVAILABLE" }
  });

  const occupancyRate = totalRoomsCount > 0 ? (occupiedRoomCount / totalRoomsCount) * 100 : 0;

  const thisWeekBookings = await prisma.booking.findMany({
    where: {
      status: { in: ["BOOKED", "CHECKED_IN"] },
      OR: [
        { checkIn: { lt: lastDayOfWeek }, checkOut: { gt: firstDayOfWeek } }
      ]
    },
    select: { roomNumber: true }
  });

  const uniqueRoomsUsedThisWeek = Array.from(
    new Set(thisWeekBookings.map(b => b.roomNumber).filter((n): n is string => !!n))
  );

  res.json({
    cumulativeRevenue,
    pendingRevenue,
    occupancyRate: Math.round(occupancyRate * 10) / 10,
    occupiedRoomsCount: occupiedRoomCount,
    totalRoomsCount,
    totalActiveReservations: allBookings.length,
    roomsUsedThisWeek: uniqueRoomsUsedThisWeek.length,
    roomsUsedList: uniqueRoomsUsedThisWeek,
  });
}

// 12. Monthly Occupancy and Revenue Reports Data
export async function getMonthlyReports(_req: AuthenticatedRequest, res: Response) {
  const bookings = await prisma.booking.findMany({
    where: { status: { not: "CANCELLED" } },
    orderBy: { checkIn: "asc" }
  });

  const monthsData: { [key: string]: { revenue: number, bookingsCount: number, occupiedNights: number } } = {};

  for (const b of bookings) {
    const monthKey = b.checkIn.toLocaleString("default", { month: "long", year: "numeric" });
    if (!monthsData[monthKey]) {
      monthsData[monthKey] = { revenue: 0, bookingsCount: 0, occupiedNights: 0 };
    }

    const nights = Math.ceil((b.checkOut.getTime() - b.checkIn.getTime()) / (1000 * 60 * 60 * 24));
    monthsData[monthKey].bookingsCount += 1;
    monthsData[monthKey].occupiedNights += nights;
    if (b.paymentStatus === "RECEIVED") {
      monthsData[monthKey].revenue += b.totalPrice;
    }
  }

  const report = Object.keys(monthsData).map(month => ({
    month,
    revenue: monthsData[month].revenue,
    bookingsCount: monthsData[month].bookingsCount,
    occupiedNights: monthsData[month].occupiedNights,
  }));

  res.json(report);
}

// 13. Staff account management endpoints
export async function getStaffRoster(_req: AuthenticatedRequest, res: Response) {
  const staff = await prisma.user.findMany({
    select: { id: true, email: true, name: true, role: true, status: true, createdAt: true }
  });
  res.json(staff);
}

export async function createStaffAccount(req: AuthenticatedRequest, res: Response) {
  const result = createStaffAccountSchema.safeParse(req.body);
  if (!result.success) {
    throw new ValidationError("All fields are required and must be valid", result.error.flatten().fieldErrors);
  }

  const { email, name, password, role } = result.data;

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    throw new ConflictError("Email is already taken");
  }

  const created = await prisma.user.create({
    data: {
      email,
      name,
      password: hashPassword(password),
      role,
      status: "ACTIVE"
    },
    select: { id: true, email: true, name: true, role: true, status: true }
  });

  res.status(201).json(created);
}

export async function updateStaffStatus(req: AuthenticatedRequest, res: Response) {
  const { id } = req.params;
  const result = updateStaffStatusSchema.safeParse(req.body);
  if (!result.success) {
    throw new ValidationError("Invalid status value", result.error.flatten().fieldErrors);
  }

  const { status } = result.data;
  const targetUserId = parseInt(id, 10);
  if (isNaN(targetUserId)) {
    throw new ValidationError("Invalid staff ID");
  }

  try {
    const updated = await prisma.user.update({
      where: { id: targetUserId },
      data: { status },
      select: { id: true, email: true, name: true, role: true, status: true }
    });
    res.json(updated);
  } catch {
    throw new NotFoundError(`Staff account with ID ${targetUserId} not found`);
  }
}

export async function deleteStaffAccount(req: AuthenticatedRequest, res: Response) {
  const { id } = req.params;
  const targetUserId = parseInt(id, 10);
  if (isNaN(targetUserId)) {
    throw new ValidationError("Invalid staff ID");
  }

  const loggedInOwner = req.user;
  if (!loggedInOwner) {
    throw new UnauthorizedError("Authentication required");
  }

  if (loggedInOwner.id === targetUserId) {
    throw new ValidationError("Cannot delete your own administrator account");
  }

  try {
    await prisma.user.delete({ where: { id: targetUserId } });
    res.json({ success: true, message: "Staff account deleted permanently" });
  } catch {
    throw new NotFoundError(`Staff account with ID ${targetUserId} not found`);
  }
}

// 14. Audit Logs
export async function getAuditLogs(_req: AuthenticatedRequest, res: Response) {
  const logs = await prisma.auditLog.findMany({
    include: {
      user: { select: { id: true, email: true, name: true, role: true } },
      booking: true
    },
    orderBy: { timestamp: "desc" }
  });
  res.json(logs);
}

// 15. Update Guest Booking Details (Manage Booking)
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

  // Prepare updated data object
  const updateData: any = {};
  if (fullName !== undefined) updateData.fullName = fullName;
  if (purpose !== undefined) updateData.purpose = purpose;
  if (address !== undefined) updateData.address = address;
  if (nationalId !== undefined) updateData.nationalId = nationalId;
  if (phone !== undefined) updateData.phone = phone;

  // Check if they want to modify dates or room type
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

    // Check room availability for new dates (excluding current booking)
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
