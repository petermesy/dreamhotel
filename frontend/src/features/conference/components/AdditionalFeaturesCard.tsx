import React from "react";
import { Coffee, CheckCircle2 } from "lucide-react";

export default function AdditionalFeaturesCard() {
  return (
    <div className="flex min-h-full flex-col justify-between rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <div>
        <h4 className="mb-4 flex items-center gap-2 text-base font-serif font-semibold text-slate-950 sm:text-lg">
          <Coffee className="h-5 w-5 text-indigo-600" />
          Additional Features
        </h4>
        <div className="mb-6 space-y-4 text-sm text-slate-600">
          <div className="flex items-start gap-2">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-indigo-500" />
            <p className="text-xs leading-6 font-sans sm:text-sm">
              <strong className="text-slate-900">On-site Catering:</strong> Delectable local dining or coffee breaks available for separate booking.
            </p>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-indigo-500" />
            <p className="text-xs leading-6 font-sans sm:text-sm">
              <strong className="text-slate-900">Rooftop Area:</strong> Beautiful scenic lounge deck directly adjacent to G+4 events floor.
            </p>
          </div>
        </div>

        <h5 className="mb-2 text-[11px] font-sans font-semibold uppercase tracking-[0.28em] text-slate-500">
          Not Available
        </h5>
        <div className="space-y-2 text-xs font-sans text-slate-500 sm:text-sm">
          <div className="flex items-center gap-1.5">
            <span className="text-slate-300">✕</span> Breakout / sub-meeting rooms
          </div>
        </div>
      </div>
    </div>
  );
}
