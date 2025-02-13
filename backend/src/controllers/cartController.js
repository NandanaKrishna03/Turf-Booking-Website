import Cart from "../models/cart.js";
import Turf from "../models/turf.js";

export const addTurfToCart = async (req, res) => {
    try {
        const { turfId, description, price, image } = req.body;
        const userId = req.user.id;

      
        const turf = await Turf.findById(turfId);
        if (!turf) {
            return res.status(404).json({ message: "Turf not found" });
        }

        let cart = await Cart.findOne({ userId });

        if (!cart) {
            cart = new Cart({ userId, turfs: [] });
        }

        
        cart.turfs.push({ turfId, description, price, image });
        await cart.save();

        res.json({ data: cart, message: "Turf added to cart successfully" });
    } catch (error) {
        return res.status(error.statusCode || 500).json({ message: error.message || "Internal server error" });
    }
};

export const getCartByUserId = async (req, res) => {
    try {
        const userId = req.user.id;
        const cart = await Cart.findOne({ userId }).populate("turfs.turfId");

        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        res.json({ data: cart, message: "Cart fetched successfully" });
    } catch (error) {
        return res.status(error.statusCode || 500).json({ message: error.message || "Internal server error" });
    }
};

export const deleteTurfFromCart = async (req, res) => {
    try {
        const userId = req.user.id;
        const { turfId } = req.params;

        const cart = await Cart.findOne({ userId });
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        cart.turfs = cart.turfs.filter(turf => turf.turfId.toString() !== turfId);
        await cart.save();

        res.json({ data: cart, message: "Turf removed from cart successfully" });
    } catch (error) {
        return res.status(error.statusCode || 500).json({ message: error.message || "Internal server error" });
    }
};
