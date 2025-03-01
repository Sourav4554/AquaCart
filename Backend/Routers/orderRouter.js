import express from 'express'
import { authMiddleware } from '../Middlewares/auth.js';
import { cashOnDelivery, fetchUserorder } from '../Controllers/orderController.js';

const orderRouter=express.Router();

orderRouter.post('/cod',authMiddleware,cashOnDelivery);
orderRouter.get('/userorder',authMiddleware,fetchUserorder);
export default orderRouter;