import express from 'express'
import { authMiddleware } from '../Middlewares/auth.js';
import { adminAuthMiddleware } from '../Middlewares/adminAuth.js';
import { cashOnDelivery, fetchAdminorder, fetchUserorder, updateStatus} from '../Controllers/orderController.js';

const orderRouter=express.Router();

orderRouter.post('/cod',authMiddleware,cashOnDelivery);
orderRouter.get('/userorder',authMiddleware,fetchUserorder);
orderRouter.get('/adminorder',adminAuthMiddleware,fetchAdminorder);
orderRouter.post('/status',adminAuthMiddleware,updateStatus);
export default orderRouter;