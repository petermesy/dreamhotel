import React from "react";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { Room } from "./types";

interface BookingCardProps {
  room: Room;
  onBookNow: (id: string) => void;
  onBack: () => void;
}

export const BookingCard: React.FC<BookingCardProps> = ({ room, onBookNow, onBack }) => (
  <div className="space-y-6">
    <div className="bg-[#fcfbf9] border border-slate-200/60 p-8 rounded-sm shadow-sm sticky top-6">
      <div className="mb-6">
        <span className="text-[9px] font-mono uppercase tracking-widest text-slate-400">Private Accommodation</span>
        <h3 className="text-2xl font-semibold tracking-tight mt-1">{room.name}</h3>
        <p className="text-sm text-slate-500 mt-2">
          {room.bedConfig} • {room.area}
        </p>
      </div>

      <div className="bg-white border border-slate-100 p-6 mb-6">
        <div className="text-xs font-mono uppercase text-slate-400">Best Rate Guaranteed</div>
        <div className="flex items-baseline gap-1 mt-2">
          <span className="text-4xl font-bold text-indigo-600">ETB {room.rate.toLocaleString()}</span>
          <span className="text-sm text-slate-400">/night</span>
        </div>
      </div>

      <div className="space-y-3">
        <button
          onClick={() => onBookNow(room.id)}
          className="w-full bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white font-medium uppercase tracking-widest py-4 rounded-sm transition-all flex items-center justify-center gap-2 shadow-md"
        >
          Book this room
          <ArrowRight className="w-4 h-4" />
        </button>

        <button
          onClick={onBack}
          className="w-full border border-slate-200 hover:bg-slate-50 py-3 text-sm text-slate-600 transition-colors"
        >
          View other rooms
        </button>
      </div>
    </div>

    <div className="bg-slate-50 border border-slate-100 p-6 rounded-sm text-xs text-slate-600">
      <strong className="text-slate-900 block mb-2">CHECK-IN PROTOCOL</strong>
      <p>Valid ID or passport required at front desk as per local regulations.</p>
    </div>
  </div>
);