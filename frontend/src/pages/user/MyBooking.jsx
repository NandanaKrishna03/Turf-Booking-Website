/* eslint-disable react/prop-types */
import { useState, useEffect, useContext } from "react";
import { axiosInstance } from "../../config/axiosInstance";
import toast from "react-hot-toast";
import { ThemeContext } from "../../context/ThemeContext";
import { loadStripe } from "@stripe/stripe-js";

export const MyBookings = ({ onBookingChange }) => {
  const [bookings, setBookings] = useState([]);
  const { theme } = useContext(ThemeContext);

  // ✅ Load Stripe outside to avoid re-initialization
  const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_Publishable_key);

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

  // ✅ Handle Payment for Booking
  const handleMakePayment = async (booking) => {
    try {
      console.log("Booking Data:", booking);
  
      if (booking.status === "Cancelled") {
        toast.error("You cannot make a payment for a cancelled booking.");
        return;
      }
  
      const stripe = await stripePromise;
  
      const response = await axiosInstance.post(
        "/payments/create-checkout-session",
        {
          bookingId: booking._id,
          turfId: booking.turf?._id || "", // Ensure no undefined errors
          date: booking.date,
          timeSlot: booking.timeSlot,
          price: booking.turf?.price || 0, // Default to 0 if missing
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Ensure user is authenticated
          },
        }
      );
  
      if (response.data.sessionId) {
        const stripeRedirect = await stripe.redirectToCheckout({ sessionId: response.data.sessionId });
        if (stripeRedirect.error) {
          toast.error("Stripe Checkout failed. Try again.");
          console.error("Stripe Error:", stripeRedirect.error);
        }
      } else {
        toast.error("Failed to initiate payment. Try again.");
      }
    } catch (error) {
      console.error("Payment error:", error);
      toast.error("Error initiating payment.");
    }
  };
  

  return (
    <div className={`min-h-screen py-10 px-4 md:px-6 transition-all duration-300 ${theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}`}>
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-semibold text-center mb-6">My Bookings</h2>

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

               {/* ✅ Payment Status or Payment Button */}
{booking.status === "Paid" ? (
  <p className="text-green-600 font-medium">✅ Payment Successful</p>
) : (
  booking.status !== "Cancelled" && (
    <button
      onClick={() => handleMakePayment(booking)}
      className={`px-5 py-2 rounded-lg font-medium transition duration-300 ${
        theme === "dark" ? "bg-green-600 hover:bg-green-700" : "bg-green-500 hover:bg-green-600"
      } text-white focus:ring focus:ring-green-300`}
    >
      Make Payment
    </button>
  )
)}


                {/* Cancel Booking Button */}
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
