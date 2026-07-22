import React from "react";

interface BookingEmptyStateProps {
  activeSubTab: "active" | "history";
  onBookAnotherRoom: () => void;
}

export default function BookingEmptyState({ activeSubTab, onBookAnotherRoom }: BookingEmptyStateProps) {
  return (
    <div className="bg-white p-16 text-center rounded-3xl shadow-sm border border-slate-200 max-w-lg mx-auto">
      <div className="text-4xl mb-4">🏨</div>
      <p className="text-slate-500 text-sm font-mono mb-6">
        {activeSubTab === "active"
          ? "You have no active reservations registered under this account right now."
          : "Your historical reservation stay ledger is currently empty."}
      </p>
      {activeSubTab === "active" && (
        <button
          onClick={onBookAnotherRoom}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-sans font-bold px-6 py-3 rounded-xl text-xs cursor-pointer transition-all shadow"
        >
          Book Your First Room Now
        </button>
      )}
    </div>
  );
}
