import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserModel",
      required: true,
    },
    turfId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Turf",
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    timeSlot: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    sessionId: {
      type: String,
      required: true,
    },
    status: { type: String, enum: ["pending", "Paid"], default: "pending" },
}, { timestamps: true });


export const Order = mongoose.model("Order", orderSchema);
