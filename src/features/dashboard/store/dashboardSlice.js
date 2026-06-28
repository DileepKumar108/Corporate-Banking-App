import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: {
    totalAssets: 0,
    activeAccounts: 0,
    recentTransactions: []
  },
  loading: false,
  error: null,
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    // Triggers the loading state in the UI
    fetchDashboardStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    // Updates the store with data received from the Saga/API
    fetchDashboardSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    // Captures API errors for UI display
    fetchDashboardFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchDashboardStart, fetchDashboardSuccess, fetchDashboardFailure } = dashboardSlice.actions;
export default dashboardSlice.reducer;