import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api.js";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userString = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    if (userString && token) {
      try {
        const userData = JSON.parse(userString);
        setUser(userData);
      } catch (error) {
        console.error("Error parsing user data:", error);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
      }
    }
  }, []);

  // ✅ Login
  const login = async (form) => {
    try {
      const res = await api.post("/auth/login", form);
      // The server returns user data with token in cookie
      const userData = res.data;

      // Store user data in localStorage
      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("token", "authenticated"); // Server uses httpOnly cookie

      setUser(userData);
      navigate("/");
      return { success: true };
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      throw error;
    }
  };

  // ✅ Register
  const register = async (form) => {
    try {
      await api.post("/auth/register", form);
      // After successful registration, login automatically
      return await login(form);
    } catch (error) {
      console.error("Register error:", error.response?.data || error.message);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
