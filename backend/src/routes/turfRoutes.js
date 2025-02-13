import e from "express";
import { addTurf, deleteTurf, findTurfByCategory, findTurfById, getMyTurfs, getTurfDetails, getTurfs, updateTurf } from "../controllers/turfController.js";
import { managerAuth } from "../middlewares/managerAuth.js";
import { upload } from "../middlewares/multer.js";
import { turfAuth } from "../middlewares/turfAuth.js";

const router=e.Router()



router.get('/get-turf',getTurfs)

router.get('/turfDetails/:id',getTurfDetails)

router.post('/add-turf',managerAuth,upload.single("image"),addTurf)

router.put('/update-turf/:id',turfAuth,upload.single("image"),updateTurf)

router.delete('/delete-turf/:id',turfAuth,deleteTurf)



router.get('/find-turf-by-id/:id',findTurfById)

router.get('/find-turf-by-category/:category',findTurfByCategory)



export {router as turfRouter}




