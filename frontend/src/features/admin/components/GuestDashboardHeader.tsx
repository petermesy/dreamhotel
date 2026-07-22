import React from "react";

interface GuestDashboardHeaderProps {
  userName: string;
  onBookAnotherRoom: () => void;
  onBackToHome: () => void;
  onLogout: () => void;
}

export default function GuestDashboardHeader({
  userName,
  onBookAnotherRoom,
  onBackToHome,
  onLogout,
}: GuestDashboardHeaderProps) {
  return (
    <div className="bg-slate-950 text-white py-4 px-6 md:px-8 border-b border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4">
      <div className="flex items-center gap-3">
        <div className="font-mono">
          <span className="text-xs text-slate-400 block uppercase font-bold tracking-wider">Dream Hotel Guest Space</span>
          <span className="text-sm font-bold text-slate-100">{userName} (Guest Member)</span>
        </div>
      </div>
      <div className="flex flex-wrap gap-2.5">
        <button
          onClick={onBookAnotherRoom}
          className="text-xs font-mono font-bold bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg cursor-pointer transition-all shadow-md active:scale-95"
        >
          + Book Another Room
        </button>
        <button
          onClick={onBackToHome}
          className="text-xs font-mono font-medium border border-slate-800 hover:border-slate-700 bg-slate-900 text-slate-200 px-4 py-2 rounded-lg cursor-pointer transition-all active:scale-95"
        >
          Back to Home
        </button>
        <button
          onClick={onLogout}
          className="text-xs font-mono font-bold bg-rose-600/90 hover:bg-rose-700 text-white px-4 py-2 rounded-lg cursor-pointer transition-all active:scale-95"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
