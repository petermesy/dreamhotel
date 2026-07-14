import React from "react";
import { AlertCircle, Check } from "lucide-react";
import { motion } from "motion/react";

interface BookingConfirmationCardProps {
  bookingSuccess: any;
  onNewBooking: () => void;
}

export default function BookingConfirmationCard({ bookingSuccess, onNewBooking }: BookingConfirmationCardProps) {
  return (
    <div className="w-full bg-slate-50 py-16 flex justify-center items-center px-4 animate-fade-in">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-xl w-full bg-white rounded-3xl p-8 md:p-10 shadow-xl border border-slate-200 flex flex-col gap-6 text-slate-900 text-center font-mono"
      >
        <div className="mx-auto bg-emerald-50 text-emerald-600 p-4 rounded-full w-fit">
          <Check className="w-10 h-10 stroke-[3]" />
        </div>

        <h3 className="text-2xl font-extrabold text-slate-950 font-sans tracking-tight">Reservation Confirmed!</h3>
        <p className="text-xs text-slate-500">
          Your offline guest registration reference has been generated successfully. Please present this reference code upon check-in.
        </p>

        <div className="bg-slate-900 text-white rounded-2xl p-6 my-2 text-left space-y-3">
          <div className="flex justify-between items-center border-b border-slate-800 pb-2.5">
            <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Booking Ref:</span>
            <span className="text-lg font-bold text-indigo-400 font-mono tracking-widest">{bookingSuccess.id}</span>
          </div>
          <div className="space-y-1.5 text-xs text-slate-300">
            <p><strong>Guest Name:</strong> {bookingSuccess.fullName}</p>
            <p><strong>Assigned Room:</strong> Room {bookingSuccess.roomNumber}</p>
            <p><strong>Room Type:</strong> {bookingSuccess.roomType?.name}</p>
            <p><strong>Check-In Date:</strong> {new Date(bookingSuccess.checkIn).toLocaleDateString()}</p>
            <p><strong>Check-Out Date:</strong> {new Date(bookingSuccess.checkOut).toLocaleDateString()}</p>
            <p><strong>Total Price Quote:</strong> ETB {bookingSuccess.totalPrice.toLocaleString()}</p>
          </div>
        </div>

        <div className="bg-indigo-50 border border-indigo-200/60 text-indigo-955 p-4 rounded-xl text-left text-xs flex gap-3 shadow-inner">
          <AlertCircle className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
          <div>
            <strong className="block text-indigo-900 mb-0.5">Strict Cash-Only Payment Notice</strong>
            No digital payment portals are available on-site or online. Guests must pay the flat rate of <strong>ETB {bookingSuccess.totalPrice.toLocaleString()}</strong> in physical cash upon checking in at the front desk.
          </div>
        </div>

        <div className="flex flex-col gap-2.5 mt-2">
          <button
            onClick={onNewBooking}
            className="w-full bg-slate-950 hover:bg-slate-900 text-white font-bold py-3.5 rounded-xl text-sm transition-all shadow-sm cursor-pointer font-sans"
          >
            Book Another Room
          </button>
          <p className="text-[10px] text-slate-400">
            Need assistance? Contact our front-desk immediately at +251 985 876 478
          </p>
        </div>
      </motion.div>
    </div>
  );
}
