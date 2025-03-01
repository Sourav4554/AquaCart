import express from 'express'
import { authMiddleware } from '../Middlewares/auth.js';
import { adminAuthMiddleware } from '../Middlewares/adminAuth.js';
import { cashOnDelivery, fetchAdminorder, fetchUserorder, stripePayment, updateStatus, verifyOrder} from '../Controllers/orderController.js';

const orderRouter=express.Router();

orderRouter.post('/cod',authMiddleware,cashOnDelivery);
orderRouter.get('/userorder',authMiddleware,fetchUserorder);
orderRouter.get('/adminorder',adminAuthMiddleware,fetchAdminorder);
orderRouter.post('/status',adminAuthMiddleware,updateStatus);
orderRouter.post('/stripe',authMiddleware,stripePayment);
orderRouter.post('/verify',verifyOrder);
export default orderRouter;