import express from "express";
import { 
  createBooking, 
  getUserBookings, 
  
  cancelBooking, 
  updateBookingStatus
} from "../controllers/bookingController.js";
import { managerAuth } from "../middlewares/managerAuth.js";
import { userAuth } from "../middlewares/userAuth.js";


const router = express.Router();

// 🏆 Route to create a booking
router.post("/create", userAuth, createBooking);

// 🏆 Route to get all bookings for a user
router.get("/user", userAuth, getUserBookings);

// 🏆 Route to get all bookings for a manager (turf owner)


// 🏆 Route to cancel a booking
router.delete("/cancel/:bookingId", userAuth, cancelBooking);
router.put("/update-status/:bookingId", updateBookingStatus);

export {router as bookingRouter}
