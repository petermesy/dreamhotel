import React from "react";

interface ConferenceHeaderProps {
  eyebrow?: string;
  title?: string;
  description?: string;
}

export default function ConferenceHeader({
  eyebrow = "G+4 Events Level",
  title = "Dream Conference & Banquet Hall",
  description = "Located exclusively on the Fourth Floor (G+4), our state-of-the-art conference venue offers spacious dimensions and modern AV equipment tailored for key corporate seminars and large-scale celebrations.",
}: ConferenceHeaderProps) {
  return (
    <div className="text-center max-w-3xl mx-auto mb-12">
      <h2 className="text-xs font-accent uppercase tracking-widest text-indigo-600 mb-2 font-bold">{eyebrow}</h2>
      <h3 className="text-3xl sm:text-4xl font-serif font-medium text-slate-950 tracking-tight leading-tight mb-4">{title}</h3>
      <p className="text-slate-600 text-sm font-mono leading-relaxed">{description}</p>
    </div>
  );
}
