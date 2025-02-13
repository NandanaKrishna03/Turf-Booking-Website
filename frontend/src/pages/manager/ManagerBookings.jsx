import { useFetch } from "../../hooks/useFetch";

const ManagerBookings = () => {
    const [bookings, isLoading, error] = useFetch("/manager/bookings");

    if (isLoading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
    if (error) return <div className="text-red-500 text-center">Error: {error.message}</div>;

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h2 className="text-3xl font-bold text-center mb-6">Booking Details</h2>

            {bookings && bookings.length > 0 ? (
                <div className="overflow-x-auto">
                    <table className="table w-full bg-white shadow-lg rounded-lg">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="p-3 text-left">#</th>
                                <th className="p-3 text-left">Turf Name</th>
                                <th className="p-3 text-left">User</th>
                                <th className="p-3 text-left">Date</th>
                                <th className="p-3 text-left">Time Slot</th>
                                <th className="p-3 text-left">Price</th>
                                <th className="p-3 text-left">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bookings.map((booking, index) => (
                                <tr key={booking._id} className="border-t">
                                    <td className="p-3">{index + 1}</td>
                                    <td className="p-3 font-semibold">{booking.turfName}</td>
                                    <td className="p-3">{booking.userName}</td>
                                    <td className="p-3">{new Date(booking.date).toLocaleDateString()}</td>
                                    <td className="p-3">{booking.timeSlot}</td>
                                    <td className="p-3 font-bold text-green-600">${booking.price}</td>
                                    <td className="p-3">
                                        <span className={`badge ${booking.status === "Confirmed" ? "badge-success" : "badge-warning"}`}>
                                            {booking.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p className="text-gray-500 text-center">No bookings found.</p>
            )}
        </div>
    );
};

export default ManagerBookings;
