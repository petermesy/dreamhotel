import React from "react";
import { FacilityItem } from "./types";

interface FacilityCardProps {
  facility: FacilityItem;
}

export const FacilityCard: React.FC<FacilityCardProps> = ({ facility }) => (
  <div className="flex gap-4 p-6 border border-slate-100 hover:border-slate-200 rounded-sm transition-all group">
    <div className="p-3 bg-slate-50 rounded-sm group-hover:bg-indigo-50 transition-colors shrink-0">
      {facility.icon}
    </div>
    <div>
      <h5 className="font-semibold text-slate-900 text-sm uppercase tracking-wider">
        {facility.name}
      </h5>
      <p className="text-sm text-slate-500 mt-1.5 leading-snug">
        {facility.desc}
      </p>
    </div>
  </div>
);