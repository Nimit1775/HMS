import { db } from "../db.js";

export const createBooking = (req, res) => {
  const { name, phone, room_id, check_in, check_out } = req.body;

  // Step 1: Insert customer
  const q1 = "INSERT INTO customers (name, phone) VALUES (?, ?)";

  db.query(q1, [name, phone], (err, result) => {
    if (err) return res.status(500).json(err);

    const customer_id = result.insertId;

    // Step 2: Insert booking
    const q2 = `
      INSERT INTO bookings (customer_id, room_id, check_in, check_out)
      VALUES (?, ?, ?, ?)
    `;

    db.query(
      q2,
      [customer_id, room_id, check_in, check_out],
      (err2) => {
        if (err2) return res.status(500).json(err2);

        // Step 3: Update room status
        const q3 = "UPDATE rooms SET status='occupied' WHERE room_id=?";

        db.query(q3, [room_id], (err3) => {
          if (err3) return res.status(500).json(err3);

          return res.json({ message: "✅ Booking Successful" });
        });
      }
    );
  });
};

export const getAllBookings = (req, res) => {
  const q = `
    SELECT b.booking_id, c.name, c.phone, r.room_number,
           b.check_in, b.check_out
    FROM bookings b
    JOIN customers c ON b.customer_id = c.customer_id
    JOIN rooms r ON b.room_id = r.room_id
    ORDER BY b.booking_id DESC
  `;

  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json(data);
  });
};
