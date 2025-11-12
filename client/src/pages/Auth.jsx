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
            className="w-full border rounded-md px-3 py-2"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full border rounded-md px-3 py-2"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md font-semibold"
          >
            {isLogin ? "Login" : "Register"}
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
