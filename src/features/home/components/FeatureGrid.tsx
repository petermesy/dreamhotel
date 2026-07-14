import React from "react";
import { MapPin, Coffee, Award, Calendar, Wifi, Shield } from "lucide-react";

export default function FeatureGrid() {
  return (
    <section className="bg-white border-y border-slate-200 py-10 px-4 sm:px-6 lg:px-8 shadow-sm">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        <div className="flex flex-col items-center text-center p-3">
          <div className="p-3 bg-indigo-50 rounded-full text-indigo-600 mb-3">
            <MapPin className="w-5 h-5" />
          </div>
          <p className="text-[11px] font-mono font-medium text-slate-800 leading-snug">
            Walking distance from Center
          </p>
        </div>
        <div className="flex flex-col items-center text-center p-3">
          <div className="p-3 bg-indigo-50 rounded-full text-indigo-600 mb-3">
            <Coffee className="w-5 h-5" />
          </div>
          <p className="text-[11px] font-mono font-medium text-slate-800 leading-snug">
            Newly Furnished & Spacious Rooms
          </p>
        </div>
        <div className="flex flex-col items-center text-center p-3">
          <div className="p-3 bg-indigo-50 rounded-full text-indigo-600 mb-3">
            <Award className="w-5 h-5" />
          </div>
          <p className="text-[11px] font-mono font-medium text-slate-800 leading-snug">
            Conference & Meeting Halls
          </p>
        </div>
        <div className="flex flex-col items-center text-center p-3">
          <div className="p-3 bg-indigo-50 rounded-full text-indigo-600 mb-3">
            <Calendar className="w-5 h-5" />
          </div>
          <p className="text-[11px] font-mono font-medium text-slate-800 leading-snug">
            24hrs Attentive Front Desk
          </p>
        </div>
        <div className="flex flex-col items-center text-center p-3">
          <div className="p-3 bg-indigo-50 rounded-full text-indigo-600 mb-3">
            <Wifi className="w-5 h-5" />
          </div>
          <p className="text-[11px] font-mono font-medium text-slate-800 leading-snug">
            High Speed Free Wi-Fi
          </p>
        </div>
        <div className="flex flex-col items-center text-center p-3">
          <div className="p-3 bg-indigo-50 rounded-full text-indigo-600 mb-3">
            <Shield className="w-5 h-5" />
          </div>
          <p className="text-[11px] font-mono font-medium text-slate-800 leading-snug">
            Highly Secure and Safe
          </p>
        </div>
      </div>
    </section>
  );
}