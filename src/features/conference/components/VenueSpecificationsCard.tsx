import React from "react";
import { Landmark } from "lucide-react";

export default function VenueSpecificationsCard() {
  return (
    <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 flex flex-col justify-between">
      <div>
        <h4 className="text-lg font-bold text-slate-950 mb-4 flex items-center gap-2">
          <Landmark className="w-5 h-5 text-indigo-600" />
          Venue Specifications
        </h4>
        <ul className="space-y-4 text-sm text-slate-600 font-mono">
          <li className="flex justify-between items-center border-b border-slate-100 pb-2">
            <span>Location:</span>
            <span className="font-bold text-slate-900">G+4 Fourth Floor</span>
          </li>
          <li className="flex justify-between items-center border-b border-slate-100 pb-2">
            <span>Capacity:</span>
            <span className="font-bold text-slate-900">Up to 150 Seated</span>
          </li>
          <li className="flex justify-between items-center border-b border-slate-100 pb-2">
            <span>Dimensions:</span>
            <span className="font-bold text-slate-900">300 m² (20m × 15m)</span>
          </li>
          <li className="flex justify-between items-center pb-2">
            <span>Recreation Area:</span>
            <span className="font-bold text-slate-900">Adjacent Rooftop Deck</span>
          </li>
        </ul>
      </div>
      <div className="bg-indigo-50 border border-indigo-100 p-4 rounded-xl text-xs text-indigo-900 font-mono mt-6">
        <strong>Please note:</strong> The G+4 events level provides exclusive lift access and adjacent restrooms for premium executive privacy.
      </div>
    </div>
  );
}
