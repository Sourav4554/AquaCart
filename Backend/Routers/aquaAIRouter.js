import express from 'express'
import { generatePromt } from '../Controllers/aquaAIController.js';
const aquaAIRouter=express.Router();

aquaAIRouter.post('/answer',generatePromt)

export {aquaAIRouter}