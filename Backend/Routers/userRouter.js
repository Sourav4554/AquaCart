import express from 'express'
import { Register, verifyEmail,Login } from '../Controllers/userController.js';
const userRouter=express.Router();

userRouter.post('/register',Register);
userRouter.post('/verify-email',verifyEmail);
userRouter.post('/login',Login)

export default userRouter;