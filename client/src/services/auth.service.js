import api from "./api";
import TokenService from "./token.service";

const API_URL = import.meta.env.VITE_AUTH_API;

// ✅ Register (signup)
const register = async (formData) => {
  try {
    const response = await api.post(`${API_URL}/signup`, formData, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error) {
    console.error("Signup error:", error.response?.data || error.message);
    throw error.response?.data || error;
  }
};

// ✅ Login (signin)
const login = async (email, password) => {
  try {
    const response = await api.post(`${API_URL}/signin`, { email, password }, {
      headers: { "Content-Type": "application/json" },
    });

    if (response.data.accessToken) {
      TokenService.setUser(response.data);
    }

    return response.data;
  } catch (error) {
    console.error("Signin error:", error.response?.data || error.message);
    throw error.response?.data || error;
  }
};

const logout = () => TokenService.removeUser();

const AuthServices = { register, login, logout };
export default AuthServices;