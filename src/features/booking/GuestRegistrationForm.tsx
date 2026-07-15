import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, selectRoomType, setBookingSuccess, setBookingError } from "../../store";
import { AlertCircle, Check, Upload } from "lucide-react";
import BookingHeader from "./components/BookingHeader";
import RoomStaySection from "./components/RoomStaySection";
import GuestRegistrationFields from "./components/GuestRegistrationFields";
import BookingConfirmationCard from "./components/BookingConfirmationCard";
import type { BookingFormData, RoomTypeOption } from "./types";

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

  const [formData, setFormData] = React.useState<BookingFormData>({
    fullName: "",
    email: "",
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
  const [paymentMessage, setPaymentMessage] = React.useState("");
  const [paymentAttachmentName, setPaymentAttachmentName] = React.useState("");
  const [paymentAttachmentPreview, setPaymentAttachmentPreview] = React.useState<string | null>(null);

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

  const handleReceiptFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      setPaymentAttachmentName("");
      setPaymentAttachmentPreview(null);
      return;
    }

    setPaymentAttachmentName(file.name);
    const reader = new FileReader();
    reader.onload = () => {
      setPaymentAttachmentPreview(typeof reader.result === "string" ? reader.result : null);
    };
    reader.readAsDataURL(file);
  };

  const handleBookSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    dispatch(setBookingError(null));

    const finalPurpose = formData.purpose === "Other" ? formData.otherPurpose || "Other" : formData.purpose;
    const receiptText = [paymentMessage.trim(), paymentAttachmentName ? `Attached file: ${paymentAttachmentName}` : ""]
      .filter(Boolean)
      .join("\n");
    const receiptAttachmentBlock = paymentAttachmentPreview
      ? `\n\n[ATTACHMENT_PREVIEW]\n${paymentAttachmentPreview}`
      : "";
    const paymentPayload = [receiptText, receiptAttachmentBlock].filter(Boolean).join("\n\n") || null;

    const headers: Record<string, string> = {
      "Content-Type": "application/json"
    };
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const bookingPayload: Record<string, any> = {
      fullName: formData.fullName,
      email: formData.email,
      purpose: finalPurpose,
      address: formData.address,
      nationalId: formData.nationalId,
      phone: formData.phone,
      roomTypeId: selectedRoomTypeId,
      checkIn: formData.checkIn,
      checkOut: formData.checkOut,
      paymentMessage: paymentPayload || null
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
        email: "",
        purpose: "Leisure / Tourism",
        otherPurpose: "",
        address: "",
        nationalId: "",
        phone: "",
        checkIn: getTodayDateString(),
        checkOut: getTomorrowDateString()
      });
      setPaymentMessage("");
      setPaymentAttachmentName("");
      setPaymentAttachmentPreview(null);
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
    return <BookingConfirmationCard bookingSuccess={bookingSuccess} onNewBooking={handleNewBooking} />;
  }

  return (
    <div className="w-full bg-slate-50 py-16 animate-fade-in">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <form onSubmit={handleBookSubmit} className="p-8 md:p-10 space-y-8 font-mono text-sm">
          <RoomStaySection
            selectedRoomTypeId={selectedRoomTypeId}
            roomTypes={localRoomTypes}
            formData={formData}
            checkingAvailability={checkingAvailability}
            availableCount={availableCount}
            availabilityError={availabilityError}
            onRoomTypeChange={(value) => dispatch(selectRoomType(value))}
            onDateChange={(field, value) => setFormData((prev) => ({ ...prev, [field]: value }))}
          />

          <div className="h-px bg-slate-200"></div>

          <GuestRegistrationFields
            formData={formData}
            onFieldChange={(field, value) => setFormData((prev) => ({ ...prev, [field]: value }))}
          />

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

            <div className="bg-amber-50 border border-amber-200/60 text-amber-900 p-4 rounded-xl text-left text-xs flex gap-3 shadow-inner">
              <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div className="w-full space-y-3">
                <div>
                  <strong className="block text-amber-950 mb-1">CBE / TELEBIRR Receipt</strong>
                  Paste the SMS text or receipt from your CBE bank transfer or Telebirr payment below, or attach a screenshot/receipt image for immediate front-desk confirmation. If no payment receipt is sent within 12 hours, the reservation will be automatically cancelled.
                </div>

                <textarea
                  rows={4}
                  value={paymentMessage}
                  onChange={(e) => setPaymentMessage(e.target.value)}
                  placeholder="Paste the SMS text, transfer reference, amount, date, or other payment details here..."
                  className="w-full bg-white border border-amber-200 rounded-lg p-3 text-slate-800 outline-none resize-none"
                />

                <label className="flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-dashed border-amber-300 bg-white px-3 py-2.5 text-[11px] font-semibold text-amber-800 transition hover:bg-amber-100">
                  <Upload className="h-4 w-4" />
                  <span>{paymentAttachmentName ? `Change screenshot / receipt (${paymentAttachmentName})` : "Attach screenshot or receipt image"}</span>
                  <input type="file" accept="image/*,.pdf" onChange={handleReceiptFileChange} className="sr-only" />
                </label>

                {paymentAttachmentPreview && (
                  <div className="rounded-lg border border-amber-200 bg-white p-2">
                    <img src={paymentAttachmentPreview} alt="Payment attachment preview" className="max-h-40 w-full rounded object-contain" />
                  </div>
                )}
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
    
  );
}
