import React from "react";
import { MapPin, Phone, Mail } from "lucide-react";

export default function MapSection() {
  return (
    <section className="py-16 bg-slate-100 border-t border-b border-slate-200">
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-serif font-medium text-center text-slate-950 tracking-tight mb-10">
          Map & Contact GDS
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Interactive Map Visual */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 shadow-md p-6 flex flex-col justify-between overflow-hidden relative min-h-[350px]">
            {/* Map Address Badge overlay */}
            <div className="absolute top-6 left-6 z-10 bg-white/95 backdrop-blur shadow-md rounded-xl p-4 border border-slate-200 font-sans max-w-sm">
              <div className="flex justify-between items-start gap-4">
                <div>
                  <h4 className="text-sm font-serif font-bold text-slate-900">Dream Hotel Sawla</h4>
                  <p className="text-[10px] font-mono text-slate-500 mt-1">Main Street, Sawla Gofa Zone, Ethiopia</p>
                  <div className="flex items-center gap-1.5 mt-2">
                    <div className="flex text-amber-500 text-xs">★★★★★</div>
                    <span className="text-[10px] font-mono text-slate-500 font-bold">4.9 (84 reviews)</span>
                  </div>
                </div>
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition-colors cursor-pointer"
                  title="Open in Google Maps"
                >
                  <MapPin className="w-4 h-4" />
                </a>
              </div>
            </div>
            {/* Styled Vector Map Placeholder Background */}
            <div className="absolute inset-0 z-0 bg-[#e5e1d8]/40">
              <div className="absolute inset-0 opacity-20 pointer-events-none" style={{
                backgroundImage: `radial-gradient(#8c867a 1.2px, transparent 1.2px), radial-gradient(#8c867a 1.2px, #e5e1d8 1.2px)`,
                backgroundSize: "24px 24px",
                backgroundPosition: "0 0, 12px 12px"
              }} />
             
              {/* Styled Rivers/Roads inside map */}
              <div className="absolute top-1/3 left-0 w-full h-12 bg-sky-200/50 rotate-6" />
              <div className="absolute top-0 left-1/4 w-8 h-full bg-slate-300/40 -rotate-12" />
              <div className="absolute top-1/2 left-0 w-full h-10 bg-slate-300/40 rotate-12" />
              {/* Pulsing red pin pointing to Dream Hotel */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                <span className="relative flex h-8 w-8">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-8 w-8 bg-red-600 items-center justify-center text-white text-xs font-bold shadow-md">
                    📍
                  </span>
                </span>
                <div className="mt-1 bg-slate-900 text-white text-[9px] font-mono px-2 py-0.5 rounded font-bold shadow">
                  DREAM HOTEL
                </div>
              </div>
            </div>
            {/* Footer row of map card */}
            <div className="relative z-10 mt-auto pt-4 border-t border-slate-200/60 bg-white/80 backdrop-blur -mx-6 -mb-6 px-6 py-4 flex flex-wrap justify-between items-center text-xs text-slate-600 font-mono gap-4">
              <span>Latitude: 6.3128° N • Longitude: 36.8184° E</span>
              <span className="text-indigo-600 font-bold">海拔 Elevation: 1,950m</span>
            </div>
          </div>
          {/* GDS Information side card */}
          <div className="lg:col-span-5 bg-[#e5e1d8] p-8 md:p-10 rounded-3xl flex flex-col justify-between shadow-md border border-slate-300/50">
            <div>
              <h3 className="text-xl font-serif font-medium text-slate-900 leading-tight mb-2">
                Dream Hotel Sawla
              </h3>
              <p className="text-slate-600 text-xs font-accent uppercase tracking-widest mb-6">
                Official GDS & Reservation Codes
              </p>
              <div className="space-y-4 font-mono text-xs text-slate-700">
                <div className="flex justify-between border-b border-slate-300/60 pb-2.5">
                  <span className="font-bold text-slate-950">Amadeus GDS:</span>
                  <span>DP SAWLA1</span>
                </div>
                <div className="flex justify-between border-b border-slate-300/60 pb-2.5">
                  <span className="font-bold text-slate-950">Galileo/Apollo:</span>
                  <span>DP 49132</span>
                </div>
                <div className="flex justify-between border-b border-slate-300/60 pb-2.5">
                  <span className="font-bold text-slate-950">Sabre GDS:</span>
                  <span>DP 32755</span>
                </div>
                <div className="flex justify-between border-b border-slate-300/60 pb-2.5">
                  <span className="font-bold text-slate-950">WorldSpan GDS:</span>
                  <span>DP ADDES</span>
                </div>
                <div className="flex justify-between border-b border-slate-300/60 pb-2.5">
                  <span className="font-bold text-slate-950">Direct Booking:</span>
                  <span>Offline Cash Ledger Only</span>
                </div>
              </div>
            </div>
            <div className="mt-8 border-t border-slate-300/60 pt-6 space-y-3 font-mono text-xs text-slate-700">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-slate-900" />
                <span>+251 985 876 478</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-slate-900" />
                <span>dreamhotel@gmail.com</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}