import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, selectRoomType, setBookingSuccess, setBookingError } from "../../store";
import { User, MapPin, CheckSquare, Phone, AlertCircle, Sparkles, Check } from "lucide-react";
import { motion } from "motion/react";

export default function GuestRegistrationForm() {
  const dispatch = useDispatch();
  const selectedRoomTypeId = useSelector((state: RootState) => state.core.selectedRoomTypeId);
  const roomTypes = useSelector((state: RootState) => state.core.roomTypes);
  const bookingSuccess = useSelector((state: RootState) => state.core.bookingSuccess);
  const bookingError = useSelector((state: RootState) => state.core.bookingError);

  const { isAuthenticated, user, token } = useSelector((state: RootState) => state.auth);

  const getTodayDateString = () => {
    const d = new Date();
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const getTomorrowDateString = () => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const [formData, setFormData] = React.useState({
    fullName: "",
    purpose: "Leisure / Tourism",
    otherPurpose: "",
    address: "",
    nationalId: "",
    phone: "",
    checkIn: getTodayDateString(),
    checkOut: getTomorrowDateString()
  });

  const [loading, setLoading] = React.useState(false);
  const [checkingAvailability, setCheckingAvailability] = React.useState(false);
  const [availableCount, setAvailableCount] = React.useState<number | null>(null);
  const [availabilityError, setAvailabilityError] = React.useState<string | null>(null);

  // Default room types fallback if not loaded
  const localRoomTypes = roomTypes.length > 0 ? roomTypes : [
    { id: "STANDARD_QUEEN", name: "Standard Queen Room (ETB 2,600)", rate: 2600.0 },
    { id: "SUPERIOR_KING", name: "Superior King Room (ETB 3,000)", rate: 3000.0 },
    { id: "DOUBLE_STANDARD", name: "Double Standard Room (ETB 3,000)", rate: 3000.0 },
    { id: "EXECUTIVE_SUITE", name: "Executive Suite (VIP) (ETB 7,500)", rate: 7500.0 },
  ];

  const currentRoomType = localRoomTypes.find(rt => rt.id === selectedRoomTypeId);

  // Trigger availability checks when dates or room type changes
  React.useEffect(() => {
    if (formData.checkIn && formData.checkOut && selectedRoomTypeId) {
      checkAvailability();
    }
  }, [formData.checkIn, formData.checkOut, selectedRoomTypeId]);

  // Auto-fill authenticated guest name
  React.useEffect(() => {
    if (isAuthenticated && user && !formData.fullName) {
      setFormData(prev => ({ ...prev, fullName: user.name }));
    }
  }, [isAuthenticated, user]);

  const checkAvailability = async () => {
    setCheckingAvailability(true);
    setAvailabilityError(null);
    try {
      const url = `/api/rooms/availability?checkIn=${formData.checkIn}&checkOut=${formData.checkOut}&roomTypeId=${selectedRoomTypeId}`;
      const res = await fetch(url);
      const data = await res.json();
      if (res.ok) {
        setAvailableCount(data.length);
      } else {
        setAvailableCount(null);
        setAvailabilityError(data.error || "Failed to fetch availability status.");
      }
    } catch {
      setAvailableCount(null);
      setAvailabilityError("Unable to query database");
    } finally {
      setCheckingAvailability(false);
    }
  };

  const handleBookSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    dispatch(setBookingError(null));

    const finalPurpose = formData.purpose === "Other" ? formData.otherPurpose || "Other" : formData.purpose;

    const headers: Record<string, string> = {
      "Content-Type": "application/json"
    };
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const bookingPayload: Record<string, any> = {
      fullName: formData.fullName,
      purpose: finalPurpose,
      address: formData.address,
      nationalId: formData.nationalId,
      phone: formData.phone,
      roomTypeId: selectedRoomTypeId,
      checkIn: formData.checkIn,
      checkOut: formData.checkOut
    };

    if (isAuthenticated && user?.id) {
      bookingPayload.userId = user.id;
    }

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers,
        body: JSON.stringify(bookingPayload)
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to submit reservation");
      }

      dispatch(setBookingSuccess(data));
      // Reset form
      setFormData({
        fullName: "",
        purpose: "Leisure / Tourism",
        otherPurpose: "",
        address: "",
        nationalId: "",
        phone: "",
        checkIn: getTodayDateString(),
        checkOut: getTomorrowDateString()
      });
      setAvailableCount(null);
    } catch (err: any) {
      dispatch(setBookingError(err.message));
    } finally {
      setLoading(false);
    }
  };

  const handleNewBooking = () => {
    dispatch(setBookingSuccess(null));
    dispatch(setBookingError(null));
    dispatch(selectRoomType(null));
  };

  // If successfully booked, render the confirmation card screen as required
  if (bookingSuccess) {
    return (
      <div className="w-full bg-slate-50 py-16 flex justify-center items-center px-4 animate-fade-in">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-xl w-full bg-white rounded-3xl p-8 md:p-10 shadow-xl border border-slate-200 flex flex-col gap-6 text-slate-900 text-center font-mono"
        >
          <div className="mx-auto bg-emerald-50 text-emerald-600 p-4 rounded-full w-fit">
            <Check className="w-10 h-10 stroke-[3]" />
          </div>

          <h3 className="text-2xl font-extrabold text-slate-950 font-sans tracking-tight">Reservation Confirmed!</h3>
          <p className="text-xs text-slate-500">
            Your offline guest registration reference has been generated successfully. Please present this reference code upon check-in.
          </p>

          <div className="bg-slate-900 text-white rounded-2xl p-6 my-2 text-left space-y-3">
            <div className="flex justify-between items-center border-b border-slate-800 pb-2.5">
              <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Booking Ref:</span>
              <span className="text-lg font-bold text-indigo-400 font-mono tracking-widest">{bookingSuccess.id}</span>
            </div>
            <div className="space-y-1.5 text-xs text-slate-300">
              <p><strong>Guest Name:</strong> {bookingSuccess.fullName}</p>
              <p><strong>Assigned Room:</strong> Room {bookingSuccess.roomNumber}</p>
              <p><strong>Room Type:</strong> {bookingSuccess.roomType?.name}</p>
              <p><strong>Check-In Date:</strong> {new Date(bookingSuccess.checkIn).toLocaleDateString()}</p>
              <p><strong>Check-Out Date:</strong> {new Date(bookingSuccess.checkOut).toLocaleDateString()}</p>
              <p><strong>Total Price Quote:</strong> ETB {bookingSuccess.totalPrice.toLocaleString()}</p>
            </div>
          </div>

          {/* Non-negotiable cash payment policy notice */}
          <div className="bg-indigo-50 border border-indigo-200/60 text-indigo-955 p-4 rounded-xl text-left text-xs flex gap-3 shadow-inner">
            <AlertCircle className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
            <div>
              <strong className="block text-indigo-900 mb-0.5">Strict Cash-Only Payment Notice</strong>
              No digital payment portals are available on-site or online. Guests must pay the flat rate of <strong>ETB {bookingSuccess.totalPrice.toLocaleString()}</strong> in physical cash upon checking in at the front desk.
            </div>
          </div>

          <div className="flex flex-col gap-2.5 mt-2">
            <button
              onClick={handleNewBooking}
              className="w-full bg-slate-950 hover:bg-slate-900 text-white font-bold py-3.5 rounded-xl text-sm transition-all shadow-sm cursor-pointer font-sans"
            >
              Book Another Room
            </button>
            <p className="text-[10px] text-slate-400">
              Need assistance? Contact our front-desk immediately at +251 985 876 478
            </p>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="w-full bg-slate-50 py-16 animate-fade-in">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-mono uppercase tracking-widest text-indigo-600 mb-2 font-bold block">Live Guest Registry</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight mb-4 font-sans">Book Your Room</h2>
          <p className="text-slate-600 text-sm font-mono leading-relaxed">
            No account or login is required. Fill out the mandatory guest registration fields below to check availability and confirm your reservation.
          </p>
        </div>

        {/* Outer Grid layout */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
          {/* Cash policy header */}
          <div className="bg-slate-950 text-slate-100 p-6 md:p-8 border-b border-slate-800 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h4 className="text-lg font-bold font-sans tracking-tight mb-1 text-white">Guest Registration Guidelines</h4>
              <p className="text-xs text-slate-400 font-mono">Guaranteed secure booking and flat-rate pricing</p>
            </div>
            <div className="inline-flex items-center gap-2 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-3.5 py-1.5 rounded-lg text-xs font-mono">
              <Sparkles className="w-4 h-4 text-indigo-400 shrink-0" />
              <span>Cash-Only Payment upon Check-in</span>
            </div>
          </div>

          <form onSubmit={handleBookSubmit} className="p-8 md:p-10 space-y-8 font-mono text-sm">
            {/* 1. Step 1: Select Room Type & Dates */}
            <div>
              <h4 className="text-xs uppercase tracking-widest text-indigo-600 font-bold mb-4 flex items-center gap-2">
                <span className="w-5 h-5 bg-indigo-100 text-indigo-800 rounded-full flex items-center justify-center text-[10px] font-bold">1</span>
                Room & Stay Duration
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="roomType" className="text-xs font-bold text-slate-700">Select Room Classification *</label>
                  <select
                    id="roomType"
                    required
                    value={selectedRoomTypeId || ""}
                    onChange={(e) => dispatch(selectRoomType(e.target.value || null))}
                    className="w-full bg-slate-50 border border-slate-200 focus:border-indigo-500 rounded-lg p-3 text-slate-950 outline-none transition-all"
                  >
                    <option value="">-- Choose Classification --</option>
                    {localRoomTypes.map((rt) => (
                      <option key={rt.id} value={rt.id}>
                        {rt.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="checkIn" className="text-xs font-bold text-slate-700">Check-In Date *</label>
                  <input
                    type="date"
                    id="checkIn"
                    required
                    value={formData.checkIn}
                    onChange={(e) => {
                      const val = e.target.value;
                      setFormData(prev => {
                        const nextData = { ...prev, checkIn: val };
                        if (val && !prev.checkOut) {
                          const checkInDate = new Date(val);
                          checkInDate.setDate(checkInDate.getDate() + 1);
                          const yyyy = checkInDate.getFullYear();
                          const mm = String(checkInDate.getMonth() + 1).padStart(2, "0");
                          const dd = String(checkInDate.getDate()).padStart(2, "0");
                          nextData.checkOut = `${yyyy}-${mm}-${dd}`;
                        }
                        return nextData;
                      });
                    }}
                    className="w-full bg-slate-50 border border-slate-200 focus:border-indigo-500 rounded-lg p-3 text-slate-950 outline-none transition-all"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="checkOut" className="text-xs font-bold text-slate-700">Check-Out Date *</label>
                  <input
                    type="date"
                    id="checkOut"
                    required
                    value={formData.checkOut}
                    onChange={(e) => setFormData({ ...formData, checkOut: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 focus:border-indigo-500 rounded-lg p-3 text-slate-950 outline-none transition-all"
                  />
                </div>
              </div>

               {/* Real-time availability indicator badge */}
              {selectedRoomTypeId && formData.checkIn && formData.checkOut && (
                <div className="mt-4 bg-slate-50 border border-slate-200 p-3.5 rounded-xl flex justify-between items-center text-xs shadow-inner">
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    <span>Checking live availability status:</span>
                  </div>
                  {checkingAvailability ? (
                    <span className="text-slate-400">Verifying live calendar logs...</span>
                  ) : availableCount !== null ? (
                    availableCount > 0 ? (
                      <span className="text-emerald-600 font-bold">✓ {availableCount} Room(s) available for immediate auto-assignment!</span>
                    ) : (
                      <span className="text-rose-600 font-bold">✕ Sold Out: No rooms available of this type. Please choose another date or room type.</span>
                    )
                  ) : (
                    <span className="text-rose-600 font-bold">✕ Error: {availabilityError || "Unable to query database"}</span>
                  )}
                </div>
              )}
            </div>

            <div className="h-px bg-slate-200"></div>

            {/* 2. Step 2: Mandatory Guest Info */}
            <div>
              <h4 className="text-xs uppercase tracking-widest text-indigo-600 font-bold mb-4 flex items-center gap-2">
                <span className="w-5 h-5 bg-indigo-100 text-indigo-800 rounded-full flex items-center justify-center text-[10px] font-bold">2</span>
                Mandatory Guest Registration (7 Fields)
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-1.5 col-span-1 md:col-span-2">
                  <label htmlFor="fullName" className="text-xs font-bold text-slate-700 flex items-center gap-1">
                    <User className="w-3.5 h-3.5 text-slate-400" />
                    Guest Full Name * (Field 1)
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    required
                    placeholder="e.g. Abebe Kebede"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 focus:border-indigo-500 rounded-lg p-3 text-slate-950 outline-none transition-all"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="purpose" className="text-xs font-bold text-slate-700">Purpose of Stay * (Field 2)</label>
                  <select
                    id="purpose"
                    required
                    value={formData.purpose}
                    onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 focus:border-indigo-500 rounded-lg p-3 text-slate-950 outline-none transition-all"
                  >
                    <option value="Leisure / Tourism">Leisure / Tourism</option>
                    <option value="Business Travel">Business Travel</option>
                    <option value="Conference / Seminar Attendance">Conference / Seminar Attendance</option>
                    <option value="Family Visit">Family Visit</option>
                    <option value="Medical / Health">Medical / Health</option>
                    <option value="Government / Official">Government / Official</option>
                    <option value="Other">Other (Free text)</option>
                  </select>
                </div>

                {formData.purpose === "Other" && (
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="otherPurpose" className="text-xs font-bold text-slate-700">Specify Purpose of Stay *</label>
                    <input
                      type="text"
                      id="otherPurpose"
                      required
                      placeholder="Write your purpose of stay"
                      value={formData.otherPurpose}
                      onChange={(e) => setFormData({ ...formData, otherPurpose: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 focus:border-indigo-500 rounded-lg p-3 text-slate-950 outline-none transition-all"
                    />
                  </div>
                )}

                <div className="flex flex-col gap-1.5 col-span-1 md:col-span-2">
                  <label htmlFor="address" className="text-xs font-bold text-slate-700 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    Home / Permanent Address * (Field 3 - City, Region, Country)
                  </label>
                  <input
                    type="text"
                    id="address"
                    required
                    placeholder="e.g. Addis Ababa, Bole, Ethiopia"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 focus:border-indigo-500 rounded-lg p-3 text-slate-950 outline-none transition-all"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="nationalId" className="text-xs font-bold text-slate-700 flex items-center gap-1">
                    <CheckSquare className="w-3.5 h-3.5 text-slate-400" />
                    National ID / Passport Number * (Field 4)
                  </label>
                  <input
                    type="text"
                    id="nationalId"
                    required
                    placeholder="Alphanumeric, e.g. NID982041"
                    value={formData.nationalId}
                    onChange={(e) => setFormData({ ...formData, nationalId: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 focus:border-indigo-500 rounded-lg p-3 text-slate-950 outline-none transition-all"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="phone" className="text-xs font-bold text-slate-700 flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5 text-slate-400" />
                    Telephone Number * (Field 7)
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    required
                    placeholder="e.g. +251 911 223 344"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 focus:border-indigo-500 rounded-lg p-3 text-slate-950 outline-none transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Flat Price estimate warning */}
            {selectedRoomTypeId && formData.checkIn && formData.checkOut && currentRoomType && (
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 shadow-inner">
                <div className="flex justify-between items-center text-xs font-bold text-slate-900 border-b border-slate-200 pb-3 mb-3">
                  <span>Price Quote Calculation</span>
                  <span className="bg-indigo-500/10 text-indigo-850 px-2.5 py-0.5 rounded uppercase tracking-wider text-[9px]">Flat Rate Policy</span>
                </div>
                <div className="flex justify-between text-xs text-slate-600 mb-1">
                  <span>Room Classification Rate:</span>
                  <span>ETB {currentRoomType.rate.toLocaleString()} / night</span>
                </div>
                <div className="flex justify-between text-xs text-slate-600 mb-2">
                  <span>Stay Nights:</span>
                  <span>
                    {Math.ceil(
                      (new Date(formData.checkOut).getTime() - new Date(formData.checkIn).getTime()) /
                        (1000 * 60 * 60 * 24)
                    ) || 0}{" "}
                    Nights
                  </span>
                </div>
                <div className="h-px bg-slate-200 my-2"></div>
                <div className="flex justify-between text-sm font-extrabold text-slate-950">
                  <span>Estimated Total Quote:</span>
                  <span className="text-indigo-600">
                    ETB{" "}
                    {(
                      (Math.ceil(
                        (new Date(formData.checkOut).getTime() - new Date(formData.checkIn).getTime()) /
                          (1000 * 60 * 60 * 24)
                      ) || 0) * currentRoomType.rate
                    ).toLocaleString()}
                  </span>
                </div>
              </div>
            )}

            {/* Non-negotiable cash payment policy notice */}
            <div className="bg-indigo-50 border border-indigo-200/60 text-indigo-955 p-4 rounded-xl text-left text-xs flex gap-3 shadow-inner">
              <AlertCircle className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-indigo-900 mb-0.5">Strict Cash-Only Notice</strong>
                Booking confirmations instruct guests that payment is strictly collected in physical cash upon check-in at the property. No cards or mobile money transfers are integrated or allowed on-site.
              </div>
            </div>

            {bookingError && (
              <div className="text-xs bg-rose-50 border border-rose-100 text-rose-700 p-4 rounded-xl font-bold flex items-center gap-2">
                <AlertCircle className="w-5 h-5 shrink-0" />
                <span>Error: {bookingError}</span>
              </div>
            )}

            {/* Action Buttons */}
            <button
              type="submit"
              disabled={loading || (availableCount !== null && availableCount === 0)}
              className="w-full bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white font-bold py-4 rounded-xl text-sm transition-all shadow-md cursor-pointer disabled:opacity-55 font-sans"
            >
              {loading ? "Processing Guest Registration..." : "Lock Room & Confirm Reservation"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
