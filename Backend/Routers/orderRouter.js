import express from 'express'
import { authMiddleware } from '../Middlewares/auth.js';
import { cashOnDelivery } from '../Controllers/orderController.js';

const orderRouter=express.Router();

orderRouter.post('/cod',authMiddleware,cashOnDelivery);

export default orderRouter;