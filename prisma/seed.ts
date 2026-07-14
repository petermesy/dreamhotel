import { PrismaClient } from "@prisma/client";
import * as crypto from "crypto";

const prisma = new PrismaClient();

function hashPassword(password: string): string {
  return crypto.createHash("sha256").update(password).digest("hex");
}

async function main() {
  console.log("Seeding database...");

  // 1. Create Default Users
  const ownerPassword = hashPassword("owner123");
  const receptionPassword = hashPassword("staff123");

  const owner = await prisma.user.upsert({
    where: { email: "owner@dp.com" },
    update: {},
    create: {
      email: "owner@dp.com",
      password: ownerPassword,
      name: "Abebe Kebede (Owner)",
      role: "OWNER",
      status: "ACTIVE",
    },
  });

  const reception = await prisma.user.upsert({
    where: { email: "reception@dp.com" },
    update: {},
    create: {
      email: "reception@dp.com",
      password: receptionPassword,
      name: "Tigist Alene (Front Desk)",
      role: "RECEPTION",
      status: "ACTIVE",
    },
  });

  console.log("Users created:", { owner: owner.email, reception: reception.email });

  // 2. Create Room Types
  const roomTypes = [
    {
      id: "STANDARD_QUEEN",
      name: "Standard Queen Room",
      rate: 2600.0,
      bedConfig: "1 × Queen (1.50m)",
      amenities: JSON.stringify([
        "High-Speed Wi-Fi",
        "Flat-Screen TV",
        "Air Conditioning",
        "Private En-Suite Bathroom with Bathtub",
        "Private En-Suite WC",
        "In-Room Safe"
      ]),
      description: "A comfortable room perfect for single business travelers or couples, featuring a premium 1.50m queen-size bed and modern standard conveniences.",
    },
    {
      id: "SUPERIOR_KING",
      name: "Superior King Room",
      rate: 3000.0,
      bedConfig: "1 × King (1.80m)",
      amenities: JSON.stringify([
        "High-Speed Wi-Fi",
        "Flat-Screen TV",
        "Air Conditioning",
        "Private En-Suite Bathroom with Bathtub",
        "Private En-Suite WC",
        "In-Room Safe"
      ]),
      description: "Elegant, spacious room featuring a luxurious 1.80m king-size bed, pristine standard comforts, and a beautiful layout ideal for leisure or business.",
    },
    {
      id: "DOUBLE_STANDARD",
      name: "Double Standard Room",
      rate: 3000.0,
      bedConfig: "2 × Singles (1.20m ea.)",
      amenities: JSON.stringify([
        "High-Speed Wi-Fi",
        "Flat-Screen TV",
        "Air Conditioning",
        "Private En-Suite Bathroom with Bathtub",
        "Private En-Suite WC",
        "In-Room Safe"
      ]),
      description: "Perfect twin-bed configuration with two 1.20m single beds, excellent for colleagues or traveling friends seeking shared accommodation.",
    },
    {
      id: "EXECUTIVE_SUITE",
      name: "Executive Suite (VIP)",
      rate: 7500.0,
      bedConfig: "1 × King (1.80m)",
      amenities: JSON.stringify([
        "High-Speed Wi-Fi",
        "Flat-Screen TV",
        "Air Conditioning",
        "Private En-Suite Bathroom with Bathtub",
        "Private En-Suite WC",
        "In-Room Safe",
        "Separate Workspace",
        "Adjustable Lighting",
        "Premium Bedding",
        "Priority Service"
      ]),
      description: "Our premium tier executive suite featuring a separate dedicated workspace physically distinct from the bedroom, customized adjustable lighting, high-thread-count linens, and expedited priority housekeeping and room service.",
    },
  ];

  for (const rt of roomTypes) {
    await prisma.roomType.upsert({
      where: { id: rt.id },
      update: {
        name: rt.name,
        rate: rt.rate,
        bedConfig: rt.bedConfig,
        amenities: rt.amenities,
        description: rt.description,
      },
      create: rt,
    });
  }
  console.log("Room types created.");

  // 3. Create Rooms
  const rooms = [
    // G+1 Floor (8 rooms: 101 to 108)
    { roomNumber: "101", roomTypeId: "SUPERIOR_KING", floor: "G+1" },
    { roomNumber: "102", roomTypeId: "DOUBLE_STANDARD", floor: "G+1" },
    { roomNumber: "103", roomTypeId: "STANDARD_QUEEN", floor: "G+1" },
    { roomNumber: "104", roomTypeId: "STANDARD_QUEEN", floor: "G+1" },
    { roomNumber: "105", roomTypeId: "STANDARD_QUEEN", floor: "G+1" },
    { roomNumber: "106", roomTypeId: "STANDARD_QUEEN", floor: "G+1" },
    { roomNumber: "107", roomTypeId: "STANDARD_QUEEN", floor: "G+1" },
    { roomNumber: "108", roomTypeId: "STANDARD_QUEEN", floor: "G+1" },

    // G+2 Floor (7 rooms: 201 to 207, including 203 Executive Suite)
    { roomNumber: "201", roomTypeId: "SUPERIOR_KING", floor: "G+2" },
    { roomNumber: "202", roomTypeId: "DOUBLE_STANDARD", floor: "G+2" },
    { roomNumber: "203", roomTypeId: "EXECUTIVE_SUITE", floor: "G+2" },
    { roomNumber: "204", roomTypeId: "STANDARD_QUEEN", floor: "G+2" },
    { roomNumber: "205", roomTypeId: "STANDARD_QUEEN", floor: "G+2" },
    { roomNumber: "206", roomTypeId: "STANDARD_QUEEN", floor: "G+2" },
    { roomNumber: "207", roomTypeId: "STANDARD_QUEEN", floor: "G+2" },

    // G+3 Floor (7 rooms: 301 to 307, including 303 Executive Suite)
    { roomNumber: "301", roomTypeId: "SUPERIOR_KING", floor: "G+3" },
    { roomNumber: "302", roomTypeId: "DOUBLE_STANDARD", floor: "G+3" },
    { roomNumber: "303", roomTypeId: "EXECUTIVE_SUITE", floor: "G+3" },
    { roomNumber: "304", roomTypeId: "STANDARD_QUEEN", floor: "G+3" },
    { roomNumber: "305", roomTypeId: "STANDARD_QUEEN", floor: "G+3" },
    { roomNumber: "306", roomTypeId: "STANDARD_QUEEN", floor: "G+3" },
    { roomNumber: "307", roomTypeId: "STANDARD_QUEEN", floor: "G+3" },
  ];

  for (const r of rooms) {
    await prisma.room.upsert({
      where: { roomNumber: r.roomNumber },
      update: {
        roomTypeId: r.roomTypeId,
        floor: r.floor,
      },
      create: {
        roomNumber: r.roomNumber,
        roomTypeId: r.roomTypeId,
        floor: r.floor,
        status: "AVAILABLE",
      },
    });
  }
  console.log("Rooms created.");

  // 4. Create some sample bookings
  const sampleBookings = [
    {
      id: "DP-10825",
      fullName: "Michael Taylor",
      purpose: "Leisure / Tourism",
      address: "Addis Ababa, Ethiopia",
      nationalId: "NID827103",
      roomNumber: "103",
      roomTypeId: "STANDARD_QUEEN",
      checkIn: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
      checkOut: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
      phone: "+251911234567",
      status: "CHECKED_IN",
      paymentStatus: "RECEIVED",
      totalPrice: 10400.0, // 4 nights * 2600
    },
    {
      id: "DP-20412",
      fullName: "Helen Gidey",
      purpose: "Business Travel",
      address: "Hawassa, Sidama, Ethiopia",
      nationalId: "NID771944",
      roomNumber: "201",
      roomTypeId: "SUPERIOR_KING",
      checkIn: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000), // Tomorrow
      checkOut: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000), // 4 days from now
      phone: "+251912883711",
      status: "BOOKED",
      paymentStatus: "PENDING",
      totalPrice: 9000.0, // 3 nights * 3000
    },
  ];

  for (const b of sampleBookings) {
    await prisma.booking.upsert({
      where: { id: b.id },
      update: {},
      create: b,
    });
  }
  console.log("Sample bookings seeded.");

  // 5. Add initial logs
  const firstBooking = await prisma.booking.findUnique({ where: { id: "DP-10825" } });
  if (firstBooking) {
    await prisma.auditLog.create({
      data: {
        bookingId: firstBooking.id,
        userId: reception.id,
        action: "PAYMENT_STATUS_CHANGE",
        details: "Updated payment status from Pending to Received at check-in",
      },
    });
  }

  console.log("Seeding complete!");
}

main()
  .catch((e) => {
    console.error("Error during seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
