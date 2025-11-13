import express from 'express';
import { addRoom, getAllRooms, getDashboardStats } from '../controller/Roomcontroller.js';
const Roomrouter = express.Router();

Roomrouter.get("/" , getAllRooms) ; 
Roomrouter.get("/dashboard-stats" , getDashboardStats) ; 
Roomrouter.post("/add" , addRoom) ; 
export default Roomrouter ;
 