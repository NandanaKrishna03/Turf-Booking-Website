import { BookingModel } from "../models/booking.js";
import  Turf from "../models/turf.js";

export const createBooking = async (req, res) => {
  try {
    const { turfId, date, timeSlot, price } = req.body;
    const userId = req.user.id; // Get logged-in user ID

    if (!date || !timeSlot) {
      return res.status(400).json({ message: "Time Slot and Date are required." });
    }

    console.log("Incoming request body:", req.body); // Debugging

    // ✅ Check if Turf exists
    const turf = await Turf.findById(turfId);
    if (!turf) {
      console.log("Turf not found for ID:", turfId); // Debugging
      return res.status(404).json({ message: "Turf not found" });
    }

    // ✅ Create new booking
    const newBooking = new BookingModel({ turf: turfId, user: userId, date, timeSlot, price });
    await newBooking.save();

    console.log("Booking created successfully:", newBooking); // Debugging
    return res.status(201).json({ message: "Booking successful", booking: newBooking });
  } catch (error) {
    console.error("Error in createBooking:", error); // Debugging
    return res.status(500).json({ message: error.message || "Internal server error" });
  }
};
// 🏆 Fetch all bookings for a user
export const getUserBookings = async (req, res) => {
  try {
    const userId = req.user.id; // Ensure this is correctly set by the userAuth middleware

    if (!userId) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    const bookings = await BookingModel.find({ user: userId })
      .populate("turf", "name  price")
      .populate("user", "email")
      .sort({ createdAt: -1 });

    return res.json({ bookings });
  } catch (error) {
    return res.status(500).json({ message: error.message || "Internal server error" });
  }
};

// 🏆 Fetch all bookings for a manager (turf owner)
export const getManagerBookings = async (req, res) => {
  try {
    const managerId = req.user.id;

    // Get manager's turfs
    const turfs = await TurfModel.find({ manager: managerId });
    const turfIds = turfs.map((turf) => turf._id);

    // Fetch bookings for these turfs
    const bookings = await BookingModel.find({ turf: { $in: turfIds } })
      .populate("user", "name email")
      .populate("turf", "name ")
      .sort({ createdAt: -1 });

    return res.json({ bookings });
  } catch (error) {
    return res.status(500).json({ message: error.message || "Internal server error" });
  }
};

// 🏆 Cancel a booking
export const cancelBooking = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const booking = await BookingModel.findById(bookingId);

    if (!booking) return res.status(404).json({ message: "Booking not found" });

    booking.status = "Cancelled";
    await booking.save();

    return res.json({ message: "Booking cancelled successfully", booking });
  } catch (error) {
    return res.status(500).json({ message: error.message || "Internal server error" });
  }
};
