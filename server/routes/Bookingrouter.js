import express, { Router } from 'express';
import { checkoutCustomer, createBooking, getAllBookings, getCurrentGuests } from '../controller/Bookingcontroller.js';
import e from 'express';
const Bookingrouter = express.Router();

Bookingrouter.post("/create" , createBooking) ; 
Bookingrouter.get("/all" , getAllBookings) ; 
Bookingrouter.post("/checkout" , checkoutCustomer) ; 
Bookingrouter.get("/current" , getCurrentGuests) ;

export default Bookingrouter ;