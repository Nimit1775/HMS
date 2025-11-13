import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { db } from '../db.js';
import dotenv from 'dotenv';
dotenv.config();

export const register = (req, res) => {
    const {username , password }    = req.body;
    
    const hashedPassword = bcrypt.hashSync(password, 8);
    const q = "INSERT INTO admins (username, password) VALUES (?, ?)";
      db.query(q, [username, hashedPassword], (err) => {
    if (err) return res.status(500).json(err);
    return res.json({ message: "✅ Admin Registered" });
  });
};
export const login = (req, res) => {
    const { username, password } = req.body;
    const q = "SELECT * FROM admins WHERE username = ?";
    db.query(q, [username], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0) return res.status(404).json({ message: "Admin not found" }); 
    const isPasswordValid = bcrypt.compareSync(password, data[0].password);
    if (!isPasswordValid) {
        return res.status(400).json({ message: "Invalid password" });
    }
    const token = jwt.sign({ id: data[0].id }, process.env.JWT_SECRET);
    const { password: pwd, ...other } = data[0];
    res.cookie("access_token", token, {
        httpOnly: true,
    }).status(200).json({ ...other, token });
  });
};
