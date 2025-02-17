
import { axiosInstance } from "../../config/axiosInstance";
import { useFetch } from "../../hooks/useFetch";

const ViewAllBookings = () => {
    const [bookings, isLoading, error, refetch] = useFetch("/admin/bookings");

    const handleDeleteBooking = async (bookingId) => {
        try {
            await axiosInstance.delete(`/bookings/cancel/${bookingId}`);
            refetch(); // Refresh the list after deletion"/cancel/:bookingId"
        } catch (err) {
            console.error("Error deleting booking:", err);
        }
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <h1>All Bookings</h1>
            <table>
                <thead>
                    <tr>
                        <th>Booking ID</th>
                        <th>User</th>
                        <th>Turf</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {bookings?.map((booking) => (
                        <tr key={booking._id}>
                            <td>{booking._id}</td>
                            <td>{booking.user?.name}</td>
                            <td>{booking.turf?.title}</td>
                            <td>{new Date(booking.date).toLocaleDateString()}</td>
                            <td>{booking.time}</td>
                            <td>
                                <button onClick={() => handleDeleteBooking(booking._id)}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ViewAllBookings;
