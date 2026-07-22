export default function BookingHeader() {
  return (
    <div className="text-center max-w-3xl mx-auto mb-10 px-2 sm:px-0">
      <span className="inline-flex rounded-full bg-indigo-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.34em] text-indigo-700">
        Live guest registration
      </span>
      <h2 className="mt-6 text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight mb-4 font-sans">
        Book your next stay in minutes
      </h2>
      <p className="mx-auto max-w-2xl text-sm leading-relaxed text-slate-600">
        Fill out the guest details, select your room class, and upload your payment receipt so we can confirm your reservation quickly.
      </p>
    </div>
  );
}
