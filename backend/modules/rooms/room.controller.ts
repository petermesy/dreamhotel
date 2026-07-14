import { Response } from "express";
import { prisma } from "../../core/db.js";
import { checkAvailabilitySchema, updateRoomTypeSchema } from "./room.schemas.js";
import { ValidationError, NotFoundError } from "../../core/errors.js";
import { AuthenticatedRequest } from "../../core/middleware.js";

function parseAmenities(raw: string) {
  try {
    return JSON.parse(raw);
  } catch {
    if (typeof raw === "string") {
      return raw.split(",").map((item) => item.trim()).filter(Boolean);
    }
    return raw;
  }
}

// Get Public Room Types
export async function getRoomTypes(_req: AuthenticatedRequest, res: Response) {
  const roomTypes = await prisma.roomType.findMany();
  const formatted = roomTypes.map(rt => ({
    ...rt,
    amenities: parseAmenities(rt.amenities),
  }));
  res.json(formatted);
}

// Get Public Room Availability / Catalog
export async function getRoomsAvailability(req: AuthenticatedRequest, res: Response) {
  const queryResult = checkAvailabilitySchema.safeParse(req.query);
  if (!queryResult.success) {
    throw new ValidationError("Invalid query parameters", queryResult.error.flatten().fieldErrors);
  }

  const { checkIn, checkOut, roomTypeId } = queryResult.data;

  if (!checkIn || !checkOut) {
    const rooms = await prisma.room.findMany({
      where: { status: "AVAILABLE" },
      include: { roomType: true }
    });
    res.json(rooms);
    return;
  }

  const start = new Date(checkIn);
  const end = new Date(checkOut);

  if (isNaN(start.getTime()) || isNaN(end.getTime()) || start >= end) {
    throw new ValidationError("Invalid date range parameters: Check-out must be after check-in date");
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

  const whereClause: any = {
    status: "AVAILABLE",
    roomNumber: { notIn: bookedRoomNumbers }
  };

  if (roomTypeId) {
    whereClause.roomTypeId = roomTypeId;
  }

  const availableRooms = await prisma.room.findMany({
    where: whereClause,
    include: { roomType: true }
  });

  res.json(availableRooms);
}

// Get All Rooms (Admin/Staff)
export async function getRooms(_req: AuthenticatedRequest, res: Response) {
  const rooms = await prisma.room.findMany({
    include: { roomType: true },
    orderBy: { roomNumber: "asc" }
  });
  res.json(rooms);
}

// Toggle Room Maintenance Status (Owner/Admin)
export async function toggleRoomStatus(req: AuthenticatedRequest, res: Response) {
  const { roomNumber } = req.params;
  const { status } = req.body; // "AVAILABLE" or "MAINTENANCE"

  if (!["AVAILABLE", "MAINTENANCE"].includes(status)) {
    throw new ValidationError("Invalid status value: must be 'AVAILABLE' or 'MAINTENANCE'");
  }

  try {
    const updated = await prisma.room.update({
      where: { roomNumber },
      data: { status },
      include: { roomType: true }
    });
    res.json(updated);
  } catch (error) {
    throw new NotFoundError(`Room number ${roomNumber} not found`);
  }
}

// Update Room Type Tariff (Owner Exclusive)
export async function updateRoomType(req: AuthenticatedRequest, res: Response) {
  const { id } = req.params;
  const bodyResult = updateRoomTypeSchema.safeParse(req.body);
  if (!bodyResult.success) {
    throw new ValidationError("Invalid room type update data", bodyResult.error.flatten().fieldErrors);
  }

  const { rate, description } = bodyResult.data;
  const { bedConfig, amenities } = req.body;

  try {
    const updated = await prisma.roomType.update({
      where: { id },
      data: {
        rate,
        bedConfig,
        amenities: amenities ? JSON.stringify(amenities) : undefined,
        description,
      }
    });

    res.json({
      ...updated,
      amenities: JSON.parse(updated.amenities)
    });
  } catch (error) {
    throw new NotFoundError(`Room type with ID ${id} not found`);
  }
}
