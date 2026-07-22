import { configureStore, createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { User, RoomType, Booking, AuditLog, Enquiry, DashboardStats, MonthlyReport } from "./types";

// Helper to load auth from localStorage
const getInitialAuth = () => {
  const token = localStorage.getItem("dp_token");
  const userJson = localStorage.getItem("dp_user");
  if (token && userJson) {
    try {
      const user = JSON.parse(userJson) as Omit<User, "status" | "createdAt">;
      return { token, user, isAuthenticated: true, error: null as string | null };
    } catch {
      return { token: null as string | null, user: null as Omit<User, "status" | "createdAt"> | null, isAuthenticated: false, error: null as string | null };
    }
  }
  return { token: null as string | null, user: null as Omit<User, "status" | "createdAt"> | null, isAuthenticated: false, error: null as string | null };
};

// --- AUTH SLICE ---
const authSlice = createSlice({
  name: "auth",
  initialState: getInitialAuth(),
  reducers: {
    loginSuccess: (state, action: PayloadAction<{ token: string; user: Omit<User, "status" | "createdAt"> }>) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.isAuthenticated = true;
      state.error = null;
      localStorage.setItem("dp_token", action.payload.token);
      localStorage.setItem("dp_user", JSON.stringify(action.payload.user));
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
      localStorage.removeItem("dp_token");
      localStorage.removeItem("dp_user");
    }
  }
});

// --- UI VIEW SLICE ---
type ActiveTab = "HOME" | "ROOMS" | "CONFERENCE" | "ABOUT" | "CONTACT" | "BOOK_NOW" | "LOOKUP" | "ADMIN" | "MY_BOOKINGS" | "GALLERY";

interface UIState {
  currentTab: ActiveTab;
  adminTab: "RESERVATIONS" | "STATS" | "STAFF" | "ROOMS_CONTROL" | "ENQUIRIES" | "GALLERY";
}

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    currentTab: "HOME",
    adminTab: "RESERVATIONS"
  } as UIState,
  reducers: {
    setTab: (state, action: PayloadAction<ActiveTab>) => {
      state.currentTab = action.payload;
    },
    setAdminTab: (state, action: PayloadAction<"RESERVATIONS" | "STATS" | "STAFF" | "ROOMS_CONTROL" | "ENQUIRIES" | "GALLERY">) => {
      state.adminTab = action.payload;
    }
  }
});

// --- CORE DATA SLICE (ROOMS & RESERVATIONS) ---
interface CoreState {
  roomTypes: RoomType[];
  roomTypesLoading: boolean;
  selectedRoomTypeId: string | null;
  bookingSuccess: Booking | null;
  bookingError: string | null;
}

const coreSlice = createSlice({
  name: "core",
  initialState: {
    roomTypes: [],
    roomTypesLoading: false,
    selectedRoomTypeId: null,
    bookingSuccess: null,
    bookingError: null,
  } as CoreState,
  reducers: {
    setRoomTypes: (state, action: PayloadAction<RoomType[]>) => {
      state.roomTypes = action.payload;
    },
    setRoomTypesLoading: (state, action: PayloadAction<boolean>) => {
      state.roomTypesLoading = action.payload;
    },
    selectRoomType: (state, action: PayloadAction<string | null>) => {
      state.selectedRoomTypeId = action.payload;
    },
    setBookingSuccess: (state, action: PayloadAction<Booking | null>) => {
      state.bookingSuccess = action.payload;
    },
    setBookingError: (state, action: PayloadAction<string | null>) => {
      state.bookingError = action.payload;
    }
  }
});

// --- ADMIN STATE SLICE ---
interface AdminState {
  reservations: Booking[];
  auditLogs: AuditLog[];
  stats: DashboardStats | null;
  monthlyReports: MonthlyReport[];
  staff: User[];
  rooms: any[];
  enquiries: Enquiry[];
  loading: boolean;
  error: string | null;
}

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    reservations: [],
    auditLogs: [],
    stats: null,
    monthlyReports: [],
    staff: [],
    rooms: [],
    enquiries: [],
    loading: false,
    error: null,
  } as AdminState,
  reducers: {
    setAdminData: (state, action: PayloadAction<Partial<AdminState>>) => {
      return { ...state, ...action.payload };
    },
    setAdminLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setAdminError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    }
  }
});

// EXPORTS
export const { loginSuccess, logout } = authSlice.actions;
export const { setTab, setAdminTab } = uiSlice.actions;
export const { setRoomTypes, setRoomTypesLoading, selectRoomType, setBookingSuccess, setBookingError } = coreSlice.actions;
export const { setAdminData, setAdminLoading, setAdminError } = adminSlice.actions;

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    ui: uiSlice.reducer,
    core: coreSlice.reducer,
    admin: adminSlice.reducer,
  }
});

export type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;
