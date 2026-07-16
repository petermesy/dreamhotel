import type { ReactNode } from "react";
import type { Booking, Enquiry, DashboardStats, MonthlyReport, User } from "../../types";

export interface AdminPortalState {
  reservations: Booking[];
  auditLogs: import("../../types").AuditLog[];
  stats: DashboardStats | null;
  monthlyReports: MonthlyReport[];
  staff: User[];
  rooms: Array<{
    roomNumber: string;
    roomTypeId: string;
    roomType: { id: string; name: string; rate: number; bedConfig: string; description: string };
    floor: string;
    status: "AVAILABLE" | "MAINTENANCE";
  }>;
  enquiries: Enquiry[];
  loading: boolean;
  error: string | null;
}

export interface LoginSectionProps {
  isSignUp: boolean;
  loginLoading: boolean;
  loginError: string | null;
  signUpError: string | null;
  signUpSuccess: boolean;
  email: string;
  password: string;
  signUpEmail: string;
  signUpName: string;
  signUpPassword: string;
  onToggleMode: (isSignUp: boolean) => void;
  onEmailChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onSignUpEmailChange: (value: string) => void;
  onSignUpNameChange: (value: string) => void;
  onSignUpPasswordChange: (value: string) => void;
  onSubmitLogin: (event: React.FormEvent) => void;
  onSubmitSignUp: (event: React.FormEvent) => void;
}

export interface UserDashboardProps {
  userName: string;
  bookings: Booking[];
  loading: boolean;
  receiptInput: Record<string, string>;
  onBookAnotherRoom: () => void;
  onBackToHome: () => void;
  onLogout: () => void;
  onReceiptInputChange: (bookingId: string, value: string) => void;
  onSubmitReceipt: (bookingId: string) => void;
  onCancelBooking: (bookingId: string) => void;
  onUpdateBooking: (bookingId: string, updatedFields: any) => Promise<boolean>;
}

export interface BackOfficeProps {
  userName: string;
  userRole: string;
  isOwner: boolean;
  currentTab: string;
  adminTab: string;
  reservations: Booking[];
  auditLogs: import("../../types").AuditLog[];
  stats: DashboardStats | null;
  monthlyReports: MonthlyReport[];
  staff: User[];
  rooms: AdminPortalState["rooms"];
  enquiries: Enquiry[];
  searchTerm: string;
  statusFilter: string;
  paymentFilter: string;
  newBookingNotice: string | null;
  editingRoomTypeId: string | null;
  editingRate: string;
  editingDescription: string;
  newStaffEmail: string;
  newStaffName: string;
  newStaffPassword: string;
  newStaffRole: "RECEPTION" | "OWNER";
  staffError: string | null;
  staffSuccess: boolean;
  loading: boolean;
  error: string | null;
  onGoToWebsite: () => void;
  onLogout: () => void;
  onSetAdminTab: (tab: "RESERVATIONS" | "STATS" | "STAFF" | "ROOMS_CONTROL" | "ENQUIRIES" | "GALLERY") => void;
  onSearchTermChange: (value: string) => void;
  onStatusFilterChange: (value: string) => void;
  onPaymentFilterChange: (value: string) => void;
  onDismissNewBookingNotice: () => void;
  onStatusChange: (id: string, newStatus: string) => void;
  onTogglePayment: (id: string, currentPaymentStatus: string) => void;
  onCancelReservation: (id: string) => void;
  onDeleteReservation: (id: string) => void;
  onCreateStaffSubmit: (event: React.FormEvent) => void;
  onNewStaffEmailChange: (value: string) => void;
  onNewStaffNameChange: (value: string) => void;
  onNewStaffPasswordChange: (value: string) => void;
  onNewStaffRoleChange: (value: "RECEPTION" | "OWNER") => void;
  onToggleStaffStatus: (staffId: number, currentStatus: string) => void;
  onDeleteStaff: (staffId: number) => void;
  onToggleRoomMaintenance: (roomNumber: string, currentStatus: string) => void;
  onEditRoomType: (roomTypeId: string, rate: string, description: string) => void;
  onSaveRoomRate: (roomTypeId: string) => void;
  onCancelRoomEdit: () => void;
  onEditingRateChange: (value: string) => void;
  onEditingDescriptionChange: (value: string) => void;
  onToggleEnquiryStatus: (enquiryId: number, currentStatus: string) => void;
}

interface SectionProps {
  children?: ReactNode;
}
