/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { axiosInstance } from "../../config/axiosInstance";
import toast from "react-hot-toast";

export const ManagerBooking = ({ refetch }) => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axiosInstance.get("manager/getBookings",{ withCredentials: true });
        console.log("API Response:", response.data);
        setBookings(response.data.data); // Adjust based on your API response structure
      } catch (error) {
        toast.error("Failed to fetch bookings");
        console.error("Error fetching bookings:", error);
      }
    };

    fetchBookings();
  }, [refetch]); // Trigger refetch when refetch value changes

  const handleStatusChange = async (bookingId, newStatus) => {
    try {
      const response = await axiosInstance.put(`bookings/update-status/${bookingId}`, {
        status: newStatus,
      });

      if (response.status === 200) {
        toast.success("Booking status updated successfully");
        // Update the booking status in the local state
        setBookings((prevBookings) =>
          prevBookings.map((booking) =>
            booking._id === bookingId ? { ...booking, status: newStatus } : booking
          )
        );
      }
    } catch (error) {
      toast.error("Failed to update booking status");
      console.error("Error updating booking status:", error);
    }
  };

  return (
    <div className="hero bg-base-200 min-h-screen p-6">
      <div className="w-full max-w-4xl">
        <h2 className="text-3xl font-bold mb-6 text-center">User Bookings</h2>

        {bookings.length > 0 ? (
          <div className="space-y-6">
            {bookings.map((booking) => (
              <div key={booking._id} className="card bg-base-100 shadow-xl p-6 flex flex-col md:flex-row justify-between items-start">
                {/* Booking Details - Left Side */}
                <div className="text-left w-full md:w-2/3">
                  <h3 className="text-xl font-semibold">{booking.turf?.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300"><strong>User:</strong> {booking.user?.name}</p>
                  <p className="text-gray-600 dark:text-gray-300"><strong>Date:</strong> {new Date(booking.date).toLocaleDateString()}</p>
                  <p className="text-gray-600 dark:text-gray-300"><strong>Time:</strong> {booking.timeSlot}</p>
                  <p className="text-gray-600 dark:text-gray-300"><strong>Price:</strong> ₹{booking.turf?.price || "N/A"}</p>
                </div>

                {/* Status & Actions - Right Side (Vertically Centered) */}
                <div className="flex flex-col items-end md:items-center md:justify-center md:w-1/3">
                  <p className={`text-lg font-bold mb-2 ${booking.status === "Confirmed" ? "text-green-500" : "text-red-500"}`}>
                    {booking.status}
                  </p>
                  {booking.status !== "Confirmed" && (
                    <div className="flex space-x-3">
                      <button
                        className="btn btn-success btn-sm"
                        onClick={() => handleStatusChange(booking._id, "Confirmed")}
                      >
                        Confirm
                      </button>
                      <button
                        className="btn btn-error btn-sm"
                        onClick={() => handleStatusChange(booking._id, "Cancelled")}
                      >
                        Cancel
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600 dark:text-gray-300">No bookings found.</p>
        )}
      </div>
    </div>
  );
};
