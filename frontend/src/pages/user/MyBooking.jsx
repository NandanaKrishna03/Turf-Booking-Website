import { useEffect, useState } from "react";
import { axiosInstance } from "../../config/axiosInstance";
import toast from "react-hot-toast";

export const MyBookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axiosInstance.get("/bookings/user");
        console.log("API Response:", response.data);
        setBookings(response.data.bookings);
      } catch (error) {
        toast.error("Failed to fetch bookings");
        console.error("Error fetching bookings:", error);
      }
    };

    fetchBookings();
  }, []);

  return (
    <div className="hero bg-base-200 min-h-screen p-6">
      <div className="w-full max-w-3xl">
        <h2 className="text-2xl font-bold mb-4">My Bookings</h2>

        {bookings.length > 0 ? (
          <ul className="bg-white shadow-md rounded-lg p-4">
            {bookings.map((booking, index) => (
              <li key={index} className="border-b p-3">
                <strong>Turf:</strong> {booking.turf?.name} | 
                <strong> Date:</strong> {new Date(booking.date).toLocaleDateString()} | 
                <strong> Price:</strong> ₹{booking.turf?.price || "N/A"} |
                <strong> Time:</strong> {booking.timeSlot}
              </li>
            ))}
          </ul>
        ) : (
          <p>No bookings found.</p>
        )}
      </div>
    </div>
  );
};