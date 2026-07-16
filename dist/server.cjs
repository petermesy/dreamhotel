"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// server.ts
var import_express7 = __toESM(require("express"), 1);
var import_path = __toESM(require("path"), 1);
var import_fs = __toESM(require("fs"), 1);

// backend/routes.ts
var import_express6 = require("express");

// backend/modules/auth/auth.routes.ts
var import_express = require("express");

// backend/core/db.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient();

// backend/modules/auth/auth.controller.ts
var crypto = __toESM(require("crypto"), 1);

// backend/modules/auth/auth.schemas.ts
var import_zod = require("zod");
var loginSchema = import_zod.z.object({
  email: import_zod.z.string().email("A valid email address is required"),
  password: import_zod.z.string().min(1, "Password is required")
});
var signupSchema = import_zod.z.object({
  email: import_zod.z.string().email("A valid email address is required"),
  password: import_zod.z.string().min(6, "Password must be at least 6 characters long"),
  name: import_zod.z.string().min(1, "Full name is required for registration")
});

// backend/core/logger.ts
var logger = {
  info(message, meta) {
    this.log("INFO" /* INFO */, message, meta);
  },
  warn(message, meta) {
    this.log("WARN" /* WARN */, message, meta);
  },
  error(message, error, meta) {
    const errorMeta = error instanceof Error ? { message: error.message, stack: error.stack, ...meta } : { error, ...meta };
    this.log("ERROR" /* ERROR */, message, errorMeta);
  },
  debug(message, meta) {
    if (process.env.NODE_ENV !== "production") {
      this.log("DEBUG" /* DEBUG */, message, meta);
    }
  },
  log(level, message, meta) {
    const logEntry = {
      timestamp: (/* @__PURE__ */ new Date()).toISOString(),
      level,
      message,
      ...meta ? { metadata: meta } : {}
    };
    if (level === "ERROR" /* ERROR */) {
      console.error(JSON.stringify(logEntry));
    } else if (level === "WARN" /* WARN */) {
      console.warn(JSON.stringify(logEntry));
    } else {
      console.log(JSON.stringify(logEntry));
    }
  }
};

// backend/core/errors.ts
var AppError = class extends Error {
  constructor(message, statusCode, isOperational = true) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace(this, this.constructor);
  }
};
var ValidationError = class extends AppError {
  constructor(message, errors) {
    super(message, 400);
    this.errors = errors;
  }
};
var UnauthorizedError = class extends AppError {
  constructor(message = "Unauthorized: Authentication required") {
    super(message, 401);
  }
};
var ForbiddenError = class extends AppError {
  constructor(message = "Forbidden: Insufficient permissions") {
    super(message, 403);
  }
};
var NotFoundError = class extends AppError {
  constructor(message = "Resource not found") {
    super(message, 404);
  }
};
var ConflictError = class extends AppError {
  constructor(message = "Conflict occurred") {
    super(message, 409);
  }
};
function asyncHandler(fn) {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
}
function globalErrorHandler(err, req, res, _next) {
  const statusCode = err instanceof AppError ? err.statusCode : 500;
  const isOperational = err instanceof AppError ? err.isOperational : false;
  const responsePayload = {
    error: err.message || "An unexpected error occurred",
    ...err instanceof ValidationError && err.errors ? { details: err.errors } : {}
  };
  if (!isOperational) {
    logger.error(`Unhandled system error: ${err.message}`, err, {
      path: req.path,
      method: req.method,
      ip: req.ip
    });
  } else {
    logger.warn(`Operational application error: ${err.message}`, {
      statusCode,
      path: req.path,
      method: req.method,
      errors: err instanceof ValidationError ? err.errors : void 0
    });
  }
  res.status(statusCode).json(responsePayload);
}

// backend/modules/auth/auth.controller.ts
function hashPassword(password) {
  return crypto.createHash("sha256").update(password).digest("hex");
}
async function login(req, res) {
  const result = loginSchema.safeParse(req.body);
  if (!result.success) {
    throw new ValidationError("Invalid request data", result.error.flatten().fieldErrors);
  }
  const { email, password } = result.data;
  const hashed = hashPassword(password);
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || user.password !== hashed) {
    throw new UnauthorizedError("Invalid email or password");
  }
  if (user.status === "SUSPENDED") {
    throw new ForbiddenError("This account has been suspended by the administrator");
  }
  const sessionToken = `${user.id}:${user.role}:${user.email}:${crypto.createHash("md5").update(user.password + "salt").digest("hex")}`;
  res.json({
    token: sessionToken,
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role
    }
  });
}
async function signup(req, res) {
  const result = signupSchema.safeParse(req.body);
  if (!result.success) {
    throw new ValidationError("Invalid signup registration data", result.error.flatten().fieldErrors);
  }
  const { email, password, name } = result.data;
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    throw new ConflictError("This email address is already registered");
  }
  const hashed = hashPassword(password);
  const user = await prisma.user.create({
    data: {
      email,
      password: hashed,
      name,
      role: "USER",
      // Regular customer/guest role
      status: "ACTIVE"
    },
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      status: true,
      createdAt: true
    }
  });
  res.status(201).json(user);
}
async function getMe(req, res) {
  const user = req.user;
  if (!user) {
    throw new UnauthorizedError("Not logged in");
  }
  res.json({
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    status: user.status
  });
}

