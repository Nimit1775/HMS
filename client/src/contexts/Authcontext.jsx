import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api.js";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const username = localStorage.getItem("username");
    const token = localStorage.getItem("token");
    if (username && token) setUser({ username });
  }, []);

  // ✅ Login
  const login = async (form) => {
    const res = await api.post("/auth/login", form);
    const token = res.data.token || "dummy";
    localStorage.setItem("username", form.username);
    localStorage.setItem("token", token);
    setUser({ username: form.username });
    navigate("/");
  };

  // ✅ Register
  const register = async (form) => {
    await api.post("/auth/register", form);
    // auto-login after registration
    await login(form);
  };

  const logout = () => {
    localStorage.clear();
    setUser(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
