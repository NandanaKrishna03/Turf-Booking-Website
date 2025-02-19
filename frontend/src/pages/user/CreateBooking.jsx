import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { axiosInstance } from "../../config/axiosInstance";
import toast from "react-hot-toast";

export const CreateBooking = () => {
    const { turfId } = useParams(); // Get turfId from URL
    const navigate = useNavigate();
    const location = useLocation();
    const [turf, setTurf] = useState(location.state?.turf || null); // Use passed state if available
    const [date, setDate] = useState("");
    const [timeSlot, setTimeSlot] = useState("");
    const [price, setPrice] = useState("");

    useEffect(() => {
        // Fetch turf details only if not passed via state
        if (!turf) {
            axiosInstance.get(`/turf/turfDetails/${turfId}`)
                .then(response => {
                    setTurf(response.data);
                    setPrice(response.data.price); // Auto-fill price
                })
                .catch(error => console.error("Error fetching turf:", error));
        } else {
            setPrice(turf.price); // Auto-fill price if turf is passed via state
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
            navigate("/user/get-bookings"); // Redirect after booking
        } catch (error) {
            toast.error(error.response?.data?.message || "Booking failed.");
        }
    };

    if (!turf) return <p>Loading...</p>;

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold text-center mb-6">Book {turf.title}</h2>
                <form onSubmit={handleBooking}>
                    {/* Turf Name (Read-Only) */}
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium">Turf</label>
                        <input type="text" className="w-full p-2 border rounded bg-gray-200" value={turf.title} readOnly />
                    </div>

                    {/* Date Selection */}
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium">Select Date</label>
                        <input type="date" className="w-full p-2 border rounded" value={date} onChange={(e) => setDate(e.target.value)} required />
                    </div>

                    {/* Time Slot Selection */}
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium">Select Time Slot</label>
                        <select className="w-full p-2 border rounded" value={timeSlot} onChange={(e) => setTimeSlot(e.target.value)} required>
                            <option value="">Choose a time slot...</option>
                            <option value="6 AM - 8 AM">6 AM - 8 AM</option>
                            <option value="8 AM - 10 AM">8 AM - 10 AM</option>
                            <option value="10 AM - 12 PM">10 AM - 12 PM</option>
                            <option value="4 PM - 6 PM">4 PM - 6 PM</option>
                            <option value="6 PM - 8 PM">6 PM - 8 PM</option>
                            <option value="8 PM - 10 PM">8 PM - 10 PM</option>
                        </select>
                    </div>

                    {/* Price (Read-Only) */}
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium">Price (₹)</label>
                        <input type="number" className="w-full p-2 border rounded bg-gray-200" value={price} readOnly />
                    </div>

                    {/* Submit Button */}
                    <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
                        Confirm Booking
                    </button>
                </form>
            </div>
        </div>
    );
};