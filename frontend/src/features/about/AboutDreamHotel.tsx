import React from "react";
import { 
  Landmark, 
  ShieldCheck, 
  Facebook, 
  Instagram, 
  Sparkles, 
  Check, 
  Eye, 
  Target, 
  Gem, 
  History, 
  Users, 
  Clock, 
  CheckCircle,
  FileText
} from "lucide-react";
import { motion } from "motion/react";

export default function AboutDreamHotel() {
  // Staggered animation helpers
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <div className="w-full bg-slate-50 min-h-screen animate-fade-in" id="about-us-container">
      
      {/* 1. LUXURY HERO HEADER BANNER */}
      <div className="relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white py-20 px-4 sm:px-6 lg:px-8 border-b border-indigo-500/20" id="about-hero">
        {/* Subtle abstract golden shapes */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-indigo-500 blur-3xl"></div>
          <div className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-indigo-300 blur-3xl"></div>
        </div>

        <div className="max-w-5xl mx-auto text-center relative z-10 flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 rounded-full text-[10px] font-accent uppercase tracking-widest mb-4"
          >
            <Sparkles className="w-3 h-3 text-indigo-400" />
            Boutique Excellence
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-5xl font-serif font-medium text-white tracking-tight mb-4"
          >
            About Dream Hotel
          </motion.h1>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="w-16 h-0.5 bg-indigo-500 my-2"
          ></motion.div>
          
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="text-slate-300 font-serif text-sm sm:text-base max-w-2xl leading-relaxed italic"
          >
            "Where Comfort Meets Distinction — Your Home Away from Home in the Heart of Sawla"
          </motion.p>
        </div>
      </div>

      {/* 2. GENERAL MANAGER'S MESSAGE */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24" id="founder-welcome-section">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Block: Image Representation (Lounge representation & Founder Badge) */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <div className="relative group rounded-3xl overflow-hidden border-2 border-indigo-500/20 bg-white p-2 shadow-md">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden relative">
                <img
                  src="https://res.cloudinary.com/cpusqoyy/image/upload/f_auto,q_auto,dpr_auto,w_1200,c_limit/v1783929471/FB_IMG_1783860781607_uul0e9.jpg"
                  alt="Dream Hotel Lounge Area"
                  className="w-full h-full object-cover transform group-hover:scale-102 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-slate-950/10 group-hover:bg-transparent transition-all duration-300"></div>
                <span className="absolute bottom-4 left-4 bg-slate-950/80 backdrop-blur text-white text-[10px] font-accent uppercase tracking-wider px-2.5 py-1 rounded-md">
                  Boutique Guest Lounge
                </span>
              </div>
            </div>

            {/* Profile Signpost Card */}
            <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-indigo-50 flex items-center justify-center border border-indigo-200 shrink-0">
                <Landmark className="w-6 h-6 text-indigo-600" />
              </div>
              <div className="font-mono">
                <h4 className="text-slate-900 font-sans font-bold text-xs">Ato Nuru</h4>
                <p className="text-[10px] text-slate-400 mt-0.5">Founder & Managing Director</p>
                <p className="text-[9px] text-indigo-500 mt-1 uppercase font-bold tracking-wider">Dream Hotel Sawla</p>
              </div>
            </div>
          </div>

          {/* Right Block: Message details */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <span className="text-xs font-accent uppercase tracking-widest text-indigo-600 mb-2 font-bold">A Message from Our Founder</span>
            <h2 className="text-2xl sm:text-3xl font-serif font-medium text-slate-950 tracking-tight mb-4">
              "Tena Yistilign" — ጤና ይስጥልኝ
            </h2>
            <div className="w-12 h-1 bg-indigo-500/80 rounded-full mb-6"></div>
            
            <div className="space-y-4 text-slate-600 font-sans text-sm sm:text-base leading-relaxed">
              <p>
                Welcome, and thank you for choosing Dream Hotel, your premier boutique sanctuary in Sawla. Our journey began with a simple but powerful vision: to redefine hospitality in the Gofa Zone by establishing a lodging experience where absolute security, pristine sanitation, and modern professional connectivity exist in perfect harmony.
              </p>
              <p>
                As you travel for corporate missions, regional conferences, or scenic expeditions, we recognize that your accommodation must act as both a secure fortress and a peaceful retreat. That is why we intentionally operate a boutique 22-room property. It allows our dedicated team to maintain absolute room-by-room sanitization, deliver bespoke care, and protect your absolute peace of mind.
              </p>
              <p>
                We stand firmly behind our simple rate pledge: completely flat, transparent room rates across all days of the week, with no hidden surcharges. We invite you to experience the warmth of authentic southern Ethiopian hospitality combined with modern corporate comfort.
              </p>
            </div>

            <div className="mt-8 border-t border-slate-200/80 pt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 font-mono">
              <div>
                <p className="text-slate-900 font-sans font-bold text-xs">Ato Nuru</p>
                <p className="text-[10px] text-slate-400">Founder & Managing Director</p>
              </div>
              <div className="text-slate-400 text-[10px] italic">
                Established 2018 EC / 2026 GC &bull; Sawla, Ethiopia
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* 3. KEY HIGHLIGHTS / METRICS BANNER */}
      <div className="bg-white border-y border-slate-200 py-12 px-4" id="about-metrics-bar">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 text-center">
            
            <div className="flex flex-col items-center">
              <div className="text-3xl sm:text-4xl font-serif font-bold text-slate-950 mb-1">
                22
              </div>
              <div className="h-0.5 w-6 bg-indigo-500 mb-2"></div>
              <h4 className="text-xs font-sans font-bold text-slate-800 uppercase tracking-wider">Boutique Rooms</h4>
              <p className="text-[10px] font-mono text-slate-400 mt-1 max-w-[150px]">Orthopedic bedding & in-room vaults</p>
            </div>

            <div className="flex flex-col items-center">
              <div className="text-3xl sm:text-4xl font-serif font-bold text-slate-950 mb-1">
                1
              </div>
              <div className="h-0.5 w-6 bg-indigo-500 mb-2"></div>
              <h4 className="text-xs font-sans font-bold text-slate-800 uppercase tracking-wider">Prime Location</h4>
              <p className="text-[10px] font-mono text-slate-400 mt-1 max-w-[150px]">Centrally located in Gofa Zone, Sawla</p>
            </div>

            <div className="flex flex-col items-center">
              <div className="text-3xl sm:text-4xl font-serif font-bold text-slate-950 mb-1">
                100%
              </div>
              <div className="h-0.5 w-6 bg-indigo-500 mb-2"></div>
              <h4 className="text-xs font-sans font-bold text-slate-800 uppercase tracking-wider">Payment Transparency</h4>
              <p className="text-[10px] font-mono text-slate-400 mt-1 max-w-[150px]">Flat daily rates, no surprise fees</p>
            </div>

            <div className="flex flex-col items-center">
              <div className="text-3xl sm:text-4xl font-serif font-bold text-slate-950 mb-1">
                15+
              </div>
              <div className="h-0.5 w-6 bg-indigo-500 mb-2"></div>
              <h4 className="text-xs font-sans font-bold text-slate-800 uppercase tracking-wider">Hospitality Specialists</h4>
              <p className="text-[10px] font-mono text-slate-400 mt-1 max-w-[150px]">Fully trained staff on duty 24/7</p>
            </div>

          </div>
        </div>
      </div>

      {/* 4. HERITAGE & STORY SECTION */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24" id="heritage-section">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Block: Narrative */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-1.5 text-xs font-accent font-bold text-indigo-600 uppercase tracking-widest">
              <History className="w-4 h-4 text-indigo-500" />
              Our History & Heritage
            </div>
            
            <h3 className="text-2xl sm:text-3xl font-serif font-medium text-slate-950 tracking-tight leading-snug">
              Bridging the Gap for Discerning Professionals in Gofa Zone
            </h3>
            
            <p className="text-slate-600 font-sans text-sm sm:text-base leading-relaxed">
              Nestled in the dramatic elevations of the Gofa highlands, Sawla has quickly grown into an important hub for trade, governance, and regional research. Recognizing a distinct gap in high-end, secure boutique accommodation for incoming developers, delegates, and international specialists, we set out to build a lodging experience that felt personal, elite, and deeply integrated with our community.
            </p>

            <p className="text-slate-600 font-sans text-sm sm:text-base leading-relaxed">
              Instead of high-volume commercial lodging, we intentionally chose a boutique model — limiting our property to 22 meticulously curated rooms. This keeps our environment quiet, highly secure, and exceptionally clean, allowing us to offer dedicated workspaces, outstanding local coffee, and reliable internet for business remote sessions.
            </p>

            <div className="pt-4 grid grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-sm flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />
                <div>
                  <h5 className="font-sans font-bold text-xs text-slate-950">Safety Standards</h5>
                  <p className="text-[10px] font-mono text-slate-400 mt-0.5">CCTV, ID logging, and in-room digital lockers.</p>
                </div>
              </div>
              <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-sm flex items-start gap-3">
                <Clock className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />
                <div>
                  <h5 className="font-sans font-bold text-xs text-slate-950">24/7 Operations</h5>
                  <p className="text-[10px] font-mono text-slate-400 mt-0.5">Late arrivals, checkouts, and room maintenance assistance.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Block: Double Image Lookbook Grid */}
          <div className="grid grid-cols-2 gap-4 relative">
            <div className="absolute inset-0 bg-indigo-500/5 rounded-3xl blur-2xl -z-10 transform rotate-3"></div>
            
            <div className="space-y-4">
              <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm aspect-[3/4] bg-slate-100">
                <img
                  src="https://res.cloudinary.com/cpusqoyy/image/upload/f_auto,q_auto,dpr_auto,w_800,c_fill,g_auto/v1783934744/0V1A3635_rhq6pd.jpg"
                  alt="Deluxe Boutique Room"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
           <div
  className="
    relative
    bg-cover
    bg-center
    bg-no-repeat
    text-white
    p-6
    rounded-2xl
    flex
    flex-col
    justify-between
    aspect-square
    overflow-hidden
    shadow-lg
    border
    border-slate-800
  "
  style={{
    backgroundImage:
      "url('https://res.cloudinary.com/cpusqoyy/image/upload/f_auto,q_auto,dpr_auto,w_800,c_fill,g_auto/v1783940555/2U0B0212_aga12h.jpg')",
  }}
>
  {/* Dark overlay for readability */}
  <div className="absolute inset-0 bg-black/65" />

  {/* Content */}
  <div className="relative z-10 flex flex-col justify-between h-full">
    <span className="text-3xl text-amber-400 drop-shadow-lg">
      🛎️
    </span>

    <div className="mt-auto">
      <h5
        className="
          font-serif
          font-bold
          text-lg
          text-white
          tracking-wide
          drop-shadow-lg
        "
      >
        Boutique Detail
      </h5>

      <p
        className="
          font-sans
          text-xs
          text-slate-100
          mt-2
          leading-relaxed
          drop-shadow-md
        "
      >
        Tailored daily laundry, local dining specialties, and organic tea blends.
      </p>
    </div>
  </div>
</div>
            </div>

            <div className="space-y-4 pt-8">
<div
  className="
    relative
    bg-cover
    bg-center
    bg-no-repeat
    text-white
    p-6
    rounded-2xl
    flex
    flex-col
    justify-between
    aspect-square
    overflow-hidden
    border
    border-slate-800
    shadow-lg
  "
  style={{
    backgroundImage:
      "url('https://res.cloudinary.com/cpusqoyy/image/upload/f_auto,q_auto:eco,dpr_auto,w_600,c_fill,g_auto/v1783954647/2U0B0259_ban4j3.jpg')",
  }}
>
  {/* Strong dark overlay */}
  <div className="absolute inset-0 bg-black/70" />

  {/* Content */}
  <div className="relative z-10 flex flex-col justify-between h-full">
    <span className="text-3xl text-amber-400 drop-shadow-lg">
      ☕
    </span>

    <div className="mt-auto">
      <h5
        className="
          font-serif
          font-bold
          text-lg
          text-white
          tracking-wide
          drop-shadow-lg
        "
      >
        Local Heritage
      </h5>

      <p
        className="
          font-sans
          text-xs
          text-slate-100
          mt-2
          leading-relaxed
          drop-shadow-md
        "
      >
        Freshly roasted Gofa highland coffee served in traditional ceremonies.
      </p>
    </div>
  </div>
</div>
              <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm aspect-[3/4] bg-slate-100">
                <img
                  src="https://res.cloudinary.com/cpusqoyy/image/upload/v1783935030/0V1A3495_em82q0.jpg"
                  alt="Fine Executive Dining Room"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* 5. THE CORE PROMISE: VISION, MISSION & CORE VALUES */}
      <div className="bg-slate-900 text-white py-20 border-y border-indigo-500/10" id="brand-promise-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-accent uppercase tracking-widest text-indigo-400 font-bold">The Dream Promise</span>
            <h3 className="text-3xl font-serif font-medium tracking-tight text-white mt-1">
              Our Vision, Mission & Values
            </h3>
            <p className="text-slate-400 font-mono text-xs mt-2">
              The professional framework that shapes our daily operations in Sawla.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            
            {/* Vision Card */}
            <div className="bg-slate-950/60 border border-slate-800 hover:border-indigo-500/30 p-8 rounded-3xl transition-all flex gap-5 items-start">
              <div className="p-3 bg-indigo-500/10 text-indigo-400 rounded-2xl border border-indigo-500/20 shrink-0">
                <Eye className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-base font-sans font-bold text-white mb-2 uppercase tracking-wide">Our Vision</h4>
                <p className="text-slate-300 font-mono text-xs leading-relaxed">
                  To stand as the undisputed gold standard of boutique hospitality in southern Ethiopia, celebrated by international delegates and regional travelers for exceptional safety, perfect hygiene, and authentic Ethiopian warmth.
                </p>
              </div>
            </div>

            {/* Mission Card */}
            <div className="bg-slate-950/60 border border-slate-800 hover:border-indigo-500/30 p-8 rounded-3xl transition-all flex gap-5 items-start">
              <div className="p-3 bg-indigo-500/10 text-indigo-400 rounded-2xl border border-indigo-500/20 shrink-0">
                <Target className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-base font-sans font-bold text-white mb-2 uppercase tracking-wide">Our Mission</h4>
                <p className="text-slate-300 font-mono text-xs leading-relaxed">
                  To consistently provide a secure, comfortable, and highly productive refuge for guests through rigorous housekeeping standards, strict regulatory alignment, transparent practices, and professional local care.
                </p>
              </div>
            </div>

          </div>

          {/* D.R.E.A.M. Values Section */}
          <div className="bg-slate-950 border border-slate-800 rounded-3xl p-8 md:p-10">
            <h4 className="text-sm font-sans font-bold uppercase tracking-wider text-center text-indigo-400 mb-8 flex items-center justify-center gap-2">
              <Gem className="w-4 h-4" />
              Our Core Pillars (D.R.E.A.M.)
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-6 text-center font-mono">
              
              <div className="bg-slate-900/40 border border-slate-800/80 p-5 rounded-2xl hover:border-indigo-500/20 transition-all flex flex-col items-center">
                <span className="text-3xl font-serif font-bold text-indigo-400 mb-2">D</span>
                <h5 className="font-sans font-bold text-white text-xs uppercase tracking-wide">Distinction</h5>
                <p className="text-[10px] text-slate-400 mt-2 leading-relaxed">
                  Flawless sanitization, orthopedic mattresses, and executive-level comfort.
                </p>
              </div>

              <div className="bg-slate-900/40 border border-slate-800/80 p-5 rounded-2xl hover:border-indigo-500/20 transition-all flex flex-col items-center">
                <span className="text-3xl font-serif font-bold text-indigo-400 mb-2">R</span>
                <h5 className="font-sans font-bold text-white text-xs uppercase tracking-wide">Reliability</h5>
                <p className="text-[10px] text-slate-400 mt-2 leading-relaxed">
                  High-speed fiber Wi-Fi and 24/7 power backup systems.
                </p>
              </div>

              <div className="bg-slate-900/40 border border-slate-800/80 p-5 rounded-2xl hover:border-indigo-500/20 transition-all flex flex-col items-center">
                <span className="text-3xl font-serif font-bold text-indigo-400 mb-2">E</span>
                <h5 className="font-sans font-bold text-white text-xs uppercase tracking-wide">Elite Safety</h5>
                <p className="text-[10px] text-slate-400 mt-2 leading-relaxed">
                  Round-the-clock patrol, in-room digital safes, and guest verification.
                </p>
              </div>

              <div className="bg-slate-900/40 border border-slate-800/80 p-5 rounded-2xl hover:border-indigo-500/20 transition-all flex flex-col items-center">
                <span className="text-3xl font-serif font-bold text-indigo-400 mb-2">A</span>
                <h5 className="font-sans font-bold text-white text-xs uppercase tracking-wide">Absolute Trust</h5>
                <p className="text-[10px] text-slate-400 mt-2 leading-relaxed">
                  Flat day rates, strict local compliance, and no hidden charges.
                </p>
              </div>

              <div className="bg-slate-900/40 border border-slate-800/80 p-5 rounded-2xl hover:border-indigo-500/20 transition-all flex flex-col items-center">
                <span className="text-3xl font-serif font-bold text-indigo-400 mb-2">M</span>
                <h5 className="font-sans font-bold text-white text-xs uppercase tracking-wide">Mutuality</h5>
                <p className="text-[10px] text-slate-400 mt-2 leading-relaxed">
                  Empowering the Sawla community through sustainable practices.
                </p>
              </div>

            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
