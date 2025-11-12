import { db } from "../db.js";

export const getAllRooms = (req, res) => {
  const q = "SELECT * FROM rooms";

  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json(data);
  });
};
