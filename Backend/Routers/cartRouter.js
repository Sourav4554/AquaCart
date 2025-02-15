import { addToCart, deleteCart, fetchCartData, removeFromCart } from "../Controllers/cartController.js";
import express from 'express'
import { authMiddleware } from "../Middlewares/auth.js";
const cartRouter=express.Router();

cartRouter.post('/addcart',authMiddleware,addToCart);
cartRouter.post('/removecart',authMiddleware,removeFromCart);
cartRouter.delete('/deletecart',authMiddleware,deleteCart);
cartRouter.get('/cartdata',authMiddleware,fetchCartData)
export default cartRouter;