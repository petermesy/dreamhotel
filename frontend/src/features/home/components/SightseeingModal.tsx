import React from "react";
import { X } from "lucide-react";
import { motion } from "motion/react";

// Moved outside the component to prevent re-creation on every render
const sightseeingPlaces = [
  {
    title: "Mt. Gughe Cloud Forests",
    desc: "Trek up the tallest peaks of Gofa to witness cloud forest canopies, organic highland plantations, and majestic vistas of the Rift Valley.",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80",
    tip: "Bring a light fleece as temperatures drop rapidly above 2,000m.",
    altitude: "1,950m - 2,700m",
    timeNeeded: "Full Day Tour"
  },
  {
    title: "Cultural Coffee Ceremony",
    desc: "Experience the deep aroma of slow-roasted Gofa Arabica beans, hand-poured in custom clay pots accompanied by freshly popped popcorn and local sweet-herbs.",
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80",
    tip: "Accept at least three cups (Abol, Tona, Baraka) as custom dictates.",
    altitude: "1,950m",
    timeNeeded: "1 - 2 Hours"
  },
  {
    title: "Sawla Highland Central Market",
    desc: "An energetic open-air trading post where Gofa communities exchange handmade bamboo basketry, organic mountain spices, and traditional cotton shawls.",
    image: "https://images.unsplash.com/photo-1533900298318-6b8da08a523e?auto=format&fit=crop&w=800&q=80",
    tip: "Best visited on Tuesday and Saturday mornings when trading peaks.",
    altitude: "1,940m",
    timeNeeded: "Half Day Tour"
  },
  {
    title: "Dorze Bamboo Dome Village",
    desc: "Behold the towering 12-meter bamboo structures resembling beehives, crafted by master Dorze weavers who preserve age-old spinning traditions.",
    image: "https://images.unsplash.com/photo-1547989453-11e67ffb3885?auto=format&fit=crop&w=800&q=80",
    tip: "Try the traditional Kocho flatbread prepared from false banana stalks.",
    altitude: "2,400m",
    timeNeeded: "Half Day Tour"
  }
];

interface SightseeingModalProps {
  selectedSightseeing: typeof sightseeingPlaces[0] | null;
  onClose: () => void;
}

export default function SightseeingModal({ selectedSightseeing, onClose }: SightseeingModalProps) {
  if (!selectedSightseeing) return null;

  return (
    <div className="fixed inset-0 bg-black/65 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-200 max-w-lg w-full relative"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-black/60 hover:bg-black/80 text-white p-2 rounded-full cursor-pointer transition-colors"
          title="Close"
        >
          <X className="w-4 h-4" />
        </button>
        <div className="relative h-56 w-full">
          <img
            src={selectedSightseeing.image}
            alt={selectedSightseeing.title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
          <div className="absolute bottom-4 left-6 text-white">
            <span className="text-[10px] font-mono uppercase bg-indigo-600 px-2.5 py-1 rounded-full font-bold shadow">
              {selectedSightseeing.altitude}
            </span>
            <h3 className="text-2xl font-serif font-medium mt-2">{selectedSightseeing.title}</h3>
          </div>
        </div>
        <div className="p-6 font-sans">
          <p className="text-slate-600 text-sm leading-relaxed mb-6">
            {selectedSightseeing.desc}
          </p>
          <div className="bg-amber-50 border border-amber-100 p-4 rounded-xl text-amber-900 text-xs leading-normal mb-6 flex gap-2">
            <span className="text-base">💡</span>
            <div>
              <strong className="font-sans block mb-0.5">Travel tip:</strong>
              <p className="font-mono">{selectedSightseeing.tip}</p>
            </div>
          </div>
          <div className="flex justify-between items-center text-xs font-mono text-slate-500 pt-4 border-t border-slate-100">
            <span>⏱️ Duration: <strong>{selectedSightseeing.timeNeeded}</strong></span>
            <button
              onClick={onClose}
              className="bg-slate-900 hover:bg-slate-800 text-white py-2 px-6 rounded font-bold font-sans cursor-pointer transition-colors"
            >
              Got It
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}