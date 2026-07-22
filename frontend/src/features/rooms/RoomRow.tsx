import React from "react";
import { motion } from "motion/react";

interface RoomRowProps {
  id: string;
  name: string;
  rate: number;
  bedConfig: string;
  description: string;
  imageUrl: string;
  index: number;
  area: string;
  onSelect: (id: string) => void;
}

export default function RoomRow({
  id,
  name,
  rate,
  bedConfig,
  description,
  imageUrl,
  index,
  area,
  onSelect
}: RoomRowProps) {
  const isImageLeft = index % 2 === 0;

  return (
    <div className="w-full bg-white border-b border-slate-100 last:border-0 py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-16 items-center">
        
        {/* Image block (Image Left or Image Right) */}
        <div 
          onClick={() => onSelect(id)}
          className={`lg:col-span-7 w-full h-[250px] sm:h-[350px] md:h-[420px] overflow-hidden shadow-md relative group cursor-pointer ${
            isImageLeft ? "order-1" : "order-1 lg:order-2"
          }`}
        >
          <img
            src={imageUrl}
            alt={name}
            className="w-full h-full object-cover transform group-hover:scale-105 transition-all duration-700"
            referrerPolicy="no-referrer"
          />
          <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-sm text-white px-3 py-1 font-mono text-[10px] tracking-wider uppercase">
            {area}
          </div>
          <div className="absolute bottom-4 right-4 bg-white/95 text-[#222] px-4 py-1.5 font-mono text-xs font-bold shadow-sm">
            From ETB {rate.toLocaleString()} / night
          </div>
        </div>

        {/* Content block */}
        <div 
          className={`lg:col-span-5 flex flex-col justify-center text-center lg:text-left ${
            isImageLeft ? "order-2" : "order-2 lg:order-1"
          }`}
        >
          <h3 className="text-xl sm:text-2xl font-serif tracking-wide text-[#222] font-medium uppercase mb-4 leading-tight">
            {name}
          </h3>
          
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6 font-light">
         The {name} offers {bedConfig.toLowerCase()} and are the perfect choice for a relaxing and comfortable stay. {description}
          </p>

          <div className="flex justify-center lg:justify-start">
            <button
              onClick={() => onSelect(id)}
              className="border border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white font-sans font-medium tracking-widest text-xs py-2.5 px-8 uppercase transition-all duration-300 cursor-pointer active:scale-95"
            >
              Know More
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
