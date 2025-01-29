import express from "express"
import 'dotenv/config'
import { connectDatabase } from "./Configuration/databaseConfig.js";

const app=express();
//port
const PORT=process.env.PORT||4000

connectDatabase();

app.get('/',(req,res)=>{
    res.send("API WORKING")
    })
//server started
app.listen(PORT,()=>{console.log(`http://localhost:${PORT}`)})