import e from "express";
import {
    changePassword,
    checkUser,
    deactivateAccount,
    forgotPassword,
    updateUserProfile,
    userLogin,
    userLogout,
    userProfile,
    userSignup,
    getBookings // Import the getBookings function
} from "../controllers/userController.js";
import { userAuth } from "../middlewares/userAuth.js";
import { upload } from "../middlewares/multer.js";

const router = e.Router();

// Signup Route
router.post('/signup', upload.single("profilepic"), userSignup);

// Login Route
router.post('/login', userLogin);

// Profile Route
router.get('/profile', upload.single("profilepic"), userAuth, userProfile);

// Logout Route
router.get('/logout', userAuth, userLogout);

// Profile Update Route
router.post('/profile-update', upload.single("profilepic"), userAuth, updateUserProfile);

// Forgot Password Route
router.post('/forgot-password', userAuth, upload.single("profilepic"), forgotPassword);

// Change Password Route
router.post('/change-password', userAuth, changePassword);

// Account Deactivation Route
router.delete('/account-deactivate', userAuth, deactivateAccount);

// Check User Route
router.get('/check-user', userAuth, checkUser);

// Get Bookings Route (added)
router.get('/get-bookings', userAuth, getBookings); // Protect with userAuth middleware

export { router as userRouter };

