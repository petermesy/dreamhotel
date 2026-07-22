import React from "react";
import { Phone, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-slate-950 text-slate-400 py-12 px-4 sm:px-6 md:px-8 border-t border-slate-900 text-sm font-mono">
      <div className="mx-auto max-w-7xl mb-8 border-b border-slate-900 pb-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-10 lg:gap-16">
          <div className="flex flex-col gap-3 md:items-start">
            <span className="text-white font-sans text-xl font-bold tracking-tight">DREAM HOTEL</span>
            <p className="max-w-sm text-xs leading-relaxed text-slate-400">
              Where Comfort Meets Distinction — Your Home Away from Home in the Heart of Sawla. Established 2018 EC / 2026 GC.
            </p>
          </div>

          <div className="flex flex-col items-start md:items-center">
            <h5 className="mb-3 text-sm font-bold text-white font-sans">Reach Us Offline</h5>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0 text-indigo-500" />
                <span>+251 91 176 8699</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0 text-indigo-500" />
                <span>reservations@dreamhotelsawla.com</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-base text-indigo-500">📍</span>
                <span>Gofa, Sawla, Ethiopia</span>
              </li>
            </ul>
          </div>

          <div className="flex flex-col items-start ">
            <h5 className="mb-3 text-sm font-bold text-white font-sans">Regulatory Alignment</h5>
            <p className="max-w-sm text-xs leading-relaxed text-slate-400">
              Mandatory collection of guest details including alphanumeric National ID </p>
          </div>
        </div>
      </div>

      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 text-center text-xs text-slate-500 sm:flex-row sm:text-left">
        <span>&copy; {new Date().getFullYear()} Dream Hotel. All rights reserved. English Only.</span>
        <span className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
        </span>
      </div>
    </footer>
  );
}
