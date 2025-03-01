/* eslint-disable react/prop-types */
import { useEffect, useState, useContext } from "react";
import { axiosInstance } from "../../config/axiosInstance";
import toast from "react-hot-toast";
import { ThemeContext } from "../../context/ThemeContext";

export const ManagerBooking = ({ refetch }) => {
  const [bookings, setBookings] = useState([]);
  const { theme } = useContext(ThemeContext);
  const isDarkMode = theme === "dark";

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axiosInstance.get("manager/getBookings");
        setBookings(response.data.data);
      } catch (error) {
        toast.error("Failed to fetch bookings");
        console.error("Error fetching bookings:", error);
      }
    };
    fetchBookings();
  }, [refetch]);

  const handleStatusChange = async (bookingId, newStatus) => {
    try {
      await axiosInstance.put(`bookings/update-status/${bookingId}`, { status: newStatus });
      toast.success("Booking status updated successfully");
      setBookings((prev) => prev.map((b) => (b._id === bookingId ? { ...b, status: newStatus } : b)));
    } catch (error) {
      toast.error("Failed to update booking status");
      console.error("Error updating booking status:", error);
    }
  };

  return (
    <div className={`min-h-screen p-6 ${isDarkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}`}>
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-center">User Bookings</h2>
        {bookings.length > 0 ? (
          <div className="space-y-6">
            {bookings.map(({ _id, turf, user, date, timeSlot, status }) => (
              <div key={_id} className={`p-6 rounded-lg shadow-lg flex justify-between items-center ${isDarkMode ? "bg-gray-800" : "bg-white"}`}>
                <div>
                  <h3 className="text-xl font-semibold">{turf?.title}</h3>
                  <p className="text-gray-500"><strong>User:</strong> {user?.name}</p>
                  <p className="text-gray-500"><strong>Date:</strong> {new Date(date).toLocaleDateString()}</p>
                  <p className="text-gray-500"><strong>Time:</strong> {timeSlot}</p>
                  <p className="text-gray-500"><strong>Price:</strong> ₹{turf?.price || "N/A"}</p>
                </div>
                <div className="text-center">
                  <p className={`text-lg font-bold mb-2 ${status === "Confirmed" ? "text-green-500" : "text-red-500"}`}>{status}</p>
                  {status !== "Confirmed" && (
                    <div className="space-x-2">
                      <button className="px-4 py-2 bg-green-600 text-white rounded-lg" onClick={() => handleStatusChange(_id, "Confirmed")}>Confirm</button>
                      <button className="px-4 py-2 bg-red-600 text-white rounded-lg" onClick={() => handleStatusChange(_id, "Cancelled")}>Cancel</button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No bookings found.</p>
        )}
      </div>
    </div>
  );
};
