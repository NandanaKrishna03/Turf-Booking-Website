/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { axiosInstance } from "../../config/axiosInstance";
import toast from "react-hot-toast";


const TurfReviews = ({ turfId }) => {
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
    try {
        await axiosInstance.post(`/review/add-review/${turfId}`, { rating, comment }, {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setRating(1);
        setComment("");
        fetchReviews();
        fetchAverageRating();
    } catch (error) {
        console.error("Error adding review:", error);
        
        // Check if error is due to authentication failure
        if (error.response && error.response.status === 401) {
            toast.error("User not logged in! Please log in to submit a review.");
        } else {
            toast.error("Failed to add review. Please try again.");
        }
    }
};


    return (
        <div className="p-4 max-w-lg mx-auto bg-gray-100 rounded-lg shadow-md">
            {avgRating !== null && <p className="mb-2">Average Rating: {avgRating.toFixed(1)} ⭐</p>}

            <form onSubmit={handleReviewSubmit} className="mb-4">
                <select value={rating} onChange={(e) => setRating(e.target.value)} className="p-2 border rounded w-full mb-2">
                    {[1, 2, 3, 4, 5].map((num) => (
                        <option key={num} value={num}>{num} Star</option>
                    ))}
                </select>
                <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Write a review..."
                    className="p-2 border rounded w-full mb-2"
                />
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Submit Review</button>
            </form>

            <div>
                {reviews.length > 0 ? (
                    reviews.map((review) => (
                        <div key={review._id} className="p-3 border-b">
                            <p><strong>{review.userId?.name}</strong> - {review.rating} ⭐</p>
                            <p>{review.comment}</p>
                        </div>
                    ))
                ) : (
                    <p>No reviews yet.</p>
                )}
            </div>
        </div>
    );
};

export default TurfReviews;
