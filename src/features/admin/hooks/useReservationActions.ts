import React from "react";

export function useReservationActions(token: string | null, userRole: string | undefined, refreshReservations: () => Promise<void>) {
  const handleStatusChange = React.useCallback(async (id: string, newStatus: string) => {
    if (!token) return;
    const res = await fetch(`/api/admin/reservations/${id}/status`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ status: newStatus })
    });
    if (res.ok) await refreshReservations();
  }, [refreshReservations, token]);

  const handleTogglePayment = React.useCallback(async (id: string, currentPaymentStatus: string) => {
    if (!token) return;
    const nextStatus = currentPaymentStatus === "PENDING" ? "RECEIVED" : "PENDING";
    if (nextStatus === "RECEIVED" && !window.confirm("Confirm cash collection? Update status to Received?")) return;
    const res = await fetch(`/api/admin/reservations/${id}/payment`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ paymentStatus: nextStatus })
    });
    if (res.ok) await refreshReservations();
  }, [refreshReservations, token]);

  const handleCancelReservation = React.useCallback(async (id: string) => {
    if (!token || !window.confirm("Mark this reservation as CANCELLED? (Phone/Staff process)")) return;
    const res = await fetch(`/api/admin/reservations/${id}/cancel`, { method: "POST", headers: { Authorization: `Bearer ${token}` } });
    if (res.ok) await refreshReservations();
  }, [refreshReservations, token]);

  const handleDeleteReservation = React.useCallback(async (id: string) => {
    if (!token || userRole !== "OWNER") return;
    if (!window.confirm("CRITICAL WARNING: Permanently delete this booking record? This cannot be undone!")) return;
    const res = await fetch(`/api/admin/reservations/${id}`, { method: "DELETE", headers: { Authorization: `Bearer ${token}` } });
    if (res.ok) await refreshReservations();
  }, [refreshReservations, token, userRole]);

  return { handleStatusChange, handleTogglePayment, handleCancelReservation, handleDeleteReservation };
}
