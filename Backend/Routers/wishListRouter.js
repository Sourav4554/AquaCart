import express from 'express'
import { authMiddleware } from '../Middlewares/auth.js';
import { addTowish, fetchWishList, removeFromWish } from '../Controllers/wishListController.js';

const wishListRouter=express.Router();

wishListRouter.post('/add',authMiddleware,addTowish);
wishListRouter.delete('/remove',authMiddleware,removeFromWish);
wishListRouter.get('/fetch',authMiddleware,fetchWishList);
export default wishListRouter;