import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: null,
  user: {
    name: 'Aarav Rao',
    role: 'Premium Client',
    lastLogin: 'Today, 08:42 AM',
  },
  error: null,
};

const sanitizeUser = (user) => ({
  ...(user || {}),
  name: user?.name || initialState.user.name,
  role: user?.role || initialState.user.role,
  lastLogin: user?.lastLogin || initialState.user.lastLogin,
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginRequest: (state) => {
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.token = action.payload?.token || null;
      state.user = sanitizeUser(action.payload?.user);
      state.error = null;
    },
    loginFailure: (state, action) => {
      state.token = null;
      state.error = action.payload;
    },
    logout: (state) => {
      state.token = null;
      state.user = { ...initialState.user };
      state.error = null;
    },
  },
});

export const { loginRequest, loginSuccess, loginFailure, logout } = authSlice.actions;
export default authSlice.reducer;
