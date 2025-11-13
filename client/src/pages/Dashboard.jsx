import { useState, useEffect } from "react";
import { useAuth } from "../contexts/Authcontext.jsx";
import { useNavigate } from "react-router-dom";
import api from "../api.js";

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalRooms: 0,
    availableRooms: 0,
    occupiedRooms: 0,
    currentGuests: 0,
  });
  const [guests, setGuests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const [statsRes, guestsRes] = await Promise.all([
        api.get("/rooms/dashboard-stats"),
        api.get("/booking/current-guests"),
      ]);
      setStats(statsRes.data);
      setGuests(guestsRes.data);
    } catch (err) {
      console.error("Error fetching dashboard data:", err);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: "Total Rooms",
      value: stats.totalRooms,
      icon: "🏨",
      bgColor: "from-blue-500 to-blue-600",
    },
    {
      title: "Available Rooms",
      value: stats.availableRooms,
      icon: "✅",
      bgColor: "from-green-500 to-green-600",
    },
    {
      title: "Occupied Rooms",
      value: stats.occupiedRooms,
      icon: "🔒",
      bgColor: "from-orange-500 to-orange-600",
    },
    {
      title: "Current Guests",
      value: stats.currentGuests,
      icon: "👥",
      bgColor: "from-purple-500 to-purple-600",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Admin Dashboard</h1>
              <p className="text-xs sm:text-sm text-gray-500">Welcome back, {user?.username}</p>
            </div>
            <div className="flex items-center gap-2 sm:gap-4 w-full sm:w-auto">
              <button
                onClick={() => navigate("/rooms")}
                className="bg-blue-500 hover:bg-blue-600 text-white px-3 sm:px-4 py-2 rounded-lg text-sm font-medium transition-colors flex-1 sm:flex-initial"
              >
                Rooms
              </button>
              <button
                onClick={() => navigate("/bookings")}
                className="bg-purple-500 hover:bg-purple-600 text-white px-3 sm:px-4 py-2 rounded-lg text-sm font-medium transition-colors flex-1 sm:flex-initial"
              >
                Bookings
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
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
              {statCards.map((card, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl sm:rounded-2xl shadow-lg overflow-hidden transform transition-transform hover:scale-105"
                >
                  <div className={`bg-gradient-to-br ${card.bgColor} p-4 sm:p-6 text-white`}>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs sm:text-sm opacity-90 font-medium">{card.title}</p>
                        <h3 className="text-3xl sm:text-4xl font-bold mt-1 sm:mt-2">{card.value}</h3>
                      </div>
                      <div className="text-4xl sm:text-5xl opacity-80">{card.icon}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Guests Table */}
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-4 sm:px-6 py-3 sm:py-4">
                <h2 className="text-lg sm:text-xl font-bold text-white">Guests Staying Today</h2>
              </div>
              
              {guests.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-5xl sm:text-6xl mb-4">🏖️</div>
                  <p className="text-gray-500 text-base sm:text-lg">No guests staying today</p>
                </div>
              ) : (
                <>
                  {/* Desktop Table View */}
                  <div className="hidden md:block overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                            Booking ID
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                            Guest Name
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                            Phone
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                            Room Number
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                            Check In
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                            Check Out
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {guests.map((guest) => (
                          <tr
                            key={guest.booking_id}
                            className="hover:bg-gray-50 transition-colors"
                          >
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              #{guest.booking_id}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                              {guest.name}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                              {guest.phone}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-blue-600">
                              {guest.room_number}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                              {new Date(guest.check_in).toLocaleDateString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                              {new Date(guest.check_out).toLocaleDateString()}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Mobile Card View */}
                  <div className="md:hidden divide-y divide-gray-200">
                    {guests.map((guest) => (
                      <div key={guest.booking_id} className="p-4 hover:bg-gray-50 transition-colors">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <div className="text-xs text-gray-500 mb-1">Booking ID</div>
                            <div className="text-sm font-bold text-gray-900">#{guest.booking_id}</div>
                          </div>
                          <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-semibold">
                            Room {guest.room_number}
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <div>
                            <div className="text-xs text-gray-500">Guest Name</div>
                            <div className="text-sm font-medium text-gray-900">{guest.name}</div>
                          </div>
                          
                          <div>
                            <div className="text-xs text-gray-500">Phone</div>
                            <div className="text-sm text-gray-700">{guest.phone}</div>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4 pt-2 border-t border-gray-100">
                            <div>
                              <div className="text-xs text-gray-500">Check In</div>
                              <div className="text-sm font-medium text-gray-900">
                                {new Date(guest.check_in).toLocaleDateString()}
                              </div>
                            </div>
                            <div>
                              <div className="text-xs text-gray-500">Check Out</div>
                              <div className="text-sm font-medium text-gray-900">
                                {new Date(guest.check_out).toLocaleDateString()}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}