import React from "react";

export default function RoomHeroBanner() {
  const roomHeroImage =
    "https://res.cloudinary.com/cpusqoyy/image/upload/f_auto,q_auto,dpr_auto,w_1920,c_fill,g_auto/v1783760846/0V1A3540_sb5lia.jpg";

  return (
    <div className="w-full relative h-[300px] sm:h-[400px] md:h-[480px] overflow-hidden bg-slate-900">
      {/* Optimized responsive hero image */}
    <img
  src={roomHeroImage}
  srcSet={`
    https://res.cloudinary.com/cpusqoyy/image/upload/f_auto,q_auto,dpr_auto,w_768,c_fill,g_auto/v1783769788/0V1A3497_yx9qw3.jpg 768w,
    https://res.cloudinary.com/cpusqoyy/image/upload/f_auto,q_auto,dpr_auto,w_1200,c_fill,g_auto/v1783769788/0V1A3497_yx9qw3.jpg 1200w,
    https://res.cloudinary.com/cpusqoyy/image/upload/f_auto,q_auto,dpr_auto,w_1920,c_fill,g_auto/v1783769788/0V1A3497_yx9qw3.jpg 1920w
  `}
  sizes="
    (max-width: 640px) 100vw,
    (max-width: 1024px) 100vw,
    1920px
  "
  alt="Relaxing Room Accommodations at Dream Hotel"
  className="
    w-full
    h-full
    object-cover
    object-center
    brightness-90
    contrast-105
  "
  loading="eager"
  fetchPriority="high"
  decoding="async"
  referrerPolicy="no-referrer"
/>

      {/* Soft gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30" />

      {/* Centered Overlay Heading */}
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="text-center bg-black/30 backdrop-blur-sm py-4 px-8 rounded-xl border border-white/15">
          <span className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-indigo-600 bg-white px-3 py-1 rounded-full font-bold">
            Best Rate Guaranteed
          </span>

          <h1 className="text-2xl sm:text-4xl font-serif text-white tracking-tight mt-2.5 font-semibold">
            Rooms &amp; Suites
          </h1>
        </div>
      </div>
    </div>
  );
}