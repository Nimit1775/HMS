import { useState } from "react";
import { useAuth } from "../contexts/Authcontext.jsx";

export default function Auth() {
  const { login, register } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ username: "", password: "" });
  const [msg, setMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    setIsLoading(true);

    // Basic validation
    if (!form.username.trim() || !form.password.trim()) {
      setMsg("❌ Please fill in all fields");
      setIsLoading(false);
      return;
    }

    if (form.password.length < 6) {
      setMsg("❌ Password must be at least 6 characters");
      setIsLoading(false);
      return;
    }

    try {
      if (isLogin) {
        await login(form);
      } else {
        await register(form);
      }
    } catch (err) {
      console.error("Auth error:", err);
      const errorMessage = err.response?.data?.message ||
                         err.response?.data?.error ||
                         err.message ||
                         "❌ Authentication failed. Please try again.";
      setMsg(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-80 space-y-4">
        <h2 className="text-2xl font-bold text-center text-blue-600">
          {isLogin ? "Admin Login" : "Admin Register"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            placeholder="Username"
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            required
            minLength="3"
            disabled={isLoading}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
            minLength="6"
            disabled={isLoading}
          />
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white py-2 rounded-md font-semibold transition-colors duration-200"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {isLogin ? "Logging in..." : "Registering..."}
              </span>
            ) : (
              isLogin ? "Login" : "Register"
            )}
          </button>
        </form>

        {msg && <p className="text-center text-red-600 text-sm">{msg}</p>}

        <p className="text-center text-sm text-gray-600">
          {isLogin ? (
            <>
              Don't have an account?{" "}
              <button
                type="button"
                className="text-blue-600 hover:underline"
                onClick={() => setIsLogin(false)}
              >
                Register
              </button>
            </>
          ) : (
            <>
              Already registered?{" "}
              <button
                type="button"
                className="text-blue-600 hover:underline"
                onClick={() => setIsLogin(true)}
              >
                Login
              </button>
            </>
          )}
        </p>
      </div>
    </div>
  );
}
