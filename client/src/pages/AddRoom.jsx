import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";   // ✅ ADD THIS

const AddRoom = () => {
  const navigate = useNavigate();                // ✅ ADD THIS

  const [form, setForm] = useState({
    room_number: "",
    type: "",
    price: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await axios.post("http://localhost:8800/rooms/add", form);
      
      setMessage("✅ Room added successfully!");

      // Redirect after 1 second
      setTimeout(() => {
        navigate("/rooms");                     // ✅ REDIRECT HERE
      }, 800);

    } catch (err) {
      console.error(err);
      setMessage("❌ Failed to add room.");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 p-6">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-blue-600 mb-6 text-center">
          Add New Room
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* ROOM NUMBER */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Room Number
            </label>
            <input
              type="text"
              name="room_number"
              value={form.room_number}
              onChange={handleChange}
              placeholder="101"
              className="w-full border rounded-lg px-4 py-2 mt-1"
              required
            />
          </div>

          {/* ROOM TYPE */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Room Type
            </label>
            <select
              name="type"
              value={form.type}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2 mt-1"
              required
            >
              <option value="">Select Type</option>
              <option value="single">Single</option>
              <option value="double">Double</option>
              <option value="suite">Suite</option>
              <option value="deluxe">Deluxe</option>
            </select>
          </div>

          {/* PRICE */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Price Per Night (₹)
            </label>
            <input
              type="number"
              name="price"
              value={form.price}
              onChange={handleChange}
              placeholder="2500"
              className="w-full border rounded-lg px-4 py-2 mt-1"
              required
            />
          </div>

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition"
          >
            ➕ Add Room
          </button>
        </form>

        {message && (
          <p className="text-center mt-4 font-medium text-blue-700">
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default AddRoom;
