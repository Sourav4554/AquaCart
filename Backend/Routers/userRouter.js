import express from 'express'
import { Register, verifyEmail,Login,forgottPassword,verifyResetPasswordOtp,resetPassword} from '../Controllers/userController.js';
const userRouter=express.Router();

userRouter.post('/register',Register);
userRouter.post('/verify-email',verifyEmail);
userRouter.post('/login',Login);
userRouter.post('/forgott-password',forgottPassword);
userRouter.post('/verify-otp',verifyResetPasswordOtp)
userRouter.post('/reset-password',resetPassword)
export default userRouter;