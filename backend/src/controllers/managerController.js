import { ManagerModel } from "../models/manager.js";
import { BookingModel } from "../models/booking.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/token.js";
import { cloudinaryInstance } from "../config/cloudinary.js";
import Turf  from "../models/turf.js";
export const managerSignup = async (req, res, next) => {
    try {
        console.log("hitted");
        const { name, email, role, password, phoneNumber, profilepic } = req.body;
        if (!name || !email || !role || !password || !phoneNumber) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const isManagerExist = await ManagerModel.findOne({ email });
        if (isManagerExist) {
            return res.status(400).json({ message: "Manager already exists" });
        }

        const hashedPassword = bcrypt.hashSync(password, 10);
        const managerData = new ManagerModel({ name, email, role, password: hashedPassword, phoneNumber, profilepic });
        await managerData.save();

        const token = generateToken(managerData._id);
        res.cookie("token", token);
        const roleMessage = role.toLowerCase() === "admin" ? "Admin account created" : "Manager account created";

        return res.json({ data: managerData, message: roleMessage });
    } catch (error) {
        return res.status(error.statusCode || 500).json({ message: error.message || "Internal server error" });
    }
};

export const managerLogin = async (req, res, next) => {
    try {
        console.log("hitted");
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const managerExist = await ManagerModel.findOne({ email });
        if (!managerExist) {
            return res.status(404).json({ message: "Manager not found" });
        }

        const passwordMatch = bcrypt.compareSync(password, managerExist.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: "Manager not authenticated" });
        }

        const token = generateToken(managerExist._id);
        res.cookie("token", token, { httpOnly: true, secure: process.env.NODE_ENV === "production" });
        const { password: _password, ...managerWithoutPassword } = managerExist.toObject();
        const roleMessage = managerExist.role.toLowerCase() === "admin" ? "Admin account logged in" : "Manager account logged in";

        return res.json({ data: managerWithoutPassword, message: roleMessage });
    } catch (error) {
        next(error);
    }
};

export const getAllManagers = async (req, res, next) => {
    try {
        const managerData = await ManagerModel.find().select("-password");
        return res.json({ data: managerData, message: "All managers details fetched" });
    } catch (error) {
        return res.status(error.statusCode || 500).json({ message: error.message || "Internal server error" });
    }
};

export const updateManager = async (req, res, next) => {
    try {
        const managerId = req.user.id;
        const { name, phoneNumber, profilepic } = req.body;
        let updatedData = { name, phoneNumber, profilepic };

        if (req.file) {
            const uploadedImage = await cloudinaryInstance.uploader.upload(req.file.path, {
                folder: "manager_profiles",
            });
            updatedData.profilepic = uploadedImage.secure_url;
        }

        const updatedManager = await ManagerModel.findByIdAndUpdate(managerId, updatedData, { new: true }).select("-password");
        return res.json({ data: updatedManager, message: "Manager profile updated successfully" });
    } catch (error) {
        return res.status(error.statusCode || 500).json({ message: error.message || "Internal server error" });
    }
};

export const findManagerById = async (req, res) => {
    try {
        const managerId = req.user.id;
        const manager = await ManagerModel.findById(managerId).select("-password");
        if (!manager) {
            return res.status(404).json({ message: "Manager not found" });
        }
        return res.json({ data: manager, message: "Manager profile fetched successfully" });
    } catch (error) {
        return res.status(500).json({ message: error.message || "Internal server error" });
    }
};

export const deleteManager = async (req, res, next) => {
    try {
        const managerId = req.user.id;
        const deleteResult = await ManagerModel.deleteOne({ _id: managerId });
        if (deleteResult.deletedCount === 0) {
            return res.status(404).json({ message: "Manager not found or already deleted" });
        }
        return res.json({ message: "Manager account deleted successfully" });
    } catch (error) {
        return res.status(error.statusCode || 500).json({ message: error.message || "Internal server error" });
    }
};

export const logout = async (req, res, next) => {
    try {
        res.clearCookie("token");
        return res.json({ message: "Manager logged out successfully" });
    } catch (error) {
        return res.status(error.statusCode || 500).json({ message: error.message || "Internal server error" });
    }
};

export const getAllTurfBookingDetails = async (req, res, next) => {
    try {
        const managerId = req.user.id; // Get logged-in manager's ID

        // Step 1: Find all turfs added by this manager
        const turfs = await Turf.find({ managerId }).select("_id");

        if (!turfs.length) {
            return res.json({ data: [], message: "No turfs found for this manager" });
        }

        // Step 2: Get all bookings related to these turfs
        const turfIds = turfs.map(turf => turf._id);
        const bookings = await BookingModel.find({ turfId: { $in: turfIds } })
            .populate("userId", "name email")
            .populate("turfId", "name ");

        return res.json({ data: bookings, message: "All turf bookings fetched successfully" });
    } catch (error) {
        return res.status(error.statusCode || 500).json({ message: error.message || "Internal server error" });
    }
};




