import React from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../../store";
import { useAdminData } from "./useAdminData";
import { useAuthActions } from "./useAuthActions";
import { useBookingActions } from "./useBookingActions";
import { useReservationActions } from "./useReservationActions";
import { useStaffActions } from "./useStaffActions";
import { useRoomActions } from "./useRoomActions";
import { useEnquiryActions } from "./useEnquiryActions";

export function useBackOfficePortal() {
  const dispatch = useDispatch();
  const { adminTab } = useSelector((state: RootState) => state.ui);
  const { isAuthenticated, user, token } = useSelector((state: RootState) => state.auth);
  const admin = useSelector((state: RootState) => state.admin);

  const [searchTerm, setSearchTerm] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState("");
  const [paymentFilter, setPaymentFilter] = React.useState("");

  const {
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
    setEmail,
    setPassword,
    setIsSignUp,
    setSignUpEmail,
    setSignUpName,
    setSignUpPassword,
    handleLogin,
    handleSignUp,
    handleLogout,
  } = useAuthActions();

  const { fetchReservations, fetchStats, fetchStaff, fetchRooms, fetchEnquiries } = useAdminData(token, user);

  const { myBookings, myLoading, receiptInput, setReceiptInput, fetchMyBookings, handleUploadReceipt, handleCancelMyBooking, handleUpdateBooking } = useBookingActions(token, user?.role, async () => {
    await fetchMyBookings();
  });

  const { handleStatusChange, handleTogglePayment, handleCancelReservation, handleDeleteReservation } = useReservationActions(token, user?.role, async () => {
    await fetchReservations(statusFilter, paymentFilter, searchTerm);
  });

  const { newStaffEmail, newStaffName, newStaffPassword, newStaffRole, staffError, staffSuccess, setNewStaffEmail, setNewStaffName, setNewStaffPassword, setNewStaffRole, handleCreateStaffSubmit, handleToggleStaffStatus, handleDeleteStaff } = useStaffActions(token, user?.role, async () => {
    await fetchStaff();
  });

  const { editingRoomTypeId, editingRate, editingDescription, setEditingRoomTypeId, setEditingRate, setEditingDescription, handleToggleRoomMaintenance, handleUpdateRoomRate } = useRoomActions(token, user?.role, async () => {
    await fetchRooms();
  });

  const { handleToggleEnquiryStatus } = useEnquiryActions(token, async () => {
    await fetchEnquiries();
  });

  React.useEffect(() => {
    if (!isAuthenticated || !token || !user) return;

    if (user.role === "USER") {
      void fetchMyBookings();
      return;
    }

    if (adminTab === "RESERVATIONS") void fetchReservations(statusFilter, paymentFilter, searchTerm);
    if (adminTab === "STATS") void fetchStats();
    if (adminTab === "STAFF") void fetchStaff();
    if (adminTab === "ROOMS_CONTROL") void fetchRooms();
    if (adminTab === "ENQUIRIES") void fetchEnquiries();
  }, [adminTab, fetchEnquiries, fetchMyBookings, fetchReservations, fetchRooms, fetchStaff, fetchStats, isAuthenticated, paymentFilter, searchTerm, statusFilter, token, user]);

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
