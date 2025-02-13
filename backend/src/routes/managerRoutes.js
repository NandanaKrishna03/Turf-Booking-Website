import express from "express";
import { 
    deleteManager, 
    findManagerById, 
    getAllManagers, 
    getAllTurfBookingDetails, 
    logout, 
    managerLogin, 
    managerSignup, 
    updateManager 
} from "../controllers/managerController.js";
import { addTurf, deleteTurf, getMyTurfs, updateTurf } from "../controllers/turfController.js";
import { getManagerBookings } from "../controllers/bookingController.js";
import { managerAuth } from "../middlewares/managerAuth.js";
import { upload } from "../middlewares/multer.js";


const router = express.Router();

router.post("/signup", managerSignup);
router.post("/login", managerLogin);
router.get("/getAllManagers", managerAuth, getAllManagers);
router.get("/logout", managerAuth, logout);
router.put("/profile-update", managerAuth, updateManager);
router.get("/find-manager", managerAuth, findManagerById);
router.delete("/delete-manager", managerAuth, deleteManager);
router.get("/turfs", managerAuth, getMyTurfs);
router.get("/manager", managerAuth, getManagerBookings);
router.get("/getBookings", managerAuth, getAllTurfBookingDetails);

// Turf Management Routes for Managers
// router.post("/add-turf", managerAuth, upload.single("image"), addTurf);
// router.put("/update-turf/:id", managerAuth, upload.single("image"), updateTurf);
// router.delete("/delete-turf/:id", managerAuth, deleteTurf);

export { router as managerRouter };
