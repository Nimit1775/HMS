import express, { Router } from 'express';
import { createBooking, getAllBookings } from '../controller/Bookingcontroller.js';
import e from 'express';
const Bookingrouter = express.Router();

Bookingrouter.post("/create" , createBooking) ; 
Bookingrouter.get("/all" , getAllBookings) ; 

export default Bookingrouter ;