import express from 'express';
import { getAllRooms } from '../controller/Roomcontroller.js';
const Roomrouter = express.Router();

Roomrouter.get("/" , getAllRooms) ; 
export default Roomrouter ;
 