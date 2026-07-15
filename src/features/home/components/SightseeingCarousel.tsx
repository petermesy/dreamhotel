import React from "react";
import { ChevronLeft, ChevronRight, Coffee, View } from "lucide-react";
import { Trees, } from 'lucide-react';

const sightseeingPlaces = [
  {
    title: "Scenic Gofa Waterfall",
    desc: "Experience the beauty of Gofa Zone's stunning waterfall, where flowing waters, lush greenery, and peaceful surroundings create an unforgettable destination for relaxation, photography, and nature exploration.",
    image: "https://res.cloudinary.com/cpusqoyy/image/upload/f_auto,q_auto,dpr_auto,w_800,c_fill,g_auto/v1784137269/493893983_997121199286959_4080970400243918286_n_y1a3ka.jpg",
    tip: "Bring a light fleece as temperatures drop rapidly above 2,000m.",
    altitude:  <Trees className="w-3.5 h-3.5" />,
  },
  {
    title: "Cultural Coffee Ceremony",
    desc: "Experience the deep aroma of slow-roasted Gofa Arabica beans, hand-poured in custom clay pots accompanied by freshly popped popcorn and local sweet-herbs.",
    image: "https://res.cloudinary.com/cpusqoyy/image/upload/f_auto,q_auto,w_1200,c_limit/v1783954647/2U0B0259_ban4j3.jpg",
    tip: "Accept at least three cups (Abol, Tona, Baraka) as custom dictates.",
    altitude: <Coffee className="w-3.5 h-3.5" />,
  },
  {
    title: "Panoramic Rooftop Terrace",
    desc: "An energetic open-air trading post where Gofa communities exchange handmade bamboo basketry, organic mountain spices, and traditional cotton shawls.",
    image:"https://res.cloudinary.com/cpusqoyy/image/upload/f_auto,q_auto:eco,dpr_auto,w_600,c_fill,g_auto/v1783940395/2U0B0277_wxdl6e.jpg",
    tip: "Take in spectacular panoramic views of Sawla and the surrounding Gofa highlands from our elegant rooftop terrace—an ideal setting for morning coffee, evening relaxation, and unforgettable sunsets.",
    altitude: <View className="w-3.5 h-3.5" />,
  },

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
                      src={`${place.image.replace("/upload/", "/upload/w_800/")}`}
                      srcSet={`
                        ${place.image.replace("/upload/", "/upload/w_400/")} 400w,
                        ${place.image.replace("/upload/", "/upload/w_768/")} 768w,
                        ${place.image.replace("/upload/", "/upload/w_1200/")} 1200w
                      `}
                      sizes="
                        (max-width: 640px) 100vw,
                        (max-width: 1024px) 50vw,
                        33vw
                      "
                      alt={place.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                      decoding="async"
                      fetchPriority="low"
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