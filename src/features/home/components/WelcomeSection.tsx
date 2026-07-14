import React from "react";

export default function WelcomeSection() {
  const [currentTime, setCurrentTime] = React.useState(new Date());

  React.useEffect(() => {
    const clockInterval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(clockInterval);
  }, []);

  const dayOfWeek = currentTime.toLocaleDateString("en-US", { weekday: "long", timeZone: "Africa/Addis_Ababa" });
  const formattedDate = currentTime.toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Africa/Addis_Ababa"
  });

  return (
    <section className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
        {/* Welcome Date/Time Widget */}
        <div className="lg:col-span-2 relative h-64 md:h-80 w-full rounded-2xl overflow-hidden shadow-lg border border-slate-200 group">
          <img
            src="https://res.cloudinary.com/cpusqoyy/image/upload/f_auto,q_auto,dpr_auto,w_800,c_limit/v1783767610/0V1A3528_lel5sc.jpg"
            alt="Dream Hotel Exterior"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/50 to-indigo-950/30" />
         
          {/* Widget Content */}
          <div className="absolute inset-0 p-8 flex flex-col justify-between text-white z-10">
            <div>
              <span className="text-xs font-accent uppercase tracking-widest text-indigo-300 font-bold">Local Spotlight</span>
              <p className="text-xs text-slate-300 font-mono mt-1">EAT (UTC +3) Standard Time</p>
            </div>
           
            <div>
              <h3 className="text-3xl md:text-4xl font-serif font-medium tracking-tight text-white mb-1">
                {dayOfWeek}
              </h3>
              <p className="text-sm font-mono text-slate-200">
                {formattedDate}
              </p>
              <div className="flex items-center gap-2 mt-3 text-xs font-mono text-indigo-300 bg-black/40 py-1.5 px-3 rounded-lg w-fit border border-white/10">
                <span className="animate-ping w-1.5 h-1.5 rounded-full bg-indigo-400 shrink-0"></span>
                Sawla, Gofa, Ethiopia
              </div>
            </div>
          </div>
        </div>
        {/* Welcome Text Content */}
        <div className="lg:col-span-3 flex flex-col justify-center h-full">
          <h2 className="text-3xl sm:text-4xl font-serif font-medium text-slate-950 tracking-tight mb-6">
            Welcome to Dream Hotel.
          </h2>
          <div className="space-y-4 text-slate-600 text-sm sm:text-base leading-relaxed font-sans">
            <p>
              A striking boutique property with elegant local design and outstanding security features in a prime location. Dream Hotel promises business executives, regional conference delegates, and leisure travelers an unforgettable stay.
            </p>
            <p>
              Be spoilt for choice with comfortably modern guest accommodations, customized configuration setups, and dedicated local catering. Every room is meticulously sanitized and offers dynamic workspace, high-grade personal digital vaults, and persistent high-speed internet.
            </p>
            <p>
              If you are planning an educational workshop, high-level municipal meeting, or family celebration, our dedicated banquet halls and panoramic rooftop recreation decks are equipped with modern audiovisual devices to elevate your gatherings with ultimate elegance.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}