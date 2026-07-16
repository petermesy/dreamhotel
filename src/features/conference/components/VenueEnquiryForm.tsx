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
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-slate-200">
      <div className="lg:col-span-2">
        <span className="text-xs font-accent uppercase tracking-widest text-indigo-600 mb-2 block font-bold">Online Inquiry Flow</span>
        <h4 className="text-3xl font-serif font-medium text-slate-950 tracking-tight leading-tight mb-4">Request Event Booking</h4>
        <p className="text-slate-600 text-sm font-mono leading-relaxed mb-6">
          Conference Hall bookings bypass the standard room calendar. Instead, fill out this inquiry form. Our front-desk team will receive your interest immediately and follow up with you by phone or email to finalize pricing and date block details.
        </p>
        <div className="flex items-center gap-2 text-xs font-mono bg-indigo-50 text-indigo-955 p-4 rounded-xl border border-indigo-100">
          <Mail className="w-5 h-5 text-indigo-600 shrink-0" />
          <span>Forms submit directly to: <strong>reservations@dreamhotelsawla.com</strong></span>
        </div>
      </div>

      <div className="lg:col-span-3">
        <form onSubmit={onSubmit} className="space-y-6 font-mono text-sm">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="name" className="text-xs font-bold text-slate-700">Organizer Full Name *</label>
              <input
                type="text"
                id="name"
                required
                placeholder="e.g. Abebe Kebede"
                value={formData.name}
                onChange={(e) => onFieldChange("name", e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 focus:border-indigo-500 rounded-lg p-3 text-slate-950 outline-none transition-all"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="organization" className="text-xs font-bold text-slate-700">Company / Organization *</label>
              <input
                type="text"
                id="organization"
                required
                placeholder="e.g. Sawla Trading"
                value={formData.organization}
                onChange={(e) => onFieldChange("organization", e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 focus:border-indigo-500 rounded-lg p-3 text-slate-950 outline-none transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="eventType" className="text-xs font-bold text-slate-700">Event Type *</label>
              <select
                id="eventType"
                required
                value={formData.eventType}
                onChange={(e) => onFieldChange("eventType", e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 focus:border-indigo-500 rounded-lg p-3 text-slate-950 outline-none transition-all"
              >
                <option value="Conference">Conference</option>
                <option value="Seminar">Corporate Seminar</option>
                <option value="Banquet">Private Celebration</option>
                <option value="Workshop">Educational Workshop</option>
              </select>
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="date" className="text-xs font-bold text-slate-700">Requested Date *</label>
              <input
                type="date"
                id="date"
                required
                value={formData.date}
                onChange={(e) => onFieldChange("date", e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 focus:border-indigo-500 rounded-lg p-3 text-slate-950 outline-none transition-all"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="estimatedAttendance" className="text-xs font-bold text-slate-700">Estimated Attendance *</label>
              <input
                type="number"
                id="estimatedAttendance"
                required
                min="1"
                max="150"
                placeholder="Max 150"
                value={formData.estimatedAttendance}
                onChange={(e) => onFieldChange("estimatedAttendance", e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 focus:border-indigo-500 rounded-lg p-3 text-slate-950 outline-none transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="cateringRequirement"
              checked={formData.cateringRequirement}
              onChange={(e) => onFieldChange("cateringRequirement", e.target.checked)}
              className="w-4 h-4 text-indigo-600 border-slate-200 rounded focus:ring-indigo-500 cursor-pointer"
            />
            <label htmlFor="cateringRequirement" className="text-xs font-bold text-slate-700 cursor-pointer">
              Request separate on-site catering / coffee break package options
            </label>
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="message" className="text-xs font-bold text-slate-700">Brief Event Description / Message *</label>
            <textarea
              id="message"
              required
              rows={4}
              placeholder="Tell us about your event agenda, catering details, or specific hourly requirements..."
              value={formData.message}
              onChange={(e) => onFieldChange("message", e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 focus:border-indigo-500 rounded-lg p-3 text-slate-950 outline-none transition-all"
            />
          </div>

          {error && (
            <div className="text-xs bg-rose-50 border border-rose-100 text-rose-700 p-3.5 rounded-lg font-bold">
              Error submitting form: {error}
            </div>
          )}

          {success && (
            <div className="text-xs bg-emerald-50 border border-emerald-100 text-emerald-800 p-4 rounded-lg font-bold">
              ✓ Your conference enquiry was submitted successfully! Reception desk will follow up shortly. No instant reservation is generated.
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white font-bold py-3.5 rounded-xl shadow transition-all cursor-pointer disabled:opacity-55 font-sans"
          >
            {loading ? "Submitting Inquiry..." : "Submit Venue Enquiry"}
          </button>
        </form>
      </div>
    </div>
  );
}
