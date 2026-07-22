export interface User {
  id: number;
  email: string;
  name: string;
  role: "OWNER" | "RECEPTION" | "USER" | "ADMIN";
  status: "ACTIVE" | "SUSPENDED";
  createdAt: string;
}

export interface RoomType {
  id: string;
  name: string;
  rate: number;
  bedConfig: string;
  amenities: string[]; // Parsed JSON
  description: string;
}

export interface Room {
  roomNumber: string;
  roomTypeId: string;
  roomType: RoomType;
  floor: string;
  status: "AVAILABLE" | "MAINTENANCE";
  createdAt: string;
  updatedAt: string;
}

export interface Booking {
  id: string; // Reference DP-XXXXX
  fullName: string;
  purpose: string;
  address: string;
  nationalId: string;
  roomNumber: string | null;
  room?: Room;
  roomTypeId: string;
  roomType?: RoomType;
  checkIn: string;
  checkOut: string;
  phone: string;
  status: "BOOKED" | "CHECKED_IN" | "CHECKED_OUT" | "CANCELLED";
  paymentStatus: "PENDING" | "RECEIVED";
  totalPrice: number;
  paymentMessage?: string | null;
  userId?: number | null;
  createdAt: string;
  updatedAt: string;
}

export interface AuditLog {
  id: number;
  bookingId: string | null;
  booking?: Booking;
  userId: number;
  user: {
    id: number;
    email: string;
    name: string;
    role: string;
  };
  action: string;
  details: string;
  timestamp: string;
}

export interface Enquiry {
  id: number;
  name: string;
  organization: string;
  eventType: string;
  date: string;
  estimatedAttendance: number;
  cateringRequirement: boolean;
  message: string;
  status: "PENDING" | "RESPONDED";
  createdAt: string;
}

export interface DashboardStats {
  cumulativeRevenue: number;
  pendingRevenue: number;
  occupancyRate: number;
  occupiedRoomsCount: number;
  totalRoomsCount: number;
  totalActiveReservations: number;
}

export interface MonthlyReport {
  month: string;
  revenue: number;
  bookingsCount: number;
  occupiedNights: number;
}
