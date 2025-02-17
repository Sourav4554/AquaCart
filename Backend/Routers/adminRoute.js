import express from 'express'

import { adminLogin, fetchAllUsers } from '../Controllers/adminController.js';
import { adminAuthMiddleware } from '../Middlewares/adminAuth.js';

const adminRouter=express.Router();
adminRouter.post('/login',adminLogin);
adminRouter.post('/users',adminAuthMiddleware,fetchAllUsers)

export default adminRouter