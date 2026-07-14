import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess, logout, setAdminData, setAdminError, setAdminLoading, setTab, RootState } from "../../store";
import type { Booking } from "../../types";

export function useBackOfficePortal() {
  const dispatch = useDispatch();
  const { adminTab } = useSelector((state: RootState) => state.ui);
  const { isAuthenticated, user, token } = useSelector((state: RootState) => state.auth);
  const admin = useSelector((state: RootState) => state.admin);

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loginLoading, setLoginLoading] = React.useState(false);
  const [loginError, setLoginError] = React.useState<string | null>(null);
  const [isSignUp, setIsSignUp] = React.useState(false);
  const [signUpEmail, setSignUpEmail] = React.useState("");
  const [signUpName, setSignUpName] = React.useState("");
  const [signUpPassword, setSignUpPassword] = React.useState("");
  const [signUpSuccess, setSignUpSuccess] = React.useState(false);
  const [signUpError, setSignUpError] = React.useState<string | null>(null);
  const [myBookings, setMyBookings] = React.useState<Booking[]>([]);
  const [myLoading, setMyLoading] = React.useState(false);
  const [receiptInput, setReceiptInput] = React.useState<Record<string, string>>({});
  const [searchTerm, setSearchTerm] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState("");
  const [paymentFilter, setPaymentFilter] = React.useState("");
  const [newStaffEmail, setNewStaffEmail] = React.useState("");
  const [newStaffName, setNewStaffName] = React.useState("");
  const [newStaffPassword, setNewStaffPassword] = React.useState("");
  const [newStaffRole, setNewStaffRole] = React.useState<"RECEPTION" | "OWNER">("RECEPTION");
  const [staffError, setStaffError] = React.useState<string | null>(null);
  const [staffSuccess, setStaffSuccess] = React.useState(false);
  const [editingRoomTypeId, setEditingRoomTypeId] = React.useState<string | null>(null);
  const [editingRate, setEditingRate] = React.useState("");
  const [editingDescription, setEditingDescription] = React.useState("");

  const fetchReservations = React.useCallback(async () => {
    if (!token || !user || (user.role !== "RECEPTION" && user.role !== "OWNER" && user.role !== "ADMIN")) return;
    dispatch(setAdminLoading(true));
    try {
      const url = `/api/admin/reservations?status=${statusFilter}&paymentStatus=${paymentFilter}&search=${searchTerm}`;
      const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      dispatch(setAdminData({ reservations: data }));
    } catch (error: unknown) {
      dispatch(setAdminError(error instanceof Error ? error.message : "Failed to load reservations"));
    } finally {
      dispatch(setAdminLoading(false));
    }
  }, [dispatch, paymentFilter, searchTerm, statusFilter, token, user]);

  const fetchStats = React.useCallback(async () => {
    if (!token || user?.role !== "OWNER") return;
    try {
      const statsRes = await fetch("/api/admin/dashboard-stats", { headers: { Authorization: `Bearer ${token}` } });
      const statsData = await statsRes.json();
      const reportsRes = await fetch("/api/admin/reports/monthly", { headers: { Authorization: `Bearer ${token}` } });
      const reportsData = await reportsRes.json();
      const logsRes = await fetch("/api/admin/audit-logs", { headers: { Authorization: `Bearer ${token}` } });
      const logsData = await logsRes.json();
      if (statsRes.ok && reportsRes.ok && logsRes.ok) {
        dispatch(setAdminData({ stats: statsData, monthlyReports: reportsData, auditLogs: logsData }));
      }
    } catch (error: unknown) {
      console.error(error instanceof Error ? error.message : "Failed to load stats");
    }
  }, [dispatch, token, user?.role]);

  const fetchStaff = React.useCallback(async () => {
    if (!token || user?.role !== "OWNER") return;
    const res = await fetch("/api/admin/staff", { headers: { Authorization: `Bearer ${token}` } });
    const data = await res.json();
    if (res.ok) dispatch(setAdminData({ staff: data }));
  }, [dispatch, token, user?.role]);

  const fetchRooms = React.useCallback(async () => {
    if (!token || !user || (user.role !== "RECEPTION" && user.role !== "OWNER" && user.role !== "ADMIN")) return;
    const res = await fetch("/api/admin/rooms", { headers: { Authorization: `Bearer ${token}` } });
    const data = await res.json();
    if (res.ok) dispatch(setAdminData({ rooms: data }));
  }, [dispatch, token]);

  const fetchEnquiries = React.useCallback(async () => {
    if (!token || !user || (user.role !== "RECEPTION" && user.role !== "OWNER" && user.role !== "ADMIN")) return;
    const res = await fetch("/api/admin/enquiries", { headers: { Authorization: `Bearer ${token}` } });
    const data = await res.json();
    if (res.ok) dispatch(setAdminData({ enquiries: data }));
  }, [dispatch, token]);

  const fetchMyBookings = React.useCallback(async () => {
    if (!token || user?.role !== "USER") return;
    setMyLoading(true);
    try {
      const res = await fetch("/api/bookings/my", { headers: { Authorization: `Bearer ${token}` } });
      if (res.ok) setMyBookings(await res.json());
    } finally {
      setMyLoading(false);
    }
  }, [token, user?.role]);

  const handleLogin = React.useCallback(async (event: React.FormEvent) => {
    event.preventDefault();
    setLoginLoading(true);
    setLoginError(null);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Login failed");
      dispatch(loginSuccess({ token: data.token, user: data.user }));
      setEmail("");
      setPassword("");
    } catch (error: unknown) {
      setLoginError(error instanceof Error ? error.message : "Login failed");
    } finally {
      setLoginLoading(false);
    }
  }, [dispatch, password, email]);

  const handleSignUp = React.useCallback(async (event: React.FormEvent) => {
    event.preventDefault();
    setSignUpError(null);
    setSignUpSuccess(false);
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: signUpEmail, name: signUpName, password: signUpPassword })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Registration failed");
      setSignUpSuccess(true);
      setEmail(signUpEmail);
      setSignUpEmail("");
      setSignUpName("");
      setSignUpPassword("");
      setTimeout(() => setIsSignUp(false), 2000);
    } catch (error: unknown) {
      setSignUpError(error instanceof Error ? error.message : "Registration failed");
    }
  }, [signUpName, signUpPassword, signUpEmail]);

  const handleLogout = React.useCallback(() => {
    dispatch(logout());
    dispatch(setTab("HOME"));
  }, [dispatch]);

  const handleUploadReceipt = React.useCallback(async (bookingId: string) => {
    const msg = receiptInput[bookingId];
    if (!msg || !msg.trim()) return alert("Please copy and paste the bank transaction text first.");
    const res = await fetch(`/api/bookings/lookup/${bookingId}/receipt`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ paymentMessage: msg })
    });
    if (res.ok) {
      alert("✓ Bank transaction receipt text submitted successfully! Admin will check G+1/G+2 records and approve your room.");
      fetchMyBookings();
      setReceiptInput((prev) => ({ ...prev, [bookingId]: "" }));
    }
  }, [fetchMyBookings, receiptInput]);

  const handleCancelMyBooking = React.useCallback(async (bookingId: string) => {
    if (!window.confirm("Are you sure you want to request cancellation for this booking?")) return;
    const res = await fetch(`/api/bookings/lookup/${bookingId}/cancel`, { method: "POST" });
    if (res.ok) {
      alert("✓ Booking cancelled successfully.");
      fetchMyBookings();
    }
  }, [fetchMyBookings]);

  const handleUpdateBooking = React.useCallback(async (bookingId: string, updatedFields: any) => {
    try {
      const res = await fetch(`/api/bookings/lookup/${bookingId}`, {
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
      fetchMyBookings();
      return true;
    } catch (err: any) {
      alert(`✕ Error: ${err.message || "Failed to update booking"}`);
      return false;
    }
  }, [fetchMyBookings]);

  const handleStatusChange = React.useCallback(async (id: string, newStatus: string) => {
    if (!token) return;
    const res = await fetch(`/api/admin/reservations/${id}/status`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ status: newStatus })
    });
    if (res.ok) fetchReservations();
  }, [fetchReservations, token]);

  const handleTogglePayment = React.useCallback(async (id: string, currentPaymentStatus: string) => {
    if (!token) return;
    const nextStatus = currentPaymentStatus === "PENDING" ? "RECEIVED" : "PENDING";
    if (nextStatus === "RECEIVED" && !window.confirm("Confirm cash collection? Update status to Received?")) return;
    const res = await fetch(`/api/admin/reservations/${id}/payment`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ paymentStatus: nextStatus })
    });
    if (res.ok) fetchReservations();
  }, [fetchReservations, token]);

  const handleCancelReservation = React.useCallback(async (id: string) => {
    if (!token || !window.confirm("Mark this reservation as CANCELLED? (Phone/Staff process)")) return;
    const res = await fetch(`/api/admin/reservations/${id}/cancel`, { method: "POST", headers: { Authorization: `Bearer ${token}` } });
    if (res.ok) fetchReservations();
  }, [fetchReservations, token]);

  const handleDeleteReservation = React.useCallback(async (id: string) => {
    if (!token || user?.role !== "OWNER") return;
    if (!window.confirm("CRITICAL WARNING: Permanently delete this booking record? This cannot be undone!")) return;
    const res = await fetch(`/api/admin/reservations/${id}`, { method: "DELETE", headers: { Authorization: `Bearer ${token}` } });
    if (res.ok) fetchReservations();
  }, [fetchReservations, token, user?.role]);

  const handleCreateStaffSubmit = React.useCallback(async (event: React.FormEvent) => {
    event.preventDefault();
    if (!token || user?.role !== "OWNER") return;
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
    fetchStaff();
  }, [fetchStaff, newStaffName, newStaffPassword, newStaffRole, newStaffEmail, token, user?.role]);

  const handleToggleStaffStatus = React.useCallback(async (staffId: number, currentStatus: string) => {
    if (!token || user?.role !== "OWNER") return;
    const nextStatus = currentStatus === "ACTIVE" ? "SUSPENDED" : "ACTIVE";
    const res = await fetch(`/api/admin/staff/${staffId}/status`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ status: nextStatus })
    });
    if (res.ok) fetchStaff();
  }, [fetchStaff, token, user?.role]);

  const handleDeleteStaff = React.useCallback(async (staffId: number) => {
    if (!token || user?.role !== "OWNER") return;
    if (!window.confirm("Delete this staff member permanently? historical audit trails remain linked.")) return;
    const res = await fetch(`/api/admin/staff/${staffId}`, { method: "DELETE", headers: { Authorization: `Bearer ${token}` } });
    if (res.ok) fetchStaff();
  }, [fetchStaff, token, user?.role]);

  const handleToggleRoomMaintenance = React.useCallback(async (roomNumber: string, currentStatus: string) => {
    if (!token || user?.role !== "OWNER") return;
    const nextStatus = currentStatus === "AVAILABLE" ? "MAINTENANCE" : "AVAILABLE";
    const res = await fetch(`/api/admin/rooms/${roomNumber}/status`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ status: nextStatus })
    });
    if (res.ok) fetchRooms();
  }, [fetchRooms, token, user?.role]);

  const handleUpdateRoomRate = React.useCallback(async (roomTypeId: string) => {
    if (!token || user?.role !== "OWNER") return;
    const res = await fetch(`/api/admin/room-types/${roomTypeId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ rate: editingRate ? parseFloat(editingRate) : undefined, description: editingDescription || undefined })
    });
    if (res.ok) {
      alert("Room classification rate updated successfully!");
      setEditingRoomTypeId(null);
      setEditingRate("");
      setEditingDescription("");
      fetchRooms();
    }
  }, [editingDescription, editingRate, fetchRooms, token, user?.role]);

  const handleToggleEnquiryStatus = React.useCallback(async (enquiryId: number, currentStatus: string) => {
    if (!token) return;
    const nextStatus = currentStatus === "PENDING" ? "RESPONDED" : "PENDING";
    const res = await fetch(`/api/admin/enquiries/${enquiryId}/status`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ status: nextStatus })
    });
    if (res.ok) fetchEnquiries();
  }, [fetchEnquiries, token]);

  React.useEffect(() => {
    if (!isAuthenticated || !token || !user) return;

    if (user.role === "USER") {
      fetchMyBookings();
      return;
    }

    if (adminTab === "RESERVATIONS") fetchReservations();
    if (adminTab === "STATS") fetchStats();
    if (adminTab === "STAFF") fetchStaff();
    if (adminTab === "ROOMS_CONTROL") fetchRooms();
    if (adminTab === "ENQUIRIES") fetchEnquiries();
  }, [adminTab, fetchEnquiries, fetchMyBookings, fetchReservations, fetchRooms, fetchStaff, fetchStats, isAuthenticated, token, user]);

  return {
    admin,
    dispatch,
    isAuthenticated,
    user,
    token,
    adminTab,
    email,
    password,
    loginLoading,
    loginError,
    isSignUp,
    signUpEmail,
    signUpName,
    signUpPassword,
    signUpSuccess,
    signUpError,
    myBookings,
    myLoading,
    receiptInput,
    searchTerm,
    statusFilter,
    paymentFilter,
    newStaffEmail,
    newStaffName,
    newStaffPassword,
    newStaffRole,
    staffError,
    staffSuccess,
    editingRoomTypeId,
    editingRate,
    editingDescription,
    fetchReservations,
    handleLogin,
    handleSignUp,
    handleLogout,
    handleUploadReceipt,
    handleCancelMyBooking,
    handleUpdateBooking,
    handleStatusChange,
    handleTogglePayment,
    handleCancelReservation,
    handleDeleteReservation,
    handleCreateStaffSubmit,
    handleToggleStaffStatus,
    handleDeleteStaff,
    handleToggleRoomMaintenance,
    handleUpdateRoomRate,
    handleToggleEnquiryStatus,
    setEmail,
    setPassword,
    setIsSignUp,
    setSignUpEmail,
    setSignUpName,
    setSignUpPassword,
    setReceiptInput,
    setSearchTerm,
    setStatusFilter,
    setPaymentFilter,
    setNewStaffEmail,
    setNewStaffName,
    setNewStaffPassword,
    setNewStaffRole,
    setEditingRoomTypeId,
    setEditingRate,
    setEditingDescription,
  };
}
