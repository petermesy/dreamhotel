import React from "react";
import { Mail, MapPin, CheckSquare, Phone } from "lucide-react";
import type { BookingFormData } from "../types";

interface GuestRegistrationFieldsProps {
  formData: BookingFormData;
  onFieldChange: (field: keyof BookingFormData, value: string) => void;
}

export default function GuestRegistrationFields({ formData, onFieldChange }: GuestRegistrationFieldsProps) {
  return (
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
          onChange={(e) => onFieldChange("fullName", e.target.value)}
          className="w-full bg-slate-50 border border-slate-200 focus:border-indigo-500 rounded-lg p-3 text-slate-950 outline-none transition-all"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="email" className="text-xs font-bold text-slate-700 flex items-center gap-1">
          <Mail className="w-3.5 h-3.5 text-slate-400" />
          Email Address * (Field 2)
        </label>
        <input
          type="email"
          id="email"
          required
          placeholder="e.g. guest@example.com"
          value={formData.email}
          onChange={(e) => onFieldChange("email", e.target.value)}
          className="w-full bg-slate-50 border border-slate-200 focus:border-indigo-500 rounded-lg p-3 text-slate-950 outline-none transition-all"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="purpose" className="text-xs font-bold text-slate-700">Purpose of Stay * (Field 3)</label>
        <select
          id="purpose"
          required
          value={formData.purpose}
          onChange={(e) => onFieldChange("purpose", e.target.value)}
          className="w-full bg-slate-50 border border-slate-200 focus:border-indigo-500 rounded-lg p-3 text-slate-950 outline-none transition-all"
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
        <div className="flex flex-col gap-1.5">
          <label htmlFor="otherPurpose" className="text-xs font-bold text-slate-700">Specify Purpose of Stay *</label>
          <input
            type="text"
            id="otherPurpose"
            required
            placeholder="Write your purpose of stay"
            value={formData.otherPurpose}
            onChange={(e) => onFieldChange("otherPurpose", e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 focus:border-indigo-500 rounded-lg p-3 text-slate-950 outline-none transition-all"
          />
        </div>
      )}

      <div className="flex flex-col gap-1.5 col-span-1 md:col-span-2">
        <label htmlFor="address" className="text-xs font-bold text-slate-700 flex items-center gap-1">
          <MapPin className="w-3.5 h-3.5 text-slate-400" />
          Home / Permanent Address * (Field 3 - City, Region, Country)
        </label>
        <input
          type="text"
          id="address"
          required
          placeholder="e.g. Addis Ababa, Bole, Ethiopia"
          value={formData.address}
          onChange={(e) => onFieldChange("address", e.target.value)}
          className="w-full bg-slate-50 border border-slate-200 focus:border-indigo-500 rounded-lg p-3 text-slate-950 outline-none transition-all"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="nationalId" className="text-xs font-bold text-slate-700 flex items-center gap-1">
          <CheckSquare className="w-3.5 h-3.5 text-slate-400" />
          National ID / Passport Number * (Field 4)
        </label>
        <input
          type="text"
          id="nationalId"
          required
          placeholder="Alphanumeric, e.g. NID982041"
          value={formData.nationalId}
          onChange={(e) => onFieldChange("nationalId", e.target.value)}
          className="w-full bg-slate-50 border border-slate-200 focus:border-indigo-500 rounded-lg p-3 text-slate-950 outline-none transition-all"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="phone" className="text-xs font-bold text-slate-700 flex items-center gap-1">
          <Phone className="w-3.5 h-3.5 text-slate-400" />
          Telephone Number * (Field 7)
        </label>
        <input
          type="tel"
          id="phone"
          required
          placeholder="e.g. +251 911 223 344"
          value={formData.phone}
          onChange={(e) => onFieldChange("phone", e.target.value)}
          className="w-full bg-slate-50 border border-slate-200 focus:border-indigo-500 rounded-lg p-3 text-slate-950 outline-none transition-all"
        />
      </div>
    </div>
  );
}
