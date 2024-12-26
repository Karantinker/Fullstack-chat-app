import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import path from 'path';
import {connectDB} from "./lib/db.js";
import authRoutes from './routes/auth.route.js';
import messageRoutes from './routes/message.route.js';
import { app,server } from './lib/socket.js';

const port = process.env.PORT;
const __dirname= path.resolve()

app.use(cookieParser());
app.use(express.json());
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))


dotenv.config()

app.use("/api/auth",authRoutes); 
app.use("/api/message",messageRoutes);


if(process.env.NODE_ENV==="production"){
    app.use(express.static(path.join(__dirname,"../Frontend/dist")));
    app.get("*",(req,res)=>{
        res.sendFile(path.join(__dirname,"../Frontend","dist","index.html"));
    })
}


server.listen(port,()=>{
    console.log('server is running on port :'+port);
    connectDB()
})