import { Response } from "express";
import { prisma } from "../../core/db.js";
import { AuthenticatedRequest } from "../../core/middleware.js";

export async function getDashboardStats(_req: AuthenticatedRequest, res: Response) {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  const firstDayOfWeek = new Date(today);
  firstDayOfWeek.setDate(today.getDate() - today.getDay());
  const lastDayOfWeek = new Date(firstDayOfWeek);
  lastDayOfWeek.setDate(firstDayOfWeek.getDate() + 7);

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