// backend/core/middleware.ts
async function resolveAuthenticatedUser(token) {
  const legacyParts = token.split(":");
  if (legacyParts.length === 4) {
    const [userIdStr, role, email] = legacyParts;
    if (!userIdStr || !role || !email) {
      return null;
    }
    const userId = Number.parseInt(userIdStr, 10);
    if (!Number.isInteger(userId)) {
      return null;
    }
    const user2 = await prisma.user.findUnique({ where: { id: userId } });
    if (!user2 || user2.status !== "ACTIVE" || user2.role !== role || user2.email !== email) {
      return null;
    }
    return user2;
  }
  const user = await prisma.user.findFirst({ where: { email: token } });
  if (!user || user.status !== "ACTIVE") {
    return null;
  }
  return user;
}
async function authenticate(req, _res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return next(new UnauthorizedError("No authorization token provided"));
  }
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : authHeader;
  if (!token) {
    return next(new UnauthorizedError("No authorization token provided"));
  }
  try {
    const user = await resolveAuthenticatedUser(token);
    if (!user) {
      return next(new UnauthorizedError("Account suspended or unauthorized session"));
    }
    req.user = user;
    next();
  } catch (error) {
    next(new UnauthorizedError("Authentication failed"));
  }
}
async function authenticateOptional(req, _res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return next();
  }
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : authHeader;
  if (!token) {
    return next();
  }
  try {
    const user = await resolveAuthenticatedUser(token);
    if (user) {
      req.user = user;
    }
    next();
  } catch {
    next();
  }
}
function requireRoles(...roles) {
  return (req, _res, next) => {
    const user = req.user;
    if (!user) {
      return next(new UnauthorizedError("Authentication required"));
    }
    if (!roles.includes(user.role)) {
      return next(new ForbiddenError(`Forbidden: ${roles.join(" or ")} permissions required`));
    }
    next();
  };
}
var requireOwner = requireRoles("OWNER");
var requireAdminOrOwner = requireRoles("RECEPTION", "OWNER", "ADMIN");

// backend/modules/auth/auth.routes.ts
var router = (0, import_express.Router)();
router.post("/login", asyncHandler(login));
router.post("/signup", asyncHandler(signup));
router.get("/me", authenticate, asyncHandler(getMe));
var auth_routes_default = router;

// backend/modules/rooms/room.routes.ts
var import_express2 = require("express");

// backend/modules/rooms/room.schemas.ts
var import_zod2 = require("zod");
var checkAvailabilitySchema = import_zod2.z.object({
  checkIn: import_zod2.z.string().optional(),
  checkOut: import_zod2.z.string().optional(),
  roomTypeId: import_zod2.z.string().optional()
});
var updateRoomTypeSchema = import_zod2.z.object({
  rate: import_zod2.z.number().min(0, "Rate cannot be negative"),
  description: import_zod2.z.string().min(1, "Description cannot be empty")
});

