
import {Review}  from "../models/review.js";
import Turf from "../models/turf.js";

export const addReview = async (req, res) => {
    try {
        const { turfId, rating, comment } = req.body;
        const userId = req.user.id;

        // Validate if the course exists
        const turf = await Turf.findById(turfId);
        if (!turf) {
            return res.status(404).json({ message: "turf not found" });
        }

        if (rating > 5 || rating <= 1) {
            return res.status(400).json({ message: "Please provide a proper rating" });
        }

        // Create or update the review
        const review = await Review.findOneAndUpdate({ userId, turfId }, { rating, comment }, { new: true, upsert: true });

        // Optionally, you can update the course's average rating here

        res.status(201).json({ data: review, message: "review added successfully" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
};

export const getTurfReviews = async (req, res) => {
    try {
        const { turfId } = req.params;
        console.log("Received turfId:", turfId);


        const reviews = await Review.find({ turfId }).populate("userId", "name").sort({ createdAt: -1 });

        if (!reviews.length) {
            return res.status(404).json({ message: "No reviews found for this turf" });
        }

        res.status(200).json({ data: reviews, message: "reviews fetched successfully" });
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

        const review = await Review.findOne({ _id: reviewId });

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

        res.status(200).json({ data: averageRating, message: "avg reviews fetched" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
};