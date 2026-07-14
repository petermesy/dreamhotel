import React from "react";
import { ClipboardList, History } from "lucide-react";

interface BookingSubTabsProps {
  activeSubTab: "active" | "history";
  activeCount: number;
  historyCount: number;
  onTabChange: (tab: "active" | "history") => void;
}

export default function BookingSubTabs({ activeSubTab, activeCount, historyCount, onTabChange }: BookingSubTabsProps) {
  return (
    <div className="flex p-1 bg-slate-200/80 rounded-xl font-mono text-xs font-bold gap-1">
      <button
        onClick={() => onTabChange("active")}
        className={`px-4 py-2 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
          activeSubTab === "active" ? "bg-white text-slate-950 shadow-sm font-bold" : "text-slate-600 hover:text-slate-950"
        }`}
      >
        <ClipboardList className="w-3.5 h-3.5" />
        Active ({activeCount})
      </button>
      <button
        onClick={() => onTabChange("history")}
        className={`px-4 py-2 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
          activeSubTab === "history" ? "bg-white text-slate-950 shadow-sm font-bold" : "text-slate-600 hover:text-slate-950"
        }`}
      >
        <History className="w-3.5 h-3.5" />
        History ({historyCount})
      </button>
    </div>
  );
}
