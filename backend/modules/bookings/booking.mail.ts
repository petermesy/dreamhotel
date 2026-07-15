import nodemailer from "nodemailer";
import "dotenv/config";

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

export async function sendBookingConfirmationEmail(booking: BookingEmailPayload) {
  const toEmail = booking.email?.trim();
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 587);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const fromAddress = process.env.SMTP_FROM || process.env.MAIL_FROM || "reservations@dreamhotelsawla.com";

  if (!toEmail || !host || !user || !pass) {
    console.info("Email transport is not configured; skipping booking confirmation email.");
    return;
  }

  const roomTypeName = booking.roomTypeName || booking.roomType?.name || "Selected room";
  const roomNumber = booking.roomNumber || booking.room?.roomNumber || "TBD";

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: String(process.env.SMTP_SECURE || "false") === "true",
    auth: {
      user,
      pass,
    },
  });

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
      <p>Please send your CBE / Telebirr payment receipt within 12 hours of booking so we can verify the reservation. If no payment receipt is shared in time, the reservation will be cancelled automatically.</p>
      <p>Thank you for choosing Dream Hotel.</p>
      <p style="font-size: 12px; color: #64748b;">Sent from reservations@dreamhotelsawla.com</p>
    </div>
  `;

  await transporter.sendMail({
    from: fromAddress,
    to: toEmail,
    subject: `Dream Hotel Reservation Confirmation - ${booking.id}`,
    html,
    text: `Hello ${booking.fullName},\n\nYour reservation request has been received and confirmed.\nReference: ${booking.id}\nRoom: ${roomNumber}\nRoom Type: ${roomTypeName}\nCheck-in: ${formatDate(booking.checkIn)}\nCheck-out: ${formatDate(booking.checkOut)}\nEstimated Quote: ETB ${booking.totalPrice.toLocaleString()}\n\nPlease send your CBE / Telebirr payment receipt within 12 hours of booking. If no payment receipt is shared in time, the reservation will be cancelled automatically.\n\nThank you for choosing Dream Hotel.`,
  });
}
