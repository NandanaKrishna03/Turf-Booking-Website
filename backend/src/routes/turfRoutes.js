import e from "express";
import { addTurf, deleteTurf, findTurfByCategory, findTurfById, getMyTurfs, getTurfDetails, getTurfs, getTurfsByManager, updateTurf } from "../controllers/turfController.js";
import { managerAuth } from "../middlewares/managerAuth.js";
import { upload } from "../middlewares/multer.js";
import { turfAuth } from "../middlewares/turfAuth.js";

const router=e.Router()



router.get('/get-turf',managerAuth,getTurfs)

router.get('/turfDetails/:id',getTurfDetails)

router.post('/add-turf',managerAuth,upload.single("image"),addTurf)

router.put('/update-turf/:id',managerAuth,upload.single("image"),updateTurf)

router.delete('/delete-turf/:id',managerAuth,deleteTurf)



router.get('/find-turf-by-id/:id',managerAuth,findTurfById)

router.get('/find-turf-by-category/:category',findTurfByCategory)
router.get("/turfsofmanager", managerAuth,getTurfsByManager);


export {router as turfRouter}




