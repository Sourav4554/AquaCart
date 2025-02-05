import express from "express"
import 'dotenv/config'
import { connectDatabase } from "./Configuration/databaseConfig.js";
import cors from "cors"
import userRouter from "./Routers/userRouter.js";

const app=express();
//port
const PORT=process.env.PORT||4000
app.use(cors())
app.use(express.json())
app.use('/api/user',userRouter)
connectDatabase();

app.get('/',(req,res)=>{
    res.send("API WORKING")
    })
//server started
app.listen(PORT,()=>{console.log(`http://localhost:${PORT}`)})