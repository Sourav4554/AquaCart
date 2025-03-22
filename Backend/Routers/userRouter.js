import express from 'express'
import { Register, verifyEmail,Login,forgottPassword,verifyResetPasswordOtp,resetPassword,resendOtp,getUserData, googleLogin} from '../Controllers/userController.js';
import { authMiddleware } from '../Middlewares/auth.js';
const userRouter=express.Router();

userRouter.post('/register',Register);
userRouter.post('/verify-email',verifyEmail);
userRouter.post('/login',Login);
userRouter.post('/forgott-password',forgottPassword);
userRouter.post('/verify-otp',verifyResetPasswordOtp);
userRouter.post('/reset-password',resetPassword);
userRouter.post('/resend-otp',resendOtp);
userRouter.post('/userdata',authMiddleware,getUserData);
userRouter.get('/google',googleLogin)
export default userRouter;