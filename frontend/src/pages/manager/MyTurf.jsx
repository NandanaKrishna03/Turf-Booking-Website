import { useEffect, useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { axiosInstance } from "../../config/axiosInstance";
import { ThemeContext } from "../../context/ThemeContext";
import { FaStar, FaEdit, FaTrash, FaComments } from "react-icons/fa";

const MyTurf = () => {
    const { theme } = useContext(ThemeContext);
    const isDarkMode = theme === "dark";

    const [turfs, setTurfs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [reviews, setReviews] = useState({});
    const [showReviews, setShowReviews] = useState({});
    const navigate = useNavigate();
    const location = useLocation();

    const fetchTurfs = async () => {
        setIsLoading(true);
        try {
            const response = await axiosInstance.get("/turf/get-turf");
            setTurfs(response.data.data || []);
        } catch (err) {
            setError("Failed to fetch turfs.");
        }
        setIsLoading(false);
    };

    const fetchReviews = async (turfId) => {
        try {
            const response = await axiosInstance.get(`/review/get-turf-reviews/${turfId}`);
            setReviews((prev) => ({ ...prev, [turfId]: response.data.data || [] }));
            setShowReviews((prev) => ({ ...prev, [turfId]: !prev[turfId] }));
        } catch (err) {
            console.error("Error fetching reviews:", err);
        }
    };

    useEffect(() => {
        fetchTurfs();
    }, []);

    useEffect(() => {
        if (location.state?.refresh) {
            fetchTurfs();
            navigate(location.pathname, { replace: true });
        }
    }, [location, navigate]);

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this turf?")) {
            try {
                await axiosInstance.post(`/turf/delete-turf/${id}`);
                fetchTurfs();
            } catch (err) {
                alert("Failed to delete turf.");
            }
        }
    };

    const handleEdit = (id) => {
        navigate(`/manager/update-turf/${id}`);
    };

    if (isLoading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
    if (error) return <div className="text-red-500 text-center">Error: {error}</div>;

    return (
        <div className={`p-6 mt-20 min-h-screen transition-all duration-300 ${isDarkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}`}>
            <h2 className="text-3xl font-bold text-center mb-6">My Turfs</h2>

            {turfs.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {turfs.map((turf) => (
                        <div 
                            key={turf._id} 
                            className={`rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105 ${isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"}`}
                        >
                            <img src={turf.image} alt={turf.title} className="w-full h-48 object-cover" />
                            <div className="p-4">
                                <h3 className="text-xl font-semibold mb-2">{turf.title}</h3>
                                <p className="text-sm opacity-80 mb-2">{turf.description}</p>
                                <p className="text-lg font-bold text-green-500">Price: ₹{turf.price}</p>
                                <p className="opacity-75 mb-3">📍 {turf.address}</p>
                                <div className="flex justify-around items-center mt-2">
                                    <button className="flex items-center gap-2 px-3 py-1 rounded-lg text-white bg-gray-500 hover:bg-blue-600 text-sm" onClick={() => handleEdit(turf._id)}>
                                        <FaEdit /> Edit
                                    </button>
                                    <button className="flex items-center gap-2 px-3 py-1 rounded-lg text-white bg-gray-500 hover:bg-red-600 text-sm" onClick={() => handleDelete(turf._id)}>
                                        <FaTrash /> Delete
                                    </button>
                                    <button className="flex items-center gap-2 px-3 py-1 rounded-lg text-white bg-gray-500 hover:bg-yellow-600 text-sm" onClick={() => fetchReviews(turf._id)}>
                                        <FaComments /> {showReviews[turf._id] ? "Hide Reviews" : "Show Reviews"}
                                    </button>
                                </div>
                            </div>
                            {showReviews[turf._id] && reviews[turf._id] && (
                                <div className={`p-3 transition-all ${isDarkMode ? "bg-gray-700" : "bg-gray-200"}`}>
                                    <h4 className="text-lg font-bold mb-2">Reviews</h4>
                                    {reviews[turf._id].length > 0 ? (
                                        reviews[turf._id].map((review) => (
                                            <div key={review._id} className="border-b border-gray-500 pb-1 mb-1">
                                                <p className="text-sm font-semibold">{review.userId.name}</p>
                                                <p className="text-yellow-400 flex items-center">
                                                    {Array.from({ length: review.rating }).map((_, i) => <FaStar key={i} />)}
                                                </p>
                                                <p className="text-xs italic">{review.comment}</p>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-sm opacity-75">No reviews yet.</p>
                                    )}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-center opacity-75">No turfs found.</p>
            )}
        </div>
    );
};

export default MyTurf;
