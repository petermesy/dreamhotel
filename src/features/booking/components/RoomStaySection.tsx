import React from "react";
import { Sparkles } from "lucide-react";
import type { BookingFormData, RoomTypeOption } from "../types";

interface RoomStaySectionProps {
  selectedRoomTypeId: string | null;
  roomTypes: RoomTypeOption[];
  formData: BookingFormData;
  currentRoomType?: RoomTypeOption;
  checkingAvailability: boolean;
  availableCount: number | null;
  availabilityError: string | null;
  onRoomTypeChange: (value: string | null) => void;
  onDateChange: (field: "checkIn" | "checkOut", value: string) => void;
}

export default function RoomStaySection({
  selectedRoomTypeId,
  roomTypes,
  formData,
  currentRoomType,
  checkingAvailability,
  availableCount,
  availabilityError,
  onRoomTypeChange,
  onDateChange,
}: RoomStaySectionProps) {
  return (
    <div>
      <div className="bg-slate-950 text-slate-100 p-6 md:p-8 border-b border-slate-800 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h4 className="text-lg font-bold font-sans tracking-tight mb-1 text-white">Guest Registration Guidelines</h4>
          <p className="text-xs text-slate-400 font-mono">Guaranteed secure booking and flat-rate pricing</p>
        </div>
        <div className="inline-flex items-center gap-2 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-3.5 py-1.5 rounded-lg text-xs font-mono">
          <Sparkles className="w-4 h-4 text-indigo-400 shrink-0" />
          <span>Payment due at check-in</span>
        </div>
      </div>

      <div className="p-8 md:p-10 space-y-8 font-mono text-sm">
        <div>
          <h4 className="text-xs uppercase tracking-widest text-indigo-600 font-bold mb-4 flex items-center gap-2">
            <span className="w-5 h-5 bg-indigo-100 text-indigo-800 rounded-full flex items-center justify-center text-[10px] font-bold">1</span>
            Room & Stay Duration
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="roomType" className="text-xs font-bold text-slate-700">Select Room Classification *</label>
              <select
                id="roomType"
                required
                value={selectedRoomTypeId || ""}
                onChange={(e) => onRoomTypeChange(e.target.value || null)}
                className="w-full bg-slate-50 border border-slate-200 focus:border-indigo-500 rounded-lg p-3 text-slate-950 outline-none transition-all"
              >
                <option value="">-- Choose Classification --</option>
                {roomTypes.map((rt) => (
                  <option key={rt.id} value={rt.id}>
                    {rt.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="checkIn" className="text-xs font-bold text-slate-700">Check-In Date *</label>
              <input
                type="date"
                id="checkIn"
                required
                value={formData.checkIn}
                onChange={(e) => onDateChange("checkIn", e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 focus:border-indigo-500 rounded-lg p-3 text-slate-950 outline-none transition-all"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="checkOut" className="text-xs font-bold text-slate-700">Check-Out Date *</label>
              <input
                type="date"
                id="checkOut"
                required
                value={formData.checkOut}
                onChange={(e) => onDateChange("checkOut", e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 focus:border-indigo-500 rounded-lg p-3 text-slate-950 outline-none transition-all"
              />
            </div>
          </div>

          {selectedRoomTypeId && formData.checkIn && formData.checkOut && (
            <div className="mt-4 bg-slate-50 border border-slate-200 p-3.5 rounded-xl flex justify-between items-center text-xs shadow-inner">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span>Checking live availability status:</span>
              </div>
              {checkingAvailability ? (
                <span className="text-slate-400">Verifying live calendar logs...</span>
              ) : availableCount !== null ? (
                availableCount > 0 ? (
                  <span className="text-emerald-600 font-bold">✓ {availableCount} Room(s) available for immediate auto-assignment!</span>
                ) : (
                  <span className="text-rose-600 font-bold">✕ Sold Out: No rooms available of this type. Please choose another date or room type.</span>
                )
              ) : (
                <span className="text-rose-600 font-bold">✕ Error: {availabilityError || "Unable to query database"}</span>
              )}
            </div>
          )}
        </div>

        <div className="h-px bg-slate-200"></div>

        <div>
          <h4 className="text-xs uppercase tracking-widest text-indigo-600 font-bold mb-4 flex items-center gap-2">
            <span className="w-5 h-5 bg-indigo-100 text-indigo-800 rounded-full flex items-center justify-center text-[10px] font-bold">2</span>
            Mandatory Guest Registration (7 Fields)
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-1.5 col-span-1 md:col-span-2">
              <label htmlFor="fullName" className="text-xs font-bold text-slate-700 flex items-center gap-1">
                <span className="text-slate-400">●</span>
                Guest Full Name * (Field 1)
              </label>
              <input
                type="text"
                id="fullName"
                required
                placeholder="e.g. Abebe Kebede"
                value={formData.fullName}
                onChange={(e) => onDateChange("checkIn", "")}
                className="w-full bg-slate-50 border border-slate-200 focus:border-indigo-500 rounded-lg p-3 text-slate-950 outline-none transition-all"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
