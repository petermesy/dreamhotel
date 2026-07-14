export default function BookingHeader() {
  return (
    <div className="text-center max-w-2xl mx-auto mb-12">
      <span className="text-xs font-mono uppercase tracking-widest text-indigo-600 mb-2 font-bold block">Live Guest Registry</span>
      <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight mb-4 font-sans">Book Your Room</h2>
      <p className="text-slate-600 text-sm font-mono leading-relaxed">
        No account or login is required. Fill out the mandatory guest registration fields below to check availability and confirm your reservation.
      </p>
    </div>
  );
}
