import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define tab types to match your component
export type TabType = "HOME" | "ROOMS" | "CONFERENCE" | "LOOKUP" | "ABOUT" | "BOOK_NOW";

// State interface
interface TabState {
  activeTab: TabType;
}

// Initial state
const initialState: TabState = {
  activeTab: "HOME",
};

// Create slice
const tabSlice = createSlice({
  name: "tab",
  initialState,
  reducers: {
    setTab: (state, action: PayloadAction<TabType>) => {
      state.activeTab = action.payload;
    },
  },
});

// Export actions
export const { setTab } = tabSlice.actions;

// Configure Redux store
export const store = configureStore({
  reducer: {
    tab: tabSlice.reducer,
  },
});

// Export types for use in components
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;