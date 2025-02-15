import epress from 'express'
import { upload } from '../Middlewares/uploadFile.js';
import { addFish, deleteFish, listFish, updateFish } from '../Controllers/fishController.js';
import { adminAuthMiddleware } from '../Middlewares/adminAuth.js';
const fishRouter=epress.Router();

fishRouter.post('/upload',adminAuthMiddleware,upload.single('image'),addFish);
fishRouter.get('/list-fish',listFish);
fishRouter.delete('/remove-fish',adminAuthMiddleware,deleteFish);
fishRouter.put('/update-fish',adminAuthMiddleware,upload.single('image'),updateFish);
export default fishRouter;