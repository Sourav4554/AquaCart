import express from 'express'
import { adminAuthMiddleware } from '../Middlewares/adminAuth.js';
import { addPromocode, applyPromocode, deletePromocode, promocodeList, sendPromocode } from '../Controllers/promocodeController.js';
import { authMiddleware } from '../Middlewares/auth.js';
const promocodeRouter=express.Router();

promocodeRouter.post('/add',adminAuthMiddleware,addPromocode);
promocodeRouter.get('/list',promocodeList)
promocodeRouter.delete('/delete',adminAuthMiddleware,deletePromocode);
promocodeRouter.post('/fetch',authMiddleware,sendPromocode);
promocodeRouter.post('/apply',authMiddleware,applyPromocode)
export default promocodeRouter;