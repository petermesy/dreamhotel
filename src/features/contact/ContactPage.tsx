import React from "react";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Sparkles, 
  MessageSquare, 
  Clock, 
  ShieldCheck, 
  Landmark, 
  Send 
} from "lucide-react";
import { motion } from "motion/react";

export default function ContactPage() {
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [success, setSuccess] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API delivery
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setSuccess(false), 6000);
    }, 800);
  };

  return (
    <div className="w-full bg-slate-50 min-h-screen animate-fade-in" id="contact-us-page-container">
      
      {/* 1. LUXURY HERO HEADER BANNER */}
      <div className="relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white py-20 px-4 sm:px-6 lg:px-8 border-b border-indigo-500/20" id="contact-hero">
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
            24/7 Front Desk & Admin
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-5xl font-serif font-medium text-white tracking-tight mb-4"
          >
            Contact Our Desk
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
            "Get immediate assistance from our dedicated hospitality specialists on-site in Sawla"
          </motion.p>
        </div>
      </div>

      {/* 2. THREE CORE CHANNELS */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16" id="contact-channels">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Card 1: Map/Location */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white p-8 rounded-3xl border border-slate-200 flex flex-col items-start gap-5 shadow-sm hover:shadow-md transition-all duration-300 group"
          >
            <div className="p-4 bg-indigo-50 text-indigo-600 rounded-2xl group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-sans font-bold text-slate-900 text-sm tracking-tight">Our Destination</h3>
              <p className="text-xs font-mono text-slate-500 mt-2 leading-relaxed">
                Gofa, Sawla, Ethiopia
              </p>
              <p className="text-[11px] font-mono text-slate-400 mt-1.5 leading-normal">
                Centrally situated inside the premium highland district, minutes away from the key municipal facilities and commercial terminals.
              </p>
            </div>
          </motion.div>

          {/* Card 2: Phone */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white p-8 rounded-3xl border border-slate-200 flex flex-col items-start gap-5 shadow-sm hover:shadow-md transition-all duration-300 group"
          >
            <div className="p-4 bg-indigo-50 text-indigo-600 rounded-2xl group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300">
              <Phone className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-sans font-bold text-slate-900 text-sm tracking-tight">Direct Hotlines</h3>
              <p className="text-xs font-mono text-slate-500 mt-2 leading-relaxed">
                Mobile: <a href="tel:+251985876478" className="text-indigo-600 hover:underline font-bold">+251 985 876 478</a>
              </p>
              <p className="text-[11px] font-mono text-slate-400 mt-1.5 leading-normal">
                Our front-desk receptionists are active 24 hours a day, 7 days a week, supporting midnight check-ins, local transport coordinators, and immediate guest queries.
              </p>
            </div>
          </motion.div>

          {/* Card 3: Email */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white p-8 rounded-3xl border border-slate-200 flex flex-col items-start gap-5 shadow-sm hover:shadow-md transition-all duration-300 group"
          >
            <div className="p-4 bg-indigo-50 text-indigo-600 rounded-2xl group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300">
              <Mail className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-sans font-bold text-slate-900 text-sm tracking-tight">Digital Correspondence</h3>
              <p className="text-xs font-mono text-slate-500 mt-2 leading-relaxed">
                General: <a href="mailto:dreamhotel@gmail.com" className="text-indigo-600 hover:underline font-bold">dreamhotel@gmail.com</a>
              </p>
              <p className="text-[11px] font-mono text-slate-400 mt-1.5 leading-normal">
                Submit corporate lodging requests, conference room bookings, NGO seminar plans, or special group dining menus directly to our billing department.
              </p>
            </div>
          </motion.div>

        </div>
      </div>

      {/* 3. CORE ADVISORY STATS GRID */}
      <div className="bg-white border-y border-slate-200 py-10 px-4 mb-16" id="contact-operational-standards">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 font-mono text-xs text-slate-600">
          <div className="flex gap-3 items-start">
            <Clock className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />
            <div>
              <strong className="text-slate-900 font-sans text-xs uppercase block tracking-wider">Fast Response Pledge</strong>
              <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">We aim to review and reply to all email contact requests within 4 hours during standard corporate office hours.</p>
            </div>
          </div>
          <div className="flex gap-3 items-start">
            <ShieldCheck className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />
            <div>
              <strong className="text-slate-900 font-sans text-xs uppercase block tracking-wider">Secure Communications</strong>
              <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">Your personal information and contact reasons are handled strictly in compliance with hotel data confidentiality policies.</p>
            </div>
          </div>
          <div className="flex gap-3 items-start">
            <Landmark className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />
            <div>
              <strong className="text-slate-900 font-sans text-xs uppercase block tracking-wider">Traditional Coffee & Check-in</strong>
              <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">Visiting for business discussions? Traditional Gofa highland coffee is freshly brewed and served on-demand.</p>
            </div>
          </div>
        </div>
      </div>

      {/* 4. MAP AND MESSAGE FORM DUAL BOX */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24" id="map-form-section">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm">
          
          {/* Message Form */}
          <div className="lg:col-span-7">
            <div className="flex items-center gap-2 mb-2">
              <MessageSquare className="w-5 h-5 text-indigo-600" />
              <h2 className="text-2xl font-serif font-medium text-slate-950 tracking-tight">
                Drop Us a Message
              </h2>
            </div>
            <p className="text-slate-500 text-xs font-sans mb-6">
              Have any general questions or custom service inquiries? Reach out to our management.
            </p>

            <form onSubmit={handleContactSubmit} className="space-y-5 font-sans text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="contact-name" className="font-bold text-slate-700">Full Name *</label>
                  <input
                    type="text"
                    id="contact-name"
                    required
                    placeholder="e.g., Almaz Belay"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 focus:border-indigo-500 rounded-lg p-3 text-slate-950 outline-none transition-all text-xs"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="contact-email" className="font-bold text-slate-700">Email Address *</label>
                  <input
                    type="email"
                    id="contact-email"
                    required
                    placeholder="e.g., almaz@gmail.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 focus:border-indigo-500 rounded-lg p-3 text-slate-950 outline-none transition-all text-xs"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="contact-subject" className="font-bold text-slate-700">Subject *</label>
                <input
                  type="text"
                  id="contact-subject"
                  required
                  placeholder="e.g., Room booking inquiry or corporate rate negotiation"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 focus:border-indigo-500 rounded-lg p-3 text-slate-950 outline-none transition-all text-xs"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="contact-message" className="font-bold text-slate-700">Message Details *</label>
                <textarea
                  id="contact-message"
                  required
                  rows={4}
                  placeholder="Please list all relevant requirements, dates, or specifications..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 focus:border-indigo-500 rounded-lg p-3 text-slate-950 outline-none transition-all text-xs leading-relaxed"
                ></textarea>
              </div>

              {success && (
                <div className="text-[11px] bg-emerald-50 border border-emerald-100 text-emerald-800 p-3.5 rounded-lg font-bold leading-relaxed animate-fade-in">
                  ✓ Your contact message has been sent successfully! Our administrative team will respond to your email as soon as possible.
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white font-bold py-3.5 rounded-xl transition-all cursor-pointer font-sans text-xs flex items-center justify-center gap-2 disabled:opacity-70"
              >
                {loading ? (
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                ) : (
                  <Send className="w-3.5 h-3.5" />
                )}
                {loading ? "Sending Message..." : "Send Message"}
              </button>
            </form>
          </div>

          {/* Map Embed */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-6">
            <div>
              <h4 className="text-xl font-serif font-medium text-slate-950 mb-1">
                Geographic Location
              </h4>
              <p className="text-slate-500 text-xs font-mono leading-relaxed">
                Directly accessible within the commercial hub of Sawla. Easy access route for regional delegation coordinators, NGOs, and tourists.
              </p>
            </div>

            {/* High fidelity Google Map embed iframe */}
            <div className="w-full h-72 bg-slate-100 border border-slate-200 rounded-2xl overflow-hidden relative shadow-inner">
              <iframe
                title="Dream Hotel Location Map"
                src="https://www.google.com/maps?q=6.3028486,36.8882250&z=15&output=embed"
                className="absolute inset-0 w-full h-full border-0"
                allowFullScreen
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
              />
            </div>

            {/* Additional details badge */}
            <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl flex items-center gap-3 font-mono text-[10px] text-slate-500 leading-normal">
              <span className="text-base">📍</span>
              <div>
                <strong>Sawla, Gofa Zone, Ethiopia</strong>
                <p className="mt-0.5">Latitude: 6.3028° N &bull; Longitude: 36.8882° E</p>
              </div>
            </div>

          </div>

        </div>
      </div>

    </div>
  );
}
