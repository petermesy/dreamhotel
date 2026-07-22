import React from "react";
import { Phone, Calendar, User, FileText, MapPin, Key, AlertCircle, Briefcase, Edit3, X } from "lucide-react";

interface BookingEditFormProps {
  editForm: {
    fullName: string;
    phone: string;
    purpose: string;
    nationalId: string;
    address: string;
    checkIn: string;
    checkOut: string;
    roomTypeId: string;
  };
  roomTypes: Array<{ id: string; name: string; rate: number }>;
  savingEdit: boolean;
  onFieldChange: (field: string, value: string) => void;
  onSave: () => void;
  onCancel: () => void;
}

export default function BookingEditForm({
  editForm,
  roomTypes,
  savingEdit,
  onFieldChange,
  onSave,
  onCancel,
}: BookingEditFormProps) {
  return (
    <div className="space-y-4 bg-slate-50 p-4 sm:p-6 rounded-2xl border border-slate-200">
      <div className="flex items-center justify-between border-b border-slate-200 pb-2 mb-2">
        <h4 className="font-sans font-bold text-slate-900 text-sm flex items-center gap-1.5">
          <Edit3 className="w-4 h-4 text-indigo-600" />
          Edit Booking Parameters
        </h4>
        <button onClick={onCancel} className="text-slate-400 hover:text-slate-600 p-1" title="Cancel Edit">
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
        <div className="flex flex-col gap-1">
          <label className="text-slate-600 font-bold flex items-center gap-1">
            <User className="w-3 h-3 text-slate-400" /> Guest Full Name *
          </label>
          <input
            type="text"
            required
            value={editForm.fullName}
            onChange={(e) => onFieldChange("fullName", e.target.value)}
            className="bg-white border border-slate-200 rounded-lg p-2 outline-none font-mono text-slate-900"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-slate-600 font-bold flex items-center gap-1">
            <Phone className="w-3 h-3 text-slate-400" /> Phone Number *
          </label>
          <input
            type="text"
            required
            value={editForm.phone}
            onChange={(e) => onFieldChange("phone", e.target.value)}
            className="bg-white border border-slate-200 rounded-lg p-2 outline-none font-mono text-slate-900"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-slate-600 font-bold flex items-center gap-1">
            <FileText className="w-3 h-3 text-slate-400" /> National ID / Passport *
          </label>
          <input
            type="text"
            required
            value={editForm.nationalId}
            onChange={(e) => onFieldChange("nationalId", e.target.value)}
            className="bg-white border border-slate-200 rounded-lg p-2 outline-none font-mono text-slate-900"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-slate-600 font-bold flex items-center gap-1">
            <MapPin className="w-3 h-3 text-slate-400" /> Home Address *
          </label>
          <input
            type="text"
            required
            value={editForm.address}
            onChange={(e) => onFieldChange("address", e.target.value)}
            className="bg-white border border-slate-200 rounded-lg p-2 outline-none font-mono text-slate-900"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-slate-600 font-bold flex items-center gap-1">
            <Briefcase className="w-3 h-3 text-slate-400" /> Purpose of Stay *
          </label>
          <select
            value={editForm.purpose}
            onChange={(e) => onFieldChange("purpose", e.target.value)}
            className="bg-white border border-slate-200 rounded-lg p-2 outline-none font-mono text-slate-900"
          >
            <option value="Leisure">Leisure / Vacation</option>
            <option value="Business">Business / Conference</option>
            <option value="NGO / Humanitarian">NGO / Humanitarian Work</option>
            <option value="Transit">Transit Stay</option>
            <option value="Other">Other Purpose</option>
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-slate-600 font-bold flex items-center gap-1">
            <Key className="w-3 h-3 text-slate-400" /> Room Classification *
          </label>
          <select
            value={editForm.roomTypeId}
            onChange={(e) => onFieldChange("roomTypeId", e.target.value)}
            className="bg-white border border-slate-200 rounded-lg p-2 outline-none font-mono text-slate-900"
          >
            {roomTypes.map((rt) => (
              <option key={rt.id} value={rt.id}>
                {rt.name} (ETB {rt.rate.toLocaleString()} / night)
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-slate-600 font-bold flex items-center gap-1">
            <Calendar className="w-3 h-3 text-slate-400" /> Reschedule Check-In *
          </label>
          <input
            type="date"
            required
            value={editForm.checkIn}
            onChange={(e) => onFieldChange("checkIn", e.target.value)}
            className="bg-white border border-slate-200 rounded-lg p-2 outline-none font-mono text-slate-900"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-slate-600 font-bold flex items-center gap-1">
            <Calendar className="w-3 h-3 text-slate-400" /> Reschedule Check-Out *
          </label>
          <input
            type="date"
            required
            value={editForm.checkOut}
            onChange={(e) => onFieldChange("checkOut", e.target.value)}
            className="bg-white border border-slate-200 rounded-lg p-2 outline-none font-mono text-slate-900"
          />
        </div>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-[10px] text-amber-800 leading-relaxed flex gap-2">
        <AlertCircle className="w-4 h-4 shrink-0 text-amber-600" />
        <span>
          Rescheduling dates or changing classifications re-runs real-time calendar availability logic. Your assigned room number may be automatically updated.
        </span>
      </div>

      <div className="flex flex-col sm:flex-row gap-2.5 pt-2">
        <button
          onClick={onSave}
          disabled={savingEdit}
          className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white font-sans font-bold px-4 py-2 rounded-lg text-xs transition-all flex items-center justify-center gap-1 cursor-pointer"
        >
          {savingEdit ? "Updating Stay..." : "Save Stay Updates"}
        </button>
        <button
          onClick={onCancel}
          className="w-full sm:w-auto border border-slate-300 text-slate-600 hover:bg-slate-100 font-sans font-medium px-4 py-2 rounded-lg text-xs transition-all cursor-pointer"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
