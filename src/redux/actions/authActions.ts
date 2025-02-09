import api from "@/utils/axiosInstance";
import { setAuth } from "@/redux/reducers/authReducer";
import { AppDispatch } from "@/redux/store";

export const login = (email: string, password: string) => async (dispatch: AppDispatch) => {
  try {
    const res = await api.post("/auth/login", { email, password });

    if (res.data.token) {
      localStorage.setItem("token", res.data.token);
      dispatch(setAuth({ token: res.data.token, email }));
    }
  } catch (error:any) {
    console.error("Login failed:", error.response?.data?.message || error.message);
  }
};

export const logout = () => (dispatch: AppDispatch) => {
  localStorage.removeItem("token");
  dispatch(setAuth(null));
};
