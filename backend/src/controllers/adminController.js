import { AdminModel } from "../models/admin.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/token.js";
import { UserModel } from "../models/user.js";
import Turf from "../models/turf.js";
import { BookingModel } from "../models/booking.js";
import { ManagerModel } from "../models/manager.js";

export const registerAdmin = async (req, res) => {
    try {
        console.log("Admin Register API hit");
        const { name, email, password } = req.body;

        const hashedPassword = bcrypt.hashSync(password, 10);
        const adminData = new AdminModel({ name, email, password: hashedPassword });
        await adminData.save();
        const token = generateToken(adminData._id);
        res.cookie("token", token, { 
            httpOnly: true, 
            secure: process.env.NODE_ENV === 'production', 
            sameSite: 'Strict' 
        });

        return res.json({ data: adminData, message: "Admin registered successfully" });
    } catch (error) {
        return res.status(500).json({ message: error.message || "Internal server error" });
    }
};

export const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const admin = await AdminModel.findOne({ email });
        
        if (!admin) {
            return res.status(404).json({ message: "Admin not found" });
        }

        const isPasswordValid = await bcrypt.compare(password, admin.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = generateToken(admin._id, admin.role);
        res.cookie("token", token, { 
            httpOnly: true, 
            secure: process.env.NODE_ENV === 'production', 
            sameSite: 'Strict' 
        });
        
        res.status(200).json({
            message: "Login successful",
            data: {
                admin,
                token,
                role: admin.role,
            }
        });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

export const getAllUsers = async (req, res) => {
    try {
        const users = await UserModel.find({ role: "user" }).select("-password");
        return res.json({ data: users, message: "All users fetched successfully" });
    } catch (error) {
        return res.status(500).json({ message: error.message || "Internal server error" });
    }
};

export const getAllTurfs = async (req, res) => {
    try {
        const turfs = await Turf.find();
        return res.json({ data: turfs, message: "All turfs fetched successfully" });
    } catch (error) {
        return res.status(500).json({ message: error.message || "Internal server error" });
    }
};

export const getAllBookings = async (req, res) => {
    try {
        const bookings = await BookingModel.find().populate("user").populate("turf");
        return res.json({ data: bookings, message: "All bookings fetched successfully" });
    } catch (error) {
        return res.status(500).json({ message: error.message || "Internal server error" });
    }
};

export const deleteUser = async (req, res) => {
    try {
        console.log("Delete user route hit");
        console.log("User ID:", req.params.userId);

        const { userId } = req.params;
        const userExists = await UserModel.findById(userId);
        if (!userExists) {
            return res.status(404).json({ message: "User not found" });
        }

        await UserModel.findByIdAndDelete(userId);
        return res.json({ message: "User deleted successfully" });
    } catch (error) {
        return res.status(500).json({ message: error.message || "Internal server error" });
    }
};

export const deleteManager = async (req, res) => {
    try {
        console.log("Delete manager route hit");
        console.log("Manager ID:", req.params.managerId);

        const { managerId } = req.params;
        const managerExists = await ManagerModel.findById(managerId);
        if (!managerExists) {
            return res.status(404).json({ message: "Manager not found" });
        }

        await ManagerModel.findByIdAndDelete(managerId);
        return res.json({ message: "Manager deleted successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message || "Internal server error" });
    }
};
export const deleteTurf = async (req, res) => {
    try {
        console.log("Delete turf route hit");
        console.log("Turf ID:", req.params.turfId);

        const { turfId } = req.params;
        const turfExists = await Turf.findById(turfId);
        if (!turfExists) {
            return res.status(404).json({ message: "Turf not found" });
        }

        await Turf.findByIdAndDelete(turfId);
        return res.json({ message: "Turf deleted successfully" });
    } catch (error) {
        return res.status(500).json({ message: error.message || "Internal server error" });
    }
};

export const deleteBooking = async (req, res) => {
    try {
        console.log("Delete booking route hit");
        console.log("Booking ID:", req.params.bookingId);

        const { bookingId } = req.params;
        const bookingExists = await BookingModel.findById(bookingId);
        if (!bookingExists) {
            return res.status(404).json({ message: "Booking not found" });
        }

        await BookingModel.findByIdAndDelete(bookingId);
        return res.json({ message: "Booking deleted successfully" });
    } catch (error) {
        return res.status(500).json({ message: error.message || "Internal server error" });
    }
};

export const adminLogout = async (req, res) => {
    try {
        const token = req.cookies.token;
        if (token) {
            res.clearCookie("token", {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'Strict'
            });
        }

        return res.json({ message: "Admin logged out successfully" });
    } catch (error) {
        return res.status(500).json({ message: error.message || "Internal server error" });
    }
};
