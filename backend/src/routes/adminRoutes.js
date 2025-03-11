import express from "express";
import { 
    registerAdmin, 
    loginAdmin, 
    
    getAllUsers, 
    getAllTurfs, 
    getAllBookings, 
    adminLogout, 
    deleteUser,
    deleteManager,
    deleteTurf,
    deleteBooking
} from "../controllers/adminController.js";
import { adminAuth } from "../middlewares/adminAuth.js";
import { getAllManagers } from "../controllers/managerController.js";


const router = express.Router();

// Admin authentication routes
router.post("/register", registerAdmin);
router.post("/login", loginAdmin);
router.post("/logout", adminLogout);

// Admin data retrieval routes (protected)
router.get("/getAllManagers", adminAuth, getAllManagers);
router.get("/user", adminAuth, getAllUsers);
router.get("/turfs", adminAuth, getAllTurfs);
router.get("/bookings", adminAuth, getAllBookings);

router.delete("/user/:userId", adminAuth, deleteUser); 
router.delete("/manager/:managerId", adminAuth, deleteManager);
router.delete("/turf/:turfId", adminAuth, deleteTurf);
router.delete("/booking/:bookingId", adminAuth, deleteBooking);
export { router as AdminRouter };
