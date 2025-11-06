import mysql from "mysql2";

export const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "nimit1775",
  database: "hotel_management"
});

db.connect(err => {
  if (err) console.log("DB Error:", err);
  else console.log("✅ MySQL Connected!");
});
