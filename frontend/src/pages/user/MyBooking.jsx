/* eslint-disable react/prop-types */
import { useState, useEffect, useContext } from "react";
import { axiosInstance } from "../../config/axiosInstance";
import toast from "react-hot-toast";
import { ThemeContext } from "../../context/ThemeContext"; // Import Theme Context
import { loadStripe } from "@stripe/stripe-js";
import { useNavigate, useLocation } from "react-router-dom";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

export const MyBookings = ({ onBookingChange }) => {
  const [bookings, setBookings] = useState([]);
  const { theme } = useContext(ThemeContext);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axiosInstance.get("/bookings/user",{ withCredentials: true });
        console.log("API Response:", response.data);
        setBookings(response.data.bookings);
      } catch (error) {
        toast.error("Failed to fetch bookings");
        console.error("Error fetching bookings:", error);
      }
    };

    fetchBookings();
  }, [location.search]);

  useEffect(() => {
    const checkPaymentStatus = async () => {
      const params = new URLSearchParams(location.search);
      const sessionId = params.get("session_id");

      if (sessionId) {
        try {
          const response = await axiosInstance.get(`/payments/session-status?session_id=${sessionId}`);

          if (response.data.status === "complete") {
            toast.success("Payment successful!");

            await axiosInstance.post("/bookings/update-status", {
              sessionId,
              status: "Paid",
            });

            const updatedBookings = await axiosInstance.get("/bookings/user");
            setBookings(updatedBookings.data.bookings);

            navigate("/payments/success", { replace: true });
          }
        } catch (error) {
          console.error("Error checking payment status:", error);
          toast.error("Failed to verify payment status.");
        }
      }
    };

    checkPaymentStatus();
  }, [location.search, navigate]);

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

  const handleMakePayment = async (booking) => {
    try {
      if (booking.status === "Cancelled") {
        toast.error("You cannot make a payment for a cancelled booking.");
        return;
      }

      const stripe = await stripePromise;

      const response = await axiosInstance.post(
        "/payments/create-checkout-session",
        {
          bookingId: booking._id,
          turfId: booking.turf?._id || "",
          date: booking.date,
          timeSlot: booking.timeSlot,
          price: booking.turf?.price || 0,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
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
                className={`shadow-lg rounded-lg p-5 flex flex-col md:flex-row justify-between items-center gap-2 transition-all duration-300 ${
                  theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-gray-900"
                }`}
              >
                <div className="w-full md:w-3/4 space-y-2">
                  <h3 className="text-xl font-semibold">
                    {booking.turf?.title || "Turf Name"}
                  </h3>
                  <p><span className="font-medium">📅 Date:</span> {new Date(booking.date).toLocaleDateString()}</p>
                  <p><span className="font-medium">⏰ Time:</span> {booking.timeSlot}</p>
                  <p><span className="font-medium">💰 Price:</span> ₹{booking.turf?.price || "N/A"}</p>
                  <p className={`font-medium ${booking.status === "Cancelled" ? "text-red-500" : "text-green-600"}`}>{booking.status}</p>
                </div>

                {booking.status !== "Paid" && booking.status !== "Cancelled" && (
                  <button
                    onClick={() => handleMakePayment(booking)}
                    disabled={booking.status !== "Confirmed"}
                    className="px-3 py-1 text-sm rounded-md bg-green-500 hover:bg-green-500 text-white focus:ring focus:ring-green-200 disabled:bg-gray-400"
                  >
                    Make Payment
                  </button>
                )}

                {booking.status !== "Cancelled" && (
                  <button
                    onClick={() => handleCancelBooking(booking._id)}
                    className="px-3 py-1 text-sm rounded-md bg-red-500 hover:bg-red-500 text-white focus:ring focus:ring-red-200"
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