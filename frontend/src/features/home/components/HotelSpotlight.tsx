import React from "react";

interface HotelSpotlightProps {
  handleNavigate: (tab: "HOME" | "ROOMS" | "CONFERENCE" | "LOOKUP" | "ABOUT" | "BOOK_NOW", path: string) => void;
}

export default function HotelSpotlight({ handleNavigate }: HotelSpotlightProps) {
  return (
    <section className="py-16 space-y-24 bg-slate-100/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
       
        {/* Spotlight 1: Rooms & Suites */}
        <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Overlay Text Card */}
          <div className="lg:col-span-5 bg-white p-8 md:p-10 rounded-2xl shadow-md border border-slate-200/80 z-10 lg:translate-x-6 relative order-2 lg:order-1">
            <h3 className="text-2xl md:text-3xl font-serif font-medium text-slate-900 mb-4">
              Superior Twin Rooms
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed mb-6 font-sans">
The Superior Twin Room features two comfortable single beds, making it an ideal choice for both business and leisure travelers. Thoughtfully designed with modern furnishings and a range of complimentary amenities, it offers a relaxing and comfortable atmosphere to ensure a pleasant and memorable stay.            </p>
            <button
              onClick={() => handleNavigate("ROOMS", "/rooms")}
              className="inline-block border border-amber-600 text-amber-700 hover:bg-amber-600 hover:text-white transition-all py-2.5 px-6 font-accent text-xs tracking-widest font-semibold uppercase rounded cursor-pointer"
            >
              VIEW DETAIL
            </button>
          </div>
          {/* Large Image Block */}
           <div className="lg:col-span-7 h-80 sm:h-96 md:h-[450px] rounded-3xl overflow-hidden shadow-lg border border-slate-200 relative order-1 lg:order-2">
              <img
                src="https://res.cloudinary.com/cpusqoyy/image/upload/f_auto,q_auto,dpr_auto,w_1200,c_limit/v1783768011/0V1A3512_vsen2s.jpg"
                srcSet={`
                  https://res.cloudinary.com/cpusqoyy/image/upload/f_auto,q_auto,dpr_auto,w_768,c_limit/v1783768011/0V1A3512_vsen2s.jpg 768w,
                  https://res.cloudinary.com/cpusqoyy/image/upload/f_auto,q_auto,dpr_auto,w_1200,c_limit/v1783768011/0V1A3512_vsen2s.jpg 1200w,
                  https://res.cloudinary.com/cpusqoyy/image/upload/f_auto,q_auto,dpr_auto,w_1600,c_limit/v1783768011/0V1A3512_vsen2s.jpg 1600w
                `}
                sizes="(max-width: 768px) 100vw,
                      (max-width: 1024px) 90vw,
                      58vw"
                alt="Superior Twin Rooms"
                className="w-full h-full object-cover"
                loading="lazy"
                decoding="async"
                fetchPriority="low"
                referrerPolicy="no-referrer"
              />
          </div>
        </div>

        {/* Spotlight 2: Dining */}
        <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Large Image Block */}
          <div className="lg:col-span-7 h-80 sm:h-96 md:h-[450px] rounded-3xl overflow-hidden shadow-lg border border-slate-200 relative order-1">
            <img
            src="https://res.cloudinary.com/cpusqoyy/image/upload/f_auto,q_auto,dpr_auto,w_1200,c_limit/v1783951364/2U0B0210_vj9jmx.jpg"
                srcSet={`
                  https://res.cloudinary.com/cpusqoyy/image/upload/f_auto,q_auto,dpr_auto,w_768,c_limit/v1783951364/2U0B0210_vj9jmx.jpg 768w,
                  https://res.cloudinary.com/cpusqoyy/image/upload/f_auto,q_auto,dpr_auto,w_1200,c_limit/v1783951364/2U0B0210_vj9jmx.jpg 1200w,
                  https://res.cloudinary.com/cpusqoyy/image/upload/f_auto,q_auto,dpr_auto,w_1600,c_limit/v1783951364/2U0B0210_vj9jmx.jpg 1600w
                `}
                sizes="(max-width: 768px) 100vw,
                      (max-width: 1024px) 90vw,
                      58vw"
              alt="Dining"
              className="w-full h-full object-cover"
               loading="lazy"
                decoding="async"
                fetchPriority="low"
              referrerPolicy="no-referrer"
            />
          </div>
          {/* Overlay Text Card */}
          <div className="lg:col-span-5 bg-white p-8 md:p-10 rounded-2xl shadow-md border border-slate-200/80 z-10 lg:-translate-x-6 relative order-2">
            <h3 className="text-2xl md:text-3xl font-serif font-medium text-slate-900 mb-4">
              Dining & Gathering
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed mb-6 font-sans">
              Experience authentic local dining and traditional coffee gatherings right inside Gofa Zone. From freshly roasted organic coffee beans served with mountain herbs to delightful Ethiopian and continental plates prepared by skilled culinary experts, we provide excellent catering for conferences and private guests.
            </p>
            <button
              onClick={() => handleNavigate("ABOUT", "/about")}
              className="inline-block border border-amber-600 text-amber-700 hover:bg-amber-600 hover:text-white transition-all py-2.5 px-6 font-accent text-xs tracking-widest font-semibold uppercase rounded cursor-pointer"
            >
              VIEW DETAIL
            </button>
          </div>
        </div>

        {/* Spotlight 3: Events */}
        <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Overlay Text Card */}
          <div className="lg:col-span-5 bg-white p-8 md:p-10 rounded-2xl shadow-md border border-slate-200/80 z-10 lg:translate-x-6 relative order-2 lg:order-1">
            <h3 className="text-2xl md:text-3xl font-serif font-medium text-slate-900 mb-4">
              Events & Conferences
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed mb-6 font-sans">
              If you are looking for a state-of-the-art venue to conduct regional training workshops, corporate summits, or local weddings, our G+4 banquet and meeting facility offers hosting for up to 150 delegates. Configured with high-fidelity microphones, visual projection screens, and robust seating layouts.
            </p>
            <button
              onClick={() => handleNavigate("CONFERENCE", "/conference")}
              className="inline-block border border-amber-600 text-amber-700 hover:bg-amber-600 hover:text-white transition-all py-2.5 px-6 font-accent text-xs tracking-widest font-semibold uppercase rounded cursor-pointer"
            >
              VIEW DETAIL
            </button>
          </div>
          {/* Large Image Block */}
          <div className="lg:col-span-7 h-80 sm:h-96 md:h-[450px] rounded-3xl overflow-hidden shadow-lg border border-slate-200 relative order-1 lg:order-2">
            <img
            src="https://res.cloudinary.com/cpusqoyy/image/upload/f_auto,q_auto,dpr_auto,w_1200,c_limit/v1783760802/0V1A3580_lvirqe.jpg"
                srcSet={`
                  https://res.cloudinary.com/cpusqoyy/image/upload/f_auto,q_auto,dpr_auto,w_768,c_limit/v1783760802/0V1A3580_lvirqe.jpg 768w,
                  https://res.cloudinary.com/cpusqoyy/image/upload/f_auto,q_auto,dpr_auto,w_1200,c_limit/v1783760802/0V1A3580_lvirqe.jpg 1200w,
                  https://res.cloudinary.com/cpusqoyy/image/upload/f_auto,q_auto,dpr_auto,w_1600,c_limit/v1783760802/0V1A3580_lvirqe.jpg 1600w
                `}
                sizes="(max-width: 768px) 100vw,
                      (max-width: 1024px) 90vw,
                      58vw"
             alt="Conference Hall"
              className="w-full h-full object-cover"
               loading="lazy"
                decoding="async"
                fetchPriority="low"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>

        {/* Spotlight 4: Recreations */}
        <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Large Image Block */}
          <div className="lg:col-span-7 h-80 sm:h-96 md:h-[450px] rounded-3xl overflow-hidden shadow-lg border border-slate-200 relative order-1">
            <img
              src="https://res.cloudinary.com/cpusqoyy/image/upload/v1783769325/0V1A3589_jfn9wg.jpg"
              alt="Recreations & Rooftop"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          {/* Overlay Text Card */}
          <div className="lg:col-span-5 bg-white p-8 md:p-10 rounded-2xl shadow-md border border-slate-200/80 z-10 lg:-translate-x-6 relative order-2">
            <h3 className="text-2xl md:text-3xl font-serif font-medium text-slate-900 mb-4">
              Recreations & Rooftop
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed mb-6 font-sans">
              Our active rooftop sunset lounge offers a panoramic visual sanctuary. Indulge in warm herbal teas, relax with traditional ambient Gofa hospitality, and capture perfect snapshots of Sawla’s natural highland valleys and pristine mountain horizons.
            </p>
            <button
              onClick={() => handleNavigate("ABOUT", "/about")}
              className="inline-block border border-amber-600 text-amber-700 hover:bg-amber-600 hover:text-white transition-all py-2.5 px-6 font-mono text-xs tracking-wider font-semibold uppercase rounded"
            >
              VIEW DETAIL
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}