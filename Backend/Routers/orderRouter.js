import express from 'express'
import { authMiddleware } from '../Middlewares/auth.js';
import { adminAuthMiddleware } from '../Middlewares/adminAuth.js';
import { cancelOrder, cashOnDelivery, fetchAdminorder, fetchUserorder, razorpayPayment, stripePayment, updateStatus, verifyOrder, verifyRazorpay} from '../Controllers/orderController.js';

const orderRouter=express.Router();

orderRouter.post('/cod',authMiddleware,cashOnDelivery);
orderRouter.get('/userorder',authMiddleware,fetchUserorder);
orderRouter.get('/adminorder',adminAuthMiddleware,fetchAdminorder);
orderRouter.post('/status',adminAuthMiddleware,updateStatus);
orderRouter.post('/stripe',authMiddleware,stripePayment);
orderRouter.post('/verify',authMiddleware,verifyOrder);
orderRouter.post('/razorpay',authMiddleware,razorpayPayment)
orderRouter.post('/verify-razorpay',authMiddleware,verifyRazorpay)
orderRouter.post('/cancel',authMiddleware,cancelOrder)
export default orderRouter;