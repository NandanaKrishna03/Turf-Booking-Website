import { axiosInstance } from "../../config/axiosInstance";
import { useFetch } from "../../hooks/useFetch";

const ViewAllBookings = () => {
    const [bookings, isLoading, error, refetch] = useFetch("/admin/bookings");

    const handleDeleteBooking = async (bookingId) => {
        try {
            await axiosInstance.delete(`/bookings/cancel/${bookingId}`);
            refetch(); // Refresh the list after deletion
        } catch (err) {
            console.error("Error deleting booking:", err);
        }
    };

    if (isLoading) {
        return <div className="text-center text-lg">Loading...</div>;
    }

    if (error) {
        return <div className="text-center text-red-500">{error}</div>;
    }

    return (
        <div className="min-h-screen p-6 bg-gray-100 dark:bg-gray-900 text-black dark:text-white">
            <h1 className="text-3xl font-bold text-center mb-6">All Bookings</h1>
            <div className="overflow-x-auto">
                <table className="w-full border border-gray-300 dark:border-gray-600 rounded-lg text-center">
                    <thead className="bg-gray-200 dark:bg-gray-700">
                        <tr>
                            <th className="border border-gray-400 dark:border-gray-600 px-4 py-2">Booking ID</th>
                            <th className="border border-gray-400 dark:border-gray-600 px-4 py-2">User</th>
                            <th className="border border-gray-400 dark:border-gray-600 px-4 py-2">Turf</th>
                            <th className="border border-gray-400 dark:border-gray-600 px-4 py-2">Date</th>
                            <th className="border border-gray-400 dark:border-gray-600 px-4 py-2">Time</th>
                            <th className="border border-gray-400 dark:border-gray-600 px-4 py-2">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings?.map((booking) => (
                            <tr key={booking._id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                                <td className="border border-gray-400 dark:border-gray-600 px-4 py-2">{booking._id}</td>
                                <td className="border border-gray-400 dark:border-gray-600 px-4 py-2">{booking.user?.name}</td>
                                <td className="border border-gray-400 dark:border-gray-600 px-4 py-2">{booking.turf?.title}</td>
                                <td className="border border-gray-400 dark:border-gray-600 px-4 py-2">{new Date(booking.date).toLocaleDateString()}</td>
                                <td className="border border-gray-400 dark:border-gray-600 px-4 py-2">{booking.timeSlot}</td>
                                <td className="border border-gray-400 dark:border-gray-600 px-4 py-2">
                                    <button onClick={() => handleDeleteBooking(booking._id)}
                                        className="bg-red-500 dark:bg-red-600 text-white px-3 py-1 rounded hover:bg-red-600 dark:hover:bg-red-700">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ViewAllBookings;
