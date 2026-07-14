import React from "react";
import { Phone, Check, Calendar, User, FileText, MapPin, Key, AlertCircle, Edit3, X, History, ClipboardList, Briefcase } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import type { UserDashboardProps } from "./types";

export default function GuestDashboard(props: UserDashboardProps) {
  const { roomTypes } = useSelector((state: RootState) => state.core);
  const [activeSubTab, setActiveSubTab] = React.useState<"active" | "history">("active");
  const [editingBookingId, setEditingBookingId] = React.useState<string | null>(null);
  const [savingEdit, setSavingEdit] = React.useState(false);

  const [editForm, setEditForm] = React.useState({
    fullName: "",
    phone: "",
    purpose: "",
    nationalId: "",
    address: "",
    checkIn: "",
    checkOut: "",
    roomTypeId: ""
  });

  const handleStartEdit = (booking: any) => {
    setEditingBookingId(booking.id);
    setEditForm({
      fullName: booking.fullName || "",
      phone: booking.phone || "",
      purpose: booking.purpose || "",
      nationalId: booking.nationalId || "",
      address: booking.address || "",
      checkIn: booking.checkIn ? new Date(booking.checkIn).toISOString().split("T")[0] : "",
      checkOut: booking.checkOut ? new Date(booking.checkOut).toISOString().split("T")[0] : "",
      roomTypeId: booking.roomTypeId || ""
    });
  };

  const handleCancelEdit = () => {
    setEditingBookingId(null);
  };

  const handleSaveEdit = async (bookingId: string) => {
    if (!editForm.fullName.trim()) return alert("Guest Name is required.");
    if (!editForm.phone.trim()) return alert("Phone number is required.");
    if (!editForm.nationalId.trim()) return alert("National ID / Passport is required.");
    if (!editForm.address.trim()) return alert("Home address is required.");
    if (!editForm.purpose.trim()) return alert("Purpose of stay is required.");
    if (!editForm.checkIn || !editForm.checkOut) return alert("Stay dates are required.");

    setSavingEdit(true);
    const success = await props.onUpdateBooking(bookingId, editForm);
    setSavingEdit(false);
    if (success) {
      setEditingBookingId(null);
    }
  };

  // Classify bookings into Active vs Past/Cancelled History
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const isPastStay = (booking: any) => {
    const checkOut = new Date(booking.checkOut);
    checkOut.setHours(0, 0, 0, 0);
    return checkOut < today;
  };

  const activeBookings = props.bookings.filter((b) => {
    if (b.status === "CHECKED_OUT" || b.status === "CANCELLED") return false;
    if (isPastStay(b)) return false;
    return b.status === "BOOKED" || b.status === "CHECKED_IN";
  });

  const historyBookings = props.bookings.filter((b) => {
    return b.status === "CHECKED_OUT" || b.status === "CANCELLED" || isPastStay(b);
  });

  const displayedBookings = activeSubTab === "active" ? activeBookings : historyBookings;

  return (
    <div className="w-full bg-slate-50 min-h-screen animate-fade-in">
      {/* Top Banner Navigation bar */}
      <div className="bg-slate-950 text-white py-4 px-6 md:px-8 border-b border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="font-mono">
            <span className="text-xs text-slate-400 block uppercase font-bold tracking-wider">Dream Hotel Guest Space</span>
            <span className="text-sm font-bold text-slate-100">{props.userName} (Guest Member)</span>
          </div>
        </div>
        <div className="flex flex-wrap gap-2.5">
          <button
            onClick={props.onBookAnotherRoom}
            className="text-xs font-mono font-bold bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg cursor-pointer transition-all shadow-md active:scale-95"
          >
            + Book Another Room
          </button>
          <button
            onClick={props.onBackToHome}
            className="text-xs font-mono font-medium border border-slate-800 hover:border-slate-700 bg-slate-900 text-slate-200 px-4 py-2 rounded-lg cursor-pointer transition-all active:scale-95"
          >
            Back to Home
          </button>
          <button
            onClick={props.onLogout}
            className="text-xs font-mono font-bold bg-rose-600/90 hover:bg-rose-700 text-white px-4 py-2 rounded-lg cursor-pointer transition-all active:scale-95"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-5xl mx-auto px-4 py-12">
        {/* Title and Intro */}
        <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-200 pb-6">
          <div>
            <h2 className="text-3xl font-extrabold text-slate-950 font-sans tracking-tight mb-2">My Bookings & Reservations</h2>
            <p className="text-slate-500 text-xs font-mono leading-relaxed max-w-2xl">
              Manage your guest profiles, verify room bookings via bank transfer receipt texts, and review your historical stays in Dream Hotel.
            </p>
          </div>
          {/* Active / History Segmented Tabs */}
          <div className="flex p-1 bg-slate-200/80 rounded-xl font-mono text-xs font-bold gap-1">
            <button
              onClick={() => { setActiveSubTab("active"); setEditingBookingId(null); }}
              className={`px-4 py-2 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                activeSubTab === "active"
                  ? "bg-white text-slate-950 shadow-sm font-bold"
                  : "text-slate-600 hover:text-slate-950"
              }`}
            >
              <ClipboardList className="w-3.5 h-3.5" />
              Active ({activeBookings.length})
            </button>
            <button
              onClick={() => { setActiveSubTab("history"); setEditingBookingId(null); }}
              className={`px-4 py-2 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                activeSubTab === "history"
                  ? "bg-white text-slate-950 shadow-sm font-bold"
                  : "text-slate-600 hover:text-slate-950"
              }`}
            >
              <History className="w-3.5 h-3.5" />
              History ({historyBookings.length})
            </button>
          </div>
        </div>

        {props.loading ? (
          <div className="text-center py-20 text-slate-500 text-sm font-mono flex flex-col items-center justify-center gap-3">
            <span className="w-6 h-6 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin"></span>
            <span>Retrieving your reservations from live ledger logs...</span>
          </div>
        ) : displayedBookings.length === 0 ? (
          <div className="bg-white p-16 text-center rounded-3xl shadow-sm border border-slate-200 max-w-lg mx-auto">
            <div className="text-4xl mb-4">🏨</div>
            <p className="text-slate-500 text-sm font-mono mb-6">
              {activeSubTab === "active"
                ? "You have no active reservations registered under this account right now."
                : "Your historical reservation stay ledger is currently empty."}
            </p>
            {activeSubTab === "active" && (
              <button
                onClick={props.onBookAnotherRoom}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-sans font-bold px-6 py-3 rounded-xl text-xs cursor-pointer transition-all shadow"
              >
                Book Your First Room Now
              </button>
            )}
          </div>
        ) : (
          <div className="space-y-6">
            {displayedBookings.map((booking) => {
              const isEditingThis = editingBookingId === booking.id;

              return (
                <div
                  key={booking.id}
                  className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200 flex flex-col lg:flex-row justify-between gap-8 transition-all hover:border-slate-300"
                >
                  {/* Left Side: Booking details */}
                  <div className="flex-1 space-y-5">
                    {/* Reference Header Line */}
                    <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-3">
                      <div>
                        <span className="text-[9px] font-bold text-slate-400 font-mono tracking-widest block">BOOKING REFERENCE</span>
                        <span className="text-lg font-extrabold text-indigo-600 tracking-wider font-mono block">{booking.id}</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <span
                          className={`px-3 py-1 rounded-full text-[10px] font-bold font-sans ${
                            booking.status === "BOOKED"
                              ? "bg-indigo-50 text-indigo-700"
                              : booking.status === "CHECKED_IN"
                              ? "bg-emerald-50 text-emerald-700"
                              : booking.status === "CHECKED_OUT"
                              ? "bg-blue-50 text-blue-700"
                              : "bg-rose-50 text-rose-700"
                          }`}
                        >
                          STATUS: {booking.status}
                        </span>
                        <span
                          className={`px-3 py-1 rounded-full text-[10px] font-bold font-sans border ${
                            booking.paymentStatus === "RECEIVED"
                              ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                              : "bg-yellow-50 text-yellow-700 border-yellow-200"
                          }`}
                        >
                          PAYMENT: {booking.paymentStatus}
                        </span>
                      </div>
                    </div>

                    {isEditingThis ? (
                      /* Expanded Inline Form for Editing Booking Details */
                      <div className="space-y-4 bg-slate-50 p-6 rounded-2xl border border-slate-200">
                        <div className="flex items-center justify-between border-b border-slate-200 pb-2 mb-2">
                          <h4 className="font-sans font-bold text-slate-900 text-sm flex items-center gap-1.5">
                            <Edit3 className="w-4 h-4 text-indigo-600" />
                            Edit Booking Parameters
                          </h4>
                          <button
                            onClick={handleCancelEdit}
                            className="text-slate-400 hover:text-slate-600 p-1"
                            title="Cancel Edit"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
                          {/* Full Name */}
                          <div className="flex flex-col gap-1">
                            <label className="text-slate-600 font-bold flex items-center gap-1">
                              <User className="w-3 h-3 text-slate-400" /> Guest Full Name *
                            </label>
                            <input
                              type="text"
                              required
                              value={editForm.fullName}
                              onChange={(e) => setEditForm({ ...editForm, fullName: e.target.value })}
                              className="bg-white border border-slate-200 rounded-lg p-2 outline-none font-mono text-slate-900"
                            />
                          </div>

                          {/* Phone */}
                          <div className="flex flex-col gap-1">
                            <label className="text-slate-600 font-bold flex items-center gap-1">
                              <Phone className="w-3 h-3 text-slate-400" /> Phone Number *
                            </label>
                            <input
                              type="text"
                              required
                              value={editForm.phone}
                              onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                              className="bg-white border border-slate-200 rounded-lg p-2 outline-none font-mono text-slate-900"
                            />
                          </div>

                          {/* National ID */}
                          <div className="flex flex-col gap-1">
                            <label className="text-slate-600 font-bold flex items-center gap-1">
                              <FileText className="w-3 h-3 text-slate-400" /> National ID / Passport *
                            </label>
                            <input
                              type="text"
                              required
                              value={editForm.nationalId}
                              onChange={(e) => setEditForm({ ...editForm, nationalId: e.target.value })}
                              className="bg-white border border-slate-200 rounded-lg p-2 outline-none font-mono text-slate-900"
                            />
                          </div>

                          {/* Address */}
                          <div className="flex flex-col gap-1">
                            <label className="text-slate-600 font-bold flex items-center gap-1">
                              <MapPin className="w-3 h-3 text-slate-400" /> Home Address *
                            </label>
                            <input
                              type="text"
                              required
                              value={editForm.address}
                              onChange={(e) => setEditForm({ ...editForm, address: e.target.value })}
                              className="bg-white border border-slate-200 rounded-lg p-2 outline-none font-mono text-slate-900"
                            />
                          </div>

                          {/* Purpose of Stay */}
                          <div className="flex flex-col gap-1">
                            <label className="text-slate-600 font-bold flex items-center gap-1">
                              <Briefcase className="w-3 h-3 text-slate-400" /> Purpose of Stay *
                            </label>
                            <select
                              value={editForm.purpose}
                              onChange={(e) => setEditForm({ ...editForm, purpose: e.target.value })}
                              className="bg-white border border-slate-200 rounded-lg p-2 outline-none font-mono text-slate-900"
                            >
                              <option value="Leisure">Leisure / Vacation</option>
                              <option value="Business">Business / Conference</option>
                              <option value="NGO / Humanitarian">NGO / Humanitarian Work</option>
                              <option value="Transit">Transit Stay</option>
                              <option value="Other">Other Purpose</option>
                            </select>
                          </div>

                          {/* Room Type Rescheduling */}
                          <div className="flex flex-col gap-1">
                            <label className="text-slate-600 font-bold flex items-center gap-1">
                              <Key className="w-3 h-3 text-slate-400" /> Room Classification *
                            </label>
                            <select
                              value={editForm.roomTypeId}
                              onChange={(e) => setEditForm({ ...editForm, roomTypeId: e.target.value })}
                              className="bg-white border border-slate-200 rounded-lg p-2 outline-none font-mono text-slate-900"
                            >
                              {roomTypes.map((rt) => (
                                <option key={rt.id} value={rt.id}>
                                  {rt.name} (ETB {rt.rate.toLocaleString()} / night)
                                </option>
                              ))}
                            </select>
                          </div>

                          {/* Check-In Date */}
                          <div className="flex flex-col gap-1">
                            <label className="text-slate-600 font-bold flex items-center gap-1">
                              <Calendar className="w-3 h-3 text-slate-400" /> Reschedule Check-In *
                            </label>
                            <input
                              type="date"
                              required
                              value={editForm.checkIn}
                              onChange={(e) => setEditForm({ ...editForm, checkIn: e.target.value })}
                              className="bg-white border border-slate-200 rounded-lg p-2 outline-none font-mono text-slate-900"
                            />
                          </div>

                          {/* Check-Out Date */}
                          <div className="flex flex-col gap-1">
                            <label className="text-slate-600 font-bold flex items-center gap-1">
                              <Calendar className="w-3 h-3 text-slate-400" /> Reschedule Check-Out *
                            </label>
                            <input
                              type="date"
                              required
                              value={editForm.checkOut}
                              onChange={(e) => setEditForm({ ...editForm, checkOut: e.target.value })}
                              className="bg-white border border-slate-200 rounded-lg p-2 outline-none font-mono text-slate-900"
                            />
                          </div>
                        </div>

                        {/* Helper alert warning about rescheduled availability check */}
                        <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-[10px] text-amber-800 leading-relaxed flex gap-2">
                          <AlertCircle className="w-4 h-4 shrink-0 text-amber-600" />
                          <span>
                            Rescheduling dates or changing classifications re-runs real-time calendar availability logic. Your assigned room number may be automatically updated.
                          </span>
                        </div>

                        {/* Save / Cancel buttons */}
                        <div className="flex gap-2.5 pt-2">
                          <button
                            onClick={() => handleSaveEdit(booking.id)}
                            disabled={savingEdit}
                            className="bg-indigo-600 hover:bg-indigo-700 text-white font-sans font-bold px-4 py-2 rounded-lg text-xs transition-all flex items-center gap-1 cursor-pointer"
                          >
                            {savingEdit ? "Updating Stay..." : "Save Stay Updates"}
                          </button>
                          <button
                            onClick={handleCancelEdit}
                            className="border border-slate-300 text-slate-600 hover:bg-slate-100 font-sans font-medium px-4 py-2 rounded-lg text-xs transition-all cursor-pointer"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      /* Display Booking Info Matrix */
                      <div className="grid grid-cols-2 gap-y-4 gap-x-6 text-xs font-mono">
                        <div>
                          <span className="text-slate-400 text-[10px] uppercase font-bold tracking-wider block mb-0.5">Guest Name</span>
                          <span className="font-bold text-slate-800 font-sans text-sm block">{booking.fullName}</span>
                        </div>
                        <div>
                          <span className="text-slate-400 text-[10px] uppercase font-bold tracking-wider block mb-0.5">Room Classification</span>
                          <span className="font-bold text-slate-800 font-sans text-sm block">{booking.roomType?.name}</span>
                        </div>
                        <div>
                          <span className="text-slate-400 text-[10px] uppercase font-bold tracking-wider block mb-0.5">Stay Interval Dates</span>
                          <span className="font-bold text-slate-800 block">
                            {new Date(booking.checkIn).toLocaleDateString()} to {new Date(booking.checkOut).toLocaleDateString()}
                          </span>
                        </div>
                        <div>
                          <span className="text-slate-400 text-[10px] uppercase font-bold tracking-wider block mb-0.5">Assigned Room Unit</span>
                          <span className="font-bold text-slate-800 block">
                            {booking.roomNumber ? `Room ${booking.roomNumber} (Floor ${booking.room?.floor || "1"})` : "Pending Staff Assignment"}
                          </span>
                        </div>
                        <div>
                          <span className="text-slate-400 text-[10px] uppercase font-bold tracking-wider block mb-0.5">National ID / Passport</span>
                          <span className="font-bold text-slate-800 block">{booking.nationalId}</span>
                        </div>
                        <div>
                          <span className="text-slate-400 text-[10px] uppercase font-bold tracking-wider block mb-0.5">Contact Phone</span>
                          <span className="font-bold text-slate-800 block">{booking.phone}</span>
                        </div>
                        <div>
                          <span className="text-slate-400 text-[10px] uppercase font-bold tracking-wider block mb-0.5">Purpose of Visit</span>
                          <span className="font-bold text-slate-800 block">{booking.purpose}</span>
                        </div>
                        <div>
                          <span className="text-slate-400 text-[10px] uppercase font-bold tracking-wider block mb-0.5">Address Registered</span>
                          <span className="font-bold text-slate-800 block">{booking.address}</span>
                        </div>
                      </div>
                    )}

                    {/* Pricing Segment */}
                    <div className="border-t border-slate-100 pt-3.5 flex justify-between items-center text-xs font-mono">
                      <span className="text-slate-500 font-bold">Total Estimated Stay Cost:</span>
                      <strong className="text-lg text-slate-950 font-extrabold font-sans">
                        ETB {booking.totalPrice.toLocaleString()}
                      </strong>
                    </div>

                    {/* Action buttons for Managing stay (if active & not editing) */}
                    {!isEditingThis && booking.status === "BOOKED" && (
                      <div className="flex gap-2 pt-1 border-t border-slate-100">
                        <button
                          onClick={() => handleStartEdit(booking)}
                          className="px-3.5 py-2 rounded-xl border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-indigo-600 hover:text-indigo-700 font-sans font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-sm"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                          Modify stay details / Reschedule Dates
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Right Side: Banking / Receipt Verification column */}
                  <div className="w-full lg:w-80 bg-slate-50 rounded-2xl p-5 border border-slate-200 flex flex-col justify-between text-xs space-y-4">
                    <div>
                      <h4 className="font-sans font-bold text-slate-800 flex items-center gap-1.5 mb-1.5 text-xs">
                        <Phone className="w-3.5 h-3.5 text-indigo-500" /> CBE / TELEBIRR Receipt
                      </h4>
                      <p className="text-[10px] text-slate-400 leading-normal font-mono">
                        Paste the SMS text/receipt of your CBE bank transfer or Telebirr payment below for immediate, effortless front desk confirmation.
                      </p>
                    </div>

                    {booking.paymentStatus === "RECEIVED" ? (
                      <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-3.5 rounded-xl font-bold flex items-center gap-2 text-[11px] font-mono leading-normal">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        Payment Verified & Confirmed! Your room unit is fully secured.
                      </div>
                    ) : booking.paymentMessage ? (
                      <div className="space-y-2.5 font-mono">
                        <span className="text-[9px] text-amber-700 font-bold bg-amber-50 px-2 py-0.5 rounded border border-amber-100 block">
                          ✓ Receipt message on file
                        </span>
                        <div className="bg-white p-3 rounded-lg border border-slate-200 max-h-24 overflow-y-auto text-[10px] whitespace-pre-wrap text-slate-500 leading-normal">
                          {booking.paymentMessage}
                        </div>
                        {booking.status === "BOOKED" && (
                          <button
                            onClick={() => props.onReceiptInputChange(booking.id, booking.paymentMessage || "")}
                            className="text-[10px] text-indigo-600 hover:text-indigo-700 hover:underline font-bold cursor-pointer"
                          >
                            Edit transaction receipt
                          </button>
                        )}
                      </div>
                    ) : booking.status === "BOOKED" ? (
                      <div className="space-y-2.5 font-mono">
                        <textarea
                          placeholder="Paste the bank text receipt here (e.g., Transaction Ref, Amount, Date)..."
                          value={props.receiptInput[booking.id] || ""}
                          onChange={(e) => props.onReceiptInputChange(booking.id, e.target.value)}
                          className="w-full bg-white border border-slate-200 focus:border-indigo-500 rounded-lg p-2.5 outline-none transition-all text-[11px] h-20 resize-none font-mono"
                        />
                        <button
                          onClick={() => props.onSubmitReceipt(booking.id)}
                          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-sans font-bold py-2 rounded-xl text-[10px] cursor-pointer transition-all shadow-sm active:scale-95"
                        >
                          Submit SMS / Text Message
                        </button>
                      </div>
                    ) : (
                      <div className="bg-slate-100 border border-slate-200 text-slate-500 p-3.5 rounded-xl font-medium text-[11px] leading-normal font-mono">
                        This reservation cannot submit payment receipt as it is completed, checked out, or cancelled.
                      </div>
                    )}

                    {booking.status === "BOOKED" && (
                      <button
                        onClick={() => props.onCancelBooking(booking.id)}
                        className="text-[10px] text-rose-500 hover:text-rose-700 hover:underline text-left mt-2 block font-mono font-semibold cursor-pointer"
                      >
                        Cancel Reservation
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
