import { createSlice } from "@reduxjs/toolkit";

//  Load stored values from localStorage (client-side only)
const isClient = typeof window !== "undefined";
const initialState = {
  token: isClient ? localStorage.getItem("token") : null,
  username: isClient ? localStorage.getItem("username") : null,
  role: isClient ? localStorage.getItem("role") : null, //  Store role
  isAuthenticated: !!(isClient && localStorage.getItem("token")),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    //  Set Authentication Data (Token, Username, Role)
    setAuth: (state, action) => {
      state.token = action.payload?.token || null;
      state.username = action.payload?.username || null;
      state.role = action.payload?.role || null; //  Store role in state
      state.isAuthenticated = !!state.token;

      if (state.token) {
        localStorage.setItem("token", state.token);
        localStorage.setItem("username", state.username || "");
        localStorage.setItem("role", state.role || ""); //  Save role
      } else {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        localStorage.removeItem("role"); //  Remove role on logout
      }
    },

    //  Logout User & Clear Storage
    logout: (state) => {
      state.token = null;
      state.username = null;
      state.role = null;
      state.isAuthenticated = false;
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      localStorage.removeItem("role"); //  Remove role
    },
  },
});

export const { setAuth, logout } = authSlice.actions;
export default authSlice.reducer;
