import React, { useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { Room } from "./types";
import { ImageCarousel } from "./ImageCarousel";
import { BookingCard } from "./BookingCard";
import { FacilityCard } from "./FacilityCard";
import { getRoomTypeImages, getDetailedFacilities } from "./utils";

interface RoomDetailDashboardProps {
  selectedRoom: Room;
  onBack: () => void;
  onBookNow: (id: string) => void;
}

export default function RoomDetailDashboard({
  selectedRoom,
  onBack,
  onBookNow,
}: RoomDetailDashboardProps) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const images = getRoomTypeImages(selectedRoom.id);
  const facilities = getDetailedFacilities(selectedRoom.amenities);

  return (
    <div className="w-full bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Navigation Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-100 pb-6">
          <nav className="flex items-center gap-2 text-xs font-sans tracking-wider uppercase text-slate-400">
            <button onClick={onBack} className="hover:text-indigo-600 transition-colors">
              Rooms
            </button>
            <span>/</span>
            <span className="text-slate-900 font-bold">{selectedRoom.name}</span>
          </nav>

          <button
            onClick={onBack}
            className="flex items-center gap-2 px-5 py-2.5 border border-slate-200 hover:border-indigo-600 text-slate-700 hover:text-indigo-600 text-xs font-medium uppercase tracking-widest transition-all"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to rooms
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Gallery + Description */}
          <div className="lg:col-span-8 space-y-8">
            <ImageCarousel images={images} title={selectedRoom.name} />

            <div className="space-y-4 pt-6 border-t border-slate-100">
              <h4 className="text-xs font-sans uppercase tracking-widest text-indigo-600 font-bold">
                ROOM OVERVIEW
              </h4>
              <h2 className="text-3xl font-serif text-slate-900">
                Uncompromising luxury with {selectedRoom.area}
              </h2>
              <p className="text-slate-600 leading-relaxed text-[15px]">
                {selectedRoom.description} All our boutique units at Dream Hotel are meticulously maintained with absolute security, acoustic engineering, and warm organic fabrics.
              </p>
            </div>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-4">
            <BookingCard 
              room={selectedRoom} 
              onBookNow={onBookNow} 
              onBack={onBack} 
            />
          </div>
        </div>

        {/* Amenities Section */}
        <div className="pt-10 border-t border-slate-100">
          <h3 className="text-2xl font-serif mb-8">Amenities &amp; Comforts</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {facilities.map((facility, index) => (
              <FacilityCard key={index} facility={facility} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}