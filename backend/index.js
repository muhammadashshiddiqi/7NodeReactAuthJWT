import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import db from "./config/database.js";
import router from "./routes/index.js";

dotenv.config();
const app = express();

try {
    await db.authenticate();
    console.log('Database Connected ...');
} catch (error) {
    console.log('Database Errors Connect', error);    
}

app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(cookieParser());
app.use(express.json());
app.use(router);
app.listen(4000, ()=> console.log('Server Running in port 4000'));
