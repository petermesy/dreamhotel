import React from "react";
import { API_URL } from "@/src/config/api"; 
export function useEnquiryActions(token: string | null, refreshEnquiries: () => Promise<void>) {
  const handleToggleEnquiryStatus = React.useCallback(async (enquiryId: number, currentStatus: string) => {
    if (!token) return;
    const nextStatus = currentStatus === "PENDING" ? "RESPONDED" : "PENDING";
    const res = await fetch(`${API_URL}/api/admin/enquiries/${enquiryId}/status`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ status: nextStatus })
    });
    if (res.ok) await refreshEnquiries();
  }, [refreshEnquiries, token]);

  return { handleToggleEnquiryStatus };
}
