import api from "@/utils/axiosInstance";
import { setAuth } from "@/redux/reducers/authReducer";
import { AppDispatch } from "@/redux/store";

interface AuthResponse {
  token: string;
  user: {
    id: number;
    email: string;
    role: string; //  Include role (admin, manager, customer)
  };
}

//  Login API Call
export const login = (email: string, password: string) => async (dispatch: AppDispatch) => {
  try {
    const res = await api.post<AuthResponse>("/auth/login", { email, password });

    if (res.data.token) {
      const { token, user } = res.data;

      dispatch(setAuth({ token, email: user.email, role: user.role }));

      //  Redirect user based on role
      if (user.role === "admin" || user.role === "manager") {
        window.location.href = "/dashboard";
      } else {
        window.location.href = "/";
      }
    }
  } catch (error) {
    const err = error as any;
    console.error("Error updating customer status:", err.response?.data?.message || err.message);
  }
};


//  Register API Call
export const register = (email: string, password: string, role: string, name?: string, document?: string) => async (dispatch: AppDispatch) => {
  try {
    const res = await api.post<AuthResponse>("/auth/register", { email, password, role, name, document });

    if (res.data.token) {
      const { token, user } = res.data;

      dispatch(setAuth({ token, email: user.email, role: user.role }));

      //  Redirect user based on role
      if (user.role === "admin" || user.role === "manager") {
        window.location.href = "/dashboard";
      } else {
        window.location.href = "/";
      }
    }
  } catch (error) {
    const err = error as any;
    console.error("Error updating customer status:", err.response?.data?.message || err.message);
  }
};

//  Logout & Clear Storage
export const logout = () => (dispatch: AppDispatch) => {
  try {
    //  Remove everything from localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("role");

    //  Dispatch logout action to clear Redux state
    dispatch(logout());

    //  Redirect to login page after logout
    window.location.href = "/login";
  } catch (error) {
    const err = error as any;
    console.error("Error updating customer status:", err.response?.data?.message || err.message);
  }
};

