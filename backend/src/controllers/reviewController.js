import { Review } from "../models/review.js";
import Turf from "../models/turf.js";

export const addReview = async (req, res) => {
    try {
        const { turfId } = req.params;
        const { rating, comment } = req.body;
        const userId = req.user.id;

        // Validate if the turf exists
        const turf = await Turf.findById(turfId);
        if (!turf) {
            return res.status(404).json({ message: "Turf not found" });
        }

        if (rating > 5 || rating < 1) {
            return res.status(400).json({ message: "Please provide a valid rating between 1 and 5" });
        }

        // Create or update the review
        const review = await Review.findOneAndUpdate(
            { userId, turfId },
            { rating, comment },
            { new: true, upsert: true }
        );

        res.status(201).json({ data: review, message: "Review added successfully" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
};

export const getTurfReviews = async (req, res) => {
    try {
        const { turfId } = req.params;
        console.log("Received turfId:", turfId);

        const reviews = await Review.find({ turfId })
            .populate("userId", "name")
            .sort({ createdAt: -1 });

        if (!reviews.length) {
            return res.status(404).json({ message: "No reviews found for this turf" });
        }

        res.status(200).json({ data: reviews, message: "Reviews fetched successfully" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
};

export const deleteReview = async (req, res) => {
    try {
        const { reviewId } = req.params;
        const userId = req.user.id;

        console.log("Deleting Review ID:", reviewId);
        console.log("User ID from Token:", userId);

        const review = await Review.findById(reviewId);
        if (!review) {
            return res.status(404).json({ message: "Review not found" });
        }

        if (review.userId.toString() !== userId) {
            return res.status(403).json({ message: "Not authorized to delete this review" });
        }

        await Review.findByIdAndDelete(reviewId);
        res.status(200).json({ message: "Review deleted successfully" });
    } catch (error) {
        console.error("Error deleting review:", error);
        res.status(500).json({ message: "Internal server error", error });
    }
};

export const getAverageRating = async (req, res) => {
    try {
        const { turfId } = req.params;

        const reviews = await Review.find({ turfId });

        if (!reviews.length) {
            return res.status(404).json({ message: "No reviews found for this turf" });
        }

        const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;

        res.status(200).json({ data: averageRating, message: "Average rating fetched" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
};
