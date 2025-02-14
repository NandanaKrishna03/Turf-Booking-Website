import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { axiosInstance } from "../../config/axiosInstance";

const MyTurf = () => {
    const [turfs, setTurfs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();

    const fetchTurfs = async () => {
        setIsLoading(true);
        try {
            const response = await axiosInstance.get("/turf/get-turf");
            console.log("Fetched Turfs:", response.data);
            setTurfs(response.data.data || []);
        } catch (err) {
            console.error("Error fetching turfs:", err);
            setError("Failed to fetch turfs.");
        }
        setIsLoading(false);
    };

    useEffect(() => {
        fetchTurfs();
    }, []);

    // **Refetch when coming back from UpdateTurf.jsx**
    useEffect(() => {
        if (location.state?.refresh) {
            fetchTurfs(); // Refetch data
            navigate(location.pathname, { replace: true }); // Clear refresh state
        }
    }, [location, navigate]);

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this turf?")) {
            try {
                await axiosInstance.delete(`/turf/delete-turf/${id}`);
                alert("Turf deleted successfully!");
                fetchTurfs(); // Fetch updated turfs after deletion
            } catch (err) {
                console.error("Error deleting turf:", err);
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
        <div className="p-6 bg-gray-100 min-h-screen">
            <h2 className="text-3xl font-bold text-center mb-6">My Turfs</h2>

            {turfs.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {turfs.map((turf) => (
                        <div key={turf._id} className="card w-full bg-white shadow-lg rounded-lg p-4">
                            <figure className="h-48 overflow-hidden rounded-t-lg">
                                <img src={turf.image} alt={turf.title} className="w-full h-full object-cover" />
                            </figure>
                            <div className="card-body">
                                <h3 className="text-xl font-semibold">{turf.title}</h3>
                                <p className="text-gray-600">{turf.description}</p>
                                <p className="text-lg font-bold text-green-600">Price: ₹{turf.price}</p>
                                <p className="text-gray-500">📍 {turf.address}</p>
                                <div className="card-actions justify-between mt-4">
                                    <button 
                                        className="btn btn-primary"
                                        onClick={() => handleEdit(turf._id)}
                                    >
                                        Edit
                                    </button>
                                    <button 
                                        className="btn btn-danger"
                                        onClick={() => handleDelete(turf._id)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-gray-500 text-center">No turfs found.</p>
            )}
        </div>
    );
};

export default MyTurf;
