import React from "react";
import { Mail, Landmark, Coffee, CheckCircle2, Clock, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function ConferenceVenue() {
  const [formData, setFormData] = React.useState({
    name: "",
    organization: "",
    eventType: "Conference",
    date: "",
    estimatedAttendance: "",
    cateringRequirement: false,
    message: ""
  });

  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  // Conference Carousel State
  const [carouselIndex, setCarouselIndex] = React.useState(0);
 const conferenceImages = [
  "https://res.cloudinary.com/cpusqoyy/image/upload/f_auto,q_auto,dpr_auto,w_1200,c_limit/v1783768436/0V1A3568_cb5a05.jpg",
  "https://res.cloudinary.com/cpusqoyy/image/upload/f_auto,q_auto,dpr_auto,w_1200,c_limit/v1783768391/0V1A3574_khwj2b.jpg",
  "https://res.cloudinary.com/cpusqoyy/image/upload/f_auto,q_auto,dpr_auto,w_1200,c_limit/v1783760802/0V1A3580_lvirqe.jpg",
  "https://res.cloudinary.com/cpusqoyy/image/upload/f_auto,q_auto,dpr_auto,w_1200,c_limit/v1783768677/0V1A3582_jrconh.jpg",
];

  const nextSlide = () => {
    setCarouselIndex((prev) => (prev + 1) % conferenceImages.length);
  };

  const prevSlide = () => {
    setCarouselIndex((prev) => (prev - 1 + conferenceImages.length) % conferenceImages.length);
  };

  // Automatic rotation effect (resets timer on manual slide changes)
  React.useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 4500);
    return () => clearInterval(timer);
  }, [carouselIndex]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch("/api/enquiries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to submit enquiry form");
      }

      setSuccess(true);
      setFormData({
        name: "",
        organization: "",
        eventType: "Conference",
        date: "",
        estimatedAttendance: "",
        cateringRequirement: false,
        message: ""
      });
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full bg-slate-50 py-16 animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-xs font-accent uppercase tracking-widest text-indigo-600 mb-2 font-bold">G+4 Events Level</h2>
          <h3 className="text-3xl sm:text-4xl font-serif font-medium text-slate-950 tracking-tight leading-tight mb-4">Dream Conference & Banquet Hall</h3>
          <p className="text-slate-600 text-sm font-mono leading-relaxed">
            Located exclusively on the Fourth Floor (G+4), our state-of-the-art conference venue offers spacious dimensions and modern AV equipment tailored for key corporate seminars and large-scale celebrations.
          </p>
        </div>

        {/* Conference Hall Visual Showcase Carousel */}
        <div className="w-full h-[400px] sm:h-[500px] md:h-[560px] rounded-3xl overflow-hidden relative shadow-sm mb-12 border border-slate-200 group bg-slate-900">
          <AnimatePresence mode="wait">
            <motion.img 
              key={carouselIndex}
              src={conferenceImages[carouselIndex]} 
              alt={`Dream Conference & Banquet Hall - View ${carouselIndex + 1}`} 
              className="w-full h-full object-cover object-center absolute inset-0"
              initial={{ opacity: 0, scale: 1.01 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              referrerPolicy="no-referrer"
            />
          </AnimatePresence>

          {/* Symmetrical dark vignette overlay to preserve high-contrast text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent pointer-events-none" />

          {/* Interactive slide-switching overlay controls */}
          <div className="absolute inset-0 flex items-center justify-between p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button
              onClick={prevSlide}
              className="p-2.5 rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur-sm transition-all transform hover:scale-105 cursor-pointer"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextSlide}
              className="p-2.5 rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur-sm transition-all transform hover:scale-105 cursor-pointer"
              aria-label="Next slide"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Captivating visual metadata overlay */}
          <div className="absolute bottom-8 left-8 right-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4 pointer-events-none z-10">
            <div>
              <span className="text-[10px] font-accent uppercase text-indigo-400 tracking-widest block mb-1">Fourth Floor Venue</span>
              <h3 className="text-xl sm:text-2xl font-bold text-white font-sans">G+4 Premium Event Space</h3>
              <p className="text-xs sm:text-sm text-slate-300 font-mono mt-1">Accommodating up to 150 seated guests with full lift access, professional PA setups, and custom catering options.</p>
            </div>

            {/* Pagination Indicators / Progress bar dots (with pointer-events-auto so they can be clicked) */}
            <div className="flex items-center gap-1.5 bg-black/30 px-3 py-1.5 rounded-full backdrop-blur-xs pointer-events-auto">
              {conferenceImages.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCarouselIndex(idx)}
                  className={`w-2 h-2 rounded-full transition-all cursor-pointer ${
                    carouselIndex === idx ? "bg-white w-4" : "bg-white/50 hover:bg-white/80"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Info Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* Column 1: Core Specifications */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 flex flex-col justify-between">
            <div>
              <h4 className="text-lg font-bold text-slate-950 mb-4 flex items-center gap-2">
                <Landmark className="w-5 h-5 text-indigo-600" />
                Venue Specifications
              </h4>
              <ul className="space-y-4 text-sm text-slate-600 font-mono">
                <li className="flex justify-between items-center border-b border-slate-100 pb-2">
                  <span>Location:</span>
                  <span className="font-bold text-slate-900">G+4 Fourth Floor</span>
                </li>
                <li className="flex justify-between items-center border-b border-slate-100 pb-2">
                  <span>Capacity:</span>
                  <span className="font-bold text-slate-900">Up to 150 Seated</span>
                </li>
                <li className="flex justify-between items-center border-b border-slate-100 pb-2">
                  <span>Dimensions:</span>
                  <span className="font-bold text-slate-900">300 m² (20m × 15m)</span>
                </li>
                <li className="flex justify-between items-center pb-2">
                  <span>Recreation Area:</span>
                  <span className="font-bold text-slate-900">Adjacent Rooftop Deck</span>
                </li>
              </ul>
            </div>
            <div className="bg-indigo-50 border border-indigo-100 p-4 rounded-xl text-xs text-indigo-900 font-mono mt-6">
              <strong>Please note:</strong> The G+4 events level provides exclusive lift access and adjacent restrooms for premium executive privacy.
            </div>
          </div>

          {/* Column 2: Tariffs & AV Equipment */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 flex flex-col justify-between">
            <div>
              <h4 className="text-lg font-bold text-slate-950 mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-indigo-600" />
                Hire Tariffs & AV
              </h4>
              <div className="space-y-4 font-mono mb-6">
                <div className="bg-slate-50 p-3 rounded-lg flex justify-between items-center border border-slate-100">
                  <div>
                    <span className="text-xs text-slate-500 block">Full-Day Hire</span>
                    <span className="text-sm font-bold text-slate-900">Full Business Day</span>
                  </div>
                  <span className="text-indigo-600 font-bold font-sans">ETB 10,000</span>
                </div>
                <div className="bg-slate-50 p-3 rounded-lg flex justify-between items-center border border-slate-100">
                  <div>
                    <span className="text-xs text-slate-500 block">Half-Day Hire</span>
                    <span className="text-sm font-bold text-slate-900">Up to 4 Hours</span>
                  </div>
                  <span className="text-indigo-600 font-bold font-sans">ETB 5,000</span>
                </div>
                <div className="bg-slate-50 p-3 rounded-lg flex justify-between items-center border border-slate-100">
                  <div>
                    <span className="text-xs text-slate-500 block">Hourly Rate</span>
                    <span className="text-sm font-bold text-slate-900">Per hour charge</span>
                  </div>
                  <span className="text-indigo-600 font-bold font-sans">ETB 1,000</span>
                </div>
              </div>

              <h5 className="text-xs font-accent uppercase tracking-widest text-slate-500 mb-2">Confirmed AV Equipment</h5>
              <div className="flex flex-wrap gap-2 text-xs font-mono text-slate-600">
                <span className="bg-slate-50 px-2 py-1 rounded border border-slate-200">Data Projector</span>
                <span className="bg-slate-50 px-2 py-1 rounded border border-slate-200">Projection Screen</span>
                <span className="bg-slate-50 px-2 py-1 rounded border border-slate-200">Whiteboard</span>
                <span className="bg-slate-50 px-2 py-1 rounded border border-slate-200">PA Audio Setup</span>
              </div>
            </div>
          </div>

          {/* Column 3: Event Facilities & Exclusions */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 flex flex-col justify-between">
            <div>
              <h4 className="text-lg font-bold text-slate-950 mb-4 flex items-center gap-2">
                <Coffee className="w-5 h-5 text-indigo-600" />
                Additional Features
              </h4>
              <div className="space-y-4 text-sm text-slate-600 mb-6">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
                  <p className="font-mono text-xs">
                    <strong className="text-slate-900">On-site Catering:</strong> Delectable local dining or coffee breaks available for separate booking.
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
                  <p className="font-mono text-xs">
                    <strong className="text-slate-900">Rooftop Area:</strong> Beautiful scenic lounge deck directly adjacent to G+4 events floor.
                  </p>
                </div>
              </div>

              <h5 className="text-xs font-accent uppercase tracking-widest text-slate-400 mb-2">NOT Available</h5>
              <div className="space-y-2 text-xs text-slate-400 font-mono">
                <div className="flex items-center gap-1.5">
                  <span className="text-slate-300">✕</span> Breakout / sub-meeting rooms
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Semi-Automated Enquiry Form Row */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-slate-200">
          <div className="lg:col-span-2">
            <span className="text-xs font-accent uppercase tracking-widest text-indigo-600 mb-2 block font-bold">Online Inquiry Flow</span>
            <h4 className="text-3xl font-serif font-medium text-slate-950 tracking-tight leading-tight mb-4">Request Event Booking</h4>
            <p className="text-slate-600 text-sm font-mono leading-relaxed mb-6">
              Conference Hall bookings bypass the standard room calendar. Instead, fill out this inquiry form. Our front-desk team will receive your interest immediately and follow up with you by phone or email to finalize pricing and date block details.
            </p>
            <div className="flex items-center gap-2 text-xs font-mono bg-indigo-50 text-indigo-955 p-4 rounded-xl border border-indigo-100">
              <Mail className="w-5 h-5 text-indigo-600 shrink-0" />
              <span>Forms submit directly to: <strong>dreamhotel@gmail.com</strong></span>
            </div>
          </div>

          <div className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="space-y-6 font-mono text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="name" className="text-xs font-bold text-slate-700">Organizer Full Name *</label>
                  <input
                    type="text"
                    id="name"
                    required
                    placeholder="e.g. Abebe Kebede"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 focus:border-indigo-500 rounded-lg p-3 text-slate-950 outline-none transition-all"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="organization" className="text-xs font-bold text-slate-700">Company / Organization *</label>
                  <input
                    type="text"
                    id="organization"
                    required
                    placeholder="e.g. Sawla Trading"
                    value={formData.organization}
                    onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 focus:border-indigo-500 rounded-lg p-3 text-slate-950 outline-none transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="eventType" className="text-xs font-bold text-slate-700">Event Type *</label>
                  <select
                    id="eventType"
                    required
                    value={formData.eventType}
                    onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 focus:border-indigo-500 rounded-lg p-3 text-slate-950 outline-none transition-all"
                  >
                    <option value="Conference">Conference</option>
                    <option value="Seminar">Corporate Seminar</option>
                    <option value="Banquet">Private Celebration</option>
                    <option value="Workshop">Educational Workshop</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="date" className="text-xs font-bold text-slate-700">Requested Date *</label>
                  <input
                    type="date"
                    id="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 focus:border-indigo-500 rounded-lg p-3 text-slate-950 outline-none transition-all"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="estimatedAttendance" className="text-xs font-bold text-slate-700">Estimated Attendance *</label>
                  <input
                    type="number"
                    id="estimatedAttendance"
                    required
                    min="1"
                    max="150"
                    placeholder="Max 150"
                    value={formData.estimatedAttendance}
                    onChange={(e) => setFormData({ ...formData, estimatedAttendance: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 focus:border-indigo-500 rounded-lg p-3 text-slate-950 outline-none transition-all"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="cateringRequirement"
                  checked={formData.cateringRequirement}
                  onChange={(e) => setFormData({ ...formData, cateringRequirement: e.target.checked })}
                  className="w-4 h-4 text-indigo-600 border-slate-200 rounded focus:ring-indigo-500 cursor-pointer"
                />
                <label htmlFor="cateringRequirement" className="text-xs font-bold text-slate-700 cursor-pointer">
                  Request separate on-site catering / coffee break package options
                </label>
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="message" className="text-xs font-bold text-slate-700">Brief Event Description / Message *</label>
                <textarea
                  id="message"
                  required
                  rows={4}
                  placeholder="Tell us about your event agenda, catering details, or specific hourly requirements..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 focus:border-indigo-500 rounded-lg p-3 text-slate-950 outline-none transition-all"
                ></textarea>
              </div>

              {error && (
                <div className="text-xs bg-rose-50 border border-rose-100 text-rose-700 p-3.5 rounded-lg font-bold">
                  Error submitting form: {error}
                </div>
              )}

              {success && (
                <div className="text-xs bg-emerald-50 border border-emerald-100 text-emerald-800 p-4 rounded-lg font-bold">
                  ✓ Your conference enquiry was submitted successfully! Reception desk will follow up shortly. No instant reservation is generated.
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white font-bold py-3.5 rounded-xl shadow transition-all cursor-pointer disabled:opacity-55 font-sans"
              >
                {loading ? "Submitting Inquiry..." : "Submit Venue Enquiry"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
