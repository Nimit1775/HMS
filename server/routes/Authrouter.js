//router  
import express from 'express';
import { login, register } from '../controller/Authcontroller.js';
const Authrouter = express.Router();

Authrouter.post("/register" , register) ; 
Authrouter.post("/login" , login) ; 
export default Authrouter ;
