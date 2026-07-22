import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAdminData, setAdminError, setAdminLoading, RootState } from "../../../store";
import { API_URL } from "@/src/config/api"; // adjust path

export function useAdminData(token: string | null, user: RootState["auth"]["user"]) {
  const dispatch = useDispatch();

  const fetchReservations = React.useCallback(async (statusFilter: string, paymentFilter: string, searchTerm: string) => {
    if (!token || !user || (user.role !== "RECEPTION" && user.role !== "OWNER" && user.role !== "ADMIN")) return;
    dispatch(setAdminLoading(true));
    try {
      const url = `${API_URL}/api/admin/reservations?status=${statusFilter}&paymentStatus=${paymentFilter}&search=${searchTerm}`;
      const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      dispatch(setAdminData({ reservations: data }));
    } catch (error: unknown) {
      dispatch(setAdminError(error instanceof Error ? error.message : "Failed to load reservations"));
    } finally {
      dispatch(setAdminLoading(false));
    }
  }, [dispatch, token, user]);

  const fetchStats = React.useCallback(async () => {
    if (!token || user?.role !== "OWNER") return;
    try {
      const statsRes = await fetch(`${API_URL}/api/admin/dashboard-stats`, { headers: { Authorization: `Bearer ${token}` } });
      const statsData = await statsRes.json();
      const reportsRes = await fetch(`${API_URL}/api/admin/reports/monthly`, { headers: { Authorization: `Bearer ${token}` } });
      const reportsData = await reportsRes.json();
      const logsRes = await fetch(`${API_URL}/api/admin/audit-logs`, { headers: { Authorization: `Bearer ${token}` } });
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
    const res = await fetch(`${API_URL}/api/admin/staff`, { headers: { Authorization: `Bearer ${token}` } });
    const data = await res.json();
    if (res.ok) dispatch(setAdminData({ staff: data }));
  }, [dispatch, token, user?.role]);

  const fetchRooms = React.useCallback(async () => {
    if (!token || !user || (user.role !== "RECEPTION" && user.role !== "OWNER" && user.role !== "ADMIN")) return;
    const res = await fetch(`${API_URL}/api/admin/rooms`, { headers: { Authorization: `Bearer ${token}` } });
    const data = await res.json();
    if (res.ok) dispatch(setAdminData({ rooms: data }));
  }, [dispatch, token, user]);

  const fetchEnquiries = React.useCallback(async () => {
    if (!token || !user || (user.role !== "RECEPTION" && user.role !== "OWNER" && user.role !== "ADMIN")) return;
    const res = await fetch(`${API_URL}/api/admin/enquiries`, { headers: { Authorization: `Bearer ${token}` } });
    const data = await res.json();
    if (res.ok) dispatch(setAdminData({ enquiries: data }));
  }, [dispatch, token, user]);

  return { fetchReservations, fetchStats, fetchStaff, fetchRooms, fetchEnquiries };
}
