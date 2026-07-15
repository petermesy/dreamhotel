import React from "react";
import { Phone, Check } from "lucide-react";

interface ReceiptPanelProps {
  booking: any;
  receiptInput: Record<string, string>;
  onReceiptInputChange: (bookingId: string, value: string) => void;
  onSubmitReceipt: (bookingId: string) => void;
  onCancelBooking: (bookingId: string) => void;
}

export default function ReceiptPanel({
  booking,
  receiptInput,
  onReceiptInputChange,
  onSubmitReceipt,
  onCancelBooking,
}: ReceiptPanelProps) {
  const paymentText = booking.paymentMessage || "";
  const imageSources = React.useMemo(() => {
    const matches = paymentText.match(/data:image\/[a-zA-Z0-9.+-]+;base64,[^\s]+/g) || [];
    return Array.from(new Set(matches));
  }, [paymentText]);

  const displayText = React.useMemo(() => {
    return paymentText
      .replace(/\[ATTACHMENT_PREVIEW\]/gi, "")
      .replace(/data:image\/[a-zA-Z0-9.+-]+;base64,[^\s]+/g, "")
      .trim();
  }, [paymentText]);

  const renderLinkedText = (text: string) => {
    const parts = text.split(/(https?:\/\/[^\s]+|www\.[^\s]+)/gi);
    return parts.map((part, index) => {
      if (!part) return null;
      const isLink = /^https?:\/\//i.test(part) || /^www\./i.test(part);
      if (!isLink) {
        return <React.Fragment key={`${part}-${index}`}>{part}</React.Fragment>;
      }
      const href = /^www\./i.test(part) ? `https://${part}` : part;
      return (
        <a
          key={`${part}-${index}`}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-indigo-700 underline break-all"
        >
          {part}
        </a>
      );
    });
  };

  return (
    <div className="w-full lg:w-80 bg-slate-50 rounded-2xl p-5 border border-slate-200 flex flex-col justify-between text-xs space-y-4">
      <div>
        <h4 className="font-sans font-bold text-slate-800 flex items-center gap-1.5 mb-1.5 text-xs">
          <Phone className="w-3.5 h-3.5 text-indigo-500" /> CBE / TELEBIRR Receipt
        </h4>
        <p className="text-[10px] text-slate-400 leading-normal font-mono">
          Please send the SMS text/receipt of your CBE bank transfer or Telebirr payment within 12 hours of booking. If no receipt is submitted in time, the reservation is cancelled automatically.
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
          <div className="bg-white p-3 rounded-lg border border-slate-200 max-h-48 overflow-y-auto text-[10px] text-slate-500 leading-normal">
            {displayText ? (
              <div className="whitespace-pre-wrap break-words">
                {renderLinkedText(displayText)}
              </div>
            ) : (
              <div className="text-slate-400">No text message attached.</div>
            )}
            {imageSources.length > 0 && (
              <div className="mt-3 space-y-2">
                {imageSources.map((src, index) => (
                  <img
                    key={`${src.slice(0, 20)}-${index}`}
                    src={src}
                    alt={`Uploaded receipt screenshot ${index + 1}`}
                    className="w-full max-h-48 rounded-md border border-slate-200 object-contain bg-slate-50"
                  />
                ))}
              </div>
            )}
          </div>
          {booking.status === "BOOKED" && (
            <button
              onClick={() => onReceiptInputChange(booking.id, booking.paymentMessage || "")}
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
            value={receiptInput[booking.id] || ""}
            onChange={(e) => onReceiptInputChange(booking.id, e.target.value)}
            className="w-full bg-white border border-slate-200 focus:border-indigo-500 rounded-lg p-2.5 outline-none transition-all text-[11px] h-20 resize-none font-mono"
          />
          <button
            onClick={() => onSubmitReceipt(booking.id)}
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
          onClick={() => onCancelBooking(booking.id)}
          className="text-[10px] text-rose-500 hover:text-rose-700 hover:underline text-left mt-2 block font-mono font-semibold cursor-pointer"
        >
          Cancel Reservation
        </button>
      )}
    </div>
  );
}
