import React from "react";
import type { ReservationPopupNotice } from "../types";
import { API_URL } from "@/src/config/api"; 
export function useReservationActions(token: string | null, userRole: string | undefined, refreshReservations: () => Promise<void>) {
  const [paymentPopupNotice, setPaymentPopupNotice] = React.useState<ReservationPopupNotice | null>(null);

  const dismissPaymentPopup = React.useCallback(() => {
    setPaymentPopupNotice(null);
  }, []);

  const handleStatusChange = React.useCallback(async (id: string, newStatus: string) => {
    if (!token) return;
    const res = await fetch(`${API_URL}/api/admin/reservations/${id}/status`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ status: newStatus })
    });
    if (res.ok) await refreshReservations();
  }, [refreshReservations, token]);

  const handleTogglePayment = React.useCallback(async (id: string, currentPaymentStatus: string) => {
    if (!token) return;
    if (currentPaymentStatus === "RECEIVED") {
      setPaymentPopupNotice({
        title: "Payment already received",
        message: "This payment has already been marked as received and cannot be changed back to pending.",
        variant: "error"
      });
      return;
    }

    setPaymentPopupNotice({
      title: "Approve payment",
      message: "Confirm cash collection? Update status to Received?",
      variant: "info",
      confirmLabel: "Approve payment",
      onConfirm: async () => {
        const res = await fetch(`${API_URL}/api/admin/reservations/${id}/payment`, {
          method: "POST",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
          body: JSON.stringify({ paymentStatus: "RECEIVED" })
        });
        if (res.ok) {
          await refreshReservations();
          setPaymentPopupNotice({
            title: "Payment approved",
            message: "Payment status updated to RECEIVED.",
            variant: "success"
          });
        } else {
          setPaymentPopupNotice({
            title: "Approval failed",
            message: "Unable to update the payment status. Please try again.",
            variant: "error"
          });
        }
      }
    });
  }, [refreshReservations, token]);

  const handleCancelReservation = React.useCallback(async (id: string) => {
    if (!token || !window.confirm("Mark this reservation as CANCELLED? (Phone/Staff process)")) return;
    const res = await fetch(`${API_URL}/api/admin/reservations/${id}/cancel`, { method: "POST", headers: { Authorization: `Bearer ${token}` } });
    if (res.ok) await refreshReservations();
  }, [refreshReservations, token]);

  const handleDeleteReservation = React.useCallback(async (id: string) => {
    if (!token || userRole !== "OWNER") return;
    if (!window.confirm("CRITICAL WARNING: Permanently delete this booking record? This cannot be undone!")) return;
    const res = await fetch(`${API_URL}/api/admin/reservations/${id}`, { method: "DELETE", headers: { Authorization: `Bearer ${token}` } });
    if (res.ok) await refreshReservations();
  }, [refreshReservations, token, userRole]);

  return { handleStatusChange, handleTogglePayment, handleCancelReservation, handleDeleteReservation, paymentPopupNotice, dismissPaymentPopup };
}
