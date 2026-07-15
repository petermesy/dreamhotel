import React from "react";
import { Coffee, CheckCircle2 } from "lucide-react";

export default function AdditionalFeaturesCard() {
  return (
    <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 flex flex-col justify-between">
      <div>
        <h4 className="text-lg font-bold text-slate-950 mb-4 flex items-center gap-2">
          <Coffee className="w-5 h-5 text-indigo-600" />
          Additional Features
        </h4>
        <div className="space-y-4 text-sm text-slate-600 mb-6">
          <div className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
            <p className="font-mono text-xs">
              <strong className="text-slate-900">On-site Catering:</strong> Delectable local dining or coffee breaks available for separate booking.
            </p>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
            <p className="font-mono text-xs">
              <strong className="text-slate-900">Rooftop Area:</strong> Beautiful scenic lounge deck directly adjacent to G+4 events floor.
            </p>
          </div>
        </div>

        <h5 className="text-xs font-accent uppercase tracking-widest text-slate-400 mb-2">NOT Available</h5>
        <div className="space-y-2 text-xs text-slate-400 font-mono">
          <div className="flex items-center gap-1.5">
            <span className="text-slate-300">✕</span> Breakout / sub-meeting rooms
          </div>
        </div>
      </div>
    </div>
  );
}
