import { db } from "../db.js";
export const getAllRooms = (req, res) => {
  const q = `
    SELECT 
      room_id,
      room_number,
      room_type AS type,
      price_per_night AS price,
      status
    FROM rooms
  `;

  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json(data);
  });
};

export const getDashboardStats = (req, res) => {
  const queries = {
    totalRooms: "SELECT COUNT(*) as count FROM rooms",
    availableRooms: "SELECT COUNT(*) as count FROM rooms WHERE status='available'",
    occupiedRooms: "SELECT COUNT(*) as count FROM rooms WHERE status='occupied'",
    currentGuests: "SELECT COUNT(*) as count FROM bookings WHERE CURDATE() BETWEEN check_in AND check_out"
  };

  const stats = {};
  let completed = 0;

  Object.keys(queries).forEach((key) => {
    db.query(queries[key], (err, data) => {
      if (err) return res.status(500).json(err);
      stats[key] = data[0].count;
      completed++;
      
      if (completed === Object.keys(queries).length) {
        return res.json(stats);
      }
    });
  });
};

export const addRoom = (req, res) => {
  const { room_number, type, price } = req.body;

  if (!room_number || !type || !price) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const q = `
    INSERT INTO rooms (room_number, room_type, price_per_night, status)
    VALUES (?, ?, ?, 'available')
  `;

  db.query(q, [room_number, type, price], (err, result) => {
    if (err) return res.status(500).json(err);

    return res.json({ 
      message: "✅ Room added successfully!", 
      room_id: result.insertId 
    });
  });
};
