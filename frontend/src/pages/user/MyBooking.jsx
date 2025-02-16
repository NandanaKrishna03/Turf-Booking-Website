/* eslint-disable react/prop-types */
import { useState, useEffect, useContext } from "react";
import { axiosInstance } from "../../config/axiosInstance";
import toast from "react-hot-toast";
import { ThemeContext } from "../../context/ThemeContext"; // Import Theme Context

export const MyBookings = ({ onBookingChange }) => {
  const [bookings, setBookings] = useState([]);
  const { theme } = useContext(ThemeContext); // Access theme from context

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

  const handleCancelBooking = async (bookingId) => {
    try {
      const response = await axiosInstance.delete(`/bookings/cancel/${bookingId}`);
      toast.success(response.data.message);
      setBookings((prevBookings) =>
        prevBookings.map((booking) =>
          booking._id === bookingId ? { ...booking, status: "Cancelled" } : booking
        )
      );
      onBookingChange();
    } catch (error) {
      toast.error("Failed to cancel booking");
      console.error("Error cancelling booking:", error);
    }
  };

  return (
    <div className={`min-h-screen py-10 px-4 md:px-6 transition-all duration-300 ${theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}`}>
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-semibold text-center mb-6">
          My Bookings
        </h2>

        {bookings.length > 0 ? (
          <div className="space-y-4">
            {bookings.map((booking) => (
              <div 
                key={booking._id} 
                className={`shadow-lg rounded-lg p-5 flex flex-col md:flex-row justify-between items-center transition-all duration-300 ${
                  theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-gray-900"
                }`}
              >
                {/* Left Section */}
                <div className="w-full md:w-3/4 space-y-2">
                  <h3 className="text-xl font-semibold">
                    {booking.turf?.title || "Turf Name"}
                  </h3>
                  <p>
                    <span className="font-medium">📅 Date:</span> {new Date(booking.date).toLocaleDateString()}
                  </p>
                  <p>
                    <span className="font-medium">⏰ Time:</span> {booking.timeSlot}
                  </p>
                  <p>
                    <span className="font-medium">💰 Price:</span> ₹{booking.turf?.price || "N/A"}
                  </p>
                  <p className={`font-medium ${booking.status === "Cancelled" ? "text-red-500" : "text-green-600"}`}>
                    {booking.status}
                  </p>
                </div>

                {/* Right Section - Cancel Button */}
                {booking.status !== "Cancelled" && (
                  <button
                    onClick={() => handleCancelBooking(booking._id)}
                    className={`px-5 py-2 rounded-lg font-medium transition duration-300 ${
                      theme === "dark" ? "bg-red-600 hover:bg-red-700" : "bg-red-500 hover:bg-red-600"
                    } text-white focus:ring focus:ring-red-300`}
                  >
                    Cancel Booking
                  </button>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 mt-6">No bookings found.</p>
        )}
      </div>
    </div>
  );
};
