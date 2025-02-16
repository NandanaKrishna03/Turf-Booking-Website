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
    const turf = await Turf.findById(turfId).populate("manager");
    if (!turf) {
      console.log("Turf not found for ID:", turfId); // Debugging
      return res.status(404).json({ message: "Turf not found" });
    }

    // ✅ Create new booking
    const newBooking = new BookingModel
    ({ turf: turfId, user: userId, date, timeSlot, price,status:"Pending"});
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
      .populate("turf", "title  price")
      .populate("user", "email")
      .sort({ createdAt: -1 });

    return res.json({ bookings });
  } catch (error) {
    return res.status(500).json({ message: error.message || "Internal server error" });
  }
};

// 🏆 Fetch all bookings for a manager (turf owner)




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


// Controller function to update booking status
export const updateBookingStatus = async (req, res) => {
    try {
        const { bookingId } = req.params;
        const { status } = req.body;

        // Validate status
        const validStatuses = ["Pending", "Confirmed", "Cancelled"];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({ message: "Invalid status" });
        }

        // Find and update the booking
        const updatedBooking = await BookingModel.findByIdAndUpdate(
            bookingId,
            { status },
            { new: true } // Return the updated document
        );

        if (!updatedBooking) {
            return res.status(404).json({ message: "Booking not found" });
        }

        res.status(200).json({
            message: "Booking status updated successfully",
            data: updatedBooking,
        });
    } catch (error) {
        console.error("Error updating booking status:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
