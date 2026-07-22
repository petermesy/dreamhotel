import React from "react";
import type { Booking } from "../../../types";
import { API_URL } from "@/src/config/api"; 

export function useBookingActions(token: string | null, userRole: string | undefined, refreshMyBookings: () => Promise<void>) {
  const [myBookings, setMyBookings] = React.useState<Booking[]>([]);
  const [myLoading, setMyLoading] = React.useState(false);
  const [receiptInput, setReceiptInput] = React.useState<Record<string, string>>({});

  const fetchMyBookings = React.useCallback(async () => {
    if (!token || userRole !== "USER") return;
    setMyLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/bookings/my`, { headers: { Authorization: `Bearer ${token}` } });
      if (res.ok) setMyBookings(await res.json());
    } finally {
      setMyLoading(false);
    }
  }, [token, userRole]);

  const handleUploadReceipt = React.useCallback(async (bookingId: string) => {
    const msg = receiptInput[bookingId];
    if (!msg || !msg.trim()) return alert("Please copy and paste the bank transaction text first.");
    const res = await fetch(`${API_URL}/api/bookings/lookup/${bookingId}/receipt`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ paymentMessage: msg })
    });
    if (res.ok) {
      alert("✓ Bank transaction receipt text submitted successfully! Admin will check G+1/G+2 records and approve your room.");
      await fetchMyBookings();
      setReceiptInput((prev) => ({ ...prev, [bookingId]: "" }));
    }
  }, [fetchMyBookings, receiptInput]);

  const handleCancelMyBooking = React.useCallback(async (bookingId: string) => {
    if (!window.confirm("Are you sure you want to request cancellation for this booking?")) return;
    const res = await fetch(`${API_URL}/api/bookings/lookup/${bookingId}/cancel`, { method: "POST" });
    if (res.ok) {
      alert("✓ Booking cancelled successfully.");
      await fetchMyBookings();
    }
  }, [fetchMyBookings]);

  const handleUpdateBooking = React.useCallback(async (bookingId: string, updatedFields: any) => {
    try {
      const res = await fetch(`${API_URL}/api/bookings/lookup/${bookingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedFields)
      });
      const data = await res.json();
      if (!res.ok) {
        alert(`✕ Error: ${data.error || "Failed to update booking"}`);
        return false;
      }
      alert("✓ Booking details updated successfully!");
      await fetchMyBookings();
      return true;
    } catch (err: any) {
      alert(`✕ Error: ${err.message || "Failed to update booking"}`);
      return false;
    }
  }, [fetchMyBookings]);

  return {
    myBookings,
    myLoading,
    receiptInput,
    setReceiptInput,
    fetchMyBookings,
    handleUploadReceipt,
    handleCancelMyBooking,
    handleUpdateBooking,
  };
}
