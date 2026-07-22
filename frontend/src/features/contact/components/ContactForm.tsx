import React from "react";
import { MessageSquare, Send } from "lucide-react";

interface ContactFormProps {
  formData: {
    name: string;
    email: string;
    subject: string;
    message: string;
  };
  loading: boolean;
  success: boolean;
  onFieldChange: (field: string, value: string) => void;
  onSubmit: (event: React.FormEvent) => void;
}

export default function ContactForm({ formData, loading, success, onFieldChange, onSubmit }: ContactFormProps) {
  return (
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

      <form onSubmit={onSubmit} className="space-y-5 font-sans text-xs">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="contact-name" className="font-bold text-slate-700">Full Name *</label>
            <input
              type="text"
              id="contact-name"
              required
              placeholder="e.g., Almaz Belay"
              value={formData.name}
              onChange={(e) => onFieldChange("name", e.target.value)}
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
              onChange={(e) => onFieldChange("email", e.target.value)}
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
            onChange={(e) => onFieldChange("subject", e.target.value)}
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
            onChange={(e) => onFieldChange("message", e.target.value)}
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
  );
}
