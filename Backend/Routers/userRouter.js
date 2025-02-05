import express from 'express'
import { Register, verifyEmail } from '../Controllers/userController.js';
const userRouter=express.Router();

userRouter.post('/register',Register);
userRouter.post('/verify-email',verifyEmail)

export default userRouter;