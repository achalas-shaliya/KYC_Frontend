import { createSlice } from "@reduxjs/toolkit";

// Load token from localStorage (client-side)
const isClient = typeof window !== "undefined";
const initialState = {
  token: isClient ? localStorage.getItem("token") : null,
  username: isClient ? localStorage.getItem("username") : null,
  isAuthenticated: !!(isClient && localStorage.getItem("token")),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action) => {
      state.token = action.payload?.token || null;
      state.username = action.payload?.username || null;
      state.isAuthenticated = !!action.payload?.token;

      if (state.token) {
        localStorage.setItem("token", state.token);
        localStorage.setItem("username", state.username || "");
      } else {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
      }
    },
    logout: (state) => {
      state.token = null;
      state.username = null;
      state.isAuthenticated = false;
      localStorage.removeItem("token");
      localStorage.removeItem("username");
    },
  },
});

export const { setAuth, logout } = authSlice.actions;
export default authSlice.reducer;
