import express from 'express';
import { checkoutCustomer, createBooking, getAllBookings, getCurrentGuests } from '../controller/Bookingcontroller.js';
const Bookingrouter = express.Router();

Bookingrouter.post("/create" , createBooking) ; 
Bookingrouter.get("/all" , getAllBookings) ; 
Bookingrouter.post("/checkout" , checkoutCustomer) ; 
Bookingrouter.get("/current-guests" , getCurrentGuests) ;

export default Bookingrouter ;