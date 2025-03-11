/* eslint-disable react/prop-types */
import { useState, useEffect, useContext } from "react";
import { useSelector } from "react-redux";
import { FaStar, FaTrash } from "react-icons/fa";
import { axiosInstance } from "../../config/axiosInstance";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { ThemeContext } from "../../context/ThemeContext";

export const TurfReview = ({ turfId }) => {
    const [reviews, setReviews] = useState([]);
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(null);
    const [comment, setComment] = useState("");

    const navigate = useNavigate();
    const { isUserAuth, user } = useSelector((state) => state.user);
    const { theme } = useContext(ThemeContext);

    useEffect(() => {
        if (turfId) fetchReviews();
        else toast.error("Invalid turf ID.");
    }, [turfId]);

    const fetchReviews = async () => {
        try {
            const res = await axiosInstance.get(`/review/get-turf-reviews/${turfId}`);
            setReviews(res.data.data);
        } catch (err) {
            console.log(err);
        }
    };

    const submitReview = async () => {
        if (rating < 1 || rating > 5) {
            toast("Please select a rating between 1 and 5.", { icon: "⚠️" });
            return;
        }

        if (!isUserAuth) {
            toast.error("Please log in to submit a review.");
            return;
        }

        try {
            await axiosInstance.post(`/review/add-review/${turfId}`, { rating, comment });
            toast.success("Review submitted successfully.");
            setRating(0);
            setComment("");
            fetchReviews();
        } catch (err) {
            console.log(err);
            toast.error("Could not submit review.");
        }
    };

    const deleteReview = async (reviewId) => {
        try {
            await axiosInstance.delete(`/review/delete-review/${reviewId}`);
            toast.success("Review deleted successfully.");
            setReviews(reviews.filter((review) => review._id !== reviewId));
        } catch (err) {
            console.log(err);
            toast.error("Failed to delete review.");
        }
    };

    return (
        <div className={`max-w-2xl mx-auto p-6 rounded-lg shadow-lg border ${theme === "light" ? "bg-white text-gray-800 border-gray-200" : "bg-gray-800 text-white border-gray-700"}`}>
            <h2 className="text-3xl font-semibold mb-5">Reviews</h2>

            {/* Display Reviews */}
            <div className="space-y-4">
                {reviews.length > 0 ? (
                    reviews.map((review) => (
                        <div key={review._id} className={`p-4 rounded-lg shadow-sm border ${theme === "light" ? "bg-gray-50 border-gray-300" : "bg-gray-700 border-gray-600"}`}>
                            <p className="font-semibold">{review.userId?.name || "Anonymous User"}</p>
                            <div className="flex mt-1">
                                {[...Array(5)].map((_, i) => (
                                    <FaStar key={i} className="mr-1" color={i < review.rating ? "#ffc107" : "#e4e5e9"} />
                                ))}
                            </div>
                            <p className="mt-1">{review.comment}</p>

                            {isUserAuth && review.userId?._id === user._id && (
                                <button
                                    className="text-red-600 hover:text-red-800 flex items-center gap-1 mt-2"
                                    onClick={() => deleteReview(review._id)}
                                >
                                    <FaTrash /> Delete
                                </button>
                            )}
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500">No reviews yet.</p>
                )}
            </div>

            {/* Submit Review Section */}
            <div className="mt-6">
                {isUserAuth ? (
                    <>
                        <h3 className="text-lg font-semibold mb-2">Leave a Review</h3>
                        <div className="flex space-x-2 mb-3">
                            {[...Array(5)].map((_, i) => (
                                <FaStar
                                    key={i}
                                    className={`cursor-pointer transition-all duration-150 ${theme === "light" ? (hover || rating) > i ? "text-yellow-400" : "text-gray-300" : (hover || rating) > i ? "text-yellow-400" : "text-gray-500"}`}
                                    onMouseEnter={() => setHover(i + 1)}
                                    onMouseLeave={() => setHover(null)}
                                    onClick={() => setRating(i + 1)}
                                />
                            ))}
                        </div>
                        <textarea
                            className={`w-full p-2 rounded-lg focus:outline-none focus:ring-2 ${theme === "light" ? "border-gray-300 focus:ring-blue-400 bg-white text-black" : "border-gray-600 focus:ring-blue-500 bg-gray-700 text-white"}`}
                            placeholder="Write a review..."
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        />
                        <button
                            className="mt-3 w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-200"
                            onClick={submitReview}
                        >
                            Submit Review
                        </button>
                    </>
                ) : (
                    <div className="text-center mt-4">
                        <p className="text-gray-500">You must be logged in to leave a review.</p>
                        <button
                            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-200"
                            onClick={() => navigate("/user/login")}
                        >
                            Login
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TurfReview;
