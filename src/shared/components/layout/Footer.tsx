import React from "react";
import { Phone, Mail } from "lucide-react";

export default function Footer() {
  return (
         <footer className="w-full bg-slate-950 text-slate-400 py-12 px-4 sm:px-6 md:px-8 border-t border-slate-900 text-sm font-mono">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 border-b border-slate-900 pb-8">
          {/* Brand block */}
          <div className="flex flex-col gap-3">
            <span className="text-white font-sans text-xl font-bold tracking-tight">DREAM HOTEL</span>
            <p className="text-xs leading-relaxed text-slate-400">
              Where Comfort Meets Distinction — Your Home Away from Home in the Heart of Sawla. Established 2018 EC / 2026 GC.
            </p>
          </div>

          {/* Quick contact */}
          <div>
            <h5 className="text-white font-sans font-bold mb-3 text-sm">Reach Us Offline</h5>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-xs sm:text-sm">
                <Phone className="w-4 h-4 text-indigo-500" />
                <span>+251 985 876 478</span>
              </li>
              <li className="flex items-center gap-2 text-xs sm:text-sm">
                <Mail className="w-4 h-4 text-indigo-500" />
                <span>dreamhotel@gmail.com</span>
              </li>
              <li className="flex items-center gap-2 text-xs sm:text-sm">
                <span className="text-indigo-500 text-base">📍</span>
                <span>Gofa, Sawla, Ethiopia</span>
              </li>
            </ul>
          </div>

          {/* Guidelines */}
     
          {/* Regulatory */}
          <div>
            <h5 className="text-white font-sans font-bold mb-3 text-sm">Regulatory Alignment</h5>
            <p className="text-xs text-slate-400 leading-relaxed">
              Mandatory collection of guest details including alphanumeric National ID / Passport details to remain fully compliant with Ethiopian hospitality regulations.
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left text-xs text-slate-500">
          <span>&copy; {new Date().getFullYear()} Dream Hotel. All rights reserved. English Only.</span>
          <span className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 bg-emerald-500 rounded-full"></span>
            {/* <span>Local Infrastructure Optimization Enabled</span> */}
          </span>
        </div>
      </footer>
  );
}
