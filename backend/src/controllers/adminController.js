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
        res.cookie("token", token, { httpOnly: true });

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

        // Generate token with admin role
        const token = generateToken(admin._id, admin.role);
        res.status(200).json({
            message: "Login successful",
            data: {
                admin,
                token,
                role: admin.role, // Return the 'role' of the admin
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
        console.log("Delete user route hit"); // ✅ Check if function runs
        console.log("User ID:", req.params.userId); // ✅ Log received ID

        const { userId } = req.params; // Extract userId from request parameters

        // Check if the user exists
        const userExists = await UserModel.findById(userId);
        if (!userExists) {
            return res.status(404).json({ message: "User not found" });
        }

        // Delete the user
        await UserModel.findByIdAndDelete(userId);

        return res.json({ message: "User deleted successfully" });
    } catch (error) {
        return res.status(500).json({ message: error.message || "Internal server error" });
    }
};
export const deleteManager = async (req, res, next) => {
    try {
        console.log("Delete manager route hit"); // ✅ Debugging log
        console.log("Manager ID:", req.params.managerId); // ✅ Log received ID

        const { managerId } = req.params; // Get manager ID from request params

        // Check if the manager exists
        const managerExists = await ManagerModel.findById(managerId);
        if (!managerExists) {
            return res.status(404).json({ message: "Manager not found" });
        }

        // Delete the manager
        await ManagerModel.findByIdAndDelete(managerId);

        return res.json({ message: "Manager deleted successfully" });

    } catch (error) {
        console.error(error); // ✅ Log the error for debugging
        return res.status(500).json({ message: error.message || "Internal server error" });
    }
};

export const adminLogout = async (req, res) => {
    try {
        res.clearCookie("token");
        return res.json({ message: "Admin logout successfully" });
    } catch (error) {
        return res.status(500).json({ message: error.message || "Internal server error" });
    }
};