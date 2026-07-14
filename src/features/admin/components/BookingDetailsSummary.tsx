import React from "react";
import { Edit3 } from "lucide-react";

interface BookingDetailsSummaryProps {
  booking: any;
  onStartEdit: (booking: any) => void;
}

export default function BookingDetailsSummary({ booking, onStartEdit }: BookingDetailsSummaryProps) {
  return (
    <>
      <div className="grid grid-cols-2 gap-y-4 gap-x-6 text-xs font-mono">
        <div>
          <span className="text-slate-400 text-[10px] uppercase font-bold tracking-wider block mb-0.5">Guest Name</span>
          <span className="font-bold text-slate-800 font-sans text-sm block">{booking.fullName}</span>
        </div>
        <div>
          <span className="text-slate-400 text-[10px] uppercase font-bold tracking-wider block mb-0.5">Room Classification</span>
          <span className="font-bold text-slate-800 font-sans text-sm block">{booking.roomType?.name}</span>
        </div>
        <div>
          <span className="text-slate-400 text-[10px] uppercase font-bold tracking-wider block mb-0.5">Stay Interval Dates</span>
          <span className="font-bold text-slate-800 block">
            {new Date(booking.checkIn).toLocaleDateString()} to {new Date(booking.checkOut).toLocaleDateString()}
          </span>
        </div>
        <div>
          <span className="text-slate-400 text-[10px] uppercase font-bold tracking-wider block mb-0.5">Assigned Room Unit</span>
          <span className="font-bold text-slate-800 block">
            {booking.roomNumber ? `Room ${booking.roomNumber} (Floor ${booking.room?.floor || "1"})` : "Pending Staff Assignment"}
          </span>
        </div>
        <div>
          <span className="text-slate-400 text-[10px] uppercase font-bold tracking-wider block mb-0.5">National ID / Passport</span>
          <span className="font-bold text-slate-800 block">{booking.nationalId}</span>
        </div>
        <div>
          <span className="text-slate-400 text-[10px] uppercase font-bold tracking-wider block mb-0.5">Contact Phone</span>
          <span className="font-bold text-slate-800 block">{booking.phone}</span>
        </div>
        <div>
          <span className="text-slate-400 text-[10px] uppercase font-bold tracking-wider block mb-0.5">Purpose of Visit</span>
          <span className="font-bold text-slate-800 block">{booking.purpose}</span>
        </div>
        <div>
          <span className="text-slate-400 text-[10px] uppercase font-bold tracking-wider block mb-0.5">Address Registered</span>
          <span className="font-bold text-slate-800 block">{booking.address}</span>
        </div>
      </div>

      <div className="border-t border-slate-100 pt-3.5 flex justify-between items-center text-xs font-mono">
        <span className="text-slate-500 font-bold">Total Estimated Stay Cost:</span>
        <strong className="text-lg text-slate-950 font-extrabold font-sans">ETB {booking.totalPrice.toLocaleString()}</strong>
      </div>

      {booking.status === "BOOKED" && (
        <div className="flex gap-2 pt-1 border-t border-slate-100">
          <button
            onClick={() => onStartEdit(booking)}
            className="px-3.5 py-2 rounded-xl border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-indigo-600 hover:text-indigo-700 font-sans font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-sm"
          >
            <Edit3 className="w-3.5 h-3.5" />
            Modify stay details / Reschedule Dates
          </button>
        </div>
      )}
    </>
  );
}
