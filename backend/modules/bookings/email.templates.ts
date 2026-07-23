interface PaymentVerifiedTemplateData {
  fullName: string;
  bookingId: string;
  roomTypeName: string;
  roomNumber: string;
  checkIn: string;
  checkOut: string;
  totalPrice: string;
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export function createPaymentVerifiedEmail(data: PaymentVerifiedTemplateData) {
  const fullName = escapeHtml(data.fullName);
  const bookingId = escapeHtml(data.bookingId);
  const roomTypeName = escapeHtml(data.roomTypeName);
  const roomNumber = escapeHtml(data.roomNumber);
  const checkIn = escapeHtml(data.checkIn);
  const checkOut = escapeHtml(data.checkOut);
  const totalPrice = escapeHtml(data.totalPrice);

  return {
    subject: `Payment Verified - ${data.bookingId}`,
    html: `<!doctype html>
<html lang="en">
  <body style="margin:0;background:#f4f1eb;font-family:Arial,Helvetica,sans-serif;color:#1f2933;">
    <div style="width:100%;padding:32px 12px;box-sizing:border-box;">
      <div style="max-width:620px;margin:0 auto;background:#ffffff;border:1px solid #e5e0d8;">
        <div style="background:#7a5a13;padding:30px 36px;color:#ffffff;">
          <div style="font-size:12px;letter-spacing:2px;text-transform:uppercase;color:#f6d98b;font-weight:bold;">Dream Hotel Sawla</div>
          <h1 style="margin:12px 0 0;font-size:28px;line-height:1.2;font-weight:700;">Payment verified</h1>
          <p style="margin:10px 0 0;color:#dbe7e1;font-size:15px;line-height:1.6;">Your reservation is now confirmed.</p>
        </div>

        <div style="padding:32px 36px;">
          <p style="margin:0 0 8px;font-size:17px;">Hello ${fullName},</p>
          <p style="margin:0 0 24px;color:#52606d;font-size:15px;line-height:1.7;">Thank you for your payment. We have successfully verified it with Chapa and confirmed your booking.</p>

          <div style="background:#fff8e6;border:1px solid #ead7a3;padding:16px 18px;margin-bottom:24px;">
            <div style="color:#9a731b;font-size:12px;letter-spacing:1px;text-transform:uppercase;font-weight:bold;">Confirmed reservation</div>
            <div style="margin-top:7px;color:#6b4d0e;font-size:15px;font-weight:bold;">Reference: ${bookingId}</div>
          </div>

          <h2 style="margin:0 0 12px;color:#7a5a13;font-size:16px;">Stay details</h2>
          <table role="presentation" style="width:100%;border-collapse:collapse;font-size:14px;">
            <tr><td style="padding:11px 0;border-bottom:1px solid #eee9e2;color:#7b8794;">Room</td><td style="padding:11px 0;border-bottom:1px solid #eee9e2;text-align:right;font-weight:bold;">${roomNumber}</td></tr>
            <tr><td style="padding:11px 0;border-bottom:1px solid #eee9e2;color:#7b8794;">Room type</td><td style="padding:11px 0;border-bottom:1px solid #eee9e2;text-align:right;font-weight:bold;">${roomTypeName}</td></tr>
            <tr><td style="padding:11px 0;border-bottom:1px solid #eee9e2;color:#7b8794;">Check-in</td><td style="padding:11px 0;border-bottom:1px solid #eee9e2;text-align:right;font-weight:bold;">${checkIn}</td></tr>
            <tr><td style="padding:11px 0;color:#7b8794;">Check-out</td><td style="padding:11px 0;text-align:right;font-weight:bold;">${checkOut}</td></tr>
          </table>

          <div style="margin-top:24px;padding:18px;background:#faf8f4;border:1px solid #eee9e2;">
            <div style="color:#7b8794;font-size:12px;text-transform:uppercase;letter-spacing:1px;">Total booking amount</div>
            <div style="margin-top:5px;color:#7a5a13;font-size:24px;font-weight:bold;">ETB ${totalPrice}</div>
            <div style="margin-top:5px;color:#9a731b;font-size:13px;">Payment status: Verified</div>
          </div>

          <p style="margin:26px 0 0;color:#52606d;font-size:14px;line-height:1.7;">Please keep this email and your booking reference for check-in. We look forward to welcoming you.</p>
          <p style="margin:24px 0 0;color:#7a5a13;font-size:15px;font-weight:bold;">Dream Hotel Sawla</p>
        </div>

        <div style="padding:20px 36px;background:#f8f6f2;border-top:1px solid #eee9e2;color:#7b8794;font-size:12px;line-height:1.6;">This is an automatic booking notification. Please contact the hotel directly if any reservation detail needs to be corrected.</div>
      </div>
    </div>
  </body>
</html>`,
    text: `Hello ${data.fullName},

Your payment has been verified with Chapa and your reservation is now confirmed.

Booking reference: ${data.bookingId}
Room: ${data.roomNumber}
Room type: ${data.roomTypeName}
Check-in: ${data.checkIn}
Check-out: ${data.checkOut}
Total booking amount: ETB ${data.totalPrice}
Payment status: Verified

Please keep this email and your booking reference for check-in.

Dream Hotel Sawla`,
  };
}
