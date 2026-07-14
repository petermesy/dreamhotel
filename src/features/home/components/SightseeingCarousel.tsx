import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

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

export default function SightseeingCarousel() {
  const [sightseeingIndex, setSightseeingIndex] = React.useState(0);
  const [selectedSightseeing, setSelectedSightseeing] = React.useState<typeof sightseeingPlaces[0] | null>(null);

  const nextSightseeing = () => {
    setSightseeingIndex((prev) => (prev + 1) % (sightseeingPlaces.length - 2));
  };
  const prevSightseeing = () => {
    setSightseeingIndex((prev) => (prev - 1 + (sightseeingPlaces.length - 2)) % (sightseeingPlaces.length - 2));
  };

  return (
    <section className="py-16 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-serif font-medium text-center text-slate-950 tracking-tight leading-tight mb-2">
          Sightseeing
        </h2>
        <p className="text-slate-500 text-xs font-accent text-center tracking-widest uppercase mb-10">
          Immerse yourself in Gofa's majestic highlands
        </p>
        <div className="relative flex items-center">
          {/* Left navigation arrow */}
          <button
            onClick={prevSightseeing}
            className="absolute left-0 lg:-left-6 z-10 bg-white hover:bg-slate-50 text-slate-700 p-3.5 rounded-full border border-slate-200 shadow-md transition-all cursor-pointer focus:outline-none"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          {/* Slide Container (Display 3 cards dynamically on lg screens, 1 on mobile) */}
          <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 md:px-8 overflow-hidden">
            {sightseeingPlaces.slice(sightseeingIndex, sightseeingIndex + 3).map((place, idx) => (
              <div
                key={place.title + idx}
                className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm flex flex-col h-full hover:shadow-md transition-all duration-300"
              >
                <div className="relative h-48 w-full overflow-hidden">
                  <img
                    src={place.image}
                    alt={place.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 left-3 bg-indigo-600 text-white font-mono text-[10px] px-2.5 py-1 rounded-full font-bold shadow-sm">
                    {place.altitude}
                  </div>
                </div>
               
                <div className="p-6 flex flex-col justify-between flex-1">
                  <div>
                    <h4 className="text-lg font-serif font-medium text-slate-950 mb-2">
                      {place.title}
                    </h4>
                    <p className="text-slate-600 text-xs font-sans leading-relaxed mb-4 line-clamp-3">
                      {place.desc}
                    </p>
                  </div>
                  <div className="border-t border-slate-100 pt-4 flex justify-between items-center">
                    <span className="text-[10px] font-mono text-slate-500 uppercase">
                      🕒 {place.timeNeeded}
                    </span>
                    <button
                      onClick={() => setSelectedSightseeing(place)}
                      className="bg-amber-600/10 hover:bg-amber-600 text-amber-800 hover:text-white px-4 py-1.5 rounded text-xs font-mono transition-all font-semibold"
                    >
                      Read More
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* Right navigation arrow */}
          <button
            onClick={nextSightseeing}
            className="absolute right-0 lg:-right-6 z-10 bg-white hover:bg-slate-50 text-slate-700 p-3.5 rounded-full border border-slate-200 shadow-md transition-all cursor-pointer focus:outline-none"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Sightseeing Modal will be handled in parent or separate, but for now pass state if needed */}
      {/* Note: Modal is separate component, but state is here - we'll adjust in SightseeingModal if shared */}
    </section>
  );
}