import epress from 'express'
import { upload } from '../Middlewares/uploadFile.js';
import { addFish, deleteFish, listFish, updateFish } from '../Controllers/fishController.js';
const fishRouter=epress.Router();

fishRouter.post('/upload',upload.single('image'),addFish);
fishRouter.get('/list-fish',listFish);
fishRouter.delete('/remove-fish',deleteFish);
fishRouter.put('/update-fish',upload.single('image'),updateFish);
export default fishRouter;