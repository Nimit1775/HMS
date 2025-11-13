import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import api from "../api.js";

export default function CreateBooking() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const roomIdFromParams = searchParams.get("room_id");
  const roomNumberFromParams = searchParams.get("room_number");

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    room_id: roomIdFromParams || "",
    check_in: "",
    check_out: "",
  });

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (roomIdFromParams) {
      setFormData((prev) => ({ ...prev, room_id: roomIdFromParams }));
    }
  }, [roomIdFromParams]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const response = await api.post("/booking/create", formData);
      setSuccessMessage(response.data.message || "✅ Booking Successful");
      
      // Reset form
      setFormData({
        name: "",
        phone: "",
        room_id: roomIdFromParams || "",
        check_in: "",
        check_out: "",
      });

      // Redirect after 2 seconds
      setTimeout(() => {
        navigate("/rooms");
      }, 2000);
    } catch (err) {
      setErrorMessage(
        err.response?.data?.message || "❌ Failed to create booking"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-md border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-2xl font-bold text-gray-800">Create New Booking</h1>
          <p className="text-sm text-gray-500">Fill in the details to book a room</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Success Message */}
        {successMessage && (
          <div className="mb-6 bg-green-100 border border-green-400 text-green-700 px-6 py-4 rounded-lg shadow-md">
            <p className="font-semibold">{successMessage}</p>
          </div>
        )}

        {/* Error Message */}
        {errorMessage && (
          <div className="mb-6 bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-lg shadow-md">
            <p className="font-semibold">{errorMessage}</p>
          </div>
        )}

        {/* Booking Form */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Customer Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Customer Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Enter customer name"
              />
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Enter phone number"
              />
            </div>

            {/* Room Number (Read-only, auto-filled) */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Room Number
              </label>
              <input
                type="text"
                value={roomNumberFromParams ? `Room ${roomNumberFromParams}` : ""}
                readOnly
                className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg text-gray-600 cursor-not-allowed"
                placeholder="Room will be auto-filled"
              />
              <input
                type="hidden"
                name="room_id"
                value={formData.room_id}
              />
            </div>

            {/* Check-in Date */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Check-in Date
              </label>
              <input
                type="date"
                name="check_in"
                value={formData.check_in}
                onChange={handleChange}
                required
                min={new Date().toISOString().split("T")[0]}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>

            {/* Check-out Date */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Check-out Date
              </label>
              <input
                type="date"
                name="check_out"
                value={formData.check_out}
                onChange={handleChange}
                required
                min={formData.check_in || new Date().toISOString().split("T")[0]}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>

            {/* Submit Button */}
            <div className="flex gap-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-all transform hover:scale-105 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {loading ? "Booking..." : "📅 Submit Booking"}
              </button>
              <button
                type="button"
                onClick={() => navigate("/rooms")}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-100 transition-all"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}