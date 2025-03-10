import express from "express"
import 'dotenv/config'
import { connectDatabase } from "./Configuration/databaseConfig.js";
import cors from "cors"
import userRouter from "./Routers/userRouter.js";
import fishRouter from "./Routers/fishRouter.js";
import adminRouter from "./Routers/adminRoute.js";
import cartRouter from "./Routers/cartRouter.js";
import wishListRouter from "./Routers/wishListRouter.js";
import promocodeRouter from "./Routers/promocodeRouter.js";
import orderRouter from "./Routers/orderRouter.js";
import { aquaAIRouter } from "./Routers/aquaAIRouter.js";

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
//end point for cart
app.use('/api/cart',cartRouter)
//end point for wishlist
app.use('/api/wish',wishListRouter)
//end point for promocode
app.use('/api/promo',promocodeRouter)
//end point for aquaai
app.use('/api/ai',aquaAIRouter)
//end point for order
app.use('/api/order',orderRouter)
app.get('/',(req,res)=>{
    res.send("API WORKING")
    })
//server started
app.listen(PORT,()=>{console.log(`http://localhost:${PORT}`)})