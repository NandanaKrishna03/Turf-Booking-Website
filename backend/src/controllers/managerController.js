import { ManagerModel } from "../models/manager.js";
import { BookingModel } from "../models/booking.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/token.js";
import { cloudinaryInstance } from "../config/cloudinary.js";
import Turf  from "../models/turf.js";
const isProduction = process.env.NODE_ENV === "production";
export const managerSignup = async (req, res, next) => {
    try {
        console.log("hitted");
        const { name, email, password, phoneNumber, profilepic } = req.body;

        // Validation: Ensure required fields exist
        if (!name || !email || !password) {
            return res.status(400).json({ message: "Name, email, and password are required" });
        }

        // Check if manager already exists
        const isManagerExist = await ManagerModel.findOne({ email });
        if (isManagerExist) {
            return res.status(400).json({ message: "Manager already exists" });
        }

        // Hash the password
        const hashedPassword = bcrypt.hashSync(password, 10);
        
        // Create manager data (without role)
        const managerData = new ManagerModel({ 
            name, 
            email, 
            password: hashedPassword, 
            phoneNumber, 
            profilepic 
        });

        await managerData.save();

        // Generate token
        const token = generateToken(managerData._id);

        // Set cookie
        res.cookie("token", token, {
            httpOnly: true,
            secure: isProduction, 
            sameSite: isProduction ? "None" : "Lax",
        });

        return res.json({ data: managerData, message: "Manager account created successfully" });
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

        res.cookie("token", token, {
            httpOnly: true,
            secure: isProduction, 
            sameSite: isProduction ? "None" : "Lax",
        });

        const { password: _password, ...managerWithoutPassword } = managerExist.toObject();
        const roleMessage = managerExist.role.toLowerCase() === "admin" ? "Admin account logged in" : "Manager account logged in";

        return res.status(200).json({
            message: "User Login Successfully",
            token, // Send token in response
            data: roleMessage, 
            manager: managerWithoutPassword
        });

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
        res.clearCookie("token", {
            httpOnly: true,
            secure: isProduction,
            sameSite: isProduction ? "None" : "Lax",
        });

        return res.json({ message: "Manager logged out successfully" });
    } catch (error) {
        return res.status(error.statusCode || 500).json({ message: error.message || "Internal server error" });
    }
};
export const getAllTurfBookingDetails = async (req, res, next) => {
    try {
        const managerId = req.user.id;
        console.log("Fetching bookings for manager:", managerId);

        // Fetch all turfs managed by the manager
        const turfs = await Turf.find({ manager: managerId }).lean();
        if (!turfs.length) {
            return res.status(404).json({ message: "No turfs found for this manager" });
        }

        // Extract turf IDs
        const turfIds = turfs.map(turf => turf._id);
        console.log("Turf IDs managed by manager:", turfIds);

        // Fetch all bookings for the manager's turfs
        const bookings = await BookingModel.find({ turf: { $in: turfIds } })
            .populate("user", "name email")
            .populate({
                path: "turf",
                select: "title address price manager",
                populate: {
                    path: "manager",
                    select: "name email"
                }
            })
            .sort({ createdAt: -1 })
            .lean();

        if (!bookings.length) {
            return res.status(404).json({ message: "No bookings found for these turfs" });
        }

        console.log("Bookings found:", bookings);

        res.status(200).json({
            data: bookings,
            message: "Booking details fetched successfully"
        });
    } catch (error) {
        console.error("Error fetching booking details:", error);
        return res.status(500).json({ message: error.message || "Internal server error" });
    }
};
