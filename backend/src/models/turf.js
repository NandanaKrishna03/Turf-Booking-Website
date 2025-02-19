import mongoose from "mongoose";

const turfSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      minLength: 2,
      maxLength: 30,
      unique: true,
    },
    category: {
      type: [String],
      required: true,
    },
    description: {
      type: String,
      required: true,
      minLength: 10,
      maxLength: 50,
    },
    address: { type: String, required: true },
    availableDates: [{ type: String }],
    availableTimeSlots: [{ type: String }],
    price: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
    },
    manager: { type: mongoose.Types.ObjectId, ref: "ManagerModel", required: true }, // ✅ Fixed Reference
  },
  { timestamps: true }
);

const Turf = mongoose.model("Turf", turfSchema);
export default Turf;
