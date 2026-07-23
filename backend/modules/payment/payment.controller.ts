import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import axios from "axios";
import { confirmBookingPayment } from "../bookings/booking.payment.js";
import { sendPaymentApprovedEmail } from "../bookings/booking.mail.js";
const prisma = new PrismaClient();

const CHAPA_URL = "https://api.chapa.co/v1";
const SECRET_KEY = process.env.CHAPA_SECRET_KEY!;


async function confirmPaymentAndNotify(bookingId: string) {
  const bookingBeforeConfirmation = await prisma.booking.findUnique({
    where: { id: bookingId },
    select: { paymentStatus: true },
  });

  const booking = await confirmBookingPayment(bookingId);

  if (bookingBeforeConfirmation?.paymentStatus !== "RECEIVED") {
    try {
      await sendPaymentApprovedEmail({
        id: booking.id,
        fullName: booking.fullName,
        email: booking.email,
        roomTypeName: booking.roomType?.name,
        roomNumber: booking.roomNumber,
        checkIn: booking.checkIn,
        checkOut: booking.checkOut,
        totalPrice: booking.totalPrice,
        paymentStatus: booking.paymentStatus,
        roomType: booking.roomType,
      });
    } catch (error) {
      console.error("Failed to send payment approval email", error);
    }
  }

  return booking;
}

export const initializePayment = async (req: Request, res: Response) => {
  try {
    const {
      amount,
      email,
      firstName,
      lastName,
      phone_number,
      bookingId,
    } = req.body;

    if (!amount || !email || !bookingId) {
      return res.status(400).json({
        success: false,
        message: "Missing required payment information.",
      });
    }

    const txRef = `BOOK-${bookingId}-${Date.now()}`;

    // Save transaction
await prisma.transaction.create({
  data: {
    txRef,
    amount: Number(amount),
    email,

    // IMPORTANT
    // Booking.id is String
    bookingId: bookingId,

    status: "pending",
  },
});

    const chapaResponse = await axios.post(
      `${CHAPA_URL}/transaction/initialize`,
      {
        amount: amount.toString(),
        currency: "ETB",
        email,
        first_name: firstName,
        last_name: lastName,
        phone_number,

        tx_ref: txRef,

        callback_url: `${process.env.BACKEND_URL}/api/payments/webhook`,

        return_url: `${process.env.FRONTEND_URL}/payment-success?tx_ref=${txRef}`,

        customization: {
          title: "Dream Hotel",
          description: "Room Reservation Payment",
        },
      },
      {
        headers: {
          Authorization: `Bearer ${SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (chapaResponse.data.status !== "success") {
      return res.status(400).json({
        success: false,
        message: chapaResponse.data.message,
      });
    }

    return res.json({
      success: true,
      txRef,
      checkoutUrl: chapaResponse.data.data.checkout_url,
    });
  } catch (error: any) {
    console.error(
      "CHAPA INITIALIZE ERROR:",
      error.response?.data || error.message
    );

    return res.status(500).json({
      success: false,
      message: error.response?.data?.message || error.message,
    });
  }
};

export const verifyPayment = async (req: Request, res: Response) => {
  try {
    const { txRef } = req.params;

    const chapaResponse = await axios.get(
      `${CHAPA_URL}/transaction/verify/${txRef}`,
      {
        headers: {
          Authorization: `Bearer ${SECRET_KEY}`,
        },
      }
    );

    const payment = chapaResponse.data.data;

    if (
      chapaResponse.data.status === "success" &&
      payment.status === "success"
    ) {

     const transaction = await prisma.transaction.update({
  where: {
    txRef,
  },
  data: {
    status: "completed",
  },
});


if (transaction.bookingId) {

  await confirmPaymentAndNotify(String(transaction.bookingId));

}


      

      return res.json({
        success: true,
        payment,
      });
    }

    await prisma.transaction.update({
      where: {
        txRef,
      },
      data: {
        status: "failed",
      },
    });

    return res.status(400).json({
      success: false,
      payment,
    });
  } catch (error: any) {
    console.error(
      "CHAPA VERIFY ERROR:",
      error.response?.data || error.message
    );

    return res.status(500).json({
      success: false,
      message: error.response?.data?.message || error.message,
    });
  }
};

/**
 * Chapa Webhook
 */
export const chapaWebhook = async (req: Request, res: Response) => {
  try {

    console.log("CHAPA WEBHOOK BODY:", req.body);

    const txRef =
      req.body.trx_ref ||
      req.body.tx_ref ||
      req.body.reference;

    if (!txRef) {
      console.log("No transaction reference received");
      return res.sendStatus(400);
    }


    const verify = await axios.get(
      `${CHAPA_URL}/transaction/verify/${txRef}`,
      {
        headers: {
          Authorization: `Bearer ${SECRET_KEY}`,
        },
      }
    );


    console.log("CHAPA VERIFY RESPONSE:", verify.data);


    if (
      verify.data.status === "success" &&
      verify.data.data.status === "success"
    ) {

      const tx = await prisma.transaction.update({
        where: {
          txRef: txRef,
        },
        data: {
          status: "completed",
        },
      });

if (tx.bookingId) {

  await confirmPaymentAndNotify(String(tx.bookingId));

}

    }


    return res.sendStatus(200);


  } catch (err:any) {

    console.error(
      "WEBHOOK ERROR:",
      err.response?.data || err.message
    );

    return res.sendStatus(500);
  }
};