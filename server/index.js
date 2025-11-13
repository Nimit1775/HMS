import express from 'express'; 
import cors from 'cors'; 
import { db } from "./db.js";
import Authrouter from './routes/Authrouter.js' ;
import Bookingrouter from './routes/Bookingrouter.js';
import Roomrouter from './routes/RoomRouter.js';
const app = express() ; 

app.use(express.json()) ;
app.use(cors({
   origin: "*",
  credentials: true
})) ;


app.get("/", (req, res) => {
  res.send("Hotel Management Server is running");
}   ) ;
const PORT = process.env.PORT || 8800 ;

//routers 

app.use("/auth" , Authrouter) ;
app.use("/booking" , Bookingrouter) ;  
app.use("/rooms" , Roomrouter)  ;



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 

