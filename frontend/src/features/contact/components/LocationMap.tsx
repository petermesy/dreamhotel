import React from "react";

export default function LocationMap() {
  return (
    <div className="lg:col-span-5 flex flex-col justify-between gap-6">
      <div>
        <h4 className="text-xl font-serif font-medium text-slate-950 mb-1">
          Geographic Location
        </h4>
        <p className="text-slate-500 text-xs font-mono leading-relaxed">
          Directly accessible within the commercial hub of Sawla. Easy access route for regional delegation coordinators, NGOs, and tourists.
        </p>
      </div>

      <div className="w-full h-72 bg-slate-100 border border-slate-200 rounded-2xl overflow-hidden relative shadow-inner">
        <iframe
          title="Dream Hotel Location Map"
          src="https://www.google.com/maps?q=6.3028486,36.8882250&z=15&output=embed"
          className="absolute inset-0 w-full h-full border-0"
          allowFullScreen
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
        />
      </div>

      <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl flex items-center gap-3 font-mono text-[10px] text-slate-500 leading-normal">
        <span className="text-base">📍</span>
        <div>
          <strong>Sawla, Gofa Zone, Ethiopia</strong>
          <p className="mt-0.5">Latitude: 6.3028° N &bull; Longitude: 36.8882° E</p>
        </div>
      </div>
    </div>
  );
}
