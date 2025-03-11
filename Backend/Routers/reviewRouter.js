import express from 'express'
import { addReview, listReview } from '../Controllers/reviewController.js';
import { authMiddleware } from '../Middlewares/auth.js';

const reviewRouter=express.Router();

reviewRouter.post('/add',authMiddleware,addReview);
reviewRouter.get('/list',listReview)

export default reviewRouter;