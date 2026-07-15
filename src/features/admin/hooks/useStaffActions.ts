import React from "react";

export function useStaffActions(token: string | null, userRole: string | undefined, refreshStaff: () => Promise<void>) {
  const [newStaffEmail, setNewStaffEmail] = React.useState("");
  const [newStaffName, setNewStaffName] = React.useState("");
  const [newStaffPassword, setNewStaffPassword] = React.useState("");
  const [newStaffRole, setNewStaffRole] = React.useState<"RECEPTION" | "OWNER">("RECEPTION");
  const [staffError, setStaffError] = React.useState<string | null>(null);
  const [staffSuccess, setStaffSuccess] = React.useState(false);

  const handleCreateStaffSubmit = React.useCallback(async (event: React.FormEvent) => {
    event.preventDefault();
    if (!token || userRole !== "OWNER") return;
    setStaffError(null);
    setStaffSuccess(false);
    const res = await fetch("/api/admin/staff", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ email: newStaffEmail, name: newStaffName, password: newStaffPassword, role: newStaffRole })
    });
    const data = await res.json();
    if (!res.ok) {
      setStaffError(data.error);
      return;
    }
    setStaffSuccess(true);
    setNewStaffEmail("");
    setNewStaffName("");
    setNewStaffPassword("");
    await refreshStaff();
  }, [newStaffEmail, newStaffName, newStaffPassword, newStaffRole, refreshStaff, token, userRole]);

  const handleToggleStaffStatus = React.useCallback(async (staffId: number, currentStatus: string) => {
    if (!token || userRole !== "OWNER") return;
    const nextStatus = currentStatus === "ACTIVE" ? "SUSPENDED" : "ACTIVE";
    const res = await fetch(`/api/admin/staff/${staffId}/status`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ status: nextStatus })
    });
    if (res.ok) await refreshStaff();
  }, [refreshStaff, token, userRole]);

  const handleDeleteStaff = React.useCallback(async (staffId: number) => {
    if (!token || userRole !== "OWNER") return;
    if (!window.confirm("Delete this staff member permanently? historical audit trails remain linked.")) return;
    const res = await fetch(`/api/admin/staff/${staffId}`, { method: "DELETE", headers: { Authorization: `Bearer ${token}` } });
    if (res.ok) await refreshStaff();
  }, [refreshStaff, token, userRole]);

  return {
    newStaffEmail,
    newStaffName,
    newStaffPassword,
    newStaffRole,
    staffError,
    staffSuccess,
    setNewStaffEmail,
    setNewStaffName,
    setNewStaffPassword,
    setNewStaffRole,
    handleCreateStaffSubmit,
    handleToggleStaffStatus,
    handleDeleteStaff,
  };
}
