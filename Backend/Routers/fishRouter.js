import epress from 'express'
import { upload } from '../Middlewares/uploadFile.js';
import { addFish, deleteFish, listFish } from '../Controllers/fishController.js';
const fishRouter=epress.Router();

fishRouter.post('/upload',upload.single('image'),addFish);
fishRouter.get('/list-fish',listFish);
fishRouter.delete('/remove-fish',deleteFish);
export default fishRouter;