import e from "express";
import { 
  addTurf, 
  deleteTurf, 
  findTurfByCategory, 
  findTurfById, 
  getMyTurfs, 
  getTurfDetails, 
  getTurfs, 
  getTurfsByManager, 
  updateTurf 
} from "../controllers/turfController.js";
import { managerAuth } from "../middlewares/managerAuth.js";
import { upload } from "../middlewares/multer.js";

const router = e.Router();

// ✅ Place OPTIONS handler at the TOP to handle preflight requests properly
router.options("*", (req, res) => {
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.status(200).end();
});

// Turf Routes
router.get('/get-turf', getTurfs);
router.get('/turfDetails/:id', getTurfDetails);
router.post('/add-turf', managerAuth, upload.single("image"), addTurf);
router.post('/update-turf/:id', managerAuth, upload.single("image"), updateTurf);
router.post('/delete-turf/:id', managerAuth, deleteTurf);
router.get('/find-turf-by-id/:id', managerAuth, findTurfById);
router.get('/find-turf-by-category/:category', findTurfByCategory);
router.get("/turfsofmanager", managerAuth, getTurfsByManager);

export { router as turfRouter };
