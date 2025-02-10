import express from "express"
import 'dotenv/config'
import { connectDatabase } from "./Configuration/databaseConfig.js";
import cors from "cors"
import userRouter from "./Routers/userRouter.js";
import fishRouter from "./Routers/fishRouter.js";
import adminRouter from "./Routers/adminRoute.js";

const app=express();
//port
const PORT=process.env.PORT||4000
app.use(cors())
app.use(express.json())
//end point for user
app.use('/api/user',userRouter)
connectDatabase();
//end point for product
app.use('/api/fish',fishRouter)
//end point for admin
app.use('/api/admin',adminRouter)

app.get('/',(req,res)=>{
    res.send("API WORKING")
    })
//server started
app.listen(PORT,()=>{console.log(`http://localhost:${PORT}`)})