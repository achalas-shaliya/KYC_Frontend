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
  } catch (error: any) {
    console.error("Login failed:", error.response?.data?.message || error.message);
  }
};


//  Register API Call
export const register = (email: string, password: string, role: string, name?: string) => async (dispatch: AppDispatch) => {
  try {
    const res = await api.post<AuthResponse>("/auth/register", { email, password, role, name });

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
  } catch (error: any) {
    console.error("Registration failed:", error.response?.data?.message || error.message);
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
    console.error("Error during logout:", error);
  }
};

