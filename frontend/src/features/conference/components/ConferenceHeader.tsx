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
    <div className="mx-auto mb-8 max-w-3xl px-2 text-center sm:mb-12">
      <h2 className="mb-3 text-[11px] font-sans font-semibold uppercase tracking-[0.32em] text-indigo-600 sm:text-xs">
        {eyebrow}
      </h2>
      <h3 className="mb-4 text-2xl font-serif font-semibold leading-tight tracking-tight text-slate-950 sm:text-3xl md:text-4xl">
        {title}
      </h3>
      <p className="mx-auto max-w-2xl text-sm leading-7 text-slate-600 sm:text-[15px] font-sans">
        {description}
      </p>
    </div>
  );
}
