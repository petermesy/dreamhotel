import nodemailer from "nodemailer";
import "dotenv/config";
import { createPaymentVerifiedEmail } from "./email.templates.js";

interface BookingEmailPayload {
  id: string;
  fullName: string;
  email?: string | null;
  roomNumber?: string | null;
  roomTypeName?: string;
  checkIn: Date | string;
  checkOut: Date | string;
  totalPrice: number;
  paymentStatus?: string | null;
  roomType?: { name?: string } | null;
  room?: { roomNumber?: string | null } | null;
}

function getAdminRecipients() {
  const configuredRecipients = [
    process.env.ADMIN_EMAIL,
    process.env.ADMIN_EMAILS,
    process.env.SMTP_USER,
  ]
    .filter((value): value is string => !!value)
    .flatMap((value) => value.split(",").map((item) => item.trim()).filter(Boolean));

  return [...new Set(configuredRecipients)];
}

function formatDate(value: Date | string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return String(value);
  }

  return new Intl.DateTimeFormat("en-ET", {
    year: "numeric",
    month: "short",
    day: "numeric",
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

  return nodemailer.createTransport({
    host,
    port,
    secure: String(process.env.SMTP_SECURE || "false") === "true",
    auth: {
      user,
      pass,
    },
  });
}

export async function sendBookingConfirmationEmail(booking: BookingEmailPayload) {
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
      <h2 style="color: #4338ca;">Dream Hotel Booking Created</h2>
      <p>Hello ${booking.fullName},</p>
      <p>Your booking has been created successfully.</p>
      <ul>
        <li><strong>Reference:</strong> ${booking.id}</li>
        <li><strong>Room:</strong> ${roomNumber}</li>
        <li><strong>Room Type:</strong> ${roomTypeName}</li>
        <li><strong>Check-in:</strong> ${formatDate(booking.checkIn)}</li>
        <li><strong>Check-out:</strong> ${formatDate(booking.checkOut)}</li>
        <li><strong>Estimated Quote:</strong> ETB ${booking.totalPrice.toLocaleString()}</li>
      </ul>
      <p>Your booking is currently waiting for payment confirmation. Please keep your booking reference for future communication.</p>
      <p>Thank you for choosing Dream Hotel.</p>
      <p style="font-size: 12px; color: #64748b;">Sent from reservations@dreamhotelsawla.com</p>
    </div>
  `;

  await transporter.sendMail({
    from: fromAddress,
    to: toEmail,
    subject: `Dream Hotel Booking Created - ${booking.id}`,
    html,
    text: `Hello ${booking.fullName},\n\nYour booking has been created successfully.\nReference: ${booking.id}\nRoom: ${roomNumber}\nRoom Type: ${roomTypeName}\nCheck-in: ${formatDate(booking.checkIn)}\nCheck-out: ${formatDate(booking.checkOut)}\nEstimated Quote: ETB ${booking.totalPrice.toLocaleString()}\n\nYour booking is currently waiting for payment confirmation. Please keep your booking reference for future communication.\n\nThank you for choosing Dream Hotel.`,
  });
}

export async function sendPaymentApprovedEmail(booking: BookingEmailPayload) {
  const toEmail = booking.email?.trim();
  const fromAddress = process.env.SMTP_FROM || process.env.MAIL_FROM || "reservations@dreamhotelsawla.com";
  const transporter = createTransporter();

  if (!toEmail || !transporter) {
    console.info("Email transport is not configured; skipping payment approval email.");
    return;
  }

  const roomTypeName = booking.roomTypeName || booking.roomType?.name || "Selected room";
  const roomNumber = booking.roomNumber || booking.room?.roomNumber || "TBD";
  const email = createPaymentVerifiedEmail({
    fullName: booking.fullName,
    bookingId: booking.id,
    roomTypeName,
    roomNumber,
    checkIn: formatDate(booking.checkIn),
    checkOut: formatDate(booking.checkOut),
    totalPrice: booking.totalPrice.toLocaleString(),
  });

  await transporter.sendMail({
    from: fromAddress,
    to: toEmail,
    subject: email.subject,
    html: email.html,
    text: email.text,
  });
}

export async function sendBookingAdminNotificationEmail(booking: BookingEmailPayload) {
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
    text: `A new reservation request has been created.\nReference: ${booking.id}\nGuest: ${booking.fullName}\nEmail: ${booking.email || "Not provided"}\nRoom: ${roomNumber}\nRoom Type: ${roomTypeName}\nCheck-in: ${formatDate(booking.checkIn)}\nCheck-out: ${formatDate(booking.checkOut)}\nEstimated Quote: ETB ${booking.totalPrice.toLocaleString()}\n\nPlease review the booking in the admin portal.`,
  });
}