// backend/modules/rooms/room.controller.ts
function parseAmenities(raw) {
  try {
    return JSON.parse(raw);
  } catch {
    if (typeof raw === "string") {
      return raw.split(",").map((item) => item.trim()).filter(Boolean);
    }
    return raw;
  }
}
async function getRoomTypes(_req, res) {
  const roomTypes = await prisma.roomType.findMany();
  const formatted = roomTypes.map((rt) => ({
    ...rt,
    amenities: parseAmenities(rt.amenities)
  }));
  res.json(formatted);
}
async function getRoomsAvailability(req, res) {
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
  const bookedRoomNumbers = overlappingBookings.map((b) => b.roomNumber).filter((n) => !!n);
  const whereClause = {
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
async function getRooms(_req, res) {
  const rooms = await prisma.room.findMany({
    include: { roomType: true },
    orderBy: { roomNumber: "asc" }
  });
  res.json(rooms);
}
async function toggleRoomStatus(req, res) {
  const { roomNumber } = req.params;
  const { status } = req.body;
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
async function updateRoomType(req, res) {
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
        amenities: amenities ? JSON.stringify(amenities) : void 0,
        description
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

// backend/modules/rooms/room.routes.ts
var router2 = (0, import_express2.Router)();
router2.get("/room-types", asyncHandler(getRoomTypes));
router2.get("/rooms/availability", asyncHandler(getRoomsAvailability));
router2.get("/admin/rooms", authenticate, requireAdminOrOwner, asyncHandler(getRooms));
router2.post("/admin/rooms/:roomNumber/status", authenticate, requireOwner, asyncHandler(toggleRoomStatus));
router2.put("/admin/room-types/:id", authenticate, requireOwner, asyncHandler(updateRoomType));
var room_routes_default = router2;

// backend/modules/bookings/booking.routes.ts
var import_express3 = require("express");

// backend/modules/bookings/booking.schemas.ts
var import_zod3 = require("zod");
var createBookingSchema = import_zod3.z.object({
  fullName: import_zod3.z.string().min(1, "Full name is required"),
  email: import_zod3.z.string().email("A valid email address is required"),
  purpose: import_zod3.z.string().min(1, "Purpose of travel/stay is required"),
  address: import_zod3.z.string().min(1, "Address is required"),
  nationalId: import_zod3.z.string().min(1, "National ID / Passport Number is required"),
  roomTypeId: import_zod3.z.string().min(1, "Selected room type is required"),
  checkIn: import_zod3.z.string().min(1, "Check-in date is required"),
  checkOut: import_zod3.z.string().min(1, "Check-out date is required"),
  phone: import_zod3.z.string().min(1, "Phone number is required"),
  paymentMessage: import_zod3.z.string().trim().min(1, "Payment receipt is required. Please paste the payment SMS/text or attach a screenshot/receipt before confirming the booking."),
  userId: import_zod3.z.union([import_zod3.z.number(), import_zod3.z.string()]).optional().nullable().transform((val) => {
    if (!val) return null;
    const parsed = typeof val === "string" ? parseInt(val, 10) : val;
    return isNaN(parsed) ? null : parsed;
  })
});
var updateBookingDetailsSchema = import_zod3.z.object({
  fullName: import_zod3.z.string().optional(),
  email: import_zod3.z.string().email("A valid email address is required").optional(),
  purpose: import_zod3.z.string().optional(),
  address: import_zod3.z.string().optional(),
  nationalId: import_zod3.z.string().optional(),
  phone: import_zod3.z.string().optional(),
  checkIn: import_zod3.z.string().optional(),
  checkOut: import_zod3.z.string().optional(),
  roomTypeId: import_zod3.z.string().optional()
});
var submitReceiptSchema = import_zod3.z.object({
  paymentMessage: import_zod3.z.string().min(1, "Payment receipt message cannot be empty")
});
var updateReservationStatusSchema = import_zod3.z.object({
  status: import_zod3.z.enum(["CHECKED_IN", "CHECKED_OUT", "BOOKED"])
});
var updatePaymentStatusSchema = import_zod3.z.object({
  paymentStatus: import_zod3.z.enum(["PENDING", "RECEIVED"])
});
var createStaffAccountSchema = import_zod3.z.object({
  email: import_zod3.z.string().email("A valid email address is required"),
  name: import_zod3.z.string().min(1, "Full name is required"),
  password: import_zod3.z.string().min(6, "Password must be at least 6 characters long"),
  role: import_zod3.z.enum(["RECEPTION", "OWNER", "ADMIN"])
});
var updateStaffStatusSchema = import_zod3.z.object({
  status: import_zod3.z.enum(["ACTIVE", "SUSPENDED"])
});

// backend/modules/bookings/booking.mail.ts
var import_nodemailer = __toESM(require("nodemailer"), 1);
var import_config = require("dotenv/config");
function getAdminRecipients() {
  const configuredRecipients = [
    process.env.ADMIN_EMAIL,
    process.env.ADMIN_EMAILS,
    process.env.SMTP_USER
  ].filter((value) => !!value).flatMap((value) => value.split(",").map((item) => item.trim()).filter(Boolean));
  return [...new Set(configuredRecipients)];
}
function formatDate(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return String(value);
  }
  return new Intl.DateTimeFormat("en-ET", {
    year: "numeric",
    month: "short",
    day: "numeric"
  }).format(date);
}
function createTransporter() {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 587);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  if (!host || !user || !pass) {
    return null;
  }
  return import_nodemailer.default.createTransport({
    host,
    port,
    secure: String(process.env.SMTP_SECURE || "false") === "true",
    auth: {
      user,
      pass
    }
  });
}
async function sendBookingConfirmationEmail(booking) {
  const toEmail = booking.email?.trim();
  const fromAddress = process.env.SMTP_FROM || process.env.MAIL_FROM || "reservations@dreamhotelsawla.com";
  const transporter = createTransporter();
  if (!toEmail || !transporter) {
    console.info("Email transport is not configured; skipping booking confirmation email.");
    return;
  }
  const roomTypeName = booking.roomTypeName || booking.roomType?.name || "Selected room";
  const roomNumber = booking.roomNumber || booking.room?.roomNumber || "TBD";
  const html = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #0f172a;">
      <h2 style="color: #4338ca;">Dream Hotel Reservation Confirmation</h2>
      <p>Hello ${booking.fullName},</p>
      <p>Your reservation request has been received and confirmed.</p>
      <ul>
        <li><strong>Reference:</strong> ${booking.id}</li>
        <li><strong>Room:</strong> ${roomNumber}</li>
        <li><strong>Room Type:</strong> ${roomTypeName}</li>
        <li><strong>Check-in:</strong> ${formatDate(booking.checkIn)}</li>
        <li><strong>Check-out:</strong> ${formatDate(booking.checkOut)}</li>
        <li><strong>Estimated Quote:</strong> ETB ${booking.totalPrice.toLocaleString()}</li>
      </ul>
      <p>You will be notified soon when your payment is approved.</p>
      <p>Thank you for choosing Dream Hotel.</p>
      <p style="font-size: 12px; color: #64748b;">Sent from reservations@dreamhotelsawla.com</p>
    </div>
  `;
  await transporter.sendMail({
    from: fromAddress,
    to: toEmail,
    subject: `Dream Hotel Reservation Confirmation - ${booking.id}`,
    html,
    text: `Hello ${booking.fullName},

Your reservation request has been received and confirmed.
Reference: ${booking.id}
Room: ${roomNumber}
Room Type: ${roomTypeName}
Check-in: ${formatDate(booking.checkIn)}
Check-out: ${formatDate(booking.checkOut)}
Estimated Quote: ETB ${booking.totalPrice.toLocaleString()}

You will be notified soon when your payment is approved.

Thank you for choosing Dream Hotel.`
  });
}
async function sendPaymentApprovedEmail(booking) {
  const toEmail = booking.email?.trim();
  const fromAddress = process.env.SMTP_FROM || process.env.MAIL_FROM || "reservations@dreamhotelsawla.com";
  const transporter = createTransporter();
  if (!toEmail || !transporter) {
    console.info("Email transport is not configured; skipping payment approval email.");
    return;
  }
  const roomTypeName = booking.roomTypeName || booking.roomType?.name || "Selected room";
  const roomNumber = booking.roomNumber || booking.room?.roomNumber || "TBD";
  const html = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #0f172a;">
      <h2 style="color: #15803d;">Payment Approved</h2>
      <p>Hello ${booking.fullName},</p>
      <p>Your payment has been approved. Your reservation is now confirmed.</p>
      <ul>
        <li><strong>Reference:</strong> ${booking.id}</li>
        <li><strong>Room:</strong> ${roomNumber}</li>
        <li><strong>Room Type:</strong> ${roomTypeName}</li>
        <li><strong>Check-in:</strong> ${formatDate(booking.checkIn)}</li>
        <li><strong>Check-out:</strong> ${formatDate(booking.checkOut)}</li>
        <li><strong>Estimated Quote:</strong> ETB ${booking.totalPrice.toLocaleString()}</li>
      </ul>
      <p>Please keep this reference for check-in.</p>
      <p>Thank you for choosing Dream Hotel.</p>
    </div>
  `;
  await transporter.sendMail({
    from: fromAddress,
    to: toEmail,
    subject: `Payment Approved - ${booking.id}`,
    html,
    text: `Hello ${booking.fullName},

Your payment has been approved. Your reservation is now confirmed.
Reference: ${booking.id}
Room: ${roomNumber}
Room Type: ${roomTypeName}
Check-in: ${formatDate(booking.checkIn)}
Check-out: ${formatDate(booking.checkOut)}
Estimated Quote: ETB ${booking.totalPrice.toLocaleString()}

Please keep this reference for check-in.

Thank you for choosing Dream Hotel.`
  });
}
async function sendBookingAdminNotificationEmail(booking) {
  const adminRecipients = getAdminRecipients();
  const fromAddress = process.env.SMTP_FROM || process.env.MAIL_FROM || "reservations@dreamhotelsawla.com";
  const transporter = createTransporter();
  if (adminRecipients.length === 0 || !transporter) {
    console.info("Admin notification recipients are not configured; skipping admin booking notification.");
    return;
  }
  const roomTypeName = booking.roomTypeName || booking.roomType?.name || "Selected room";
  const roomNumber = booking.roomNumber || booking.room?.roomNumber || "TBD";
  const html = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #0f172a;">
      <h2 style="color: #b45309;">New Booking Received</h2>
      <p>A new reservation request has been created.</p>
      <ul>
        <li><strong>Reference:</strong> ${booking.id}</li>
        <li><strong>Guest:</strong> ${booking.fullName}</li>
        <li><strong>Email:</strong> ${booking.email || "Not provided"}</li>
        <li><strong>Room:</strong> ${roomNumber}</li>
        <li><strong>Room Type:</strong> ${roomTypeName}</li>
        <li><strong>Check-in:</strong> ${formatDate(booking.checkIn)}</li>
        <li><strong>Check-out:</strong> ${formatDate(booking.checkOut)}</li>
        <li><strong>Estimated Quote:</strong> ETB ${booking.totalPrice.toLocaleString()}</li>
      </ul>
      <p>Please review the booking in the admin portal.</p>
    </div>
  `;
  await transporter.sendMail({
    from: fromAddress,
    to: adminRecipients,
    subject: `New booking received - ${booking.id}`,
    html,
    text: `A new reservation request has been created.
Reference: ${booking.id}
Guest: ${booking.fullName}
Email: ${booking.email || "Not provided"}
Room: ${roomNumber}
Room Type: ${roomTypeName}
Check-in: ${formatDate(booking.checkIn)}
Check-out: ${formatDate(booking.checkOut)}
Estimated Quote: ETB ${booking.totalPrice.toLocaleString()}

Please review the booking in the admin portal.`
  });
}

// backend/modules/bookings/booking.public.ts
var PAYMENT_WINDOW_MS = 12 * 60 * 60 * 1e3;
async function autoCancelIfExpired(booking) {
  if (!booking) return booking;
  if (booking.status !== "BOOKED" || booking.paymentStatus !== "PENDING") return booking;
  if (booking.paymentMessage) return booking;
  const now = /* @__PURE__ */ new Date();
  const deadline = new Date(booking.createdAt.getTime() + PAYMENT_WINDOW_MS);
  if (now < deadline) return booking;
  return prisma.booking.update({
    where: { id: booking.id },
    data: { status: "CANCELLED" },
    include: { roomType: true, room: true }
  });
}
async function createBooking(req, res) {
  const result = createBookingSchema.safeParse(req.body);
  if (!result.success) {
    throw new ValidationError("Missing or invalid booking fields", result.error.flatten().fieldErrors);
  }
  const {
    fullName,
    email,
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
  const bookedRoomNumbers = overlappingBookings.map((b) => b.roomNumber).filter((n) => !!n);
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
  const nights = Math.ceil((end.getTime() - start.getTime()) / (1e3 * 60 * 60 * 24));
  const totalPrice = nights * roomType.rate;
  const refCode = `DP-${Math.floor(1e4 + Math.random() * 9e4)}`;
  const booking = await prisma.booking.create({
    data: {
      id: refCode,
      fullName,
      email,
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
      userId: resolvedUserId
    },
    include: { roomType: true, room: true }
  });
  try {
    await Promise.allSettled([
      sendBookingConfirmationEmail({
        id: booking.id,
        fullName: booking.fullName,
        email: booking.email,
        roomTypeName: roomType.name,
        roomNumber: availableRoom.roomNumber,
        checkIn: booking.checkIn,
        checkOut: booking.checkOut,
        totalPrice: booking.totalPrice,
        paymentStatus: booking.paymentStatus
      }),
      sendBookingAdminNotificationEmail({
        id: booking.id,
        fullName: booking.fullName,
        email: booking.email,
        roomTypeName: roomType.name,
        roomNumber: availableRoom.roomNumber,
        checkIn: booking.checkIn,
        checkOut: booking.checkOut,
        totalPrice: booking.totalPrice,
        paymentStatus: booking.paymentStatus
      })
    ]);
  } catch (error) {
    console.error("Failed to send booking notification emails", error);
  }
  res.status(201).json(booking);
}
async function getBookingLookup(req, res) {
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
async function submitReceiptMessage(req, res) {
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
async function cancelBooking(req, res) {
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
async function getUserBookings(req, res) {
  const user = req.user;
  if (!user) {
    throw new UnauthorizedError("Not authenticated");
  }
  const normalizedName = user.name?.trim();
  const bookings = await prisma.booking.findMany({
    where: {
      OR: [
        { userId: user.id },
        ...normalizedName ? [{ AND: [{ userId: null }, { fullName: { contains: normalizedName } }] }] : []
      ]
    },
    include: { roomType: true, room: true },
    orderBy: { createdAt: "desc" }
  });
  const resolvedBookings = await Promise.all(bookings.map((booking) => autoCancelIfExpired(booking)));
  res.json(resolvedBookings);
}
async function updateBookingDetails(req, res) {
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
  const { fullName, purpose, address, nationalId, phone, email, checkIn, checkOut, roomTypeId } = result.data;
  const updateData = {};
  if (fullName !== void 0) updateData.fullName = fullName;
  if (email !== void 0) updateData.email = email;
  if (purpose !== void 0) updateData.purpose = purpose;
  if (address !== void 0) updateData.address = address;
  if (nationalId !== void 0) updateData.nationalId = nationalId;
  if (phone !== void 0) updateData.phone = phone;
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
    const bookedRoomNumbers = overlappingBookings.map((b) => b.roomNumber).filter((n) => !!n);
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
    const nights = Math.ceil((end.getTime() - start.getTime()) / (1e3 * 60 * 60 * 24));
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

// backend/modules/bookings/booking.admin.ts
async function getReservations(req, res) {
  const { status, paymentStatus, search } = req.query;
  const whereClause = {};
  if (status) whereClause.status = status;
  if (paymentStatus) whereClause.paymentStatus = paymentStatus;
  if (search) {
    whereClause.OR = [
      { id: { contains: search } },
      { fullName: { contains: search } },
      { phone: { contains: search } },
      { roomNumber: { contains: search } },
      { paymentMessage: { contains: search } }
    ];
  }
  const bookings = await prisma.booking.findMany({
    where: whereClause,
    include: { roomType: true, room: true },
    orderBy: { createdAt: "desc" }
  });
  res.json(bookings);
}
async function updateReservationStatus(req, res) {
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
async function updatePaymentStatus(req, res) {
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
  if (booking.paymentStatus === "RECEIVED" && paymentStatus === "PENDING") {
    throw new ValidationError("This payment has already been marked as received and cannot be changed back to pending.");
  }
  const staffUser = req.user;
  if (!staffUser) {
    throw new UnauthorizedError("Authentication required");
  }
  const updated = await prisma.booking.update({
    where: { id },
    data: { paymentStatus },
    include: { roomType: true, room: true }
  });
  if (paymentStatus === "RECEIVED" && booking.paymentStatus !== "RECEIVED") {
    try {
      await sendPaymentApprovedEmail({
        id: updated.id,
        fullName: updated.fullName,
        email: updated.email,
        roomTypeName: updated.roomType?.name,
        roomNumber: updated.roomNumber,
        checkIn: updated.checkIn,
        checkOut: updated.checkOut,
        totalPrice: updated.totalPrice,
        paymentStatus: updated.paymentStatus,
        roomType: updated.roomType,
        room: updated.room
      });
    } catch (error) {
      console.error("Failed to send payment approval email", error);
    }
  }
  await prisma.auditLog.create({
    data: {
      bookingId: id,
      userId: staffUser.id,
      action: "PAYMENT_STATUS_CHANGE",
      details: `Payment updated from ${booking.paymentStatus} to ${paymentStatus} by ${staffUser.name}`
    }
  });
  res.json(updated);
}
async function staffCancelBooking(req, res) {
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
      details: `Reservation cancelled via phone/front desk by ${staffUser.name}`
    }
  });
  res.json(updated);
}
async function deleteBooking(req, res) {
  const { id } = req.params;
  try {
    await prisma.booking.delete({ where: { id } });
    res.json({ success: true, message: "Booking permanently deleted" });
  } catch {
    throw new NotFoundError(`Booking with ID ${id} not found`);
  }
}

// backend/modules/bookings/booking.reports.ts
async function getDashboardStats(_req, res) {
  const now = /* @__PURE__ */ new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const firstDayOfWeek = new Date(today);
  firstDayOfWeek.setDate(today.getDate() - today.getDay());
  const lastDayOfWeek = new Date(firstDayOfWeek);
  lastDayOfWeek.setDate(firstDayOfWeek.getDate() + 7);
  const allBookings = await prisma.booking.findMany({
    where: { status: { not: "CANCELLED" } }
  });
  const receivedBookings = allBookings.filter((b) => b.paymentStatus === "RECEIVED");
  const cumulativeRevenue = receivedBookings.reduce((sum, b) => sum + b.totalPrice, 0);
  const pendingBookings = allBookings.filter((b) => b.paymentStatus === "PENDING");
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
  const occupancyRate = totalRoomsCount > 0 ? occupiedRoomCount / totalRoomsCount * 100 : 0;
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
    new Set(thisWeekBookings.map((b) => b.roomNumber).filter((n) => !!n))
  );
  res.json({
    cumulativeRevenue,
    pendingRevenue,
    occupancyRate: Math.round(occupancyRate * 10) / 10,
    occupiedRoomsCount: occupiedRoomCount,
    totalRoomsCount,
    totalActiveReservations: allBookings.length,
    roomsUsedThisWeek: uniqueRoomsUsedThisWeek.length,
    roomsUsedList: uniqueRoomsUsedThisWeek
  });
}
async function getMonthlyReports(_req, res) {
  const bookings = await prisma.booking.findMany({
    where: { status: { not: "CANCELLED" } },
    orderBy: { checkIn: "asc" }
  });
  const monthsData = {};
  for (const b of bookings) {
    const monthKey = b.checkIn.toLocaleString("default", { month: "long", year: "numeric" });
    if (!monthsData[monthKey]) {
      monthsData[monthKey] = { revenue: 0, bookingsCount: 0, occupiedNights: 0 };
    }
    const nights = Math.ceil((b.checkOut.getTime() - b.checkIn.getTime()) / (1e3 * 60 * 60 * 24));
    monthsData[monthKey].bookingsCount += 1;
    monthsData[monthKey].occupiedNights += nights;
    if (b.paymentStatus === "RECEIVED") {
      monthsData[monthKey].revenue += b.totalPrice;
    }
  }
  const report = Object.entries(monthsData).map(([month, monthData]) => ({
    month,
    revenue: monthData.revenue,
    bookingsCount: monthData.bookingsCount,
    occupiedNights: monthData.occupiedNights
  }));
  res.json(report);
}

// backend/modules/bookings/booking.shared.ts
var crypto2 = __toESM(require("crypto"), 1);
function hashPassword2(password) {
  return crypto2.createHash("sha256").update(password).digest("hex");
}

// backend/modules/bookings/booking.staff.ts
async function getStaffRoster(_req, res) {
  const staff = await prisma.user.findMany({
    select: { id: true, email: true, name: true, role: true, status: true, createdAt: true }
  });
  res.json(staff);
}
async function createStaffAccount(req, res) {
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
      password: hashPassword2(password),
      role,
      status: "ACTIVE"
    },
    select: { id: true, email: true, name: true, role: true, status: true }
  });
  res.status(201).json(created);
}
async function updateStaffStatus(req, res) {
  const { id } = req.params;
  if (!id) {
    throw new ValidationError("Invalid staff ID");
  }
  const result = updateStaffStatusSchema.safeParse(req.body);
  if (!result.success) {
    throw new ValidationError("Invalid status value", result.error.flatten().fieldErrors);
  }
  const { status } = result.data;
  const targetUserId = Number.parseInt(id, 10);
  if (!Number.isInteger(targetUserId)) {
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
async function deleteStaffAccount(req, res) {
  const { id } = req.params;
  if (!id) {
    throw new ValidationError("Invalid staff ID");
  }
  const targetUserId = Number.parseInt(id, 10);
  if (!Number.isInteger(targetUserId)) {
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

// backend/modules/bookings/booking.audit.ts
async function getAuditLogs(_req, res) {
  const logs = await prisma.auditLog.findMany({
    include: {
      user: { select: { id: true, email: true, name: true, role: true } },
      booking: true
    },
    orderBy: { timestamp: "desc" }
  });
  res.json(logs);
}

// backend/modules/bookings/booking.routes.ts
var router3 = (0, import_express3.Router)();
router3.post("/bookings", authenticateOptional, asyncHandler(createBooking));
router3.get("/bookings/lookup/:id", asyncHandler(getBookingLookup));
router3.post("/bookings/lookup/:id/cancel", asyncHandler(cancelBooking));
router3.post("/bookings/lookup/:id/receipt", asyncHandler(submitReceiptMessage));
router3.put("/bookings/lookup/:id", asyncHandler(updateBookingDetails));
router3.get("/bookings/my", authenticate, asyncHandler(getUserBookings));
router3.get("/admin/reservations", authenticate, requireAdminOrOwner, asyncHandler(getReservations));
router3.post("/admin/reservations/:id/status", authenticate, requireAdminOrOwner, asyncHandler(updateReservationStatus));
router3.post("/admin/reservations/:id/payment", authenticate, requireAdminOrOwner, asyncHandler(updatePaymentStatus));
router3.post("/admin/reservations/:id/cancel", authenticate, requireAdminOrOwner, asyncHandler(staffCancelBooking));
router3.delete("/admin/reservations/:id", authenticate, requireOwner, asyncHandler(deleteBooking));
router3.get("/admin/audit-logs", authenticate, requireOwner, asyncHandler(getAuditLogs));
router3.get("/admin/dashboard-stats", authenticate, requireOwner, asyncHandler(getDashboardStats));
router3.get("/admin/reports/monthly", authenticate, requireOwner, asyncHandler(getMonthlyReports));
router3.get("/admin/staff", authenticate, requireOwner, asyncHandler(getStaffRoster));
router3.post("/admin/staff", authenticate, requireOwner, asyncHandler(createStaffAccount));
router3.put("/admin/staff/:id/status", authenticate, requireOwner, asyncHandler(updateStaffStatus));
router3.delete("/admin/staff/:id", authenticate, requireOwner, asyncHandler(deleteStaffAccount));
var booking_routes_default = router3;

// backend/modules/enquiries/enquiry.routes.ts
var import_express4 = require("express");

// backend/modules/enquiries/enquiry.schemas.ts
var import_zod4 = require("zod");
var createEnquirySchema = import_zod4.z.object({
  name: import_zod4.z.string().min(1, "Name is required"),
  organization: import_zod4.z.string().min(1, "Organization is required"),
  eventType: import_zod4.z.string().min(1, "Event type is required"),
  date: import_zod4.z.string().min(1, "Event date is required"),
  estimatedAttendance: import_zod4.z.union([import_zod4.z.number(), import_zod4.z.string()]).transform((val) => {
    const parsed = typeof val === "string" ? parseInt(val, 10) : val;
    if (isNaN(parsed)) return 0;
    return parsed;
  }).refine((val) => val > 0, "Estimated attendance must be greater than 0"),
  cateringRequirement: import_zod4.z.boolean().optional().default(false),
  message: import_zod4.z.string().min(1, "Message is required")
});
var updateEnquiryStatusSchema = import_zod4.z.object({
  status: import_zod4.z.enum(["PENDING", "RESPONDED"])
});

// backend/modules/enquiries/enquiry.controller.ts
async function createEnquiry(req, res) {
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
      status: "PENDING"
    }
  });
  res.status(201).json(enquiry);
}
async function getEnquiries(_req, res) {
  const enquiries = await prisma.enquiry.findMany({
    orderBy: { createdAt: "desc" }
  });
  res.json(enquiries);
}
async function updateEnquiryStatus(req, res) {
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
  } catch (error) {
    throw new NotFoundError(`Enquiry with ID ${enquiryId} not found`);
  }
}

// backend/modules/enquiries/enquiry.routes.ts
var router4 = (0, import_express4.Router)();
router4.post("/enquiries", asyncHandler(createEnquiry));
router4.get("/admin/enquiries", authenticate, requireAdminOrOwner, asyncHandler(getEnquiries));
router4.post("/admin/enquiries/:id/status", authenticate, requireAdminOrOwner, asyncHandler(updateEnquiryStatus));
var enquiry_routes_default = router4;

// backend/modules/gallery/gallery.routes.ts
var import_express5 = require("express");
var import_multer = __toESM(require("multer"), 1);

// backend/modules/gallery/gallery.controller.ts
var import_cloudinary = require("cloudinary");

// backend/modules/gallery/gallery.schemas.ts
var import_zod5 = require("zod");
var createGalleryImageSchema = import_zod5.z.object({
  category: import_zod5.z.enum(["lobby", "rooms", "dining", "meetings"]),
  title: import_zod5.z.string().min(1, "Title is required"),
  description: import_zod5.z.string().min(1, "Description is required"),
  url: import_zod5.z.string().optional()
});
var updateGalleryImageSchema = import_zod5.z.object({
  category: import_zod5.z.enum(["lobby", "rooms", "dining", "meetings"]).optional(),
  title: import_zod5.z.string().min(1, "Title cannot be empty").optional(),
  description: import_zod5.z.string().min(1, "Description cannot be empty").optional(),
  url: import_zod5.z.string().optional()
});

// backend/modules/gallery/gallery.controller.ts
var cloudinaryUrl = process.env.CLOUDINARY_URL;
var cloudinaryCloudName = process.env.CLOUDINARY_CLOUD_NAME;
var cloudinaryApiKey = process.env.CLOUDINARY_API_KEY;
var cloudinaryApiSecret = process.env.CLOUDINARY_API_SECRET;
var isCloudinaryConfigured = !!(cloudinaryUrl || cloudinaryCloudName && cloudinaryApiKey && cloudinaryApiSecret);
if (isCloudinaryConfigured) {
  if (cloudinaryUrl) {
    import_cloudinary.v2.config({ cloudinary_url: cloudinaryUrl, secure: true });
  } else {
    import_cloudinary.v2.config({
      cloud_name: cloudinaryCloudName,
      api_key: cloudinaryApiKey,
      api_secret: cloudinaryApiSecret,
      secure: true
    });
  }
  console.log("Cloudinary successfully configured for Gallery image uploads.");
} else {
  console.log("Cloudinary credentials missing. Gallery uploads require Cloudinary credentials and cannot proceed.");
}
function uploadBufferToCloudinary(buffer) {
  return new Promise((resolve, reject) => {
    const uploadStream = import_cloudinary.v2.uploader.upload_stream(
      { folder: "dream_hotel_gallery" },
      (error, result) => {
        if (error) return reject(error);
        if (!result) return reject(new Error("No response from Cloudinary."));
        resolve(result.secure_url);
      }
    );
    uploadStream.end(buffer);
  });
}
async function processImageUpload(file) {
  if (!file) return null;
  if (!isCloudinaryConfigured) {
    throw new Error("Cloudinary is not configured. Gallery uploads require Cloudinary credentials.");
  }
  return uploadBufferToCloudinary(file.buffer);
}
async function getGalleryImages(_req, res) {
  const images = await prisma.galleryImage.findMany({
    orderBy: { createdAt: "desc" }
  });
  res.json(images);
}
async function createGalleryImage(req, res) {
  const result = createGalleryImageSchema.safeParse(req.body);
  if (!result.success) {
    throw new ValidationError("Invalid gallery image data", result.error.flatten().fieldErrors);
  }
  const { title, description, category, url: bodyUrl } = result.data;
  let imageUrl = bodyUrl || "";
  if (req.file) {
    const uploadedUrl = await processImageUpload(req.file);
    if (uploadedUrl) {
      imageUrl = uploadedUrl;
    }
  }
  if (!imageUrl) {
    throw new ValidationError("An image file upload or image URL is required.");
  }
  const galleryItem = await prisma.galleryImage.create({
    data: {
      url: imageUrl,
      category,
      title,
      description
    }
  });
  res.status(201).json(galleryItem);
}
async function updateGalleryImage(req, res) {
  const { id } = req.params;
  if (!id) {
    throw new ValidationError("Invalid gallery image ID");
  }
  const imageId = Number.parseInt(id, 10);
  if (!Number.isInteger(imageId)) {
    throw new ValidationError("Invalid gallery image ID");
  }
  const result = updateGalleryImageSchema.safeParse(req.body);
  if (!result.success) {
    throw new ValidationError("Invalid update data", result.error.flatten().fieldErrors);
  }
  const { title, description, category, url: bodyUrl } = result.data;
  const existing = await prisma.galleryImage.findUnique({
    where: { id: imageId }
  });
  if (!existing) {
    throw new NotFoundError(`Gallery image with ID ${imageId} not found`);
  }
  let imageUrl = bodyUrl || void 0;
  if (req.file) {
    const uploadedUrl = await processImageUpload(req.file);
    if (uploadedUrl) {
      imageUrl = uploadedUrl;
    }
  }
  const updated = await prisma.galleryImage.update({
    where: { id: imageId },
    data: {
      url: imageUrl,
      category: category ?? void 0,
      title: title ?? void 0,
      description: description ?? void 0
    }
  });
  res.json(updated);
}
async function deleteGalleryImage(req, res) {
  const { id } = req.params;
  if (!id) {
    throw new ValidationError("Invalid gallery image ID");
  }
  const imageId = Number.parseInt(id, 10);
  if (!Number.isInteger(imageId)) {
    throw new ValidationError("Invalid gallery image ID");
  }
  try {
    await prisma.galleryImage.delete({
      where: { id: imageId }
    });
    res.json({ success: true, message: "Gallery image deleted successfully" });
  } catch (error) {
    throw new NotFoundError(`Gallery image with ID ${imageId} not found`);
  }
}

// backend/modules/gallery/gallery.routes.ts
var upload = (0, import_multer.default)({
  storage: import_multer.default.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024
    // 10MB limit
  }
});
var router5 = (0, import_express5.Router)();
router5.get("/gallery", asyncHandler(getGalleryImages));
router5.post("/admin/gallery", authenticate, requireAdminOrOwner, upload.single("image"), asyncHandler(createGalleryImage));
router5.put("/admin/gallery/:id", authenticate, requireAdminOrOwner, upload.single("image"), asyncHandler(updateGalleryImage));
router5.delete("/admin/gallery/:id", authenticate, requireAdminOrOwner, asyncHandler(deleteGalleryImage));
var gallery_routes_default = router5;

// backend/routes.ts
var router6 = (0, import_express6.Router)();
router6.use("/auth", auth_routes_default);
router6.use(room_routes_default);
router6.use(booking_routes_default);
router6.use(enquiry_routes_default);
router6.use(gallery_routes_default);
router6.use(globalErrorHandler);
var routes_default = router6;

// server.ts
var import_vite = require("vite");
var import_config2 = require("dotenv/config");
var app = (0, import_express7.default)();
var PORT = process.env.PORT || 3e3;
app.use(import_express7.default.json());
var uploadsDir = import_path.default.join(process.cwd(), "uploads");
if (!import_fs.default.existsSync(uploadsDir)) {
  import_fs.default.mkdirSync(uploadsDir, { recursive: true });
}
app.use("/uploads", import_express7.default.static(uploadsDir));
app.use("/api", routes_default);
async function startServer() {
  if (process.env.BACKEND_ONLY === "true") {
    console.log("Running in BACKEND_ONLY mode. Frontend static/Vite assets are skipped.");
  } else if (process.env.NODE_ENV !== "production") {
    const vite = await (0, import_vite.createServer)({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    const distPath = import_path.default.join(process.cwd(), "dist");
    app.use(import_express7.default.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(import_path.default.join(distPath, "index.html"));
    });
  }
  app.listen(Number(PORT), "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}
startServer();
//# sourceMappingURL=server.cjs.map
