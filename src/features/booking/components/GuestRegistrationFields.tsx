import React from "react";
import { Mail, MapPin, CheckSquare, Phone } from "lucide-react";
import type { BookingFormData } from "../types";

interface GuestRegistrationFieldsProps {
  formData: BookingFormData;
  onFieldChange: (field: keyof BookingFormData, value: string) => void;
}

export default function GuestRegistrationFields({ formData, onFieldChange }: GuestRegistrationFieldsProps) {
  return (
    <section className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
      <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-indigo-600 font-semibold">Guest details</p>
          <h4 className="text-xl font-semibold text-slate-950">Guest registration information</h4>
        </div>
        <p className="text-xs text-slate-500">Required fields only</p>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <div className="col-span-1 md:col-span-2">
          <label htmlFor="fullName" className="text-xs font-bold text-slate-700 flex items-center gap-2">
            <span className="text-slate-400">●</span>
            Guest Full Name *
          </label>
          <input
            type="text"
            id="fullName"
            required
            placeholder="e.g. Abebe Kebede"
            value={formData.fullName}
            onChange={(e) => onFieldChange("fullName", e.target.value)}
            className="mt-2 w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-slate-950 outline-none transition focus:border-indigo-500"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-xs font-bold text-slate-700 flex items-center gap-2">
            <Mail className="w-4 h-4 text-slate-400" />
            Email Address *
          </label>
          <input
            type="email"
            id="email"
            required
            placeholder="e.g. guest@example.com"
            value={formData.email}
            onChange={(e) => onFieldChange("email", e.target.value)}
            className="w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-slate-950 outline-none transition focus:border-indigo-500"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="purpose" className="text-xs font-bold text-slate-700">Purpose of Stay *</label>
          <select
            id="purpose"
            required
            value={formData.purpose}
            onChange={(e) => onFieldChange("purpose", e.target.value)}
            className="w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-slate-950 outline-none transition focus:border-indigo-500"
          >
            <option value="Leisure / Tourism">Leisure / Tourism</option>
            <option value="Business Travel">Business Travel</option>
            <option value="Conference / Seminar Attendance">Conference / Seminar Attendance</option>
            <option value="Family Visit">Family Visit</option>
            <option value="Medical / Health">Medical / Health</option>
            <option value="Government / Official">Government / Official</option>
            <option value="Other">Other (Free text)</option>
          </select>
        </div>

        {formData.purpose === "Other" && (
          <div className="flex flex-col gap-2">
            <label htmlFor="otherPurpose" className="text-xs font-bold text-slate-700">Specify Purpose of Stay *</label>
            <input
              type="text"
              id="otherPurpose"
              required
              placeholder="Write your purpose of stay"
              value={formData.otherPurpose}
              onChange={(e) => onFieldChange("otherPurpose", e.target.value)}
              className="w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-slate-950 outline-none transition focus:border-indigo-500"
            />
          </div>
        )}

        <div className="col-span-1 md:col-span-2 flex flex-col gap-2">
          <label htmlFor="address" className="text-xs font-bold text-slate-700 flex items-center gap-2">
            <MapPin className="w-4 h-4 text-slate-400" />
            Home / Permanent Address *
          </label>
          <input
            type="text"
            id="address"
            required
            placeholder="e.g. Addis Ababa, Bole, Ethiopia"
            value={formData.address}
            onChange={(e) => onFieldChange("address", e.target.value)}
            className="w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-slate-950 outline-none transition focus:border-indigo-500"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="nationalId" className="text-xs font-bold text-slate-700 flex items-center gap-2">
            <CheckSquare className="w-4 h-4 text-slate-400" />
            National ID / Passport Number *
          </label>
          <input
            type="text"
            id="nationalId"
            required
            placeholder="Alphanumeric, e.g. NID982041"
            value={formData.nationalId}
            onChange={(e) => onFieldChange("nationalId", e.target.value)}
            className="w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-slate-950 outline-none transition focus:border-indigo-500"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="phone" className="text-xs font-bold text-slate-700 flex items-center gap-2">
            <Phone className="w-4 h-4 text-slate-400" />
            Telephone Number *
          </label>
          <input
            type="tel"
            id="phone"
            required
            placeholder="e.g. +251 911 223 344"
            value={formData.phone}
            onChange={(e) => onFieldChange("phone", e.target.value)}
            className="w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-slate-950 outline-none transition focus:border-indigo-500"
          />
        </div>
      </div>
    </section>
  );
}
