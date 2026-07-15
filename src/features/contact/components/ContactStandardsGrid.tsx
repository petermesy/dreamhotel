import React from "react";
import { Clock, ShieldCheck, Landmark } from "lucide-react";

export default function ContactStandardsGrid() {
  const items = [
    {
      icon: Clock,
      title: "Fast Response Pledge",
      description: "We aim to review and reply to all email contact requests within 4 hours during standard corporate office hours.",
    },
    {
      icon: ShieldCheck,
      title: "Secure Communications",
      description: "Your personal information and contact reasons are handled strictly in compliance with hotel data confidentiality policies.",
    },
    {
      icon: Landmark,
      title: "Traditional Coffee & Check-in",
      description: "Visiting for business discussions? Traditional Gofa highland coffee is freshly brewed and served on-demand.",
    },
  ];

  return (
    <div className="bg-white border-y border-slate-200 py-10 px-4 mb-16" id="contact-operational-standards">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 font-mono text-xs text-slate-600">
        {items.map(({ icon: Icon, title, description }) => (
          <div key={title} className="flex gap-3 items-start">
            <Icon className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />
            <div>
              <strong className="text-slate-900 font-sans text-xs uppercase block tracking-wider">{title}</strong>
              <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">{description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
