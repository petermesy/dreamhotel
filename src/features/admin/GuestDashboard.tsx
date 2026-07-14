import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import type { UserDashboardProps } from "./types";
import GuestDashboardHeader from "./components/GuestDashboardHeader";
import BookingSubTabs from "./components/BookingSubTabs";
import BookingEmptyState from "./components/BookingEmptyState";
import BookingEditForm from "./components/BookingEditForm";
import BookingDetailsSummary from "./components/BookingDetailsSummary";
import ReceiptPanel from "./components/ReceiptPanel";

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
      <GuestDashboardHeader
        userName={props.userName}
        onBookAnotherRoom={props.onBookAnotherRoom}
        onBackToHome={props.onBackToHome}
        onLogout={props.onLogout}
      />

      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-200 pb-6">
          <div>
            <h2 className="text-3xl font-extrabold text-slate-950 font-sans tracking-tight mb-2">My Bookings & Reservations</h2>
            <p className="text-slate-500 text-xs font-mono leading-relaxed max-w-2xl">
              Manage your guest profiles, verify room bookings via bank transfer receipt texts, and review your historical stays in Dream Hotel.
            </p>
          </div>
          <BookingSubTabs
            activeSubTab={activeSubTab}
            activeCount={activeBookings.length}
            historyCount={historyBookings.length}
            onTabChange={(tab) => {
              setActiveSubTab(tab);
              setEditingBookingId(null);
            }}
          />
        </div>

        {props.loading ? (
          <div className="text-center py-20 text-slate-500 text-sm font-mono flex flex-col items-center justify-center gap-3">
            <span className="w-6 h-6 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin"></span>
            <span>Retrieving your reservations from live ledger logs...</span>
          </div>
        ) : displayedBookings.length === 0 ? (
          <BookingEmptyState activeSubTab={activeSubTab} onBookAnotherRoom={props.onBookAnotherRoom} />
        ) : (
          <div className="space-y-6">
            {displayedBookings.map((booking) => {
              const isEditingThis = editingBookingId === booking.id;

              return (
                <div
                  key={booking.id}
                  className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200 flex flex-col lg:flex-row justify-between gap-8 transition-all hover:border-slate-300"
                >
                  <div className="flex-1 space-y-5">
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
                      <BookingEditForm
                        editForm={editForm}
                        roomTypes={roomTypes}
                        savingEdit={savingEdit}
                        onFieldChange={(field, value) => setEditForm({ ...editForm, [field]: value })}
                        onSave={() => handleSaveEdit(booking.id)}
                        onCancel={handleCancelEdit}
                      />
                    ) : (
                      <BookingDetailsSummary booking={booking} onStartEdit={handleStartEdit} />
                    )}
                  </div>

                  <ReceiptPanel
                    booking={booking}
                    receiptInput={props.receiptInput}
                    onReceiptInputChange={props.onReceiptInputChange}
                    onSubmitReceipt={props.onSubmitReceipt}
                    onCancelBooking={props.onCancelBooking}
                  />
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
