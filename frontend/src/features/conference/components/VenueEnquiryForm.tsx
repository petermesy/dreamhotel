import React from "react";
import { Mail } from "lucide-react";

interface VenueEnquiryFormProps {
  formData: {
    name: string;
    organization: string;
    eventType: string;
    date: string;
    estimatedAttendance: string;
    cateringRequirement: boolean;
    message: string;
  };
  loading: boolean;
  error: string | null;
  success: boolean;
  onFieldChange: (field: string, value: string | boolean) => void;
  onSubmit: (event: React.FormEvent) => Promise<void> | void;
}

export default function VenueEnquiryForm({
  formData,
  loading,
  error,
  success,
  onFieldChange,
  onSubmit,
}: VenueEnquiryFormProps) {
  return (
    <div className="grid grid-cols-1 items-start gap-8 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8 lg:grid-cols-[0.95fr_1.3fr] lg:gap-10 lg:p-10">
      <div className="space-y-4 lg:pr-4">
        <span className="mb-2 block text-[11px] font-sans font-semibold uppercase tracking-[0.32em] text-indigo-600">
          Online Inquiry Flow
        </span>
        <h4 className="text-2xl font-serif font-semibold leading-tight tracking-tight text-slate-950 sm:text-3xl">
          Request Event Booking
        </h4>
        <p className="text-sm leading-7 text-slate-600 sm:text-[15px] font-sans">
          Conference Hall bookings bypass the standard room calendar. Instead, fill out this inquiry form. Our front-desk team will receive your interest immediately and follow up with you by phone or email to finalize pricing and date block details.
        </p>
        <div className="flex items-start gap-2 rounded-2xl border border-indigo-100 bg-indigo-50 p-4 text-sm font-sans text-indigo-900">
          <Mail className="mt-0.5 h-5 w-5 shrink-0 text-indigo-600" />
          <span>
            Forms submit directly to: <strong>reservations@dreamhotelsawla.com</strong>
          </span>
        </div>
      </div>

      <div>
        <form onSubmit={onSubmit} className="space-y-5 text-sm font-sans">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="name" className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-600">
                Organizer Full Name *
              </label>
              <input
                type="text"
                id="name"
                required
                placeholder="e.g. Abebe Kebede"
                value={formData.name}
                onChange={(e) => onFieldChange("name", e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-3 text-sm text-slate-950 outline-none transition-all placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="organization" className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-600">
                Company / Organization *
              </label>
              <input
                type="text"
                id="organization"
                required
                placeholder="e.g. Sawla Trading"
                value={formData.organization}
                onChange={(e) => onFieldChange("organization", e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-3 text-sm text-slate-950 outline-none transition-all placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="eventType" className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-600">
                Event Type *
              </label>
              <select
                id="eventType"
                required
                value={formData.eventType}
                onChange={(e) => onFieldChange("eventType", e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-3 text-sm text-slate-950 outline-none transition-all focus:border-indigo-500 focus:bg-white"
              >
                <option value="Conference">Conference</option>
                <option value="Seminar">Corporate Seminar</option>
                <option value="Banquet">Private Celebration</option>
                <option value="Workshop">Educational Workshop</option>
              </select>
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="date" className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-600">
                Requested Date *
              </label>
              <input
                type="date"
                id="date"
                required
                value={formData.date}
                onChange={(e) => onFieldChange("date", e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-3 text-sm text-slate-950 outline-none transition-all focus:border-indigo-500 focus:bg-white"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="estimatedAttendance" className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-600">
                Estimated Attendance *
              </label>
              <input
                type="number"
                id="estimatedAttendance"
                required
                min="1"
                max="150"
                placeholder="Max 150"
                value={formData.estimatedAttendance}
                onChange={(e) => onFieldChange("estimatedAttendance", e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-3 text-sm text-slate-950 outline-none transition-all placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white"
              />
            </div>
          </div>

          <div className="flex items-start gap-2 rounded-2xl border border-slate-100 bg-slate-50 p-3.5">
            <input
              type="checkbox"
              id="cateringRequirement"
              checked={formData.cateringRequirement}
              onChange={(e) => onFieldChange("cateringRequirement", e.target.checked)}
              className="mt-0.5 h-4 w-4 cursor-pointer rounded border-slate-200 text-indigo-600 focus:ring-indigo-500"
            />
            <label htmlFor="cateringRequirement" className="cursor-pointer text-sm text-slate-700">
              Request separate on-site catering / coffee break package options
            </label>
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="message" className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-600">
              Brief Event Description / Message *
            </label>
            <textarea
              id="message"
              required
              rows={4}
              placeholder="Tell us about your event agenda, catering details, or specific hourly requirements..."
              value={formData.message}
              onChange={(e) => onFieldChange("message", e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-3 text-sm text-slate-950 outline-none transition-all placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white"
            />
          </div>

          {error && (
            <div className="rounded-2xl border border-rose-100 bg-rose-50 p-3.5 text-sm font-semibold text-rose-700">
              Error submitting form: {error}
            </div>
          )}

          {success && (
            <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-3.5 text-sm font-semibold text-emerald-800">
              ✓ Your conference enquiry was submitted successfully! Reception desk will follow up shortly. No instant reservation is generated.
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-indigo-600 px-4 py-3.5 text-sm font-semibold text-white shadow transition-all hover:bg-indigo-700 active:scale-95 disabled:cursor-not-allowed disabled:opacity-55"
          >
            {loading ? "Submitting Inquiry..." : "Submit Venue Enquiry"}
          </button>
        </form>
      </div>
    </div>
  );
}
