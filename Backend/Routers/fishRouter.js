import epress from 'express'
import { upload } from '../Middlewares/uploadFile.js';
import { addFish, listFish } from '../Controllers/fishController.js';
const fishRouter=epress.Router();

fishRouter.post('/upload',upload.single('image'),addFish)
fishRouter.get('/list-fish',listFish)
export default fishRouter;