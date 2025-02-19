import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema(
  {
    turf: { type: mongoose.Schema.Types.ObjectId, ref: "Turf", required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "UserModel", required: true },
    manager: { type: mongoose.Schema.Types.ObjectId, ref: "ManagerModel", required: true }, // ✅ Fixed Reference
    date: { type: Date, required: true },
    timeSlot: { type: String, required: true },
    price: { type: Number, required: true },
    status: { type: String, enum: ["Confirmed", "Pending", "Cancelled"], default: "Pending" },
  },
  { timestamps: true }
);

export const BookingModel = mongoose.model("Booking", BookingSchema);
