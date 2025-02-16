import { UserModel } from "../models/user.js";
import bcrypt from "bcrypt" 
import { generateToken } from "../utils/token.js";

import { cloudinaryInstance } from "../config/cloudinary.js"; 
import { BookingModel } from "../models/booking.js";

const NODE_ENV=process.env.NODE_ENV

export const userSignup = async (req, res) => {
    try {
      const { name, email, password, phoneNumber } = req.body;
  
      let profilepic = ""; // Default empty profile picture
      if (req.file) {
        const cloudinaryResult = await cloudinaryInstance.uploader.upload(req.file.path, {
          folder: "user_profiles",
        });
        profilepic = cloudinaryResult.secure_url;
      }
  
      const hashedPassword = bcrypt.hashSync(password, 10);
      const userData = new UserModel({
        name,
        email,
        password: hashedPassword,
        phoneNumber,
        profilepic, // Optional profile picture
      });
  
      await userData.save();
      const token = generateToken(userData._id);
      res.cookie("token", token, { httpOnly: true });
  
      return res.json({ data: userData, message: "User Account created successfully" });
    } catch (error) {
      console.error("Signup Error:", error);
      return res.status(500).json({ message: error.message || "Internal server error" });
    }
};

    export const userLogin = async (req, res) => {
        try {
            console.log("Login API hit");
    
            const { email, password } = req.body;
            if (!email || !password) {
                return res.status(400).json({ message: "All fields are required" });
            }
    
            // Find user in the database
            const UserExist = await UserModel.findOne({ email }).select("+password"); // Ensure password is fetched
            if (!UserExist) return res.status(404).json({ message: "User not found" });
    
            // Check password (using bcrypt)
            const passwordMatch  = bcrypt.compareSync(password, UserExist.password);
            if (!passwordMatch ) return res.status(401).json({ message: "Invalid credentials" });
    
            // Generate JWT token
            const token = generateToken(UserExist._id);
    
            // Store token in HTTP-only cookie
            res.clearCookie("token", {
                sameSite: NODE_ENV === "production" ? "None" : "Lax",
                secure: NODE_ENV === "production",
                httpOnly: NODE_ENV === "production",
            });
    
            // Remove password from response object
            const userResponse = { ...UserExist.toObject() };
            delete userResponse.password;
    
            return res.status(200).json({
                message: "User Login Successfully",
                token, // Send token in response
                data: userResponse,
            });
    
        } catch (error) {
            return res.status(error.statusCode || 500).json({ message: error.message || "Internal server error" });
        }
    };
    
    export const userProfile = async (req, res) => {
    try {
        const userId = req.user.id; // Assuming you have user data in req.user after authentication
        if (!userId) {
            return res.status(400).json({ message: "User ID is required" });
        }

        const userData = await UserModel.findById(userId).select("-password");
        if (!userData) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.json({ data: userData, message: "User profile fetched" });
    } catch (error) {
        return res.status(500).json({ message: error.message || "Internal server error" });
    }
};

export const updateUserProfile = async (req, res) => {
    try {
      const userId = req.user.id;
      const { name, phoneNumber } = req.body;
      let updateData = { name, phoneNumber };
  
      if (req.file) {
        const cloudinaryResult = await cloudinaryInstance.uploader.upload(req.file.path, {
          folder: "user_profiles",
        });
        updateData.profilepic = cloudinaryResult.secure_url;
      }
  
      const updatedUser = await UserModel.findByIdAndUpdate(userId, updateData, { new: true }).select("-password");
      return res.json({ data: updatedUser, message: "User profile updated successfully" });
    } catch (error) {
      return res.status(error.statusCode || 500).json({ message: error.message || "Internal server error" });
    }
  };
    export const forgotPassword = async (req, res) => {
        try {
            const { email } = req.body;
    
            if (!email) {
                return res.status(400).json({ message: "Email is required" });
            }
    
            
            const user = await UserModel.findOne({ email });
    
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
    
            console.log(`Password reset link sent to ${email}`);  
            
            return res.json({ message: `Password reset link sent to ${email}` });
    
        } catch (error) {
            return res.status(500).json({ message: error.message || "Internal server error" });
        }
    };
    
    
    export const changePassword = async (req, res, next) => {
        try {
            const userId = req.user.id;
            const { oldPassword, newPassword } = req.body;
    
            if (!oldPassword || !newPassword) {
                return res.status(400).json({ message: "Both old and new passwords are required" });
            }
    
            const user = await UserModel.findById(userId);
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
    
            if (!user.password) {
                return res.status(400).json({ message: "Password not found for this user" });
            }
    
            const passwordMatch = bcrypt.compareSync(oldPassword, user.password);
            if (!passwordMatch) {
                return res.status(400).json({ message: "Old password is incorrect" });
            }
    
            user.password = bcrypt.hashSync(newPassword, 10);
            await user.save();
    
            return res.json({ message: "Password changed successfully" });
        } catch (error) {
            return res.status(error.statusCode || 500).json({ message: error.message || "Internal server error" });
        }
    };
    

    export const checkUser = async (req, res) => {
        try {
            if (!req.user) {
                return res.status(401).json({ isAuthenticated: false, message: "User not authenticated" });
            }
    
            return res.json({ isAuthenticated: true, user: req.user });
        } catch (error) {
            return res.status(500).json({ isAuthenticated: false, message: error.message || "Internal server error" });
        }
    };
        
    export const getBookings = async (req, res) => {
        try {
            const userId = req.user.id; // Assuming you have user data in req.user after authentication
            if (!userId) {
                return res.status(400).json({ message: "User ID is required" });
            }
    
            // Find all turf bookings related to the logged-in user
            const bookings = await BookingModel.find({ user: userId, turf: { $exists: true } })
                .populate("turf","name price");  // Populate turf field to get turf details
            
            if (bookings.length === 0) {
                return res.status(404).json({ message: "No bookings found" });
            }
    
            // Return bookings data
            return res.json({ data: bookings, message: "User turf bookings fetched successfully" });
        } catch (error) {
            console.error("Error fetching bookings:", error);
            return res.status(500).json({ message: error.message || "Internal server error" });
        }
    };
    
    
    export const deactivateAccount = async (req, res, next) => {
        try {
            const userId = req.user.id;
    
            const user = await UserModel.findByIdAndUpdate(userId, { isActive: false }, { new: true });
    
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
    
            res.clearCookie("token");
            return res.json({ message: "User account deactivated successfully" });
    
        } catch (error) {
            return res.status(error.statusCode || 500).json({ message: error.message || "Internal server error" });
        }
    };
        
 export const userLogout =async(req,res,next)=>{
      try {
        res.clearCookie("token", {
            sameSite: NODE_ENV === "production" ? "None" : "Lax",
            secure: NODE_ENV === "production",
            httpOnly: NODE_ENV === "production",
        });

         return res.json({message:"User logout successfully"})
            
       } catch (error) {
         return res.status(error.statusCode ||500).json({message:error.message||"Internal server error"})
       }
       }     
       