import React from "react";
import { Landmark } from "lucide-react";

export default function VenueSpecificationsCard() {
  return (
    <div className="flex min-h-full flex-col justify-between rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <div>
        <h4 className="mb-4 flex items-center gap-2 text-base font-serif font-semibold text-slate-950 sm:text-lg">
          <Landmark className="h-5 w-5 text-indigo-600" />
          Venue Specifications
        </h4>
        <ul className="space-y-3 text-sm font-sans text-slate-600 sm:space-y-4 sm:text-[15px]">
          <li className="flex flex-col gap-1 border-b border-slate-100 pb-3 sm:flex-row sm:items-center sm:justify-between">
            <span className="text-slate-500">Location:</span>
            <span className="font-semibold text-slate-900">G+4 Fourth Floor</span>
          </li>
          <li className="flex flex-col gap-1 border-b border-slate-100 pb-3 sm:flex-row sm:items-center sm:justify-between">
            <span className="text-slate-500">Capacity:</span>
            <span className="font-semibold text-slate-900">Up to 150 Seated</span>
          </li>
          <li className="flex flex-col gap-1 border-b border-slate-100 pb-3 sm:flex-row sm:items-center sm:justify-between">
            <span className="text-slate-500">Dimensions:</span>
            <span className="font-semibold text-slate-900">300 m² (20m × 15m)</span>
          </li>
          <li className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
            <span className="text-slate-500">Recreation Area:</span>
            <span className="font-semibold text-slate-900">Adjacent Rooftop Deck</span>
          </li>
        </ul>
      </div>
      <div className="mt-6 rounded-2xl border border-indigo-100 bg-indigo-50 p-4 text-[12px] leading-6 text-indigo-900 sm:text-xs font-sans">
        <strong>Please note:</strong> The G+4 events level provides exclusive lift access and adjacent restrooms for premium executive privacy.
      </div>
    </div>
  );
}
