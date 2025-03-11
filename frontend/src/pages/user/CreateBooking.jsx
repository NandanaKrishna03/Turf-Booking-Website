import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { axiosInstance } from "../../config/axiosInstance";
import toast from "react-hot-toast";
import { ThemeContext } from "../../context/ThemeContext"; // Import ThemeContext

export const CreateBooking = () => {
    const { turfId } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const { theme } = useContext(ThemeContext);
    const [turf, setTurf] = useState(location.state?.turf || null);
    const [date, setDate] = useState("");
    const [timeSlot, setTimeSlot] = useState("");
    const [price, setPrice] = useState("");

    useEffect(() => {
        if (!turf) {
            axiosInstance.get(`/turf/turfDetails/${turfId}`)
                .then(response => {
                    setTurf(response.data);
                    setPrice(response.data.price);
                })
                .catch(error => console.error("Error fetching turf:", error));
        } else {
            setPrice(turf.price);
        }
    }, [turfId, turf]);

    const handleBooking = async (e) => {
        e.preventDefault();
        if (!date || !timeSlot || !price) {
            toast.error("Please fill all fields.");
            return;
        }

        try {
            await axiosInstance.post("/bookings/create", { turfId, date, timeSlot, price });
            toast.success("Booking successful!");
            navigate("/user/get-bookings");
        } catch (error) {
            toast.error(error.response?.data?.message || "Booking failed.");
        }
    };

    if (!turf) return <p>Loading...</p>;

    return (
        <div className={`min-h-screen flex items-center justify-center transition-colors duration-300 ${theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-black"}`}>
            <div className={`p-8 rounded-lg shadow-lg w-full max-w-md transition-colors duration-300 ${theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-black"}`}>
                <h2 className="text-2xl font-bold text-center mb-6">Book {turf.title}</h2>
                <form onSubmit={handleBooking}>
                    <div className="mb-4">
                        <label className="block font-medium">Turf</label>
                        <input type="text" 
                            className={`w-full p-2 border rounded ${theme === "dark" ? "bg-gray-700 text-white" : "bg-gray-100 text-black"}`} 
                            value={turf.title} readOnly 
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block font-medium">Select Date</label>
                        <input type="date" 
                            className={`w-full p-2 border rounded ${theme === "dark" ? "bg-gray-700 text-white" : "bg-white text-black"}`} 
                            value={date} 
                            onChange={(e) => setDate(e.target.value)} required 
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block font-medium">Select Time Slot</label>
                        <select 
                            className={`w-full p-2 border rounded ${theme === "dark" ? "bg-gray-700 text-white" : "bg-white text-black"}`} 
                            value={timeSlot} 
                            onChange={(e) => setTimeSlot(e.target.value)} required
                        >
                            <option value="">Choose a time slot...</option>
                            <option value="6 AM - 8 AM">6 AM - 8 AM</option>
                            <option value="8 AM - 10 AM">8 AM - 10 AM</option>
                            <option value="10 AM - 12 PM">10 AM - 12 PM</option>
                            <option value="4 PM - 6 PM">4 PM - 6 PM</option>
                            <option value="6 PM - 8 PM">6 PM - 8 PM</option>
                            <option value="8 PM - 10 PM">8 PM - 10 PM</option>
                        </select>
                    </div>

                    <div className="mb-4">
                        <label className="block font-medium">Price (₹)</label>
                        <input type="number" 
                            className={`w-full p-2 border rounded ${theme === "dark" ? "bg-gray-700 text-white" : "bg-gray-100 text-black"}`} 
                            value={price} readOnly 
                        />
                    </div>

                    <button type="submit" className="w-full p-2 rounded transition-colors duration-300 bg-blue-600 text-white hover:bg-blue-700">
                        Confirm Booking
                    </button>
                </form>
            </div>
        </div>
    );
};
