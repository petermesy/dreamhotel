import { API_URL } from "@/src/config/api";
import React from "react";
export function useRoomActions(token: string | null, userRole: string | undefined, refreshRooms: () => Promise<void>) {
  const [editingRoomTypeId, setEditingRoomTypeId] = React.useState<string | null>(null);
  const [editingRate, setEditingRate] = React.useState("");
  const [editingDescription, setEditingDescription] = React.useState("");

  const handleToggleRoomMaintenance = React.useCallback(async (roomNumber: string, currentStatus: string) => {
    if (!token || userRole !== "OWNER") return;
    const nextStatus = currentStatus === "AVAILABLE" ? "MAINTENANCE" : "AVAILABLE";
    const res = await fetch(`${API_URL}/api/admin/rooms/${roomNumber}/status`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ status: nextStatus })
    });
    if (res.ok) await refreshRooms();
  }, [refreshRooms, token, userRole]);

  const handleUpdateRoomRate = React.useCallback(async (roomTypeId: string) => {
    if (!token || userRole !== "OWNER") return;
    const res = await fetch(`${API_URL}/api/admin/room-types/${roomTypeId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ rate: editingRate ? parseFloat(editingRate) : undefined, description: editingDescription || undefined })
    });
    if (res.ok) {
      alert("Room classification rate updated successfully!");
      setEditingRoomTypeId(null);
      setEditingRate("");
      setEditingDescription("");
      await refreshRooms();
    }
  }, [editingDescription, editingRate, refreshRooms, token, userRole]);

  return {
    editingRoomTypeId,
    editingRate,
    editingDescription,
    setEditingRoomTypeId,
    setEditingRate,
    setEditingDescription,
    handleToggleRoomMaintenance,
    handleUpdateRoomRate,
  };
}
