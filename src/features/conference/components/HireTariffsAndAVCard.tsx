import React from "react";
import { Clock } from "lucide-react";

export default function HireTariffsAndAVCard() {
  return (
    <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 flex flex-col justify-between">
      <div>
        <h4 className="text-lg font-bold text-slate-950 mb-4 flex items-center gap-2">
          <Clock className="w-5 h-5 text-indigo-600" />
          Hire Tariffs & AV
        </h4>
        <div className="space-y-4 font-mono mb-6">
          <div className="bg-slate-50 p-3 rounded-lg flex justify-between items-center border border-slate-100">
            <div>
              <span className="text-xs text-slate-500 block">Full-Day Hire</span>
              <span className="text-sm font-bold text-slate-900">Full Business Day</span>
            </div>
            <span className="text-indigo-600 font-bold font-sans">ETB 10,000</span>
          </div>
          <div className="bg-slate-50 p-3 rounded-lg flex justify-between items-center border border-slate-100">
            <div>
              <span className="text-xs text-slate-500 block">Half-Day Hire</span>
              <span className="text-sm font-bold text-slate-900">Up to 4 Hours</span>
            </div>
            <span className="text-indigo-600 font-bold font-sans">ETB 5,000</span>
          </div>
          <div className="bg-slate-50 p-3 rounded-lg flex justify-between items-center border border-slate-100">
            <div>
              <span className="text-xs text-slate-500 block">Hourly Rate</span>
              <span className="text-sm font-bold text-slate-900">Per hour charge</span>
            </div>
            <span className="text-indigo-600 font-bold font-sans">ETB 1,000</span>
          </div>
        </div>

        <h5 className="text-xs font-accent uppercase tracking-widest text-slate-500 mb-2">Confirmed AV Equipment</h5>
        <div className="flex flex-wrap gap-2 text-xs font-mono text-slate-600">
          <span className="bg-slate-50 px-2 py-1 rounded border border-slate-200">Data Projector</span>
          <span className="bg-slate-50 px-2 py-1 rounded border border-slate-200">Projection Screen</span>
          <span className="bg-slate-50 px-2 py-1 rounded border border-slate-200">Whiteboard</span>
          <span className="bg-slate-50 px-2 py-1 rounded border border-slate-200">PA Audio Setup</span>
        </div>
      </div>
    </div>
  );
}
