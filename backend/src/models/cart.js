import mongoose from "mongoose";

// Destructure Schema from mongoose
const { Schema } = mongoose;

const cartSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "UserModel", // Ensure this matches your User model name
        required: true
    },
    turfs: [
        {
            turfId: {
                type: Schema.Types.ObjectId,
                ref: "Turf",
                required: true
            },
            description: {
                type: String,
                required: true,
                minLength: 10,
                maxLength: 50
            },
            price: {
                type: Number,
                required: true
            },
            image: {
                type: String
            }
        }
    ]
},
{ timestamps: true }
);

const Cart = mongoose.model("Cart", cartSchema);

export default Cart;
