import React from "react";
import { Clock } from "lucide-react";

export default function HireTariffsAndAVCard() {
  return (
    <div className="flex min-h-full flex-col justify-between rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <div>
        <h4 className="mb-4 flex items-center gap-2 text-base font-serif font-semibold text-slate-950 sm:text-lg">
          <Clock className="h-5 w-5 text-indigo-600" />
          Hire Tariffs & AV
        </h4>
        <div className="mb-6 space-y-3 font-sans">
          <div className="flex flex-col gap-2 rounded-2xl border border-slate-100 bg-slate-50 p-3.5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <span className="block text-[11px] uppercase tracking-[0.24em] text-slate-500">Full-Day Hire</span>
              <span className="text-sm font-semibold text-slate-900">Full Business Day</span>
            </div>
            <span className="font-semibold text-indigo-600">ETB 10,000</span>
          </div>
          <div className="flex flex-col gap-2 rounded-2xl border border-slate-100 bg-slate-50 p-3.5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <span className="block text-[11px] uppercase tracking-[0.24em] text-slate-500">Half-Day Hire</span>
              <span className="text-sm font-semibold text-slate-900">Up to 4 Hours</span>
            </div>
            <span className="font-semibold text-indigo-600">ETB 5,000</span>
          </div>
          <div className="flex flex-col gap-2 rounded-2xl border border-slate-100 bg-slate-50 p-3.5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <span className="block text-[11px] uppercase tracking-[0.24em] text-slate-500">Hourly Rate</span>
              <span className="text-sm font-semibold text-slate-900">Per hour charge</span>
            </div>
            <span className="font-semibold text-indigo-600">ETB 1,000</span>
          </div>
        </div>

        <h5 className="mb-2 text-[11px] font-sans font-semibold uppercase tracking-[0.28em] text-slate-500">
          Confirmed AV Equipment
        </h5>
        <div className="flex flex-wrap gap-2 text-xs font-sans text-slate-600">
          <span className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1">Data Projector</span>
          <span className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1">Projection Screen</span>
          <span className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1">Whiteboard</span>
          <span className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1">PA Audio Setup</span>
        </div>
      </div>
    </div>
  );
}
