import React from "react";
import { Sparkles } from "lucide-react";
import type { BookingFormData, RoomTypeOption } from "../types";

interface RoomStaySectionProps {
  selectedRoomTypeId: string |null;
  roomTypes: RoomTypeOption[];
  formData: BookingFormData;
  currentRoomType?: RoomTypeOption;
  checkingAvailability: boolean;
  availableCount: number |null;
  availabilityError: string |null;
  onRoomTypeChange: (value: string |null) => void;
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
  // Today's date
  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="space-y-5 sm:space-y-6">
      {/* Header Card */}
      <div className="rounded-3xl border border-slate-200 bg-slate-950 p-5 sm:p-6 shadow-lg shadow-slate-950/10 text-white">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h4 className="text-xl sm:text-2xl font-extrabold tracking-tight">
              Reservation Details
            </h4>

            <p className="mt-2 text-sm sm:text-base leading-6 text-slate-300">
              Select your room category and preferred stay dates to check
              availability instantly.
            </p>
          </div>

          <div className="inline-flex w-fit items-center gap-2 rounded-2xl bg-indigo-500/10 px-4 py-2 text-xs font-semibold text-indigo-200 border border-indigo-400/20">
            <Sparkles className="w-4 h-4 text-indigo-200" />
            <span>Dream Hotel</span>
          </div>
        </div>
      </div>

      {/* Main Card */}
      <div className="rounded-3xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm shadow-slate-900/5">
        <div className="grid gap-6 md:grid-cols-3">
          {/* Room Type */}
          <div className="md:col-span-3 space-y-3">
            <label
              htmlFor="roomType"
              className="block text-xs font-semibold uppercase tracking-[0.24em] text-slate-500"
            >
              Room Classification
            </label>

            <select
              id="roomType"
              required
              value={selectedRoomTypeId || ""}
              onChange={(e) => onRoomTypeChange(e.target.value || null)}
              className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-base text-slate-900 outline-none transition focus:border-indigo-500"
            >
              <option value="">Choose a room category</option>

              {roomTypes.map((rt) => (
                <option key={rt.id} value={rt.id}>
                  {rt.name}
                </option>
              ))}
            </select>
          </div>

          {/* Dates */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:col-span-2">
            {/* Check In */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="checkIn"
                className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500"
              >
                Check-in
              </label>

              <input
                type="date"
                id="checkIn"
                required
                min={today}
                value={formData.checkIn}
                onChange={(e) => onDateChange("checkIn", e.target.value)}
                className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-base text-slate-900 outline-none transition focus:border-indigo-500"
              />
            </div>

            {/* Check Out */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="checkOut"
                className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500"
              >
                Check-out
              </label>

              <input
                type="date"
                id="checkOut"
                required
                        min={
              formData.checkIn
                ? new Date(
                    new Date(formData.checkIn).getTime() + 24 * 60 * 60 * 1000
                  )
                    .toISOString()
                    .split("T")[0]
                : today
            }
                value={formData.checkOut}
                onChange={(e) => onDateChange("checkOut", e.target.value)}
                className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-base text-slate-900 outline-none transition focus:border-indigo-500"
              />
            </div>
          </div>
        </div>

        {/* Availability */}
        <div className="mt-6 rounded-3xl border border-slate-200 bg-slate-50 p-4 sm:p-5 text-sm text-slate-700">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3 text-slate-900">
              <span className="inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500"></span>
              <span className="font-semibold">
                Availability Check
              </span>
            </div>

            <div className="text-xs text-slate-500 sm:text-right">
              Live result updates automatically
            </div>
          </div>

          <div className="mt-4 text-sm leading-7">
            {checkingAvailability ? (
              <p className="text-slate-500">
                Verifying availability...
              </p>
            ) : availableCount !== null ? (
              availableCount > 0 ? (
                <p className="font-semibold text-emerald-700">
                  ✓ {availableCount} room(s) available for immediate
                  auto-assignment.
                </p>
              ) : (
                <p className="font-semibold text-rose-600">
                  ✕ Sold out for selected dates. Please choose another room or
                  different dates.
                </p>
              )
            ) : (
              <p className="text-slate-500">
                {availabilityError
                  ? `Error: ${availabilityError}`
                  : "Select a room and dates to see availability."}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}