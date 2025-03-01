/* eslint-disable react/prop-types */
import { useState, useEffect, useContext } from "react";
import { axiosInstance } from "../../config/axiosInstance";
import toast from "react-hot-toast";
import { ThemeContext } from "../../context/ThemeContext";

const TurfReviews = ({ turfId }) => {
    const { theme } = useContext(ThemeContext);
    const isDarkMode = theme === "dark";

    const [reviews, setReviews] = useState([]);
    const [rating, setRating] = useState(1);
    const [comment, setComment] = useState("");
    const [avgRating, setAvgRating] = useState(null);

    useEffect(() => {
        if (turfId) {
            fetchReviews();
            fetchAverageRating();
        }
    }, [turfId]);

    const fetchReviews = async () => {
        try {
            const response = await axiosInstance.get(`/review/get-turf-reviews/${turfId}`);
            setReviews(response.data.data);
        } catch (error) {
            console.error("Error fetching reviews:", error);
        }
    };

    const fetchAverageRating = async () => {
        try {
            const response = await axiosInstance.get(`/review/get-avg-rating/${turfId}`);
            setAvgRating(response.data.data);
        } catch (error) {
            console.error("Error fetching average rating:", error);
        }
    };

    const handleReviewSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");

        if (!token) {
            toast.error("User not logged in! Please log in to submit a review.");
            return;
        }

        try {
            await axiosInstance.post(
                `/review/add-review/${turfId}`,
                { rating, comment },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            setRating(1);
            setComment("");
            fetchReviews();
            fetchAverageRating();
            toast.success("Review submitted successfully!");
        } catch (error) {
            console.error("Error adding review:", error);
            toast.error("Failed to add review. Please try again.");
        }
    };

    return (
        <div
            className={`p-4 max-w-lg mx-auto rounded-lg shadow-md transition-all duration-300 ${
                isDarkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
            }`}
        >
            {avgRating !== null && (
                <p className="mb-2 text-lg font-semibold">
                    Average Rating: {avgRating.toFixed(1)} ⭐
                </p>
            )}

            <form onSubmit={handleReviewSubmit} className="mb-4">
                <select
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                    className={`p-2 border rounded w-full mb-2 ${
                        isDarkMode ? "bg-gray-800 text-white border-gray-600" : "bg-white text-black border-gray-300"
                    }`}
                >
                    {[1, 2, 3, 4, 5].map((num) => (
                        <option key={num} value={num}>{num} Star</option>
                    ))}
                </select>
                <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Write a review..."
                    className={`p-2 border rounded w-full mb-2 ${
                        isDarkMode ? "bg-gray-800 text-white border-gray-600" : "bg-white text-black border-gray-300"
                    }`}
                />
                <button
                    type="submit"
                    className={`px-4 py-2 rounded font-semibold transition-all ${
                        isDarkMode
                            ? "bg-blue-700 text-white hover:bg-blue-800"
                            : "bg-blue-500 text-white hover:bg-blue-600"
                    }`}
                >
                    Submit Review
                </button>
            </form>

            <div>
                {reviews.length > 0 ? (
                    reviews.map((review) => (
                        <div
                            key={review._id}
                            className={`p-3 border-b transition-all ${
                                isDarkMode ? "border-gray-700 text-gray-300" : "border-gray-300 text-gray-700"
                            }`}
                        >
                            <p>
                                <strong>{review.userId?.name}</strong> - {review.rating} ⭐
                            </p>
                            <p>{review.comment}</p>
                        </div>
                    ))
                ) : (
                    <p className="text-lg opacity-80">No reviews yet.</p>
                )}
            </div>
        </div>
    );
};

export default TurfReviews;
