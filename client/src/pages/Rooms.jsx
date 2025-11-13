import { useState, useEffect } from "react";
import { useAuth } from "../contexts/Authcontext.jsx";
import api from "../api.js";
import { useNavigate } from "react-router-dom";

export default function Rooms() {
  const { user, logout } = useAuth();
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all"); // all, available, occupied
  const navigate = useNavigate();

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    setLoading(true);
    try {
      const response = await api.get("/rooms");
      setRooms(response.data);
    } catch (err) {
      console.error("Error fetching rooms:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleBook = (roomId, roomNumber) => {
    navigate(`/book?room_id=${roomId}&room_number=${roomNumber}`);
  };

  const filteredRooms = rooms.filter((room) => {
    if (filter === "available") return room.status === "available";
    if (filter === "occupied") return room.status === "occupied";
    return true;
  });

  const getStatusBadge = (status) => {
    const styles = {
      available: "bg-green-100 text-green-800 border-green-200",
      occupied: "bg-red-100 text-red-800 border-red-200",
      maintenance: "bg-yellow-100 text-yellow-800 border-yellow-200",
    };
    return (
      <span
        className={`px-2 sm:px-3 py-1 rounded-full text-xs font-semibold border ${
          styles[status] || "bg-gray-100 text-gray-800 border-gray-200"
        }`}
      >
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const getRoomTypeIcon = (type) => {
    const icons = {
      single: "🛏️",
      double: "🛏️🛏️",
      suite: "👑",
      deluxe: "✨",
    };
    return icons[type.toLowerCase()] || "🏨";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0">
            <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto">
              <button
                onClick={() => navigate("/dashboard")}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 p-2 rounded-lg transition-colors flex-shrink-0"
                title="Dashboard"
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </button>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Room Management</h1>
                <p className="text-xs sm:text-sm text-gray-500">View and manage all hotel rooms</p>
              </div>
            </div>
            <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
              <button
                onClick={() => navigate("/add")}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-3 sm:px-5 py-2 rounded-lg text-sm font-medium transition-all transform hover:scale-105 shadow-md hover:shadow-lg flex items-center gap-1 sm:gap-2 flex-1 sm:flex-initial justify-center"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                <span className="hidden sm:inline">Add Room</span>
                <span className="sm:hidden">Add</span>
              </button>
              <button
                onClick={logout}
                className="bg-red-500 hover:bg-red-600 text-white px-3 sm:px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        {/* Filter Tabs */}
        <div className="mb-4 sm:mb-6 flex flex-col sm:flex-row gap-2 sm:gap-3">
          <button
            onClick={() => setFilter("all")}
            className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg text-sm font-medium transition-all ${
              filter === "all"
                ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
            }`}
          >
            All Rooms ({rooms.length})
          </button>
          <button
            onClick={() => setFilter("available")}
            className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg text-sm font-medium transition-all ${
              filter === "available"
                ? "bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg"
                : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
            }`}
          >
            Available ({rooms.filter((r) => r.status === "available").length})
          </button>
          <button
            onClick={() => setFilter("occupied")}
            className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg text-sm font-medium transition-all ${
              filter === "occupied"
                ? "bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg"
                : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
            }`}
          >
            Occupied ({rooms.filter((r) => r.status === "occupied").length})
          </button>
        </div>

        {/* Rooms Table/Cards */}
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-4 sm:px-6 py-3 sm:py-4">
              <h2 className="text-lg sm:text-xl font-bold text-white">
                {filter === "all"
                  ? "All Rooms"
                  : filter === "available"
                  ? "Available Rooms"
                  : "Occupied Rooms"}
              </h2>
            </div>

            {filteredRooms.length === 0 ? (
              <div className="text-center py-12 sm:py-16">
                <div className="text-5xl sm:text-6xl mb-4">🏨</div>
                <p className="text-gray-500 text-base sm:text-lg">No rooms found</p>
              </div>
            ) : (
              <>
                {/* Desktop Table View */}
                <div className="hidden md:block overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                          Room Number
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                          Type
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                          Price
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {filteredRooms.map((room) => (
                        <tr
                          key={room.room_id}
                          className="hover:bg-gray-50 transition-colors"
                        >
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <span className="text-2xl mr-3">
                                {getRoomTypeIcon(room.type)}
                              </span>
                              <span className="text-sm font-bold text-gray-900">
                                Room {room.room_number}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="text-sm font-medium text-gray-700">
                              {room.type.charAt(0).toUpperCase() + room.type.slice(1)}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="text-sm font-bold text-blue-600">
                              ${room.price}
                              <span className="text-gray-500 font-normal">/night</span>
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {getStatusBadge(room.status)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {room.status === "available" ? (
                              <button
                                onClick={() => handleBook(room.room_id, room.room_number)}
                                className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-5 py-2 rounded-lg font-medium transition-all transform hover:scale-105 shadow-md hover:shadow-lg"
                              >
                                📅 Book Now
                              </button>
                            ) : (
                              <span className="text-sm text-gray-400 font-medium">
                                Not Available
                              </span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Mobile Card View */}
                <div className="md:hidden divide-y divide-gray-200">
                  {filteredRooms.map((room) => (
                    <div key={room.room_id} className="p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <span className="text-3xl">
                            {getRoomTypeIcon(room.type)}
                          </span>
                          <div>
                            <div className="text-base font-bold text-gray-900">
                              Room {room.room_number}
                            </div>
                            <div className="text-sm font-medium text-gray-600">
                              {room.type.charAt(0).toUpperCase() + room.type.slice(1)}
                            </div>
                          </div>
                        </div>
                        {getStatusBadge(room.status)}
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="text-base font-bold text-blue-600">
                          ${room.price}
                          <span className="text-gray-500 text-sm font-normal">/night</span>
                        </div>
                        {room.status === "available" ? (
                          <button
                            onClick={() => handleBook(room.room_id, room.room_number)}
                            className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all shadow-md"
                          >
                            📅 Book Now
                          </button>
                        ) : (
                          <span className="text-sm text-gray-400 font-medium">
                            Not Available
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        )}

        {/* Summary Stats */}
        {!loading && rooms.length > 0 && (
          <div className="mt-4 sm:mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
            <div className="bg-white rounded-xl shadow-md p-4 sm:p-5 border-l-4 border-blue-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm text-gray-600 font-medium">Total Rooms</p>
                  <p className="text-2xl sm:text-3xl font-bold text-gray-800 mt-1">
                    {rooms.length}
                  </p>
                </div>
                <div className="text-3xl sm:text-4xl">🏨</div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-md p-4 sm:p-5 border-l-4 border-green-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm text-gray-600 font-medium">Available Now</p>
                  <p className="text-2xl sm:text-3xl font-bold text-green-600 mt-1">
                    {rooms.filter((r) => r.status === "available").length}
                  </p>
                </div>
                <div className="text-3xl sm:text-4xl">✅</div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-md p-4 sm:p-5 border-l-4 border-red-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm text-gray-600 font-medium">Occupied</p>
                  <p className="text-2xl sm:text-3xl font-bold text-red-600 mt-1">
                    {rooms.filter((r) => r.status === "occupied").length}
                  </p>
                </div>
                <div className="text-3xl sm:text-4xl">🔒</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}