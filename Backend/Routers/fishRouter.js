import epress from 'express'
import { upload } from '../Middlewares/uploadFile.js';
import { addFish } from '../Controllers/fishController.js';
const fishRouter=epress.Router();

fishRouter.post('/upload',upload.single('image'),addFish)

export default fishRouter;