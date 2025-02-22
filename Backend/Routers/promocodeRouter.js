import express from 'express'
import { adminAuthMiddleware } from '../Middlewares/adminAuth.js';
import { addPromocode, deletePromocode, promocodeList } from '../Controllers/promocodeController.js';
const promocodeRouter=express.Router();

promocodeRouter.post('/add',adminAuthMiddleware,addPromocode);
promocodeRouter.get('/list',promocodeList)
promocodeRouter.delete('/delete',adminAuthMiddleware,deletePromocode)
export default promocodeRouter;